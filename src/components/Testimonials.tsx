/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Quote, ArrowLeft, ArrowRight, MapPin, Clock, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevSlide = () => {
    setActiveIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextSlide = () => {
    setActiveIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-20 lg:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Guest Carousel Reviews (matches image 1 layout) */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-gold tracking-widest uppercase font-semibold block">Guest Voices</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-espresso">
                Serenity Shared
              </h2>
              <div className="w-12 h-0.5 bg-gold/50" />
            </div>

            {/* Testimonial Active Slide with quotes */}
            <div className="relative min-h-[160px] md:min-h-[180px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <Quote className="w-10 h-10 text-gold/30 -mb-2" />
                  <p className="font-serif text-xl sm:text-2xl italic text-espresso leading-relaxed font-light">
                    &ldquo;{TESTIMONIALS[activeIdx].content}&rdquo;
                  </p>
                  
                  {/* Speaker Details */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-sand-dark/20 text-espresso font-serif flex items-center justify-center font-bold border border-sand">
                      {TESTIMONIALS[activeIdx].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-espresso">
                        {TESTIMONIALS[activeIdx].name}
                      </h4>
                      <p className="font-mono text-[9px] text-gold tracking-widest uppercase font-semibold">
                        {TESTIMONIALS[activeIdx].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={prevSlide}
                className="p-3 border border-sand hover:border-espresso hover:bg-beige text-espresso rounded-full smooth-transition cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 border border-sand hover:border-espresso hover:bg-beige text-espresso rounded-full smooth-transition cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-espresso/60 ml-3">
                0{activeIdx + 1} / 0{TESTIMONIALS.length}
              </span>
            </div>
          </div>

          {/* Right Column: Location Coordinates Block (matches image 1 layout) */}
          <div className="lg:col-span-6 bg-beige/20 border border-sand/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 items-center hover:shadow-lg smooth-transition">
            
            {/* Quick Location items */}
            <div className="space-y-6 text-left flex-1">
              <div>
                <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-1">Our Location</span>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-gold-muted mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold text-espresso">
                    12 Rue Didouche Mourad, <br />
                    Algiers, 16000, Algeria
                  </p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-1">Opening Hours</span>
                <div className="flex gap-3">
                  <Clock className="w-4 h-4 text-gold-muted mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-semibold block text-espresso">Daily Seating</span>
                    <span className="text-espresso/70">08:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-1">Inquiries & Catering</span>
                <div className="flex gap-3">
                  <Mail className="w-4 h-4 text-gold-muted mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-mono text-espresso/80">hello@hamsa-alger.com</span>
                </div>
              </div>
            </div>

            {/* Custom minimalist map visual drawn in high luxury aesthetic */}
            <div className="w-full md:w-56 aspect-square bg-beige rounded-2xl border border-sand/30 overflow-hidden relative flex items-center justify-center">
              {/* Absract minimalist street grid maps background overlay */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                {/* Horizontal & Vertical crossing lines representing streets block */}
                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-espresso" />
                <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-espresso" />
                <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-espresso" />
                <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-espresso" />
                <div className="absolute left-[70%] top-0 bottom-0 w-0.5 bg-espresso" />
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-espresso" />
                {/* Circular park detail */}
                <div className="absolute top-1/3 left-[60%] w-16 h-16 rounded-full border border-espresso" />
              </div>

              {/* Central Map Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-espresso text-gold flex items-center justify-center shadow-lg border border-gold-light p-1.5 animate-pulse">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-mono bg-cream text-[8px] font-bold tracking-widest uppercase text-espresso px-2 py-0.5 border border-sand rounded-md -mt-1.5 shadow-sm">
                  HAMSA
                </span>
              </div>

              {/* Map Footer label */}
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2 bg-cream/90 hover:bg-cream border border-sand text-[9px] font-mono tracking-widest uppercase font-extrabold text-espresso rounded-lg smooth-transition"
                >
                  View Directions
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
