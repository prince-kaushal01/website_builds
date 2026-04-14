import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-gradient-to-br from-pink-900 via-purple-900 to-amber-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Heart
            className="w-12 h-12 text-pink-300 mx-auto mb-4"
            fill="currentColor"
          />
          <p
            className="text-2xl md:text-3xl mb-4"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            We can't wait to celebrate with you!
          </p>
          <p
            className="text-lg mb-6"
            style={{ fontFamily: "Cormorant, serif" }}
          >
            Raj & Priya
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-6" />
          <p
            className="text-sm text-pink-200"
            style={{ fontFamily: "Cormorant, serif" }}
          >
            With love and blessings • December 25, 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
