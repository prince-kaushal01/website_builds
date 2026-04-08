import { motion } from 'motion/react';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#a8bfa2] via-[#c8d5b9] to-[#a8bfa2]">
      {/* Decorative floral corners */}
      <div className="absolute top-8 left-8 text-6xl opacity-20">🌸</div>
      <div className="absolute top-8 right-8 text-6xl opacity-20">🌸</div>
      <div className="absolute bottom-8 left-8 text-6xl opacity-20">🌿</div>
      <div className="absolute bottom-8 right-8 text-6xl opacity-20">🌿</div>
      
      {/* Envelope Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Envelope */}
        <div className="relative w-80 h-60 md:w-96 md:h-72">
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f5f0eb] rounded-lg shadow-2xl border-4 border-[#c8a882]" />
          
          {/* Decorative Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-8xl">🌺</div>
          </div>
          
          {/* Seal Button */}
          <motion.button
            onClick={onOpen}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#c8a882] to-[#b8986a] shadow-lg flex items-center justify-center cursor-pointer border-4 border-white"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ rotate: 0 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(200, 168, 130, 0.4)',
                '0 0 40px rgba(200, 168, 130, 0.6)',
                '0 0 20px rgba(200, 168, 130, 0.4)',
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          >
            <div className="text-center">
              <div className="text-white text-4xl mb-1">💐</div>
              <div className="text-white text-xs font-['Cormorant']">Open</div>
            </div>
          </motion.button>
          
          {/* Gold accents */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#c8a882] to-transparent opacity-30" />
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#c8a882] to-transparent opacity-30" />
        </div>
        
        {/* Text Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="font-['Great_Vibes'] text-4xl text-white drop-shadow-lg">
            You're Invited
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
