import { useState, useEffect, useRef } from 'react'
import bg        from '../assets/page1_bg.png'
import birdVideo from '../assets/bird_video.webm'
import bottomDeco from '../assets/page1_down.png'

const HomePage = () => {
  const [birdKey, setBirdKey] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
  const el = containerRef.current
  if (!el) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      const ratio = entry.intersectionRatio

      // ENTER when ~90% visible
      if (ratio >= 0.2) {
        setBirdKey(k => k + 1)
        setIsVisible(true)
      }

      // EXIT when less than 80% visible
      if (ratio < 0.2) {
        setIsVisible(false)
      }
    },
    {
      threshold: [0.2, 0.2]
    }
  )

  observer.observe(el)
  return () => observer.disconnect()
}, [])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">

      {/* BACKGROUND */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* TEXT — run once when fully visible */}
      <div className="absolute top-[6%] left-0 w-full flex flex-col items-center gap-2 z-20 px-6">
        <span className={`font-cormorant mb-5 text-4xl text-[black] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] ${isVisible ? 'animate-text-l1-once' : ''}`}>
          We&apos;re Getting Married
        </span>

        <span className={`font-cormorant text-2xl tracking-[0.18em] text-[black] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] mb-5 ${isVisible ? 'animate-text-l2-once' : ''}`}>
          Hayaa &amp; Mohammed
        </span>

        <span className={`font-libre text-sm tracking-[0.3em] uppercase italic text-[black] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${isVisible ? 'animate-text-l3-once' : ''}`}>
          June 7th 2026
        </span>
      </div>

      {/* SINGLE BIRD */}
      <div
        key={`bird-${birdKey}`}
        className="absolute top-[30%] -rotate-16 left-0 w-full flex justify-start z-10 pointer-events-none animate-bird-fly-right"
      >
        <video
          src={birdVideo}
          autoPlay
          loop
          muted
          playsInline
          draggable={false}
          className="w-40 object-contain"
        />
      </div>

      {/* BOTTOM — enter + exit animation */}
      <img
        src={bottomDeco}
        alt=""
        draggable={false}
        className={`absolute -bottom-8 left-0 w-full h-86 object-cover object-top z-20 ${
          isVisible ? 'animate-bottom-in' : 'animate-bottom-out'
        }`}
      />
    </div>
  )
}

export default HomePage