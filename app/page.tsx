"use client";

import { useRef, useState } from "react";
import { AnnualPlanDeck } from "@/components/AnnualPlanDeck";
import { Entrance } from "@/components/Entrance";
import { HubNavigation } from "@/components/HubNavigation";
import { HubRoom } from "@/components/HubRoom";
import { TeamSection } from "@/components/TeamSection";

type Phase = "gate" | "leaving" | "nav" | "you" | "plan" | "team";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("gate");
  const entered = useRef(false);

  function enter() {
    if (entered.current) return;
    entered.current = true;
    setPhase("leaving");
    window.setTimeout(() => setPhase("nav"), 780);
  }

  return (
    <div className="relative min-h-dvh bg-black">
      {phase === "you" ? (
        <div className="hub-fade-in">
          <HubRoom active onBack={() => setPhase("nav")} />
        </div>
      ) : null}
      {phase === "plan" ? (
        <div className="hub-fade-in">
          <AnnualPlanDeck mode="page" onBack={() => setPhase("nav")} />
        </div>
      ) : null}
      {phase === "team" ? (
        <div className="hub-fade-in">
          <TeamSection mode="page" onBack={() => setPhase("nav")} />
        </div>
      ) : null}
      {phase === "nav" || phase === "leaving" ? (
        <div className={phase === "nav" ? "hub-fade-in" : undefined}>
          <HubNavigation
            inert={phase !== "nav"}
            onChooseYou={() => setPhase("you")}
            onChoosePlan={() => setPhase("plan")}
            onChooseTeam={() => setPhase("team")}
          />
        </div>
      ) : null}
      {phase === "gate" || phase === "leaving" ? (
        <Entrance exiting={phase === "leaving"} onEnter={enter} />
      ) : null}
    </div>
  );
}
