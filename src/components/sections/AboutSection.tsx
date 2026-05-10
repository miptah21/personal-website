import Image from 'next/image';
import styles from '@/app/(frontend)/page.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutGrid}>
          <ScrollReveal direction="right" className={styles.aboutImageCol}>
            <div className={styles.aboutImageWrapper}>
              <Image 
                src="/abstract.png" 
                alt="Abstract geometric pattern representing systems thinking" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.aboutImage} 
              />
            </div>
            <div className={styles.aboutQuoteBox}>
              <p>&ldquo;Complexity is the canvas.&rdquo;</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className={styles.aboutTextCol}>
            <div className={styles.aboutTextInner}>
              <h2 className={styles.sectionLabel}>The Philosophy</h2>
              <h3 className={styles.sectionHeadline}>Systems Thinking as a Strategic Lever</h3>
              <div className={styles.aboutBody}>
                <p>
                  My approach to <span>Computational Finance</span> is not merely about the algorithm; it is about the structural integrity of the decision-making pipeline.
                </p>
                <p>
                  Through a rigorous application of Systems Thinking, I dismantle complex organizational frictions to build lean, data-driven frameworks that scale. Every line of code is an architectural choice.
                </p>
              </div>
              <div className={styles.statsFlex} aria-label="Key statistics">
                <div>
                  <p className={styles.statNumber}>12+</p>
                  <p className={styles.statLabel}>Strategic Deployments</p>
                </div>
                <div>
                  <p className={styles.statNumber}>04</p>
                  <p className={styles.statLabel}>Global Institutions</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
