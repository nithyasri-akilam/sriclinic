import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'About', path: '/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand">
          <img src="/logo.jpg" alt="Sri Clinic Logo" className="h-10 w-10 object-contain rounded-full" />
          <span>Sri Clinic</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`h-full flex items-center text-sm font-medium transition-all relative ${isActive(link.path) ? 'text-accent' : 'text-slate-500 hover:text-accent'}`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                  initial={false}
                />
              )}
            </Link>
          ))}
          <Link to="/book" className="btn-simple btn-accent text-sm ml-4">
            Book Appointment
          </Link>
        </div>

        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold text-left transition-colors ${isActive(link.path) ? 'text-accent' : 'text-slate-600 hover:text-accent'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/book" onClick={() => setIsOpen(false)} className="btn-simple btn-accent text-sm justify-center">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
