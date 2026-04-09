import { motion } from "motion/react";
import { Calendar, Clock, MapPin } from "lucide-react";
import mehendi from "../../assests/mehndi.png";
import sangeet from "../../assests/sangeet.png";
import wedding from "../../assests/marriage.png";
import reception from "../../assests/reception.png";
import cocktail from "../../assests/cocktail.png";
import venue_mobilebg from "../../assests/venue_mobilebg.png";

const events = [
  {
    time: "04-June-2026",
    title: "Mehendi Ceremony",
    venue: "Uttar Garden Lawn",
    image: mehendi,
  },
  {
    time: "04-June-2026",
    title: "Sangeet Night",
    venue: "Uttar Garden Lawn",
    image: sangeet,
  },
  {
    time: "05-June-2026",
    title: "Wedding Ceremony",
    venue: "Amaara Farms",
    image: wedding,
  },
  {
    time: "06-June-2026",
    title: "Reception",
    venue: "Crystal Hall",
    image: reception,
  },
  {
    time: "07-June-2026",
    title: "Cocktail Party",
    venue: "Rooftop Lounge",
    image: cocktail,
  },
];

export function TimelineSection() {
  return (
    <section
      className="py-20 md:py-32 px-6 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${venue_mobilebg})` }}
    >
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
          <h2 className="font-['Great_Vibes'] text-5xl md:text-7xl text-[#93A58D] mb-2">
            Day Program
          </h2>
          <h2 className="font-['Cormorant'] md:text-2xl text-lg text-[#93A58D]">
            What We Have Planned For You
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c8a882]" />
            <Calendar className="w-6 h-6 text-[#c8a882]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c8a882]" />
          </div>
        </motion.div>

        {/* 📱 MOBILE TIMELINE */}
        <div className="md:hidden relative mt-5 px-4 py-10 bg-cover bg-center">
          {/* Animated Line */}
          <motion.div
            initial={{ scaleY: 0, x: -20 }}
            whileInView={{ scaleY: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b08a2e] via-[#7a8f7a] to-[#b08a2e] origin-top"
          />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="relative pl-16"
              >
                {/* IMAGE ICON */}
                <motion.div
                  className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center"
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                  }}
                >
                  <img src={event.image} className="w-10 h-10 object-contain" />
                </motion.div>

                {/* CONTENT */}
                <div className="space-y-2">
                  {/* Date */}
                  <p className="font-['Great_Vibes'] text-xl text-[#b08a2e]">
                    {event.time}
                  </p>
                  {/* Title */}
                  <h3 className="font-['Playfair_Display'] text-lg text-[#3e3935] tracking-wide">
                    {event.title}
                  </h3>

                  {/* Venue */}
                  <p className="font-['Cormorant'] text-sm text-[#3e3935]/70">
                    {event.venue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative hidden md:block">
          {/* Center line for desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c8a882] via-[#a8bfa2] to-[#c8a882] -translate-x-1/2 origin-top"
          />

          {/* Left line for mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c8a882] via-[#a8bfa2] to-[#c8a882]" />

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className={`relative mb-16 last:mb-0 ${
                  isLeft
                    ? "md:pr-[50%] md:text-right"
                    : "md:pl-[50%] md:text-left"
                } pl-20 md:pl-0 text-left`}
              >
                {/* Icon on timeline */}
                <motion.div
                  className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10"
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={event.image}
                    className="w-10 h-10 object-contain cursor-pointer"
                  />
                </motion.div>
                

                {/* Content Card */}
                <motion.div className={`${isLeft ? "md:mr-16" : "md:ml-16"}`}>
                  <div className="space-y-1">
                    {/* Date */}
                    <p className="font-['Great_Vibes'] text-xl md:text-2xl text-[#b08a2e]">
                      {event.time}
                    </p>
                      
                    {/* Title */}
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#93A58D] tracking-wide">
                      {event.title}
                    </h3>

                    {/* Venue */}
                    <p className="font-['Cormorant'] text-sm md:text-base text-[#93A58D]/90">
                      {event.venue}
                    </p>
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
