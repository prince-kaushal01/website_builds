import { useEffect, useRef, useState } from "react";

export function ScratchCard() {
    
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const ratio = window.devicePixelRatio || 1;

    // responsive size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);

    // fill scratch layer (golden tone)
    ctx.fillStyle = "#d6b37a";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // add subtle pattern
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 200; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * rect.width,
        Math.random() * rect.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const getPos = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const start = (e: any) => {
      isDrawing = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const move = (e: any) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const end = () => {
      isDrawing = false;

      // check reveal %
      const imageData = ctx.getImageData(0, 0, rect.width, rect.height);
      let cleared = 0;

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) cleared++;
      }

      const percent = cleared / (imageData.data.length / 4);
      if (percent > 0.4) {
        setIsRevealed(true);
      }
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", move);
    canvas.addEventListener("touchend", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", end);

      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md h-32 md:h-36 mx-auto rounded-2xl overflow-hidden shadow-xl">

  {/* Reveal Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md text-white">
    <p className="font-['Cormorant'] text-xs tracking-widest uppercase opacity-80">
      Wedding Date
    </p>

    <h2 className="font-['Cinzel'] text-3xl md:text-4xl mt-1">
      05 June 2026
    </h2>
  </div>

  {/* Instruction */}
  {!isRevealed && (
    <p className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] md:text-lg text-white/80 z-20 font-['Cormorant'] tracking-widest">
      Scratch to reveal
    </p>
  )}

  {/* Scratch Layer */}
  {!isRevealed && (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-pointer"
    />
  )}
</div>
  );
}