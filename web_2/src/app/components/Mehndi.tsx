import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
{
  /* Mobile */
}
import Mehndibg from "../assets/bg-m-mehndi.png";
import umbrella1 from "../assets/umbrella1.png";
import umbrella2 from "../assets/umbrella2.png";
import cart from "../assets/gadi.png";
import drum from "../assets/dhol.png";
{
  /* Desktop */
}
import desktopBg from "../assets/bg-d-mehndi.png";
import roses from "../assets/rosepetals.png";
import grass from "../assets/greengrass.png";

export default function Mehndi() {
  const { ref: desktopRef, isInView: desktopInView } = useInView();
  const { ref: mobileRef, isInView: mobileInView } = useInView();

  return (
    <>
      <section
        ref={desktopRef}
        className="hidden md:flex h-screen justify-center px-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(${desktopBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 🌹 LEFT ROSE PALET (wind flow animation) */}
        <motion.img
          src={roses}
          className="absolute -right-36 -top-[450px] -translate-y-1/2 w-full z-10 opacity-80 rotate-90"
          animate={{
            x: [0, 20, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🌿 GRASS (bottom ground slight movement) */}
        <motion.img
          src={grass}
          className="absolute -bottom-96 -left-2 w-full z-20"
          animate={{
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🥁 DRUM (zoom animation above grass) */}
        <motion.img
          src={drum}
          className="absolute bottom-14 left-52 w-52 z-10"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================= TEXT (UNCHANGED STYLE) ================= */}
        <div className="text-center max-w-xs">
          <motion.h2
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-6xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "#f97316" }}
          >
            Mehendi
          </motion.h2>

          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="font-semibold mb-6 text-xl"
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
            <p className="text-xl font-semibold">WED</p>
            <p className="text-xl font-semibold">
              June{" "}
              <span className="text-[#f97316] text-2xl font-['Great Vibes']">
                4
              </span>{" "}
              2026
            </p>
            <p className="text-xl font-semibold">03:30 PM onwards</p>
            <p className="text-xl font-semibold mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-xl font-semibold text-[#775A00] font-['Cormorant']">
            Dress code
          </p>
          <motion.p
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-[15px] font-semibold px-4 text-[#775A00] font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>
      <section
        ref={mobileRef}
        className="min-h-screen md:hidden flex justify-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(${Mehndibg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= TOP UMBRELLAS ================= */}
        <motion.img
          src={umbrella2}
          className="absolute -top-1 left-6 w-32 -rotate-12"
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.img
          src={umbrella1}
          className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-12 w-28"
          animate={{ x: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.img
          src={umbrella2}
          className="absolute top-8 right-5 w-32 rotate-12"
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        />

        {/* ================= BOTTOM LEFT CART ================= */}
        <motion.img
          src={cart}
          className="absolute bottom-4 -left-32 w-64"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* ================= BOTTOM RIGHT DRUM ================= */}
        <motion.img
          src={drum}
          className="absolute -bottom-4 right-0 w-36"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* ================= EXTRA UMBRELLA ABOVE DRUM ================= */}
        <motion.img
          src={umbrella1}
          className="absolute bottom-54 -rotate-25 -right-10 w-28"
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* ================= TEXT CONTENT ================= */}
        <div className="text-center max-w-xs">
          <motion.h2
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "#f97316" }}
          >
            Mehendi
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
            <p className="text-lg">WED</p>
            <p className="text-lg">
              June{" "}
              <span className="text-[#f97316] text-2xl font-['Great Vibes']">
                4
              </span>{" "}
              2026
            </p>
            <p className="text-lg">03:30 PM onwards</p>
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
