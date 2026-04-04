import { notFound } from "next/navigation";

import { EntryDetailView } from "@/components/entry/entry-detail-view";
import { sampleEntriesFallback } from "@/lib/constants";
import { getDiaryEntryById } from "@/lib/notion/service";

type EntryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EntryDetailPage({ params }: EntryDetailPageProps) {
  const { id } = await params;
  const sampleEntry = sampleEntriesFallback.find((entry) => entry.id === id);

  const entry = sampleEntry ?? (await getDiaryEntryById(id));

  if (!entry) {
    notFound();
  }

  return (
    <main className="pb-16 pt-10 md:pt-14">
      <EntryDetailView entry={entry} />
    </main>
  );
}
