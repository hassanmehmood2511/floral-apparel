/**
 * Purpose: Displays admin orders list with status filter tabs.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import Link from 'next/link';
import { fetchAdminOrders, type AdminOrderStatus } from '@/lib/adminOrders';

type AdminOrdersPageProperties = {
  searchParams?: {
    status?: string;
  };
};

type AdminOrderFilterTab = {
  label: string;
  value: 'all' | AdminOrderStatus;
};

const ORDER_FILTER_TABS: AdminOrderFilterTab[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

/**
 * Formats order status for readable labels.
 * @param orderStatus Order status value.
 * @returns Human readable status.
 */
function formatOrderStatus(orderStatus: AdminOrderStatus): string {
  return orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1);
}

/**
 * Renders orders table with status filter tabs.
 * @param props Page properties with optional status filter query.
 */
export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProperties) {
  const activeStatusFilter = searchParams?.status as AdminOrderStatus | undefined;
  const filteredOrders = await fetchAdminOrders(activeStatusFilter);

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold text-charcoal">Orders</h1>
      <div className="flex flex-wrap gap-2">
        {ORDER_FILTER_TABS.map((filterTab) => {
          const isActiveTab =
            (filterTab.value === 'all' && !activeStatusFilter) || filterTab.value === activeStatusFilter;
          const targetHref = filterTab.value === 'all' ? '/admin/orders' : `/admin/orders?status=${filterTab.value}`;

          return (
            <Link
              key={filterTab.value}
              href={targetHref}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                isActiveTab
                  ? 'bg-pistachio text-charcoal'
                  : 'border border-black/15 bg-white text-charcoal hover:bg-cream/70'
              }`}
            >
              {filterTab.label}
            </Link>
          );
        })}
      </div>
      <div className="overflow-x-auto rounded-lg border border-black/10 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-black/10">
          <thead className="bg-cream/60">
            <tr className="text-left text-sm font-semibold text-charcoal">
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {filteredOrders.map((orderRecord) => (
              <tr key={orderRecord.orderNumber} className="text-sm text-charcoal">
                <td className="px-4 py-3 font-medium">{orderRecord.orderNumber}</td>
                <td className="px-4 py-3">{orderRecord.customerName}</td>
                <td className="px-4 py-3">
                  {new Date(orderRecord.createdAt).toLocaleDateString('en-PK')}
                </td>
                <td className="px-4 py-3">PKR {orderRecord.total.toFixed(0)}</td>
                <td className="px-4 py-3">
                  {orderRecord.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash on Delivery'}
                </td>
                <td className="px-4 py-3">{formatOrderStatus(orderRecord.status)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${orderRecord.orderNumber}`}
                    className="rounded-md border border-black/20 px-3 py-1.5 text-xs font-medium hover:bg-cream/70"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
