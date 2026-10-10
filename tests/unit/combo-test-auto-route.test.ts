import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type ComboTestResult = {
  model?: string;
  status?: string;
  responseText?: string;
  error?: string;
};
type ComboTestBody = {
  comboType?: string;
  totalCandidates?: number;
  strategy?: string;
  resolvedBy?: string | null;
  results: ComboTestResult[];
};

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-test-auto-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-test-auto-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const autoRoute = await import("../../src/app/api/combos/auto/route.ts");
const testRoute = await import("../../src/app/api/combos/test/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedGeminiConnection() {
  // antigravity OAuth connections expose gemini-* registry models, which is
  // what the auto/gemini family filter matches on.
  await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "antigravity-one@example.com",
    accessToken: "fake-antigravity-access-token-one",
    tokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
  });
}

function postTest(comboName: string) {
  return testRoute.POST(
    new Request("http://localhost/api/combos/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ comboName }),
    })
  );
}

function getAuto(query: string) {
  return autoRoute.GET(new Request(`http://localhost/api/combos/auto?${query}`));
}

function stubHealthyProbes() {
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    calls.push({ url: String(url), body: JSON.parse(String(init.body ?? "{}")) });
    return new Response(
      JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
  return calls;
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("combo test route 404s unknown auto ids just like missing persisted combos", async () => {
  const unknownAuto = await postTest("auto/zzz-not-a-thing");
  assert.equal(unknownAuto.status, 404);
  assert.deepEqual(await unknownAuto.json(), { error: "Combo not found" });

  const missingCombo = await postTest("missing-combo");
  assert.equal(missingCombo.status, 404);
  assert.deepEqual(await missingCombo.json(), { error: "Combo not found" });
});

test("combo test route reports an empty candidate pool for unmatched auto ids", async () => {
  // No credentials + no no-auth provider exposes minimax models, so the
  // materialized virtual combo has zero candidates.
  const response = await postTest("auto/minimax");
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error?: string };
  assert.match(body.error ?? "", /no connected candidates/i);
});

test("combo test route probes a bounded slice of an auto combo's live pool", async () => {
  await seedGeminiConnection();
  const calls = stubHealthyProbes();

  const response = await postTest("auto/gemini");
  const body = (await response.json()) as ComboTestBody;

  assert.equal(response.status, 200);
  assert.equal(body.comboType, "auto");
  assert.equal(body.strategy, "auto");
  assert.ok(
    typeof body.totalCandidates === "number" && body.totalCandidates > 0,
    "expected totalCandidates to report the unbounded pool size"
  );
  assert.ok(body.results.length > 0, "expected at least one probe result");
  assert.ok(
    body.results.length <= testRoute.AUTO_COMBO_TEST_MAX_PROBES,
    "probe count must stay within the auto cap"
  );
  assert.ok(
    body.results.every((result) => /gemini/i.test(result.model ?? "")),
    `auto/gemini probes must only hit gemini-family models, got: ${JSON.stringify(body.results.map((r) => r.model))}`
  );
  assert.equal(calls.length, body.results.length);
  assert.ok(calls.every(({ url }) => url.includes("/v1/chat/completions")));
  assert.equal(body.resolvedBy, body.results[0].model);
  assert.equal(body.results[0].status, "ok");
});

test("GET /api/combos/auto?id= materializes one virtual combo for the control center", async () => {
  await seedGeminiConnection();

  const response = await getAuto(`id=${encodeURIComponent("auto/gemini")}`);
  assert.equal(response.status, 200);
  const combo = (await response.json()) as {
    id?: string;
    name?: string;
    strategy?: string;
    type?: string;
    models?: Array<{ kind?: string; providerId?: string; model?: string }>;
    candidateCount?: number;
  };
  assert.equal(combo.id, "auto/gemini");
  assert.equal(combo.name, "auto/gemini");
  assert.equal(combo.strategy, "auto");
  assert.equal(combo.type, "auto");
  assert.ok(Array.isArray(combo.models) && combo.models.length > 0);
  assert.ok(combo.models.every((step) => step.kind === "model"));
  assert.ok(combo.models.every((step) => /gemini/i.test(step.model ?? "")));
  assert.equal(combo.candidateCount, combo.models.length);
});

test("GET /api/combos/auto?id= handles the bare default and rejects non-auto ids", async () => {
  await seedGeminiConnection();

  const bare = await getAuto("id=auto");
  assert.equal(bare.status, 200);
  const bareCombo = (await bare.json()) as { id?: string; models?: unknown[] };
  assert.equal(bareCombo.id, "auto");
  assert.ok(Array.isArray(bareCombo.models) && bareCombo.models.length > 0);

  const nonAuto = await getAuto("id=some-persisted-name");
  assert.equal(nonAuto.status, 400);

  const unknown = await getAuto(`id=${encodeURIComponent("auto/zzz-not-a-thing")}`);
  assert.equal(unknown.status, 404);
});

test("GET /api/combos/auto list still emits every kind including families", async () => {
  await seedGeminiConnection();
  const response = await getAuto("");
  assert.equal(response.status, 200);
  const { combos } = (await response.json()) as {
    combos: Array<{ id?: string; kind?: string; candidateCount?: number }>;
  };
  const ids = new Set(combos.map((combo) => combo.id));
  assert.ok(ids.has("auto"), "bare auto variant missing");
  assert.ok(ids.has("auto/best-coding"), "curated template missing");
  assert.ok(ids.has("auto/coding:fast"), "category:tier combo missing");
  assert.ok(ids.has("auto/gemini"), "family combo missing");
  const gemini = combos.find((combo) => combo.id === "auto/gemini");
  assert.equal(gemini?.kind, "family");
  assert.ok((gemini?.candidateCount ?? 0) > 0);
});
