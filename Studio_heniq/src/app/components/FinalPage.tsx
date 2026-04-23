import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";
import left_hand from "../../asset/left_hand.png";
import right_hand from "../../asset/right_hand.png";
import bgImage from "../../asset/6_page.webp";

// ✅ NEW ASSETS
import grassLeft from "../../asset/6_left_grass.png";
import grassRight from "../../asset/6_right_grass.png";
import flowerRight from "../../asset/6_r_flower.png";
import flowerLeft from "../../asset/6_t_flower.png";

export function FinalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftHandX = useTransform(scrollYProgress, [0.2, 0.4], ["-100%", "0%"]);
  const rightHandX = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen px-6">
      <div
        className="absolute inset-0 "
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      />

      {/* Hands Animation */}
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        <motion.img
          src={left_hand}
          className="absolute left-24 top-16 h-64 w-48 -translate-x-1/2 -translate-y-1/2 z-20 object-cover"
          style={{ x: leftHandX, opacity: 0.9 }}
        />

        <motion.img
          src={right_hand}
          className="absolute left-60 top-16 h-64 w-44 -translate-x-1/2 -translate-y-1/2 z-10 object-cover"
          style={{ x: rightHandX, opacity: 0.8 }}
        />

        {/* TEXT */}
        <div className="flex flex-col items-center justify-center text-center mt-28">
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
            We found love in each other's hearts, and now we're ready to start a
            beautiful journey together.
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
            Your presence would mean the world to us as we exchange vows and
            celebrate our love with family and friends.
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
            Kabir & Diksha
          </motion.p>
        </div>
      </div>

      {/* ================= NEW ELEMENTS ================= */}

      {/* Grass Left */}
      <motion.img
        src={grassLeft}
        className="absolute bottom-0 left-0 w-48 z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Grass Right */}
      <motion.img
        src={grassRight}
        className="absolute bottom-0 right-0 w-48 z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Flower Right */}
      <motion.img
        src={flowerRight}
        className="absolute bottom-48 -right-8 w-38 z-20"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      {/* Flower Center Left */}
      <motion.img
        src={flowerLeft}
        className="absolute bottom-44 left-0 w-32 z-20"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
    </div>
  );
}