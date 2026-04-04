"use client";

type FilterBarProps = {
  moods: string[];
  tags: string[];
  selectedMood: string;
  selectedTag: string;
  onMoodChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onClear: () => void;
};

export function FilterBar({
  moods,
  tags,
  selectedMood,
  selectedTag,
  onMoodChange,
  onTagChange,
  onClear
}: FilterBarProps) {
  return (
    <div className="grid gap-4 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] p-4 shadow-[var(--shadow-card)] md:grid-cols-[1fr_1fr_auto] md:p-5">
      <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
        <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Mood</span>
        <select
          value={selectedMood}
          onChange={(event) => onMoodChange(event.target.value)}
          className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
        >
          <option value="">All moods</option>
          {moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
        <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Tag</span>
        <select
          value={selectedTag}
          onChange={(event) => onTagChange(event.target.value)}
          className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
        >
          <option value="">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={onClear}
        className="rounded-[var(--radius-md)] border border-[var(--border-soft)] px-4 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface-secondary)] md:self-end"
      >
        Clear filters
      </button>
    </div>
  );
}
