import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { caseStudies, type CaseStudy } from '../data/caseStudies';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const categories = [
  { label: 'All Projects', slug: 'all' },
  { label: 'Weddings', slug: 'weddings' },
  { label: 'Brand Ads', slug: 'brand-ads' },
  { label: 'International', slug: 'international' },
  { label: 'Real Estate', slug: 'real-estate' },
];

/* ── Hero ───────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const fade  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-[88vh] overflow-hidden flex items-end pb-20 md:pb-28">
      {/* parallax bg */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Madworks Case Studies"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* cinematic gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.05) 35%, rgba(5,5,5,0.88) 100%)',
        }}
      />

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-20 px-6 md:px-10 max-w-[1280px] mx-auto w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="uppercase text-xs tracking-[0.35em] mb-5"
          style={{ color: 'var(--accent-gold)' }}
        >
          Our Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className="text-white mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(60px, 11vw, 120px)',
            lineHeight: 0.88,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
          }}
        >
          Case<br />Studies
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.65, ease }}
          style={{ originX: 0, backgroundColor: 'var(--accent-gold)' }}
          className="h-px w-28 mb-7"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-white/55 max-w-sm"
          style={{ fontSize: '16px', lineHeight: '1.75' }}
        >
          Six years. Forty countries. Stories that refused to be ordinary.
        </motion.p>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 right-10 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] rotate-90 origin-center mb-6">
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-12"
          style={{ backgroundColor: 'rgba(200,169,106,0.5)' }}
        />
      </motion.div>
    </section>
  );
}

/* ── Featured Case Study ────────────────────────────────── */
function FeaturedStudy({ study }: { study: CaseStudy }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-6 md:px-10" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="max-w-[1280px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="uppercase text-xs tracking-[0.3em] mb-12"
          style={{ color: 'var(--accent-gold)' }}
        >
          Featured Project
        </motion.p>

        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden">
          {/* image half */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease }}
            className="relative overflow-hidden"
            style={{ minHeight: '520px' }}
          >
            <img
              src={study.heroImage}
              alt={study.client}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 60%, rgba(17,17,17,0.85) 100%)',
              }}
            />
          </motion.div>

          {/* content half */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex flex-col justify-between p-10 md:p-14"
            style={{ backgroundColor: '#111111' }}
          >
            <div>
              <span
                className="px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] rounded-full mb-8 inline-block"
                style={{
                  backgroundColor: 'rgba(200,169,106,0.1)',
                  border: '1px solid rgba(200,169,106,0.35)',
                  color: 'var(--accent-gold)',
                }}
              >
                {study.category}
              </span>

              <h2
                className="text-white mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, 46px)',
                  fontStyle: 'italic',
                }}
              >
                {study.client}
              </h2>

              <div className="flex items-center gap-2 mb-7">
                <MapPin size={13} style={{ color: 'var(--accent-gold)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {study.location} · {study.year}
                </span>
              </div>

              <p
                className="leading-relaxed mb-10"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}
              >
                {study.description}
              </p>

              {/* stats grid */}
              <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {study.stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-bold mb-1"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '34px',
                        color: 'var(--accent-gold)',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to={`/case-studies/${study.id}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 self-start"
              style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--dark)' }}
            >
              Explore Full Story
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Case Card ──────────────────────────────────────────── */
function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      whileHover={{ y: -10 }}
    >
      <Link
        to={`/case-studies/${study.id}`}
        className="group relative block overflow-hidden rounded-2xl"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
      >
        {/* image */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={study.coverImage}
            alt={study.client}
            className="w-full h-full object-cover group-hover:scale-110"
            style={{ transition: 'transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
          />
        </div>

        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.45) 50%, rgba(5,5,5,0.0) 100%)',
          }}
        />

        {/* hover overlay tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'rgba(0,0,0,0.15)' }}
        />

        {/* category badge */}
        <div className="absolute top-5 left-5">
          <span
            className="px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] rounded-full"
            style={{
              backgroundColor: 'rgba(200,169,106,0.12)',
              border: '1px solid rgba(200,169,106,0.45)',
              color: 'var(--accent-gold)',
            }}
          >
            {study.category}
          </span>
        </div>

        {/* year badge - top right */}
        <div className="absolute top-5 right-5">
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {study.year}
          </span>
        </div>

        {/* content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-1.5 mb-2.5">
            <MapPin size={11} style={{ color: 'var(--accent-gold)' }} />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: 'rgba(200,169,106,0.75)' }}
            >
              {study.location}
            </span>
          </div>

          <h3
            className="text-white mb-3 leading-snug"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontStyle: 'italic' }}
          >
            {study.client}
          </h3>

          {/* tagline — fades in on hover */}
          <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-16 mb-0 group-hover:mb-4">
            <p className="text-white/55 leading-relaxed" style={{ fontSize: '12px' }}>
              {study.tagline}
            </p>
          </div>

          {/* CTA row */}
          <div
            className="flex items-center justify-between"
          >
            <span
              className="text-[10px] uppercase tracking-[0.22em] font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              View Case Study
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                border: '1px solid rgba(200,169,106,0.4)',
                backgroundColor: 'rgba(200,169,106,0.08)',
              }}
            >
              <ArrowUpRight size={14} style={{ color: 'var(--accent-gold)' }} />
            </div>
          </div>
        </div>

        {/* bottom gold accent line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: 'var(--accent-gold)' }}
        />
      </Link>
    </motion.div>
  );
}

/* ── Stats Bar ──────────────────────────────────────────── */
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const items = [
    { value: '6+', label: 'Years of Excellence' },
    { value: '400+', label: 'Projects Delivered' },
    { value: '40+', label: 'Countries Covered' },
    { value: '98%', label: 'Client Return Rate' },
  ];

  return (
    <section
      ref={ref}
      className="py-14 px-6 md:px-10 border-y"
      style={{ backgroundColor: 'var(--light)', borderColor: 'rgba(0,0,0,0.07)' }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="text-center"
          >
            <p
              className="mb-1"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 5vw, 52px)',
                color: 'var(--dark)',
                lineHeight: 1,
                fontStyle: 'italic',
              }}
            >
              {item.value}
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ color: 'var(--gray-text)' }}
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Main Page ──────────────────────────────────────────── */
export function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const featured = caseStudies.find((s) => s.featured)!;
  const filtered =
    activeFilter === 'all'
      ? caseStudies.filter((s) => !s.featured)
      : caseStudies.filter((s) => s.categorySlug === activeFilter);

  return (
    <div className="min-h-screen pt-[72px]">
      <HeroSection />

      <FeaturedStudy study={featured} />

      <StatsBar />

      {/* All projects section */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: 'var(--light)' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <motion.p
              variants={fadeUp}
              className="uppercase text-xs tracking-[0.3em] mb-2"
              style={{ color: 'var(--accent-gold)' }}
            >
              The Portfolio
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-14"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 5vw, 56px)',
                color: 'var(--dark)',
                fontStyle: 'italic',
              }}
            >
              Every Story, Told Right
            </motion.h2>
          </Reveal>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 mb-14">
            {categories.map((cat) => (
              <motion.button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.22em] transition-all duration-300"
                style={{
                  backgroundColor: activeFilter === cat.slug ? 'var(--dark)' : 'transparent',
                  color: activeFilter === cat.slug ? 'white' : 'var(--gray-text)',
                  border: `1px solid ${activeFilter === cat.slug ? 'var(--dark)' : 'rgba(0,0,0,0.18)'}`,
                  fontWeight: activeFilter === cat.slug ? 600 : 400,
                }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((study, i) => (
                <CaseCard key={study.id} study={study} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[var(--gray-text)] text-sm">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-[1000px] mx-auto text-center">
          <Reveal>
            <motion.p
              variants={fadeUp}
              className="uppercase text-xs tracking-[0.35em] mb-5"
              style={{ color: 'var(--accent-gold)' }}
            >
              Start a Project
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-white mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontStyle: 'italic',
              }}
            >
              Your story deserves
              <br />
              to be told well.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mb-10 max-w-md mx-auto"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', lineHeight: '1.7' }}
            >
              Whether it's a grand wedding or a global brand campaign — we bring the same obsession to every frame.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-[11px] uppercase tracking-[0.28em] font-semibold transition-all duration-300"
                style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--dark)' }}
              >
                Get in Touch
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
