/**
 * Purpose: Root layout component for the application
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Floral Apparel | Elegant Clothing',
  description:
    'Discover elegance in every thread with Floral Apparel. Shop our exclusive collection of tops, dresses, bottoms, and accessories.',
  openGraph: {
    images: ['/images/og-placeholder.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-body bg-cream text-charcoal antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
