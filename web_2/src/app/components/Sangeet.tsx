import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

import sangeet from "../../assests/bg-m-sangeet2.jpeg";

// assets
import lights from "../../assests/lightdesign.png";
import disco1 from "../../assests/disco1.png";
import lamp from "../../assests/lamp.png";
import lamp2 from "../../assests/side_disco.png";
import desktopBg from "../../assests/bg-d-sangeet2.jpeg";

export default function Sangeet() {
  const { ref: desktopRef, isInView: desktopInView } = useInView();
  const { ref: mobileRef, isInView: mobileInView } = useInView();

  return (
    <>
      <section
        ref={desktopRef}
        className="hidden md:flex h-screen w-full justify-center items-center relative overflow-hidden z-10"
        style={{
          backgroundImage: `url(${desktopBg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        {/* ================= LIGHTS (TOP DROP) ================= */}
        <motion.img
          src={lights}
          className="absolute -top-20 left-0 w-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* ================= DISCO BALLS ================= */}
        <motion.img
          src={disco1}
          className="absolute top-26 left-10 w-16"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.img
          src={disco1}
          className="absolute top-60 left-40 w-16"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.img
          src={disco1}
          className="absolute top-28 left-[460px] w-24"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />

        <motion.img
          src={disco1}
          className="absolute top-40 right-62 w-24"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.img
          src={disco1}
          className="absolute top-30 right-14 w-16"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* EXTRA DISCO (optional for richness) */}
        <motion.img
          src={disco1}
          className="absolute top-32 right-[470px] w-20"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        />

        {/* ================= LAMPS ================= */}
        <motion.img
          src={lamp2}
          className="absolute left-0 bottom-28 w-64"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.img
          src={lamp2}
          className="absolute left-48 bottom-16 w-64 "
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <motion.img
          src={lamp}
          className="absolute right-6 bottom-16 w-20 z-0"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.img
          src={lamp}
          className="absolute right-24 bottom-16 w-24 z-0"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* ================= TEXT ================= */}
        <div className="text-center max-w-xs">
          <motion.h2
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-6xl mb-4 "
            style={{ fontFamily: "Great Vibes", color: "white" }}
          >
            Sangeet
          </motion.h2>

          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="font-semibold mb-6 text-xl"
            style={{ fontFamily: "Cormorant", color: "white" }}
          >
            A playful night of sangeet and cultural festivities
          </motion.p>

          <motion.div
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-white font-['Cormorant']"
          >
            <p className="text-xl font-semibold">WED</p>
            <p className="text-xl font-semibold">
              June{" "}
              <span className="text-white text-2xl font-['Great Vibes']">
                4
              </span>{" "}
              2026
            </p>
            <p className="text-xl font-semibold">07:30 PM onwards</p>
            <p className="text-xl font-semibold mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-xl font-semibold text-white font-['Cormorant']">
            Dress code
          </p>
          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-[15px] font-semibold px-4 text-white font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>

      <section
        ref={mobileRef}
        className="md:hidden h-screen w-full flex justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${sangeet})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= LIGHTS (TOP DROP ANIMATION) ================= */}
        <motion.img
          src={lights}
          className="absolute top-0 left-0 w-full"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* ================= DISCO BALLS ================= */}
        <motion.img
          src={disco1}
          className="absolute top-32 left-0 w-16"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.img
          src={disco1}
          className="absolute top-10 left-28 -translate-x-1/2 w-16"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />

        <motion.img
          src={disco1}
          className="absolute top-24 right-6 w-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.img
          src={disco1}
          className="absolute top-4 right-32 w-14"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* ================= LAMPS ================= */}
        <motion.img
          src={lamp}
          className="absolute right-4 top-1/2 w-20"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.img
          src={lamp}
          className="absolute right-28 bottom-40 w-16"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <motion.img
          src={lamp2}
          className="absolute -left-12 bottom-40 w-60"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* ================= TEXT BOX ================= */}
        <div className="text-center max-w-xs">
          <motion.h2
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "white" }}
          >
            Sangeet
          </motion.h2>

          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="text-base mb-6"
            style={{ fontFamily: "Cormorant", color: "white" }}
          >
            A playful night of sangeet and cultural festivities
          </motion.p>

          <motion.div
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-white font-['Cormorant']"
          >
            <p className="text-lg">WED</p>
            <p className="text-lg">
              June{" "}
              <span className="text-white text-2xl font-['Great Vibes']">
                4
              </span>{" "}
              2026
            </p>
            <p className="text-lg">7:30 PM onwards</p>
            <p className="text-lg mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-lg text-white font-['Cormorant']">Dress code</p>
          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-sm px-4 text-white font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>
    </>
  );
}
