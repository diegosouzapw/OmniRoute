"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Badge, Toggle } from "@/shared/components";
import { useLocale, useTranslations } from "next-intl";

const rowCountFormatter = new Intl.NumberFormat("en-US");

function formatRows(rows: number | null | undefined) {
  return typeof rows === "number" ? rowCountFormatter.format(rows) : "100K";
}

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
  const [clearCacheLoading, setClearCacheLoading] = useState(false);
  const [clearCacheStatus, setClearCacheStatus] = useState({ type: "", message: "" });
  const [purgeLogsLoading, setPurgeLogsLoading] = useState(false);
  const [purgeLogsStatus, setPurgeLogsStatus] = useState({ type: "", message: "" });
  const [cleanupBackupsLoading, setCleanupBackupsLoading] = useState(false);
  const [cleanupBackupsStatus, setCleanupBackupsStatus] = useState({ type: "", message: "" });
  const [purgeQuotaSnapshotsLoading, setPurgeQuotaSnapshotsLoading] = useState(false);
  const [purgeQuotaSnapshotsStatus, setPurgeQuotaSnapshotsStatus] = useState({
    type: "",
    message: "",
  });
  const [purgeCallLogsLoading, setPurgeCallLogsLoading] = useState(false);
  const [purgeCallLogsStatus, setPurgeCallLogsStatus] = useState({ type: "", message: "" });
  const [purgeDetailedLogsLoading, setPurgeDetailedLogsLoading] = useState(false);
  const [purgeDetailedLogsStatus, setPurgeDetailedLogsStatus] = useState({ type: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [storageHealth, setStorageHealth] = useState({
    driver: "sqlite",
    dbPath: "~/.omniroute/storage.sqlite",
    sizeBytes: 0,
    retentionDays: {
      app: 7,
      call: 7,
    },
    tableMaxRows: {
      callLogs: 100000,
      proxyLogs: 100000,
    },
    backupCount: 0,
    backupRetention: {
      maxFiles: 20,
      days: 0,
    },
    lastBackupAt: null,
  });
  const [backupCleanupOptions, setBackupCleanupOptions] = useState({
    keepLatest: 20,
    retentionDays: 0,
  });

  // Database settings state (tasks 23-26)
  const [dbSettings, setDbSettings] = useState<any>(null);
  const [dbSettingsLoading, setDbSettingsLoading] = useState(true);
  const [dbSettingsSaving, setDbSettingsSaving] = useState(false);
  const [dbStatsRefreshing, setDbStatsRefreshing] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [usageTokenBuffer, setUsageTokenBuffer] = useState<number | null>(null);
  const [bufferInput, setBufferInput] = useState("");
  const [bufferSaving, setBufferSaving] = useState(false);
  const [generalLoading, setGeneralLoading] = useState(true);

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
      setBackupCleanupOptions({
        keepLatest: data.backupRetention?.maxFiles || 20,
        retentionDays: data.backupRetention?.days || 0,
      });
    } catch (err) {
      console.error("Failed to fetch storage health:", err);
    }
  };

  const loadDatabaseSettings = async () => {
    setDbSettingsLoading(true);
    try {
      const res = await fetch("/api/settings/database");
      if (res.ok) {
        const data = await res.json();
        setDbSettings(data);
      }
    } catch (err) {
      console.error("Failed to load database settings:", err);
    } finally {
      setDbSettingsLoading(false);
    }
  };

  const saveDatabaseSettings = async () => {
    if (!dbSettings) return;
    setDbSettingsSaving(true);
    try {
      const { logs, backup, cache, retention, aggregation, optimization } = dbSettings;
      const res = await fetch("/api/settings/database", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs, backup, cache, retention, aggregation, optimization }),
      });
      if (res.ok) {
        await loadDatabaseSettings();
      }
    } catch (err) {
      console.error("Failed to save database settings:", err);
    } finally {
      setDbSettingsSaving(false);
    }
  };

  const refreshDatabaseStats = async () => {
    setDbStatsRefreshing(true);
    try {
      await fetch("/api/settings/database/refresh-stats", { method: "POST" });
      await loadDatabaseSettings();
    } catch (err) {
      console.error("Failed to refresh database stats:", err);
    } finally {
      setDbStatsRefreshing(false);
    }
  };

  const handleCleanupBackups = async () => {
    setCleanupBackupsLoading(true);
    setCleanupBackupsStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/db-backups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backupCleanupOptions),
      });
      const data = await res.json();
      if (res.ok) {
        setCleanupBackupsStatus({
          type: "success",
          message: `Deleted ${data.deletedBackupFamilies} backup set(s) and ${data.deletedFiles} file(s).`,
        });
        await loadStorageHealth();
        if (backupsExpanded) await loadBackups();
      } else {
        setCleanupBackupsStatus({
          type: "error",
          message: data.error || "Failed to clean database backups",
        });
      }
    } catch {
      setCleanupBackupsStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setCleanupBackupsLoading(false);
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
    loadDatabaseSettings();
    loadGeneralSettings();
  }, []);

  const loadGeneralSettings = async () => {
    setGeneralLoading(true);
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setDebugMode(data.debugMode === true);
        const buf = typeof data.usageTokenBuffer === "number" ? data.usageTokenBuffer : 2000;
        setUsageTokenBuffer(buf);
        setBufferInput(String(buf));
      }
    } catch {
      // ignore
    } finally {
      setGeneralLoading(false);
    }
  };

  const updateDebugMode = async (value: boolean) => {
    const previousValue = debugMode;
    setDebugMode(value);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ debugMode: value }),
      });
      if (!res.ok) {
        setDebugMode(previousValue);
      }
    } catch (err) {
      setDebugMode(previousValue);
      console.error("Failed to update debugMode:", err);
    }
  };

  const updateUsageTokenBuffer = async () => {
    const val = parseInt(bufferInput, 10);
    if (isNaN(val) || val < 0 || val > 50000) return;
    setBufferSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usageTokenBuffer: val }),
      });
      if (res.ok) {
        setUsageTokenBuffer(val);
      }
    } catch (err) {
      console.error("Failed to update usageTokenBuffer:", err);
    } finally {
      setBufferSaving(false);
    }
  };

  /** Triggers a browser file download from an existing Blob. */
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /** Fetches a URL, reads the response as a Blob and triggers a download. */
  const fetchAndDownload = async (
    apiUrl: string,
    fallbackFilename: string,
    errorMessage: string
  ) => {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error((data as { error?: string }).error || errorMessage);
    }
    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition") || "";
    const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
    triggerDownload(blob, filenameMatch?.[1] || fallbackFilename);
  };

  const handleExportJson = async () => {
    setExportLoading(true);
    try {
      await fetchAndDownload(
        "/api/settings/export-json",
        `omniroute-legacy-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
        "JSON Export failed"
      );
    } catch (err) {
      console.error("Export JSON failed:", err);
      setImportStatus({
        type: "error",
        message: t("exportFailedWithError", { error: (err as Error).message }),
      });
    } finally {
      setExportLoading(false);
    }
  };

  const handleImportJsonClick = () => {
    jsonInputRef.current?.click();
  };

  const handleJsonSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) {
      setImportStatus({
        type: "error",
        message: "Invalid file type. Only .json allowed.",
      });
      return;
    }

    // Auto import JSON
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setImportLoading(true);
        const res = await fetch("/api/settings/import-json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: e.target?.result as string,
        });
        const data = await res.json();
        if (res.ok) {
          setImportStatus({
            type: "success",
            message: data.message || "Legacy JSON imported successfully!",
          });
          await loadStorageHealth();
          if (backupsExpanded) await loadBackups();
        } else {
          setImportStatus({ type: "error", message: data.error || "Failed to import JSON" });
        }
      } catch (err) {
        setImportStatus({ type: "error", message: "Error during JSON import" });
      } finally {
        setImportLoading(false);
        if (jsonInputRef.current) jsonInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      await fetchAndDownload(
        "/api/db-backups/export",
        `omniroute-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.sqlite`,
        t("exportFailed")
      );
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
      const arrayBuffer = await pendingImportFile.arrayBuffer();
      const res = await fetch(
        `/api/db-backups/import?filename=${encodeURIComponent(pendingImportFile.name)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/octet-stream" },
          body: arrayBuffer,
        }
      );
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

      {/* Logs Settings Section */}
      <div className="p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-medium text-text-main">Logs Settings</p>
            <p className="text-xs text-text-muted">
              Configure detailed logging and call log pipeline settings
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Detailed Logs Enabled</span>
              <p className="text-xs text-text-muted">Enable detailed request/response logging</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Call Log Pipeline</span>
              <p className="text-xs text-text-muted">Enable call log processing pipeline</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Max Detail Size (KB)</span>
              <p className="text-xs text-text-muted">Maximum size for detailed log entries</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Ring Buffer Size</span>
              <p className="text-xs text-text-muted">Size of the ring buffer for logs</p>
            </label>
          </div>
        </div>
      </div>

      {/* Cache Settings Section */}
      <div className="p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-medium text-text-main">Cache Settings</p>
            <p className="text-xs text-text-muted">
              Configure semantic and prompt caching behavior
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Semantic Cache Enabled</span>
              <p className="text-xs text-text-muted">
                Enable semantic caching for similar requests
              </p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Semantic Cache Max Size</span>
              <p className="text-xs text-text-muted">Maximum number of semantic cache entries</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Semantic Cache TTL</span>
              <p className="text-xs text-text-muted">
                Time-to-live for semantic cache entries (ms)
              </p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Prompt Cache Enabled</span>
              <p className="text-xs text-text-muted">Enable prompt caching</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Prompt Cache Strategy</span>
              <p className="text-xs text-text-muted">Strategy for prompt caching</p>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">
              <span className="font-medium">Always Preserve Client Cache</span>
              <p className="text-xs text-text-muted">Client cache preservation policy</p>
            </label>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-medium text-text-main">Log retention policy</p>
            <p className="text-xs text-text-muted">
              Request logs retain up to <code>CALL_LOGS_TABLE_MAX_ROWS</code> rows (default:
              100,000). Proxy logs retain up to <code>PROXY_LOGS_TABLE_MAX_ROWS</code> rows. Older
              entries auto-deleted.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              Call {storageHealth.retentionDays.call}d
            </Badge>
            <Badge variant="default" size="sm">
              App {storageHealth.retentionDays.app}d
            </Badge>
            <Badge variant="default" size="sm">
              {formatRows(storageHealth.tableMaxRows?.callLogs)} rows
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-bg border border-border mb-4">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div>
            <p className="text-sm font-medium text-text-main">Database backup retention</p>
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
            onClick={handleCleanupBackups}
            loading={cleanupBackupsLoading}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              auto_delete
            </span>
            Clean old backups
          </Button>
        </div>
        {cleanupBackupsStatus.message && (
          <div
            className={`mt-3 p-3 rounded-lg text-sm ${
              cleanupBackupsStatus.type === "success"
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}
            role="alert"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {cleanupBackupsStatus.type === "success" ? "check_circle" : "error"}
              </span>
              {cleanupBackupsStatus.message}
            </div>
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
              await fetchAndDownload(
                "/api/db-backups/exportAll",
                "omniroute-full-backup.tar.gz",
                t("exportFailed")
              );
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
        <Button variant="outline" size="sm" onClick={handleExportJson} loading={exportLoading}>
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            data_object
          </span>
          Export JSON
        </Button>
        <Button variant="outline" size="sm" onClick={handleImportJsonClick} loading={importLoading}>
          <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
            data_object
          </span>
          Import JSON
        </Button>
        <input
          ref={jsonInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleJsonSelected}
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

      {/* Maintenance */}
      <div className="pt-3 border-t border-border/50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[18px] text-blue-500" aria-hidden="true">
            build
          </span>
          <p className="font-medium">{t("maintenance") || "Maintenance"}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            loading={clearCacheLoading}
            onClick={async () => {
              setClearCacheLoading(true);
              setClearCacheStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/cache", { method: "DELETE" });
                const data = await res.json();
                if (res.ok) {
                  setClearCacheStatus({
                    type: "success",
                    message: t("cacheCleared") || "Cache cleared successfully",
                  });
                } else {
                  setClearCacheStatus({
                    type: "error",
                    message: data.error || t("clearCacheFailed") || "Failed to clear cache",
                  });
                }
              } catch {
                setClearCacheStatus({ type: "error", message: t("errorOccurred") });
              } finally {
                setClearCacheLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            {t("clearCache") || "Clear Cache"}
          </Button>
          {clearCacheStatus.message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                clearCacheStatus.type === "success"
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
              role="alert"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {clearCacheStatus.type === "success" ? "check_circle" : "error"}
                </span>
                {clearCacheStatus.message}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            loading={purgeLogsLoading}
            onClick={async () => {
              setPurgeLogsLoading(true);
              setPurgeLogsStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/purge-logs", { method: "POST" });
                const data = await res.json();
                if (res.ok) {
                  setPurgeLogsStatus({
                    type: "success",
                    message:
                      t("logsDeleted", { count: data.deleted }) ||
                      `Purged ${data.deleted} expired log(s)`,
                  });
                } else {
                  setPurgeLogsStatus({
                    type: "error",
                    message: data.error || t("purgeLogsFailed") || "Failed to purge logs",
                  });
                }
              } catch {
                setPurgeLogsStatus({ type: "error", message: t("errorOccurred") });
              } finally {
                setPurgeLogsLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              auto_delete
            </span>
            {t("purgeExpiredLogs") || "Purge Expired Logs"}
          </Button>
          {purgeLogsStatus.message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                purgeLogsStatus.type === "success"
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
              role="alert"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {purgeLogsStatus.type === "success" ? "check_circle" : "error"}
                </span>
                {purgeLogsStatus.message}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Purge Data section */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="material-symbols-outlined text-[18px] text-red-500"
                aria-hidden="true"
              >
                delete_forever
              </span>
              <p className="font-medium">Purge Data</p>
            </div>
            <p className="text-xs text-text-muted">
              Immediately delete all records (no retention check). Use with caution.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            loading={purgeQuotaSnapshotsLoading}
            onClick={async () => {
              setPurgeQuotaSnapshotsLoading(true);
              setPurgeQuotaSnapshotsStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/purge-quota-snapshots", { method: "POST" });
                const data = await res.json();
                if (res.ok) {
                  setPurgeQuotaSnapshotsStatus({
                    type: "success",
                    message: `Purged ${data.deleted} quota snapshots`,
                  });
                } else {
                  setPurgeQuotaSnapshotsStatus({
                    type: "error",
                    message: data.error || "Failed to purge quota snapshots",
                  });
                }
              } catch {
                setPurgeQuotaSnapshotsStatus({ type: "error", message: t("errorOccurred") });
              } finally {
                setPurgeQuotaSnapshotsLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            Purge Quota Snapshots
          </Button>
          <Button
            variant="outline"
            size="sm"
            loading={purgeCallLogsLoading}
            onClick={async () => {
              setPurgeCallLogsLoading(true);
              setPurgeCallLogsStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/purge-call-logs", { method: "POST" });
                const data = await res.json();
                if (res.ok) {
                  setPurgeCallLogsStatus({
                    type: "success",
                    message: `Purged ${data.deleted} call logs`,
                  });
                } else {
                  setPurgeCallLogsStatus({
                    type: "error",
                    message: data.error || "Failed to purge call logs",
                  });
                }
              } catch {
                setPurgeCallLogsStatus({ type: "error", message: t("errorOccurred") });
              } finally {
                setPurgeCallLogsLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            Purge Call Logs
          </Button>
          <Button
            variant="outline"
            size="sm"
            loading={purgeDetailedLogsLoading}
            onClick={async () => {
              setPurgeDetailedLogsLoading(true);
              setPurgeDetailedLogsStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/purge-detailed-logs", { method: "POST" });
                const data = await res.json();
                if (res.ok) {
                  setPurgeDetailedLogsStatus({
                    type: "success",
                    message: `Purged ${data.deleted} detailed logs`,
                  });
                } else {
                  setPurgeDetailedLogsStatus({
                    type: "error",
                    message: data.error || "Failed to purge detailed logs",
                  });
                }
              } catch {
                setPurgeDetailedLogsStatus({ type: "error", message: t("errorOccurred") });
              } finally {
                setPurgeDetailedLogsLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            Purge Detailed Logs
          </Button>
        </div>
        {(purgeQuotaSnapshotsStatus.message ||
          purgeCallLogsStatus.message ||
          purgeDetailedLogsStatus.message) && (
          <div className="flex flex-col gap-2 mt-3">
            {purgeQuotaSnapshotsStatus.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  purgeQuotaSnapshotsStatus.type === "success"
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}
                role="alert"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    {purgeQuotaSnapshotsStatus.type === "success" ? "check_circle" : "error"}
                  </span>
                  {purgeQuotaSnapshotsStatus.message}
                </div>
              </div>
            )}
            {purgeCallLogsStatus.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  purgeCallLogsStatus.type === "success"
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}
                role="alert"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    {purgeCallLogsStatus.type === "success" ? "check_circle" : "error"}
                  </span>
                  {purgeCallLogsStatus.message}
                </div>
              </div>
            )}
            {purgeDetailedLogsStatus.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  purgeDetailedLogsStatus.type === "success"
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}
                role="alert"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    {purgeDetailedLogsStatus.type === "success" ? "check_circle" : "error"}
                  </span>
                  {purgeDetailedLogsStatus.message}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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

      {/* Task 23: Retention Policy Settings */}
      {!dbSettingsLoading && dbSettings && (
        <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              schedule
            </span>
            Retention Policy Settings
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-muted mb-1">Quota Snapshots (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.quotaSnapshots}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      quotaSnapshots: parseInt(e.target.value) || 7,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">
                Compression Analytics (days)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.compressionAnalytics}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      compressionAnalytics: parseInt(e.target.value) || 30,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">MCP Audit (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.mcpAudit}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      mcpAudit: parseInt(e.target.value) || 30,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">A2A Events (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.a2aEvents}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      a2aEvents: parseInt(e.target.value) || 30,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">Call Logs (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.callLogs}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      callLogs: parseInt(e.target.value) || 30,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">Usage History (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.usageHistory}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      usageHistory: parseInt(e.target.value) || 30,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">Memory Entries (days)</label>
              <input
                type="number"
                min="1"
                max="365"
                value={dbSettings.retention.memoryEntries}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    retention: {
                      ...dbSettings.retention,
                      memoryEntries: parseInt(e.target.value) || 30,
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-3">
            <Button
              variant="primary"
              size="sm"
              onClick={saveDatabaseSettings}
              loading={dbSettingsSaving}
            >
              Save Retention Settings
            </Button>
          </div>
        </div>
      )}

      {/* Task 24: Compression/Aggregation Settings */}
      {!dbSettingsLoading && dbSettings && (
        <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              compress
            </span>
            Compression & Aggregation Settings
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="aggregation-enabled"
                checked={dbSettings.aggregation.enabled}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    aggregation: { ...dbSettings.aggregation, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="aggregation-enabled" className="text-sm">
                Enable Data Aggregation
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  Raw Data Retention (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={dbSettings.aggregation.rawDataRetentionDays}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      aggregation: {
                        ...dbSettings.aggregation,
                        rawDataRetentionDays: parseInt(e.target.value) || 30,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Granularity</label>
                <select
                  value={dbSettings.aggregation.granularity}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      aggregation: {
                        ...dbSettings.aggregation,
                        granularity: e.target.value as "hourly" | "daily" | "weekly",
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Button
              variant="primary"
              size="sm"
              onClick={saveDatabaseSettings}
              loading={dbSettingsSaving}
            >
              Save Aggregation Settings
            </Button>
          </div>
        </div>
      )}

      {/* Task 25: Optimization Settings */}
      {!dbSettingsLoading && dbSettings && (
        <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              tune
            </span>
            Optimization Settings
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-muted mb-1">Auto Vacuum Mode</label>
                <select
                  value={dbSettings.optimization.autoVacuumMode}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      optimization: {
                        ...dbSettings.optimization,
                        autoVacuumMode: e.target.value as "NONE" | "FULL" | "INCREMENTAL",
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="NONE">None</option>
                  <option value="FULL">Full</option>
                  <option value="INCREMENTAL">Incremental</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Scheduled Vacuum</label>
                <select
                  value={dbSettings.optimization.scheduledVacuum}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      optimization: {
                        ...dbSettings.optimization,
                        scheduledVacuum: e.target.value as "never" | "daily" | "weekly" | "monthly",
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="never">Never</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Vacuum Hour (0-23)</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={dbSettings.optimization.vacuumHour}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      optimization: {
                        ...dbSettings.optimization,
                        vacuumHour: parseInt(e.target.value) || 2,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Page Size (bytes)</label>
                <input
                  type="number"
                  min="512"
                  max="65536"
                  step="512"
                  value={dbSettings.optimization.pageSize}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      optimization: {
                        ...dbSettings.optimization,
                        pageSize: parseInt(e.target.value) || 4096,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  Cache Size (KB, negative = % of RAM)
                </label>
                <input
                  type="number"
                  value={dbSettings.optimization.cacheSize}
                  onChange={(e) =>
                    setDbSettings({
                      ...dbSettings,
                      optimization: {
                        ...dbSettings.optimization,
                        cacheSize: parseInt(e.target.value) || -2000,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="optimize-on-startup"
                checked={dbSettings.optimization.optimizeOnStartup}
                onChange={(e) =>
                  setDbSettings({
                    ...dbSettings,
                    optimization: {
                      ...dbSettings.optimization,
                      optimizeOnStartup: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="optimize-on-startup" className="text-sm">
                Optimize on Startup
              </label>
            </div>
          </div>
          <div className="mt-3">
            <Button
              variant="primary"
              size="sm"
              onClick={saveDatabaseSettings}
              loading={dbSettingsSaving}
            >
              Save Optimization Settings
            </Button>
          </div>
        </div>
      )}

      {/* Task 26: Database Stats Display */}
      {!dbSettingsLoading && dbSettings && dbSettings.stats && (
        <div className="mt-6 p-4 rounded-lg border border-border bg-bg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                analytics
              </span>
              Database Statistics
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshDatabaseStats}
              loading={dbStatsRefreshing}
            >
              <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
                refresh
              </span>
              Refresh
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-text-muted mb-1">Database Size</p>
              <p className="text-sm font-semibold">
                {formatBytes(dbSettings.stats.databaseSizeBytes)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-text-muted mb-1">Page Count</p>
              <p className="text-sm font-semibold">{dbSettings.stats.pageCount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-text-muted mb-1">Freelist Count</p>
              <p className="text-sm font-semibold">
                {dbSettings.stats.freelistCount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-text-muted mb-1">Last Vacuum</p>
              <p className="text-sm font-semibold">
                {dbSettings.stats.lastVacuumAt
                  ? new Date(dbSettings.stats.lastVacuumAt).toLocaleString(locale)
                  : "Never"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-text-muted mb-1">Last Optimization</p>
              <p className="text-sm font-semibold">
                {dbSettings.stats.lastOptimizationAt
                  ? new Date(dbSettings.stats.lastOptimizationAt).toLocaleString(locale)
                  : "Never"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="text-xs text-text-muted mb-1">Integrity Check</p>
              <p className="text-sm font-semibold">
                {dbSettings.stats.integrityCheck === "ok" ? (
                  <span className="text-green-500">✓ OK</span>
                ) : dbSettings.stats.integrityCheck === "error" ? (
                  <span className="text-red-500">✗ Error</span>
                ) : (
                  "Not checked"
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Debug Mode */}
      <div className="mt-6 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[18px] text-text-muted"
              aria-hidden="true"
            >
              bug_report
            </span>
            <div>
              <p className="font-medium">{t("debugToggle")}</p>
            </div>
          </div>
          <Toggle checked={debugMode} onChange={updateDebugMode} disabled={generalLoading} />
        </div>
      </div>

      {/* Usage Token Buffer */}
      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[18px] text-text-muted"
              aria-hidden="true"
            >
              pin
            </span>
            <div>
              <p className="font-medium">Usage Token Buffer</p>
              <p className="text-sm text-text-muted mt-1">
                Extra tokens added to reported usage to account for system prompt overhead. Set to 0
                to report raw provider token counts. Default: 2000.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={0}
              max={50000}
              value={bufferInput}
              onChange={(e) => setBufferInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") updateUsageTokenBuffer();
              }}
              className="w-32 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
              disabled={generalLoading}
            />
            <Button
              size="sm"
              variant="primary"
              onClick={updateUsageTokenBuffer}
              disabled={
                bufferSaving || generalLoading || parseInt(bufferInput, 10) === usageTokenBuffer
              }
            >
              {bufferSaving ? tc("saving") : tc("save")}
            </Button>
            {usageTokenBuffer !== null && parseInt(bufferInput, 10) !== usageTokenBuffer && (
              <span className="text-xs text-text-muted">Current: {usageTokenBuffer}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
