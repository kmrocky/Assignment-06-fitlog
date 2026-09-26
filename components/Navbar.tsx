'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/lib/plan-context';

export default function Navbar() {
  const pathname = usePathname();
  const { today, saved } = usePlan();

  const linkClass = (href: string) => {
    const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return `text-sm font-medium transition-colors ${
      active
        ? 'text-black bg-accent rounded-pill px-4 py-1.5'
        : 'text-white/80 hover:text-white px-4 py-1.5'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1312px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display font-bold text-lg tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className={linkClass('/')}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass('/my-plan')}>
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            Plan
            <span className="min-w-[22px] text-center rounded-pill bg-accent px-2 py-0.5 text-xs font-semibold text-black">
              {today.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            Saved
            <span className="min-w-[22px] text-center rounded-pill border border-line px-2 py-0.5 text-xs font-semibold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
