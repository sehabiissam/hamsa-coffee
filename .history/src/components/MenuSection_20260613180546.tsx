/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MENU_ITEMS, IMAGE_POUROVER_COFFEE } from '../data';
import { Sparkles, ShoppingBag, Coffee, Utensils, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  featuredOnly?: boolean;
  onOpenOrder: () => void;
  onNavigateToMenu?: () => void;
}

export default function MenuSection({
  featuredOnly = false,
  onOpenOrder,
  onNavigateToMenu,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'coffee' | 'brunch' | 'dessert'>('coffee');

  // Home Page featured list
  const featuredItems = MENU_ITEMS.filter(item => item.isFeatured);

  // Filtered menu lists
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      {/* Aesthetic geometric elements */}
      <div className="absolute left-0 top-1/4 w-[1px] h-96 bg-gradient-to-b from-transparent via-sand to-transparent" />
      <div className="absolute right-0 bottom-1/4 w-[1px] h-96 bg-gradient-to-t from-transparent via-sand to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ==========================================
            1. HOME PAGE SIGNATURE SELECTIONS VERSION
           ========================================== */}
        {featuredOnly ? (
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <span className="font-mono text-xs text-gold tracking-widest uppercase font-semibold">Signature Selections</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-espresso">
                The Hamsa Brunch Experience
              </h2>
              <div className="w-12 h-0.5 bg-gold/50 mx-auto" />
            </div>

            {/* Featured Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-beige/25 border border-sand/40 rounded-none overflow-hidden hover:shadow-xl smooth-transition group flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-85 pointer-events-none" />
                    
                    {/* Item category label as badge */}
                    {item.label && (
                      <span className="absolute top-4 right-4 bg-espresso/80 text-cream lowercase font-mono text-[10px] tracking-widest px-3 py-1 rounded-none border border-sand/20">
                        {item.label}
                      </span>
                    )}
                  </div>

                  <div className="p-6 md:p-8 text-left space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className="font-serif text-xl font-bold text-espresso group-hover:text-gold-muted smooth-transition">
                          {item.name}
                        </h3>
                        <span className="font-mono text-sm text-gold font-bold flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-espresso/70 text-xs md:text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-sand/20 flex flex-wrap gap-1.5">
                      {item.tags?.map(t => (
                        <span key={t} className="text-[10px] font-mono uppercase bg-sand/35 text-espresso/70 px-2.5 py-0.5 rounded-none">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Now CTA for Homepage */}
            <div className="text-center pt-6">
              <button
                onClick={onNavigateToMenu || onOpenOrder}
                className="px-8 py-3.5 bg-transparent hover:bg-espresso text-espresso hover:text-cream border border-espresso font-mono text-xs tracking-widest uppercase rounded-none smooth-transition inline-flex items-center gap-2 group cursor-pointer"
              >
                View Full Menu & Order <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================
             2. FULL DEDICATED MENU PAGE VIEW
             ========================================== */
          <div className="space-y-16">
            
            {/* Page Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="font-mono text-xs text-gold tracking-widest uppercase block mb-1">Modern Maghreb Gastronomy</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-espresso">
                Our Curated Menu
              </h1>
              <p className="text-sm text-espresso/70 leading-relaxed font-light">
                Experience the Serene Luxury of contemporary Saharan and Mediterranean cuisine. Each dish is a delicate symphony of premium Algerian heritage and meticulous culinary precision.
              </p>
              <div className="w-12 h-0.5 bg-gold/50 mx-auto pt-2" />
            </div>

            {/* Categories Navigation Filter Tabs */}
            <div className="flex justify-center border-b border-sand/50 max-w-xl mx-auto pb-px">
              {(['coffee', 'brunch', 'dessert'] as const).map(cat => {
                const isActive = activeCategory === cat;
                const labelText = cat === 'coffee' ? 'Specialty Coffee' : cat === 'brunch' ? 'Brunch Mains' : 'Artisan Desserts';
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative px-6 py-4 text-xs font-mono tracking-widest uppercase font-semibold text-espresso cursor-pointer filter hover:text-gold smooth-transition opacity-80"
                  >
                    <span>{labelText}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeMenuCategory"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-espresso"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Category Split Showcases */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* SPECIALTY COFFEE CATEGORY SHOWCASE */}
                {activeCategory === 'coffee' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Large atmospheric Coffee Image */}
                    <div className="lg:col-span-5 rounded-none overflow-hidden border border-sand shadow-lg aspect-[4/5] relative">
                      <img
                        src={IMAGE_POUROVER_COFFEE}
                        alt="Signature espresso macchiato with spices"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 text-left">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-gold">Roasted in Chlef</span>
                        <h4 className="font-serif text-lg text-white font-semibold">100% Certified Arabica</h4>
                      </div>
                    </div>

                    {/* Classic listed drinks with dots */}
                    <div className="lg:col-span-7 space-y-8 text-left">
                      <div>
                        <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-1">Crafted with Precision</span>
                        <h3 className="font-serif text-2xl text-espresso font-black">Coffee Infusions</h3>
                      </div>

                      <div className="divide-y divide-sand/35 space-y-6">
                        {filteredItems.map(item => (
                          <div key={item.id} className="pt-6 first:pt-0 group">
                            <div className="flex justify-between items-baseline gap-2">
                              <h4 className="font-serif text-lg font-bold text-espresso group-hover:text-gold-muted smooth-transition">
                                {item.name}
                              </h4>
                              <div className="flex-1 border-b border-dashed border-sand/40 mx-2" />
                              <span className="font-mono text-sm text-gold font-bold">{item.price}</span>
                            </div>
                            <p className="text-xs md:text-sm text-espresso/70 mt-1.5 font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* BRUNCH MAINS CATEGORY SHOWCASE */}
                {activeCategory === 'brunch' && (
                  <div className="space-y-12">
                    {/* Grid of beautifully designed brunch items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                      {/* Left: Classic Cards */}
                      <div className="space-y-6">
                        {filteredItems.slice(0, 2).map(item => (
                          <div
                            key={item.id}
                            className="p-6 bg-beige/10 border border-sand/30 hover:border-gold-muted/40 rounded-none flex flex-col md:flex-row gap-6 items-center hover:shadow-md smooth-transition"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 rounded-none object-cover border border-sand"
                              referrerPolicy="no-referrer"
                            />
                            <div className="space-y-2 flex-1">
                              <div className="flex justify-between items-baseline gap-2">
                                <h4 className="font-serif text-base font-bold text-espresso">{item.name}</h4>
                                <span className="font-mono text-xs text-gold font-bold">{item.price}</span>
                              </div>
                              <p className="text-xs text-espresso/70 leading-relaxed font-light">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Right: The Special Tasting Box */}
                      <div className="bg-espresso text-cream p-8 rounded-none border border-sand/15 flex flex-col justify-between hover:shadow-lg relative overflow-hidden h-full">
                        {/* Decorative plate vector watermark */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cream/[0.02] border border-dashed border-gold/10 rounded-full pointer-events-none" />
                        
                        <div className="space-y-4 relative z-10">
                          <span className="font-mono text-[9px] text-gold tracking-widest uppercase font-semibold">New Experience</span>
                          <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold leading-tight">
                            The Grand Oasis Tasting
                          </h3>
                          <p className="text-xs text-cream/70 leading-relaxed font-light">
                            A curated multi-course journey exploring the historic trade routes and modern spice flavors of the Maghreb. Includes a selection of small plates, a lavish gourmet organic main of your choice, and custom craft coffee pairing.
                          </p>
                          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-gold font-bold">
                            <span>4,500 DZD Per Guest</span>
                          </div>
                        </div>

                        <div className="pt-8 relative z-10">
                          <button
                            onClick={onOpenOrder}
                            className="w-full py-3 bg-gold text-espresso hover:bg-cream hover:text-espresso font-mono text-xs tracking-widest uppercase font-black rounded-none smooth-transition hover:shadow-md cursor-pointer"
                          >
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remaining items listed in simple grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-4">
                      {filteredItems.slice(2).map(item => (
                        <div key={item.id} className="p-6 bg-white border border-sand/30 rounded-none">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="font-serif text-lg font-bold text-espresso">{item.name}</h4>
                            <span className="font-mono text-sm text-gold font-bold">{item.price}</span>
                          </div>
                          <p className="text-xs text-espresso/70 mt-2 leading-relaxed font-light">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ARTISAN DESSERTS CATEGORY SHOWCASE */}
                {activeCategory === 'dessert' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Desserts List Left */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div>
                        <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-1">The Sweet Finish</span>
                        <h3 className="font-serif text-2xl text-espresso font-black">Baked Patisseries</h3>
                      </div>

                      <div className="divide-y divide-sand/30 space-y-6">
                        {filteredItems.map(item => (
                          <div key={item.id} className="pt-6 first:pt-0 group">
                            <div className="flex justify-between items-baseline gap-2">
                              <h4 className="font-serif text-base font-bold text-espresso group-hover:text-gold-muted smooth-transition">
                                {item.name}
                              </h4>
                              <span className="font-mono text-sm text-gold font-bold">{item.price}</span>
                            </div>
                            <p className="text-xs text-espresso/70 mt-1 font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Double Image Overlapping Right */}
                    <div className="lg:col-span-5 relative flex justify-center py-6">
                      <div className="w-64 aspect-[4/5] rounded-none overflow-hidden border border-sand">
                        <img
                          src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600"
                          alt="Gourmet saffron dessert pastry"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-4 -left-2 w-40 aspect-square rounded-none overflow-hidden border-4 border-cream shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=400"
                          alt="Delicate macarons"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Ready to Order Block */}
            <div className="bg-beige/40 rounded-none p-8 md:p-12 border border-sand text-center space-y-6 max-w-4xl mx-auto pt-8">
              <span className="font-mono text-xs text-gold tracking-widest uppercase font-semibold">Order Now for Delivery</span>
              <h3 className="font-serif text-3xl text-espresso font-black">
                Ready to Place Your Order?
              </h3>
              <p className="text-sm text-espresso/70 max-w-xl mx-auto font-light leading-relaxed">
                Enjoy the premium taste of Hamsa Coffee & Brunch from the comfort of your home. Browse our menu and place your order for delivery.
              </p>
              
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <button
                  onClick={onOpenOrder}
                  className="px-8 py-3.5 bg-espresso hover:bg-charcoal text-cream text-xs font-mono font-bold tracking-widest uppercase rounded-none smooth-transition hover:shadow-lg cursor-pointer"
                >
                  Place Your Order
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-transparent hover:bg-sand/30 text-espresso border border-sand-dark/40 hover:border-espresso text-xs font-mono font-semibold tracking-widest uppercase rounded-none smooth-transition cursor-pointer"
                >
                  Browse Full Menu
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}