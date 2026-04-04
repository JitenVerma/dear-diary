import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { deleteLifeChapter, updateLifeChapter } from "@/lib/chapters/service";
import { lifeChapterSchema } from "@/lib/validation";

type ChapterRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: ChapterRouteContext) {
  try {
    const { id } = await context.params;
    const json = (await request.json()) as Record<string, unknown>;
    const payload = lifeChapterSchema.parse(json);

    const chapter = await updateLifeChapter(id, {
      title: payload.title,
      startDate: payload.startDate,
      endDate: payload.endDate || undefined,
      description: payload.description || undefined,
      themeColor: payload.themeColor || undefined
    });

    revalidatePath("/");
    revalidatePath("/heatmap");
    revalidatePath("/chapters");

    return NextResponse.json({ chapter });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to update chapter."
      },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, context: ChapterRouteContext) {
  try {
    const { id } = await context.params;
    await deleteLifeChapter(id);

    revalidatePath("/");
    revalidatePath("/heatmap");
    revalidatePath("/chapters");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to delete chapter."
      },
      { status: 400 }
    );
  }
}
