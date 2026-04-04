export function TimelineSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-5 pb-20 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div className="h-72 rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)]" />
        <div className="space-y-6">
          <div className="h-28 rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)]" />
          <div className="space-y-6 rounded-[var(--radius-xl)] bg-[var(--bg-surface-primary)] p-6 shadow-[var(--shadow-card)]">
            <div className="h-10 w-48 rounded-full bg-[var(--bg-surface-secondary)]" />
            <div className="grid gap-6">
              <div className="h-64 rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)]" />
              <div className="h-64 rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)]" />
              <div className="h-64 rounded-[var(--radius-xl)] bg-[var(--bg-surface-secondary)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
