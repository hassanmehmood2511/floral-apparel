/**
 * Purpose: Shared helpers for admin authentication and cookies.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { cookies } from 'next/headers';

export const ADMIN_TOKEN_COOKIE_NAME = 'admin_token';
export const ADMIN_TOKEN_COOKIE_VALUE = 'authenticated';

/**
 * Validates that the submitted password matches the configured admin password.
 * @param submittedPassword Password provided by the admin user.
 * @returns True when the password is valid.
 */
export function isValidAdminPassword(submittedPassword: string): boolean {
  const expectedAdminPassword = process.env.ADMIN_PASSWORD;

  if (!expectedAdminPassword) {
    return false;
  }

  return submittedPassword === expectedAdminPassword;
}

/**
 * Persists the admin authentication cookie for the current request.
 */
export function setAdminTokenCookie(): void {
  cookies().set(ADMIN_TOKEN_COOKIE_NAME, ADMIN_TOKEN_COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
}
