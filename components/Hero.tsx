import Image from 'next/image';
import { Dumbbell } from 'lucide-react';

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1312px] px-6 pt-10">
      <div className="rounded-card bg-panel border border-line px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.15em] text-accent mb-3">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display font-bold uppercase text-4xl sm:text-5xl leading-[1.05] text-white">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-black hover:brightness-95 transition"
          >
            <Dumbbell size={16} />
            Browse workouts
          </a>
        </div>
        <div className="shrink-0">
          <Image
            src="/banner.png"
            alt="Anatomical illustration of an athlete on gym equipment"
            width={280}
            height={280}
            className="w-52 sm:w-64 md:w-72 h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
