import { useEffect, useRef, useState } from "react";

import bg from "../assets/page3_bg.png";
import nameImg from "../assets/name.PNG";
import topleft from "../assets/page3_topleft.png";
import topcenter from "../assets/page3_topcenter.png";
import topright from "../assets/page3_topright.png";
import bottomBar from "../assets/page3_bottom.png";
import bottomcenter from "../assets/page3_bottomcenter.png";
import bottomleft from "../assets/page3_bottomleft.png";
import bottomleft2 from "../assets/page3_bottomleft2.png";
import bottomright from "../assets/page3_bottomright.png";
import bottomright2 from "../assets/page3_bottomright2.png";

const STYLES = `
  @keyframes p3-fade-up {
    from { transform: translateY(18px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;

const findScrollParent = (el) => {
  while (el && el !== document.body) {
    const oy = window.getComputedStyle(el).overflowY;
    if (oy === "scroll" || oy === "auto") return el;
    el = el.parentElement;
  }
  return document.documentElement;
};

const GateSection = () => {
  const outerRef = useRef(null);

  const [p3Active, setP3Active] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const wasOpen = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const scroller = findScrollParent(outer);

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight;

      const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));

      setP3Active(p >= 0.3);

      if (p < 0.02 && wasOpen.current) {
        setContentKey((k) => k + 1);
        wasOpen.current = false;
      }
      if (p > 0.9) wasOpen.current = true;
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const slide = (from, delay = "0s") => {
    const offMap = {
      top: "translateY(-130%)",
      bottom: "translateY(130%)",
      left: "translateX(-130%)",
      right: "translateX(130%)",
      topleft: "translate(-130%, -130%)",
      topright: "translate(130%, -130%)",
      bottomleft: "translate(-130%, 130%)",
      bottomright: "translate(130%, 130%)",
    };
    return {
      transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}, opacity 0.6s ease ${delay}`,
      transform: p3Active
        ? "translate(0,0)"
        : (offMap[from] ?? "translate(0,0)"),
      opacity: p3Active ? 1 : 0,
    };
  };

  const line = (delay) =>
    p3Active
      ? {
          animation: `p3-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) ${delay} both`,
        }
      : { opacity: 0 };

  return (
    <>
      <style>{STYLES}</style>

      <div ref={outerRef} style={{ height: "130vh" }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <img
            src={bg}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />

          <div key={contentKey} className="absolute inset-0 z-10">
            <img
              src={topleft}
              alt=""
              draggable={false}
              className="absolute top-10 -left-25 w-[48%] object-contain"
              style={slide("topleft", "0s")}
            />
            <img
              src={topleft}
              alt=""
              draggable={false}
              className="absolute top-80 -left-25 w-[48%] object-contain"
              style={slide("topleft", "0s")}
            />

            <img
              src={topcenter}
              alt=""
              draggable={false}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[38%] object-contain"
              style={slide("top", "0.07s")}
            />

            <img
              src={topright}
              alt=""
              draggable={false}
              className="absolute top-10 -right-25 w-[48%] object-contain"
              style={slide("topright", "0.04s")}
            />
            <img
              src={topright}
              alt=""
              draggable={false}
              className="absolute top-80 -right-30 w-[48%] object-contain"
              style={slide("topright", "0.04s")}
            />

            <img
              src={nameImg}
              alt=""
              draggable={false}
              className="absolute left-1/2 -translate-x-1/2 w-[30%] object-contain z-20"
              style={{ top: "22%", ...slide("top", "0.12s") }}
            />

            <div className="absolute top-[30%] mt-10 left-0 w-full flex flex-col items-center gap-[3px] z-20 px-6">
              <p
                className="font-cormorant text-[1.8vh] tracking-[0.30em] font-semibold text-center leading-relaxed w-76"
                style={{ color: "#e8d5b0", ...line("0s") }}
              >
                The Gubitras and the Hamids
                <br />
                cordially Invite you to the
              </p>

              <p
                className="font-cormorant text-[1.7rem] text-center leading-snug mt-6"
                style={{ color: "#fdf5e4", ...line("0.2s") }}
              >
                Reception of
              </p>
              <p
                className="font-cormorant text-[1.75rem] text-center leading-snug mt-[2px]"
                style={{ color: "#fdf5e4", ...line("0.2s") }}
              >
                Hayaa &amp; Mohammed
              </p>

              <div className="h-2" />
              <p
                className="font-libre text-[0.72rem] tracking-[0.28em] text-center"
                style={{ color: "#f0dfc0", ...line("0.4s") }}
              >
                Sunday 7th June 2026
              </p>
              <p
                className="font-libre text-[0.7rem] tracking-[0.18em] italic text-center mt-1"
                style={{ color: "#dcc9a0", ...line("0.55s") }}
              >
                After dark Soirée · 7:00pm onwards
              </p>
              <div className="h-2" />
              <p
                className="font-libre text-[0.8rem] tracking-[0.38em] font-bold uppercase text-center mt-[6px] mb-[2px]"
                style={{ color: "#c9973c", ...line("0.85s") }}
              >
                Venue
              </p>
              <p
                className="font-libre text-[1.6vh] text-center mt-[4px]"
                style={{ color: "#f0dfc0", ...line("0.7s") }}
              >
                The St Regis, Astor Ballroom 9th floor
              </p>
            </div>
            <img
              src={bottomBar}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-0 w-full object-contain z-50"
              style={slide("bottom", "0s")}
            />
            <img
              src={bottomleft}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-0 w-[32%] object-contain z-11"
              style={slide("bottomleft", "0.05s")}
            />
            <img
              src={bottomleft2}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-[20%] w-[24%] object-contain z-12"
              style={slide("bottomleft", "0.1s")}
            />
            <img
              src={bottomcenter}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-[40%] w-[30%] object-contain z-11"
              style={slide("bottom", "0.07s")}
            />
            <img
              src={bottomright}
              alt=""
              draggable={false}
              className="absolute bottom-0 -right-2 w-[32%] object-contain z-11"
              style={slide("bottomright", "0.05s")}
            />
            <img
              src={bottomright2}
              alt=""
              draggable={false}
              className="absolute bottom-0 right-[8%] w-[24%] object-contain z-12"
              style={slide("bottomright", "0.1s")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GateSection;
