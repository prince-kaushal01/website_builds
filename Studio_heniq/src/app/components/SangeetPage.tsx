import { motion, useInView } from "motion/react";
import { useRef } from "react";

import bgImage from "../../asset/4_page.png";
import lightLeft from "../../asset/sangeet_l_light.png";
import lightRight from "../../asset/sangeet_r_light.png";
import lightTop from "../../asset/sangeet_light.png";
import lightMedium from "../../asset/sangeet_medium_light.png";
import shine from "../../asset/sangeet_shine.png";

const textLines = [
  {
    id: "eyebrow",
    content: "✦  You are cordially invited  ✦",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "0.75rem",
      letterSpacing: "0.3em",
      color: "#fff8e7",
      fontWeight: 600,
      textShadow: "0 0 12px rgba(255,200,80,0.6)",
    },
    className: "uppercase mb-3",
  },
  {
    id: "title",
    content: "Sangeet",
    style: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
      fontSize: "4.5rem",
      color: "#fff0c0",
      fontWeight: 700,
      lineHeight: 1,
      textShadow: "0 2px 20px rgba(255,180,0,0.5), 0 0 40px rgba(255,140,0,0.3)",
    },
    className: "mb-4",
  },
  {
    id: "divider",
    content: null,
    style: {},
    className: "mb-5",
  },
  {
    id: "date",
    content: "21st December, 2026",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.3rem",
      color: "#ffe9a0",
      fontWeight: 500,
      letterSpacing: "0.05em",
      textShadow: "0 1px 8px rgba(255,180,0,0.4)",
    },
    className: "mb-1",
  },
  {
    id: "time",
    content: "7 : 00 PM onwards",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "#ffd77a",
      letterSpacing: "0.2em",
    },
    className: "mb-1",
  },
  {
    id: "venue",
    content: "Crystal Hall, The Grand Palace",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "#ffd77a",
    },
    className: "mb-6",
  },
  {
    id: "tagline",
    content: "Join us for an evening of music, dance & celebration",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "1.1rem",
      color: "#ffe9b0",
      fontStyle: "italic",
      textShadow: "0 0 10px rgba(255,200,80,0.4)",
    },
    className: "",
  },
];

export function SangeetPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-15%", once: false });

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* ===== TOP LIGHT (center glow) ===== */}
      <motion.img
        src={lightTop}
        className="absolute top-0 w-full z-10 pointer-events-none"
        initial={{ opacity: 0, y: -60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      />

      {/* ===== LEFT LIGHT ===== */}
      <motion.img
        src={lightLeft}
        className="absolute top-0 left-0 w-56 z-10 pointer-events-none"
        initial={{ opacity: 0, x: -80 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* ===== RIGHT LIGHT ===== */}
      <motion.img
        src={lightRight}
        className="absolute top-0 right-0 w-56 z-10 pointer-events-none"
        initial={{ opacity: 0, x: 80 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* ===== MEDIUM LIGHT ===== */}
      <motion.img
        src={lightMedium}
        className="absolute bottom-54 left-[45%] -translate-x-1/2 w-72 z-10 pointer-events-none"
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={isInView ? { opacity: 0.85, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
        transition={{ duration: 1.4, delay: 0.5 }}
      />

      {/* ===== SHINE ===== */}
      <motion.img
        src={shine}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.7 }}
      />

      {/* ===== TEXT — top aligned ===== */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-start text-center px-6 pt-14">
        {textLines.map((line, i) => (
          <motion.div
            key={line.id}
            className={line.className}
            style={line.style}
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.65, delay: 0.8 + i * 0.18, ease: "easeOut" }}
          >
            {line.id === "divider" ? (
              <div className="flex items-center gap-4">
                <div className="h-px w-14 bg-yellow-300/60" />
                <div className="w-2 h-2 rotate-45 border border-yellow-300/80" />
                <div className="h-px w-14 bg-yellow-300/60" />
              </div>
            ) : (
              line.content
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
}
