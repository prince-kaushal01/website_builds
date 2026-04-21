import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactModal } from '../components/ContactModal';

export function ContactPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  return <ContactModal isOpen={isOpen} onClose={handleClose} />;
}
