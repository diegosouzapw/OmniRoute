"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";
import { matchesSearch } from "@/shared/utils/turkishText";

type ModelOverrideKey = "max_token";
type StatusTone = "success" | "error" | "info";

type ModelOverrideTarget = {
  target: string;
  provider: string;
  modelId: string;
  label: string;
};

interface PricingCatalogModel {
  id: string;
  name: string;
}

interface PricingCatalogProvider {
  id: string;
  alias: string;
  models: PricingCatalogModel[];
}

interface ModelCapabilityOverride {
  target: string;
  key: ModelOverrideKey;
  value: number;
}

interface StatusMessage {
  tone: StatusTone;
  message: string;
}

function statusClassName(tone: StatusTone) {
  if (tone === "success") return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
  if (tone === "error") return "bg-red-500/10 border-red-500/20 text-red-400";
  return "bg-sky-500/10 border-sky-500/20 text-sky-400";
}

function useModelCapabilityOverridesData() {
  const t = useTranslations("settings");
  const [catalog, setCatalog] = useState<Record<string, PricingCatalogProvider>>({});
  const [overrides, setOverrides] = useState<ModelCapabilityOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const showStatus = useCallback((tone: StatusTone, message: string) => {
    setStatusMessage({ tone, message });
    window.setTimeout(() => setStatusMessage(null), 4000);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [catalogRes, overridesRes] = await Promise.all([
        fetch("/api/pricing/models"),
        fetch("/api/model-capability-overrides"),
      ]);
      if (catalogRes.ok)
        setCatalog((await catalogRes.json()) as Record<string, PricingCatalogProvider>);
      if (overridesRes.ok) {
        const payload = (await overridesRes.json()) as { overrides?: ModelCapabilityOverride[] };
        setOverrides(payload.overrides || []);
      }
    } catch (error) {
      console.error("Failed to load model capability overrides:", error);
      showStatus("error", t("modelOverrideLoadFailed"));
    } finally {
      setLoading(false);
    }
  }, [showStatus, t]);

  const saveOverride = useCallback(
    async (target: string, key: ModelOverrideKey, value: number) => {
      try {
        const response = await fetch("/api/model-capability-overrides", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target, key, value }),
        });
        if (!response.ok) throw new Error(t("modelOverrideSaveFailed"));
        const payload = (await response.json()) as { overrides?: ModelCapabilityOverride[] };
        setOverrides(payload.overrides || []);
        showStatus("success", t("modelOverrideSaved"));
      } catch (error: any) {
        showStatus("error", error?.message || t("modelOverrideSaveFailed"));
      }
    },
    [showStatus, t]
  );

  const removeOverride = useCallback(
    async (target: string, key: ModelOverrideKey) => {
      try {
        const params = new URLSearchParams({ target, key });
        const response = await fetch(`/api/model-capability-overrides?${params.toString()}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(t("modelOverrideRemoveFailed"));
        const payload = (await response.json()) as { overrides?: ModelCapabilityOverride[] };
        setOverrides(payload.overrides || []);
        showStatus("info", t("modelOverrideRemoved"));
      } catch (error: any) {
        showStatus("error", error?.message || t("modelOverrideRemoveFailed"));
      }
    },
    [showStatus, t]
  );

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return { catalog, overrides, loading, statusMessage, saveOverride, removeOverride };
}

function toTargets(catalog: Record<string, PricingCatalogProvider>): ModelOverrideTarget[] {
  return Object.values(catalog).flatMap((provider) =>
    provider.models.map((model) => ({
      target: `${provider.id}/${model.id}`,
      provider: provider.id,
      modelId: model.id,
      label: `${provider.id}/${model.id}`,
    }))
  );
}

export default function ModelCapabilityOverridesTab() {
  const t = useTranslations("settings");
  const { catalog, overrides, loading, statusMessage, saveOverride, removeOverride } =
    useModelCapabilityOverridesData();
  const targets = useMemo(() => toTargets(catalog), [catalog]);

  if (loading) return <div className="text-sm text-text-muted animate-pulse">{t("loading")}</div>;

  return (
    <div className="space-y-3">
      <ModelCapabilityOverridesPanel
        targets={targets}
        overrides={overrides}
        onSave={(target, key, value) => void saveOverride(target, key, value)}
        onRemove={(target, key) => void removeOverride(target, key)}
      />
      {statusMessage && <StatusMessageBanner status={statusMessage} />}
    </div>
  );
}

function StatusMessageBanner({ status }: { status: StatusMessage }) {
  return (
    <div className={`px-3 py-2 rounded-lg border text-sm ${statusClassName(status.tone)}`}>
      {status.message}
    </div>
  );
}

function ModelCapabilityOverridesPanel({
  targets,
  overrides,
  onSave,
  onRemove,
}: {
  targets: ModelOverrideTarget[];
  overrides: ModelCapabilityOverride[];
  onSave: (target: string, key: ModelOverrideKey, value: number) => void;
  onRemove: (target: string, key: ModelOverrideKey) => void;
}) {
  const [selectedTarget, setSelectedTarget] = useState("");
  const [search, setSearch] = useState("");
  const filteredTargets = useFilteredTargets(targets, search);
  const activeTarget = selectedTarget || filteredTargets[0]?.target || "";
  const activeOverrides = overrides.filter((entry) => entry.target === activeTarget);

  return (
    <Card className="p-4">
      <ModelOverridesHeader count={overrides.length} />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.9fr)_minmax(360px,1.1fr)] gap-4">
        <ModelOverrideTargetList
          activeTarget={activeTarget}
          filteredTargets={filteredTargets}
          overrides={overrides}
          search={search}
          setSearch={setSearch}
          setSelectedTarget={setSelectedTarget}
        />
        <ModelOverrideEditor
          activeOverrides={activeOverrides}
          activeTarget={activeTarget}
          onRemove={onRemove}
          onSave={onSave}
        />
      </div>
    </Card>
  );
}

function useFilteredTargets(targets: ModelOverrideTarget[], search: string) {
  return useMemo(() => {
    const query = search.trim();
    const source = query
      ? targets.filter((entry) =>
          [entry.label, entry.target, entry.provider, entry.modelId].some((candidate) =>
            matchesSearch(candidate, query)
          )
        )
      : targets;
    return source.slice(0, 80);
  }, [search, targets]);
}

function ModelOverridesHeader({ count }: { count: number }) {
  const t = useTranslations("settings");
  return (
    <div className="flex items-start justify-between gap-3 mb-3">
      <div>
        <h3 className="text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
          {t("modelOverridesTitle")}
        </h3>
        <p className="text-xs text-text-muted mt-1">{t("modelOverridesDesc")}</p>
      </div>
      <span className="text-[10px] px-2 py-1 rounded-md border border-border bg-bg-subtle text-text-muted">
        {count} {t("configured")}
      </span>
    </div>
  );
}

function ModelOverrideTargetList({
  activeTarget,
  filteredTargets,
  overrides,
  search,
  setSearch,
  setSelectedTarget,
}: {
  activeTarget: string;
  filteredTargets: ModelOverrideTarget[];
  overrides: ModelCapabilityOverride[];
  search: string;
  setSearch: (value: string) => void;
  setSelectedTarget: (value: string) => void;
}) {
  const t = useTranslations("settings");
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div className="p-2 border-b border-border/50 bg-bg-subtle/40">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("searchModelOverrideTargets")}
          className="w-full px-3 py-2 text-xs bg-bg-base border border-border rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="max-h-56 overflow-y-auto divide-y divide-border/40">
        {filteredTargets.map((entry) => (
          <ModelOverrideTargetButton
            key={entry.target}
            active={entry.target === activeTarget}
            count={overrides.filter((override) => override.target === entry.target).length}
            entry={entry}
            onSelect={setSelectedTarget}
          />
        ))}
      </div>
    </div>
  );
}

function ModelOverrideTargetButton({
  active,
  count,
  entry,
  onSelect,
}: {
  active: boolean;
  count: number;
  entry: ModelOverrideTarget;
  onSelect: (target: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(entry.target)}
      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between gap-2 hover:bg-bg-hover/50 ${
        active ? "bg-primary/10 text-primary" : "text-text-main"
      }`}
    >
      <span className="truncate font-mono">{entry.label}</span>
      {count > 0 && (
        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">
          {count}
        </span>
      )}
    </button>
  );
}

function ModelOverrideEditor({
  activeOverrides,
  activeTarget,
  onRemove,
  onSave,
}: {
  activeOverrides: ModelCapabilityOverride[];
  activeTarget: string;
  onRemove: (target: string, key: ModelOverrideKey) => void;
  onSave: (target: string, key: ModelOverrideKey, value: number) => void;
}) {
  const t = useTranslations("settings");
  return (
    <div className="rounded-lg border border-border/50 p-3 flex flex-col gap-3">
      <div>
        <p className="text-[10px] uppercase tracking-wide text-text-muted font-semibold mb-1">
          {t("selectedModel")}
        </p>
        <p className="text-xs font-mono break-all">{activeTarget || t("none")}</p>
      </div>
      <ModelOverrideForm activeTarget={activeTarget} onSave={onSave} />
      <ModelOverrideRows activeOverrides={activeOverrides} onRemove={onRemove} />
    </div>
  );
}

function ModelOverrideForm({
  activeTarget,
  onSave,
}: {
  activeTarget: string;
  onSave: (target: string, key: ModelOverrideKey, value: number) => void;
}) {
  const t = useTranslations("settings");
  const [key, setKey] = useState<ModelOverrideKey>("max_token");
  const [value, setValue] = useState("");
  const numericValue = Number(value);
  const saveDisabled = !activeTarget || !Number.isInteger(numericValue) || numericValue <= 0;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        value={key}
        onChange={(event) => setKey(event.target.value as ModelOverrideKey)}
        className="sm:w-40 px-2 py-2 text-xs bg-bg-base border border-border rounded-md focus:outline-none focus:border-primary"
      >
        <option value="max_token">max_token</option>
      </select>
      <input
        type="number"
        min="1"
        step="1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t("modelOverrideValuePlaceholder")}
        className="flex-1 px-3 py-2 text-xs bg-bg-base border border-border rounded-md focus:outline-none focus:border-primary"
      />
      <Button
        variant="primary"
        size="sm"
        disabled={saveDisabled}
        onClick={() => {
          onSave(activeTarget, key, numericValue);
          setValue("");
        }}
      >
        {t("addKeyValue")}
      </Button>
    </div>
  );
}

function ModelOverrideRows({
  activeOverrides,
  onRemove,
}: {
  activeOverrides: ModelCapabilityOverride[];
  onRemove: (target: string, key: ModelOverrideKey) => void;
}) {
  const t = useTranslations("settings");
  return (
    <div className="rounded-md border border-border/40 overflow-hidden">
      {activeOverrides.length === 0 ? (
        <div className="px-3 py-4 text-xs text-text-muted text-center">{t("noModelOverrides")}</div>
      ) : (
        <div className="divide-y divide-border/40">
          {activeOverrides.map((override) => (
            <ModelOverrideRow
              key={`${override.target}:${override.key}`}
              override={override}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ModelOverrideRow({
  override,
  onRemove,
}: {
  override: ModelCapabilityOverride;
  onRemove: (target: string, key: ModelOverrideKey) => void;
}) {
  const t = useTranslations("settings");
  return (
    <div className="px-3 py-2 flex items-center justify-between gap-2 text-xs">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono px-1.5 py-0.5 rounded bg-bg-subtle">{override.key}</span>
        <span className="font-semibold tabular-nums">{override.value}</span>
      </div>
      <button
        type="button"
        onClick={() => onRemove(override.target, override.key)}
        className="text-red-400 hover:bg-red-500/10 rounded px-2 py-1"
      >
        {t("remove")}
      </button>
    </div>
  );
}
