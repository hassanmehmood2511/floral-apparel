/**
 * Purpose: Generates sitemap entries for static and product pages.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { MetadataRoute } from 'next';

type SitemapProduct = {
  slug: string;
  updatedAt?: string;
};

/**
 * Generates sitemap entries for homepage and all product pages.
 * @returns Next.js sitemap route output.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const productEndpoint = `${baseSiteUrl}/api/products?limit=500`;

  let products: SitemapProduct[] = [];

  try {
    const response = await fetch(productEndpoint, { cache: 'no-store' });

    if (response.ok) {
      const result = (await response.json()) as { products?: SitemapProduct[] };
      products = result.products ?? [];
    }
  } catch (error) {
    console.error('Sitemap product fetch failed:', error);
  }

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseSiteUrl}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseSiteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productEntries,
  ];
}
