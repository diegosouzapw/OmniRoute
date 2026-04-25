"use client";

import { useEffect, useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { VISION_BRIDGE_DEFAULTS } from "@/shared/constants/visionBridgeDefaults";

type SettingsState = {
  visionBridgeEnabled: boolean;
  visionBridgeModel: string;
  visionBridgePrompt: string;
  visionBridgeTimeout: number;
  visionBridgeMaxImages: number;
};

export default function VisionBridgeSettingsTab() {
  const [settings, setSettings] = useState<SettingsState>({
    visionBridgeEnabled: VISION_BRIDGE_DEFAULTS.enabled,
    visionBridgeModel: VISION_BRIDGE_DEFAULTS.model,
    visionBridgePrompt: VISION_BRIDGE_DEFAULTS.prompt,
    visionBridgeTimeout: VISION_BRIDGE_DEFAULTS.timeoutMs,
    visionBridgeMaxImages: VISION_BRIDGE_DEFAULTS.maxImagesPerRequest,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setSettings({
          visionBridgeEnabled: data.visionBridgeEnabled ?? VISION_BRIDGE_DEFAULTS.enabled,
          visionBridgeModel: data.visionBridgeModel ?? VISION_BRIDGE_DEFAULTS.model,
          visionBridgePrompt: data.visionBridgePrompt ?? VISION_BRIDGE_DEFAULTS.prompt,
          visionBridgeTimeout: data.visionBridgeTimeout ?? VISION_BRIDGE_DEFAULTS.timeoutMs,
          visionBridgeMaxImages:
            data.visionBridgeMaxImages ?? VISION_BRIDGE_DEFAULTS.maxImagesPerRequest,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const updateSetting = async (patch: Partial<SettingsState>) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...patch }));
      }
    } catch (error) {
      console.error("Failed to update Vision Bridge settings:", error);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            image_search
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Vision Bridge</h3>
          <p className="text-sm text-text-muted">
            Run an automatic vision-to-text fallback before routing image requests to text-only
            models.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">Enabled</p>
            <p className="text-sm text-text-muted">
              Toggle the pre-call bridge that replaces image parts with extracted text.
            </p>
          </div>
          <Toggle
            checked={settings.visionBridgeEnabled}
            onChange={(checked) => updateSetting({ visionBridgeEnabled: checked })}
            disabled={loading}
          />
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bridge Model</label>
            <input
              type="text"
              value={settings.visionBridgeModel}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, visionBridgeModel: e.target.value }))
              }
              onBlur={() => updateSetting({ visionBridgeModel: settings.visionBridgeModel.trim() })}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              placeholder="openai/gpt-4o-mini"
            />
            <p className="text-xs text-text-muted mt-1">
              Any OmniRoute model ID that supports vision can be used here.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bridge Prompt</label>
            <textarea
              value={settings.visionBridgePrompt}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, visionBridgePrompt: e.target.value }))
              }
              onBlur={() =>
                updateSetting({ visionBridgePrompt: settings.visionBridgePrompt.trim() })
              }
              className="min-h-[100px] w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              placeholder="Describe this image concisely."
            />
            <p className="text-xs text-text-muted mt-1">
              Sent to the vision model before the extracted description is injected back into the
              original request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Timeout (ms)</label>
              <input
                type="number"
                min={1000}
                max={300000}
                value={settings.visionBridgeTimeout}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    visionBridgeTimeout: Number.parseInt(e.target.value, 10) || 0,
                  }))
                }
                onBlur={() =>
                  updateSetting({
                    visionBridgeTimeout: Math.min(
                      300000,
                      Math.max(
                        1000,
                        settings.visionBridgeTimeout || VISION_BRIDGE_DEFAULTS.timeoutMs
                      )
                    ),
                  })
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Images Per Request</label>
              <input
                type="number"
                min={1}
                max={20}
                value={settings.visionBridgeMaxImages}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    visionBridgeMaxImages: Number.parseInt(e.target.value, 10) || 0,
                  }))
                }
                onBlur={() =>
                  updateSetting({
                    visionBridgeMaxImages: Math.min(
                      20,
                      Math.max(
                        1,
                        settings.visionBridgeMaxImages || VISION_BRIDGE_DEFAULTS.maxImagesPerRequest
                      )
                    ),
                  })
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
