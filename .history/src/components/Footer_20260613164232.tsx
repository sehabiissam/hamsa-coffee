/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import { ArrowUp, Instagram, Music2, Mail, Sparkles } from 'lucide-react';
import { IMAGE_HAMSA_LOGO } from '../data';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso text-cream border-t border-sand-dark/15 pt-16 pb-24 md:pb-16 relative overflow-hidden text-left">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-white/[0.02] pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-white/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & Philosophy */}
          <div className="space-y-4 md:col-span-2 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden flex items-center justify-center p-1.5 bg-white/5">
                <img
                  src={IMAGE_HAMSA_LOGO}
                  alt="Hamsa logo icon"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif text-3xl font-black text-white tracking-[0.25em]">HAMSA</span>
            </div>
            <p className="text-cream/60 text-xs md:text-sm font-light leading-relaxed">
              An Oasis of Modernity, blending authentic Algerian heritage with peaceful contemporary lifestyle in the heart of Algiers. Discover our specialty coffee slow roasts, fresh brunch ingredients, and creative gathering community.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/hamsa_coffee_brunch/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-sand/15 hover:border-gold hover:bg-gold hover:text-espresso flex items-center justify-center smooth-transition text-cream/70"
                aria-label="Hamsa Coffee Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@hamsa.coffee.brunch"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-sand/15 hover:border-gold hover:bg-gold hover:text-espresso flex items-center justify-center smooth-transition text-cream/70"
                aria-label="Hamsa Coffee TikTok"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@hamsa-alger.com"
                className="w-10 h-10 rounded-full border border-sand/15 hover:border-gold hover:bg-gold hover:text-espresso flex items-center justify-center smooth-transition text-cream/70"
                aria-label="Email Hamsa cafe team"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick shortcuts links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-gold tracking-widest uppercase font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-xs text-cream/70">
              <button onClick={() => handleNav('home')} className="hover:text-gold text-left smooth-transition cursor-pointer">
                Return Home
              </button>
              <button onClick={() => handleNav('about')} className="hover:text-gold text-left smooth-transition cursor-pointer">
                The Hamsa Story
              </button>
              <button onClick={() => handleNav('menu')} className="hover:text-gold text-left smooth-transition cursor-pointer">
                Crafted Menu
              </button>
              <button onClick={() => handleNav('gallery')} className="hover:text-gold text-left smooth-transition cursor-pointer">
                Captured Moments
              </button>
              <button onClick={() => handleNav('contact')} className="hover:text-gold text-left smooth-transition cursor-pointer">
                Inquiries & Map
              </button>
            </div>
          </div>

          {/* Location info */}
          <div className="space-y-4 text-xs">
            <h4 className="font-mono text-[10px] text-gold tracking-widest uppercase font-semibold">Visit Us</h4>
            <address className="not-italic space-y-3 font-light text-cream/70 leading-relaxed">
              <p>
                <span className="font-semibold block text-white/90">Hamsa Coffee & Brunch:</span>
                Algiers, Algeria
              </p>
              <p>
                <span className="font-semibold block text-white/90">Daily Opening:</span>
                Mon - Fri: 08:00 AM - 10:00 PM <br />
                Sat - Sun: 09:00 AM - 10:00 PM
              </p>
            </address>
          </div>

        </div>

        {/* Bottom index bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-cream/50 font-light">
          <div>
            <span>&copy; 2026 Hamsa Coffee &amp; Brunch. An Oasis of Modernity. All Rights Reserved.</span>
          </div>

          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-gold smooth-transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-gold smooth-transition">Terms of Service</a>
            
            <button
              onClick={handleScrollTop}
              className="p-1.5 border border-white/10 hover:border-gold hover:bg-gold hover:text-espresso rounded-lg smooth-transition cursor-pointer hidden md:flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase font-black"
            >
              Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
