import { TimelineSkeleton } from "@/components/timeline/timeline-skeleton";

export default function Loading() {
  return (
    <main className="pb-16 pt-10 md:pt-14">
      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="h-72 animate-pulse rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)]" />
      </section>
      <TimelineSkeleton />
    </main>
  );
}
