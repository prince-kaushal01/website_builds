import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will get back to you soon.');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-[600px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[var(--gray-text)] hover:text-[var(--dark)] transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <h2 className="mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Get in Touch
              </h2>
              <p className="text-[var(--gray-text)] mb-6">Let's capture your special moments together</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="date"
                    placeholder="Wedding Date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your wedding..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent-gold)] focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--accent-gold)] text-white py-3 rounded-lg hover:bg-[#B39859] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
