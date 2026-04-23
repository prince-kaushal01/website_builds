import { motion, useInView } from "motion/react";
import { useRef } from "react";

import bgImage from "../../asset/5_page.jpeg";
import topFlower from "../../asset/5_top_flower.png";
import leftFlower from "../../asset/5_left_flower.png";
import rightFlower from "../../asset/5_right_flower.png";
import leftBouquet from "../../asset/5_left_bouquet.png";
import rightBouquet from "../../asset/5_right_bouquet.png";
import chairs from "../../asset/5_chairs.png";
import colour from "../../asset/5_colour.png";

const textLines = [
  {
    id: "eyebrow",
    content: "✦  You are cordially invited  ✦",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "0.75rem",
      letterSpacing: "0.3em",
      color: "black",
      fontWeight: 600,
      textShadow: "0 0 12px rgba(180,40,40,0.5)",
    },
    className: "uppercase mb-3",
  },
  {
    id: "title",
    content: "Wedding Ceremony",
    style: {
      fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
      fontSize: "2rem",
      color: "#B3385A",
      fontWeight: 700,
      lineHeight: 1.1,
      textShadow: "0 2px 20px rgba(180,30,30,0.4), 0 0 40px rgba(220,80,40,0.2)",
    },
    className: "mb-4",
  },
  
  {
    id: "date",
    content: "22nd December, 2026",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.3rem",
      color: "black",
      fontWeight: 500,
      letterSpacing: "0.05em",
      textShadow: "0 1px 8px rgba(180,40,40,0.4)",
    },
    className: "mb-1",
  },
  {
    id: "time",
    content: "10 : 00 AM",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "black",
      letterSpacing: "0.2em",
    },
    className: "mb-1",
  },
  {
    id: "venue",
    content: "Royal Mandap, The Grand Palace",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "black",
    },
    className: "mb-1",
  },
  {
    id: "address",
    content: "123 Royal Avenue, Andheri West, Mumbai",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "0.9rem",
      color: "black",
      letterSpacing: "0.03em",
    },
    className: "mb-6",
  },
  {
    id: "tagline",
    content: "Two hearts, one soul, united in love",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "1.15rem",
      color: "black",
      fontStyle: "italic",
      textShadow: "0 0 10px rgba(200,60,60,0.4)",
    },
    className: "",
  },
];

export function WeddingPage() {
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

      {/* ===== COLOUR SPLASH (full width, top) ===== */}
      {/* <motion.img
        src={colour}
        className="absolute top-0 left-0 w-full z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.1 }}
      /> */}

      ===== TOP FLOWER =====
      <motion.img
        src={topFlower}
        className="absolute top-84 -translate-x-1/2 left-48 w-86 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -80, scale: 0.85 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -80, scale: 0.85 }}
        transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
      />

      {/* ===== LEFT FLOWER ===== */}
      <motion.img
        src={leftFlower}
        className="absolute bottom-56 -left-6 w-32 z-20 pointer-events-none"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
      />

      {/* ===== RIGHT FLOWER ===== */}
      <motion.img
        src={rightFlower}
        className="absolute bottom-56 right-0 w-34 z-20 pointer-events-none"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
      />

      {/* ===== LEFT BOUQUET ===== */}
      <motion.img
        src={leftBouquet}
        className="absolute bottom-20 -left-4 w-28 z-20 pointer-events-none"
        initial={{ opacity: 0, x: -120 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
        transition={{ duration: 1.2, delay: 0.55, ease: "easeOut" }}
      />

      {/* ===== RIGHT BOUQUET ===== */}
      <motion.img
        src={rightBouquet}
        className="absolute bottom-20 -right-2 w-30 z-20 pointer-events-none"
        initial={{ opacity: 0, x: 120 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
        transition={{ duration: 1.2, delay: 0.55, ease: "easeOut" }}
      />

      {/* ===== CHAIRS (bottom) ===== */}
      <motion.img
        src={chairs}
        className="absolute bottom-52 left-1/2 -translate-x-1/2 w-40 z-10 pointer-events-none"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.2, delay: 0.75, ease: "easeOut" }}
      />

      {/* ===== TEXT — top aligned, one by one ===== */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-start text-center px-6 pt-2">
        {textLines.map((line, i) => (
          <motion.div
            key={line.id}
            className={line.className}
            style={line.style}
            initial={{ opacity: 0, y: -28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -28 }}
            transition={{ duration: 0.6, delay: 0.9 + i * 0.18, ease: "easeOut" }}
          >
            {line.id === "divider" ? (
              <div className="flex items-center gap-4">
                <div className="h-px w-14 bg-red-300/60" />
                <div className="w-2 h-2 rotate-45 border border-red-300/80" />
                <div className="h-px w-14 bg-red-300/60" />
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
