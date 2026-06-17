/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import MobileDock from './components/MobileDock';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import { Page } from './types';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [orderOpen, setOrderOpen] = useState(false);

  const triggerOrder = () => {
    setOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between selection:bg-gold-light selection:text-espresso antialiased relative">
      
      {/* 1. Header Navigation elements */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenOrder={() => triggerOrder()}
      />

      {/* 2. Main Page Render Module with delicate fade transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero
                setCurrentPage={setCurrentPage}
                onOpenOrder={() => triggerOrder()}
              />
              <About
                compact={true}
                onReadStory={() => setCurrentPage('about')}
              />
              <MenuSection
                featuredOnly={true}
                onOpenOrder={triggerOrder}
                onNavigateToMenu={() => setCurrentPage('menu')}
              />
              <Features />
              <GallerySection compact={true} />
              <Testimonials />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Specialized Page Banner */}
              <div className="relative pt-36 pb-20 bg-beige/60 overflow-hidden border-b border-sand text-center">
                <div className="absolute inset-0 bg-radial-gradient from-cream via-transparent to-transparent pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-4">
                  <span className="font-mono text-xs tracking-widest text-gold uppercase block font-semibold">An Oasis of Modernity</span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-black text-espresso">Our Story</h1>
                  <p className="text-sm text-espresso/70 leading-relaxed font-light">
                    Experience the soulful warmth of Algerian heritage blended with contemporary minimalist precision. Learn how we roast our beans, craft our bakes, and honor trade connections.
                  </p>
                </div>
              </div>
              
              <About />
              <Features />
              
              {/* Additional Story interactive section */}
              <div className="py-20 bg-cream">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                  <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center mx-auto text-gold border border-sand">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-espresso">The Traditional Roasting Process</h3>
                  <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-light max-w-2xl mx-auto">
                    We select raw green coffee cherries from the Saharan border regions and North African cooperatives. They are roasted in small, artisanal drum roasters to cultivate notes of honey, cardamon spices, and deep dark chocolates.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => triggerOrder()}
                      className="px-8 py-3.5 bg-espresso hover:bg-gold text-cream hover:text-espresso font-mono text-xs tracking-widest uppercase rounded-full smooth-transition border border-espresso"
                    >
                      Order Our Coffee
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Spacing adjustments for nested navbar */}
              <div className="pt-24">
                <MenuSection
                  featuredOnly={false}
                  onOpenOrder={triggerOrder}
                />
              </div>
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Spacing adjustments for nested navbar */}
              <div className="pt-24">
                <GallerySection compact={false} />
              </div>
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Spacing adjustments for nested navbar */}
              <div className="pt-24">
                <ContactSection />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer Details */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* 4. Specialized Floating Bottom Mobile App Dock */}
      <MobileDock
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenOrder={() => triggerOrder()}
      />

      {/* 5. Order Modal Overlay popups */}
      <OrderModal
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
      />

    </div>
  );
}