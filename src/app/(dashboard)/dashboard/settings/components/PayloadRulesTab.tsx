"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";

const EMPTY_PAYLOAD_RULES_TEMPLATE = {
  default: [],
  override: [],
  filter: [],
  defaultRaw: [],
};

const EMPTY_PAYLOAD_RULES_TEXT = JSON.stringify(EMPTY_PAYLOAD_RULES_TEMPLATE, null, 2);

type StatusMessage = {
  type: "success" | "error" | "info";
  text: string;
};

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function getRuleSectionCount(value: unknown, keys: string[]): number {
  for (const key of keys) {
    if (isObjectRecord(value) && Array.isArray(value[key])) {
      return value[key].length;
    }
  }
  return 0;
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!isObjectRecord(payload)) return fallback;

  const nestedError = payload.error;
  if (typeof nestedError === "string" && nestedError.trim()) {
    return nestedError;
  }

  if (isObjectRecord(nestedError)) {
    if (typeof nestedError.message === "string" && nestedError.message.trim()) {
      return nestedError.message;
    }

    if (Array.isArray(nestedError.details) && nestedError.details.length > 0) {
      const detail = nestedError.details[0];
      if (isObjectRecord(detail) && typeof detail.message === "string" && detail.message.trim()) {
        return detail.message;
      }
    }
  }

  return fallback;
}

export default function PayloadRulesTab() {
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const [editorValue, setEditorValue] = useState(EMPTY_PAYLOAD_RULES_TEXT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<StatusMessage | null>(null);

  const parsedEditor = useMemo(() => {
    try {
      const parsed = JSON.parse(editorValue);
      if (!isObjectRecord(parsed)) {
        return { value: null, error: t("payloadMustBeObject") };
      }
      return { value: parsed, error: null };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : t("payloadInvalidJson"),
      };
    }
  }, [editorValue, t]);

  const summary = useMemo(() => {
    const source = parsedEditor.value;
    return {
      default: getRuleSectionCount(source, ["default"]),
      override: getRuleSectionCount(source, ["override"]),
      filter: getRuleSectionCount(source, ["filter"]),
      defaultRaw: getRuleSectionCount(source, ["defaultRaw", "default-raw"]),
    };
  }, [parsedEditor.value]);

  const loadConfig = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/settings/payload-rules");
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, tCommon("failedToLoad")));
      }

      setEditorValue(JSON.stringify(payload, null, 2));
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : tCommon("failedToLoad"),
      });
    } finally {
      setLoading(false);
    }
  }, [tCommon]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const handleReset = () => {
    setEditorValue(EMPTY_PAYLOAD_RULES_TEXT);
    setMessage({
      type: "info",
      text: t("payloadResetInfo"),
    });
  };

  const handleSave = async () => {
    if (parsedEditor.error || !parsedEditor.value) {
      setMessage({
        type: "error",
        text: parsedEditor.error || t("payloadValidJsonRequired"),
      });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/settings/payload-rules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedEditor.value),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, tCommon("error")));
      }

      setEditorValue(JSON.stringify(payload, null, 2));
      setMessage({ type: "success", text: t("payloadSaveSuccess") });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : tCommon("error"),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              data_object
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{t("payloadRulesTitle")}</h3>
            <p className="text-sm text-text-muted mt-1">{t("payloadRulesDesc")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border bg-bg-secondary/40 p-3">
            <p className="text-sm font-medium">{t("payloadRuleDefaultTitle")}</p>
            <p className="text-xs text-text-muted mt-1">{t("payloadRuleDefaultDesc")}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-secondary/40 p-3">
            <p className="text-sm font-medium">{t("payloadRuleOverrideTitle")}</p>
            <p className="text-xs text-text-muted mt-1">{t("payloadRuleOverrideDesc")}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-secondary/40 p-3">
            <p className="text-sm font-medium">{t("payloadRuleFilterTitle")}</p>
            <p className="text-xs text-text-muted mt-1">{t("payloadRuleFilterDesc")}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-secondary/40 p-3">
            <p className="text-sm font-medium">{t("payloadRuleDefaultRawTitle")}</p>
            <p className="text-xs text-text-muted mt-1">{t("payloadRuleDefaultRawDesc")}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <span className="rounded-full border border-border px-2.5 py-1">
            {t("payloadRuleDefaultTitle")}: {summary.default}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1">
            {t("payloadRuleOverrideTitle")}: {summary.override}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1">
            {t("payloadRuleFilterTitle")}: {summary.filter}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1">
            {t("payloadRuleDefaultRawTitle")}: {summary.defaultRaw}
          </span>
        </div>

        {message && (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : message.type === "info"
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {message.type === "success"
                ? "check_circle"
                : message.type === "info"
                  ? "info"
                  : "error"}
            </span>
            {message.text}
          </div>
        )}

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary/30">
            <div>
              <p className="text-sm font-medium">{t("payloadEditorTitle")}</p>
              <p className="text-xs text-text-muted">{t("payloadEditorDesc")}</p>
            </div>
            <div className="text-xs text-text-muted">
              {loading ? tCommon("loading") : t("payloadEditorReady")}
            </div>
          </div>
          <textarea
            value={editorValue}
            onChange={(event) => {
              setEditorValue(event.target.value);
              if (message?.type === "error") setMessage(null);
            }}
            spellCheck={false}
            rows={22}
            className="w-full px-4 py-4 bg-transparent text-sm font-mono leading-6 text-text-main resize-y min-h-[420px] focus:outline-none"
            disabled={loading || saving}
          />
        </div>

        {parsedEditor.error && (
          <p className="text-sm text-red-500">
            {t("payloadJsonParseError", { error: parsedEditor.error })}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={loadConfig} disabled={loading || saving}>
            {tCommon("refresh")}
          </Button>
          <Button variant="secondary" onClick={handleReset} disabled={loading || saving}>
            {tCommon("reset")}
          </Button>
          <Button onClick={handleSave} disabled={loading || saving || !!parsedEditor.error}>
            {saving ? t("saving") : t("savePayloadRules")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
