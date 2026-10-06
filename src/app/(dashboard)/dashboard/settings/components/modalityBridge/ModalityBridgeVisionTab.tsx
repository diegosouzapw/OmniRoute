"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Card, ModelSelectField, Toggle } from "@/shared/components";
import {
  MODALITY_BRIDGE_DEFAULTS,
  resolveVisionBridgeRuntimeSettings,
  type VisionBridgeMode,
} from "@/shared/constants/modalityBridgeDefaults";
import { VISION_BRIDGE_DEFAULTS } from "@/shared/constants/visionBridgeDefaults";

import ModalityBridgeStatsRow from "./ModalityBridgeStatsRow";
import ModalityBridgeTestButton from "./ModalityBridgeTestButton";

interface VisionState {
  modalityBridgeVisionEnabled: boolean;
  modalityBridgeVisionMode: VisionBridgeMode;
  modalityBridgeVisionModel: string;
  modalityBridgeVisionTaskAware: boolean;
  visionBridgeRerouteTextOnly: boolean;
  modalityBridgeVisionPrompt: string;
  modalityBridgeVisionTimeout: number;
  modalityBridgeVisionMaxImages: number;
  modalityBridgeVisionMaxChars: number;
  modalityBridgeCacheEnabled: boolean;
  modalityBridgeCacheTtlMinutes: number;
  modalityBridgeCacheMaxEntries: number;
}

function fromApi(data: Record<string, unknown>): VisionState {
  const runtime = resolveVisionBridgeRuntimeSettings(data);
  return {
    modalityBridgeVisionEnabled: runtime.enabled,
    modalityBridgeVisionMode: runtime.mode,
    modalityBridgeVisionModel: runtime.model,
    modalityBridgeVisionTaskAware: runtime.taskAware,
    visionBridgeRerouteTextOnly: data.visionBridgeRerouteTextOnly === true,
    modalityBridgeVisionPrompt: runtime.prompt,
    modalityBridgeVisionTimeout: runtime.timeoutMs,
    modalityBridgeVisionMaxImages: runtime.maxImages,
    modalityBridgeVisionMaxChars: runtime.maxChars,
    modalityBridgeCacheEnabled: runtime.cacheEnabled,
    modalityBridgeCacheTtlMinutes: runtime.cacheTtlMinutes,
    modalityBridgeCacheMaxEntries: runtime.cacheMaxEntries,
  };
}

function clampNumber(raw: string, min: number, max: number, fallback: number): number {
  const parsed = Number.parseInt(raw, 10);
  return Math.min(max, Math.max(min, Number.isFinite(parsed) ? parsed : fallback));
}

export default function ModalityBridgeVisionTab() {
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<VisionState | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (cancelled) return;
        setSettings(fromApi(asSettingsRecord(data)));
      })
      .catch(() => {
        if (!cancelled) setSettings(fromApi({}));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const update = async (patch: Partial<VisionState>) => {
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
      console.error("Failed to update Modality Bridge settings:", error);
    }
  };

  if (!settings) return null;

  const setLocal = (patch: Partial<VisionState>) => {
    setSettings((previous) => (previous ? { ...previous, ...patch } : previous));
  };

  const commitNumber = (
    key:
      | "modalityBridgeVisionTimeout"
      | "modalityBridgeVisionMaxImages"
      | "modalityBridgeCacheTtlMinutes"
      | "modalityBridgeCacheMaxEntries",
    raw: string,
    min: number,
    max: number,
    fallback: number
  ) => {
    const value = clampNumber(raw, min, max, fallback);
    setLocal({ [key]: value });
    void update({ [key]: value });
  };

  const commitMaxChars = (raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    // 0 disables the cap and is a valid value in its own right — only values
    // between 1 and 99 (below the schema's floor) get pulled up to 100.
    const value =
      Number.isFinite(parsed) && parsed <= 0
        ? 0
        : clampNumber(raw, 100, 50000, MODALITY_BRIDGE_DEFAULTS.visionMaxChars);
    setLocal({ modalityBridgeVisionMaxChars: value });
    void update({ modalityBridgeVisionMaxChars: value });
  };

  return (
    <Card
      title={t("modalityBridgeVisionTitle")}
      subtitle={t("modalityBridgeVisionDesc")}
      icon="image_search"
    >
      <div className="space-y-4">
        <Toggle
          checked={settings.modalityBridgeVisionEnabled}
          onChange={(checked) => void update({ modalityBridgeVisionEnabled: checked })}
          label={t("visionBridgeEnabledLabel")}
          description={t("visionBridgeEnabledDesc")}
        />

        <Toggle
          checked={settings.visionBridgeRerouteTextOnly}
          onChange={(checked) => void update({ visionBridgeRerouteTextOnly: checked })}
          label={t("visionBridgeRerouteTextOnlyLabel")}
          description={t("visionBridgeRerouteTextOnlyDesc")}
        />

        <div>
          <label className="text-sm font-medium" htmlFor="modality-bridge-mode">
            {t("modalityBridgeMode")}
          </label>
          <select
            id="modality-bridge-mode"
            data-testid="modality-bridge-mode"
            className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-sm"
            value={settings.modalityBridgeVisionMode}
            onChange={(event) =>
              void update({ modalityBridgeVisionMode: event.target.value as VisionBridgeMode })
            }
          >
            <option value="auto">{t("modalityBridgeModeAuto")}</option>
            <option value="describe">{t("modalityBridgeModeDescribe")}</option>
            <option value="reroute">{t("modalityBridgeModeReroute")}</option>
          </select>
          <p className="mt-1 text-xs text-text-muted">
            {settings.modalityBridgeVisionMode === "auto" && t("modalityBridgeModeAutoHint")}
            {settings.modalityBridgeVisionMode === "describe" &&
              t("modalityBridgeModeDescribeHint")}
            {settings.modalityBridgeVisionMode === "reroute" && t("modalityBridgeModeRerouteHint")}
          </p>
        </div>

        <ModelSelectField
          label={t("modalityBridgeVisionModel")}
          value={settings.modalityBridgeVisionModel}
          placeholder={t("modalityBridgeVisionModelAuto")}
          allowEmpty
          // #10809: read the unified catalog (all configured providers +
          // user-added custom models — matching the Audio tab's modelSource)
          // so active upstream vision models are never missed. #10703: the
          // filter still lists only vision-capable models, so text-only code
          // models (cmd/gpt-5.3-codex, cmd/deepseek/deepseek-v4-pro, …) never
          // appear as Vision Bridge candidates. allowCustomInput keeps an
          // editable text field so operators can type a self-hosted / unlisted
          // vision model.
          modelSource="catalog"
          modelFilter={(model) => model.supportsVision === true}
          allowCustomInput
          testId="modality-bridge-vision-model"
          onChange={(value) => void update({ modalityBridgeVisionModel: value })}
          className="text-sm"
        />

        <Toggle
          checked={settings.modalityBridgeVisionTaskAware}
          onChange={(checked) => void update({ modalityBridgeVisionTaskAware: checked })}
          label={t("modalityBridgeTaskAware")}
          description={t("modalityBridgeTaskAwareDesc")}
        />

        <div>
          <label className="block text-sm font-medium" htmlFor="modality-bridge-prompt">
            {t("modalityBridgePrompt")}
          </label>
          <textarea
            id="modality-bridge-prompt"
            className="mt-1 min-h-[100px] w-full rounded-control border border-border bg-surface px-3 py-2 text-sm"
            value={settings.modalityBridgeVisionPrompt}
            onChange={(event) =>
              setLocal({ modalityBridgeVisionPrompt: event.currentTarget.value })
            }
            onBlur={(event) => {
              const value = event.currentTarget.value.trim();
              setLocal({ modalityBridgeVisionPrompt: value });
              void update({ modalityBridgeVisionPrompt: value });
            }}
          />
        </div>

        <details className="rounded-control border border-border p-3">
          <summary className="cursor-pointer text-sm font-medium">
            {t("modalityBridgeAdvanced")}
          </summary>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberField
              testId="modality-bridge-timeout"
              label={t("modalityBridgeTimeoutMs")}
              min={1000}
              max={300000}
              value={settings.modalityBridgeVisionTimeout}
              onChange={(value) => setLocal({ modalityBridgeVisionTimeout: value })}
              onBlur={(raw) =>
                commitNumber(
                  "modalityBridgeVisionTimeout",
                  raw,
                  1000,
                  300000,
                  VISION_BRIDGE_DEFAULTS.timeoutMs
                )
              }
            />
            <NumberField
              testId="modality-bridge-max-images"
              label={t("modalityBridgeMaxImages")}
              min={1}
              max={20}
              value={settings.modalityBridgeVisionMaxImages}
              onChange={(value) => setLocal({ modalityBridgeVisionMaxImages: value })}
              onBlur={(raw) =>
                commitNumber(
                  "modalityBridgeVisionMaxImages",
                  raw,
                  1,
                  20,
                  VISION_BRIDGE_DEFAULTS.maxImagesPerRequest
                )
              }
            />
            <div>
              <NumberField
                testId="modality-bridge-max-chars"
                label={t("visionMaxCharsLabel")}
                min={0}
                max={50000}
                placeholder="0"
                value={settings.modalityBridgeVisionMaxChars}
                onChange={(value) => setLocal({ modalityBridgeVisionMaxChars: value })}
                onBlur={(raw) => commitMaxChars(raw)}
              />
              <p className="mt-1 text-xs text-text-muted">{t("visionMaxCharsHint")}</p>
            </div>
            <div className="md:col-span-2">
              <Toggle
                checked={settings.modalityBridgeCacheEnabled}
                onChange={(checked) => void update({ modalityBridgeCacheEnabled: checked })}
                label={t("modalityBridgeCacheEnabled")}
                description={t("modalityBridgeCacheEnabledDesc")}
              />
            </div>
            <NumberField
              testId="modality-bridge-cache-ttl"
              label={t("modalityBridgeCacheTtlMinutes")}
              min={1}
              max={1440}
              value={settings.modalityBridgeCacheTtlMinutes}
              onChange={(value) => setLocal({ modalityBridgeCacheTtlMinutes: value })}
              onBlur={(raw) =>
                commitNumber(
                  "modalityBridgeCacheTtlMinutes",
                  raw,
                  1,
                  1440,
                  MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes
                )
              }
            />
            <NumberField
              testId="modality-bridge-cache-max-entries"
              label={t("modalityBridgeCacheMaxEntries")}
              min={10}
              max={5000}
              value={settings.modalityBridgeCacheMaxEntries}
              onChange={(value) => setLocal({ modalityBridgeCacheMaxEntries: value })}
              onBlur={(raw) =>
                commitNumber(
                  "modalityBridgeCacheMaxEntries",
                  raw,
                  10,
                  5000,
                  MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries
                )
              }
            />
          </div>
        </details>

        <ModalityBridgeStatsRow kind="vision" />
        <ModalityBridgeTestButton />
      </div>
    </Card>
  );
}

function asSettingsRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

interface NumberFieldProps {
  testId: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  onBlur: (raw: string) => void;
  placeholder?: string;
}

function NumberField({
  testId,
  label,
  min,
  max,
  value,
  onChange,
  onBlur,
  placeholder,
}: NumberFieldProps) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        type="number"
        data-testid={testId}
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(Number.parseInt(event.currentTarget.value, 10) || 0)}
        onBlur={(event) => onBlur(event.currentTarget.value)}
        className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-sm"
      />
    </label>
  );
}
