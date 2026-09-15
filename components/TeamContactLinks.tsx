"use client";

import type { TeamMember } from "@/data/teamMembers";
import styles from "./team.module.css";

type TeamContactLinksProps = {
  member: TeamMember;
};

export function TeamContactLinks({ member }: TeamContactLinksProps) {
  if (!member.linkedin && !member.email) return null;

  return (
    <div className={styles.contacts}>
      {member.linkedin ? (
        <a
          className={styles.contact}
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
      ) : null}
      {member.email ? (
        <a className={styles.contact} href={`mailto:${member.email}`}>
          Email
        </a>
      ) : null}
    </div>
  );
}
