"use client";

import { useState } from "react";
import { Entrance } from "@/components/Entrance";
import { HubRoom } from "@/components/HubRoom";

export default function Home() {
  const [phase, setPhase] = useState<"gate" | "leaving" | "inside">("gate");

  function enter() {
    if (phase !== "gate") return;
    setPhase("leaving");
    window.setTimeout(() => setPhase("inside"), 780);
  }

  return (
    <div className="relative min-h-dvh bg-black">
      {phase !== "gate" ? <HubRoom active={phase === "inside"} /> : null}
      {phase !== "inside" ? (
        <Entrance exiting={phase === "leaving"} onEnter={enter} />
      ) : null}
    </div>
  );
}
