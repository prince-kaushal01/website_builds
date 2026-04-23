import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";
import left_hand from "../../asset/left_hand.png"
import right_hand from "../../asset/right_hand.png";

export function FinalPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftHandX = useTransform(scrollYProgress, [0.2, 0.4], ["-100%", "0%"]);
  const rightHandX = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen px-6 py-20"
    >
      {/* Hands Animation */}
      <div className="relative mb-16 flex h-64 items-center justify-center overflow-hidden">
        <motion.img
          src={left_hand}
          alt="Hands Holding"
          className="absolute left-24 top-16 h-64 w-48 -translate-x-1/2 -translate-y-1/2 z-20 object-cover "
          style={{ x: leftHandX, opacity: 0.9 }}
        />

        <motion.img
          src={right_hand}
          alt="Together Forever"
          className="absolute left-60 top-16 h-64 w-44 -translate-x-1/2 -translate-y-1/2 z-10 object-cover "
          style={{ x: rightHandX, opacity: 0.8 }}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Heart className="mx-auto h-12 w-12 fill-rose-400 text-rose-400" />
        </motion.div>

        <motion.p
          className="mb-6 max-w-md"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.5rem",
            color: "#9F1239",
            lineHeight: "1.8",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          We found love in each other's hearts, and now we're ready to start a beautiful journey
          together.
        </motion.p>

        <motion.p
          className="mb-8 max-w-md"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1rem",
            color: "#BE123C",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
        >
          Your presence would mean the world to us as we exchange vows and celebrate our love with
          family and friends.
        </motion.p>

        <motion.p
          className="mb-4"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.25rem",
            color: "#881337",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
        >
          With love,
          <br />
          Rahul & Priya
        </motion.p>
      </div>

      {/* Footer */}
     
    </div>
  );
}
