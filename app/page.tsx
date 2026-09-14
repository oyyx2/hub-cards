"use client";

import { useState } from "react";
import { Entrance } from "@/components/Entrance";
import { HubRoom } from "@/components/HubRoom";

export default function Home() {
  const [phase, setPhase] = useState<"gate" | "leaving" | "inside">("gate");

  return (
    <div className="relative min-h-dvh bg-black">
      <HubRoom active={phase === "inside"} />
      {phase !== "inside" ? (
        <Entrance
          exiting={phase === "leaving"}
          onEnter={() => {
            if (phase !== "gate") return;
            setPhase("leaving");
            window.setTimeout(() => setPhase("inside"), 780);
          }}
        />
      ) : null}
    </div>
  );
}
