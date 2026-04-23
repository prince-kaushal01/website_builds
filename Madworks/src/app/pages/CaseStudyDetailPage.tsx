import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, MapPin, ArrowRight } from 'lucide-react';
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

/* ── Cinematic Hero ─────────────────────────────────────── */
function CinematicHero({ study }: { study: CaseStudy }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const fade  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[85vh] overflow-hidden flex items-end pb-16 md:pb-24">
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src={study.heroImage}
          alt={study.client}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.92) 100%)',
        }}
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-20 px-6 md:px-10 max-w-[1280px] mx-auto w-full"
      >
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] mb-10 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          <ArrowLeft size={13} />
          All Case Studies
        </Link>

        <div className="flex flex-col gap-4">
          <span
            className="self-start px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] rounded-full"
            style={{
              backgroundColor: 'rgba(200,169,106,0.14)',
              border: '1px solid rgba(200,169,106,0.45)',
              color: 'var(--accent-gold)',
            }}
          >
            {study.category}
          </span>

          <h1
            className="text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 7.5vw, 80px)',
              lineHeight: 1.0,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
          >
            {study.client}
          </h1>

          <div className="flex items-center gap-2">
            <MapPin size={13} style={{ color: 'var(--accent-gold)' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {study.location} · {study.year}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Meta Strip ─────────────────────────────────────────── */
function MetaStrip({ study }: { study: CaseStudy }) {
  const items = [
    { label: 'Client', value: study.client },
    { label: 'Category', value: study.category },
    { label: 'Location', value: study.location },
    { label: 'Year', value: study.year },
    { label: 'Duration', value: study.duration },
  ];

  return (
    <section
      className="py-8 px-6 md:px-10 border-b"
      style={{ backgroundColor: 'var(--dark)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-wrap gap-8 md:gap-0 md:divide-x" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {items.map((item, i) => (
            <div
              key={item.label}
              className="md:px-10 first:pl-0 last:pr-0"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <p
                className="text-[9px] uppercase tracking-[0.28em] mb-1.5"
                style={{ color: 'var(--accent-gold)' }}
              >
                {item.label}
              </p>
              <p className="text-sm font-medium text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The Story ──────────────────────────────────────────── */
function StorySection({ study }: { study: CaseStudy }) {
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-16">
          <Reveal>
            <motion.p
              variants={fadeUp}
              className="uppercase text-[9px] tracking-[0.32em] mb-4"
              style={{ color: 'var(--accent-gold)' }}
            >
              The Brief
            </motion.p>
            <motion.h3
              variants={fadeUp}
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                color: 'var(--dark)',
                fontStyle: 'italic',
              }}
            >
              The Challenge
            </motion.h3>
            <motion.div
              variants={fadeUp}
              className="h-px w-10 mb-7"
              style={{ backgroundColor: 'var(--accent-gold)' }}
            />
            <motion.p
              variants={fadeUp}
              style={{ color: 'var(--gray-text)', lineHeight: '1.85', fontSize: '16px' }}
            >
              {study.brief}
            </motion.p>
          </Reveal>

          <Reveal>
            <motion.p
              variants={fadeUp}
              className="uppercase text-[9px] tracking-[0.32em] mb-4"
              style={{ color: 'var(--accent-gold)' }}
            >
              Our Approach
            </motion.p>
            <motion.h3
              variants={fadeUp}
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                color: 'var(--dark)',
                fontStyle: 'italic',
              }}
            >
              The Process
            </motion.h3>
            <motion.div
              variants={fadeUp}
              className="h-px w-10 mb-7"
              style={{ backgroundColor: 'var(--accent-gold)' }}
            />
            <motion.p
              variants={fadeUp}
              style={{ color: 'var(--gray-text)', lineHeight: '1.85', fontSize: '16px' }}
            >
              {study.approach}
            </motion.p>
          </Reveal>
        </div>

        {/* service tags */}
        <div
          className="flex flex-wrap gap-2.5 pt-10 border-t"
          style={{ borderColor: 'rgba(0,0,0,0.07)' }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.28em] self-center mr-2"
            style={{ color: 'var(--accent-gold)' }}
          >
            Services
          </span>
          {study.services.map((service) => (
            <span
              key={service}
              className="px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.18em]"
              style={{
                backgroundColor: 'var(--light)',
                color: 'var(--gray-text)',
                border: '1px solid rgba(0,0,0,0.09)',
              }}
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ────────────────────────────────────────────── */
function GallerySection({ images, client }: { images: string[]; client: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--dark)' }}>
      {/* Editorial grid: top row [2fr | 1fr], bottom row [1fr | 2fr] */}
      <div className="grid md:grid-cols-3 gap-0.5">
        {/* Image 0 – large left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0, ease }}
          className="md:col-span-2 overflow-hidden"
          style={{ aspectRatio: '16/10' }}
        >
          <img
            src={images[0]}
            alt={`${client} — 1`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Image 1 – tall right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="overflow-hidden"
          style={{ aspectRatio: '16/10' }}
        >
          <img
            src={images[1]}
            alt={`${client} — 2`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Image 2 – small bottom-left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="overflow-hidden"
          style={{ aspectRatio: '16/10' }}
        >
          <img
            src={images[2]}
            alt={`${client} — 3`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Image 3 – large bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="md:col-span-2 overflow-hidden"
          style={{ aspectRatio: '16/10' }}
        >
          <img
            src={images[3]}
            alt={`${client} — 4`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Results ────────────────────────────────────────────── */
function ResultsSection({ stats }: { stats: CaseStudy['stats'] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-28 px-6 md:px-10"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <motion.p
            variants={fadeUp}
            className="uppercase text-[9px] tracking-[0.35em] mb-16"
            style={{ color: 'var(--accent-gold)' }}
          >
            The Results
          </motion.p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.13, ease }}
              className="md:px-10 first:pl-0 last:pr-0"
            >
              <p
                className="mb-3 leading-none"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(48px, 6.5vw, 80px)',
                  color: 'var(--accent-gold)',
                  fontStyle: 'italic',
                }}
              >
                {stat.value}
              </p>
              <div
                className="h-px w-8 mb-4"
                style={{ backgroundColor: 'rgba(200,169,106,0.35)' }}
              />
              <p
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(255,255,255,0.38)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonial ────────────────────────────────────────── */
function TestimonialSection({ testimonial }: { testimonial: CaseStudy['testimonial'] }) {
  return (
    <section className="py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--light)' }}>
      <div className="max-w-[820px] mx-auto text-center">
        <Reveal>
          <motion.p
            variants={fadeUp}
            className="uppercase text-[9px] tracking-[0.35em] mb-10"
            style={{ color: 'var(--accent-gold)' }}
          >
            Client Voice
          </motion.p>

          {/* large quote mark */}
          <motion.div
            variants={fadeUp}
            className="mb-6 leading-none select-none"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '100px',
              color: 'var(--accent-gold)',
              opacity: 0.25,
              lineHeight: 0.6,
            }}
            aria-hidden
          >
            "
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-10 leading-relaxed"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(20px, 3vw, 30px)',
              fontStyle: 'italic',
              color: 'var(--dark)',
              lineHeight: 1.55,
            }}
          >
            {testimonial.quote}
          </motion.p>

          <motion.div variants={fadeUp}>
            <div
              className="h-px w-10 mx-auto mb-6"
              style={{ backgroundColor: 'var(--accent-gold)' }}
            />
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--dark)' }}>
              {testimonial.author}
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.25em] mt-1"
              style={{ color: 'var(--gray-text)' }}
            >
              {testimonial.role}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Next Project ───────────────────────────────────────── */
function NextProjectSection({ next }: { next: CaseStudy }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: '420px' }}>
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src={next.coverImage}
          alt={next.client}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(5,5,5,0.75)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <p
          className="uppercase text-[9px] tracking-[0.35em] mb-4"
          style={{ color: 'var(--accent-gold)' }}
        >
          Next Project
        </p>
        <h3
          className="text-white mb-8"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(26px, 4.5vw, 50px)',
            fontStyle: 'italic',
          }}
        >
          {next.client}
        </h3>
        <Link
          to={`/case-studies/${next.id}`}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.26em] font-semibold transition-all duration-300"
          style={{
            border: '1px solid var(--accent-gold)',
            color: 'var(--accent-gold)',
          }}
        >
          View Case Study
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  );
}

/* ── Main Export ────────────────────────────────────────── */
export function CaseStudyDetailPage() {
  const { id } = useParams();
  const study = caseStudies.find((s) => s.id === Number(id));

  if (!study) return <Navigate to="/case-studies" replace />;

  const currentIndex = caseStudies.findIndex((s) => s.id === study.id);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="min-h-screen pt-[72px]">
      <CinematicHero study={study} />
      <MetaStrip study={study} />
      <StorySection study={study} />
      <GallerySection images={study.gallery} client={study.client} />
      <ResultsSection stats={study.stats} />
      <TestimonialSection testimonial={study.testimonial} />
      <NextProjectSection next={nextStudy} />
    </div>
  );
}
