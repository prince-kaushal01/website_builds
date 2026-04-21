import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Heart, Camera, Film, Globe, Layers, BookOpen, MessageCircle } from 'lucide-react';
import { BackToServices } from '../components/BackToServices';

const WA = 'https://wa.me/919876543210';
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } };

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
    <motion.p variants={fadeUp} className="uppercase text-xs tracking-[0.3em] mb-4" style={{ color: 'var(--accent-gold)' }}>
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
        <video autoPlay muted loop playsInline className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-wedding-ceremony-with-guests-3891-large.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to bottom,rgba(5,5,5,.6) 0%,rgba(5,5,5,.2) 45%,rgba(5,5,5,.9) 100%)' }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 text-center px-6 max-w-[860px]">
        <motion.p initial={{ opacity:0, letterSpacing:'0.55em' }} animate={{ opacity:1, letterSpacing:'0.3em' }}
          transition={{ duration:1.5, delay:0.2 }} className="uppercase text-xs mb-5 tracking-[0.3em]" style={{ color:'var(--accent-gold)' }}>
          Wedding Production
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.1, delay:0.4, ease }} className="text-white mb-6"
          style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(46px,7.5vw,96px)', lineHeight:0.95, letterSpacing:'-0.025em' }}>
          Every Love Story
          <br />
          <span style={{ color:'var(--accent-gold)', fontStyle:'italic' }}>Deserves a Film.</span>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.65, ease }} className="text-white/50 mb-10 mx-auto"
          style={{ fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.85, maxWidth:'480px' }}>
          Cinematic wedding films, pre-wedding shoots, and destination coverage — for couples who want their day preserved as art.
        </motion.p>
        <motion.div initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.85, ease }} className="flex flex-wrap items-center justify-center gap-3">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
            style={{ background:'var(--accent-gold)', color:'#0a0a0a', fontFamily:'var(--font-heading)', letterSpacing:'0.04em' }}>
            <MessageCircle size={15} /> Book Your Date
          </a>
          <Link to="/portfolio"
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'rgba(255,255,255,0.07)', color:'white', border:'1px solid rgba(255,255,255,0.18)', fontFamily:'var(--font-heading)', letterSpacing:'0.04em' }}>
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y:[0,9,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
          style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,rgba(200,169,106,0.9),transparent)' }} />
      </motion.div>
    </section>
  );
}

/* ── STATS BAR ── */
const stats = [
  { value:'500+', label:'Weddings Filmed'  },
  { value:'12+',  label:'Years Experience' },
  { value:'18',   label:'Countries'        },
  { value:'100%', label:'Happy Couples'    },
];
function StatsBar() {
  return (
    <div className="py-7 px-6" style={{ backgroundColor:'var(--accent-gold)' }}>
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
        {stats.map(s => (
          <div key={s.label} className="text-center text-white">
            <p style={{ fontFamily:'var(--font-heading)', fontSize:'30px', lineHeight:1 }}>{s.value}</p>
            <p className="text-white/75 text-xs mt-1 tracking-widest uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SERVICE PILLARS ── */
const pillars = [
  { icon:Film,     title:'Cinematic Films',      desc:'Full-length wedding films that feel like award-winning shorts — raw emotion, beautiful light, unforgettable music.' },
  { icon:Camera,   title:'Traditional Coverage',  desc:'Every ritual, every relative, every moment — captured with journalistic thoroughness and artistic flair.' },
  { icon:Heart,    title:'Pre-Wedding Shoots',    desc:'Intimate portrait sessions that let you fall in love with the camera before your big day.' },
  { icon:Globe,    title:'Destination Weddings',  desc:'We travel anywhere. Santorini cliffs, Rajasthani palaces, Maldive atolls — wherever love takes you.' },
  { icon:Layers,   title:'Drone Coverage',        desc:'Sweeping aerials that reveal the scale and beauty of your venue from a perspective guests never see.' },
  { icon:BookOpen, title:'Wedding Albums',        desc:'Heirloom-quality printed albums that hold your story for generations. Every spread designed by hand.' },
];

function ServicePillars() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#0a0a0a' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-16">
          <Label>What We Offer</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(30px,4vw,52px)', lineHeight:1.1 }}>
            Complete Wedding Production
          </motion.h2>
        </Reveal>
        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <motion.div key={p.title} variants={fadeUp}
              className="group p-8 rounded-2xl flex flex-col gap-4 transition-all duration-300 cursor-default"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
              whileHover={{ y:-5, borderColor:'rgba(200,169,106,0.3)', background:'rgba(200,169,106,0.05)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:'rgba(200,169,106,0.12)' }}>
                <p.icon size={20} style={{ color:'var(--accent-gold)' }} />
              </div>
              <h3 className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'20px' }}>{p.title}</h3>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'14px', lineHeight:1.85 }}>{p.desc}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── FEATURED FILM SHOWCASE ── */
function FilmShowcase() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#060606' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <Label>Signature Films</Label>
            <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.8vw,50px)', lineHeight:1.1 }}>
              Watch Our Work
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link to="/portfolio" className="flex items-center gap-2 text-sm group" style={{ color:'var(--accent-gold)' }}>
              Full Portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </Reveal>

        {/* Featured film */}
        <Reveal>
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden mb-5 group cursor-pointer"
            style={{ aspectRatio:'16/7' }} onClick={() => setPlaying(!playing)}>
            <img src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
              alt="Feature film" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background:'rgba(5,5,5,0.45)' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div whileHover={{ scale:1.1 }} className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background:'rgba(200,169,106,0.9)', boxShadow:'0 0 60px rgba(200,169,106,0.4)' }}>
                <Play size={28} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft:'4px' }} />
              </motion.div>
              <p className="text-white/60 text-xs uppercase tracking-[0.25em]">Play Showreel · 4:32</p>
            </div>
            <div className="absolute bottom-6 left-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Featured Film</p>
              <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'24px' }}>Priya &amp; Aryan — Mumbai Palace Wedding</p>
            </div>
          </motion.div>
        </Reveal>

        {/* 3 smaller films */}
        <Reveal className="grid md:grid-cols-3 gap-4">
          {[
            { title:'Meera & Raj',      loc:'Jaipur Heritage',   img:'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'3:18' },
            { title:'Sarah & James',    loc:'Santorini, Greece',  img:'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'5:02' },
            { title:'Kavya & Rohan',    loc:'Goa Beach',          img:'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', dur:'4:47' },
          ].map(f => (
            <motion.div key={f.title} variants={fadeUp}
              className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio:'4/3' }}>
              <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
              <div className="absolute inset-0" style={{ background:'rgba(5,5,5,0.5)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  style={{ background:'rgba(200,169,106,0.85)' }}>
                  <Play size={16} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft:'2px' }} />
                </div>
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px]"
                style={{ background:'rgba(5,5,5,0.65)', backdropFilter:'blur(6px)', color:'rgba(255,255,255,0.55)' }}>{f.dur}</div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{f.loc}</p>
                <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'16px' }}>{f.title}</p>
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── INDIAN WEDDING SECTION ── */
function IndianSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#0d0d0d' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-center mb-16">
          <div>
            <Label>Indian Weddings</Label>
            <motion.h2 variants={fadeUp} className="text-white mb-5" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)', lineHeight:1.15 }}>
              Colors, Rituals &amp; Grand Celebrations
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', lineHeight:1.9 }}>
              From the Mehendi ceremony to the Vidaai — we document every ritual of your multi-day Indian wedding with deep cultural respect and cinematic artistry. Indian weddings are our first love.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
            {[
              { img:'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', h:'280px' },
              { img:'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', h:'280px' },
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ height:img.h }}>
                <img src={img.img} alt="Indian wedding" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </motion.div>
        </Reveal>

        {/* full-bleed horizontal gallery strip */}
        <Reveal>
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-3 rounded-2xl overflow-hidden" style={{ height:'220px' }}>
            {[
              'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
              'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
              'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
              'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── DESTINATION / INTERNATIONAL ── */
function DestinationSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:['start end','end start'] });
  const y = useTransform(scrollYProgress,[0,1],['-8%','8%']);

  const destinations = ['Santorini','Paris','Bali','Maldives','Dubai','Tuscany','London','New York'];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height:'85vh' }}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img src="https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Destination wedding" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to right,rgba(5,5,5,0.88) 0%,rgba(5,5,5,0.4) 60%,rgba(5,5,5,0.1) 100%)' }} />

      <div className="relative z-20 h-full flex items-center px-8 md:px-20">
        <Reveal className="max-w-[520px]">
          <Label>International &amp; Destination</Label>
          <motion.h2 variants={fadeUp} className="text-white mb-5" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(30px,4.5vw,60px)', lineHeight:1.05 }}>
            We Follow Your
            <br />Love, Anywhere.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color:'rgba(255,255,255,0.5)', fontSize:'15px', lineHeight:1.85, marginBottom:'24px' }}>
            Destination weddings require a team that can work beautifully in any light, any culture, any corner of the world. We've done it on five continents.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {destinations.map(d => (
              <span key={d} className="px-3 py-1 rounded-full text-xs" style={{ background:'rgba(200,169,106,0.12)', border:'1px solid rgba(200,169,106,0.25)', color:'var(--accent-gold)' }}>
                {d}
              </span>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── PRE-WEDDING SECTION ── */
function PreWeddingSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#080808' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-14">
          <Label>Pre-Wedding Shoots</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.8vw,50px)', lineHeight:1.1 }}>
            Fall in Love with the Camera
            <br />Before the Big Day.
          </motion.h2>
        </Reveal>
        <Reveal className="grid md:grid-cols-[1fr_1.5fr_1fr] gap-4" style={{ gridAutoRows:'340px' }}>
          {[
            { img:'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', label:'Golden Hour Portraits' },
            { img:'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', label:'Destination Sessions'  },
            { img:'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', label:'Intimate Detail Shots'  },
          ].map(p => (
            <motion.div key={p.label} variants={fadeUp}
              className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img src={p.img} alt={p.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(5,5,5,0.7) 0%,transparent 55%)' }} />
              <p className="absolute bottom-5 left-5 text-white text-sm" style={{ fontFamily:'var(--font-heading)' }}>{p.label}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
const steps = [
  { n:'01', title:'Initial Consultation', desc:'We learn your story — your vision, your venue, your vibe.' },
  { n:'02', title:'Creative Planning',    desc:'Shot lists, timelines, mood boards, and location scouting.' },
  { n:'03', title:'The Big Day',          desc:'Our team blends in and captures everything, invisibly.' },
  { n:'04', title:'Post-Production',      desc:'Color grading, music selection, and cinematic editing.' },
  { n:'05', title:'Delivery',             desc:'Private gallery, digital film, and heirloom album — yours forever.' },
];

function ProcessSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'#0a0a0a' }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="text-center mb-16">
          <Label>Our Process</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)' }}>
            From First Call to Final Film
          </motion.h2>
        </Reveal>
        <Reveal className="flex flex-col gap-0">
          {steps.map((s, i) => (
            <motion.div key={s.n} variants={fadeUp}
              className="flex items-start gap-8 py-8 group"
              style={{ borderBottom: i < steps.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span className="flex-shrink-0 select-none" style={{ fontFamily:'var(--font-heading)', fontSize:'56px', lineHeight:1, color:'rgba(200,169,106,0.12)', fontStyle:'italic' }}>{s.n}</span>
              <div className="flex-1 pt-3">
                <p className="text-white mb-2" style={{ fontFamily:'var(--font-heading)', fontSize:'20px' }}>{s.title}</p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', lineHeight:1.8 }}>{s.desc}</p>
              </div>
              <ArrowRight size={18} className="flex-shrink-0 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:'var(--accent-gold)' }} />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
const testimonials = [
  { name:'Priya & Aryan', project:'Mumbai Palace Wedding',   text:'We cried watching our film for the first time. They captured emotions we didn\'t even know we showed. The drone shots of our venue are otherworldly.', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name:'Sarah & James', project:'Santorini Destination',   text:'Flying them to Greece was the best decision we made. Every frame looks like a movie still. Our guests still message us about the wedding film.', img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name:'Meera & Raj',   project:'Jaipur Heritage Wedding', text:'The way they blend into the background and still catch every micro-expression is magical. Our pre-wedding shoot alone was worth every penny.', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
];

function Testimonials() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor:'var(--deep-green)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-14">
          <Label>Couple Stories</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(28px,3.5vw,48px)' }}>What Couples Say</motion.h2>
        </Reveal>
        <Reveal className="grid md:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <motion.div key={t.name} variants={fadeUp}
              className="flex flex-col gap-5 p-7 rounded-2xl"
              style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}
              whileHover={{ y:-4, borderColor:'rgba(200,169,106,0.25)' }} transition={{ duration:0.3 }}>
              <div className="flex gap-1">
                {[...Array(5)].map((_,i) => <span key={i} style={{ color:'var(--accent-gold)', fontSize:'13px' }}>★</span>)}
              </div>
              <p className="flex-1 italic" style={{ color:'rgba(255,255,255,0.55)', fontSize:'15px', lineHeight:1.85 }}>"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-white text-sm" style={{ fontFamily:'var(--font-heading)' }}>{t.name}</p>
                  <p style={{ color:'var(--accent-gold)', fontSize:'11px', letterSpacing:'0.08em' }}>{t.project}</p>
                </div>
              </div>
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
    <section className="py-32 px-6 text-center" style={{ backgroundColor:'var(--dark)' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full" style={{ border:'1px solid rgba(200,169,106,0.06)' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ border:'1px solid rgba(200,169,106,0.04)' }} />
      </div>
      <Reveal className="relative z-10 max-w-[640px] mx-auto flex flex-col items-center gap-6">
        <Label>Start Your Journey</Label>
        <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(32px,5vw,62px)', lineHeight:1.05, letterSpacing:'-0.02em' }}>
          Your Day. Our Art.
          <br /><span style={{ color:'var(--accent-gold)' }}>Let's Make It Eternal.</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'var(--accent-gold)', color:'#0a0a0a', fontFamily:'var(--font-heading)', letterSpacing:'0.05em' }}>
            <MessageCircle size={15} /> Book Now on WhatsApp
          </a>
          <Link to="/contact"
            className="px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background:'rgba(255,255,255,0.06)', color:'white', border:'1px solid rgba(255,255,255,0.14)', fontFamily:'var(--font-heading)', letterSpacing:'0.05em' }}>
            Get a Quote
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ── PAGE ── */
export function WeddingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor:'#0a0a0a' }}>
      <BackToServices />
      <Hero />
      <StatsBar />
      <ServicePillars />
      <FilmShowcase />
      <IndianSection />
      <DestinationSection />
      <PreWeddingSection />
      <ProcessSection />
      <Testimonials />
      <CTA />
    </div>
  );
}
