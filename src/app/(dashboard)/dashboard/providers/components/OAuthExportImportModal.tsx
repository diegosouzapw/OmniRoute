"use client";

import { useRef, useState } from "react";
import { Button, Modal } from "@/shared/components";

interface OAuthExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: () => Promise<void>;
}

type Translator = (key: string, values?: Record<string, unknown>) => string;

type PreviewAccount = {
  index: number;
  provider: string;
  email: string;
  hasRefreshToken: boolean;
  selected: boolean;
};

type ImportOutcome = {
  ok: boolean;
  imported: number;
  failed: number;
  total: number;
  errorLines: string[];
};

/**
 * Pull the account records out of an export document. Accepts the raw
 * third-party export shape (`{ accounts: [...] }` — e.g. Antigravity
 * Manager's cloud-accounts export), a bare top-level array, or a single
 * record object. Returns an empty array when nothing usable is found.
 */
function extractAccounts(doc: unknown): Record<string, unknown>[] {
  let candidate: unknown = doc;
  if (doc && typeof doc === "object" && !Array.isArray(doc)) {
    const maybe = (doc as Record<string, unknown>).accounts;
    if (maybe !== undefined) candidate = maybe;
  }
  if (!candidate) return [];
  const list = Array.isArray(candidate) ? candidate : [candidate];
  return list.filter((item): item is Record<string, unknown> => !!item && typeof item === "object");
}

function accountEmail(account: Record<string, unknown>): string {
  if (typeof account.email === "string" && account.email) return account.email;
  const token = account.token as Record<string, unknown> | undefined;
  if (token && typeof token.email === "string" && token.email) return token.email;
  return "(no email)";
}

function accountHasRefreshToken(account: Record<string, unknown>): boolean {
  const token = (account.token as Record<string, unknown> | undefined) ?? account;
  return typeof token.refresh_token === "string" && token.refresh_token.length > 0;
}

/** Label for the preview table: the export's own provider field if present. */
function accountProviderLabel(account: Record<string, unknown>): string {
  if (typeof account.provider === "string" && account.provider) return account.provider;
  return "antigravity";
}

/**
 * Wizard: upload an account-manager export JSON (plaintext tokens), review the
 * detected accounts, then bulk-import them as OAuth connections through
 * POST /api/oauth/<provider>/import-export — the same persistence path as the
 * credential-blob paste flow, minus the blob dance. Stale access tokens are
 * refreshed server-side from the export's refresh tokens before finalizing.
 */
export function OAuthExportImportModal({
  isOpen,
  onClose,
  onImported,
}: OAuthExportImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [provider, setProvider] = useState("antigravity");
  const [accounts, setAccounts] = useState<Record<string, unknown>[]>([]);
  const [preview, setPreview] = useState<PreviewAccount[]>([]);
  const [parseError, setParseError] = useState("");
  const [importing, setImporting] = useState(false);
  const [outcome, setOutcome] = useState<ImportOutcome | null>(null);

  const t: Translator = (key, values) => {
    const dict: Record<string, string> = {
      oauthExportTitle: "Import account-manager export",
      oauthExportDescription:
        "Upload a plaintext export from an account manager (e.g. Antigravity Manager's cloud-accounts export). Tokens are refreshed server-side and each account becomes an OAuth connection — duplicates refresh in place.",
      oauthExportProviderLabel: "Provider",
      oauthExportChoose: "Choose file",
      oauthExportSchemaHint:
        "Accepted: {accounts:[…]} document, a bare array, or a single record. Tokens may live under a nested token object or flat on the record.",
      oauthExportDetected: "{count} account(s) detected",
      oauthExportColEmail: "Email",
      oauthExportColProvider: "Provider",
      oauthExportColRefresh: "Refresh token",
      oauthExportYes: "yes",
      oauthExportNo: "no",
      oauthExportImporting: "Importing…",
      oauthExportImport: "Import {count} account(s)",
      oauthExportResult: "Imported {imported}/{total} — {failed} failed",
      oauthExportCancel: "Cancel",
      oauthExportClose: "Close",
      oauthExportParseError: "Could not read any accounts from this file.",
    };
    let text = dict[key] ?? key;
    if (values) {
      for (const [k, v] of Object.entries(values)) text = text.replace(`{${k}}`, String(v));
    }
    return text;
  };

  const resetFile = () => {
    setFileName("");
    setAccounts([]);
    setPreview([]);
    setParseError("");
    setOutcome(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setOutcome(null);
    setParseError("");
    try {
      if (file.size > 5 * 1024 * 1024) throw new Error("File too large");
      const doc = JSON.parse(await file.text());
      const parsed = extractAccounts(doc);
      if (parsed.length === 0 || parsed.length > 100) {
        setParseError(t("oauthExportParseError"));
        setAccounts([]);
        setPreview([]);
        return;
      }
      setAccounts(parsed);
      setPreview(
        parsed.map((account, index) => ({
          index,
          provider: accountProviderLabel(account),
          email: accountEmail(account),
          hasRefreshToken: accountHasRefreshToken(account),
          selected: true,
        }))
      );
    } catch {
      setParseError(t("oauthExportParseError"));
      setAccounts([]);
      setPreview([]);
    }
  };

  const toggleRow = (index: number) => {
    setPreview((prev) =>
      prev.map((row) => (row.index === index ? { ...row, selected: !row.selected } : row))
    );
  };

  const toggleAll = (checked: boolean) => {
    setPreview((prev) => prev.map((row) => ({ ...row, selected: checked })));
  };

  const selectedCount = preview.filter((row) => row.selected).length;

  const handleImport = async () => {
    const toImport = accounts.filter((_, idx) => preview[idx]?.selected);
    if (toImport.length === 0) return;
    setImporting(true);
    setOutcome(null);
    try {
      const res = await fetch(`/api/oauth/${encodeURIComponent(provider)}/import-export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accounts: toImport }),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        imported?: number;
        failed?: number;
        total?: number;
        error?: string;
        results?: Array<{ ok?: boolean; index?: number; email?: string; error?: string }>;
      } | null;
      if (!res.ok || !data) {
        setOutcome({
          ok: false,
          imported: 0,
          failed: toImport.length,
          total: toImport.length,
          errorLines: [data?.error ?? `HTTP ${res.status}`],
        });
        return;
      }
      setOutcome({
        ok: !!data.success,
        imported: data.imported ?? 0,
        failed: data.failed ?? 0,
        total: data.total ?? toImport.length,
        errorLines: (data.results ?? [])
          .filter((r) => !r.ok)
          .slice(0, 8)
          .map((r) => `${r.email ?? `#${r.index}`}: ${r.error ?? "unknown error"}`),
      });
      if ((data.imported ?? 0) > 0) {
        try {
          await onImported();
        } catch {
          /* refresh failure must not replace the import result */
        }
      }
    } catch (err) {
      setOutcome({
        ok: false,
        imported: 0,
        failed: toImport.length,
        total: toImport.length,
        errorLines: [err instanceof Error ? err.message : String(err)],
      });
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    if (importing) return;
    resetFile();
    onClose();
  };

  const failed = !!outcome && (outcome.failed > 0 || !outcome.ok);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("oauthExportTitle")} maxWidth="xl">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">{t("oauthExportDescription")}</p>
        <p className="text-xs text-text-muted">{t("oauthExportSchemaHint")}</p>

        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-xs text-text-muted" htmlFor="oauth-export-provider">
            {t("oauthExportProviderLabel")}
          </label>
          <select
            id="oauth-export-provider"
            value={provider}
            disabled={importing}
            onChange={(e) => setProvider(e.target.value)}
            className="text-xs rounded-lg border border-border bg-bg-subtle px-2 py-1.5 text-text-primary"
          >
            <option value="antigravity">antigravity</option>
            <option value="agy">agy</option>
          </select>
          <input
            ref={fileInputRef}
            type="file"
            aria-label="Account export JSON file"
            disabled={importing}
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <Button
            size="sm"
            variant="secondary"
            icon="upload_file"
            onClick={() => fileInputRef.current?.click()}
          >
            {t("oauthExportChoose")}
          </Button>
          {fileName && <span className="text-xs text-text-muted font-mono">{fileName}</span>}
        </div>

        {parseError && (
          <div className="px-3 py-2 rounded border border-red-500/30 bg-red-500/10 text-sm text-red-400">
            {parseError}
          </div>
        )}

        {preview.length > 0 && (
          <>
            <div className="text-xs text-text-muted">
              {t("oauthExportDetected", { count: preview.length })}
            </div>
            <div className="overflow-x-auto max-h-64 overflow-y-auto rounded border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-text-muted border-b border-border bg-bg-subtle sticky top-0">
                    <th className="py-1.5 px-2">
                      <input
                        type="checkbox"
                        aria-label="Select all accounts"
                        disabled={importing}
                        checked={selectedCount === preview.length}
                        onChange={(e) => toggleAll(e.target.checked)}
                      />
                    </th>
                    <th className="py-1.5 px-2">{t("oauthExportColEmail")}</th>
                    <th className="py-1.5 px-2">{t("oauthExportColProvider")}</th>
                    <th className="py-1.5 px-2">{t("oauthExportColRefresh")}</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row) => (
                    <tr key={row.index} className="border-b border-border/40">
                      <td className="py-1 px-2">
                        <input
                          type="checkbox"
                          aria-label={`Select account ${row.index + 1}`}
                          disabled={importing}
                          checked={row.selected}
                          onChange={() => toggleRow(row.index)}
                        />
                      </td>
                      <td className="py-1 px-2 font-medium text-text-main">{row.email}</td>
                      <td className="py-1 px-2 font-mono text-text-muted">{row.provider}</td>
                      <td
                        className={`py-1 px-2 ${row.hasRefreshToken ? "text-emerald-400" : "text-amber-400"}`}
                      >
                        {row.hasRefreshToken ? t("oauthExportYes") : t("oauthExportNo")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {outcome && (
          <div
            className={`px-3 py-2 rounded border text-sm ${
              failed
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {t("oauthExportResult", {
              imported: outcome.imported,
              total: outcome.total,
              failed: outcome.failed,
            })}
            {outcome.errorLines.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-xs text-text-muted font-normal space-y-0.5">
                {outcome.errorLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button size="sm" variant="secondary" onClick={handleClose}>
            {t("oauthExportCancel")}
          </Button>
          <Button
            size="sm"
            icon="upload"
            onClick={handleImport}
            loading={importing}
            disabled={selectedCount === 0 || importing}
          >
            {importing
              ? t("oauthExportImporting")
              : t("oauthExportImport", { count: selectedCount })}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
