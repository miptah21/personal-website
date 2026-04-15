import styles from '@/app/(frontend)/page.module.css';

export default function ContactSection() {
  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.containerTextCenter}>
        <h2 className={styles.contactEyebrow}>Inquiries &amp; Partnerships</h2>
        <a href="/contact" className={styles.contactEmail} aria-label="Go to contact page">Get in Touch</a>
        <nav className={styles.contactLinks} aria-label="Social media links">
          <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={process.env.NEXT_PUBLIC_GITHUB_URL || '#'} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={process.env.NEXT_PUBLIC_CONTACT_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` : '#'}>Email</a>
        </nav>
      </div>
    </section>
  );
}
