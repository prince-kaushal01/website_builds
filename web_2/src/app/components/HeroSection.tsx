import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import bgimage from '../assets/main_section.jpeg';
export function HeroSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 0%',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center px-6 w-72 mx-auto -py-20 pb-70"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-0"
        >
          <h1 className="text-xl md:text-1xl text-amber-300 mb-0" style={{ fontFamily: 'Great Vibes, cursive' }}>
            श्री गणेशाय नमः
          </h1>
          <p className="text-white text-xs md:text-xl mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
            With the blessings of our grandparents and parents
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-5"
        >
          <p className="text-white text-xs md:text-2xl mb-2" style={{ fontFamily: 'Lora, serif' }}>
            Together with their families, request the honor of your presence at the wedding celebration of
          </p>
          
          <div className="space-y-0">
            <h2 className="text-4xl md:text-7xl text-pink-500" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Raj
            </h2>
            <p className="text-3xl text-white" style={{ fontFamily: 'Cormorant, serif' }}>
              &
            </p>
            <h2 className="text-4xl md:text-7xl text-pink-500" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Priya
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-2"
        >
        </motion.div>
      </motion.div>
    </section>
  );
}