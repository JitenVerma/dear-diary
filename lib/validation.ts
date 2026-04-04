import { z } from "zod";

export const diaryEntrySchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(120, "Title is too long."),
  entryDate: z.string().date("Please choose a valid date."),
  mood: z.string().trim().max(50).optional().or(z.literal("")),
  tags: z
    .array(z.string().trim().min(1).max(40))
    .max(8, "Use up to 8 tags.")
    .optional(),
  body: z.string().trim().min(1, "Body is required.").max(20000, "Body is too long."),
  coverImageUrl: z.string().trim().url("Please provide a valid image URL.").optional().or(z.literal("")),
  favorite: z.boolean().optional()
});

export type DiaryEntryInput = z.infer<typeof diaryEntrySchema>;

export const lifeChapterSchema = z
  .object({
    title: z.string().trim().min(1, "A chapter title is required.").max(80, "Keep the chapter title under 80 characters."),
    startDate: z.string().date("Choose a valid start date."),
    endDate: z.string().date("Choose a valid end date.").optional().or(z.literal("")),
    description: z.string().trim().max(280, "Keep the description under 280 characters.").optional().or(z.literal("")),
    themeColor: z
      .string()
      .trim()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Choose a valid hex color.")
      .optional()
      .or(z.literal(""))
  })
  .superRefine((value, ctx) => {
    if (value.endDate && value.endDate < value.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "The chapter should end on or after it begins."
      });
    }
  });

export type LifeChapterInput = z.infer<typeof lifeChapterSchema>;
