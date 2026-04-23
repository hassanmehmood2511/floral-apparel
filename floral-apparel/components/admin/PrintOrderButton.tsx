/**
 * Purpose: Triggers browser print dialog for order detail pages.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
'use client';

/**
 * Renders a print button for admin order details.
 */
export function PrintOrderButton() {
  /**
   * Opens the browser print dialog.
   */
  function handlePrintOrder(): void {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrintOrder}
      className="rounded-md border border-black/20 px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-cream print:hidden"
    >
      Print Order
    </button>
  );
}
