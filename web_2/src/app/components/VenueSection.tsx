import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";
import venue_bg from "../assets/venue_bg.png";

export function VenueSection() {
  const venueAddress =
    "A-12,Amaara Farms, Mandir Rd, Main Chhatarpur Rd, Bhatti Kalan, New Delhi, Delhi 110074";
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.26321221717!2d77.19045737528172!3d28.441480875769557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ffe408ba181%3A0x3e7db9286fdc6d7e!2sAmaara%20Farms!5e0!3m2!1sen!2sin!4v1775711120008!5m2!1sen!2sin`;

  return (
    <section
      className="relative py-20 md:py-32 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${venue_bg})` }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <MapPin className="w-12 h-12 text-[#c8a882] mx-auto" />
            </motion.div>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#3e3935] mb-6">
            Where We Celebrate
          </h2>
          <p className="font-['Cormorant'] text-lg md:text-xl text-[#3e3935]/70 max-w-2xl mx-auto leading-relaxed">
            {venueAddress}
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative group"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8a882]/0 via-transparent to-[#a8bfa2]/0 group-hover:from-[#c8a882]/10 group-hover:to-[#a8bfa2]/10 transition-all duration-500 pointer-events-none" />
          </div>

          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c8a882]/20 to-[#a8bfa2]/20 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Get Directions Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-8"
        >
          <motion.a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c8a882] to-[#b8986a] text-white rounded-full font-['Cormorant'] text-lg shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(200, 168, 130, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
