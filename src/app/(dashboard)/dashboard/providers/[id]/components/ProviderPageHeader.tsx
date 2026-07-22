"use client";

// Phase 1t.1 extraction — Issue #3501
import Link from "next/link";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { getHeaderIconProviderId, providerText } from "../providerPageHelpers";
import type { ProviderMessageTranslator } from "../providerPageHelpers";
import { isKimiPartnerProviderId } from "../../featuredProviders";

interface ProviderInfo {
  id: string;
  name: string;
  website?: string;
  color: string;
  apiType?: string;
  /** Optional operator-supplied remote icon URL (#2166) for compatible provider nodes. */
  iconUrl?: string;
  /** Short text-badge fallback (e.g. "OC"/"AC"/"CC") shown if `iconUrl` fails to load. */
  textIcon?: string;
}

interface ProviderPageHeaderProps {
  providerId: string;
  providerInfo: ProviderInfo;
  connectionsCount: number;
  isOpenAICompatible: boolean;
  isAnthropicProtocolCompatible: boolean;
  onOpenTutorial: () => void;
  t: ProviderMessageTranslator;
}

export default function ProviderPageHeader({
  providerId,
  providerInfo,
  connectionsCount,
  isOpenAICompatible,
  isAnthropicProtocolCompatible,
  onOpenTutorial,
  t,
}: ProviderPageHeaderProps) {
  // Kimi (Moonshot AI) official-partnership aff links (2026-07): the header
  // website link doubles as the CTA for kimi-coding/kimi-web/moonshot's
  // tracking links (see website field in oauth.ts / web-cookie.ts /
  // apikey/regional.ts) — flag it with a discreet "Partner link" note so it
  // reads as a monetized link, not just "visit provider website" like every
  // other card. UI-only — never affects routing/fallback (featuredProviders.ts).
  const isKimiPartnerLink = isKimiPartnerProviderId(providerInfo.id);
  const kimiPartnerLinkNote = providerText(
    t,
    "kimiPartnerLinkNote",
    "Partner link — supports OmniRoute at no extra cost to you"
  );

  return (
    <div>
      <Link
        href="/dashboard/providers"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-4"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        {t("backToProviders")}
      </Link>
      <div className="flex items-center gap-4">
        <div
          className="rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${providerInfo.color}15` }}
        >
          <ProviderIcon
            providerId={getHeaderIconProviderId(
              isOpenAICompatible,
              isAnthropicProtocolCompatible,
              providerInfo.id,
              providerInfo.apiType
            )}
            size={48}
            type="color"
            src={providerInfo.iconUrl}
            alt={providerInfo.name}
            fallbackText={providerInfo.textIcon}
            fallbackColor={providerInfo.color}
          />
        </div>
        <div>
          {providerInfo.website ? (
            <a
              href={providerInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl font-semibold tracking-tight hover:underline inline-flex items-center gap-2"
              style={{ color: providerInfo.color }}
              title={isKimiPartnerLink ? kimiPartnerLinkNote : undefined}
              aria-label={
                isKimiPartnerLink ? `${providerInfo.name} — ${kimiPartnerLinkNote}` : undefined
              }
            >
              {providerInfo.name}
              <span className="material-symbols-outlined text-lg opacity-60">open_in_new</span>
            </a>
          ) : (
            <h1 className="text-3xl font-semibold tracking-tight">{providerInfo.name}</h1>
          )}
          <div className="flex items-center gap-2">
            <p className="text-text-muted">
              {t("connectionCountLabel", { count: connectionsCount })}
            </p>
            {isKimiPartnerLink && providerInfo.website && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-text-muted/70">
                {kimiPartnerLinkNote}
              </span>
            )}
            {providerId === "adapta-web" && (
              <button
                onClick={onOpenTutorial}
                className="text-sm font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: providerInfo.color }}
              >
                Tutorial
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
