"use client";

import { useEffect, useMemo, useState } from "react";

type RtkFilter = {
  id: string;
  name: string;
  description: string;
  commandTypes: string[];
  category: string;
  priority: number;
};

type RtkConfig = {
  enabled: boolean;
  intensity: "minimal" | "standard" | "aggressive";
  applyToToolResults: boolean;
  applyToAssistantMessages: boolean;
  maxLinesPerResult: number;
  maxCharsPerResult: number;
  deduplicateThreshold: number;
};

const SAMPLE_OUTPUT = `$ npm run typecheck
src/lib/example.ts:10:15 - error TS2322: Type 'string' is not assignable to type 'number'.

10 const value: number = "bad";
                 ~~~~~

Found 1 error in src/lib/example.ts:10`;

export default function RtkContextPageClient() {
  const [filters, setFilters] = useState<RtkFilter[]>([]);
  const [config, setConfig] = useState<RtkConfig | null>(null);
  const [sample, setSample] = useState(SAMPLE_OUTPUT);
  const [preview, setPreview] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/context/rtk/filters")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setFilters(Array.isArray(data?.filters) ? data.filters : []))
      .catch(() => {});
    fetch("/api/context/rtk/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  const groupedFilters = useMemo(() => {
    return filters.reduce<Record<string, RtkFilter[]>>((groups, filter) => {
      groups[filter.category] = [...(groups[filter.category] ?? []), filter];
      return groups;
    }, {});
  }, [filters]);

  const saveConfig = async (patch: Partial<RtkConfig>) => {
    if (!config) return;
    const nextConfig = { ...config, ...patch };
    setConfig(nextConfig);
    setSaving(true);
    try {
      const res = await fetch("/api/context/rtk/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) setConfig(await res.json());
    } finally {
      setSaving(false);
    }
  };

  const runPreview = async () => {
    const res = await fetch("/api/context/rtk/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sample, config: config ?? undefined }),
    });
    setPreview(res.ok ? await res.json() : { error: await res.text() });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[30px] text-primary">filter_alt</span>
          <div>
            <h1 className="text-2xl font-bold text-text-main">RTK Engine</h1>
            <p className="text-sm text-text-muted">
              Command-aware compression for tool output, terminal logs and build results.
            </p>
          </div>
        </div>
      </header>

      {config && (
        <section className="rounded-lg border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-text-main">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(event) => saveConfig({ enabled: event.target.checked })}
              />
              Enabled
            </label>
            <label className="flex items-center gap-2 text-sm text-text-main">
              Intensity
              <select
                value={config.intensity}
                disabled={saving}
                onChange={(event) =>
                  saveConfig({ intensity: event.target.value as RtkConfig["intensity"] })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              >
                <option value="minimal">minimal</option>
                <option value="standard">standard</option>
                <option value="aggressive">aggressive</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-text-main">
              Max lines
              <input
                type="number"
                min={0}
                value={config.maxLinesPerResult}
                onChange={(event) =>
                  saveConfig({ maxLinesPerResult: Number(event.target.value) || 0 })
                }
                className="w-24 rounded border border-border bg-bg px-2 py-1 text-sm"
              />
            </label>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Playground</h2>
            <button
              onClick={runPreview}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white"
            >
              Run
            </button>
          </div>
          <textarea
            value={sample}
            onChange={(event) => setSample(event.target.value)}
            className="h-72 w-full rounded-lg border border-border bg-bg p-3 font-mono text-xs text-text-main"
          />
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-3 text-sm font-semibold text-text-main">Result</h2>
          <pre className="h-72 overflow-auto rounded-lg border border-border bg-bg p-3 text-xs text-text-main">
            {preview ? JSON.stringify(preview, null, 2) : "Run a sample to preview RTK output."}
          </pre>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(groupedFilters).map(([category, items]) => (
          <div key={category} className="rounded-lg border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold capitalize text-text-main">{category}</h2>
            <div className="mt-3 space-y-3">
              {items.map((filter) => (
                <div
                  key={filter.id}
                  className="border-t border-border pt-3 first:border-t-0 first:pt-0"
                >
                  <p className="text-sm font-medium text-text-main">{filter.name}</p>
                  <p className="mt-1 text-xs text-text-muted">{filter.description}</p>
                  <p className="mt-2 font-mono text-[11px] text-text-muted">
                    {filter.commandTypes.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
