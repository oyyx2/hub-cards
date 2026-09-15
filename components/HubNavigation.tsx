"use client";

import styles from "./hub-nav.module.css";

type HubNavigationProps = {
  onChooseYou: () => void;
  onChoosePlan: () => void;
  inert?: boolean;
};

export function HubNavigation({
  onChooseYou,
  onChoosePlan,
  inert = false,
}: HubNavigationProps) {
  return (
    <section
      className={`hub-room ${styles.screen}`}
      aria-hidden={inert}
      inert={inert ? true : undefined}
    >
      <div className="hub-grain pointer-events-none absolute inset-0" />
      <svg className={styles.watermark} viewBox="0 0 80 84" aria-hidden="true">
        <g fill="none" stroke="#9ec4ff" strokeLinejoin="round">
          <path
            d="M12 36 L40 12 L68 36 V70 H12 Z"
            fill="#6ea8ff"
            fillOpacity="0.2"
            strokeWidth="1.8"
          />
          <path d="M8 38 L40 10 L72 38" strokeWidth="2" />
          <rect x="34" y="50" width="12" height="20" fill="#b9d4ff" fillOpacity="0.35" />
        </g>
      </svg>

      <header className={styles.header}>
        <p className={styles.kicker}>The Hub</p>
        <h1 className={styles.title}>Welcome to The Hub.</h1>
        <p className={styles.subtitle}>Get to know us — and let us get to know you.</p>
      </header>

      <div className={styles.doors}>
        <button type="button" className={`${styles.door} ${styles.doorYou}`} onClick={onChooseYou}>
          <p className={styles.label}>Leave a word</p>
          <h2 className={styles.heading}>Let us get to know you</h2>
          <p className={styles.copy}>Leave one word behind and become part of The Hub.</p>
        </button>

        <button type="button" className={`${styles.door} ${styles.doorPlan}`} onClick={onChoosePlan}>
          <p className={styles.label}>Draw a card</p>
          <h2 className={styles.heading}>Explore our annual plan</h2>
          <p className={styles.copy}>Draw a card and see what we hope to build this year.</p>
        </button>
      </div>
    </section>
  );
}
