import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react';

const WA = 'https://wa.me/919769721010?text=Hi%20Madworks%2C%20I%27d%20like%20to%20inquire%20about%20your%20video%20production%20services.';
const ease = [0.22, 1, 0.36, 1] as const;

const contactDetails = [
  { icon: Phone,        label: 'Phone',     value: '+91 97697 21010' },
  { icon: MessageCircle,label: 'WhatsApp',  value: 'Chat with us'   },
  { icon: Mail,         label: 'Email',     value: 'manager@madworksvideo.com' },
  { icon: MapPin,       label: 'Based in',  value: 'Mumbai, India — shooting globally' },
];

export function ContactPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSendError(false);
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (data.success) {
        setSubmitted(true);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#0a0a0a' }}>

      {/* ── LEFT: cinematic image panel ── */}
      <div ref={ref} className="relative mb-40 md:w-[46%] md:min-h-screen overflow-hidden" style={{ minHeight: '380px' }}>
        <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
          <img
            src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
            alt="Contact background"
            className=" w-full h-full object-cover"
          />
        </motion.div>

        {/* gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.25) 40%, rgba(5,5,5,0.88) 100%)' }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, transparent 60%, #0a0a0a 100%)' }} />

        {/* content over image */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-14 pb-14 mt-10 md:mt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="uppercase text-xs tracking-[0.3em] mb-4 hidden md:block"
            style={{ color: 'var(--accent-gold)' }}
          >
            Let's Create Together
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="text-white mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4vw, 58px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Your Story
            <br />
            <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Starts Here.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mb-10"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.85, maxWidth: '360px' }}
          >
            Whether it's your wedding, a brand campaign, or world-class editing — we're ready to bring your vision to life.
          </motion.p>

          {/* contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="flex flex-col gap-4"
          >
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(200,169,106,0.15)', border: '1px solid rgba(200,169,106,0.3)' }}>
                  <Icon size={14} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.a
            href={WA}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-medium w-fit transition-all hover:scale-105"
            style={{ background: 'rgba(37,211,102,0.12)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
          >
            <MessageCircle size={15} />
            WhatsApp Us Directly
          </motion.a>
        </div>
      </div>

      {/* ── RIGHT: form panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-24 md:px-14" style={{ backgroundColor: '#0a0a0a' }}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="w-full max-w-[520px]"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(200,169,106,0.15)', border: '1px solid rgba(200,169,106,0.4)' }}>
                <Send size={24} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <h2 className="text-white mb-3" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>
                Message Sent!
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <>
              <p className="uppercase text-xs tracking-[0.3em] mb-3" style={{ color: 'var(--accent-gold)' }}>
                Get in Touch
              </p>
              <h2 className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.1 }}>
                Tell Us About Your Project
              </h2>
              <p className="mb-10" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', lineHeight: 1.7 }}>
                Fill in the form and we'll be in touch within one business day.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* name + phone row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Name</label>
                    <input
                      type="text" name="name" placeholder="Your name"
                      value={formData.name} onChange={handleChange} required
                      className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all focus:ring-1"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', focusRingColor: 'var(--accent-gold)' } as React.CSSProperties}
                      onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Phone</label>
                    <input
                      type="tel" name="phone" placeholder="+91 00000 00000"
                      value={formData.phone} onChange={handleChange}
                      className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>

                {/* email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Email</label>
                  <input
                    type="email" name="email" placeholder="you@example.com"
                    value={formData.email} onChange={handleChange} required
                    className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {/* service + date row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Service</label>
                    <select
                      name="service" value={formData.service} onChange={handleChange} required
                      className="px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: formData.service ? 'white' : 'rgba(255,255,255,0.25)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      <option value="" disabled style={{ background: '#1a1a1a' }}>Select…</option>
                      <option value="wedding" style={{ background: '#1a1a1a' }}>Wedding Film</option>
                      <option value="commercial" style={{ background: '#1a1a1a' }}>Brand / Commercial</option>
                      <option value="realestate" style={{ background: '#1a1a1a' }}>Real Estate</option>
                      <option value="editing" style={{ background: '#1a1a1a' }}>Editing Services</option>
                      <option value="other" style={{ background: '#1a1a1a' }}>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Date</label>
                    <input
                      type="date" name="date"
                      value={formData.date} onChange={handleChange}
                      className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: formData.date ? 'white' : 'rgba(255,255,255,0.25)', colorScheme: 'dark' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>

                {/* message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Message</label>
                  <textarea
                    name="message" placeholder="Tell us about your vision…"
                    value={formData.message} onChange={handleChange} rows={4}
                    className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(200,169,106,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: 'var(--accent-gold)', color: '#0a0a0a', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
                >
                  <Send size={15} />
                  {loading ? 'Sending…' : 'Send Message'}
                </button>

                {sendError && (
                  <p className="text-center text-xs mt-1" style={{ color: '#ff6b6b' }}>
                    Something went wrong. Please try WhatsApp or email us directly.
                  </p>
                )}

                <p className="text-center text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Or reach us directly on{' '}
                  <a href={WA} target="_blank" rel="noreferrer" className="underline" style={{ color: '#25D366' }}>WhatsApp</a>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
