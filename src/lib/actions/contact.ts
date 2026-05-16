'use server'

import { z } from 'zod'
import { getPayloadClient } from '@/lib/queries'
import { Resend } from 'resend'
import { headers } from 'next/headers'
function sanitizeHTML(html: string) {
  if (!html) return '';
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<(iframe|object|embed|style|link|meta|base)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');
  clean = clean.replace(/ on\w+="[^"]*"/gi, '');
  clean = clean.replace(/ on\w+='[^']*'/gi, '');
  clean = clean.replace(/ on\w+=[^\s>]+/gi, '');
  clean = clean.replace(/href="javascript:[^"]*"/gi, 'href="#"');
  return clean;
}

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

// ---------- Resend email client ----------
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
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

  // 3. Rate limiting — read IP from request headers (not client-submitted data)
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? headersList.get('x-real-ip')
    ?? 'unknown'
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

  const { name, email, subject, message: rawMessage } = result.data

  // Sanitize HTML to prevent XSS and email injection
  const message = sanitizeHTML(rawMessage)

  // Extract plain text for validation
  const plainMessage = stripHtmlTags(message)
  console.log(`[Contact] Submission from ${email}: raw=${rawMessage?.length ?? 0} chars, plain=${plainMessage?.length ?? 0} chars, plain="${plainMessage?.substring(0, 80)}"`)
  if (plainMessage.length < 10) {
    console.log(`[Contact] Rejected: plain message too short (${plainMessage.length} chars)`)
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

  // 7. Send email notification via Resend (HTTP-based, works on Vercel)
  const recipientEmail = process.env.GMAIL_USER || process.env.NEXT_PUBLIC_CONTACT_EMAIL
  const resend = getResendClient()
  if (resend && recipientEmail) {
    try {
      const subjectLabels: Record<string, string> = {
        general: 'General Inquiry',
        collaboration: 'Collaboration',
        freelance: 'Freelance / Contract',
        other: 'Other',
      }

      const { error: sendError } = await resend.emails.send({
        from: `Portfolio Contact <onboarding@resend.dev>`,
        to: [recipientEmail],
        replyTo: email,
        subject: `[Portfolio] ${subjectLabels[subject] ?? subject} from ${name}`,
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
              <div style="color: #1b1c19; line-height: 1.6; margin: 0;">${plainMessage}</div>
            </div>
            <p style="color: #999; font-size: 11px; margin-top: 24px; text-align: center;">
              Sent from your portfolio contact form
            </p>
          </div>
        `,
      })

      if (sendError) {
        console.error('[Contact] Resend email error:', sendError)
      } else {
        console.log(`[Contact] Email notification sent to ${recipientEmail}`)
      }
    } catch (err) {
      // Email failure is non-critical — submission is already stored in CMS
      console.error('[Contact] Failed to send email notification:', err)
    }
  } else {
    console.warn('[Contact] Email skipped: RESEND_API_KEY or GMAIL_USER not configured')
  }

  recordSubmission(ip)
  return { success: true }
}
