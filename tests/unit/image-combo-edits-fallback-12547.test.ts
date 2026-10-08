// #12547 (diegosouzapw endorsed): /v1/images/edits must iterate a combo's targets
// the same way /v1/images/generations does (#9239), so a combo whose FIRST target
// isn't edit-capable (or lacks credentials) falls through to a later edit-capable
// target instead of flattening to the first target and hard-erroring.
//
// Before this change: /v1/images/edits resolved a bare combo name to its first
// target via resolveSingleImageComboTarget() and dispatched only that one. A combo
// like ["openai/gpt-image-2", "openrouter/..."] hard-errored ("Image edit is not
// supported for built-in provider openai") even though the OpenRouter target could
// have serviced the edit. Missing credentials on the first target were likewise a
// hard 401 for the whole request.
//
// After this change: the edits route diverts bare combos through the same shared
// runImageComboTargets loop generations uses, filtered to edit-capable targets.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-combo-edits-12547-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-combo-edits-12547-secret";
process.env.JWT_SECRET = process.env.JWT_SECRET || "image-combo-edits-12547-jwt";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const { executeImageCombo } = await import("../../open-sse/services/imageCombo.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

interface ErrorResponseBody {
  error: { message: string; code?: string };
}
interface ImageResponseBody {
  data: Array<{ b64_json?: string; url?: string }>;
}

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

function seedOpenRouterConnection() {
  return providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-combo-edit",
    apiKey: "sk-or-combo-edit-12547",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: null,
  });
}

function dataUrlPng(bytes: number[]): string {
  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;
}

const REF_A = dataUrlPng([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);

function editRequest(model: string, images: string[] = [REF_A]): Request {
  return new Request("http://localhost/api/v1/images/edits", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, prompt: "add a red hat", images }),
  });
}

/** Mock a successful OpenRouter unified-Image-API edit response. */
function mockOpenRouterSuccess(): void {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [{ b64_json: Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString("base64") }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ---------------------------------------------------------------------------
// Discriminant #1 — first target is NOT edit-capable, a later one is.
// RED on base (400 "not supported for built-in provider openai"); GREEN with fix.
// ---------------------------------------------------------------------------
test("#12547 edits combo falls through a non-edit-capable first target to a later one", async () => {
  await seedOpenRouterConnection();
  mockOpenRouterSuccess();
  await combosDb.createCombo({
    name: "edit-fallback-combo",
    strategy: "priority",
    // openai/gpt-image-2 is a built-in provider with NO OpenAI-compatible edit
    // endpoint (the single-model path hard-errors on it); the openrouter target can edit.
    models: ["openai/gpt-image-2", "openrouter/google/gemini-3.1-flash-image-preview"],
  });

  const response = await imageEditRoute.POST(editRequest("edit-fallback-combo"));
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200, "must fall through to the edit-capable openrouter target");
  assert.ok(body.data?.[0]?.b64_json, "edit returns an image payload from the later target");
});

// ---------------------------------------------------------------------------
// Discriminant #2 — first target IS edit-capable but lacks credentials.
// Matching generations, missing credentials is a SKIP (not a hard 401). A later
// credentialed target services the edit.
// RED on base (401 "No credentials for provider: codex"); GREEN with fix.
// ---------------------------------------------------------------------------
test("#12547 edits combo skips an edit-capable first target missing credentials", async () => {
  await seedOpenRouterConnection(); // only openrouter is credentialed; codex is not
  mockOpenRouterSuccess();
  await combosDb.createCombo({
    name: "edit-skip-nocreds-combo",
    strategy: "priority",
    models: ["codex/gpt-5.6-sol", "openrouter/google/gemini-3.1-flash-image-preview"],
  });

  const response = await imageEditRoute.POST(editRequest("edit-skip-nocreds-combo"));
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200, "missing creds on the first target must skip, not 401");
  assert.ok(body.data?.[0]?.b64_json, "edit returns an image payload from the credentialed target");
});

// ---------------------------------------------------------------------------
// Guard — a combo with no edit-capable target reports a clear 400 (no stack leak).
// ---------------------------------------------------------------------------
test("#12547 edits combo with no edit-capable targets returns a clean 400", async () => {
  globalThis.fetch = async () => {
    throw new Error("No edit-capable target must never reach upstream");
  };
  await combosDb.createCombo({
    name: "no-edit-capable-combo",
    strategy: "priority",
    // openai + a chat model: neither exposes an OpenAI-compatible edit endpoint.
    models: ["openai/gpt-image-2", "openai/gpt-4o"],
  });

  const response = await imageEditRoute.POST(editRequest("no-edit-capable-combo"));
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /No image-edit-capable targets/);
  assert.ok(!body.error.message.includes("at /"), "no stack trace leak");
});

// ---------------------------------------------------------------------------
// /v1/images/generations behavior is unchanged by the shared-loop extraction.
// The generation combo path still filters non-image targets and reports the
// image-capable-but-uncredentialed error (not the filtering error).
// ---------------------------------------------------------------------------
function createLog() {
  const record = () => () => 0;
  return { info: record(), warn: record(), error: record(), debug: record() };
}

test("#12547 generations combo still rejects a chat-only combo with 'No images-capable targets'", async () => {
  await combosDb.createCombo({
    name: "gen-chat-only-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await executeImageCombo(
    "gen-chat-only-combo",
    { model: "gen-chat-only-combo", prompt: "a cat" },
    {
      request: new Request("http://localhost/v1/images/generations", { method: "POST" }),
      policy: { apiKeyInfo: { id: "k", name: "k" } },
    },
    Date.now(),
    createLog() as never
  );
  assert.equal(response.status, 400);
  const body = (await response.json()) as ErrorResponseBody;
  assert.match(JSON.stringify(body), /No images-capable targets/);
});

test("#12547 generations combo still surfaces missing credentials for image targets", async () => {
  await combosDb.createCombo({
    name: "gen-img-no-conn-combo",
    strategy: "priority",
    models: ["openai/gpt-image-2", "openai/gpt-image-1.5"],
  });

  const response = await executeImageCombo(
    "gen-img-no-conn-combo",
    { model: "gen-img-no-conn-combo", prompt: "a cat", n: 1 },
    {
      request: new Request("http://localhost/v1/images/generations", { method: "POST" }),
      policy: { apiKeyInfo: { id: "k", name: "k" } },
    },
    Date.now(),
    createLog() as never
  );
  assert.equal(response.status, 400);
  const body = (await response.json()) as ErrorResponseBody;
  // Image-capable targets were found (so NOT the filtering error); the failure is credentials.
  assert.ok(!JSON.stringify(body).includes("No images-capable targets"));
});
