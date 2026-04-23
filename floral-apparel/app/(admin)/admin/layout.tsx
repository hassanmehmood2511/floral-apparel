'use client';

/**
 * Purpose: Admin dashboard layout with sidebar
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not show sidebar on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '🛍️' },
    { name: 'Orders', href: '/admin/orders', icon: '📦' },
  ];

  return (
    <div className="min-h-screen bg-cream flex font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col shadow-2xl fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="font-display text-2xl font-bold tracking-wide">
            🌸 Floral<br />
            <span className="text-pistachio">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold',
                  isActive
                    ? 'bg-pistachio text-charcoal shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-white/70 font-bold transition-colors"
          >
            <span>🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen p-8 bg-cream/50">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
