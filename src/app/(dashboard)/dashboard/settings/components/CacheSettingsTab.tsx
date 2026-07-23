"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useTranslations } from "next-intl";

type Message = { type: "success" | "error"; text: string };

interface CacheConfigResponse {
  modelCatalogCacheTtlMs: number;
  [key: string]: unknown;
}

const DEFAULT_TTL_MS = 1500;
const MIN_TTL_MS = 100;
const MAX_TTL_MS = 60000;

export default function CacheSettingsTab() {
  const t = useTranslations("settings");
  const [value, setValue] = useState(String(DEFAULT_TTL_MS));
  const [savedValue, setSavedValue] = useState(String(DEFAULT_TTL_MS));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/settings/cache-config")
      .then((response) => {
        if (!response.ok) throw new Error(`Cache config API returned ${response.status}`);
        return response.json() as Promise<CacheConfigResponse>;
      })
      .then((config) => {
        if (!active) return;
        const ms = config.modelCatalogCacheTtlMs ?? DEFAULT_TTL_MS;
        const str = typeof ms === "number" && Number.isFinite(ms) ? String(ms) : String(DEFAULT_TTL_MS);
        setValue(str);
        setSavedValue(str);
      })
      .catch((error) => {
        console.error("Failed to load cache config:", error);
        if (active) setMessage({ type: "error", text: t("cacheConfigLoadFailed") });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [t]);

  const dirty = value.trim() !== savedValue;

  const saveTtl = useCallback(async () => {
    if (!dirty) return;

    const parsed = Number(value.trim());
    if (!Number.isInteger(parsed)) return;
    if (parsed < MIN_TTL_MS || parsed > MAX_TTL_MS) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/settings/cache-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelCatalogCacheTtlMs: parsed }),
      });

      if (!response.ok) throw new Error(`Cache config API returned ${response.status}`);

      const config = (await response.json()) as CacheConfigResponse;
      const saved = String(config.modelCatalogCacheTtlMs ?? parsed);
      setValue(saved);
      setSavedValue(saved);
      setMessage({ type: "success", text: t("cacheConfigSaveSuccess") });
    } catch (error) {
      console.error("Failed to save cache config:", error);
      setMessage({ type: "error", text: t("cacheConfigSaveFailed") });
    } finally {
      setSaving(false);
    }
  }, [dirty, t, value]);

  const validationError = (() => {
    const trimmed = value.trim();
    if (!trimmed) return "Required";
    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed)) return t("modelCatalogTtlWholeNumberError");
    if (parsed < MIN_TTL_MS) return t("modelCatalogTtlMinimumError", { min: MIN_TTL_MS });
    if (parsed > MAX_TTL_MS) return t("modelCatalogTtlMaximumError", { max: MAX_TTL_MS });
    return null;
  })();

  return (
    <Card className="p-6 mt-4">
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-medium">{t("modelCatalogCacheTtl")}</p>
          <p className="text-sm text-text-muted mt-1">{t("modelCatalogCacheTtlDescription")}</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="model-catalog-ttl-ms" className="sr-only">
            {t("modelCatalogCacheTtlLabel")}
          </label>
          <input
            id="model-catalog-ttl-ms"
            type="number"
            min={MIN_TTL_MS}
            max={MAX_TTL_MS}
            step={100}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setMessage(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && dirty) void saveTtl();
            }}
            className="w-32 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
            disabled={loading || saving}
          />
          <span className="text-xs text-text-muted">ms</span>
          <Button
            size="sm"
            variant="primary"
            disabled={loading || Boolean(validationError) || !dirty}
            onClick={saveTtl}
          >
            {saving ? t("modelCatalogCacheTtlSaving") : t("modelCatalogCacheTtlSave")}
          </Button>
          {dirty && (
            <span className="text-xs text-text-muted">
              {t("modelCatalogCacheTtlCurrent", { value: savedValue })}
            </span>
          )}
        </div>
        {validationError && <p className="text-xs text-red-500">{validationError}</p>}
        {message && (
          <p
            className={`text-xs ${
              message.type === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </Card>
  );
}
