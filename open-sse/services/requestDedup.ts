/**
 * Request Deduplication Service
 *
 * Deduplicates **concurrent** identical requests to the same upstream.
 * Inspired by ClawRouter's dedup.ts (BlockRunAI / github.com/BlockRunAI/ClawRouter).
 *
 * IMPORTANT: In-memory only — does NOT persist across restarts and does NOT
 * work across multiple process instances (no cross-instance dedup).
 */

import { createHash } from "node:crypto";

const MAX_INFLIGHT = 1000;

export interface DedupConfig {
  enabled: boolean;
  maxTemperatureForDedup: number;
  timeoutMs: number;
}

export const DEFAULT_DEDUP_CONFIG: DedupConfig = {
  enabled: true,
  maxTemperatureForDedup: 0.1,
  timeoutMs: 60_000,
};

export interface DedupResult<T> {
  result: T;
  wasDeduplicated: boolean;
  hash: string;
}

const inflight = new Map<string, Promise<unknown>>();

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Extract the prompt-bearing content from a (possibly translated) request body.
 *
 * The prompt content lives under different keys depending on the target
 * provider format the body has already been translated to:
 *   - OpenAI-style bodies (`open-sse/translator/request/*-to-openai.ts`,
 *     `openai-to-cursor.ts`): `messages`
 *   - Gemini-translated bodies (`openai-to-gemini.ts`,
 *     `claude-to-gemini.ts`): `contents`
 *   - Responses-API-translated bodies (`openai-responses/toResponses.ts`):
 *     `input`
 *   - Antigravity-translated bodies (`openai-to-gemini.ts`
 *     `openaiToAntigravityRequest` / `wrapInCloudCodeEnvelope`): nested under
 *     `request.contents` (a Cloud Code envelope wrapper)
 *   - Kiro-translated bodies (`openai-to-kiro.ts` `buildKiroPayload`): nested
 *     under `conversationState.currentMessage.userInputMessage.content` (the
 *     current turn) plus `conversationState.history` (prior turns)
 *
 * Falling back to only `messages` made every non-OpenAI-format body hash the
 * prompt as `null`, colliding different prompts onto the same dedup hash
 * (#10249). The Antigravity/Kiro nesting was still missed by the flat
 * `messages ?? contents ?? input` fallback chain, so different prompts
 * targeting those two providers still collided (#10438).
 */
function extractPromptContent(body: Record<string, unknown>): unknown {
  if (body.messages !== undefined) return body.messages;
  if (body.contents !== undefined) return body.contents;
  if (body.input !== undefined) return body.input;

  // Antigravity Cloud Code envelope: { request: { contents, ... } }
  const request = asRecord(body.request);
  if (request && request.contents !== undefined) {
    return request.contents;
  }

  // Kiro conversationState envelope:
  // { conversationState: { currentMessage: { userInputMessage: { content } }, history } }
  const conversationState = asRecord(body.conversationState);
  if (conversationState) {
    const currentMessage = asRecord(conversationState.currentMessage);
    const userInputMessage = asRecord(currentMessage?.userInputMessage);
    if (userInputMessage || conversationState.history !== undefined) {
      return {
        content: userInputMessage?.content ?? null,
        history: conversationState.history ?? null,
      };
    }
  }

  return null;
}

/**
 * Extract the system/instruction content that shapes generation but is not
 * carried in the message list itself. Two requests with the same user
 * message but a different system prompt must hash differently — omitting
 * this field let them collide.
 *
 *   - Claude-translated bodies (`openai-to-claude.ts`): `system`
 *   - Responses-API-translated bodies (`openai-responses/toResponses.ts`):
 *     `instructions`
 *   - Gemini-translated bodies (`openai-to-gemini.ts`, `claude-to-gemini.ts`):
 *     `systemInstruction`
 *   - Antigravity-translated bodies: nested under `request.systemInstruction`
 *     (note: the client system prompt is folded into `request.contents[0]`
 *     instead per #9030, so this is usually the constant Antigravity
 *     default — it is still included for completeness/future-proofing)
 */
function extractSystemContent(body: Record<string, unknown>): unknown {
  if (body.system !== undefined) return body.system;
  if (body.instructions !== undefined) return body.instructions;
  if (body.systemInstruction !== undefined) return body.systemInstruction;

  const request = asRecord(body.request);
  if (request && request.systemInstruction !== undefined) {
    return request.systemInstruction;
  }

  return null;
}

/**
 * Compute a deterministic hash for a request body.
 * Includes: model, messages/prompt content, system/instructions, temperature,
 * tools, tool_choice, max_tokens, response_format
 * Excludes: stream, user, metadata (don't affect LLM output)
 *
 * `computeRequestHash` is called post-translation (`chatCore.ts`, on
 * `translatedBody`), so the body shape here is whatever the target provider
 * format produced — see `extractPromptContent`/`extractSystemContent` for the
 * full list of shapes this must cover (#10249, #10438).
 *
 * `tenantId` (the calling API key's id) namespaces the hash. Dedup shares ONE
 * upstream call, and therefore one response, between everyone landing on the
 * same hash — so the hash has to answer "who is asking", not just "what is
 * being asked". Without it, two distinct API keys issuing the same request
 * joined the same in-flight promise: the response was produced with the
 * initiator's provider connection, under the initiator's per-key policy
 * (allowedConnections / allowedModels), billed to the initiator, and handed to
 * a different authenticated principal (GHSA-6c7w-56xp-wpc6).
 *
 * It is a PLAINTEXT prefix rather than digest input, matching
 * `semanticCache.generateSignature` (#3740): the id is an internal namespace
 * key, not a credential, and a namespace you can read off the key is worth more
 * than one you cannot when debugging a dedup collision.
 *
 * It does NOT dodge the CodeQL js/insufficient-password-hash false positive,
 * which the #3740 comment claims for its own version and which this comment
 * claimed too until alert #874 was raised on the `createHash` below anyway.
 * Once an API-key-derived value reaches this file at all, the query flags the
 * sibling digest regardless of what actually goes into it. Dismissed per HR#14;
 * expect it to come back on any edit here, and do not "fix" it with a KDF —
 * that would break the determinism dedup depends on.
 *
 * Omitting `tenantId` keeps the un-namespaced hash. Keyless local-first
 * deployments have no tenant boundary to preserve, and every such install would
 * otherwise silently lose dedup.
 */
export function computeRequestHash(
  requestBody: unknown,
  tenantId?: string | null,
  trustedContext?: {
    originModel?: string | null;
    resolvedThinkingEffort?: string | null;
    defaultThinkingEffort?: string | null;
  }
): string {
  const body = requestBody as Record<string, unknown>;
  const canonical = {
    model: body.model ?? null,
    messages: extractPromptContent(body),
    system: extractSystemContent(body),
    temperature: typeof body.temperature === "number" ? body.temperature : 1.0,
    tools: body.tools ?? null,
    tool_choice: body.tool_choice ?? null,
    max_tokens: body.max_tokens ?? null,
    response_format: body.response_format ?? null,
    top_p: body.top_p ?? null,
    frequency_penalty: body.frequency_penalty ?? null,
    presence_penalty: body.presence_penalty ?? null,
    ...(trustedContext === undefined
      ? {}
      : {
          // Read the translated request before attempt constraints can erase intent.
          // JSON omission preserves absent/undefined versus null/false; nested key
          // order follows the same serialization contract as the legacy projection.
          requestIntent: {
            reasoning_effort: body.reasoning_effort,
            reasoning: body.reasoning,
            thinking: body.thinking,
            output_config: body.output_config,
          },
          trustedContext: {
            originModel: trustedContext.originModel ?? null,
            resolvedThinkingEffort: trustedContext.resolvedThinkingEffort ?? null,
            defaultThinkingEffort: trustedContext.defaultThinkingEffort ?? null,
          },
        }),
  };
  const digest = createHash("sha256").update(JSON.stringify(canonical)).digest("hex").slice(0, 16);
  return tenantId ? `${tenantId}.${digest}` : digest;
}

/** Determine whether a request should be deduplicated */
export function shouldDeduplicate(
  requestBody: unknown,
  config: DedupConfig = DEFAULT_DEDUP_CONFIG
): boolean {
  if (!config.enabled) return false;
  const body = requestBody as Record<string, unknown>;
  if (body.stream === true) return false;
  const temperature = typeof body.temperature === "number" ? body.temperature : 1.0;
  if (temperature > config.maxTemperatureForDedup) return false;
  return true;
}

/**
 * Execute a request with deduplication.
 * Concurrent identical requests share one upstream call.
 */
export async function deduplicate<T>(
  hash: string,
  fn: () => Promise<T>,
  config: DedupConfig = DEFAULT_DEDUP_CONFIG
): Promise<DedupResult<T>> {
  if (!config.enabled) {
    return { result: await fn(), wasDeduplicated: false, hash };
  }

  const existing = inflight.get(hash);
  if (existing) {
    const result = (await existing) as T;
    return { result, wasDeduplicated: true, hash };
  }

  if (inflight.size >= MAX_INFLIGHT) {
    const oldestKey = inflight.keys().next().value;
    if (oldestKey !== undefined) inflight.delete(oldestKey);
  }

  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const sharedPromise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  inflight.set(hash, sharedPromise as Promise<unknown>);

  const timer = setTimeout(() => {
    if (inflight.get(hash) === sharedPromise) inflight.delete(hash);
  }, config.timeoutMs);

  try {
    const result = await fn();
    resolve(result);
    return { result, wasDeduplicated: false, hash };
  } catch (err) {
    reject(err);
    throw err;
  } finally {
    clearTimeout(timer);
    if (inflight.get(hash) === sharedPromise) inflight.delete(hash);
  }
}

export function getInflightCount(): number {
  return inflight.size;
}
export function getInflightHashes(): string[] {
  return [...inflight.keys()];
}
export function clearInflight(): void {
  inflight.clear();
}
