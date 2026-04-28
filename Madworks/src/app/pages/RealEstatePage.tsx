import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Camera, Wind, BarChart2, CheckCircle, MessageCircle } from 'lucide-react';
import { BackToServices } from '../components/BackToServices';

const WA = 'https://wa.me/919876543210';
const ACCENT = '#8AABBA';
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
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Luxury real estate" className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom,rgba(5,5,5,.65) 0%,rgba(5,5,5,.25) 40%,rgba(5,5,5,.92) 100%)' }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 text-center px-6 max-w-[860px]">
        <motion.p initial={{ opacity: 0, letterSpacing: '0.55em' }} animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.5, delay: 0.2 }} className="uppercase text-xs mb-5" style={{ color: ACCENT }}>
          Real Estate Visuals
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }} className="text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px,7vw,92px)', lineHeight: 0.95, letterSpacing: '-0.025em' }}>
          Properties That
          <br /><span style={{ color: ACCENT, fontStyle: 'italic' }}>Sell Themselves.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }} className="text-white/50 mb-10 mx-auto"
          style={{ fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.85, maxWidth: '460px' }}>
          Architectural photography, cinematic property tours, and drone aerials that make listings stand out — and close faster.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap items-center justify-center gap-3">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
            style={{ background: ACCENT, color: '#0a0a0a', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
            <MessageCircle size={15} /> Book a Shoot
          </a>
          <Link to="/portfolio"
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(255, 3, 3, 0.07)', color: 'white', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
            View Property Work
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

/* ── STATS ── */
const stats = [
  { value: '200+', label: 'Properties Shot'   },
  { value: '48hr', label: 'Turnaround'         },
  { value: '4K',   label: 'All Footage'        },
  { value: 'FAA',  label: 'Licensed Drone Ops' },
];
function StatsBar() {
  return (
    <div className="py-7 px-6" style={{ background: `linear-gradient(135deg,#0e1820,#132030)` }}>
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', lineHeight: 1, color: ACCENT }}>{s.value}</p>
            <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: `${ACCENT}60` }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SERVICES ── */
const services = [
  {
    icon: Play,
    title: 'Property Tour Films',
    desc: 'Cinematic walkthroughs that guide viewers room to room, highlight to highlight — creating an emotional pull that static photos can\'t match.',
    items: ['Full-length 2–4 min films', 'Highlight 60-sec cuts', 'Voiceover & music', '4K delivery'],
    img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    icon: Camera,
    title: 'Interior Photography',
    desc: 'Room-by-room stills with professional lighting and composition — every angle chosen to maximize perceived space and luxury.',
    items: ['High-res edited stills', 'Twilight & daylight sets', 'Virtual staging compatible', 'MLS & OTA ready'],
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    icon: Wind,
    title: 'Drone Aerials',
    desc: 'Licensed drone operations capturing your property in context — neighbourhood, views, plot size, and proximity to landmarks.',
    items: ['4K aerial footage', 'Licensed pilots', 'Sunrise & sunset flights', 'Cinematic grading'],
    img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
];

function ServicesSection() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-16">
          <Label>What We Shoot</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.1 }}>
            Three Disciplines.
            <br />One Premium Standard.
          </motion.h2>
        </Reveal>
        <div className="flex flex-col gap-5">
          {services.map((svc, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <Reveal key={svc.title}
                className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <motion.div variants={fadeUp} className="flex flex-col justify-center gap-5 p-10 md:p-14"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                    <svc.icon size={20} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px,2.5vw,32px)', lineHeight: 1.15 }}>{svc.title}</h3>
                  <div style={{ width: '32px', height: '1px', background: ACCENT, opacity: 0.4 }} />
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.9 }}>{svc.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {svc.items.map(it => (
                      <li key={it} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                        <span style={{ width: '18px', height: '1px', background: ACCENT, opacity: 0.5, flexShrink: 0 }} />{it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={fadeUp} className="relative overflow-hidden" style={{ minHeight: '340px' }}>
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${ACCENT}10 0%,transparent 60%)` }} />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── GALLERY ── */
const propertyListings = [
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    title: 'Lodha Altus', sub: 'Mumbai · Penthouse', wide: true,
    video: '/videos/building1.mp4',
  },
  {
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'Bandra Villa', sub: 'Mumbai · 4BHK', wide: false,
    video: '/videos/building2.mp4',
  },
  {
    img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'Pune Skyline', sub: 'Pune · 3BHK', wide: false,
    video: '/videos/building3.mp4',
  },
  {
    img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'Aerial Reveal', sub: 'Drone · Goa', wide: false,
    video: '/videos/building4.mp4',
  },
];

function PropertyVideoCard({ item }: { item: typeof propertyListings[0] }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div variants={fadeUp}
      className={`relative rounded-2xl overflow-hidden ${item.wide ? 'md:col-span-2' : ''}`}>
      {!playing ? (
        <>
          <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,5,5,0.72) 0%,transparent 55%)' }} />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer group"
            aria-label={`Play ${item.title}`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              style={{ background: `${ACCENT}cc` }}>
              <Play size={20} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: '2px' }} />
            </div>
          </button>
          <div className="absolute bottom-5 left-5 pointer-events-none">
            <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: ACCENT }}>{item.sub}</p>
            <p className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>{item.title}</p>
          </div>
        </>
      ) : (
        <video ref={videoRef} autoPlay playsInline controls className="w-full h-full object-cover">
          <source src={item.video} type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
}

function Gallery() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-14">
          <Label>Featured Listings</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,3.8vw,50px)' }}>
            Recent Property Shoots
          </motion.h2>
        </Reveal>
        <Reveal className="grid md:grid-cols-3 gap-4" style={{ gridAutoRows: '280px' }}>
          {propertyListings.map(item => (
            <PropertyVideoCard key={item.title} item={item} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── WHY AGENTS CHOOSE US ── */
const reasons = [
  'Listings with video get 403% more inquiries',
  'Drone aerials reduce time-on-market by 68%',
  '48-hour turnaround — listings go live fast',
  'Consistent quality across every property',
  'Experienced with luxury, mid-market, and commercial',
  'Platform-ready files for MLS, OTA, and social',
];

function WhyUs() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <Label>Why Agents &amp; Developers Choose Us</Label>
          <motion.h2 variants={fadeUp} className="text-white mb-8" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3.5vw,44px)', lineHeight: 1.15 }}>
            Great Visuals Close
            <br />Deals Faster.
          </motion.h2>
          <motion.ul variants={stagger} className="flex flex-col gap-4">
            {reasons.map(r => (
              <motion.li key={r} variants={fadeUp} className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7 }}>
                <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />{r}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
        <Reveal>
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img src="https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
              alt="Aerial property" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top,rgba(5,5,5,0.5) 0%,transparent 60%)` }} />
            {/* stat overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-4">
              {[{ v: '403%', l: 'More inquiries' }, { v: '68%', l: 'Faster sales' }].map(s => (
                <div key={s.l} className="flex-1 p-4 rounded-xl" style={{ background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(10px)', border: `1px solid ${ACCENT}30` }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: ACCENT }}>{s.v}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', lineHeight: 1.4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
const steps = [
  { n: '01', title: 'Property Brief',   desc: 'You share listing details, key features to highlight, and the target buyer profile.' },
  { n: '02', title: 'Shoot Day',        desc: 'We handle lighting, staging adjustments, drone flights, and all photography in one visit.' },
  { n: '03', title: 'Edit & Retouch',   desc: 'Every image is retouched. Every video is graded and scored. Typically within 48 hours.' },
  { n: '04', title: 'Go Live',          desc: 'Files optimised for MLS, Zillow, Instagram, and your own website — ready to publish.' },
];

function Process() {
  return (
    <section className="py-28 px-6 md:px-12" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="text-center mb-16">
          <Label>The Process</Label>
          <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3.5vw,46px)' }}>
            Shoot to Live in 48 Hours
          </motion.h2>
        </Reveal>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp}
                className="relative flex flex-col gap-5 p-7 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                whileHover={{ borderColor: `${ACCENT}44`, y: -4 }} transition={{ duration: 0.3 }}>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-5 h-[1px] z-10" style={{ background: `${ACCENT}25` }} />
                )}
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', lineHeight: 1, color: `${ACCENT}20`, fontStyle: 'italic' }}>{s.n}</span>
                <h3 className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '19px' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.8 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
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
        <Label>List Faster. Sell Higher.</Label>
        <motion.h2 variants={fadeUp} className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px,5vw,60px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Ready to Showcase
          <br /><span style={{ color: ACCENT }}>Your Next Listing?</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a href={WA} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: ACCENT, color: '#0a0a0a', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>
            <MessageCircle size={15} /> WhatsApp to Book
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
    e.currentTarget.style.background = "rgba(85, 80, 80, 0.65)";
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

export function RealEstatePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <BackToServices />
      <Hero />
      <StatsBar />
      <ServicesSection />
      <Gallery />
      <WhyUs />
      <Process />
      <CTA />
    </div>
  );
}
