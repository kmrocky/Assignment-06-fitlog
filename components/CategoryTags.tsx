export default function CategoryTags({
  categories,
  size = 'sm',
}: {
  categories: string[];
  size?: 'sm' | 'md';
}) {
  const pad = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <span
          key={c}
          className={`${pad} rounded-pill bg-accent text-black font-semibold uppercase tracking-wide`}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
