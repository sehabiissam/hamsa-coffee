/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check, Sparkles, Send, Instagram, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation for required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
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
          'Full Name': formData.name.trim(),
          'Email Address': formData.email.trim(),
          'Phone Number': formData.phone.trim() || 'N/A',
          'Subject': formData.subject,
          'Message': formData.message.trim(),
        }),
      });

      if (response.ok) {
        setIsSubmitSuccess(true);
        
        // Save query safely to local storage (No placeholder larping, real local storage audit trail)
        const existingQueries = JSON.parse(localStorage.getItem('hamsa_inquires') || '[]');
        existingQueries.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('hamsa_inquires', JSON.stringify(existingQueries));

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const contactOptions = [
    {
      icon: MapPin,
      title: 'Our Sanctuary',
      detail1: 'Hamsa Coffee & Brunch',
      detail2: 'Algiers, Algeria',
      actionLabel: 'Get Directions',
      link: 'https://www.google.com/maps/place/Hamsa+Coffee%26brunch/@36.1618298,1.3283749,36m/data=!3m1!1e3!4m14!1m7!3m6!1s0x12840f6ff339c8c9:0x4734359a9adc67ae!2sHamsa+Coffee%26brunch!8m2!3d36.1618602!4d1.3284987!16s%2Fg%2F11z6vg59db!3m5!1s0x12840f6ff339c8c9:0x4734359a9adc67ae!8m2!3d36.1618602!4d1.3284987!16s%2Fg%2F11z6vg59db',
    },
    {
      icon: Phone,
      title: 'Telephone Lines',
      detail1: '0542734809',
      detail2: 'Delivery & Contact',
      actionLabel: 'Call Now',
      link: 'tel:0542734809',
    },
    {
      icon: Mail,
      title: 'Digital Inquiries',
      detail1: 'hello@hamsa-alger.com',
      detail2: 'events@hamsa-alger.com',
      actionLabel: 'Send an Email',
      link: 'mailto:hello@hamsa-alger.com',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-beige/10 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-sand-dark/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-gold tracking-widest uppercase block mb-1">Get in Touch</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-espresso">
            Contact the Oasis
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-light">
            Whether organizing an intimate private event, seeking corporate catering packages, or reserving unique tasting sessions, our dedicated hosts are delighted to assist.
          </p>
          <div className="w-12 h-0.5 bg-gold/50 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Contact Info Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left mb-8">
              <span className="font-mono text-[10px] text-gold tracking-widest uppercase font-semibold">Immediate Assistance</span>
              <h3 className="font-serif text-2xl text-espresso font-black mt-1">Connect Instantly</h3>
            </div>

            <div className="space-y-4">
              {contactOptions.map((opt, idx) => {
                const IconComp = opt.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-sand/40 hover:border-gold-muted/30 rounded-none text-left flex gap-5 items-start hover:shadow-md smooth-transition group"
                  >
                    <span className="p-3 bg-beige text-gold rounded-none flex-shrink-0 group-hover:bg-gold group-hover:text-espresso smooth-transition">
                      <IconComp className="w-5 h-5" />
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="font-serif font-black text-base text-espresso">{opt.title}</h4>
                      <p className="text-xs md:text-sm text-espresso/70 font-light leading-dense">
                        {opt.detail1} <br /> {opt.detail2}
                      </p>
                      <a
                        href={opt.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-gold hover:text-espresso font-semibold pt-1 transition-colors"
                      >
                        {opt.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Contact Form Panel (Matches high aesthetics of references) */}
          <div className="lg:col-span-7 bg-white border border-sand/40 p-8 md:p-10 rounded-none shadow-xl space-y-6 relative">
            <div className="text-left pb-4 border-b border-sand/30 flex justify-between items-center">
              <div>
                <span className="font-mono text-[9px] text-gold tracking-widest uppercase block mb-0.5">Written Inquiries</span>
                <h4 className="font-serif text-xl font-bold text-espresso">Send a Direct Message</h4>
              </div>
              <span className="p-1.5 bg-beige text-gold rounded-none"><Send className="w-4 h-4" /></span>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitSuccess ? (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5 text-left">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salim Belkacem"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream/35 border border-sand focus:border-espresso outline-none p-3.5 rounded-none text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. salim@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream/35 border border-sand focus:border-espresso outline-none p-3.5 rounded-none text-sm"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. +213 550 12 34 56"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream/35 border border-sand focus:border-espresso outline-none p-3.5 rounded-none text-sm"
                    />
                  </div>

                  {/* Subject selector */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">Subject of Query</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-cream/35 border border-sand focus:border-espresso outline-none p-3.5 rounded-none text-sm"
                    >
                      <option value="General Inquiry">General Cafe Questions</option>
                      <option value="Private Booking">Private Event Inquiries</option>
                      <option value="Press / Marketing">Collaboration Proposals</option>
                      <option value="Careers">Employment Opportunities</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">Your Detailed Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your note to our hosts here..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-cream/35 border border-sand focus:border-espresso outline-none p-4 rounded-none text-sm resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200/50 text-red-700 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-espresso hover:bg-charcoal px-6 text-cream rounded-none font-mono text-xs tracking-widest uppercase font-black transition-all group cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <span>Submit Secure Message</span> 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-10"
                >
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-none flex items-center justify-center mx-auto border border-green-200">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-gold tracking-widest uppercase block mb-1">Message Dispatched</span>
                    <h4 className="font-serif text-2xl text-espresso font-black">Inquiry Logged</h4>
                    <p className="text-xs text-espresso/70 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting us. We have received your message and will get back to you soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitSuccess(false)}
                    className="px-6 py-2 bg-beige hover:bg-sand text-espresso rounded-none text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Google Maps Embed + Social Buttons Section */}
          <div className="lg:col-span-12 space-y-8">
            {/* Google Maps Embed */}
            <div className="w-full h-[300px] md:h-[400px] border border-sand/40 overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3205.606822579343!2d1.3284987!3d36.1618602!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12840f6ff339c8c9%3A0x4734359a9adc67ae!2sHamsa+Coffee%26brunch!5e0!3m2!1sen!2sdz!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-w
