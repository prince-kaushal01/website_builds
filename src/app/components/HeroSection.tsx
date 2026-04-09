import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import heroImage from "../../assests/background.jpeg";
import land_bg from "../../assests/land_bg.jpeg";
import groom from "../../assests/Groom.png";
import video from "../../assests/marriage_view.mp4";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
            style={{ left: `${petal.x}%`, top: "-5%" }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [0, 360],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* 🖥️ Desktop Background */}
      <motion.div style={{ y }} className="hidden md:block relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={video} type="video/mp4" />
        </video>
        {/* Wedding Text */}
        <motion.div
          style={{ opacity, y: yText }}
          className="absolute top-22 left-1/2 -translate-x-1/2 text-center z-20"
        >
          <h2 className="font-['Great_Vibes'] text-6xl text-white drop-shadow-lg">
            Kabir
          </h2>

          <h3 className="font-['Great_Vibes'] text-4xl text-[#e8c873] my-2">
            &
          </h3>

          <h1 className="font-['Great_Vibes'] text-7xl text-white drop-shadow-lg">
            Diksha
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-4 z-20">
            <div className="h-[2px] w-24 bg-white" />
            <span className="text-[#e8c873] text-2xl">✦</span>
            <div className="h-[2px] w-24 bg-white" />
          </div>

          {/* Date */}
          <p className="font-['Playfair_Display'] text-2xl text-white tracking-wide z-20">
            05<sup>th</sup> June 2026
          </p>
        </motion.div>

        {/* Groom Image (Bottom Center with animation) */}
        <motion.img
          src={groom}
          alt="Couple"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 object-contain z-30"
          animate={{
            scale: [1, 1.04, 1],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 📱 Mobile Background (FIXED) */}
      <div className="md:hidden relative w-full h-screen overflow-hidden">
        {/* Background */}
        <video
          autoPlay
          muted
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={video} type="video/mp4" />
        </video>
        {/* Wedding Text */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <h2 className="font-['Great_Vibes'] text-4xl text-white drop-shadow-lg">
            Kabir
          </h2>

          <h3 className="font-['Great_Vibes'] text-3xl text-[#e8c873] my-1">
            &
          </h3>

          <h1 className="font-['Great_Vibes'] text-5xl text-white drop-shadow-lg">
            Diksha
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-3 z-20">
            <div className="h-[2px] w-18 bg-white" />
            <span className="text-[#e8c873] text-xl">✦</span>
            <div className="h-[2px] w-18 bg-white" />
          </div>

          {/* Date */}
          <p className="font-['Playfair_Display'] text-2xl text-white tracking-wide">
            5<sup>th</sup> June 2026
          </p>
        </div>

        {/* Bottom Center Groom/Couple */}
        <motion.img
          src={groom}
          alt="Couple"
          className="absolute bottom-0 left-[52%] -translate-x-1/2 w-64 object-contain z-30"
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
