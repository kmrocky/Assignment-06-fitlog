import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/lib/toast-context';
import { PlanProvider } from '@/lib/plan-context';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description:
    'FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today\'s plan, and watch the week\'s work add up.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-body min-h-screen flex flex-col bg-bg">
        <ToastProvider>
          <PlanProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </PlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
