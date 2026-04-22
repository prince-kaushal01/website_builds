import { motion } from "motion/react";
import { useState } from "react";
import Left_gate from "../../asset/left_door.png"
import Right_gate from "../../asset/right_door.png"

interface IntroGateProps {
  onOpen: () => void;
  onComplete: () => void;
}

export function IntroGate({ onOpen, onComplete }: IntroGateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    onOpen();
    setTimeout(onComplete, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Left Gate */}
      <motion.div
        className="absolute -left-28 top-0 h-full w-[80%]"
        animate={{
          x: isOpen ? "-100%" : "0%",
        }}
        transition={{
          duration: 4,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <img
          src={Left_gate}
          alt="Left Gate"
          className="h-full w-full object-cover"
          style={{ objectPosition: "right center" }}
        />
      </motion.div>

      {/* Right Gate */}
      <motion.div
        className="absolute -right-32 top-0 h-full w-[95%]"
        animate={{
          x: isOpen ? "100%" : "0%",
        }}
        transition={{
          duration: 4,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <img
          src={Right_gate}
          alt="Right Gate"
          className="h-full w-full object-cover"
          style={{ objectPosition: "left center" }}
        />
      </motion.div>

    
    </div>
  );
}
