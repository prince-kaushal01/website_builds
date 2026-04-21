import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';

export function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Wedding couple"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-20 text-center text-white max-w-[800px] px-6"
          >
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '56px', lineHeight: '1.2' }}
            >
              Capturing Love Stories
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90" style={{ fontSize: '18px' }}>
              Timeless wedding photography that preserves your most precious moments
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full cursor-pointer transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Book Your Date
            </button>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          className="py-24 px-6 md:px-10"
          style={{ backgroundColor: 'var(--light)' }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="relative aspect-[4/5]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  poster="https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src="https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Wedding rings"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h2
                  className="mb-4"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', lineHeight: '1.3' }}
                >
                  About Eternal Moments
                </h2>
                <p className="text-[var(--gray-text)] mb-3" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                  With over 10 years of experience capturing weddings across the globe, we specialize in
                  creating timeless imagery that tells your unique love story.
                </p>
                <p className="text-[var(--gray-text)]" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                  Our approach blends documentary-style coverage with artistic portraiture, ensuring every
                  moment is beautifully preserved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          className="py-24 px-6 md:px-10"
          style={{ backgroundColor: 'var(--deep-green)' }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-white">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="var(--accent-gold)" className="text-[var(--accent-gold)]" />
                  ))}
                </div>
                <p className="mb-4 italic">"Absolutely stunning work! They captured every emotion perfectly."</p>
                <p className="text-sm text-white/80">- Priya & Raj</p>
              </div>

              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                  alt="Happy couple"
                  className="w-full max-w-[400px] rounded-2xl"
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-white">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="var(--accent-gold)" className="text-[var(--accent-gold)]" />
                  ))}
                </div>
                <p className="mb-4 italic">"Professional, creative, and made us feel so comfortable."</p>
                <p className="text-sm text-white/80">- Sarah & Michael</p>
              </div>
            </div>
          </div>
        </section>

        {/* Home Footer - Contact */}
        <section className="relative">
          <div className="relative h-[50vh]">
            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
              <h2
                className="text-white text-center px-6"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '40px' }}
              >
                Let's Create Magic Together
              </h2>
            </div>
            <img
              src="https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Beach wedding"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white py-16 px-6 md:px-10">
            <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '28px' }}>
                  Visit Our Studio
                </h3>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-[var(--accent-gold)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--gray-text)]">
                    123 Photography Lane
                    <br />
                    Mumbai, Maharashtra 400001
                    <br />
                    India
                  </p>
                </div>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[var(--accent-gold)] text-white px-6 py-3 rounded-full hover:bg-[#B39859] transition-colors mt-4"
                >
                  Get in Touch
                </button>
              </div>

              <div className="h-[250px] rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.1!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Studio location"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
