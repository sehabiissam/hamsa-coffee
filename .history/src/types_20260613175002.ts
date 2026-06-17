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
  selectedItems: { id: string; name: string; quantity: number }[];
  quantity: number;
  deliveryAddress: string;
  notes?: string;
}