import { motion, AnimatePresence } from 'motion/react';
import { Music, Pause, Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden audio element - using a placeholder since we don't have actual audio */}
      <audio ref={audioRef} loop>
        {/* In a real implementation, add your audio source here */}
        {/* <source src="/path-to-your-music.mp3" type="audio/mpeg" /> */}
      </audio>

      {/* Music Button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={toggleMusic}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#c8a882] to-[#b8986a] text-white shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 4px 20px rgba(200, 168, 130, 0.3)',
              '0 4px 30px rgba(200, 168, 130, 0.5)',
              '0 4px 20px rgba(200, 168, 130, 0.3)',
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity },
          }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Pause className="w-6 h-6" fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ripple effect when playing */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#c8a882]"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#c8a882]"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
              />
            </>
          )}
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-[#3e3935] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-['Cormorant'] relative">
                Play Music
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#3e3935]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
