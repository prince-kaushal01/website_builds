import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

import wedding from "../assets/bg-m-wedding2.jpeg";
import desktopBg from "../assets/bg-d-wedding2.jpeg";

// assets
import sidemala from "../assets/sidemala2.png";
import sidevase from "../assets/sidevase.png";
import flowervase1 from "../assets/flowervase2.png";
import flowervase2 from "../assets/flowervase4.png";
import mandap from "../assets/aag.png";
import pond from "../assets/pond.png";
import bride from "../assets/bride.png";
import groom from "../assets/groom.png";
import aag from "../assets/aag.png";

export default function Wedding() {
  const { ref: desktopRef, isInView: desktopInView } = useInView();
  const { ref: mobileRef, isInView: mobileInView } = useInView();

  return (
    <>
      {/* Desktop View */}
      <section
        ref={desktopRef}
        className="hidden md:flex h-screen w-full relative overflow-hidden justify-center"
        style={{
          backgroundImage: `url(${desktopBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= TOP RIGHT MALA ================= */}
        <motion.img
          src={sidemala}
          className="absolute -top-10 right-10 w-52 lg:w-96"
          initial={{ x: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -8, 0],
                }
              : {}
          }
          transition={{
            x: { duration: 1 },
            y: { duration: 5, repeat: Infinity },
          }}
        />
        <motion.img
          src={sidemala}
          className="absolute -top-10 -left-58 w-52 lg:w-96"
          initial={{ x: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -8, 0],
                }
              : {}
          }
          transition={{
            x: { duration: 1 },
            y: { duration: 5, repeat: Infinity },
          }}
        />

        {/* ================= RIGHT BOTTOM VASE ================= */}
        <motion.img
          src={sidevase}
          className="absolute -bottom-10 -right-20 w-[540px]"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -10, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.2 },
          }}
        />

        {/* ================= LEFT FLOWER VASE 1 ================= */}
        <motion.img
          src={flowervase1}
          className="absolute -bottom-20 left-64 w-24"
          initial={{ x: -150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={{
            x: { duration: 1, delay: 0.3 },
            y: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= LEFT FLOWER VASE 2 ================= */}
        <motion.img
          src={flowervase2}
          className="absolute bottom-0 left-80 -rotate-2 w-40"
          initial={{ x: -150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={{
            x: { duration: 1, delay: 0.4 },
            y: { duration: 4.5, repeat: Infinity },
          }}
        />
        {/* ================= POND CENTER ================= */}
        <motion.img
          src={aag}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 -rotate-2"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -5, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.7 },
          }}
        />
        <motion.img
          src={groom}
          className="absolute -bottom-8 left-[570px] -translate-x-1/2 w-16"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -5, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.7 },
          }}
        />
        <motion.img
          src={bride}
          className="absolute -bottom-8 left-[640px] -translate-x-1/2 w-32"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -5, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.7 },
          }}
        />

        {/* ================= TEXT ================= */}
        <div className="text-center max-w-xs">
          <motion.h2
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-6xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "#B13401" }}
          >
            Wedding
          </motion.h2>

          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold mb-6"
            style={{ fontFamily: "Cormorant", color: "#775A00" }}
          >
            A playful morning of mehendi and cultural festivities
          </motion.p>

          <motion.div
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-[#775A00] font-['Cormorant']"
          >
            <p className="text-xl font-semibold">FRI</p>
            <p className="text-xl font-semibold">
              June{" "}
              <span className="text-[#B13401] text-3xl font-semibold font-['Great Vibes']">
                5
              </span>{" "}
              2026
            </p>
            <p className="text-lg">01:00 PM onwards</p>
            <p className="text-lg mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-xl font-semibold text-[#775A00] font-['Cormorant']">
            Dress code
          </p>
          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-sm font-semibold px-4 text-[#775A00] font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>
      {/* mobile View */}
      <section
        ref={mobileRef}
        className="md:hidden min-h-dvh w-full relative overflow-hidden flex justify-center"
        style={{
          backgroundImage: `url(${wedding})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= TOP RIGHT MALA ================= */}
        <motion.img
          src={sidemala}
          className="absolute -top-10 right-4 w-40"
          initial={{ x: 120, opacity: 0 }}
          animate={
            mobileInView
              ? { x: 0, opacity: 1, y: [0, -6, 0], scale: [1, 1.02, 1] }
              : {}
          }
          transition={{
            x: { duration: 1 },
            opacity: { duration: 1 },
            y: { duration: 4, repeat: Infinity },
            scale: { duration: 4, repeat: Infinity },
          }}
        />
        <motion.img
          src={sidemala}
          className="absolute -top-10 -left-24 w-40"
          initial={{ x: 120, opacity: 0 }}
          animate={
            mobileInView
              ? { x: 0, opacity: 1, y: [0, -6, 0], scale: [1, 1.02, 1] }
              : {}
          }
          transition={{
            x: { duration: 1 },
            opacity: { duration: 1 },
            y: { duration: 4, repeat: Infinity },
            scale: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= RIGHT BOTTOM VASE ================= */}
        <motion.img
          src={sidevase}
          className="absolute bottom-10 -right-[295px] w-[400px]"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: [0, -8, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.2 },
          }}
        />

        {/* ================= LEFT FLOWER VASE 1 ================= */}
        <motion.img
          src={flowervase1}
          className="absolute -bottom-20 -left-6 w-28"
          initial={{ x: -120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -5, 0],
                }
              : {}
          }
          transition={{
            x: { duration: 1, delay: 0.3 },
            y: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= LEFT FLOWER VASE 2 ================= */}
        <motion.img
          src={flowervase2}
          className="absolute bottom-0 left-14 w-24"
          initial={{ x: -120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={{
            x: { duration: 1, delay: 0.4 },
            y: { duration: 4.5, repeat: Infinity },
          }}
        />

        {/* ================= MANDAP (RIGHT) ================= */}
        <motion.img
          src={mandap}
          className="absolute bottom-10 right-20 w-32"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.06, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.5 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ================= CENTER POND ================= */}
        <motion.img
          src={pond}
          className="absolute -bottom-6 left-60 -translate-x-1/2 w-36"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: [0, -4, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 5, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        {/* floating + zoom wrapper (prevents flicker) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{}}
        />
        {/* ================= TEXT ================= */}
        <div className="text-center max-w-xs">
          <motion.h2
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-25 "
            style={{ fontFamily: "Great Vibes", color: "#B13401" }}
          >
            Wedding
          </motion.h2>

          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="text-base mb-6"
            style={{ fontFamily: "Cormorant", color: "#775A00" }}
          >
            A playful morning of mehendi and cultural festivities
          </motion.p>

          <motion.div
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-[#775A00] font-['Cormorant']"
          >
            <p className="text-lg">FRI</p>
            <p className="text-lg">
              June{" "}
              <span className="text-[#B13401] text-2xl font-['Great Vibes']">
                5
              </span>{" "}
              2026
            </p>
            <p className="text-lg">01:00 PM onwards</p>
            <p className="text-lg mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-lg text-[#775A00] font-['Cormorant']">
            Dress code
          </p>
          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-sm px-4 text-[#775A00] font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>
    </>
  );
}
