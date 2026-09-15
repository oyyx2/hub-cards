"use client";

import { useState } from "react";
import { HubBackButton } from "@/components/HubBackButton";
import { TeamGrid } from "@/components/TeamGrid";
import { TeamMemberDetail } from "@/components/TeamMemberDetail";
import { teamMembers, type TeamMember } from "@/data/teamMembers";
import { cn } from "@/lib/utils";
import styles from "./team.module.css";

type TeamSectionProps = {
  members?: TeamMember[];
  mode?: "page" | "embedded";
  onBack?: () => void;
};

export function TeamSection({
  members = teamMembers,
  mode = "embedded",
  onBack,
}: TeamSectionProps) {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <section className={cn(styles.section, mode === "page" && styles.pageShell)}>
      <div className="hub-grain pointer-events-none absolute inset-0" />
      {onBack ? (
        <div className="relative z-10 mx-auto mb-3 w-full max-w-6xl">
          <HubBackButton onBack={onBack} />
        </div>
      ) : null}

      <header className={styles.header}>
        <p className={styles.kicker}>The Hub</p>
        <h1 className={styles.title}>Meet The Team</h1>
        <p className={styles.subtitle}>Different strengths. One team.</p>
      </header>

      <TeamGrid members={members} onOpen={setSelected} />

      {selected ? (
        <TeamMemberDetail member={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
