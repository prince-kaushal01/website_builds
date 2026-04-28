import { useState } from 'react'
import IntroPage    from './pages/IntroPage'
import HomePage     from './pages/HomePage'
import Page2        from './pages/Page2'
import GateSection  from './pages/GateSection'
import Page4        from './pages/Page4'
import Footer       from './pages/Footer'

const App = () => {
  const [introGone, setIntroGone] = useState(false)

  return (
    <div className="relative w-full h-full">

      {/*
       * Vertical snap-scroll container.
       * Swipe up on mobile to move between pages.
       * Each child div = one full-screen page.
       * TWEAK: remove 'snap-mandatory' to allow free scrolling instead.
       */}
      <div
        className="w-full h-full overflow-y-scroll"
        style={{ scrollbarWidth: 'none' }}        /* hide scrollbar Firefox */
      >
        {/* hide scrollbar Chrome/Safari */}
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {/* Page 1 — Home */}
        <div className="w-full h-full flex-shrink-0">
          <HomePage />
        </div>

        {/* Page 2 — Scratch card */}
        <div className="w-full h-full flex-shrink-0">
          <Page2 />
        </div>

        {/* Gate + Page 3 — scroll to open gates, reveals Page 3 */}
        {/* GateSection manages its own height (200vh) internally */}
        <GateSection />

        {/* Page 4 — final page */}
        <div className="w-full h-full flex-shrink-0">
          <Page4 />
        </div>

        {/* Footer — RSVP form (short, auto-height) */}
        <Footer />

      </div>

      {/* Intro overlay — sits above everything until animation completes */}
      {!introGone && (
        <IntroPage onComplete={() => setIntroGone(true)} />
      )}

    </div>
  )
}

export default App
