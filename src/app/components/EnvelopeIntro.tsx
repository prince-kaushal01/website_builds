import { motion } from "motion/react";
import card from "../../assests/envelope2.jpeg";
import button from "../../assests/button.png";

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
        <div className="relative h-screen w-full flex items-center justify-center">
          {/* Envelope Back */}
          <img
            src={card}
            className="md:h-full md:py-4 h-full rounded-2xl md:rounded-xl"
          />
          {/* Decorative Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-8xl">🌺</div>
          </div>

          {/* Seal Button */}

          <motion.button
            onClick={onOpen}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-54 md:h-54 w-74 h-74 mt-2 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ rotate: 0 }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          >
            <img
              src={button}
              alt="Open"
              className="w-full h-full object-contain"
            />
          </motion.button>

          {/* Invitation Text */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
  className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center px-4"
>
  <h2 className="font-['Great_Vibes'] text-3xl md:text-5xl text-[#3e3935] drop-shadow-md">
    You’re Invited
  </h2>

  <p className="font-['Cormorant'] text-lg md:mt-1 md:text-lg text-[#3e3935]/80 mt-4 tracking-wide">
    Tap to open your invitation
  </p>
</motion.div>

          {/* Gold accents */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#c8a882] to-transparent opacity-30" />
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#c8a882] to-transparent opacity-30" />
        </div>
      </motion.div>
    </div>
  );
}
