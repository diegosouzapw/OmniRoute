"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";

type ParsedProxyEntry = {
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string;
  region?: string;
  status: string;
};

type ParseError = { line: number; reason: string };

interface ProxyBulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: () => Promise<void>;
}

const BULK_IMPORT_TEMPLATE = `# Proxy Bulk Import
# Format: name | type | host | port | username | region | status
# Example:
# My Proxy | http | 1.2.3.4 | 8080 | user | US | active
`;

function parseBulkImportText(text: string): {
  parsed: ParsedProxyEntry[];
  errors: ParseError[];
  skipped: number;
} {
  const lines = text.split("\n");
  const parsed: ParsedProxyEntry[] = [];
  const errors: ParseError[] = [];
  let skipped = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) {
      skipped++;
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 4) {
      errors.push({ line: i + 1, reason: "bulkImportMinFields" });
      continue;
    }
    const [name, type, host, portStr, username, region, status] = parts;
    const port = parseInt(portStr, 10);
    if (!Number.isFinite(port) || port < 1 || port > 65535) {
      errors.push({ line: i + 1, reason: "bulkImportInvalidPort" });
      continue;
    }
    parsed.push({
      name: name || `${host}:${port}`,
      type: ["http", "https", "socks5"].includes(type) ? type : "http",
      host,
      port,
      username: username || undefined,
      region: region || undefined,
      status: status === "inactive" ? "inactive" : "active",
    });
  }

  return { parsed, errors, skipped };
}

export function ProxyBulkImportModal({ isOpen, onClose, onImported }: ProxyBulkImportModalProps) {
  const t = useTranslations("proxyRegistry");
  const [bulkImportText, setBulkImportText] = useState(BULK_IMPORT_TEMPLATE);
  const [bulkImportParsed, setBulkImportParsed] = useState<ParsedProxyEntry[]>([]);
  const [bulkImportErrors, setBulkImportErrors] = useState<ParseError[]>([]);
  const [bulkImportSkipped, setBulkImportSkipped] = useState(0);
  const [bulkImportParsedOnce, setBulkImportParsedOnce] = useState(false);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkImportResult, setBulkImportResult] = useState<{ created: number; updated: number; failed: number } | null>(null);

  const handleParse = () => {
    const result = parseBulkImportText(bulkImportText);
    setBulkImportParsed(result.parsed);
    setBulkImportErrors(result.errors);
    setBulkImportSkipped(result.skipped);
    setBulkImportParsedOnce(true);
    setBulkImportResult(null);
  };

  const handleExecute = async () => {
    if (bulkImportParsed.length === 0) return;
    setBulkImporting(true);
    try {
      const res = await fetch("/api/settings/proxies/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: bulkImportParsed }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setBulkImportResult(data);
        await onImported();
      }
    } finally {
      setBulkImporting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!bulkImporting) onClose();
      }}
      title={t("bulkImportTitle")}
      maxWidth="xl"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">{t("bulkImportDescription")}</p>

        <div>
          <textarea
            className="w-full px-3 py-2 rounded bg-bg-subtle border border-border font-mono text-xs leading-relaxed"
            rows={14}
            value={bulkImportText}
            onChange={(e) => {
              setBulkImportText(e.target.value);
              setBulkImportParsedOnce(false);
              setBulkImportResult(null);
            }}
            spellCheck={false}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="secondary" icon="search" onClick={handleParse}>
            {t("bulkImportParse")}
          </Button>

          {bulkImportParsedOnce && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-emerald-400">{t("bulkImportParsed", { count: bulkImportParsed.length })}</span>
              <span className="text-text-muted">{t("bulkImportSkipped", { count: bulkImportSkipped })}</span>
              {bulkImportErrors.length > 0 && (
                <span className="text-red-400">{t("bulkImportParseErrors", { count: bulkImportErrors.length })}</span>
              )}
            </div>
          )}
        </div>

        {bulkImportErrors.length > 0 && (
          <div className="max-h-28 overflow-y-auto rounded border border-red-500/30 bg-red-500/10 p-2">
            {bulkImportErrors.map((err, idx) => (
              <div key={idx} className="text-xs text-red-400">
                {t("bulkImportErrorLine", { line: err.line, reason: t(err.reason as "bulkImportMinFields" | "bulkImportInvalidPort") })}
              </div>
            ))}
          </div>
        )}

        {bulkImportParsedOnce && bulkImportParsed.length > 0 && (
          <div className="overflow-x-auto max-h-48 overflow-y-auto rounded border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-muted border-b border-border bg-bg-subtle sticky top-0">
                  <th className="py-1.5 px-2">{t("tableName")}</th>
                  <th className="py-1.5 px-2">{t("labelType")}</th>
                  <th className="py-1.5 px-2">{t("labelHost")}</th>
                  <th className="py-1.5 px-2">{t("labelPort")}</th>
                  <th className="py-1.5 px-2">{t("labelUsername")}</th>
                  <th className="py-1.5 px-2">{t("labelRegion")}</th>
                  <th className="py-1.5 px-2">{t("labelStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {bulkImportParsed.map((entry, idx) => (
                  <tr key={idx} className="border-b border-border/40">
                    <td className="py-1 px-2 font-medium text-text-main">{entry.name}</td>
                    <td className="py-1 px-2">
                      <span className="px-1.5 py-0.5 rounded bg-bg-subtle border border-border text-[10px]">{entry.type}</span>
                    </td>
                    <td className="py-1 px-2 font-mono text-text-muted">{entry.host}</td>
                    <td className="py-1 px-2 font-mono text-text-muted">{entry.port}</td>
                    <td className="py-1 px-2 text-text-muted">{entry.username || "—"}</td>
                    <td className="py-1 px-2 text-text-muted">{entry.region || "—"}</td>
                    <td className="py-1 px-2">
                      <span className={entry.status === "active" ? "text-emerald-400" : "text-text-muted"}>
                        {entry.status === "active" ? t("statusActive") : t("statusInactive")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {bulkImportParsedOnce && bulkImportParsed.length === 0 && bulkImportErrors.length === 0 && (
          <div className="text-sm text-amber-400">{t("bulkImportNoValidEntries")}</div>
        )}

        {bulkImportResult && (
          <div className="px-3 py-2 rounded border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-400">
            {t("bulkImportSuccess", { created: bulkImportResult.created, updated: bulkImportResult.updated, failed: bulkImportResult.failed })}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button size="sm" variant="secondary" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            icon="upload"
            onClick={handleExecute}
            loading={bulkImporting}
            disabled={!bulkImportParsedOnce || bulkImportParsed.length === 0}
          >
            {bulkImporting ? t("bulkImportImporting") : bulkImportParsed.length > 0 ? t("bulkImportImport", { count: bulkImportParsed.length }) : t("bulkImport")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
