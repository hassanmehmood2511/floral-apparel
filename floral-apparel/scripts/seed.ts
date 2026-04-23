import { loadEnvConfig } from '@next/env';
import { connectDB } from '../lib/db';
import Product from '../models/Product';
import { slugify } from '../lib/utils';

loadEnvConfig(process.cwd());

const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x800/C8D8A8/2C2C2C?text=Floral+Apparel';

const sampleProducts = [
  {
    name: 'Rose Bloom Blouse',
    description: 'A soft floral blouse perfect for everyday elegance.',
    price: 2200,
    category: 'tops',
    sizes: ['S', 'M', 'L'],
    stock: 20,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Garden Stripe Shirt',
    description: 'Lightweight cotton shirt with subtle botanical tones.',
    price: 2600,
    category: 'tops',
    sizes: ['M', 'L', 'XL'],
    stock: 18,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Willow Wide-Leg Pants',
    description: 'Flowy wide-leg bottoms designed for comfort and style.',
    price: 3400,
    category: 'bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 16,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Sage Tailored Trousers',
    description: 'Smart-fit trousers with a clean and polished silhouette.',
    price: 3800,
    category: 'bottoms',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 15,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Peony Midi Dress',
    description: 'A breezy midi dress with soft floral movement.',
    price: 4500,
    category: 'dresses',
    sizes: ['S', 'M', 'L'],
    stock: 14,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Dahlia Wrap Dress',
    description: 'Wrap-style dress crafted for graceful day-to-night wear.',
    price: 5200,
    category: 'dresses',
    sizes: ['M', 'L', 'XL'],
    stock: 12,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Autumn Quilted Jacket',
    description: 'A cozy quilted outer layer for cooler days.',
    price: 6800,
    category: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Cloudline Trench Coat',
    description: 'Classic trench with a lightweight, weather-ready finish.',
    price: 7900,
    category: 'outerwear',
    sizes: ['M', 'L', 'XL'],
    stock: 8,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Petal Silk Scarf',
    description: 'Silky floral scarf to elevate every outfit instantly.',
    price: 1500,
    category: 'accessories',
    sizes: ['XS'],
    stock: 30,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Bloom Tote Bag',
    description: 'Daily carry tote with floral charm and sturdy build.',
    price: 2400,
    category: 'accessories',
    sizes: ['M'],
    stock: 22,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Meadow Knit Top',
    description: 'A breathable knit top with soft pastel texture.',
    price: 3100,
    category: 'tops',
    sizes: ['XS', 'S', 'M'],
    stock: 17,
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Ivy Pleated Skirt',
    description: 'Pleated skirt that balances movement and structure.',
    price: 3600,
    category: 'bottoms',
    sizes: ['S', 'M', 'L'],
    stock: 13,
    isFeatured: false,
    isActive: true,
  },
];

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding.');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const productsToInsert = sampleProducts.map((product) => ({
      ...product,
      slug: slugify(product.name),
      images: [PLACEHOLDER_IMAGE],
    }));

    const inserted = await Product.insertMany(productsToInsert);
    console.log(`Seed successful. Inserted ${inserted.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
