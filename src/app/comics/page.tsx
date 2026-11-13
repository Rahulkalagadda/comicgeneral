import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CatalogView } from "@/components/catalog/CatalogView";
import { SEED_COMICS } from "@/lib/api/seedData";

export default function ComicsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogView
          title="Graphic Stories & Prestige Comics"
          subtitle="Cinematic sequential art and thought-provoking visual narratives. Preserving original aspect ratios with 10 free preview pages."
          contentType="comic"
          items={SEED_COMICS}
        />
      </main>
      <SiteFooter />
    </>
  );
}
