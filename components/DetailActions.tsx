'use client';

import { CalendarPlus, Bookmark, Check } from 'lucide-react';
import { Workout } from '@/lib/types';
import { usePlan } from '@/lib/plan-context';
import { useToast } from '@/lib/toast-context';

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isInSaved, mounted } = usePlan();
  const { showToast } = useToast();

  const inPlan = mounted && isInPlan(workout.id);
  const inSaved = mounted && isInSaved(workout.id);

  const handleAddToPlan = () => {
    const added = addToPlan(workout);
    if (added) showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (inSaved) {
      showToast(`${workout.name} is already saved`);
      return;
    }
    addToSaved(workout);
    showToast('Saved for later');
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        disabled={inPlan}
        className="inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-black hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {inPlan ? <Check size={16} /> : <CalendarPlus size={16} />}
        {inPlan ? 'In today\'s plan' : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        disabled={inSaved}
        className="inline-flex items-center gap-2 rounded-pill border border-line px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:border-accent/60 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Bookmark size={16} />
        {inSaved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  );
}
