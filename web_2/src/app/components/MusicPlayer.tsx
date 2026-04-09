import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import weddingSong from "../assets/weddingsong.mp3" 
import { Play, Pause } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(weddingSong);
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4.5, duration: 0.5 }}
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-40 w-16 h-16 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #f9a8d4, #ec4899, #be185d)',
        boxShadow: isPlaying
          ? '0 0 0 4px rgba(236,72,153,0.2), 0 0 24px rgba(236,72,153,0.5)'
          : '0 0 16px rgba(236,72,153,0.35)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Rotating ring when playing */}
      {isPlaying && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-pink-300"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          style={{ borderStyle: 'dashed' }}
        />
      )}

      {/* Pulse ring */}
      {isPlaying && (
        <motion.span
          className="absolute inset-0 rounded-full bg-pink-400"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0.1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
        />
      )}

      {/* Music note icon when playing, play icon when paused */}
      <motion.span
        key={isPlaying ? 'note' : 'play'}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-white text-xl select-none z-10"
        style={{ lineHeight: 1 }}
      >
        {isPlaying ? (
        <Pause className="w-6 h-6 text-white" fill="white" />
      ) : (
        <Play className="w-6 h-6 text-white ml-1" fill="white" />
      )}
      </motion.span>
    </motion.button>
  );
}