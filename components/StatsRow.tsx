import { Clock, Flame, Star } from 'lucide-react';

export default function StatsRow({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted">
      <span className="flex items-center gap-1.5">
        <Clock size={15} />
        {duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame size={15} />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star size={15} className="text-accent fill-accent" />
        {rating}
      </span>
    </div>
  );
}
