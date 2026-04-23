/**
 * Purpose: Redirects base admin route to dashboard.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { redirect } from 'next/navigation';

/**
 * Redirect entry point for admin root page.
 */
export default function AdminIndex() {
  redirect('/admin/dashboard');
}
