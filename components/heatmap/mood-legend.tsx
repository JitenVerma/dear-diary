import { moodOptions } from "@/lib/constants";
import { getMoodTone } from "@/lib/theme/moods";

export function MoodLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      {moodOptions.map((mood) => (
        <span
          key={mood}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] px-3 py-2 text-sm text-[var(--text-secondary)]"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: getMoodTone(mood) }}
            aria-hidden="true"
          />
          {mood}
        </span>
      ))}
    </div>
  );
}
