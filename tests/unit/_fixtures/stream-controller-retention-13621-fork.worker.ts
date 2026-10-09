/**
 * Issue #13621 RED-mode worker fixture — closure retention of the request
 * payload after the stream controller reaches a terminal state.
 *
 * Spawned (with DATA_DIR isolated to a fresh temp dir) by
 * tests/unit/stream-controller-retention-13621-fork.test.ts. Must run with
 * --expose-gc. Emits exactly one machine-readable result line:
 *
 *   RETENTION_RESULT={"mode":"...","payloadSizeBytes":N,"collected":bool,"retainedApproxBytes":N}
 *
 * `collected: true` means the request-payload closure graph — a canary wrapper
 * reachable ONLY through the createStreamController callbacks — was reclaimed
 * by GC after the controller reached its terminal state (the fixed behavior).
 * `collected: false` is the #13621 defect: the terminal-state controller still
 * pins its onDisconnect/onError closures, which capture the multi-MB request
 * payload, so the payload survives GC for as long as the controller lives.
 */

const RETENTION_RESULT_PREFIX = "RETENTION_RESULT=";

type WorkerMode =
  "complete" | "disconnect" | "error" | "abort" | "disconnect-handoff-grace" | "complete-nopin";

const WORKER_MODES: readonly WorkerMode[] = [
  "complete",
  "disconnect",
  "error",
  "abort",
  "disconnect-handoff-grace",
  "complete-nopin",
];

function isWorkerMode(value: string): value is WorkerMode {
  return WORKER_MODES.some((mode) => mode === value);
}

type RetentionResult = {
  mode: WorkerMode;
  payloadSizeBytes: number;
  collected: boolean;
  retainedApproxBytes: number;
};

const PAYLOAD_MARKER = "JON562SYNTHETIC";
const PAYLOAD_BYTES = 4 * 1024 * 1024;

// Production keeps the controller itself reachable after the request scope dies
// (dedup map, dispatch listeners, in-flight pipeline state). This module-level
// holder simulates exactly that pinning edge: the controller stays alive while
// every other direct reference is dropped.
const pinnedControllers: unknown[] = [];

function buildPayload(): string {
  return PAYLOAD_MARKER + "x".repeat(PAYLOAD_BYTES - PAYLOAD_MARKER.length);
}

type StreamCanary = { marker: string; big: string };

type StreamDisconnectEvent = { reason: string; duration: number };
type StreamErrorEvent = {
  error: unknown;
  message: string;
  statusCode: number;
  duration: number;
};

// Structural subset of the REAL createStreamController options/return shape
// (open-sse/utils/streamHandler.ts — StreamControllerOptions and the returned
// controller). No types are imported: streamHandler does not export them.
type StreamControllerFactory = (options: {
  onDisconnect?: (event: StreamDisconnectEvent) => boolean | void;
  onError?: (event: StreamErrorEvent) => boolean | void;
  provider?: string;
  model?: string;
  connectionId?: string | null;
  clientResponseFormat?: string | null;
  clientAbortSignal?: AbortSignal | null;
  allowCompletedToolHandoffGrace?: boolean;
  clientDisconnectGracePeriodMs?: number;
}) => {
  handleDisconnect: (reason?: string) => void;
  handleComplete: () => void;
  handleError: (error: unknown) => void;
  abort: () => void;
  markCompletedToolHandoffSeen: () => void;
  registerCompletedToolHandoffDrain: (drain: () => void) => void;
};

/**
 * Builds the canary + controller, wires production-shaped callbacks that close
 * over the canary (whose `big` field is the ~4 MiB payload), pins the
 * controller production-style (except for the control mode), triggers the
 * terminal path, and returns the WeakRef over the canary.
 *
 * Everything strongly referencing the canary lives in THIS frame: when the
 * function returns, the only remaining strong references to the canary are the
 * callbacks' closure contexts held by the controller — the exact retention
 * chain under test.
 */
function runScenario(
  mode: WorkerMode,
  createController: StreamControllerFactory
): { canaryRef: WeakRef<StreamCanary>; payloadSizeBytes: number } {
  const payload = buildPayload();
  const canary: StreamCanary = { marker: PAYLOAD_MARKER + "-CANARY", big: payload };
  const canaryRef = new WeakRef(canary);
  const payloadSizeBytes = Buffer.byteLength(payload, "utf8");

  // Mirrors the chatCore closure shape (open-sse/handlers/chatCore.ts:2964-2989):
  // the onDisconnect/onError callbacks capture request-scoped state. Here that
  // state is the canary wrapper — reachable ONLY through these closures.
  const onDisconnect = (event: StreamDisconnectEvent): boolean => {
    return canary.marker.length > 0 && event.reason.length > 0 && payload.length > 0;
  };
  const onError = (event: StreamErrorEvent): boolean => {
    return canary.marker.length > 0 && event.message.length > 0 && payload.length > 0;
  };

  const useHandoffGrace = mode === "disconnect-handoff-grace";
  const controller = createController({
    onDisconnect,
    onError,
    provider: "synthetic-provider",
    model: "synthetic-model",
    connectionId: "synthetic-connection-13621",
    clientResponseFormat: null,
    clientAbortSignal: null,
    allowCompletedToolHandoffGrace: useHandoffGrace,
    clientDisconnectGracePeriodMs: useHandoffGrace ? 5_000 : 0,
  });

  if (mode !== "complete-nopin") {
    pinnedControllers.push(controller);
  }

  if (useHandoffGrace) {
    // Production registers a drain closure while a completed tool handoff is
    // in flight; the controller stores it in its own closure context
    // (open-sse/utils/streamHandler.ts — registerCompletedToolHandoffDrain,
    // consumed by the deferred branch of handleDisconnect).
    controller.markCompletedToolHandoffSeen();
    controller.registerCompletedToolHandoffDrain(() => {
      if (canary.marker.length > 0 && payload.length > 0) {
        // Grace-period drain: upstream abort is deferred, not cancelled.
      }
    });
  }

  switch (mode) {
    case "complete":
    case "complete-nopin":
      controller.handleComplete();
      break;
    case "disconnect":
    case "disconnect-handoff-grace":
      controller.handleDisconnect("client_closed");
      break;
    case "error":
      controller.handleError(new Error("synthetic upstream failure #13621"));
      break;
    case "abort":
      controller.abort();
      break;
  }

  // controller + callbacks leave scope here. The module-level pin keeps the
  // controller — and through it the closures — reachable, production-style.
  return { canaryRef, payloadSizeBytes };
}

async function settleGarbage(gc: () => void): Promise<void> {
  for (let round = 0; round < 10; round += 1) {
    gc();
    await new Promise<void>((resolve) => {
      setImmediate(resolve);
    });
  }
  gc();
}

async function main(): Promise<void> {
  const dataDir = process.env.DATA_DIR;
  if (!dataDir) {
    throw new Error(
      "DATA_DIR must be set by the spawning test BEFORE this worker imports OmniRoute modules"
    );
  }
  void dataDir;

  // Same structural narrowing convention as tests/unit/json-size-exactness.test.ts:169.
  const gc = globalThis.gc as (() => void) | undefined;
  if (typeof gc !== "function") {
    throw new Error("worker must be spawned with --expose-gc");
  }

  const modeArg = process.argv[2];
  if (typeof modeArg !== "string" || !isWorkerMode(modeArg)) {
    throw new Error(
      `unknown mode ${JSON.stringify(process.argv[2])}; expected one of ${WORKER_MODES.join(", ")}`
    );
  }

  // Dynamic import AFTER env validation: importing streamHandler transitively
  // initializes the DB layer (migrations run on the node:sqlite fallback
  // driver), which must land in the isolated DATA_DIR.
  const { createStreamController } = await import("../../../open-sse/utils/streamHandler.ts");

  const { canaryRef, payloadSizeBytes } = runScenario(modeArg, createStreamController);

  // The scenario frame is gone; settle GC so WeakRef clearing is observable.
  await settleGarbage(gc);

  const collected = canaryRef.deref() === undefined;
  const result: RetentionResult = {
    mode: modeArg,
    payloadSizeBytes,
    collected,
    retainedApproxBytes: collected ? 0 : payloadSizeBytes,
  };
  console.log(RETENTION_RESULT_PREFIX + JSON.stringify(result));
}

main().catch((error: unknown) => {
  console.error(
    "RETENTION_WORKER_ERROR=" +
      (error instanceof Error ? (error.stack ?? error.message) : String(error))
  );
  process.exitCode = 1;
});
