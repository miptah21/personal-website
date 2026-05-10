import styles from '@/app/(frontend)/page.module.css';
import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import type { ToolDoc } from '@/lib/queries';

const AnimatedToolkitGrid = dynamic(() => import('@/components/AnimatedToolkitGrid'), {
  ssr: false,
});

interface ToolkitSectionProps {
  tools: ToolDoc[];
}

export default function ToolkitSection({ tools }: ToolkitSectionProps) {
  return (
    <section id="toolkit" className={styles.toolkitSection}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.toolkitHeader}>
            <h2 className={styles.toolkitHeadline}>The Technical Toolkit</h2>
            <p className={styles.toolkitDesc}>
              A curated selection of specialized skills and technologies used to architect financial models and analytical systems.
            </p>
          </div>
        </ScrollReveal>
        
        {tools.length > 0 ? (
          <>
            {tools.filter(t => t.columnSpan === '2').length > 0 && (
              <ScrollReveal delay={0.2}>
                <AnimatedToolkitGrid tools={tools.filter(t => t.columnSpan === '2')} />
              </ScrollReveal>
            )}

            {tools.filter(t => t.columnSpan !== '2').length > 0 && (
              <ScrollReveal delay={0.4}>
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
                            <Icon name={tool.icon} className={iconClass} size={24} />
                            <h3 className={titleClass}>{tool.title}</h3>
                            <p className={descClass}>{tool.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
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
