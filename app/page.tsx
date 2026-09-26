import Hero from '@/components/Hero';
import LibrarySection from '@/components/LibrarySection';
import { getAllWorkouts } from '@/lib/api';

export default async function HomePage() {
  let workouts;
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
