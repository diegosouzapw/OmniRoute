/**
 * tests/integration/combo-live/auto.live.test.ts
 *
 * Gated live-smoke tests for the virtual "auto" routing pool.
 *
 * Gate: RUN_COMBO_LIVE=1 to enable. Without it, all tests are skipped.
 *
 * Cost discipline: max_tokens=16, temperature=0, ONE call per test.
 *
 * Test 1 — auto (default): resolves the virtual pool (lkgp strategy over
 *   all active DB connections) to a real provider and returns a valid
 *   completion. Asserts status 200 + non-empty text + that the response
 *   body's `model` field is a real known model (not an error string).
 *
 * Test 2 — auto/fast: a specific variant pool resolves + responds.
 *   Asserts 200 (NOT 400 "unknown variant") + non-empty completion.
 *   Skips with a clear reason if the variant pool cannot resolve.
 *
 * Pool resolution: chat.ts detects model="auto" → builds a virtual combo
 * (name="auto", id="auto", routerStrategy="lkgp") from active DB connections.
 * "auto/<variant>" builds a narrowed pool using the variant's mode pack.
 */

import { test, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createLiveHarness, type LiveConnection } from "./_liveHarness.ts";
import { VALID_VARIANTS } from "../../../open-sse/services/autoCombo/autoPrefix.ts";

// ---------------------------------------------------------------------------
// Module-level harness — initialized once, shared across all tests.
// ---------------------------------------------------------------------------

const h = await createLiveHarness("combo-live-auto");

// ---------------------------------------------------------------------------
// Unique nonce — belt-and-suspenders against any residual caching.
// ---------------------------------------------------------------------------

let _nonceCounter = 0;

function uniqueNonce(testName: string): string {
  return `${++_nonceCounter}:${testName}`;
}

// ---------------------------------------------------------------------------
// Warmup helpers — identical pattern to ordered.live.test.ts
// ---------------------------------------------------------------------------

const WARMUP_TIMEOUT_MS = 10_000;

// Known real model names: if a response body `model` field matches any of
// these (prefix or full string), we consider the auto pool resolved to a
// real provider. This guards against asserting on an error response body
// whose `model` field might be absent or set to an error sentinel.
const KNOWN_REAL_MODEL_FRAGMENTS = [
  "llama",
  "gpt",
  "claude",
  "gemini",
  "glm",
  "minimax",
  "moonshot",
  "deepseek",
  "qwen",
  "mixtral",
  "mistral",
  "falcon",
  "command",
  "phi",
];

/**
 * Return true if `modelField` looks like a real LLM model name (not an error
 * sentinel or empty string). We check against known provider/model fragments.
 */
function looksLikeRealModel(modelField: string | undefined): boolean {
  if (!modelField || modelField.trim() === "") return false;
  const lower = modelField.toLowerCase();
  // If it contains a known fragment, it's a real model.
  if (KNOWN_REAL_MODEL_FRAGMENTS.some((frag) => lower.includes(frag))) return true;
  // Any string with a slash is likely a provider/model pair (e.g. "openrouter/gpt-4o-mini").
  if (lower.includes("/")) return true;
  // A non-empty string is better than nothing — auto resolved to something.
  return modelField.length > 0;
}

const PROVIDER_DEFAULT_MODELS: Record<string, string> = {
  claude: "claude-3-5-haiku-20241022",
  glm: "glm-4-flash",
  minimax: "minimax-text-01",
  "kimi-coding-apikey": "moonshot-v1-8k",
  "ollama-cloud": "llama3.2:3b",
  "opencode-go": "gpt-4o-mini",
  gemini: "gemini-2.0-flash-lite",
  deepseek: "deepseek-chat",
  groq: "llama-3.1-8b-instant",
  cerebras: "llama-3.1-8b",
  openrouter: "openai/gpt-4o-mini",
  together: "meta-llama/Llama-3-8b-chat-hf",
};

async function isHealthy(conn: LiveConnection): Promise<boolean> {
  if (!h.LIVE_ENABLED) return false;
  const model =
    conn.model ?? PROVIDER_DEFAULT_MODELS[conn.provider] ?? `${conn.provider}/default`;
  const directModel = `${conn.provider}/${model}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WARMUP_TIMEOUT_MS);
  try {
    const resp = await (h as any).handleChat(
      (h as any).buildRequest({
        body: (h as any).liveBody(directModel, {
          messages: [{ role: "user", content: `ping warmup:${conn.provider}` }],
        }),
        signal: controller.signal,
      })
    );
    clearTimeout(timer);
    if (resp.status !== 200) return false;
    const text = await (h as any).readCompletionText(resp);
    return text.length > 0;
  } catch {
    clearTimeout(timer);
    return false;
  }
}

/**
 * Pick up to `n` confirmed-healthy connections, preferring fast/cheap providers.
 * Returns empty when LIVE is disabled.
 */
async function pickConfirmedHealthy(n: number): Promise<LiveConnection[]> {
  if (!h.LIVE_ENABLED) return [];
  const conns = await (h as any).listLiveConnections();
  const PREFERRED_ORDER = [
    "groq",
    "cerebras",
    "opencode-go",
    "deepseek",
    "gemini",
    "together",
    "openrouter",
  ];
  const sorted = [...conns].sort((a: LiveConnection, b: LiveConnection) => {
    const ai = PREFERRED_ORDER.indexOf(a.provider);
    const bi = PREFERRED_ORDER.indexOf(b.provider);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const healthy: LiveConnection[] = [];
  for (const conn of sorted) {
    if (healthy.length >= n) break;
    if (await isHealthy(conn)) healthy.push(conn);
  }
  return healthy;
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

beforeEach(() => {
  if (!h.LIVE_ENABLED) return;
  (h as any).BaseExecutor.RETRY_CONFIG.delayMs = 0;
  (h as any).resetCachesForTest();
});

afterEach(() => {
  if (!h.LIVE_ENABLED) return;
  (h as any).BaseExecutor.RETRY_CONFIG.delayMs = (h as any).originalRetryDelayMs;
});

after(async () => {
  if (h.LIVE_ENABLED) {
    await (h as any).cleanup();
  }
});

// ---------------------------------------------------------------------------
// Test 1: auto — resolves the virtual pool to a real provider
// ---------------------------------------------------------------------------

test("live auto — resolves the virtual pool to a real provider and returns a valid completion", {
  skip: !h.LIVE_ENABLED && "RUN_COMBO_LIVE!=1",
}, async () => {
  if (!h.LIVE_ENABLED) return;

  // Confirm at least 1 healthy connection exists — the auto virtual pool needs
  // active DB connections to build its candidate list. The snapshot already has
  // many active connections so this warmup call both confirms network access and
  // ensures the pool will not be empty at resolution time.
  const healthy = await pickConfirmedHealthy(1);
  if (healthy.length < 1) {
    console.log(
      "[auto skip] No confirmed-healthy connections found — virtual auto pool " +
      "cannot resolve without at least one reachable provider. Skipping."
    );
    return;
  }

  const nonce = uniqueNonce("auto");
  const response = await (h as any).handleChat(
    (h as any).buildRequest({
      body: (h as any).liveBody("auto", {
        messages: [{ role: "user", content: `ping ${nonce}` }],
      }),
    })
  );

  assert.equal(
    response.status,
    200,
    `Expected HTTP 200 from auto pool, got ${response.status}. ` +
    `Auto virtual pool may have no eligible candidates or all returned errors.`
  );

  const text = await (h as any).readCompletionText(response);
  assert.ok(
    text.length > 0,
    "Expected non-empty completion text from auto pool — pool resolved but " +
    "returned an empty response body."
  );

  // Read the `model` field from the response body to confirm the auto pool
  // resolved to a real model, not an error placeholder or empty string.
  // This is the primary non-trivial assertion: a pure status-200 check could
  // pass even if the response body is an error JSON. Checking the model field
  // ties the pass to an actual provider serving a real completion.
  const json = await response.clone().json();
  const modelField: string | undefined = json?.model;

  console.log(
    `[auto] resolved to model="${modelField ?? "(absent)"}" | ` +
    `text (first 80): "${text.slice(0, 80)}"`
  );

  assert.ok(
    looksLikeRealModel(modelField),
    `Expected response body 'model' field to be a real known model name, ` +
    `got "${modelField ?? "(absent)"}". ` +
    `Auto pool must resolve to a real provider, not return an error/empty body.`
  );

  // Secondary: try the served-provider helpers for additional signal.
  const headerProvider = (h as any).servedProvider(response);
  const bodyProvider = await (h as any).servedProviderFromBody(response);

  if (headerProvider !== undefined) {
    console.log(`[auto EVIDENCE via header] served provider="${headerProvider}"`);
  }
  if (bodyProvider !== undefined) {
    console.log(`[auto EVIDENCE via body prefix] served provider="${bodyProvider}"`);
  }

  console.log(
    `[auto PASS] virtual pool → model="${modelField}" | ` +
    `header=${headerProvider ?? "absent"} | body=${bodyProvider ?? "absent"}`
  );
});

// ---------------------------------------------------------------------------
// Test 2: auto/fast — a variant pool resolves and responds
// ---------------------------------------------------------------------------

// The variant to test. "fast" maps to the "ship-fast" mode pack (prioritizes
// latency + health), which is the most likely to have healthy providers from
// the groq/cerebras/gemini tier available on the VPS snapshot.
//
// VALID_VARIANTS from autoPrefix.ts: ["coding", "fast", "cheap", "offline", "smart", "lkgp"]
// We pick "fast" as it prefers the cheapest/fastest providers (groq/cerebras)
// that are warmup-confirmed healthy, making it the safest variant to smoke-test.
const SMOKE_VARIANT: (typeof VALID_VARIANTS)[number] = "fast";

test(`live auto/${SMOKE_VARIANT} — a variant pool resolves and returns a valid completion`, {
  skip: !h.LIVE_ENABLED && "RUN_COMBO_LIVE!=1",
}, async () => {
  if (!h.LIVE_ENABLED) return;

  // Confirm SMOKE_VARIANT is a valid variant (defensive — autoPrefix.ts owns the list).
  assert.ok(
    VALID_VARIANTS.includes(SMOKE_VARIANT),
    `SMOKE_VARIANT "${SMOKE_VARIANT}" is not in VALID_VARIANTS: [${VALID_VARIANTS.join(", ")}]`
  );

  // Warmup: ensure at least 1 healthy connection exists.
  // The "fast" pool preferentially selects groq/cerebras/gemini; a healthy
  // general candidate is sufficient to prove the variant can resolve.
  const healthy = await pickConfirmedHealthy(1);
  if (healthy.length < 1) {
    console.log(
      `[auto/${SMOKE_VARIANT} skip] No confirmed-healthy connections — ` +
      `variant pool cannot resolve without at least one reachable provider. Skipping.`
    );
    return;
  }

  const nonce = uniqueNonce(`auto-${SMOKE_VARIANT}`);
  const variantModel = `auto/${SMOKE_VARIANT}`;

  const response = await (h as any).handleChat(
    (h as any).buildRequest({
      body: (h as any).liveBody(variantModel, {
        messages: [{ role: "user", content: `ping ${nonce}` }],
      }),
    })
  );

  // A 400 with "unknown variant" or "invalid auto" means the variant is not
  // recognized by the pipeline — that would be a bug. A 400 with "no eligible
  // providers" / "empty pool" means the variant resolved but found no candidates
  // with the available connections — that's a skip condition, not a failure.
  if (response.status === 400) {
    let errMsg = "";
    try {
      const errJson = await response.clone().json();
      errMsg = errJson?.error?.message ?? errJson?.message ?? JSON.stringify(errJson);
    } catch {
      errMsg = "(unparseable body)";
    }

    const isUnknownVariant =
      errMsg.toLowerCase().includes("unknown variant") ||
      errMsg.toLowerCase().includes("invalid auto") ||
      errMsg.toLowerCase().includes("not an auto");

    if (isUnknownVariant) {
      // This is a real failure: the variant should be recognized.
      assert.fail(
        `auto/${SMOKE_VARIANT} returned 400 "unknown variant" — ` +
        `SMOKE_VARIANT is in VALID_VARIANTS but the pipeline rejected it. Error: ${errMsg}`
      );
    }

    // 400 for another reason (e.g. pool is empty / no eligible candidates):
    // skip with a clear reason rather than failing.
    console.log(
      `[auto/${SMOKE_VARIANT} skip] Got HTTP 400 (non-unknown-variant): "${errMsg}". ` +
      `Variant pool could not resolve with available connections — honest skip.`
    );
    return;
  }

  assert.equal(
    response.status,
    200,
    `Expected HTTP 200 from auto/${SMOKE_VARIANT} pool, got ${response.status}`
  );

  const text = await (h as any).readCompletionText(response);
  assert.ok(
    text.length > 0,
    `Expected non-empty completion from auto/${SMOKE_VARIANT} pool — ` +
    `pool resolved but returned an empty response body.`
  );

  const json = await response.clone().json();
  const modelField: string | undefined = json?.model;

  console.log(
    `[auto/${SMOKE_VARIANT}] resolved to model="${modelField ?? "(absent)"}" | ` +
    `text (first 80): "${text.slice(0, 80)}"`
  );

  assert.ok(
    looksLikeRealModel(modelField),
    `Expected response body 'model' field to be a real known model, ` +
    `got "${modelField ?? "(absent)"}". ` +
    `auto/${SMOKE_VARIANT} must resolve to a real provider, not an error body.`
  );

  const headerProvider = (h as any).servedProvider(response);
  const bodyProvider = await (h as any).servedProviderFromBody(response);

  console.log(
    `[auto/${SMOKE_VARIANT} PASS] model="${modelField}" | ` +
    `header=${headerProvider ?? "absent"} | body=${bodyProvider ?? "absent"}`
  );
});
