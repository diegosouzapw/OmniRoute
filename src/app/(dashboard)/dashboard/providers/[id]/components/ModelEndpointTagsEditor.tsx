"use client";

import { useState } from "react";
import { normalizeModelSupportedEndpoints, type ModelSupportedEndpoint } from "@/shared/constants/modelSupportedEndpoints";

const OPTIONS: ModelSupportedEndpoint[] = [
  "chat", "responses", "embeddings", "rerank",
  "images", "videos", "audio-speech", "audio-transcriptions", "music",
];

export interface ModelEndpointEditorInfo {
  supportedEndpoints?: readonly string[];
  endpointCapabilitySource?: string;
  discoveredEndpoints?: readonly string[];
  adapterStatuses?: Record<string, "available" | "unavailable" | "unknown">;
  resettable?: boolean;
  onChanged?: () => void | Promise<void>;
}
interface Props extends ModelEndpointEditorInfo {
  provider: string;
  modelId: string;
  t: (key: string, values?: Record<string, unknown>) => string;
}
export default function ModelEndpointTagsEditor({
  provider, modelId, supportedEndpoints, endpointCapabilitySource, adapterStatuses = {}, resettable = false, onChanged, t,
}: Props) {
  const effective = supportedEndpoints?.length ? normalizeModelSupportedEndpoints(supportedEndpoints) : ["chat"];
  const [editing, setEditing] = useState(false);
  const [selection, setSelection] = useState<string[]>(effective);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const provenance =
    endpointCapabilitySource === "operator" ? t("endpointCapabilitiesOperator") :
    endpointCapabilitySource === "inferred" ? t("endpointCapabilitiesInferred") :
    endpointCapabilitySource === "declared" ? t("endpointCapabilitiesDeclared") :
    t("endpointCapabilitiesDefaulted");

  const beginEdit = () => {
    setSelection(effective);
    setError(null);
    setEditing(true);
  };
  async function submit(reset: boolean) {
    if (!reset && selection.length === 0) {
      setError(t("selectSupportedEndpoint"));
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await (reset
        ? fetch("/api/provider-models?" + new URLSearchParams({
            provider, model: modelId, resetEndpoints: "true",
          }), { method: "DELETE" })
        : fetch("/api/provider-models", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider, modelId, supportedEndpoints: selection }),
          }));
      if (!response.ok) throw new Error(t(reset
        ? "endpointCapabilitiesResetFailed" : "endpointCapabilitiesSaveFailed"));
      await onChanged?.();
      setEditing(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t("endpointCapabilitiesSaveFailed"));
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="inline-flex max-w-full flex-wrap items-center gap-1 text-[10px]"
      data-testid="model-endpoint-capabilities">
      {effective.map((endpoint) => (
        <span key={endpoint} title={adapterStatuses[endpoint] === "unavailable"
          ? t("endpointCapabilitiesNoAdapter") : undefined}
          className={adapterStatuses[endpoint] === "unavailable"
            ? "rounded bg-red-500/15 px-1 py-0.5 text-red-500"
            : "rounded bg-primary/10 px-1 py-0.5 text-primary"}>
          {endpoint}{adapterStatuses[endpoint] === "unavailable" ? " ⚠" : ""}
        </span>
      ))}
      <span className="text-text-muted" title={t("supportedEndpointsLabel")}>{provenance}</span>
      <button type="button" onClick={beginEdit} disabled={saving}
        title={t("endpointCapabilitiesEdit")} aria-label={t("endpointCapabilitiesEdit")}
        className="rounded p-0.5 text-text-muted hover:text-primary disabled:opacity-50">
        <span className="material-symbols-outlined text-sm">edit</span>
      </button>
      {editing && (
        <div className="flex w-full flex-wrap items-center gap-1 rounded border border-border p-1">
          <fieldset disabled={saving} className="flex flex-wrap gap-2">
            <legend className="text-text-muted">{t("supportedEndpointsLabel")}</legend>
            {OPTIONS.map((endpoint) => (
              <label key={endpoint} className="inline-flex items-center gap-1">
                <input type="checkbox" checked={selection.includes(endpoint)}
                  onChange={(event) => setSelection((prev) =>
                    event.target.checked ? [...prev, endpoint] : prev.filter((item) => item !== endpoint))}
                />{endpoint}
              </label>
            ))}
          </fieldset>
          <button type="button" disabled={saving} onClick={() => void submit(false)}
            className="rounded border border-border p-1 text-primary">{t("endpointCapabilitiesSave")}</button>
          {resettable && (
            <button type="button" disabled={saving} onClick={() => void submit(true)}
              className="rounded border border-border p-1 text-text-muted">
              {t("endpointCapabilitiesReset")}
            </button>
          )}
          <button type="button" disabled={saving} onClick={() => setEditing(false)}
            className="rounded border border-border p-1">{t("cancel")}</button>
          {error && <span role="alert" className="text-red-500">{error}</span>}
        </div>
      )}
    </div>
  );
}
