import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import groom from "../assets/groom.png";

export function ScratchCard() {
  const { ref, isInView } = useInView();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // ✅ REAL COUNTDOWN
  const weddingDate = new Date(2026, 5, 5, 10, 0, 0).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(
          0,
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        ),
        minutes: Math.max(
          0,
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        ),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  // 🎨 SCRATCH SETUP
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#fbbf24");
    gradient.addColorStop(1, "#d97706");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.font = "20px Cormorant";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal", rect.width / 2, rect.height / 2);
  }, []);
  const handleStart = () => {
    setIsScratching(true);
  };

  const handleEnd = () => {
    setIsScratching(false);

    // Check reveal percentage
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;

    for (let i = 3; i < pixels.data.length; i += 4) {
      if (pixels.data[i] === 0) transparent++;
    }

    const percent = transparent / (pixels.data.length / 4);

    if (percent > 0.4) {
      setIsRevealed(true);
    }
  };

  const scratch = (e: any) => {
    if (!isScratching || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * 2;
    const y = (clientY - rect.top) * 2;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <section
      ref={ref}
      className="h-screen py-12 px-6 md:px-16 flex flex-col items-center bg-[#FAF7EE]"
    >
      {/* MAIN CONTAINER */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* LEFT */}
        <div className="w-full md:h-full md:py-20 md:w-1/2 flex items-center justify-center flex-col md:gap-10 md:text-left">
          <motion.h2
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#B79B40] font-['Cormorant'] mb-6 md:mb-4"
          >
            With immense joy and love
          </motion.h2>

          <motion.h2
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl mb-6 text-[#B79B40] "
            style={{ fontFamily: "Great Vibes" }}
          >
            Diksha & Kabir
          </motion.h2>

          {/* SCRATCH CARD */}
          <div className="mt-4 md:mt-0 md:mb-6 relative w-full max-w-sm mx-auto md:mx-0">
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/40">
              <motion.p
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }
                }
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl text-center font-semibold text-[#B79B40]  font-['Great Vibes']"
              >
                05 June 2026
              </motion.p>
            </div>

            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onMouseMove={scratch}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
                onTouchMove={scratch}
                className="absolute inset-0 w-full h-full rounded-xl cursor-pointer"
              />
            )}
          </div>
          {/* COUNTDOWN BOTTOM */}
          <div className="hidden md:grid grid-cols-4 gap-4 max-w-xl mx-auto items-center justify-center">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.1, // stagger effect
                }}
                className="bg-white rounded-xl p-2 shadow-md border-2 border-amber-400 flex flex-col items-center"
              >
                <div
                  className="text-3xl md:text-4xl mb-2"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 600,
                    color: "#ec4899",
                  }}
                >
                  {String(value).padStart(2, "0")}
                </div>
                <div
                  className="text-sm md:text-base text-gray-600 capitalize"
                  style={{ fontFamily: "Cormorant, serif" }}
                >
                  {unit}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:flex-col">
            <p className="text-[#B79B40] font-['Cormorant'] md:mb-2 md:text-xl">
              Save the date
            </p>
            <p
              style={{ fontFamily: "Great Vibes" }}
              className="text-4xl  text-[#B79B40]"
            >
              Wedding Events
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.img
            src={groom}
            className="w-64 md:w-full max-w-md object-contain"
            animate={{
              scale: [1, 1.08, 1], // zoom in → out
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        {/* COUNTDOWN BOTTOM */}
        <div className="md:hidden grid grid-cols-4 gap-4 max-w-xl mx-auto items-center justify-center mb-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-white rounded-xl p-2 shadow-md border-2 border-amber-400 flex flex-col items-center"
            >
              <div
                className="text-3xl md:text-4xl mb-2"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 600,
                  color: "#ec4899",
                }}
              >
                {String(value).padStart(2, "0")}
              </div>
              <div
                className="text-sm md:text-base text-gray-600 capitalize"
                style={{ fontFamily: "Cormorant, serif" }}
              >
                {unit}
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden flex items-center justify-center flex-col">
          <motion.p
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#B79B40] font-['Cormorant'] mb-4"
          >
            Save the date
          </motion.p>
          <motion.p
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: "Great Vibes" }}
            className="text-4xl text-[#B79B40]"
          >
            Wedding Events
          </motion.p>
        </div>
      </div>
    </section>
  );
}
