import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Feather, Compass, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-theme pb-4">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
              Editorial Heritage
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-token mt-1">
              About LeadSphere Press
            </h1>
            <p className="text-sm text-secondary-token mt-1">
              A high-calibre digital content platform built for enterprise decision makers, founders, and discerning readers.
            </p>
          </div>

          <div className="space-y-6 text-sm text-secondary-token leading-relaxed">
            <p>
              Founded on the belief that profound ideas deserve editorial dignity, LeadSphere synthesizes rigorous commercial literature, prestige graphic storytelling, and unvarnished executive masterclasses into an uncompromising browser experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-surface-primary border border-theme shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
                  <Feather className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="text-base font-bold text-primary-token">The Executive Edition</h3>
                <p className="text-xs">
                  Minimal, editorial, and tailored for CXO-level focus. A distraction-free reading canvas optimized for strategic assimilation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-primary border border-theme shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#234735] text-white flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#BE9A56]" />
                </div>
                <h3 className="text-base font-bold text-primary-token">The Jungle Edition</h3>
                <p className="text-xs">
                  An imaginative, beautifully illustrated parallel world guided by original monkey, lion, elephant, and wolf mascots representing curiosity, leadership, wisdom, and strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
