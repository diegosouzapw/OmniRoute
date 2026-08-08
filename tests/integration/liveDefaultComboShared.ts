/**
 * tests/integration/liveDefaultComboShared.ts
 *
 * Shared utilities for the general "default combo" live workload test.
 * Unlike liveGeminiShared.ts (which provisions its own narrow 2-model
 * Gemini-only combo when "default" doesn't already exist), this reads the
 * REAL "default" combo currently configured on the target instance directly
 * from its own DB (src/lib/db/combos.ts — never raw SQL, per AGENTS.md) and
 * exercises every provider/model step in it directly, bypassing combo
 * routing, so live-test coverage always matches whatever the operator
 * actually has configured instead of a hardcoded snapshot that goes stale
 * the moment the combo changes.
 */
import {
  API_KEY,
  BASE_URL,
  readSSEStream,
  readResponsesSSEStream,
  genSystemMessage,
  genUserMessage,
  type Message,
} from "./liveGeminiShared.ts";

export { API_KEY, BASE_URL };

export const skip = !API_KEY ? "OMNIROUTE_API_KEY not set — skipping live test" : undefined;

export interface ComboModelTarget {
  model: string;
  providerId: string | null;
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

// Bootstrap seed used ONLY when the target instance has no "default" combo
// at all — mirrors liveGeminiShared.ts's own DEFAULT_COMBO_CONFIG fallback,
// generalized to the real multi-provider spread confirmed live against this
// operator's own production "default" combo (5 providers, 18 models) rather
// than Gemini alone. This is a creation fallback only: whenever a "default"
// combo already exists on the target instance, its actual live config is
// always what gets read and tested — this list never overrides it.
const FALLBACK_COMBO_MODELS: { model: string; providerId: string }[] = [
  { model: "opencode/big-pickle", providerId: "opencode" },
  { model: "opencode/mimo-v2.5-free", providerId: "opencode" },
  { model: "opencode/laguna-s-2.1-free", providerId: "opencode" },
  { model: "openrouter/cohere/north-mini-code:free", providerId: "openrouter" },
  { model: "openrouter/poolside/laguna-m.1:free", providerId: "openrouter" },
  { model: "openrouter/nvidia/nemotron-3-ultra-550b-a55b:free", providerId: "openrouter" },
  { model: "openrouter/nvidia/nemotron-3-super-120b-a12b:free", providerId: "openrouter" },
  { model: "openrouter/nvidia/nemotron-3-nano-30b-a3b:free", providerId: "openrouter" },
  { model: "openrouter/google/gemma-4-26b-a4b-it:free", providerId: "openrouter" },
  { model: "openrouter/google/gemma-4-31b-it:free", providerId: "openrouter" },
  { model: "openrouter/poolside/laguna-s-2.1:free", providerId: "openrouter" },
  { model: "gemini/gemini-3.1-flash-lite", providerId: "gemini" },
  { model: "gemini/gemma-4-31b-it", providerId: "gemini" },
  { model: "gemini/gemma-4-26b-a4b-it", providerId: "gemini" },
  { model: "mistral/mistral-large-latest", providerId: "mistral" },
  { model: "cerebras/gemma-4-31b", providerId: "cerebras" },
  { model: "cerebras/zai-glm-4.7", providerId: "cerebras" },
  { model: "cerebras/gpt-oss-120b", providerId: "cerebras" },
];

async function ensureDefaultComboExists(
  getComboByName: (name: string) => Promise<Record<string, unknown> | null>
): Promise<void> {
  const existing = await getComboByName("default");
  if (existing) return;

  console.log(`  [setup] no "default" combo on this instance — creating fallback seed combo`);
  const { createCombo } = await import("../../src/lib/db/combos.ts");
  await createCombo({
    name: "default",
    strategy: "priority",
    models: FALLBACK_COMBO_MODELS.map((m, i) => ({
      kind: "model" as const,
      model: m.model,
      providerId: m.providerId,
      weight: 1,
      id: `fallback-${i}`,
    })),
  });
}

// Read the live "default" combo's model steps straight from the DB module —
// intentionally not hardcoded, so this always reflects whatever the operator
// currently has configured on the target instance. Creates a fallback seed
// combo first if none exists at all (see ensureDefaultComboExists above).
export async function getDefaultComboModelTargets(): Promise<ComboModelTarget[]> {
  const { getComboByName } = await import("../../src/lib/db/combos.ts");
  await ensureDefaultComboExists(getComboByName);
  const combo = (await getComboByName("default")) as Record<string, unknown> | null;
  const models =
    combo && Array.isArray(combo.models) ? (combo.models as Record<string, unknown>[]) : [];

  const targets: ComboModelTarget[] = [];
  for (const step of models) {
    if (step.kind !== "model" || typeof step.model !== "string") continue;
    targets.push({
      model: step.model,
      providerId: typeof step.providerId === "string" ? step.providerId : null,
    });
  }
  return targets;
}

// Skip (never fail) any model whose provider connection isn't currently
// active — this suite's job is breadth across the real combo, not blocking
// the whole run on one unrelated provider outage. baseUrl/apiKey default to
// the module-level omniroute-beta target but can be overridden (see
// sendModelRequest — same rationale, used by the wire-capture suite's
// dedicated container).
export async function filterActiveModelTargets(
  targets: ComboModelTarget[],
  options: SendModelRequestOptions = {}
): Promise<{ active: ComboModelTarget[]; skipped: string[] }> {
  const baseUrl = options.baseUrl ?? BASE_URL;
  const apiKey = options.apiKey ?? API_KEY;
  const res = await fetch(`${baseUrl}/api/providers`, {
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  });
  if (!res.ok) return { active: targets, skipped: [] };

  const data = await res.json();
  const connections = (data.connections || data) as Record<string, unknown>[];
  // Terminal states (never self-heal — see AGENTS.md "Resilience Runtime
  // State" → Connection Cooldown) plus "unavailable" (active cooldown) are
  // the only statuses worth pre-filtering; everything else (including
  // transient/lazily-recovered cooldowns that have already expired) is left
  // for the request itself to prove out.
  const DEAD_STATUSES = new Set(["expired", "unavailable", "banned", "credits_exhausted"]);
  const activeProviders = new Set(
    connections
      .filter((c) => c.isActive && !DEAD_STATUSES.has(c.testStatus as string))
      .map((c) => c.provider as string)
  );

  const active: ComboModelTarget[] = [];
  const skipped: string[] = [];
  for (const t of targets) {
    if (!t.providerId || activeProviders.has(t.providerId)) {
      active.push(t);
    } else {
      skipped.push(`${t.model} (provider "${t.providerId}" not active)`);
    }
  }
  return { active, skipped };
}

function ts(): string {
  return new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm
}

export interface ModelRequestResult {
  model: string;
  status: number;
  duration: number;
  tokens: number;
  contentLength: number;
  correlationId: string;
  error?: string;
}

export interface SendModelRequestOptions {
  baseUrl?: string;
  apiKey?: string;
}

// Deliberately lighter than liveGeminiShared's sendAndValidate (no retry
// loop, one fixed prompt pair): this suite's job is breadth across every
// model in the real combo, not depth on any single provider. baseUrl/apiKey
// default to the module-level omniroute-beta target but can be overridden —
// e.g. by the wire-capture suite, which points requests at its own
// dedicated throwaway container instead (see liveContainerHarness.ts).
export async function sendModelRequest(
  model: string,
  stream: boolean,
  apiFormat: "chat" | "responses" = "chat",
  options: SendModelRequestOptions = {}
): Promise<ModelRequestResult> {
  const baseUrl = options.baseUrl ?? BASE_URL;
  const apiKey = options.apiKey ?? API_KEY;
  const endpoint = apiFormat === "responses" ? "/v1/responses" : "/v1/chat/completions";
  const messages: Message[] = [genSystemMessage(), genUserMessage()];
  const body =
    apiFormat === "responses"
      ? { model, input: messages, stream, max_output_tokens: 1024, temperature: 0.3 }
      : { model, messages, stream, max_tokens: 1024, temperature: 0.3 };

  const controller = new AbortController();
  const timeoutMs = Number(process.env.TEST_REQUEST_TIMEOUT_MS) || 120_000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const start = performance.now();

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const duration = performance.now() - start;
    clearTimeout(timeout);
    const correlationId = response.headers.get("x-correlation-id") || "?";

    let content = "";
    let totalTokens = 0;

    if (response.status === 200) {
      if (stream) {
        const streamResult =
          apiFormat === "responses"
            ? await readResponsesSSEStream(response)
            : await readSSEStream(response);
        content = streamResult.fullContent;
        totalTokens = streamResult.totalTokens;
      } else if (apiFormat === "responses") {
        const json = await response.json().catch(() => ({}));
        const textItem = json?.output?.find((o: Record<string, unknown>) => o.type === "message");
        content = textItem?.content?.[0]?.text || "";
        totalTokens = json?.usage?.total_tokens || 0;
      } else {
        const json = await response.json().catch(() => ({}));
        content = json?.choices?.[0]?.message?.content || "";
        totalTokens = json?.usage?.total_tokens || 0;
      }
    }

    console.log(
      `${ts()} ${model.padEnd(40)} HTTP ${response.status} | ` +
        `${Math.round(duration).toString().padStart(6)}ms | ` +
        `${String(totalTokens).padStart(5)} tok | ` +
        `${content.length} chars | cid: ${correlationId}`
    );

    return {
      model,
      status: response.status,
      duration,
      tokens: totalTokens,
      contentLength: content.length,
      correlationId,
    };
  } catch (err) {
    clearTimeout(timeout);
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.log(`${ts()} ${model.padEnd(40)} FAILED: ${errorMessage}`);
    return {
      model,
      status: 0,
      duration: performance.now() - start,
      tokens: 0,
      contentLength: 0,
      correlationId: "?",
      error: errorMessage,
    };
  }
}
