import { LayoutGrid } from "lucide-react";

import { MoodHeatmapExperience } from "@/components/heatmap/mood-heatmap-experience";
import { PageHero } from "@/components/ui/page-hero";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildHeatmapDays } from "@/lib/diary/aggregations";
import { getTimelineData } from "@/lib/diary/data";

export default async function HeatmapPage() {
  const { entries } = await getTimelineData();
  const days = buildHeatmapDays(entries, 6);

  return (
    <main className="pb-16 pt-10 md:pt-14">
      <PageHero
        eyebrow="Mood Map"
        title="A quiet view of how your days have felt."
        description="The heatmap keeps time visible even when you did not write, so you can notice patterns without turning your life into a dashboard."
        aside={
          <SurfaceCard className="p-6">
            <div className="flex items-start gap-3">
              <LayoutGrid className="mt-1 h-5 w-5 text-[var(--text-primary)]" />
              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                Click a tile to open the memory drawer for that day, revisit what you wrote, and add something new if the day still has more to say.
              </p>
            </div>
          </SurfaceCard>
        }
      />
      <MoodHeatmapExperience days={days} />
    </main>
  );
}
