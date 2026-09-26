import Hero from '@/components/Hero';
import LibrarySection from '@/components/LibrarySection';
import { getAllWorkouts } from '@/lib/api';
 import { Workout } from '@/lib/types';

export default async function HomePage() {
let workouts: Workout[];
  try {
    workouts = await getAllWorkouts();
  } catch {
    workouts = [];
  }

  return (
    <div>
      <Hero />
      <LibrarySection workouts={workouts} />
    </div>
  );
}
