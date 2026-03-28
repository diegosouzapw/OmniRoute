"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@/shared/components";
import { useLocale, useTranslations } from "next-intl";

export default function SystemStorageTab() {
  const [backups, setBackups] = useState([]);
  const [backupsLoading, setBackupsLoading] = useState(false);
  const [backupsExpanded, setBackupsExpanded] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState({ type: "", message: "" });
  const [restoringId, setRestoringId] = useState(null);
  const [confirmRestoreId, setConfirmRestoreId] = useState(null);
  const [manualBackupLoading, setManualBackupLoading] = useState(false);
  const [manualBackupStatus, setManualBackupStatus] = useState({ type: "", message: "" });
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importStatus, setImportStatus] = useState({ type: "", message: "" });
  const [confirmImport, setConfirmImport] = useState(false);
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null);
  const [maxCallLogs, setMaxCallLogs] = useState(10000);
  const [maxCallLogsDraft, setMaxCallLogsDraft] = useState("10000");
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [maxCallLogsSaving, setMaxCallLogsSaving] = useState(false);
  const [maxCallLogsStatus, setMaxCallLogsStatus] = useState({ type: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();
  const t = useTranslations("settings");
  const tc = useTranslations("common");
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

  const loadSettings = async () => {
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) return;
      const data = await res.json();
      const value =
        typeof data.maxCallLogs === "number" &&
        Number.isInteger(data.maxCallLogs) &&
        data.maxCallLogs > 0
          ? data.maxCallLogs
          : 10000;
      setMaxCallLogs(value);
      setMaxCallLogsDraft(String(value));
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setSettingsLoading(false);
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
          setManualBackupStatus({
            type: "success",
            message: t("backupCreated", { file: data.filename }),
          });
        } else {
          setManualBackupStatus({
            type: "info",
            message: data.message || t("noChangesSinceBackup"),
          });
        }
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setManualBackupStatus({ type: "error", message: data.error || t("backupFailed") });
      }
    } catch {
      setManualBackupStatus({ type: "error", message: t("errorOccurred") });
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
          message: t("restoreSuccess", {
            connections: data.connectionCount,
            nodes: data.nodeCount,
            combos: data.comboCount,
            apiKeys: data.apiKeyCount,
          }),
        });
        await loadBackups();
        await loadStorageHealth();
      } else {
        setRestoreStatus({ type: "error", message: data.error || t("restoreFailed") });
      }
    } catch {
      setRestoreStatus({ type: "error", message: t("errorDuringRestore") });
    } finally {
      setRestoringId(null);
      setConfirmRestoreId(null);
    }
  };

  useEffect(() => {
    loadStorageHealth();
    loadSettings();
  }, []);

  const handleSaveMaxCallLogs = async () => {
    const parsed = Number.parseInt(maxCallLogsDraft, 10);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      setMaxCallLogsStatus({
        type: "error",
        message: "Enter a positive integer for the call log limit.",
      });
      return;
    }

    setMaxCallLogsSaving(true);
    setMaxCallLogsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxCallLogs: parsed }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save call log limit");
      }
      setMaxCallLogs(parsed);
      setMaxCallLogsDraft(String(parsed));
      setMaxCallLogsStatus({
        type: "success",
        message: "Call log retention limit saved.",
      });
    } catch (err) {
      setMaxCallLogsStatus({
        type: "error",
        message: (err as Error).message || "Failed to save call log limit",
      });
    } finally {
      setMaxCallLogsSaving(false);
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const res = await fetch("/api/db-backups/export");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("exportFailed"));
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const disposition = res.headers.get("Content-Disposition") || "";
      const filenameMatch = disposition.match(/filename="(.+)"/);
      const filename = filenameMatch
        ? filenameMatch[1]
        : `omniroute-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.sqlite`;
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      setImportStatus({
        type: "error",
        message: t("exportFailedWithError", { error: (err as Error).message }),
      });
    } finally {
      setExportLoading(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".sqlite")) {
      setImportStatus({
        type: "error",
        message: t("invalidFileType"),
      });
      return;
    }
    setPendingImportFile(file);
    setConfirmImport(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImportConfirm = async () => {
    if (!pendingImportFile) return;
    setImportLoading(true);
    setImportStatus({ type: "", message: "" });
    setConfirmImport(false);
    try {
      const formData = new FormData();
      formData.append("file", pendingImportFile);
      const res = await fetch("/api/db-backups/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setImportStatus({
          type: "success",
          message: t("importSuccess", {
            connections: data.connectionCount,
            nodes: data.nodeCount,
            combos: data.comboCount,
            apiKeys: data.apiKeyCount,
          }),
        });
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setImportStatus({ type: "error", message: data.error || t("importFailed") });
      }
    } catch {
      setImportStatus({ type: "error", message: t("errorDuringImport") });
    } finally {
      setImportLoading(false);
      setPendingImportFile(null);
    }
  };

  const handleImportCancel = () => {
    setConfirmImport(false);
    setPendingImportFile(null);
  };

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
    if (diffMin < 1) return t("justNow");
    if (diffMin < 60) return t("minutesAgo", { count: diffMin });
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return t("hoursAgo", { count: diffHr });
    const diffDays = Math.floor(diffHr / 24);
    return t("daysAgo", { count: diffDays });
  };

  const formatBackupReason = (reason) => {
    if (reason === "manual") return t("backupReasonManual");
    if (reason === "pre-restore") return t("backupReasonPreRestore");
    return reason;
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
          <h3 className="text-lg font-semibold">{t("systemStorage")}</h3>
          <p className="text-xs text-text-muted">{t("allDataLocal")}</p>
        </div>
        <Badge variant="success" size="sm">
          {storageHealth.driver || "json"}
        </Badge>
      </div>

      {/* Storage info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">
            {t("databasePath")}
          </p>
          <p className="text-sm font-mono text-text-main break-all">
            {storageHealth.dbPath || "~/.omniroute/storage.sqlite"}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-bg border border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">
            {t("databaseSize")}
          </p>
          <p className="text-sm font-mono text-text-main">{formatBytes(storageHealth.sizeBytes)}</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-text-main">Call log retention limit</p>
            <p className="text-xs text-text-muted">
              Keep only the most recent call log entries in SQLite. Older entries are pruned
              automatically after each new request log is saved.
            </p>
          </div>
          <Badge variant="default" size="sm">
            {maxCallLogs.toLocaleString()}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <input
            type="number"
            min="1"
            step="1"
            value={maxCallLogsDraft}
            onChange={(e) => setMaxCallLogsDraft(e.target.value)}
            disabled={settingsLoading || maxCallLogsSaving}
            className="w-40 rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary/40"
            aria-label="Call log retention limit"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveMaxCallLogs}
            loading={maxCallLogsSaving}
            disabled={settingsLoading}
          >
            Save limit
          </Button>
        </div>

        {maxCallLogsStatus.message && (
          <div
            className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
              maxCallLogsStatus.type === "success"
                ? "border-green-500/20 bg-green-500/10 text-green-500"
                : "border-red-500/20 bg-red-500/10 text-red-500"
            }`}
            role="alert"
          >
            {maxCallLogsStatus.message}
          </div>
        )}
      </div>

      {/* Export / Import */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={handleExport} loading={exportLoading}>
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            download
          </span>
          {t("exportDatabase")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            setExportLoading(true);
            try {
              const res = await fetch("/api/db-backups/exportAll");
              if (!res.ok) throw new Error(t("exportFailed"));
              const blob = await res.blob();
              const cd = res.headers.get("Content-Disposition") || "";
              const filenameMatch = cd.match(/filename="?([^"]+)"?/);
              const filename = filenameMatch?.[1] || `omniroute-full-backup.tar.gz`;
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } catch (err) {
              setImportStatus({
                type: "error",
                message: t("fullExportFailedWithError", { error: (err as Error).message }),
              });
            } finally {
              setExportLoading(false);
            }
          }}
          loading={exportLoading}
        >
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            folder_zip
          </span>
          {t("exportAll")}
        </Button>
        <Button variant="outline" size="sm" onClick={handleImportClick} loading={importLoading}>
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            upload
          </span>
          {t("importDatabase")}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".sqlite"
          className="hidden"
          onChange={handleFileSelected}
        />
      </div>

      {/* Import confirmation dialog */}
      {confirmImport && pendingImportFile && (
        <div className="p-4 rounded-lg mb-4 bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <span
              className="material-symbols-outlined text-[20px] text-amber-500 mt-0.5"
              aria-hidden="true"
            >
              warning
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-500 mb-1">{t("confirmDbImport")}</p>
              <p className="text-xs text-text-muted mb-2">
                {t("confirmDbImportDesc", { file: pendingImportFile.name })}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleImportConfirm}
                  className="!bg-amber-500 hover:!bg-amber-600"
                >
                  {t("yesImport")}
                </Button>
                <Button variant="outline" size="sm" onClick={handleImportCancel}>
                  {tc("cancel")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import status */}
      {importStatus.message && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            importStatus.type === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {importStatus.type === "success" ? "check_circle" : "error"}
            </span>
            {importStatus.message}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-amber-500" aria-hidden="true">
            schedule
          </span>
          <div>
            <p className="text-sm font-medium">{t("lastBackup")}</p>
            <p className="text-xs text-text-muted">
              {storageHealth.lastBackupAt
                ? `${new Date(storageHealth.lastBackupAt).toLocaleString(locale)} (${formatRelativeTime(storageHealth.lastBackupAt)})`
                : t("noBackupYet")}
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
          {t("backupNow")}
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
            <p className="font-medium">{t("backupRestore")}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBackupsExpanded(!backupsExpanded);
              if (!backupsExpanded && backups.length === 0) loadBackups();
            }}
          >
            {backupsExpanded ? t("hide") : t("viewBackups")}
          </Button>
        </div>
        <p className="text-xs text-text-muted mb-3">{t("backupRetentionDesc")}</p>

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
                {t("loadingBackups")}
              </div>
            ) : backups.length === 0 ? (
              <div className="text-center py-6 text-text-muted text-sm">
                <span
                  className="material-symbols-outlined text-[32px] mb-2 block opacity-40"
                  aria-hidden="true"
                >
                  folder_off
                </span>
                {t("noBackupsYet")}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-muted">
                    {t("backupsAvailable", { count: backups.length })}
                  </span>
                  <button
                    onClick={loadBackups}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      refresh
                    </span>
                    {t("refresh")}
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
                          {new Date(backup.createdAt).toLocaleString(locale)}
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
                          {formatBackupReason(backup.reason)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-muted ml-6">
                        <span>{t("connectionsCount", { count: backup.connectionCount })}</span>
                        <span>•</span>
                        <span>{formatBytes(backup.size)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      {confirmRestoreId === backup.id ? (
                        <>
                          <span className="text-xs text-amber-500 font-medium">{t("confirm")}</span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRestore(backup.id)}
                            loading={restoringId === backup.id}
                            className="!bg-amber-500 hover:!bg-amber-600"
                          >
                            {t("yes")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmRestoreId(null)}
                          >
                            {t("no")}
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
                          {t("restore")}
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
