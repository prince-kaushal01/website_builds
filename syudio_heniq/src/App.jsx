import { useEffect, useRef, useState } from 'react'
import IntroPage    from './pages/IntroPage'
import HomePage     from './pages/HomePage'
import Page2        from './pages/Page2'
import GateSection  from './pages/GateSection'
import Page4        from './pages/Page4'
import Footer       from './pages/Footer'
import songSrc      from './assets/song.mp3'

const App = () => {
  const [introGone, setIntroGone] = useState(false)
  const audioRef = useRef(null)
  useEffect(() => {
    if (!introGone) return
    const audio = new Audio(songSrc)
    audio.currentTime = 8        // start at 00:08
    audio.play().catch(() => {}) 
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [introGone])

  return (
    <div className="relative w-full h-full">
      <div
        className="w-full h-full overflow-y-scroll"
        style={{ scrollbarWidth: 'none' }}        /* hide scrollbar Firefox */
      >
        {/* hide scrollbar Chrome/Safari */}
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {/* Page 1 — Home */}
        <div className="w-full h-full flex-shrink-0">
          <HomePage ready={introGone} />
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
