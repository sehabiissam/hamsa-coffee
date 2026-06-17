/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, X, Check, ArrowRight, Coffee, Utensils, Cake, Sparkles } from 'lucide-react';
import { ORDER_MENU_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  'Coffee': Coffee,
  'Cold Drinks': Sparkles,
  'Brunch': Utensils,
  'Desserts': Cake,
};

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    selectedItems: [] as string[],
    quantity: 1,
    address: '',
    notes: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Coffee');

  const categories = [...new Set(ORDER_MENU_ITEMS.map(item => item.category))];
  const filteredItems = ORDER_MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleItemToggle = (itemName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(itemName)
        ? prev.selectedItems.filter(name => name !== itemName)
        : [...prev.selectedItems, itemName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      setErrorMessage('Please enter a valid phone number (required for delivery).');
      return;
    }

    if (formData.selectedItems.length === 0) {
      setErrorMessage('Please select at least one menu item.');
      return;
    }

    if (!formData.address.trim()) {
      setErrorMessage('Please enter a delivery address.');
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
          'Phone Number': formData.phone,
          'Email Address': formData.email || 'N/A',
          'Selected Items': formData.selectedItems.join(', '),
          'Quantity': formData.quantity,
          'Delivery Address': formData.address,
          'Additional Notes': formData.notes || 'None',
        }),
      });

      if (response.ok) {
        // Save to local storage
        const existingOrders = JSON.parse(localStorage.getItem('hamsa_orders') || '[]');
        existingOrders.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('hamsa_orders', JSON.stringify(existingOrders));

        // Clear form
        setFormData({
          name: '',
          phone: '',
          email: '',
          selectedItems: [],
          quantity: 1,
          address: '',
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

  // Auto close success message after 5 seconds
  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        // Let the user view the receipt
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="order-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                <span className="font-mono text-xs tracking-widest text-gold uppercase block mb-1">Place Your Order</span>
                <h3 className="font-serif text-2xl text-espresso">Choose Your Menu Items</h3>
              </div>
              <button
                id="close-order-modal"
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

                  {/* Menu Selection */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-3">Choose Your Menu Items</label>
                    
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4 border-b border-sand/30 pb-3">
                      {categories.map(cat => {
                        const isActive = activeCategory === cat;
                        const IconComp = CATEGORY_ICONS[cat] || Coffee;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 flex items-center gap-2 text-xs font-mono tracking-wider uppercase rounded-none smooth-transition cursor-pointer ${
                              isActive
                                ? 'bg-espresso text-cream border border-espresso'
                                : 'bg-white text-espresso border border-sand hover:bg-beige/40'
                            }`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                            {cat}
                          </button>
                        );
                      })}
                    </div>

                    {/* Menu Items Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {filteredItems.map(item => {
                        const isSelected = formData.selectedItems.includes(item.name);
                        return (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => handleItemToggle(item.name)}
                            className={`p-3 text-left rounded-none border text-sm transition-all flex flex-col gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-espresso text-cream border-espresso shadow-lg'
                                : 'bg-white text-espresso border-sand hover:bg-beige/40'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`text-xs font-mono ${isSelected ? 'text-gold' : 'text-espresso/50'}`}>
                                {item.category}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                            </div>
                            <span className="font-serif font-semibold text-sm">{item.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 mb-2">Quantity (per item)</label>
                    <select
                      value={formData.quantity}
                      className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                      onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Item' : 'Items'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <label className="block text-xs font-mono tracking-wider uppercase text-espresso/70 -mb-2 border-b border-sand pb-1">
                      Customer Information
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
                          type="tel"
                          required
                          placeholder="Phone Number (required)"
                          value={formData.phone}
                          className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address (optional)"
                        value={formData.email}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm"
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Delivery Address"
                        required
                        value={formData.address}
                        rows={2}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm resize-none"
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Additional Notes / Special Instructions (optional)"
                        value={formData.notes}
                        rows={2}
                        className="w-full bg-white border border-sand focus:border-espresso outline-none p-3 rounded-none text-sm resize-none"
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Order Confirmation CTA Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-espresso hover:bg-charcoal px-6 text-cream rounded-none font-medium smooth-transition hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Processing Order...</span>
                    ) : (
                      <>
                        Place Your Order <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    <span className="font-mono text-xs tracking-widest text-gold uppercase block mb-1">Order Submitted</span>
                    <h3 className="font-serif text-3xl text-espresso">Your Order is Being Prepared</h3>
                    <p className="text-sm text-espresso/70 mt-2 max-w-md mx-auto">
                      Thank you for your order! We will contact you shortly to confirm delivery details.
                    </p>
                  </div>

                  {/* Receipt Details Box */}
                  <div className="bg-white border border-sand rounded-none p-6 text-left max-w-md mx-auto space-y-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-none -mr-8 -mt-8 pointer-events-none" />
                    
                    <div className="border-b border-sand pb-3 flex justify-between items-center">
                      <span className="font-serif font-black text-espresso tracking-widest text-lg">HAMSA</span>
                      <span className="font-mono text-[10px] text-espresso/60">REF: ORD-{Math.floor(Math.random() * 100000)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Customer</span>
                        <span className="font-semibold text-espresso">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Phone</span>
                        <span className="font-semibold text-espresso">{formData.phone}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Items Ordered</span>
                        <span className="font-semibold text-gold">{formData.selectedItems.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Quantity</span>
                        <span className="font-semibold text-espresso">{formData.quantity}</span>
                      </div>
                      <div>
                        <span className="text-espresso/50 block font-mono uppercase text-[9px] tracking-wider">Delivery</span>
                        <span className="font-semibold text-espresso">{formData.address}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-sand flex items-center justify-between text-xs font-mono">
                      <span className="text-espresso/60">Status</span>
                      <span className="text-green-600 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-none text-[10px] font-semibold uppercase">Confirmed</span>
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
                          phone: '',
                          email: '',
                          selectedItems: [],
                          quantity: 1,
                          address: '',
                          notes: '',
                        });
                      }}
                      className="px-6 py-2.5 bg-beige text-espresso hover:bg-sand rounded-none text-sm font-medium smooth-transition cursor-pointer"
                    >
                      Place Another Order
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