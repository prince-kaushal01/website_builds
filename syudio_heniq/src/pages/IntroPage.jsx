import { useEffect, useState } from 'react'
import envelopeUp   from '../assets/env_up.webp'
import envelopeDown from '../assets/envelope_down.png'
import envelopeBtn  from '../assets/envelope_button.png'

const IntroPage = ({ onComplete }) => {
  const [opened,    setOpened]    = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)
  const [fadeLoader, setFadeLoader] = useState(false)

  // Preload all three envelope images before showing anything.
  // Handles both fresh downloads and already-cached images.
  useEffect(() => {
    const srcs = [envelopeUp, envelopeDown, envelopeBtn]
    let loaded = 0

    const check = () => {
      loaded++
      if (loaded >= srcs.length) {
        // Brief fade-out before revealing the envelope
        setFadeLoader(true)
        setTimeout(() => setAllLoaded(true), 400)
      }
    }

    srcs.forEach(src => {
      const img = new Image()
      img.onload  = check
      img.onerror = check  // count errors too so we never get stuck
      img.src = src
      // Already in browser cache — .complete is true immediately after src is set
      if (img.complete) {
        img.onload  = null
        img.onerror = null
        check()
      }
    })
  }, [])

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    setTimeout(onComplete, 1500)
  }

  return (
    <>
      {/* ── LOADING SCREEN ── covers everything until envelope images are ready */}
      {!allLoaded && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: '#fdf6ee',
            opacity: fadeLoader ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: fadeLoader ? 'none' : 'auto',
          }}
        >
          {/* Decorative ring spinner */}
          <div className="relative flex items-center justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full border-[3px]"
              style={{
                borderColor: '#e8c4b8',
                borderTopColor: '#7a1f1f',
                animation: 'spin 1s linear infinite',
              }}
            />
            {/* Heart in the centre of spinner */}
            <span
              className="absolute text-xl"
              style={{ color: '#7a1f1f' }}
            >
              ♡
            </span>
          </div>

          <p
            className="font-cormorant tracking-[0.25em] text-lg"
            style={{ color: '#7a1f1f' }}
          >
            Please wait…
          </p>
        </div>
      )}

      {/* ── ENVELOPE OVERLAY ── hidden until images are confirmed loaded */}
      <div
        className={`fixed inset-0 z-50 ${opened ? 'pointer-events-none' : ''}`}
        style={{
          opacity:    allLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >

        {/* TOP piece — slides off the top on open */}
        <img
          src={envelopeUp}
          alt=""
          draggable={false}
          className={`
            absolute top-0 left-0 w-full z-30
            transition-transform duration-[1500ms] ease-in-out
            ${opened ? '-translate-y-full' : 'translate-y-0'}
          `}
        />

        {/* BOTTOM piece — slides off the bottom on open */}
        <img
          src={envelopeDown}
          alt=""
          draggable={false}
          className={`
            absolute bottom-0 left-0 w-full z-20
            transition-transform duration-[1500ms] ease-in-out
            ${opened ? 'translate-y-full' : 'translate-y-0'}
          `}
        />

        {/* CENTER button — fades + shrinks on open */}
        <div className="absolute inset-0 mb-20 flex items-center justify-center z-40">
          <img
            src={envelopeBtn}
            alt="Open"
            draggable={false}
            onClick={handleOpen}
            className={`
              w-40 h-40 object-contain touch-manipulation
              transition-all duration-200
              ${opened
                ? 'opacity-0 scale-75 pointer-events-none'
                : 'opacity-100 scale-100 cursor-pointer'}
            `}
          />
        </div>

      </div>

      {/* Spin keyframe — Tailwind's animate-spin works but we need it for the
          inline style version above, so inject it once here */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}

export default IntroPage
