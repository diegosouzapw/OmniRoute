"use client";

// Phase 1t.7 extraction — Issue #3501
import { Card } from "@/shared/components";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface SearchProviderCardProps {
  providerId: string;
  t: ProviderMessageTranslator;
}

export default function SearchProviderCard({ providerId, t }: SearchProviderCardProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">{t("searchProvider")}</h2>
      <p className="text-sm text-text-muted">{t("searchProviderDesc")}</p>
      {providerId === "perplexity-search" && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <span className="material-symbols-outlined text-sm text-blue-400">link</span>
          <p className="text-xs text-blue-300">{t("perplexitySearchSharedKeyInfo")}</p>
        </div>
      )}
      {providerId === "google-pse-search" && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="material-symbols-outlined text-sm text-amber-300">tune</span>
          <p className="text-xs text-amber-200">{t("googlePseInfo")}</p>
        </div>
      )}
      {providerId === "searxng-search" && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="material-symbols-outlined text-sm text-emerald-300">dns</span>
          <p className="text-xs text-emerald-200">{t("searxngInfo")}</p>
        </div>
      )}
    </Card>
  );
}
