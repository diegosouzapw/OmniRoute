"use client";

// Phase 1t.1 extraction — Issue #3501
import Link from "next/link";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { getHeaderIconProviderId, providerText } from "../providerPageHelpers";
import type { ProviderMessageTranslator } from "../providerPageHelpers";
import type { ProviderNotice } from "@/lib/providers/catalog";
import { isKimiPartnerProviderId } from "../../featuredProviders";

interface ProviderInfo {
  id: string;
  name: string;
  website?: string;
  color?: string;
  apiType?: string;
  /** Optional operator-supplied remote icon URL (#2166) for compatible provider nodes. */
  iconUrl?: string;
  /** Short text-badge fallback (e.g. "OC"/"AC"/"CC") shown if `iconUrl` fails to load. */
  textIcon?: string;
  /** Optional registration/API-key URL hints rendered as links (#9270). */
  notice?: ProviderNotice;
}

interface ProviderPageHeaderProps {
  providerId: string;
  providerInfo: ProviderInfo;
  connectionsCount: number;
  isOpenAICompatible: boolean;
  isAnthropicProtocolCompatible: boolean;
  onOpenTutorial: () => void;
  t: ProviderMessageTranslator;
  /**
   * True when `providerInfo.website` was overridden with a Radar default
   * referral link (D28 — referral links / free credits), rather than the
   * static catalog `website`. Reuses the same discreet "Partner link" note
   * as the pre-existing Kimi partnership link — both are the same kind of
   * "this link supports OmniRoute" disclosure.
   */
  isReferralLink?: boolean;
}

export default function ProviderPageHeader({
  providerId,
  providerInfo,
  connectionsCount,
  isOpenAICompatible,
  isAnthropicProtocolCompatible,
  onOpenTutorial,
  t,
  isReferralLink = false,
}: ProviderPageHeaderProps) {
  // Kimi (Moonshot AI) official-partnership aff links (2026-07): the header
  // website link doubles as the CTA for kimi-coding/kimi-web/moonshot's
  // tracking links (see website field in oauth.ts / web-cookie.ts /
  // apikey/regional.ts) — flag it with a discreet "Partner link" note so it
  // reads as a monetized link, not just "visit provider website" like every
  // other card. UI-only — never affects routing/fallback (featuredProviders.ts).
  const isKimiPartnerLink = isKimiPartnerProviderId(providerInfo.id);
  // D28: any Radar-driven default referral gets the exact same discreet
  // disclosure treatment as the Kimi partner link.
  const showPartnerNote = isKimiPartnerLink || isReferralLink;
  const kimiPartnerLinkNote = providerText(
    t,
    "kimiPartnerLinkNote",
    "Partner link — supports OmniRoute at no extra cost to you"
  );

  // Resolve the API-key registration link: prefer apiKeyUrl, fall back to
  // signupUrl, hide when neither is set (#9270).
  const noticeUrl = providerInfo.notice?.apiKeyUrl || providerInfo.notice?.signupUrl;
  const apiKeyLink = noticeUrl ? (
    <a
      href={noticeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
      style={{ color: providerInfo.color }}
    >
      <span className="material-symbols-outlined text-base">open_in_new</span>
      {t("getApiKey")}
    </a>
  ) : null;

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
              title={showPartnerNote ? kimiPartnerLinkNote : undefined}
              aria-label={
                showPartnerNote ? `${providerInfo.name} — ${kimiPartnerLinkNote}` : undefined
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
            {showPartnerNote && providerInfo.website && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-text-muted/70">
                {kimiPartnerLinkNote}
              </span>
            )}
            {apiKeyLink}
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
