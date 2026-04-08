import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function CountdownSection() {
  const weddingDate = new Date('2026-12-15T10:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-[#c8d5b9] via-[#a8bfa2] to-[#c8d5b9] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10">🌸</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10">🌸</div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-white mb-4">
            Countdown to Forever
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full" />
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/50">
                <motion.div
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-[#3e3935] mb-2">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="font-['Cormorant'] text-lg md:text-xl text-[#3e3935]/70 uppercase tracking-wider">
                    {item.label}
                  </div>
                </motion.div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c8a882]/20 to-transparent rounded-2xl blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
