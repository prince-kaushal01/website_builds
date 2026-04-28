import { useCallback, useEffect, useRef, useState } from 'react'
import bg          from '../assets/page2_bg.png'
import airplaneImg from '../assets/page2_airplane.png'
import topImg      from '../assets/page2_top.png'
import bottomImg   from '../assets/page2_bottom.png'

// ─── Scratch-card config ──────────────────────────────────────────────────────
const BRUSH_RADIUS      = 28
const REVEAL_THRESHOLD  = 0.50

// ─── Helpers ──────────────────────────────────────────────────────────────────
const easeOutCubic    = (t) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic  = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const lerp         = (a, b, t) => a + (b - a) * t

const getScrollParent = (el) => {
  let node = el.parentElement
  while (node) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowY === 'scroll' || overflowY === 'auto') return node
    node = node.parentElement
  }
  return window
}

// ─────────────────────────────────────────────────────────────────────────────

const Page2 = () => {
  const pageRef            = useRef(null)
  const canvasRef          = useRef(null)
  const airplaneRef        = useRef(null)
  const contrailRef        = useRef(null)
  const bottomContainerRef = useRef(null)

  // Scratch internals
  const drawing   = useRef(false)
  const prevPos   = useRef(null)
  const moveCount = useRef(0)

  // Airplane animation state (all refs — no React re-renders)
  const ratioRef        = useRef(0)    // 0→1 animation progress
  const animStartRef    = useRef(null) // timestamp when plane animation began
  const prevXRef        = useRef(null) // previous frame's X position (for velocity)
  const bankRef         = useRef(0)    // current smoothed bank angle (degrees)
  const rafLoopRef      = useRef(null) // continuous rAF handle

  const [inView,   setInView]   = useState(false)
  const [revealed, setRevealed] = useState(false)

  // ── Scroll listener — only updates ratioRef, no DOM writes ───────────────
  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const container = getScrollParent(el)

    const readRatio = () => {
      const cRect = (container === window)
        ? { top: 0, bottom: window.innerHeight }
        : container.getBoundingClientRect()
      const pRect = el.getBoundingClientRect()
      const overlapTop    = Math.max(pRect.top,    cRect.top)
      const overlapBottom = Math.min(pRect.bottom, cRect.bottom)
      ratioRef.current = Math.max(0, Math.min(1,
        (overlapBottom - overlapTop) / pRect.height))
    }

    readRatio()
    container.addEventListener('scroll', readRatio, { passive: true })
    return () => container.removeEventListener('scroll', readRatio)
  }, [])

  // ── Continuous rAF loop — all visual effects live here ───────────────────
  // Runs every frame so bob + tilt are silky-smooth regardless of scroll rate.
  useEffect(() => {
    const PLANE_W = 80   // px  (w-20 = 80 px)
    // TWEAK: BOB_AMP → vertical float amplitude in px
    const BOB_AMP = 5
    // TWEAK: BOB_SPEED → lower = slower float (ms per full cycle / 2π)
    const BOB_SPEED = 1000
    // TWEAK: MAX_BANK → maximum nose-up tilt in degrees
    const MAX_BANK = 10
    // TWEAK: BANK_SMOOTH → 0-1, lower = snappier tilt response
    const BANK_SMOOTH = 0.88

    const frame = () => {
      const ANIM_DURATION = 13000  // ms — full flight duration
      if (pageRef.current) {
        const r = pageRef.current.getBoundingClientRect()

        // Arm once page top is within 60px of viewport top (page fully/nearly scrolled in).
        // Wide tolerance so it reliably fires in both free-scroll and snap-scroll layouts.
        if (animStartRef.current === null && r.top <= 60) {
          animStartRef.current = Date.now()
        }

        // Reset only when page has scrolled fully off the bottom (user went back up).
        if (r.top > window.innerHeight) {
          animStartRef.current = null
          ratioRef.current     = 0
        }

        if (animStartRef.current !== null) {
          ratioRef.current = Math.min(1, (Date.now() - animStartRef.current) / ANIM_DURATION)
        }
      }

      const ratio    = ratioRef.current
      const progress = easeInOutCubic(ratio)
      const vw = window.innerWidth
      const vh = window.innerHeight

      // ── Bee-style path: sinusoidal loops layered over the base trajectory ────
      // Two oscillations at coprime frequencies (×3.2π and ×4.8π) produce a
      // figure-8 / looping weave from start to end, like a bee in flight.
      const sx = vw * 0.86, sy =  vh * 0.26   // start (lower-right)
      const ex = vw * 0.03, ey = -vh * 0.50   // end   (upper-left)

      const baseX = sx + (ex - sx) * progress
      const baseY = sy + (ey - sy) * progress

      const x = baseX + Math.sin(progress * Math.PI * 3.2) * vw * 0.09
      const y = baseY + Math.sin(progress * Math.PI * 4.8) * vh * 0.11

      // Velocity vector so the nose always faces the direction of travel
      const dtx = (ex - sx) + Math.cos(progress * Math.PI * 3.2) * Math.PI * 3.2 * vw * 0.09
      const dty = (ey - sy) + Math.cos(progress * Math.PI * 4.8) * Math.PI * 4.8 * vh * 0.11
      const pathAngle = Math.atan2(dty, dtx) * (180 / Math.PI)

      // Velocity for bank calculation (computed before updating prevXRef)
      const dx = prevXRef.current !== null ? x - prevXRef.current : 0
      prevXRef.current = x

      // ── Airplane ──────────────────────────────────────────────────────────
      if (airplaneRef.current) {
        const bankTarget = Math.max(-MAX_BANK, Math.min(0, dx * 0.5))
        bankRef.current  = lerp(bankRef.current, bankTarget, 1 - BANK_SMOOTH)

        const bobY = progress > 0.04
          ? Math.sin(Date.now() / BOB_SPEED) * BOB_AMP
          : 0

        airplaneRef.current.style.transform =
          `translateX(${x}px) translateY(${y + bobY}px) rotate(${pathAngle + bankRef.current - 30}deg)`
        airplaneRef.current.style.opacity = animStartRef.current !== null ? '1' : '0'
      }

      // ── Contrail ──────────────────────────────────────────────────────────
      if (contrailRef.current) {
        const speed      = Math.abs(dx)
        const planeRight = x + PLANE_W
        const trailW     = Math.max(0, vw * 1.1 - planeRight)
        const opacity    = (animStartRef.current !== null && speed > 0) ? Math.min(0.55, speed * 0.12) : 0

        contrailRef.current.style.transform = `translateX(${planeRight}px) translateY(${y}px)`
        contrailRef.current.style.width     = `${trailW}px`
        contrailRef.current.style.opacity   = String(opacity)
      }

      // ── Bottom image ──────────────────────────────────────────────────────
      if (bottomContainerRef.current) {
        const p = easeOutCubic(Math.min(1, ratio / 0.4))
        bottomContainerRef.current.style.transform = `translateY(${(1 - p) * 110}%)`
      }

      rafLoopRef.current = requestAnimationFrame(frame)
    }

    rafLoopRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafLoopRef.current) cancelAnimationFrame(rafLoopRef.current)
    }
  }, [])

  // ── IntersectionObserver — drives top-image + text CSS slide ──────────────
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

  // ── Scratch-card canvas init / reset ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return

    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    moveCount.current = 0
    prevPos.current   = null

    const ctx = canvas.getContext('2d')

    // Gold gradient scratch layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    grad.addColorStop(0,    '#b8893a')
    grad.addColorStop(0.45, '#edd98a')
    grad.addColorStop(0.55, '#edd98a')
    grad.addColorStop(1,    '#b8893a')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Diagonal shine streaks
    ctx.save()
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'
    ctx.lineWidth   = 1.5
    for (let x = -canvas.height; x < canvas.width + canvas.height; x += 16) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + canvas.height, canvas.height)
      ctx.stroke()
    }
    ctx.restore()

    // Hint text
    ctx.fillStyle    = 'rgba(100,60,5,0.78)'
    ctx.font         = `600 ${Math.round(canvas.width * 0.042)}px serif`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦  Scratch to reveal  ✦', canvas.width / 2, canvas.height / 2)
  }, [revealed])

  // ── Scratch helpers ────────────────────────────────────────────────────────
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const src  = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * (canvas.width  / rect.width),
      y: (src.clientY - rect.top)  * (canvas.height / rect.height),
    }
  }

  const checkReveal = (canvas) => {
    const ctx  = canvas.getContext('2d')
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) cleared++
    }
    if (cleared / (canvas.width * canvas.height) > REVEAL_THRESHOLD) {
      setRevealed(true)
    }
  }

  const startScratch = useCallback((e) => {
    drawing.current = true
    prevPos.current = null   // reset so first stroke starts fresh
  }, [])

  const stopScratch = useCallback(() => {
    drawing.current = false
    prevPos.current = null
  }, [])

  const doScratch = useCallback((e) => {
    if (!drawing.current || revealed) return
    e.preventDefault()

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const pos    = getPos(e, canvas)

    // Smooth continuous line — lineTo connects the current point to the previous
    // one, eliminating the gaps that appear with individual arc() dots.
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth  = BRUSH_RADIUS * 2
    ctx.lineCap    = 'round'
    ctx.lineJoin   = 'round'
    ctx.shadowBlur = 0

    ctx.beginPath()
    if (prevPos.current) {
      ctx.moveTo(prevPos.current.x, prevPos.current.y)
      ctx.lineTo(pos.x, pos.y)
    } else {
      // First point: draw a circle so there's no invisible gap at stroke start
      ctx.arc(pos.x, pos.y, BRUSH_RADIUS, 0, Math.PI * 2)
    }
    ctx.stroke()
    ctx.fill()

    prevPos.current = pos

    // Check reveal threshold every 3 moves (responsive but not per-pixel-expensive)
    moveCount.current++
    if (moveCount.current % 3 === 0) checkReveal(canvas)
  }, [revealed])

  // ── CSS transition helper (top-image + text only) ─────────────────────────
  const slideStyle = (axis, offscreen, delay = '0s') => ({
    transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}`,
    transform:  inView ? 'translate(0,0)' : `translate${axis}(${offscreen})`,
  })

  return (
    <div ref={pageRef} className="relative w-full h-screen overflow-hidden">

      {/* ── BACKGROUND ──────────────────────────────────────────────────── */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ── TOP IMAGE — slides down from above on page enter ────────────── */}
      <img
        src={topImg}
        alt=""
        draggable={false}
        className="absolute -top-10 -left-20 max-w-2xl z-20"
        style={slideStyle('Y', '-110%', '0.08s')}
      />

      {/*  */}

      {/* ── SCRATCH CARD ─────────────────────────────────────────────────── */}
      {/* TWEAK: top-[42%] → card vertical position                          */}
      {/* TWEAK: w-[78%]   → card width                                      */}
      {/* TWEAK: h-12      → card height                                     */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[78%] h-12 rounded-xl overflow-hidden"
        style={{
          top:       '42%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.28), 0 0 0 1px rgba(200,163,74,0.4)',
        }}
      >
        {/* Date is ALWAYS visible at full opacity — the canvas sits on top and
            erases to reveal it. No opacity toggle needed. */}
        <div className="absolute inset-0 bg-[#fdf6ec] flex items-center justify-center px-4">
          <span className="font-libre text-[0.62rem] tracking-[0.32em] uppercase italic text-[#8b5e3c]">
            7th June 2026 · Mumbai
          </span>
        </div>

        {/* Gold scratch layer — removed from DOM once revealed */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none"
            style={{ cursor: 'crosshair' }}
            onMouseDown={startScratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onMouseMove={doScratch}
            onTouchStart={startScratch}
            onTouchEnd={stopScratch}
            onTouchCancel={stopScratch}
            onTouchMove={doScratch}
          />
        )}
      </div>

      {/* ── BOTTOM IMAGE — scroll-driven, slides up from below ───────────── */}
      {/* Fully settled at 40 % page visibility; reverses on scroll-out.      */}
      {/* TWEAK: height '38%' → how much of bottom image is exposed           */}
      <div
        ref={bottomContainerRef}
        className="absolute bottom-0 left-0 w-full z-20 overflow-hidden"
        style={{ height: '38%', transform: 'translateY(110%)' }}
      >
        <img
          src={bottomImg}
          alt=""
          draggable={false}
          className="absolute -bottom-10 -left-50 max-w-5xl object-cover object-bottom"
        />
      </div>

      {/* ── CONTRAIL — gradient ribbon behind the airplane ──────────────── */}
      {/* Sits at the same vertical band as the plane; width + opacity set    */}
      {/* each frame by the rAF loop based on actual flight speed.            */}
      {/* TWEAK: height '2px' → thicker/thinner trail                        */}
      {/* TWEAK: gradient stops → change trail colour / fade length           */}
      <div
        ref={contrailRef}
        className="absolute z-29 pointer-events-none"
        style={{
          top:        'calc(62% + 38px)',  // vertically centre on the fuselage
          left:       0,
          height:     '2px',
          width:      0,
          opacity:    0,
          background: 'linear-gradient(to right, rgba(255,255,255,0.7), transparent)',
          borderRadius: '1px',
          filter:     'blur(1px)',
        }}
      />

      {/* ── AIRPLANE — rAF-driven, slides in from right → center ─────────── */}
      {/* Transform applied each frame: translateX + translateY(bob) + rotate */}
      {/* TWEAK: top-[62%]  → vertical position of flight path               */}
      {/* TWEAK: w-20       → airplane size                                   */}
      <img
        ref={airplaneRef}
        src={airplaneImg}
        alt=""
        draggable={false}
        className="absolute z-30 w-20 object-contain"
        style={{
          top:       '62%',
          left:      0,
          opacity:   0,
          transform: ' rotate(180deg)',
        }}
      />

    </div>
  )
}

export default Page2
