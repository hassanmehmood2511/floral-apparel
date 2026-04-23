/**
 * Purpose: Mongoose schema and model for customer orders
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import mongoose, { Schema, Model } from 'mongoose';
import { IOrder } from '@/types/order';

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    size: {
      type: String,
      required: [true, 'Product size is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    priceAtPurchase: {
      type: Number,
      required: [true, 'Purchase price is required'],
    },
  },
  { _id: false },
);

const ShippingAddressSchema = new Schema(
  {
    street: { type: String, required: [true, 'Street address is required'] },
    city: { type: String, required: [true, 'City is required'] },
    province: { type: String, required: [true, 'Province is required'] },
    postalCode: { type: String, required: [true, 'Postal code is required'] },
  },
  { _id: false },
);

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: [true, 'Shipping address is required'],
    },
    items: {
      type: [OrderItemSchema],
      required: [true, 'Order items are required'],
      validate: [(val: any[]) => val.length > 0, 'Order must have at least one item'],
    },
    subtotal: {
      type: Number,
      required: [true, 'Subtotal is required'],
      min: [0, 'Subtotal cannot be negative'],
    },
    shippingFee: {
      type: Number,
      default: 200,
      min: [0, 'Shipping fee cannot be negative'],
    },
    total: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total cannot be negative'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: {
        values: ['cash_on_delivery', 'bank_transfer'],
        message: '{VALUE} is not a valid payment method',
      },
    },
    paymentProof: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
      enum: {
        values: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        message: '{VALUE} is not a valid order status',
      },
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (this.isNew && !this.orderNumber) {
    const currentYear = new Date().getFullYear();
    const prefix = `FA-${currentYear}-`;

    try {
      // Find the last order created in the current year to determine the next sequence number
      const lastOrder = await mongoose
        .model('Order')
        .findOne({ orderNumber: new RegExp(`^${prefix}`) }, {}, { sort: { orderNumber: -1 } });

      let sequenceNumber = 1;
      if (lastOrder && lastOrder.orderNumber) {
        // Extract the numerical part from the last order number (e.g., "FA-2024-00001" -> 1)
        const lastSequenceStr = lastOrder.orderNumber.split('-')[2];
        sequenceNumber = parseInt(lastSequenceStr, 10) + 1;
      }

      // Format sequence to be 5 digits with leading zeros
      const formattedSequence = sequenceNumber.toString().padStart(5, '0');
      this.orderNumber = `${prefix}${formattedSequence}`;
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    next();
  }
});

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
