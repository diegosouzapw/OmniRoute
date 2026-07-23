"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Badge, Card, Toggle } from "@/shared/components";
import ProviderTestSlideOver from "@/shared/components/ProviderTestSlideOver";
import ProviderIcon from "@/shared/components/ProviderIcon";
import {
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

import { CategoryDot } from "./CategoryDot";
import { isKimiPartnerProviderId } from "../featuredProviders";

interface ProviderStats {
  total?: number;
  connected?: number;
  error?: number;
  warning?: number;
  errorCode?: string | null;
  errorTime?: string | null;
  allDisabled?: boolean;
  expiryStatus?: "expired" | "expiring_soon" | string | null;
  codexServiceTier?: "default" | "priority" | "flex" | null;
}

const KIND_LABEL: Record<string, string> = {
  llm: "Chat",
  embedding: "Embed",
  image: "Image",
  imageToText: "I→T",
  tts: "TTS",
  stt: "STT",
  webSearch: "Search",
  webFetch: "Fetch",
  video: "Video",
  music: "Music",
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

function getStatusDisplay(
  connected: number,
  error: number,
  warning: number,
  errorCode: string | null | undefined,
  t: ReturnType<typeof useTranslations>,
  afterConnected?: ReactNode
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
      <Badge key="warning" variant="warning" size="sm" dot>
        {t("warningCount", { count: warning })}
      </Badge>
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

export default function ProviderCard({
  providerId,
  provider,
  stats,
  authType = "apikey",
  onToggle,
}: ProviderCardProps) {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const tp = useTranslations("miniPlayground");
  const [testExpanded, setTestExpanded] = useState<boolean>(false);

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
  const connected = Number(stats.connected || 0);
  const error = Number(stats.error || 0);
  const allDisabled = Boolean(stats.allDisabled);
  const isCompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isAnthropicCompatible = isAnthropicCompatibleProvider(providerId) && !isCcCompatible;
  // Kimi (Moonshot AI) official-partnership highlight (2026-07): UI-only accent,
  // see featuredProviders.ts — never affects routing/fallback order.
  const isKimiPartner = isKimiPartnerProviderId(provider.id || providerId);
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
    if (isCompatible) {
      return provider.apiType === "responses" ? "/providers/oai-r.png" : "/providers/oai-cc.png";
    }
    if (isAnthropicCompatible || isCcCompatible) return "/providers/anthropic-m.png";
    return null;
  })();

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle(allDisabled);
  };

  return (
    <div className="flex flex-col h-full">
      <Link href={`/dashboard/providers/${providerId}`} className="group flex-1 flex flex-col">
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
                  <span
                    className="material-symbols-outlined text-[16px] leading-none text-amber-500"
                    title={t("riskNotice.tooltip")}
                    aria-label={t("riskNotice.tooltip")}
                  >
                    info
                  </span>
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
              isKimiPartner) && (
              <div className="flex flex-wrap items-center gap-1">
                {kimiOfficialSupporterChip}
                {provider.serviceKinds?.map((k) => (
                  <span
                    key={k}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-bg-subtle border border-border text-text-muted leading-none"
                  >
                    {KIND_LABEL[k] ?? k}
                  </span>
                ))}
                {isCompatible && (
                  <Badge variant="default" size="sm">
                    {provider.apiType === "responses"
                      ? t("responses")
                      : (KIND_LABEL[COMPATIBLE_API_TYPE_KIND[provider.apiType ?? ""] ?? ""] ??
                        t("chat"))}
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
                      codexServiceTierChip
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
                      onChange={() => {}}
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
    </div>
  );
}
