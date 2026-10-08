"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import {
  DEFAULT_CONNECTION_TEST_PROMPT,
  CONNECTION_TEST_PROMPT_MAX_LENGTH,
} from "@/shared/constants/connectionTest";

export default function ConnectionTestSettings() {
  const t = useTranslations("connectionTest");
  const [prompt, setPrompt] = useState(DEFAULT_CONNECTION_TEST_PROMPT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (!cancelled) setPrompt(data.connectionTestPrompt || DEFAULT_CONNECTION_TEST_PROMPT);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  async function save() {
    if (saving || loading || !prompt.trim()) return;
    setSaving(true);
    setSaved(false);
    setError(false);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionTestPrompt: prompt.trim() }),
      });
      if (!response.ok) throw new Error();
      setPrompt(prompt.trim());
      setSaved(true);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }
  return (
    <Card>
      <h3 className="text-lg font-semibold">{t("settingsTitle")}</h3>
      <p className="mt-1 text-sm text-text-muted">{t("settingsDescription")}</p>
      <label htmlFor="connection-test-prompt" className="mt-4 block text-sm font-medium">
        {t("message")}
      </label>
      <textarea
        id="connection-test-prompt"
        rows={3}
        value={prompt}
        maxLength={CONNECTION_TEST_PROMPT_MAX_LENGTH}
        disabled={loading || saving}
        className="mt-2 w-full rounded-lg border border-border bg-bg-main p-3 text-sm"
        onChange={(event) => {
          setPrompt(event.target.value);
          setSaved(false);
        }}
      />
      <div className="mt-3 flex items-center gap-3">
        <Button loading={saving} disabled={loading || !prompt.trim()} onClick={save}>
          {t("saveMessage")}
        </Button>
        {saved && (
          <span role="status" className="text-sm text-green-600">
            {t("saved")}
          </span>
        )}
        {error && (
          <span role="alert" className="text-sm text-red-500">
            {t("failed")}
          </span>
        )}
      </div>
    </Card>
  );
}
