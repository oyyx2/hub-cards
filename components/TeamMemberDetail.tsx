"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { TeamContactLinks } from "@/components/TeamContactLinks";
import type { TeamMember } from "@/data/teamMembers";
import styles from "./team.module.css";

type TeamMemberDetailProps = {
  member: TeamMember;
  onClose: () => void;
};

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className={styles.block}>
      <h3 className={styles.blockLabel}>{label}</h3>
      {children}
    </section>
  );
}

export function TeamMemberDetail({ member, onClose }: TeamMemberDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <article
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${member.id}-name`}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          Close
        </button>

        <div className={styles.detailHero}>
          <div className={styles.detailPhoto}>
            <img
              src={member.photo}
              alt={`Portrait of ${member.name}`}
              className={styles.photo}
            />
          </div>
          <header>
            <h2 id={`${member.id}-name`} className={styles.detailName}>
              {member.name}
            </h2>
            <p className={styles.detailRole}>{member.role}</p>
            <p className={styles.detailTag}>“{member.tagline}”</p>
          </header>
        </div>

        {member.experience.length > 0 ? (
          <Block label="Experience">
            <ul className={styles.blockList}>
              {member.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        ) : null}

        {member.motivation ? (
          <Block label="Motivation">
            <p className={styles.blockCopy}>{member.motivation}</p>
          </Block>
        ) : null}

        {member.strengths ? (
          <Block label="Strengths">
            <p className={styles.blockCopy}>{member.strengths}</p>
          </Block>
        ) : null}

        {member.interests ? (
          <Block label="Interests">
            <p className={styles.blockCopy}>{member.interests}</p>
          </Block>
        ) : null}

        {member.phrase ? (
          <Block label="In a word or phrase">
            <p className={styles.blockCopy}>{member.phrase}</p>
          </Block>
        ) : null}

        {member.idea ? (
          <Block label="One idea for MSBA">
            <p className={styles.blockCopy}>{member.idea}</p>
          </Block>
        ) : null}

        <TeamContactLinks member={member} />
      </article>
    </div>
  );
}
