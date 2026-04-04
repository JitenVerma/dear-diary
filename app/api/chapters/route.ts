import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createLifeChapter, getLifeChapters } from "@/lib/chapters/service";
import { lifeChapterSchema } from "@/lib/validation";

export async function GET() {
  try {
    const chapters = await getLifeChapters();
    return NextResponse.json({ chapters });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load life chapters."
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as Record<string, unknown>;
    const payload = lifeChapterSchema.parse(json);

    const chapter = await createLifeChapter({
      title: payload.title,
      startDate: payload.startDate,
      endDate: payload.endDate || undefined,
      description: payload.description || undefined,
      themeColor: payload.themeColor || undefined
    });

    revalidatePath("/");
    revalidatePath("/heatmap");
    revalidatePath("/chapters");

    return NextResponse.json({ chapter }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create chapter."
      },
      { status: 400 }
    );
  }
}
