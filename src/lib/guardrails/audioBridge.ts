import { getSettings as defaultGetSettings } from "@/lib/db/settings";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { resolveAudioBridgeRuntimeSettings } from "@/shared/constants/modalityBridgeDefaults";

import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import {
  callAudioTranscription as defaultCallAudioTranscription,
  extractAudioParts,
  replaceAudioParts,
  selectAudioBridgeModel,
  type AudioCredentialCheck,
  type AudioPart,
  type AudioTranscriptionConfig,
} from "./audioBridgeHelpers";
import { bridgeCacheKey, getSharedBridgeCacheFor } from "./modalityBridge/bridgeCache";
import { recordBridgeUse } from "./modalityBridge/bridgeStats";

export interface AudioBridgeDependencies {
  getSettings?: () => Promise<Record<string, unknown>>;
  getCapabilities?: (model: string) => { supportsAudio: boolean | null };
  hasUsableCredentials?: AudioCredentialCheck;
  selectModel?: (configuredModel: string) => Promise<string | null>;
  callTranscription?: (part: AudioPart, config: AudioTranscriptionConfig) => Promise<string>;
}

type AudioBridgeBody = {
  model?: string;
  messages?: Array<{ role?: string; content?: unknown }>;
  [key: string]: unknown;
};

export class AudioBridgeGuardrail extends BaseGuardrail {
  name = "audio-bridge";
  priority = 6;

  private readonly deps: AudioBridgeDependencies;

  constructor(options?: { enabled?: boolean; deps?: AudioBridgeDependencies }) {
    super("audio-bridge", { priority: 6, enabled: options?.enabled });
    this.deps = options?.deps ?? {};
  }

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    if (!this.enabled || context.disabledGuardrails?.includes("audio-bridge")) {
      return { block: false };
    }

    const body = payload as AudioBridgeBody;
    const model = context.model || body?.model;
    if (!model || !Array.isArray(body?.messages) || body.messages.length === 0) {
      return { block: false };
    }

    const getSettings = this.deps.getSettings ?? defaultGetSettings;
    let persisted: Record<string, unknown> = {};
    try {
      persisted = await getSettings();
    } catch {
      // Database settings are optional during early boot; defaults remain safe.
    }
    const runtime = resolveAudioBridgeRuntimeSettings(persisted);
    if (!runtime.enabled) return { block: false };

    const audioParts = extractAudioParts(body.messages);
    if (audioParts.length === 0) return { block: false };

    const capabilities = (this.deps.getCapabilities ?? getResolvedModelCapabilities)(model);
    if (capabilities.supportsAudio === true) return { block: false };

    const limitedParts = audioParts.slice(0, runtime.maxClips);
    const startedAt = Date.now();
    const configuredModel = runtime.model || "auto";
    const sttModel = this.deps.selectModel
      ? await this.deps.selectModel(configuredModel)
      : await selectAudioBridgeModel(configuredModel, this.deps.hasUsableCredentials);
    if (!sttModel) {
      if (capabilities.supportsAudio !== false) return { block: false };
      const stubs = limitedParts.map(
        (_part, index) => `[Audio ${index + 1}]: (unavailable — no STT provider connected)`
      );
      for (const _part of limitedParts) recordBridgeUse("audio", { failure: true });
      return {
        block: false,
        modifiedPayload: replaceAudioParts(body, limitedParts, stubs),
        meta: {
          clipsProcessed: stubs.length,
          processingTimeMs: Date.now() - startedAt,
          sttModel: "unavailable",
        },
      };
    }

    const callTranscription = this.deps.callTranscription ?? defaultCallAudioTranscription;
    const cache = runtime.cacheEnabled ? getSharedBridgeCacheFor(runtime) : null;
    const settled = await Promise.allSettled(
      limitedParts.map(async (part, index) => {
        const key = cache ? bridgeCacheKey(part.ref, "audio-transcription", sttModel) : null;
        const cached = key && cache ? cache.get(key) : undefined;
        const transcript =
          cached ??
          (await callTranscription(part, { model: sttModel, timeoutMs: runtime.timeoutMs }));
        if (cached === undefined && key && cache) cache.set(key, transcript);
        recordBridgeUse("audio", { cacheHit: cached !== undefined });
        return `[Audio ${index + 1}]: ${transcript}`;
      })
    );

    const transcripts = settled.map((result, index): string | null => {
      if (result.status === "fulfilled") return result.value;
      const message =
        result.reason instanceof Error ? result.reason.message : String(result.reason);
      context.log?.warn?.("AUDIO_BRIDGE", `Failed to transcribe audio ${index + 1}: ${message}`);
      recordBridgeUse("audio", { failure: true });
      return null;
    });
    if (
      capabilities.supportsAudio === false &&
      transcripts.every((transcript) => transcript === null)
    ) {
      for (let index = 0; index < transcripts.length; index++) {
        transcripts[index] = `[Audio ${index + 1}]: (unavailable — no STT provider connected)`;
      }
    }
    const clipsProcessed = transcripts.filter((value) => value !== null).length;
    if (clipsProcessed === 0) return { block: false };

    return {
      block: false,
      modifiedPayload: replaceAudioParts(body, limitedParts, transcripts),
      meta: {
        clipsProcessed,
        processingTimeMs: Date.now() - startedAt,
        sttModel,
      },
    };
  }
}
