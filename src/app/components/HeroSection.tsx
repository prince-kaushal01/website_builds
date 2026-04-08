import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import heroImage from '../../assests/background.jpeg';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const [petals, setPetals] = useState<
    Array<{ id: number; x: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const petalArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setPetals(petalArray);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">

      {/* 🌸 Falling Petals */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute text-2xl"
            style={{ left: `${petal.x}%`, top: '-5%' }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* 🖥️ Desktop Background */}
      <motion.div
        style={{ y }}
        className="absolute hidden md:block"
      >
        <img
          src={heroImage}
          className="w-full h-screen object-cover"
        />
      </motion.div>

      {/* 📱 Mobile Background (FIXED) */}
      <div className="md:hidden">
        <img
          src={heroImage}
          className="w-full h-screen object-cover"
        />
        
      </div>

    </div>
  );
}