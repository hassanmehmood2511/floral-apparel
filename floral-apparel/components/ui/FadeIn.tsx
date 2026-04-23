/**
 * Purpose: Wraps page content with a subtle fade-in transition.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { ReactNode } from 'react';

type FadeInProperties = {
  children: ReactNode;
};

/**
 * Provides route-level entrance animation for wrapped content.
 * @param props Wrapped content.
 * @returns Animated wrapper element.
 */
export function FadeIn({ children }: FadeInProperties) {
  return <div className="animate-fade-in">{children}</div>;
}
