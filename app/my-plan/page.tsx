'use client';

import { useMemo, useState } from 'react';
import { usePlan } from '@/lib/plan-context';
import { useToast } from '@/lib/toast-context';
import PlanListCard from '@/components/PlanListCard';
import EmptyPlanState from '@/components/EmptyPlanState';
import SortDropdown, { SortKey } from '@/components/SortDropdown';

type Tab = 'today' | 'saved';

export default function MyPlanPage() {
  const { today, saved, mounted, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>('today');
  const [sortKey, setSortKey] = useState<SortKey>('duration');

  const activeList = tab === 'today' ? today : saved;

  const sorted = useMemo(() => {
    return [...activeList].sort(
      (a, b) => b.workout[sortKey] - a.workout[sortKey]
    );
  }, [activeList, sortKey]);

  const metrics = useMemo(() => {
    return {
      exercises: today.length,
      minutes: today.reduce((sum, e) => sum + e.workout.duration, 0),
      calories: today.reduce((sum, e) => sum + e.workout.calories, 0),
    };
  }, [today]);

  const handleRemove = (id: string, name: string) => {
    if (tab === 'today') removeFromPlan(id);
    else removeFromSaved(id);
    showToast(`Removed ${name}`);
  };

  const handleToggleDone = (id: string, name: string, wasDone: boolean) => {
    markDone(id);
    showToast(wasDone ? `${name} marked as not done` : `${name} marked as done`);
  };

  return (
    <div className="mx-auto max-w-[1312px] px-6 py-10">
      <h1 className="font-display font-bold uppercase text-3xl text-white">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 rounded-card border border-line bg-panel grid grid-cols-3 divide-x divide-line">
        <div className="px-6 py-5">
          <p className="text-xs text-muted">Exercises</p>
          <p className="mt-1 font-display font-bold text-3xl text-accent">
            {metrics.exercises}
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-xs text-muted">Minutes</p>
          <p className="mt-1 font-display font-bold text-3xl text-white">
            {metrics.minutes}
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-xs text-muted">Calories</p>
          <p className="mt-1 font-display font-bold text-3xl text-white">
            {metrics.calories}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="inline-flex rounded-pill border border-line bg-panel p-1 w-fit">
          <button
            onClick={() => setTab('today')}
            className={`px-4 py-1.5 rounded-pill text-sm font-semibold transition ${
              tab === 'today' ? 'bg-accent text-black' : 'text-muted hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab('saved')}
            className={`px-4 py-1.5 rounded-pill text-sm font-semibold transition ${
              tab === 'saved' ? 'bg-white text-black' : 'text-muted hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      <div className="mt-6">
        {!mounted ? (
          <div className="py-20 flex flex-col items-center gap-3 text-muted">
            <div className="w-7 h-7 rounded-full border-2 border-line border-t-accent spinner" />
            <p className="text-sm">Loading workouts…</p>
          </div>
        ) : sorted.length === 0 ? (
          <EmptyPlanState />
        ) : (
          <div className="space-y-4">
            {sorted.map((entry) => (
              <PlanListCard
                key={entry.workout.id}
                entry={entry}
                showDoneAction={tab === 'today'}
                onRemove={() => handleRemove(entry.workout.id, entry.workout.name)}
                onToggleDone={() =>
                  handleToggleDone(entry.workout.id, entry.workout.name, entry.done)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
