"use client";

import type { Dispatch, SetStateAction } from "react";
import { Badge, Button } from "@/shared/components";

export type BackupCleanupOptions = {
  keepLatest: number;
  retentionDays: number;
};

export type BackupRetentionStatus = {
  type: string;
  message: string;
};

export type StorageBackupHealth = {
  backupCount?: number;
  backupRetention: {
    maxFiles: number;
    days: number;
  };
};

type DatabaseBackupRetentionCardProps = {
  title: string;
  className?: string;
  storageHealth: StorageBackupHealth;
  backupCleanupOptions: BackupCleanupOptions;
  setBackupCleanupOptions: Dispatch<SetStateAction<BackupCleanupOptions>>;
  saveBackupRetentionLoading: boolean;
  backupRetentionStatus: BackupRetentionStatus;
  setBackupRetentionStatus: Dispatch<SetStateAction<BackupRetentionStatus>>;
  cleanupBackupsLoading: boolean;
  cleanupBackupsStatus: BackupRetentionStatus;
  onSaveRetention: () => void;
  onCleanupBackups: () => void;
};

function StatusAlert({ status }: { status: BackupRetentionStatus }) {
  if (!status.message) return null;

  const isSuccess = status.type === "success";
  return (
    <div
      className={`mt-3 p-3 rounded-lg text-sm ${
        isSuccess
          ? "bg-green-500/10 text-green-500 border border-green-500/20"
          : "bg-red-500/10 text-red-500 border border-red-500/20"
      }`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          {isSuccess ? "check_circle" : "error"}
        </span>
        {status.message}
      </div>
    </div>
  );
}

export default function DatabaseBackupRetentionCard({
  title,
  className = "mb-4",
  storageHealth,
  backupCleanupOptions,
  setBackupCleanupOptions,
  saveBackupRetentionLoading,
  backupRetentionStatus,
  setBackupRetentionStatus,
  cleanupBackupsLoading,
  cleanupBackupsStatus,
  onSaveRetention,
  onCleanupBackups,
}: DatabaseBackupRetentionCardProps) {
  return (
    <div className={`p-3 rounded-lg bg-bg border border-border ${className}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <p className="text-sm font-medium text-text-main">{title}</p>
          <p className="text-xs text-text-muted">
            Automatic SQLite backups are stored in <code>db_backups</code>. Configure how many
            snapshots to keep and optionally delete backups older than N days.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" size="sm">
            {storageHealth.backupCount || 0} backups
          </Badge>
          <Badge variant="default" size="sm">
            Max {storageHealth.backupRetention.maxFiles}
          </Badge>
          <Badge variant="default" size="sm">
            {storageHealth.backupRetention.days > 0
              ? `${storageHealth.backupRetention.days}d retention`
              : "Age retention off"}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-text-muted">
          Keep latest backups
          <input
            type="number"
            min={1}
            max={200}
            value={backupCleanupOptions.keepLatest}
            onChange={(e) => {
              const parsed = Number.parseInt(e.target.value || "1", 10);
              setBackupRetentionStatus({ type: "", message: "" });
              setBackupCleanupOptions((prev) => ({
                ...prev,
                keepLatest: Number.isFinite(parsed) ? Math.max(1, parsed) : 1,
              }));
            }}
            className="h-9 w-32 rounded-lg border border-border bg-background px-3 text-sm text-text-main"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-text-muted">
          Delete older than days
          <input
            type="number"
            min={0}
            max={3650}
            value={backupCleanupOptions.retentionDays}
            onChange={(e) => {
              const parsed = Number.parseInt(e.target.value || "0", 10);
              setBackupRetentionStatus({ type: "", message: "" });
              setBackupCleanupOptions((prev) => ({
                ...prev,
                retentionDays: Number.isFinite(parsed) ? Math.max(0, parsed) : 0,
              }));
            }}
            className="h-9 w-32 rounded-lg border border-border bg-background px-3 text-sm text-text-main"
          />
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={onSaveRetention}
          loading={saveBackupRetentionLoading}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            save
          </span>
          Save retention
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCleanupBackups}
          loading={cleanupBackupsLoading}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            auto_delete
          </span>
          Clean old backups
        </Button>
      </div>
      <StatusAlert status={backupRetentionStatus} />
      <StatusAlert status={cleanupBackupsStatus} />
    </div>
  );
}
