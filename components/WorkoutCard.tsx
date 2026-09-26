import Link from 'next/link';
import Image from 'next/image';
import { Workout } from '@/lib/types';
import CategoryTags from './CategoryTags';
import StatsRow from './StatsRow';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block rounded-card overflow-hidden border border-line bg-panel hover:border-accent/60 transition-colors"
    >
      <div className="relative aspect-[4/3] bg-panel2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="mb-3">
          <CategoryTags categories={workout.categories} />
        </div>
        <h3 className="font-display font-bold text-white text-lg uppercase leading-tight">
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{workout.equipment}</p>
        <div className="mt-3 pt-3 border-t border-line">
          <StatsRow
            duration={workout.duration}
            calories={workout.calories}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
