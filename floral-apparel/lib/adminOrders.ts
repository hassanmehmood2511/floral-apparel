/**
 * Purpose: Server-side helpers for admin order fetching and updates.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { getAdminHeaders, getInternalRequestOrigin } from '@/lib/adminProducts';

/**
 * Supported order status values in admin views.
 */
export type AdminOrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

/**
 * Order item shape used in admin pages.
 */
export type AdminOrderItem = {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  priceAtPurchase: number;
};

/**
 * Shipping address shape used in admin pages.
 */
export type AdminShippingAddress = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

/**
 * Order record shape returned by admin endpoints.
 */
export type AdminOrderRecord = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: AdminShippingAddress;
  items: AdminOrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer';
  paymentProof?: string;
  status: AdminOrderStatus;
  createdAt: string;
};

/**
 * Status options used in filter tabs and dropdown controls.
 */
export const ADMIN_ORDER_STATUSES: readonly AdminOrderStatus[] = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
] as const;

/**
 * Fetches all orders or filtered orders for admin pages.
 * @param status Optional order status filter.
 * @returns List of order records.
 */
export async function fetchAdminOrders(status?: AdminOrderStatus): Promise<AdminOrderRecord[]> {
  const searchPart = status ? `?status=${status}` : '';
  const endpoint = `${getInternalRequestOrigin()}/api/orders${searchPart}`;
  const response = await fetch(endpoint, { headers: getAdminHeaders(), cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch orders.');
  }

  return (await response.json()) as AdminOrderRecord[];
}

/**
 * Fetches a single order by order number.
 * @param orderNumber Order number string.
 * @returns Order details.
 */
export async function fetchAdminOrderByNumber(orderNumber: string): Promise<AdminOrderRecord> {
  const endpoint = `${getInternalRequestOrigin()}/api/orders/${orderNumber}`;
  const response = await fetch(endpoint, { headers: getAdminHeaders(), cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch order details.');
  }

  return (await response.json()) as AdminOrderRecord;
}

/**
 * Updates order status by order number.
 * @param orderNumber Target order number.
 * @param status Next order status.
 */
export async function updateAdminOrderStatus(
  orderNumber: string,
  status: AdminOrderStatus,
): Promise<void> {
  const endpoint = `${getInternalRequestOrigin()}/api/orders/${orderNumber}`;
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: { ...getAdminHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update order status.');
  }
}
