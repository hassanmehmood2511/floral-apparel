/**
 * Purpose: Root layout component for the application
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { AppToaster } from '@/components/ui/AppToaster';
import './globals.css';

const baseSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseSiteUrl),
  title: {
    default: 'Floral Apparel',
    template: '%s | Floral Apparel',
  },
  description:
    'Discover elegance in every thread with Floral Apparel. Shop our exclusive collection of tops, dresses, bottoms, and accessories.',
  keywords: [
    'Floral Apparel',
    'women clothing',
    'pakistan fashion',
    'dresses',
    'tops',
    'online boutique',
  ],
  openGraph: {
    type: 'website',
    title: 'Floral Apparel',
    description:
      'Discover elegance in every thread with Floral Apparel. Shop our exclusive collection of tops, dresses, bottoms, and accessories.',
    images: ['/images/og-placeholder.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floral Apparel',
    description:
      'Discover elegance in every thread with Floral Apparel. Shop our exclusive collection of tops, dresses, bottoms, and accessories.',
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
        <AppToaster />
      </body>
    </html>
  );
}
