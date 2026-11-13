import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CatalogView } from "@/components/catalog/CatalogView";
import { SEED_BOOKS } from "@/lib/api/seedData";

export default function BooksPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogView
          title="Executive Books & Treatises"
          subtitle="Rigorous strategic volumes on capital allocation, organizational resilience, and cognitive architecture. First 10 pages available as a free in-browser preview."
          contentType="book"
          items={SEED_BOOKS}
        />
      </main>
      <SiteFooter />
    </>
  );
}
