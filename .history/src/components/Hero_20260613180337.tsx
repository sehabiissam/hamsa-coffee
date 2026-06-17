/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import { IMAGE_CAFE_INTERIOR, IMAGE_HAMSA_LOGO } from '../data';
import { ArrowRight, Sparkles, MapPin, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  setCurrentPage: (page: Page) => void;
  onOpenOrder: () => void;
}

export default function Hero({ setCurrentPage, onOpenOrder }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-20">
      {/* Background Decorative Arches & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-beige/60 via-cream to-cream pointer-events-none" />
      
      {/* Decorative Traditional Border Detail */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sand-dark/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        
        {/* Left Grid: Elegant Copywriting */}
        <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 order-2 lg:order-1 relative">
          {/* Vertical Accent Text */}
          <div className="absolute -left-12 bottom-24 origin-bottom-left -rotate-90 text-[9px] uppercase tracking-[0.5em] text-espresso/30 hidden xl:block pointer-events-none font-bold">
            Premium Algerian Experience
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block text-[11px] uppercase tracking-[0.3em] text-gold font-bold italic"
          >
            EST. 2024 — ALGERIA
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-[76px] text-espresso font-black tracking-tighter leading-[0.88]"
            >
              Coffee, Brunch &<br />
              <span className="text-espresso/30">Delivery</span> to Your Door
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-espresso/70 text-sm max-w-md leading-relaxed font-light"
            >
              Experience the premium fusion of traditional Algerian warmth and modern brunch excellence. Order online and enjoy our craft coffee and artisan dishes from the comfort of your home.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => {
                setCurrentPage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-espresso hover:bg-espresso/90 text-cream text-xs uppercase tracking-widest font-bold rounded-none smooth-transition flex items-center gap-2 group cursor-pointer border border-espresso"
            >
              View Menu & Order
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onOpenOrder}
              className="px-10 py-4 border border-espresso/20 hover:border-espresso text-espresso text-xs uppercase tracking-widest font-bold rounded-none smooth-transition flex items-center gap-2 cursor-pointer bg-transparent"
            >
              Order Now
            </button>
          </motion.div>

          {/* Fast details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 max-w-sm pt-6 border-t border-sand/40"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-muted flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold block text-espresso">Hamsa Coffee & Brunch</span>
                <span className="text-espresso/60">Chlef, Algeria</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-gold-muted flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold block text-espresso">Delivery Available</span>
                <span className="text-espresso/60">Order Online Today</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Grid: Double Image Layout */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center">
          
          {/* Main big elegant circle visual medallion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full border border-sand/10 flex items-center justify-center bg-gradient-to-tr from-beige to-cream shadow-xl overflow-hidden"
          >
            {/* The circular brand watermark background */}
            <div className="absolute inset-10 rounded-full border border-dashed border-sand-dark/10 animate-spin-slow pointer-events-none" />
            
            {/* Embedded Luxury Cafe Image inside the circle */}
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15 }}
              className="absolute inset-4 rounded-full overflow-hidden border border-sand"
            >
              <img
                src={IMAGE_CAFE_INTERIOR}
                alt="Hamsa Coffee and Brunch luxury interior design in Chlef"
                className="w-full h-full object-cover select-none brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Soft overlay gradient to blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* floating seal label */}
            <div className="absolute bottom-12 bg-cream text-espresso text-[11px] font-mono tracking-widest font-semibold px-4 py-1.5 rounded-full border border-sand shadow-sm z-10 text-center">
              CHLEF, ALGERIA
            </div>
          </motion.div>

          {/* Hovering circular logo icon */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-0 right-4 sm:right-10 w-24 h-24 rounded-full overflow-hidden border border-gold-light p-3 bg-cream shadow-2xl flex items-center justify-center animate-pulse"
          >
            <img
              src={IMAGE_HAMSA_LOGO}
              alt="Hamsa calligraphy round seal"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Scrolling-style Marquee (Editorial Ticker) */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-espresso flex items-center overflow-hidden border-t border-espresso">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-20 text-[10px] uppercase tracking-[0.4em] font-bold text-cream/40">
          <span>Coffee Selection</span>
          <span className="text-gold">•</span>
          <span>Authentic Brunch</span>
          <span className="text-gold">•</span>
          <span>Delivery Available</span>
          <span className="text-gold">•</span>
          <span>Algerian Hospitality</span>
          <span className="text-gold">•</span>
          <span>Specialty Roasts</span>
          <span className="text-gold">•</span>
          <span>Artisanal Pastries</span>
          <span className="text-gold">•</span>
          <span>Order Online</span>
          <span className="text-gold">•</span>
          {/* Duplicate for infinite loop */}
          <span>Coffee Selection</span>
          <span className="text-gold">•</span>
          <span>Authentic Brunch</span>
          <span className="text-gold">•</span>
          <span>Delivery Available</span>
          <span className="text-gold">•</span>
          <span>Algerian Hospitality</span>
          <span className="text-gold">•</span>
          <span>Specialty Roasts</span>
          <span className="text-gold">•</span>
          <span>Artisanal Pastries</span>
          <span className="text-gold">•</span>
          <span>Order Online</span>
          <span className="text-gold">•</span>
        </div>
      </div>
    </section>
  );
}