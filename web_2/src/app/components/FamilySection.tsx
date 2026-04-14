import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function FamilySection() {
  const ref = useRef(null);

  const families = [
    {
      side: "Groom's Family",
      members: ["Mr. Pawn Agarwal", "Mrs. Samita Agarwal"],
    },
    {
      side: "Bride's Family",
      members: ["Shri Tarun Agarwal", "Smt. Shikha"],
    },
  ];

  // ================= SCROLL =================
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 90%"],
  });

  // ================= WORD RENDER =================
  const renderWords = (text: string, start: number, end: number) => {
    const words = text.split(" ");
    return words.map((word, i) => {
      const progress = start + (i / words.length) * (end - start);

      const opacity = useTransform(
        scrollYProgress,
        [progress, progress + 0.05],
        [0, 1]
      );

      const y = useTransform(
        scrollYProgress,
        [progress, progress + 0.05],
        [20, 0]
      );

      return (
        <motion.span
          key={i}
          style={{ opacity, y }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      );
    });
  };

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-16 bg-gradient-to-br from-pink-50 via-cream-50 to-amber-50"
    >

      {/* ================= INTRO ================= */}
      <div className="w-full flex justify-center items-center bg-[#d8c2c5] py-4 md:py-10 px-6 rounded-2xl mb-16">
        <div className="text-center max-w-4xl">

          <h2
            className="text-3xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontFamily: "Great Vibes", color: "#b8962e" }}
          >
            {renderWords("Awaiting Your Noble Presence", 0, 0.15)}
          </h2>

          <p
            className="text-base md:text-xl lg:text-2xl leading-relaxed"
            style={{ fontFamily: "Cormorant", color: "#4b4b3f" }}
          >
            {renderWords("Because meeting two soul requires twice the fun", 0.1, 0.25)}
            <br className="hidden md:block" />
            {renderWords("and you!", 0.2, 0.3)}
          </p>

        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">

          <p
            className="mb-6 uppercase"
            style={{ fontFamily: "Cormorant, serif", fontWeight: 600 }}
          >
            {renderWords("WITH LOVE", 0.3, 0.4)}
          </p>

          <h2
            className="text-4xl md:text-6xl mb-4"
            style={{ fontFamily: "Great Vibes", color: "#B29431" }}
          >
            {renderWords("The Families", 0.35, 0.5)}
          </h2>

        </div>

        {/* ================= CARDS ================= */}
        <div className="grid md:grid-cols-2 gap-8">
          {families.map((family, index) => (
            <motion.div
              key={index}
              style={{
                x: useTransform(
                  scrollYProgress,
                  [0.5, 0.7],
                  [index === 0 ? -100 : 100, 0]
                ),
                opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]),
              }}
              className="bg-[#F5EFDE] rounded-2xl p-8 shadow-lg border border-pink-100"
            >

              <h3
                className="text-3xl mb-6 text-center"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 600,
                  color: "#ec4899",
                }}
              >
                {renderWords(family.side, 0.55, 0.7)}
              </h3>

              <div className="space-y-4">
                <div className="pt-4 border-t border-pink-200 space-y-2">

                  {family.members.map((member, idx) => (
                    <p
                      key={idx}
                      className="text-lg text-gray-700 text-center"
                      style={{ fontFamily: "Cormorant, serif" }}
                    >
                      {renderWords(member, 0.6 + idx * 0.05, 0.8 + idx * 0.05)}
                    </p>
                  ))}

                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}