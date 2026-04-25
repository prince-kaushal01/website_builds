import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import left_hand from "../../asset/left_hand.png";
import right_hand from "../../asset/right_hand.png";
import bgImage from "../../asset/6_page.webp";

import grassLeft from "../../asset/6_left_grass.png";
import grassRight from "../../asset/6_right_grass.png";
import flowerRight from "../../asset/6_r_flower.png";
import flowerLeft from "../../asset/6_t_flower.png";

export function FinalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Text fires when text block enters view
  const isInView = useInView(textRef, { margin: "-5%", once: false });

  // Single scroll instance drives ALL decorative elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // HANDS — slide together from sides
  const leftHandX = useTransform(scrollYProgress, [0.1, 0.32], ["-100%", "0%"]);
  const rightHandX = useTransform(scrollYProgress, [0.1, 0.32], ["100%", "0%"]);

  // GRASS — rise from bottom
  const grassLeftY = useTransform(scrollYProgress, [0.1, 0.38], [110, 0]);
  const grassLeftOpacity = useTransform(scrollYProgress, [0.1, 0.33], [0, 1]);

  const grassRightY = useTransform(scrollYProgress, [0.15, 0.43], [110, 0]);
  const grassRightOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);

  // FLOWERS — slide in from edges
  const flowerRightX = useTransform(scrollYProgress, [0.2, 0.48], [110, 0]);
  const flowerRightOpacity = useTransform(scrollYProgress, [0.2, 0.43], [0, 1]);

  const flowerLeftX = useTransform(scrollYProgress, [0.25, 0.53], [-110, 0]);
  const flowerLeftOpacity = useTransform(scrollYProgress, [0.25, 0.48], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      />

      {/* HANDS — top section, hands fill width before text */}
      <div className="relative -mt-30 z-20 w-full" style={{ height: "75vw" }}>
        <motion.img
          src={left_hand}
          className="absolute"
          style={{
            x: leftHandX,
            opacity: 0.9,
            left: 0,
            top: 0,
            width: "55%",
            height: "auto",
          }}
        />
        <motion.img
          src={right_hand}
          className="absolute"
          style={{
            x: rightHandX,
            opacity: 0.8,
            right: 0,
            top: 0,
            width: "55%",
            height: "auto",
          }}
        />
      </div>

      {/* TEXT — flows below the hands */}
      <div
        ref={textRef}
        className="relative z-30  p-8  mt-15 flex flex-col items-center justify-start text-center px-6 pt-6 pb-24"
      >
        <motion.p
          className="mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            color: "#1a0a00",
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          ✦  WITH LOVE  ✦
        </motion.p>

        <motion.h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.2rem",
            color: "#3D0C11",
            lineHeight: 1.1,
            textShadow: "0 2px 12px rgba(61,12,17,0.2)",
          }}
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Kabir &amp; Diksha
        </motion.h2>

        <motion.div
          className="my-4 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="h-[1px] w-16 bg-[#3D0C11]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#3D0C11]/60" />
          <div className="h-[1px] w-16 bg-[#3D0C11]/50" />
        </motion.div>

        <motion.p
          className="mb-4 max-w-xs"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            color: "#2d1200",
            lineHeight: "1.8",
            fontStyle: "italic",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          We found love in each other's hearts, and now we're ready to start a
          beautiful journey together.
        </motion.p>

        <motion.p
          className="mb-6 max-w-xs"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.95rem",
            color: "#3b1a05",
            lineHeight: "1.7",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Your presence would mean the world to us as we exchange vows and
          celebrate our love with family and friends.
        </motion.p>
      </div>

      {/* GRASS — scroll-driven rise from bottom */}
      <motion.img
        src={grassLeft}
        className="absolute bottom-0 left-0 w-48 z-10"
        style={{ y: grassLeftY, opacity: grassLeftOpacity }}
      />

      <motion.img
        src={grassRight}
        className="absolute bottom-0 right-0 w-48 z-10"
        style={{ y: grassRightY, opacity: grassRightOpacity }}
      />

      {/* FLOWERS — scroll-driven slide from edges */}
      <motion.img
        src={flowerRight}
        className="absolute bottom-48 -right-8 w-38 z-20"
        style={{ x: flowerRightX, opacity: flowerRightOpacity }}
      />

      <motion.img
        src={flowerLeft}
        className="absolute bottom-44 left-0 w-32 z-20"
        style={{ x: flowerLeftX, opacity: flowerLeftOpacity }}
      />
    </div>
  );
}
