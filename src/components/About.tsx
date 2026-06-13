/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight } from 'lucide-react';
import { IMAGE_POUROVER_COFFEE, IMAGE_CAFE_INTERIOR } from '../data';
import { motion } from 'motion/react';

interface AboutProps {
  onReadStory?: () => void;
  compact?: boolean;
}

export default function About({ onReadStory, compact = false }: AboutProps) {
  return (
    <section className="relative py-20 lg:py-28 bg-beige/30 overflow-hidden">
      {/* Background brand graphic (big faded Hamsa hand outline) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03] select-none pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-espresso">
          {/* Classic abstract Hamsa gesture */}
          <path d="M50 5C38 5 30 18 30 35c0 7 2 13 4 18l-8 12c-2 3-1 7 2 9s7 1 9-2l6-9h14v15c0 3 2 5 5 5s5-2 5-5V63h14l6 9c2 3 6 4 9 2s4-6 2-9l-8-12c2-5 4-11 4-18C70 18 62 5 50 5zm0 10c6 0 10 4 10 10v10c0 6-4 10-10 10s-10-4-10-10V25c0-6 4-10 10-10z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Overlapping Luxury Images (Matches the premium frame overlapping style exactly) */}
        <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
          
          {/* Main big framed image - craft coffee drip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-72 sm:w-80 md:w-96 aspect-[3/4] rounded-none overflow-hidden border border-espresso/15 shadow-lg relative z-10"
          >
            <img
              src={IMAGE_POUROVER_COFFEE}
              alt="Artisan pour over slow brewing on Algerian tableware"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-espresso/5 mix-blend-multiply pointer-events-none" />
          </motion.div>

          {/* Overlapping small detail photo - coffee from above */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -bottom-6 -right-2 sm:right-10 md:right-12 w-44 sm:w-48 aspect-square rounded-none overflow-hidden border-4 border-cream shadow-xl z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400"
              alt="Rich espresso crema overhead view on clean terrace tile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Copywriting */}
        <div className="space-y-6 md:space-y-8 order-1 lg:order-2 text-left">
          <div className="space-y-2">
            <span className="font-mono text-xs text-gold tracking-widest uppercase font-medium block">Our Heritage & Soul</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso font-black leading-tight">
              The Hamsa Symbolism
            </h2>
          </div>

          <div className="space-y-5 text-espresso/80 font-light text-sm md:text-base leading-relaxed">
            <p>
              In the heart of Algerian culture, the <span className="font-semibold text-espresso">Hamsa</span> is more than a visual icon—it is a sacred gesture of protection, hospitality, energetic warmth, and soulful community. At Hamsa Coffee & Brunch, we carry this timeless legacy into the modern era with quiet contemporary design and meticulous craft.
            </p>
            <p>
              Our sanctuary was founded in Algiers upon the singular belief that a simple cup of coffee goes beyond raw caffeine—it is an authentic ritual of connection and peace. We ethically source organic, single-origin Arabica beans from small holdings, slow-roasting them to perfection and pairing each cup with culinary plates that celebrate both Mediterranean freshness and warm Saharan spices.
            </p>
            <p>
              Step inside our sun-drenched arches, and discover an environment built for slow living, intentional sensory delight, and the timeless art of genuine gathering.
            </p>
          </div>

          {/* Founders stamp signature */}
          <div className="pt-6 border-t border-sand/40 flex items-center justify-between">
            <div>
              <span className="font-serif italic text-lg text-espresso/90 block">Mahfoud &amp; Ibrahim</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-gold font-medium">Founders, Hamsa Oasis</span>
            </div>
            
            {onReadStory && (
              <button
                onClick={onReadStory}
                className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-espresso hover:text-gold transition-colors font-semibold cursor-pointer"
              >
                Our Complete Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
