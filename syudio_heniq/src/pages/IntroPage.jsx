import { useState } from 'react'
import envelopeUp   from '../assets/env_up.webp'
import envelopeDown from '../assets/envelope_down.png'
import envelopeBtn  from '../assets/envelope_button.png'

const IntroPage = ({ onComplete }) => {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    // TWEAK: match this number to the duration-[Xms] values below
    setTimeout(onComplete, 1500)
  }

  return (
    /*
     * LAYOUT NOTES (easy to tweak):
     * - envelope_up  → anchored top-0,    slides UP   on open
     * - envelope_down → anchored bottom-0, slides DOWN on open
     * - button        → centered via flex, fades + shrinks on open
     *
     * To adjust SPEED → change duration-[1200ms] on the two images
     * and the matching setTimeout value above.
     *
     * To adjust BUTTON POSITION → change mb-20 on the wrapper div
     * (increase mb to move button higher, decrease to move lower)
     *
     * To adjust BUTTON SIZE → change w-40 h-40 on the button img
     */
    <div className={`fixed inset-0 z-50 ${opened ? 'pointer-events-none' : ''}`}>

      {/* ── TOP piece (env_up.webp) — slides off the top ── */}
      {/* TWEAK: duration-[1200ms] = animation speed          */}
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

      {/* ── BOTTOM piece (envelope_down.png) — slides off the bottom ── */}
      {/* TWEAK: duration-[1200ms] = animation speed                      */}
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

      {/* ── CENTER button — fades out + shrinks instantly on tap ── */}
      {/* TWEAK: mb-20 moves button up/down                          */}
      <div className="absolute inset-0 mb-20 flex items-center justify-center z-40">
        <img
          src={envelopeBtn}
          alt="Open"
          draggable={false}
          onClick={handleOpen}
          /* TWEAK: w-40 h-40 = button size */
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
  )
}

export default IntroPage
