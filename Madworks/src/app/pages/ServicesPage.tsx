import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'motion/react';

/* ─── animation presets ─── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
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

/* ─── service data ─── */
const services = [
  {
    id: 'wedding',
    number: '01',
    title: 'Wedding Production',
    tagline: 'Every vow. Every tear. Every dance.',
    description:
      'From the first look to the final farewell, we craft complete wedding narratives — spanning multiple days, rituals, and emotions.',
    items: ['Cinematic Films', 'Traditional Coverage', 'Pre-Wedding Shoots', 'Destination Weddings', 'Drone Coverage', 'Wedding Albums'],
    bg: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    accent: '#C8A96A',
  },
  {
    id: 'resort',
    number: '02',
    title: 'Resort & Hospitality',
    tagline: 'Luxury, framed with intention.',
    description:
      'We bring the same cinematic eye we apply to love stories to the spaces where they unfold — resorts, hotels, and hospitality venues.',
    items: ['Resort Videos', 'Interior & Exterior', 'Food Photography', 'Drone Cinematics'],
    bg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    video: null,
    accent: '#A8C5B5',
  },
  {
    id: 'commercial',
    number: '03',
    title: 'Commercial Ads',
    tagline: 'Stop the scroll. Start the story.',
    description:
      'High-impact visuals built for the feed and beyond. We produce ads that convert — without sacrificing craft.',
    items: ['Instagram Ads', 'Brand Videos', 'Corporate Shoots', 'Food Reels', 'Drone Branding'],
    bg: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    video: null,
    accent: '#D4956A',
  },
  {
    id: 'realestate',
    number: '04',
    title: 'Real Estate',
    tagline: 'Properties that sell themselves.',
    description:
      'Architectural photography and aerials that showcase spaces at their absolute finest — for developers, agents, and architects.',
    items: ['Property Tours', 'Interior Photography', 'Drone Aerials'],
    bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    video: null,
    accent: '#8AABBA',
  },
  {
    id: 'editing',
    number: '05',
    title: 'Editing Services',
    tagline: 'Where raw footage becomes art.',
    description:
      'World-class post-production — colour, sound, and cut — delivered remotely for studios and creators worldwide.',
    items: ['Wedding Editing', 'Real Estate Editing', 'Ad Editing', 'Color Grading', 'Sound Design'],
    bg: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    video: null,
    accent: '#B5A8C8',
  },
];

/* ─── Hero ─── */
function ServicesHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* parallax bg */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* gradient */}
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.85) 100%)' }} />

      {/* text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6 max-w-[900px]"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="uppercase text-xs mb-6"
          style={{ color: 'var(--accent-gold)' }}
        >
          What We Create
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
          className="text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(50px, 7vw, 96px)', lineHeight: 1.0, letterSpacing: '-0.02em' }}
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease }}
          className="text-white/55 mx-auto"
          style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.85, maxWidth: '520px' }}
        >
          Five disciplines. One obsession — making every visual frame feel inevitable.
        </motion.p>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="uppercase text-[10px] tracking-[0.25em] text-white/30">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(200,169,106,0.8), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Service index bar ─── */
function ServiceIndexBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div
      className="sticky top-[72px] z-30 hidden md:flex items-center justify-center gap-0 overflow-x-auto"
      style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className="relative px-7 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer whitespace-nowrap"
          style={{ color: active === s.id ? s.accent : 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}
        >
          {s.title}
          {active === s.id && (
            <motion.div
              layoutId="service-underline"
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: s.accent }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Cinematic Service Block ─── */
function ServiceBlock({ svc, index }: { svc: (typeof services)[0]; index: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-40%' });
  const isReversed = index % 2 !== 0;

  return (
    <section
      ref={ref}
      id={svc.id}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* full-bleed image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: inView ? 1 : 1.06 }}
        transition={{ duration: 1.2, ease }}
      >
        <img src={svc.bg} alt={svc.title} className="w-full h-full object-cover" />
      </motion.div>

      {/* gradient overlay — shifts direction per row */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: isReversed
            ? 'linear-gradient(to left, rgba(10,10,10,0.96) 42%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.1) 100%)'
            : 'linear-gradient(to right, rgba(10,10,10,0.96) 42%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.1) 100%)',
        }}
      />

      {/* content panel */}
      <div className={`relative z-20 w-full max-w-[1200px] mx-auto px-8 md:px-16 py-24 flex ${isReversed ? 'justify-end' : 'justify-start'}`}>
        <Reveal className="max-w-[520px] w-full">

          {/* number */}
          <motion.span
            variants={fadeUp}
            className="block mb-6 select-none"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '120px',
              lineHeight: 1,
              color: 'rgba(255,255,255,0.04)',
              letterSpacing: '-0.04em',
              marginLeft: '-8px',
            }}
          >
            {svc.number}
          </motion.span>

          {/* tag */}
          <motion.p variants={fadeUp} className="uppercase text-xs tracking-[0.3em] mb-4" style={{ color: svc.accent }}>
            {svc.tagline}
          </motion.p>

          {/* title */}
          <motion.h2
            variants={fadeUp}
            className="text-white mb-5"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            {svc.title}
          </motion.h2>

          {/* description */}
          <motion.p variants={fadeUp} className="mb-10" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: '15px' }}>
            {svc.description}
          </motion.p>

          {/* service items */}
          <motion.ul variants={stagger} className="flex flex-col">
            {svc.items.map((item, i) => (
              <motion.li
                key={item}
                variants={fadeUp}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center justify-between py-3 cursor-default transition-colors duration-200"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  color: hovered === i ? 'white' : 'rgba(255,255,255,0.45)',
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.span
                    animate={{ width: hovered === i ? 28 : 14, background: hovered === i ? svc.accent : 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '1px', display: 'inline-block' }}
                  />
                  <span style={{ fontSize: '14px', letterSpacing: '0.02em', fontFamily: 'var(--font-body)' }}>
                    {item}
                  </span>
                </div>
                <motion.span
                  animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -6 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: '11px', color: svc.accent, letterSpacing: '0.1em' }}
                >
                  →
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>

        </Reveal>
      </div>

      {/* video chip — wedding section only */}
      {svc.video && (
        <div className={`absolute bottom-10 z-20 ${isReversed ? 'left-10' : 'right-10'} hidden md:block`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ width: '220px', aspectRatio: '9/16', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={svc.video} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      )}
    </section>
  );
}

/* ─── image mosaic strip between sections ─── */
function MosaicStrip({ images }: { images: string[] }) {
  return (
    <div className="flex h-[260px] overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="flex-1 overflow-hidden"
          whileHover={{ flex: 2.2 }}
          transition={{ duration: 0.5, ease }}
          style={{ minWidth: 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 brightness-75 hover:brightness-90" />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── closing marquee ─── */
function Marquee() {
  const words = ['Wedding Films', 'Cinematic Reels', 'Drone Aerials', 'Brand Stories', 'Resort Visuals', 'Color Grading', 'Sound Design'];
  const doubled = [...words, ...words];
  return (
    <div className="overflow-hidden py-10" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: 'rgba(255,255,255,0.08)', fontStyle: 'italic' }}>
              {w}
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)', opacity: 0.5, display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── page ─── */
export function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0].id);

  const scrollToService = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveService(id);
  };

  const mosaicImages = [
    'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <ServicesHero />
      <ServiceIndexBar active={activeService} onSelect={scrollToService} />

      {services.map((svc, i) => (
        <div key={svc.id}>
          <ServiceBlock svc={svc} index={i} />
          {i === 1 && <MosaicStrip images={mosaicImages} />}
        </div>
      ))}

      <Marquee />
    </div>
  );
}
