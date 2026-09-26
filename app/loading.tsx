export default function Loading() {
  return (
    <div className="mx-auto max-w-[1312px] px-6 py-24 flex flex-col items-center justify-center gap-4 text-muted">
      <div className="w-8 h-8 rounded-full border-2 border-line border-t-accent spinner" />
      <p className="text-sm">Loading workouts…</p>
    </div>
  );
}
