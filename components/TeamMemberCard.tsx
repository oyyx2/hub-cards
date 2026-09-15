"use client";

import Image from "next/image";
import type { TeamMember } from "@/data/teamMembers";
import styles from "./team.module.css";

type TeamMemberCardProps = {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
};

export function TeamMemberCard({ member, onOpen }: TeamMemberCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(member)}
      aria-label={`Open profile for ${member.name}, ${member.role}`}
    >
      <div className={styles.photoWrap}>
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22rem"
          className={styles.photo}
        />
        <span className={styles.frame} aria-hidden />
      </div>
      <div className={styles.meta}>
        <h2 className={styles.name}>{member.name}</h2>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.tagline}>“{member.tagline}”</p>
      </div>
    </button>
  );
}
