import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FallingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random petals
    const petalArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (percentage)
      delay: Math.random() * 5, // Random delay
      duration: 8 + Math.random() * 4, // Random duration between 8-12s
    }));
    setPetals(petalArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-2xl md:text-3xl"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 30, Math.sin(petal.id * 2) * -30, 0],
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
  );
}
