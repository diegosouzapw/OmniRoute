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
const {
  assignApiKeyAccess,
  KeyAllowsAllModelsError,
  KeyAllowsAllCombosError,
  KeyAccessCapExceededError,
  EmptyRestrictedAccessListError,
} = await import("../../src/lib/db/apiKeyAccessAssign.ts");

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

test("11. Default key: has combo/* and empty blockedModels; handles all-combos restrictions", async () => {
  const defaultKey = await apiKeys.createApiKey("DefaultFreshKey", MACHINE_ID);
  const loaded = await apiKeys.getApiKeyById(defaultKey.id);

  assert.deepEqual(loaded?.allowedCombos, ["combo/*"]);
  assert.deepEqual(loaded?.blockedModels, []);

  // 11a. Adding combos to a default key without switchToRestricted returns 409 key_allows_all_combos
  const resConflict = await accessRoute.POST(
    postRequest(defaultKey.id, { add: { combos: ["smart-routing"] } }),
    { params: Promise.resolve({ id: defaultKey.id }) }
  );
  assert.equal(resConflict.status, 409);
  const conflictBody = (await resConflict.json()) as { error?: { code?: string } };
  assert.equal(conflictBody.error?.code, "key_allows_all_combos");

  // 11b. Removing combos from an all-combos key is a no-op 200 with changed: false
  const resRemove = await accessRoute.POST(
    postRequest(defaultKey.id, { remove: { combos: ["nonexistent"] } }),
    { params: Promise.resolve({ id: defaultKey.id }) }
  );
  assert.equal(resRemove.status, 200);
  const removeBody = (await resRemove.json()) as { changed: boolean; allowedCombos: string[] };
  assert.equal(removeBody.changed, false);
  assert.deepEqual(removeBody.allowedCombos, ["combo/*"]);

  // 11c. Adding combos with switchToRestricted drops combo/* and sets exactly added combos
  const resSwitch = await accessRoute.POST(
    postRequest(defaultKey.id, {
      add: { combos: ["smart-routing", "fast-combo"] },
      switchToRestricted: true,
    }),
    { params: Promise.resolve({ id: defaultKey.id }) }
  );
  assert.equal(resSwitch.status, 200);
  const switchBody = (await resSwitch.json()) as { changed: boolean; allowedCombos: string[] };
  assert.equal(switchBody.changed, true);
  assert.deepEqual(switchBody.allowedCombos, ["smart-routing", "fast-combo"]);
  assert.equal(switchBody.allowedCombos.includes("combo/*"), false);
});

test("12. Normalized combo names: compares foo and combo/foo when deduping and removing", async () => {
  const key = await apiKeys.createApiKey("NormComboKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: ["m1"],
    allowedCombos: ["my-combo", "combo/second-combo"],
  });

  // Adding "combo/my-combo" should dedupe with existing "my-combo"
  // Adding "new-combo" should be added
  // Removing "second-combo" should remove "combo/second-combo"
  const response = await accessRoute.POST(
    postRequest(key.id, {
      add: { combos: ["combo/my-combo", "new-combo", "combo/new-combo"] },
      remove: { combos: ["second-combo"] },
    }),
    { params: Promise.resolve({ id: key.id }) }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as { allowedCombos: string[] };
  // "my-combo" retained (combo/my-combo deduped)
  // "combo/second-combo" removed because "second-combo" matched it normalized
  // "new-combo" added, "combo/new-combo" deduped
  assert.deepEqual(body.allowedCombos, ["my-combo", "new-combo"]);

  // Test removing by prefixed name "combo/my-combo"
  const response2 = await accessRoute.POST(
    postRequest(key.id, {
      remove: { combos: ["combo/my-combo"] },
    }),
    { params: Promise.resolve({ id: key.id }) }
  );
  assert.equal(response2.status, 200);
  const body2 = (await response2.json()) as { allowedCombos: string[] };
  assert.deepEqual(body2.allowedCombos, ["new-combo"]);
});

test("13. Net empty restricted list: rejected with 400 when switching from all", async () => {
  // Models: switching all-models key where add & remove cancel out
  const modelKey = await apiKeys.createApiKey("EmptyRestrictedModelKey", MACHINE_ID, [], {
    modelAccessMode: "all",
    allowedModels: [],
  });

  const resModel = await accessRoute.POST(
    postRequest(modelKey.id, {
      add: { models: ["cancel-me"] },
      remove: { models: ["cancel-me"] },
      switchToRestricted: true,
    }),
    { params: Promise.resolve({ id: modelKey.id }) }
  );
  assert.equal(resModel.status, 400);
  const bodyModel = (await resModel.json()) as { error?: { message?: string } };
  assert.ok(bodyModel.error?.message?.includes("cannot result in an empty allowlist"));

  // Combos: switching all-combos key where add & remove cancel out
  const comboKey = await apiKeys.createApiKey("EmptyRestrictedComboKey", MACHINE_ID);
  const resCombo = await accessRoute.POST(
    postRequest(comboKey.id, {
      add: { combos: ["cancel-combo"] },
      remove: { combos: ["combo/cancel-combo"] },
      switchToRestricted: true,
    }),
    { params: Promise.resolve({ id: comboKey.id }) }
  );
  assert.equal(resCombo.status, 400);
  const bodyCombo = (await resCombo.json()) as { error?: { message?: string } };
  assert.ok(bodyCombo.error?.message?.includes("cannot result in an empty allowlist"));
});

test("14. Merged-cap test: rejects when existing + added exceeds limit (999 + 2 -> 400)", async () => {
  // Models cap: 999 existing + 2 added = 1001 > 1000
  const existingModels = Array.from({ length: 999 }, (_, i) => `existing-mod-${i}`);
  const modelCapKey = await apiKeys.createApiKey("ModelMergedCapKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: existingModels,
    allowedCombos: [],
  });

  const resModelCap = await accessRoute.POST(
    postRequest(modelCapKey.id, {
      add: { models: ["extra-1", "extra-2"] },
    }),
    { params: Promise.resolve({ id: modelCapKey.id }) }
  );
  assert.equal(resModelCap.status, 400);

  // Combos cap: 499 existing + 2 added = 501 > 500
  const existingCombos = Array.from({ length: 499 }, (_, i) => `existing-combo-${i}`);
  const comboCapKey = await apiKeys.createApiKey("ComboMergedCapKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: [],
    allowedCombos: existingCombos,
  });

  const resComboCap = await accessRoute.POST(
    postRequest(comboCapKey.id, {
      add: { combos: ["extra-c1", "extra-c2"] },
    }),
    { params: Promise.resolve({ id: comboCapKey.id }) }
  );
  assert.equal(resComboCap.status, 400);
});

test("15. Direct DB function: rejects all-mode key, cap violation, and empty restricted list", async () => {
  const allKey = await apiKeys.createApiKey("DirectAllKey", MACHINE_ID, [], {
    modelAccessMode: "all",
    allowedModels: [],
  });

  await assert.rejects(
    assignApiKeyAccess(allKey.id, { add: { models: ["direct-model"] } }),
    KeyAllowsAllModelsError
  );

  const defaultCombosKey = await apiKeys.createApiKey("DirectCombosKey", MACHINE_ID);
  await assert.rejects(
    assignApiKeyAccess(defaultCombosKey.id, { add: { combos: ["direct-combo"] } }),
    KeyAllowsAllCombosError
  );

  await assert.rejects(
    assignApiKeyAccess(allKey.id, {
      add: { models: ["mod"] },
      remove: { models: ["mod"] },
      switchToRestricted: true,
    }),
    EmptyRestrictedAccessListError
  );

  const restrictedKey = await apiKeys.createApiKey("DirectCapKey", MACHINE_ID, [], {
    modelAccessMode: "restricted",
    allowedModels: [],
    allowedCombos: [],
  });
  const overflow = Array.from({ length: 1001 }, (_, i) => `mod-${i}`);
  await assert.rejects(
    assignApiKeyAccess(restrictedKey.id, { add: { models: overflow } }),
    KeyAccessCapExceededError
  );
});
