/**
 * Purpose: Displays full admin order details with status updates and print action.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AdminActionToast } from '@/components/admin/AdminActionToast';
import { PrintOrderButton } from '@/components/admin/PrintOrderButton';
import {
  ADMIN_ORDER_STATUSES,
  fetchAdminOrderByNumber,
  type AdminOrderStatus,
  updateAdminOrderStatus,
} from '@/lib/adminOrders';

type AdminOrderDetailsPageProperties = {
  params: {
    orderNumber: string;
  };
  searchParams?: {
    toast?: string;
  };
};

/**
 * Formats payment method for readable labels.
 * @param paymentMethod Stored payment method.
 * @returns Human readable payment method string.
 */
function formatPaymentMethod(paymentMethod: 'cash_on_delivery' | 'bank_transfer'): string {
  return paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash on Delivery';
}

/**
 * Formats order status for readable labels.
 * @param orderStatus Stored order status.
 * @returns Human readable status string.
 */
function formatOrderStatus(orderStatus: AdminOrderStatus): string {
  return orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1);
}

/**
 * Updates order status through API and revalidates admin pages.
 * @param orderNumber Order number to update.
 * @param formData Submitted form data.
 */
async function updateOrderStatusAction(orderNumber: string, formData: FormData): Promise<void> {
  'use server';

  const submittedStatus = String(formData.get('status') ?? '') as AdminOrderStatus;
  await updateAdminOrderStatus(orderNumber, submittedStatus);
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderNumber}`);
  redirect(`/admin/orders/${orderNumber}?toast=status_updated`);
}

/**
 * Renders full admin view for one order.
 * @param props Route parameters.
 */
export default async function AdminOrderDetailsPage({
  params,
  searchParams,
}: AdminOrderDetailsPageProperties) {
  try {
    const orderRecord = await fetchAdminOrderByNumber(params.orderNumber);
    const toastMessage =
      searchParams?.toast === 'status_updated' ? 'Order status updated successfully.' : undefined;

    return (
      <section className="space-y-6 print:bg-white">
        <AdminActionToast message={toastMessage} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">Order {orderRecord.orderNumber}</h1>
            <p className="mt-1 text-sm text-charcoal/70">
              Placed on {new Date(orderRecord.createdAt).toLocaleString('en-PK')}
            </p>
          </div>
          <PrintOrderButton />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-black/10 bg-white p-4">
            <h2 className="text-lg font-semibold text-charcoal">Customer Info</h2>
            <p className="mt-2 text-sm text-charcoal">{orderRecord.customerName}</p>
            <p className="text-sm text-charcoal/80">{orderRecord.customerEmail}</p>
            <p className="text-sm text-charcoal/80">{orderRecord.customerPhone}</p>
          </article>
          <article className="rounded-lg border border-black/10 bg-white p-4">
            <h2 className="text-lg font-semibold text-charcoal">Shipping Address</h2>
            <p className="mt-2 text-sm text-charcoal">{orderRecord.shippingAddress.street}</p>
            <p className="text-sm text-charcoal/80">
              {orderRecord.shippingAddress.city}, {orderRecord.shippingAddress.province}
            </p>
            <p className="text-sm text-charcoal/80">{orderRecord.shippingAddress.postalCode}</p>
          </article>
        </div>

        <article className="rounded-lg border border-black/10 bg-white p-4">
          <h2 className="mb-3 text-lg font-semibold text-charcoal">Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-black/10">
              <thead>
                <tr className="text-left text-sm font-semibold text-charcoal">
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">Size</th>
                  <th className="px-3 py-2">Qty</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {orderRecord.items.map((orderItem) => (
                  <tr key={`${orderItem.productId}-${orderItem.size}`} className="text-sm text-charcoal">
                    <td className="px-3 py-2">{orderItem.productName}</td>
                    <td className="px-3 py-2">{orderItem.size}</td>
                    <td className="px-3 py-2">{orderItem.quantity}</td>
                    <td className="px-3 py-2">PKR {orderItem.priceAtPurchase.toFixed(0)}</td>
                    <td className="px-3 py-2">
                      PKR {(orderItem.priceAtPurchase * orderItem.quantity).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-black/10 bg-white p-4">
            <h2 className="text-lg font-semibold text-charcoal">Payment</h2>
            <p className="mt-2 text-sm text-charcoal">
              Method: {formatPaymentMethod(orderRecord.paymentMethod)}
            </p>
            {orderRecord.paymentMethod === 'bank_transfer' && orderRecord.paymentProof && (
              <div className="mt-3">
                <p className="mb-2 text-sm font-medium text-charcoal">Payment Proof</p>
                <Image
                  src={orderRecord.paymentProof}
                  alt={`Payment proof for ${orderRecord.orderNumber}`}
                  width={640}
                  height={480}
                  loading="lazy"
                  className="max-h-72 rounded-md border border-black/10 object-contain"
                />
              </div>
            )}
          </article>
          <article className="rounded-lg border border-black/10 bg-white p-4">
            <h2 className="text-lg font-semibold text-charcoal">Totals</h2>
            <div className="mt-2 space-y-1 text-sm text-charcoal">
              <p>Subtotal: PKR {orderRecord.subtotal.toFixed(0)}</p>
              <p>Shipping: PKR {orderRecord.shippingFee.toFixed(0)}</p>
              <p className="pt-1 text-base font-semibold">Total: PKR {orderRecord.total.toFixed(0)}</p>
            </div>
          </article>
        </div>

        <article className="rounded-lg border border-black/10 bg-white p-4 print:hidden">
          <h2 className="text-lg font-semibold text-charcoal">Update Status</h2>
          <form action={updateOrderStatusAction.bind(null, orderRecord.orderNumber)} className="mt-3 flex flex-wrap items-center gap-3">
            <select
              name="status"
              defaultValue={orderRecord.status}
              className="rounded-md border border-black/15 px-3 py-2 text-sm text-charcoal"
            >
              {ADMIN_ORDER_STATUSES.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {formatOrderStatus(statusOption)}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
            >
              Update Status
            </button>
            <p className="text-sm text-charcoal/70">Current: {formatOrderStatus(orderRecord.status)}</p>
          </form>
        </article>
      </section>
    );
  } catch (_error) {
    notFound();
  }
}
