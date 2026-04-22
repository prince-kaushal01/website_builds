import { motion } from "motion/react";

export function SangeetPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-6 py-20">
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <motion.h2
          className="mb-6"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "3rem",
            color: "#6B46C1",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Sangeet
        </motion.h2>

        <motion.div
          className="my-6 flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="h-px w-12 bg-purple-600"></div>
          <div className="h-3 w-3 rotate-45 border-2 border-purple-600"></div>
          <div className="h-px w-12 bg-purple-600"></div>
        </motion.div>

        <motion.p
          className="mb-2"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.25rem",
            color: "#553C9A",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          21st December, 2026
        </motion.p>

        <motion.p
          className="mb-8 max-w-sm"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1rem",
            color: "#805AD5",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          7:00 PM onwards
          <br />
          Crystal Hall, The Grand Palace
        </motion.p>

        <motion.p
          className="max-w-md italic"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.125rem",
            color: "#6B46C1",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Join us for an evening of music, dance, and celebration
        </motion.p>
      </div>
    </div>
  );
}
