import { useState } from "react";
import { IntroGate } from "./components/IntroGate";
import { HomePage } from "./components/HomePage";
import { ScratchCard } from "./components/ScratchCard";
import { MehndiPage } from "./components/MehndiPage";
import { SangeetPage } from "./components/SangeetPage";
import { WeddingPage } from "./components/WeddingPage";
import { FinalPage } from "./components/FinalPage";

export default function App() {
  const [showGate, setShowGate] = useState(true);
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <HomePage gateOpen={gateOpen} />
        <ScratchCard />
        <MehndiPage />
        <SangeetPage />
        <WeddingPage />
        <FinalPage />
      </div>

      {showGate && (
        <IntroGate
          onOpen={() => setGateOpen(true)}
          onComplete={() => setShowGate(false)}
        />
      )}
    </div>
  );
}