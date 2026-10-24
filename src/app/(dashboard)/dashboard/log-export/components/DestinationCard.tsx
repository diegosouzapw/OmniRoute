"use client";

import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { useTranslations } from "next-intl";
import type { LogExportDestination } from "../types";

interface DestinationCardProps {
  destination: LogExportDestination;
  busy: "test" | "run" | "toggle" | null;
  onTest: () => void;
  onRun: () => void;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function formatTimestamp(value: string | null, neverLabel: string): string {
  if (!value) return neverLabel;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
}

function statusBadge(destination: LogExportDestination, t: ReturnType<typeof useTranslations>) {
  if (!destination.enabled) return <Badge variant="default">{t("statusDisabled")}</Badge>;
  if (destination.lastStatus === "failure")
    return <Badge variant="error">{t("statusFailing")}</Badge>;
  if (destination.lastStatus === "success")
    return <Badge variant="success">{t("statusHealthy")}</Badge>;
  return <Badge variant="info">{t("statusNotRunYet")}</Badge>;
}

export function DestinationCard({
  destination,
  busy,
  onTest,
  onRun,
  onToggle,
  onEdit,
  onDelete,
}: DestinationCardProps) {
  const t = useTranslations("logExport");
  return (
    <Card padding="sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-text-main">{destination.name}</h3>
            <Badge variant="primary" size="sm">
              {destination.typeLabel}
            </Badge>
            {statusBadge(destination, t)}
            {!destination.typeAvailable ? (
              <Badge variant="warning" size="sm">
                {t("typeNotInstalled")}
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-text-muted">
            {t("metaLine", {
              lastRun: formatTimestamp(destination.lastRunAt, t("never")),
              exported: destination.exportedTotal.toLocaleString(),
              pending: destination.pending.toLocaleString(),
              cursor: destination.cursorRowId,
            })}
          </p>
          {destination.lastError ? (
            <p className="mt-2 rounded-control bg-error-bg p-2 text-xs text-error">
              {destination.lastError}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" loading={busy === "test"} onClick={onTest}>
            {t("btnTest")}
          </Button>
          <Button size="sm" variant="secondary" loading={busy === "run"} onClick={onRun}>
            {t("btnRunNow")}
          </Button>
          <Button size="sm" variant="ghost" loading={busy === "toggle"} onClick={onToggle}>
            {destination.enabled ? t("btnDisable") : t("btnEnable")}
          </Button>
          <Button size="sm" variant="ghost" onClick={onEdit}>
            {t("btnEdit")}
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            {t("btnDelete")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
