import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1312px] flex-col sm:flex-row items-center justify-between gap-3 px-6 py-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={18} height={18} />
          <span className="font-display font-bold text-sm tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-muted text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
