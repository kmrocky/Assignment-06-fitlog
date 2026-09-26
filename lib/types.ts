export interface Workout {
  id: string;
  name: string;
  categories: string[];
  equipment: string;
  duration: number; // minutes
  calories: number;
  rating: number;
  image: string;
  description: string;
  difficulty: string;
  sets: number | string;
  reps: string;
  instructions: string[];
}

export interface PlanEntry {
  workout: Workout;
  addedAt: number;
  done: boolean;
}
