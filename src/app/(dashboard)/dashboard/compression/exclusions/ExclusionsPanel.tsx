"use client";

// ExclusionsPanel (#8034) — per-model/endpoint compression exclusion filter.
//
// Lets the operator name model ids / `provider/model` patterns that must never be
// compressed (`*` is the only wildcard). Persisted via the existing
// GET/PUT /api/settings/compression endpoint (`exclusions` field), read/normalized by
// `normalizeCompressionExclusions` (open-sse/services/compression/exclusions.ts).
// Default (empty list) preserves pre-existing behavior exactly.

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import Textarea from "@/shared/components/Textarea";

function parsePatterns(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

// A load or save that gets no reply in this time counts as failed, so one stalled request
// cannot leave the panel locked or the save spinning for good.
const REQUEST_TIMEOUT_MS = 15_000;

export default function ExclusionsPanel() {
  const t = useTranslations("settings");
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  // Set when the stored list could not be read: the HTTP status, or "" when the request or its
  // body failed. The editor stays locked, so Save cannot replace the stored list with an empty one.
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const savedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    fetch("/api/settings/compression", { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
      .then(async (r) => {
        const data: { exclusions?: unknown } | null = r.ok ? await r.json() : null;
        if (Array.isArray(data?.exclusions)) setRaw(data.exclusions.join("\n"));
        else setLoadError(r.ok ? "" : String(r.status));
      })
      .catch(() => setLoadError(""))
      .finally(() => setLoading(false));
  }, []);

  const patterns = parsePatterns(raw);
  const locked = loading || saving || loadError !== null;

  const save = async () => {
    // Each save stops the previous save's timer, so that timer cannot hide this save's message.
    clearTimeout(savedTimer.current);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exclusions: patterns }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) savedTimer.current = setTimeout(() => setStatus(""), 2000);
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card
      title={t("compressionExclusionsTitle")}
      subtitle={t("compressionExclusionsDesc")}
      data-testid="compression-exclusions-panel"
    >
      <div className="flex flex-col gap-3">
        {loadError !== null && (
          <p
            role="alert"
            className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              error
            </span>
            {t("failedLoadWithStatus", { status: loadError || t("unknownError") })}
          </p>
        )}
        <Textarea
          rows={8}
          value={raw}
          disabled={locked}
          placeholder={t("compressionExclusionsPlaceholder")}
          onChange={(e) => setRaw(e.target.value)}
          data-testid="compression-exclusions-textarea"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-text-muted" data-testid="compression-exclusions-count">
            {!loading &&
              loadError === null &&
              (patterns.length === 0
                ? t("compressionExclusionsEmpty")
                : t("compressionExclusionsCount", { count: patterns.length }))}
          </span>
          <div className="flex items-center gap-2">
            <span role="status" className="text-xs text-emerald-600 dark:text-emerald-400">
              {status === "saved" && t("compressionExclusionsSaved")}
            </span>
            {status === "error" && (
              <span
                role="alert"
                className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
              >
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  error
                </span>
                {t("saveFailed")}
              </span>
            )}
            <Button
              size="sm"
              variant="primary"
              loading={saving}
              disabled={locked}
              onClick={save}
              data-testid="compression-exclusions-save"
            >
              {t("compressionExclusionsSave")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
