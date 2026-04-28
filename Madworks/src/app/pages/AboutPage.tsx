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
const FILLER_MALE   = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const FILLER_FEMALE = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const team = [
  {
    name: 'Aniket Patil',
    role: 'Founder & Creative Head',
    img: FILLER_MALE,
    thought: 'Founder of Madworks since 2017, Aniket started his journey with international editing projects before stepping into full-scale production and shooting. With a strong creative vision and hands-on approach, he leads the team with a focus on storytelling, innovation, and high-quality visual experiences.',
    index: '01',
  },
  {
    name: 'Manali Patil',
    role: 'Creative Director & Co-Founder',
    img: FILLER_FEMALE,
    thought: 'Manali plays a key role in shaping the creative direction of Madworks. Beyond being a constant support system, she contributes through candid photography and overall creative guidance, ensuring every project carries a unique and refined touch.',
    index: '02',
  },
  {
    name: 'Omkar Chikane',
    role: 'Chief Editor',
    img: '/images/omkar.jpeg',
    thought: 'Omkar is the backbone of post-production at Madworks. Known for his creativity and dedication, he brings stories to life through editing and is deeply committed to his craft — often going beyond time limits to achieve perfection.',
    index: '03',
  },
  {
    name: 'Mahesh Suroshe',
    role: 'Cinematographer',
    img: FILLER_MALE,
    thought: 'Mahesh is a passionate cinematographer who strives for perfection in every frame. His ability to go the extra mile ensures that every visual captured meets the highest standards of quality and creativity.',
    index: '04',
  },
  {
    name: 'Naresh Shelar',
    role: 'Photographer',
    img: '/images/NARESH.jpeg',
    thought: 'Naresh excels in both traditional and candid photography. His versatility and eye for detail help capture moments in their most authentic and timeless form.',
    index: '05',
  },
  {
    name: 'Sumedh Bansode',
    role: 'Associate Editor',
    img: '/images/sumedh.jpeg',
    thought: 'Sumedh specializes in wedding and story-based edits. With a natural sense of direction and storytelling, he adds emotional depth and narrative flow to every project he works on.',
    index: '06',
  },
  {
    name: 'Swapnil Mestry',
    role: 'Photographer & Videographer',
    img: '/images/swapnil.jpeg',
    thought: 'Swapnil is a true hybrid shooter, skilled in both photography and videography. His adaptability allows him to handle any situation seamlessly, making him a valuable asset to the team.',
    index: '07',
  },
  {
    name: 'Sairaj',
    role: 'Operations Manager',
    img: '/images/sairaj.jpeg',
    thought: 'Sairaj manages the backbone of Madworks\' operations. From planning and logistics to project delivery and team coordination, he ensures every shoot runs smoothly and efficiently.',
    index: '08',
  },
];

/* ── parallax team photo ── */
function TeamHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" style={{ backgroundColor: 'var(--dark)' }}>
      {/* parallax image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <img
          src="/images/team.JPG"
          alt="Madworks team"
          className="w-full h-full fixed bg-cover object-cover object-top"
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
