// SOURCE: :contentReference[oaicite:0]{index=0}

import { useEffect, useRef, useState } from "react";
import bg from "../assets/page2_bg.png";
import airplaneImg from "../assets/page2_airplane.png";
import topImg from "../assets/page2_top.png";
import bottomImg from "../assets/page2_bottom.png";

const BRUSH_RADIUS = 28;
const REVEAL_THRESHOLD = 0.5;

const Page2 = () => {
  const pageRef = useRef(null);
  const canvasRef = useRef(null);
  const airplaneRef = useRef(null);
  const bottomContainerRef = useRef(null);
  const houstonRef = useRef(null);
  const mumbaiRef = useRef(null);

  const drawing = useRef(false);
  const prevPos = useRef(null);
  const moveCount = useRef(0);

  const ratioRef = useRef(0);
  const rafRef = useRef(null);

  const startPosRef = useRef(null);
  const endPosRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // ─────────────────────────────────────────────
  // SCROLL PROGRESS (START EARLY = 30% VIEWPORT)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const findScroller = (el) => {
      let node = el.parentElement;
      while (node && node !== document.documentElement) {
        const oy = window.getComputedStyle(node).overflowY;
        if (oy === "scroll" || oy === "auto") return node;
        node = node.parentElement;
      }
      return window;
    };

    const scroller = findScroller(page);

    const onScroll = () => {
      const rect = page.getBoundingClientRect();
      const vh = window.innerHeight;

      // 🔥 START POINT (change this to control when animation begins)
      const START_TRIGGER = 0.6; // 30% from top

      // 🔥 END POINT (where animation completes)
      const END_TRIGGER = -0.2; // when page goes up

      const progress =
        (START_TRIGGER * vh - rect.top) / ((START_TRIGGER - END_TRIGGER) * vh);

      ratioRef.current = Math.max(0, Math.min(1, progress));
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  // ─────────────────────────────────────────────
  // CACHE POSITIONS AFTER IMAGES LOAD
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!inView) return;

    const t = setTimeout(() => {
      const page = pageRef.current;
      const houston = houstonRef.current;
      const mumbai = mumbaiRef.current;
      const airplane = airplaneRef.current;

      if (!page || !houston || !mumbai || !airplane) return;

      const pageRect = page.getBoundingClientRect();
      const hRect = houston.getBoundingClientRect();
      const mRect = mumbai.getBoundingClientRect();

      const planeW = airplane.offsetWidth;
      const planeH = airplane.offsetHeight;

      startPosRef.current = {
        x: hRect.left - pageRect.left + hRect.width / 2 - planeW / 2,
        y: hRect.top - pageRect.top + hRect.height / 2 - planeH / 2,
      };

      endPosRef.current = {
        x: mRect.left - pageRect.left + mRect.width / 2 - planeW / 2,
        y: mRect.top - pageRect.top + mRect.height / 2 - planeH / 2,
      };
    }, 1100);

    return () => clearTimeout(t);
  }, [inView]);

  // ─────────────────────────────────────────────
  // AIRPLANE MOVEMENT (SCROLL BASED)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loop = () => {
      const progress = ratioRef.current;
      const airplane = airplaneRef.current;

      if (airplane) {
        const sp = startPosRef.current;
        const ep = endPosRef.current;

        if (sp && ep && progress > 0) {
          const x = sp.x + (ep.x - sp.x) * progress;
          const y = sp.y + (ep.y - sp.y) * progress;

          // 🔥 ROTATION FIX
          // Adjust angle offset depending on your airplane image direction
          const angle =
            (Math.atan2(ep.y - sp.y, ep.x - sp.x) * 180) / Math.PI + 300;
          // ↑ change +90 to +180 / +0 if needed

          airplane.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
          airplane.style.opacity = "1";
        } else {
          airplane.style.opacity = "0";
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ─────────────────────────────────────────────
  // INTERSECTION OBSERVER
  // ─────────────────────────────────────────────
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ─────────────────────────────────────────────
  // SCRATCH CARD (UNCHANGED)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#6B1020";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,210,210,0.85)";
    ctx.font = `600 ${Math.round(canvas.width * 0.042)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦  Scratch to reveal  ✦", canvas.width / 2, canvas.height / 2);
  }, [revealed]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startScratch = () => (drawing.current = true);
  const stopScratch = () => {
    drawing.current = false;
    prevPos.current = null;
  };

  const doScratch = (e) => {
    if (!drawing.current || revealed) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.lineCap = "round";

    ctx.beginPath();
    if (prevPos.current) {
      ctx.moveTo(prevPos.current.x, prevPos.current.y);
      ctx.lineTo(pos.x, pos.y);
    } else {
      ctx.arc(pos.x, pos.y, BRUSH_RADIUS, 0, Math.PI * 2);
    }
    ctx.stroke();

    prevPos.current = pos;

    moveCount.current++;
    if (moveCount.current % 3 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      if (cleared / (canvas.width * canvas.height) > REVEAL_THRESHOLD) {
        setRevealed(true);
      }
    }
  };

  const slideStyle = (axis, off) => ({
    transform: inView ? "translate(0,0)" : `translate${axis}(${off})`,
    transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
  });

  return (
    <div ref={pageRef} className="relative w-full h-screen overflow-hidden">

      <img src={bg} className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute -top-6 -left-20 w-full z-20" style={slideStyle("Y", "-110%")}>
        <img src={topImg} className="max-w-xl" />
        <p ref={houstonRef} className="absolute left-26 text-[#6B1020]">HOUSTON</p>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[42%] w-[78%] flex flex-col items-center z-20">
        <p className="text-[2rem] text-[#6B1020]">Save the Date</p>

        <div className="relative w-full h-12 mt-4 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-[#FFFFF0] flex items-center justify-center">
            <span className="text-[#6B1020]">7th June 2026</span>
          </div>

          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              onMouseDown={startScratch}
              onMouseUp={stopScratch}
              onMouseMove={doScratch}
              onTouchStart={startScratch}
              onTouchEnd={stopScratch}
              onTouchMove={doScratch}
            />
          )}
        </div>
      </div>

      <div
        ref={bottomContainerRef}
        className="absolute bottom-0 left-0 w-full z-20 overflow-hidden"
        style={{
          height: "38%",
          transform: inView ? "translateY(0)" : "translateY(110%)",
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <img src={bottomImg} className="absolute -bottom-10 -left-50 max-w-5xl" />
        <p ref={mumbaiRef} className="absolute top-14 right-8 text-[#6B1020]">MUMBAI</p>
      </div>

      <img
        ref={airplaneRef}
        src={airplaneImg}
        className="absolute z-30 w-20 object-contain"
        style={{ left: 0, top: 0, opacity: 0 }}
      />
    </div>
  );
};

export default Page2;