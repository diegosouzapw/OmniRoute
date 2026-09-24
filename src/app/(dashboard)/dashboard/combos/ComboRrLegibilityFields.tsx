"use client";

import { useMemo } from "react";
import { FieldLabelWithHelp } from "./parts";
import {
  describeStickyRoundRobinLimit,
  isConnectionAwareExpansionStrategy,
  optionalBooleanFromTriState,
  shouldShowPromptCacheAffinityHint,
  stickyLimitInputValue,
  parseStickyLimitInput,
  triStateFromOptionalBoolean,
  type StickyLimitSource,
} from "./comboRrLegibility";

type TranslationFn = {
  (key: string, values?: Record<string, unknown>): string;
  has?: (key: string) => boolean;
};

type RoutingSettings = {
  stickyRoundRobinLimit?: unknown;
  comboStickyRoundRobinLimit?: unknown;
  connectionAwareExpansion?: unknown;
};

type Props = {
  strategy: string;
  config: Record<string, any>;
  setConfig: (config: Record<string, any>) => void;
  models: Array<{ connectionId?: string | null } | null | undefined>;
  routingSettings?: RoutingSettings | null;
  t: TranslationFn;
  showHelp?: boolean;
};

const INPUT_CLASS =
  "w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none";
const SELECT_CLASS =
  "w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-surface-1 focus:border-primary focus:outline-none";

const FALLBACK_SETTINGS: RoutingSettings = {
  stickyRoundRobinLimit: 3,
  comboStickyRoundRobinLimit: null,
};

function interpolate(template: string, values?: Record<string, unknown>): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = values[name];
    if (value === undefined || value === null) return `{${name}}`;
    return String(value);
  });
}

function getI18nOrFallback(
  t: TranslationFn,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {
    /* fall through */
  }
  return interpolate(fallback, values);
}

function sourceLabel(t: TranslationFn, source: StickyLimitSource): string {
  if (source === "combo") return getI18nOrFallback(t, "stickyLimitSourceCombo", "combo");
  if (source === "combo-defaults") {
    return getI18nOrFallback(t, "stickyLimitSourceComboDefaults", "combo defaults");
  }
  return getI18nOrFallback(t, "stickyLimitSourceGlobal", "global default");
}

export default function ComboRrLegibilityFields({
  strategy,
  config,
  setConfig,
  models,
  routingSettings,
  t,
  showHelp = true,
}: Props) {
  const settings = routingSettings || FALLBACK_SETTINGS;
  const sticky = describeStickyRoundRobinLimit(config.stickyRoundRobinLimit, settings);
  const pinnedAccountCount = useMemo(
    () => models.filter((entry) => Boolean(entry?.connectionId)).length,
    [models]
  );
  const showSticky = strategy === "round-robin";
  const showExpansion = isConnectionAwareExpansionStrategy(strategy);
  const showAffinityHint = shouldShowPromptCacheAffinityHint(strategy, pinnedAccountCount);

  if (!showSticky && !showExpansion && !showAffinityHint) return null;

  return (
    <div className="grid grid-cols-1 gap-2 pt-2">
      {showSticky && (
        <div>
          <FieldLabelWithHelp
            label={getI18nOrFallback(t, "stickyLimit", "Sticky Limit")}
            help={getI18nOrFallback(
              t,
              "advancedHelp.stickyLimit",
              "Round-robin sticky batch size: consecutive successful requests sent to one target before rotating to the next. Empty inherits the global Sticky Limit setting; 1 disables batching (pure one-request rotation)."
            )}
            showHelp={showHelp}
            htmlFor="combo-sticky-round-robin-limit"
          />
          <input
            id="combo-sticky-round-robin-limit"
            data-testid="combo-sticky-round-robin-limit"
            type="number"
            min="1"
            max="1000"
            value={stickyLimitInputValue(config.stickyRoundRobinLimit)}
            placeholder={getI18nOrFallback(t, "stickyLimitInherit", "inherit")}
            onChange={(e) =>
              setConfig({
                ...config,
                stickyRoundRobinLimit: parseStickyLimitInput(e.target.value),
              })
            }
            className={INPUT_CLASS}
          />
          <p
            data-testid="combo-sticky-limit-effective"
            className="mt-1 text-[10px] text-text-muted"
          >
            {getI18nOrFallback(t, "stickyLimitEffective", "Effective {value} ({source})", {
              value: sticky.value,
              source: sourceLabel(t, sticky.source),
            })}
          </p>
        </div>
      )}
      {showExpansion && (
        <div>
          <FieldLabelWithHelp
            label={getI18nOrFallback(t, "connectionAwareExpansion", "Connection-aware expansion")}
            help={getI18nOrFallback(
              t,
              "advancedHelp.connectionAwareExpansion",
              "When on, this combo expands each provider-level step into per-account targets before rotating. Inherit uses the global default (off). Off keeps provider-level rotation."
            )}
            showHelp={showHelp}
            htmlFor="combo-connection-aware-expansion"
          />
          <select
            id="combo-connection-aware-expansion"
            data-testid="combo-connection-aware-expansion"
            value={triStateFromOptionalBoolean(config.connectionAwareExpansion)}
            onChange={(e) =>
              setConfig({
                ...config,
                connectionAwareExpansion: optionalBooleanFromTriState(e.target.value),
              })
            }
            className={SELECT_CLASS}
          >
            <option value="inherit">
              {getI18nOrFallback(t, "triStateInherit", "inherit")}
            </option>
            <option value="on">
              {getI18nOrFallback(t, "connectionAwareExpansionOn", "On")}
            </option>
            <option value="off">
              {getI18nOrFallback(t, "connectionAwareExpansionOff", "Off")}
            </option>
          </select>
        </div>
      )}
      {showAffinityHint && (
        <p
          data-testid="combo-prompt-cache-affinity-hint"
          className="text-[10px] text-text-muted"
        >
          {getI18nOrFallback(
            t,
            "promptCacheAffinityHint",
            "Prompt-cache locality routing takes precedence over round-robin/weighted rotation across pinned accounts. Turn it off under Settings, Combo defaults, if you need strict rotation."
          )}
        </p>
      )}
    </div>
  );
}
