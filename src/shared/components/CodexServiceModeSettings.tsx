"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "./Select";
import Button from "./Button";
import { ConfirmModal } from "./Modal";
import {
  API_KEY_CODEX_SERVICE_MODES,
  parseApiKeyCodexServiceMode,
  type ApiKeyCodexServiceMode,
} from "../constants/codexServiceMode";

export default function CodexServiceModeSettings({ apiKeyId }: { apiKeyId: string }) {
  const t = useTranslations("codexKeyServiceMode");
  const [mode, setMode] = useState<ApiKeyCodexServiceMode>("inherit");
  const [pending, setPending] = useState<ApiKeyCodexServiceMode | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const endpoint = `/api/keys/${encodeURIComponent(apiKeyId)}`;

  useEffect(() => {
    const controller = new AbortController();
    fetch(endpoint, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("load");
        const data = await response.json();
        if (!controller.signal.aborted) setMode(parseApiKeyCodexServiceMode(data.codexServiceMode));
      })
      .catch(() => {
        if (!controller.signal.aborted) setError("loadError");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [endpoint, reload]);

  async function save() {
    if (!pending || saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codexServiceMode: pending }),
      });
      if (!response.ok) throw new Error("save");
      const data = await response.json();
      setMode(parseApiKeyCodexServiceMode(data.codexServiceMode));
      setPending(null);
    } catch {
      setError("saveError");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mb-6 min-w-0 rounded-xl border border-border p-4 space-y-3">
      <h3 className="font-medium">{t("title")}</h3>
      <p className="text-sm text-text-muted">{t("description")}</p>
      <Select
        label={t("label")}
        value={mode}
        disabled={loading || saving || error === "loadError"}
        options={API_KEY_CODEX_SERVICE_MODES.map((value) => ({ value, label: t(value) }))}
        onChange={(event) => {
          const value = parseApiKeyCodexServiceMode(event.target.value);
          if (value !== mode) setPending(value);
        }}
      />
      <p className="text-xs text-text-muted">{t("warning")}</p>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {t(error)}
        </p>
      )}
      {error === "loadError" && (
        <Button
          variant="ghost"
          onClick={() => {
            setLoading(true);
            setError("");
            setReload((value) => value + 1);
          }}
        >
          {t("retry")}
        </Button>
      )}
      <ConfirmModal
        isOpen={pending !== null}
        onClose={() => {
          if (!saving) {
            setPending(null);
            setError("");
          }
        }}
        onConfirm={save}
        title={t("title")}
        message={
          <>
            {t("confirm", { mode: t(pending ?? mode) })}
            {error === "saveError" && (
              <span role="alert" className="block text-red-500">
                {t(error)}
              </span>
            )}
          </>
        }
        confirmText={t("save")}
        loading={saving}
        variant="primary"
      />
    </section>
  );
}
