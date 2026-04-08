import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1575460092884-a33643ca4b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYWxhY2UlMjByZWZsZWN0aW9uJTIwd2F0ZXJ8ZW58MXx8fHwxNzc1NjQ4MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfcf9]/60 to-[#fdfcf9]" />
        
        {/* Animated water reflection effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#c8d5b9]/20 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        {/* Couple Image with Breathing Effect */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8a882]/30 to-[#a8bfa2]/30 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1766763845239-1ff0ec3699a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFzaWFuJTIwY291cGxlJTIwd2VkZGluZyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3NTY0ODE0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Couple"
              className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Names with Staggered Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="space-y-4"
        >
          <h1 className="font-['Great_Vibes'] text-6xl md:text-8xl text-[#3e3935] drop-shadow-sm">
            Priya & Raj
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#c8a882]" />
            <p className="font-['Cormorant'] text-xl md:text-2xl text-[#3e3935] italic">
              are getting married
            </p>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#c8a882]" />
          </motion.div>
        </motion.div>

        {/* Date and Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 space-y-2"
        >
          <p className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#3e3935]">
            December 15, 2026
          </p>
          <p className="font-['Cormorant'] text-lg md:text-xl text-[#3e3935]/80">
            Mumbai, India
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.8, duration: 1 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="font-['Cormorant'] text-sm text-[#3e3935]/60">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-[#c8a882] rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-[#c8a882] rounded-full" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
