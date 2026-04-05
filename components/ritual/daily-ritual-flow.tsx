"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CircleDot,
  HeartHandshake,
  MoonStar,
  PenLine,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  arrivalStateOptions,
  closureSummaryOptions,
  entryModeDefinitions,
  moodOptions,
  promptLibrary,
  ritualTemplates
} from "@/lib/constants";
import type { ArrivalState, DayClosure, DiaryEntryPayload, EntryMode, TomorrowPlan } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

const ritualDraftKey = "dear-diary-v3-ritual-draft";

type RitualStep = "entry" | "checkin" | "mode" | "write" | "tomorrow" | "close" | "complete";

type RitualDraft = {
  step: RitualStep;
  history: RitualStep[];
  values: RitualFormState;
};

type RitualFormState = {
  entryDate: string;
  arrivalState?: ArrivalState;
  mode?: EntryMode;
  title: string;
  body: string;
  mood: string;
  tags: string;
  tomorrowPlan: {
    priorities: [string, string, string];
    intention: string;
    note: string;
  };
  closure: {
    summary: string;
    carryForward: string;
    release: string;
    finalNote: string;
  };
};

function getLocalDateString() {
  const now = new Date();
  const offsetTime = now.getTime() - now.getTimezoneOffset() * 60_000;
  return new Date(offsetTime).toISOString().slice(0, 10);
}

const defaultDate = getLocalDateString();

function initialFormState(initialDate?: string): RitualFormState {
  return {
    entryDate: initialDate || defaultDate,
    title: "",
    body: "",
    mood: "",
    tags: "",
    tomorrowPlan: {
      priorities: ["", "", ""],
      intention: "",
      note: ""
    },
    closure: {
      summary: "",
      carryForward: "",
      release: "",
      finalNote: ""
    }
  };
}

function safeParseDraft(rawDraft: string): RitualDraft | null {
  if (!rawDraft) {
    return null;
  }

  try {
    return JSON.parse(rawDraft) as RitualDraft;
  } catch {
    return null;
  }
}

function parseTags(tags: string) {
  return [...new Set(tags.split(",").map((tag) => tag.trim()).filter(Boolean))];
}

function hasTomorrowPlan(plan: RitualFormState["tomorrowPlan"]) {
  return Boolean(plan.intention || plan.note || plan.priorities.some((item) => item.trim().length > 0));
}

function hasClosure(closure: RitualFormState["closure"]) {
  return Boolean(closure.summary || closure.carryForward || closure.release || closure.finalNote);
}

function buildPayload(values: RitualFormState): DiaryEntryPayload {
  const tomorrowPlan: TomorrowPlan | undefined = hasTomorrowPlan(values.tomorrowPlan)
    ? {
        priorities: values.tomorrowPlan.priorities.filter((item) => item.trim().length > 0),
        intention: values.tomorrowPlan.intention || undefined,
        note: values.tomorrowPlan.note || undefined
      }
    : undefined;

  const closure: DayClosure | undefined = hasClosure(values.closure)
    ? {
        summary: values.closure.summary || undefined,
        carryForward: values.closure.carryForward || undefined,
        release: values.closure.release || undefined,
        finalNote: values.closure.finalNote || undefined
      }
    : undefined;

  return {
    title: values.title || undefined,
    entryDate: values.entryDate,
    mood: values.mood || undefined,
    tags: parseTags(values.tags),
    body: values.body,
    mode: values.mode,
    arrivalState: values.arrivalState,
    tomorrowPlan,
    closure,
    favorite: false
  };
}

export function DailyRitualFlow({ initialDate }: { initialDate?: string }) {
  const reduceMotion = useReducedMotion();
  const storedDraft = useSyncExternalStore(
    () => () => undefined,
    () => (typeof window === "undefined" ? "" : window.localStorage.getItem(ritualDraftKey) ?? ""),
    () => ""
  );
  const parsedDraft = useMemo(() => safeParseDraft(storedDraft), [storedDraft]);
  const [step, setStep] = useState<RitualStep>("entry");
  const [history, setHistory] = useState<RitualStep[]>([]);
  const [values, setValues] = useState<RitualFormState>(initialFormState(initialDate));
  const [hasStarted, setHasStarted] = useState(false);
  const [promptCategory, setPromptCategory] = useState<keyof typeof promptLibrary>("Reflection");
  const [promptLibraryOpen, setPromptLibraryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completionEntryId, setCompletionEntryId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (step === "complete") {
      window.localStorage.removeItem(ritualDraftKey);
      return;
    }

    const nextDraft: RitualDraft = { step, history, values };
    window.localStorage.setItem(ritualDraftKey, JSON.stringify(nextDraft));
  }, [hasStarted, history, step, values]);

  function update<K extends keyof RitualFormState>(key: K, value: RitualFormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function goToStep(nextStep: RitualStep) {
    if (step === nextStep) {
      return;
    }

    setHistory((current) => [...current, step]);
    setStep(nextStep);
    setFeedback(null);
  }

  function goBack() {
    if (history.length === 0) {
      return;
    }

    const previousStep = history[history.length - 1];
    setHistory((current) => current.slice(0, -1));
    setStep(previousStep);
    setFeedback(null);
  }

  function startFresh() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ritualDraftKey);
    }
    setValues(initialFormState(initialDate));
    setHistory(["entry"]);
    setStep("checkin");
    setHasStarted(true);
    setFeedback(null);
    setCompletionEntryId(null);
  }

  function continueDraft() {
    if (!parsedDraft) {
      startFresh();
      return;
    }

    setValues(parsedDraft.values);
    setHistory(parsedDraft.history ?? ["entry"]);
    setStep(parsedDraft.step === "entry" ? "checkin" : parsedDraft.step);
    setHasStarted(true);
    setFeedback(null);
    setCompletionEntryId(null);
  }

  function chooseMode(mode: EntryMode) {
    setValues((current) => ({
      ...current,
      mode,
      body: current.body.trim().length === 0 ? ritualTemplates[mode] : current.body
    }));
    goToStep("write");
  }

  function appendPrompt(prompt: string) {
    setValues((current) => ({
      ...current,
      body: current.body.trim().length > 0 ? `${current.body}\n\n${prompt}\n` : `${prompt}\n`
    }));
    setPromptLibraryOpen(false);
  }

  async function submitRitual() {
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buildPayload(values))
      });

      const json = (await response.json()) as { entry?: { id: string }; error?: string };

      if (!response.ok || !json.entry) {
        throw new Error(json.error ?? "Your ritual could not be saved right now.");
      }

      setCompletionEntryId(json.entry.id);
      setHistory((current) => [...current, step]);
      setStep("complete");
      setHasStarted(true);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Your ritual could not be saved right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function modeDefinition(mode?: EntryMode) {
    return entryModeDefinitions.find((definition) => definition.mode === mode);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
          <ArrowLeft className="h-4 w-4" />
          Back to timeline
        </Link>
        {hasStarted && step !== "entry" && step !== "complete" ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            <CircleDot className="h-3.5 w-3.5" />
            Daily Ritual
          </div>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === "entry" ? (
            <RitualEntryScreen hasDraft={Boolean(parsedDraft)} onStart={startFresh} onContinue={continueDraft} />
          ) : null}

          {step === "checkin" ? (
            <FlowCard
              icon={<MoonStar className="h-5 w-5" />}
              eyebrow="Gentle Check-In"
              title="How are you arriving today?"
              description="You can name this softly, or skip and simply begin."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {arrivalStateOptions.map((option) => {
                  const selected = values.arrivalState === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => update("arrivalState", option.value)}
                      className={cn(
                        "rounded-[var(--radius-lg)] border px-4 py-4 text-left transition",
                        selected
                          ? "border-transparent bg-[color:var(--accent-peach)]/20 text-[var(--text-primary)] shadow-[var(--shadow-card)]"
                          : "border-[var(--border-soft)] bg-[var(--bg-surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <FlowActions
                primaryLabel="Continue"
                onPrimary={() => {
                  setHasStarted(true);
                  goToStep("mode");
                }}
                secondaryLabel="Skip"
                onSecondary={() => {
                  setHasStarted(true);
                  goToStep("mode");
                }}
                tertiary={
                  <Button type="button" variant="ghost" onClick={goBack}>
                    Back
                  </Button>
                }
              />
            </FlowCard>
          ) : null}

          {step === "mode" ? (
            <FlowCard
              icon={<Sparkles className="h-5 w-5" />}
              eyebrow="Choose a Mode"
              title="How do you want to use this space today?"
              description="Choose the kind of support that feels right. You can always keep it simple."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {entryModeDefinitions.map((definition) => (
                  <button
                    key={definition.mode}
                    type="button"
                    onClick={() => {
                      setHasStarted(true);
                      chooseMode(definition.mode);
                    }}
                    className="rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] p-5 text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
                  >
                    <p className="font-display text-3xl text-[var(--text-primary)]">{definition.title}</p>
                    <p className="mt-2 text-base text-[var(--text-secondary)]">{definition.description}</p>
                    <p className="mt-4 text-sm leading-7 text-[var(--text-tertiary)]">{definition.shortDescription}</p>
                  </button>
                ))}
              </div>
              <FlowActions
                primaryLabel="Continue with Free Write"
                onPrimary={() => {
                  setHasStarted(true);
                  chooseMode("free");
                }}
                tertiary={
                  <Button type="button" variant="ghost" onClick={goBack}>
                    Back
                  </Button>
                }
              />
            </FlowCard>
          ) : null}

          {step === "write" ? (
            <FlowCard
              icon={<PenLine className="h-5 w-5" />}
              eyebrow={modeDefinition(values.mode)?.title ?? "Writing"}
              title="Write what feels true."
              description="Templates are only a starting point. You can keep them, change them, or write around them."
            >
              <div className="flex flex-wrap items-center gap-3">
                {values.mode ? <Chip tone="accent">{modeDefinition(values.mode)?.title}</Chip> : null}
                {values.arrivalState ? <Chip>{arrivalStateOptions.find((option) => option.value === values.arrivalState)?.label}</Chip> : null}
                <button
                  type="button"
                  onClick={() => setPromptLibraryOpen((current) => !current)}
                  className="rounded-full border border-[var(--border-soft)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface-secondary)]"
                >
                  Need a place to start?
                </button>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="space-y-5">
                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Title (optional)</span>
                    <input
                      value={values.title}
                      onChange={(event) => update("title", event.target.value)}
                      className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-5 py-4 font-display text-4xl text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                      placeholder="A quiet title, if you want one"
                    />
                  </label>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Date</span>
                      <input
                        type="date"
                        value={values.entryDate}
                        onChange={(event) => update("entryDate", event.target.value)}
                        className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Mood</span>
                      <select
                        value={values.mood}
                        onChange={(event) => update("mood", event.target.value)}
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
                        onChange={(event) => update("tags", event.target.value)}
                        className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                        placeholder="Rest, Work, Family"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Writing space</span>
                    <textarea
                      rows={18}
                      value={values.body}
                      onChange={(event) => update("body", event.target.value)}
                      className="min-h-[26rem] rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-canvas-secondary)] px-6 py-6 text-base leading-8 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                      placeholder="There is no pressure here. Start wherever the day opens."
                    />
                  </label>
                </div>

                <AnimatePresence initial={false}>
                  {promptLibraryOpen ? (
                    <motion.aside
                      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-tertiary)]">Prompt library</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {Object.keys(promptLibrary).map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setPromptCategory(category as keyof typeof promptLibrary)}
                            className={cn(
                              "rounded-full px-3 py-2 text-sm transition",
                              promptCategory === category
                                ? "bg-[var(--bg-surface-primary)] text-[var(--text-primary)] shadow-[var(--shadow-card)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-primary)]"
                            )}
                          >
                            {category}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 space-y-3">
                        {promptLibrary[promptCategory].map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => appendPrompt(prompt)}
                            className="w-full rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] px-4 py-3 text-left text-sm leading-6 text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </motion.aside>
                  ) : (
                    <div className="hidden lg:block" />
                  )}
                </AnimatePresence>
              </div>

              {feedback ? (
                <p className="mt-4 rounded-[var(--radius-md)] bg-[color:var(--accent-rose)]/18 px-4 py-3 text-sm text-[var(--text-primary)]">
                  {feedback}
                </p>
              ) : null}

              <FlowActions
                primaryLabel="Continue"
                onPrimary={() => goToStep("tomorrow")}
                secondaryLabel="Skip to closing"
                onSecondary={() => goToStep("close")}
                tertiary={
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="ghost" onClick={goBack}>
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={values.body.trim().length === 0 || isSubmitting}
                      onClick={submitRitual}
                    >
                      {isSubmitting ? "Saving..." : "Save now"}
                    </Button>
                  </div>
                }
              />
            </FlowCard>
          ) : null}

          {step === "tomorrow" ? (
            <FlowCard
              icon={<HeartHandshake className="h-5 w-5" />}
              eyebrow="Tomorrow"
              title="Step into tomorrow gently."
              description="Keep this practical, emotional, or somewhere in between. It does not need to become a plan."
            >
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">What matters most tomorrow</p>
                  {values.tomorrowPlan.priorities.map((priority, index) => (
                    <input
                      key={index}
                      value={priority}
                      onChange={(event) =>
                        setValues((current) => {
                          const priorities = [...current.tomorrowPlan.priorities] as [string, string, string];
                          priorities[index] = event.target.value;
                          return {
                            ...current,
                            tomorrowPlan: {
                              ...current.tomorrowPlan,
                              priorities
                            }
                          };
                        })
                      }
                      className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                      placeholder={`${index + 1}.`}
                    />
                  ))}
                </div>

                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">How I want to feel</span>
                  <input
                    value={values.tomorrowPlan.intention}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        tomorrowPlan: { ...current.tomorrowPlan, intention: event.target.value }
                      }))
                    }
                    className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                    placeholder="Steady, clear, rested..."
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">A note for tomorrow me</span>
                  <textarea
                    rows={5}
                    value={values.tomorrowPlan.note}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        tomorrowPlan: { ...current.tomorrowPlan, note: event.target.value }
                      }))
                    }
                    className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-4 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                    placeholder="Something kind, practical, or reassuring."
                  />
                </label>

                <FlowActions
                  primaryLabel="Continue"
                  onPrimary={() => goToStep("close")}
                  secondaryLabel="Skip"
                  onSecondary={() => goToStep("close")}
                  tertiary={
                    <Button type="button" variant="ghost" onClick={goBack}>
                      Back
                    </Button>
                  }
                />
              </div>
            </FlowCard>
          ) : null}

          {step === "close" ? (
            <FlowCard
              icon={<BookOpenText className="h-5 w-5" />}
              eyebrow="Close the Day"
              title="Would you like to close the day?"
              description="This can be brief. It is here to help the day settle, not to demand more from you."
            >
              <div className="grid gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Today felt...</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {closureSummaryOptions.map((summary) => {
                      const selected = values.closure.summary === summary;

                      return (
                        <button
                          key={summary}
                          type="button"
                          onClick={() =>
                            setValues((current) => ({
                              ...current,
                              closure: { ...current.closure, summary }
                            }))
                          }
                          className={cn(
                            "rounded-full px-4 py-2 text-sm transition",
                            selected
                              ? "bg-[color:var(--accent-peach)]/22 text-[var(--text-primary)] shadow-[var(--shadow-card)]"
                              : "border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
                          )}
                        >
                          {summary}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">What am I carrying into tomorrow?</span>
                    <textarea
                      rows={5}
                      value={values.closure.carryForward}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          closure: { ...current.closure, carryForward: event.target.value }
                        }))
                      }
                      className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-4 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">What am I leaving behind tonight?</span>
                    <textarea
                      rows={5}
                      value={values.closure.release}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          closure: { ...current.closure, release: event.target.value }
                        }))
                      }
                      className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-4 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">A quiet note to myself</span>
                  <textarea
                    rows={4}
                    value={values.closure.finalNote}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        closure: { ...current.closure, finalNote: event.target.value }
                      }))
                    }
                    className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-4 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-peach)]"
                  />
                </label>

                {feedback ? (
                  <p className="rounded-[var(--radius-md)] bg-[color:var(--accent-rose)]/18 px-4 py-3 text-sm text-[var(--text-primary)]">
                    {feedback}
                  </p>
                ) : null}

                <FlowActions
                  primaryLabel={isSubmitting ? "Closing..." : "Close the Day"}
                  onPrimary={submitRitual}
                  secondaryLabel="Save without closing"
                  onSecondary={submitRitual}
                  primaryDisabled={values.body.trim().length === 0 || isSubmitting}
                  secondaryDisabled={values.body.trim().length === 0 || isSubmitting}
                  tertiary={
                    <Button type="button" variant="ghost" onClick={goBack}>
                      Back
                    </Button>
                  }
                />
              </div>
            </FlowCard>
          ) : null}

          {step === "complete" ? (
            <SurfaceCard className="overflow-hidden border-transparent bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent-peach)_18%,var(--bg-surface-primary)),var(--bg-surface-primary))] p-10 text-center shadow-[var(--shadow-modal)] md:p-14">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-tertiary)]">The day is complete</p>
              <h1 className="mt-4 font-display text-6xl text-[var(--text-primary)]">Take your rest.</h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                What needed to be carried is here now. What needed to be released can stay behind.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/">
                  <Button>Return to timeline</Button>
                </Link>
                {completionEntryId ? (
                  <Link href={`/entry/${completionEntryId}`}>
                    <Button variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
                      View entry
                    </Button>
                  </Link>
                ) : null}
              </div>
            </SurfaceCard>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RitualEntryScreen({
  hasDraft,
  onStart,
  onContinue
}: {
  hasDraft: boolean;
  onStart: () => void;
  onContinue: () => void;
}) {
  return (
    <SurfaceCard className="overflow-hidden border-transparent bg-[linear-gradient(180deg,var(--bg-canvas-secondary),color-mix(in_oklab,var(--accent-peach)_18%,var(--bg-canvas-primary)))] p-8 md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-tertiary)]">Dear Diary</p>
        <h1 className="mt-5 font-display text-6xl text-[var(--text-primary)] md:text-7xl">A quiet place to land.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
          Daily Ritual is a slow, guided way to arrive, reflect, release, and gently prepare for tomorrow.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button onClick={onStart}>Start Today&apos;s Ritual</Button>
          {hasDraft ? (
            <Button variant="secondary" onClick={onContinue}>
              Continue writing
            </Button>
          ) : null}
        </div>
      </div>
    </SurfaceCard>
  );
}

function FlowCard({
  icon,
  eyebrow,
  title,
  description,
  children
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <SurfaceCard className="p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">
          {icon}
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">{eyebrow}</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.98] text-[var(--text-primary)]">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">{description}</p>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </SurfaceCard>
  );
}

function FlowActions({
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  tertiary,
  primaryDisabled,
  secondaryDisabled
}: {
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  tertiary?: ReactNode;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={onPrimary} disabled={primaryDisabled}>
          {primaryLabel}
        </Button>
        {secondaryLabel && onSecondary ? (
          <Button type="button" variant="secondary" onClick={onSecondary} disabled={secondaryDisabled}>
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
      {tertiary}
    </div>
  );
}
