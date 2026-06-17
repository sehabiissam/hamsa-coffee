/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, GalleryImage, Testimonial, OrderItem } from './types';
import IMAGE_POUROVER_COFFEE from './assets/images/pourover_coffee_1781254946751.jpg';
import IMAGE_SHAKSHUKA from './assets/images/heritage_shakshuka_1781254962214.jpg';
import IMAGE_HONEY_CAKE from './assets/images/medjourah_honey_cake_1781254977691.jpg';
import IMAGE_CAFE_INTERIOR from './assets/images/hamsa_oasis_interior_1781254995368.jpg';

// Let's reference our custom generated high-quality assets
export const IMAGE_HAMSA_LOGO = 'https://www.image2url.com/r2/default/images/1781256952135-5d06d409-8c73-4a11-b0ec-98f0924d08d3.png';
export { IMAGE_POUROVER_COFFEE, IMAGE_SHAKSHUKA, IMAGE_HONEY_CAKE, IMAGE_CAFE_INTERIOR };

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE CATEGORY
  {
    id: 'c1',
    name: 'Saffron Gold Latte',
    price: '850 DZD',
    description: 'Signature single-origin espresso infused with premium organic saffron threads from the aurès region and local raw honey.',
    category: 'coffee',
    tags: ['Specialty Grade', 'Organic'],
    image: IMAGE_POUROVER_COFFEE, // we can reuse our majestic coffee shot
    isFeatured: true,
    label: 'House Special'
  },
  {
    id: 'c2',
    name: 'Algerian Mazagran',
    price: '850 DZD',
    description: 'The historic Algerian cold beverage. Espresso poured over crushed ice with fresh organic lemon juice and orange blossom honey.',
    category: 'coffee',
    tags: ['Heritage Recipe', 'Cold-Brewed'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    isFeatured: true,
    label: 'Premium'
  },
  {
    id: 'c3',
    name: 'Qahwa Jaza\'iriya (Traditional Dallah)',
    price: '600 DZD',
    description: 'House-roasted dark Arabica beans brewed slow with orange blossom water, cardamom spice, served in a handmade copper dallah.',
    category: 'coffee',
    tags: ['Slow Brewed', 'Fragrant'],
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1718918?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Traditional'
  },
  {
    id: 'c4',
    name: 'Sahara Gold Macchiato',
    price: '700 DZD',
    description: 'Rich double-shot espresso stained with organic turmeric root, crushed cardamom, and steamed saffron-infused camel milk.',
    category: 'coffee',
    tags: ['Spiced', 'Oat/Camel Milk'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Adventurous'
  },
  {
    id: 'c5',
    name: 'Atlas Roast Espresso',
    price: '450 DZD',
    description: 'A proprietary house blend of high-altitude North African coffee beans, delivering tasting notes of deep dark chocolate and orange blossom.',
    category: 'coffee',
    tags: ['Organic', 'Estate Grade'],
    image: 'https://www.image2url.com/r2/default/images/1781347648386-900adbb8-1417-4f98-a681-e4d7b2399c3e.png',
    isFeatured: true,
    label: 'Single Origin'
  },

  // BRUNCH CATEGORY
  {
    id: 'b1',
    name: 'Heritage Shakshuka',
    price: '1,200 DZD',
    description: 'Slow-simmered vine-ripened tomatoes, sweet caramelized bell peppers, poached farmhouse eggs, traditional Saharan spices, and freshly torn coriander.',
    category: 'brunch',
    tags: ['Farm-to-Table', 'Signature'],
    image: IMAGE_SHAKSHUKA,
    isFeatured: true,
    label: 'Most Popular'
  },
  {
    id: 'b2',
    name: 'Hamsa Royale',
    price: '2,400 DZD',
    description: 'Two poached farm eggs, premium dry-cured Merguez sausage curls, house-made herb labneh cream, sumac-roasted cherry tomatoes on grilled artisan sourdough.',
    category: 'brunch',
    tags: ['House Specialty', 'Savory'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    isFeatured: true,
    label: 'Elite Choice'
  },
  {
    id: 'b3',
    name: 'Date & Pistachio Semolina Hotcakes',
    price: '1,650 DZD',
    description: 'Thick, fluffy semolina soufflé pancakes drenched in authentic Algerian date honey, crushed green pistachios, and a light dollop of whipped rosewater crème.',
    category: 'brunch',
    tags: ['Sweet', 'Chef\'s Selection'],
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Signature Sweet'
  },
  {
    id: 'b4',
    name: 'Saffron Shakshuka Modern',
    price: '1,600 DZD',
    description: 'Slow-cooked tomatoes and peppers laced with organic saffron cream, nested soft-cooked eggs, crumbled salty goat cheese, and rustic seeded bread.',
    category: 'brunch',
    tags: ['Award Winning', 'Rich'],
    image: 'https://images.unsplash.com/photo-1590412200858-70ee0c49499b?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Premium Brunch'
  },

  // DESSERT CATEGORY
  {
    id: 'd1',
    name: 'Medjourah Honey Cake',
    price: '950 DZD',
    description: 'Eight intricate layers of buttery honey sponge soaked in light maple-flower nectar, layered with a velvety sour cream icing and toasted caramelized pistachios.',
    category: 'dessert',
    tags: ['Freshly Baked', 'Decadent'],
    image: IMAGE_HONEY_CAKE,
    isFeatured: true,
    label: 'Masterpiece'
  },
  {
    id: 'd2',
    name: 'Saffron Milk Cake',
    price: '1,200 DZD',
    description: 'A light sponge sponge cake completely saturated with milk infused with top-tier saffron threads, crowned with fresh cream and flakes of edible gold leaf.',
    category: 'dessert',
    tags: ['Saffron Infused', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Artisan Selection'
  },
  {
    id: 'd3',
    name: 'Deconstructed Baklava',
    price: '1,450 DZD',
    description: 'Crisp hand-rolled phyllo sheets layered with toasted almonds and orange blossom honey, served with a side of warm pistachio praline paste and Madagascar vanilla bean gelato.',
    category: 'dessert',
    tags: ['Traditional Twist', 'Gelato'],
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Modern Twist'
  },
  {
    id: 'd4',
    name: 'Rosewater & Almond Macarons',
    price: '900 DZD',
    description: 'Three oversized house-made French macarons baked with sweet almond flour, filled with a delicate butter-cream of rosewater and ground blanched almonds.',
    category: 'dessert',
    tags: ['Set of 3', 'Gluten Free'],
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600',
    isFeatured: false,
    label: 'Light & Airy'
  },
  {
    id: 'd5',
    name: 'Almond Date Cake',
    price: '950 DZD',
    description: 'Moist golden semolina cake made with honey-soaked Deglet Nour dates from Biskra, topped with toasted pine nuts and a cold vanilla drizzle.',
    category: 'dessert',
    tags: ['Local Tradition', 'Favorite'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    isFeatured: true,
    label: 'Est. 2024'
  }
];

export const ORDER_MENU_ITEMS: { name: string; category: string }[] = [
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

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    url: IMAGE_CAFE_INTERIOR,
    title: 'The Modern Sanctuary',
    category: 'Atmosphere',
    aspect: 'landscape'
  },
  {
    id: 'g2',
    url: IMAGE_POUROVER_COFFEE,
    title: 'Artisan Saffron Craft Brewing',
    category: 'Sip',
    aspect: 'square'
  },
  {
    id: 'g3',
    url: IMAGE_SHAKSHUKA,
    title: 'Warm Heritage Shakshuka',
    category: 'Brunch',
    aspect: 'square'
  },
  {
    id: 'g4',
    url: IMAGE_HONEY_CAKE,
    title: 'Medjourah Honey Cake Slices',
    category: 'Dessert',
    aspect: 'portrait'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800',
    title: 'Sipping Double Saffron Espresso',
    category: 'Atmosphere',
    aspect: 'portrait'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    title: 'The Sun-Drenched Lounge Stools',
    category: 'Atmosphere',
    aspect: 'landscape'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800',
    title: 'Sharing a Signature Brunch Platter',
    category: 'Brunch',
    aspect: 'square'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800',
    title: 'Artisan Lavender & Cardamom Infusions',
    category: 'Sip',
    aspect: 'portrait'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Lina Benyahia',
    role: 'Interior Architect',
    content: 'The most beautiful space in the city. Hamsa isn\'t just a specialty coffee shop; it\'s a feeling of home and high-end serenity combined. Their attention to Mediterranean acoustics is outstanding.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Samy Amrani',
    role: 'Tech Founder & Writer',
    content: 'A perfect sanctuary for deep focused work. The high-speed connection is reliable, the staff is immensely polite, and the Saffron Gold Latte is an absolute work of liquid art. Highly recommend the Shakshuka too!',
    rating: 5
  },
  {
    id: 't3',
    name: 'Amel Mansouri',
    role: 'Gastronomy Blogger',
    content: 'Hamsa beautifully bridges Algerian culinary heritage with modern plating. The Medjourah Honey Cake layers are pristine, and the Mazagran coffee has the perfect balanced tang. A design masterpiece.',
    rating: 5
  },
  {
    id: 't4',
    name: 'Karim Brahimi',
    role: 'Creative Director',
    content: 'Every corner tells a story. From the handpicked brass lamps to the gorgeous custom ceramic tableware. It perfectly represents modern Algerian lifestyle and pride. Simply exceptional.',
    rating: 5
  }
];