/**
 * Purpose: Displays global loading fallback for route transitions.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
/**
 * Renders a centered spinner with pistachio accent.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-pistachio-light border-t-pistachio" />
    </div>
  );
}
