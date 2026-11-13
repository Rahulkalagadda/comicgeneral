import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-theme pb-4">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
              Legal Compliance
            </span>
            <h1 className="text-3xl font-extrabold font-heading text-primary-token mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-token mt-1">Last Updated: October 2026</p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-secondary-token leading-relaxed">
            <p>
              LeadSphere Press strictly values the intellectual discretion of our corporate and executive readers. We do not sell personal data, sell reading history to third-party ad brokers, or track individual reading behaviors for behavioral advertising.
            </p>
            <p>
              Payment data is encrypted and handled directly by PCI-DSS compliant payment gateways (Razorpay). We store only verified transaction references, cryptographic entitlement keys, and reading position markers to sync your progress.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
