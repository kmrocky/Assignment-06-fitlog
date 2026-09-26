import { Workout } from './types';

const BASE_URL = 'https://api.abcz.workers.dev/api/fitlog';

// The upstream API's exact field names aren't guaranteed, so we normalize
// defensively across common variants (camelCase, snake_case, short forms).
function pick(obj: any, keys: string[], fallback: any = undefined) {
  for (const k of keys) {
    if (obj?.[k] !== undefined && obj?.[k] !== null && obj?.[k] !== '') {
      return obj[k];
    }
  }
  return fallback;
}

function toArray(value: any): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function toNumber(value: any, fallback = 0): number {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return typeof n === 'number' && !Number.isNaN(n) ? n : fallback;
}

export function normalizeWorkout(raw: any, index = 0): Workout {
  const id = String(
    pick(raw, ['id', '_id', 'workoutId', 'slug'], `workout-${index}`)
  );

  const name = pick(
    raw,
    ['name', 'title', 'workoutName', 'exercise'],
    'Untitled Workout'
  );

  const categories = toArray(
    pick(raw, ['categories', 'category', 'tags', 'muscleGroups', 'tag'], [])
  );

  const equipment = pick(
    raw,
    ['equipment', 'equipmentNeeded', 'gear'],
    'Bodyweight'
  );

  const duration = toNumber(
    pick(raw, ['duration', 'durationMinutes', 'time', 'minutes'], 15)
  );

  const calories = toNumber(
    pick(raw, ['calories', 'kcal', 'caloriesBurned'], 100)
  );

  const rating = toNumber(pick(raw, ['rating', 'stars', 'score'], 4.5));

  const image = pick(
    raw,
    ['image', 'img', 'thumbnail', 'imageUrl', 'photo', 'picture'],
    '/placeholder-workout.svg'
  );

  const description = pick(
    raw,
    ['description', 'desc', 'summary', 'subtitle'],
    'A focused, effective lift worth adding to your rotation.'
  );

  const difficulty = pick(
    raw,
    ['difficulty', 'level'],
    'Intermediate'
  );

  const sets = pick(raw, ['sets'], 3);
  const reps = String(pick(raw, ['reps', 'repRange'], '8-12'));

  const instructions = toArray(
    pick(raw, ['instructions', 'steps', 'howTo'], [])
  );

  return {
    id,
    name: String(name).toUpperCase(),
    categories: categories.length ? categories : ['GENERAL'],
    equipment: String(equipment),
    duration,
    calories,
    rating,
    image: String(image),
    description: String(description),
    difficulty: String(difficulty),
    sets,
    reps,
    instructions: instructions.length
      ? instructions
      : [
          'Set up in a stable, controlled position.',
          'Perform the movement with a slow, deliberate tempo.',
          'Keep your core braced through the full range of motion.',
          'Reset and repeat for the prescribed reps.',
        ],
  };
}

function extractList(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.workouts)) return payload.workouts;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load workouts (${res.status})`);
  const json = await res.json();
  return extractList(json).map((raw, i) => normalizeWorkout(raw, i));
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      const raw = json?.data ?? json;
      if (raw && (raw.id || raw._id || raw.name || raw.title)) {
        return normalizeWorkout(raw);
      }
    }
  } catch {
    // fall through to list lookup
  }
  // Fallback: some APIs 404 on the :id route; find it in the full list instead.
  try {
    const all = await getAllWorkouts();
    return all.find((w) => w.id === id) ?? null;
  } catch {
    return null;
  }
}
