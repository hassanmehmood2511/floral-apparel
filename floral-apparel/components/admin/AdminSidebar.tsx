/**
 * Purpose: Sidebar navigation for admin pages.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminNavigationItem = {
  label: 'Dashboard' | 'Products' | 'Orders';
  href: '/admin/dashboard' | '/admin/products' | '/admin/orders';
};

const ADMIN_NAVIGATION_ITEMS: AdminNavigationItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Orders', href: '/admin/orders' },
];

/**
 * Renders sidebar links and highlights the active section.
 */
export function AdminSidebar() {
  const currentPathname = usePathname();

  return (
    <aside className="w-64 bg-charcoal text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-lg font-semibold">Floral Admin</p>
      </div>
      <nav className="space-y-2 p-4">
        {ADMIN_NAVIGATION_ITEMS.map((navigationItem) => {
          const isActiveRoute = currentPathname.startsWith(navigationItem.href);

          return (
            <Link
              key={navigationItem.href}
              href={navigationItem.href}
              className={`block rounded-md px-4 py-2 font-medium transition-colors ${
                isActiveRoute
                  ? 'bg-pistachio text-charcoal'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {navigationItem.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
