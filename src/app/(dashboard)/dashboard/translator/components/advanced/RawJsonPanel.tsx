"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Select, Badge } from "@/shared/components";
import Collapsible from "@/shared/components/Collapsible";
import Editor from "@/shared/components/MonacoEditor";
import { getExampleTemplates, FORMAT_META, FORMAT_OPTIONS } from "../../exampleTemplates";
import type { AdvancedAccordionProps } from "../../types";

/** Props specific to RawJsonPanel (extends shared accordion props). */
export interface RawJsonPanelProps extends Omit<AdvancedAccordionProps, "slug"> {
  slug?: AdvancedAccordionProps["slug"];
}

/**
 * RawJsonPanel — Advanced accordion wrapping the full Monaco-based JSON editor.
 *
 * Refactors PlaygroundMode.tsx lines 200-461 (split editor, format selects,
 * swap button, translate, 8 templates, intermediate panel) MINUS the
 * Compression Preview block (lines 506-584, which lives in F7).
 *
 * D7 lazy-render: the Monaco editors are NOT mounted until the first time the
 * Collapsible opens.  Once opened, `hasOpened` stays true so editors remain
 * mounted through subsequent open/close cycles (preserving editor state).
 */
export default function RawJsonPanel({
  forceOpen = false,
  onOpenChange,
  defaultOpen = false,
}: RawJsonPanelProps) {
  const t = useTranslations("translator");
  const tc = useTranslations("common");

  /** D7 lazy-render guard. */
  const [hasOpened, setHasOpened] = useState(defaultOpen || forceOpen);
  const [open, setOpen] = useState(defaultOpen || forceOpen);

  // Notify parent when starting open (initial mount with forceOpen or defaultOpen).
  useEffect(() => {
    if (defaultOpen || forceOpen) {
      onOpenChange?.(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run only once on mount

  // Sync forceOpen changes from parent (deep-link after mount).
  useEffect(() => {
    if (!forceOpen || open) return;
    const openFromDeepLink = setTimeout(() => {
      setOpen(true);
      setHasOpened(true);
      onOpenChange?.(true);
    }, 0);
    return () => clearTimeout(openFromDeepLink);
  }, [forceOpen, open, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) setHasOpened(true);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  // ── Translator state (copied from PlaygroundMode.tsx) ──────────────────────
  const [sourceFormat, setSourceFormat] = useState("claude");
  const [targetFormat, setTargetFormat] = useState("openai");
  const [inputContent, setInputContent] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [intermediateContent, setIntermediateContent] = useState("");
  const [translationPath, setTranslationPath] = useState("");
  const [detectedFormat, setDetectedFormat] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const templates = useMemo(() => getExampleTemplates(t), [t]);

  // ── Auto-detect (debounced, 600 ms) ───────────────────────────────────────
  const detectFormatFromInput = useCallback(async (content: string) => {
    if (!content || content.trim().length < 5) {
      setDetectedFormat(null);
      return;
    }
    try {
      const parsed = JSON.parse(content);
      setDetecting(true);
      const res = await fetch("/api/translator/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: parsed }),
      });
      const data: { success: boolean; format?: string } = await res.json();
      if (data.success && data.format) {
        setDetectedFormat(data.format);
        setSourceFormat(data.format);
      }
    } catch {
      // Not valid JSON yet — ignore (no user-visible error).
    } finally {
      setDetecting(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      detectFormatFromInput(inputContent);
    }, 600);
    return () => clearTimeout(timer);
  }, [inputContent, detectFormatFromInput]);

  // ── Translate handler ──────────────────────────────────────────────────────
  const handleTranslate = async () => {
    if (!inputContent.trim()) return;

    setTranslating(true);
    setOutputContent("");
    setIntermediateContent("");
    setTranslationPath("");
    setErrorMessage(null);

    try {
      const parsed: Record<string, unknown> = JSON.parse(inputContent);

      if (sourceFormat === targetFormat) {
        setOutputContent(JSON.stringify(parsed, null, 2));
        setTranslationPath("passthrough");
        setTranslating(false);
        return;
      }

      let intermediate: Record<string, unknown> = parsed;
      let hasIntermediate = false;

      if (sourceFormat !== "openai" && targetFormat !== "openai") {
        const step1 = await fetch("/api/translator/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: "direct",
            sourceFormat,
            targetFormat: "openai",
            body: parsed,
          }),
        });
        const step1Data: { success: boolean; result?: Record<string, unknown>; error?: string } =
          await step1.json();
        if (!step1Data.success) {
          setOutputContent(JSON.stringify({ error: step1Data.error }, null, 2));
          setTranslating(false);
          return;
        }
        intermediate = step1Data.result ?? {};
        setIntermediateContent(JSON.stringify(intermediate, null, 2));
        hasIntermediate = true;
      }

      const res = await fetch("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "direct",
          sourceFormat: hasIntermediate ? "openai" : sourceFormat,
          targetFormat,
          body: hasIntermediate ? intermediate : parsed,
        }),
      });
      const data: { success: boolean; result?: Record<string, unknown>; error?: string } =
        await res.json();
      if (data.success) {
        setOutputContent(JSON.stringify(data.result, null, 2));
        setTranslationPath(hasIntermediate ? "hub-and-spoke" : "direct");
      } else {
        // Display a sanitized error — never expose raw stack traces (#12).
        const sanitized = sanitizeError(data.error);
        setOutputContent(JSON.stringify({ error: sanitized }, null, 2));
        setErrorMessage(sanitized);
      }
    } catch (err: unknown) {
      const sanitized = sanitizeError(err instanceof Error ? err.message : String(err));
      setOutputContent(JSON.stringify({ error: sanitized }, null, 2));
      setErrorMessage(sanitized);
    } finally {
      setTranslating(false);
    }
  };

  // ── Template loader ────────────────────────────────────────────────────────
  const loadTemplate = (template: { id: string; formats: Record<string, unknown> }) => {
    const formatData =
      (template.formats[sourceFormat] as Record<string, unknown> | undefined) ??
      (template.formats["openai"] as Record<string, unknown>);
    setInputContent(JSON.stringify(formatData, null, 2));
    setActiveTemplate(template.id);
    setOutputContent("");
    setIntermediateContent("");
    setTranslationPath("");
    setErrorMessage(null);
  };

  // ── Copy helper ────────────────────────────────────────────────────────────
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* silent — clipboard API can fail in non-secure contexts */
    }
  };

  // ── Swap formats ───────────────────────────────────────────────────────────
  const handleSwapFormats = () => {
    setSourceFormat(targetFormat);
    setTargetFormat(sourceFormat);
    setInputContent(outputContent);
    setOutputContent("");
    setIntermediateContent("");
    setTranslationPath("");
    setDetectedFormat(null);
    setErrorMessage(null);
  };

  // ── Format metadata ────────────────────────────────────────────────────────
  const srcMeta = FORMAT_META[sourceFormat] ?? FORMAT_META["openai"];
  const tgtMeta = FORMAT_META[targetFormat] ?? FORMAT_META["openai"];

  // ── i18n safe getter ───────────────────────────────────────────────────────
  const tr = (key: string, fallback: string): string => {
    try {
      const v = t(key as Parameters<typeof t>[0]);
      if (v === key || v === `translator.${key}`) return fallback;
      return v as string;
    } catch {
      return fallback;
    }
  };

  return (
    <Collapsible
      title={tr("advancedRawJsonTitle", "Raw JSON (auto-detecção + Monaco)")}
      subtitle={tr(
        "advancedRawJsonSubtitle",
        "Cole um request JSON; o formato é detectado automaticamente."
      )}
      icon="code"
      defaultOpen={defaultOpen || forceOpen}
      className="border-black/5 dark:border-white/5"
    >
      {/* Internal open-state control — Collapsible owns its own open state,
          but we mirror it here for the lazy-render guard and onOpenChange. */}
      <div
        ref={(el) => {
          if (el) {
            // Observe the Collapsible's internal open state by checking whether
            // content is in the DOM. We use a one-time effect equivalent:
            // `hasOpened` is set on first render of this div (open=true).
            if (!hasOpened) {
              setHasOpened(true);
              handleOpenChange(true);
            }
          }
        }}
        className="space-y-5"
      >
        {/* Lazy-render guard: content only rendered once opened */}
        {hasOpened && (
          <>
            {/* Error banner */}
            {errorMessage && (
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                <span
                  className="material-symbols-outlined text-[16px] mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  error
                </span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Format Controls Bar */}
            <Card>
              <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
                {/* Source Format */}
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                    {tr("source", "Source")}
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-[20px] text-${srcMeta.color}-500`}
                      aria-hidden="true"
                    >
                      {srcMeta.icon}
                    </span>
                    <Select
                      value={sourceFormat}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSourceFormat(e.target.value);
                        setDetectedFormat(null);
                      }}
                      options={FORMAT_OPTIONS}
                      className="flex-1"
                    />
                    {detectedFormat && (
                      <Badge variant="primary" size="sm" icon="auto_awesome">
                        {tr("auto", "auto")}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Swap Button */}
                <button
                  type="button"
                  onClick={handleSwapFormats}
                  className="p-2 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary transition-all mt-4 sm:mt-5"
                  title={tr("swapFormats", "Swap formats")}
                  aria-label={tr("swapFormats", "Swap formats")}
                >
                  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                    swap_horiz
                  </span>
                </button>

                {/* Target Format */}
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                    {tr("target", "Target")}
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-[20px] text-${tgtMeta.color}-500`}
                      aria-hidden="true"
                    >
                      {tgtMeta.icon}
                    </span>
                    <Select
                      value={targetFormat}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setTargetFormat(e.target.value)
                      }
                      options={FORMAT_OPTIONS}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Translate Button */}
                <div className="pt-0 sm:pt-5">
                  <Button
                    icon="arrow_forward"
                    onClick={handleTranslate}
                    loading={translating}
                    disabled={!inputContent.trim() || translating}
                    className="w-full sm:w-auto"
                  >
                    {tr("translateAction", "Translate")}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Translation path indicator */}
            {translationPath && (
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  route
                </span>
                {translationPath === "hub-and-spoke" ? (
                  <span>
                    {tr("translationPathHubSpoke", "")
                      .replace("{source}", FORMAT_META[sourceFormat]?.label ?? sourceFormat)
                      .replace("{target}", FORMAT_META[targetFormat]?.label ?? targetFormat) ||
                      `${FORMAT_META[sourceFormat]?.label ?? sourceFormat} → OpenAI → ${FORMAT_META[targetFormat]?.label ?? targetFormat}`}
                  </span>
                ) : translationPath === "direct" ? (
                  <span>
                    {tr("translationPathDirect", "")
                      .replace("{source}", FORMAT_META[sourceFormat]?.label ?? sourceFormat)
                      .replace("{target}", FORMAT_META[targetFormat]?.label ?? targetFormat) ||
                      `${FORMAT_META[sourceFormat]?.label ?? sourceFormat} → ${FORMAT_META[targetFormat]?.label ?? targetFormat}`}
                  </span>
                ) : (
                  <span>{tr("translationPathPassthrough", "Passthrough (same format)")}</span>
                )}
              </div>
            )}

            {/* Split Editor View */}
            <div
              className={`grid grid-cols-1 gap-4 ${
                intermediateContent ? "xl:grid-cols-3" : "lg:grid-cols-2"
              }`}
            >
              {/* Input Panel */}
              <Card>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[18px] text-text-muted"
                        aria-hidden="true"
                      >
                        input
                      </span>
                      <h3 className="text-sm font-semibold text-text-main">
                        {tr("input", "Input")}
                      </h3>
                      {detectedFormat && (
                        <Badge variant="info" size="sm" dot>
                          {FORMAT_META[detectedFormat]?.label ?? detectedFormat}
                        </Badge>
                      )}
                      {detecting && (
                        <span
                          className="material-symbols-outlined text-[14px] text-text-muted animate-spin"
                          aria-hidden="true"
                        >
                          progress_activity
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(inputContent)}
                        className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                        title={tc("copy" as Parameters<typeof tc>[0])}
                        aria-label={tr("input", "Input") + " — copy"}
                      >
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                          content_copy
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInputContent("");
                          setOutputContent("");
                          setDetectedFormat(null);
                          setActiveTemplate(null);
                          setErrorMessage(null);
                        }}
                        className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                        title={tr("clear", "Clear")}
                        aria-label={tr("clear", "Clear") + " input"}
                      >
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <Editor
                      height="400px"
                      defaultLanguage="json"
                      value={inputContent}
                      onChange={(value: string | undefined) => setInputContent(value ?? "")}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        automaticLayout: true,
                        formatOnPaste: true,
                      }}
                    />
                  </div>
                </div>
              </Card>

              {/* Intermediate Panel (hub-and-spoke only) */}
              {intermediateContent && (
                <Card>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-[18px] text-amber-500"
                          aria-hidden="true"
                        >
                          hub
                        </span>
                        <h3 className="text-sm font-semibold text-text-main">
                          {tr("openaiIntermediatePanel", "OpenAI Intermediate")}
                        </h3>
                        <Badge variant="warning" size="sm">
                          Hub
                        </Badge>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(intermediateContent)}
                        className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                        title={tc("copy" as Parameters<typeof tc>[0])}
                        aria-label={tr("copyIntermediateJson", "Copy intermediate JSON")}
                      >
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                          content_copy
                        </span>
                      </button>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <Editor
                        height="400px"
                        defaultLanguage="json"
                        value={intermediateContent}
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 12,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          wordWrap: "on",
                          automaticLayout: true,
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Output Panel */}
              <Card>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[18px] text-text-muted"
                        aria-hidden="true"
                      >
                        output
                      </span>
                      <h3 className="text-sm font-semibold text-text-main">
                        {tr("output", "Output")}
                      </h3>
                      {outputContent && (
                        <Badge variant="success" size="sm" dot>
                          {FORMAT_META[targetFormat]?.label ?? targetFormat}
                        </Badge>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(outputContent)}
                      className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                      title={tc("copy" as Parameters<typeof tc>[0])}
                      aria-label={tr("copyOutputJson", "Copy output JSON")}
                    >
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                        content_copy
                      </span>
                    </button>
                  </div>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <Editor
                      height="400px"
                      defaultLanguage="json"
                      value={outputContent}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        automaticLayout: true,
                        readOnly: true,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Example Templates Grid */}
            <Card>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[18px] text-primary"
                    aria-hidden="true"
                  >
                    library_books
                  </span>
                  <h3 className="text-sm font-semibold text-text-main">
                    {tr("exampleTemplates", "Example Templates")}
                  </h3>
                  <span className="text-xs text-text-muted">
                    {tr("exampleTemplatesHint", "Load a sample request")}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => loadTemplate(template)}
                      className={`
                        group flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center
                        ${
                          activeTemplate === template.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30 hover:bg-primary/5 text-text-muted hover:text-text-main"
                        }
                      `}
                    >
                      <span
                        className={`material-symbols-outlined text-[22px] ${
                          activeTemplate === template.id
                            ? "text-primary"
                            : "text-text-muted group-hover:text-primary"
                        } transition-colors`}
                        aria-hidden="true"
                      >
                        {template.icon}
                      </span>
                      <span className="text-xs font-medium leading-tight">{template.name}</span>
                    </button>
                  ))}
                </div>
                {activeTemplate && (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      info
                    </span>
                    {tr("templateLoadHint", "Template loaded for format: {format}").replace(
                      "{format}",
                      FORMAT_META[sourceFormat]?.label ?? sourceFormat
                    )}
                  </div>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </Collapsible>
  );
}

/** Strip stack traces from error messages before displaying them (#12). */
function sanitizeError(msg: string | undefined | null): string {
  if (!msg) return "Translation failed";
  // Remove lines that look like stack frames: "    at foo (/path/to/file:1:2)"
  return msg
    .split("\n")
    .filter((line) => !/^\s+at\s+/.test(line))
    .join("\n")
    .trim()
    .slice(0, 500);
}
