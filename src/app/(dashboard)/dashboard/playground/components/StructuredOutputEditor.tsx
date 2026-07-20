"use client";

// src/app/(dashboard)/dashboard/playground/components/StructuredOutputEditor.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useStructuredOutput } from "../hooks/useStructuredOutput";
import type { StructuredOutputSchemaInput } from "../hooks/useStructuredOutput";

interface StructuredOutputEditorProps {
  structuredOutput: ReturnType<typeof useStructuredOutput>;
}

const DEFAULT_SCHEMA: StructuredOutputSchemaInput = {
  name: "my_schema",
  schema: {
    type: "object",
    properties: {
      result: { type: "string" },
    },
    required: ["result"],
  },
  strict: true,
};

/**
 * StructuredOutputEditor — toggle JSON mode on/off + edit JSON schema.
 *
 * When enabled, the Build tab sends response_format: { type: "json_schema", json_schema: {...} }.
 * Schema validation is client-side via Zod StructuredOutputSchema (D9).
 */
export default function StructuredOutputEditor({ structuredOutput }: StructuredOutputEditorProps) {
  const t = useTranslations("playground");
  const { enabled, schema, error, setEnabled, setSchema } = structuredOutput;

  const [schemaRaw, setSchemaRaw] = useState(JSON.stringify(schema ?? DEFAULT_SCHEMA, null, 2));
  const [nameField, setNameField] = useState(schema?.name ?? "my_schema");
  const [parseError, setParseError] = useState<string | null>(null);

  function handleValidate() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(schemaRaw);
    } catch {
      setParseError(t("invalidJson"));
      return;
    }
    setParseError(null);

    // The parsed JSON should be the inner schema object (not the full response_format wrapper)
    const input: StructuredOutputSchemaInput = {
      name: nameField.trim() || "my_schema",
      schema: parsed as Record<string, unknown>,
      strict: true,
    };

    setSchema(input);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-text-main">{t("jsonMode")}</span>
          <span className="text-[11px] text-text-muted">{t("jsonModeDescription")}</span>
        </div>
        <button
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${
            enabled ? "bg-primary" : "bg-text-muted/30"
          }`}
          aria-label={enabled ? t("disableJsonMode") : t("enableJsonMode")}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Schema editor (shown only when enabled) */}
      {enabled && (
        <div className="flex flex-col gap-2 border border-border rounded-lg p-3 bg-surface">
          {/* Schema name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-text-muted uppercase tracking-wider">
              {t("schemaName")}
            </label>
            <input
              type="text"
              value={nameField}
              onChange={(e) => setNameField(e.target.value)}
              placeholder="my_schema"
              className="text-xs bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
            />
          </div>

          {/* Schema JSON textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-text-muted uppercase tracking-wider">
              {t("jsonSchema")}
            </label>
            <textarea
              value={schemaRaw}
              onChange={(e) => setSchemaRaw(e.target.value)}
              rows={8}
              className="text-xs font-mono bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
              aria-label={t("jsonSchemaEditor")}
            />
          </div>

          {/* Errors */}
          {(parseError ?? error) && (
            <p className="text-xs text-destructive">{parseError ?? error}</p>
          )}

          {/* Status — show when schema is set and no errors */}
          {schema != null && !parseError && !error && (
            <p className="text-xs text-green-600 dark:text-green-400">✓ {t("schemaValidated")}</p>
          )}

          {/* Validate button */}
          <button
            onClick={handleValidate}
            className="text-xs px-3 py-1.5 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors self-start"
          >
            {t("validateSchema")}
          </button>
        </div>
      )}
    </div>
  );
}
