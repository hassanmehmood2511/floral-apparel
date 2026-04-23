/**
 * Purpose: Shared product category and size options for admin forms.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
export const PRODUCT_CATEGORIES = [
  'tops',
  'bottoms',
  'dresses',
  'outerwear',
  'accessories',
] as const;

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export type ProductCategoryOption = (typeof PRODUCT_CATEGORIES)[number];
export type ProductSizeOption = (typeof PRODUCT_SIZES)[number];
