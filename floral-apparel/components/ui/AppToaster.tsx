/**
 * Purpose: Renders global toast notifications for app-wide feedback.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
'use client';

import { Toaster } from 'react-hot-toast';

/**
 * Displays configured toast container at the top-right.
 */
export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3200,
        style: {
          border: '1px solid #e5eed6',
          background: '#fdf8f2',
          color: '#2c2c2c',
        },
      }}
    />
  );
}
