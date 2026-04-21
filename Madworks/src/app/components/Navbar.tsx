import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from "../assets/logo.PNG"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
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

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
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
              <img src={logo} className='h-52'/>
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? 'text-[var(--accent-gold)]'
                    : 'text-[var(--dark)] dark:text-white hover:text-[var(--accent-gold)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Controls (Theme + Mobile Menu) */}
          <div className="flex-1 flex justify-end items-center gap-4">

            {/* Theme Toggle (Desktop only) */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full cursor-pointer 
              backdrop-blur-md bg-white/40 dark:bg-white/10 
              border border-white/20 dark:border-white/10 
              hover:scale-105 transition"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

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