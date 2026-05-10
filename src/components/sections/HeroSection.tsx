import styles from '@/app/(frontend)/page.module.css';
import NameTagHero from '@/components/NameTagHero';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <ScrollReveal delay={2.4} className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>Computational Finance Professional</p>
            <h1 className={styles.heroTitle}>Miftah<span style={{ opacity: 0.45 }}>udin</span><br/><span style={{ opacity: 0.45 }}>Akbar.</span></h1>
            <div className={styles.heroBody}>
              <p className={styles.heroSubtitle}>
                Bridging the gap between complex financial systems and data-driven intelligence.
              </p>
              <p className={styles.heroDescription}>
                A strategic analyst specialized in Computational Finance and Data-Driven Systems. I transform raw market signals into actionable financial strategies, leveraging a background that spans across high-growth tech ecosystems and deep academic foundations.
              </p>
              <div style={{ paddingTop: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <a href="#contact" className={styles.btnRoundedPrimary} aria-label="Navigate to contact section">
                  <span>Let&apos;s Connect</span>
                  <Icon name="arrow_forward" size={18} />
                </a>
                <a href="#projects" className={styles.linkUnderline} aria-label="View Selected Works">
                  View Selected Works
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={2.6} direction="left" className={styles.heroRight}>
            <div className={styles.heroRightInner}>
              <NameTagHero />
              <div className={styles.heroDecoration} aria-hidden="true"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
