import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact | Miftahudin Akbar',
  description: 'Get in touch for collaboration, freelance work, or general inquiries.',
  openGraph: {
    title: 'Contact | Miftahudin Akbar',
    description: 'Get in touch for collaboration, freelance work, or general inquiries.',
    url: 'https://miftahudinakbar.com/contact',
    siteName: 'Miftahudin Akbar',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <div className={styles.contactPageContainer}>
        <div className={styles.contactPageGrid}>
          {/* Left — Context Column */}
          <div className={styles.contextCol}>
            <h2 className={styles.eyebrow}>Inquiries &amp; Partnerships</h2>
            <h1 className={styles.headline}>
              Let&apos;s Build Something<br />
              <em>Together.</em>
            </h1>
            <p className={styles.body}>
              Whether you have a project in mind, want to collaborate on research,
              or simply want to connect — I&apos;d love to hear from you. Every great
              partnership starts with a conversation.
            </p>

            <nav className={styles.socialLinks} aria-label="Social media links">
              <a href="https://www.linkedin.com/in/miftahudin-akbar-758049220/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/miptah21" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="mailto:miftahudinakbar21@gmail.com">
                Email
              </a>
            </nav>

            <div className={styles.responseBadge}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
              <span>Usually responds within 24 hours</span>
            </div>
          </div>

          {/* Right — Form Column */}
          <div className={styles.formCol}>
            <ContactForm />
          </div>
        </div>

        {/* Anonymous feedback */}
        <div className={styles.anonymousSection}>
          <div className={styles.anonymousDivider} aria-hidden="true" />
          <p className={styles.anonymousLabel}>
            Prefer to stay anonymous? Leave feedback at{' '}
            <a href="https://admonymous.co/miftah" target="_blank" rel="noopener noreferrer">
              admonymous.co/miftah
              <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginLeft: 4 }}>north_east</span>
            </a>
          </p>
          <p className={styles.anonymousBody}>
            I genuinely value opportunities to grow and improve, so feel free to write any thoughts — on my work, ideas for collaboration, or anything else you&apos;d like to share!
          </p>
        </div>
      </div>
    </main>
  )
}
