'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error('Invalid password');
      }

      // Success
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="font-display text-4xl font-extrabold text-charcoal">
          🌸 Floral Apparel
        </h1>
        <h2 className="mt-4 text-center font-display text-2xl font-bold tracking-tight text-charcoal/80">
          Admin Portal
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-pistachio/20 sm:rounded-2xl sm:px-10 border border-pistachio">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-sm font-semibold text-center">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-charcoal/70 mb-2">
                Admin Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border-pistachio px-4 py-3 bg-cream/30 text-charcoal shadow-sm focus:border-blush focus:ring-blush transition-all outline-none border"
                  placeholder="Enter password..."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-full bg-charcoal hover:bg-black px-4 py-3 font-bold text-white shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
