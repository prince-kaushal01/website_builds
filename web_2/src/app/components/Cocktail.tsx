import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

import cocktailBg from "../assets/bg-m-cocktail2.jpeg";
import cocktailBg2 from "../assets/bg-d-cocktail2.jpeg";

// assets
import silvertrail1 from "../assets/silvertrail1.png";
import silvertrail2 from "../assets/silvertrail2.png";
import purpledesign from "../assets/purpledesign.png";
import cocktailBalls from "../assets/cocktail_balls.png";

import bitmap1 from "../assets/cocktail_bitmap.png";
import bitmap2 from "../assets/cocktail_bitmap2.png";

import mirror from "../assets/mirror.png";
import rose from "../assets/cocktail_flower.png";
import sideballs from "../assets/cocktail_sideballs.png";
import candles from "../assets/candles.png";
import wheat from "../assets/cocktail_wheet.png";

export default function Cocktail() {
  const { ref: desktopRef, isInView: desktopInView } = useInView();
  const { ref: mobileRef, isInView: mobileInView } = useInView();

  return (
    <>
      <section
        ref={desktopRef}
        className="hidden md:flex h-screen w-full relative overflow-hidden justify-center"
        style={{
          backgroundImage: `url(${cocktailBg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ===== TOP LEFT SILVER ===== */}
        <motion.img
          src={silvertrail1}
          className="absolute top-0 left-0 w-[350px] z-10"
          initial={{ x: -150, opacity: 0 }}
          animate={desktopInView ? { x: 0, opacity: 1, y: [0, -8, 0] } : {}}
          transition={{
            x: { duration: 1 },
            y: { duration: 5, repeat: Infinity },
          }}
        />

        {/* ===== TOP RIGHT SILVER ===== */}
        <motion.img
          src={silvertrail2}
          className="absolute top-4 right-0 w-[550px] z-10"
          initial={{ x: 150, opacity: 0 }}
          animate={desktopInView ? { x: 0, opacity: 1, y: [0, -8, 0] } : {}}
          transition={{
            x: { duration: 1 },
            y: { duration: 5, repeat: Infinity },
          }}
        />

        {/* ===== PURPLE DESIGN ===== */}
        <motion.img
          src={purpledesign}
          className="absolute -top-60 left-0 w-full z-20"
          initial={{ y: -150, opacity: 0 }}
          animate={desktopInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        />

        {/* ===== BALLS ===== */}
        <motion.img
          src={cocktailBalls}
          className="absolute -top-42 left-0 w-full z-30"
          initial={{ y: -150, opacity: 0 }}
          animate={desktopInView ? { y: [0, -12, 0], opacity: 1 } : {}}
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1 },
          }}
        />

        {/* ===== MIRROR ===== */}
        <motion.img
          src={mirror}
          className="absolute bottom-6 right-12 w-68 z-20"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView ? { y: 0, opacity: 1, scale: [1, 1.06, 1] } : {}
          }
          transition={{
            y: { duration: 1, delay: 0.4 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />
        {/* ===== SIDE BALLS ===== */}
        <motion.img
          src={sideballs}
          className="absolute bottom-0 right-0 w-32 z-20"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView ? { y: 0, opacity: 1, scale: [1, 1.08, 1] } : {}
          }
          transition={{
            y: { duration: 1, delay: 0.7 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ===== CANDLES ===== */}
        <motion.img
          src={candles}
          className="absolute bottom-0 right-24 w-28 z-40"
          initial={{ y: 150, opacity: 0 }}
          animate={desktopInView ? { y: [0, -6, 0], opacity: 1 } : {}}
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.8 },
          }}
        />

        {/* ===== WHEAT ===== */}
        <motion.img
          src={wheat}
          className="absolute bottom-0 -right-4 w-96 z-30"
          initial={{ y: 150, opacity: 0 }}
          animate={desktopInView ? { y: [0, -6, 0], opacity: 1 } : {}}
          transition={{
            y: { duration: 4.5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.9 },
          }}
        />

        {/* ===== TEXT ===== */}
        <div className="text-center max-w-xs pt-[120px] lg:pt-20">
          <motion.h2
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "white" }}
          >
            Cocktail
          </motion.h2>

          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="text-base mb-6"
            style={{ fontFamily: "Cormorant", color: "white" }}
          >
            A playful morning of mehendi and cultural festivities
          </motion.p>

          <motion.div
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-[white] font-['Cormorant']"
          >
            <p className="text-lg">FRI</p>
            <p className="text-lg">
              June{" "}
              <span className="text-[white] text-2xl font-['Great Vibes']">
                7
              </span>{" "}
              2026
            </p>
            <p className="text-lg">9:00 PM onwards</p>
            <p className="text-lg mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-lg text-[white] font-['Cormorant']">Dress code</p>
          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-sm px-4 text-[white] font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>
      <section
        ref={mobileRef}
        className="md:hidden min-h-dvh w-full relative overflow-hidden flex justify-center"
        style={{
          backgroundImage: `url(${cocktailBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= TOP LEFT SILVER ================= */}
        <motion.img
          src={silvertrail1}
          className="absolute top-0 left-0 w-40 z-10"
          initial={{ x: -120, opacity: 0 }}
          animate={mobileInView ? { x: 0, opacity: 1, y: [0, -6, 0] } : {}}
          transition={{
            x: { duration: 1 },
            y: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= TOP RIGHT SILVER ================= */}
        <motion.img
          src={silvertrail2}
          className="absolute top-0 right-0 w-40 z-10"
          initial={{ x: 120, opacity: 0 }}
          animate={mobileInView ? { x: 0, opacity: 1, y: [0, -6, 0] } : {}}
          transition={{
            x: { duration: 1 },
            y: { duration: 4.5, repeat: Infinity },
          }}
        />

        {/* ================= PURPLE DESIGN ================= */}
        <motion.img
          src={purpledesign}
          className="absolute top-0 left-0 w-full z-20"
          initial={{ y: -120, opacity: 0 }}
          animate={mobileInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        />

        {/* ================= TOP BALLS ================= */}
        <motion.img
          src={cocktailBalls}
          className="absolute top-16 left-0 w-full z-30"
          initial={{ y: -120, opacity: 0 }}
          animate={mobileInView ? { y: [0, -10, 0], opacity: 1 } : {}}
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1 },
          }}
        />

        {/* ================= LEFT BITMAP ================= */}
        <motion.img
          src={bitmap2}
          className="absolute -left-2 top-3/5 w-14 z-10"
          initial={{ x: -120, opacity: 0 }}
          animate={mobileInView ? { x: 0, opacity: 1, y: [0, -6, 0] } : {}}
          transition={{
            x: { duration: 1, delay: 0.2 },
            y: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= LOWER LEFT BITMAP ================= */}
        <motion.img
          src={bitmap1}
          className="absolute left-8 bottom-26 w-12 z-10"
          initial={{ x: -120, opacity: 0 }}
          animate={mobileInView ? { x: 0, opacity: 1, y: [0, -6, 0] } : {}}
          transition={{
            x: { duration: 1, delay: 0.3 },
            y: { duration: 4.5, repeat: Infinity },
          }}
        />

        {/* ================= MIRROR ================= */}
        <motion.img
          src={mirror}
          className="absolute bottom-4 right-1 w-[35vw] max-w-[208px] z-20"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView ? { y: 0, opacity: 1, scale: [1, 1.05, 1] } : {}
          }
          transition={{
            y: { duration: 1, delay: 0.4 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ================= ROSE ABOVE MIRROR ================= */}
        <motion.img
          src={rose}
          className="absolute bottom-30 -right-10 w-[32vw] max-w-[176px] z-30"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView ? { y: 0, opacity: 1, scale: [1, 1.05, 1] } : {}
          }
          transition={{
            y: { duration: 1, delay: 0.5 },
            rotate: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= ROSE LEFT OF MIRROR ================= */}
        <motion.img
          src={rose}
          className="absolute bottom-14 right-22 w-[30vw] max-w-[160px] z-10"
          initial={{ x: -120, opacity: 0 }}
          animate={
            mobileInView ? { x: 0, opacity: 1, scale: [1, 1.05, 1] } : {}
          }
          transition={{
            x: { duration: 1, delay: 0.6 },
            rotate: { duration: 4.5, repeat: Infinity },
          }}
        />

        {/* ================= SIDE BALLS ================= */}
        <motion.img
          src={sideballs}
          className="absolute bottom-0 right-0 w-20 z-20"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView ? { y: 0, opacity: 1, scale: [1, 1.08, 1] } : {}
          }
          transition={{
            y: { duration: 1, delay: 0.7 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ================= CANDLES ================= */}
        <motion.img
          src={candles}
          className="absolute bottom-0 right-20 w-20 z-40"
          initial={{ y: 120, opacity: 0 }}
          animate={mobileInView ? { y: [0, -4, 0], opacity: 1 } : {}}
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.8 },
          }}
        />

        {/* ================= WHEAT ================= */}
        <motion.img
          src={wheat}
          className="absolute bottom-2 right-0 w-64 z-30"
          initial={{ y: 120, opacity: 0 }}
          animate={mobileInView ? { y: [0, -5, 0], opacity: 1 } : {}}
          transition={{
            y: { duration: 4.5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.9 },
          }}
        />

        {/* ================= TEXT ================= */}
        <div className="text-center max-w-xs py-16">
          <motion.h2
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "white" }}
          >
            Cocktail
          </motion.h2>

          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="text-base mb-6"
            style={{ fontFamily: "Cormorant", color: "white" }}
          >
            A playful Night with friends and cultural Activities
          </motion.p>

          <motion.div
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-white font-['Cormorant']"
          >
            <p className="text-lg">FRI</p>
            <p className="text-lg">
              June{" "}
              <span className="text-white text-2xl font-['Great Vibes']">
                7
              </span>{" "}
              2026
            </p>
            <p className="text-lg">9:00 PM onwards</p>
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
