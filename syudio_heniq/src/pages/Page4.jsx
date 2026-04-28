import { useEffect, useRef, useState } from 'react'
import bg     from '../assets/page4_bg.png'
import center from '../assets/page4_center.png'

// ── All keyframes live here, not in index.css ─────────────────────────────────
const STYLES = `
  /*
   * Slow pulse on the center image once it's fully in view.
   * TWEAK: change 4s to speed up / slow down the pulse.
   */
  @keyframes p4-pulse {
    0%, 100% { transform: scale(1);    opacity: 1;    }
    50%       { transform: scale(1.04); opacity: 0.92; }
  }

  /*
   * Ambient glow ring behind center image.
   * TWEAK: change 3s to alter glow speed.
   */
  @keyframes p4-glow {
    0%, 100% { opacity: 0.35; transform: scale(1);    }
    50%       { opacity: 0.6;  transform: scale(1.08); }
  }

  /*
   * One-shot text line reveal: slides up + fades in, then stays.
   * animation-fill-mode: both → hidden before delay, visible after.
   */
  @keyframes p4-fade-up {
    from { transform: translateY(14px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`

// ── Walk up DOM to find the nearest scrollable parent ─────────────────────────
const findScrollParent = (el) => {
  while (el && el !== document.body) {
    const oy = window.getComputedStyle(el).overflowY
    if (oy === 'scroll' || oy === 'auto') return el
    el = el.parentElement
  }
  return document.documentElement
}

// ─────────────────────────────────────────────────────────────────────────────

const Page4 = () => {
  const pageRef = useRef(null)
  const [inView,       setInView]       = useState(false)
  const [textAnimKey,  setTextAnimKey]  = useState(0)
  const prevInView                      = useRef(false)

  // Unique timestamp on each mount restarts image animations when user comes back
  const [animKey] = useState(() => Date.now())

  // IntersectionObserver — trigger when 40 % of the page is visible
  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Bump textAnimKey on every in-view entry so text re-animates each visit
  useEffect(() => {
    if (inView && !prevInView.current) setTextAnimKey(k => k + 1)
    prevInView.current = inView
  }, [inView])

  // ── Text line helper ──────────────────────────────────────────────────────
  // Returns animation style when in-view; opacity:0 otherwise.
  // TWEAK: change 0.6s to speed/slow each line; change delays to adjust stagger.
  const textLine = (delay) => inView
    ? { animation: `p4-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) ${delay} both` }
    : { opacity: 0 }

  return (
    <>
      <style>{STYLES}</style>

      <div ref={pageRef} className="relative w-full h-full overflow-hidden">

        {/* ── BACKGROUND ─────────────────────────────────────────────── */}
        <img
          src={bg}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* ── AMBIENT GLOW behind center image ───────────────────────── */}
        <div
          key={`glow-${animKey}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,220,160,0.45) 0%, transparent 70%)',
            filter:     'blur(24px)',
            animation:  inView ? 'p4-glow 3s ease-in-out infinite' : 'none',
            opacity:    inView ? undefined : 0,
            transition: 'opacity 1s ease',
          }}
        />

        {/* ── CENTER IMAGE + TEXT OVERLAY ────────────────────────────── */}
        {/*
         * The image and text share the same relative container so text is
         * strictly bounded to the image area — it cannot overflow the frame.
         *
         * TWEAK: max-w-sm / max-w-md / max-w-lg → change overall card size
         */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div
            key={`center-${animKey}`}
            className="relative w-full max-w-sm"
            style={{
              /*
               * Entry: scale up from 0.78 → 1 over 1.1s (transition).
               * Pulse: starts after entry completes (1.1s delay) and runs
               *        forever on the SAME element → image + text move as one.
               * The 1.1s delay prevents transition ↔ animation conflict on
               * the transform property.
               */
              transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
              transform:  inView ? 'scale(1)' : 'scale(0.78)',
              opacity:    inView ? 1 : 0,
              animation:  inView ? 'p4-pulse 4s ease-in-out 1.1s infinite' : 'none',
            }}
          >
            {/* The card / frame image — pulse now handled by parent */}
            <img
              src={center}
              alt=""
              draggable={false}
              className="w-full object-contain"
            />

            {/* ── TEXT OVERLAY ──────────────────────────────────────────── */}
            {/*
             * absolute inset-0 → covers exactly the image bounds, no overflow.
             * flex col + justify-center keeps text vertically centred on the card.
             *
             * TWEAK: pt-[28%] → push text down if the frame has a top ornament
             * TWEAK: px-[18%] → horizontal padding so text stays inside the frame
             */}
            <div
              key={textAnimKey}
              className="absolute inset-0 flex flex-col items-center justify-center gap-[5px] px-[20%] pt-[30%] pb-[14%]"
            >

              {/* ── Line 1 — script sentiment, Great Vibes ────────────── */}
              {/*
               * Great Vibes is a flowing script that reads warm + personal.
               * TWEAK: text-[1.6rem] → make the script larger or smaller.
               * TWEAK: #1e0d00 → deepen or lighten the text colour.
               */}
              <p
                className="font-libre text-[1rem] text-center leading-tight"
                style={{ color: 'white', ...textLine('0s') }}
              >
                With hearts full of gratitude
              </p>

              {/* ── Line 2 — script continuation ─────────────────────── */}
              <p
                className="font-libre text-[0.8rem] text-center leading-tight"
                style={{ color: 'white', ...textLine('0.22s') }}
              >
                we welcome your presence
              </p>

              {/* ── Ornament divider ──────────────────────────────────── */}
              {/*
               * Small ✦ flanked by thin rules gives a jewellery-box feel.
               * TWEAK: change #b8822a for a cooler or warmer gold.
               */}
              <div
                className="flex items-center gap-2 w-full justify-center mt-[6px] mb-[4px]"
                style={textLine('0.42s')}
              >
                <span className="flex-1 border-t" style={{ borderColor: '#b8822a' }} />
                <span
                  className="text-[0.5rem]"
                  style={{ color: '#b8822a', fontFamily: 'serif' }}
                >
                  ✦
                </span>
                <span className="flex-1 border-t" style={{ borderColor: '#b8822a' }} />
              </div>

              {/* ── Line 3 — family names, Cormorant small-caps ──────── */}
              {/*
               * Libre Baskerville uppercase + wide tracking reads as a
               * formal engraved nameplate — distinct from the script above.
               * TWEAK: tracking-[0.22em] → compress or expand letter spacing.
               * TWEAK: text-[0.5rem]    → shrink/grow the name line.
               */}
              <p
                className="font-libre text-[0.5rem] tracking-[0.22em] uppercase text-center leading-loose"
                style={{ color: 'white', ...textLine('0.6s') }}
              >
                The Gubitra &amp; Hamid Families
              </p>

            </div>
            {/* ── END TEXT OVERLAY ────────────────────────────────────── */}

          </div>
        </div>

      </div>
    </>
  )
}

export default Page4
