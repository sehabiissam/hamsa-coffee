/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Coffee, ShoppingBag, PhoneCall } from 'lucide-react';
import { Page } from '../types';
import { IMAGE_HAMSA_LOGO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onOpenOrder: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, onOpenOrder }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Menu', page: 'menu' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-sand/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* LOGO */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-sand-dark/20 overflow-hidden flex items-center justify-center p-1.5 bg-beige group-hover:border-gold-muted smooth-transition">
            <img
              src={IMAGE_HAMSA_LOGO}
              alt="Hamsa logo icon"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif text-xl md:text-2xl font-black text-espresso tracking-[0.2em]">HAMSA</span>
            <span className="hidden sm:block text-[9px] font-mono tracking-widest text-gold uppercase -mt-1 font-medium">COFFEE & BRUNCH</span>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navLinks.map(link => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`relative px-1 py-1 text-espresso tracking-widest uppercase text-xs smooth-transition cursor-pointer hover:text-espresso/90 ${
                  isActive ? 'text-espresso opacity-100 font-bold' : 'opacity-60'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenOrder}
            className="px-6 py-2 border border-espresso text-[10px] uppercase tracking-widest font-bold hover:bg-espresso hover:text-white transition-all duration-300 cursor-pointer"
          >
            Order Online
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenOrder}
            className="p-2 border border-sand hover:bg-beige/40 rounded-full text-espresso cursor-pointer"
            aria-label="Quick order"
          >
            <ShoppingBag className="w-4 h-4 text-gold-muted" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-espresso hover:bg-sand/30 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-sand/30 bg-cream/98 backdrop-blur-md px-6 py-6 space-y-6 overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col gap-4 text-left">
              {navLinks.map((link, idx) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`text-lg font-serif text-left tracking-wider transition-colors py-1 cursor-pointer flex items-center justify-between group ${
                      isActive ? 'text-gold font-bold' : 'text-espresso/85'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`text-xs font-mono ${isActive ? 'text-gold' : 'text-espresso/30'}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Footer details in Dropdown */}
            <div className="pt-5 border-t border-sand/40 space-y-4 text-xs">
              <div className="flex items-center gap-3 text-espresso/70">
                <span className="p-1.5 bg-beige text-gold rounded-none"><PhoneCall className="w-4 h-4" /></span>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-espresso/50">Delivery & Contact</span>
                  <span className="font-semibold text-espresso">0542734809</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-3 bg-espresso hover:bg-charcoal px-6 text-cream rounded-none font-semibold uppercase text-xs font-mono tracking-widest text-center smooth-transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Order Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}