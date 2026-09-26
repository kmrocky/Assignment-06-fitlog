'use client';

import { useMemo, useState } from 'react';
import { Workout } from '@/lib/types';
import WorkoutCard from './WorkoutCard';
import SortDropdown, { SortKey } from './SortDropdown';

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('duration');

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [workouts, sortKey]);

  return (
    <section id="library" className="mx-auto max-w-[1312px] px-6 py-14 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display font-bold uppercase text-2xl sm:text-3xl text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      {sorted.length === 0 ? (
        <p className="text-muted text-sm">No workouts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
