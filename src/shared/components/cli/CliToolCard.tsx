"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";
import type { ToolBatchStatus } from "@/shared/types/cliBatchStatus";
import CliStatusBadge from "@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

export interface CliToolCardProps {
  tool: CliCatalogEntry;
  batchStatus: ToolBatchStatus | null;
  detailHref: string;
  hasActiveProviders: boolean;
}

export default function CliToolCard({
  tool,
  batchStatus,
  detailHref,
  hasActiveProviders,
}: CliToolCardProps) {
  const t = useTranslations("cliCommon");
  const tTools = useTranslations("cliTools");
  const { isDark } = useTheme();
  const installed = batchStatus?.detection.installed ?? false;
  const configStatus = batchStatus?.config.status ?? null;
  const version = batchStatus?.detection.version ?? t("card.versionNotFound");
  const endpoint = batchStatus?.config.endpoint ?? null;
  const imageSrc =
    tool.image || (isDark ? tool.imageDark || tool.imageLight : tool.imageLight || tool.imageDark);

  const showInstallChips = !installed && tool.configType !== "guide";

  const title = (
    <div className="flex items-center gap-2.5">
      {/* Icon / image */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={tool.name}
          width={32}
          height={32}
          className="rounded-md object-contain flex-shrink-0"
        />
      ) : (
        <span
          className="material-symbols-outlined text-[20px] flex-shrink-0"
          style={{ color: tool.color }}
          aria-hidden="true"
        >
          {tool.icon ?? "terminal"}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-text-main text-sm leading-tight truncate">
            {tool.name}
          </span>
          <span className="text-[11px] text-text-muted font-mono bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
            {version}
          </span>
        </div>
        <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
          {tTools(`toolDescriptions.${tool.id}`)}
        </p>
      </div>
      <span className="material-symbols-outlined text-[18px] text-text-muted flex-shrink-0">
        chevron_right
      </span>
    </div>
  );

  return (
    <Link
      href={detailHref}
      className={cn(
        "block min-h-[180px]",
        "bg-surface border border-black/5 dark:border-white/5 rounded-lg shadow-sm",
        "hover:shadow-md hover:border-primary/30 transition-all",
        "p-4 flex flex-col gap-3"
      )}
    >
      {/* Header */}
      {title}

      {/* Status strip */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Detection */}
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded",
            installed ? "text-green-600 dark:text-green-400" : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          <span aria-hidden="true">{installed ? "✓" : "✗"}</span>
          {installed ? t("card.detected") : t("card.notDetected")}
        </span>

        {/* Config status */}
        {configStatus && (
          <CliStatusBadge
            effectiveConfigStatus={configStatus}
            batchStatus={null}
            lastConfiguredAt={batchStatus?.config.lastConfiguredAt ?? null}
          />
        )}

        {/* Endpoint */}
        {endpoint && (
          <span className="text-[10px] text-text-muted font-mono truncate max-w-[140px]">
            {endpoint}
          </span>
        )}
      </div>

      {/* Badges row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {tool.baseUrlSupport === "partial" && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <span aria-hidden="true">⚠</span> {t("card.baseUrlPartial")}
          </span>
        )}
        {tool.acpSpawnable === true && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {t("card.alsoAcp")}
          </span>
        )}
        {showInstallChips && (
          <>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-black/5 dark:bg-white/5 text-text-muted">
              📋 {t("card.manualConfig")}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-black/5 dark:bg-white/5 text-text-muted">
              ⬇ {t("card.installGuide")}
            </span>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-1 flex items-center justify-between">
        <span className="text-xs text-primary font-medium">
          {installed ? t("card.configure") : t("card.howToInstall")}
        </span>
        {!hasActiveProviders && (
          <span
            className="text-[10px] text-text-muted italic"
            title={t("card.connectProviderHint")}
          >
            {t("card.connectProviderHint")}
          </span>
        )}
      </div>
    </Link>
  );
}
