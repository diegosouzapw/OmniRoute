"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Toggle } from "@/shared/components";

type CavemanIntensity = "lite" | "full" | "ultra";
type RtkIntensity = "minimal" | "standard" | "aggressive";

export interface CompressionTokenSaverConfig {
  enabled: boolean;
  cavemanConfig?: { enabled: boolean; intensity: CavemanIntensity };
  cavemanOutputMode?: { enabled: boolean; intensity: CavemanIntensity };
  rtkConfig?: { enabled: boolean; intensity: RtkIntensity };
}

export type CompressionTokenSaverPatch = Partial<CompressionTokenSaverConfig>;

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
            className={`rounded px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
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
  saving,
  onToggle,
  level,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
  enabled: boolean;
  masterEnabled: boolean;
  saving: boolean;
  onToggle: (v: boolean) => void;
  level: ReactNode;
}) {
  const effective = masterEnabled && enabled;
  return (
    <div
      className={`flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between ${
        masterEnabled ? "" : "opacity-60"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-medium text-text-main">
          {title}
          <Link
            href={href}
            className="rounded border border-border bg-bg-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted hover:border-primary/40 hover:text-primary"
          >
            {badge}
          </Link>
        </div>
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {level}
        <Toggle
          size="sm"
          checked={effective}
          onChange={onToggle}
          disabled={!masterEnabled || saving}
        />
      </div>
    </div>
  );
}

export default function CompressionTokenSaverCard({
  config,
  saving,
  onSave,
}: {
  config: CompressionTokenSaverConfig;
  saving: boolean;
  onSave: (patch: CompressionTokenSaverPatch) => void | Promise<void>;
}) {
  const t = useTranslations("settings");
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
    <section className="rounded-lg border border-border/70 bg-surface/40 p-4">
      <div className="mb-1 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="flex items-center gap-2 text-base font-semibold text-text-main">
            <span className="material-symbols-outlined text-[21px] text-amber-500">bolt</span>
            {t("tokenSaverTitle")}
            {saving && (
              <span className="material-symbols-outlined text-[16px] animate-spin text-text-muted">
                sync
              </span>
            )}
          </h4>
          <p className="mt-1 text-sm text-text-muted">{t("tokenSaverSubtitle")}</p>
        </div>
        <Toggle
          size="md"
          checked={masterEnabled}
          onChange={(checked) => onSave({ enabled: checked })}
          disabled={saving}
        />
      </div>

      <div className="mt-4 divide-y divide-border">
        <EngineRow
          title={t("tokenSaverToolOutput")}
          badge="RTK"
          href="/dashboard/context/rtk"
          description={t("tokenSaverToolOutputDesc")}
          enabled={rtk.enabled}
          masterEnabled={masterEnabled}
          saving={saving}
          onToggle={(enabled) => onSave({ rtkConfig: { ...rtk, enabled } })}
          level={
            <SegmentedLevel
              levels={RTK_LEVELS}
              value={rtk.intensity}
              onChange={(intensity) => onSave({ rtkConfig: { ...rtk, intensity } })}
              disabled={saving || !masterEnabled || !rtk.enabled}
            />
          }
        />
        <EngineRow
          title={t("tokenSaverLlmOutput")}
          badge="Caveman"
          href="/dashboard/context/caveman"
          description={t("tokenSaverLlmOutputDesc")}
          enabled={cavemanOut.enabled}
          masterEnabled={masterEnabled}
          saving={saving}
          onToggle={(enabled) => onSave({ cavemanOutputMode: { ...cavemanOut, enabled } })}
          level={
            <SegmentedLevel
              levels={CAVEMAN_LEVELS}
              value={cavemanOut.intensity}
              onChange={(intensity) => onSave({ cavemanOutputMode: { ...cavemanOut, intensity } })}
              disabled={saving || !masterEnabled || !cavemanOut.enabled}
            />
          }
        />
        <EngineRow
          title={t("tokenSaverInputCompression")}
          badge="Caveman"
          href="/dashboard/context/caveman"
          description={t("tokenSaverInputCompressionDesc")}
          enabled={cavemanIn.enabled}
          masterEnabled={masterEnabled}
          saving={saving}
          onToggle={(enabled) => onSave({ cavemanConfig: { ...cavemanIn, enabled } })}
          level={
            <SegmentedLevel
              levels={CAVEMAN_LEVELS}
              value={cavemanIn.intensity}
              onChange={(intensity) => onSave({ cavemanConfig: { ...cavemanIn, intensity } })}
              disabled={saving || !masterEnabled || !cavemanIn.enabled}
            />
          }
        />
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-xs text-text-muted">
        <span className="material-symbols-outlined mt-px text-[16px]">info</span>
        <p>
          {t("tokenSaverFineTunePrefix")}{" "}
          <Link href="/dashboard/context/caveman" className="text-primary hover:underline">
            Caveman
          </Link>{" "}
          /{" "}
          <Link href="/dashboard/context/rtk" className="text-primary hover:underline">
            RTK
          </Link>
          , {t("tokenSaverFineTuneSuffix")}{" "}
          <Link href="/dashboard/context/combos" className="text-primary hover:underline">
            Engine Combos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
