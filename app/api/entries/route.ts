import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { DIARY_ENTRIES_TAG } from "@/lib/notion/client";
import { createDiaryEntry, getDiaryEntries } from "@/lib/notion/service";
import { deriveEntryTitle } from "@/lib/ritual/helpers";
import { diaryEntrySchema } from "@/lib/validation";

export async function GET() {
  try {
    const entries = await getDiaryEntries();
    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load diary entries."
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as Record<string, unknown>;
    const payload = diaryEntrySchema.parse(json);

    const entry = await createDiaryEntry({
      title: deriveEntryTitle(payload),
      entryDate: payload.entryDate,
      mood: payload.mood || undefined,
      tags: payload.tags ?? [],
      body: payload.body,
      coverImageUrl: payload.coverImageUrl || undefined,
      favorite: payload.favorite ?? false,
      mode: payload.mode,
      arrivalState: payload.arrivalState,
      tomorrowPlan: payload.tomorrowPlan
        ? {
            priorities: payload.tomorrowPlan.priorities?.filter((item) => item.trim().length > 0),
            intention: payload.tomorrowPlan.intention || undefined,
            note: payload.tomorrowPlan.note || undefined
          }
        : undefined,
      closure: payload.closure
        ? {
            summary: payload.closure.summary || undefined,
            carryForward: payload.closure.carryForward || undefined,
            release: payload.closure.release || undefined,
            finalNote: payload.closure.finalNote || undefined
          }
        : undefined
    });

    revalidateTag(DIARY_ENTRIES_TAG, "max");
    revalidatePath("/");
    revalidatePath(`/entry/${entry.id}`);
    revalidatePath("/entry/new");
    revalidatePath("/ritual");

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create diary entry.";

    return NextResponse.json(
      {
        error: message
      },
      { status: 400 }
    );
  }
}
