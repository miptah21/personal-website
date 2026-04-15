import styles from '@/app/(frontend)/page.module.css';
import AnimatedToolkitGrid from '@/components/AnimatedToolkitGrid';
import type { ToolDoc } from '@/lib/queries';

interface ToolkitSectionProps {
  tools: ToolDoc[];
}

export default function ToolkitSection({ tools }: ToolkitSectionProps) {
  return (
    <section id="toolkit" className={styles.toolkitSection}>
      <div className={styles.container}>
        <div className={styles.toolkitHeader}>
          <h2 className={styles.toolkitHeadline}>The Technical Toolkit</h2>
          <p className={styles.toolkitDesc}>
            A curated selection of specialized skills and technologies used to architect financial models and analytical systems.
          </p>
        </div>
        
        {tools.length > 0 ? (
          <>
            {tools.filter(t => t.columnSpan === '2').length > 0 && (
              <AnimatedToolkitGrid tools={tools.filter(t => t.columnSpan === '2')} />
            )}

            {tools.filter(t => t.columnSpan !== '2').length > 0 && (
              <div className={styles.sliderMarquee} aria-label="Skills marquee">
                <div className={styles.sliderTrack}>
                  {[...tools.filter(t => t.columnSpan !== '2'), ...tools.filter(t => t.columnSpan !== '2')].map((tool, index) => {
                    let cardClass = styles.toolCard;
                    let iconClass = styles.toolIcon;
                    let titleClass = styles.toolTitleSmall;
                    let descClass = styles.toolDescSmall;

                    if (tool.style === 'dark') {
                      cardClass = styles.toolCardDark;
                      iconClass = styles.toolIconDark;
                      titleClass = styles.toolTitleDark;
                      descClass = styles.toolDescDark;
                    } else if (tool.style === 'variant') {
                      cardClass = styles.toolCardVariant;
                    }

                    return (
                      <div key={`${tool.id}-${index}`} className={cardClass}>
                        <div>
                          <span className={`material-symbols-outlined ${iconClass}`} aria-hidden="true">{tool.icon}</span>
                          <h4 className={titleClass}>{tool.title}</h4>
                          <p className={descClass}>{tool.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--outline)' }}>
            <p><i>The Toolkit is currently empty. Add items via the Payload Admin interface.</i></p>
          </div>
        )}
      </div>
    </section>
  );
}
