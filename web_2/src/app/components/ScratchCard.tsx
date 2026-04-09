import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import groom from "../assets/groom.png"

export function ScratchCard() {
  const { ref, isInView } = useInView();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Draw scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#fbbf24');
    gradient.addColorStop(0.5, '#f59e0b');
    gradient.addColorStop(1, '#d97706');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add text
    ctx.font = '20px Cormorant';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * 2;
    const y = (clientY - rect.top) * 2;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => {
    setIsScratching(false);
    checkIfRevealed();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) scratch(e);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isScratching) scratch(e);
  };

  const checkIfRevealed = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparentPixels++;
    }

    const percentRevealed = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentRevealed > 50) {
      setIsRevealed(true);
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-12 px-6 md:px-16 flex items-center justify-center bg-gradient-to-br from-amber-50 via-cream-100 to-pink-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        <h2 className='uppercase text-xl font-medium mb-10' style={{ fontFamily: 'Cormorant, serif', color: '#B79B40' }}>
          with immense joy and love
        </h2>
        <h2 className="text-5xl md:text-6xl mb-16" style={{ fontFamily: 'Great Vibes, cursive', color: '#B79B40' }}>
          Bride & Groom
        </h2>
        <p className="uppercase text-lg md:text-2xl mb-4 text-gray-700" style={{ fontFamily: 'Cormorant, serif' }}>
          Scratch to reveal the date
        </p>

        <div className="relative mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <p className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              December 25, 2026
            </p>
          </div>
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleTouchMove}
              className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer"
              style={{ touchAction: 'none' }}
            />
          )}
          
        </div>
        <img src={groom} className=' w-full h-full ' />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >

          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto items-center justify-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white rounded-xl p-2 shadow-md border-2 border-amber-400 flex flex-col items-center"
              >
                <div className="text-3xl md:text-4xl mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#ec4899' }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-gray-600 capitalize" style={{ fontFamily: 'Cormorant, serif' }}>
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
