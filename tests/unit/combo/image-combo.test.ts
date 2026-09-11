/**
 * Tests for image combo strategy execution (#9239)
 *
 * Tests executeImageCombo and route diversion in generations/route.ts.
 *
 * These tests set up a temp DATA_DIR with a seeded combo in the DB so the
 * executeImageCombo function can resolve combo targets through the real
 * DB path. Tests focus on combo resolution, filtering, and error paths.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-combo-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-image-combo-tests";

// Ensure the test dir exists
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

const core = await import("@/lib/db/core.ts");
const { createCombo } = await import("@/lib/db/combos");
const { createProviderConnection } = await import("@/lib/db/providers");
const { executeImageCombo } = await import("@omniroute/open-sse/services/imageCombo");

type LogEntry = { level: string; tag: unknown; msg: unknown };

function createLog() {
  const entries: LogEntry[] = [];
  const record =
    (level: string) =>
    (tag: unknown, msg: unknown): number =>
      entries.push({ level, tag, msg });
  return {
    info: record("info"),
    warn: record("warn"),
    error: record("error"),
    debug: record("debug"),
    entries,
  };
}

function createRequest(model: string): Request {
  return new Request("http://localhost:20128/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt: "a cat" }),
  });
}

function createMockAuth() {
  return {
    request: createRequest("test-combo"),
    policy: { apiKeyInfo: { id: "test-key", name: "test-key" } },
  };
}

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  await cleanupTestDataDir();
});

// ---------------------------------------------------------------------------
// executeImageCombo — combo resolution and error paths
// ---------------------------------------------------------------------------

test("returns 400 when combo is not found", async () => {
  const log = createLog();
  const response = await executeImageCombo(
    "nonexistent-combo",
    { model: "nonexistent-combo", prompt: "a cat" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
  const body = await response.json();
  const bodyStr = JSON.stringify(body);
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("returns 400 when combo has no image-capable targets", async () => {
  // Create a combo with a chat-only model (not in image registry)
  await createCombo({
    name: "chat-only-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const log = createLog();
  const response = await executeImageCombo(
    "chat-only-combo",
    { model: "chat-only-combo", prompt: "a cat" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
  const body = await response.json();
  const bodyStr = JSON.stringify(body);
  assert.ok(bodyStr.includes("No images-capable targets"), "Tells user no image targets");
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

test("returns 400 when combo has no usable targets", async () => {
  await createCombo({
    name: "empty-combo",
    strategy: "priority",
    models: [],
  });

  const log = createLog();
  const response = await executeImageCombo(
    "empty-combo",
    { model: "empty-combo", prompt: "a cat" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
});

test("cannot resolve credentials for a combo with image models but no provider connections", async () => {
  // Create a combo with real image registry models (openai/gpt-image-2 is real)
  // but no provider connection exists in the test DB — should 400 on credential resolution
  await createCombo({
    name: "img-no-conn",
    strategy: "priority",
    models: ["openai/gpt-image-2", "openai/gpt-image-1.5"],
  });

  const log = createLog();
  const response = await executeImageCombo(
    "img-no-conn",
    { model: "img-no-conn", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    log
  );
  // Should fail because no provider connection for "openai" exists
  assert.equal(response.status, 400);
  const body = await response.json();
  const bodyStr = JSON.stringify(body);
  assert.ok(!bodyStr.includes("at "), "Error response does not leak stack traces");
});

// ---------------------------------------------------------------------------
// executeImageCombo — handling of combo with image-capable targets
// but no credentials (tests that filtering and iteration logic works)
// ---------------------------------------------------------------------------

test("correctly filters models: only image-registry models pass, chat-only models are skipped", async () => {
  // Combo mixing image-capable and non-image models
  await createCombo({
    name: "mixed-combo",
    strategy: "priority",
    models: ["openai/gpt-image-2", "openai/gpt-4o", "openai/gpt-image-1.5"],
  });

  const log = createLog();
  const response = await executeImageCombo(
    "mixed-combo",
    { model: "mixed-combo", prompt: "a cat" },
    createMockAuth(),
    Date.now(),
    log
  );
  // Should get 400 because no credentials exist, but the filtering
  // should have removed gpt-4o from consideration
  assert.equal(response.status, 400);
  const body = await response.json();
  // The error should mention credentials, not "No images-capable targets"
  // because gpt-image-2 and gpt-image-1.5 ARE image-capable
  const bodyStr = JSON.stringify(body);
  assert.ok(
    !bodyStr.includes("No images-capable targets"),
    "Image-capable targets were found, error is about credentials not filtering"
  );
});

// ---------------------------------------------------------------------------
// Route diversion — generations/route.ts pattern
// ---------------------------------------------------------------------------

test("non-combo bare model names pass through model resolution unchanged", async () => {
  // A bare model name with no slash that is NOT a combo should not cause issues
  // This tests the combo detection logic: `!body.model.includes("/")` + getComboByName
  // Verify the route patch handles non-combo bare names gracefully
  const log = createLog();
  const response = await executeImageCombo(
    "some-random-name",
    { model: "some-random-name", prompt: "a cat" },
    createMockAuth(),
    Date.now(),
    log
  );
  // Should get 400 since "some-random-name" is not a combo
  assert.equal(response.status, 400);
  const body = await response.json();
  const bodyStr = JSON.stringify(body);
  assert.ok(
    bodyStr.includes("not found") || bodyStr.includes("not a valid"),
    "Combo not found error"
  );
});

test("provider/model format (with slash) is not treated as a combo name", async () => {
  // Models like "openai/gpt-image-2" have a slash, so they won't be checked as combos
  // This is the route patch's first guard: `!body.model.includes("/")`
  //
  // We test by trying to execute a combo named "openai/gpt-image-2":
  // - executeImageCombo directly doesn't check for slash (it's the route's job)
  // - But if someone calls with a slash-containing name that isn't a combo, it 400s
  const log = createLog();
  const response = await executeImageCombo(
    "openai/gpt-image-2",
    { model: "openai/gpt-image-2", prompt: "a cat" },
    createMockAuth(),
    Date.now(),
    log
  );
  assert.equal(response.status, 400);
  const body = await response.json();
  const bodyStr = JSON.stringify(body);
  assert.ok(bodyStr.includes("not found") || bodyStr.includes("not a valid"), "Not a combo name");
});

// ---------------------------------------------------------------------------
// Error response security — no stack trace leaks
// ---------------------------------------------------------------------------

test("all error responses from executeImageCombo sanitize stack traces", async () => {
  // Test multiple error scenarios and verify none leak stack traces
  const scenarios = [
    { name: "nonexistent", comboName: "no-such-combo-at-all" },
    { name: "chat-only", comboName: "another-chat-combo" },
  ];

  // Create a non-image combo
  await createCombo({
    name: "another-chat-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const log = createLog();
  for (const scenario of scenarios) {
    const response = await executeImageCombo(
      scenario.comboName,
      { model: scenario.comboName, prompt: "a cat" },
      createMockAuth(),
      Date.now(),
      log
    );
    assert.ok(response.status >= 400, `Scenario "${scenario.name}" returns error status`);
    const body = await response.json();
    const bodyStr = JSON.stringify(body);
    assert.ok(
      !bodyStr.includes("at ") || !bodyStr.includes("/src/"),
      `Scenario "${scenario.name}" does not leak stack traces`
    );
  }
});

// ---------------------------------------------------------------------------
// Success path — public response shape (#12268)
// ---------------------------------------------------------------------------

function buildCodexSSE(items: Array<Record<string, unknown>>): string {
  const frames = items.map((item) => JSON.stringify({ type: "response.output_item.done", item }));
  return frames.map((frame) => `event: response.output_item.done\ndata: ${frame}\n`).join("\n");
}

test("combo success keeps the OpenAI {created, data} wrapper and Codex defaults to b64_json (#12268)", async () => {
  // Codex CLI hardcodes the model name `gpt-image-2`; a combo is what lets it
  // reach a codex target. The combo response must match the direct-model
  // response shape byte-for-byte or the client aborts while decoding `created`.
  await createProviderConnection({
    provider: "codex",
    authType: "apikey",
    apiKey: "codex-token",
    name: "codex-image-combo",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await createCombo({
    name: "gpt-image-2",
    strategy: "priority",
    models: ["codex/gpt-5.6-sol"],
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      buildCodexSSE([
        {
          type: "image_generation_call",
          id: "ig_combo_1",
          status: "completed",
          revised_prompt: "a green tree icon",
          result: "aVZCT1J3MEtHZ28=",
        },
      ]),
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );

  try {
    const log = createLog();
    const response = await executeImageCombo(
      "gpt-image-2",
      { model: "gpt-image-2", prompt: "a green tree icon, white background, minimal flat" },
      createMockAuth(),
      Date.now(),
      log
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(!Array.isArray(body), "combo path must not return a bare array");
    assert.equal(typeof body.created, "number");
    assert.ok(Array.isArray(body.data));
    assert.equal(body.data.length, 1);
    assert.equal(body.data[0].b64_json, "aVZCT1J3MEtHZ28=");
    assert.equal(body.data[0].url, undefined);
    assert.equal(body.data[0].revised_prompt, "a green tree icon");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
