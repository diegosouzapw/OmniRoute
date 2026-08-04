"use client";

/**
 * ProviderCcAliasSection — operator control for the Claude Code discovery-alias
 * gate (`claude/&lt;provider&gt;/&lt;model&gt;` mirror ids on /v1/models — see
 * src/lib/db/ccDiscoveryAliases.ts for the gate itself).
 *
 * Renders a card on the provider detail page with:
 *   - a 3-state provider-level control (inherit / on / off)
 *   - a compact list of per-model overrides, each also inherit/on/off
 *
 * "Inherit" clears the DB override (`value: null`) and falls back to the next
 * level down (model → provider → the global EXPOSE_CC_DISCOVERY_ALIASES flag).
 * Off by default at every level — this card is purely opt-in.
 */

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

export type CcAliasSettingValue = "on" | "off" | null;

interface ProviderCcAliasSectionProps {
  providerId: string;
}

interface CcAliasState {
  provider: CcAliasSettingValue;
  models: Record<string, "on" | "off">;
}

const DEFAULT_STATE: CcAliasState = { provider: null, models: {} };

async function fetchCcAliasState(providerId: string): Promise<CcAliasState> {
  const res = await fetch(`/api/providers/${providerId}/cc-alias`);
  const data = await res.json();
  return {
    provider: data?.provider === "on" || data?.provider === "off" ? data.provider : null,
    models: data?.models && typeof data.models === "object" ? data.models : {},
  };
}

async function throwOnErrorResponse(res: Response): Promise<void> {
  if (res.ok) return;
  const errData = await res.json().catch(() => ({}));
  const message =
    typeof errData?.error === "string"
      ? errData.error
      : errData?.error?.message || `HTTP ${res.status}`;
  throw new Error(message);
}

async function putProviderSetting(providerId: string, value: CcAliasSettingValue): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/cc-alias`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scope: "provider", value }),
  });
  await throwOnErrorResponse(res);
}

async function putModelSetting(
  providerId: string,
  modelId: string,
  value: CcAliasSettingValue
): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/cc-alias`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scope: "model", modelId, value }),
  });
  await throwOnErrorResponse(res);
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Loads the provider's alias settings once and reports a load failure to the operator. */
function useCcAliasData(providerId: string, t: ProviderMessageTranslator) {
  const notify = useNotificationStore();
  const [state, setState] = useState<CcAliasState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  const loadState = useCallback(async () => {
    setLoading(true);
    try {
      setState(await fetchCcAliasState(providerId));
    } catch (err) {
      notify.error(
        providerText(t, "ccAliasLoadError", "Failed to load discovery-alias settings: {error}", {
          error: errorMessage(err),
        })
      );
    } finally {
      setLoading(false);
    }
  }, [providerId, notify, t]);

  useEffect(() => {
    loadState();
  }, [loadState]);

  return { state, setState, loading };
}

function useProviderCcAliasState(providerId: string, t: ProviderMessageTranslator) {
  const notify = useNotificationStore();
  const { state, setState, loading } = useCcAliasData(providerId, t);
  const [savingProvider, setSavingProvider] = useState(false);
  const [savingModelId, setSavingModelId] = useState<string | null>(null);
  const [newModelId, setNewModelId] = useState("");

  const handleProviderChange = useCallback(
    async (value: CcAliasSettingValue) => {
      setSavingProvider(true);
      try {
        await putProviderSetting(providerId, value);
        setState((prev) => ({ ...prev, provider: value }));
      } catch (err) {
        notify.error(
          providerText(t, "ccAliasSaveError", "Failed to save discovery-alias setting: {error}", {
            error: errorMessage(err),
          })
        );
      } finally {
        setSavingProvider(false);
      }
    },
    [providerId, notify, t, setState]
  );

  const handleModelChange = useCallback(
    async (modelId: string, value: CcAliasSettingValue) => {
      setSavingModelId(modelId);
      try {
        await putModelSetting(providerId, modelId, value);
        setState((prev) => {
          const models = { ...prev.models };
          if (value === null) delete models[modelId];
          else models[modelId] = value;
          return { ...prev, models };
        });
      } catch (err) {
        notify.error(
          providerText(t, "ccAliasSaveError", "Failed to save discovery-alias setting: {error}", {
            error: errorMessage(err),
          })
        );
      } finally {
        setSavingModelId(null);
      }
    },
    [providerId, notify, t, setState]
  );

  const handleAddModelOverride = useCallback(async () => {
    const modelId = newModelId.trim();
    if (!modelId) return;
    await handleModelChange(modelId, "on");
    setNewModelId("");
  }, [newModelId, handleModelChange]);

  return {
    state,
    loading,
    savingProvider,
    savingModelId,
    newModelId,
    setNewModelId,
    handleProviderChange,
    handleModelChange,
    handleAddModelOverride,
  };
}

function CcAliasSectionSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <div className="h-5 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}

type TriState = "inherit" | "on" | "off";

function toTriState(value: CcAliasSettingValue): TriState {
  if (value === "on") return "on";
  if (value === "off") return "off";
  return "inherit";
}

function fromTriState(value: TriState): CcAliasSettingValue {
  if (value === "inherit") return null;
  return value;
}

interface TriStateSelectProps {
  t: ProviderMessageTranslator;
  value: CcAliasSettingValue;
  disabled?: boolean;
  onChange: (value: CcAliasSettingValue) => void;
  ariaLabel: string;
}

function TriStateSelect({ t, value, disabled, onChange, ariaLabel }: TriStateSelectProps) {
  return (
    <select
      aria-label={ariaLabel}
      disabled={disabled}
      value={toTriState(value)}
      onChange={(e) => onChange(fromTriState(e.target.value as TriState))}
      className="rounded-md border border-border bg-sidebar/50 px-2 py-1 text-xs text-text-main focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="inherit">{providerText(t, "ccAliasStateInherit", "Inherit")}</option>
      <option value="on">{providerText(t, "ccAliasStateOn", "On")}</option>
      <option value="off">{providerText(t, "ccAliasStateOff", "Off")}</option>
    </select>
  );
}

export default function ProviderCcAliasSection({ providerId }: ProviderCcAliasSectionProps) {
  const t = useTranslations("providers");
  const {
    state,
    loading,
    savingProvider,
    savingModelId,
    newModelId,
    setNewModelId,
    handleProviderChange,
    handleModelChange,
    handleAddModelOverride,
  } = useProviderCcAliasState(providerId, t);

  if (loading) {
    return <CcAliasSectionSkeleton />;
  }

  const modelEntries = Object.entries(state.models);

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <h2 className="text-base font-semibold text-text-main mb-1">
        {providerText(t, "ccAliasSectionTitle", "Expose in Claude Code (claude/…)")}
      </h2>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {providerText(
          t,
          "ccAliasSectionHint",
          "Advertise this provider's models under claude/&lt;provider&gt;/&lt;model&gt; mirror ids so Claude Code's gateway model discovery can list them. Off by default — enabling this doubles catalog entries for all clients."
        )}
      </p>

      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-sm font-medium text-text-main">
          {providerText(t, "ccAliasProviderLevelLabel", "Provider default")}
        </span>
        <TriStateSelect
          t={t}
          value={state.provider}
          disabled={savingProvider}
          onChange={handleProviderChange}
          ariaLabel={providerText(t, "ccAliasProviderLevelLabel", "Provider default")}
        />
      </div>

      <ModelOverrideList
        t={t}
        entries={modelEntries}
        savingModelId={savingModelId}
        onChange={handleModelChange}
      />

      <AddOverrideRow
        t={t}
        value={newModelId}
        onValueChange={setNewModelId}
        onSubmit={handleAddModelOverride}
        disabled={savingModelId !== null}
      />
    </div>
  );
}

function ModelOverrideList({
  t,
  entries,
  savingModelId,
  onChange,
}: {
  t: ProviderMessageTranslator;
  entries: Array<[string, CcAliasSettingValue]>;
  savingModelId: string | null;
  onChange: (modelId: string, value: CcAliasSettingValue) => void;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="mb-3 flex flex-col gap-2">
      <span className="text-xs font-medium text-text-muted">
        {providerText(t, "ccAliasModelOverridesLabel", "Per-model overrides")}
      </span>
      {entries.map(([modelId, value]) => (
        <div key={modelId} className="flex items-center justify-between gap-3">
          <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted truncate">
            {modelId}
          </code>
          <TriStateSelect
            t={t}
            value={value}
            disabled={savingModelId === modelId}
            onChange={(v) => onChange(modelId, v)}
            ariaLabel={providerText(t, "ccAliasModelOverrideAriaLabel", "Override for {modelId}", {
              modelId,
            })}
          />
        </div>
      ))}
    </div>
  );
}

function AddOverrideRow({
  t,
  value,
  onValueChange,
  onSubmit,
  disabled,
}: {
  t: ProviderMessageTranslator;
  value: string;
  onValueChange: (next: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          onSubmit();
        }}
        placeholder={providerText(t, "ccAliasAddModelPlaceholder", "Model id (e.g. gpt-4o)")}
        className="flex-1 rounded-lg border border-border bg-sidebar/50 px-3 py-1.5 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={!value.trim() || disabled}
        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-main hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {providerText(t, "ccAliasAddModelButton", "Add override")}
      </button>
    </div>
  );
}
