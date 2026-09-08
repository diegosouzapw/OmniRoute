/**
 * tests/unit/router-strategy-nadir.test.ts
 *
 * Coverage for the `nadir` auto-router strategy
 * (open-sse/services/autoCombo/nadirStrategy.ts) and the async dispatch seam
 * `selectWithStrategyAsync`. The HTTP transport is injected: no network, no
 * global fetch mocking.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  getStrategy,
  listStrategies,
  registerStrategy,
  selectWithStrategyAsync,
  type RoutingContext,
} from "../../open-sse/services/autoCombo/routerStrategy.ts";
import {
  NADIR_FAILURE_COOLDOWN_MS,
  NADIR_MAX_PROMPT_CHARS,
  NadirStrategyImpl,
  extractLastUserText,
  normalizeNadirBaseUrl,
  resolveNadirRoutingConfig,
  type NadirTransport,
  type NadirTransportInit,
} from "../../open-sse/services/autoCombo/nadirStrategy.ts";
import type { ProviderCandidate } from "../../open-sse/services/autoCombo/scoring.ts";

function cand(
  p: Partial<ProviderCandidate> & { provider: string; model: string }
): ProviderCandidate {
  return {
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    ...p,
  } as ProviderCandidate;
}

const pool = [
  cand({ provider: "anthropic", model: "claude-haiku-4-5", costPer1MTokens: 1 }),
  cand({ provider: "anthropic", model: "claude-opus-5", costPer1MTokens: 25 }),
  cand({ provider: "openai", model: "gpt-5.6-terra", costPer1MTokens: 5 }),
];

const messages = [
  { role: "system", content: "You are terse." },
  { role: "user", content: "Prove that the halting problem is undecidable." },
];

const ctx: RoutingContext = { taskType: "default", messages, nadir: { apiKey: "test-key" } };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

interface RecordedCall {
  url: string;
  init: NadirTransportInit;
}

function recordingTransport(respond: (call: RecordedCall) => Promise<Response> | Response) {
  const calls: RecordedCall[] = [];
  const transport: NadirTransport = async (url, init) => {
    const call = { url, init };
    calls.push(call);
    return respond(call);
  };
  return { calls, transport };
}

function nadir(transport: NadirTransport, now?: () => number) {
  return new NadirStrategyImpl({ fallback: getStrategy("rules"), transport, now });
}

// ── happy path ───────────────────────────────────────────────────────────────
test("nadir — routes to the model Nadir selected and reports the bucket", async () => {
  const { calls, transport } = recordingTransport(() =>
    json({ selected_model: "claude-opus-5", bucket: "complex", confidence: 0.93 })
  );

  const decision = await nadir(transport).selectAsync(pool, ctx);

  assert.equal(decision.model, "claude-opus-5");
  assert.equal(decision.provider, "anthropic");
  assert.equal(decision.strategy, "nadir");
  assert.equal(decision.finalScore, 0.93);
  assert.equal(decision.candidatesConsidered, 3);
  assert.match(decision.reason, /bucket=complex confidence=0\.93 model=claude-opus-5/);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.getnadir.com/v1/bucket");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers["X-API-Key"], "test-key");
  assert.equal(calls[0].init.timeoutMs, 2000);
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.prompt, "Prove that the halting problem is undecidable.");
  assert.deepEqual(body.menu, ["claude-haiku-4-5", "claude-opus-5", "gpt-5.6-terra"]);
  assert.equal(body.source, "omniroute");
});

test("nadir — hands the connection choice for the selected model to the fallback", async () => {
  const twoAccounts = [
    cand({
      provider: "anthropic",
      model: "claude-opus-5",
      connectionId: "starved",
      quotaRemaining: 5,
      p95LatencyMs: 2000,
    }),
    cand({ provider: "anthropic", model: "claude-opus-5", connectionId: "healthy" }),
    cand({ provider: "openai", model: "gpt-5.6-terra" }),
  ];
  const { calls, transport } = recordingTransport(() => json({ selected_model: "claude-opus-5" }));

  const decision = await nadir(transport).selectAsync(twoAccounts, ctx);

  assert.equal(decision.model, "claude-opus-5");
  assert.equal(decision.connectionId, "healthy");
  assert.equal(decision.strategy, "nadir");
  // The menu is deduplicated per model id, not per connection.
  assert.deepEqual(JSON.parse(calls[0].init.body).menu, ["claude-opus-5", "gpt-5.6-terra"]);
});

test("nadir — clamps confidence and tolerates a missing bucket", async () => {
  const { transport } = recordingTransport(() =>
    json({ selected_model: "gpt-5.6-terra", confidence: 1.7 })
  );

  const decision = await nadir(transport).selectAsync(pool, ctx);

  assert.equal(decision.model, "gpt-5.6-terra");
  assert.equal(decision.finalScore, 1);
  assert.match(decision.reason, /bucket=unknown confidence=1\.00/);
});

// ── fail-open ────────────────────────────────────────────────────────────────
test("nadir — OPEN-breaker candidates are neither offered to Nadir nor selected", async () => {
  const withOpen = [
    cand({ provider: "anthropic", model: "claude-opus-5", circuitBreakerState: "OPEN" }),
    cand({ provider: "openai", model: "gpt-5.6-terra" }),
  ];
  const { calls, transport } = recordingTransport(() => json({ selected_model: "claude-opus-5" }));

  const decision = await nadir(transport).selectAsync(withOpen, ctx);

  assert.deepEqual(JSON.parse(calls[0].init.body).menu, ["gpt-5.6-terra"]);
  assert.equal(decision.model, "gpt-5.6-terra");
  assert.equal(decision.strategy, "rules");
  assert.match(decision.reason, /fallback \(selected model claude-opus-5 is not in the pool\)/);
});

test("nadir — unknown model, empty response, non-2xx, thrown error and bad JSON all fall back", async (t) => {
  t.mock.method(console, "warn", () => {});
  const cases: Array<[string, NadirTransport, RegExp]> = [
    ["unknown model", async () => json({ selected_model: "gpt-9" }), /is not in the pool/],
    ["no selected_model", async () => json({ bucket: "simple" }), /no selected_model/],
    ["HTTP 503", async () => json({ error: "down" }, 503), /call failed: HTTP 503/],
    [
      "thrown",
      async () => {
        throw new Error("ECONNREFUSED");
      },
      /call failed: ECONNREFUSED/,
    ],
    ["bad json", async () => new Response("not json", { status: 200 }), /fallback \(call failed/],
  ];

  for (const [label, transport, expected] of cases) {
    const decision = await nadir(transport).selectAsync(pool, ctx);
    assert.equal(decision.strategy, "rules", label);
    assert.match(decision.reason, expected, label);
    assert.ok(
      pool.some((c) => c.model === decision.model),
      `${label}: fallback must still pick from the pool`
    );
  }
});

test("nadir — skips the network when the request carries no user text", async () => {
  const { calls, transport } = recordingTransport(() => json({ selected_model: "claude-opus-5" }));
  const strategy = nadir(transport);
  const textless: unknown[] = [
    undefined,
    [],
    [{ role: "system", content: "x" }],
    [{ role: "user", content: "   " }],
    [{ role: "user", content: [{ type: "image_url", image_url: { url: "data:x" } }] }],
  ];

  for (const bad of textless) {
    const decision = await strategy.selectAsync(pool, { ...ctx, messages: bad });
    assert.equal(decision.strategy, "rules");
    assert.match(decision.reason, /no user text/);
  }
  assert.equal(calls.length, 0);
});

test("nadir — cools down after a failure and retries once the window has passed", async (t) => {
  t.mock.method(console, "warn", () => {});
  let now = 1_000_000;
  const { calls, transport } = recordingTransport(() => {
    throw new Error("boom");
  });
  const strategy = nadir(transport, () => now);

  await strategy.selectAsync(pool, ctx);
  const cooled = await strategy.selectAsync(pool, ctx);
  assert.equal(calls.length, 1, "second call inside the cooldown must not hit the network");
  assert.match(cooled.reason, /cooling down/);

  now += NADIR_FAILURE_COOLDOWN_MS + 1;
  const retried = await strategy.selectAsync(pool, ctx);
  assert.equal(calls.length, 2);
  assert.match(retried.reason, /call failed: boom/);
});

// ── configuration ────────────────────────────────────────────────────────────
test("nadir — invalid baseUrl never calls out; trailing /v1, timeout and env fallbacks are honored", async (t) => {
  const { calls, transport } = recordingTransport(() => json({ selected_model: "claude-opus-5" }));
  const strategy = nadir(transport);

  const bad = await strategy.selectAsync(pool, {
    ...ctx,
    nadir: { baseUrl: "ftp://nadir.internal" },
  });
  assert.equal(calls.length, 0);
  assert.match(bad.reason, /invalid baseUrl ftp:\/\/nadir\.internal/);

  await strategy.selectAsync(pool, {
    ...ctx,
    nadir: { baseUrl: "https://nadir.internal/v1/", timeoutMs: 500 },
  });
  assert.equal(calls[0].url, "https://nadir.internal/v1/bucket");
  assert.equal(calls[0].init.timeoutMs, 500);
  assert.equal(calls[0].init.headers["X-API-Key"], undefined);

  process.env.OMNIROUTE_NADIR_API_KEY = "env-key";
  process.env.OMNIROUTE_NADIR_BASE_URL = "http://localhost:8000";
  t.after(() => {
    delete process.env.OMNIROUTE_NADIR_API_KEY;
    delete process.env.OMNIROUTE_NADIR_BASE_URL;
  });
  await strategy.selectAsync(pool, { ...ctx, nadir: undefined });
  assert.equal(calls[1].url, "http://localhost:8000/v1/bucket");
  assert.equal(calls[1].init.headers["X-API-Key"], "env-key");
});

test("nadir — caps the prompt shipped to the classifier", async () => {
  const { calls, transport } = recordingTransport(() => json({ selected_model: "claude-opus-5" }));

  await nadir(transport).selectAsync(pool, {
    ...ctx,
    messages: [{ role: "user", content: "x".repeat(NADIR_MAX_PROMPT_CHARS + 5000) }],
  });

  assert.equal(JSON.parse(calls[0].init.body).prompt.length, NADIR_MAX_PROMPT_CHARS);
});

// ── dispatch seams ───────────────────────────────────────────────────────────
test("nadir — sync select() delegates to the fallback without I/O", () => {
  const { calls, transport } = recordingTransport(() => json({ selected_model: "claude-opus-5" }));

  const decision = nadir(transport).select(pool, ctx);

  assert.equal(calls.length, 0);
  assert.equal(decision.strategy, "rules");
  assert.match(decision.reason, /sync caller/);
});

test("selectWithStrategyAsync — prefers selectAsync and runs sync strategies unchanged", async () => {
  const { transport } = recordingTransport(() => json({ selected_model: "gpt-5.6-terra" }));
  registerStrategy("nadir-test-transport", nadir(transport));

  const viaAsync = await selectWithStrategyAsync(pool, ctx, "nadir-test-transport");
  assert.equal(viaAsync.model, "gpt-5.6-terra");
  assert.equal(viaAsync.strategy, "nadir");

  const viaSync = await selectWithStrategyAsync(pool, ctx, "cost");
  assert.equal(viaSync.model, "claude-haiku-4-5");
  assert.equal(viaSync.strategy, "cost");
});

test("nadir — is registered with an async entry point", () => {
  assert.ok(listStrategies().some((s) => s.name === "nadir"));
  assert.equal(typeof getStrategy("nadir").selectAsync, "function");
});

// ── helpers ──────────────────────────────────────────────────────────────────
test("helpers — extractLastUserText, normalizeNadirBaseUrl, resolveNadirRoutingConfig", () => {
  assert.equal(
    extractLastUserText([
      {
        role: "user",
        content: [
          { type: "text", text: "a" },
          { type: "input_text", text: "b" },
          { type: "image_url", image_url: { url: "data:x" } },
        ],
      },
    ]),
    "a\nb"
  );
  assert.equal(
    extractLastUserText([
      { role: "user", content: "first" },
      { role: "assistant", content: "..." },
      { role: "user", content: "  last  " },
    ]),
    "last"
  );
  assert.equal(extractLastUserText("nope"), null);

  assert.equal(normalizeNadirBaseUrl("https://api.getnadir.com/v1/"), "https://api.getnadir.com");
  assert.equal(normalizeNadirBaseUrl("http://10.0.0.5:8000///"), "http://10.0.0.5:8000");
  assert.equal(normalizeNadirBaseUrl("api.getnadir.com"), undefined);
  assert.equal(normalizeNadirBaseUrl(""), undefined);

  assert.deepEqual(resolveNadirRoutingConfig({ apiKey: " k ", baseUrl: "", timeoutMs: "1500" }), {
    apiKey: "k",
    baseUrl: undefined,
    timeoutMs: 1500,
  });
  assert.equal(resolveNadirRoutingConfig("k"), undefined);
  assert.equal(resolveNadirRoutingConfig(null), undefined);
});
