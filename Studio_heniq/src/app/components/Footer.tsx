import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-5%", once: false });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <footer
      ref={ref}
      style={{ background: "linear-gradient(180deg, #fdf6ef 0%, #f9ede0 60%, #f5e4d2 100%)" }}
      className="relative h-screen w-full overflow-hidden px-6 pt-14 pb-8"
    >

      {/* ── Top decorative rule ── */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-10"
        {...fadeUp(0)}
      >
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #c9956a)" }} />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#c9956a] opacity-70" />
        <div className="h-px w-6" style={{ background: "#c9956a", opacity: 0.6 }} />
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem", color: "#7a3b1e", lineHeight: 1 }}>
          K &amp; D
        </span>
        <div className="h-px w-6" style={{ background: "#c9956a", opacity: 0.6 }} />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#c9956a] opacity-70" />
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #c9956a)" }} />
      </motion.div>

      {/* ── Main names ── */}
      <motion.div className="text-center mb-2" {...fadeUp(0.1)}>
        <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.2rem", color: "#3D0C11", lineHeight: 1.1, textShadow: "0 2px 10px rgba(61,12,17,0.12)" }}>
          Kabir &amp; Diksha
        </h2>
      </motion.div>

      {/* ── Wedding date pill ── */}
      <motion.div className="flex justify-center mb-8" {...fadeUp(0.2)}>
        <span
          className="px-5 py-1 rounded-full text-xs tracking-[0.28em] uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#7a3b1e",
            fontWeight: 600,
            background: "rgba(201,149,106,0.15)",
            border: "1px solid rgba(201,149,106,0.35)",
          }}
        >
          22nd December, 2026
        </span>
      </motion.div>

      {/* ── Cute quote lines ── */}
      <motion.blockquote
        className="text-center mb-8 px-4"
        {...fadeUp(0.3)}
      >
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#5c2d0e", fontStyle: "italic", lineHeight: 1.85 }}>
          "Two souls, one heartbeat — bound by love, united for eternity."
        </p>
      </motion.blockquote>

      {/* ── Event cards row ── */}
      <motion.div
        className="flex justify-center gap-4 flex-wrap mb-10"
        {...fadeUp(0.4)}
      >
        {[
          { label: "Mehndi",           date: "20 Dec" },
          { label: "Sangeet",          date: "21 Dec" },
          { label: "Wedding Ceremony", date: "22 Dec" },
        ].map((ev) => (
          <div
            key={ev.label}
            className="flex flex-col items-center px-4 py-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(201,149,106,0.3)",
              backdropFilter: "blur(6px)",
              minWidth: "88px",
            }}
          >
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.25rem", color: "#7a3b1e", lineHeight: 1 }}>
              {ev.label}
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#a0603a", marginTop: "4px" }}>
              {ev.date}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Venue line ── */}
      <motion.p
        className="text-center mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "#7a3b1e", letterSpacing: "0.12em" }}
        {...fadeUp(0.5)}
      >
        The Grand Palace &nbsp;·&nbsp; 123 Royal Avenue, Andheri West, Mumbai
      </motion.p>

      {/* ── Divider with heart ── */}
      <motion.div className="flex items-center justify-center gap-3 mb-8" {...fadeUp(0.55)}>
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(201,149,106,0.5))" }} />
        <Heart size={14} className="fill-[#c9956a] text-[#c9956a]" />
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(201,149,106,0.5))" }} />
      </motion.div>

      {/* ── Second cute line ── */}
      <motion.p
        className="text-center mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem", color: "#5c2d0e", fontStyle: "italic", lineHeight: 1.7 }}
        {...fadeUp(0.6)}
      >
        Together is our favourite place to be. <br />
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.4rem", color: "#7a3b1e" }}>
          We can't wait to celebrate with you!
        </span>
      </motion.p>

      {/* ── Bottom rule ── */}
      <motion.div className="flex items-center justify-center gap-2 mb-6" {...fadeUp(0.65)}>
        <div className="w-1 h-1 rounded-full bg-[#c9956a] opacity-50" />
        <div className="h-px w-16" style={{ background: "rgba(201,149,106,0.4)" }} />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#c9956a] opacity-60" />
        <div className="h-px w-16" style={{ background: "rgba(201,149,106,0.4)" }} />
        <div className="w-1 h-1 rounded-full bg-[#c9956a] opacity-50" />
      </motion.div>

      {/* ── Credit line ── */}
      <motion.p
        className="text-center"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "#b07850", opacity: 0.7 }}
        {...fadeUp(0.7)}
      >
        CRAFTED WITH LOVE &nbsp;✦&nbsp; 2026
      </motion.p>
    </footer>
  );
}
