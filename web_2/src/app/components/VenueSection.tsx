import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { MapPin, Navigation } from 'lucide-react';

export function VenueSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-16"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1767552659473-9a541393de94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZmxvcmFsJTIwYmFja2dyb3VuZCUyMHBpbmslMjBjcmVhbSUyMHBhc3RlbHxlbnwxfHx8fDE3NzU1NDY5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'Great Vibes, cursive', color: '#ec4899' }}>
            Venue
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-pink-600" />
            <p className="text-2xl md:text-3xl" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
              The Crown Garden 
            </p>
          </div>
          <p className="text-xl text-gray-700" style={{ fontFamily: 'Cormorant, serif' }}>
            VH7X+5GX, Sector 24, Rohtak, Haryana 124001
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ height: '400px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-pink-600 mx-auto mb-4" />
              <p className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                MAP
              </p>
              <p className="text-lg text-gray-700" style={{ fontFamily: 'Cormorant, serif' }}>
                Interactive map will be embedded here
              </p>
              <p className="text-sm text-gray-600 mt-4" style={{ fontFamily: 'Cormorant, serif' }}>
                (Google Maps integration placeholder)
              </p>
            </div>
          </div>
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.2089012826996!2d76.59528157555093!3d28.862403875539997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85e97c475825%3A0x60949a65b1ad101!2sThe%20Crown%20Garden%20and%20Banquet%20Hall%20in%20Rohtak%20Haryana!5e0!3m2!1sen!2sin!4v1775561888935!5m2!1sen!2sin"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="absolute inset-0"
/>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="mt-8 text-center"
>
  <a
    href="https://maps.google.com/?q=The+Crown+Garden+and+Banquet+Hall,+Rohtak,+Haryana"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
    style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}
  >
    Get Directions
  </a>
</motion.div>
      </motion.div>
    </section>
  );
}
