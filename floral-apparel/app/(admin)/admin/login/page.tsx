/**
 * Purpose: Admin login page with password-only authentication.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { redirect } from 'next/navigation';
import { isValidAdminPassword, setAdminTokenCookie } from '@/lib/adminAuth';

type AdminLoginPageProperties = {
  searchParams?: {
    error?: string;
  };
};

/**
 * Handles login form submission and authenticates admin users.
 * @param formData Submitted form data.
 */
async function submitAdminLogin(formData: FormData): Promise<void> {
  'use server';

  const rawPassword = formData.get('password');
  const submittedPassword = typeof rawPassword === 'string' ? rawPassword : '';

  if (!isValidAdminPassword(submittedPassword)) {
    redirect('/admin/login?error=invalid_credentials');
  }

  setAdminTokenCookie();
  redirect('/admin/dashboard');
}

/**
 * Renders the password-only admin login form.
 */
export default function AdminLoginPage({ searchParams }: AdminLoginPageProperties) {
  const showInvalidPasswordMessage = searchParams?.error === 'invalid_credentials';

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-3xl">🌸</p>
          <h1 className="mt-2 text-2xl font-semibold text-charcoal">Floral Admin</h1>
          <p className="mt-1 text-sm text-charcoal/70">Sign in to continue</p>
        </div>
        <form action={submitAdminLogin} className="space-y-4">
          {showInvalidPasswordMessage && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              Invalid password. Please try again.
            </p>
          )}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-charcoal">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-black/15 px-3 py-2 text-charcoal outline-none transition focus:border-pistachio"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-charcoal px-4 py-2 font-medium text-white transition hover:bg-black"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
