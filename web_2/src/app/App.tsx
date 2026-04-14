import { useState } from "react";
import { MusicAutoPlay } from "./components/MusicPlayer";
import { HeroSection } from "./components/HeroSection";
import { ScratchCard } from "./components/ScratchCard";
import { FamilySection } from "./components/FamilySection";
import { VenueSection } from "./components/VenueSection";
import { motion, AnimatePresence } from "motion/react";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import Mehndi from "./components/Mehndi";
import Sangeet from "./components/Sangeet";
import Wedding from "./components/Wedding";
import Reception from "./components/Reception";
import Cocktail from "./components/Cocktail";

function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);

  const handleEnvelopeOpen = () => {
    setShowEnvelope(false);
  };

  return (
    <div className="relative min-h-screen bg-[#fdfcf9] overflow-x-hidden">
      <AnimatePresence mode="wait">
  {showEnvelope ? (
    <motion.div key="envelope">
      <EnvelopeIntro onOpen={handleEnvelopeOpen} />
    </motion.div>
  ) : (
    <motion.div
      key="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
            <MusicAutoPlay />
            <HeroSection /> 
            <ScratchCard />
            <Mehndi />
            <Sangeet />
            <Wedding/>
            <Reception />
            <Cocktail />
            <FamilySection />
            <VenueSection />
            {/* Footer */}
            <footer className="py-12 px-6 bg-gradient-to-br from-[#3e3935] to-[#2a2725] text-white">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="font-['Great_Vibes'] text-4xl mb-4">
                    Kabir & Diksha
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c8a882]" />
                    <span className="text-2xl">💐</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c8a882]" />
                  </div>
                  <p className="font-['Cormorant'] text-lg opacity-80 mb-2">
                    June 05, 2026
                  </p>
                  <p className="font-['Cormorant'] text-sm opacity-60">
                    #KabirDikshaForever
                  </p>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
