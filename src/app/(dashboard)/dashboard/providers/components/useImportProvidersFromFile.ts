import { useRef, useState } from "react";
import {
  parseProviderImportFile,
  type ParsedProviderImportEntry,
  type ProviderImportParseError,
} from "./parseProviderImportFile";
import {
  applyImportHttpOutcome,
  networkImportFailure,
  readImportResponse,
  type ImportResult,
} from "./providerImportFeedback";

export type { ImportResult };

/**
 * State + handlers for ImportProvidersFromFileModal (#6836/#12071).
 */
export function useImportProvidersFromFile(onImported: () => Promise<void>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [entries, setEntries] = useState<ParsedProviderImportEntry[]>([]);
  const [errors, setErrors] = useState<ProviderImportParseError[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const resetParsed = () => {
    setEntries([]);
    setErrors([]);
    setSelected(new Set());
    setResult(null);
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    resetParsed();
    const format = file.name.toLowerCase().endsWith(".json") ? "json" : "csv";
    const text = await file.text();
    const parsed = parseProviderImportFile(text, format);
    setEntries(parsed.entries);
    setErrors(parsed.errors);
    setSelected(new Set(parsed.entries.map((_, idx) => idx)));
  };

  const toggleRow = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(entries.map((_, i) => i)) : new Set());
  };

  const handleClose = (onClose: () => void) => {
    if (importing) return;
    setFileName("");
    resetParsed();
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  const handleExecute = async () => {
    const toImport = entries.filter((_, idx) => selected.has(idx));
    if (toImport.length === 0) return;
    setImporting(true);
    try {
      const res = await fetch("/api/providers/import", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: toImport }),
      });
      const parsed = await readImportResponse(res);
      const outcome = applyImportHttpOutcome(parsed, parsed.data);
      setResult(outcome.result);
      if (outcome.shouldRefresh) {
        try {
          await onImported();
        } catch { /* refresh failure must not replace the import result */ }
      }
    } catch (err) {
      setResult(networkImportFailure(err));
    } finally {
      setImporting(false);
    }
  };

  return {
    fileInputRef,
    fileName,
    entries,
    errors,
    selected,
    importing,
    result,
    handleFile,
    toggleRow,
    toggleAll,
    handleClose,
    handleExecute,
  };
}
