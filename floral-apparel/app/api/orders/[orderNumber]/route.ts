/**
 * Purpose: API route handler for fetching a single order by orderNumber
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

export async function GET(request: NextRequest, { params }: { params: { orderNumber: string } }) {
  try {
    await connectDB();

    const order = await Order.findOne({ orderNumber: params.orderNumber }).lean();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
