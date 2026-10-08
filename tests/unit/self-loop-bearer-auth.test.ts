import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The vision and audio bridges call OmniRoute's own /v1 routes with
// resolveSelfLoopBearer(): the env key when one is set, otherwise a random per-process
// secret (#13813). Authentication accepted only env keys and DB keys, so on a
// REQUIRE_API_KEY=true instance without OMNIROUTE_API_KEY every describe/transcribe
// self-loop failed with 401 AUTH_002, and the vision bridge replaced user images with
// an "(unavailable)" stub. The describe path also created a "CLI Auto-Key" DB key per
// process that the self-loop then overwrote and never used.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-self-loop-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { resolveSelfLoopBearer, peekGeneratedSelfLoopSecret } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
const { clientApiPolicy } = await import("../../src/server/authz/policies/clientApi.ts");
const { callVisionModel } = await import("../../src/lib/guardrails/visionBridgeHelpers.ts");
const { isSyntheticApiKeyId } = await import("../../src/shared/constants/apiKeyIdentities.ts");

const ENV_KEYS = [
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "REQUIRE_API_KEY",
  "VISION_BRIDGE_API_KEY",
  "VISION_BRIDGE_BASE_URL",
  "OPENAI_API_KEY",
] as const;
const savedEnv = new Map(ENV_KEYS.map((key) => [key, process.env[key]]));

function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (const key of ENV_KEYS) delete process.env[key];
  process.env.REQUIRE_API_KEY = "true";
}

test.beforeEach(() => resetStorage());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function policyCtx(bearer: string) {
  return {
    request: {
      method: "POST",
      headers: new Headers({ authorization: `Bearer ${bearer}` }),
      url: "http://localhost/api/v1/chat/completions",
    },
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath: "/api/v1/chat/completions",
    },
    requestId: "req_self_loop",
  };
}

test("the in-process self-loop bearer authenticates when no env key is set", async () => {
  assert.equal(await apiKeysDb.validateApiKey(resolveSelfLoopBearer()), true);
  assert.equal(await apiKeysDb.validateApiKey(`${resolveSelfLoopBearer()}x`), false);
  assert.equal(await apiKeysDb.validateApiKey("sk-not-a-real-key"), false);
});

test("self-loop metadata allows every model but only the chat and audio routes", async () => {
  const meta = await apiKeysDb.getApiKeyMetadata(resolveSelfLoopBearer());
  assert.equal(meta?.id, "self-loop");
  // No api_keys row backs this id: orphan repair must keep its budget/cost rows.
  assert.equal(isSyntheticApiKeyId(meta?.id), true);
  assert.equal(meta?.modelAccessMode, "all");
  // A non-empty scope list: an empty one lets MCP fall back to client/default scopes.
  assert.deepEqual(meta?.scopes, ["internal:self-loop"]);
  assert.deepEqual(meta?.allowedEndpoints, ["chat", "audio"]);
});

test("every copy of the admission module shares one self-loop secret", async () => {
  // Next loads the proxy (middleware bundle) and the route handlers as separate module
  // graphs; the proxy validates what a route handler generated.
  const copy = await import("../../src/shared/middleware/chatAdmissionIdentity.ts?copy=proxy");
  assert.notEqual(copy.resolveSelfLoopBearer, resolveSelfLoopBearer);
  assert.equal(copy.resolveSelfLoopBearer(), resolveSelfLoopBearer());
  assert.equal(await apiKeysDb.validateApiKey(copy.resolveSelfLoopBearer()), true);
});

test("API-key validation never creates the self-loop secret", async () => {
  delete (globalThis as unknown as Record<symbol, unknown>)[Symbol.for("omniroute.selfLoopSecret")];
  assert.equal(await apiKeysDb.validateApiKey("sk-not-a-real-key"), false);
  assert.equal(peekGeneratedSelfLoopSecret(), null);
});

test("REQUIRE_API_KEY lets a self-loop request through the client API policy", async () => {
  const out = await clientApiPolicy.evaluate(policyCtx(resolveSelfLoopBearer()) as never);
  assert.equal(out.allow, true);
  const rejected = await clientApiPolicy.evaluate(policyCtx("sk-not-a-real-key") as never);
  assert.equal(rejected.allow, false);
});

test("a configured env key keeps its env-key identity and management scope", async () => {
  process.env.OMNIROUTE_API_KEY = "sk-operator-env-key";
  assert.equal(resolveSelfLoopBearer(), "sk-operator-env-key");
  const meta = await apiKeysDb.getApiKeyMetadata("sk-operator-env-key");
  assert.equal(meta?.id, "env-key");
  assert.equal(meta?.scopes?.includes("manage"), true);
});

test("the vision describe self-loop sends the self-loop bearer and creates no DB key", async () => {
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "vision-self-loop-openai",
    apiKey: "sk-test-openai",
  });
  let authorization = "";
  const fetchImpl: typeof fetch = async (_input, init) => {
    authorization = ((init?.headers ?? {}) as Record<string, string>).Authorization ?? "";
    return Response.json({ choices: [{ message: { content: "A green square" } }] });
  };
  const result = await callVisionModel("data:image/png;base64,iVBORw0KGgo", {
    model: "openai/gpt-4o-mini",
    prompt: "Describe",
    timeoutMs: 30000,
    maxImages: 1,
    routeThroughOmniRoute: true,
    fetchImpl,
  });
  assert.equal(result, "A green square");
  assert.equal(authorization, `Bearer ${resolveSelfLoopBearer()}`);
  assert.equal((await apiKeysDb.getApiKeys()).length, 0);
});

test("another localhost server set as VISION_BRIDGE_BASE_URL never gets the self-loop bearer", async () => {
  process.env.VISION_BRIDGE_BASE_URL = "http://localhost:11434/v1";
  await createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "vision-self-loop-gemini",
    apiKey: "sk-test-gemini",
  });
  let headers: Record<string, string> = {};
  const fetchImpl: typeof fetch = async (_input, init) => {
    headers = (init?.headers ?? {}) as Record<string, string>;
    return Response.json({ choices: [{ message: { content: "A green square" } }] });
  };
  await callVisionModel("data:image/png;base64,iVBORw0KGgo", {
    model: "gemini/gemini-2.5-flash",
    prompt: "Describe",
    timeoutMs: 30000,
    maxImages: 1,
    fetchImpl,
  });
  assert.notEqual(headers.Authorization, `Bearer ${resolveSelfLoopBearer()}`);
  assert.equal(headers["x-omniroute-admission-bypass"], undefined);
});

test("a direct vision call without a provider key sends no OmniRoute credential", async () => {
  // api.openai.com (no VISION_BRIDGE_BASE_URL, no OPENAI_API_KEY) used to receive a freshly
  // created OmniRoute "CLI Auto-Key" as its bearer.
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "vision-direct-openai",
    apiKey: "sk-test-openai",
  });
  let url = "";
  let headers: Record<string, string> = {};
  const fetchImpl: typeof fetch = async (input, init) => {
    url = String(input);
    headers = (init?.headers ?? {}) as Record<string, string>;
    return Response.json({ choices: [{ message: { content: "A green square" } }] });
  };
  await callVisionModel("data:image/png;base64,iVBORw0KGgo", {
    model: "openai/gpt-4o-mini",
    prompt: "Describe",
    timeoutMs: 30000,
    maxImages: 1,
    fetchImpl,
  });
  assert.match(url, /^https:\/\/api\.openai\.com\//);
  assert.equal(headers.Authorization, undefined);
  assert.equal((await apiKeysDb.getApiKeys()).length, 0);
});

test("a bare-id describe call to the own listener keeps the operator key and the recursion guard", async () => {
  process.env.VISION_BRIDGE_BASE_URL = "http://127.0.0.1:20128/v1";
  process.env.PORT = "20128";
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "vision-bare-openai",
    apiKey: "sk-test-openai",
  });
  const capture = async (config: Record<string, unknown>) => {
    let headers: Record<string, string> = {};
    const fetchImpl: typeof fetch = async (_input, init) => {
      headers = (init?.headers ?? {}) as Record<string, string>;
      return Response.json({ choices: [{ message: { content: "A green square" } }] });
    };
    await callVisionModel("data:image/png;base64,iVBORw0KGgo", {
      model: "openai/gpt-4o-mini",
      prompt: "Describe",
      timeoutMs: 30000,
      maxImages: 1,
      fetchImpl,
      ...config,
    });
    return headers;
  };
  const savedPort = process.env.PORT;
  try {
    // No provider key: the self-loop bearer, with admission bypass and recursion guard.
    const selfLoop = await capture({});
    assert.equal(selfLoop.Authorization, `Bearer ${resolveSelfLoopBearer()}`);
    assert.equal(selfLoop["x-omniroute-admission-bypass"], "internal");
    assert.match(selfLoop["x-omniroute-disabled-guardrails"] ?? "", /vision-bridge/);

    process.env.VISION_BRIDGE_API_KEY = "sk-operator-vision-key";
    const operator = await capture({});
    assert.equal(operator.Authorization, "Bearer sk-operator-vision-key");
    assert.equal(operator["x-omniroute-admission-bypass"], undefined);
  } finally {
    if (savedPort === undefined) delete process.env.PORT;
    else process.env.PORT = savedPort;
  }
});
