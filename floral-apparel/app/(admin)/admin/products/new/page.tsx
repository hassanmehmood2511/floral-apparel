/**
 * Purpose: Renders the new product page and handles product creation.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProductForm } from '@/components/admin/ProductForm';
import { getAdminHeaders, getInternalRequestOrigin, parseAdminProductFormData } from '@/lib/adminProducts';

/**
 * Creates a new product through the products API endpoint.
 * @param formData Submitted form data.
 */
async function createProductAction(formData: FormData): Promise<void> {
  'use server';

  const payload = parseAdminProductFormData(formData);

  const response = await fetch(`${getInternalRequestOrigin()}/api/products`, {
    method: 'POST',
    headers: { ...getAdminHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create product.');
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

/**
 * Renders the admin page for creating products.
 */
export default function NewAdminProductPage() {
  return (
    <ProductForm
      title="Add New Product"
      submitLabel="Create Product"
      action={createProductAction}
      defaultValues={{ isActive: true }}
    />
  );
}
