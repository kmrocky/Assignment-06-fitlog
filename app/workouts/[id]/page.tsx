import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getWorkoutById } from '@/lib/api';
import CategoryTags from '@/components/CategoryTags';
import DetailActions from '@/components/DetailActions';

export default async function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const workout = await getWorkoutById(params.id);
  if (!workout) notFound();

  const specs: [string, string | number][] = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.calories} kcal`],
    ['Rating', workout.rating],
  ];

  return (
    <div className="mx-auto max-w-[1312px] px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative w-full aspect-square rounded-card overflow-hidden bg-panel border border-line">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display font-bold uppercase text-3xl sm:text-4xl text-white">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            {workout.description}
          </p>

          <div className="mt-4">
            <CategoryTags categories={workout.categories} size="md" />
          </div>

          <div className="mt-6 rounded-card border border-line overflow-hidden">
            {specs.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-5 py-3 text-sm ${
                  i % 2 === 0 ? 'bg-panel' : 'bg-panel2'
                }`}
              >
                <span className="text-muted tracking-wide uppercase text-xs">
                  {label}
                </span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display font-bold uppercase text-lg text-white mb-3">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/90">
                  <span className="shrink-0 text-accent font-semibold">
                    {i + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
