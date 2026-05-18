"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Card, Toggle } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

type CavemanIntensity = "lite" | "full" | "ultra";
type RtkIntensity = "minimal" | "standard" | "aggressive";

interface CompressionConfig {
  enabled: boolean;
  cavemanConfig?: { enabled: boolean; intensity: CavemanIntensity };
  cavemanOutputMode?: { enabled: boolean; intensity: CavemanIntensity };
  rtkConfig?: { enabled: boolean; intensity: RtkIntensity };
}

const CAVEMAN_LEVELS: { value: CavemanIntensity; label: string }[] = [
  { value: "lite", label: "Lite" },
  { value: "full", label: "Full" },
  { value: "ultra", label: "Ultra" },
];

const RTK_LEVELS: { value: RtkIntensity; label: string }[] = [
  { value: "minimal", label: "Min" },
  { value: "standard", label: "Std" },
  { value: "aggressive", label: "Agg" },
];

function SegmentedLevel<T extends string>({
  levels,
  value,
  onChange,
  disabled,
}: {
  levels: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`inline-flex rounded-md border border-border bg-bg-subtle p-0.5 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {levels.map((lvl) => {
        const active = lvl.value === value;
        return (
          <button
            key={lvl.value}
            type="button"
            onClick={() => !disabled && onChange(lvl.value)}
            disabled={disabled}
            className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-colors ${
              active ? "bg-primary text-white" : "text-text-muted hover:text-text-primary"
            } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {lvl.label}
          </button>
        );
      })}
    </div>
  );
}

function EngineRow({
  title,
  description,
  href,
  badge,
  enabled,
  masterEnabled,
  onToggle,
  level,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
  enabled: boolean;
  masterEnabled: boolean;
  onToggle: (v: boolean) => void;
  level: React.ReactNode;
}) {
  const effective = masterEnabled && enabled;
  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-3 ${
        masterEnabled ? "" : "opacity-60"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm font-medium text-text-main">
          {title}
          <Link
            href={href}
            className="text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 bg-bg-subtle border border-border text-text-muted hover:text-primary hover:border-primary/40"
          >
            {badge}
          </Link>
        </div>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {level}
        <Toggle size="sm" checked={effective} onChange={onToggle} disabled={!masterEnabled} />
      </div>
    </div>
  );
}

export default function TokenSaverCard() {
  const notify = useNotificationStore();
  const [config, setConfig] = useState<CompressionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(
    async (patch: Partial<CompressionConfig>) => {
      if (!config) return;
      const next = { ...config, ...patch };
      setConfig(next);
      setSaving(true);
      try {
        const res = await fetch("/api/settings/compression", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated = await res.json();
        setConfig(updated);
      } catch (err) {
        notify.error(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSaving(false);
      }
    },
    [config, notify]
  );

  if (loading || !config) {
    return (
      <Card>
        <div className="h-32 animate-pulse rounded-md bg-bg-subtle/40" />
      </Card>
    );
  }

  const masterEnabled = config.enabled;
  const rtk = config.rtkConfig ?? { enabled: true, intensity: "standard" as RtkIntensity };
  const cavemanOut = config.cavemanOutputMode ?? {
    enabled: false,
    intensity: "full" as CavemanIntensity,
  };
  const cavemanIn = config.cavemanConfig ?? {
    enabled: true,
    intensity: "full" as CavemanIntensity,
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-amber-500">bolt</span>
            Token Saver
            {saving && (
              <span className="material-symbols-outlined text-[16px] animate-spin text-text-muted">
                sync
              </span>
            )}
          </h2>
          <p className="text-sm text-text-muted mt-1">Spend less tokens on every request.</p>
        </div>
        <Toggle size="md" checked={masterEnabled} onChange={(v) => save({ enabled: v })} />
      </div>

      <div className="divide-y divide-border mt-4">
        <EngineRow
          title="Tool output"
          badge="RTK"
          href="/dashboard/context/rtk"
          description="git/grep/ls/tree/logs cleaner → 60-90% fewer input tokens"
          enabled={rtk.enabled}
          masterEnabled={masterEnabled}
          onToggle={(v) => save({ rtkConfig: { ...rtk, enabled: v } })}
          level={
            <SegmentedLevel
              levels={RTK_LEVELS}
              value={rtk.intensity}
              onChange={(intensity) => save({ rtkConfig: { ...rtk, intensity } })}
              disabled={!masterEnabled || !rtk.enabled}
            />
          }
        />
        <EngineRow
          title="LLM output"
          badge="Caveman"
          href="/dashboard/context/caveman"
          description="Terse-style system prompt → ~65% fewer output tokens (up to 87%)"
          enabled={cavemanOut.enabled}
          masterEnabled={masterEnabled}
          onToggle={(v) => save({ cavemanOutputMode: { ...cavemanOut, enabled: v } })}
          level={
            <SegmentedLevel
              levels={CAVEMAN_LEVELS}
              value={cavemanOut.intensity}
              onChange={(intensity) => save({ cavemanOutputMode: { ...cavemanOut, intensity } })}
              disabled={!masterEnabled || !cavemanOut.enabled}
            />
          }
        />
        <EngineRow
          title="Input compression"
          badge="Caveman"
          href="/dashboard/context/caveman"
          description="Rewrite chat history → ~50% fewer input tokens"
          enabled={cavemanIn.enabled}
          masterEnabled={masterEnabled}
          onToggle={(v) => save({ cavemanConfig: { ...cavemanIn, enabled: v } })}
          level={
            <SegmentedLevel
              levels={CAVEMAN_LEVELS}
              value={cavemanIn.intensity}
              onChange={(intensity) => save({ cavemanConfig: { ...cavemanIn, intensity } })}
              disabled={!masterEnabled || !cavemanIn.enabled}
            />
          }
        />
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-start gap-2 text-xs text-text-muted">
        <span className="material-symbols-outlined text-[16px] mt-px">info</span>
        <p>
          Fine-tune each engine on{" "}
          <Link href="/dashboard/context/caveman" className="text-primary hover:underline">
            Caveman
          </Link>{" "}
          /{" "}
          <Link href="/dashboard/context/rtk" className="text-primary hover:underline">
            RTK
          </Link>
          , or combine engines per request on{" "}
          <Link href="/dashboard/context/combos" className="text-primary hover:underline">
            Engine Combos
          </Link>
          .
        </p>
      </div>
    </Card>
  );
}
