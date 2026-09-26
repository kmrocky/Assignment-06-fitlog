'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1312px] px-6 py-28 flex flex-col items-center text-center">
      <h1 className="font-display font-bold uppercase text-2xl sm:text-3xl text-white">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-muted max-w-sm">
        We couldn&apos;t load that page. Check your connection and try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center rounded-pill bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-black hover:brightness-95 transition"
      >
        Try again
      </button>
    </div>
  );
}
