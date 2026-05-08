"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card } from "@/shared/components";
import {
  DEFAULT_REQUEST_BODY_LIMIT_MB,
  MAX_REQUEST_BODY_LIMIT_MB,
  MIN_REQUEST_BODY_LIMIT_MB,
} from "@/shared/constants/bodySize";
import { useTranslations } from "next-intl";

type Message = { type: "success" | "error"; text: string };

interface SettingsResponse {
  maxBodySizeMb?: number;
  [key: string]: unknown;
}

function normalizeInputValue(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value)
    ? String(value)
    : String(DEFAULT_REQUEST_BODY_LIMIT_MB);
}

export default function RequestLimitsTab() {
  const t = useTranslations("settings");
  const [value, setValue] = useState(String(DEFAULT_REQUEST_BODY_LIMIT_MB));
  const [savedValue, setSavedValue] = useState(String(DEFAULT_REQUEST_BODY_LIMIT_MB));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/settings")
      .then((response) => {
        if (!response.ok) throw new Error(`Settings API returned ${response.status}`);
        return response.json() as Promise<SettingsResponse>;
      })
      .then((settings) => {
        if (!active) return;
        const nextValue = normalizeInputValue(settings.maxBodySizeMb);
        setValue(nextValue);
        setSavedValue(nextValue);
      })
      .catch((error) => {
        console.error("Failed to load request limit settings:", error);
        if (active) {
          setMessage({ type: "error", text: t("requestBodyLimitLoadFailed") });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [t]);

  const validationError = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return t("requestBodyLimitEmptyError");

    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed)) return t("requestBodyLimitWholeNumberError");
    if (parsed < MIN_REQUEST_BODY_LIMIT_MB) {
      return t("requestBodyLimitMinimumError", { min: MIN_REQUEST_BODY_LIMIT_MB });
    }
    if (parsed > MAX_REQUEST_BODY_LIMIT_MB) {
      return t("requestBodyLimitMaximumError", { max: MAX_REQUEST_BODY_LIMIT_MB });
    }

    return null;
  }, [t, value]);

  const dirty = value.trim() !== savedValue;

  const saveLimit = useCallback(async () => {
    if (validationError || !dirty) return;

    const nextValue = Number(value.trim());
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxBodySizeMb: nextValue }),
      });

      if (!response.ok) throw new Error(`Settings API returned ${response.status}`);

      const settings = (await response.json()) as SettingsResponse;
      const saved = normalizeInputValue(settings.maxBodySizeMb ?? nextValue);
      setValue(saved);
      setSavedValue(saved);
      setMessage({ type: "success", text: t("requestBodyLimitSaveSuccess") });
    } catch (error) {
      console.error("Failed to save request body limit:", error);
      setMessage({ type: "error", text: t("requestBodyLimitSaveFailed") });
    } finally {
      setSaving(false);
    }
  }, [dirty, t, validationError, value]);

  return (
    <Card className="p-6 mt-4">
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-medium">{t("requestBodyLimitTitle")}</p>
          <p className="text-sm text-text-muted mt-1">{t("requestBodyLimitDescription")}</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="request-body-limit-mb" className="sr-only">
            {t("requestBodyLimitInputLabel")}
          </label>
          <input
            id="request-body-limit-mb"
            type="number"
            min={MIN_REQUEST_BODY_LIMIT_MB}
            max={MAX_REQUEST_BODY_LIMIT_MB}
            step={1}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setMessage(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && dirty) void saveLimit();
            }}
            className="w-32 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
            disabled={loading || saving}
          />
          <span className="text-xs text-text-muted">MB</span>
          <Button
            size="sm"
            variant="primary"
            disabled={loading || Boolean(validationError) || !dirty}
            onClick={saveLimit}
          >
            {saving ? t("requestBodyLimitSaving") : t("requestBodyLimitSave")}
          </Button>
          {dirty && (
            <span className="text-xs text-text-muted">
              {t("requestBodyLimitCurrent", { value: savedValue })}
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
