/**
 * Purpose: Renders friendly global error state with reset actions.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
'use client';

import Link from 'next/link';

type ErrorPageProperties = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Displays a decorative floral-themed error page.
 * @param props Error page props.
 * @returns Error fallback UI.
 */
export default function ErrorPage({ error, reset }: ErrorPageProperties) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
        <div className="relative mx-auto mb-6 h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-pistachio-light" />
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush" />
          <div className="absolute left-1/2 top-2 h-9 w-4 -translate-x-1/2 rounded-full bg-pistachio" />
          <div className="absolute bottom-2 left-1/2 h-9 w-4 -translate-x-1/2 rounded-full bg-pistachio" />
          <div className="absolute left-2 top-1/2 h-4 w-9 -translate-y-1/2 rounded-full bg-pistachio" />
          <div className="absolute right-2 top-1/2 h-4 w-9 -translate-y-1/2 rounded-full bg-pistachio" />
        </div>
        <h1 className="text-2xl font-semibold text-charcoal">Something went wrong</h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Our garden team is on it. Please try again or head back home.
        </p>
        <p className="mt-2 text-xs text-charcoal/50">{error.message}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Try Again
          </button>
          <Link href="/" className="rounded-md border border-black/20 px-4 py-2 text-sm font-medium">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
