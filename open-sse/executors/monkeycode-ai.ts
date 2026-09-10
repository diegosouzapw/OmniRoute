/**
 * MonkeyCode AI Executor — OpenAI-compatible gateway at proxy.monkeycode-ai.net
 * driven by the ohmyagent CLI (chaitin/MonkeyCode `agent` submodule, captured
 * client version `ohmyagent f6b21ad`).
 *
 * Auth is two-part:
 *   1. `Authorization: Bearer <oma_…>` — the per-model API key stored on the
 *      connection as usual.
 *   2. `X-OhMyAgent-Signature: v1=<hex>` — HMAC-SHA256 over the FIRST system
 *      message text, keyed by the account signing secret (`omas_…`). Verified
 *      empirically against the live gateway:
 *        - signature over the raw body / model id / api key / timestamp → 403
 *        - signature over first-system-text → 200 (chat, tools, follow-ups,
 *          streaming); multi-system bodies sign the first entry only; a body
 *          with no system message is rejected, so one is injected.
 *
 * The signing secret is per-connection configuration, passed through
 * `providerSpecificData.signingSecret` (same pattern as mimocode's
 * fingerprints/accountProxies). Everything else rides the shared BaseExecutor
 * pipeline (retries, logging, SSE passthrough), so tool_calls stream back to
 * agentic harnesses natively — unlike the old localhost CLI-spawning bridge.
 */

import * as crypto from "node:crypto";
import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorExecuteResult,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";

/** Connection PSD key carrying the `omas_…` signing secret. */
export const SIGNING_SECRET_PSD_KEY = "signingSecret";

/** Transient PSD key carrying the precomputed request signature to buildHeaders. */
const SIGNATURE_PSD_KEY = "__monkeycodeAiSignature";

/** Injected when the caller sends no system message — the gateway 403s without one. */
export const DEFAULT_SYSTEM_TEXT = "You are a helpful assistant.";

/** Captured ohmyagent client version; the gateway + Cloudflare gate on it. */
const DEFAULT_USER_AGENT = "ohmyagent f6b21ad";

const CHAT_PATH = "/chat/completions";

const COOLDOWN_BASE_MS = 30_000;
const COOLDOWN_MAX_MS = 30 * 60_000;

/**
 * Fallback preference when the requested model is unavailable on the key.
 * Verified live 2026-09-09: only `qwen3.8-flash` answers on a free key —
 * two basic ids are retired upstream (404) and pro/ultra are plan-gated
 * (403). Keys with wider entitlements serve the later entries directly, so
 * the requested model is always tried first.
 */
const FALLBACK_PREFERENCE = [
  "monkeycode-basic/qwen3.8-flash",
  "monkeycode-basic/deepseek-v4-flash",
  "monkeycode-basic/qwen3.5-plus",
  "monkeycode-pro/deepseek-v4-pro",
  "monkeycode-pro/glm-5.2",
  "monkeycode-pro/grok-4.6",
  "monkeycode-ultra/gpt-5.5",
  "monkeycode-ultra/gpt-5.6-sol",
];

interface ModelCooldown {
  until: number;
  fails: number;
}

/** Per-model cooldowns (module-level, like deepseek-web's tokenCache): a 403
 *  (plan-gated) or 404 (retired) is deterministic per key, so a dead model is
 *  skipped for a while instead of being re-tried — and failed over from — on
 *  every request (mimocode markCooldown pattern). */
const modelCooldowns = new Map<string, ModelCooldown>();

/** Test-only reset for the module-level cooldown map. */
export function __resetModelCooldownsForTests(): void {
  modelCooldowns.clear();
}

function isModelCool(model: string): boolean {
  return (modelCooldowns.get(model)?.until ?? 0) > Date.now();
}

function markModelCooldown(model: string): void {
  const prev = modelCooldowns.get(model);
  const fails = (prev?.fails ?? 0) + 1;
  const backoff = Math.min(COOLDOWN_BASE_MS * 2 ** (fails - 1), COOLDOWN_MAX_MS);
  modelCooldowns.set(model, { until: Date.now() + backoff, fails });
}

function markModelSuccess(model: string): void {
  modelCooldowns.delete(model);
}

/**
 * Candidate chain for one execute(): the requested model first, then the
 * catalog preference minus requested, skipping cooled-down models (antigravity
 * proFallbackChain pattern). When every model is cooling, the requested model
 * is still tried — failing closed with its real status beats a synthetic error.
 */
export function buildCandidateChain(requested: string): string[] {
  const bare = rewriteModelName(requested);
  const chain = [bare];
  for (const candidate of FALLBACK_PREFERENCE) {
    if (candidate !== bare) chain.push(candidate);
  }
  const fresh = chain.filter((m) => !isModelCool(m));
  return fresh.length > 0 ? fresh : [bare];
}

/** Model-availability statuses worth failing over: 403 plan-gated, 404 retired.
 *  Any other 400 is a malformed request that would fail identically on every
 *  model (mimocode #2101) — surface it. 429/5xx ride the shared retry path. */
function isAvailabilityStatus(status: number): boolean {
  return status === 403 || status === 404;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Sanitize one chat message/delta holder in place. Returns true when changed. */
function stripMessageAnsi(holder: unknown): boolean {
  const record = asRecord(holder);
  if (!record) return false;
  let changed = false;
  for (const key of ["content", "reasoning_content"]) {
    if (typeof record[key] === "string") {
      const clean = stripAnsi(record[key] as string);
      if (clean !== record[key]) {
        record[key] = clean;
        changed = true;
      }
    }
  }
  return changed;
}

function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter(
        (p) => p != null && typeof p === "object" && (p as { type?: unknown }).type === "text"
      )
      .map((p) => String((p as { text?: unknown }).text ?? ""))
      .join("");
  }
  return "";
}

/** First non-empty system message text, or null when there is none. */
export function extractSystemText(messages: unknown): string | null {
  if (!Array.isArray(messages)) return null;
  for (const m of messages) {
    const record = asRecord(m);
    if (!record || record.role !== "system") continue;
    const text = messageText(record.content);
    if (text) return text;
  }
  return null;
}

/** HMAC-SHA256 signature value for the gateway's X-OhMyAgent-Signature header. */
export function signSystemText(signingSecret: string, systemText: string): string {
  return `v1=${crypto.createHmac("sha256", signingSecret).update(systemText, "utf8").digest("hex")}`;
}

/**
 * Strip ANSI terminal sequences (SGR colors, cursor moves). The gateway family
 * (ohmyagent CLI heritage) wraps chain-of-thought in `\x1b[2m…\x1b[0m` and the
 * old localhost bridge scraped that stdout straight into `content` — clients
 * rendered raw `[2m` + mojibake. Byte-safe: ESC (0x1B) never occurs inside a
 * valid UTF-8 multibyte sequence, and `\u001b` JSON escapes are backslash
 * ASCII, so raw-sequence removal cannot corrupt text.
 */
export function stripAnsi(text: string): string {
  return text.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}

/**
 * Strip the OmniRoute `provider/` prefix — upstream ids are already namespaced
 * as `tier/model` (e.g. `monkeycode-basic/qwen3.8-flash`), so only the first
 * segment is dropped and bare two-segment ids pass through untouched.
 */
export function rewriteModelName(model: string): string {
  const parts = model.split("/");
  return parts.length > 2 ? parts.slice(1).join("/") : model;
}

function errorResult(status: number, message: string, url: string): ExecutorExecuteResult {
  const body = buildErrorBody(status, sanitizeErrorMessage(message));
  return {
    response: new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
    url,
    headers: {},
    transformedBody: null,
  };
}

export class MonkeyCodeAiExecutor extends BaseExecutor {
  constructor(provider = "monkeycode-ai") {
    super(provider, PROVIDERS[provider]);
  }

  /**
   * Remove ANSI sequences from a successful response so terminal formatting
   * from the gateway family never reaches chat clients (the `[2m…[0m` +
   * mojibake in the issue screenshot). Streaming bodies are re-encoded through
   * TextDecoder/EncoderStream so multibyte characters split across chunks stay
   * intact; JSON bodies are parsed, cleaned, and rebuilt with status preserved.
   */
  private async sanitizeResult(result: ExecutorExecuteResult): Promise<ExecutorExecuteResult> {
    const response = (result as { response?: Response }).response;
    if (!response || !response.ok || !response.body) return result;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/event-stream")) {
      let carry = "";
      const strip = new TransformStream<string, string>({
        transform(chunk, controller) {
          const text = carry + chunk;
          const partial = text.match(/\x1b(\[[0-9;?]*[ -/]*)?$/);
          const body = partial && partial.index !== undefined ? text.slice(0, partial.index) : text;
          carry = partial && partial.index !== undefined ? text.slice(partial.index) : "";
          controller.enqueue(stripAnsi(body));
        },
        flush(controller) {
          controller.enqueue(stripAnsi(carry.replace(/\x1b[\s\S]*$/, "")));
          carry = "";
        },
      });
      const stream = response.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(strip)
        .pipeThrough(new TextEncoderStream());
      return {
        ...(result as Record<string, unknown>),
        response: new Response(stream, { status: response.status, headers: response.headers }),
      } as ExecutorExecuteResult;
    }
    if (!contentType.includes("application/json")) return result;
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return result;
    }
    const choices = asRecord(payload)?.choices;
    if (Array.isArray(choices)) {
      for (const choice of choices) {
        const record = asRecord(choice);
        if (!record) continue;
        stripMessageAnsi(record.message);
        stripMessageAnsi(record.delta);
      }
    }
    return {
      ...(result as Record<string, unknown>),
      response: new Response(JSON.stringify(payload), {
        status: response.status,
        headers: response.headers,
      }),
    } as ExecutorExecuteResult;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials?: ProviderCredentials | null
  ): string {
    const override = credentials?.providerSpecificData?.baseUrl;
    if (typeof override === "string" && override) {
      const normalized = override.replace(/\/$/, "");
      return normalized.endsWith(CHAT_PATH) ? normalized : `${normalized}${CHAT_PATH}`;
    }
    const baseUrls = this.getBaseUrls();
    return baseUrls[0] || "";
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string
  ): Record<string, string> {
    const headers = super.buildHeaders(credentials, stream, clientHeaders, model);
    const signature = (credentials?.providerSpecificData as Record<string, unknown> | undefined)?.[
      SIGNATURE_PSD_KEY
    ];
    if (typeof signature === "string" && signature) {
      headers["X-OhMyAgent-Signature"] = signature;
    }
    if (!process.env.MONKEYCODE_AI_USER_AGENT) {
      headers["User-Agent"] = DEFAULT_USER_AGENT;
    }
    return headers;
  }

  /**
   * Normalize the outgoing body: bare upstream model id + guaranteed first
   * system message (injected when absent — the gateway 403s system-less
   * requests). Idempotent.
   */
  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const cleaned = super.transformRequest(model, body, stream, credentials);
    const record = asRecord(cleaned);
    if (!record) return cleaned;
    const out: Record<string, unknown> = { ...record };
    const rawModel = typeof out.model === "string" ? out.model : model;
    out.model = rewriteModelName(rawModel);
    // Verified live 2026-09-09: the gateway 502s (Cloudflare HTML page) on any
    // `stop` sequence while temperature/max_tokens are accepted. The DeepSeek
    // harness omits `stop` unless set, but strip defensively — a 502 HTML page
    // would otherwise surface as an opaque failure.
    delete out.stop;
    const messages = Array.isArray(out.messages) ? [...out.messages] : null;
    if (!messages) return out;
    if (extractSystemText(messages) === null) {
      out.messages = [{ role: "system", content: DEFAULT_SYSTEM_TEXT }, ...messages];
    }
    return out;
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    if (input.signal?.aborted) {
      return errorResult(
        499,
        "monkeycode-ai: request aborted",
        this.buildUrl(input.model, input.stream !== false, 0, input.credentials)
      );
    }
    const stream = input.stream !== false;
    const url = this.buildUrl(input.model, stream, 0, input.credentials);
    const psd = (input.credentials?.providerSpecificData ?? {}) as Record<string, unknown>;
    const signingSecret = psd[SIGNING_SECRET_PSD_KEY];
    if (typeof signingSecret !== "string" || !signingSecret) {
      return errorResult(
        400,
        "monkeycode-ai: missing signing secret — set providerSpecificData.signingSecret (omas_…) on the connection",
        url
      );
    }

    // BaseExecutor builds headers BEFORE transformRequest, so the signature is
    // precomputed here over the normalized body and handed to buildHeaders via
    // a transient PSD key (never persisted — cloned credentials object). The
    // signature covers the system text, not the model, so one signature serves
    // every fallback candidate below.
    const normalized = asRecord(
      this.transformRequest(input.model, input.body, stream, input.credentials)
    );
    if (!normalized || !Array.isArray(normalized.messages)) {
      return errorResult(400, "monkeycode-ai: request body must include a messages array", url);
    }
    const systemText = extractSystemText(normalized.messages) ?? DEFAULT_SYSTEM_TEXT;
    const credentials: ProviderCredentials = {
      ...input.credentials,
      providerSpecificData: {
        ...psd,
        [SIGNATURE_PSD_KEY]: signSystemText(signingSecret, systemText),
      },
    };

    // Availability fallback (antigravity proFallbackChain pattern): the
    // requested model first, then catalog preference. A 403/404 marks that
    // model cooling and rotates; anything else returns immediately so a
    // malformed 400 or rate-limit 429 is never disguised as another model.
    const log = input.log;
    let firstResult: ExecutorExecuteResult | null = null;
    const chain = buildCandidateChain(input.model);
    for (let i = 0; i < chain.length; i++) {
      const candidate = chain[i];
      const candidateBody = { ...normalized, model: candidate };
      const result = await super.execute({ ...input, body: candidateBody, credentials });
      const response = (result as { response?: Response }).response;
      const status = response?.status;
      if (status === undefined || !isAvailabilityStatus(status)) {
        if (status === 200) markModelSuccess(candidate);
        return this.sanitizeResult(result);
      }
      markModelCooldown(candidate);
      log?.warn?.("MONKEYCODE-AI", `Model "${candidate}" unavailable (${status}), trying next…`);
      if (!firstResult) {
        // Kept byte-intact: surfaced as-is if the chain exhausts
        // (antigravity proFallbackChain precedent).
        firstResult = result;
      } else {
        await response?.text?.().catch(() => {});
      }
    }
    const exhausted = firstResult ?? errorResult(502, "monkeycode-ai: all models unavailable", url);
    return this.sanitizeResult(exhausted);
  }

  async testConnection(
    credentials: ProviderCredentials,
    signal?: AbortSignal | null,
    log?: ExecuteInput["log"]
  ): Promise<boolean> {
    try {
      const psd = (credentials?.providerSpecificData ?? {}) as Record<string, unknown>;
      if (typeof psd[SIGNING_SECRET_PSD_KEY] !== "string" || !psd[SIGNING_SECRET_PSD_KEY])
        return false;
      const result = (await this.execute({
        model: "monkeycode-basic/qwen3.8-flash",
        body: {
          messages: [
            { role: "system", content: DEFAULT_SYSTEM_TEXT },
            { role: "user", content: "ping" },
          ],
          stream: false,
        },
        stream: false,
        signal: signal ?? null,
        credentials,
        log: log ?? { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      })) as { response: Response };
      return result.response.status === 200;
    } catch {
      return false;
    }
  }
}

export default MonkeyCodeAiExecutor;
