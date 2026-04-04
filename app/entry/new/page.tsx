import { NewEntryForm } from "@/components/form/new-entry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SurfaceCard } from "@/components/ui/surface-card";

type NewEntryPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function NewEntryPage({ searchParams }: NewEntryPageProps) {
  const params = await searchParams;

  return (
    <main className="pb-20 pt-10 md:pt-14">
      <PageHero
        eyebrow="New Entry"
        title="Take your time."
        description="Write what feels true. The page is warm, quiet, and patient on purpose."
        aside={
          <SurfaceCard className="p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-tertiary)]">What gets saved</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              <p>Metadata like mood, tags, and dates still live neatly in Notion.</p>
              <p>The body stays in the Notion page content, so your writing remains the center of the record.</p>
            </div>
          </SurfaceCard>
        }
      />

      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <NewEntryForm initialDate={params.date} />
      </div>
    </main>
  );
}
