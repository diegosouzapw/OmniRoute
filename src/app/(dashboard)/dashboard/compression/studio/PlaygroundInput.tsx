"use client";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
export const LANE_ENGINES = [
  "session-dedup",
  "ccr",
  "lite",
  "rtk",
  "ionizer",
  "headroom",
  "caveman",
  "aggressive",
  "ultra",
] as const;
export interface PlaygroundInputProps {
  text: string;
  onText: (t: string) => void;
  active: string[];
  onToggleActive: (engine: string) => void;
  onRun: () => void;
  loading: boolean;
  fidelityGate: boolean;
  onToggleFidelity: () => void;
  fuzzyDedup: boolean;
  onToggleFuzzy: () => void;
  riskGate: boolean;
  onToggleRisk: () => void;
  quantumLock: boolean;
  onToggleQuantum: () => void;
  heatmap: "ultra" | "universal" | false;
  onToggleHeatmap: () => void;
}

function EngineOptions({
  active,
  onToggleActive,
}: {
  active: string[];
  onToggleActive: (engine: string) => void;
}) {
  const t = useTranslations("compressionStudio");
  return (
    <div>
      <div className="text-[10px] uppercase opacity-60">{t("activeCombined")}</div>
      {LANE_ENGINES.map((engine) => (
        <label key={engine} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={active.includes(engine)}
            onChange={() => onToggleActive(engine)}
          />
          {engine}
        </label>
      ))}
      <label className="flex items-center gap-2 text-sm opacity-50">
        <input type="checkbox" disabled /> llmlingua{" "}
        <span className="text-[10px]">({t("requiresOnnx")})</span>
      </label>
    </div>
  );
}

function ToggleOption({
  testId,
  checked,
  onChange,
  children,
  className = "flex items-center gap-2 text-sm",
}: {
  testId: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <input type="checkbox" data-testid={testId} checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

export function PlaygroundInput({
  text,
  onText,
  active,
  onToggleActive,
  onRun,
  loading,
  fidelityGate,
  onToggleFidelity,
  fuzzyDedup,
  onToggleFuzzy,
  riskGate,
  onToggleRisk,
  quantumLock,
  onToggleQuantum,
  heatmap,
  onToggleHeatmap,
}: PlaygroundInputProps) {
  const t = useTranslations("compressionStudio");
  return (
    <div className="flex flex-col gap-3">
      <textarea
        data-testid="play-input"
        className="min-h-[160px] w-full rounded border p-2 font-mono text-xs"
        value={text}
        onChange={(e) => onText(e.target.value)}
        placeholder={t("inputPlaceholder")}
      />
      <EngineOptions active={active} onToggleActive={onToggleActive} />
      <ToggleOption testId="fidelity-toggle" checked={fidelityGate} onChange={onToggleFidelity}>
        {t("verifyFidelity")}
      </ToggleOption>
      <ToggleOption testId="fuzzy-toggle" checked={fuzzyDedup} onChange={onToggleFuzzy}>
        {t("fuzzyDedup")}
      </ToggleOption>
      <ToggleOption testId="risk-toggle" checked={riskGate} onChange={onToggleRisk}>
        {t("protectSensitive")}
      </ToggleOption>
      <ToggleOption
        testId="quantum-toggle"
        checked={quantumLock}
        onChange={onToggleQuantum}
        className="flex items-center gap-1 text-xs"
      >
        {t("quantumLock")}
      </ToggleOption>
      <ToggleOption
        testId="heatmap-toggle"
        checked={Boolean(heatmap)}
        onChange={onToggleHeatmap}
        className="flex items-center gap-1 text-xs"
      >
        {t("saliencyHeatmap")} {heatmap ? `(${heatmap})` : ""}
      </ToggleOption>
      <button
        data-testid="play-run"
        className="rounded bg-blue-500/30 py-2 font-semibold"
        onClick={onRun}
        disabled={loading}
      >
        {loading ? t("running") : `▶ ${t("run")}`}
      </button>
    </div>
  );
}
