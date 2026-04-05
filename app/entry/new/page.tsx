import { DailyRitualFlow } from "@/components/ritual/daily-ritual-flow";

type NewEntryPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function NewEntryPage({ searchParams }: NewEntryPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-[calc(100vh-4rem)] pb-20">
      <DailyRitualFlow initialDate={params.date} />
    </main>
  );
}
