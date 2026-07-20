/**
 * chatCore streaming response pipeline assembly (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's streaming success path: chain the response transforms onto the
 * provider stream — disconnect-aware pipe → PII sanitization (explicit transform or feature-flagged
 * SSE transform) → optional progress tracking (Phase 9.3) → SSE heartbeat → optional model-echo
 * (#1311). Returns the assembled `finalStream`; mutates the passed `responseHeaders` to add the
 * progress marker when progress is enabled. Behaviour is byte-identical to the previous inline
 * block, including the exact transform order and branch conditions.
 */
import { pipeWithDisconnect as defaultPipeWithDisconnect } from "../../utils/streamHandler.ts";
import {
  createSseHeartbeatTransform as defaultHeartbeat,
  shapeForClientFormat as defaultShape,
} from "../../utils/sseHeartbeat.ts";
import { createModelEchoTransform as defaultModelEcho } from "../../services/responseModelEcho.ts";
import {
  createProgressTransform as defaultProgress,
  wantsProgress as defaultWantsProgress,
} from "../../utils/progressTracker.ts";
import { createPiiSseTransform as defaultPiiSse } from "@/lib/streamingPiiTransform";
import { isFeatureFlagEnabled as defaultFeatureFlag } from "@/shared/utils/featureFlags";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { SSE_HEARTBEAT_INTERVAL_MS } from "../../config/constants.ts";
/**
 * Pipeline assembly instrumentation — performance.mark() along the SSE hot path.
 * Marks are visible to Node.js perf_hooks consumers and DevTools' Performance
 * panel when NODE_OPTIONS=--enable-node-performance-clinician or similar.
 *
 * Each call to assembleStreamingPipeline creates one measure record:
 *   "omni-pipeline" — wall-clock duration of the full transform chain assembly.
 */
const PIPELINE_START = "omni-pipeline-start";
const PIPELINE_END = "omni-pipeline-end";
const PIPELINE_MEASURE = "omni-pipeline";

type HeadersLike = Headers | Record<string, unknown> | null | undefined;

export interface StreamingPipelineDeps {
  wantsProgress: typeof defaultWantsProgress;
  pipeWithDisconnect: typeof defaultPipeWithDisconnect;
  isFeatureFlagEnabled: typeof defaultFeatureFlag;
  createPiiSseTransform: typeof defaultPiiSse;
  createProgressTransform: typeof defaultProgress;
  createSseHeartbeatTransform: typeof defaultHeartbeat;
  shapeForClientFormat: typeof defaultShape;
  createModelEchoTransform: typeof defaultModelEcho;
}

const DEFAULT_DEPS: StreamingPipelineDeps = {
  wantsProgress: defaultWantsProgress,
  pipeWithDisconnect: defaultPipeWithDisconnect,
  isFeatureFlagEnabled: defaultFeatureFlag,
  createPiiSseTransform: defaultPiiSse,
  createProgressTransform: defaultProgress,
  createSseHeartbeatTransform: defaultHeartbeat,
  shapeForClientFormat: defaultShape,
  createModelEchoTransform: defaultModelEcho,
};

export function assembleStreamingPipeline(
  args: {
    providerResponse: unknown;
    transformStream: unknown;
    streamController: { signal: AbortSignal };
    createPiiTransform: unknown;
    clientRawRequestHeaders: HeadersLike;
    clientResponseFormat: unknown;
    echoModel: string | null | undefined;
    responseHeaders: Record<string, string>;
  },
  deps: StreamingPipelineDeps = DEFAULT_DEPS
) {
  performance.clearMarks(PIPELINE_START);
  performance.clearMarks(PIPELINE_END);
  performance.clearMeasures(PIPELINE_MEASURE);
  performance.mark(PIPELINE_START);
  // ── Phase 9.3: Progress tracking (opt-in) ──
  const progressEnabled = deps.wantsProgress(args.clientRawRequestHeaders);
  let finalStream;

  let piiStream = deps.pipeWithDisconnect(
    args.providerResponse,
    args.transformStream,
    args.streamController
  );
  if (typeof args.createPiiTransform === "function") {
    piiStream = piiStream.pipeThrough((args.createPiiTransform as () => TransformStream)());
  } else if (deps.isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION")) {
    piiStream = piiStream.pipeThrough(deps.createPiiSseTransform());
  }

  if (progressEnabled) {
    const progressTransform = deps.createProgressTransform({
      signal: args.streamController.signal,
    });
    // Chain: provider → transform → progress → client
    finalStream = piiStream.pipeThrough(progressTransform);
    args.responseHeaders[OMNIROUTE_RESPONSE_HEADERS.progress] = "enabled";
  } else {
    finalStream = piiStream;
  }
  finalStream = finalStream.pipeThrough(
    deps.createSseHeartbeatTransform({
      signal: args.streamController.signal,
      intervalMs: SSE_HEARTBEAT_INTERVAL_MS,
      shape: deps.shapeForClientFormat(args.clientResponseFormat),
    })
  );
  // #1311: echo the requested alias/combo name in each streamed SSE chunk's model field.
  if (args.echoModel) {
    finalStream = finalStream.pipeThrough(deps.createModelEchoTransform(args.echoModel));
  }
  performance.mark(PIPELINE_END);
  performance.measure(PIPELINE_MEASURE, PIPELINE_START, PIPELINE_END);
  return finalStream;
}
