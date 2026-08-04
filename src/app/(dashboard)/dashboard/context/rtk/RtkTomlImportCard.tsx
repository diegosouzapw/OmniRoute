"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const RTK_TOML_MAX_BYTES = 1024 * 1024;

interface ImportFilterSummary {
  id: string;
  description: string;
  category: string;
  commandPatterns: string[];
  testCount: number;
}

interface ImportTestOutcome {
  filterId: string;
  testName: string;
  passed: boolean;
}

interface ImportResult {
  sha256: string;
  passed: boolean;
  filters: ImportFilterSummary[];
  outcomes: ImportTestOutcome[];
  warnings: string[];
  installedPath?: string;
  backupCreated?: boolean;
}

interface RtkTomlImportCardProps {
  onInstalled?: () => void | Promise<void>;
}

interface RtkTomlEditorProps {
  content: string;
  processing: "validate" | "install" | null;
  overwrite: boolean;
  onContentChange: (content: string) => void;
  onFileChange: (file: File | undefined) => void;
  onProcess: (action: "validate" | "install") => void;
  onOverwriteChange: (overwrite: boolean) => void;
}

async function readErrorMessage(response: Response): Promise<string | null> {
  try {
    const body = (await response.json()) as { error?: { message?: unknown } };
    return typeof body.error?.message === "string" ? body.error.message : null;
  } catch {
    return null;
  }
}

function RtkTomlEditor({
  content,
  processing,
  overwrite,
  onContentChange,
  onFileChange,
  onProcess,
  onOverwriteChange,
}: RtkTomlEditorProps) {
  const t = useTranslations("contextRtk");
  return (
    <>
      <div className="mt-3 flex flex-col gap-3">
        <label className="text-xs font-medium text-text-main">
          {t("tomlChooseFile")}
          <input
            type="file"
            accept=".toml,text/plain,application/toml"
            onChange={(event) => onFileChange(event.target.files?.[0])}
            data-testid="rtk-toml-file"
            className="mt-1 block w-full text-xs text-text-muted file:mr-3 file:rounded file:border file:border-border file:bg-bg file:px-2.5 file:py-1 file:text-xs file:text-text-main"
          />
        </label>
        <textarea
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder={t("tomlImportPlaceholder")}
          data-testid="rtk-toml-content"
          className="h-56 w-full rounded-lg border border-border bg-bg p-3 font-mono text-xs text-text-main"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onProcess("validate")}
          disabled={processing !== null || !content.trim()}
          data-testid="rtk-toml-validate"
          className="rounded border border-border px-3 py-1.5 text-xs font-medium text-text-main hover:bg-surface-hover disabled:opacity-50"
        >
          {processing === "validate" ? t("tomlValidating") : t("tomlValidate")}
        </button>
        <button
          type="button"
          onClick={() => onProcess("install")}
          disabled={processing !== null || !content.trim()}
          data-testid="rtk-toml-install"
          className="rounded bg-primary px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
        >
          {processing === "install" ? t("tomlInstalling") : t("tomlInstall")}
        </button>
        <label className="flex items-center gap-2 text-xs text-text-main">
          <input
            type="checkbox"
            checked={overwrite}
            onChange={(event) => onOverwriteChange(event.target.checked)}
            data-testid="rtk-toml-overwrite"
          />
          {t("tomlConfirmOverwrite")}
        </label>
      </div>
    </>
  );
}

function RtkTomlResult({ result }: { result: ImportResult }) {
  const t = useTranslations("contextRtk");
  return (
    <div className="mt-4 rounded-lg border border-border bg-bg p-3" data-testid="rtk-toml-result">
      <p className="text-xs font-medium text-text-main">
        {result.installedPath
          ? t("tomlInstalled", { path: result.installedPath })
          : result.passed
            ? t("tomlValidationPassed")
            : t("tomlValidationFailed")}
      </p>
      <p className="mt-1 text-[11px] text-text-muted">
        {t("tomlValidationSummary", {
          filters: result.filters.length,
          tests: result.outcomes.length,
        })}
      </p>
      {result.backupCreated && (
        <p className="mt-1 text-[11px] text-text-muted">{t("tomlBackupCreated")}</p>
      )}
      {result.filters.length > 0 && (
        <ul className="mt-2 space-y-1 text-[11px] text-text-main">
          {result.filters.map((filter) => (
            <li key={filter.id}>
              <code>{filter.id}</code> · {filter.category} ·{" "}
              {t("tomlTestCount", { count: filter.testCount })}
            </li>
          ))}
        </ul>
      )}
      {result.outcomes.length > 0 && (
        <ul className="mt-2 space-y-1 text-[11px] text-text-main">
          {result.outcomes.map((outcome) => (
            <li key={`${outcome.filterId}:${outcome.testName}`}>
              <span
                className={
                  outcome.passed
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {outcome.passed ? t("tomlTestPassed") : t("tomlTestFailed")}
              </span>{" "}
              · <code>{outcome.filterId}</code> · {outcome.testName}
            </li>
          ))}
        </ul>
      )}
      {result.warnings.length > 0 && (
        <ul className="mt-2 space-y-1 text-[11px] text-amber-700 dark:text-amber-300">
          {result.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RtkTomlImportCard({ onInstalled }: RtkTomlImportCardProps) {
  const t = useTranslations("contextRtk");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<"validate" | "install" | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  async function processImport(action: "validate" | "install") {
    if (!content.trim()) return;
    setProcessing(action);
    setError(null);
    try {
      const response = await fetch("/api/context/rtk/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, content, overwrite: action === "install" && overwrite }),
      });
      if (!response.ok) {
        throw new Error((await readErrorMessage(response)) ?? t("tomlImportError"));
      }
      const nextResult = (await response.json()) as ImportResult;
      setResult(nextResult);
      if (action === "install") await onInstalled?.();
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : t("tomlImportError"));
    } finally {
      setProcessing(null);
    }
  }

  async function loadFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (file.size > RTK_TOML_MAX_BYTES) {
      setError(t("tomlFileReadError"));
      return;
    }
    try {
      setContent(await file.text());
      setResult(null);
    } catch {
      setError(t("tomlFileReadError"));
    }
  }

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4"
      data-testid="rtk-toml-import"
    >
      <h2 className="text-sm font-semibold text-text-main">{t("tomlImportTitle")}</h2>
      <p className="mt-1 text-xs text-text-muted">{t("tomlImportDesc")}</p>
      <RtkTomlEditor
        content={content}
        processing={processing}
        overwrite={overwrite}
        onContentChange={(nextContent) => {
          setContent(nextContent);
          setResult(null);
        }}
        onFileChange={(file) => void loadFile(file)}
        onProcess={(action) => void processImport(action)}
        onOverwriteChange={setOverwrite}
      />

      {error && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400" data-testid="rtk-toml-error">
          {error}
        </p>
      )}

      {result && <RtkTomlResult result={result} />}
    </section>
  );
}
