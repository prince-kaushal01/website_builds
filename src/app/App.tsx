import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { VenueSection } from './components/VenueSection';
import { TimelineSection } from './components/TimelineSection';
import { InformationSection } from './components/InformationSection';
import { FallingPetals } from './components/FallingPetals';
import { MusicButton } from './components/MusicButton';

export default function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);

  const handleEnvelopeOpen = () => {
    setShowEnvelope(false);
  };

  return (
    <div className="relative min-h-screen bg-[#fdfcf9] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showEnvelope ? (
          <motion.div
            key="envelope"
            exit={{ 
              scale: 1.5,
              opacity: 0,
              rotateY: 90,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <EnvelopeIntro onOpen={handleEnvelopeOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Falling Petals Animation */}
            <FallingPetals />
            
            {/* Music Button */}
            <MusicButton />
            
            {/* Main Content Sections */}
            <HeroSection />
            <CountdownSection />
            <VenueSection />
            <TimelineSection />
            <InformationSection />
            
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
                    Priya & Raj
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c8a882]" />
                    <span className="text-2xl">💐</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c8a882]" />
                  </div>
                  <p className="font-['Cormorant'] text-lg opacity-80 mb-2">
                    December 15, 2026
                  </p>
                  <p className="font-['Cormorant'] text-sm opacity-60">
                    #PriyaRajForever
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
