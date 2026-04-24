import { motion, useInView } from "motion/react";
import { useRef } from "react";

import peacock from "../../asset/main_peacock.png";
import bgImage from "../../asset/1_page.jpeg";
import boat from "../../asset/main_boat.png";
import flowers from "../../asset/main_flower.png";
import tomb from "../../asset/main_tomb.png";
import sign from "../../asset/main_sign.png";

interface HomePageProps {
  gateOpen?: boolean;
}

function FlappingBird({
  width = 80,
  speed = 0.55,
  delay = 0,
  facingLeft = false,
}: {
  width?: number;
  speed?: number;
  delay?: number;
  facingLeft?: boolean;
}) {
  const h     = width * 0.55;
  const color = "#354573";

  return (
    <svg
      viewBox="0 0 100 55"
      width={width}
      height={h}
      style={{ overflow: "visible", transform: facingLeft ? "scaleX(-1)" : undefined }}
    >
      <motion.path
        fill={color}
        animate={{ d: [
          "M50,30 C42,22 26,12 5,16 C18,22 34,27 50,30 Z",
          "M50,30 C42,32 26,34 5,30 C18,31 34,31 50,30 Z",
          "M50,30 C42,38 26,46 5,42 C18,39 34,35 50,30 Z",
          "M50,30 C42,32 26,34 5,30 C18,31 34,31 50,30 Z",
          "M50,30 C42,22 26,12 5,16 C18,22 34,27 50,30 Z",
        ]}}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      <motion.path
        fill={color}
        animate={{ d: [
          "M50,30 C58,22 74,12 95,16 C82,22 66,27 50,30 Z",
          "M50,30 C58,32 74,34 95,30 C82,31 66,31 50,30 Z",
          "M50,30 C58,38 74,46 95,42 C82,39 66,35 50,30 Z",
          "M50,30 C58,32 74,34 95,30 C82,31 66,31 50,30 Z",
          "M50,30 C58,22 74,12 95,16 C82,22 66,27 50,30 Z",
        ]}}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      <ellipse cx="50" cy="30" rx="9"   ry="4.5" fill={color} />
      <circle  cx="58" cy="27.5" r="4.5" fill={color} />
      <path d="M62,27 L70,29 L62,31" fill="#4a3a28" />
      <circle cx="60"   cy="27" r="1.2" fill="white" />
      <circle cx="60.4" cy="27" r="0.6" fill="#111"  />
      <path d="M41,30 C35,27 28,23 24,26 C28,29 35,31 41,30 Z" fill={color} />
      <path d="M41,31 C35,34 28,38 24,35 C28,33 35,32 41,31 Z" fill={color} opacity="0.8" />
    </svg>
  );
}

export function HomePage({ gateOpen = false }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Single isInView drives ALL elements — text AND decoratives
  const isInView = useInView(containerRef, { margin: "-5%", once: false });

  // Entry transition — smooth, staggered
  const entry = (delay = 0) => ({
    duration: 1.1,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  });
  // Exit transition — quick drop
  const exitT = { duration: 0.45, ease: "easeIn" as const };

  const show = gateOpen && isInView;

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Bird 1 — Left → Right ── */}
      <motion.div
        className="absolute z-20"
        style={{ top: "18%", left: 0 }}
        initial={{ x: -140, opacity: 0 }}
        animate={show ? { x: window.innerWidth + 160, opacity: [0, 1, 1, 0] } : { opacity: 0, x: -140 }}
        transition={show
          ? { duration: 10, delay: 0.5, ease: "linear", repeat: Infinity, repeatDelay: 5 }
          : exitT}
      >
        <FlappingBird width={64} speed={0.52} facingLeft={false} />
      </motion.div>

      {/* ── Bird 2 — slightly higher, same direction ── */}
      <motion.div
        className="absolute z-20"
        style={{ top: "10%", left: 0 }}
        initial={{ x: -180, opacity: 0 }}
        animate={show ? { x: window.innerWidth + 160, opacity: [0, 1, 1, 0] } : { opacity: 0, x: -180 }}
        transition={show
          ? { duration: 10, delay: 3, ease: "linear", repeat: Infinity, repeatDelay: 8 }
          : exitT}
      >
        <FlappingBird width={64} speed={0.62} delay={0.1} facingLeft={false} />
      </motion.div>

      {/* ── Bird 3 — Right → Left ── */}
      <motion.div
        className="absolute z-20"
        style={{ top: "30%", right: 0 }}
        initial={{ x: 140, opacity: 0 }}
        animate={show ? { x: -(window.innerWidth + 160), opacity: [0, 1, 1, 0] } : { opacity: 0, x: 140 }}
        transition={show
          ? { duration: 12, delay: 2.5, ease: "linear", repeat: Infinity, repeatDelay: 7 }
          : exitT}
      >
        <FlappingBird width={78} speed={0.56} delay={0.1} facingLeft={true} />
      </motion.div>

      {/* ── Peacock — entry from right, exit down ── */}
      <motion.img
        src={peacock}
        className="absolute z-20"
        style={{ bottom: 220, right: -20, height: "120px" }}
        initial={{ x: "120%", opacity: 0, y: 0 }}
        animate={show
          ? { x: "0%", opacity: 1, y: 0 }
          : gateOpen ? { y: 180, opacity: 0 } : { x: "120%", opacity: 0, y: 0 }}
        transition={show ? entry(0.3) : exitT}
      />

      {/* ── Boat — entry from bottom, exit down ── */}
      <motion.img
        src={boat}
        className="absolute"
        style={{ bottom: 0, left: 0, height: "180px" }}
        initial={{ y: "120%", opacity: 0 }}
        animate={show
          ? { y: "0%", opacity: 1 }
          : { y: "120%", opacity: 0 }}
        transition={show ? entry(0.6) : exitT}
      />

      {/* ── Flowers — entry from bottom, exit down ── */}
      <motion.img
        src={flowers}
        className="absolute"
        style={{ bottom: -15, left: 120, height: "190px" }}
        initial={{ y: "120%", opacity: 0 }}
        animate={show
          ? { y: "0%", opacity: 1 }
          : { y: "120%", opacity: 0 }}
        transition={show ? entry(0.9) : exitT}
      />

      {/* ── Tomb — entry from left, exit down ── */}
      <img
  src={tomb}
  className="absolute z-10"
  style={{ bottom: 295, left: 0, height: "300px" }}
/>

      {/* ── Sign — entry from left, exit down ── */}
      <motion.img
        src={sign}
        className="absolute z-10"
        style={{ bottom: 270, left: 15, height: "110px" }}
        initial={{ x: "-120%", opacity: 0, y: 0 }}
        animate={show
          ? { x: "0%", opacity: 1, y: 0 }
          : gateOpen ? { y: 200, opacity: 0 } : { x: "-120%", opacity: 0, y: 0 }}
        transition={show ? entry(1.5) : exitT}
      />

      {/* ── Text — drops down on exit ── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start text-center px-6 pt-10">

        <motion.h2
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", color: "#3D0C11", lineHeight: 1.1, textShadow: "0 2px 12px rgba(61,12,17,0.25)" }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={isInView ? { duration: 0.8, delay: 0.3, ease: "easeOut" } : exitT}
        >
          Kabir
        </motion.h2>

        <motion.h3
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", color: "#3D0C11", lineHeight: 1 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={isInView ? { duration: 0.7, delay: 0.5, ease: "easeOut" } : exitT}
        >
          &amp;
        </motion.h3>

        <motion.h1
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", color: "#3D0C11", lineHeight: 1.1, textShadow: "0 2px 12px rgba(61,12,17,0.25)" }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={isInView ? { duration: 0.8, delay: 0.7, ease: "easeOut" } : exitT}
        >
          Diksha
        </motion.h1>

        <motion.div
          className="my-4 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={isInView ? { duration: 0.7, delay: 0.9 } : exitT}
        >
          <div className="h-[1px] w-16 bg-[#3D0C11]/60" />
          <div className="w-3 h-3 rotate-45 border-2 border-[#3D0C11]/70" />
          <div className="h-[1px] w-16 bg-[#3D0C11]/60" />
        </motion.div>

        <motion.p
          className="mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#2d1200", fontWeight: 600, letterSpacing: "0.06em" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={isInView ? { duration: 0.8, delay: 1.1, ease: "easeOut" } : exitT}
        >
          22nd December, 2026
        </motion.p>

        <motion.p
          className="max-w-xs"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#3b1a05", lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={isInView ? { duration: 0.8, delay: 1.3, ease: "easeOut" } : exitT}
        >
          The Grand Palace, Mumbai
          <br />
          123 Royal Avenue, Andheri West
        </motion.p>
      </div>
    </div>
  );
}
