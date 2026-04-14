import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import bgimage from "../assets/main_section.png";
import bgimage2 from "../../assests/bg-d-firstpage.png";
import video from "../assets/marriage_view.mp4";
import groom from "../assets/Groom_walk.png";

import person1 from "../../assests/dancer1.png";
import person2 from "../../assests/dancer2.png";
import person3 from "../../assests/dancer3.png";
import person4 from "../../assests/dancer4.png";
import person5 from "../../assests/dancer5.png";
import person6 from "../../assests/dancer6.png";
import person7 from "../../assests/dancer7.png";
import person8 from "../../assests/dancer8.png";
import ganesha from "../../assests/ganeshji.png";

export function HeroSection() {
  const { ref, isInView } = useInView();
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen relative flex items-start justify-center overflow-hidden md:pt-24"
      style={{
        backgroundImage: `url(${bgimage2})`,
        backgroundSize: "cover",
        backgroundPosition: " top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🌸 PREMIUM PETALS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {[...Array(30)].map((_, i) => {
          const startX = Math.random() * 100;
          const drift1 = startX + (Math.random() * 20 - 10);
          const drift2 = startX + (Math.random() * 30 - 15);

          return (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-xl md:text-2xl"
              style={{
                left: `${startX}%`,
                top: "-10%",
              }}
              animate={{
                y: ["0vh", "120vh"],
                x: [`0%`, `${drift1 - startX}%`, `${drift2 - startX}%`, `0%`],
                rotate: [0, 120, 240, 360],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 7 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              🌸
            </motion.div>
          );
        })}
      </div>

      {/* 🖥️ DESKTOP VIDEO HERO */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="hidden md:block absolute inset-0 w-full h-full"
      >
        {/* ✅ BACKGROUND IMAGE (REPLACED VIDEO) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(${bgimage2})` }}
        />

        {/* ✨ GLOW BALLS */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#FEFCFA] blur-lg z-50"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: "50px",
                  height: "50px",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4 }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          className="relative z-30 text-center pt-4"
        >
          <img src={ganesha} className="mx-auto w-6" />

          <motion.h1
            variants={item}
            className="text-lg text-black font-['Cormorant'] mb-5"
          >
            || Shree Ganeshaya Namah ||
          </motion.h1>

          <motion.h2
            variants={item}
            className="font-['Great_Vibes'] text-6xl text-[#b3385a] drop-shadow-lg"
          >
            Kabir
          </motion.h2>

          <motion.h3
            variants={item}
            className="font-['Great_Vibes'] text-4xl text-black my-2"
          >
            &
          </motion.h3>

          <motion.h1
            variants={item}
            className="font-['Great_Vibes'] text-6xl text-[#b3385a] drop-shadow-lg"
          >
            Diksha
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* phone device */}
      <div className="md:hidden mt-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 1 }}
          className="relative  text-center px-6 w-full max-w-xl"
        >
          {/* GANESHA */}
          <motion.img
            src={ganesha}
            alt="ganesha"
            className="mx-auto w-4 md:w-20 pt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          />

          {/* SHREE TEXT */}
          <motion.h1
            variants={item}
            className="text-[10px] md:text-2xl text-black tracking-wide mb-2 font-['Cormorant']"
          >
            ||Shree Ganeshaya Namah||
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            variants={item}
            className="text-black/90 text-[12px] md:text-lg font-['Cormorant']"
          >
            With the blessings Of
          </motion.p>

          <motion.p
            variants={item}
            className="text-black text-[13px] md:text-xl font-['Playfair_Display'] mb-1 "
          >
            Smt. Lalita Devi & Shri. Ravi Agarwal
          </motion.p>
          <motion.p
            variants={item}
            className="text-black text-[13px] md:text-xl font-['Cormorant'] font-semibold mb-2"
          >
            Mrs. Smita & Mr. Pawan Agarwal
          </motion.p>
          <motion.p
            variants={item}
            className="text-[13px] md:text-2xl text-black tracking-wide mb-1 font-['Cormorant']"
          >
            Cordialy invite you to attend the
          </motion.p>
          <motion.p
            variants={item}
            className="-mt-2 text-[13px] md:text-2xl text-black tracking-wide font-['Cormorant'] mb-3"
          >
            Wedding of their son
          </motion.p>

          {/* NAMES */}
          <div className="">
            <motion.h2
              variants={item}
              className="text-2xl md:text-7xl text-[#B3385A] drop-shadow-lg font-['Great_Vibes']"
            >
              Kabir
            </motion.h2>

            <motion.p
              variants={item}
              className="text-[15px] md:text-3xl text-black font-['Cormorant']"
            >
              WITH
            </motion.p>

            <motion.h2
              variants={item}
              className="text-2xl md:text-7xl text-[#B3385A] drop-shadow-lg font-['Great_Vibes']"
            >
              Diksha
            </motion.h2>
          </div>
          <motion.p
            variants={item}
            className=" text-[13px] md:text-2xl text-black tracking-wide font-semibold font-['Cormorant']"
          >
            Daughter of Smt. Shikha & Shri Tarun Agarwal
          </motion.p>
          <motion.p
            variants={item}
            className=" text-[13px] md:text-2xl text-black tracking-wide font-semibold font-['Cormorant'] "
          >
            4th to 6th june
          </motion.p>
          <motion.p
            variants={item}
            className=" text-[13px] md:text-2xl text-black tracking-wide font-semibold font-['Cormorant'] -mt-1"
          >
            at
          </motion.p>
          <motion.p
            variants={item}
            className=" text-[13px] md:text-2xl text-black tracking-wide font-bold font-['Cormorant'] "
          >
            Uttar Garden Lawn
          </motion.p>
        </motion.div>

        {/* 👨‍👩‍👧 PEOPLE (FIXED POSITION) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
          {/* LEFT */}
          <motion.img
            src={person7}
            className="absolute bottom-32 left-[15%] w-20 md:w-32"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.img
            src={person8}
            className="absolute bottom-16 left-[40%] w-20 md:w-32"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.img
            src={person6}
            className="absolute bottom-16 left-[0%] w-20 md:w-32"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.img
            src={person1}
            className="absolute bottom-4 left-[8%] w-20 md:w-32"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* RIGHT */}
          <motion.img
            src={person5}
            className="absolute bottom-8 right-[55%] w-20 md:w-32 z-20"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          />

          <motion.img
            src={person4}
            className="absolute bottom-2 right-[37%] w-20 md:w-32 z-20"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          />

          <motion.img
            src={person2}
            className="absolute bottom-4 right-[20%] w-16 md:w-36 z-10"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          />

          <motion.img
            src={person3}
            className="absolute bottom-4 right-[5%] w-20 md:w-32 z-10"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
