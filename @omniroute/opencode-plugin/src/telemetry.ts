/**
 * Map gateway-reported OmniRoute inference telemetry onto the JSON/SSE
 * payload OpenCode already consumes. Prefer headers / usage fields from the
 * gateway. Never invent tok/s from tokens / latency (that includes TTFT).
 */
export type OmniRouteInferenceTelemetry = {
  costUsd?: number;
  tokensIn?: number;
  tokensOut?: number;
  tokensPerSecond?: number;
  ttftMs?: number;
  latencyMs?: number;
  model?: string;
  provider?: string;
};

const HEADER = {
  cost: "x-omniroute-response-cost",
  tokensIn: "x-omniroute-tokens-in",
  tokensOut: "x-omniroute-tokens-out",
  tokensPerSecond: "x-omniroute-tokens-per-second",
  ttftMs: "x-omniroute-ttft-ms",
  latencyMs: "x-omniroute-latency-ms",
  model: "x-omniroute-model",
  provider: "x-omniroute-provider",
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readFiniteNumber(raw: string | null): number | undefined {
  if (raw == null) return undefined;
  const trimmed = raw.trim();
  if (trimmed === "") return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readPositiveNumber(raw: string | null): number | undefined {
  const parsed = readFiniteNumber(raw);
  if (parsed === undefined || parsed <= 0) return undefined;
  return parsed;
}

function readNonNegativeInt(raw: string | null): number | undefined {
  const parsed = readFiniteNumber(raw);
  if (parsed === undefined || parsed < 0) return undefined;
  return Math.round(parsed);
}

function readToken(raw: string | null): string | undefined {
  if (raw == null) return undefined;
  const trimmed = raw.trim();
  return trimmed === "" ? undefined : trimmed;
}

export function parseOmniRouteInferenceTelemetry(headers: Headers): OmniRouteInferenceTelemetry {
  const out: OmniRouteInferenceTelemetry = {};
  const cost = readFiniteNumber(headers.get(HEADER.cost));
  if (cost !== undefined && cost >= 0) out.costUsd = cost;
  const tokensIn = readNonNegativeInt(headers.get(HEADER.tokensIn));
  if (tokensIn !== undefined) out.tokensIn = tokensIn;
  const tokensOut = readNonNegativeInt(headers.get(HEADER.tokensOut));
  if (tokensOut !== undefined) out.tokensOut = tokensOut;
  const tps = readPositiveNumber(headers.get(HEADER.tokensPerSecond));
  if (tps !== undefined) out.tokensPerSecond = tps;
  const ttft = readPositiveNumber(headers.get(HEADER.ttftMs));
  if (ttft !== undefined) out.ttftMs = ttft;
  const latency = readPositiveNumber(headers.get(HEADER.latencyMs));
  if (latency !== undefined) out.latencyMs = latency;
  const model = readToken(headers.get(HEADER.model));
  if (model) out.model = model;
  const provider = readToken(headers.get(HEADER.provider));
  if (provider) out.provider = provider;
  return out;
}

function telemetryFromUsage(usage: Record<string, unknown>): OmniRouteInferenceTelemetry {
  const out: OmniRouteInferenceTelemetry = {};
  const tps = usage.tokens_per_second;
  if (typeof tps === "number" && Number.isFinite(tps) && tps > 0) {
    out.tokensPerSecond = tps;
  }
  const ttft = usage.ttft_ms;
  if (typeof ttft === "number" && Number.isFinite(ttft) && ttft > 0) {
    out.ttftMs = ttft;
  }
  return out;
}

function mergeTelemetry(
  base: OmniRouteInferenceTelemetry,
  extra: OmniRouteInferenceTelemetry,
): OmniRouteInferenceTelemetry {
  return {
    ...base,
    ...Object.fromEntries(Object.entries(extra).filter(([, value]) => value !== undefined)),
  };
}

function isInferencePayload(payload: Record<string, unknown>): boolean {
  return (
    isRecord(payload.usage) ||
    Array.isArray(payload.choices) ||
    payload.object === "chat.completion" ||
    payload.object === "response" ||
    payload.type === "message" ||
    Array.isArray(payload.output)
  );
}

function attachToUsage(
  usage: Record<string, unknown>,
  telemetry: OmniRouteInferenceTelemetry,
): Record<string, unknown> {
  const next = { ...usage };
  if (
    telemetry.tokensPerSecond !== undefined &&
    (typeof next.tokens_per_second !== "number" || next.tokens_per_second <= 0)
  ) {
    next.tokens_per_second = telemetry.tokensPerSecond;
  }
  if (telemetry.ttftMs !== undefined && (typeof next.ttft_ms !== "number" || next.ttft_ms <= 0)) {
    next.ttft_ms = telemetry.ttftMs;
  }
  if (telemetry.costUsd !== undefined && typeof next.cost !== "number") {
    next.cost = telemetry.costUsd;
  }
  return next;
}

export function attachOmniRouteTelemetryToPayload(
  payload: unknown,
  telemetry: OmniRouteInferenceTelemetry,
): unknown {
  if (!isRecord(payload) || !isInferencePayload(payload)) {
    return payload;
  }
  const next: Record<string, unknown> = { ...payload };
  if (telemetry.model) {
    next.model = telemetry.model;
  }
  if (isRecord(next.usage)) {
    next.usage = attachToUsage(next.usage, mergeTelemetry(telemetry, telemetryFromUsage(next.usage)));
  }
  if (isRecord(next.response) && isRecord(next.response.usage)) {
    next.response = {
      ...next.response,
      usage: attachToUsage(
        next.response.usage,
        mergeTelemetry(telemetry, telemetryFromUsage(next.response.usage)),
      ),
    };
  }
  return next;
}

export function attachOmniRouteTelemetryToSseLine(
  line: string,
  telemetry: OmniRouteInferenceTelemetry,
): string {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:")) {
    return line;
  }
  const jsonText = trimmed.slice("data:".length).trim();
  if (!jsonText.startsWith("{")) {
    return line;
  }
  try {
    const parsed = JSON.parse(jsonText) as unknown;
    const updated = attachOmniRouteTelemetryToPayload(parsed, telemetry);
    if (updated === parsed) {
      return line;
    }
    const prefix = line.slice(0, line.indexOf(jsonText));
    const suffix = line.endsWith("\r") ? "\r" : "";
    return `${prefix}${JSON.stringify(updated)}${suffix}`;
  } catch {
    return line;
  }
}

export async function applyOmniRouteInferenceTelemetry(response: Response): Promise<Response> {
  const telemetry = parseOmniRouteInferenceTelemetry(response.headers);
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/event-stream") && response.body) {
    return new Response(mapSseBody(response.body, telemetry), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
  if (!contentType.includes("json")) {
    return response;
  }
  const text = await response.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
  const next = attachOmniRouteTelemetryToPayload(parsed, telemetry);
  if (next === parsed) {
    return new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
  return new Response(JSON.stringify(next), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function mapSseBody(
  body: ReadableStream<Uint8Array>,
  telemetry: OmniRouteInferenceTelemetry,
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pending = "";
  let live = { ...telemetry };
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        pending += decoder.decode(chunk, { stream: true });
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";
        for (const line of lines) {
          controller.enqueue(encoder.encode(`${attachOmniRouteTelemetryToSseLine(line, live)}\n`));
        }
      },
      flush(controller) {
        if (pending.length > 0) {
          controller.enqueue(encoder.encode(attachOmniRouteTelemetryToSseLine(pending, live)));
        }
      },
    }),
  );
}
