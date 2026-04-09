import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const greetings = [
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'Namaste', lang: 'English' },
  { text: 'नमस्कार', lang: 'Marathi' },
  { text: 'નમસ્તે', lang: 'Gujarati' },
];

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < greetings.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }, 400);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50 via-cream-50 to-amber-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 207, 232, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(253, 230, 138, 0.3) 0%, transparent 50%)',
          }}
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              {currentIndex < greetings.length && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-6xl md:text-8xl font-script text-pink-600"
                  style={{ fontFamily: 'Great Vibes, cursive' }}
                >
                  {greetings[currentIndex].text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}