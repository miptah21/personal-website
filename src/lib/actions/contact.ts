'use server'

import { z } from 'zod'
import { getPayloadClient } from '@/lib/queries'
import nodemailer from 'nodemailer'

// ---------- Schema ----------
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(120, 'Name is too long.'),
  email: z
    .string()
    .email('Please provide a valid email address.'),
  subject: z.enum(['general', 'collaboration', 'freelance', 'other'], {
    message: 'Please select a subject.',
  }),
  message: z
    .string()
    .max(5000, 'Message is too long.'),
})

// ---------- HTML helpers ----------
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// ---------- In-memory rate limiter ----------
const submissions = new Map<string, number[]>()
const RATE_LIMIT = 5 // max submissions
const RATE_WINDOW_MS = 60 * 60 * 1000 // per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const history = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  submissions.set(ip, history)
  return history.length >= RATE_LIMIT
}

function recordSubmission(ip: string): void {
  const history = submissions.get(ip) ?? []
  history.push(Date.now())
  submissions.set(ip, history)
}

// ---------- Content heuristics ----------
const URL_REGEX = /https?:\/\/[^\s]+/gi

function looksLikeSpam(message: string): boolean {
  const urlMatches = message.match(URL_REGEX)
  return (urlMatches?.length ?? 0) > 3
}

// ---------- Gmail transporter ----------
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

// ---------- Server Action ----------
export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
} | null

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Honeypot check — if the hidden field is filled, silently succeed (fool the bot)
  const honeypot = formData.get('company_website')
  if (honeypot) {
    return { success: true }
  }

  // 2. Time-based check — reject submissions faster than 3 seconds
  const renderTime = Number(formData.get('_render_time') ?? 0)
  if (renderTime > 0 && Date.now() - renderTime < 3000) {
    return { success: true } // Silent success to fool bots
  }

  // 3. Rate limiting
  const ip = formData.get('_client_ip') as string | null ?? 'unknown'
  if (isRateLimited(ip)) {
    return { error: 'Too many submissions. Please try again later.' }
  }

  // 4. Parse & validate
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  }

  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = []
      fieldErrors[field].push(issue.message)
    }
    return { error: 'Please fix the errors below.', fieldErrors }
  }

  const { name, email, subject, message } = result.data

  // Extract plain text for validation
  const plainMessage = stripHtmlTags(message)
  if (plainMessage.length < 10) {
    return { error: 'Please fix the errors below.', fieldErrors: { message: ['Message must be at least 10 characters.'] } }
  }

  // 5. Content heuristics
  if (looksLikeSpam(plainMessage)) {
    return { success: true } // Silent success
  }

  // 6. Store in Payload CMS
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, subject, message },
    })
  } catch (err) {
    console.error('[Contact] Failed to store submission:', err)
    return { error: 'Something went wrong. Please try again later.' }
  }

  // 7. Send email notification via Gmail SMTP
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD
  if (gmailUser && gmailPass) {
    try {
      const transporter = createTransporter()

      const subjectLabels: Record<string, string> = {
        general: 'General Inquiry',
        collaboration: 'Collaboration',
        freelance: 'Freelance / Contract',
        other: 'Other',
      }

      await transporter.sendMail({
        from: `"Portfolio Contact" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: `[Portfolio] ${subjectLabels[subject] ?? subject} from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subjectLabels[subject] ?? subject}`,
          '',
          'Message:',
          message,
        ].join('\n'),
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #173124; border-bottom: 2px solid #775A19; padding-bottom: 8px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr><td style="padding: 8px 0; color: #666; width: 80px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td style="padding: 8px 0;">${subjectLabels[subject] ?? subject}</td></tr>
            </table>
            <div style="background: #f5f3ee; padding: 16px; margin-top: 16px;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;"><strong>Message</strong></p>
              <div style="color: #1b1c19; line-height: 1.6; margin: 0;">${message}</div>
            </div>
            <p style="color: #999; font-size: 11px; margin-top: 24px; text-align: center;">
              Sent from your portfolio contact form
            </p>
          </div>
        `,
      })
    } catch (err) {
      // Email failure is non-critical — submission is already stored in CMS
      console.error('[Contact] Failed to send email notification:', err)
    }
  }

  recordSubmission(ip)
  return { success: true }
}
