import { motion } from "motion/react";

import bird1 from "../../asset/left_bird.png";
import bird2 from "../../asset/right_bird.png";
import peacock from "../../asset/main_peacock.png";
import bgImage from "../../asset/1_page.jpeg";
import boat from "../../asset/main_boat.png";
import flowers from "../../asset/main_flower.png";
import tomb from "../../asset/main_tomb.png";
import sign from "../../asset/main_sign.png";

interface HomePageProps {
  gateOpen?: boolean;
}

export function HomePage({ gateOpen = false }: HomePageProps) {

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
    >
      {/* FULL BG FIX */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bird 1 (Left → Right) */}
      <motion.img
        src={bird1}
        className="absolute z-20"
        style={{ top: "20%", left: 0, height: "40px" }}
        initial={{ x: -150, opacity: 0 }}
        animate={
          gateOpen
            ? { x: window.innerWidth + 200, opacity: [0, 1, 1, 0] }
            : {}
        }
        transition={{
          duration: 8,
          delay: 0.5,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 4,
        }}
      />

      {/* Bird 2 (Right → Left) */}
      <motion.img
        src={bird2}
        className="absolute z-20"
        style={{ top: "30%", right: 0, height: "50px" }}
        initial={{ x: 150, opacity: 0 }}
        animate={
          gateOpen
            ? { x: -(window.innerWidth + 200), opacity: [0, 1, 1, 0] }
            : {}
        }
        transition={{
          duration: 10,
          delay: 1.5,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />

      {/* Peacock Animation (RIGHT → CENTER) */}
      <motion.img
        src={peacock}
        className="absolute z-20"
        style={{
          bottom: 220,
          right: -20,
          height: "120px",
        }}
        initial={{ x: "120%", opacity: 0 }}
        animate={gateOpen ? { x: "0%", opacity: 1 } : {}}
        transition={{
          duration: 4.5,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* boat */}
      <motion.img
        src={boat}
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          height: "180px",
        }}
        initial={{ y: "120%", opacity: 0 }}
        animate={gateOpen ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 5.5,
          delay: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* flowers */}
      <motion.img
        src={flowers}
        className="absolute"
        style={{
          bottom: -15,
          left: 120,
          height: "190px",
        }}
        initial={{ y: "120%", opacity: 0 }}
        animate={gateOpen ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 6.5,
          delay: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* tomb */}
      <motion.img
        src={tomb}
        className="absolute z-10"
        style={{
          bottom: 295,
          left: 0,
          height: "300px",
        }}
        initial={{ x: "-120%", opacity: 0 }}
        animate={gateOpen ? { x: "0%", opacity: 1 } : {}}
        transition={{
          duration: 6.5,
          delay: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* sign */}
      <motion.img
        src={sign}
        className="absolute z-10"
        style={{
          bottom: 270,
          left: 15,
          height: "110px",
        }}
        initial={{ x: "-120%", opacity: 0 }}
        animate={gateOpen ? { x: "0%", opacity: 1 } : {}}
        transition={{
          duration: 6.5,
          delay: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* TEXT CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start text-center px-6 pt-12">
        <motion.h2
            className="font-['Great_Vibes'] text-4xl text-[#b3385a] drop-shadow-lg"
          >
            Kabir
          </motion.h2>

          <motion.h3
            className="font-['Great_Vibes'] text-3xl text-black "
          >
            &
          </motion.h3>

          <motion.h1
            className="font-['Great_Vibes'] text-4xl text-[#b3385a] drop-shadow-lg"
          >
            Diksha
          </motion.h1>

        {/* Divider */}
        <motion.div
          className="my-5 flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={gateOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="h-[1px] w-16 bg-yellow-200" />
          <div className="w-3 h-3 rotate-45 border-2 border-yellow-300" />
          <div className="h-[1px] w-16 bg-yellow-200" />
        </motion.div>

        <motion.p
          className="mb-2 text-yellow-100"
          initial={{ opacity: 0, y: 30 }}
          animate={gateOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
        >
          22nd December, 2026
        </motion.p>

        <motion.p
          className="text-yellow-200 max-w-xs"
          initial={{ opacity: 0, y: 30 }}
          animate={gateOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3 }}
        >
          The Grand Palace, Mumbai
          <br />
          123 Royal Avenue, Andheri West
        </motion.p>
      </div>
    </div>
  );
}
