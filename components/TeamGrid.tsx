"use client";

import { TeamMemberCard } from "@/components/TeamMemberCard";
import type { TeamMember } from "@/data/teamMembers";
import styles from "./team.module.css";

type TeamGridProps = {
  members: TeamMember[];
  onOpen: (member: TeamMember) => void;
};

export function TeamGrid({ members, onOpen }: TeamGridProps) {
  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} onOpen={onOpen} />
      ))}
    </div>
  );
}
