/**
 * Purpose: Server-side product admin helpers for API calls and form parsing.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { headers } from 'next/headers';
import { PRODUCT_CATEGORIES, PRODUCT_SIZES, type ProductCategoryOption } from '@/lib/productOptions';

export type AdminProductRecord = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategoryOption;
  sizes: string[];
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
};

export type AdminProductPayload = Omit<AdminProductRecord, '_id'>;

/**
 * Builds the request origin for internal API calls.
 * @returns Origin URL string.
 */
export function getInternalRequestOrigin(): string {
  const requestHeaders = headers();
  const host = requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';

  if (!host) {
    throw new Error('Could not determine request host.');
  }

  return `${protocol}://${host}`;
}

/**
 * Builds admin headers using the configured ADMIN_KEY value.
 * @returns Header object with admin key.
 */
export function getAdminHeaders(): Record<string, string> {
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    throw new Error('ADMIN_KEY is not configured.');
  }

  return { 'x-admin-key': adminKey };
}

/**
 * Fetches all products including inactive records for admin tables.
 * @returns List of admin product records.
 */
export async function fetchAdminProducts(): Promise<AdminProductRecord[]> {
  const endpoint = `${getInternalRequestOrigin()}/api/products?includeInactive=true&limit=250`;
  const response = await fetch(endpoint, { headers: getAdminHeaders(), cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  const result = (await response.json()) as { products: AdminProductRecord[] };
  return result.products;
}

/**
 * Fetches a single product by id for edit pages.
 * @param id Product database id.
 * @returns Admin product record.
 */
export async function fetchAdminProductById(id: string): Promise<AdminProductRecord> {
  const endpoint = `${getInternalRequestOrigin()}/api/products/${id}`;
  const response = await fetch(endpoint, { headers: getAdminHeaders(), cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch product details.');
  }

  return (await response.json()) as AdminProductRecord;
}

/**
 * Parses and validates product form data.
 * @param formData Submitted form data.
 * @returns Product payload for API requests.
 */
export function parseAdminProductFormData(formData: FormData): AdminProductPayload {
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const imageUrl = String(formData.get('imageUrl') ?? '').trim();
  const category = String(formData.get('category') ?? '').trim() as ProductCategoryOption;
  const stock = Number(formData.get('stock') ?? 0);
  const price = Number(formData.get('price') ?? 0);
  const selectedSizes = PRODUCT_SIZES.filter((size) => formData.getAll('sizes').includes(size));

  if (!name || !description || !imageUrl || !PRODUCT_CATEGORIES.includes(category)) {
    throw new Error('Please provide all required product fields.');
  }

  if (!Number.isFinite(price) || price < 0 || !Number.isFinite(stock) || stock < 0) {
    throw new Error('Price and stock must be valid non-negative numbers.');
  }

  if (selectedSizes.length === 0) {
    throw new Error('Please select at least one size.');
  }

  return {
    name,
    description,
    price,
    images: [imageUrl],
    category,
    sizes: selectedSizes,
    stock,
    isFeatured: formData.get('isFeatured') === 'on',
    isActive: formData.get('isActive') === 'on',
  };
}
