import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Play, Star, ArrowRight, ArrowLeft, Globe, Clock, Zap, ChevronRight } from 'lucide-react';

/* ── constants ─────────────────────────────────────────── */
const WA = 'https://wa.me/919769721010?text=Hi%20Madworks%2C%20I%27d%20like%20to%20inquire%20about%20your%20video%20production%20services.%20Please%20share%20more%20details%20on%20how%20we%20can%20collaborate!';
const ease = [0.22, 1, 0.36, 1] as const;

/* ── shared animation variants ─────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.82, ease } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function Reveal({ children, className, once = true }: {
  children: React.ReactNode; className?: string; once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-72px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={fadeUp} className="uppercase text-xs tracking-[0.3em] mb-4" style={{ color: 'var(--accent-gold)' }}>
      {children}
    </motion.p>
  );
}

/* ═══════════════════════════════════════════════════════════
   01  HERO
═══════════════════════════════════════════════════════════ */
function HeroSection({ onBook }: { onBook: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const fade  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const tags = ['Wedding Films', 'Brand Ads', 'Global Editing'];

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* parallax video/image */}
      <motion.div className="absolute inset-0 scale-110 overflow-hidden" style={{ y: imgY }}>
        <video
          autoPlay muted loop playsInline
          // poster="/images/DSC09193.JPG"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vh',
            height: '100vw',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/wedding7.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* cinematic gradient */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.88) 100%)'
      }} />

      {/* content */}
      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 text-center px-6 max-w-[900px]">
        <motion.div
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.25 }}
  className="flex flex-wrap items-center justify-center gap-3 mt-2 mb-8"
>
  {tags.map((t, i) => (
    <span key={t} className="flex items-center gap-3">
      
      {/* 🔥 TAG */}
      <span
        className="px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105"
        style={{
          background: "rgba(20,20,20,0.65)", // darker for visibility
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(200,169,106,0.5)",
          color: "var(--accent-gold)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(200,169,106,0.15)";
          e.currentTarget.style.border = "1px solid rgba(200,169,106,0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(20,20,20,0.65)";
          e.currentTarget.style.border = "1px solid rgba(200,169,106,0.5)";
        }}
      >
        {t}
      </span>

      {/* 🔹 separator dot */}
      {i < tags.length - 1 && (
        <span
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)", // brighter
          }}
        />
      )}
    </span>
  ))}
</motion.div>
        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
          className="text-white mb-7 mt-45"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px, 7.5vw, 100px)', lineHeight: 0.95, letterSpacing: '-0.025em' }}
        >
          We Make Moments
          <br />
          <span style={{ color: 'var(--accent-gold)' }}>Timeless.</span>
        </motion.h1>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="text-white/50 mb-10 mx-auto"
          style={{ fontSize: 'clamp(10px, 1.4vw, 15px)', lineHeight: 1.85, maxWidth: '500px' }}
        >
          Premium wedding films, brand commercials &amp; global editing — crafted for couples and businesses
          that demand the extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onBook}
            className="px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: 'var(--accent-gold)', color: '#0a0a0a', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
          >
            Book Now
          </button>
          <Link
  to="/portfolio"
  className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-[1px]"
  style={{
    background: "rgba(20, 20, 20, 0.6)", // darker for contrast
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(20, 20, 20, 0.6)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.35)";
  }}
>
  View Portfolio
</Link>
          <a
  href={WA}
  target="_blank"
  rel="noreferrer"
  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
  style={{
    background: "#25D366",
    color: "#0a0a0a",
    boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
  }}
>
  <MessageCircle size={16} />
  WhatsApp
</a>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(200,169,106,0.9), transparent)' }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   02  WEDDING SHOWCASE
═══════════════════════════════════════════════════════════ */
const weddingGrid = [
  { img: '/images/VOW01559.jpg',  label: 'The Ceremony',    tall: true },
  { img: '/images/DSC06395.jpg',  label: 'Indian Traditions' },
  { img: '/images/VOW01254.jpg',  label: 'Ring Detail' },
];

function WeddingShowcase() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: 'var(--mode-surface)' }}>
      <div className="max-w-[1300px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <SectionLabel>Wedding Films</SectionLabel>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, color: 'var(--mode-text)' }}>
              Emotional. Cinematic.
              <br />Unforgettable.
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link to="/portfolio" className="flex items-center gap-2 text-sm group" style={{ color: 'var(--accent-gold)' }}>
              View All Weddings
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </Reveal>

        {/* bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3" style={{ gridAutoRows: '260px' }}>
          {/* featured video left */}
          <Reveal className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <motion.div variants={fadeUp} className="w-full h-full">
              <video
                autoPlay muted loop playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                poster="/images/DSC08825.JPG"
              >
                <source src="/videos/wedding5.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.75) 0%, transparent 55%)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <div className="w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" style={{ background: 'rgba(200,169,106,0.85)' }}>
                  <Play size={24} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: '3px' }} />
                </div> */}
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Showreel 2024</p>
                <p className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '22px' }}>Priya &amp; Aryan</p>
              </div>
            </motion.div>
          </Reveal>

          {/* 4 smaller images right */}
          {weddingGrid.map((w) => (
            <Reveal key={w.label} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${w.tall ? 'row-span-2' : ''}`}>
              <motion.div variants={fadeUp} className="w-full h-full">
                <img src={w.img} alt={w.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 55%)' }} />
                <p className="absolute bottom-3 left-4 text-white text-xs tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>{w.label}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   03  BUSINESS ADS SHOWCASE
═══════════════════════════════════════════════════════════ */
const adCards = [
  {
    title: 'Dental Clinic',
    sub: 'Brand Campaign',
    dur: '0:12',
    video: '/videos/dental.mp4',
    tag: 'Healthcare'
  },
  {
    title: 'Luxury Salon',
    sub: 'Instagram Reels',
    dur: '0:10',
    video: '/videos/salon.mp4',
    tag: 'Beauty'
  },
  {
    title: 'Jewellery Brand',
    sub: 'Lookbook Film',
    dur: '0:14',
    video: '/videos/jwellery.mp4',
    tag: 'Retail'
  },
  {
    title: 'Corporate Firm',
    sub: 'Brand Identity',
    dur: '0:11',
    video: '/videos/corporate.mp4',
    tag: 'Corporate'
  },
  {
    title: 'BBQ Lounge',
    sub: 'Food & Beverage Reel',
    dur: '0:30',
    video: '/videos/Lofi%20BBQ%201_V2.mp4',
    tag: 'F&B'
  },
  {
    title: 'Omkar Brand',
    sub: 'Brand Campaign',
    dur: '0:25',
    video: '/videos/Omkar_Test_V2.mp4',
    tag: 'Brand'
  },
  {
    title: 'Commercial Reel',
    sub: 'Brand Identity',
    dur: '0:30',
    video: '/videos/Reel_01.mp4',
    tag: 'Commercial'
  },
  {
    title: 'Cinematic Reel',
    sub: 'Brand Campaign',
    dur: '0:30',
    video: '/videos/Reel_02.mp4',
    tag: 'Commercial'
  },
  {
    title: 'Skin Agency',
    sub: 'Beauty Campaign',
    dur: '0:28',
    video: '/videos/Skin%20Agency_V6.mp4',
    tag: 'Beauty'
  },
];
function AdsShowcase({ onBook }: { onBook: () => void }) {
  const [index, setIndex] = useState(0);
  const visible = 4;

  const extended = [...adCards, ...adCards];

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % adCards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 px-6 md:px-12 bg-[var(--deep-green)]">
      <div className="max-w-[1300px] mx-auto">

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{
              x: `-${index * 25}%`, // 4 items → 25% each
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {extended.map((ad, i) => {
              const videoRef = useRef<HTMLVideoElement | null>(null);

              // correct visibility logic
              const realIndex = i % adCards.length;
              const isVisible =
                realIndex >= index &&
                realIndex < index + visible;

              // control playback manually (IMPORTANT)
              useEffect(() => {
                const vid = videoRef.current;
                if (!vid) return;

                if (isVisible) {
                  vid.play().catch(() => {});
                } else {
                  vid.pause();
                  vid.currentTime = 0;
                }
              }, [isVisible]);

              return (
                <div
                  key={i}
                  className="min-w-[25%] relative rounded-2xl overflow-hidden"
                  style={{ aspectRatio: "9/14" }}
                >
                  <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={ad.video} type="video/mp4" />
                  </video>

                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* duration */}
                  <div className="absolute top-4 right-4 px-2 py-1 text-xs rounded-full bg-black/70 text-white/70">
                    {ad.dur}
                  </div>

                  {/* info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">
                      {ad.sub}
                    </p>
                    <p className="text-white text-sm font-medium">
                      {ad.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onBook}
            className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #e0b973, #c89a3c)",
              color: "#0a0a0a",
              boxShadow: "0 8px 30px rgba(200,169,106,0.25)",
            }}
          >
            Get Your Brand Film →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   04  RESORT & REAL ESTATE
═══════════════════════════════════════════════════════════ */
function ResortRealEstate() {
  return (
    <section style={{ backgroundColor: 'var(--mode-surface-alt)' }} className="py-28 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto">
        <Reveal className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-center">
          <div className="flex flex-col gap-6">
            <SectionLabel>Resort &amp; Real Estate</SectionLabel>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15, color: 'var(--mode-text)' }}>
              Properties &amp; Spaces That Sell Themselves
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'var(--mode-text-2)', fontSize: '15px', lineHeight: 1.9 }}>
              Cinematic walkthroughs, aerial drone footage, and lifestyle photography that showcase every property at its finest — from luxury resorts to premium real estate.
            </motion.p>
            <motion.ul variants={stagger} className="flex flex-col gap-3 mt-2">
              {['Luxury resort videos', 'Interior & exterior photography', 'Lifestyle shots', 'Drone walkthroughs', 'Property tour films'].map(item => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3" style={{ color: 'var(--mode-text-2)', fontSize: '14px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp}>
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm group mt-2" style={{ color: 'var(--accent-gold)' }}>
                See Property Work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* image mosaic */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl overflow-hidden" style={{ height: '280px' }}>
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900" alt="Resort pool" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: '200px' }}>
              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700" alt="Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: '200px' }}>
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700" alt="Property" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   05  FOOD PHOTOGRAPHY
═══════════════════════════════════════════════════════════ */
const foodImages = [
  { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', label: 'Fine Dining', wide: true },
  { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Fresh Ingredients' },
  { img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Artisan Creations' },
];

function FoodVideoCard({ title, sub, img, video }: { title: string; sub: string; img: string; video: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden" style={{ height: '240px' }}>
      {!playing ? (
        <>
          <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'rgba(5,5,5,0.55)' }} />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer"
            aria-label={`Play ${title}`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background: 'rgba(200,169,106,0.9)' }}>
              <Play size={20} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: '3px' }} />
            </div>
          </button>
          <div className="absolute bottom-5 left-5 pointer-events-none">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{sub}</p>
            <p className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>{title}</p>
          </div>
        </>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
}

function FoodSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: 'var(--mode-surface)' }}>
      <div className="max-w-[1300px] mx-auto">
        <Reveal className="text-center mb-14">
          <SectionLabel>Food Photography &amp; Reels</SectionLabel>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, color: 'var(--mode-text)' }}>
            Food That Looks as Good
            <br />as It Tastes.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4" style={{ color: 'var(--mode-text-2)', fontSize: '15px', lineHeight: 1.85, maxWidth: '420px' }}>
            Premium food content for restaurants, cafés, cloud kitchens, and luxury resorts.
          </motion.p>
        </Reveal>

        {/* image grid */}
        <Reveal className="grid md:grid-cols-3 gap-4 mb-6">
          {foodImages.map((f) => (
            <motion.div
              key={f.label}
              variants={fadeUp}
              className={`relative rounded-2xl overflow-hidden group ${f.wide ? 'md:col-span-2' : ''}`}
              style={{ height: '380px' }}
            >
              <img src={f.img} alt={f.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 55%)' }} />
              <p className="absolute bottom-5 left-5 text-white text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent-gold)' }}>{f.label}</p>
            </motion.div>
          ))}
        </Reveal>

        {/* reel previews */}
        <Reveal className="grid md:grid-cols-2 gap-4">
          <FoodVideoCard
            title="Zaffran Fine Dining"
            sub="0:38 reel"
            img="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
            video="/videos/finedining.mp4"
          />
          <FoodVideoCard
            title="The Artisan Café"
            sub="0:30 reel"
            img="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
            video="/videos/coffee.mp4"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   06  DRONE CINEMATICS
═══════════════════════════════════════════════════════════ */
const locations = ['Goa Coastline', 'Udaipur Palace', 'Mumbai Skyline', 'Santorini Cliffs', 'Jaipur Heritage', 'Maldives Atoll'];

function DroneSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: '92vh' }}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Aerial drone cinematics"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.8) 100%)' }} />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <SectionLabel>Drone Cinematics</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-white mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 5.5vw, 72px)', lineHeight: 1.0 }}>
            A God's-Eye View of
            <br />Every Story.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 mx-auto mb-10" style={{ fontSize: '15px', maxWidth: '420px', lineHeight: 1.85 }}>
            Aerial coverage for weddings, resorts, real estate, and brand films — capturing scale that cameras on the ground simply can't.
          </motion.p>
        </Reveal>

        {/* locations ticker */}
        <div className="w-full overflow-hidden mt-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...locations, ...locations].map((loc, i) => (
              <span key={i} className="flex items-center gap-8">
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px, 2vw, 26px)', color: 'rgba(255,255,255,0.18)', fontStyle: 'italic' }}>{loc}</span>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(200,169,106,0.4)', display: 'inline-block' }} />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   07  GLOBAL EDITING SERVICES
═══════════════════════════════════════════════════════════ */
const editStats = [
  { icon: Globe,  value: '500+', label: 'Projects Delivered'  },
  { icon: Clock,  value: '48hr', label: 'Turnaround Time'     },
  { icon: Zap,    value: 'US / AU', label: 'Primary Markets'  },
];
const editServices = ['Wedding Film Editing', 'Real Estate Editing', 'Ad & Brand Editing', 'Color Grading', 'Sound Design & Mix'];

function EditingSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    setSliderPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: 'var(--mode-surface-alt)' }}>
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* before / after interactive split */}
        <Reveal>
          <motion.div variants={fadeUp}>
            <div
              ref={sliderRef}
              className="relative rounded-3xl overflow-hidden cursor-ew-resize select-none"
              onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
              onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
              onMouseUp={() => { dragging.current = false; }}
              onMouseLeave={() => { dragging.current = false; }}
              onTouchStart={(e) => updatePos(e.touches[0].clientX)}
              onTouchMove={(e) => { e.preventDefault(); updatePos(e.touches[0].clientX); }}
            >
              {/* after — normal flow, defines container height */}
              <img
                src="../images/after.jpg"
                alt="After edit"
                className="w-full block object-cover pointer-events-none"
                style={{ aspectRatio: '4/3' }}
                draggable={false}
              />

              {/* before — clipped overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src="../images/after.jpg"
                  alt="Before edit"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(1) brightness(0.6) contrast(1.1)' }}
                  draggable={false}
                />
              </div>

              {/* divider line */}
              <div
                className="absolute inset-y-0 w-[2px] pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)', background: 'var(--accent-gold)' }}
              />

              {/* drag handle */}
              <div
                className="absolute top-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 pointer-events-none shadow-lg"
                style={{ left: `${sliderPos}%`, transform: 'translate(-50%, -50%)', background: 'var(--accent-gold)' }}
              >
                <span className="text-[#0a0a0a] text-xs font-bold select-none">↔</span>
              </div>

              {/* labels */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest pointer-events-none" style={{ background: 'rgba(5,5,5,0.7)', color: 'rgba(255,255,255,0.45)' }}>Before</div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest pointer-events-none" style={{ background: 'rgba(200,169,106,0.85)', color: '#0a0a0a' }}>After</div>
            </div>
          </motion.div>
        </Reveal>

        {/* text */}
        <Reveal className="flex flex-col gap-6">
          <SectionLabel>Global Editing Services</SectionLabel>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15, color: 'var(--mode-text)' }}>
            World-Class Post-Production.
            <br />Delivered Remotely.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--mode-text-2)', fontSize: '15px', lineHeight: 1.9 }}>
            Trusted by studios in the US and Australia. We deliver cinema-grade edits — colour grading, sound design, and cuts — with the fastest turnaround in the industry.
          </motion.p>

          {/* stats */}
          <motion.div variants={stagger} className="grid grid-cols-3 gap-4 my-2">
            {editStats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col gap-1 p-4 rounded-xl" style={{ background: 'var(--mode-card)', border: '1px solid var(--mode-card-border)' }}>
                <Icon size={16} style={{ color: 'var(--accent-gold)' }} />
                <p className="font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: 'var(--mode-text)' }}>{value}</p>
                <p style={{ color: 'var(--mode-text-3)', fontSize: '11px', lineHeight: 1.5 }}>{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* services list */}
          <motion.ul variants={stagger} className="flex flex-col gap-2.5">
            {editServices.map(s => (
              <motion.li key={s} variants={fadeUp} className="flex items-center gap-3" style={{ color: 'var(--mode-text-2)', fontSize: '14px' }}>
                <span style={{ width: '20px', height: '1px', background: 'var(--accent-gold)', flexShrink: 0 }} />
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   08  TESTIMONIALS
═══════════════════════════════════════════════════════════ */
const reviews = [
  { name: 'Priya & Aryan Sharma',  project: 'Mumbai Wedding',         text: 'Absolutely breathtaking work. They captured emotions we didn\'t even know were on camera. The final film made our parents cry.',    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name: 'Dr. Meera Kapoor',       project: 'Dental Clinic Campaign',  text: 'Our Instagram ad brought in 3× more leads than anything we\'d run before. The quality was on par with international studios.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name: 'James & Sarah Mitchell', project: 'Santorini Destination',   text: 'We flew them all the way to Greece and every penny was worth it. The drone shots were cinematic gold. 10/10 recommend.',        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
];
const logos = ['The Leela', 'Taj Hotels', 'Oberoi Group', 'Lodha', 'ITC Hotels', 'Zaffran', 'GlowUp', 'Aurelia'];

function TestimonialsSection() {
  return (
    <section className="py-28 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: '#0e0c0a' }}>

      {/* ── BG: full-bleed warm bokeh image — NO separate overlay so it's actually visible ── */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.38, filter: 'saturate(0.5) brightness(0.62)' }}
        />
        {/* edge-only vignette — darkens corners, leaves centre visible */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 78% 68% at 50% 50%, transparent 30%, rgba(14,12,10,0.90) 100%)'
        }} />
      </div>

      {/* ── warm gold glow from top centre ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(200,169,106,0.13) 0%, transparent 70%)',
          'radial-gradient(ellipse 500px 400px at 92% 95%, rgba(180,130,100,0.09) 0%, transparent 65%)',
        ].join(', ')
      }} />

      {/* ── large decorative quotation mark ── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(220px, 28vw, 400px)',
          lineHeight: 0.8,
          color: 'rgba(200,169,106,0.07)',
          fontStyle: 'italic',
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        "
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <SectionLabel>Client Love</SectionLabel>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#F8F4EE' }}>
            What Our Clients Say
          </motion.h2>
        </Reveal>

        <Reveal className="grid md:grid-cols-3 gap-5 mb-20">
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              className="flex flex-col gap-5 p-7 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(200,169,106,0.18)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
              whileHover={{ y: -5, borderColor: 'rgba(200,169,106,0.45)' }}
              transition={{ duration: 0.35 }}
            >
              {/* gold hairline at card top */}
              <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(200,169,106,0.35), transparent)' }} />

              {/* stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="var(--accent-gold)" style={{ color: 'var(--accent-gold)' }} />)}
              </div>

              <p className="flex-1" style={{ color: 'rgba(255,255,255,0.58)', fontSize: '15px', lineHeight: 1.9, fontStyle: 'italic' }}>
                "{r.text}"
              </p>

              <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" style={{ border: '1px solid rgba(200,169,106,0.25)' }} />
                <div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-heading)', color: '#F0EAE0' }}>{r.name}</p>
                  <p style={{ color: 'var(--accent-gold)', fontSize: '11px', letterSpacing: '0.08em' }}>{r.project}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Reveal>

        {/* brand logos ticker */}
        <div style={{ borderTop: '1px solid rgba(200,169,106,0.12)', paddingTop: '40px' }}>
          <p className="text-center text-xs uppercase tracking-[0.25em] mb-8" style={{ color: 'rgba(248, 248, 248, 0.35)' }}>Trusted By</p>
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="flex gap-14 whitespace-nowrap items-center"
            >
              {[...logos, ...logos].map((l, i) => (
                <span key={i} style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'rgb(255, 255, 255)', letterSpacing: '0.05em' }}>{l}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   09  FINAL CTA
═══════════════════════════════════════════════════════════ */
function CTASection({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden py-36 px-6 text-center" style={{ backgroundColor: 'var(--dark)' }}>
      
      {/* bg texture ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full" style={{ border: '1px solid rgba(200,169,106,0.07)' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full" style={{ border: '1px solid rgba(200,169,106,0.05)' }} />
      </div>

      <Reveal className="relative z-10 max-w-[700px] mx-auto flex flex-col items-center gap-6">
        <SectionLabel>Ready to Begin?</SectionLabel>

        <motion.h2
          variants={fadeUp}
          className="text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 5vw, 66px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em'
          }}
        >
          Let's Build Something
          <br />
          <span style={{ color: 'var(--accent-gold)' }}>Extraordinary.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '16px',
            lineHeight: 1.85,
            maxWidth: '460px'
          }}
        >
          Whether you're planning a wedding, launching a campaign, or need world-class editing — we're ready.
        </motion.p>

        {/* 🔥 BUTTONS (FIXED) */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          
          {/* PRIMARY (Gold) */}
          <button
            onClick={onBook}
            className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-[1px]"
            style={{
              background: "linear-gradient(135deg, #e0b973, #c89a3c)",
              color: "#0a0a0a",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.05em",
              boxShadow: "0 10px 30px rgba(200,169,106,0.3)",
            }}
          >
            Book Your Shoot
          </button>

          {/* SECONDARY (Glass but visible) */}
          <button
            onClick={onBook}
            className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-[1px]"
            style={{
              background: "rgba(20,20,20,0.65)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.35)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.05em",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(20,20,20,0.65)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.35)";
            }}
          >
            Get a Quote
          </button>

          {/* WHATSAPP (Solid & strong) */}
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-[1px]"
            style={{
              background: "#25D366",
              color: "#0a0a0a",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.05em",
              boxShadow: "0 10px 30px rgba(37,211,102,0.35)",
            }}
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>

        </motion.div>
      </Reveal>
    </section>
  );
}
/* ═══════════════════════════════════════════════════════════
   PAGE EXPORT
═══════════════════════════════════════════════════════════ */
export function HomePage() {
  const navigate = useNavigate();
  const openContact = () => navigate('/contact');

  return (
    <>
      <HeroSection onBook={openContact} />
      <WeddingShowcase />
      <AdsShowcase onBook={openContact} />
      <ResortRealEstate />
      <FoodSection />
      <DroneSection />
      <EditingSection />
      <TestimonialsSection />
      <CTASection onBook={openContact} />
    </>
  );
}
