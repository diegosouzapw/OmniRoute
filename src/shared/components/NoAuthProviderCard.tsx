"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers/noauth";
import Card from "./Card";
import NoAuthProviderToggle from "./NoAuthProviderToggle";

interface NoAuthProviderCardProps {
  providerId?: string;
  enabled?: boolean;
  saving?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  providerProxyControl?: ReactNode;
}

export function resolveNoAuthBannerDescription(
  providerId: string | undefined,
  fallback: string
): string {
  const provider =
    providerId && providerId in NOAUTH_PROVIDERS
      ? NOAUTH_PROVIDERS[providerId as keyof typeof NOAUTH_PROVIDERS]
      : undefined;
  const requirement =
    provider && "notice" in provider && typeof provider.notice?.text === "string"
      ? provider.notice.text.trim()
      : undefined;
  return requirement ? `${fallback} ${requirement}` : fallback;
}

export default function NoAuthProviderCard({
  providerId,
  enabled = true,
  saving = false,
  onEnabledChange,
  providerProxyControl,
}: NoAuthProviderCardProps) {
  const t = useTranslations("noAuthProvider");
  const description = resolveNoAuthBannerDescription(providerId, t("description"));

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]">lock_open</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{t("title")}</p>
            <p className="text-xs text-text-muted">{description}</p>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-nowrap">
          {providerProxyControl}
          <NoAuthProviderToggle
            className="w-full justify-end sm:w-auto"
            enabled={enabled}
            saving={saving}
            onEnabledChange={onEnabledChange}
          />
        </div>
      </div>
    </Card>
  );
}
