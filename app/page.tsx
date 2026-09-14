"use client";

import { useRef, useState } from "react";
import { Entrance } from "@/components/Entrance";
import { HubRoom } from "@/components/HubRoom";

export default function Home() {
  const [phase, setPhase] = useState<"gate" | "leaving" | "inside">("gate");
  const entered = useRef(false);

  function enter() {
    if (entered.current) return;
    entered.current = true;
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
