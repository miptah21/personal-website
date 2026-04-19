"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/(frontend)/page.module.css';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  style: string;
  columnSpan: string;
}

const ToolCard = ({ tool }: { tool: Tool }) => {
  let cardClass = styles.toolCard;
  let iconClass = styles.toolIcon;
  let titleClass = styles.toolTitle;
  let descClass = styles.toolDesc;

  if (tool.style === 'dark') {
    cardClass = styles.toolCardDark;
    iconClass = styles.toolIconDark;
    titleClass = styles.toolTitleDark;
    descClass = styles.toolDescDark;
  } else if (tool.style === 'variant') {
    cardClass = styles.toolCardVariant;
  }

  cardClass = `${cardClass} ${styles.colSpan2}`;

  return (
    <div className={cardClass} style={{ height: '100%' }}>
      <div>
        <span className={`material-symbols-outlined ${iconClass}`}>{tool.icon}</span>
        <h4 className={titleClass}>{tool.title}</h4>
        <p className={descClass}>{tool.description}</p>
      </div>
    </div>
  );
};

const FlippingSlot = ({ tool, onMouseEnter, onMouseLeave }: { tool: Tool, onMouseEnter: () => void, onMouseLeave: () => void }) => {
  const [frontTool, setFrontTool] = useState<Tool>(tool);
  const [backTool, setBackTool] = useState<Tool>(tool);
  const [isFlipped, setIsFlipped] = useState(false);
  const [prevToolId, setPrevToolId] = useState<string>(tool.id);

  if (tool.id !== prevToolId) {
    if (isFlipped) {
      // Currently showing back, so update front and flip to front
      setFrontTool(tool);
      setIsFlipped(false);
    } else {
      // Currently showing front, so update back and flip to back
      setBackTool(tool);
      setIsFlipped(true);
    }
    setPrevToolId(tool.id);
  }

  return (
    <div 
      className={`${styles.flipSlot} ${isFlipped ? styles.isFlipped : ''} ${styles.colSpan2}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${styles.flipFace} ${styles.flipFront}`}>
        <ToolCard tool={frontTool} />
      </div>
      <div className={`${styles.flipFace} ${styles.flipBack}`}>
        <ToolCard tool={backTool} />
      </div>
    </div>
  );
};

export default function AnimatedToolkitGrid({ tools }: { tools: Tool[] }) {
  const [slot1Index, setSlot1Index] = useState(0);
  const [slot2Index, setSlot2Index] = useState(1);
  const hoverRefs = useRef([false, false]);
  const currentSlots = useRef([0, 1]);

  useEffect(() => {
    if (tools.length <= 2) return;

    let step = 0;

    const interval = setInterval(() => {
      step++;
      
      const turnSlot = step % 2 !== 0 ? 0 : 1;
      const otherSlot = turnSlot === 0 ? 1 : 0;

      // Pause animation if this specific slot is hovered
      if (hoverRefs.current[turnSlot]) return;

      // Find the next sequential index that isn't currently in the other slot
      let nextIdx = (currentSlots.current[turnSlot] + 1) % tools.length;
      while (nextIdx === currentSlots.current[otherSlot]) {
        nextIdx = (nextIdx + 1) % tools.length;
      }

      currentSlots.current[turnSlot] = nextIdx;
      
      if (turnSlot === 0) {
        setSlot1Index(nextIdx);
      } else {
        setSlot2Index(nextIdx);
      }
    }, 4000); // 4 seconds between flips

    return () => clearInterval(interval);
  }, [tools]);

  if (tools.length === 0) return null;

  if (tools.length <= 2) {
    return (
      <div className={styles.toolkitGrid}>
        {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
      </div>
    );
  }

  return (
    <div className={styles.toolkitGrid}>
      <FlippingSlot 
        tool={tools[slot1Index]} 
        onMouseEnter={() => { hoverRefs.current[0] = true; }}
        onMouseLeave={() => { hoverRefs.current[0] = false; }}
      />
      {tools.length > 1 && (
        <FlippingSlot 
          tool={tools[slot2Index]} 
          onMouseEnter={() => { hoverRefs.current[1] = true; }}
          onMouseLeave={() => { hoverRefs.current[1] = false; }}
        />
      )}
    </div>
  );
}
