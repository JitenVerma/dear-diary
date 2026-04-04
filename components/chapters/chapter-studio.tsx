"use client";

import { useState } from "react";
import { BookHeart, PencilLine, Trash2 } from "lucide-react";

import { chapterThemeOptions } from "@/lib/constants";
import type { LifeChapter } from "@/lib/types";
import { formatEntryDate } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

type ChapterWithCount = LifeChapter & {
  entryCount: number;
};

type ChapterStudioProps = {
  initialChapters: ChapterWithCount[];
};

type ChapterFormState = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  themeColor: string;
};

const initialFormState: ChapterFormState = {
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  themeColor: chapterThemeOptions[0]
};

function toFormState(chapter?: ChapterWithCount): ChapterFormState {
  if (!chapter) {
    return initialFormState;
  }

  return {
    title: chapter.title,
    startDate: chapter.startDate,
    endDate: chapter.endDate ?? "",
    description: chapter.description ?? "",
    themeColor: chapter.themeColor ?? chapterThemeOptions[0]
  };
}

export function ChapterStudio({ initialChapters }: ChapterStudioProps) {
  const [chapters, setChapters] = useState(initialChapters);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ChapterFormState>(initialFormState);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function saveChapter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const requestBody = {
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      description: form.description || undefined,
      themeColor: form.themeColor || undefined
    };

    try {
      const response = await fetch(editingId ? `/api/chapters/${editingId}` : "/api/chapters", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const json = (await response.json()) as { chapter?: LifeChapter; error?: string };

      if (!response.ok || !json.chapter) {
        throw new Error(json.error ?? "The chapter could not be saved.");
      }

      const nextChapter = { ...json.chapter, entryCount: chapters.find((chapter) => chapter.id === json.chapter?.id)?.entryCount ?? 0 };

      setChapters((current) => {
        if (editingId) {
          return current.map((chapter) => (chapter.id === editingId ? nextChapter : chapter));
        }

        return [nextChapter, ...current];
      });
      setEditingId(null);
      setForm(initialFormState);
      setFeedback(editingId ? "Chapter updated." : "Chapter created.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "The chapter could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteChapter(id: string) {
    setFeedback(null);

    try {
      const response = await fetch(`/api/chapters/${id}`, { method: "DELETE" });
      const json = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(json.error ?? "The chapter could not be deleted.");
      }

      setChapters((current) => current.filter((chapter) => chapter.id !== id));

      if (editingId === id) {
        setEditingId(null);
        setForm(initialFormState);
      }

      setFeedback("Chapter removed.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "The chapter could not be deleted.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_26rem]">
        <div className="space-y-6">
          {chapters.length === 0 ? (
            <SurfaceCard className="p-8 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-tertiary)]">No chapters yet</p>
              <h2 className="mt-4 font-display text-4xl text-[var(--text-primary)]">Some parts of life deserve a name.</h2>
              <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
                Create your first chapter to mark an era and give the timeline a deeper sense of story.
              </p>
            </SurfaceCard>
          ) : (
            chapters.map((chapter) => (
              <SurfaceCard key={chapter.id} className="overflow-hidden">
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: chapter.themeColor ?? "var(--accent-sage)" }}
                  aria-hidden="true"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Life chapter</p>
                      <h2 className="mt-3 font-display text-4xl leading-none text-[var(--text-primary)]">{chapter.title}</h2>
                    </div>
                    <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      {chapter.entryCount} memories
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    {formatEntryDate(chapter.startDate)} - {chapter.endDate ? formatEntryDate(chapter.endDate) : "Ongoing"}
                  </p>

                  {chapter.description ? (
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">{chapter.description}</p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        setEditingId(chapter.id);
                        setForm(toFormState(chapter));
                      }}
                      icon={<PencilLine className="h-4 w-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => deleteChapter(chapter.id)}
                      icon={<Trash2 className="h-4 w-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </SurfaceCard>
            ))
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <SurfaceCard className="p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-surface-secondary)]">
                <BookHeart className="h-5 w-5 text-[var(--text-primary)]" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                  {editingId ? "Edit chapter" : "Create chapter"}
                </p>
                <h2 className="mt-2 font-display text-4xl leading-none text-[var(--text-primary)]">
                  {editingId ? "Refine an era" : "Name a season"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  Give a stretch of time a title, a range, and a soft tint so the timeline reads more like a life story.
                </p>
              </div>
            </div>

            <form onSubmit={saveChapter} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                  placeholder="Healing Era"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Start date</span>
                  <input
                    required
                    type="date"
                    value={form.startDate}
                    onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
                    className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                  />
                </label>

                <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">End date</span>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
                    className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Description</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                  placeholder="A quiet season of rebuilding."
                />
              </label>

              <fieldset className="grid gap-2">
                <legend className="text-sm uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Theme color</legend>
                <div className="flex flex-wrap gap-2">
                  {chapterThemeOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, themeColor: color }))}
                      className="h-10 w-10 rounded-full border-2 transition"
                      style={{
                        backgroundColor: color,
                        borderColor: form.themeColor === color ? "var(--text-primary)" : "transparent"
                      }}
                      aria-label={`Choose chapter color ${color}`}
                    />
                  ))}
                </div>
              </fieldset>

              {feedback ? (
                <p className="rounded-[var(--radius-md)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {feedback}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : editingId ? "Update chapter" : "Create chapter"}
                </Button>
                {editingId ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditingId(null);
                      setForm(initialFormState);
                    }}
                  >
                    Cancel edit
                  </Button>
                ) : null}
              </div>
            </form>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
