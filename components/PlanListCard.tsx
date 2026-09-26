'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { PlanEntry } from '@/lib/types';
import StatsRow from './StatsRow';

export default function PlanListCard({
  entry,
  showDoneAction,
  onRemove,
  onToggleDone,
}: {
  entry: PlanEntry;
  showDoneAction: boolean;
  onRemove: () => void;
  onToggleDone?: () => void;
}) {
  const { workout, done } = entry;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-card border border-line bg-panel p-4">
      <div className="relative w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden bg-panel2 shrink-0">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-display font-bold uppercase text-base text-white ${
            done ? 'line-through opacity-50' : ''
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-2">
          <StatsRow
            duration={workout.duration}
            calories={workout.calories}
            rating={workout.rating}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-pill border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-accent/60 transition"
        >
          View Details
        </Link>
        {showDoneAction && (
          <button
            onClick={onToggleDone}
            className={`inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              done
                ? 'bg-panel2 text-accent border border-accent/50'
                : 'bg-accent text-black hover:brightness-95'
            }`}
          >
            <Check size={14} />
            {done ? 'Done' : 'Mark as Done'}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="p-2 rounded-full text-muted hover:text-white hover:bg-panel2 transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
