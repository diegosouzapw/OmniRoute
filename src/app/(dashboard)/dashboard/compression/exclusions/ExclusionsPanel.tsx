"use client";

// ExclusionsPanel (#8034) — per-model/endpoint compression exclusion filter.
//
// Lets the operator name model ids / `provider/model` patterns that must never be
// compressed (`*` is the only wildcard). Persisted via the existing
// GET/PUT /api/settings/compression endpoint (`exclusions` field), read/normalized by
// `normalizeCompressionExclusions` (open-sse/services/compression/exclusions.ts).
// Default (empty list) preserves pre-existing behavior exactly.

import { useEffect, useState } from "react";
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

export default function ExclusionsPanel() {
  const t = useTranslations("settings");
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { exclusions?: string[] } | null) => {
        if (data && Array.isArray(data.exclusions)) {
          setRaw(data.exclusions.join("\n"));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const patterns = parsePatterns(raw);

  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exclusions: patterns }),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus(""), 2000);
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
        <Textarea
          rows={8}
          value={raw}
          disabled={loading || saving}
          placeholder={t("compressionExclusionsPlaceholder")}
          onChange={(e) => setRaw(e.target.value)}
          data-testid="compression-exclusions-textarea"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-text-muted" data-testid="compression-exclusions-count">
            {patterns.length === 0
              ? t("compressionExclusionsEmpty")
              : t("compressionExclusionsCount", { count: patterns.length })}
          </span>
          <div className="flex items-center gap-2">
            {status === "saved" && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                {t("compressionExclusionsSaved")}
              </span>
            )}
            <Button
              size="sm"
              variant="primary"
              loading={saving}
              disabled={loading || saving}
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
