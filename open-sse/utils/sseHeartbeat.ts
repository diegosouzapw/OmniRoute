export const DEFAULT_SSE_HEARTBEAT_INTERVAL_MS = 15_000;

export const HEARTBEAT_SHAPES = {
  COMMENT: "comment",
  ANTHROPIC_PING: "anthropic-ping",
  OPENAI_CHUNK: "openai-chunk",
  OPENAI_RESPONSES_IN_PROGRESS: "openai-responses-in-progress",
} as const;

export type HeartbeatShape = (typeof HEARTBEAT_SHAPES)[keyof typeof HEARTBEAT_SHAPES];

export const DEFAULT_SSE_HEARTBEAT_SHAPE: HeartbeatShape = HEARTBEAT_SHAPES.COMMENT;

export function shapeForClientFormat(
  clientResponseFormat: string | undefined | null
): HeartbeatShape {
  switch (clientResponseFormat) {
    case "claude":
      return HEARTBEAT_SHAPES.ANTHROPIC_PING;
    case "openai":
      return HEARTBEAT_SHAPES.OPENAI_CHUNK;
    case "openai-responses":
      return HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS;
    default:
      return HEARTBEAT_SHAPES.COMMENT;
  }
}

function buildHeartbeatPayload(
  shape: HeartbeatShape,
  opts: { chunkId?: string; chunkModel?: string } = {}
): string {
  switch (shape) {
    case HEARTBEAT_SHAPES.ANTHROPIC_PING:
      return "event: ping\ndata: {}\n\n";
    case HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS:
      return 'data: {"type":"response.in_progress"}\n\n';
    case HEARTBEAT_SHAPES.OPENAI_CHUNK: {
      const payload = {
        id: opts.chunkId ?? "omniroute-keepalive",
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: opts.chunkModel ?? "omniroute",
        choices: [{ index: 0, delta: {}, finish_reason: null }],
      };
      return `data: ${JSON.stringify(payload)}\n\n`;
    }
    case HEARTBEAT_SHAPES.COMMENT:
    default:
      return `: keepalive ${new Date().toISOString()}\n\n`;
  }
}

type SseHeartbeatTransformOptions = {
  intervalMs?: number;
  signal?: AbortSignal;
  shape?: HeartbeatShape;
  chunkId?: string;
  chunkModel?: string;
};

const HEARTBEAT_ENCODER = new TextEncoder();

/**
 * Whether OmniRoute may emit SSE `:` comment lines (e.g. the `: keepalive` heartbeat).
 * Some strict OpenAI-compatible clients parse every SSE line as JSON and crash on `:` comments.
 * Set OMNIROUTE_SSE_COMMENTS=off to suppress comment-shaped heartbeats (they become a no-op).
 * Defaults to enabled for backward compatibility.
 */
export function sseCommentsEnabled(): boolean {
  // SSR/edge safety: `process` is not defined in Workers/Deno/edge runtimes.
  if (typeof process === "undefined") return true;
  const v = process.env.OMNIROUTE_SSE_COMMENTS;
  if (v === undefined || v === "") return true;
  return v.trim().toLowerCase() !== "off";
}

export function createSseHeartbeatTransform({
  intervalMs = DEFAULT_SSE_HEARTBEAT_INTERVAL_MS,
  signal,
  shape = DEFAULT_SSE_HEARTBEAT_SHAPE,
  chunkId,
  chunkModel,
}: SseHeartbeatTransformOptions = {}): TransformStream<Uint8Array, Uint8Array> {
  if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
    return new TransformStream<Uint8Array, Uint8Array>();
  }

  // Opt-out for strict OpenAI-compatible clients that JSON.parse every SSE line and
  // crash on `:` comment heartbeats. OMNIROUTE_SSE_COMMENTS=off disables comment-shaped
  // heartbeats (they become a no-op); valid `data:` heartbeats are unaffected.
  if (!sseCommentsEnabled() && shape === HEARTBEAT_SHAPES.COMMENT) {
    return new TransformStream<Uint8Array, Uint8Array>();
  }

  let intervalId: ReturnType<typeof setInterval> | undefined;

  const stop = () => {
    if (!intervalId) return;
    globalThis.clearInterval(intervalId);
    intervalId = undefined;
  };

  return new TransformStream<Uint8Array, Uint8Array>({
    start(controller) {
      intervalId = globalThis.setInterval(() => {
        if (signal?.aborted) {
          stop();
          return;
        }

        try {
          controller.enqueue(
            HEARTBEAT_ENCODER.encode(buildHeartbeatPayload(shape, { chunkId, chunkModel }))
          );
        } catch {
          stop();
        }
      }, intervalMs);

      if (intervalId && typeof intervalId === "object" && "unref" in intervalId) {
        intervalId.unref?.();
      }

      signal?.addEventListener("abort", stop, { once: true });
    },

    transform(chunk, controller) {
      controller.enqueue(chunk);
    },

    flush() {
      stop();
    },

    cancel() {
      stop();
    },
  });
}
