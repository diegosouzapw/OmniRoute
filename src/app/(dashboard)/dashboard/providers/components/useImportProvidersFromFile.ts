import { useRef, useState } from "react";
import {
  parseProviderImportFile,
  type ParsedProviderImportEntry,
  type ProviderImportParseError,
} from "./parseProviderImportFile";

export type ImportResult = { success: number; failed: number; total: number };

/**
 * All state + handlers for `ImportProvidersFromFileModal`, split into a hook purely
 * to keep the component's own function under the repo's max-lines-per-function ratchet
 * (#6836). Behavior is unchanged — this is a pure extraction, not a refactor.
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: toImport }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({ success: data.success ?? 0, failed: data.failed ?? 0, total: data.total ?? 0 });
        await onImported();
      }
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
