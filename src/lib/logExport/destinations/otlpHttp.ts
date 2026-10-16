import { isUtf8 } from "node:buffer";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { z } from "zod";
import { version } from "../../../../package.json";
import { parseAndValidateNonMetadataUrl } from "../../../shared/network/outboundUrlGuard";
import { safeExportError } from "../safeExportError";
import type { LogExportDestinationType, LogExportRecord } from "../types";

export const OTLP_MAX_REQUEST_BYTES = 4 * 1024 * 1024;
const MAX_SPANS_PER_REQUEST = 500;
const MAX_ATTEMPTS = 3;
const RETRY_AFTER_CAP_MS = 5000;
const DEFAULT_PATHS = ["/v1/chat/completions", "/v1/responses", "/v1/messages"];

/** Strict parsing with generic errors: never echo a secret-bearing input. */
export function parseOtlpHeaders(raw: string): Record<string, string> {
  try {
    if (!raw.trim()) return {};
    const entries: [string, unknown][] = raw.trim().startsWith("{")
      ? Object.entries(z.record(z.string(), z.string()).parse(JSON.parse(raw)))
      : raw
          .split(/\r?\n/)
          .filter((line) => line.trim())
          .map((line) => {
            const colon = line.indexOf(":");
            if (colon < 1) throw new Error("Invalid headers");
            return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
          });
    const headers = new Headers();
    for (const [name, value] of entries) {
      if (typeof value !== "string" || /[\r\n]/.test(value)) throw new Error("Invalid headers");
      // Transport-controlled headers cannot change the JSON framing or target host.
      if (
        ["host", "content-length", "transfer-encoding", "connection"].includes(name.toLowerCase())
      )
        throw new Error("Invalid headers");
      headers.set(name, value);
    }
    return Object.fromEntries(headers.entries());
  } catch {
    throw new Error("Invalid OTLP headers: use Name: value lines or a JSON object of strings");
  }
}

const headersSchema = z
  .union([z.string().max(65536), z.record(z.string(), z.string())])
  .transform((value) => (typeof value === "string" ? value : JSON.stringify(value)))
  .pipe(z.string().max(65536))
  .refine((value) => {
    try {
      parseOtlpHeaders(value);
      return true;
    } catch {
      return false;
    }
  }, "Invalid OTLP headers")
  .default("");

export const otlpHttpConfigSchema = z.object({
  endpoint: z
    .string()
    .min(1)
    .max(4096)
    .refine((value) => {
      try {
        const url = parseAndValidateNonMetadataUrl(value);
        return !url.hash;
      } catch {
        return false;
      }
    }, "Invalid OTLP endpoint: use an HTTP(S) traces URL without credentials or a metadata host"),
  headers: headersSchema,
  serviceName: z.string().min(1).max(256).default("omniroute"),
  langfuseMapping: z.boolean().default(false),
  identity: z.enum(["pseudonymous", "keyName", "none"]).default("pseudonymous"),
  identitySalt: z
    .string()
    .regex(/^[a-f0-9]{64}$/, "Invalid identity salt")
    .optional(),
  paths: z
    .union([
      z.array(z.string().min(1).max(256)).max(100),
      z
        .string()
        .max(25600)
        .transform((value) =>
          value
            .split(/[\n,]/)
            .map((p) => p.trim())
            .filter(Boolean)
        ),
    ])
    .pipe(z.array(z.string().min(1).max(256)).max(100))
    .default(DEFAULT_PATHS),
  timeoutMs: z.number().int().min(1).max(300000).default(30000),
  environment: z.string().max(256).optional(),
});
export type OtlpHttpConfig = z.infer<typeof otlpHttpConfigSchema>;
type Value =
  { stringValue: string } | { intValue: string } | { boolValue: boolean } | { doubleValue: number };
type Attribute = { key: string; value: Value };
interface Span {
  traceId: string;
  spanId: string;
  name: string;
  kind: number;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: Attribute[];
  status: { code: number; message?: string };
}

function canonicalBody(body: string | null): string | null {
  if (body === null) return null;
  try {
    return JSON.stringify(JSON.parse(body));
  } catch {
    return body;
  } // clipped/non-JSON bodies remain readable
}

function secretForms(value: string): string[] {
  return [...new Set([value, JSON.stringify(value).slice(1, -1)])].filter(Boolean);
}

function headerSecretValues(config: OtlpHttpConfig): string[] {
  const values = new Set<string>([config.headers, config.identitySalt ?? ""]);
  for (const [name, value] of Object.entries(parseOtlpHeaders(config.headers))) {
    values.add(value);
    if (name === "authorization" || name === "proxy-authorization") {
      const match = /^(Basic|Bearer)\s+(.+)$/i.exec(value);
      if (match) {
        values.add(match[2]);
        if (match[1].toLowerCase() === "basic") {
          const decodedBytes = Buffer.from(match[2], "base64");
          const decoded = decodedBytes.toString("utf8");
          const colon = decoded.indexOf(":");
          if (isUtf8(decodedBytes) && colon >= 0) {
            values.add(decoded);
            values.add(decoded.slice(colon + 1));
            values.add(decoded.slice(0, colon));
          }
        }
      }
    }
  }
  return [...new Set([...values].flatMap(secretForms))].sort((a, b) => b.length - a.length);
}

function toSpan(row: LogExportRecord, config: OtlpHttpConfig): Span {
  const endMs = Date.parse(row.timestamp ?? "");
  if (!Number.isFinite(endMs)) throw new Error("OTLP call-log timestamp is missing or invalid");
  const duration = Math.max(0, row.duration ?? 0);
  const endNs = BigInt(endMs) * 1000000n;
  const startNs = endNs - BigInt(Math.round(duration * 1000000));
  const error = (row.status ?? 0) >= 400;
  const message = row.errorSummary
    ? safeExportError(row.errorSummary, headerSecretValues(config))
    : undefined;
  const attributes: Attribute[] = [];
  const add = (key: string, value: string | number | boolean | null | undefined) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "number" && !Number.isFinite(value))
    )
      return;
    attributes.push({
      key,
      value:
        typeof value === "boolean"
          ? { boolValue: value }
          : typeof value === "number"
            ? Number.isInteger(value)
              ? { intValue: String(value) }
              : { doubleValue: value }
            : { stringValue: value },
    });
  };
  add("gen_ai.operation.name", "chat");
  add("gen_ai.provider.name", row.provider);
  add("gen_ai.request.model", row.requestedModel);
  add("gen_ai.response.model", row.model);
  add("gen_ai.usage.input_tokens", row.tokensIn);
  add("gen_ai.usage.output_tokens", row.tokensOut);
  add("gen_ai.usage.cache_read.input_tokens", row.tokensCacheRead);
  add("gen_ai.usage.cache_creation.input_tokens", row.tokensCacheWrite);
  add("gen_ai.usage.reasoning.output_tokens", row.tokensReasoning);
  add("http.response.status_code", row.status);
  add("omniroute.combo.name", row.comboName);
  add("omniroute.combo.step_id", row.comboStepId);
  add("omniroute.combo.execution_key", row.comboExecutionKey);
  add("omniroute.cache_source", row.cacheSource);
  add("omniroute.session_tag", row.sessionTag);
  add("omniroute.correlation_id", row.correlationId);
  add("omniroute.ttft_ms", row.ttftMs);
  // Only the opt-in export hydration path populates these fields. No pipeline or unsanitized source reads here.
  const input = canonicalBody(row.requestBody);
  const output = canonicalBody(row.responseBody);
  if (!config.langfuseMapping) {
    add("gen_ai.input.messages", input);
    add("gen_ai.output.messages", output);
  }
  if (row.bodiesTruncated) add("omniroute.bodies_truncated", true);
  if (config.langfuseMapping) {
    add("langfuse.observation.type", "generation");
    add("langfuse.observation.model.name", row.model);
    const usage: Record<string, number> = {};
    if (row.tokensIn !== null) usage.input = row.tokensIn;
    if (row.tokensOut !== null) usage.output = row.tokensOut;
    if (row.tokensIn !== null && row.tokensOut !== null) usage.total = row.tokensIn + row.tokensOut;
    if (row.tokensCacheRead !== null) usage.cache_read_input_tokens = row.tokensCacheRead;
    if (row.tokensCacheWrite !== null) usage.cache_creation_input_tokens = row.tokensCacheWrite;
    add("langfuse.observation.usage_details", JSON.stringify(usage));
    add("langfuse.observation.input", input);
    add("langfuse.observation.output", output);
    add("langfuse.observation.level", error ? "ERROR" : "DEFAULT");
    add("langfuse.observation.status_message", message);
    if (row.ttftMs !== null && row.ttftMs >= 0 && row.ttftMs <= duration)
      add(
        "langfuse.observation.completion_start_time",
        new Date(endMs - duration + row.ttftMs).toISOString()
      );
    add("langfuse.session.id", row.sessionTag);
    if (config.identity === "keyName") add("langfuse.user.id", row.apiKeyName);
    if (config.identity === "pseudonymous" && row.apiKeyId) {
      if (!config.identitySalt)
        throw new Error("OTLP pseudonymous identity requires a stored destination salt");
      add(
        "langfuse.user.id",
        createHmac("sha256", Buffer.from(config.identitySalt, "hex"))
          .update(row.apiKeyId)
          .digest("hex")
      );
    }
    add("langfuse.trace.name", row.path);
    add("langfuse.environment", config.environment || undefined);
    for (const [key, value] of Object.entries({
      provider: row.provider,
      requested_model: row.requestedModel,
      path: row.path,
      combo: row.comboName,
      cache_source: row.cacheSource,
      status: row.status,
    }))
      add(`langfuse.observation.metadata.${key}`, value);
  }
  return {
    traceId: createHash("sha256")
      .update("omniroute.trace\0" + row.id)
      .digest("hex")
      .slice(0, 32),
    spanId: createHash("sha256")
      .update("omniroute.span\0" + row.id)
      .digest("hex")
      .slice(0, 16),
    name: row.path ?? "chat",
    kind: 3,
    startTimeUnixNano: startNs.toString(),
    endTimeUnixNano: endNs.toString(),
    attributes,
    status: error ? { code: 2, ...(message ? { message } : {}) } : { code: 1 },
  };
}

function envelope(spans: Span[], config: OtlpHttpConfig) {
  return {
    resourceSpans: [
      {
        resource: {
          attributes: [
            { key: "service.name", value: { stringValue: config.serviceName } },
            { key: "service.version", value: { stringValue: version } },
          ],
        },
        scopeSpans: [{ scope: { name: "omniroute.log-export" }, spans }],
      },
    ],
  };
}
export function buildOtlpPayload(records: readonly LogExportRecord[], config: OtlpHttpConfig) {
  return envelope(
    records
      .filter((r) => r.path !== null && config.paths.includes(r.path))
      .map((r) => toSpan(r, config)),
    config
  );
}

/** Bound acknowledgement reads; non-2xx bodies are cancelled without reading text. */
async function responseText(response: Response): Promise<{ text: string; truncated: boolean }> {
  const reader = response.body?.getReader();
  if (!reader) return { text: "", truncated: false };
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let truncated = false;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      if (bytes + next.value.length > 65536) {
        chunks.push(next.value.subarray(0, 65536 - bytes));
        truncated = true;
        break;
      }
      chunks.push(next.value);
      bytes += next.value.length;
    }
  } finally {
    await reader.cancel();
  }
  return { text: Buffer.concat(chunks).toString("utf8"), truncated };
}

const acknowledgementSchema = z.object({
  partialSuccess: z
    .object({
      rejectedSpans: z
        .union([z.string().regex(/^\d+$/), z.number().int().nonnegative()])
        .optional(),
    })
    .optional(),
});

/** Empty 2xx responses are supported; explicit OTLP partial rejection must not move the cursor. */
function acknowledgementFailure(
  text: string,
  truncated: boolean,
  spanCount: number
): string | null {
  if (truncated) return "OTLP/HTTP acknowledgement exceeds the response size limit";
  if (!text.trim()) return null;
  try {
    const result = acknowledgementSchema.safeParse(JSON.parse(text));
    if (!result.success) return "OTLP/HTTP invalid acknowledgement";
    const rejected = BigInt(result.data.partialSuccess?.rejectedSpans ?? 0);
    if (rejected <= 0n) return null;
    return `OTLP/HTTP collector reported partial success (${spanCount} spans not acknowledged)`;
  } catch {
    return "OTLP/HTTP invalid acknowledgement";
  }
}

function createClient(config: OtlpHttpConfig) {
  const endpoint = parseAndValidateNonMetadataUrl(config.endpoint).href;
  const headers = new Headers(parseOtlpHeaders(config.headers));
  headers.set("Content-Type", "application/json");
  if (config.langfuseMapping) headers.set("x-langfuse-ingestion-version", "4");
  else headers.delete("x-langfuse-ingestion-version");
  async function post(body: string, spanCount: number): Promise<number> {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      let retryMs = 250 * 2 ** attempt;
      let failure: Error;
      let retryable = true;
      const signal = AbortSignal.timeout(config.timeoutMs);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers,
          body,
          signal,
          redirect: "manual",
        });
        if (response.ok) {
          const responseBody = await responseText(response);
          const rejected = acknowledgementFailure(
            responseBody.text,
            responseBody.truncated,
            spanCount
          );
          if (!rejected) return response.status;
          retryable = false;
          failure = new Error(rejected);
        } else {
          retryable = response.status === 408 || response.status === 429 || response.status >= 500;
          const after = response.headers.get("Retry-After");
          if (after) {
            const seconds = Number(after);
            const parsed = Number.isFinite(seconds)
              ? seconds * 1000
              : Date.parse(after) - Date.now();
            if (Number.isFinite(parsed))
              retryMs = Math.min(RETRY_AFTER_CAP_MS, Math.max(retryMs, parsed));
          }
          // Discard collector text without decoding or copying it into any error surface.
          try {
            await response.body?.cancel();
          } catch {
            // Best-effort cleanup: a closed/aborted body cannot change the HTTP failure.
          }
          failure = new Error(
            `OTLP/HTTP ${retryable ? "retryable" : "permanent"} status ${response.status} (${attempt + 1} ${attempt === 0 ? "attempt" : "attempts"}, ${spanCount} spans not acknowledged)`
          );
        }
      } catch {
        // Never include fetch's error/cause, URL or request headers in errors crossing IPC.
        failure = new Error(
          signal.aborted ? "OTLP/HTTP request timed out" : "OTLP/HTTP network request failed"
        );
      }
      if (!retryable || attempt === MAX_ATTEMPTS - 1) throw failure;
      await delay(retryMs);
    }
    throw new Error("OTLP/HTTP retry limit reached");
  }
  return {
    async test() {
      try {
        const status = await post('{"resourceSpans":[]}', 0);
        return {
          ok: true,
          detail: `OTLP/HTTP status ${status}`,
        };
      } catch (error) {
        // post() emits only exporter-owned messages, never collector response text.
        return { ok: false, detail: safeExportError(error) };
      }
    },
    async prepare() {}, // Collector/backend owns storage; there is nothing to provision.
    async send(records: readonly LogExportRecord[]) {
      let chunk: Span[] = [];
      const envelopeBytes = Buffer.byteLength(JSON.stringify(envelope([], config)));
      let bytes = envelopeBytes;
      const flush = async () => {
        if (chunk.length) await post(JSON.stringify(envelope(chunk, config)), chunk.length);
        chunk = [];
        bytes = envelopeBytes;
      };
      // Preflight the entire cursor batch before any HTTP side effect. Keep only row
      // references and sizes, not span objects or a second serialized copy of bodies.
      // Each transient span/JSON is discarded; the send pass rebuilds one bounded chunk.
      const allowed: { row: LogExportRecord; spanBytes: number }[] = [];
      for (const row of records) {
        if (row.path === null || !config.paths.includes(row.path)) continue;
        const spanBytes = Buffer.byteLength(JSON.stringify(toSpan(row, config)));
        if (envelopeBytes + spanBytes > OTLP_MAX_REQUEST_BYTES)
          throw new Error("OTLP span exceeds the request size limit; reduce maxBodyBytes");
        allowed.push({ row, spanBytes });
      }
      for (const { row, spanBytes } of allowed) {
        if (
          chunk.length >= MAX_SPANS_PER_REQUEST ||
          bytes + spanBytes + (chunk.length ? 1 : 0) > OTLP_MAX_REQUEST_BYTES
        )
          await flush();
        bytes += spanBytes + (chunk.length ? 1 : 0);
        chunk.push(toSpan(row, config));
      }
      await flush();
    },
  };
}

export const otlpHttpDestination: LogExportDestinationType<OtlpHttpConfig> = {
  id: "otlp-http",
  labelFallback: "OTLP/HTTP traces",
  descriptionFallback: "Call logs to an OpenTelemetry backend, optionally mapped to Langfuse.",
  secretFields: ["headers", "identitySalt"],
  configSchema: otlpHttpConfigSchema,
  initializeConfig: (config) => ({
    ...config,
    identitySalt: config.identitySalt ?? randomBytes(32).toString("hex"),
  }),
  fields: [
    {
      key: "endpoint",
      labelFallback: "Traces endpoint URL",
      type: "text",
      required: true,
      placeholder: "https://host/api/public/otel/v1/traces",
    },
    {
      key: "headers",
      labelFallback: "HTTP headers",
      type: "textarea",
      secret: true,
      helpFallback: "Name: value lines or JSON. Encrypted at rest; never returned.",
    },
    { key: "serviceName", labelFallback: "Service name", type: "text", defaultValue: "omniroute" },
    {
      key: "langfuseMapping",
      labelFallback: "Langfuse attribute mapping",
      type: "boolean",
      defaultValue: false,
    },
    {
      key: "identity",
      labelFallback: "User identity",
      type: "select",
      defaultValue: "pseudonymous",
      options: [
        { value: "pseudonymous", labelFallback: "Pseudonymous (HMAC)" },
        { value: "keyName", labelFallback: "API key name" },
        { value: "none", labelFallback: "None" },
      ],
    },
    {
      key: "paths",
      labelFallback: "Allowed request paths",
      type: "textarea",
      defaultValue: DEFAULT_PATHS.join("\n"),
      helpFallback: "Exact paths, one per line or comma-separated. Other rows are skipped.",
    },
    {
      key: "timeoutMs",
      labelFallback: "Request timeout (ms)",
      type: "number",
      defaultValue: 30000,
    },
    { key: "environment", labelFallback: "Langfuse environment (optional)", type: "text" },
  ],
  createClient,
};
