/**
 * Purpose: Admin route layout with private sidebar navigation.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { ReactNode } from 'react';
import { AdminRouteShell } from '@/components/admin/AdminRouteShell';

type AdminLayoutProperties = {
  children: ReactNode;
};

/**
 * Wraps admin pages with a simple charcoal sidebar and content area.
 * @param props Layout properties containing child content.
 * @returns Admin layout UI.
 */
export function AdminLayout({ children }: AdminLayoutProperties) {
  return (
    <div className="min-h-screen bg-cream">
      <AdminRouteShell>{children}</AdminRouteShell>
    </div>
  );
}

export default AdminLayout;
