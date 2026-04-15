'use client'

import { useActionState, useRef, useEffect, useState } from 'react'
import { submitContact } from '@/lib/actions/contact'
import type { ContactFormState } from '@/lib/actions/contact'
import RichTextEditor from '@/components/RichTextEditor'
import CustomSelect from '@/components/CustomSelect'
import styles from '@/app/(frontend)/contact/contact.module.css'

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContact,
    null,
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [renderTime] = useState(() => Date.now())


  // Reset form on success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state?.success])

  if (state?.success) {
    return (
      <div className={styles.formSuccessState} role="status" aria-live="polite">
        <div className={styles.formSuccessIcon}>
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" className={styles.successCircle} />
            <path d="M15 27 L22 34 L37 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.successCheck} />
          </svg>
        </div>
        <h3 className={styles.formSuccessHeadline}>Message Received</h3>
        <p className={styles.formSuccessBody}>
          Thank you for reaching out. I&apos;ll respond within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className={styles.contactForm} noValidate autoComplete="off">
      {/* Honeypot — hidden from humans, visible to bots */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="company_website">Company Website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Hidden timestamp for time-based check */}
      <input type="hidden" name="_render_time" value={renderTime} />

      {/* Global error */}
      {state?.error && !state.fieldErrors && (
        <div className={styles.formAlert} role="alert">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>error</span>
          {state.error}
        </div>
      )}

      {/* Name */}
      <div className={styles.formGroup}>
        <label htmlFor="contact-name" className={styles.formLabel}>Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          maxLength={120}
          placeholder="Your full name"
          autoComplete="off"
          className={`${styles.formInput} ${state?.fieldErrors?.name ? styles.formInputError : ''}`}
          disabled={isPending}
          aria-describedby={state?.fieldErrors?.name ? 'name-error' : undefined}
        />
        {state?.fieldErrors?.name && (
          <p id="name-error" className={styles.formFieldError} role="alert">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <label htmlFor="contact-email" className={styles.formLabel}>Email</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          placeholder="your@email.com"
          autoComplete="off"
          className={`${styles.formInput} ${state?.fieldErrors?.email ? styles.formInputError : ''}`}
          disabled={isPending}
          aria-describedby={state?.fieldErrors?.email ? 'email-error' : undefined}
        />
        {state?.fieldErrors?.email && (
          <p id="email-error" className={styles.formFieldError} role="alert">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      {/* Subject */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Subject</label>
        <CustomSelect
          id="contact-subject"
          name="subject"
          defaultValue="general"
          disabled={isPending}
          hasError={!!state?.fieldErrors?.subject}
          ariaDescribedBy={state?.fieldErrors?.subject ? 'subject-error' : undefined}
          options={[
            { value: 'general', label: 'General Inquiry' },
            { value: 'collaboration', label: 'Collaboration' },
            { value: 'freelance', label: 'Freelance / Contract' },
            { value: 'other', label: 'Other' },
          ]}
        />
        {state?.fieldErrors?.subject && (
          <p id="subject-error" className={styles.formFieldError} role="alert">{state.fieldErrors.subject[0]}</p>
        )}
      </div>

      {/* Message */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Message</label>
        <RichTextEditor
          id="contact-message"
          name="message"
          placeholder="Tell me about your project or inquiry..."
          disabled={isPending}
          hasError={!!state?.fieldErrors?.message}
          ariaDescribedBy={state?.fieldErrors?.message ? 'message-error' : undefined}
        />
        {state?.fieldErrors?.message && (
          <p id="message-error" className={styles.formFieldError} role="alert">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={styles.formButton}
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            <span className={styles.formSpinner} aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <span>Send Message</span>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </>
        )}
      </button>
    </form>
  )
}
