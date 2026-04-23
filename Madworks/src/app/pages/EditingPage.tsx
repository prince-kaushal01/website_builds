import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Globe, Clock, Zap, ArrowRight, UploadCloud, Film, Palette, Volume2, Scissors, MessageCircle } from 'lucide-react';
import { BackToServices } from '../components/BackToServices';

const WA = 'https://wa.me/919876543210';
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
  return (
    <motion.p variants={fadeUp} className="uppercase text-xs tracking-[0.3em] mb-4" style={{ color:'#B5A8C8' }}>
      {children}
    </motion.p>
  );
}

/* ── HERO ── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0,1], ['0%','28%']);
  const fade  = useTransform(scrollYProgress, [0,0.6], [1,0]);
  const textY = useTransform(scrollYProgress, [0,1], ['0%','14%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img src="../assets/editing.jpg"
          alt="Editing suite" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to bottom,rgba(5,5,5,0.75) 0%,rgba(5,5,5,0.45) 45%,rgba(5,5,5,0.92) 100%)' }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 text-center px-6 max-w-[860px]">
        <motion.p initial={{ opacity:0, letterSpacing:'0.55em' }} animate={{ opacity:1, letterSpacing:'0.3em' }}
          transition={{ duration:1.5, delay:0.2 }} className="uppercase text-xs mb-5 tracking-[0.3em]" style={{ color:'#B5A8C8' }}>
          Global Editing Services
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.1, delay:0.4, ease }} className="text-white mb-6"
          style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(44px,7vw,92px)', lineHeight:0.95, letterSpacing:'-0.025em' }}>
          Raw Footage.
          <br /><span style={{ color:'#B5A8C8', fontStyle:'italic' }}>Refined Art.</span>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.65, ease }} className="text-white/50 mb-10 mx-auto"
          style={{ fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.85, maxWidth:'480px' }}>
          World-class post-production delivered remotely to studios in the US, Australia, and beyond — in 48 hours or less.
        </motion.p>
        <motion.div initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.9 }} className="flex flex-wrap items-center justify-center gap-3">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
            style={{ background:'#B5A8C8', color:'#0a0a0a', fontFamily:'var(--font-heading)', letterSpacing:'0.04em' }}>
            <MessageCircle size={15} /> Send Us Your Footage
          </a>
          <Link to="/contact"
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'rgba(255,255,255,0.07)', color:'white', border:'1px solid rgba(255,255,255,0.18)', fontFamily:'var(--font-heading)', letterSpacing:'0.04em' }}>
            Get a Free Sample Edit
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y:[0,9,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
          style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,rgba(181,168,200,0.9),transparent)' }} />
      </motion.div>
    </section>
  );
}

/* ── STATS BAR ── */
const stats = [
  { value:'500+', label:'Projects Delivered'  },
  { value:'48hr', label:'Avg Turnaround'      },
  { value:'US / AU', label:'Primary Markets'  },
  { value:'100%', label:'Satisfaction Rate'   },
];
function StatsBar() {
  return (
    <div className="py-7 px-6" style={{ background:'linear-gradient(135deg,#1a1528,#231e30)' }}>
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <p style={{ fontFamily:'var(--font-heading)', fontSize:'30px', lineHeight:1, color:'#B5A8C8' }}>{s.value}</p>
            <p className="text-xs mt-1 tracking-widest uppercase" style={{ color:'rgba(181,168,200,0.5)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SERVICES ── */
const services = [
  {
    icon: Scissors,
    title:'Wedding Film Editing',
    desc:'From raw multi-camera footage to a cinematic 4–8 minute film. We sync, cut, grade, and score your wedding footage to create something that moves people.',
    items:['Multi-cam sync','Ceremony & reception cuts','Highlight reels','Full-length films'],
    img:'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    icon: Film,
    title:'Real Estate Editing',
    desc:'Property walkthrough edits, aerial drone integration, and interior photography retouching — delivered fast so listings go live without delay.',
    items:['Walkthrough video edits','Drone integration','Music & title cards','Photo retouching'],
    img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    icon: Zap,
    title:'Ad & Brand Editing',
    desc:'30–90 second commercial cuts with motion graphics, captions, and platform-specific exports. Built to perform on Instagram, YouTube, and beyond.',
    items:['Instagram & YouTube cuts','Motion graphics','Captions & subtitles','Platform-specific exports'],
    img:'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    icon: Palette,
    title:'Color Grading',
    desc:'Hollywood-grade colour grading using DaVinci Resolve. Whether it\'s a warm film look, a cold corporate grade, or a bold commercial tone — we deliver it with precision.',
    items:['DaVinci Resolve grading','LUT creation','RAW processing','Skin tone perfection'],
    img:'../assets/colour.jpg',
  },
  {
    icon: Volume2,
    title:'Sound Design & Mix',
    desc:'Music licensing, audio cleanup, SFX layering, and final mixes in stereo and 5.1 — your film should sound as good as it looks.',
    items:['Licensed music curation','Dialogue cleanup','SFX design','Final stereo & 5.1 mix'],
    img:'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
];

function ServicesSection() {
  return (
    <section className="py-28 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor:'#0a0a0a' }}>
      {/* background — dark editing suite image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12, filter: 'saturate(0.4) brightness(0.7)' }}
        />
        {/* overlay that darkens top/bottom more than centre */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 30%, rgba(10,10,10,0.45) 70%, rgba(10,10,10,0.85) 100%)'
        }} />
        {/* subtle purple-lavender tint from editing page accent */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(181,168,200,0.06) 0%, transparent 70%)'
        }} />
      </div>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <Label>What We Edit</Label>
          <motion.h2 variants={fadeUp} style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,4vw,52px)', lineHeight:1.1, color:'var(--mode-text)' }}>
            Every Frame.
            <br />Every Format.
          </motion.h2>
        </Reveal>

        <div className="flex flex-col gap-5">
          {services.map((svc, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <Reveal key={svc.title}
                className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}
                style={{ border:'1px solid var(--mode-card-border)' }}>

                {/* text */}
                <motion.div variants={fadeUp}
                  className="flex flex-col justify-center gap-5 p-10 md:p-14"
                  style={{ background:'var(--mode-card)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(181,168,200,0.1)' }}>
                    <svc.icon size={20} style={{ color:'#B5A8C8' }} />
                  </div>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(22px,2.5vw,32px)', lineHeight:1.15, color:'var(--mode-text)' }}>{svc.title}</h3>
                  <div style={{ width:'32px', height:'1px', background:'#B5A8C8', opacity:0.4 }} />
                  <p style={{ color:'var(--mode-text-2)', fontSize:'15px', lineHeight:1.9 }}>{svc.desc}</p>
                  <ul className="flex flex-col gap-2 mt-1">
                    {svc.items.map(it => (
                      <li key={it} className="flex items-center gap-3" style={{ color:'var(--mode-text-2)', fontSize:'13px' }}>
                        <span style={{ width:'18px', height:'1px', background:'#B5A8C8', opacity:0.5, flexShrink:0 }} />{it}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* image */}
                <motion.div variants={fadeUp} className="relative overflow-hidden" style={{ minHeight:'340px' }}>
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,rgba(181,168,200,0.08) 0%,transparent 60%)' }} />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── BEFORE / AFTER SHOWCASE ── */
function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    setSliderPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'var(--mode-surface)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-14">
          <Label>The Difference We Make</Label>
          <motion.h2 variants={fadeUp} style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.8vw,50px)', lineHeight:1.1, color:'var(--mode-text)' }}>
            Before Our Hands Touch It.
            <br />After.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 mx-auto" style={{ color:'var(--mode-text-2)', fontSize:'14px', maxWidth:'340px' }}>
            Drag the handle left or right to compare.
          </motion.p>
        </Reveal>

        <Reveal>
          <motion.div variants={fadeUp}>
            <div
              ref={sliderRef}
              className="relative rounded-3xl overflow-hidden cursor-ew-resize select-none mx-auto"
              style={{ maxWidth:'900px' }}
              onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
              onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
              onMouseUp={() => { dragging.current = false; }}
              onMouseLeave={() => { dragging.current = false; }}
              onTouchStart={(e) => updatePos(e.touches[0].clientX)}
              onTouchMove={(e) => { e.preventDefault(); updatePos(e.touches[0].clientX); }}
            >
              {/* after — normal flow, defines container height */}
              <img
                src="../assets/colour.jpg"
                alt="After edit"
                className="w-full block object-cover pointer-events-none"
                style={{ aspectRatio: '16/9' }}
                draggable={false}
              />

              {/* before — clipped overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath:`inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src="../assets/colour.jpg"
                  alt="Before edit"
                  className="w-full h-full object-cover"
                  style={{ filter:'grayscale(1) brightness(0.55) contrast(1.1)' }}
                  draggable={false}
                />
              </div>

              {/* divider line */}
              <div
                className="absolute inset-y-0 w-[2px] pointer-events-none"
                style={{ left:`${sliderPos}%`, transform:'translateX(-50%)', background:'#B5A8C8' }}
              />

              {/* drag handle */}
              <div
                className="absolute top-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 pointer-events-none shadow-lg"
                style={{ left:`${sliderPos}%`, transform:'translate(-50%, -50%)', background:'#B5A8C8' }}
              >
                <span className="text-[#0a0a0a] text-xs font-bold select-none">↔</span>
              </div>

              {/* labels */}
              <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full pointer-events-none" style={{ background:'rgba(5,5,5,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.12)' }}>
                <p className="text-white/50 text-xs uppercase tracking-widest">Before — Raw</p>
              </div>
              <div className="absolute top-5 right-5 px-4 py-1.5 rounded-full pointer-events-none" style={{ background:'rgba(181,168,200,0.85)' }}>
                <p className="text-[#0a0a0a] text-xs uppercase tracking-widest font-medium">After — Madworks</p>
              </div>

              {/* bottom caption */}
              <div className="absolute bottom-5 left-5 pointer-events-none">
                <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'11px', lineHeight:1.6 }}>Graded. Scored. Cut to emotion. 48hr delivery.</p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── GLOBAL REACH ── */
function GlobalSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:['start end','end start'] });
  const y = useTransform(scrollYProgress,[0,1],['-8%','8%']);
  const markets = ['United States','Australia','United Kingdom','Canada','UAE','Singapore'];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height:'75vh' }}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Global reach" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to right,rgba(5,5,5,0.95) 0%,rgba(5,5,5,0.55) 55%,rgba(5,5,5,0.2) 100%)' }} />
      <div className="relative z-20 h-full flex items-center px-8 md:px-20">
        <Reveal className="max-w-[500px]">
          <Label>International Clients</Label>
          <motion.h2 variants={fadeUp} className="text-white mb-5" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,4vw,54px)', lineHeight:1.1 }}>
            Edit From India.
            <br />Serve the World.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-8" style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', lineHeight:1.9 }}>
            Studios and solo videographers across the globe send us their raw footage and receive back a polished, cinema-grade edit — usually within 48 hours. No timezone friction, no quality loss.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {markets.map(m => (
              <span key={m} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{ background:'rgba(181,168,200,0.1)', border:'1px solid rgba(181,168,200,0.25)', color:'#B5A8C8' }}>
                <Globe size={10} /> {m}
              </span>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── WORKFLOW ── */
const workflow = [
  { icon:UploadCloud, step:'01', title:'You Upload',      desc:'Send us your raw files via Google Drive, WeTransfer, or Frame.io — whatever works for you.' },
  { icon:Scissors,    step:'02', title:'We Edit',         desc:'Your assigned editor cuts, grades, and scores your film to the brief.' },
  { icon:Film,        step:'03', title:'You Review',      desc:'Watch a private preview link. Leave timestamped feedback in one round.' },
  { icon:Clock,       step:'04', title:'Delivered',       desc:'Final files exported to your spec — in 48 hours from delivery of the brief.' },
];

function WorkflowSection() {
  return (
    <section className="py-28 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor:'#0a0a0a' }}>
      {/* background — dark film production image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.18, filter: 'saturate(0.35) brightness(0.65)' }}
        />
        {/* keep cards readable — fade top/bottom edges */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.35) 25%, rgba(10,10,10,0.35) 75%, rgba(10,10,10,0.75) 100%)'
        }} />
        {/* lavender accent glow matching editing page colour */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(181,168,200,0.08) 0%, transparent 70%)'
        }} />
      </div>
      <div className="max-w-[1100px] mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <Label>How It Works</Label>
          <motion.h2 variants={fadeUp} style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)', color:'var(--mode-text)' }}>
            Simple. Fast. Exceptional.
          </motion.h2>
        </Reveal>
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflow.map((w, i) => (
            <motion.div key={w.step} variants={fadeUp}
              className="relative flex flex-col gap-5 p-7 rounded-2xl"
              style={{ background:'var(--mode-card)', border:'1px solid var(--mode-card-border)' }}
              whileHover={{ borderColor:'rgba(181,168,200,0.3)', y:-4 }} transition={{ duration:0.3 }}>
              {/* connector line */}
              {i < workflow.length-1 && (
                <div className="hidden lg:block absolute top-9 left-full w-5 h-[1px] z-10" style={{ background:'rgba(181,168,200,0.2)' }} />
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(181,168,200,0.1)' }}>
                  <w.icon size={18} style={{ color:'#B5A8C8' }} />
                </div>
                <span style={{ fontFamily:'var(--font-heading)', fontSize:'13px', color:'rgba(181,168,200,0.4)', fontStyle:'italic' }}>{w.step}</span>
              </div>
              <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'20px', color:'var(--mode-text)' }}>{w.title}</h3>
              <p style={{ color:'var(--mode-text-2)', fontSize:'13px', lineHeight:1.8 }}>{w.desc}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── TRUST STRIP ── */
const trust = [
  'Wedding Editing', 'Real Estate Editing', 'Commercial Ads', 'Color Grading', 'Sound Design',
  'DaVinci Resolve', 'Adobe Premiere', 'Final Cut Pro', '48hr Turnaround', 'Frame.io Delivery',
];
function TrustStrip() {
  return (
    <div className="overflow-hidden py-8" style={{ backgroundColor:'var(--mode-surface)', borderTop:'1px solid var(--mode-border)', borderBottom:'1px solid var(--mode-border)' }}>
      <motion.div animate={{ x:['0%','-50%'] }} transition={{ repeat:Infinity, duration:22, ease:'linear' }}
        className="flex gap-10 whitespace-nowrap">
        {[...trust,...trust].map((t,i) => (
          <span key={i} className="flex items-center gap-10">
            <span style={{ fontFamily:'var(--font-heading)', fontSize:'22px', color:'var(--mode-logo-num)', fontStyle:'italic' }}>{t}</span>
            <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'rgba(181,168,200,0.25)', display:'inline-block', flexShrink:0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section className="py-32 px-6 text-center" style={{ backgroundColor:'var(--dark)' }}>
      <Reveal className="relative z-10 max-w-[640px] mx-auto flex flex-col items-center gap-6">
        <Label>Start Editing With Us</Label>
        <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(30px,5vw,60px)', lineHeight:1.05, letterSpacing:'-0.02em' }}>
          Send Us Your Footage.
          <br /><span style={{ color:'#B5A8C8' }}>Get Back Art.</span>
        </motion.h2>
        <motion.p variants={fadeUp} style={{ color:'rgba(255,255,255,0.4)', fontSize:'15px', lineHeight:1.85, maxWidth:'400px' }}>
          First project? We offer a free sample edit on one minute of your footage — no strings attached.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'#B5A8C8', color:'#0a0a0a', fontFamily:'var(--font-heading)', letterSpacing:'0.05em' }}>
            <MessageCircle size={15} /> WhatsApp to Start
          </a>
          <Link to="/contact"
            className="px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'rgba(255,255,255,0.06)', color:'white', border:'1px solid rgba(255,255,255,0.14)', fontFamily:'var(--font-heading)', letterSpacing:'0.05em' }}>
            Request Free Sample
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ── PAGE ── */
export function EditingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor:'#0a0a0a' }}>
      <BackToServices />
      <Hero />
      <StatsBar />
      <ServicesSection />
      <BeforeAfter />
      <GlobalSection />
      <WorkflowSection />
      <TrustStrip />
      <CTA />
    </div>
  );
}
