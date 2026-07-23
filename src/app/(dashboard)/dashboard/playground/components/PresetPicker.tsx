"use client";

// src/app/(dashboard)/dashboard/playground/components/PresetPicker.tsx

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePresets } from "../hooks/usePresets";
import type { ConfigState } from "./StudioConfigPane";

interface PresetPickerProps {
  configState: ConfigState;
  setConfigState: (s: ConfigState) => void;
}

/**
 * PresetPicker — load/save playground presets.
 *
 * Presets are stored in DB via /api/playground/presets (F3 backend).
 * Load applies preset values to configState; Save opens a name-input modal.
 */
export default function PresetPicker({ configState, setConfigState }: PresetPickerProps) {
  const t = useTranslations("playground");
  const { presets, loading, list, create, remove } = usePresets();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    void list();
  }, [list]);

  function handleLoad(presetId: string) {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;

    setConfigState({
      ...configState,
      endpoint: preset.endpoint as ConfigState["endpoint"],
      model: preset.model,
      systemPrompt: preset.system ?? configState.systemPrompt,
      params: {
        ...configState.params,
        ...(typeof preset.params === "object" && preset.params != null ? preset.params : {}),
      },
    });
  }

  async function handleSave() {
    if (!presetName.trim()) {
      setSaveError(t("nameRequired"));
      return;
    }

    setSaving(true);
    setSaveError(null);

    const result = await create({
      name: presetName.trim(),
      endpoint: configState.endpoint,
      model: configState.model,
      system: configState.systemPrompt || null,
      params: configState.params as Record<string, unknown>,
    });

    setSaving(false);

    if (result == null) {
      setSaveError(t("failedToSavePreset"));
      return;
    }

    setSaveModalOpen(false);
    setPresetName("");
  }

  function openSave() {
    setSaveModalOpen(true);
    setPresetName("");
    setSaveError(null);
  }

  function closeSave() {
    setSaveModalOpen(false);
    setPresetName("");
    setSaveError(null);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {t("presetsLabel")}
        </span>

        {/* Load preset select */}
        <div className="flex items-center gap-2">
          <select
            disabled={loading || presets.length === 0}
            onChange={(e) => {
              if (e.target.value) {
                handleLoad(e.target.value);
                // Reset select to placeholder after loading
                e.target.value = "";
              }
            }}
            defaultValue=""
            className="flex-1 text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t("loadPreset")}
          >
            <option value="" disabled>
              {loading ? t("loadingPresets") : presets.length === 0 ? t("noPresets") : t("loadPresetPlaceholder")}
            </option>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>

          <button
            onClick={openSave}
            className="text-xs px-2.5 py-1.5 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
            aria-label={t("savePreset")}
          >
            {t("save")}
          </button>
        </div>

        {/* Preset list with delete buttons (compact) */}
        {presets.length > 0 && (
          <div className="flex flex-col gap-1">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center justify-between text-[11px] text-text-muted hover:text-text-main group"
              >
                <button
                  onClick={() => handleLoad(preset.id)}
                  className="truncate text-left flex-1 hover:text-primary transition-colors"
                  aria-label={`Load preset "${preset.name}"`}
                >
                  {preset.name}
                  <span className="ml-1.5 opacity-60">{preset.model}</span>
                </button>
                <button
                  onClick={() => void remove(preset.id)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-text-muted hover:text-destructive transition-all"
                  aria-label={`Delete preset "${preset.name}"`}
                >
                  <span className="material-symbols-outlined text-[12px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save preset modal */}
      {saveModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeSave}
          role="dialog"
          aria-modal="true"
          aria-label={t("savePreset")}
        >
          <div
            className="bg-surface border border-border rounded-xl p-5 w-80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-text-main mb-4">{t("savePreset")}</h3>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleSave();
                  if (e.key === "Escape") closeSave();
                }}
                placeholder={t("presetNamePlaceholder")}
                autoFocus
                className="text-xs bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
              />

              {saveError && (
                <p className="text-xs text-destructive">{saveError}</p>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={closeSave}
                  className="text-xs px-3 py-1.5 rounded border border-border text-text-muted hover:text-text-main transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => void handleSave()}
                  disabled={saving}
                  className="text-xs px-3 py-1.5 rounded bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? t("savingPreset") : t("save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
