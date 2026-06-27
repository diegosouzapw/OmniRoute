"use client";
import { useCallback, useState } from "react";
import { previewToRunModel, type CompressionRunModel, type PreviewResponse } from "@/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";
export interface PreviewMessage { role: string; content: unknown; }
export interface Lane { engine: string; run: CompressionRunModel | null; error: string | null; }
export interface PreviewBatch { lanes: Lane[]; combined: CompressionRunModel | null; diff: PreviewResponse["diff"] | null; }
export interface RunPreviewArgs { messages: PreviewMessage[]; laneEngines: string[]; activeEngines: string[]; language?: string; fidelityGate?: boolean; fuzzyDedup?: boolean; }
async function postPreview(payload: Record<string, unknown>): Promise<PreviewResponse> {
  const res = await fetch("/api/compression/preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Preview failed");
  return data as PreviewResponse;
}
export async function runPreviewBatch(args: RunPreviewArgs): Promise<PreviewBatch> {
  const { messages, laneEngines, activeEngines, fidelityGate, fuzzyDedup } = args;
  const extra = {
    ...(fidelityGate ? { fidelityGate: { enabled: true } } : {}),
    ...(fuzzyDedup ? { fuzzyDedup: { enabled: true } } : {}),
  };
  const lanes: Lane[] = await Promise.all(
    laneEngines.map(async (engine): Promise<Lane> => {
      try { const res = await postPreview({ messages, engineId: engine, ...extra }); return { engine, run: previewToRunModel(res, engine), error: null }; }
      catch (e) { return { engine, run: null, error: e instanceof Error ? e.message : "error" }; }
    })
  );
  let combined: CompressionRunModel | null = null;
  let diff: PreviewResponse["diff"] | null = null;
  if (activeEngines.length > 0) {
    try { const res = await postPreview({ messages, pipeline: activeEngines, ...extra }); combined = previewToRunModel(res, activeEngines.join(" → ")); diff = res.diff; }
    catch { combined = null; }
  }
  return { lanes, combined, diff };
}
export function usePreviewCompression() {
  const [batch, setBatch] = useState<PreviewBatch | null>(null);
  const [loading, setLoading] = useState(false);
  const run = useCallback(async (args: RunPreviewArgs) => { setLoading(true); try { setBatch(await runPreviewBatch(args)); } finally { setLoading(false); } }, []);
  return { batch, loading, run };
}
