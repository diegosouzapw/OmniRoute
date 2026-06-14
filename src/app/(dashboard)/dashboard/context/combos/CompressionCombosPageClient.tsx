"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  togglePipelineStep,
  movePipelineStep,
  setStepIntensity,
  setStepConfig,
  availableEngines,
} from "@/shared/components/compression/compressionPipelineModel";
import { EngineConfigForm } from "@/shared/components/compression/EngineConfigForm";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";

type PipelineStep = { engine: string; intensity?: string; config?: Record<string, unknown> };
type EngineEntry = {
  id: string;
  name: string;
  icon: string;
  stackPriority: number;
  configSchema: EngineConfigField[];
};
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
type RoutingCombo = { id?: string; name?: string };
type LanguagePack = { language: string; ruleCount: number };

const EMPTY_PIPELINE: PipelineStep[] = [
  { engine: "rtk", intensity: "standard" },
  { engine: "caveman", intensity: "full" },
];

const ENGINE_INTENSITIES: Record<string, string[]> = {
  rtk: ["minimal", "standard", "aggressive"],
  caveman: ["lite", "full", "ultra"],
  lite: ["lite"],
  aggressive: ["standard"],
  ultra: ["ultra"],
};

export default function CompressionCombosPageClient() {
  const t = useTranslations("contextCombos");
  const [combos, setCombos] = useState<CompressionCombo[]>([]);
  const [routingCombos, setRoutingCombos] = useState<RoutingCombo[]>([]);
  const [languagePacks, setLanguagePacks] = useState<LanguagePack[]>([]);
  const [engineCatalog, setEngineCatalog] = useState<EngineEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pipeline, setPipeline] = useState<PipelineStep[]>(EMPTY_PIPELINE);
  const [selectedPacks, setSelectedPacks] = useState<string[]>(["en"]);
  const [outputMode, setOutputMode] = useState(false);
  const [outputModeIntensity, setOutputModeIntensity] = useState("full");
  const [assignmentIds, setAssignmentIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);

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
    fetch("/api/compression/engines")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setEngineCatalog(Array.isArray(data?.engines) ? data.engines : []))
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
    if (!trimmed) return;
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
      if (!res.ok) return;
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
    if (!confirm(t("deleteConfirm"))) return;
    const res = await fetch(`/api/context/combos/${combo.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  };

  const setDefault = async (id: string) => {
    const res = await fetch(`/api/context/combos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
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
    <div className="flex flex-col gap-6">
      <section className="rounded-lg border border-border bg-surface p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("name")}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t("descriptionField")}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
          />
        </div>

        <div className="mt-4 space-y-3">
          <h2 className="text-sm font-semibold text-text-main">{t("pipeline")}</h2>

          {/* Active layers */}
          <div className="space-y-2">
            {pipeline.map((step, index) => {
              const entry = engineCatalog.find((e) => e.id === step.engine);
              const displayName = entry?.name ?? step.engine;
              const intensities = ENGINE_INTENSITIES[step.engine];
              const hasConfig = (entry?.configSchema?.length ?? 0) > 0;
              const isExpanded = expandedEngine === step.engine;
              return (
                <div key={step.engine} className="rounded-lg border border-border bg-bg p-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setPipeline((p) =>
                          movePipelineStep(
                            p as Parameters<typeof movePipelineStep>[0],
                            step.engine,
                            "up"
                          )
                        )
                      }
                      disabled={index === 0}
                      className="rounded border border-border px-2 py-1 text-xs text-text-main disabled:opacity-40"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() =>
                        setPipeline((p) =>
                          movePipelineStep(
                            p as Parameters<typeof movePipelineStep>[0],
                            step.engine,
                            "down"
                          )
                        )
                      }
                      disabled={index === pipeline.length - 1}
                      className="rounded border border-border px-2 py-1 text-xs text-text-main disabled:opacity-40"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                    <span className="flex-1 text-sm font-medium text-text-main">{displayName}</span>
                    {intensities && (
                      <select
                        value={step.intensity ?? intensities[0]}
                        onChange={(event) =>
                          setPipeline((p) =>
                            setStepIntensity(
                              p as Parameters<typeof setStepIntensity>[0],
                              step.engine,
                              event.target.value
                            )
                          )
                        }
                        className="rounded border border-border bg-bg px-2 py-1 text-xs text-text-main"
                      >
                        {intensities.map((intensity) => (
                          <option key={intensity} value={intensity}>
                            {intensity}
                          </option>
                        ))}
                      </select>
                    )}
                    {hasConfig && (
                      <button
                        onClick={() =>
                          setExpandedEngine((prev) => (prev === step.engine ? null : step.engine))
                        }
                        className="rounded border border-border px-2 py-1 text-xs text-text-main"
                        aria-label="Toggle config"
                      >
                        ⚙
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setPipeline((p) =>
                          togglePipelineStep(
                            p as Parameters<typeof togglePipelineStep>[0],
                            step.engine,
                            engineCatalog
                          )
                        )
                      }
                      className="rounded border border-border px-2 py-1 text-xs text-text-main"
                    >
                      {t("removeStep")}
                    </button>
                  </div>
                  {isExpanded && entry && entry.configSchema.length > 0 && (
                    <div className="mt-2 border-t border-border pt-2">
                      <EngineConfigForm
                        schema={entry.configSchema}
                        value={step.config ?? {}}
                        onChange={(cfg) =>
                          setPipeline((p) =>
                            setStepConfig(
                              p as Parameters<typeof setStepConfig>[0],
                              step.engine,
                              cfg
                            )
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Available engines to add */}
          {availableEngines(engineCatalog, pipeline as Parameters<typeof availableEngines>[1])
            .length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {availableEngines(
                engineCatalog,
                pipeline as Parameters<typeof availableEngines>[1]
              ).map((e) => (
                <button
                  key={e.id}
                  onClick={() =>
                    setPipeline((p) =>
                      togglePipelineStep(
                        p as Parameters<typeof togglePipelineStep>[0],
                        e.id,
                        engineCatalog
                      )
                    )
                  }
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-main"
                >
                  + {(e as EngineEntry).name ?? e.id}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-text-main">{t("languagePacks")}</h2>
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
            <h2 className="text-sm font-semibold text-text-main">{t("outputMode")}</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={outputMode}
                onChange={(event) => setOutputMode(event.target.checked)}
              />
              {t("enabled")}
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
            <h2 className="mb-2 text-sm font-semibold text-text-main">{t("assignToRouting")}</h2>
            <div className="max-h-44 space-y-2 overflow-auto text-sm text-text-main">
              {routingCombos.length === 0 ? (
                <p className="text-xs text-text-muted">{t("noAssignments")}</p>
              ) : (
                routingCombos.map((combo) => {
                  const id = combo.id ?? combo.name ?? "";
                  if (!id) return null;
                  return (
                    <label key={id} className="flex items-center justify-between gap-2">
                      <span className="truncate">{combo.name ?? id}</span>
                      <input
                        type="checkbox"
                        checked={assignmentIds.includes(id)}
                        onChange={(event) => toggleAssignment(id, event.target.checked)}
                      />
                    </label>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={saveCombo}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            {editingId ? t("save") : t("createCombo")}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text-main"
            >
              {t("cancel")}
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {combos.map((combo) => (
          <div key={combo.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-text-main">{combo.name}</h2>
                <p className="mt-1 text-sm text-text-muted">{combo.description}</p>
              </div>
              {combo.isDefault && (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {t("default")}
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
              {t("languagePacks")}: {combo.languagePacks.join(", ")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => editCombo(combo)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-main"
              >
                {t("editCombo")}
              </button>
              {!combo.isDefault && (
                <button
                  onClick={() => setDefault(combo.id)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-main"
                >
                  {t("setAsDefault")}
                </button>
              )}
              {!combo.isDefault && (
                <button
                  onClick={() => deleteCombo(combo)}
                  className="rounded-lg border border-danger/40 px-3 py-1.5 text-xs text-danger"
                >
                  {t("deleteCombo")}
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
