"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { moodOptions } from "@/lib/constants";

type NewEntryFormValues = {
  title: string;
  entryDate: string;
  mood: string;
  tags: string;
  body: string;
  coverImageUrl: string;
  favorite: boolean;
};

const today = new Date().toISOString().slice(0, 10);

const initialValues: NewEntryFormValues = {
  title: "",
  entryDate: today,
  mood: "",
  tags: "",
  body: "",
  coverImageUrl: "",
  favorite: false
};

function parseTags(input: string) {
  return [...new Set(input.split(",").map((tag) => tag.trim()).filter(Boolean))];
}

export function NewEntryForm({ initialDate }: { initialDate?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<NewEntryFormValues>({
    ...initialValues,
    entryDate: initialDate || initialValues.entryDate
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: values.title,
          entryDate: values.entryDate,
          mood: values.mood || undefined,
          tags: parseTags(values.tags),
          body: values.body,
          coverImageUrl: values.coverImageUrl || undefined,
          favorite: values.favorite
        })
      });

      const json = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(json.error ?? "Your entry could not be saved right now.");
      }

      setFeedback({ type: "success", message: "Entry saved. Returning to the timeline..." });

      startTransition(() => {
        router.push("/?created=1");
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Your entry could not be saved right now."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof NewEntryFormValues>(field: K, value: NewEntryFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] p-6 shadow-[var(--shadow-elevated)] md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] bg-[var(--bg-surface-secondary)] p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-surface-primary)]">
            <PenLine className="h-4 w-4 text-[var(--text-primary)]" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-tertiary)]">Writing space</p>
            <p className="mt-1 text-sm leading-7 text-[var(--text-secondary)]">Write what feels true. The rest can stay soft and simple.</p>
          </div>
        </div>

        <label className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={values.favorite}
            onChange={(event) => updateField("favorite", event.target.checked)}
            className="h-4 w-4 rounded border-[var(--border-default)]"
          />
          <Heart className="h-4 w-4" />
          Mark as favorite
        </label>
      </div>

      <label className="grid gap-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-tertiary)]">Title</span>
        <input
          required
          value={values.title}
          onChange={(event) => updateField("title", event.target.value)}
          className="rounded-[var(--radius-lg)] border border-transparent bg-[var(--bg-surface-secondary)] px-5 py-5 font-display text-4xl text-[var(--text-primary)] outline-none transition focus:border-[var(--border-default)]"
          placeholder="What stayed with you today?"
        />
      </label>

      <div className="grid gap-6 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
          <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Date</span>
          <input
            required
            type="date"
            value={values.entryDate}
            onChange={(event) => updateField("entryDate", event.target.value)}
            className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
          <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Mood</span>
          <select
            value={values.mood}
            onChange={(event) => updateField("mood", event.target.value)}
            className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
          >
            <option value="">Choose a mood</option>
            {moodOptions.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
          <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Tags</span>
          <input
            value={values.tags}
            onChange={(event) => updateField("tags", event.target.value)}
            className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
            placeholder="Family, Travel, Small joys"
          />
        </label>
      </div>

      <label className="grid gap-3 text-sm text-[var(--text-secondary)]">
        <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Body</span>
        <textarea
          required
          rows={16}
          value={values.body}
          onChange={(event) => updateField("body", event.target.value)}
          className="min-h-[22rem] rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-canvas-secondary)] px-6 py-6 text-base leading-8 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
          placeholder="Write freely. Dear Diary stores this content in the Notion page body as markdown."
        />
      </label>

      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
          <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Cover image URL</span>
          <input
            value={values.coverImageUrl}
            onChange={(event) => updateField("coverImageUrl", event.target.value)}
            className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
            placeholder="Optional https://..."
          />
        </label>
      </div>

      {feedback ? (
        <div
          className={[
            "rounded-[var(--radius-md)] px-4 py-3 text-sm",
            feedback.type === "success"
              ? "bg-[color:var(--accent-sage)]/18 text-[var(--text-primary)]"
              : "bg-[color:var(--accent-rose)]/18 text-[var(--text-primary)]"
          ].join(" ")}
        >
          {feedback.message}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-7 text-[var(--text-secondary)]">
          The form submits to a server route, and only the server talks to Notion.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save to Notion"}
        </Button>
      </div>
    </form>
  );
}
