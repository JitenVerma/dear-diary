"use client";

type MonthJumpNavProps = {
  months: Array<{
    key: string;
    label: string;
  }>;
  activeMonth?: string;
};

export function MonthJumpNav({ months, activeMonth }: MonthJumpNavProps) {
  if (months.length === 0) {
    return null;
  }

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
      {months.map((month) => {
        const isActive = month.key === activeMonth;

        return (
          <a
            key={month.key}
            href={`#month-${month.key}`}
            className={[
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition",
              isActive
                ? "border-[var(--border-default)] bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] shadow-[var(--shadow-card)]"
                : "border-[var(--border-soft)] bg-[var(--bg-surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
            ].join(" ")}
          >
            {month.label}
          </a>
        );
      })}
    </div>
  );
}
