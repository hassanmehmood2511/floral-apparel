/**
 * Purpose: Renders a friendly 404 experience for unknown routes.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import Link from 'next/link';

/**
 * Displays floral-themed not found message and navigation action.
 */
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 h-20 w-20 animate-flower-float rounded-full bg-pistachio-light">
          <div className="flex h-full items-center justify-center text-3xl">🌸</div>
        </div>
        <h1 className="text-2xl font-semibold text-charcoal">
          Oops, this page got lost in the garden 🌸
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          The page might have been moved, renamed, or bloomed elsewhere.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
