import { motion, useInView, useAnimation, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";

import bgImage from "../../asset/5_page.jpeg";
import topFlower from "../../asset/5_top_flower.png";
import leftFlower from "../../asset/5_left_flower.png";
import rightFlower from "../../asset/5_right_flower.png";
import leftBouquet from "../../asset/5_left_bouquet.png";
import rightBouquet from "../../asset/5_right_bouquet.png";
import chairs from "../../asset/5_chairs.png";
import groomWalk from "../../asset/Groom_walk.png";
import colourImg from "../../asset/5_colour.png";

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
    className: "uppercase mb-3",
  },
  {
    id: "title",
    content: "Wedding Ceremony",
    style: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(1.8rem, 6.5vw, 2.5rem)",
      color: "#3D0C11",
      fontWeight: 400,
      lineHeight: 1.1,
      textShadow: "0 2px 16px rgba(61,12,17,0.2)",
    },
    className: "mb-4",
  },
  {
    id: "date",
    content: "22nd December, 2026",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.3rem",
      color: "#2d1200",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
    className: "mb-1",
  },
  {
    id: "venue",
    content: "Royal Mandap, The Grand Palace",
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1rem",
      color: "#3b1a05",
    },
    className: "mb-1",
  },
];

export function WeddingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(textRef, { margin: "-5%", once: false });
  const groomCtrl = useAnimation();

  // Scroll progress drives all decorative elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // TOP FLOWER — drops from above
  const topFlowerY = useTransform(scrollYProgress, [0.1, 0.38], [-90, 0]);
  const topFlowerOpacity = useTransform(scrollYProgress, [0, 0.23], [0, 1]);
  const topFlowerScale = useTransform(scrollYProgress, [0, 0.28], [0.82, 1]);

  // SIDE FLOWERS — slide in from edges
  const leftFlowerX = useTransform(scrollYProgress, [0.28, 0.48], [-110, 0]);
  const rightFlowerX = useTransform(scrollYProgress, [0.28, 0.48], [110, 0]);
  const sideFlowerOpacity = useTransform(scrollYProgress, [0.05, 0.28], [0, 1]);

  // BOUQUETS — slide in from edges with slight lag
  const leftBouquetX = useTransform(scrollYProgress, [0.38, 0.48], [-130, 0]);
  const rightBouquetX = useTransform(scrollYProgress, [0.38, 0.48], [130, 0]);
  const bouquetOpacity = useTransform(scrollYProgress, [0.1, 0.33], [0, 1]);

  // CHAIRS — rise from below
  const chairsY = useTransform(scrollYProgress, [0.15, 0.43], [110, 0]);
  const chairsOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);

  // // COLOUR — wipe in upwards (clipPath reveal from bottom to top)
  // const colourClip = useTransform(
  //   scrollYProgress,
  //   [0.18, 0.52],
  //   ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  // );
  // const colourOpacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);

  // GROOM — uses useAnimation for the 2-step entry + breathing loop
  const groomIsInView = useInView(containerRef, { margin: "-10%", once: false });

  useEffect(() => {
    if (groomIsInView) {
      groomCtrl.start({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      }).then(() => {
        groomCtrl.start({
          scale: [1, 1.055, 1],
          y: [0, -6, 0],
          transition: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          },
        });
      });
    } else {
      groomCtrl.stop();
      groomCtrl.set({ y: 180, opacity: 0, scale: 1 });
    }
  }, [groomIsInView, groomCtrl]);

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

      {/* TOP FLOWER — scroll-driven drop from above */}
      <motion.img
        src={topFlower}
        className="absolute top-84 -translate-x-1/2 left-48 w-86 z-20 pointer-events-none"
        style={{ y: topFlowerY, opacity: topFlowerOpacity, scale: topFlowerScale }}
      />

      {/* LEFT FLOWER — scroll-driven slide from left */}
      <motion.img
        src={leftFlower}
        className="absolute bottom-56 -left-6 w-32 z-20 pointer-events-none"
        style={{ x: leftFlowerX, opacity: sideFlowerOpacity }}
      />

      {/* RIGHT FLOWER — scroll-driven slide from right */}
      <motion.img
        src={rightFlower}
        className="absolute bottom-56 right-0 w-34 z-20 pointer-events-none"
        style={{ x: rightFlowerX, opacity: sideFlowerOpacity }}
      />

      {/* LEFT BOUQUET — scroll-driven slide from left */}
      <motion.img
        src={leftBouquet}
        className="absolute bottom-20 -left-4 w-28 z-20 pointer-events-none"
        style={{ x: leftBouquetX, opacity: bouquetOpacity }}
      />

      {/* RIGHT BOUQUET — scroll-driven slide from right */}
      <motion.img
        src={rightBouquet}
        className="absolute bottom-20 -right-2 w-30 z-20 pointer-events-none"
        style={{ x: rightBouquetX, opacity: bouquetOpacity }}
      />

      {/* COLOUR — scroll-driven upward wipe, behind everything */}
      {/* <motion.img
        src={colourImg}
        className="absolute top-18 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 0, width: "55%", clipPath: colourClip, opacity: colourOpacity, maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)" }}
      /> */}

      {/* CHAIRS — scroll-driven rise from below */}
      <motion.img
        src={chairs}
        className="absolute bottom-52 left-1/2 -translate-x-1/2 w-40 z-10 pointer-events-none"
        style={{ y: chairsY, opacity: chairsOpacity }}
      />

      {/* GROOM — entry slide-up then breathing loop */}
      <motion.img
        src={groomWalk}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-46 z-20 pointer-events-none"
        initial={{ y: 180, opacity: 0, scale: 1 }}
        animate={groomCtrl}
      />

      {/* TEXT — fires when text block enters view */}
      <div
        ref={textRef}
        className="relative z-30 mt-15 flex min-h-screen flex-col items-center justify-start text-center px-6 pt-10"
      >
        {textLines.map((line, i) => (
          <motion.div
            key={line.id}
            className={line.className}
            style={line.style}
            initial={{ opacity: 0, y: -28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -28 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {line.id === "divider" ? (
              <div className="flex items-center gap-4">
                <div className="h-px w-14 bg-red-900/50" />
                <div className="w-2 h-2 rotate-45 border border-red-900/60" />
                <div className="h-px w-14 bg-red-900/50" />
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
