/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Coffee, Image, MapPin, Calendar } from 'lucide-react';
import { Page } from '../types';

interface MobileDockProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onOpenReservation: () => void;
}

export default function MobileDock({ currentPage, setCurrentPage, onOpenReservation }: MobileDockProps) {
  const dockItems: { label: string; page: Page; icon: any }[] = [
    { label: 'HOME', page: 'home', icon: Home },
    { label: 'MENU', page: 'menu', icon: Coffee },
    { label: 'GALLERY', page: 'gallery', icon: Image },
    { label: 'VISIT', page: 'contact', icon: MapPin },
  ];

  const handleDockClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 bg-charcoal/95 backdrop-blur-md border border-white/10 rounded-2xl p-3 px-4 shadow-2xl flex justify-between items-center max-w-md mx-auto">
      {/* Home & Menu Left Actions */}
      <div className="flex gap-4 items-center w-5/12 justify-around">
        {dockItems.slice(0, 2).map(item => {
          const IconComp = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => handleDockClick(item.page)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <IconComp className={`w-5 h-5 smooth-transition ${isActive ? 'text-gold' : 'text-cream/55'}`} />
              <span className={`text-[8px] font-mono tracking-widest font-bold ${isActive ? 'text-gold' : 'text-cream/40'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Raised Centerpiece Gilded Reservation Button (Matches exactly from Reference Image 3) */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <button
          onClick={onOpenReservation}
          className="w-14 h-14 bg-cream text-espresso rounded-full border-4 border-charcoal hover:border-gold shadow-lg flex items-center justify-center p-3 cursor-pointer group smooth-transition active:scale-95"
          aria-label="Secure table seating"
        >
          <Calendar className="w-5 h-5 text-gold-muted group-hover:scale-105 smooth-transition" />
        </button>
        <span className="text-[7px] font-mono tracking-widest font-black text-gold uppercase mt-1">
          BOOK
        </span>
      </div>

      {/* Spacer so floating button doesn't block text labels */}
      <div className="w-2/12" />

      {/* Gallery & Visit Right Actions */}
      <div className="flex gap-4 items-center w-5/12 justify-around">
        {dockItems.slice(2).map(item => {
          const IconComp = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => handleDockClick(item.page)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <IconComp className={`w-5 h-5 smooth-transition ${isActive ? 'text-gold' : 'text-cream/55'}`} />
              <span className={`text-[8px] font-mono tracking-widest font-bold ${isActive ? 'text-gold' : 'text-cream/40'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
