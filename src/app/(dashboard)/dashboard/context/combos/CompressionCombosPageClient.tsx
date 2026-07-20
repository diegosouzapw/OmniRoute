"use client";

// Combos screen = Compression Hub (top) + named-combos manager (below).
//
// IMPORTANT (hydration): no `useTranslations` here. The earlier combos redesign
// failed to hydrate on the production build and the only structural difference from
// the engine pages was a page-level `useTranslations`. Strings are literal English,
// matching `EngineConfigPage` / `CompressionHub`, both of which hydrate cleanly.

import { useEffect, useState } from "react";
import { STACKED_PIPELINE_ENGINE_INTENSITIES } from "@/shared/validation/compressionConfigSchemas";
import { CompressionPipelineEditor } from "@/shared/components/compression/CompressionPipelineEditor";
import { ComboCompressionModeSelect } from "@/shared/components/compression/ComboCompressionModeSelect";
import CompressionHub from "./CompressionHub";

type PipelineStep = { engine: string; intensity?: string };
type CompressionCombo = {
  id: string;
  name: string;
  description: string;
  pipeline: PipelineStep[];
  languagePacks: string[];
  outputMode: boolean;
  outputModeIntensity: string;
  isDefault: boolean;
};
type RoutingCombo = {
  id?: string;
  name?: string;
  config?: { compressionMode?: string } | null;
};
type LanguagePack = { language: string; ruleCount: number };

const EMPTY_PIPELINE: PipelineStep[] = [
  { engine: "rtk", intensity: "standard" },
  { engine: "caveman", intensity: "full" },
];

// Engine list is sourced from the API schema so the dropdown can never offer an engine
// the `PUT /api/context/combos/[id]` route would reject with HTTP 400 (#4955).
const ENGINE_INTENSITIES: Record<string, readonly string[]> = STACKED_PIPELINE_ENGINE_INTENSITIES;

function NamedCombosManager() {
  const [combos, setCombos] = useState<CompressionCombo[]>([]);
  const [routingCombos, setRoutingCombos] = useState<RoutingCombo[]>([]);
  const [languagePacks, setLanguagePacks] = useState<LanguagePack[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pipeline, setPipeline] = useState<PipelineStep[]>(EMPTY_PIPELINE);
  const [selectedPacks, setSelectedPacks] = useState<string[]>(["en"]);
  const [outputMode, setOutputMode] = useState(false);
  const [outputModeIntensity, setOutputModeIntensity] = useState("full");
  const [assignmentIds, setAssignmentIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [activeComboId, setActiveComboId] = useState<string | null>(null);
  const [compressionEnabled, setCompressionEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    fetch("/api/context/combos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCombos(Array.isArray(data?.combos) ? data.combos : []))
      .catch(() => {});
  };

  useEffect(() => {
    refresh();
    fetch("/api/combos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setRoutingCombos(Array.isArray(data?.combos) ? data.combos : []))
      .catch(() => {});
    fetch("/api/compression/language-packs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setLanguagePacks(Array.isArray(data?.packs) ? data.packs : []))
      .catch(() => {});
    fetch("/api/settings/compression")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setActiveComboId(data?.activeComboId ?? null);
        setCompressionEnabled(Boolean(data?.enabled));
      })
      .catch(() => {});
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPipeline(EMPTY_PIPELINE);
    setSelectedPacks(["en"]);
    setOutputMode(false);
    setOutputModeIntensity("full");
    setAssignmentIds([]);
    setError(null);
  };

  const loadAssignments = async (id: string) => {
    const res = await fetch(`/api/context/combos/${id}/assignments`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.assignments)
      ? data.assignments.map((item: { routingComboId: string }) => item.routingComboId)
      : [];
  };

  const editCombo = async (combo: CompressionCombo) => {
    setEditingId(combo.id);
    setName(combo.name);
    setDescription(combo.description ?? "");
    setPipeline(combo.pipeline.length > 0 ? combo.pipeline : EMPTY_PIPELINE);
    setSelectedPacks(combo.languagePacks?.length ? combo.languagePacks : ["en"]);
    setOutputMode(Boolean(combo.outputMode));
    setOutputModeIntensity(combo.outputModeIntensity ?? "full");
    setAssignmentIds(await loadAssignments(combo.id));
  };

  const saveCombo = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a combo name before saving.");
      return;
    }
    if (pipeline.length === 0) {
      setError("Add at least one pipeline step before saving.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        name: trimmed,
        description,
        pipeline,
        languagePacks: selectedPacks,
        outputMode,
        outputModeIntensity,
      };
      const res = await fetch(
        editingId ? `/api/context/combos/${editingId}` : "/api/context/combos",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || `Failed to save combo (HTTP ${res.status}).`);
        return;
      }
      const combo = await res.json();
      await fetch(`/api/context/combos/${combo.id}/assignments`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routingComboIds: assignmentIds }),
      });
      resetForm();
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const deleteCombo = async (combo: CompressionCombo) => {
    if (!confirm(`Delete combo "${combo.name}"?`)) return;
    const res = await fetch(`/api/context/combos/${combo.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  };

  const togglePack = (language: string, enabled: boolean) => {
    setSelectedPacks((current) =>
      enabled
        ? [...new Set([...current, language])]
        : current.filter((item) => item !== language && item !== "en")
    );
  };

  const toggleAssignment = (id: string, enabled: boolean) => {
    setAssignmentIds((current) =>
      enabled ? [...new Set([...current, id])] : current.filter((item) => item !== id)
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-text-main">Named combos</h2>
        <p className="text-sm text-text-muted">
          Save different pipelines and assign them to specific routing combos.
        </p>
      </div>

      <section className="rounded-lg border border-border bg-surface p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Combo name"
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
          />
        </div>

        <div className="mt-4">
          <CompressionPipelineEditor
            steps={pipeline}
            onChange={setPipeline}
            engineIntensities={ENGINE_INTENSITIES}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-text-main">Language packs</h3>
            <div className="space-y-2 text-sm text-text-main">
              {languagePacks.map((pack) => (
                <label key={pack.language} className="flex items-center justify-between gap-2">
                  <span>
                    {pack.language} ({pack.ruleCount})
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedPacks.includes(pack.language)}
                    disabled={pack.language === "en"}
                    onChange={(event) => togglePack(pack.language, event.target.checked)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-sm text-text-main">
            <h3 className="text-sm font-semibold text-text-main">Output mode</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={outputMode}
                onChange={(event) => setOutputMode(event.target.checked)}
              />
              Enabled
            </label>
            <select
              value={outputModeIntensity}
              onChange={(event) => setOutputModeIntensity(event.target.value)}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm"
            >
              <option value="lite">lite</option>
              <option value="full">full</option>
              <option value="ultra">ultra</option>
            </select>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-text-main">Assign to routing</h3>
            <div className="max-h-44 space-y-2 overflow-auto text-sm text-text-main">
              {routingCombos.length === 0 ? (
                <p className="text-xs text-text-muted">No routing combos available.</p>
              ) : (
                routingCombos.map((combo) => {
                  const id = combo.id ?? combo.name ?? "";
                  if (!id) return null;
                  return (
                    <div key={id} className="flex items-center justify-between gap-2">
                      <label className="flex min-w-0 flex-1 items-center justify-between gap-2">
                        <span className="truncate">{combo.name ?? id}</span>
                        <input
                          type="checkbox"
                          checked={assignmentIds.includes(id)}
                          onChange={(event) => toggleAssignment(id, event.target.checked)}
                        />
                      </label>
                      <ComboCompressionModeSelect
                        combo={{ id, config: combo.config }}
                        disabled={!compressionEnabled}
                        title="Compression override"
                        className="w-24 shrink-0 rounded-lg border border-border bg-bg px-2 py-1 text-xs text-text-main disabled:opacity-50"
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={saveCombo}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            {editingId ? "Save" : "Create combo"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text-main"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {combos.map((combo) => (
          <div key={combo.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-text-main">{combo.name}</h3>
                <p className="mt-1 text-sm text-text-muted">{combo.description}</p>
              </div>
              {combo.id === activeComboId && (
                <span
                  data-testid={`active-badge-${combo.id}`}
                  className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500"
                >
                  ● Active
                </span>
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
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => editCombo(combo)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-main"
              >
                Edit
              </button>
              {!combo.isDefault && (
                <button
                  onClick={() => deleteCombo(combo)}
                  className="rounded-lg border border-danger/40 px-3 py-1.5 text-xs text-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function CompressionCombosPageClient() {
  return (
    <div className="flex flex-col gap-8">
      <CompressionHub />
      <NamedCombosManager />
    </div>
  );
}
