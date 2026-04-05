import type { DayClosure, TomorrowPlan } from "@/lib/types";

const ritualHeading = "## Dear Diary Ritual";

type ParsedRitualMarkdown = {
  body?: string;
  tomorrowPlan?: TomorrowPlan;
  closure?: DayClosure;
};

function normalizeLineEndings(value: string) {
  return value.replace(/\r\n/g, "\n");
}

function serializeParagraph(text: string) {
  return text
    .trim()
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

function serializeQuote(text: string) {
  return text
    .trim()
    .split("\n")
    .map((line) => `> ${line.trimEnd()}`)
    .join("\n");
}

function extractSection(source: string, heading: string) {
  const expression = new RegExp(`^#### ${escapeForRegExp(heading)}\\n([\\s\\S]*?)(?=\\n#### |\\n### |$)`, "m");
  const match = source.match(expression);
  return match?.[1]?.trim();
}

function stripQuotePrefix(text: string) {
  return text
    .replace(/^>\s?/gm, "")
    .trim();
}

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parsePriorities(section?: string) {
  if (!section) {
    return undefined;
  }

  const priorities = section
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.match(/^\d+\.\s+(.*)$/)?.[1]?.trim() ?? "")
    .filter(Boolean);

  return priorities.length > 0 ? priorities : undefined;
}

function parseTomorrowPlan(source: string): TomorrowPlan | undefined {
  const tomorrowMatch = source.match(/^### Tomorrow\n([\s\S]*?)(?=\n### |$)/m);

  if (!tomorrowMatch) {
    return undefined;
  }

  const section = tomorrowMatch[1];
  const priorities = parsePriorities(extractSection(section, "What matters most tomorrow"));
  const intentionSection = extractSection(section, "How I want to feel");
  const noteSection = extractSection(section, "A note for tomorrow me");

  if (!priorities && !intentionSection && !noteSection) {
    return undefined;
  }

  return {
    priorities,
    intention: intentionSection ? stripQuotePrefix(intentionSection) : undefined,
    note: noteSection ? stripQuotePrefix(noteSection) : undefined
  };
}

function parseClosure(source: string): DayClosure | undefined {
  const closureMatch = source.match(/^### Closing the Day\n([\s\S]*?)$/m);

  if (!closureMatch) {
    return undefined;
  }

  const section = closureMatch[1];
  const summarySection = extractSection(section, "Today felt");
  const carryForwardSection = extractSection(section, "What I am carrying into tomorrow");
  const releaseSection = extractSection(section, "What I am leaving behind tonight");
  const finalNoteSection = extractSection(section, "A quiet note to myself");

  if (!summarySection && !carryForwardSection && !releaseSection && !finalNoteSection) {
    return undefined;
  }

  return {
    summary: summarySection ? stripQuotePrefix(summarySection) : undefined,
    carryForward: carryForwardSection ? serializeParagraph(stripQuotePrefix(carryForwardSection)) : undefined,
    release: releaseSection ? serializeParagraph(stripQuotePrefix(releaseSection)) : undefined,
    finalNote: finalNoteSection ? stripQuotePrefix(finalNoteSection) : undefined
  };
}

export function buildRitualMarkdown({
  tomorrowPlan,
  closure
}: {
  tomorrowPlan?: TomorrowPlan;
  closure?: DayClosure;
}) {
  const sections: string[] = [];

  if (tomorrowPlan) {
    const tomorrowParts = ["### Tomorrow"];

    if (tomorrowPlan.priorities && tomorrowPlan.priorities.length > 0) {
      tomorrowParts.push("#### What matters most tomorrow");
      tomorrowParts.push(tomorrowPlan.priorities.map((priority, index) => `${index + 1}. ${priority}`).join("\n"));
    }

    if (tomorrowPlan.intention) {
      tomorrowParts.push("#### How I want to feel");
      tomorrowParts.push(serializeQuote(tomorrowPlan.intention));
    }

    if (tomorrowPlan.note) {
      tomorrowParts.push("#### A note for tomorrow me");
      tomorrowParts.push(serializeQuote(tomorrowPlan.note));
    }

    sections.push(tomorrowParts.join("\n\n"));
  }

  if (closure) {
    const closingParts = ["### Closing the Day"];

    if (closure.summary) {
      closingParts.push("#### Today felt");
      closingParts.push(serializeQuote(closure.summary));
    }

    if (closure.carryForward) {
      closingParts.push("#### What I am carrying into tomorrow");
      closingParts.push(serializeParagraph(closure.carryForward));
    }

    if (closure.release) {
      closingParts.push("#### What I am leaving behind tonight");
      closingParts.push(serializeParagraph(closure.release));
    }

    if (closure.finalNote) {
      closingParts.push("#### A quiet note to myself");
      closingParts.push(serializeQuote(closure.finalNote));
    }

    sections.push(closingParts.join("\n\n"));
  }

  if (sections.length === 0) {
    return "";
  }

  return ["---", ritualHeading, ...sections].join("\n\n");
}

export function appendRitualMarkdown({
  body,
  tomorrowPlan,
  closure
}: {
  body: string;
  tomorrowPlan?: TomorrowPlan;
  closure?: DayClosure;
}) {
  const ritualMarkdown = buildRitualMarkdown({ tomorrowPlan, closure });

  if (!ritualMarkdown) {
    return body;
  }

  const trimmedBody = body.trimEnd();
  return trimmedBody.length > 0 ? `${trimmedBody}\n\n${ritualMarkdown}` : ritualMarkdown;
}

export function extractRitualMarkdown(markdown?: string): ParsedRitualMarkdown {
  if (!markdown) {
    return {};
  }

  const normalized = normalizeLineEndings(markdown);
  const footerExpression = new RegExp(`(?:\\n\\n---\\n\\n)?${escapeForRegExp(ritualHeading)}\\n[\\s\\S]*$`, "m");
  const footerMatch = normalized.match(footerExpression);

  if (!footerMatch || footerMatch.index === undefined) {
    return {
      body: normalized.trimEnd() || undefined
    };
  }

  const ritualBlock = footerMatch[0].replace(/^(?:\n\n)?---\n\n/, "").trim();
  const body = normalized.slice(0, footerMatch.index).trimEnd() || undefined;

  return {
    body,
    tomorrowPlan: parseTomorrowPlan(ritualBlock),
    closure: parseClosure(ritualBlock)
  };
}
