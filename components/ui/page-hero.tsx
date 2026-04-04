export function PageHero({
  eyebrow,
  title,
  description,
  aside
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
      <div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--text-tertiary)]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] text-[var(--text-primary)] md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] md:text-xl">{description}</p>
      </div>
      {aside ? <div>{aside}</div> : null}
    </section>
  );
}
