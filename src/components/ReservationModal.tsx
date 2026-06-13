/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Coffee, Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { Reservation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperience?: 'standard' | 'high_tea' | 'oasis_tasting';
}

export default function ReservationModal({ isOpen, onClose, initialExperience = 'standard' }: ReservationModalProps) {
  const [formData, setFormData] = useState<Reservation>({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    guests: 2,
    experience: initialExperience,
    notes: '',
  });

  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<Reservation | null>(null);

  useEffect(() => {
    if (initialExperience) {
      setFormData(prev => ({ ...prev, experience: initialExperience }));
    }
  }, [initialExperience, isOpen]);

  // Load existing reservations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hamsa_reservations');
    if (saved) {
      try {
        setActiveReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse reservations');
      }
    }
  }, [isOpen, isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all contact details to secure your reservation.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.phone.trim().length < 6) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xvznvbvb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Customer Name': formData.name,
          'Email': formData.email,
          'Phone Number': formData.phone,
          'Number of Guests': formData.guests,
          'Table Preference': getExperienceDetails(formData.experience).title,
          'Reservation Date': formData.date,
          'Reservation Time': formData.time,
          'Additional Notes': formData.notes || 'None',
        }),
      });

      if (response.ok) {
        // Keep copy of submitted data to display in receipt
        const snapshot = { ...formData };
        setSubmittedData(snapshot);

        // Save to local storage list
        const updatedList = [...activeReservations, formData];
        localStorage.setItem('hamsa_reservations', JSON.stringify(updatedList));
        setActiveReservations(updatedList);

        // Clear all form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: new Date().toISOString().split('T')[0],
          time: '11:00',
          guests: 2,
          experience: 'standard',
          notes: '',
        });

        setIsSuccess(true);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getExperienceDetails = (type: string) => {
    switch (type) {
      case 'oasis_tasting':
        return {
          title: 'The Grand Oasis Tasting',
          desc: 'A curated multi-course culinary journey through modern Maghreb. Includes signature savory plates, sweet hotcakes, and a bespoke coffee pairing pairing led by our chief barista.',
          price: '4,500 DZD per guest',
        };
      case 'high_tea':
        return {
          title: 'Algerian Desert High Tea',
          desc: 'Indulge in a premium sweet afternoon tier: deconstructed baklava shards, almond date cakes, rosewater macarons, and bottomless traditional fragrant Qahwa.',
          price: '3,200 DZD per guest',
        };
      default:
        return {
          title: 'Standard Oasis Sanctuary',
          desc: 'Reserve a premium, sun-drenched table with priority service. Access to our full brunch, specialty single-origin coffees, and peaceful quiet environment.',
          price: 'No minimum spend required',
        };
    }
  };

  const currentExperience = getExperienceDetails(formData.experience);

  // Auto close success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        // We let the user view the receipt, and close only when desired, but auto-reset options are nice
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="reservation-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with elegant blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl bg-cream border border-sand rounded-none shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-sand flex justify-between items-center bg-beige">
              <div>
                <span className="font-mono text-xs tracking-widest text-gold uppercase block mb-1">Book an Oasis Experience</span>
                <h3 className="font-serif text-2xl text-espresso">Select Your Sanctuary</h3>
              </div>
              <button
                id="close-reservation-modal"
                onClick={onClose}
                className="p-1 px-2 text-espresso/60 hover:text-espresso transition-colors rounded-none hover:bg-sand/30 border border-espresso/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8 flex-1">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm rounded-none font-medium border border-red-150">
                      {errorMessage}
                    </div>
                  )}

                  {/* Experience Selector */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-3">Tasting & Seating Tier</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(['standard', 'high_tea', 'oasis_tasting'] as const).map(type => {
                        const active = formData.experience === type;
                        const labelText = type === 'standard' ? 'Oasis Seating' : type === 'high_tea' ? 'Desert High Tea' : 'Grand Tasting';
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, experience: type })}
                            className={`p-4 text-left rounded-none border text-sm transition-all flex flex-col justify-between h-28 cursor-pointer ${
                              active
                                ? 'bg-espresso text-cream border-espresso shadow-lg'
                                : 'bg-white text-espresso border-sand hover:bg-beige/40'
                            }`}
                          >
                            <div className="flex justify-between items-start w-full">
                              <span className={`p-1.5 rounded-none ${active ? 'bg-gold text-espresso' : 'bg-beige text-gold'}`}>
                                {type === 'standard' ? <Coffee className="w-4 h-4" /> : type === 'high_tea' ? <Sparkles className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                              </span>
                              {active && <Check className="w-4 h-4 text-gold" />}
                            </div>
                            <span className="font-serif font-semibold">{labelText}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience description card */}
                  <motion.div
                    key={formData.experience}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-beige/50 border border-sand/40 rounded-none space-y-1.5"
                  >
                    <span className="font-mono text-[10px] text-gold tracking-widest uppercase block">Selected Tier Details</span>
                    <h4 className="font-serif font-semibold text-espresso">{currentExperience.title}</h4>
                    <p className="text-xs text-espresso/80 leading-relaxed">{currentExperience.desc}</p>
                    <span className="font-mono text-xs text-gold font-medium block pt-1">{currentExperience.price}</span>
                  </motion.div>

                  {/* Date, Time, guests */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">
                        <Calendar className="w-3 h-3 inline mr-1 text-gold" /> Date of Visit
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">
                        <Clock className="w-3 h-3 inline mr-1 text-gold" /> Preferred Time
                      </label>
                      <select
                        value={formData.time}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                      >
                        {['08:30', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">
                        <Users className="w-3 h-3 inline mr-1 text-gold" /> Party Size
                      </label>
                      <select
                        value={formData.guests}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                        onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 -mb-2 border-b border-sand pb-1">
                      Guest Information
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={formData.name}
                          className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={formData.email}
                          className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Algerian Mobile Number (e.g. 0550 12 34 56)"
                        value={formData.phone}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Add special notes, allergies, or celebration mentions..."
                        value={formData.notes}
                        rows={2}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm resize-none"
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Booking Confirmation CTA Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-espresso hover:bg-charcoal px-6 text-cream rounded-none font-medium smooth-transition hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Processing Reservation...</span>
                    ) : (
                      <>
                        Confirm Luxury Reservation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // SUCCESS STATE / RECEIPT CARD
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-none flex items-center justify-center mx-auto mb-4 border border-green-200">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="font-mono text-xs tracking-widest text-gold uppercase block mb-1">Reservation Confirmed</span>
                    <h3 className="font-serif text-3xl text-espresso">Your Oasis Awaits</h3>
                    <p className="text-sm text-espresso/70 mt-2 max-w-md mx-auto">
                      Your table has been reserved successfully. We will contact you shortly.
                    </p>
                  </div>

                  {/* Receipt Details Box */}
                  <div className="bg-white border border-sand rounded-none p-6 text-left max-w-md mx-auto space-y-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-none -mr-8 -mt-8 pointer-events-none" />
                    
                    <div className="border-b border-sand pb-3 flex justify-between items-center">
                      <span className="font-serif font-black text-espresso tracking-widest text-lg">HAMSA</span>
                      <span className="font-mono text-[10px] text-espresso/60">REF: HMS-{Math.floor(Math.random() * 100000)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Guest</span>
                        <span className="font-semibold text-espresso">{submittedData?.name}</span>
                      </div>
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Sanctuary Tier</span>
                        <span className="font-semibold text-gold">{getExperienceDetails(submittedData?.experience || 'standard').title}</span>
                      </div>
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Date & Time</span>
                        <span className="font-semibold text-espresso">{submittedData?.date} @ {submittedData?.time}</span>
                      </div>
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Seating Size</span>
                        <span className="font-semibold text-espresso">{submittedData?.guests} {submittedData?.guests === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-sand flex items-center justify-between text-xs font-mono">
                      <span className="text-espresso/60">Status</span>
                      <span className="text-green-600 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-none text-[10px] font-semibold uppercase">Secured</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-espresso text-cream hover:bg-charcoal rounded-none text-sm font-medium smooth-transition cursor-pointer"
                    >
                      Return to Website
                    </button>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          date: new Date().toISOString().split('T')[0],
                          time: '11:00',
                          guests: 2,
                          experience: 'standard',
                          notes: '',
                        });
                      }}
                      className="px-6 py-2.5 bg-beige text-espresso hover:bg-sand rounded-none text-sm font-medium smooth-transition cursor-pointer"
                    >
                      Book Another Table
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
