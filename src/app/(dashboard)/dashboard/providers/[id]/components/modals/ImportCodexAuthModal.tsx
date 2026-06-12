"use client";
import { useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import { Button, Modal, Select } from "@/shared/components";
interface ImportCodexAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type ImportTopTab = "single" | "bulk";
type BulkSubMode = "upload" | "paste" | "zip";

interface BulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}

function extractEmailFromJwtLocal(idToken: string): string | null {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

function previewCodexJson(json: unknown): { valid: boolean; email: string | null } {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    // Codex CLI no longer writes auth_mode — accept both with and without it.
    // Only reject when auth_mode is explicitly set to something other than "chatgpt".
    if (
      !doc ||
      (doc.auth_mode !== undefined && doc.auth_mode !== null && doc.auth_mode !== "chatgpt")
    )
      return { valid: false, email: null };
    const tokens =
      doc.tokens && typeof doc.tokens === "object" ? (doc.tokens as Record<string, unknown>) : null;
    if (!tokens?.id_token || typeof tokens.id_token !== "string")
      return { valid: false, email: null };
    return { valid: true, email: extractEmailFromJwtLocal(tokens.id_token as string) };
  } catch {
    return { valid: false, email: null };
  }
}

function parseBulkPasteText(text: string): BulkEntry[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const tryParse = (s: string): BulkEntry => {
    try {
      const json = JSON.parse(s);
      const { email } = previewCodexJson(json);
      return { name: email || "unknown", json, parseError: null, email };
    } catch {
      return { name: "parse error", json: null, parseError: "Invalid JSON", email: null };
    }
  };

  try {
    const arr = JSON.parse(trimmed);
    if (Array.isArray(arr))
      return arr.map((item) => {
        const { email } = previewCodexJson(item);
        return { name: email || "unknown", json: item, parseError: null, email };
      });
    const { email } = previewCodexJson(arr);
    return [{ name: email || "unknown", json: arr, parseError: null, email }];
  } catch {
    return trimmed
      .split(/^---$/m)
      .map((s) => tryParse(s.trim()))
      .filter((e) => e.json !== null || e.parseError !== null);
  }
}

export function ImportCodexAuthModal({ onClose, onSuccess }: ImportCodexAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  // Top-level tab: Single / Bulk
  const [topTab, setTopTab] = useState<ImportTopTab>("single");

  // ── Single mode state ──
  const [singleTab, setSingleTab] = useState<"upload" | "paste">("upload");
  const [singleParsedJson, setSingleParsedJson] = useState<unknown>(null);
  const [singleParseError, setSingleParseError] = useState<string | null>(null);
  const [singleDetectedEmail, setSingleDetectedEmail] = useState<string | null>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleOverwrite, setSingleOverwrite] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);

  // ── Bulk mode state ──
  const [bulkMode, setBulkMode] = useState<BulkSubMode>("upload");
  const [bulkEntries, setBulkEntries] = useState<BulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkZipExtracting, setBulkZipExtracting] = useState(false);
  const [bulkZipError, setBulkZipError] = useState<string | null>(null);
  const [bulkOverwrite, setBulkOverwrite] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    errors: { index: number; name: string; message: string }[];
  } | null>(null);

  // ── Single helpers ──

  function handleSinglePreview(json: unknown) {
    setSingleParseError(null);
    setSingleDetectedEmail(null);
    setSingleParsedJson(null);
    const { valid, email } = previewCodexJson(json);
    if (!valid) {
      setSingleParseError(t("codexImportInvalidShape") || "Not a valid Codex auth.json");
      return;
    }
    setSingleDetectedEmail(email);
    if (email && !singleEmail) setSingleEmail(email);
    setSingleParsedJson(json);
  }

  function handleSingleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        handleSinglePreview(JSON.parse(ev.target?.result as string));
      } catch {
        setSingleParseError(t("codexImportInvalidJson") || "Could not parse JSON");
      }
    };
    reader.readAsText(file);
  }

  function handleSinglePasteChange(text: string) {
    setSinglePasteText(text);
    if (!text.trim()) {
      setSingleParsedJson(null);
      setSingleParseError(null);
      setSingleDetectedEmail(null);
      return;
    }
    try {
      handleSinglePreview(JSON.parse(text));
    } catch {
      setSingleParseError(t("codexImportInvalidJson") || "Could not parse JSON");
      setSingleParsedJson(null);
    }
  }

  async function handleSingleSubmit() {
    if (!singleParsedJson) return;
    setSingleLoading(true);
    setSingleError(null);
    try {
      const res = await fetch("/api/providers/codex-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: { kind: "json", json: singleParsedJson },
          name: singleName.trim() || undefined,
          email: singleEmail.trim() || undefined,
          overwriteExisting: singleOverwrite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSingleError(
          data.code === "duplicate_account"
            ? t("codexImportDuplicate") ||
                "Account already exists — enable Replace existing to overwrite"
            : data.error || t("codexImportFailed") || "Failed to import"
        );
        return;
      }
      notify.success(t("codexImportSuccess") || "Codex connection imported successfully");
      onSuccess();
    } catch {
      setSingleError(t("codexImportFailed") || "Failed to import Codex auth");
    } finally {
      setSingleLoading(false);
    }
  }

  // ── Bulk helpers ──

  function handleBulkFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const entries: BulkEntry[] = [];
    let pending = files.length;
    if (pending === 0) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const { email } = previewCodexJson(json);
          entries.push({
            name: email || file.name.replace(".json", ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          entries.push({ name: file.name, json: null, parseError: "Invalid JSON", email: null });
        }
        if (--pending === 0) setBulkEntries([...entries]);
      };
      reader.readAsText(file);
    });
  }

  function handleBulkPasteChange(text: string) {
    setBulkPasteText(text);
    if (!text.trim()) {
      setBulkEntries([]);
      return;
    }
    setBulkEntries(parseBulkPasteText(text));
  }

  async function handleZipUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulkZipExtracting(true);
    setBulkZipError(null);
    setBulkEntries([]);
    try {
      const res = await fetch("/api/providers/codex-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBulkZipError(data.error || t("codexImportBulkZipError") || "Failed to extract ZIP");
        return;
      }
      const extracted: BulkEntry[] = (data.entries || []).map(
        (entry: { name: string; json: unknown; parseError: string | null }) => {
          if (entry.parseError)
            return { name: entry.name, json: null, parseError: entry.parseError, email: null };
          const { email } = previewCodexJson(entry.json);
          return {
            name: email || entry.name.replace(".json", ""),
            json: entry.json,
            parseError: null,
            email,
          };
        }
      );
      setBulkEntries(extracted);
    } catch {
      setBulkZipError(t("codexImportBulkZipError") || "Failed to extract ZIP");
    } finally {
      setBulkZipExtracting(false);
    }
  }

  async function handleBulkSubmit() {
    const validEntries = bulkEntries.filter((e) => !e.parseError && e.json !== null);
    if (validEntries.length === 0) return;
    setBulkLoading(true);
    setBulkResult(null);
    try {
      const res = await fetch("/api/providers/codex-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name || undefined,
            email: e.email || undefined,
          })),
          overwriteExisting: bulkOverwrite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(data.error || t("codexImportFailed") || "Failed to import");
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, errors: data.errors || [] });
      if (data.success > 0) onSuccess();
    } catch {
      notify.error(t("codexImportFailed") || "Failed to import Codex auth");
    } finally {
      setBulkLoading(false);
    }
  }

  const singleCanSubmit = !!singleParsedJson && !singleParseError && !singleLoading;
  const validBulkCount = bulkEntries.filter((e) => !e.parseError && e.json !== null).length;
  const bulkCanSubmit = validBulkCount > 0 && !bulkLoading && !bulkZipExtracting;

  const TOP_TABS: { id: ImportTopTab; label: string }[] = [
    { id: "single", label: t("codexImportTabSingle") || "Single" },
    { id: "bulk", label: t("codexImportTabBulk") || "Bulk" },
  ];

  const BULK_MODES: { id: BulkSubMode; label: string }[] = [
    { id: "upload", label: t("codexImportBulkModeUpload") || "Upload files" },
    { id: "paste", label: t("codexImportBulkModePaste") || "Paste list" },
    { id: "zip", label: t("codexImportBulkModeZip") || "ZIP archive" },
  ];

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t("codexImportModalTitle") || "Import Codex Auth"}
      maxWidth="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        {/* Top-level Single / Bulk tabs */}
        <div className="flex border-b border-border">
          {TOP_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setTopTab(id);
                setBulkResult(null);
                setSingleError(null);
              }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                topTab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Single tab ── */}
        {topTab === "single" && (
          <>
            {/* Source sub-tabs */}
            <div className="flex border-b border-border">
              {(["upload", "paste"] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setSingleTab(id);
                    setSingleParsedJson(null);
                    setSingleParseError(null);
                    setSingleDetectedEmail(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    singleTab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-main"
                  }`}
                >
                  {id === "upload"
                    ? t("codexImportTabUpload") || "Upload file"
                    : t("codexImportTabPaste") || "Paste JSON"}
                </button>
              ))}
            </div>

            {singleTab === "upload" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportFileLabel") || "Choose auth.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportFileHint") ||
                    "Select the auth.json file exported from Codex or OmniRoute."}
                </p>
              </div>
            )}

            {singleTab === "paste" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportPasteLabel") || "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => handleSinglePasteChange(e.target.value)}
                  rows={7}
                  placeholder='{ "auth_mode": "chatgpt", ... }'
                  className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
            )}

            {singleParseError && <p className="text-sm text-red-500">{singleParseError}</p>}
            {singleDetectedEmail && !singleParseError && (
              <p className="text-xs text-text-muted">
                {t("codexImportDetectedEmail", { email: singleDetectedEmail }) ||
                  `Detected: ${singleDetectedEmail}`}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportEmailLabel") || "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportEmailHint") || "Auto-detected from the file; edit if needed."}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportNameLabel") || "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder={singleEmail || "Codex (imported)"}
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={singleOverwrite}
                  onChange={(e) => setSingleOverwrite(e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-text-main">
                  {t("codexImportOverwriteLabel") ||
                    "Replace existing connection if account already exists"}
                </span>
              </label>
            </div>

            {singleError && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {singleError}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleSingleSubmit}
                disabled={!singleCanSubmit}
                loading={singleLoading}
                fullWidth
              >
                {t("codexImportSubmit") || "Import"}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}

        {/* ── Bulk tab ── */}
        {topTab === "bulk" && (
          <>
            {/* Sub-mode selector */}
            <div className="flex gap-1 p-1 bg-bg-subtle rounded-lg">
              {BULK_MODES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    setBulkMode(id);
                    setBulkEntries([]);
                    setBulkZipError(null);
                    setBulkPasteText("");
                    setBulkResult(null);
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    bulkMode === id
                      ? "bg-bg-primary text-text-main shadow-sm"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Upload mode */}
            {bulkMode === "upload" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkUploadHint") || "Select multiple .json files"}
                </p>
              </div>
            )}

            {/* Paste mode */}
            {bulkMode === "paste" && (
              <div className="flex flex-col gap-2">
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={7}
                  placeholder={'[{ "auth_mode": "chatgpt", ... }, ...]'}
                  className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkPasteHint") || "JSON array or multiple JSONs separated by ---"}
                </p>
              </div>
            )}

            {/* ZIP mode */}
            {bulkMode === "zip" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleZipUpload}
                  disabled={bulkZipExtracting}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer disabled:opacity-50"
                />
                {bulkZipExtracting && (
                  <p className="text-xs text-text-muted animate-pulse">
                    {t("codexImportBulkZipExtracting") || "Extracting ZIP…"}
                  </p>
                )}
                {bulkZipError && <p className="text-sm text-red-500">{bulkZipError}</p>}
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkZipHint") ||
                    "Upload a .zip containing auth.json files (max 50 files, 10 MB)"}
                </p>
              </div>
            )}

            {/* Entry preview list */}
            {bulkEntries.length > 0 && !bulkResult && (
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-subtle p-2">
                <p className="text-xs font-medium text-text-muted px-1">
                  {validBulkCount} / {bulkEntries.length} valid
                </p>
                {bulkEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 rounded">
                    <span
                      className={`material-symbols-outlined text-[14px] ${entry.parseError ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {entry.parseError ? "error" : "check_circle"}
                    </span>
                    <span className="text-xs text-text-main flex-1 truncate">{entry.name}</span>
                    {entry.parseError && (
                      <span className="text-xs text-red-400">{entry.parseError}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Overwrite checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bulkOverwrite}
                onChange={(e) => setBulkOverwrite(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-text-main">
                {t("codexImportOverwriteLabel") ||
                  "Replace existing connections if accounts already exist"}
              </span>
            </label>

            {/* Result panel */}
            {bulkResult && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  bulkResult.failed === 0
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}
              >
                <p className="font-medium">
                  {bulkResult.success}{" "}
                  {t("codexImportBulkSuccess", { count: bulkResult.success }) || "imported"} ·{" "}
                  {bulkResult.failed}{" "}
                  {t("codexImportBulkFailed", { count: bulkResult.failed }) || "failed"}
                </p>
                {bulkResult.errors.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-xs">
                    {bulkResult.errors.map((e, i) => (
                      <li key={i}>
                        <span className="font-medium">{e.name}:</span> {e.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleBulkSubmit}
                disabled={!bulkCanSubmit}
                loading={bulkLoading}
                fullWidth
              >
                {bulkLoading
                  ? t("saving") || "Importing…"
                  : typeof t.has === "function" && t.has("codexImportBulkSubmit")
                    ? t("codexImportBulkSubmit", { count: validBulkCount })
                    : `Import ${validBulkCount} accounts`}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export function ApplyCodexAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  // `key`-reset pattern: caller re-mounts the modal each open (different
  // connectionId triggers a new instance), so local confirmation state is
  // naturally fresh without any post-render bookkeeping.
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("codexApplyModalTitle")
      ? t("codexApplyModalTitle")
      : "Apply to Local Codex";
  const targetLabel =
    typeof t.has === "function" && t.has("codexApplyTargetLabel")
      ? t("codexApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("codexApplyBackupLabel")
      ? t("codexApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("codexApplyWarning")
      ? t("codexApplyWarning")
      : "This will replace the existing auth.json. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("codexApplyConfirmCheckbox")
      ? t("codexApplyConfirmCheckbox")
      : "I confirm I want to replace the existing auth.json";
  const applyText = typeof t.has === "function" && t.has("codexApply") ? t("codexApply") : "Apply";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.codex/auth.json
          </code>
          <p className="mt-1 text-xs text-text-muted">{t("providerDetailPathAutoDetectedAllOs")}</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <ul className="text-xs text-text-muted space-y-0.5 list-disc pl-4">
            <li>
              <code className="text-text-main">~/.codex/auth-&lt;timestamp&gt;.bak</code> — quick
              local rollback
            </li>
            <li>Centralized backup history (audit trail)</li>
          </ul>
        </div>
        <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
              warning
            </span>
            <span>{warning}</span>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="rounded border-border"
          />
          {confirmText}
        </label>
        <div className="flex gap-2">
          <Button
            onClick={() => void onConfirm(connectionId)}
            fullWidth
            disabled={!confirmed || inProgress}
          >
            {inProgress ? t("saving") : applyText}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth disabled={inProgress}>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ──── ImportClaudeAuthModal ────────────────────────────────────────────────────
