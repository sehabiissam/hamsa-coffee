/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'about' | 'menu' | 'gallery' | 'contact';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: 'coffee' | 'brunch' | 'dessert';
  tags?: string[];
  image: string;
  isFeatured?: boolean;
  label?: string; // e.g., 'Signature', 'House Special', 'Premium'
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Order {
  name: string;
  phone: string;
  email: string;
  items: { name: string; category: string }[];
  quantity: number;
  address: string;
  notes: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  selectedItems: string[];
  quantity: number;
  address: string;
  notes: string;
}

export const ORDER_MENU_ITEMS = [
  // Coffee
  { name: 'Espresso', category: 'Coffee' },
  { name: 'Americano', category: 'Coffee' },
  { name: 'Cappuccino', category: 'Coffee' },
  { name: 'Latte', category: 'Coffee' },
  { name: 'Mocha', category: 'Coffee' },
  { name: 'Flat White', category: 'Coffee' },
  // Cold Drinks
  { name: 'Iced Latte', category: 'Cold Drinks' },
  { name: 'Iced Americano', category: 'Cold Drinks' },
  { name: 'Frappuccino', category: 'Cold Drinks' },
  // Brunch
  { name: 'Avocado Toast', category: 'Brunch' },
  { name: 'Omelette', category: 'Brunch' },
  { name: 'Pancakes', category: 'Brunch' },
  { name: 'French Toast', category: 'Brunch' },
  { name: 'Breakfast Sandwich', category: 'Brunch' },
  // Desserts
  { name: 'Cheesecake', category: 'Desserts' },
  { name: 'Brownie', category: 'Desserts' },
  { name: 'Croissant', category: 'Desserts' },
];