import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

/* ── data ── */
const team = [
  {
    name: 'Arjun Madaan',
    role: 'Founder & Lead Photographer',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    thought: 'Every wedding is a universe of its own. My job is to disappear into it and bring back the moments that made it real.',
    index: '01',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Senior Videographer',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    thought: 'Film is time travel. When you press play ten years from now, I want you to feel every single second of that day.',
    index: '02',
  },
  {
    name: 'Rahul Verma',
    role: 'Creative Director',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    thought: 'Great visuals don\'t happen by accident. We obsess over light, composition, and story — so you never have to.',
    index: '03',
  },
  {
    name: 'Priya Sharma',
    role: 'Ads & Brand Specialist',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    thought: 'Whether it\'s a brand or a bride, every subject has a story worth telling with intention and beauty.',
    index: '04',
  },
];

/* ── parallax team photo ── */
function TeamHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={ref} className="relative h-[92vh] overflow-hidden" style={{ backgroundColor: 'var(--dark)' }}>
      {/* parallax image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src="../assets/team.JPG"
          alt="Madworks team"
          className="w-full h-full fixed"
        />
      </motion.div>

      {/* rich gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.15) 45%, rgba(15,15,15,0.85) 100%)',
        }}
      />

      {/* top label */}
      <motion.p
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-15 left-1/2 -translate-x-1/2 z-20 uppercase text-xs tracking-[0.35em] text-white/60"
      >
        Madworks Studio
      </motion.p>

      {/* bottom copy */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-16 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="uppercase text-xs tracking-[0.28em] mb-3" style={{ color: 'var(--accent-gold)' }}>
            The People Behind the Lens
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            Our Team
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/55 max-w-[340px] md:text-right"
          style={{ fontSize: '15px', lineHeight: 1.8 }}
        >
          A passionate crew of photographers, filmmakers, and creatives — telling love stories across India
          and around the world.
        </motion.p>
      </div>
    </section>
  );
}

/* ── org description strip ── */
function OrgStrip() {
  return (
    <section
      className="py-20 px-8 md:px-20"
      style={{ backgroundColor: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <Reveal className="max-w-[1100px] mx-auto grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
        <motion.div variants={fadeUp}>
          <p className="uppercase text-xs tracking-[0.28em] mb-4" style={{ color: 'var(--accent-gold)' }}>
            Who We Are
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent-gold)', opacity: 0.5 }} />
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(22px, 2.8vw, 34px)',
              lineHeight: 1.45,
              color: 'white',
            }}
          >
            We are a full-service visual agency specialising in wedding photography, cinematic films, and
            advertising — serving couples and brands across India and internationally.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-white/45"
            style={{ fontSize: '15px', lineHeight: 1.9 }}
          >
            Founded in Mumbai, built on obsession. Every frame we deliver carries the same weight — whether
            it's a first look at a Rajasthani palace, a beach ceremony in Santorini, or a brand campaign that
            needs to stop the scroll.
          </motion.p>
        </div>
      </Reveal>
    </section>
  );
}

/* ── individual member card ── */
function MemberCard({ member, i }: { member: (typeof team)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className="grid md:grid-cols-[420px_1fr] gap-0 overflow-hidden rounded-3xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* photo */}
      <motion.div variants={fadeUp} className="relative overflow-hidden" style={{ aspectRatio: '4/5', minHeight: '360px' }}>
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* gold wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(200,169,106,0.12) 0%, transparent 60%)',
          }}
        />
        {/* index number watermark */}
        <span
          className="absolute bottom-5 right-6 select-none"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '80px',
            lineHeight: 1,
            color: 'rgba(200,169,106,0.15)',
            fontStyle: 'italic',
          }}
        >
          {member.index}
        </span>
      </motion.div>

      {/* text */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col justify-center gap-6 p-10 md:p-14"
      >
        <p
          className="uppercase text-xs tracking-[0.28em]"
          style={{ color: 'var(--accent-gold)' }}
        >
          {member.role}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3vw, 42px)',
            lineHeight: 1.15,
            color: 'white',
          }}
        >
          {member.name}
        </h2>

        <div style={{ width: '32px', height: '1px', background: 'var(--accent-gold)', opacity: 0.6 }} />

        {/* large opening quote mark */}
        <div className="relative">
          <span
            className="absolute -top-4 -left-2 select-none"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '80px',
              lineHeight: 1,
              color: 'rgba(200,169,106,0.2)',
            }}
          >
            "
          </span>
          <blockquote
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.65)',
              fontStyle: 'italic',
              paddingLeft: '4px',
            }}
          >
            {member.thought}
          </blockquote>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ── page ── */
export function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--dark)' }}>
      <TeamHero />
      <OrgStrip />

      {/* member cards */}
      <section className="px-6 md:px-12 pb-28 pt-4">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} i={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
