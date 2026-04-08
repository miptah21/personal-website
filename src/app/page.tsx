import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      {/* Redesigned Hero Section: Editorial Composition */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Side Content */}
            <div className={styles.heroLeft}>
              <p className={styles.heroEyebrow}>Computational Finance Professional</p>
              <h1 className={styles.heroTitle}>Miftahudin<br/>Akbar.</h1>
              <div className={styles.heroBody}>
                <p className={styles.heroSubtitle}>
                  Bridging the gap between complex financial systems and data-driven intelligence.
                </p>
                <p className={styles.heroDescription}>
                  A strategic analyst specialized in Computational Finance and Data-Driven Systems. I transform raw market signals into actionable financial strategies, leveraging a background that spans across high-growth tech ecosystems and deep academic foundations.
                </p>
                <div style={{ paddingTop: '1.5rem' }}>
                  <button className={styles.btnRoundedPrimary}>
                    <span>Let's Connect</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>&#8594;</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Side Visuals */}
            <div className={styles.heroRight}>
              <div className={styles.heroImageWrapper}>
                <Image 
                  src="/portrait.png" 
                  alt="Miftahudin Akbar" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.heroImage}
                  priority
                />
              </div>
              <div className={styles.heroDecoration}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section: Vignette Layout */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImageCol}>
              <div className={styles.aboutImageWrapper}>
                <Image 
                  src="/abstract.png" 
                  alt="Architecture" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.aboutImage} 
                  priority
                />
              </div>
              <div className={styles.aboutQuoteBox}>
                <p>"Complexity is the canvas."</p>
              </div>
            </div>
            <div className={styles.aboutTextCol}>
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
                <div className={styles.statsFlex}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Professional Insights: Digital Monograph Grid */}
      <section id="insights" className={styles.insightsSection}>
        <div className={styles.container}>
          <div className={styles.insightsHeader}>
            <div>
              <h2 className={`${styles.sectionLabel} ${styles.italic}`}>Journal of Insights</h2>
              <h3 className={styles.sectionHeadlineLarge}>The Monograph</h3>
            </div>
            <Link href="/insights" className={styles.linkUnderline}>Browse Full Archive</Link>
          </div>
          
          <div className={styles.insightsGrid}>
            {/* Card 01 */}
            <div className={styles.insightCard}>
              <div>
                <div className={styles.insightImageWrapper}>
                  <Image src="/abstract.png" alt="Card 1" fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.insightImage} />
                </div>
                <p className={styles.insightCategory}>Financial Performance</p>
                <h4 className={styles.insightTitle}>The Quantized Nature of Market Alpha</h4>
              </div>
              <div className={styles.insightFooter}>
                <span>MAR 2024</span>
                <span className="material-symbols-outlined">&#8599;</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className={styles.insightCard}>
              <div>
                <div className={styles.insightImageWrapper}>
                  <Image src="/abstract.png" alt="Card 2" fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.insightImage} />
                </div>
                <p className={styles.insightCategory}>Data to Decision</p>
                <h4 className={styles.insightTitle}>Reducing Organizational Entropy</h4>
              </div>
              <div className={styles.insightFooter}>
                <span>FEB 2024</span>
                <span className="material-symbols-outlined">&#8599;</span>
              </div>
            </div>

            {/* Card 03 */}
            <div className={styles.insightCard}>
              <div>
                <div className={styles.insightImageWrapper}>
                  <Image src="/abstract.png" alt="Card 3" fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.insightImage} />
                </div>
                <p className={styles.insightCategory}>Risk Management</p>
                <h4 className={styles.insightTitle}>Resilience in Stochastic Environments</h4>
              </div>
              <div className={styles.insightFooter}>
                <span>JAN 2024</span>
                <span className="material-symbols-outlined">&#8599;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Technical Toolkit Section */}
      <section id="toolkit" className={styles.toolkitSection}>
        <div className={styles.container}>
          <div className={styles.toolkitHeader}>
            <h2 className={styles.toolkitHeadline}>The Technical Toolkit</h2>
            <p className={styles.toolkitDesc}>
              A curated selection of specialized skills and technologies used to architect financial models and analytical systems.
            </p>
          </div>
          
          <div className={styles.toolkitGrid}>
            <div className={`${styles.toolCard} ${styles.colSpan2}`}>
              <div>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>terminal</span>
                <h4 className={styles.toolTitle}>Python & Golang</h4>
                <p className={styles.toolDesc}>Architecture for high-performance financial data processing and algorithmic automation.</p>
              </div>
            </div>
            
            <div className={`${styles.toolCardDark} ${styles.colSpan2}`}>
              <div>
                <span className={`material-symbols-outlined ${styles.toolIconDark}`}>monitoring</span>
                <h4 className={styles.toolTitleDark}>Financial Analysis</h4>
                <p className={styles.toolDescDark}>Deep modeling of banking performance, risk management, and capital allocation.</p>
              </div>
            </div>
            
            <div className={styles.toolCardVariant}>
              <div>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>database</span>
                <h4 className={styles.toolTitleSmall}>SQL & Data Ops</h4>
                <p className={styles.toolDescSmall}>Advanced query optimization for large-scale financial datasets.</p>
              </div>
            </div>

            <div className={styles.toolCard}>
              <div>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>functions</span>
                <h4 className={styles.toolTitleSmall}>Statistical Thinking</h4>
                <p className={styles.toolDescSmall}>Probabilistic modeling and risk mitigation frameworks.</p>
              </div>
            </div>

            <div className={styles.toolCard}>
              <div>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>scatter_plot</span>
                <h4 className={styles.toolTitleSmall}>Advanced EDA</h4>
                <p className={styles.toolDescSmall}>Visualizing complex market trends through clear narratives.</p>
              </div>
            </div>

            <div className={styles.toolCardVariant}>
              <div>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>table_chart</span>
                <h4 className={styles.toolTitleSmall}>Financial Modeling</h4>
                <p className={styles.toolDescSmall}>Precision spreadsheet engineering for valuation and forecasting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section: Annual Report Style */}
      <section className={styles.experienceSection} id="projects">
        <div className={styles.container}>
          <div className={styles.expGrid}>
            <div className={styles.expHeaderCol}>
              <h2 className={styles.expStickyHeadline}>Professional Tenure</h2>
            </div>
            <div className={styles.expListCol}>
              <div className={styles.expItem}>
                <div className={styles.expItemMain}>
                  <span className={styles.expNumber}>01</span>
                  <div>
                    <h4 className={styles.expCompany}>Microsoft</h4>
                    <p className={styles.expRole}>Global Technology Partner</p>
                  </div>
                </div>
                <p className={styles.expDates}>2022 — Present</p>
              </div>
              
              <div className={styles.expItem}>
                <div className={styles.expItemMain}>
                  <span className={styles.expNumber}>02</span>
                  <div>
                    <h4 className={styles.expCompany}>Ruangguru</h4>
                    <p className={styles.expRole}>Systems Strategy & Ops</p>
                  </div>
                </div>
                <p className={styles.expDates}>2021 — 2022</p>
              </div>
              
              <div className={styles.expItem}>
                <div className={styles.expItemMain}>
                  <span className={styles.expNumber}>03</span>
                  <div>
                    <h4 className={styles.expCompany}>Bangkit</h4>
                    <p className={styles.expRole}>Computational Fellow</p>
                  </div>
                </div>
                <p className={styles.expDates}>2020 — 2021</p>
              </div>
              
              <div className={`${styles.expItem} ${styles.expItemLast}`}>
                <div className={styles.expItemMain}>
                  <span className={styles.expNumber}>04</span>
                  <div>
                    <h4 className={styles.expCompany}>PukulEnam</h4>
                    <p className={styles.expRole}>Early Foundation</p>
                  </div>
                </div>
                <p className={styles.expDates}>2019 — 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.containerTextCenter}>
          <h2 className={styles.contactEyebrow}>Inquiries & Partnerships</h2>
          <a href="mailto:hello@miftahudinakbar.com" className={styles.contactEmail}>Get in Touch</a>
          <div className={styles.contactLinks}>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
            <a href="#">Medium</a>
            <a href="#">Substack</a>
          </div>
        </div>
      </section>

    </main>
  );
}
