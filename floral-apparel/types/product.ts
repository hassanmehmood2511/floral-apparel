/**
 * Purpose: TypeScript interfaces for the Product data structures
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
