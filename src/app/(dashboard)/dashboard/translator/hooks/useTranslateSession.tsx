"use client";

import { useCallback, useState } from "react";
import type { FormatId, TranslateMode, TranslateNarratedResult } from "../types";

export interface UseTranslateSessionInput {
  source: FormatId;
  target: FormatId;
  provider: string;
  inputText: string;
  mode: TranslateMode;
}

export interface UseTranslateSessionReturn {
  result: TranslateNarratedResult;
  run: (input: UseTranslateSessionInput) => Promise<void>;
  reset: () => void;
}

function sanitizeError(raw: unknown): string {
  const text =
    raw instanceof Error ? raw.message : typeof raw === "string" ? raw : "Unknown error";
  return text
    .replace(/\sat\s\/[^\s]+/g, "")
    .replace(/sk-[A-Za-z0-9_-]{16,}/g, "[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9_.-]+/g, "Bearer [REDACTED]");
}

const initialResult = (target: FormatId): TranslateNarratedResult => ({
  detected: null,
  target,
  status: "idle",
  responsePreview: null,
  translatedJson: null,
  pipelinePath: null,
  intermediateJson: null,
  errorMessage: null,
  latencyMs: null,
});

export function useTranslateSession(): UseTranslateSessionReturn {
  const [result, setResult] = useState<TranslateNarratedResult>(initialResult("openai"));

  const run = useCallback(
    async ({ source, target, provider, inputText, mode }: UseTranslateSessionInput) => {
      const start = performance.now();
      setResult({ ...initialResult(target), status: "translating" });
      try {
        // 1. Parse input as JSON; fall back to wrap-as-message.
        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(inputText);
        } catch {
          parsed = { messages: [{ role: "user", content: inputText }] };
        }

        // 2. Detect format.
        let detected: FormatId | null = null;
        try {
          const detectRes = await fetch("/api/translator/detect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: parsed }),
          });
          const detectData = (await detectRes.json()) as {
            success: boolean;
            format?: string;
          };
          if (detectData.success) detected = detectData.format as FormatId;
        } catch {
          /* non-fatal */
        }

        // 3. Translate (if source != target).
        let translatedJson: string | null = null;
        let intermediateJson: string | null = null;
        let pipelinePath: TranslateNarratedResult["pipelinePath"] = "passthrough";
        let translatedResult: Record<string, unknown> = parsed;

        if (source !== target) {
          const needsHub = source !== "openai" && target !== "openai";
          if (needsHub) {
            // Step 1: source → openai
            const step1 = await fetch("/api/translator/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                step: "direct",
                sourceFormat: source,
                targetFormat: "openai",
                body: parsed,
              }),
            });
            const step1Data = (await step1.json()) as {
              success: boolean;
              result?: Record<string, unknown>;
              error?: string;
            };
            if (!step1Data.success) throw new Error(step1Data.error ?? "Translate step 1 failed");
            intermediateJson = JSON.stringify(step1Data.result, null, 2);
            // Step 2: openai → target
            const step2 = await fetch("/api/translator/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                step: "direct",
                sourceFormat: "openai",
                targetFormat: target,
                body: step1Data.result,
              }),
            });
            const step2Data = (await step2.json()) as {
              success: boolean;
              result?: Record<string, unknown>;
              error?: string;
            };
            if (!step2Data.success) throw new Error(step2Data.error ?? "Translate step 2 failed");
            translatedResult = step2Data.result as Record<string, unknown>;
            translatedJson = JSON.stringify(step2Data.result, null, 2);
            pipelinePath = "hub-and-spoke";
          } else {
            const stepDirect = await fetch("/api/translator/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                step: "direct",
                sourceFormat: source,
                targetFormat: target,
                body: parsed,
              }),
            });
            const stepData = (await stepDirect.json()) as {
              success: boolean;
              result?: Record<string, unknown>;
              error?: string;
            };
            if (!stepData.success) throw new Error(stepData.error ?? "Translate failed");
            translatedResult = stepData.result as Record<string, unknown>;
            translatedJson = JSON.stringify(stepData.result, null, 2);
            pipelinePath = "direct";
          }
        } else {
          translatedJson = JSON.stringify(parsed, null, 2);
        }

        let responsePreview: string | null = null;

        // 4. Optional send (mode === "send").
        if (mode === "send") {
          setResult((prev) => ({
            ...prev,
            detected,
            translatedJson,
            intermediateJson,
            pipelinePath,
            status: "sending",
          }));
          const sendRes = await fetch("/api/translator/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider, body: translatedResult }),
          });
          if (!sendRes.ok) {
            const errorBody = (await sendRes.json().catch(() => ({
              error: `HTTP ${sendRes.status}`,
            }))) as { error?: unknown };
            throw new Error(
              typeof errorBody.error === "string" ? errorBody.error : "Send failed"
            );
          }
          const reader = sendRes.body?.getReader();
          if (reader) {
            try {
              const decoder = new TextDecoder();
              let buf = "";
              while (buf.length < 500) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, { stream: true });
              }
              responsePreview = buf.slice(0, 500);
              // Drain remaining (don't block UI).
              try {
                while (true) {
                  const { done } = await reader.read();
                  if (done) break;
                }
              } catch {
                /* ignore */
              }
            } finally {
              try { reader.cancel(); } catch { /* swallow — connection might already be closed */ }
              try { (reader as { releaseLock?: () => void }).releaseLock?.(); } catch { /* same */ }
            }
          }
        }

        const latencyMs = Math.round(performance.now() - start);
        setResult({
          detected,
          target,
          status: "ok",
          responsePreview,
          translatedJson,
          pipelinePath,
          intermediateJson,
          errorMessage: null,
          latencyMs,
        });
      } catch (err) {
        const latencyMs = Math.round(performance.now() - start);
        setResult((prev) => ({
          ...prev,
          status: "error",
          errorMessage: sanitizeError(err),
          latencyMs,
        }));
      }
    },
    []
  );

  const reset = useCallback(() => setResult(initialResult("openai")), []);

  return { result, run, reset };
}
