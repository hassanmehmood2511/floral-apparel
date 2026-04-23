/**
 * Purpose: Renders product edit page with pre-filled values and update action.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProductForm } from '@/components/admin/ProductForm';
import {
  fetchAdminProductById,
  getAdminHeaders,
  getInternalRequestOrigin,
  parseAdminProductFormData,
} from '@/lib/adminProducts';

type EditAdminProductPageProperties = {
  params: {
    id: string;
  };
};

/**
 * Updates an existing product by id through the products API.
 * @param productId Product id.
 * @param formData Submitted form data.
 */
async function updateProductAction(productId: string, formData: FormData): Promise<void> {
  'use server';

  const payload = parseAdminProductFormData(formData);

  const response = await fetch(`${getInternalRequestOrigin()}/api/products/${productId}`, {
    method: 'PUT',
    headers: { ...getAdminHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to update product.');
  }

  revalidatePath('/admin/products');
  redirect('/admin/products?toast=updated');
}

/**
 * Renders the edit product page with existing values.
 * @param props Page properties including route params.
 */
export default async function EditAdminProductPage({ params }: EditAdminProductPageProperties) {
  try {
    const product = await fetchAdminProductById(params.id);

    return (
      <ProductForm
        title="Edit Product"
        submitLabel="Save Changes"
        action={updateProductAction.bind(null, params.id)}
        showStatusToggle
        defaultValues={{
          name: product.name,
          description: product.description,
          imageUrl: product.images[0],
          price: product.price,
          category: product.category,
          sizes: product.sizes,
          stock: product.stock,
          isFeatured: product.isFeatured,
          isActive: product.isActive,
        }}
      />
    );
  } catch (_error) {
    notFound();
  }
}
