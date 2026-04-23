/**
 * Purpose: Zod validation schemas for API requests
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Valid name is required'),
  description: z.string().min(1, 'Valid description is required'),
  price: z.number().min(0, 'Valid non-negative price is required'),
  images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image URL is required'),
  category: z.enum(['tops', 'bottoms', 'dresses', 'outerwear', 'accessories'], {
    errorMap: () => ({ message: 'Valid category is required' }),
  }),
  sizes: z.array(z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'])).min(1, 'At least one valid size is required'),
  stock: z.number().min(0).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const OrderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  productName: z.string().min(1, 'Product name is required'),
  size: z.string().min(1, 'Size is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  priceAtPurchase: z.number().min(0, 'Price must be non-negative'),
});

export const ShippingAddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

export const OrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Please provide a valid email address'),
  customerPhone: z.string().min(1, 'Customer phone is required'),
  shippingAddress: ShippingAddressSchema,
  items: z.array(OrderItemSchema).min(1, 'Order must have at least one item'),
  paymentMethod: z.enum(['cash_on_delivery', 'bank_transfer'], {
    errorMap: () => ({ message: 'Valid payment method is required' }),
  }),
  paymentProof: z.string().url('Must be a valid URL').optional(),
  notes: z.string().optional(),
});
