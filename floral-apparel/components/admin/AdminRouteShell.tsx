/**
 * Purpose: Conditionally wraps admin routes with sidebar shell.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

type AdminRouteShellProperties = {
  children: ReactNode;
};

/**
 * Hides sidebar on login page and shows shell elsewhere.
 * @param props Wrapper properties.
 * @returns Route shell for admin pages.
 */
export function AdminRouteShell({ children }: AdminRouteShellProperties) {
  const currentPathname = usePathname();

  if (currentPathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
