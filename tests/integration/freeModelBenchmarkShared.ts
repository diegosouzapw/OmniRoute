/**
 * tests/integration/freeModelBenchmarkShared.ts
 *
 * Shared helpers for the free-model workload benchmark. Reuses the request
 * generators, SSE parsers, and BASE_URL/API_KEY plumbing already built for
 * the live Gemini workload tests (liveGeminiShared.ts) instead of
 * duplicating them — those helpers are already provider-agnostic (they just
 * happened to only ever be called with the Gemini "default" combo model).
 *
 * Unlike sendAndValidate() in liveGeminiShared.ts, benchmarkRequest() never
 * throws/asserts on a single request failure — a free-tier model timing out
 * or 429ing is an expected, recordable data point for a benchmark, not a
 * regression. Per-model reliability is the thing being measured here.
 */
import {
  API_KEY,
  BASE_URL,
  CASE_BUILDERS,
  genHugeContextMessage,
  readResponsesSSEStream,
  readSSEStream,
  type Message,
} from "./liveGeminiShared.ts";

export interface FreeModelSpec {
  /** OmniRoute provider id, matching provider_connections.provider */
  provider: string;
  /** Full "provider/modelId" string sent as the `model` field */
  model: string;
  displayName: string;
}

// Providers resolved directly from the static NOAUTH_PROVIDERS registry
// (src/shared/constants/providers/noauth.ts) — no provider_connections row
// exists or is needed for these (see src/sse/services/auth.ts's noAuth
// resolution path). getActiveProviders() only sees configured *connections*,
// so these have to be unioned in separately or every no-auth model gets
// filtered out as "not active" even though they work with zero setup.
export const NO_AUTH_PROVIDER_IDS = new Set(["felo-web", "aihorde", "opencode", "duckduckgo-web"]);

// Curated from open-sse/config/freeModelCatalog.data.ts: the original 5
// providers configured+active on this deployment (checked via GET
// /api/providers — see getActiveProviders()), PLUS the no-auth providers
// above, which needed no configuration at all — they were just never
// exercised. duckduckgo-web is kept in despite being currently broken
// upstream (400 ERR_BAD_REQUEST as of this writing) because that's a real,
// reportable data point, not benchmark noise. theoldllm was tried and
// dropped: this deployment's egress IP is blocked by Vercel for it (403),
// an environment limitation, not a model worth benchmarking here.
//
// One or two representative models per provider, not the full catalog: a
// full sweep of every free model across every provider would be a multi-hour
// run hammering everyone's free-tier quota for marginal extra signal.
export const FREE_MODELS: FreeModelSpec[] = [
  {
    provider: "gemini",
    model: "gemini/gemini-3.1-flash-lite",
    displayName: "Gemini 3.1 Flash-Lite",
  },
  { provider: "gemini", model: "gemini/gemma-4-31b-it", displayName: "Gemma 4 31B (Gemini)" },
  { provider: "nvidia", model: "nvidia/openai/gpt-oss-20b", displayName: "GPT OSS 20B (NVIDIA)" },
  { provider: "nvidia", model: "nvidia/z-ai/glm-5.1", displayName: "GLM 5.1 (NVIDIA)" },
  {
    provider: "nvidia",
    model: "nvidia/google/gemma-4-31b-it",
    displayName: "Gemma 4 31B (NVIDIA)",
  },
  { provider: "mistral", model: "mistral/mistral-small-latest", displayName: "Mistral Small 4" },
  { provider: "mistral", model: "mistral/codestral-latest", displayName: "Codestral" },
  {
    provider: "pollinations",
    model: "pollinations/openai-fast",
    displayName: "OpenAI Fast (Pollinations)",
  },
  {
    provider: "pollinations",
    model: "pollinations/deepseek",
    displayName: "DeepSeek (Pollinations)",
  },
  {
    provider: "openrouter",
    model: "openrouter/auto",
    displayName: "Auto — Best Available (OpenRouter free pool)",
  },
  { provider: "felo-web", model: "felo-web/felo-chat", displayName: "Felo Chat (no-auth)" },
  {
    provider: "aihorde",
    model: "aihorde/google/gemma-4-31b",
    displayName: "Gemma 4 31B (AI Horde)",
  },
  {
    provider: "opencode",
    model: "opencode/deepseek-v4-flash-free",
    displayName: "DeepSeek V4 Flash Free (OpenCode)",
  },
  {
    provider: "duckduckgo-web",
    model: "duckduckgo-web/gpt-4o-mini",
    displayName: "GPT-4o Mini (DuckDuckGo, known-broken)",
  },
  {
    provider: "mistral",
    model: "mistral/labs-leanstral-1-5-1",
    displayName: "Leanstral 1.5.1 (Mistral)",
  },
  {
    provider: "openrouter",
    model: "openrouter/poolside/laguna-s-2.1:free",
    displayName: "Laguna S 2.1 (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/nvidia/nemotron-3-super-120b-a12b:free",
    displayName: "Nemotron 3 Super 120B (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/nvidia/nemotron-3-ultra-550b-a55b:free",
    displayName: "Nemotron 3 Ultra 550B (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    displayName: "Nemotron 3 Nano Omni 30B Reasoning (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/google/gemma-4-26b-a4b-it:free",
    displayName: "Gemma 4 26B (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/google/gemma-4-31b-it:free",
    displayName: "Gemma 4 31B (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/nvidia/nemotron-3-nano-30b-a3b:free",
    displayName: "Nemotron 3 Nano 30B (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/openai/gpt-oss-20b:free",
    displayName: "GPT OSS 20B (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/poolside/laguna-xs-2.1:free",
    displayName: "Laguna XS 2.1 (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/poolside/laguna-m.1:free",
    displayName: "Laguna M.1 (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/cohere/north-mini-code:free",
    displayName: "North Mini Code (OpenRouter)",
  },
  {
    provider: "openrouter",
    model: "openrouter/nvidia/nemotron-nano-9b-v2:free",
    displayName: "Nemotron Nano 9B v2 (OpenRouter)",
  },
  {
    provider: "opencode",
    model: "opencode/nemotron-3-ultra-free",
    displayName: "Nemotron 3 Ultra Free (OpenCode)",
  },
  {
    provider: "opencode",
    model: "opencode/north-mini-code-free",
    displayName: "North Mini Code Free (OpenCode)",
  },
  {
    provider: "opencode",
    model: "opencode/laguna-s-2.1-free",
    displayName: "Laguna S 2.1 Free (OpenCode)",
  },
  { provider: "opencode", model: "opencode/big-pickle", displayName: "Big Pickle (OpenCode)" },
  {
    provider: "opencode",
    model: "opencode/mimo-v2.5-free",
    displayName: "MiMo V2.5 Free (OpenCode)",
  },
];

// The batch the operator just enabled/added (2026-07-22): a Cerebras key,
// "free"-tagged OpenRouter models, and OpenCode's currently-live free roster
// (its old catalog entries had drifted — refetched from
// https://opencode.ai/zen/v1/models and cross-checked live before adding).
// Cerebras itself couldn't be smoke-tested here: the new key hit a live 402
// Payment Required (testStatus: credits_exhausted) — an account/billing
// issue on Cerebras' side, not addressable from this deployment.
export const NEWLY_ENABLED_MODELS: FreeModelSpec[] = FREE_MODELS.filter((m) =>
  [
    "mistral/labs-leanstral-1-5-1",
    "openrouter/poolside/laguna-s-2.1:free",
    "openrouter/nvidia/nemotron-3-super-120b-a12b:free",
    "openrouter/nvidia/nemotron-3-ultra-550b-a55b:free",
    "openrouter/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "openrouter/google/gemma-4-26b-a4b-it:free",
    "openrouter/google/gemma-4-31b-it:free",
    "openrouter/nvidia/nemotron-3-nano-30b-a3b:free",
    "openrouter/openai/gpt-oss-20b:free",
    "openrouter/poolside/laguna-xs-2.1:free",
    "openrouter/poolside/laguna-m.1:free",
    "openrouter/cohere/north-mini-code:free",
    "openrouter/nvidia/nemotron-nano-9b-v2:free",
    "opencode/nemotron-3-ultra-free",
    "opencode/north-mini-code-free",
    "opencode/laguna-s-2.1-free",
    "opencode/big-pickle",
    "opencode/mimo-v2.5-free",
  ].includes(m.model)
);

// The gemma-4-31b family across its 3 free hosts on this deployment — the
// specific model documented (docs/architecture/RESILIENCE_GUIDE.md context,
// tests/integration/gemini-large-context-tpm.test.ts) as hitting a hard
// 16000 tokens/minute free-tier ceiling on Gemini. Benchmarking the same
// model across hosts isolates whether the TPM wall is a gemma-4 property or
// specific to Gemini's free-tier enforcement.
export const TPM_STRESS_MODELS: FreeModelSpec[] = FREE_MODELS.filter((m) =>
  m.displayName.includes("Gemma 4 31B")
);

// A representative slice of the 25 general-workload CASE_BUILDERS: one plain
// chat case, one code-review case, one long-context case, one agentic/
// multi-turn case, one structured-output case. Running the full 25 against
// every model in FREE_MODELS would multiply request count ~5x for marginal
// extra coverage over what already runs continuously in live-gemini-workload.
const BENCHMARK_CASE_NAMES = [
  "basic coding question",
  "code review request",
  "long document analysis",
  "agentic planning task",
  "JSON-heavy structured data prompt",
];

export const BENCHMARK_CASES = CASE_BUILDERS.filter((tc) => BENCHMARK_CASE_NAMES.includes(tc.name));

export interface BenchmarkResult {
  model: string;
  displayName: string;
  case: string;
  ok: boolean;
  status: number;
  durationMs: number;
  tokens: number;
  contentLength: number;
  finishReason: string;
  error?: string;
}

export interface ModelBenchmarkSummary {
  model: string;
  displayName: string;
  attempted: number;
  succeeded: number;
  successRate: number;
  avgDurationMs: number;
  avgTokens: number;
  avgMsPerToken: number | null;
  results: BenchmarkResult[];
}

/**
 * Fetch the set of provider ids usable right now: providers with an active,
 * non-expired connection, unioned with NO_AUTH_PROVIDER_IDS (those need no
 * connection row at all — see the comment on that constant).
 */
export async function getActiveProviders(): Promise<Set<string>> {
  const active = new Set<string>(NO_AUTH_PROVIDER_IDS);
  if (!API_KEY) return active;
  try {
    const res = await fetch(`${BASE_URL}/api/providers`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!res.ok) return active;
    const data = await res.json();
    const connections = data.connections || data;
    for (const c of Array.isArray(connections) ? connections : []) {
      if (c.isActive && c.testStatus !== "expired" && c.testStatus !== "error") {
        active.add(c.provider);
      }
    }
  } catch {
    // network/setup failure — no-auth providers are still usable, keep them
  }
  return active;
}

/**
 * Send one benchmark request against a specific model. Never throws — a
 * failure (timeout, 429, 5xx, malformed stream) is recorded as `ok: false`
 * with the reason, not surfaced as a test failure.
 */
export async function benchmarkRequest(
  spec: FreeModelSpec,
  tcName: string,
  buildMessages: () => Message[],
  timeoutMs = 60_000
): Promise<BenchmarkResult> {
  const messages = buildMessages();
  const start = performance.now();

  try {
    const res = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: spec.model,
        messages,
        stream: true,
        max_tokens: 2048,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    const status = res.status;
    if (status !== 200) {
      const body = await res.text().catch(() => "");
      return {
        model: spec.model,
        displayName: spec.displayName,
        case: tcName,
        ok: false,
        status,
        durationMs: Math.round(performance.now() - start),
        tokens: 0,
        contentLength: 0,
        finishReason: "unknown",
        error: body.slice(0, 200),
      };
    }

    const { fullContent, finishReason, totalTokens } = await readSSEStream(res);
    const durationMs = Math.round(performance.now() - start);
    const ok = fullContent.length > 0 && (finishReason === "stop" || finishReason === "length");

    return {
      model: spec.model,
      displayName: spec.displayName,
      case: tcName,
      ok,
      status,
      durationMs,
      tokens: totalTokens,
      contentLength: fullContent.length,
      finishReason,
      error: ok ? undefined : `empty or bad finish: ${finishReason}`,
    };
  } catch (err) {
    return {
      model: spec.model,
      displayName: spec.displayName,
      case: tcName,
      ok: false,
      status: 0,
      durationMs: Math.round(performance.now() - start),
      tokens: 0,
      contentLength: 0,
      finishReason: "error",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * TPM-stress round: `rounds` back-to-back large-context requests (~12-16k
 * tokens each, via genHugeContextMessage — the same generator
 * gemini-large-context-tpm.test.ts uses to trip Gemini's real 16000 TPM
 * free-tier ceiling) fired with NO inter-request delay, so their token cost
 * accumulates within the same provider-side one-minute window instead of
 * spreading out. This is what distinguishes it from benchmarkRequest(),
 * which deliberately paces requests apart — TPM ceilings are a *rate*
 * property, invisible unless load is concentrated into a short window.
 */
export async function benchmarkTpmStress(
  spec: FreeModelSpec,
  approxTokensPerPrompt = 14_000,
  rounds = 2,
  timeoutMs = 90_000
): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];
  for (let i = 0; i < rounds; i++) {
    const r = await benchmarkRequest(
      spec,
      `tpm-stress round ${i + 1}/${rounds} (~${approxTokensPerPrompt} tok)`,
      () => [genHugeContextMessage(approxTokensPerPrompt)],
      timeoutMs
    );
    results.push(r);
  }
  return results;
}

/** Read one Responses-API benchmark request, mirroring benchmarkRequest(). */
export async function benchmarkResponsesRequest(
  spec: FreeModelSpec,
  tcName: string,
  buildMessages: () => Message[],
  timeoutMs = 60_000
): Promise<BenchmarkResult> {
  const messages = buildMessages();
  const start = performance.now();

  try {
    const res = await fetch(`${BASE_URL}/v1/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: spec.model,
        input: messages,
        stream: true,
        max_output_tokens: 2048,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    const status = res.status;
    if (status !== 200) {
      const body = await res.text().catch(() => "");
      return {
        model: spec.model,
        displayName: spec.displayName,
        case: tcName,
        ok: false,
        status,
        durationMs: Math.round(performance.now() - start),
        tokens: 0,
        contentLength: 0,
        finishReason: "unknown",
        error: body.slice(0, 200),
      };
    }

    const { fullContent, finishReason, totalTokens } = await readResponsesSSEStream(res);
    const durationMs = Math.round(performance.now() - start);
    const ok = fullContent.length > 0;

    return {
      model: spec.model,
      displayName: spec.displayName,
      case: tcName,
      ok,
      status,
      durationMs,
      tokens: totalTokens,
      contentLength: fullContent.length,
      finishReason,
      error: ok ? undefined : `empty content, finish=${finishReason}`,
    };
  } catch (err) {
    return {
      model: spec.model,
      displayName: spec.displayName,
      case: tcName,
      ok: false,
      status: 0,
      durationMs: Math.round(performance.now() - start),
      tokens: 0,
      contentLength: 0,
      finishReason: "error",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function summarize(spec: FreeModelSpec, results: BenchmarkResult[]): ModelBenchmarkSummary {
  const succeeded = results.filter((r) => r.ok);
  const avgDurationMs =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.durationMs, 0) / results.length)
      : 0;
  const avgTokens =
    succeeded.length > 0
      ? Math.round(succeeded.reduce((s, r) => s + r.tokens, 0) / succeeded.length)
      : 0;
  const tokenRates = succeeded.filter((r) => r.tokens > 0).map((r) => r.durationMs / r.tokens);
  const avgMsPerToken =
    tokenRates.length > 0
      ? Math.round((tokenRates.reduce((s, v) => s + v, 0) / tokenRates.length) * 10) / 10
      : null;

  return {
    model: spec.model,
    displayName: spec.displayName,
    attempted: results.length,
    succeeded: succeeded.length,
    successRate: results.length > 0 ? succeeded.length / results.length : 0,
    avgDurationMs,
    avgTokens,
    avgMsPerToken,
    results,
  };
}

export function formatBenchmarkTable(summaries: ModelBenchmarkSummary[]): string {
  const rows = summaries
    .slice()
    .sort((a, b) => b.successRate - a.successRate || a.avgDurationMs - b.avgDurationMs)
    .map((s) => {
      const rate = `${s.succeeded}/${s.attempted}`.padStart(5);
      const pct = `${Math.round(s.successRate * 100)}%`.padStart(4);
      const dur = `${s.avgDurationMs}ms`.padStart(8);
      const tok = `${s.avgTokens}`.padStart(6);
      const rate2 = s.avgMsPerToken !== null ? `${s.avgMsPerToken}ms/tok` : "n/a".padStart(10);
      return `  ${s.displayName.padEnd(38)} ${rate} (${pct}) | avg ${dur} | avg ${tok} tok | ${rate2}`;
    });

  return [
    "\n  Free-model workload benchmark:",
    "  " + "model".padEnd(38) + " success | latency  | tokens | throughput",
    ...rows,
  ].join("\n");
}
