"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const SAMPLE_INPUT = {
  model: "modality-bridge/self-test",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        {
          type: "image_url",
          image_url: {
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
          },
        },
      ],
    },
  ],
};

const DISABLED_GUARDRAILS = ["pii-masker", "prompt-injection", "credential-masker"];

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function findVisionMeta(value: unknown): Record<string, unknown> | null {
  const body = asRecord(value);
  if (!Array.isArray(body?.results)) return null;
  for (const entry of body.results) {
    const result = asRecord(entry);
    if (result?.guardrail === "vision-bridge") return asRecord(result.meta);
  }
  return null;
}

function readErrorMessage(value: unknown): string | null {
  const body = asRecord(value);
  const error = asRecord(body?.error);
  return typeof error?.message === "string" ? error.message : null;
}

export default function ModalityBridgeTestButton() {
  const t = useTranslations("settings");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runTest = async () => {
    setRunning(true);
    setResult(null);
    try {
      const response = await fetch("/api/guardrails/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: SAMPLE_INPUT,
          disabledGuardrails: DISABLED_GUARDRAILS,
        }),
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(readErrorMessage(body) ?? `HTTP ${response.status}`);
      }

      const meta = findVisionMeta(body);
      if (meta?.rerouted === true) {
        setResult(
          t("modalityBridgeTestReroute", {
            model: String(meta.toModel ?? "unknown"),
          })
        );
      } else if (typeof meta?.imagesProcessed === "number" && meta.imagesProcessed >= 1) {
        setResult(
          t("modalityBridgeTestOk", {
            count: meta.imagesProcessed,
            model: String(meta.visionModel ?? "unknown"),
          })
        );
      } else {
        setResult(t("modalityBridgeTestNoop"));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setResult(t("modalityBridgeTestError", { message }));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        className="rounded-control border border-border px-3 py-2 text-sm font-medium hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={running}
        onClick={() => void runTest()}
      >
        {t(running ? "modalityBridgeTestRunning" : "modalityBridgeTestButton")}
      </button>
      {result && (
        <p className="text-xs text-text-muted" role="status">
          {result}
        </p>
      )}
    </div>
  );
}
