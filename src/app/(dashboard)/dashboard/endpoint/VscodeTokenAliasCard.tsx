"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useDisplayBaseUrl } from "@/shared/hooks";
import { Card } from "@/shared/components";

type EndpointApiKeySummary = {
  id: string;
  key: string;
  rawKey?: string;
  isActive?: boolean;
};

export default function VscodeTokenAliasCard({
  className = "",
  variant = "highlight",
}: Readonly<{ className?: string; variant?: "highlight" | "catalog" }>) {
  const t = useTranslations("endpoint");
  const [cliApiKeys, setCliApiKeys] = useState<EndpointApiKeySummary[]>([]);
  const [keysLoading, setKeysLoading] = useState(true);
  const [keysError, setKeysError] = useState(false);
  const { copied, copy } = useCopyToClipboard();
  const displayBaseUrl = useDisplayBaseUrl();

  useEffect(() => {
    let cancelled = false;

    const loadCliApiKeys = async () => {
      setKeysLoading(true);
      setKeysError(false);

      try {
        const res = await fetch("/api/cli-tools/keys");
        if (!res.ok) {
          throw new Error("Failed to load CLI keys");
        }

        const data = await res.json();
        if (!cancelled) {
          setCliApiKeys(data.keys || []);
        }
      } catch {
        if (!cancelled) {
          setCliApiKeys([]);
          setKeysError(true);
        }
      } finally {
        if (!cancelled) {
          setKeysLoading(false);
        }
      }
    };

    void loadCliApiKeys();

    return () => {
      cancelled = true;
    };
  }, []);

  const preferredCliApiKey = useMemo(() => {
    if (cliApiKeys.length === 0) {
      return null;
    }

    const storedCopilotKeyId =
      typeof window !== "undefined" ? window.localStorage.getItem("omniroute-cli-key-copilot") : null;

    return (
      (storedCopilotKeyId ? cliApiKeys.find((key) => key.id === storedCopilotKeyId) : null) ??
      cliApiKeys.find((key) => key.isActive !== false) ??
      cliApiKeys[0] ??
      null
    );
  }, [cliApiKeys]);

  const tokenSegment = preferredCliApiKey?.rawKey || "{token}";
  const hasRealToken = Boolean(preferredCliApiKey?.rawKey);
  const translationToken = { token: "{token}" };
  const baseUrl = `${displayBaseUrl}/api/v1/vscode/${tokenSegment}`;
  const vscodeTokenizedUrls = [
    {
      label: t("vscodeAliasBaseLabel"),
      url: `${baseUrl}/`,
      key: "vscode_token_base",
    },
    {
      label: t("vscodeAliasModelsLabel"),
      url: `${baseUrl}/models`,
      key: "vscode_token_models",
    },
    {
      label: t("vscodeAliasChatLabel"),
      url: `${baseUrl}/chat/completions`,
      key: "vscode_token_chat",
    },
  ];

  const description = hasRealToken
    ? t("vscodeAliasDescriptionReady", translationToken)
    : keysError
      ? t("vscodeAliasDescriptionError")
      : keysLoading
        ? t("vscodeAliasDescriptionLoading")
        : t("vscodeAliasDescriptionPlaceholder", translationToken);

  if (variant === "catalog") {
    return (
      <Card className={`overflow-hidden ${className}`.trim()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5">
          <span className="material-symbols-outlined text-[14px] text-primary">key</span>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t("vscodeAliasTitle")}
          </h3>
          <div className="flex-1 h-px bg-border/30" />
          <Link
            href="/dashboard/cli-tools"
            className="shrink-0 text-[11px] font-medium text-primary hover:underline"
          >
            {t("vscodeAliasManage")}
          </Link>
        </div>

        <div className="px-4 py-3">
          <p className="text-xs text-text-muted">{description}</p>

          <div className="mt-3 flex flex-col gap-2">
            {vscodeTokenizedUrls.map(({ label, url, key }) => (
              <CopyableEndpointRow
                key={key}
                label={label}
                url={url}
                copyKey={key}
                copy={(text, copyKey) => void copy(text, copyKey)}
                copied={copied}
                variant="catalog"
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className={`rounded-lg border border-sky-500/20 bg-sky-500/5 p-3 ${className}`.trim()}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {t("vscodeAliasTitle")}
          </p>
          <p className="mt-1 text-xs text-text-muted">{description}</p>
        </div>
        <Link href="/dashboard/cli-tools" className="shrink-0 text-xs text-primary hover:underline">
          {t("vscodeAliasManage")}
        </Link>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {vscodeTokenizedUrls.map(({ label, url, key }) => (
          <CopyableEndpointRow
            key={key}
            label={label}
            url={url}
            copyKey={key}
            copy={(text, copyKey) => void copy(text, copyKey)}
            copied={copied}
            variant="highlight"
          />
        ))}
      </div>
    </div>
  );
}

function CopyableEndpointRow({
  label,
  url,
  copyKey,
  copy,
  copied,
  variant = "highlight",
}: Readonly<{
  label: string;
  url: string;
  copyKey: string;
  copy: (text: string, key?: string) => void;
  copied?: string | null;
  variant?: "highlight" | "catalog";
}>) {
  const rowClassName =
    variant === "catalog"
      ? "flex items-center gap-2 min-w-0 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2.5"
      : "flex items-center gap-2 min-w-0 rounded-md border border-sky-500/15 bg-background/60 px-2.5 py-2";

  return (
    <div className={rowClassName}>
      <span className="w-24 shrink-0 text-[11px] font-medium text-text-muted">{label}</span>
      <code className="flex-1 min-w-0 truncate text-[11px] font-mono text-text-main">{url}</code>
      <button
        onClick={() => copy(url, copyKey)}
        className="shrink-0 flex items-center gap-1 rounded border border-border/70 px-2 py-1 text-text-muted transition-colors hover:text-text"
      >
        <span className="material-symbols-outlined text-[12px]">
          {copied === copyKey ? "check" : "content_copy"}
        </span>
      </button>
    </div>
  );
}
