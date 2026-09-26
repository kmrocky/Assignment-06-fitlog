'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PlanEntry, Workout } from './types';
import { useToast } from './toast-context';

const PLAN_KEY = 'fitlog:plan';
const SAVED_KEY = 'fitlog:saved';
const PLAN_CAP = 5;

interface PlanContextValue {
  today: PlanEntry[];
  saved: PlanEntry[];
  mounted: boolean;
  isInPlan: (id: string) => boolean;
  isInSaved: (id: string) => boolean;
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markDone: (id: string) => void;
  planCap: number;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function readStorage(key: string): PlanEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [today, setToday] = useState<PlanEntry[]>([]);
  const [saved, setSaved] = useState<PlanEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setToday(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) window.localStorage.setItem(PLAN_KEY, JSON.stringify(today));
  }, [today, mounted]);

  useEffect(() => {
    if (mounted) window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, mounted]);

  const isInPlan = useCallback(
    (id: string) => today.some((e) => e.workout.id === id),
    [today]
  );
  const isInSaved = useCallback(
    (id: string) => saved.some((e) => e.workout.id === id),
    [saved]
  );

  const addToPlan = useCallback(
    (workout: Workout) => {
      let added = false;
      setToday((prev) => {
        if (prev.some((e) => e.workout.id === workout.id)) {
          showToast(`${workout.name} is already in today's plan`);
          return prev;
        }
        if (prev.length >= PLAN_CAP) {
          showToast("Today's plan is full — finish a lift first");
          return prev;
        }
        added = true;
        return [...prev, { workout, addedAt: Date.now(), done: false }];
      });
      return added;
    },
    [showToast]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      setSaved((prev) => {
        if (prev.some((e) => e.workout.id === workout.id)) {
          showToast(`${workout.name} is already saved`);
          return prev;
        }
        return [...prev, { workout, addedAt: Date.now(), done: false }];
      });
    },
    [showToast]
  );

  const removeFromPlan = useCallback((id: string) => {
    setToday((prev) => prev.filter((e) => e.workout.id !== id));
  }, []);

  const removeFromSaved = useCallback((id: string) => {
    setSaved((prev) => prev.filter((e) => e.workout.id !== id));
  }, []);

  const markDone = useCallback((id: string) => {
    setToday((prev) =>
      prev.map((e) => (e.workout.id === id ? { ...e, done: !e.done } : e))
    );
  }, []);

  const value = useMemo(
    () => ({
      today,
      saved,
      mounted,
      isInPlan,
      isInSaved,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
      planCap: PLAN_CAP,
    }),
    [today, saved, mounted, isInPlan, isInSaved, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan must be used within PlanProvider');
  return ctx;
}
