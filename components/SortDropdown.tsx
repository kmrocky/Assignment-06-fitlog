'use client';

import { ChevronDown } from 'lucide-react';

export type SortKey = 'duration' | 'calories' | 'rating';

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-lg border border-line bg-panel2 pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
