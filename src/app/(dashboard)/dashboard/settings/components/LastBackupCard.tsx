"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/shared/components";

type LastBackupCardProps = {
  title: string;
  lastBackupAt: string | null;
  backupsExpanded: boolean;
  manualBackupLoading: boolean;
  onBackupNow: () => void;
  onToggleBackups: () => void;
};

export default function LastBackupCard({
  title,
  lastBackupAt,
  backupsExpanded,
  manualBackupLoading,
  onBackupNow,
  onToggleBackups,
}: LastBackupCardProps) {
  const locale = useLocale();
  const t = useTranslations("settings");

  const formatRelativeTime = (isoString: string) => {
    const diffMs = new Date().getTime() - new Date(isoString).getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return t("justNow");
    if (diffMin < 60) return t("minutesAgo", { count: diffMin });
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return t("hoursAgo", { count: diffHr });
    return t("daysAgo", { count: Math.floor(diffHr / 24) });
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-bg border border-border mb-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-amber-500" aria-hidden="true">
          schedule
        </span>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-text-muted">
            {lastBackupAt
              ? `${new Date(lastBackupAt).toLocaleString(locale)} (${formatRelativeTime(lastBackupAt)})`
              : t("noBackupYet")}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onBackupNow} loading={manualBackupLoading}>
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            backup
          </span>
          {t("backupNow")}
        </Button>
        <Button variant="outline" size="sm" onClick={onToggleBackups}>
          {backupsExpanded ? t("hide") : t("viewBackups")}
        </Button>
      </div>
    </div>
  );
}
