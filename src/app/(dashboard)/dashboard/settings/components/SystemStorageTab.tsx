"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge } from "@/shared/components";

export default function SystemStorageTab() {
  const [backups, setBackups] = useState([]);
  const [backupsLoading, setBackupsLoading] = useState(false);
  const [backupsExpanded, setBackupsExpanded] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState({ type: "", message: "" });
  const [restoringId, setRestoringId] = useState(null);
  const [confirmRestoreId, setConfirmRestoreId] = useState(null);
  const [manualBackupLoading, setManualBackupLoading] = useState(false);
  const [manualBackupStatus, setManualBackupStatus] = useState({ type: "", message: "" });
  const [storageHealth, setStorageHealth] = useState({
    driver: "sqlite",
    dbPath: "~/.omniroute/storage.sqlite",
    sizeBytes: 0,
    retentionDays: 90,
    lastBackupAt: null,
  });

  const loadBackups = async () => {
    setBackupsLoading(true);
    try {
      const res = await fetch("/api/db-backups");
      const data = await res.json();
      setBackups(data.backups || []);
    } catch (err) {
      console.error("Failed to fetch backups:", err);
    } finally {
      setBackupsLoading(false);
    }
  };

  const loadStorageHealth = async () => {
    try {
      const res = await fetch("/api/storage/health");
      if (!res.ok) return;
      const data = await res.json();
      setStorageHealth((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.error("Failed to fetch storage health:", err);
    }
  };

  const handleManualBackup = async () => {
    setManualBackupLoading(true);
    setManualBackupStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", { method: "PUT" });
      const data = await res.json();
      if (res.ok) {
        if (data.filename) {
          setManualBackupStatus({ type: "success", message: `Backup created: ${data.filename}` });
        } else {
          setManualBackupStatus({
            type: "info",
            message: data.message || "No changes since last backup",
          });
        }
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setManualBackupStatus({ type: "error", message: data.error || "Backup failed" });
      }
    } catch {
      setManualBackupStatus({ type: "error", message: "An error occurred" });
    } finally {
      setManualBackupLoading(false);
    }
  };

  const handleRestore = async (backupId) => {
    setRestoringId(backupId);
    setRestoreStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setRestoreStatus({
          type: "success",
          message: `Restored! ${data.connectionCount} connections, ${data.nodeCount} nodes, ${data.comboCount} combos, ${data.apiKeyCount} API keys.`,
        });
        await loadBackups();
        await loadStorageHealth();
      } else {
        setRestoreStatus({ type: "error", message: data.error || "Restore failed" });
      }
    } catch {
      setRestoreStatus({ type: "error", message: "An error occurred during restore" });
    } finally {
      setRestoringId(null);
      setConfirmRestoreId(null);
    }
  };

  useEffect(() => {
    loadStorageHealth();
  }, []);

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return null;
    const now = new Date();
    const then = new Date(isoString);
    const diffMs = (now as any) - (then as any);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    return `${diffDays}d ago`;
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            database
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">System & Storage</h3>
          <p className="text-xs text-text-muted">All data stored locally on your machine</p>
        </div>
        <Badge variant="success" size="sm">
          {storageHealth.driver || "json"}
        </Badge>
      </div>

      {/* Storage info grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Database Path</p>
          <p className="text-sm font-mono text-text-main break-all">
            {storageHealth.dbPath || "~/.omniroute/storage.sqlite"}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Database Size</p>
          <p className="text-sm font-mono text-text-main">{formatBytes(storageHealth.sizeBytes)}</p>
        </div>
      </div>

      {/* Last backup + Backup Now */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-amber-500" aria-hidden="true">
            schedule
          </span>
          <div>
            <p className="text-sm font-medium">Last Backup</p>
            <p className="text-xs text-text-muted">
              {storageHealth.lastBackupAt
                ? `${new Date(storageHealth.lastBackupAt).toLocaleString("pt-BR")} (${formatRelativeTime(storageHealth.lastBackupAt)})`
                : "No backup yet"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleManualBackup}
          loading={manualBackupLoading}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            backup
          </span>
          Backup Now
        </Button>
      </div>

      {manualBackupStatus.message && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            manualBackupStatus.type === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : manualBackupStatus.type === "info"
                ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {manualBackupStatus.type === "success"
                ? "check_circle"
                : manualBackupStatus.type === "info"
                  ? "info"
                  : "error"}
            </span>
            {manualBackupStatus.message}
          </div>
        </div>
      )}

      {/* Backup/Restore section */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[18px] text-amber-500"
              aria-hidden="true"
            >
              restore
            </span>
            <p className="font-medium">Backup & Restore</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBackupsExpanded(!backupsExpanded);
              if (!backupsExpanded && backups.length === 0) loadBackups();
            }}
          >
            {backupsExpanded ? "Hide" : "View Backups"}
          </Button>
        </div>
        <p className="text-xs text-text-muted mb-3">
          Database snapshots are created automatically before restore and every 15 minutes when data
          changes. Retention: 24 hourly + 30 daily backups with smart rotation.
        </p>

        {restoreStatus.message && (
          <div
            className={`p-3 rounded-lg mb-3 text-sm ${
              restoreStatus.type === "success"
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}
            role="alert"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {restoreStatus.type === "success" ? "check_circle" : "error"}
              </span>
              {restoreStatus.message}
            </div>
          </div>
        )}

        {backupsExpanded && (
          <div className="flex flex-col gap-2">
            {backupsLoading ? (
              <div className="flex items-center justify-center py-6 text-text-muted">
                <span
                  className="material-symbols-outlined animate-spin text-[20px] mr-2"
                  aria-hidden="true"
                >
                  progress_activity
                </span>
                Loading backups...
              </div>
            ) : backups.length === 0 ? (
              <div className="text-center py-6 text-text-muted text-sm">
                <span
                  className="material-symbols-outlined text-[32px] mb-2 block opacity-40"
                  aria-hidden="true"
                >
                  folder_off
                </span>
                No backups available yet. Backups will be created automatically when data changes.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-muted">
                    {backups.length} backup(s) available
                  </span>
                  <button
                    onClick={loadBackups}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      refresh
                    </span>
                    Refresh
                  </button>
                </div>
                {backups.map((backup) => (
                  <div
                    key={backup.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="material-symbols-outlined text-[16px] text-amber-500"
                          aria-hidden="true"
                        >
                          description
                        </span>
                        <span className="text-sm font-medium truncate">
                          {new Date(backup.createdAt).toLocaleString("pt-BR")}
                        </span>
                        <Badge
                          variant={
                            backup.reason === "pre-restore"
                              ? "warning"
                              : backup.reason === "manual"
                                ? "success"
                                : "default"
                          }
                          size="sm"
                        >
                          {backup.reason}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-muted ml-6">
                        <span>{backup.connectionCount} connection(s)</span>
                        <span>•</span>
                        <span>{formatBytes(backup.size)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      {confirmRestoreId === backup.id ? (
                        <>
                          <span className="text-xs text-amber-500 font-medium">Confirm?</span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRestore(backup.id)}
                            loading={restoringId === backup.id}
                            className="!bg-amber-500 hover:!bg-amber-600"
                          >
                            Yes
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmRestoreId(null)}
                          >
                            No
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setConfirmRestoreId(backup.id)}
                        >
                          <span
                            className="material-symbols-outlined text-[14px] mr-1"
                            aria-hidden="true"
                          >
                            restore
                          </span>
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
