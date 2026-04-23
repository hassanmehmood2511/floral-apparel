/**
 * Purpose: Defines crawler rules and sitemap location.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { MetadataRoute } from 'next';

/**
 * Returns robots policy for public pages and admin path restrictions.
 * @returns Next.js robots route output.
 */
export default function robots(): MetadataRoute.Robots {
  const baseSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: `${baseSiteUrl}/sitemap.xml`,
  };
}
