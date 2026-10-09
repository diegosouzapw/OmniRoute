/** Production STT adapter: one admitted buffer, sequential broker work, dual consent. */
import { createHash } from "node:crypto";

import {
  resolveAudioBridgeRuntimeSettings,
  resolveVideoAudioTranscriptionRuntimeSettings,
} from "@/shared/constants/modalityBridgeDefaults";

import type { BridgeCacheStore } from "./modalityBridge/bridgeCache";
import {
  orchestrateVideoAudioTranscription,
  type VideoAudioOrchestrationOptions,
} from "./videoBridgeAudioOrchestration";
import { extractVideoFramesViaBroker } from "./videoBridgeBrokerClient";
import { describeVideoPart, type DescribeVideoDependencies } from "./videoBridgeHelpers";

export interface VideoSttAdapterDependencies {
  extractAudio?: VideoAudioOrchestrationOptions["extractAudio"];
  selectAudioModel?: VideoAudioOrchestrationOptions["selectModel"];
  transcribeAudio?: VideoAudioOrchestrationOptions["transcribe"];
}

export function createVideoSttAdapter(input: {
  cache: BridgeCacheStore | null;
  dependencies: VideoSttAdapterDependencies;
  principalId: unknown;
  settings: Record<string, unknown>;
}): typeof describeVideoPart {
  const operator = resolveVideoAudioTranscriptionRuntimeSettings(input.settings);
  const audio = resolveAudioBridgeRuntimeSettings(input.settings);
  return async (part, options, caption, dependencies = {}, preloadedBytes) => {
    if (!audio.enabled || !operator.enabled || part.audioTranscription !== true) {
      return describeVideoPart(part, options, caption, dependencies, preloadedBytes);
    }
    const started = Date.now();
    let outcome: Awaited<ReturnType<typeof orchestrateVideoAudioTranscription>> | undefined;
    const adapted: DescribeVideoDependencies = {
      ...dependencies,
      extractFrames: async (bytes, extraction) => {
        // A secret is never a cache identity. Missing authenticated identity disables STT cache.
        const principal = typeof input.principalId === "string" ? input.principalId : null;
        const digest = createHash("sha256").update(bytes).digest("hex");
        const cacheKeyRef = principal ? JSON.stringify([principal, digest]) : undefined;
        outcome = await orchestrateVideoAudioTranscription({
          cache: input.cache,
          cacheKeyRef,
          extractAudio: input.dependencies.extractAudio,
          model: audio.model || "auto",
          operatorOptIn: operator.enabled,
          requestOptIn: part.audioTranscription === true,
          selectModel: input.dependencies.selectAudioModel,
          signal: extraction.signal,
          timeoutMs: Math.max(1, options.timeoutMs - (Date.now() - started)),
          transcribe: input.dependencies.transcribeAudio,
          videoBytes: bytes,
        });
        adapted.serverAudioTranscript = outcome.track?.observations;
        return (dependencies.extractFrames ?? extractVideoFramesViaBroker)(bytes, {
          ...extraction,
          timeoutMs: Math.max(1, options.timeoutMs - (Date.now() - started)),
        });
      },
    };
    const described = await describeVideoPart(part, options, caption, adapted, preloadedBytes);
    if (outcome?.attempted && !outcome.track) {
      return {
        ...described,
        fusion: {
          audioAvailable: false,
          videoAvailable: true,
          partial: true,
          failures: {
            audio:
              outcome.reason === "TIMEOUT" || outcome.reason === "ABORTED" ? "ABORTED" : "FAILED",
          },
        },
      };
    }
    return described;
  };
}
