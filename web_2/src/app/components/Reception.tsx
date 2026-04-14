import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

import reception from "../assets/bg-m-reception.PNG";
import desktop_Bg from "../assets/bg-d-reception.png";

// assets
import table from "../assets/table.png";
import flowerPot from "../assets/Candle_reception.png";
import art from "../assets/Reception_art.png";
import disco1 from "../assets/disco1.png";
import candles from "../assets/candle3.png";
import candles2 from "../assets/candles.png";
import jhumar1 from "../assets/reception_1.png";
import jhumar2 from "../assets/reception_2.png";

export default function Reception() {
  const { ref: desktopRef, isInView: desktopInView } = useInView();
  const { ref: mobileRef, isInView: mobileInView } = useInView();

  return (
    <>
      <section
        ref={desktopRef}
        className="hidden md:flex h-screen w-full relative overflow-hidden justify-center"
        style={{
          backgroundImage: `url(${desktop_Bg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <motion.img
          src={jhumar2}
          className="absolute top-0 left-52 w-[650px]"
          initial={{ y: 150, opacity: 0 }} // 👈 comes from +Y (down)
          animate={
            desktopInView
              ? {
                  y: [0, -8, 0], // 👈 after entry → float
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 1 },
          }}
        />
        <motion.img
          src={jhumar1}
          className="absolute top-0 right-52 w-[350px]"
          initial={{ y: 150, opacity: 0 }} // 👈 comes from +Y (down)
          animate={
            desktopInView
              ? {
                  y: [0, -8, 0], // 👈 after entry → float
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 1 },
          }}
        />

        {/* ================= TABLE (LEFT BOTTOM) ================= */}
        <motion.img
          src={table}
          className="absolute -bottom-5 left-0 w-[450px]"
          initial={{ x: -150, opacity: 0 }}
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
            y: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= FLOWER POT ================= */}
        <motion.img
          src={flowerPot}
          className="absolute bottom-32 right-10 w-52"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.2 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ================= ART ================= */}
        <motion.img
          src={art}
          className="absolute bottom-16 right-10 w-64"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.3 },
            rotate: { duration: 5, repeat: Infinity },
          }}
        />

        {/* ================= DISCO BALLS ================= */}
        <motion.img
          src={disco1}
          className="absolute bottom-16 right-20 w-16 z-20"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.4 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        <motion.img
          src={disco1}
          className="absolute bottom-14 right-36 w-20 z-20"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.08, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.5 },
            scale: { duration: 3.5, repeat: Infinity },
          }}
        />

        {/* ================= CANDLES ================= */}
        <motion.img
          src={candles}
          className="absolute bottom-4 right-40 w-12 z-30"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -6, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        <motion.img
          src={candles}
          className="absolute bottom-0 right-22 w-12 z-30"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -6, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        <motion.img
          src={candles2}
          className="absolute bottom-20 right-44 w-24 z-10"
          initial={{ y: 150, opacity: 0 }}
          animate={
            desktopInView
              ? {
                  y: [0, -6, 0],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        {/* ================= TEXT ================= */}
        <div className="text-center max-w-xs pt-20">
          <motion.h2
            animate={
              desktopInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "white" }}
          >
            Reception
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
                6
              </span>{" "}
              2026
            </p>
            <p className="text-lg">7:30 PM onwards</p>
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
        className="md:hidden min-h-screen w-full relative overflow-hidden flex justify-center"
        style={{
          backgroundImage: `url(${reception})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= TABLE (LEFT BOTTOM) ================= */}
        <motion.img
          src={table}
          className="absolute -bottom-4 -left-10 w-58"
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
            x: { duration: 1 },
            y: { duration: 4, repeat: Infinity },
          }}
        />

        {/* ================= FLOWER POT ================= */}
        <motion.img
          src={flowerPot}
          className="absolute bottom-24 right-0 w-32"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.2 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ================= ART (BELOW POT) ================= */}
        <motion.img
          src={art}
          className="absolute bottom-16 -right-5 w-42 z-10"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.3 },
            rotate: { duration: 3, repeat: Infinity },
          }}
        />

        {/* ================= DISCO BALLS ================= */}
        <motion.img
          src={disco1}
          className="absolute bottom-16 right-0 w-12 z-20"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.4 },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        <motion.img
          src={disco1}
          className="absolute bottom-18 right-12 w-10 z-20"
          initial={{ y: 120, opacity: 0 }}
          animate={
            mobileInView
              ? {
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.08, 1],
                }
              : {}
          }
          transition={{
            y: { duration: 1, delay: 0.5 },
            scale: { duration: 3.5, repeat: Infinity },
          }}
        />

        {/* ================= CANDLES ================= */}
        <motion.img
          src={candles}
          className="absolute bottom-10 right-3 w-6 z-30"
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
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        <motion.img
          src={candles}
          className="absolute bottom-8 right-9 w-6 z-30"
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
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        <motion.img
          src={candles2}
          className="absolute bottom-10 right-20 z-0 w-12"
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
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        <motion.img
          src={candles}
          className="absolute bottom-8 right-9 w-6"
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
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 1, delay: 0.6 },
          }}
        />
        {/* ================= TEXT ================= */}
        <div className="text-center max-w-xs pt-24">
          <motion.h2
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4 pt-32 "
            style={{ fontFamily: "Great Vibes", color: "white" }}
          >
            Reception
          </motion.h2>

          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.2 }}
            className="text-base mb-6"
            style={{ fontFamily: "Cormorant", color: "white" }}
          >
            A playful morning of mehendi and cultural festivities
          </motion.p>

          <motion.div
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.3 }}
            className="space-y-1 text-[white] font-['Cormorant']"
          >
            <p className="text-lg">FRI</p>
            <p className="text-lg">
              June{" "}
              <span className="text-[white] text-2xl font-['Great Vibes']">
                6
              </span>{" "}
              2026
            </p>
            <p className="text-lg">7:30 PM onwards</p>
            <p className="text-lg mb-3">Uttar Garden Lawn</p>
          </motion.div>
          <p className="text-lg text-[white] font-['Cormorant']">Dress code</p>
          <motion.p
            animate={
              mobileInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }
            }
            transition={{ delay: 0.4 }}
            className="text-sm px-4 text-[white] font-['Cormorant']"
          >
            Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya
            or Kutchi Mirrorwork
          </motion.p>
        </div>
      </section>
    </>
  );
}
