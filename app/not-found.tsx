import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1312px] px-6 py-28 flex flex-col items-center text-center">
      <p className="text-accent font-display font-bold text-6xl mb-4">404</p>
      <h1 className="font-display font-bold uppercase text-2xl sm:text-3xl text-white">
        Nothing to see here
      </h1>
      <p className="mt-3 text-sm text-muted max-w-sm">
        This page doesn&apos;t exist. Head back to the library and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-pill bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-black hover:brightness-95 transition"
      >
        Go to workouts
      </Link>
    </div>
  );
}
