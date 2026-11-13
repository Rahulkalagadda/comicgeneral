import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CatalogView } from "@/components/catalog/CatalogView";
import { SEED_PODCASTS } from "@/lib/api/seedData";

export default function PodcastsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogView
          title="Video Podcasts & Masterclasses"
          subtitle="Unscripted conversations and strategic breakdowns with world-class leaders. Episode 1 of every series is completely free; subsequent episodes are individually purchasable."
          contentType="podcast"
          items={SEED_PODCASTS}
        />
      </main>
      <SiteFooter />
    </>
  );
}
