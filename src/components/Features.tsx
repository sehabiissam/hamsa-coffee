/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coffee, GraduationCap, Compass, HelpCircle, Heart, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const cards = [
    {
      icon: Coffee,
      title: 'Direct Trade Beans',
      desc: 'We buy directly from high-altitude farmers in North Africa, East Africa, and Latin America, paying an average of 45% above Fair Trade rates to ensure ethical crops and unmatched micro-lot quality.',
    },
    {
      icon: Zap,
      title: 'Creative Hub',
      desc: 'An inspiring, sunlit environment meticulously arranged for modern nomads and creative minds. Features high-speed fiber-optic connections, abundant charging docks, and quiet acoustic zones.',
    },
    {
      icon: Compass,
      title: 'Sensory Design',
      desc: 'From custom-engineered acoustics that dampen chatter noise, to signature diffuses of orange blossom and jasmine oil, every corner is curated to provide a centering rest space.',
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-espresso text-cream overflow-hidden">
      {/* Tiny light particles background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-charcoal/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Traditional tile geometry lines in the background */}
      <div className="absolute top-0 bottom-0 left-0 right-0 opacity-[0.02] bg-[linear-gradient(rgba(253,251,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(253,251,247,0.1)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left block title */}
          <div className="lg:col-span-4 text-left space-y-4">
            <span className="font-mono text-xs text-gold tracking-widest uppercase font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Est. 2024
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Why We Are <br />
              <span className="text-gold italic font-normal">Different</span>
            </h2>
            <p className="text-cream/70 text-sm md:text-base font-light leading-relaxed">
              Our uncompromising commitment to exceptional craftsmanship goes far beyond basic roasting. We cultivate an upscale space where North African culture and sensory modern luxury intersect beautifully.
            </p>
          </div>

          {/* Right cards grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-charcoal/40 border border-sand/10 p-6 md:p-8 rounded-2xl text-left hover:border-gold/30 hover:bg-charcoal/60 smooth-transition flex flex-col justify-between group h-full relative"
                >
                  {/* Glowing gold dot trend */}
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-gold/10 group-hover:bg-gold opacity-0 group-hover:opacity-100 smooth-transition" />
                  
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-cream/5 rounded-xl border border-sand/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-espresso smooth-transition">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold smooth-transition">
                      {card.title}
                    </h3>
                    <p className="text-cream/60 group-hover:text-cream/90 text-xs md:text-sm leading-relaxed font-light smooth-transition">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
