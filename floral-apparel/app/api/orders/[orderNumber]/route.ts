/**
 * Purpose: API route handler for fetching and updating a single order.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

type OrderRouteContext = {
  params: {
    orderNumber: string;
  };
};

/**
 * Validates x-admin-key header for protected order operations.
 * @param request Incoming request.
 * @returns True when admin key is valid.
 */
function hasValidAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get('x-admin-key');
  return Boolean(adminKey && adminKey === process.env.ADMIN_KEY);
}

/**
 * Fetches a single order by order number.
 * @param _request Incoming request.
 * @param context Route context.
 * @returns Order record when found.
 */
export async function GET(_request: NextRequest, context: OrderRouteContext) {
  try {
    await connectDB();

    const order = await Order.findOne({ orderNumber: context.params.orderNumber }).lean();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

/**
 * Updates order status by order number.
 * @param request Incoming request.
 * @param context Route context.
 * @returns Updated order response.
 */
export async function PATCH(request: NextRequest, context: OrderRouteContext) {
  try {
    if (!hasValidAdminKey(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = (await request.json()) as { status?: string };
    const orderStatus = payload.status;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!orderStatus || !validStatuses.includes(orderStatus)) {
      return NextResponse.json({ error: 'Valid status is required' }, { status: 400 });
    }

    await connectDB();
    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber: context.params.orderNumber },
      { status: orderStatus },
      { new: true, runValidators: true },
    ).lean();

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
