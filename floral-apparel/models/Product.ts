/**
 * Purpose: Mongoose schema and model for clothing products
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import mongoose, { Schema, Model } from 'mongoose';
import { IProduct } from '@/types/product';
import { slugify } from '@/lib/utils';

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a product slug'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be negative'],
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image'],
      validate: [(val: string[]) => val.length > 0, 'Please provide at least one product image'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: {
        values: ['tops', 'bottoms', 'dresses', 'outerwear', 'accessories'],
        message: '{VALUE} is not a valid category',
      },
    },
    sizes: {
      type: [String],
      required: [true, 'Please provide at least one product size'],
      enum: {
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        message: '{VALUE} is not a valid size',
      },
      validate: [(val: string[]) => val.length > 0, 'Please provide at least one product size'],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate slug from name before validating the document
ProductSchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name);
  }
  next();
});

// Prevent Mongoose from compiling the model multiple times during Next.js hot-reloading
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
