/**
 * Purpose: Displays the admin products table and status actions.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { fetchAdminProducts, getAdminHeaders, getInternalRequestOrigin } from '@/lib/adminProducts';

/**
 * Toggles active status for a selected product.
 * @param formData Submitted form data.
 */
async function toggleProductStatusAction(formData: FormData): Promise<void> {
  'use server';

  const productId = String(formData.get('productId') ?? '');
  const currentStatus = String(formData.get('currentStatus') ?? '') === 'true';

  if (!productId) {
    throw new Error('Product id is required.');
  }

  await fetch(`${getInternalRequestOrigin()}/api/products/${productId}`, {
    method: 'PATCH',
    headers: { ...getAdminHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive: !currentStatus }),
  });

  revalidatePath('/admin/products');
}

/**
 * Renders the admin product management table.
 */
export default async function AdminProductsPage() {
  const products = await fetchAdminProducts();

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-charcoal">Products</h1>
        <Link href="/admin/products/new" className="rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-white transition hover:bg-black">
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border border-black/10 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-black/10">
          <thead className="bg-cream/60">
            <tr className="text-left text-sm font-semibold text-charcoal">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {products.map((product) => (
              <tr key={product._id} className="text-sm text-charcoal">
                <td className="px-4 py-3">
                  <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
                </td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 capitalize">{product.category}</td>
                <td className="px-4 py-3">PKR {product.price.toFixed(0)}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${product.isActive ? 'bg-pistachio/30 text-charcoal' : 'bg-black/10 text-charcoal/70'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/products/${product._id}/edit`} className="rounded-md border border-black/20 px-3 py-1.5 text-xs font-medium hover:bg-cream/70">
                      Edit
                    </Link>
                    <form action={toggleProductStatusAction}>
                      <input type="hidden" name="productId" value={product._id} />
                      <input type="hidden" name="currentStatus" value={String(product.isActive)} />
                      <button
                        type="submit"
                        aria-label={`Toggle ${product.name} status`}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${product.isActive ? 'bg-pistachio' : 'bg-black/30'}`}
                      >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${product.isActive ? 'translate-x-5' : 'translate-x-1'}`} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
