"use client";

import type { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Badge, Card, Toggle } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import {
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

interface ProviderStats {
  total?: number;
  connected?: number;
  error?: number;
  errorCode?: string | null;
  errorTime?: string | null;
  allDisabled?: boolean;
  expiryStatus?: "expired" | "expiring_soon" | string | null;
}

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
  };
  stats: ProviderStats;
  authType?: string;
  onToggle: (active: boolean) => void;
}

const DOT_COLORS: Record<string, string> = {
  free: "bg-green-500",
  oauth: "bg-blue-500",
  apikey: "bg-amber-500",
  compatible: "bg-orange-500",
  "web-cookie": "bg-purple-500",
  search: "bg-teal-500",
  audio: "bg-rose-500",
  local: "bg-emerald-500",
  "upstream-proxy": "bg-indigo-500",
};

function getStatusDisplay(
  connected: number,
  error: number,
  errorCode: string | null | undefined,
  t: ReturnType<typeof useTranslations>
) {
  const parts: ReactNode[] = [];
  if (connected > 0) {
    parts.push(
      <Badge key="connected" variant="success" size="sm" dot>
        {t("connected", { count: connected })}
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
  const connected = Number(stats.connected || 0);
  const error = Number(stats.error || 0);
  const allDisabled = Boolean(stats.allDisabled);
  const isCompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isAnthropicCompatible = isAnthropicCompatibleProvider(providerId) && !isCcCompatible;

  const dotLabels: Record<string, string> = {
    free: tc("free"),
    oauth: t("oauthLabel"),
    apikey: t("apiKeyLabel"),
    compatible: t("compatibleLabel"),
    "web-cookie": t("webCookieProviders"),
    search: t("searchProvidersHeading"),
    audio: t("audioProvidersHeading"),
    local: t("localProviders"),
    "upstream-proxy": t("upstreamProxyProviders"),
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
    <Link href={`/dashboard/providers/${providerId}`} className="group">
      <Card
        padding="xs"
        className={`h-full hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer ${
          allDisabled ? "opacity-50" : ""
        } ${provider.deprecated ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div
              className="size-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${provider.color || "#64748b"}15` }}
            >
              {staticIconPath ? (
                <Image
                  src={staticIconPath}
                  alt={provider.name}
                  width={30}
                  height={30}
                  className="object-contain rounded-lg max-w-[30px] max-h-[30px]"
                  sizes="30px"
                />
              ) : (
                <ProviderIcon providerId={provider.id || providerId} size={28} type="color" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold flex items-center gap-1.5 truncate">
                <span className={provider.deprecated ? "line-through opacity-60" : ""}>
                  {provider.name}
                </span>
                {provider.deprecated && (
                  <Badge
                    variant="default"
                    size="sm"
                    title={provider.deprecationReason || t("deprecatedProvider")}
                  >
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">block</span>
                      {t("deprecated")}
                    </span>
                  </Badge>
                )}
                <span
                  className={`size-2 rounded-full ${DOT_COLORS[authType] || DOT_COLORS.apikey} shrink-0`}
                  title={dotLabels[authType] || t("apiKeyLabel")}
                />
              </h3>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {allDisabled ? (
                  <Badge variant="default" size="sm">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">pause_circle</span>
                      {t("disabled")}
                    </span>
                  </Badge>
                ) : (
                  <>
                    {getStatusDisplay(connected, error, stats.errorCode, t)}
                    {(authType === "free" || provider.hasFree === true) && (
                      <Badge
                        variant="success"
                        size="sm"
                        title={provider.freeNote || t("freeTierAvailable")}
                      >
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">redeem</span>
                          {t("freeTier")}
                        </span>
                      </Badge>
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
                    {isCompatible && (
                      <Badge variant="default" size="sm">
                        {provider.apiType === "responses" ? t("responses") : t("chat")}
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
                    {stats.errorTime && (
                      <span className="text-text-muted">* {stats.errorTime}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {Number(stats.total || 0) > 0 && (
              <div onClick={handleToggle}>
                <Toggle
                  size="sm"
                  checked={!allDisabled}
                  onChange={() => {}}
                  title={allDisabled ? t("enableProvider") : t("disableProvider")}
                />
              </div>
            )}
            <span className="material-symbols-outlined text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              chevron_right
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
