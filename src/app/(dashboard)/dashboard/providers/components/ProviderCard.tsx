"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Badge, Card, Modal, Toggle } from "@/shared/components";
import ProviderTestSlideOver from "@/shared/components/ProviderTestSlideOver";
import ProviderIcon from "@/shared/components/ProviderIcon";
import {
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

import { CategoryDot } from "./CategoryDot";
import { isCheaperInferenceProviderId, isKimiPartnerProviderId } from "../featuredProviders";
import { useOpenRouterProviderStat } from "../context/openRouterProviderStatsContext";

interface ProviderStats {
  total?: number;
  connected?: number;
  error?: number;
  warning?: number;
  /** Highest failure count among currently "warning" api keys (#10261 — sanitized,
   * never the raw upstream error text). */
  warningMaxFailures?: number;
  /** Pre-formatted relative time (e.g. "3h ago") of the most recent warning-key
   * failure, computed by the caller via `getRelativeTime()` (#10261). */
  warningLastFailureRelative?: string | null;
  errorCode?: string | null;
  errorTime?: string | null;
  allDisabled?: boolean;
  expiryStatus?: "expired" | "expiring_soon" | string | null;
  codexServiceTier?: "default" | "priority" | "flex" | null;
}

const KIND_LABEL_KEYS: Record<string, { key: string; fallback: string }> = {
  llm: { key: "serviceKindChat", fallback: "Chat" },
  embedding: { key: "serviceKindEmbedding", fallback: "Embed" },
  image: { key: "serviceKindImage", fallback: "Image" },
  imageToText: { key: "serviceKindImageToText", fallback: "I→T" },
  tts: { key: "serviceKindTts", fallback: "TTS" },
  stt: { key: "serviceKindStt", fallback: "STT" },
  webSearch: { key: "serviceKindWebSearch", fallback: "Search" },
  webFetch: { key: "serviceKindWebFetch", fallback: "Fetch" },
  video: { key: "serviceKindVideo", fallback: "Video" },
  music: { key: "serviceKindMusic", fallback: "Music" },
};

/** Maps a compatible-provider `apiType` to its `KIND_LABEL` key (#6936: non-chat
 * apiTypes — audio/embeddings/image — were falling through to the "Chat" badge). */
const COMPATIBLE_API_TYPE_KIND: Record<string, string> = {
  "audio-transcriptions": "stt",
  "audio-speech": "tts",
  "images-generations": "image",
  embeddings: "embedding",
};

interface ProviderCardProps {
  providerId: string;
  provider: {
    id?: string;
    name: string;
    color?: string;
    apiType?: string;
    deprecated?: boolean;
    deprecationReason?: string;
    hasFree?: boolean;
    freeNote?: string;
    subscriptionRisk?: boolean;
    /** Which risk copy variant to show in the details dialog (#10261). Falls back
     * to "oauth" when absent — mirrors `ProviderModalsPanel`'s default. */
    riskNoticeVariant?: "oauth" | "webCookie" | "deprecated" | "embedded-service";
    /** Declared service kinds — "llm" enables the inline Test button */
    serviceKinds?: string[];
    /** Optional operator-supplied remote icon URL (#2166) for compatible provider nodes. */
    iconUrl?: string;
    /** Short text-badge fallback (e.g. "OC"/"AC"/"CC") shown if `iconUrl` fails to load. */
    textIcon?: string;
  };
  stats: ProviderStats;
  authType?: string;
  onToggle: (active: boolean) => void;
  onCardClick?: (id: string) => void;
}

const DOT_COLORS: Record<string, string> = {
  free: "bg-green-500",
  "no-auth": "bg-stone-500",
  oauth: "bg-blue-500",
  apikey: "bg-amber-500",
  compatible: "bg-orange-500",
  "web-cookie": "bg-purple-500",
  search: "bg-teal-500",
  audio: "bg-rose-500",
  local: "bg-emerald-500",
  "upstream-proxy": "bg-indigo-500",
  "cloud-agent": "bg-violet-500",
};

type ProviderMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

interface WarningBadgeDetails {
  warningMaxFailures: number;
  warningLastFailureRelative: string | null;
  onActivate: () => void;
}

/** #10261 — the warning-count badge previously had no `title` (no reasons exposed)
 * and no click affordance, even though the reasons already exist in
 * `providerSpecificData.apiKeyHealth[]`. Renders a keyboard- and pointer-
 * interactive wrapper around the Badge that exposes a sanitized reasons summary
 * (never raw upstream error text — Hard Rule #12) and navigates to the
 * connection-health view on activation. */
function WarningBadge({
  count,
  t,
  details,
}: {
  count: number;
  t: ReturnType<typeof useTranslations>;
  details: WarningBadgeDetails;
}) {
  const lastFailureSuffix = details.warningLastFailureRelative
    ? providerText(t, "warningNotice.lastFailureSuffix", " (last failure {time})", {
        time: details.warningLastFailureRelative,
      })
    : "";
  const tooltip = providerText(
    t,
    "warningNotice.tooltip",
    "{count} connection(s) flagged — up to {maxFailures} recent failures{lastFailureSuffix}. Click to view connection health.",
    {
      count,
      maxFailures: details.warningMaxFailures,
      lastFailureSuffix,
    }
  );
  const ariaLabel = providerText(
    t,
    "warningNotice.ariaLabel",
    "View connection health details, {count} warning(s)",
    {
      count,
    }
  );

  const activate = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    details.onActivate();
  };

  return (
    <span
      role="button"
      tabIndex={0}
      title={tooltip}
      aria-label={ariaLabel}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") activate(e);
      }}
      className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <Badge variant="warning" size="sm" icon="warning">
        {t("warningCount", { count })}
      </Badge>
    </span>
  );
}

function getStatusDisplay(
  connected: number,
  error: number,
  warning: number,
  errorCode: string | null | undefined,
  t: ReturnType<typeof useTranslations>,
  afterConnected?: ReactNode,
  warningDetails?: WarningBadgeDetails
) {
  const parts: ReactNode[] = [];
  if (connected > 0) {
    parts.push(
      <Badge key="connected" variant="success" size="sm" dot>
        {t("connected", { count: connected })}
      </Badge>
    );
    if (afterConnected) parts.push(afterConnected);
  }
  if (warning > 0) {
    parts.push(
      warningDetails ? (
        <WarningBadge key="warning" count={warning} t={t} details={warningDetails} />
      ) : (
        <Badge key="warning" variant="warning" size="sm" dot>
          {t("warningCount", { count: warning })}
        </Badge>
      )
    );
  }
  if (error > 0) {
    const errText = errorCode
      ? t("errorCount", { count: error, code: errorCode })
      : t("errorCountNoCode", { count: error });
    parts.push(
      <Badge key="error" variant="error" size="sm" dot>
        {errText}
      </Badge>
    );
  }
  if (parts.length === 0) {
    return <span className="text-text-muted">{t("noConnections")}</span>;
  }
  return parts;
}

export type ProviderCardHandle = {
  highlight: () => void;
  getProviderId(): string;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
};

const ProviderCard = forwardRef<ProviderCardHandle, ProviderCardProps>(function ProviderCard(
  { providerId, provider, stats, authType = "apikey", onToggle, onCardClick },
  ref
) {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const tp = useTranslations("miniPlayground");
  const router = useRouter();
  const kindLabel = (kind: string) => {
    const entry = KIND_LABEL_KEYS[kind];
    return entry ? providerText(t, entry.key, entry.fallback) : kind;
  };
  const [testExpanded, setTestExpanded] = useState<boolean>(false);
  const [riskDetailsOpen, setRiskDetailsOpen] = useState<boolean>(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const linkElementRef = useRef<HTMLAnchorElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      getProviderId() {
        return providerId;
      },
      highlight() {
        const el = innerRef.current;
        if (!el) return;
        linkElementRef.current?.focus();
        const surface = linkElementRef.current?.firstElementChild;
        surface?.animate(
          [
            { backgroundColor: "rgba(59,130,246,0.22)" },
            { backgroundColor: "rgba(59,130,246,0.08)" },
            { backgroundColor: "transparent" },
          ],
          { duration: 3000, easing: "ease-in-out" }
        );
      },
      scrollIntoView() {
        const el = innerRef.current;
        if (!el) return;
        el.scrollIntoView({ behavior: "auto", block: "center" });
      },
    }),
    [providerId, innerRef, linkElementRef]
  );

  // Show the Test button for LLM providers (when serviceKinds includes "llm"
  // OR when the provider has no explicit serviceKinds but is a regular LLM provider
  // i.e. not a search/audio/cloud-agent type).
  const serviceKinds = provider.serviceKinds ?? [];
  const isLlmProvider =
    serviceKinds.includes("llm") ||
    (serviceKinds.length === 0 &&
      authType !== "search" &&
      authType !== "audio" &&
      authType !== "cloud-agent" &&
      authType !== "upstream-proxy" &&
      authType !== "no-auth");

  const handleTestClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setTestExpanded((v) => !v);
  };
  const handleRiskIndicatorActivate = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRiskDetailsOpen(true);
  };
  const handleWarningBadgeActivate = useCallback(() => {
    router.push(`/dashboard/providers/${providerId}`);
  }, [router, providerId]);
  const connected = Number(stats.connected || 0);
  const error = Number(stats.error || 0);
  const allDisabled = Boolean(stats.allDisabled);
  const isCompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isAnthropicCompatible = isAnthropicCompatibleProvider(providerId) && !isCcCompatible;
  // Open Source Friend highlights (Kimi 2026-07, Cheaper Inference 2026-07): UI-only
  // accents, see featuredProviders.ts — never affect routing/fallback order.
  const isKimiPartner = isKimiPartnerProviderId(provider.id || providerId);
  const isCheaperInferencePartner = isCheaperInferenceProviderId(provider.id || providerId);
  const isSponsorPartner = isKimiPartner || isCheaperInferencePartner;
  const openRouterStat = useOpenRouterProviderStat(provider.id || providerId);
  const codexServiceTierLabel =
    stats.codexServiceTier === "flex"
      ? providerText(t, "codexTierFlexLabel", "Flex")
      : providerText(t, "codexTierFastLabel", "Fast");
  const codexServiceTierChip =
    providerId === "codex" && stats.codexServiceTier && stats.codexServiceTier !== "default" ? (
      <span
        key="codex-service-tier"
        className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide ${
          stats.codexServiceTier === "flex"
            ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
            : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
        }`}
        title={providerText(t, "codexServiceTierActive", "Codex {tier} service tier is active", {
          tier: codexServiceTierLabel,
        })}
      >
        <span className="material-symbols-outlined text-[10px] leading-none">
          {stats.codexServiceTier === "flex" ? "speed" : "bolt"}
        </span>
        {codexServiceTierLabel}
      </span>
    ) : null;

  // Kimi (Moonshot AI) official-partnership badge — literal brand-blue Tailwind
  // arbitrary values must stay in sync with KIMI_BRAND_COLOR (featuredProviders.ts).
  const kimiOfficialSupporterChip = isKimiPartner ? (
    <span
      key="kimi-official-supporter"
      className="inline-flex items-center gap-0.5 rounded-full border border-[#1783FF]/30 bg-[#1783FF]/10 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide leading-none text-[#1067CC] dark:text-[#7CB8FF]"
      title={providerText(
        t,
        "kimiOfficialSupporterTooltip",
        "Kimi (Moonshot AI) is OmniRoute's founding Open Source Friend"
      )}
    >
      <span className="material-symbols-outlined text-[10px] leading-none">verified</span>
      {providerText(t, "kimiOfficialSupporterBadge", "Founding Friend")}
    </span>
  ) : null;

  // Cheaper Inference Open Source Friend badge — brand green (#31f889) with a dark
  // foreground (the green is too bright for white text). Literal Tailwind arbitrary
  // values must stay in sync with CHEAPERINFERENCE_BRAND_COLOR (featuredProviders.ts).
  const cheaperInferenceSupporterChip = isCheaperInferencePartner ? (
    <span
      key="cheaperinference-supporter"
      className="inline-flex items-center gap-0.5 rounded-full border border-[#31f889]/40 bg-[#31f889]/15 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide leading-none text-[#0b7a45] dark:text-[#5CF0A6]"
      title={providerText(
        t,
        "cheaperInferenceSupporterTooltip",
        "Cheaper Inference backs OmniRoute as an Open Source Friend"
      )}
    >
      <span className="material-symbols-outlined text-[10px] leading-none">verified</span>
      {providerText(t, "cheaperInferenceSupporterBadge", "Open Source Friend")}
    </span>
  ) : null;

  const openRouterTooltipBits: string[] = [];
  if (openRouterStat?.headquarters)
    openRouterTooltipBits.push(`HQ: ${openRouterStat.headquarters}`);
  if (openRouterStat?.dataPolicy?.training === false) {
    openRouterTooltipBits.push(
      providerText(t, "openRouterNoTraining", "Does not train on prompts")
    );
  }
  if (openRouterStat?.dataPolicy?.retainsPrompts === false) {
    openRouterTooltipBits.push(providerText(t, "openRouterNoRetention", "Does not retain prompts"));
  }
  const openRouterTooltip = openRouterStat
    ? providerText(t, "openRouterPopularityTooltip", "OpenRouter usage rank #{rank}", {
        rank: openRouterStat.popularityRank,
      }) + (openRouterTooltipBits.length ? ` — ${openRouterTooltipBits.join(" · ")}` : "")
    : "";

  // OpenRouter popularity badge — data refreshed daily from OpenRouter's
  // provider directory + usage rankings (see src/lib/catalog/openrouterProviderStats.ts).
  // Absent entirely for providers OpenRouter doesn't track; never affects routing.
  const openRouterPopularityChip = openRouterStat ? (
    <span
      key="openrouter-popularity"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-bg-subtle px-1.5 py-0 text-[9px] font-semibold leading-none text-text-muted"
      title={openRouterTooltip}
    >
      <span className="material-symbols-outlined text-[10px] leading-none">trending_up</span>
      {providerText(t, "openRouterPopularityBadge", "OR #{rank}", {
        rank: openRouterStat.popularityRank,
      })}
    </span>
  ) : null;

  const dotLabels: Record<string, string> = {
    free: tc("free"),
    "no-auth": t("noAuthLabel"),
    oauth: t("oauthLabel"),
    apikey: t("apiKeyLabel"),
    compatible: t("compatibleLabel"),
    "web-cookie": t("webCookieProviders"),
    search: t("searchProvidersHeading"),
    audio: t("audioProvidersHeading"),
    local: t("localProviders"),
    "upstream-proxy": t("upstreamProxyProviders"),
    "cloud-agent": t("cloudAgentProviders"),
  };

  const staticIconPath = (() => {
    if (isCompatible || isAnthropicCompatible || isCcCompatible) {
      return "/providers/cli-generic.svg";
    }
    return null;
  })();

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle(allDisabled);
  };

  const handleCardClick = useCallback(() => {
    onCardClick?.(providerId);
  }, [onCardClick, providerId]);

  return (
    <div ref={innerRef} id={`provider-${providerId}`} className="flex flex-col h-full">
      <Link
        ref={linkElementRef}
        href={`/dashboard/providers/${providerId}`}
        className="group flex-1 flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
        onClick={handleCardClick}
      >
        <Card
          padding="xs"
          className={`h-full flex flex-col hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer ${
            isKimiPartner
              ? // Kimi (Moonshot AI) official-partnership accent — official Kimi blue
                // (#1783FF) border (2px, clearly legible) + a subtle whole-card tint
                // (inset shadow — avoids clobbering Card's own bg-surface via
                // twMerge) + soft outer glow. Kept identical in light/dark since it
                // is a raw (non-token) brand hex, not a theme color. Keep the hex in
                // sync with KIMI_BRAND_COLOR (featuredProviders.ts).
                "border-2 border-[#1783FF]/70 hover:border-[#1783FF]/90 shadow-[inset_0_0_0_100px_rgba(23,131,255,0.035),0_4px_16px_-4px_rgba(23,131,255,0.45)]"
              : isCheaperInferencePartner
                ? // Cheaper Inference Open Source Friend accent — same construction in
                  // its brand green (#31f889 = rgb(49,248,137)). Keep in sync with
                  // CHEAPERINFERENCE_BRAND_COLOR (featuredProviders.ts).
                  "border-2 border-[#31f889]/70 hover:border-[#31f889]/90 shadow-[inset_0_0_0_100px_rgba(49,248,137,0.035),0_4px_16px_-4px_rgba(49,248,137,0.45)]"
                : "hover:border-primary/40"
          } ${allDisabled ? "opacity-50" : ""} ${provider.deprecated ? "opacity-60" : ""}`}
        >
          <div className="flex flex-col gap-2 h-full">
            {/* Row 1 — Identity: icon + full name + risk/category indicators */}
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="size-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${provider.color || "#64748b"}15` }}
              >
                {provider.iconUrl ? (
                  <ProviderIcon
                    providerId={provider.id || providerId}
                    src={provider.iconUrl}
                    alt={provider.name}
                    size={26}
                    className="max-h-[26px] max-w-[26px] rounded-lg object-contain"
                    fallbackText={provider.textIcon}
                    fallbackColor={provider.color}
                  />
                ) : staticIconPath ? (
                  <Image
                    src={staticIconPath}
                    alt={provider.name}
                    width={26}
                    height={26}
                    className="object-contain rounded-lg max-w-[26px] max-h-[26px]"
                    sizes="26px"
                  />
                ) : (
                  <ProviderIcon providerId={provider.id || providerId} size={24} type="color" />
                )}
              </div>
              <h3 className="text-sm font-semibold leading-snug flex-1 min-w-0">
                <span
                  className={`block break-words ${provider.deprecated ? "line-through opacity-60" : ""}`}
                  title={provider.name}
                >
                  {provider.name}
                </span>
              </h3>
              <div className="flex items-center gap-1 shrink-0 pt-0.5">
                {provider.deprecated && (
                  <span
                    className="material-symbols-outlined text-[16px] leading-none text-text-muted"
                    title={provider.deprecationReason || t("deprecatedProvider")}
                    aria-label={t("deprecated")}
                  >
                    block
                  </span>
                )}
                {provider.subscriptionRisk === true && (
                  <button
                    type="button"
                    className="material-symbols-outlined text-[16px] leading-none text-amber-500 underline decoration-dotted decoration-1 underline-offset-2 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60 transition-colors"
                    title={t("riskNotice.tooltip")}
                    aria-label={t("riskNotice.tooltip")}
                    aria-haspopup="dialog"
                    onClick={handleRiskIndicatorActivate}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleRiskIndicatorActivate(e);
                    }}
                  >
                    info
                  </button>
                )}
                <CategoryDot
                  color={DOT_COLORS[authType] || DOT_COLORS.apikey}
                  hasFree={provider.hasFree === true}
                  label={dotLabels[authType] || t("apiKeyLabel")}
                  freeLabel={t("hasFreeTooltip")}
                />
              </div>
            </div>

            {/* Row 2 — Capabilities: service-kind chips + compatibility badges (deprecated shown as block icon in Row 1 header). Rendered only when content exists. */}
            {((provider.serviceKinds && provider.serviceKinds.length > 0) ||
              isCompatible ||
              isCcCompatible ||
              isAnthropicCompatible ||
              isSponsorPartner ||
              Boolean(openRouterStat)) && (
              <div className="flex flex-wrap items-center gap-1">
                {kimiOfficialSupporterChip}
                {cheaperInferenceSupporterChip}
                {openRouterPopularityChip}
                {provider.serviceKinds?.map((k) => (
                  <span
                    key={k}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-bg-subtle border border-border text-text-muted leading-none"
                  >
                    {kindLabel(k)}
                  </span>
                ))}
                {isCompatible && (
                  <Badge variant="default" size="sm">
                    {provider.apiType === "responses"
                      ? t("responses")
                      : kindLabel(COMPATIBLE_API_TYPE_KIND[provider.apiType ?? ""] ?? "") ||
                        t("chat")}
                  </Badge>
                )}
                {isCcCompatible && (
                  <Badge variant="default" size="sm">
                    CC
                  </Badge>
                )}
                {isAnthropicCompatible && (
                  <Badge variant="default" size="sm">
                    {t("messages")}
                  </Badge>
                )}
              </div>
            )}

            {/* Row 3 — Footer: connection status + controls (toggle, test) */}
            <div className="flex items-center justify-between gap-2 mt-auto pt-1.5 border-t border-border/40">
              <div className="flex items-center gap-1.5 text-xs flex-nowrap min-w-0 overflow-hidden">
                {allDisabled ? (
                  <Badge variant="default" size="sm">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">pause_circle</span>
                      {t("disabled")}
                    </span>
                  </Badge>
                ) : (
                  <>
                    {getStatusDisplay(
                      connected,
                      error,
                      Number(stats.warning || 0),
                      stats.errorCode,
                      t,
                      codexServiceTierChip,
                      Number(stats.warning || 0) > 0
                        ? {
                            warningMaxFailures: Number(stats.warningMaxFailures || 0),
                            warningLastFailureRelative: stats.warningLastFailureRelative ?? null,
                            onActivate: handleWarningBadgeActivate,
                          }
                        : undefined
                    )}
                    {stats.expiryStatus === "expired" && (
                      <Badge variant="error" size="sm" dot>
                        {t("expiredBadge")}
                      </Badge>
                    )}
                    {stats.expiryStatus === "expiring_soon" && (
                      <Badge variant="warning" size="sm" dot>
                        {t("expiringSoonBadge")}
                      </Badge>
                    )}
                    {stats.errorTime && (
                      <span className="text-text-muted truncate min-w-0">* {stats.errorTime}</span>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {Number(stats.total || 0) > 0 && (
                  <div onClick={handleToggle}>
                    <Toggle
                      size="xs"
                      checked={!allDisabled}
                      onChange={undefined}
                      title={allDisabled ? t("enableProvider") : t("disableProvider")}
                    />
                  </div>
                )}
                {isLlmProvider && (
                  <button
                    type="button"
                    onClick={handleTestClick}
                    title={tp("expandTest")}
                    className="inline-flex items-center gap-0.5 rounded-md border border-border bg-bg-subtle px-2 py-0.5 text-[11px] text-text-muted hover:text-text-primary hover:border-primary/30 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[11px] leading-none">
                      play_arrow
                    </span>
                    {tp("testLabel")}
                  </button>
                )}
                {!isLlmProvider && (
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    chevron_right
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
      {isLlmProvider && (
        <ProviderTestSlideOver
          isOpen={testExpanded}
          onClose={() => setTestExpanded(false)}
          providerId={providerId}
          provider={provider}
          staticIconPath={staticIconPath}
        />
      )}
      {provider.subscriptionRisk === true && (
        <Modal
          isOpen={riskDetailsOpen}
          onClose={() => setRiskDetailsOpen(false)}
          title={providerText(t, "riskNotice.detailsTitle", "Usage caveats")}
          size="sm"
        >
          <div className="flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/10 p-4">
            <span
              className="material-symbols-outlined mt-0.5 text-[22px] leading-none text-amber-500"
              aria-hidden="true"
            >
              info
            </span>
            <p className="min-w-0 whitespace-pre-line text-sm leading-6 text-text-muted">
              {t(`riskNotice.${provider.riskNoticeVariant ?? "oauth"}`)}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
});

export default ProviderCard;
