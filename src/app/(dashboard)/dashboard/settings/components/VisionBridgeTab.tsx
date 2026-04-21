"use client";

import { useState, useEffect } from "react";
import { Card, Toggle } from "@/shared/components";

export default function VisionBridgeTab() {
  const [config, setConfig] = useState({
    visionBridgeEnabled: true,
    visionBridgeModel: "openai/gpt-4o-mini",
    visionBridgePrompt:
      "Describe this image concisely in 2-3 sentences. Focus on the most relevant visual details.",
    visionBridgeTimeout: 30000,
    visionBridgeMaxImages: 10,
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/settings/vision-bridge")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (updates: Partial<typeof config>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setStatus("");
    try {
      const res = await fetch("/api/settings/vision-bridge", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (key: keyof typeof config, value: string | number | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        save({ [key]: value });
      }, 800)
    );
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            visibility
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Vision Bridge Guardrail</h3>
          <p className="text-sm text-text-muted">
            Automatically intercepts image requests sent to non-vision models, replacing them with
            AI-generated text descriptions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Saved
            </span>
          )}
          <Toggle
            checked={config.visionBridgeEnabled}
            onChange={() => save({ visionBridgeEnabled: !config.visionBridgeEnabled })}
            disabled={loading}
          />
        </div>
      </div>

      {config.visionBridgeEnabled && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Vision Model</label>
              <input
                type="text"
                value={config.visionBridgeModel}
                onChange={(e) => handleChange("visionBridgeModel", e.target.value)}
                placeholder="provider/model-id"
                className="w-full px-3 py-2 rounded-lg border border-border/50 bg-surface/30 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                disabled={loading}
              />
              <p className="text-xs text-text-muted">Model used to extract image descriptions.</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Max Images Per Request</label>
              <input
                type="number"
                value={config.visionBridgeMaxImages}
                onChange={(e) =>
                  handleChange("visionBridgeMaxImages", parseInt(e.target.value) || 10)
                }
                className="w-full px-3 py-2 rounded-lg border border-border/50 bg-surface/30 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                disabled={loading}
                min={1}
                max={50}
              />
              <p className="text-xs text-text-muted">
                Limits the number of images processed per payload.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Extraction Prompt</label>
            <textarea
              value={config.visionBridgePrompt}
              onChange={(e) => handleChange("visionBridgePrompt", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border/50 bg-surface/30 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/30 resize-y"
              disabled={loading}
            />
            <p className="text-xs text-text-muted">
              The prompt sent to the vision model to extract details.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
