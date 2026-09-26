# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
lifts, pull up the details on any exercise, lock it into today's plan (or
save it for later), and watch your daily exercise/minutes/calorie totals
add up on the My Plan page.

## Live Link
_Add your deployed URL here_

## GitHub Repository
_Add your repo URL here_

## Technologies Used
- **Next.js 14** (App Router) — routing, server components, data fetching
- **React 18** + TypeScript
- **Tailwind CSS** — styling and responsive layout
- **lucide-react** — icon set
- **FitLog API** (`https://api.abcz.workers.dev/api/fitlog`) — workout data
- **localStorage** — client-side persistence for the plan/saved lists

## Key Features
1. **Workout library grid** — all workouts pulled live from the API and
   rendered as responsive cards (3 columns on desktop, collapsing down to
   1 column on mobile), each with an image, category tags, equipment,
   and a duration / calories / rating stats row.
2. **Workout detail pages** (`/workouts/[id]`) — a two-column layout with
   a large image, a key-specs panel, numbered instructions, and actions
   to add the lift to today's plan or save it for later.
3. **My Plan page** (`/my-plan`) — tabbed *Today's Plan* / *Saved* views,
   a live metrics summary (exercises, minutes, calories), a 5-lift daily
   cap, and per-card actions to view details, mark a lift done, or
   remove it.
4. **Live navbar badges & toasts** — the Plan/Saved counters in the navbar
   update instantly as you add or remove lifts, and every action fires a
   toast notification.
5. **Sort dropdown** — re-sort the library or plan list by Duration,
   Calories, or Rating.
6. **Persistent state, loading states & 404 handling** — the plan/saved
   lists survive a page reload via `localStorage`, the home page shows a
   loading state while fetching, and unknown routes render a themed
   404 page.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or Cloudflare Pages by connecting this repo —
no extra environment variables are required since the FitLog API is
public.
