import { useEffect, useRef, useState } from 'react'

// ── Gate images ───────────────────────────────────────────────────────────────
import leftGate  from '../assets/page3_leftgate.jpeg'
import rightGate from '../assets/page3_rightgate.jpeg'

// ── Page 3 assets ─────────────────────────────────────────────────────────────
import bg           from '../assets/page3_bg.png'
import nameImg      from '../assets/name.PNG'
import topleft      from '../assets/page3_topleft.png'
import topcenter    from '../assets/page3_topcenter.png'
import topright     from '../assets/page3_topright.png'
import bottomBar    from '../assets/page3_bottom.png'
import bottomcenter from '../assets/page3_bottomcenter.png'
import bottomleft   from '../assets/page3_bottomleft.png'
import bottomleft2  from '../assets/page3_bottomleft2.png'
import bottomright  from '../assets/page3_bottomright.png'
import bottomright2 from '../assets/page3_bottomright2.png'

// ── Local keyframes ───────────────────────────────────────────────────────────
const STYLES = `
  /*
   * One-shot line-by-line reveal: slides up from below + fades in.
   * animation-fill-mode: both → starts hidden, ends visible (no flash).
   */
  @keyframes p3-fade-up {
    from { transform: translateY(18px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`

// ── Easing helper ─────────────────────────────────────────────────────────────
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

// ── Find nearest scrollable ancestor ─────────────────────────────────────────
const findScrollParent = (el) => {
  while (el && el !== document.body) {
    const oy = window.getComputedStyle(el).overflowY
    if (oy === 'scroll' || oy === 'auto') return el
    el = el.parentElement
  }
  return document.documentElement
}

// ─────────────────────────────────────────────────────────────────────────────

const GateSection = () => {
  const outerRef = useRef(null)

  const [gateProgress, setGateProgress] = useState(0)
  const [contentKey,   setContentKey]   = useState(0)
  const wasOpen = useRef(false)

  useEffect(() => {
    const outer    = outerRef.current
    if (!outer) return
    const scroller = findScrollParent(outer)

    const onScroll = () => {
      const rect = outer.getBoundingClientRect()
      const vh   = window.innerHeight
      const p    = Math.min(1, Math.max(0, (vh - rect.top) / vh))
      setGateProgress(p)

      if (p < 0.02 && wasOpen.current) {
        setContentKey(k => k + 1)
        wasOpen.current = false
      }
      if (p > 0.9) wasOpen.current = true
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [])

  const gateX    = easeInOut(gateProgress) * 100

  // Content activates earlier (0.75) so animations finish during the short dwell
  // TWEAK: lower = content appears sooner while gates are still opening
  const p3Active = gateProgress >= 0.75

  // ── Decorative image slide helper (unchanged) ─────────────────────────────
  const slide = (from, delay = '0s') => {
    const offMap = {
      top:         'translateY(-130%)',
      bottom:      'translateY(130%)',
      left:        'translateX(-130%)',
      right:       'translateX(130%)',
      topleft:     'translate(-130%, -130%)',
      topright:    'translate(130%, -130%)',
      bottomleft:  'translate(-130%, 130%)',
      bottomright: 'translate(130%, 130%)',
    }
    return {
      transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}, opacity 0.6s ease ${delay}`,
      transform:  p3Active ? 'translate(0,0)' : (offMap[from] ?? 'translate(0,0)'),
      opacity:    p3Active ? 1 : 0,
    }
  }

  // ── One-shot text line animation ──────────────────────────────────────────
  // Each line fades+slides up once when gates open, then stays visible.
  // TWEAK: change duration (0.55s) or delays to adjust stagger feel.
  const line = (delay) => p3Active
    ? { animation: `p3-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) ${delay} both` }
    : { opacity: 0 }

  return (
    <>
      <style>{STYLES}</style>

      {/*
       * Outer container scroll budget:
       *   First 100vh → gates go from closed to open (approach phase)
       *   Next   30vh → stable dwell: content animations finish
       *
       * Reduced from 200vh → 130vh to remove the long extra-scroll dwell.
       * TWEAK: increase toward 200vh for a longer stable view after gates open.
       */}
      <div ref={outerRef} style={{ height: '130vh' }}>

        <div className="sticky top-0 w-full h-screen overflow-hidden">

          {/* ── BACKGROUND ──────────────────────────────────────────────── */}
          <img
            src={bg}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />

          {/* ── PAGE 3 CONTENT ──────────────────────────────────────────── */}
          <div key={contentKey} className="absolute inset-0 z-10">

            {/* Top-left decoration (unchanged) */}
            <img
              src={topleft}
              alt=""
              draggable={false}
              className="absolute top-10 -left-25 w-[48%] object-contain"
              style={slide('topleft', '0s')}
            />
            <img
              src={topleft}
              alt=""
              draggable={false}
              className="absolute top-80 -left-25 w-[48%] object-contain"
              style={slide('topleft', '0s')}
            />

            {/* Top-center decoration (unchanged) */}
            <img
              src={topcenter}
              alt=""
              draggable={false}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[38%] object-contain"
              style={slide('top', '0.07s')}
            />

            {/* Top-right decoration (unchanged) */}
            <img
              src={topright}
              alt=""
              draggable={false}
              className="absolute top-10 -right-25 w-[48%] object-contain"
              style={slide('topright', '0.04s')}
            />
            <img
              src={topright}
              alt=""
              draggable={false}
              className="absolute top-80 -right-30 w-[48%] object-contain"
              style={slide('topright', '0.04s')}
            />

            {/* ── ALLAH NAME IMAGE — centered, just below top-center ────── */}
            {/* TWEAK: top-[14%] → move up/down; w-[28%] → resize           */}
            <img
              src={nameImg}
              alt=""
              draggable={false}
              className="absolute left-1/2 -translate-x-1/2 w-[30%] object-contain z-20"
              style={{ top: '20%', ...slide('top', '0.12s') }}
            />

            {/* ── TEXT BLOCK ───────────────────────────────────────────────── */}
            {/*
             * Positioned between the top images and bottom decorations.
             * All lines animate in one-by-one with staggered delays.
             * Colors chosen for legibility on a dark-red background.
             *
             * TWEAK: top-[27%] → shift entire block up/down
             * TWEAK: gap-[3px] → tighten/loosen line spacing
             */}
            <div className="absolute top-[30%] left-0 w-full flex flex-col items-center gap-[3px] z-20 px-6">

              {/* ── Invite line ──────────────────────────────────────────── */}
              {/* TWEAK: text-[0.62rem] → font size */}
              <p
                className="font-cormorant text-[1.6vh] tracking-[0.22em] text-center leading-relaxed"
                style={{ color: '#e8d5b0', ...line('0s') }}
              >
                The Gubitras and the Hamids<br />cordially invite you to
              </p>

              {/* ── Reception headline (bigger font) ─────────────────────── */}
              {/* TWEAK: text-[1.75rem] → headline size */}
              <p
                className="font-cormorant text-[1.75rem] text-center leading-snug mt-[2px]"
                style={{ color: '#fdf5e4', ...line('0.2s') }}
              >
                The reception of<br />Hayaa &amp; Mohammed
              </p>

              {/* ── Spacer ───────────────────────────────────────────────── */}
              <div className="h-2" />

              {/* ── Date ─────────────────────────────────────────────────── */}
              {/* TWEAK: tracking-[0.28em] → letter spacing */}
              <p
                className="font-libre text-[0.62rem] tracking-[0.28em] text-center"
                style={{ color: '#f0dfc0', ...line('0.4s') }}
              >
                Sunday 7th June 2026
              </p>

              {/* ── Time ─────────────────────────────────────────────────── */}
              <p
                className="font-libre text-[0.6rem] tracking-[0.18em] italic text-center"
                style={{ color: '#dcc9a0', ...line('0.55s') }}
              >
                After dark Soirée · 7:30pm onwards
              </p>

              {/* ── Venue name (different font — Great Vibes) ────────────── */}
              {/* TWEAK: text-[1rem] → size of this line */}
              <p
                className="font-libre text-[1.3vh] text-center mt-[4px]"
                style={{ color: '#f0dfc0', ...line('0.7s') }}
              >
                The St Regis, Astor Ballroom 9th floor
              </p>

              {/* ── Spacer ───────────────────────────────────────────────── */}
              <div className="h-2" />

              {/* ── VENUE label ──────────────────────────────────────────── */}
              <p
                className="font-libre text-[0.8rem] tracking-[0.38em] font-bold uppercase text-center mt-[6px] mb-[2px]"
                style={{ color: '#c9973c', ...line('0.85s') }}
              >
                Venue
              </p>

              {/* ── Venue name line ───────────────────────────────────────── */}
              <p
                className="font-cormorant text-[0.72rem] tracking-[0.16em] text-center font-semibold"
                style={{ color: '#f0dfc0', ...line('0.95s') }}
              >
                The St Regis
              </p>

              {/* ── Address ───────────────────────────────────────────────── */}
              <p
                className="font-cormorant text-[0.78rem] tracking-[0.1em] text-center leading-relaxed"
                style={{ color: '#dcc9a0', ...line('1.05s') }}
              >
                462, Senapati Bapat Marg, Lower Parel<br />Mumbai, Maharashtra, 400013
              </p>

              {/* ── Landmark ──────────────────────────────────────────────── */}
              <p
                className="font-cormorant text-[0.77rem] tracking-[0.14em] italic text-center font-semibold"
                style={{ color: '#c9b090', ...line('1.15s') }}
              >
                Next to Palladium Mall
              </p>

            </div>

            {/* ── Bottom decorations (all unchanged) ──────────────────────── */}
            <img
              src={bottomBar}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-0 w-full object-contain z-50"
              style={slide('bottom', '0s')}
            />
            <img
              src={bottomleft}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-0 w-[32%] object-contain z-11"
              style={slide('bottomleft', '0.05s')}
            />
            <img
              src={bottomleft2}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-[20%] w-[24%] object-contain z-12"
              style={slide('bottomleft', '0.1s')}
            />
            <img
              src={bottomcenter}
              alt=""
              draggable={false}
              className="absolute bottom-0 left-[40%] w-[30%] object-contain z-11"
              style={slide('bottom', '0.07s')}
            />
            <img
              src={bottomright}
              alt=""
              draggable={false}
              className="absolute bottom-0 -right-2 w-[32%] object-contain z-11"
              style={slide('bottomright', '0.05s')}
            />
            <img
              src={bottomright2}
              alt=""
              draggable={false}
              className="absolute bottom-0 right-[8%] w-[24%] object-contain z-12"
              style={slide('bottomright', '0.1s')}
            />

          </div>

          {/* ── LEFT GATE (unchanged) ───────────────────────────────────── */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full z-30 overflow-hidden"
            style={{ transform: `translateX(-${gateX}%)` }}
          >
            <img
              src={leftGate}
              alt=""
              draggable={false}
              className="w-full h-full object-cover object-right"
            />
          </div>

          {/* ── RIGHT GATE (unchanged) ──────────────────────────────────── */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full z-30 overflow-hidden"
            style={{ transform: `translateX(${gateX}%)` }}
          >
            <img
              src={rightGate}
              alt=""
              draggable={false}
              className="w-full h-full object-cover object-left"
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default GateSection
