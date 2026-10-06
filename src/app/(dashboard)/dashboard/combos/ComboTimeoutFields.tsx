"use client";

import { FieldLabelWithHelp } from "./parts";

type TranslationFn = {
  (key: string, values?: Record<string, unknown>): string;
  has?: (key: string) => boolean;
};

type Props = {
  config: Record<string, any>;
  setConfig: (config: Record<string, any>) => void;
  t: TranslationFn;
  showHelp?: boolean;
};

const MS_PER_SECOND = 1000;
const MAX_SECONDS = 86400;

function getI18nOrFallback(t: TranslationFn, key: string, fallback: string): string {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key);
  } catch {
    /* fall through */
  }
  return fallback;
}

function msToOptionalSecondsInput(value: unknown): string {
  const ms = Number(value);
  if (!Number.isFinite(ms) || ms <= 0) return "";
  return String(Math.round(ms / MS_PER_SECOND));
}

function secondsInputToOptionalMs(value: string, maxSeconds = MAX_SECONDS): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return undefined;
  return Math.min(maxSeconds, Math.round(seconds)) * MS_PER_SECOND;
}

const INPUT_CLASS =
  "w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none";

export default function ComboTimeoutFields({ config, setConfig, t, showHelp = true }: Props) {
  return (
    <>
      <div>
        <FieldLabelWithHelp
          label={getI18nOrFallback(t, "targetTimeout", "Target timeout (seconds)")}
          help={getI18nOrFallback(
            t,
            "advancedHelp.targetTimeoutMs",
            "Optional per-target timeout. Empty inherits the current request timeout; larger values are capped to that timeout."
          )}
          showHelp={showHelp}
          htmlFor="combo-target-timeout-ms"
        />
        <input
          id="combo-target-timeout-ms"
          data-testid="combo-target-timeout-ms"
          type="number"
          min="1"
          max={MAX_SECONDS}
          step="1"
          value={msToOptionalSecondsInput(config.targetTimeoutMs)}
          placeholder={getI18nOrFallback(t, "inheritRequestTimeout", "inherit")}
          onChange={(e) =>
            setConfig({
              ...config,
              targetTimeoutMs: secondsInputToOptionalMs(e.target.value),
            })
          }
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <FieldLabelWithHelp
          label={getI18nOrFallback(t, "comboTimeout", "Combo timeout (seconds)")}
          help={getI18nOrFallback(
            t,
            "advancedHelp.comboTimeoutMs",
            "Optional whole-combo wall-clock budget across all failover targets. Empty keeps the 10-minute hang-stop; a positive value replaces it. Keep this longer than Target timeout so failover still has time."
          )}
          showHelp={showHelp}
          htmlFor="combo-combo-timeout-ms"
        />
        <input
          id="combo-combo-timeout-ms"
          data-testid="combo-combo-timeout-ms"
          type="number"
          min="1"
          max={MAX_SECONDS}
          step="1"
          value={msToOptionalSecondsInput(config.comboTimeoutMs)}
          placeholder={getI18nOrFallback(t, "inheritComboSafetyTimeout", "inherit (10 min)")}
          onChange={(e) =>
            setConfig({
              ...config,
              comboTimeoutMs: secondsInputToOptionalMs(e.target.value),
            })
          }
          className={INPUT_CLASS}
        />
      </div>
    </>
  );
}
