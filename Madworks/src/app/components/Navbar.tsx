import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from "../assets/logo.PNG"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Force dark mode always
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled 
          ? 'backdrop-blur-xs bg-white/70 dark:bg-black/60 border-b border-white/20 dark:border-white/10 shadow-sm' 
          : 'bg-transparent'
        }`}
      >
        <div className="px-10 h-[72px] max-w-[1400px] mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="flex-1">
            <Link
              to="/"
            >
              <img src={logo} className='md:h-52 w-44 -ml-7 md:ml-0'/>
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap text-sm transition-colors ${
                  location.pathname === link.path
                    ? 'text-[var(--accent-gold)]'
                    : 'text-[var(--dark)] dark:text-white hover:text-[var(--accent-gold)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex-1 flex justify-end items-center gap-4">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[var(--dark)] dark:text-white z-50"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full md:hidden 
            backdrop-blur-lg bg-white/90 dark:bg-black/90 
            flex flex-col items-center justify-center gap-6 px-10 z-40"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl ${
                    location.pathname === link.path
                      ? 'text-[var(--accent-gold)]'
                      : 'text-[var(--dark)] dark:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}