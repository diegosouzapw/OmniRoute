import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-access-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "0123456789abcdef0123456789abcdef";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const accessRoute = await import("../../src/app/api/keys/[id]/access/route.ts");
const { assignApiKeyAccess, KeyAllowsAllModelsError, KeyAccessCapExceededError } =
  await import("../../src/lib/db/apiKeyAccessAssign.ts");

const MACHINE_ID = "0123456789abcdef";

async function resetStorage(): Promise<void> {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function postRequest(id: string, body: unknown, headers?: HeadersInit): Request {
  const reqHeaders = new Headers(headers);
  if (body !== undefined && !reqHeaders.has("Content-Type")) {
    reqHeaders.set("Content-Type", "application/json");
  }
  return new Request(`http://localhost/api/keys/${id}/access`, {
    method: "POST",
    headers: reqHeaders,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("1. Route auth: 401 without management auth when login is required", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-pass";
  await settingsDb.updateSettings({ requireLogin: true });

  const ordinary = await apiKeys.createApiKey("OrdKey", MACHINE_ID);
  const response = await accessRoute.POST(
    postRequest(ordinary.id, { add: { models: ["model-a"] } }),
    { params: Promise.resolve({ id: ordinary.id }) }
  );

  assert.equal(response.status, 401);
  const body = (await response.json()) as { error?: { message?: string } };
  assert.equal(body.error?.message, "Authentication required");
  assert.equal(JSON.stringify(body).includes("at /"), false);
});

test("2. Validation 400: rejects invalid, malformed, or empty requests", async () => {
  const ordinary = await apiKeys.createApiKey("ValKey", MACHINE_ID);

  // Malformed JSON
  const malformedRes = await accessRoute.POST(postRequest(ordinary.id, "not-valid-json"), {
    params: Promise.resolve({ id: ordinary.id }),
  });
  assert.equal(malformedRes.status, 400);

  // Empty object
  const emptyRes = await accessRoute.POST(postRequest(ordinary.id, {}), {
    params: Promise.resolve({ id: ordinary.id }),
  });
  assert.equal(emptyRes.status, 400);

  // Empty lists only
  const emptyListsRes = await accessRoute.POST(
    postRequest(ordinary.id, { add: { models: [] }, remove: { combos: [] } }),
    { params: Promise.resolve({ id: ordinary.id }) }
  );
  assert.equal(emptyListsRes.status, 400);

  // Only whitespace strings
  const whitespaceRes = await accessRoute.POST(
    postRequest(ordinary.id, { add: { models: ["   "] } }),
    { params: Promise.resolve({ id: ordinary.id }) }
  );
  assert.equal(whitespaceRes.status, 400);

  // Only switchToRestricted without any add or remove
  const onlySwitchRes = await accessRoute.POST(
    postRequest(ordinary.id, { switchToRestricted: true }),
    { params: Promise.resolve({ id: ordinary.id }) }
  );
  assert.equal(onlySwitchRes.status, 400);

  const body = (await emptyRes.json()) as unknown;
  assert.equal(JSON.stringify(body).includes("at /"), false);
});

test("3. Unknown key: 404 response", async () => {
  const response = await accessRoute.POST(
    postRequest("00000000-0000-0000-0000-000000000000", { add: { models: ["model-a"] } }),
    { params: Promise.resolve({ id: "00000000-0000-0000-0000-000000000000" }) }
  );
  assert.equal(response.status, 404);
  const body = (await response.json()) as unknown;
  assert.equal(JSON.stringify(body).includes("at /"), false);
});

test("4. 'All models' key: 409 conflict when adding models without switchToRestricted", async () => {
  const key = await apiKeys.createApiKey("AllKey", MACHINE_ID, [], {
    modelAccessMode: "all",
    allowedModels: [],
  });
  assert.equal((await apiKeys.getApiKeyById(key.id))?.modelAccessMode, "all");

  const response = await accessRoute.POST(
    postRequest(key.id, { add: { models: ["claude-3-7-sonnet"] } }),
    { params: Promise.resolve({ id: key.id }) }
  );

  assert.equal(response.status, 409);
  const body = (await response.json()) as { error?: { code?: string; message?: string } };
  assert.equal(body.error?.code, "key_allows_all_models");
  assert.ok(typeof body.error?.message === "string" && body.error.message.length > 0);
  assert.equal(JSON.stringify(body).includes("at /"), false);
});

test("5. 'All models' key: switchToRestricted switches mode and sets exactly added models", async () => {
  const key = await apiKeys.createApiKey("AllKey2", MACHINE_ID, [], {
    modelAccessMode: "all",
    allowedModels: [],
  });

  const response = await accessRoute.POST(
    postRequest(key.id, {
      add: { models: ["claude-3-7-sonnet", "gpt-4o"] },
      switchToRestricted: true,
    }),
    { params: Promise.resolve({ id: key.id }) }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    id: string;
    modelAccessMode: string;
    allowedModels: string[];
    allowedCombos: string[];
    changed: boolean;
  };

  assert.equal(body.id, key.id);
  assert.equal(body.modelAccessMode, "restricted");
  assert.deepEqual(body.allowedModels, ["claude-3-7-sonnet", "gpt-4o"]);
  assert.equal(body.changed, true);

  const updatedKey = await apiKeys.getApiKeyById(key.id);
  assert.equal(updatedKey?.modelAccessMode, "restricted");
  assert.deepEqual(updatedKey?.allowedModels, ["claude-3-7-sonnet", "gpt-4o"]);
});

test("6. Add/remove/dedupe/order on restricted key", async () => {
  const key = await apiKeys.createApiKey("RestrictedKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: ["m1", "m2"],
    allowedCombos: ["c1", "c2"],
  });

  const response = await accessRoute.POST(
    postRequest(key.id, {
      add: {
        models: ["m3", "m2", "m4"],
        combos: ["c3", "c2", "c4"],
      },
      remove: {
        models: ["m1", "m4"],
        combos: ["c2"],
      },
    }),
    { params: Promise.resolve({ id: key.id }) }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    modelAccessMode: string;
    allowedModels: string[];
    allowedCombos: string[];
    changed: boolean;
  };

  assert.equal(body.modelAccessMode, "restricted");
  // Existing then new, dedupe: ["m1", "m2", "m3", "m4"]
  // Removals applied after adds ("m1", "m4"): ["m2", "m3"]
  assert.deepEqual(body.allowedModels, ["m2", "m3"]);

  // Combos: existing then new: ["c1", "c2", "c3", "c4"]
  // Removals applied after adds ("c2"): ["c1", "c3", "c4"]
  assert.deepEqual(body.allowedCombos, ["c1", "c3", "c4"]);
  assert.equal(body.changed, true);

  const persisted = await apiKeys.getApiKeyById(key.id);
  assert.deepEqual(persisted?.allowedModels, ["m2", "m3"]);
  assert.deepEqual(persisted?.allowedCombos, ["c1", "c3", "c4"]);
});

test("7. Removing from an 'all' key is a no-op 200 with changed: false", async () => {
  const key = await apiKeys.createApiKey("AllKeyRemove", MACHINE_ID, [], {
    modelAccessMode: "all",
    allowedModels: [],
  });

  const response = await accessRoute.POST(
    postRequest(key.id, {
      remove: { models: ["some-model"] },
    }),
    { params: Promise.resolve({ id: key.id }) }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    modelAccessMode: string;
    allowedModels: string[];
    changed: boolean;
  };

  assert.equal(body.modelAccessMode, "all");
  assert.deepEqual(body.allowedModels, []);
  assert.equal(body.changed, false);
});

test("8. No-op update returns 200 with changed: false", async () => {
  const key = await apiKeys.createApiKey("NoopKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: ["m1"],
    allowedCombos: ["c1"],
  });

  const response = await accessRoute.POST(
    postRequest(key.id, {
      add: { models: ["m1"] },
      remove: { models: ["nonexistent"] },
    }),
    { params: Promise.resolve({ id: key.id }) }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as { changed: boolean; allowedModels: string[] };
  assert.equal(body.changed, false);
  assert.deepEqual(body.allowedModels, ["m1"]);
});

test("9. Caps 400: rejects when resulting models > 1000 or combos > 500", async () => {
  const key = await apiKeys.createApiKey("CapKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: [],
    allowedCombos: [],
  });

  const tooManyModels = Array.from({ length: 1001 }, (_, i) => `mod-${i}`);
  const responseModels = await accessRoute.POST(
    postRequest(key.id, { add: { models: tooManyModels } }),
    { params: Promise.resolve({ id: key.id }) }
  );
  assert.equal(responseModels.status, 400);
  const bodyModels = (await responseModels.json()) as unknown;
  assert.equal(JSON.stringify(bodyModels).includes("at /"), false);

  const tooManyCombos = Array.from({ length: 501 }, (_, i) => `combo-${i}`);
  const responseCombos = await accessRoute.POST(
    postRequest(key.id, { add: { combos: tooManyCombos } }),
    { params: Promise.resolve({ id: key.id }) }
  );
  assert.equal(responseCombos.status, 400);
  const bodyCombos = (await responseCombos.json()) as unknown;
  assert.equal(JSON.stringify(bodyCombos).includes("at /"), false);
});

test("10. Concurrent calls both applied (no lost updates via async lock)", async () => {
  const key = await apiKeys.createApiKey("ConcurrentKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: ["base"],
    allowedCombos: ["combo-base"],
  });

  // Launch two concurrent requests against the same key
  const req1 = accessRoute.POST(
    postRequest(key.id, { add: { models: ["concurrent-1"], combos: ["combo-1"] } }),
    { params: Promise.resolve({ id: key.id }) }
  );
  const req2 = accessRoute.POST(
    postRequest(key.id, { add: { models: ["concurrent-2"], combos: ["combo-2"] } }),
    { params: Promise.resolve({ id: key.id }) }
  );

  const [res1, res2] = await Promise.all([req1, req2]);
  assert.equal(res1.status, 200);
  assert.equal(res2.status, 200);

  const finalKey = await apiKeys.getApiKeyById(key.id);
  assert.ok(finalKey?.allowedModels.includes("base"));
  assert.ok(finalKey?.allowedModels.includes("concurrent-1"));
  assert.ok(finalKey?.allowedModels.includes("concurrent-2"));
  assert.equal(finalKey?.allowedModels.length, 3);

  assert.ok(finalKey?.allowedCombos.includes("combo-base"));
  assert.ok(finalKey?.allowedCombos.includes("combo-1"));
  assert.ok(finalKey?.allowedCombos.includes("combo-2"));
  assert.equal(finalKey?.allowedCombos.length, 3);
});

test("11. ApiKeyPolicyInvariantError: returns 400 with lease_error classification", async () => {
  const key = await apiKeys.createApiKey("LeaseKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: ["m1"],
  });

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  (db as { prepare: typeof originalPrepare }).prepare = ((sql: string, ...args: unknown[]) => {
    if (typeof sql === "string" && sql.includes("UPDATE api_keys SET")) {
      throw new apiKeys.ApiKeyPolicyInvariantError(
        "lease:exclusive requires explicit allowedConnections"
      );
    }
    return originalPrepare(sql, ...args);
  }) as typeof db.prepare;

  try {
    const response = await accessRoute.POST(postRequest(key.id, { add: { models: ["m2"] } }), {
      params: Promise.resolve({ id: key.id }),
    });

    assert.equal(response.status, 400);
    const body = (await response.json()) as {
      error?: { type?: string; code?: string; message?: string };
    };
    assert.equal(body.error?.type, "lease_error");
    assert.equal(body.error?.code, "LEASE_KEY_POLICY_INVALID");
    assert.equal(body.error?.message, "lease:exclusive requires explicit allowedConnections");
    assert.equal(JSON.stringify(body).includes("at /"), false);
  } finally {
    (db as { prepare: typeof originalPrepare }).prepare = originalPrepare;
  }
});

test("12. assignApiKeyAccess DB function directly rejects all-mode key without switch", async () => {
  const key = await apiKeys.createApiKey("DirectAllKey", MACHINE_ID, [], {
    modelAccessMode: "all",
    allowedModels: [],
  });

  await assert.rejects(
    assignApiKeyAccess(key.id, { add: { models: ["direct-model"] } }),
    KeyAllowsAllModelsError
  );
});

test("13. assignApiKeyAccess DB function directly rejects cap violations", async () => {
  const key = await apiKeys.createApiKey("DirectCapKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: [],
  });

  const overflow = Array.from({ length: 1001 }, (_, i) => `mod-${i}`);
  await assert.rejects(
    assignApiKeyAccess(key.id, { add: { models: overflow } }),
    KeyAccessCapExceededError
  );
});
