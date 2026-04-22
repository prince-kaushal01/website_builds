import { motion } from "motion/react";

export function WeddingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-50 to-orange-50 px-6 py-20">
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <motion.h2
          className="mb-6"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "3rem",
            color: "#9B2C2C",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Wedding Ceremony
        </motion.h2>

        <motion.div
          className="my-6 flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="h-px w-12 bg-red-600"></div>
          <div className="h-3 w-3 rotate-45 border-2 border-red-600"></div>
          <div className="h-px w-12 bg-red-600"></div>
        </motion.div>

        <motion.p
          className="mb-2"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.25rem",
            color: "#742A2A",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          22nd December, 2026
        </motion.p>

        <motion.p
          className="mb-8 max-w-sm"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1rem",
            color: "#C53030",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          10:00 AM
          <br />
          Royal Mandap, The Grand Palace
          <br />
          123 Royal Avenue, Andheri West, Mumbai
        </motion.p>

        <motion.div
          className="mt-8 max-w-md rounded-2xl border-2 border-red-300 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p
            className="italic"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.125rem",
              color: "#742A2A",
            }}
          >
            Two hearts, one soul, united in love
          </p>
        </motion.div>
      </div>
    </div>
  );
}
