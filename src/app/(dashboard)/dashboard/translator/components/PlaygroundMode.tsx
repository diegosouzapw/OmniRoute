"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, Button, Select, Badge } from "@/shared/components";
import { EXAMPLE_TEMPLATES, FORMAT_META, FORMAT_OPTIONS } from "../exampleTemplates";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function PlaygroundMode() {
  const [sourceFormat, setSourceFormat] = useState("claude");
  const [targetFormat, setTargetFormat] = useState("openai");
  const [inputContent, setInputContent] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [detectedFormat, setDetectedFormat] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);

  // Auto-detect format when input changes
  const detectFormatFromInput = useCallback(async (content) => {
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
      const data = await res.json();
      if (data.success) {
        setDetectedFormat(data.format);
        setSourceFormat(data.format);
      }
    } catch {
      // Not valid JSON yet, ignore
    } finally {
      setDetecting(false);
    }
  }, []);

  // Debounced auto-detect
  useEffect(() => {
    const timer = setTimeout(() => {
      detectFormatFromInput(inputContent);
    }, 600);
    return () => clearTimeout(timer);
  }, [inputContent, detectFormatFromInput]);

  const handleTranslate = async () => {
    if (!inputContent.trim()) return;

    setTranslating(true);
    setOutputContent("");
    try {
      const parsed = JSON.parse(inputContent);
      const res = await fetch("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "direct",
          sourceFormat,
          targetFormat,
          body: parsed,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOutputContent(JSON.stringify(data.result, null, 2));
      } else {
        setOutputContent(JSON.stringify({ error: data.error }, null, 2));
      }
    } catch (err) {
      setOutputContent(JSON.stringify({ error: err.message }, null, 2));
    }
    setTranslating(false);
  };

  const loadTemplate = (template) => {
    const formatData = template.formats[sourceFormat] || template.formats.openai;
    setInputContent(JSON.stringify(formatData, null, 2));
    setActiveTemplate(template.id);
    setOutputContent("");
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* silent */
    }
  };

  const handleSwapFormats = () => {
    setSourceFormat(targetFormat);
    setTargetFormat(sourceFormat);
    setInputContent(outputContent);
    setOutputContent("");
    setDetectedFormat(null);
  };

  const srcMeta = FORMAT_META[sourceFormat] || FORMAT_META.openai;
  const tgtMeta = FORMAT_META[targetFormat] || FORMAT_META.openai;

  return (
    <div className="space-y-5">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
          info
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">Format Converter</p>
          <p>
            Paste or type a JSON request body. The translator will auto-detect the source format and
            convert it to the target format. Use this to debug how OmniRoute translates requests
            between formats (OpenAI ↔ Claude ↔ Gemini ↔ Responses API).
          </p>
        </div>
      </div>
      {/* Format Controls Bar */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Source Format */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              Source Format
            </label>
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[20px] text-${srcMeta.color}-500`}>
                {srcMeta.icon}
              </span>
              <Select
                value={sourceFormat}
                onChange={(e) => {
                  setSourceFormat(e.target.value);
                  setDetectedFormat(null);
                }}
                options={FORMAT_OPTIONS}
                className="flex-1"
              />
              {detectedFormat && (
                <Badge variant="primary" size="sm" icon="auto_awesome">
                  Auto
                </Badge>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapFormats}
            className="p-2 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary transition-all mt-4 sm:mt-5"
            title="Swap formats"
          >
            <span className="material-symbols-outlined text-[24px]">swap_horiz</span>
          </button>

          {/* Target Format */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              Target Format
            </label>
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[20px] text-${tgtMeta.color}-500`}>
                {tgtMeta.icon}
              </span>
              <Select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
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
              className="whitespace-nowrap"
            >
              Translate
            </Button>
          </div>
        </div>
      </Card>

      {/* Split Editor View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Panel */}
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-muted">input</span>
                <h3 className="text-sm font-semibold text-text-main">Input</h3>
                {detectedFormat && (
                  <Badge variant="info" size="sm" dot>
                    {FORMAT_META[detectedFormat]?.label || detectedFormat}
                  </Badge>
                )}
                {detecting && (
                  <span className="material-symbols-outlined text-[14px] text-text-muted animate-spin">
                    progress_activity
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(inputContent)}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                  title="Copy"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
                <button
                  onClick={() => {
                    setInputContent("");
                    setOutputContent("");
                    setDetectedFormat(null);
                    setActiveTemplate(null);
                  }}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                  title="Clear"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="json"
                value={inputContent}
                onChange={(value) => setInputContent(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
                  formatOnPaste: true,
                  placeholder: "Paste a request body here or select a template below...",
                }}
              />
            </div>
          </div>
        </Card>

        {/* Output Panel */}
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-muted">
                  output
                </span>
                <h3 className="text-sm font-semibold text-text-main">Output</h3>
                {outputContent && (
                  <Badge variant="success" size="sm" dot>
                    {FORMAT_META[targetFormat]?.label || targetFormat}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(outputContent)}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                  title="Copy"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
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

      {/* Example Templates */}
      <Card>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">
              library_books
            </span>
            <h3 className="text-sm font-semibold text-text-main">Example Templates</h3>
            <span className="text-xs text-text-muted">— Click to load</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {EXAMPLE_TEMPLATES.map((template) => (
              <button
                key={template.id}
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
                  className={`material-symbols-outlined text-[22px] ${activeTemplate === template.id ? "text-primary" : "text-text-muted group-hover:text-primary"} transition-colors`}
                >
                  {template.icon}
                </span>
                <span className="text-xs font-medium leading-tight">{template.name}</span>
              </button>
            ))}
          </div>
          {activeTemplate && (
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="material-symbols-outlined text-[14px]">info</span>
              Template loads the request in{" "}
              <strong className="text-text-main">
                {FORMAT_META[sourceFormat]?.label || sourceFormat}
              </strong>{" "}
              format. Change Source Format to load in a different format.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
