"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";
import type { ParsedProviderImportEntry, ProviderImportParseError } from "./parseProviderImportFile";
import { useImportProvidersFromFile } from "./useImportProvidersFromFile";

interface ImportProvidersFromFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: () => Promise<void>;
}

type Translator = (key: string, values?: Record<string, unknown>) => string;

const PARSE_ERROR_REASON_KEYS = [
  "importErrorMissingProvider",
  "importErrorMissingName",
  "importErrorMissingApiKey",
  "importErrorInvalidPriority",
  "importErrorMalformedRow",
  "importErrorNotArray",
] as const;

/** Per-row parse error list. Split out of the modal to keep it under the LOC ratchet. */
function ParseErrorsList({ errors, t }: { errors: ProviderImportParseError[]; t: Translator }) {
  if (errors.length === 0) return null;
  return (
    <div className="max-h-28 overflow-y-auto rounded border border-red-500/30 bg-red-500/10 p-2">
      {errors.map((err, idx) => (
        <div key={idx} className="text-xs text-red-400">
          {t("importFromFileErrorLine", {
            line: err.line,
            reason: t(
              PARSE_ERROR_REASON_KEYS.includes(err.reason as (typeof PARSE_ERROR_REASON_KEYS)[number])
                ? err.reason
                : "importErrorMalformedRow"
            ),
          })}
        </div>
      ))}
    </div>
  );
}

interface EntriesTableProps {
  entries: ParsedProviderImportEntry[];
  selected: Set<number>;
  onToggleRow: (idx: number) => void;
  onToggleAll: (checked: boolean) => void;
  t: Translator;
}

/** Parsed-rows selection checklist (acceptance criterion #3 of #6836). */
function EntriesTable({ entries, selected, onToggleRow, onToggleAll, t }: EntriesTableProps) {
  if (entries.length === 0) return null;
  return (
    <>
      <div className="text-xs text-text-muted">
        {t("importFromFileSelectHint", { count: selected.size, total: entries.length })}
      </div>
      <div className="overflow-x-auto max-h-64 overflow-y-auto rounded border border-border">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-text-muted border-b border-border bg-bg-subtle sticky top-0">
              <th className="py-1.5 px-2">
                <input
                  type="checkbox"
                  checked={selected.size === entries.length}
                  onChange={(e) => onToggleAll(e.target.checked)}
                />
              </th>
              <th className="py-1.5 px-2">{t("importFromFileColProvider")}</th>
              <th className="py-1.5 px-2">{t("importFromFileColName")}</th>
              <th className="py-1.5 px-2">{t("importFromFileColBaseUrl")}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={idx} className="border-b border-border/40">
                <td className="py-1 px-2">
                  <input type="checkbox" checked={selected.has(idx)} onChange={() => onToggleRow(idx)} />
                </td>
                <td className="py-1 px-2 font-mono text-text-muted">{entry.provider}</td>
                <td className="py-1 px-2 font-medium text-text-main">{entry.name}</td>
                <td className="py-1 px-2 text-text-muted">{entry.baseUrl || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

interface FilePickerRowProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string;
  onFile: (file: File) => void;
  t: Translator;
}

/** File-input trigger + chosen filename display. */
function FilePickerRow({ fileInputRef, fileName, onFile, t }: FilePickerRowProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.json,text/csv,application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      <Button size="sm" variant="secondary" icon="upload_file" onClick={() => fileInputRef.current?.click()}>
        {t("importFromFileChoose")}
      </Button>
      {fileName && <span className="text-xs text-text-muted font-mono">{fileName}</span>}
    </div>
  );
}

/**
 * Wizard step: upload a CSV/JSON file listing MULTIPLE, possibly different providers,
 * pick which parsed rows to actually import, then submit them in one batch (#6836).
 * Mirrors `ProxyBulkImportModal.tsx`'s parse → review → execute UX. State/handlers live
 * in `useImportProvidersFromFile`; presentation-only pieces are split into the small
 * components above so this component itself stays under the LOC ratchet.
 */
export function ImportProvidersFromFileModal({
  isOpen,
  onClose,
  onImported,
}: ImportProvidersFromFileModalProps) {
  const t = useTranslations("providers");
  const s = useImportProvidersFromFile(onImported);

  return (
    <Modal isOpen={isOpen} onClose={() => s.handleClose(onClose)} title={t("importFromFileTitle")} maxWidth="xl">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">{t("importFromFileDescription")}</p>

        <FilePickerRow fileInputRef={s.fileInputRef} fileName={s.fileName} onFile={s.handleFile} t={t} />
        <ParseErrorsList errors={s.errors} t={t} />
        <EntriesTable entries={s.entries} selected={s.selected} onToggleRow={s.toggleRow} onToggleAll={s.toggleAll} t={t} />

        {s.result && (
          <div className="px-3 py-2 rounded border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-400">
            {t("importFromFileResult", { success: s.result.success, failed: s.result.failed })}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button size="sm" variant="secondary" onClick={() => s.handleClose(onClose)}>
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            icon="upload"
            onClick={s.handleExecute}
            loading={s.importing}
            disabled={s.selected.size === 0 || s.importing}
          >
            {s.importing ? t("importFromFileImporting") : t("importFromFileImport", { count: s.selected.size })}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
