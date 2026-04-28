import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Utensils, Layers, Camera, Wind, MessageCircle } from 'lucide-react';
import { BackToServices } from '../components/BackToServices';

const WA = 'https://wa.me/919876543210';
const ACCENT = '#A8C5B5';
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.82, ease } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <motion.p variants={fadeUp} className="uppercase text-xs tracking-[0.3em] mb-4" style={{ color: ACCENT }}>{children}</motion.p>;
}

/* ── HERO ── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const fade  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Luxury resort" className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom,rgba(5,5,5,.65) 0%,rgba(5,5,5,.25) 45%,rgba(5,5,5,.9) 100%)' }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 text-center px-6 max-w-[860px]">
        <motion.p initial={{ opacity: 0, letterSpacing: '0.55em' }} animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.5, delay: 0.2 }} className="uppercase text-xs mb-5" style={{ color: ACCENT }}>
          Resort &amp; Hospitality
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }} className="text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px,7vw,92px)', lineHeight: 0.95, letterSpacing: '-0.025em' }}>
          Luxury,
          <br /><span style={{ color: ACCENT, fontStyle: 'italic' }}>Framed With Intention.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }} className="text-white/50 mb-10 mx-auto"
          style={{ fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.85, maxWidth: '460px' }}>
          Cinematic resort videos, lifestyle photography, food cinematics, and drone coverage — making luxury properties unforgettable on screen.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap items-center justify-center gap-3">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
            style={{ background: ACCENT, color: '#0a0a0a', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
            <MessageCircle size={15} /> Get a Quote
          </a>
          <Link to="/portfolio"
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'white', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
            View Resort Work
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: '1px', height: '44px', background: `linear-gradient(to bottom,${ACCENT},transparent)` }} />
      </motion.div>
    </section>
  );
}

/* ── SERVICE PILLARS ── */
const pillars = [
  { icon: Play,     title: 'Resort Videos',        desc: 'Full cinematic walkthrough films of your property — lobby to pool to suite — that make viewers want to book immediately.' },
  { icon: Camera,   title: 'Interior & Exterior',   desc: 'Architectural photography that captures mood, texture, and scale. Every room, every view, every angle.' },
  { icon: Utensils, title: 'Food Photography',      desc: 'Menu campaigns, hero dish shots, and kitchen process films for your restaurants, bars, and in-room dining.' },
  { icon: Wind,     title: 'Drone Cinematics',      desc: 'Sweeping aerial footage that reveals the setting, surrounds, and sheer scale of your resort from above.' },
];

function ServicePillars() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-16">
          <Label>Our Hospitality Services</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.1 }}>
            Every Corner of Your Property.
            <br />At Its Absolute Finest.
          </motion.h2>
        </Reveal>
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(p => (
            <motion.div key={p.title} variants={fadeUp}
              className="group p-8 rounded-2xl flex flex-col gap-4 cursor-default transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              whileHover={{ y: -5, borderColor: `${ACCENT}44`, background: `${ACCENT}08` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                <p.icon size={20} style={{ color: ACCENT }} />
              </div>
              <h3 className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px' }}>{p.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '14px', lineHeight: 1.85 }}>{p.desc}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── SHOWCASE GALLERY ── */
function ShowcaseGallery() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#060606' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <Label>Featured Properties</Label>
            <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,3.8vw,50px)', lineHeight: 1.1 }}>
              Properties We've Made
              <br />Look Extraordinary
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link to="/portfolio" className="flex items-center gap-2 text-sm group" style={{ color: ACCENT }}>
              Full Portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </Reveal>

        {/* bento grid */}
        <div className="grid md:grid-cols-3 gap-4" style={{ gridAutoRows: '280px' }}>
          {/* wide featured */}
          <Reveal className="md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <motion.div variants={fadeUp} className="w-full h-full">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Resort pool" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,5,5,0.75) 0%,transparent 55%)' }} />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: ACCENT }}>Udaipur, Rajasthan</p>
                <p className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>The Leela Palace</p>
              </div>
            </motion.div>
          </Reveal>

          {[
            { img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', title: 'Oberoi Infinity',  loc: 'Mumbai' },
            { img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', title: 'Suite Interior',   loc: 'Taj Hotels' },
            { img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', title: 'Ananda Spa',      loc: 'Uttarakhand' },
            { img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', title: 'Rooftop Bar',     loc: 'ITC Grand' },
          ].map(item => (
            <Reveal key={item.title} className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <motion.div variants={fadeUp} className="w-full h-full">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,5,5,0.72) 0%,transparent 55%)' }} />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: ACCENT }}>{item.loc}</p>
                  <p className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '16px' }}>{item.title}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOD PHOTOGRAPHY ── */
function FoodSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 items-center">
        <Reveal className="flex flex-col gap-6">
          <Label>Food &amp; Beverage</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3.5vw,44px)', lineHeight: 1.15 }}>
            Food That Looks
            <br />as Incredible as It Tastes.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.9 }}>
            We shoot your restaurant's hero dishes, bar programs, and kitchen stories with editorial-grade styling and cinematic lighting. Perfect for menus, websites, and social.
          </motion.p>
          <motion.ul variants={stagger} className="flex flex-col gap-3">
            {['Menu campaign photography', 'Hero dish close-ups', 'Kitchen & chef stories', 'Bar & beverage reels', 'Room service & amenity shoots'].map(it => (
              <motion.li key={it} variants={fadeUp} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />{it}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-3">
          {[
            { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', tall: true },
            { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', tall: false },
            { img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', tall: false },
            { img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', tall: false },
          ].map((img, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-2xl overflow-hidden group" style={{ height: img.tall ? '380px' : '180px' }}>
              <img src={img.img} alt="" className="w-full h-full object-cover hover:scale-106 transition-transform duration-700" />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── DRONE ── */
function DroneSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: '80vh' }}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Drone aerial" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right,rgba(5,5,5,0.9) 0%,rgba(5,5,5,0.4) 60%,rgba(5,5,5,0.1) 100%)' }} />
      <div className="relative z-20 h-full flex items-center px-8 md:px-20">
        <Reveal className="max-w-[480px]">
          <Label>Drone Cinematics</Label>
          <motion.h2 variants={fadeUp} className="text-white mb-5" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4.5vw,58px)', lineHeight: 1.08 }}>
            Show Guests the World
            <br />They're Arriving Into.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.9 }}>
            Aerial drone footage turns a resort video from a showcase into an experience. We reveal the coastline, the gardens, the architecture — the whole picture.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
const steps = [
  { n: '01', title: 'Location Scout',    desc: 'We visit your property to plan every angle, every shot, every hour of golden light.' },
  { n: '02', title: 'Production Day(s)', desc: 'Our crew shoots interiors, exteriors, amenities, F&B, and drone — all in one or two days.' },
  { n: '03', title: 'Edit & Grade',       desc: 'Colour grading, music, voiceover, and motion graphics applied to every deliverable.' },
  { n: '04', title: 'Delivery',           desc: 'Master files and platform-ready cuts — website, OTA, Instagram, YouTube, and sales decks.' },
];

function Process() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="text-center mb-16">
          <Label>How We Work</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3.5vw,46px)' }}>
            From Check-In to Final Delivery
          </motion.h2>
        </Reveal>
        <Reveal className="flex flex-col gap-0">
          {steps.map((s, i) => (
            <motion.div key={s.n} variants={fadeUp} className="flex items-start gap-8 py-8 group"
              style={{ borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span className="flex-shrink-0 select-none" style={{ fontFamily: 'var(--font-heading)', fontSize: '56px', lineHeight: 1, color: `${ACCENT}18`, fontStyle: 'italic' }}>{s.n}</span>
              <div className="flex-1 pt-3">
                <p className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px' }}>{s.title}</p>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '14px', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
              <ArrowRight size={18} className="flex-shrink-0 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT }} />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section className="py-32 px-6 text-center" style={{ backgroundColor: 'var(--dark)' }}>
      <Reveal className="relative z-10 max-w-[640px] mx-auto flex flex-col items-center gap-6">
        <Label>Ready to Elevate Your Property?</Label>
        <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px,5vw,60px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Your Property Deserves
          <br /><span style={{ color: ACCENT }}>to Be Seen.</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: ACCENT, color: '#0a0a0a', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>
            <MessageCircle size={15} /> WhatsApp Us
          </a>
          <Link
  to="/contact"
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
    e.currentTarget.style.background = "rgba(102, 91, 91, 0.65)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.35)";
  }}
>
  Get a Proposal
</Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

export function ResortPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <BackToServices />
      <Hero />
      <ServicePillars />
      <ShowcaseGallery />
      <FoodSection />
      <DroneSection />
      <Process />
      <CTA />
    </div>
  );
}
