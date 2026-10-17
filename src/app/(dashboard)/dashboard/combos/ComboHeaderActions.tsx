"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { useNotificationStore } from "@/store/notificationStore";

type ImportMode = "merge" | "replace";

interface PendingImport {
  file: { _meta?: unknown; combos: unknown[] };
  total: number;
  fresh: number;
  conflicting: number;
  current: number;
}

interface ComboHeaderActionsProps {
  onCreate: () => void;
  onImported: () => void | Promise<void>;
}

function comboName(entry: unknown): string {
  return entry &&
    typeof entry === "object" &&
    typeof (entry as { name?: unknown }).name === "string"
    ? (entry as { name: string }).name
    : "";
}

/**
 * Combos page header actions: Export / Import of the combos-only file
 * (`/api/combos/export`, `/api/combos/import`) next to "Create combo".
 * Import always shows a confirmation with counts; merge is the default and
 * "Replace all" is an explicit, separately labelled choice.
 */
export default function ComboHeaderActions({ onCreate, onImported }: ComboHeaderActionsProps) {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const notify = useNotificationStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingImport | null>(null);
  const [importing, setImporting] = useState(false);

  const handleExport = async () => {
    try {
      const res = await fetch("/api/combos/export");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `omniroute-combos-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error exporting combos:", error);
      notify.error(t("exportCombosFailed"));
    }
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || !Array.isArray(parsed.combos) || parsed.combos.length === 0) {
        notify.error(t("importCombosInvalidFile"));
        return;
      }
      const res = await fetch("/api/combos");
      const data = res.ok ? await res.json() : { combos: [] };
      const visible = (Array.isArray(data.combos) ? data.combos : []).filter(
        (combo: { isHidden?: boolean }) => combo.isHidden !== true
      );
      const existingNames = new Set(visible.map(comboName));
      const names = parsed.combos.map(comboName);
      const conflicting = names.filter((name: string) => existingNames.has(name)).length;
      setPending({
        file: { _meta: parsed._meta, combos: parsed.combos },
        total: names.length,
        fresh: names.length - conflicting,
        conflicting,
        current: visible.length,
      });
    } catch (error) {
      console.log("Error reading combos import file:", error);
      notify.error(t("importCombosInvalidFile"));
    }
  };

  const runImport = async (mode: ImportMode) => {
    if (!pending) return;
    setImporting(true);
    try {
      const res = await fetch("/api/combos/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pending.file, mode }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(result?.error?.message || t("importCombosFailed"));
        return;
      }
      setPending(null);
      notify.success(
        t("importCombosDone", {
          created: result.created?.length ?? 0,
          skipped: result.skipped?.length ?? 0,
        })
      );
      if (Array.isArray(result.warnings) && result.warnings.length > 0) {
        notify.warning(result.warnings.join("\n"), t("importCombosWarnings"));
      }
      await onImported();
    } catch (error) {
      console.log("Error importing combos:", error);
      notify.error(t("importCombosFailed"));
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="secondary" icon="download" onClick={handleExport}>
        {t("exportCombos")}
      </Button>
      <Button
        size="sm"
        variant="secondary"
        icon="upload"
        onClick={() => fileInputRef.current?.click()}
      >
        {t("importCombos")}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFile}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <Button icon="add" onClick={onCreate}>
        {t("createCombo")}
      </Button>

      <Modal
        isOpen={pending !== null}
        onClose={() => !importing && setPending(null)}
        title={t("importCombosTitle")}
        size="md"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="ghost" disabled={importing} onClick={() => setPending(null)}>
              {tc("cancel")}
            </Button>
            <Button variant="danger" disabled={importing} onClick={() => runImport("replace")}>
              {t("importCombosReplace")}
            </Button>
            <Button loading={importing} onClick={() => runImport("merge")}>
              {t("importCombosMerge")}
            </Button>
          </div>
        }
      >
        {pending && (
          <div className="flex flex-col gap-3 text-sm">
            <p className="text-text-main">
              {t("importCombosSummary", {
                total: pending.total,
                fresh: pending.fresh,
                conflicting: pending.conflicting,
              })}
            </p>
            <p className="text-text-muted">{t("importCombosMergeHint")}</p>
            <p className="text-red-600 dark:text-red-400">
              {t("importCombosReplaceHint", { current: pending.current })}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
