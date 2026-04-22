import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function MehndiPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftCurtainX = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "-100%"]);
  const rightCurtainX = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-teal-50 px-6 py-20"
    >
      {/* Left Curtain */}
      <motion.div
        className="absolute left-0 top-0 z-20 h-full w-1/2"
        style={{ x: leftCurtainX }}
      >
        <img
          src="https://images.unsplash.com/photo-1774240627288-e7c6eebb77a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Left Curtain"
          className="h-full w-full object-cover opacity-90"
          style={{ objectPosition: "right center" }}
        />
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        className="absolute right-0 top-0 z-20 h-full w-1/2"
        style={{ x: rightCurtainX }}
      >
        <img
          src="https://images.unsplash.com/photo-1774240627356-837b9af5adf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Right Curtain"
          className="h-full w-full object-cover opacity-90"
          style={{ objectPosition: "left center" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center"
        style={{ opacity: contentOpacity }}
      >
        <h2
          className="mb-6"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "3rem",
            color: "#2F855A",
          }}
        >
          Mehndi
        </h2>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px w-12 bg-green-600"></div>
          <div className="h-3 w-3 rotate-45 border-2 border-green-600"></div>
          <div className="h-px w-12 bg-green-600"></div>
        </div>

        <p
          className="mb-2"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.25rem",
            color: "#276749",
          }}
        >
          20th December, 2026
        </p>

        <p
          className="max-w-sm"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1rem",
            color: "#38A169",
          }}
        >
          6:00 PM onwards
          <br />
          Sunset Garden, The Grand Palace
        </p>
      </motion.div>
    </div>
  );
}
