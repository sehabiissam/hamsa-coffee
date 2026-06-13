/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { X, Maximize2, ArrowLeft, ArrowRight, Sparkles, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  compact?: boolean;
}

export default function GallerySection({ compact = false }: GallerySectionProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Filter Categories
  const categories = ['All', 'Sip', 'Brunch', 'Atmosphere', 'Dessert'];

  // All or filtered list
  const displayImages = compact 
    ? GALLERY_IMAGES.slice(0, 4) 
    : activeFilter === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter(img => img.category.toLowerCase() === activeFilter.toLowerCase());

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      const nextIdx = (selectedImageIdx + 1) % displayImages.length;
      setSelectedImageIdx(nextIdx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      const prevIdx = (selectedImageIdx - 1 + displayImages.length) % displayImages.length;
      setSelectedImageIdx(prevIdx);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-beige/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Header (Matches Captured Moments visual header from Image 1) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-sand pb-8">
          <div className="text-left space-y-3">
            <span className="font-mono text-xs text-gold tracking-widest uppercase font-semibold block">A Visual Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-espresso">
              Captured Moments
            </h2>
          </div>

          {/* Elegant Filter Pills (Hide on compact homepage, only show on dedicated gallery view) */}
          {!compact && (
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map(cat => {
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-none smooth-transition border cursor-pointer ${
                      active
                        ? 'bg-espresso text-cream border-espresso font-semibold'
                        : 'bg-white text-espresso/70 border-sand hover:border-espresso hover:text-espresso'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Masonry-like Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                onClick={() => setSelectedImageIdx(idx)}
                className={`group relative overflow-hidden rounded-none border border-sand/40 cursor-pointer shadow-sm hover:shadow-lg smooth-transition ${
                  image.aspect === 'landscape' ? 'sm:col-span-2 aspect-video' : 'aspect-square sm:aspect-[3/4]'
                }`}
              >
                {/* The Photo */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Elegant overlay styled frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 text-left" />

                {/* Metadata content */}
                <div className="absolute bottom-4 left-4 right-4 text-left z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-gold uppercase font-medium">
                      {image.category}
                    </span>
                    <h4 className="font-serif text-white font-bold text-base -mt-1 leading-snug">
                      {image.title}
                    </h4>
                  </div>
                  <span className="p-2 bg-cream text-espresso rounded-none border border-sand">
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* The Instagram Block - Directly inspired by home section */}
        {compact && (
          <div className="pt-12 border-t border-sand/40 flex flex-col sm:flex-row items-center justify-between gap-6 bg-beige/20 p-8 rounded-none border border-sand/40 mt-12">
            <div className="text-left space-y-1.5 matches">
              <span className="font-mono text-[10px] text-gold tracking-widest uppercase font-semibold flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-gold-muted" /> Social Gathering Point
              </span>
              <h3 className="font-serif text-lg font-bold text-espresso">
                Follow our Journey on Instagram
              </h3>
              <p className="text-xs text-espresso/70 font-light max-w-md">
                Get real-time insights into our kitchen roasting, new seasonal bakes, behind-the-scenes stories, and community events. Tag us with <span className="font-semibold text-gold font-mono">@HamsaOasis</span>.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-espresso hover:bg-gold text-cream hover:text-espresso font-mono text-xs tracking-widest uppercase rounded-none smooth-transition border border-espresso cursor-pointer flex items-center gap-2 font-bold"
            >
              Follow Our Account
            </a>
          </div>
        )}

      </div>

      {/* LIGHTBOX DIALOG OVERLAY */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm"
              onClick={() => setSelectedImageIdx(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-4xl bg-cream border border-sand rounded-none overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              {/* Image content layer */}
              <div className="relative flex-1 bg-charcoal flex items-center justify-center min-h-[350px] overflow-hidden">
                <img
                  src={displayImages[selectedImageIdx].url}
                  alt={displayImages[selectedImageIdx].title}
                  className="max-w-full max-h-[60vh] object-contain select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-2 bg-cream/90 hover:bg-cream text-espresso rounded-none border border-sand transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-2 bg-cream/90 hover:bg-cream text-espresso rounded-none border border-sand transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Lightbox details footer */}
              <div className="p-5 md:p-6 bg-cream border-t border-sand flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                <div>
                  <span className="font-mono text-xs text-gold uppercase tracking-widest block font-bold mb-1">
                    {displayImages[selectedImageIdx].category}
                  </span>
                  <h3 className="font-serif text-lg font-black text-espresso">
                    {displayImages[selectedImageIdx].title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-espresso/60">
                    {selectedImageIdx + 1} of {displayImages.length}
                  </span>
                  <button
                    onClick={() => setSelectedImageIdx(null)}
                    className="px-4 py-2 bg-espresso hover:bg-charcoal text-cream font-mono text-[10px] tracking-widest uppercase font-bold rounded-none cursor-pointer"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
