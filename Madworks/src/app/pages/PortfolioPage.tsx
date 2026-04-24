import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';

/* ─── types ─── */
type Size = 'sm' | 'md' | 'lg' | 'wide' | 'tall' | 'feature';
interface Item {
  id: string;
  category: string;
  title: string;
  sub: string;
  img: string;
  size: Size;
}

/* ─── data ─── */
const categories = [
  { id: 'all',        label: 'All Work',          count: 30 },
  { id: 'weddings',   label: 'Weddings',           count: 8  },
  { id: 'resort',     label: 'Resort / Hotel',     count: 5  },
  { id: 'commercial', label: 'Commercial Ads',     count: 5  },
  { id: 'realestate', label: 'Real Estate',        count: 4  },
  { id: 'food',       label: 'Food Photography',   count: 4  },
  { id: 'drone',      label: 'Drone Cinematics',   count: 2  },
  { id: 'editing',    label: 'Editing Work',       count: 2  },
];

const items: Item[] = [
  // Weddings
  { id:'w1', category:'weddings',   title:'Priya & Aryan',   sub:'Mumbai Palace',    img:'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'feature' },
  { id:'w2', category:'weddings',   title:'Sarah & James',   sub:'Santorini, Greece',img:'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'tall'    },
  { id:'w3', category:'weddings',   title:'Meera & Raj',     sub:'Jaipur Heritage',  img:'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
  { id:'w4', category:'weddings',   title:'Ananya & Vikram', sub:'Delhi Ceremony',   img:'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  { id:'w5', category:'weddings',   title:'Emma & Lucas',    sub:'Paris, France',    img:'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size:'md'   },
  { id:'w6', category:'weddings',   title:'Kavya & Rohan',   sub:'Goa Beachside',    img:'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
  { id:'w7', category:'weddings',   title:'Dia & Karan',     sub:'Udaipur Lake',     img:'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'sm'      },
  { id:'w8', category:'weddings',   title:'Rings & Roses',   sub:'Detail shoot',     img:'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'sm'      },
  // Resort / Hotel
  { id:'r1', category:'resort',     title:'The Leela Palace','sub':'Udaipur',         img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'feature' },
  { id:'r2', category:'resort',     title:'Oberoi Infinity',  sub:'Pool Deck',        img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
  { id:'r3', category:'resort',     title:'Suite Interior',   sub:'Taj Mumbai',       img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'tall'    },
  { id:'r4', category:'resort',     title:'Spa & Wellness',   sub:'Ananda Spa',       img:'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  { id:'r5', category:'resort',     title:'Rooftop Bar',      sub:'ITC Grand',        img:'https://images.unsplash.com/photo-1551882547-ff40c63fe2fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  // Commercial Ads
  { id:'c1', category:'commercial', title:'GlowUp Skincare',  sub:'Brand Campaign',   img:'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'feature' },
  { id:'c2', category:'commercial', title:'Titan Watches',    sub:'Instagram Series', img:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
  { id:'c3', category:'commercial', title:'FitFuel Protein',  sub:'Product Reel',     img:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'tall'    },
  { id:'c4', category:'commercial', title:'Aurelia Jewels',   sub:'Lookbook',         img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  { id:'c5', category:'commercial', title:'Mango Beverages',  sub:'Corporate Film',   img:'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  // Real Estate
  { id:'re1',category:'realestate', title:'Lodha Altus',      sub:'Mumbai Highrise',  img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'feature' },
  { id:'re2',category:'realestate', title:'Modern Villa',     sub:'Bandra West',      img:'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
  { id:'re3',category:'realestate', title:'Penthouse Interior',sub:'South Mumbai',    img:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  { id:'re4',category:'realestate', title:'Skyline Towers',   sub:'Pune',             img:'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  // Food Photography
  { id:'f1', category:'food',       title:'Masala Kitchen',   sub:'Menu Campaign',    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'feature' },
  { id:'f2', category:'food',       title:'Artisan Bakery',   sub:'Brand Shoot',      img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
  { id:'f3', category:'food',       title:'Zaffran Fine Dine',sub:'Editorial',        img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  { id:'f4', category:'food',       title:'The Table',        sub:'Social Media',     img:'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',  size:'md'      },
  // Drone Cinematics
  { id:'d1', category:'drone',      title:'Coastline Retreat','sub':'Goa Aerial',     img:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'feature' },
  { id:'d2', category:'drone',      title:'City at Dusk',     sub:'Mumbai Skyline',   img:'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size:'wide'    },
  // Editing Work
  { id:'e1', category:'editing',    title:'Color Mastery',    sub:'Cinematic Grade',  img:'../images/colour.jpg', size:'feature' },
  { id:'e2', category:'editing',    title:'Sound & Cut',      sub:'Wedding Film',     img:'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',  size:'wide'    },
];

/* ─── grid size map ─── */
const sizeClass: Record<Size, string> = {
  feature: 'col-span-2 row-span-2',
  wide:    'col-span-2 row-span-1',
  tall:    'col-span-1 row-span-2',
  lg:      'col-span-1 row-span-2',
  md:      'col-span-1 row-span-1',
  sm:      'col-span-1 row-span-1',
};

/* ─── helpers ─── */
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y    = useTransform(scrollYProgress, [0,1], ['0%','30%']);
  const fade = useTransform(scrollYProgress, [0,0.55], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Portfolio hero"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 45%, rgba(5,5,5,0.9) 100%)' }} />

      <motion.div style={{ opacity: fade }} className="relative z-20 mt-55
       text-center px-6 max-w-[860px]">
        <motion.h1
          initial={{ opacity:0, y:60 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.1, delay:0.4, ease }}
          className="text-white mb-7"
          style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(52px,8vw,104px)', lineHeight:0.95, letterSpacing:'-0.03em' }}
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:0.65, ease }}
          className="mx-auto"
          style={{ color:'rgba(255,255,255,0.45)', fontSize:'clamp(14px,1.3vw,17px)', lineHeight:1.9, maxWidth:'460px' }}
        >
          Seven categories. Hundreds of stories. Every frame crafted with obsessive intention.
        </motion.p>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="uppercase text-[10px] tracking-[0.25em]" style={{ color:'rgba(255,255,255,0.25)' }}>Explore</span>
          <motion.div
            animate={{ y:[0,9,0] }}
            transition={{ repeat:Infinity, duration:1.7, ease:'easeInOut' }}
            style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, rgba(200,169,106,0.8), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Category Filter ─── */
function CategoryFilter({ active, onChange }: { active: string; onChange: (id:string)=>void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="sticky top-[72px] z-30 py-4"
      style={{ background:'rgba(5,5,5,0.94)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}
    >
      <div ref={scrollRef} className="flex items-center gap-2 px-6 md:px-12 overflow-x-auto scrollbar-none" style={{ scrollbarWidth:'none' }}>
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              layout
              className="relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer"
              style={{
                color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-body)',
              }}
              whileHover={{ color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.9)' }}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background:'var(--accent-gold)' }}
                  transition={{ type:'spring', bounce:0.22, duration:0.5 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
              <span
                className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.07)',
                  color: isActive ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.25)',
                }}
              >
                {cat.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Portfolio Card ─── */
function PortfolioCard({ item, onClick, index }: { item: Item; onClick: ()=>void; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:'-60px' });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity:0, scale:0.96 }}
      animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.96 }}
      exit={{ opacity:0, scale:0.93 }}
      transition={{ duration:0.65, delay: (index % 6) * 0.07, ease }}
      className={`relative group overflow-hidden cursor-pointer ${sizeClass[item.size]}`}
      style={{ backgroundColor:'#111' }}
      onClick={onClick}
      whileHover={{ zIndex:2 }}
    >
      {/* image */}
      <motion.img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-cover"
        whileHover={{ scale:1.06 }}
        transition={{ duration:0.7, ease }}
      />

      {/* always-visible gradient at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{ background:'linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.1) 55%, transparent 100%)' }}
      />

      {/* category chip */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em]"
        style={{ background:'rgba(5,5,5,0.55)', backdropFilter:'blur(8px)', color:'var(--accent-gold)', border:'1px solid rgba(200,169,106,0.25)' }}
      >
        {categories.find(c => c.id === item.category)?.label ?? item.category}
      </div>

      {/* expand icon */}
      <motion.div
        initial={{ opacity:0, scale:0.7 }}
        whileHover={{ opacity:1, scale:1 }}
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background:'rgba(200,169,106,0.9)' }}
      >
        <Maximize2 size={14} color="#0a0a0a" />
      </motion.div>

      {/* info overlay — slides up */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-5 pointer-events-none"
        initial={{ y:10, opacity:0.6 }}
        whileHover={{ y:0, opacity:1 }}
        transition={{ duration:0.35, ease }}
      >
        <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-1">{item.sub}</p>
        <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(15px,1.4vw,20px)', lineHeight:1.2 }}>
          {item.title}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ items, index, onClose, onNav }: {
  items: Item[]; index: number; onClose: ()=>void; onNav: (dir: 1|-1)=>void
}) {
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      exit={{ opacity:0 }}
      transition={{ duration:0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background:'rgba(5,5,5,0.96)', backdropFilter:'blur(20px)' }}
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
        style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)' }}
      >
        <X size={18} color="white" />
      </button>

      {/* counter */}
      <div
        className="absolute top-6 left-6 text-xs uppercase tracking-[0.2em] z-10"
        style={{ color:'rgba(255,255,255,0.35)' }}
      >
        {index + 1} / {items.length}
      </div>

      {/* main image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity:0, scale:0.96, y:12 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:1.03, y:-12 }}
          transition={{ duration:0.4, ease }}
          className="relative max-w-[88vw] max-h-[80vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={item.img}
            alt={item.title}
            className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
          />
          {/* info bar */}
          <div className="mt-5 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="uppercase text-[10px] tracking-[0.22em] mb-1" style={{ color:'var(--accent-gold)' }}>
                {categories.find(c => c.id === item.category)?.label}
              </p>
              <p className="text-white" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(18px,2vw,26px)' }}>
                {item.title}
              </p>
              <p className="text-white/40 text-sm mt-0.5">{item.sub}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNav(-1)}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}
              >
                <ArrowLeft size={16} color="white" />
              </button>
              <button
                onClick={() => onNav(1)}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ background:'rgba(200,169,106,0.85)' }}
              >
                <ArrowRight size={16} color="#0a0a0a" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Category headline ─── */
function CategoryHeadline({ cat }: { cat: typeof categories[0] }) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.6, ease }}
      className="col-span-full flex items-end justify-between pb-2"
      style={{ borderBottom:'1px solid var(--mode-border)' }}
    >
      <div>
        <p className="uppercase text-[10px] tracking-[0.28em] mb-2" style={{ color:'var(--accent-gold)' }}>
          {cat.id === 'all' ? 'Complete Portfolio' : 'Category'}
        </p>
        <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(26px,3vw,42px)', lineHeight:1.1, color:'var(--mode-text)' }}>
          {cat.label}
        </h2>
      </div>
      <span style={{ fontFamily:'var(--font-heading)', fontSize:'52px', lineHeight:1, color:'var(--mode-logo-num)', fontStyle:'italic' }}>
        {String(cat.count).padStart(2,'0')}
      </span>
    </motion.div>
  );
}

/* ─── Page ─── */
export function PortfolioPage() {
  const [active, setActive]       = useState('all');
  const [lightbox, setLightbox]   = useState<number | null>(null);

  const filtered = active === 'all' ? items : items.filter(i => i.category === active);
  const activeCat = categories.find(c => c.id === active)!;

  const openLightbox  = useCallback((i: number) => { setLightbox(i); document.body.style.overflow = 'hidden'; }, []);
  const closeLightbox = useCallback(() => { setLightbox(null); document.body.style.overflow = ''; }, []);
  const navLightbox   = useCallback((dir: 1|-1) => {
    setLightbox(prev => prev === null ? null : (prev + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  const handleCategoryChange = (id: string) => {
    setActive(id);
    setLightbox(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor:'#0a0a0a' }}>
      <Hero />
      <CategoryFilter active={active} onChange={handleCategoryChange} />

      {/* grid section */}
      <section className="px-4 md:px-8 pt-4 pb-20" style={{ backgroundColor: 'var(--mode-surface)' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* headline — outside the photo grid so it doesn't consume a 280px grid row */}
          <div className="px-2 mb-3">
            <CategoryHeadline cat={activeCat} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gridAutoRows:'280px', gap:'6px' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="text-center py-32"
            >
              <p style={{ color:'rgba(255,255,255,0.2)', fontFamily:'var(--font-heading)', fontSize:'24px' }}>
                No items in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            items={filtered}
            index={lightbox}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
