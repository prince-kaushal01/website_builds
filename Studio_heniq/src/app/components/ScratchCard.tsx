import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import bgImage from "../../asset/2_page.jpeg";
import fountain from "../../asset/2_page_fountain.png";
import flowerLeft from "../../asset/2_left_b_flower.png";
import flowerRight from "../../asset/2_right_b_flower.png";
import flowerRight2 from "../../asset/2_right_t_flower.png";
import flowerLeft2 from "../../asset/2_left_t_flower.png";
import petalImg from "../../asset/petal.jpg";

// ─── Static data — created once, never recreated ──────────────────────────────

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 7 + Math.random() * 5,
  rotation: Math.floor(Math.random() * 360),
  drift: Math.floor((Math.random() - 0.5) * 80),
}));

// CSS keyframe string — generated once at module load, not inside render
const PETAL_CSS = `
${PETALS.map(
  (p) => `
  @keyframes petal-fall-${p.id} {
    0%   { transform: translateY(-50px) translateX(0px) rotate(${p.rotation}deg); opacity: 0; }
    6%   { opacity: 1; }
    93%  { opacity: 1; }
    100% { transform: translateY(calc(100vh + 60px)) translateX(${p.drift}px) rotate(${p.rotation + 360}deg); opacity: 0; }
  }`,
).join("")}
`;

const SPARKLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  angle: (i / 10) * 360,
  dist: 55 + (i % 3) * 20,
  delay: (i % 4) * 0.08,
}));

const CANVAS_W = 326;
const CANVAS_H = 100;
const BRUSH_R  = 34;
const STEP_PX  = 6;   // interpolation step — one circle every 6 px
const COUNT_EVERY = 18; // pixel-count only every Nth draw call

// ─── Component ───────────────────────────────────────────────────────────────

export function ScratchCard() {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll progress drives all decorative elements
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // FOUNTAIN — rises from bottom
  const fountainY = useTransform(scrollYProgress, [0.1, 0.4], [220, 0]);
  const fountainOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // LEFT FLOWERS — slide from left
  const flowerRightX = useTransform(scrollYProgress, [0.15, 0.43], [-160, 0]);
  const flowerRight2X = useTransform(scrollYProgress, [0.35, 0.43], [-160, 0]);
  const flowerSideOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);

  // RIGHT FLOWERS — slide from right
  const flowerLeftX = useTransform(scrollYProgress, [0.2, 0.48], [160, 0]);
  const flowerLeft2X = useTransform(scrollYProgress, [0.25, 0.48], [160, 0]);
  const flowerRightOpacity = useTransform(scrollYProgress, [0.2, 0.43], [0, 1]);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const lastPos    = useRef<{ x: number; y: number } | null>(null);
  const drawCount  = useRef(0);
  const scratchPct = useRef(0);        // ← ref, NOT state → zero re-renders while scratching

  const [isRevealed,  setIsRevealed]  = useState(false);
  const [canvasGone,  setCanvasGone]  = useState(false);
  const [isHovering,  setIsHovering]  = useState(false);

  // ── Inject petal CSS once ─────────────────────────────────────────────────
  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "petal-keyframes";
    tag.textContent = PETAL_CSS;
    document.head.appendChild(tag);
    return () => { document.getElementById("petal-keyframes")?.remove(); };
  }, []);

  // ── Draw gold foil overlay ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width  = CANVAS_W;
    canvas.height = CANVAS_H;

    // Single blush pink fill
    ctx.fillStyle = "#f9c0cb";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);


    // Label text
    ctx.textAlign  = "center";
    ctx.fillStyle  = "rgba(150,50,70,0.85)";
    ctx.font       = "bold 18px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("✦  Scratch to Reveal  ✦", CANVAS_W / 2, CANVAS_H / 2 + 6);
  }, []);

  // ── Get pointer in canvas coords ─────────────────────────────────────────
  const getPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const r  = canvas.getBoundingClientRect();
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: ((cx - r.left)  / r.width)  * CANVAS_W,
        y: ((cy - r.top)   / r.height) * CANVAS_H,
      };
    },
    [],
  );

  // ── Draw a soft filled circle (no shadowBlur — compositor-friendly) ───────
  const drawCircle = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number) => {
    // Radial gradient gives a feathered edge without expensive shadowBlur
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, BRUSH_R);
    grd.addColorStop(0,    "rgba(0,0,0,1)");
    grd.addColorStop(0.65, "rgba(0,0,0,0.95)");
    grd.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, BRUSH_R, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // ── Measure scratched area (cheap sample) ────────────────────────────────
  const measure = useCallback((ctx: CanvasRenderingContext2D) => {
    drawCount.current += 1;
    if (drawCount.current % COUNT_EVERY !== 0) return;

    const data  = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 32) { // every 8th pixel
      if (data[i] < 10) clear++;
      total++;
    }
    scratchPct.current = (clear / total) * 100;
    if (scratchPct.current > 50) setIsRevealed(true); // single state update, only fires once
  }, []);

  // ── Unified pointer handler ───────────────────────────────────────────────
  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (isRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      const pos = getPos(e);
      if (!pos) return;

      ctx.globalCompositeOperation = "destination-out";

      if (lastPos.current) {
        const dx    = pos.x - lastPos.current.x;
        const dy    = pos.y - lastPos.current.y;
        const dist  = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.ceil(dist / STEP_PX));
        for (let i = 0; i <= steps; i++) {
          drawCircle(ctx,
            lastPos.current.x + dx * (i / steps),
            lastPos.current.y + dy * (i / steps),
          );
        }
      } else {
        drawCircle(ctx, pos.x, pos.y);
      }

      lastPos.current = pos;
      measure(ctx);
    },
    [isRevealed, getPos, drawCircle, measure],
  );

  const handleLeave = useCallback(() => {
    lastPos.current = null;
    setIsHovering(false);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Petals: pure CSS animations — zero JS / Framer Motion overhead ── */}
      {PETALS.map((p) => (
  <div
    key={p.id}
    className="absolute pointer-events-none select-none"
    style={{
      left: `${p.x}%`,
      top: 0,
      zIndex: 5,
      willChange: "transform, opacity",
      animation: `petal-fall-${p.id} ${p.duration}s ${p.delay}s linear infinite`,
    }}
  >
    <img
      src={petalImg}
      alt=""
      style={{ width: "32px", height: "32px", objectFit: "contain" }}
    />
  </div>
))}

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-14 px-6">

        <motion.p
          className="mb-2 tracking-[0.35em] uppercase text-xs"
          style={{ color: "#1a0a00", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          A surprise awaits
        </motion.p>

        <motion.h2
          className="mb-8 text-center"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "3.5rem",
            color: "#3D0C11",
            textShadow: "0 2px 12px rgba(61,12,17,0.2)",
          }}
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Save the Date
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
          style={{ willChange: "transform", width: "min(326px, calc(100vw - 3rem))" }}
        >
          {/* Gold border glow on reveal */}
          <motion.div
            className="relative rounded-2xl p-[3px]"
            animate={
              isRevealed
                ? { boxShadow: ["0 8px 30px rgba(249,192,203,0.3)", "0 8px 40px rgba(249,192,203,0.7)", "0 8px 30px rgba(249,192,203,0.45)"] }
                : { boxShadow: "0 6px 24px rgba(249,192,203,0.35)" }
            }
            transition={{ duration: 0.55 }}
            style={{
              background: "#f9c0cb",
            }}
          >
            {/* Revealed card content */}
            <motion.div
              className="flex h-[94px] w-full flex-col items-center justify-center rounded-2xl px-8"
              style={{ background: "#fff5f7" }}
              animate={isRevealed ? { scale: [1, 1.035, 1] } : {}}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              {/* <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", letterSpacing: "0.35em", color: "#b05068" }} className="uppercase mb-2">
                Save the Date
              </p> */}
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#7a3045", fontWeight: 600, letterSpacing: "0.04em" }}>
                22nd DECEMBER, 2026
              </p>
            </motion.div>

            {/* ── Gold foil canvas ── */}
            <AnimatePresence>
              {!canvasGone && (
                <motion.canvas
                  ref={canvasRef}
                  className="absolute left-0 top-0 rounded-2xl select-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: isHovering && !isRevealed ? "crosshair" : "default",
                    willChange: "opacity",
                  }}
                  initial={{ opacity: 1 }}
                  animate={isRevealed ? { opacity: 0 } : { opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onAnimationComplete={() => { if (isRevealed) setCanvasGone(true); }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={handleLeave}
                  onMouseMove={handleMove}
                  onTouchMove={(e) => { e.preventDefault(); handleMove(e); }}
                  onTouchEnd={() => { lastPos.current = null; }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sparkle burst on reveal */}
          <AnimatePresence>
            {isRevealed && SPARKLES.map((s) => (
              <motion.div
                key={s.id}
                className="absolute pointer-events-none text-pink-300 text-sm"
                style={{ left: "50%", top: "50%", willChange: "transform, opacity" }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos((s.angle * Math.PI) / 180) * s.dist,
                  y: Math.sin((s.angle * Math.PI) / 180) * s.dist,
                  opacity: [1, 1, 0],
                  scale: [0, 1.3, 0.7],
                }}
                transition={{ duration: 0.65, delay: s.delay, ease: "easeOut" }}
              >
                ✦
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Post-reveal message */}
        <AnimatePresence>
          {isRevealed && (
            <motion.p
              className="mt-6 text-center tracking-[0.3em] text-xs uppercase"
              style={{ color: "#b05068", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              ✦ &nbsp; Mark your calendars &nbsp; ✦
            </motion.p>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        {/* FOUNTAIN — scroll-driven rise from bottom */}
        <motion.img src={fountain} className="absolute bottom-0"
          style={{ y: fountainY, opacity: fountainOpacity }}
        />
        {/* LEFT FLOWERS — scroll-driven slide from left */}
        <motion.img src={flowerRight} className="absolute bottom-0 left-0 w-44"
          style={{ x: flowerRightX, opacity: flowerSideOpacity }}
        />
        <motion.img src={flowerRight2} className="absolute bottom-32 z-5 left-0 w-40"
          style={{ x: flowerRight2X, opacity: flowerSideOpacity }}
        />
        {/* RIGHT FLOWERS — scroll-driven slide from right */}
        <motion.img src={flowerLeft} className="absolute -bottom-6 -right-4 w-40"
          style={{ x: flowerLeftX, opacity: flowerRightOpacity }}
        />
        <motion.img src={flowerLeft2} className="absolute bottom-32 right-0 w-28"
          style={{ x: flowerLeft2X, opacity: flowerRightOpacity }}
        />
      </div>
    </div>
  );
}
