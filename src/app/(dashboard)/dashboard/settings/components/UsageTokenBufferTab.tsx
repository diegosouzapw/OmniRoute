"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";

export default function UsageTokenBufferTab() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [usageTokenBuffer, setUsageTokenBuffer] = useState<number | null>(null);
  const [bufferInput, setBufferInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const buffer = typeof data.usageTokenBuffer === "number" ? data.usageTokenBuffer : 2000;
        if (!cancelled) {
          setUsageTokenBuffer(buffer);
          setBufferInput(String(buffer));
        }
      } catch {
        // Keep the input disabled if settings cannot be loaded.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateUsageTokenBuffer = async () => {
    const nextValue = Number.parseInt(bufferInput, 10);
    if (!Number.isFinite(nextValue) || nextValue < 0 || nextValue > 50000) return;

    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usageTokenBuffer: nextValue }),
      });
      if (res.ok) {
        setUsageTokenBuffer(nextValue);
      }
    } catch (err) {
      console.error("Failed to update usageTokenBuffer:", err);
    } finally {
      setSaving(false);
    }
  };

  const parsedInput = Number.parseInt(bufferInput, 10);
  const isDirty = usageTokenBuffer !== null && parsedInput !== usageTokenBuffer;

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            pin
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("storageUsageTokenBuffer")}</h3>
          <p className="text-sm text-text-muted">{t("storageUsageTokenBufferDesc")}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="number"
          min={0}
          max={50000}
          value={bufferInput}
          onChange={(e) => setBufferInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void updateUsageTokenBuffer();
          }}
          className="h-10 w-36 rounded-lg border border-border bg-surface px-3 text-sm text-text-main focus:outline-none focus:border-primary"
          disabled={loading}
        />
        <Button
          size="sm"
          variant="primary"
          onClick={updateUsageTokenBuffer}
          disabled={saving || loading || !isDirty}
        >
          {saving ? tc("saving") : tc("save")}
        </Button>
        {usageTokenBuffer !== null && isDirty && (
          <span className="text-xs text-text-muted">
            {t("storageUsageTokenBufferCurrent", { value: usageTokenBuffer })}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-text-muted">{t("storageUsageTokenBufferHint")}</p>
    </Card>
  );
}
