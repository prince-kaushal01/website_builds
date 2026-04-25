import { motion, useInView, useAnimation } from "motion/react";
import { useRef, useEffect } from "react";

import peacock from "../../asset/main_peacock.png";
import bgImage from "../../asset/1_page.jpeg";
import boat from "../../asset/main_boat.png";
import flowers from "../../asset/main_flower.png";
import tomb from "../../asset/main_tomb.png";
import sign from "../../asset/main_sign.png";
import petalImg from "../../asset/petal.jpg";
import birdsVideo from "../../asset/Birds animatio.webm";

interface HomePageProps {
  gateOpen?: boolean;
}

const HOME_PETALS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 5.23 + 3.7) % 100,
  delay: 1.5 + (i * 0.31) % 3.5,
  duration: 6.5 + (i * 0.47) % 3.5,
  rotation: (i * 73) % 360,
  drift: ((i * 37) % 80) - 40,
  size: 8 + (i * 3) % 8,
}));

const HOME_PETAL_CSS = `
${HOME_PETALS.map(
  (p) => `
  @keyframes home-petal-fall-${p.id} {
    0%   { transform: translateY(-50px) translateX(0px) rotate(${p.rotation}deg); opacity: 0; }
    8%   { opacity: 0.8; }
    90%  { opacity: 0.7; }
    100% { transform: translateY(calc(100vh + 60px)) translateX(${p.drift}px) rotate(${p.rotation + 320}deg); opacity: 0; }
  }`,
).join("")}
`;


export function HomePage({ gateOpen = false }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  const peacockCtrl = useAnimation();

  useEffect(() => {
    if (show) {
      peacockCtrl.start({
        x: "0%", opacity: 1, y: 0, scale: 1,
        transition: { duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      }).then(() => {
        peacockCtrl.start({
          y: [0, -8, 0],
          scale: [1, 1.04, 1],
          transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" as const },
        });
      });
    } else {
      peacockCtrl.stop();
      if (gateOpen) {
        peacockCtrl.start({ y: 180, opacity: 0, x: "0%", scale: 1, transition: { duration: 0.45, ease: "easeIn" as const } });
      } else {
        peacockCtrl.set({ x: "120%", opacity: 0, y: 0, scale: 1 });
      }
    }
  }, [show, gateOpen, peacockCtrl]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "home-petal-keyframes";
    tag.textContent = HOME_PETAL_CSS;
    document.head.appendChild(tag);
    return () => { document.getElementById("home-petal-keyframes")?.remove(); };
  }, []);

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

      {/* ── Birds Video ── */}
      <motion.video
        ref={videoRef}
        src={birdsVideo}
        className="absolute z-20 w-full pointer-events-none"
        style={{ top: "5%", left: 0, height: "45%", objectFit: "cover", mixBlendMode: "multiply" }}
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={show ? { duration: 1.2, ease: "easeOut" } : exitT}
      />

      {/* ── Peacock — entry from right, then gentle bob ── */}
      <motion.img
        src={peacock}
        className="absolute z-20"
        style={{ bottom: 220, right: -20, height: "120px" }}
        initial={{ x: "120%", opacity: 0, y: 0 }}
        animate={peacockCtrl}
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
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#3D0C11", lineHeight: 1.1, textShadow: "0 2px 12px rgba(61,12,17,0.25)" }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={isInView ? { duration: 0.8, delay: 0.3, ease: "easeOut" } : exitT}
        >
          Kabir
        </motion.h2>

        <motion.h3
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", color: "#3D0C11", lineHeight: 1 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={isInView ? { duration: 0.7, delay: 0.5, ease: "easeOut" } : exitT}
        >
          &amp;
        </motion.h3>

        <motion.h1
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#3D0C11", lineHeight: 1.1, textShadow: "0 2px 12px rgba(61,12,17,0.25)" }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={isInView ? { duration: 0.8, delay: 0.7, ease: "easeOut" } : exitT}
        >
          Diksha
        </motion.h1>

        {/* <motion.div
          className="my-4 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={isInView ? { duration: 0.7, delay: 0.9 } : exitT}
        >
          <div className="h-[1px] w-16 bg-[#3D0C11]/60" />
          <div className="w-3 h-3 rotate-45 border-2 border-[#3D0C11]/70" />
          <div className="h-[1px] w-16 bg-[#3D0C11]/60" />
        </motion.div> */}

        <motion.p
          className="mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#2d1200", fontWeight: 600, letterSpacing: "0.06em" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={isInView ? { duration: 0.8, delay: 1.1, ease: "easeOut" } : exitT}
        >
          22nd DECEMBER, 2026
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
