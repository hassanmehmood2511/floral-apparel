import { headers } from 'next/headers';

type ProductFilters = {
  category?: string;
  size?: string;
};

type ProductsResponse = {
  products: any[];
};

export async function fetchStorefrontProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set('category', filters.category);
  }

  if (filters.size) {
    params.set('size', filters.size);
  }

  const incomingHeaders = headers();
  const host = incomingHeaders.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const query = params.toString();
  const url = `${protocol}://${host}/api/products${query ? `?${query}` : ''}`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Products API failed with status ${response.status}`);
  }

  const data = (await response.json()) as ProductsResponse;
  return data.products || [];
}
