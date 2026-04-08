import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const events = [
  {
    time: '10:00 AM',
    title: 'Mehendi Ceremony',
    venue: 'Garden Pavilion',
    icon: '🌺',
    color: '#f5d8d8',
  },
  {
    time: '6:00 PM',
    title: 'Sangeet Night',
    venue: 'Grand Ballroom',
    icon: '🎵',
    color: '#c8d5b9',
  },
  {
    time: '11:00 AM',
    title: 'Haldi Ceremony',
    venue: 'Courtyard',
    icon: '🌼',
    color: '#f5d8d8',
  },
  {
    time: '5:00 PM',
    title: 'Wedding Ceremony',
    venue: 'Main Hall',
    icon: '💐',
    color: '#c8a882',
  },
  {
    time: '8:00 PM',
    title: 'Reception',
    venue: 'Rooftop Terrace',
    icon: '✨',
    color: '#a8bfa2',
  },
];

export function TimelineSection() {
  return (
    <section className="py-20 md:py-32 px-6 relative overflow-hidden">
      {/* Background with floral pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] via-[#fdfcf9] to-[#f5f0eb]" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm10-8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#3e3935] mb-4">
            Celebration Timeline
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c8a882]" />
            <Calendar className="w-6 h-6 text-[#c8a882]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c8a882]" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c8a882] via-[#a8bfa2] to-[#c8a882] -translate-x-1/2" />
          
          {/* Left line for mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c8a882] via-[#a8bfa2] to-[#c8a882]" />

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`relative mb-16 last:mb-0 ${
                  isLeft 
                    ? 'md:pr-[50%] md:text-right' 
                    : 'md:pl-[50%] md:text-left'
                } pl-20 md:pl-0 text-left`}
              >
                {/* Icon on timeline */}
                <motion.div
                  className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10"
                  style={{ backgroundColor: event.color }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-3xl">{event.icon}</span>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className={`bg-white rounded-2xl p-6 shadow-xl border border-[#c8a882]/20 ${
                    isLeft ? 'md:mr-12' : 'md:ml-12'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(200, 168, 130, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="space-y-3">
                    {/* Time */}
                    <div 
                      className="inline-block px-4 py-2 rounded-full text-white font-['Cormorant'] shadow-sm"
                      style={{ backgroundColor: event.color }}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#3e3935]">
                      {event.title}
                    </h3>

                    {/* Venue */}
                    <div className="flex items-center gap-2 text-[#3e3935]/70 font-['Cormorant'] text-lg">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
