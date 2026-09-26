import Link from 'next/link';

export default function EmptyPlanState() {
  return (
    <div className="rounded-card border border-dashed border-line py-20 flex flex-col items-center text-center">
      <h3 className="font-display font-bold uppercase text-xl text-white">
        Nothing here yet
      </h3>
      <p className="mt-2 text-sm text-muted max-w-xs">
        Browse the library and add a lift to get today moving.
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
