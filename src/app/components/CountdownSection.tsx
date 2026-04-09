import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import bg from "../../assests/counter_bg.png";
import { ScratchCard } from "./ScratchCard";

export function CountdownSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Reveal → Stay → Disappear
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const weddingDate = new Date("2026-06-05T10:00:00").getTime();

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
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(
          0,
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        ),
        minutes: Math.max(
          0,
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        ),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-6 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div style={{ opacity, y: yText }} className="text-center mb-14">
          <h2 className="font-['Great_Vibes'] text-5xl md:text-7xl text-white mb-3">
            Countdown
          </h2>

          <p className="font-['Cormorant'] text-lg md:text-xl md:font-bold text-white">
            To The Most Special Day of Our Lives
          </p>
        </motion.div>

        <div className="mb-16">
          <ScratchCard />
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Glass Card */}
              <div className="rounded-2xl p-6 md:p-8 text-center backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:scale-105 transition duration-300">
                <motion.div
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-2">
                    {item.value.toString().padStart(2, "0")}
                  </div>

                  <div className="font-['Cormorant'] text-sm md:text-lg text-white/80 tracking-widest uppercase">
                    {item.label}
                  </div>
                </motion.div>
              </div>

              {/* Soft Glow */}
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-2xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
