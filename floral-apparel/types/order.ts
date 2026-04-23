/**
 * Purpose: TypeScript interfaces for the Order data structures
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { Document, Types } from 'mongoose';

export interface IOrderItem {
  productId: Types.ObjectId | string;
  productName: string;
  size: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface IShippingAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: IShippingAddress;
  items: IOrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer';
  paymentProof?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
