"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Card, ModelSelectField, Toggle } from "@/shared/components";
import type { ApiModel } from "@/shared/components/ModelSelectField";
import {
  MODALITY_BRIDGE_DEFAULTS,
  resolveAudioBridgeRuntimeSettings,
} from "@/shared/constants/modalityBridgeDefaults";

import ModalityBridgeAudioTestButton from "./ModalityBridgeAudioTestButton";
import ModalityBridgeStatsRow from "./ModalityBridgeStatsRow";

interface AudioState {
  modalityBridgeAudioEnabled: boolean;
  modalityBridgeAudioModel: string;
  modalityBridgeAudioTimeout: number;
  modalityBridgeAudioMaxClips: number;
}

function fromApi(data: Record<string, unknown>): AudioState {
  const runtime = resolveAudioBridgeRuntimeSettings(data);
  return {
    modalityBridgeAudioEnabled: runtime.enabled,
    modalityBridgeAudioModel: runtime.model,
    modalityBridgeAudioTimeout: runtime.timeoutMs,
    modalityBridgeAudioMaxClips: runtime.maxClips,
  };
}

function asSettingsRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function clampNumber(raw: string, min: number, max: number, fallback: number): number {
  const parsed = Number.parseInt(raw, 10);
  return Math.min(max, Math.max(min, Number.isFinite(parsed) ? parsed : fallback));
}

export default function ModalityBridgeAudioTab() {
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<AudioState | null>(null);
  const isSttModel = useCallback(
    (model: ApiModel) => model.type === "audio" && model.subtype === "transcription",
    []
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (!cancelled) setSettings(fromApi(asSettingsRecord(data)));
      })
      .catch(() => {
        if (!cancelled) setSettings(fromApi({}));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const update = async (patch: Partial<AudioState>) => {
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (response.ok) {
        setSettings((previous) => (previous ? { ...previous, ...patch } : previous));
      }
    } catch (error) {
      console.error("Failed to update Audio Bridge settings:", error);
    }
  };

  if (!settings) return null;

  const setLocal = (patch: Partial<AudioState>) => {
    setSettings((previous) => (previous ? { ...previous, ...patch } : previous));
  };
  const commitNumber = (
    key: "modalityBridgeAudioTimeout" | "modalityBridgeAudioMaxClips",
    raw: string,
    min: number,
    max: number,
    fallback: number
  ) => {
    const value = clampNumber(raw, min, max, fallback);
    setLocal({ [key]: value });
    void update({ [key]: value });
  };

  return (
    <Card
      title={t("modalityBridgeAudioTitle")}
      subtitle={t("modalityBridgeAudioDesc")}
      icon="graphic_eq"
    >
      <div className="space-y-4">
        <Toggle
          checked={settings.modalityBridgeAudioEnabled}
          onChange={(checked) => void update({ modalityBridgeAudioEnabled: checked })}
          label={t("modalityBridgeAudioEnabled")}
          description={t("modalityBridgeAudioEnabledDesc")}
        />

        <ModelSelectField
          label={t("modalityBridgeAudioModel")}
          value={settings.modalityBridgeAudioModel}
          placeholder={t("modalityBridgeAudioModelAuto")}
          allowEmpty
          modelFilter={isSttModel}
          modelSource="catalog"
          onChange={(value) => void update({ modalityBridgeAudioModel: value })}
          className="text-sm"
        />

        <details className="rounded-control border border-border p-3">
          <summary className="cursor-pointer text-sm font-medium">
            {t("modalityBridgeAdvanced")}
          </summary>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberField
              testId="modality-bridge-audio-timeout"
              label={t("modalityBridgeTimeoutMs")}
              min={1000}
              max={300000}
              value={settings.modalityBridgeAudioTimeout}
              onChange={(value) => setLocal({ modalityBridgeAudioTimeout: value })}
              onBlur={(raw) =>
                commitNumber(
                  "modalityBridgeAudioTimeout",
                  raw,
                  1000,
                  300000,
                  MODALITY_BRIDGE_DEFAULTS.audioTimeoutMs
                )
              }
            />
            <NumberField
              testId="modality-bridge-audio-max-clips"
              label={t("modalityBridgeAudioMaxClips")}
              min={1}
              max={10}
              value={settings.modalityBridgeAudioMaxClips}
              onChange={(value) => setLocal({ modalityBridgeAudioMaxClips: value })}
              onBlur={(raw) =>
                commitNumber(
                  "modalityBridgeAudioMaxClips",
                  raw,
                  1,
                  10,
                  MODALITY_BRIDGE_DEFAULTS.audioMaxClips
                )
              }
            />
          </div>
        </details>

        <ModalityBridgeStatsRow kind="audio" />
        <ModalityBridgeAudioTestButton />
      </div>
    </Card>
  );
}

interface NumberFieldProps {
  testId: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  onBlur: (raw: string) => void;
}

function NumberField({ testId, label, min, max, value, onChange, onBlur }: NumberFieldProps) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        type="number"
        data-testid={testId}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number.parseInt(event.currentTarget.value, 10) || 0)}
        onBlur={(event) => onBlur(event.currentTarget.value)}
        className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-sm"
      />
    </label>
  );
}
