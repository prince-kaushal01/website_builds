import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import bgImage from "../../asset/3_page.jpeg";
import Left_gate from "../../asset/left_m_door.jpeg";
import Right_gate from "../../asset/right_m_door.jpeg";

// ✅ NEW ASSETS
import flagRow from "../../asset/mehndi_flags.png";
import lamp from "../../asset/mehndi_lamp.png";
import camp from "../../asset/mehndi_center.png";
import curtain from "../../asset/mehndi_sit.png";
import table from "../../asset/mehndi_table.png";

const textLines = [
  {
    id: "eyebrow",
    content: "✦  You are cordially invited  ✦",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "0.75rem",
      letterSpacing: "0.3em",
      color: "#1a0a00",
      fontWeight: 600,
    },
    className: "uppercase mb-2",
  },
  {
    id: "title",
    content: "Mehndi",
    style: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
      fontSize: "4rem",
      color: "#1c0a02",
      fontWeight: 700,
      lineHeight: 1,
      textShadow: "0 2px 12px rgba(0,0,0,0.15)",
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
    content: "20th December, 2026",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.3rem",
      color: "#2d1200",
      fontWeight: 500,
      letterSpacing: "0.05em",
    },
    className: "mb-1",
  },
  {
    id: "time",
    content: "6 : 00 PM onwards",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "#3b1a05",
      letterSpacing: "0.2em",
    },
    className: "mb-1",
  },
  {
    id: "venue",
    content: "Sunset Garden, The Grand Palace",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "#3b1a05",
    },
    className: "",
  },
];

export function MehndiPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // ❗ removed once:true so animation repeats
  const isInView = useInView(containerRef, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftCurtainX = useTransform(scrollYProgress, [0.2, 0.38], ["0%", "-100%"]);
  const rightCurtainX = useTransform(scrollYProgress, [0.2, 0.38], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">

      {/* BG */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ================= TOP ELEMENTS ================= */}

      {/* FLAG ROW */}
      <motion.img
        src={flagRow}
        className="absolute top-60 left-0 w-full z-5"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* LAMP */}
      <motion.img
        src={lamp}
        className="absolute top-98 right-20 z-20 w-10"
        initial={{ x: "100%", opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* ================= CURTAINS ================= */}

      <motion.div
        className="absolute left-0 top-0 z-30 h-full w-1/2"
        style={{ x: leftCurtainX }}
      >
        <img src={Left_gate} className="h-full w-full object-cover opacity-90" />
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 z-30 h-full w-1/2"
        style={{ x: rightCurtainX }}
      >
        <img src={Right_gate} className="h-full w-full object-cover opacity-90" />
      </motion.div>

      {/* ================= BOTTOM ELEMENTS ================= */}

      {/* CAMP */}
      <motion.img
        src={camp}
        className="absolute bottom-56  w-96 z-10"
        initial={{ x: 200, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* CURTAIN */}
      <motion.img
        src={curtain}
        className="absolute bottom-0 left-0 w-full z-5"
        initial={{ y: 200 }}
        animate={isInView ? { y: 0 } : { y: 200 }}
        transition={{ duration: 1, delay: 1.1 }}
      />

      {/* TABLE */}
      <motion.img
        src={table}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 z-20"
        initial={{ y: 200, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
      />

      {/* ================= TEXT ================= */}

      <div
        ref={textRef}
        className="relative z-20 flex min-h-screen flex-col items-center justify-start text-center px-6 pt-16"
      >
        {textLines.map((line, i) => (
          <motion.div
            key={line.id}
            className={line.className}
            style={line.style}
            initial={{ opacity: 0, y: -40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.6, delay: 1.6 + i * 0.15 }}
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