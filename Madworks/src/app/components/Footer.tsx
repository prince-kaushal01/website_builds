import { Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white py-16 px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[var(--accent-gold)]" />
            <a href="mailto:info@eternalmoments.com" className="hover:text-[var(--accent-gold)] transition-colors">
              info@eternalmoments.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-[var(--accent-gold)]" />
            <a href="tel:+919876543210" className="hover:text-[var(--accent-gold)] transition-colors">
              +91 98765 43210
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent-gold)] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent-gold)] transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent-gold)] transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
