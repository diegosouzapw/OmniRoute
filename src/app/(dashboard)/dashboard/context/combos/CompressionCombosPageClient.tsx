"use client";

import { useEffect, useState } from "react";

type CompressionCombo = {
  id: string;
  name: string;
  description: string;
  pipeline: Array<{ engine: string; intensity?: string }>;
  languagePacks: string[];
  isDefault: boolean;
};

export default function CompressionCombosPageClient() {
  const [combos, setCombos] = useState<CompressionCombo[]>([]);
  const [name, setName] = useState("");
  const [engine, setEngine] = useState("rtk");

  const refresh = () => {
    fetch("/api/context/combos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCombos(Array.isArray(data?.combos) ? data.combos : []))
      .catch(() => {});
  };

  useEffect(refresh, []);

  const createCombo = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const pipeline =
      engine === "stacked"
        ? [
            { engine: "rtk", intensity: "standard" },
            { engine: "caveman", intensity: "full" },
          ]
        : [{ engine, intensity: engine === "rtk" ? "standard" : "full" }];
    const res = await fetch("/api/context/combos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmed,
        description: "Created from Context & Cache",
        pipeline,
      }),
    });
    if (res.ok) {
      setName("");
      refresh();
    }
  };

  const setDefault = async (id: string) => {
    const res = await fetch(`/api/context/combos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    if (res.ok) refresh();
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[30px] text-primary">hub</span>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Compression Combos</h1>
            <p className="text-sm text-text-muted">
              Compose compression engines and assign pipelines to routing combos.
            </p>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Combo name"
          className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
        />
        <select
          value={engine}
          onChange={(event) => setEngine(event.target.value)}
          className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
        >
          <option value="rtk">RTK</option>
          <option value="caveman">Caveman</option>
          <option value="stacked">RTK + Caveman</option>
        </select>
        <button
          onClick={createCombo}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Create
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {combos.map((combo) => (
          <div key={combo.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-text-main">{combo.name}</h2>
                <p className="mt-1 text-sm text-text-muted">{combo.description}</p>
              </div>
              {combo.isDefault ? (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Default
                </span>
              ) : (
                <button
                  onClick={() => setDefault(combo.id)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-main hover:bg-sidebar/50"
                >
                  Set default
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {combo.pipeline.map((step, index) => (
                <span
                  key={`${combo.id}-${index}`}
                  className="rounded-lg border border-border bg-bg px-2 py-1 font-mono text-xs text-text-muted"
                >
                  {index + 1}. {step.engine}
                  {step.intensity ? `:${step.intensity}` : ""}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-text-muted">
              Language packs: {combo.languagePacks.join(", ")}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
