import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Zap, TrendingUp, Target, Clock, CheckCircle, MessageCircle } from 'lucide-react';
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
    <motion.p variants={fadeUp} className="uppercase text-xs tracking-[0.3em] mb-4" style={{ color: '#D4956A' }}>
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

  const words = ['Dental','Salon','Restaurant','Corporate','Fashion','Real Estate'];

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Commercial filming" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to bottom,rgba(5,5,5,0.88) 0%,rgba(5,5,5,0.82) 45%,rgba(5,5,5,0.94) 100%)' }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 text-center px-6 max-w-[860px]">
        <motion.p initial={{ opacity:0, letterSpacing:'0.55em' }} animate={{ opacity:1, letterSpacing:'0.3em' }}
          transition={{ duration:1.5, delay:0.2 }} className="uppercase text-xs mb-5 tracking-[0.3em]" style={{ color:'#D4956A' }}>
          Commercial Ads &amp; Brand Films
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.1, delay:0.4, ease }} className="text-white mb-6"
          style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(44px,7vw,92px)', lineHeight:0.95, letterSpacing:'-0.025em' }}>
          Your Brand.
          <br /><span style={{ color:'#D4956A', fontStyle:'italic' }}>Cinema Quality.</span>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.65, ease }} className="text-white/50 mb-8 mx-auto"
          style={{ fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.85, maxWidth:'480px' }}>
          30–40 second cinematic reels and brand campaigns that stop the scroll, build trust, and drive real results.
        </motion.p>

        {/* industry tags */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.75 }} className="flex flex-wrap justify-center gap-2 mb-8">
          {words.map(w => (
            <span key={w} className="px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em]"
              style={{ background:'rgba(212,149,106,0.1)', border:'1px solid rgba(212,149,106,0.3)', color:'#D4956A' }}>{w}</span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.9 }} className="flex flex-wrap items-center justify-center gap-3">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
            style={{ background:'#D4956A', color:'#0a0a0a', fontFamily:'var(--font-heading)', letterSpacing:'0.04em' }}>
            <MessageCircle size={15} /> Get a Free Quote
          </a>
          <Link to="/portfolio"
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'rgba(255,255,255,0.07)', color:'white', border:'1px solid rgba(255,255,255,0.18)', fontFamily:'var(--font-heading)', letterSpacing:'0.04em' }}>
            View Ad Portfolio
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y:[0,9,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
          style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,rgba(212,149,106,0.9),transparent)' }} />
      </motion.div>
    </section>
  );
}

/* ── AD TYPES GRID ── */
const adTypes = [
  {
    title:'Dental & Healthcare',
    sub:'Trust-building brand films',
    dur:'0:30–0:45',
    img:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    items:['Clinic walkthroughs','Doctor profiles','Patient testimonials','Before/After reveals'],
    big: true,
  },
  {
    title:'Salon & Beauty',
    sub:'Aspirational lifestyle reels',
    dur:'0:28–0:35',
    img:'https://images.unsplash.com/photo-1522337660859-02fbefca4702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    items:['Transformation reels','Product showcases','Stylist features','Instagram stories'],
    big: false,
  },
  {
    title:'Food & Restaurant',
    sub:'Cinematic food reels',
    dur:'0:25–0:40',
    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    items:['Dish hero shots','Kitchen process','Chef profiles','Menu campaign films'],
    big: false,
    video: '../assets/fine.mp4',
  },
  {
    title:'Corporate & Brand',
    sub:'Authority-building films',
    dur:'0:45–3:00',
    img:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    items:['Brand identity films','Company culture','Product launches','Event coverage'],
    big: false,
    video: '../assets/corporate.mp4',
  },
  {
    title:'Fashion & Jewellery',
    sub:'Editorial-grade lookbooks',
    dur:'0:30–0:60',
    img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    items:['Lookbook shoots','Product reels','Campaign films','Social cutdowns'],
    big: false,
    video: '../assets/fashion.mp4',
  },
];

function CommercialVideoCard({ ad }: { ad: typeof adTypes[0] }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden group cursor-pointer">
      {!playing ? (
        <>
          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(5,5,5,0.85) 0%,rgba(5,5,5,0.15) 60%,transparent 100%)' }} />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer"
            aria-label={`Play ${ad.title}`}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background:'rgba(212,149,106,0.85)' }}>
              <Play size={18} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft:'2px' }} />
            </div>
          </button>
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color:'#D4956A' }}>{ad.sub}</p>
            <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'18px' }}>{ad.title}</p>
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px]"
            style={{ background:'rgba(5,5,5,0.6)', backdropFilter:'blur(6px)', color:'rgba(255,255,255,0.5)' }}>{ad.dur}</div>
        </>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          className="w-full h-full object-cover"
        >
          <source src={ad.video} type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
}

function AdTypesGrid() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#0a0a0a' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <div>
            <Label>Industries We Serve</Label>
            <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.8vw,50px)', lineHeight:1.1 }}>
              Every Business.
              <br />One Creative Standard.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-[300px]" style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', lineHeight:1.8 }}>
            We adapt our cinematic approach to every industry without compromising on quality.
          </motion.p>
        </Reveal>

        {/* main bento */}
        <Reveal className="grid md:grid-cols-3 gap-4" style={{ gridAutoRows:'320px' }}>
          {/* big card */}
          {adTypes.filter(a => a.big).map(ad => (
            <motion.div key={ad.title} variants={fadeUp}
              className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
              <img src={ad.img} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to right,rgba(5,5,5,0.92) 0%,rgba(5,5,5,0.4) 60%,transparent 100%)' }} />
              <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-8 max-w-[360px]">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-4 self-start"
                  style={{ background:'rgba(212,149,106,0.15)', border:'1px solid rgba(212,149,106,0.3)', color:'#D4956A' }}>{ad.sub}</span>
                <h3 className="text-white mb-3" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(22px,2.5vw,32px)', lineHeight:1.15 }}>{ad.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {ad.items.map(it => (
                    <li key={it} className="flex items-center gap-2 text-xs" style={{ color:'rgba(255,255,255,0.5)' }}>
                      <span style={{ width:'14px', height:'1px', background:'#D4956A', flexShrink:0 }} />{it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px]"
                style={{ background:'rgba(5,5,5,0.65)', backdropFilter:'blur(6px)', color:'rgba(255,255,255,0.5)' }}>{ad.dur}</div>
            </motion.div>
          ))}

          {/* small cards */}
          {adTypes.filter(a => !a.big).slice(0,1).map(ad => (
            <motion.div key={ad.title} variants={fadeUp}
              className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img src={ad.img} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(5,5,5,0.88) 0%,rgba(5,5,5,0.1) 60%,transparent 100%)' }} />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color:'#D4956A' }}>{ad.sub}</p>
                <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'20px' }}>{ad.title}</p>
              </div>
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px]"
                style={{ background:'rgba(5,5,5,0.6)', backdropFilter:'blur(6px)', color:'rgba(255,255,255,0.5)' }}>{ad.dur}</div>
            </motion.div>
          ))}
        </Reveal>

        {/* remaining 3 small cards — click to play */}
        <Reveal className="grid md:grid-cols-3 gap-4 mt-4" style={{ gridAutoRows:'260px' }}>
          {adTypes.filter(a => !a.big).slice(1).map(ad => (
            <CommercialVideoCard key={ad.title} ad={ad} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── RESULTS / STATS ── */
const results = [
  { icon:TrendingUp, value:'3×',   label:'Average lead increase reported by clients after running our ads' },
  { icon:Target,     value:'40+',  label:'Brand clients across healthcare, F&B, fashion, and real estate'   },
  { icon:Clock,      value:'72hr', label:'Average turnaround from shoot day to final delivered reel'         },
  { icon:Zap,        value:'500+', label:'Commercial reels and brand films produced since 2012'              },
];

function ResultsSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#0d0d0d' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-14">
          <Label>Why Brands Choose Us</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)' }}>
            We Don't Just Make Ads.
            <br />We Make Results.
          </motion.h2>
        </Reveal>
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map(r => (
            <motion.div key={r.label} variants={fadeUp}
              className="p-8 rounded-2xl flex flex-col gap-4"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
              whileHover={{ borderColor:'rgba(212,149,106,0.3)', y:-4 }} transition={{ duration:0.3 }}>
              <r.icon size={22} style={{ color:'#D4956A' }} />
              <p style={{ fontFamily:'var(--font-heading)', fontSize:'48px', lineHeight:1, color:'white' }}>{r.value}</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', lineHeight:1.8 }}>{r.label}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
const steps = [
  { n:'01', title:'Brief Call',        desc:'We understand your brand, your audience, and what the ad needs to achieve.' },
  { n:'02', title:'Creative Strategy', desc:'Script, storyboard, shot list, and location — all planned before we pick up a camera.' },
  { n:'03', title:'Shoot Day',         desc:'Professional crew, lighting, and direction to make your brand look world-class.' },
  { n:'04', title:'Edit & Grade',      desc:'Colour grading, motion graphics, music licensing, and captioning.' },
  { n:'05', title:'Delivery',          desc:'Final files in all formats — Instagram, YouTube, website, broadcast-ready.' },
];

function ProcessSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#080808' }}>
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-[1fr_1.5fr] gap-20 items-start">
        <Reveal>
          <Label>How We Work</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)', lineHeight:1.15 }}>
            Brief to
            <br />Live Ad — Fast.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5" style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', lineHeight:1.85 }}>
            Most brands get their finished ad within 5–7 working days of shoot day. No ghosting. No revisions that take forever.
          </motion.p>
        </Reveal>
        <Reveal className="flex flex-col gap-0 mt-2">
          {steps.map((s, i) => (
            <motion.div key={s.n} variants={fadeUp}
              className="flex items-start gap-6 py-7 group cursor-default"
              style={{ borderBottom: i < steps.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span className="flex-shrink-0 select-none" style={{ fontFamily:'var(--font-heading)', fontSize:'52px', lineHeight:1, color:'rgba(212,149,106,0.12)', fontStyle:'italic' }}>{s.n}</span>
              <div className="flex-1 pt-2">
                <p className="text-white mb-1.5" style={{ fontFamily:'var(--font-heading)', fontSize:'19px' }}>{s.title}</p>
                <p style={{ color:'rgba(255,255,255,0.38)', fontSize:'14px', lineHeight:1.8 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── REEL SHOWCASE ── */
const reels = [
  { title:'GlowUp Skincare',  sub:'Instagram Campaign', img:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'0:30', video:'../assets/skincare.mp4' },
  { title:'Aurelia Jewels',   sub:'Lookbook Film',      img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'0:45', video:'../assets/jwellery2.mp4' },
  { title:'Mango Beverages',  sub:'Brand Reel',         img:'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'0:28', video:'../assets/beverage.mp4' },
  { title:'SmilePlus Dental', sub:'Patient Journey',    img:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'0:40', video:'../assets/dental.mp4' },
];

function ReelVideoCard({ r }: { r: typeof reels[0] }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio:'9/14' }}>
      {!playing ? (
        <>
          <img src={r.img} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(5,5,5,0.9) 0%,rgba(5,5,5,0.1) 60%,transparent 100%)' }} />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer"
            aria-label={`Play ${r.title}`}
          >
            <motion.div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background:'rgba(212,149,106,0)', border:'1.5px solid rgba(212,149,106,0.5)' }}
              whileHover={{ background:'rgba(212,149,106,0.9)', border:'1.5px solid transparent' }}
              transition={{ duration:0.25 }}>
              <Play size={20} color="rgba(212,149,106,0.9)" style={{ marginLeft:'3px' }} />
            </motion.div>
          </button>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] pointer-events-none"
            style={{ background:'rgba(5,5,5,0.6)', backdropFilter:'blur(6px)', color:'rgba(255,255,255,0.55)' }}>{r.dur}</div>
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <p style={{ color:'#D4956A', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.18em', marginBottom:'2px' }}>{r.sub}</p>
            <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'17px' }}>{r.title}</p>
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
          <source src={r.video} type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
}

function ReelShowcase() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'var(--deep-green)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <Label>Recent Work</Label>
            <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)', lineHeight:1.1 }}>
              Ads We're Proud Of
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link to="/portfolio" className="flex items-center gap-2 text-sm group" style={{ color:'#D4956A' }}>
              All Commercial Work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </Reveal>
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reels.map(r => (
            <ReelVideoCard key={r.title} r={r} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── WHAT'S INCLUDED ── */
const included = [
  'Professional lighting & crew','4K cinematic cameras','On-location sound recording',
  'Licensed background music','Motion graphics & titles','Platform-optimised exports',
  'Instagram / YouTube / Website cuts','Unlimited revisions (within scope)',
];

function WhatIsIncluded() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#0a0a0a' }}>
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <Label>Every Package Includes</Label>
          <motion.h2 variants={fadeUp} className="text-white mb-8" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(26px,3.5vw,44px)', lineHeight:1.15 }}>
            No Hidden Fees.
            <br />No Compromises.
          </motion.h2>
          <motion.ul variants={stagger} className="grid grid-cols-2 gap-3">
            {included.map(item => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3" style={{ color:'rgba(255,255,255,0.55)', fontSize:'13px', lineHeight:1.7 }}>
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color:'#D4956A' }} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
        <Reveal>
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden" style={{ aspectRatio:'4/5' }}>
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
              alt="Commercial shoot" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(5,5,5,0.5) 0%,transparent 60%)' }} />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section className="py-32 px-6 text-center" style={{ backgroundColor:'var(--dark)' }}>
      <Reveal className="relative z-10 max-w-[640px] mx-auto flex flex-col items-center gap-6">
        <Label>Launch Your Campaign</Label>
        <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(30px,5vw,60px)', lineHeight:1.05, letterSpacing:'-0.02em' }}>
          Ready to Stop
          <br /><span style={{ color:'#D4956A' }}>the Scroll?</span>
        </motion.h2>
        <motion.p variants={fadeUp} style={{ color:'rgba(255,255,255,0.4)', fontSize:'15px', lineHeight:1.85, maxWidth:'420px' }}>
          Tell us about your brand and we'll come back with a creative concept within 24 hours.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'#D4956A', color:'#0a0a0a', fontFamily:'var(--font-heading)', letterSpacing:'0.05em' }}>
            <MessageCircle size={15} /> WhatsApp Us Now
          </a>
          <Link to="/contact"
            className="px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'rgba(255,255,255,0.06)', color:'white', border:'1px solid rgba(255,255,255,0.14)', fontFamily:'var(--font-heading)', letterSpacing:'0.05em' }}>
            Request a Proposal
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ── PAGE ── */
export function AdsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor:'#0a0a0a' }}>
      <BackToServices />
      <Hero />
      <AdTypesGrid />
      <ResultsSection />
      <ProcessSection />
      <ReelShowcase />
      <WhatIsIncluded />
      <CTA />
    </div>
  );
}
