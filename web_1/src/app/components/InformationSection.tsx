import { motion } from 'motion/react';
import { Info, Plane, Hotel, Gift, Phone } from 'lucide-react';

const infoCards = [
  {
    icon: Plane,
    title: 'Travel Information',
    description: 'The nearest airport is Chhatrapati Shivaji International Airport (BOM), approximately 25km from the venue. We recommend booking your flights at least 2 days before the ceremony.',
    color: '#f5d8d8',
  },
  {
    icon: Hotel,
    title: 'Accommodation',
    description: 'We have reserved room blocks at the Taj Mahal Palace and nearby luxury hotels. Please use code "PRIVARAJ2026" when booking for special rates.',
    color: '#c8d5b9',
  },
  {
    icon: Gift,
    title: 'Registry & Gifts',
    description: 'Your presence is the greatest gift! However, if you wish to honor us with a gift, we have a registry at select stores and a honeymoon fund available.',
    color: '#e8d4c4',
  },
  {
    icon: Phone,
    title: 'Contact Us',
    description: 'For any questions or assistance, please contact our wedding coordinators: +91 98765 43210 or email us at wedding@privaraj.com',
    color: '#a8bfa2',
  },
];

export function InformationSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-[#f5f0eb] via-[#fdfcf9] to-[#f5d8d8]/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-7xl opacity-5">🌸</div>
      <div className="absolute bottom-20 left-10 text-7xl opacity-5">🌺</div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Info className="w-12 h-12 text-[#c8a882] mx-auto" />
            </motion.div>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#3e3935] mb-4">
            Important Information
          </h2>
          <p className="font-['Cormorant'] text-lg md:text-xl text-[#3e3935]/70 max-w-2xl mx-auto">
            Everything you need to know for our special day
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {infoCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#c8a882]/10 relative overflow-hidden h-full">
                  {/* Background gradient on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${card.color} 0%, transparent 100%)`,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md relative z-10"
                    style={{ backgroundColor: card.color }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-['Playfair_Display'] text-2xl text-[#3e3935] mb-4">
                      {card.title}
                    </h3>
                    <p className="font-['Cormorant'] text-lg text-[#3e3935]/70 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Outer glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"
                  style={{ backgroundColor: card.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* RSVP Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#c8a882] to-[#b8986a] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDEuNS0zLjUgMy41LTMuNXMzLjUgMS41IDMuNSAzLjUtMS41IDMuNS0zLjUgMy41UzM2IDM2IDM2IDM0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            <div className="relative z-10">
              <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white mb-4">
                Can You Make It?
              </h3>
              <p className="font-['Cormorant'] text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Please let us know if you'll be joining us by November 15, 2026
              </p>
              <motion.button
                className="px-10 py-4 bg-white text-[#3e3935] rounded-full font-['Cormorant'] text-lg shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                RSVP Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
