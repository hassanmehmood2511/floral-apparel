/**
 * Purpose: General utility functions for formatting and string manipulation
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */

/**
 * Formats a given number into a PKR currency string (e.g., PKR 2,500).
 *
 * @param {number} amount - The numeric amount to format.
 * @returns {string} The formatted currency string.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Converts a string into a URL-safe slug.
 *
 * @param {string} text - The text to be slugified.
 * @returns {string} The URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Merges multiple CSS class names into a single string.
 * Filters out falsy values like undefined, null, or false.
 *
 * @param {...(string | undefined | null | false)[]} classes - An array of class values.
 * @returns {string} The merged and filtered class names.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
