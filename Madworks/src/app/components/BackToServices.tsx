import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function BackToServices() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-50"
          style={{ top: '88px', left: '20px' }}
        >
          <Link
            to="/services"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(10,10,10,0.82)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.13)',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <ArrowLeft size={12} />
            Services
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
