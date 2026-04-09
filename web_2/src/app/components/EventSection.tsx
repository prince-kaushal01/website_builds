import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import umbrella1 from '../assets/umbrella1.png';
import umbrella2 from '../assets/umbrella2.png';
import umbrella3 from '../assets/umbrella3.png';

interface EventSectionProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  backgroundImage: string;
  titleColor: string;
  textColor?: string;
  isDark?: boolean;
  variant?: 'mehndi' | 'sangeet' | 'wedding' | 'reception' | 'cocktail';
}

export function EventSection({
  title,
  subtitle,
  subtitleColor,
  day,
  date,
  time,
  venue,
  dressCode,
  backgroundImage,
  titleColor,
  textColor = 'text-gray-800',
  isDark = false,
  variant ,
}: EventSectionProps) {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="min-h-screen relative flex justify-center overflow-hidden  py-14 px-6 md:px-16"
      style={{
        backgroundImage: `linear-gradient(${isDark ? 'rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)'}), url('${backgroundImage}')`,
        backgroundSize: 'cover',
      }}
    >
      {variant === 'mehndi' && (
        <div className="absolute top-0 left-0 w-full flex justify-around items-start z-0 pointer-events-none">
          <motion.img
            src={umbrella1}
            className="w-40 md:w-28"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={umbrella2}
            className="w-30 md:w-28 mt-5"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.img
            src={umbrella3}
            className="w-25 md:w-28 mt-15"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center h-64 "
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl mb-2 mt-14"
          style={{ fontFamily: 'Great Vibes, cursive', color: titleColor }}
        >
          {title}
        </motion.h2>

        <h2 style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, color: subtitleColor }} className={`text-lg md:text-2xl mb-4`}>
          {subtitle }
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={` ${isDark ? 'bg-opacity-95' : ''}`}
        >
          <div>
            <p className='uppercase text-2xl -mb-2' style={{fontFamily: 'Cormorant, serif', fontWeight: 600, color: subtitleColor}}>
              {day}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className={`text-xl md:text-2xl mb-4`} style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, color: subtitleColor }}>
              {date}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className={`text-xl md:text-2xl`} style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, color: subtitleColor }}>
              {time}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className={`text-xl md:text-2xl mb-4`} style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, color: subtitleColor }}>
              {venue}
            </p>
          </div>
          <div className="">
            <div className="flex items-center justify-center gap-3">
              <p className={`text-lg md:text-xl`} style={{ fontFamily: 'Cormorant, serif', fontWeight: 400, color: subtitleColor }}>
                <span className="font-semibold">Dress Code:</span><br/>
                <p className='text-sm w-72'>
                 {dressCode}
                </p>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
