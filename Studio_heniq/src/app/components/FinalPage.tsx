import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function FinalPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftHandX = useTransform(scrollYProgress, [0.2, 0.6], ["-100%", "0%"]);
  const rightHandX = useTransform(scrollYProgress, [0.2, 0.6], ["100%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 px-6 py-20"
    >
      {/* Hands Animation */}
      <div className="relative mb-16 flex h-64 items-center justify-center overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1609151162377-794faf68b02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
          alt="Hands Holding"
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-2xl"
          style={{ x: leftHandX, opacity: 0.9 }}
        />

        <motion.img
          src="https://images.unsplash.com/photo-1684244276932-6ae853774c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
          alt="Together Forever"
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-xl"
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
      <motion.div
        className="mt-16 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        viewport={{ once: true }}
      >
        <div className="mb-4 flex items-center justify-center gap-2">
          <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
          <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
        </div>

        <p
          className="mb-3 italic"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.125rem",
            color: "#9F1239",
          }}
        >
          "Two souls with but a single thought, two hearts that beat as one"
        </p>

        <p
          className="mt-6"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.125rem",
            color: "#BE123C",
          }}
        >
          #RahulWedsPriya
        </p>
      </motion.div>
    </div>
  );
}
