"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface UpstreamCaFieldProps {
  value: string;
  onChange: (v: string) => void;
  onSave: (path: string) => Promise<void>;
}

/**
 * Input + Test button for the optional upstream CA certificate path.
 * Used for corporate networks that intercept TLS upstream.
 */
export function UpstreamCaField({ value, onChange, onSave }: UpstreamCaFieldProps) {
  const t = useTranslations("agentBridge");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"ok" | "error" | null>(null);

  const handleTest = async () => {
    if (!value.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/tools/agent-bridge/upstream-ca/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: value.trim() }),
      });
      setTestResult(res.ok ? "ok" : "error");
    } catch {
      setTestResult("error");
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    await onSave(value.trim());
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-text-muted">
        {t("upstreamCaLabel") || "Upstream CA Certificate (corporate)"}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-lg border border-border/50 bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder={t("upstreamCaPlaceholder") || "/etc/ssl/certs/corp-ca.pem"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={handleTest}
          disabled={testing || !value.trim()}
          className="shrink-0 rounded-lg border border-border/50 bg-card px-3 py-2 text-xs font-medium hover:bg-surface transition-colors disabled:opacity-50"
        >
          {testing ? "Testing…" : t("upstreamCaTest") || "Test TLS"}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!value.trim()}
          className="shrink-0 rounded-lg bg-primary/10 text-primary px-3 py-2 text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {t("save") || "Save"}
        </button>
      </div>
      {testResult === "ok" && (
        <p className="text-xs text-emerald-500">
          <span className="material-symbols-outlined text-[12px] mr-1">check_circle</span>
          {t("upstreamCaTestOk") || "TLS test passed"}
        </p>
      )}
      {testResult === "error" && (
        <p className="text-xs text-red-500">
          <span className="material-symbols-outlined text-[12px] mr-1">error</span>
          {t("upstreamCaTestError") || "TLS test failed — check the path and CA file"}
        </p>
      )}
    </div>
  );
}
