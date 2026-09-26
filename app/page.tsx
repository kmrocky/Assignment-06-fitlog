import Hero from '@/components/Hero';
import LibrarySection from '@/components/LibrarySection';
import { getAllWorkouts } from '@/lib/api';
import { Workout } from '@/lib/types';
export const revalidate = 300;

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let workouts: Workout[];
  try {
    workouts = await getAllWorkouts();
  } catch (err) {
    console.error('Failed to load workouts from FitLog API:', err);
    workouts = [];
  }

  return (
    <div>
      <Hero />
      <LibrarySection workouts={workouts} />
    </div>
  );
}