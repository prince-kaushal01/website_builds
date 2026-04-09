import { motion } from "motion/react";
import ganesha from "../../assests/Ganesha.png";

export function FamilySection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-[#f4efe9] to-[#e9e2d9]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex flex-col items-center"
        >
          <img
            src={ganesha}
            alt="Ganesha"
            className="w-16 md:w-20 object-contain mb-3"
          />

          <p className="font-['Cormorant'] text-sm md:text-base text-[#3e3935]/80 tracking-wide">
            श्री गणेशाय नमः
          </p>
        </motion.div>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-['Cormorant'] text-sm tracking-[0.2em] text-[#3e3935]/70 mb-6">
            WITH THE BLESSINGS OF OUR 
          </p>

          <h2 className="font-['Great_Vibes'] text-5xl md:text-7xl text-[#b08a2e]">
             Families
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Groom Family */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#d9d2c3] rounded-2xl shadow-lg p-8 md:p-10 text-center"
          >
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#e75480] mb-4">
              Groom's Family
            </h3>

            <p className="font-['Cormorant'] text-lg md:text-xl text-[#3e3935] mb-6">
              Shri. Ravi Agarwal & Smt. Lalita devi
            </p>

            <div className="h-[1px] bg-[#e75480]/40 mb-6" />

            <p className="font-['Cormorant'] text-base md:text-lg text-[#3e3935]/80 mb-2">
              Brother: Arjun Kumar
            </p>
            <p className="font-['Cormorant'] text-base md:text-lg text-[#3e3935]/80">
              Sister: Ananya Kumar
            </p>
          </motion.div>

          {/* Bride Family */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#d9d2c3] rounded-2xl shadow-lg p-8 md:p-10 text-center"
          >
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#e75480] mb-4">
              Bride's Family
            </h3>

            <p className="font-['Cormorant'] text-lg md:text-xl text-[#3e3935] mb-6">
              Shri. Tarun Agarwal & Smt. Shikha
            </p>

            <div className="h-[1px] bg-[#e75480]/40 mb-6" />

            <p className="font-['Cormorant'] text-base md:text-lg text-[#3e3935]/80 mb-2">
              Brother: Aditya Sharma
            </p>
            <p className="font-['Cormorant'] text-base md:text-lg text-[#3e3935]/80">
              Sister: Kavya Sharma
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
