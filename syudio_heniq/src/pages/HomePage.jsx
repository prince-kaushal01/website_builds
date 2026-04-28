import { useState } from 'react'
import bg        from '../assets/page1_bg.png'
import bird      from '../assets/page1_bird.png'
import bottomDeco from '../assets/page1_down.png'

const HomePage = () => {
  /*
   * animKey is set to a unique timestamp on every mount.
   * Passing it as key= to each animated element forces React to
   * re-create the DOM node, which restarts the CSS animation from
   * scratch every time the user navigates back to this page.
   */
  const [animKey] = useState(() => Date.now())

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">

      {/* ── BACKGROUND ────────────────────────────────────────────── */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ── WEDDING TEXT — top-center, staggered drop-in loop ──────── */}
      {/*
       * TWEAK: top-[6%]  → vertical position of text block
       * TWEAK: text-4xl  → font size of first line
       * TWEAK: text-2xl  → font size of names line
       * TWEAK: text-sm   → font size of date line
       * TWEAK: gap-2     → spacing between lines
       * Colors, fonts, and animation timing live in index.css @theme
       */}
      <div
        key={animKey}
        className="absolute top-[6%] left-0 w-full flex flex-col items-center gap-2 z-20 px-6"
      >
        {/* Line 1 — "We're Getting Married" */}
        <span
          className="
            font-cormorant mb-5 text-4xl
            text-[black]
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]
            animate-text-l1
          "
        >
          We&apos;re Getting Married
        </span>

        {/* Line 2 — Names */}
        <span
          className="
            font-cormorant text-2xl tracking-[0.18em]
            text-[black]
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]
            animate-text-l2 mb-5
          "
        >
          Hayaa &amp; Mohammed
        </span>

        {/* Line 3 — Date */}
        <span
          className="
            font-libre text-sm tracking-[0.3em] uppercase italic
            text-[black]
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
            animate-text-l3
          "
        >
          June 7th 2026
        </span>
      </div>

      {/* ── BIRD — flies left → right, flaps wings ─────────────────── */}
      {/*
       * Outer div  → handles horizontal flight path (animate-bird-fly)
       * Inner img  → handles wing-flap oscillation (animate-bird-flap)
       * Two separate elements so the transforms don't conflict.
       *
       * TWEAK: top-[38%] → vertical position of the bird's flight path
       * TWEAK: w-14      → bird size
       * Animation speed / timing lives in index.css @theme
       */}
      <div
        key={`bird-${animKey}`}
        className="absolute top-[38%] left-0 z-10 animate-bird-fly"
      >
        <img
          src={bird}
          alt=""
          draggable={false}
          className="w-14 object-contain animate-bird-flap"
        />
      </div>
      <div
        key={`bird-${animKey}`}
        className="absolute top-[18%] left-0 z-10 animate-bird-fly"
      >
        <img
          src={bird}
          alt=""
          draggable={false}
          className="w-14 object-contain animate-bird-flap transform rotate-360"
        />
      </div>

      {/* ── BOTTOM DECORATION — slides in from below on mount ────────── */}
      {/*
       * TWEAK: z-20 keeps it above background but below text overlay
       * Animation speed lives in index.css @theme (slide-in-bottom)
       */}
      <img
        key={`bottom-${animKey}`}
        src={bottomDeco}
        alt=""
        draggable={false}
        className="absolute -bottom-8 left-0 w-full h-86 object-cover object-top z-20 animate-slide-in-bottom"
      />

    </div>
  )
}

export default HomePage
