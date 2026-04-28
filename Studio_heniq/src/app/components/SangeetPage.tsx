import { motion, useInView, useScroll, useTransform } from "motion/react";
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
      color: "white",
      fontWeight: 600,
    },
    className: "uppercase mb-3 mt-5",
  },
  {
    id: "title",
    content: "Sangeet",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(3.2rem, 11.5vw, 4.5rem)",
      color: "white",
      fontWeight: 400,
      lineHeight: 1,
      textShadow: "0 2px 20px rgba(255,200,100,0.35), 0 0 40px rgba(255,160,0,0.2)",
    },
    className: "",
  },
  {
    id: "divider",
    content: null,
    style: {},
    className: "",
  },
  {
    id: "date",
    content: "21st December, 2026",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.3rem",
      color: "white",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
    className: "mb-1",
  },
  {
    id: "venue",
    content: "Crystal Hall, The Grand Palace",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "white",
    },
    className: "mb-6",
  },
];

export function SangeetPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Text fires when text block is in view
  const isInView = useInView(textRef, { margin: "-5%", once: false });

  // Scroll progress drives all lighting elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // TOP LIGHT — drops down from above
  const lightTopY = useTransform(scrollYProgress, [0, 0.28], [-70, 0]);
  const lightTopOpacity = useTransform(scrollYProgress, [0, 0.23], [0, 1]);

  // LEFT & RIGHT LIGHTS — slide in from sides
  const lightLeftX = useTransform(scrollYProgress, [0.05, 0.33], [-90, 0]);
  const lightRightX = useTransform(scrollYProgress, [0.05, 0.33], [90, 0]);
  const sidesOpacity = useTransform(scrollYProgress, [0.05, 0.28], [0, 1]);

  // MEDIUM LIGHT — expands in from center
  const mediumScaleX = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1]);
  const mediumOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 0.85]);

  // SHINE OVERLAY — fades in
  const shineOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 0.6]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* TOP LIGHT — scroll-driven drop from above */}
      <motion.img
        src={lightTop}
        className="absolute top-0 w-full z-10 pointer-events-none"
        style={{ y: lightTopY, opacity: lightTopOpacity }}
      />

      {/* LEFT LIGHT — scroll-driven slide from left */}
      <motion.img
        src={lightLeft}
        className="absolute top-0 left-0 w-56 z-10 pointer-events-none"
        style={{ x: lightLeftX, opacity: sidesOpacity }}
      />

      {/* RIGHT LIGHT — scroll-driven slide from right */}
      <motion.img
        src={lightRight}
        className="absolute top-0 right-0 w-56 z-10 pointer-events-none"
        style={{ x: lightRightX, opacity: sidesOpacity }}
      />

      {/* MEDIUM LIGHT — scroll-driven expand */}
      <motion.img
        src={lightMedium}
        className="absolute bottom-54 left-[45%] -translate-x-1/2 w-72 z-10 pointer-events-none"
        style={{ opacity: mediumOpacity, scaleX: mediumScaleX }}
      />

      {/* SHINE OVERLAY — scroll-driven fade in */}
      <motion.img
        src={shine}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full z-10 pointer-events-none"
        style={{ opacity: shineOpacity }}
      />

      {/* TEXT — fires when text block enters view */}
      <div
        ref={textRef}
        className="relative z-20 flex min-h-screen flex-col items-center justify-start text-center px-6 pt-10"
      >
        {textLines.map((line, i) => (
          <motion.div
            key={line.id}
            className={line.className}
            style={line.style}
            initial={{ opacity: 0, y: -32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -32 }}
            transition={{ duration: 0.65, delay: 0.3 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
          >
            {line.id === "divider" ? (
              <div className="flex items-center gap-4">
                <div className="h-px w-14 bg-amber-900/50" />
                <div className="w-2 h-2 rotate-45 border border-amber-900/60" />
                <div className="h-px w-14 bg-amber-900/50" />
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
