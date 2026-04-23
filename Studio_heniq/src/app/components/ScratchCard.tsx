import { motion , useInView} from "motion/react";
import { useRef, useState, useEffect } from "react";
import bgImage from "../../asset/2_page.jpeg";
import fountain from "../../asset/2_page_fountain.png";
import flowerLeft from "../../asset/2_left_b_flower.png";
import flowerRight from "../../asset/2_right_b_flower.png";
import flowerRight2 from "../../asset/2_right_t_flower.png";
import flowerLeft2 from "../../asset/2_left_t_flower.png";

const PETALS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 6 + Math.random() * 5,
  rotation: Math.random() * 360,
  drift: (Math.random() - 0.5) * 90,
}));

export function ScratchCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [canvasGone, setCanvasGone] = useState(false);
  const strokeCountRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // willReadFrequently: true tells the browser to optimise this canvas for getImageData calls
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 180;

    // Gold foil gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0,    "#b8860b");
    gradient.addColorStop(0.2,  "#f5d76e");
    gradient.addColorStop(0.45, "#c9a84c");
    gradient.addColorStop(0.65, "#f0d060");
    gradient.addColorStop(0.85, "#d4a017");
    gradient.addColorStop(1,    "#f5d76e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Diagonal shimmer streaks
    ctx.strokeStyle = "rgba(255, 255, 200, 0.25)";
    ctx.lineWidth = 2;
    for (let i = -canvas.height; i < canvas.width + canvas.height; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }

    // Subtle vignette
    const vignette = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 30,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.75
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.25)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Label text
    ctx.fillStyle = "rgba(100, 65, 0, 0.8)";
    ctx.font = "bold 25px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  Scratch to Reveal  ✦", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "15px bold 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = "rgba(100, 65, 0, 0.6)";
    ctx.fillText("~ a special message awaits ~", canvas.width / 2, canvas.height / 2 + 20);
  }, []);

  useEffect(() => {
    if (scratchPercentage > 50 && !isRevealed) {
      setIsRevealed(true);
    }
  }, [scratchPercentage, isRevealed]);

  const getScaledPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const scratch = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { x, y } = getScaledPos(e, canvas);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 55;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    if (lastPosRef.current) {
      // Draw a smooth continuous line from last point to current
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
    } else {
      // First touch — draw a circle so a tap also erases
      ctx.arc(x, y, 27, 0, Math.PI * 2);
    }
    ctx.stroke();
    lastPosRef.current = { x, y };

    // Throttle expensive pixel count: every 10th stroke, sample 1-in-4 pixels
    strokeCountRef.current += 1;
    if (strokeCountRef.current % 10 !== 0) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 16) { // sample every 4th pixel
      if (pixels[i] === 0) transparent++;
      total++;
    }
    setScratchPercentage((transparent / total) * 100);
  };

  const stopScratching = () => {
    setIsScratching(false);
    lastPosRef.current = null; // reset so next stroke starts fresh
  };

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

      {/* Falling 🌸 Petals */}
      {PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${petal.x}%`,
            top: "-40px",
            fontSize: "20px",
            lineHeight: 1,
            zIndex: 5,
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, petal.drift],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-14 px-6">
        <motion.p
          className="mb-2 tracking-[0.35em] uppercase text-xs text-amber-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          A surprise awaits
        </motion.p>

        <motion.h2
          className="mb-8 text-center"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "2.2rem",
            color: "black",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Save the Date
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Gold border wrapper */}
          <div
            className="relative rounded-2xl p-[3px]"
            style={{
              background: "linear-gradient(135deg, #f5d76e 0%, #c9a84c 30%, #f0d060 60%, #b8860b 100%)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.55), 0 0 40px rgba(212,160,23,0.35), inset 0 1px 0 rgba(255,255,200,0.3)",
            }}
          >
            {/* Revealed content inside card */}
            <div
              className="flex h-[140px] w-[320px] flex-col items-center justify-center rounded-2xl px-8"
              style={{
                background: "linear-gradient(160deg, #1a0800 0%, #2d1200 60%, #1a0800 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  color: "#c9a84c",
                }}
                className="uppercase mb-3"
              >
                You are invited
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.9rem",
                  color: "#fff8ee",
                  lineHeight: 1.1,
                }}
                className="mb-2"
              >
                Kabir &amp; Diksha
              </p>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-10 bg-amber-600/60" />
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-500" />
                <div className="h-px w-10 bg-amber-600/60" />
              </div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1rem",
                  color: "#f5d76e",
                }}
              >
                22nd December, 2026
              </p>
            </div>

            {/* Scratch canvas — fades out smoothly once 50% is scratched */}
            {!canvasGone && (
              <motion.canvas
                ref={canvasRef}
                className="absolute left-0 top-0 cursor-crosshair rounded-2xl"
                style={{ width: "100%", height: "100%" }}
                animate={isRevealed ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onAnimationComplete={() => { if (isRevealed) setCanvasGone(true); }}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={stopScratching}
                onMouseMove={(e) => isScratching && scratch(e)}
                onMouseLeave={stopScratching}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={stopScratching}
                onTouchMove={(e) => { e.preventDefault(); isScratching && scratch(e); }}
              />
            )}
          </div>
        </motion.div>

        {isRevealed && (
          <motion.p
            className="mt-6 text-center tracking-[0.3em] text-amber-300 text-xs uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            ✦ &nbsp; Mark your calendars &nbsp; ✦
          </motion.p>
        )}
        {/* 🌊 Fountain (Top → Center) */}
      <motion.img
        src={fountain}
        className="absolute bottom-0"
        initial={{ y: 200, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* 🌺 right Flower */}
      <motion.img
        src={flowerRight}
        className="absolute bottom-0 left-0 w-44"
        initial={{ x: -150, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.img
        src={flowerRight2}
        className="absolute bottom-32 z-5 left-0 w-40"
        initial={{ x: -150, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      {/* 🌺 left Flower */}
      <motion.img
        src={flowerLeft}
        className="absolute -bottom-6 -right-4 w-40"
        initial={{ x: 150, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.img
        src={flowerLeft2}
        className="absolute bottom-32 right-0 w-28"
        initial={{ x: 150, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      </div>
    </div>
  );
}
