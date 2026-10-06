/**
 * Acceptance: API Manager dynamic provider model permissions
 *
 * Confirmed examples (traceable rules):
 *   R1 Legacy empty allowedModels remains allow-all unless explicitly marked restricted.
 *   R2 Explicit restricted mode with zero provider/model selections is deny-all.
 *   R3 allowedModels ["ollama-cloud/*", "openai/gpt-4.1"] allows every current/future
 *      ollama-cloud/... model + that exact OpenAI model; denies unselected providers.
 *   R3b Namespace boundary: ollama-cloud/* must NOT match ollama-cloudx/model.
 *   R4 Selecting provider ollama-cloud saves canonical ollama-cloud/* (not snapshot IDs);
 *      children are inherited/non-individually-toggleable; reopening restores provider scope;
 *      manual exact selections from other providers coexist; alias-prefixed catalog IDs
 *      (e.g. ollamacloud/llama3 with owned_by ollama-cloud) map via canonical provider id.
 *   R5 Management PATCH persists explicit modelAccessMode ("all" | "restricted").
 *
 * Public shape under test: modelAccessMode: "all" | "restricted".
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-perms-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-provider-perms";
delete process.env.INITIAL_PASSWORD;
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const keysRoute = await import("../../src/app/api/keys/[id]/route.ts");
const jsonImportRoute = await import("../../src/app/api/settings/import-json/route.ts");
const jsonMigration = await import("../../src/lib/db/jsonMigration.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");
const apiKeyPolicy = await import("../../src/shared/utils/apiKeyPolicy.ts");
const pageUtils =
  await import("../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.ts");

async function resetStorage() {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
  catalogCache.__resetCatalogBuilderRunsForTest();
}

await resetStorage();

test.after(async () => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

// ──────────────── R1 / R2 / R3 — DB policy via isModelAllowedForKey ────────────────

test("R1: legacy empty allowedModels without restricted mode remains allow-all", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Legacy Allow All", "ma-provider-r1");

  // Default create: empty allow-list, no explicit restricted mode.
  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.allowedModels, []);
  // Absent / non-restricted mode must keep the historical allow-all semantics.
  assert.notEqual(
    (meta as { modelAccessMode?: string | null }).modelAccessMode,
    "restricted",
    "legacy keys must not be treated as restricted"
  );

  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "ollama-cloud/llama3"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4.1"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "anthropic/claude-3"), true);
});

test("R2: explicit restricted mode with zero selections is deny-all", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Restricted Empty", "ma-provider-r2");

  const updated = await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
  } as Parameters<typeof apiKeys.updateApiKeyPermissions>[1] & {
    modelAccessMode: "restricted";
  });
  assert.equal(updated, true);
  apiKeys.resetApiKeyState();

  // Core policy: restricted + empty selection denies every model (not legacy allow-all).
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "ollama-cloud/llama3"), false);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4.1"), false);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "any/model"), false);

  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.allowedModels, []);
  assert.equal(
    (meta as { modelAccessMode?: string }).modelAccessMode,
    "restricted",
    "modelAccessMode must round-trip on metadata"
  );
  const policyRejection = await apiKeyPolicy.validateApiKeyRoutingTarget(
    new Request("http://localhost/v1/chat/completions"),
    created.key,
    meta,
    "openai/gpt-4.1"
  );
  assert.equal(policyRejection?.status, 403, "the request-policy seam must also deny every model");
});

test("R3: provider wildcard + exact model are OR-combined; unselected providers denied", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Provider Union", "ma-provider-r3");

  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: ["ollama-cloud/*", "openai/gpt-4.1"],
  } as Parameters<typeof apiKeys.updateApiKeyPermissions>[1] & {
    modelAccessMode: "restricted";
  });
  apiKeys.resetApiKeyState();

  // Current and future ollama-cloud models inherit the provider scope.
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "ollama-cloud/llama3"), true);
  assert.equal(
    await apiKeys.isModelAllowedForKey(created.key, "ollamacloud/llama3"),
    true,
    "canonical provider scope must authorize an alias-prefixed runtime model id"
  );
  const metadata = await apiKeys.getApiKeyMetadata(created.key);
  const policyRejection = await apiKeyPolicy.validateApiKeyRoutingTarget(
    new Request("http://localhost/v1/chat/completions"),
    created.key,
    metadata,
    "ollamacloud/llama3"
  );
  assert.equal(policyRejection, null, "the request-policy seam must accept provider inheritance");
  assert.equal(
    await apiKeys.isModelAllowedForKey(created.key, "ollama-cloud/new-model-after-import"),
    true
  );
  // Exact OpenAI selection remains allowed.
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4.1"), true);
  // Other OpenAI models and other providers stay denied.
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4o"), false);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "anthropic/claude-3"), false);

  const legacyAlias = await apiKeys.createApiKey("Legacy Alias Scope", "ma-provider-r3-alias");
  await apiKeys.updateApiKeyPermissions(legacyAlias.id, ["ollamacloud/*"]);
  assert.equal(
    await apiKeys.isModelAllowedForKey(legacyAlias.key, "ollama-cloud/llama3"),
    true,
    "legacy alias wildcard must continue authorizing the canonical runtime model id"
  );
});

test("R3b: provider namespace boundary — ollama-cloud/* denies ollama-cloudx/model", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Namespace Boundary", "ma-provider-r3b");

  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: ["ollama-cloud/*"],
  } as Parameters<typeof apiKeys.updateApiKeyPermissions>[1] & {
    modelAccessMode: "restricted";
  });
  apiKeys.resetApiKeyState();

  // Positive control: true children of the provider scope remain allowed.
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "ollama-cloud/llama3"), true);
  // Security: prefix must not leak across provider id boundaries.
  assert.equal(
    await apiKeys.isModelAllowedForKey(created.key, "ollama-cloudx/model"),
    false,
    "ollama-cloud/* must not authorize ollama-cloudx/model"
  );
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "ollama-cloud-extra/foo"), false);

  // Pure matcher seam (same rule, no DB).
  const modelPermissions = await import("../../src/lib/db/apiKeys/modelPermissions.ts");
  assert.equal(
    modelPermissions.modelPatternMatches("ollama-cloud/*", ["ollama-cloudx/model"]),
    false,
    "modelPatternMatches must enforce provider segment boundary"
  );
  assert.equal(
    modelPermissions.modelPatternMatches("ollama-cloud/*", ["ollama-cloud/llama3"]),
    true
  );
});

test("R2/R5: JSON import preserves explicit restricted + empty and infers legacy mode", async () => {
  await resetStorage();

  jsonMigration.runJsonMigration(core.getDbInstance(), {
    apiKeys: [
      {
        id: "json-restricted-empty",
        name: "JSON Restricted Empty",
        key: "omni_json_restricted_empty",
        modelAccessMode: "restricted",
        allowedModels: [],
      },
      {
        id: "json-legacy-restricted",
        name: "JSON Legacy Restricted",
        key: "omni_json_legacy_restricted",
        allowedModels: ["ollama-cloud/*"],
      },
      {
        id: "json-legacy-all",
        name: "JSON Legacy All",
        key: "omni_json_legacy_all",
        allowedModels: [],
      },
    ],
  });
  apiKeys.resetApiKeyState();

  const restrictedEmpty = await apiKeys.getApiKeyMetadata("omni_json_restricted_empty");
  assert.equal(restrictedEmpty?.modelAccessMode, "restricted");
  assert.deepEqual(restrictedEmpty?.allowedModels, []);
  assert.equal(
    await apiKeys.isModelAllowedForKey("omni_json_restricted_empty", "openai/gpt-4.1"),
    false
  );

  const legacyRestricted = await apiKeys.getApiKeyMetadata("omni_json_legacy_restricted");
  assert.equal(legacyRestricted?.modelAccessMode, "restricted");
  assert.equal(
    await apiKeys.isModelAllowedForKey("omni_json_legacy_restricted", "ollama-cloud/new-model"),
    true
  );

  const legacyAll = await apiKeys.getApiKeyMetadata("omni_json_legacy_all");
  assert.equal(legacyAll?.modelAccessMode, "all");
  assert.equal(await apiKeys.isModelAllowedForKey("omni_json_legacy_all", "any/model"), true);
});

test("R2/R5: startup db.json migration preserves explicit restricted-empty mode", async () => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(TEST_DATA_DIR, "db.json"),
    JSON.stringify({
      apiKeys: [
        {
          id: "startup-restricted-empty",
          name: "Startup Restricted Empty",
          key: "omni_startup_restricted_empty",
          modelAccessMode: "restricted",
          allowedModels: [],
        },
      ],
    })
  );

  core.getDbInstance();
  const metadata = await apiKeys.getApiKeyMetadata("omni_startup_restricted_empty");
  assert.equal(metadata?.modelAccessMode, "restricted");
  assert.deepEqual(metadata?.allowedModels, []);
  assert.equal(
    await apiKeys.isModelAllowedForKey("omni_startup_restricted_empty", "openai/gpt-4.1"),
    false
  );
});

test("R2/R5: dashboard JSON import invalidates warm permission and catalog caches", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Import Cache", "ma-provider-import-cache");
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4.1"), true);

  const catalogRequest = () =>
    new Request("http://localhost/v1/models", { headers: { Authorization: created.key } });
  const headers = { corsHeaders: {}, diagnosticHeaders: {} };
  const catalogPayload = (body: string) => ({
    body,
    headers: { "content-type": "application/json" },
    status: 200,
    cacheTTL: 60_000,
  });
  assert.equal(
    await (
      await catalogCache.resolveCachedCatalogResponse(catalogRequest(), headers, async () =>
        catalogPayload("OLD")
      )
    ).text(),
    "OLD"
  );

  const response = await jsonImportRoute.POST(
    new Request("http://localhost/api/settings/import-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKeys: [
          {
            id: created.id,
            name: "Import Cache",
            key: created.key,
            modelAccessMode: "restricted",
            allowedModels: [],
          },
        ],
      }),
    })
  );
  assert.equal(response.status, 200);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4.1"), false);

  let freshBuilds = 0;
  const catalogAfterImport = await catalogCache.resolveCachedCatalogResponse(
    catalogRequest(),
    headers,
    async () => {
      freshBuilds++;
      return catalogPayload("NEW");
    }
  );
  assert.equal(await catalogAfterImport.text(), "NEW");
  assert.equal(freshBuilds, 1);
});

test("R2/R5: updateApiKeyPermissions persists modelAccessMode on getApiKeyById", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Mode Persist", "ma-provider-r5-db");

  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: ["ollama-cloud/*"],
  } as Parameters<typeof apiKeys.updateApiKeyPermissions>[1] & {
    modelAccessMode: "restricted";
  });
  apiKeys.resetApiKeyState();

  const row = await apiKeys.getApiKeyById(created.id);
  assert.ok(row);
  assert.equal(
    (row as { modelAccessMode?: string }).modelAccessMode,
    "restricted",
    "getApiKeyById must expose persisted modelAccessMode"
  );
  assert.deepEqual(row!.allowedModels, ["ollama-cloud/*"]);

  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "all",
    allowedModels: [],
  } as Parameters<typeof apiKeys.updateApiKeyPermissions>[1] & {
    modelAccessMode: "all";
  });
  apiKeys.resetApiKeyState();

  const allRow = await apiKeys.getApiKeyById(created.id);
  assert.equal((allRow as { modelAccessMode?: string }).modelAccessMode, "all");
  assert.deepEqual(allRow!.allowedModels, []);
});

test("R5: unrelated API key writes retain the filtered model catalog cache", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Catalog Stable", "ma-provider-catalog-stable");
  const request = () =>
    new Request("http://localhost/v1/models", { headers: { Authorization: created.key } });
  const headers = { corsHeaders: {}, diagnosticHeaders: {} };
  const payload = {
    body: "CACHED",
    headers: { "content-type": "application/json" },
    status: 200,
    cacheTTL: 60_000,
  };

  await catalogCache.resolveCachedCatalogResponse(request(), headers, async () => payload);
  await apiKeys.updateApiKeyPermissions(created.id, { name: "Catalog Stable Renamed" });

  let rebuilds = 0;
  const response = await catalogCache.resolveCachedCatalogResponse(request(), headers, async () => {
    rebuilds++;
    return { ...payload, body: "UNEXPECTED" };
  });
  assert.equal(await response.text(), "CACHED");
  assert.equal(rebuilds, 0);
});

test("R4/R5: permission writes detach stale in-flight model catalog builds", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Catalog Invalidation", "ma-provider-catalog");
  const request = () =>
    new Request("http://localhost/v1/models", { headers: { Authorization: created.key } });
  const headers = { corsHeaders: {}, diagnosticHeaders: {} };
  const payload = (body: string) => ({
    body,
    headers: { "content-type": "application/json" },
    status: 200,
    cacheTTL: 60_000,
  });

  let releaseOld!: (value: ReturnType<typeof payload>) => void;
  let oldCalls = 0;
  const oldGate = new Promise<ReturnType<typeof payload>>((resolve) => {
    releaseOld = resolve;
  });
  const oldResponsePromise = catalogCache.resolveCachedCatalogResponse(request(), headers, () => {
    oldCalls++;
    return oldGate;
  });
  await Promise.resolve();
  assert.equal(oldCalls, 1);

  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: ["ollama-cloud/*"],
  });

  let freshCalls = 0;
  const freshResponse = await catalogCache.resolveCachedCatalogResponse(
    request(),
    headers,
    async () => {
      freshCalls++;
      return payload("NEW");
    }
  );
  assert.equal(freshCalls, 1, "post-write request must not join the stale pre-write build");
  assert.equal(await freshResponse.text(), "NEW");

  releaseOld(payload("OLD"));
  assert.equal(await (await oldResponsePromise).text(), "OLD");

  let unexpectedCalls = 0;
  const cachedResponse = await catalogCache.resolveCachedCatalogResponse(
    request(),
    headers,
    async () => {
      unexpectedCalls++;
      return payload("UNEXPECTED");
    }
  );
  assert.equal(await cachedResponse.text(), "NEW");
  assert.equal(unexpectedCalls, 0, "stale completion must not overwrite the current catalog cache");
});

// ──────────────── R5 — schema + management PATCH ────────────────

test("R5: updateKeyPermissionsSchema accepts and retains modelAccessMode", () => {
  const restrictedEmpty = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    modelAccessMode: "restricted",
    allowedModels: [],
  });
  assert.equal(restrictedEmpty.success, true, "restricted + empty allowedModels must be valid");
  assert.equal(
    (restrictedEmpty as { success: true; data: { modelAccessMode?: string } }).data.modelAccessMode,
    "restricted",
    "schema must retain modelAccessMode (not strip it)"
  );

  const allMode = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    modelAccessMode: "all",
  });
  assert.equal(allMode.success, true, "modelAccessMode-only update must be a valid payload");
  assert.equal(
    (allMode as { success: true; data: { modelAccessMode?: string } }).data.modelAccessMode,
    "all"
  );

  const invalidMode = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    modelAccessMode: "maybe",
  });
  assert.equal(invalidMode.success, false, "unknown modelAccessMode values must be rejected");

  const contradictoryAll = schemas.validateBody(schemas.updateKeyPermissionsSchema, {
    modelAccessMode: "all",
    allowedModels: ["ollama-cloud/*"],
  });
  assert.equal(contradictoryAll.success, false, "all mode with a non-empty allow-list is invalid");
});

test("R1/R5: legacy PATCH payloads infer mode from allowedModels", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Legacy Patch", "ma-provider-legacy-patch");

  const restrictResponse = await keysRoute.PATCH(
    new Request(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowedModels: ["ollama-cloud/*"] }),
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  assert.equal(restrictResponse.status, 200);
  apiKeys.resetApiKeyState();
  assert.equal((await apiKeys.getApiKeyById(created.id))?.modelAccessMode, "restricted");

  const unrelatedResponse = await keysRoute.PATCH(
    new Request(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Legacy Patch Renamed" }),
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  assert.equal(unrelatedResponse.status, 200);
  apiKeys.resetApiKeyState();
  const unchanged = await apiKeys.getApiKeyById(created.id);
  assert.equal(unchanged?.modelAccessMode, "restricted");
  assert.deepEqual(unchanged?.allowedModels, ["ollama-cloud/*"]);

  const allowAllResponse = await keysRoute.PATCH(
    new Request(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowedModels: [] }),
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  assert.equal(allowAllResponse.status, 200);
  apiKeys.resetApiKeyState();
  const allowAll = await apiKeys.getApiKeyById(created.id);
  assert.equal(allowAll?.modelAccessMode, "all");
  assert.deepEqual(allowAll?.allowedModels, []);
});

test("R5: PATCH /api/keys/[id] persists modelAccessMode restricted + empty allow-list", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Patch Mode", "ma-provider-r5-patch");

  const response = await keysRoute.PATCH(
    new Request(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelAccessMode: "restricted",
        allowedModels: [],
      }),
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const body = (await response.json()) as {
    modelAccessMode?: string;
    allowedModels?: string[];
    error?: unknown;
  };

  assert.equal(
    response.status,
    200,
    `expected 200, got ${response.status}: ${JSON.stringify(body)}`
  );
  assert.equal(body.modelAccessMode, "restricted");
  assert.deepEqual(body.allowedModels, []);

  apiKeys.resetApiKeyState();
  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.equal((meta as { modelAccessMode?: string } | null)?.modelAccessMode, "restricted");
  assert.deepEqual(meta?.allowedModels, []);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4.1"), false);
});

// ──────────────── R2 / R4 — UI classification + provider-scope helpers ────────────────

test("R2: isRestricted treats explicit restricted mode with empty allowedModels as restricted", () => {
  // Existing helper must honor the new dual empty-array semantics.
  const restrictedEmpty = {
    allowedModels: [] as string[],
    allowedConnections: null,
    modelAccessMode: "restricted" as const,
  };
  assert.equal(
    pageUtils.isRestricted(restrictedEmpty as Parameters<typeof pageUtils.isRestricted>[0]),
    true,
    "restricted + empty selections must classify as restricted (not standard allow-all)"
  );

  const legacyEmpty = {
    allowedModels: [] as string[],
    allowedConnections: null,
  };
  assert.equal(
    pageUtils.isRestricted(legacyEmpty),
    false,
    "legacy empty without restricted mode stays unrestricted"
  );
});

test("R4: provider selection helpers emit canonical provider/* and keep other exact selections", () => {
  type ProviderModelRef = { id: string; owned_by?: string; providerId?: string };
  type ProviderScopeOptions = {
    providerId?: string;
    ownedBy?: string;
    providerModels?: ProviderModelRef[];
  };

  const utils = pageUtils as typeof pageUtils & {
    toggleProviderWildcardSelection?: (
      selected: string[],
      providerId: string,
      options?: ProviderScopeOptions
    ) => string[];
    isModelInheritedByProviderScope?: (
      selected: string[],
      modelId: string,
      options?: ProviderScopeOptions
    ) => boolean;
    isModelIndividuallyToggleable?: (
      selected: string[],
      modelId: string,
      options?: ProviderScopeOptions
    ) => boolean;
    restoreProviderScopeSelection?: (
      allowedModels: string[],
      options?: { providerModels?: ProviderModelRef[] }
    ) => {
      providerWildcards: string[];
      exactModels: string[];
    };
    buildModelAccessSavePayload?: (input: { allowAll: boolean; selectedModels: string[] }) => {
      modelAccessMode: "all" | "restricted";
      allowedModels: string[];
    };
    formatProviderModelPermissionSummary?: (
      providerCount: number,
      modelCount: number,
      t: (key: string, values?: Record<string, unknown>) => string,
      tc: (key: string) => string
    ) => string;
  };

  assert.equal(
    typeof utils.toggleProviderWildcardSelection,
    "function",
    "UI must expose toggleProviderWildcardSelection for provider-scope selection"
  );
  assert.equal(
    typeof utils.isModelInheritedByProviderScope,
    "function",
    "UI must expose isModelInheritedByProviderScope for inherited children"
  );
  assert.equal(
    typeof utils.isModelIndividuallyToggleable,
    "function",
    "UI must expose isModelIndividuallyToggleable so provider children are non-toggleable"
  );
  assert.equal(
    typeof utils.restoreProviderScopeSelection,
    "function",
    "UI must expose restoreProviderScopeSelection so reopening restores provider/*"
  );
  assert.equal(
    typeof utils.buildModelAccessSavePayload,
    "function",
    "UI must expose buildModelAccessSavePayload for modelAccessMode + allowedModels"
  );
  assert.equal(
    typeof utils.formatProviderModelPermissionSummary,
    "function",
    "UI must expose one provider/model summary formatter for every display surface"
  );

  const t = (key: string, values?: Record<string, unknown>) => {
    if (key === "modelsCount") return `${values?.count} model${values?.count === 1 ? "" : "s"}`;
    if (key === "selectedCount") return `${values?.count} selected`;
    return key;
  };
  const tc = (key: string) => key;
  assert.deepEqual(pageUtils.restoreProviderScopeSelection(["codex/*", "openai/gpt-4.1"]), {
    providerWildcards: ["codex/*"],
    exactModels: ["openai/gpt-4.1"],
  });
  assert.equal(utils.formatProviderModelPermissionSummary!(1, 1, t, tc), "1 provider · 1 model");
  assert.equal(utils.formatProviderModelPermissionSummary!(1, 0, t, tc), "1 provider");
  assert.equal(utils.formatProviderModelPermissionSummary!(0, 2, t, tc), "2 models");

  // Selecting ollama-cloud adds canonical wildcard; coexists with openai exact.
  assert.deepEqual(utils.toggleProviderWildcardSelection!(["openai/gpt-4.1"], "ollama-cloud"), [
    "openai/gpt-4.1",
    "ollama-cloud/*",
  ]);

  // Selecting again removes only that provider wildcard.
  assert.deepEqual(
    utils.toggleProviderWildcardSelection!(["openai/gpt-4.1", "ollama-cloud/*"], "ollama-cloud"),
    ["openai/gpt-4.1"]
  );

  // Selecting a provider replaces any previously expanded exact child IDs for that provider.
  assert.deepEqual(
    utils.toggleProviderWildcardSelection!(
      ["ollama-cloud/llama3", "ollama-cloud/qwen", "openai/gpt-4.1"],
      "ollama-cloud"
    ),
    ["openai/gpt-4.1", "ollama-cloud/*"]
  );

  // Alias-prefixed catalog IDs (id prefix ≠ canonical provider) still collapse via owned_by.
  // Example: catalog model id `ollamacloud/llama3` with owned_by/providerId `ollama-cloud`.
  const aliasPrefixedCatalog: ProviderModelRef[] = [
    { id: "ollamacloud/llama3", owned_by: "ollama-cloud", providerId: "ollama-cloud" },
    { id: "ollamacloud/qwen", owned_by: "ollama-cloud", providerId: "ollama-cloud" },
  ];
  assert.deepEqual(
    utils.toggleProviderWildcardSelection!(
      ["ollamacloud/llama3", "ollamacloud/qwen", "openai/gpt-4.1"],
      "ollama-cloud",
      { providerId: "ollama-cloud", providerModels: aliasPrefixedCatalog }
    ),
    ["openai/gpt-4.1", "ollama-cloud/*"],
    "toggle must remove alias-prefixed children and emit canonical ollama-cloud/*"
  );

  // Children under a selected provider are inherited and not individually toggleable.
  assert.equal(
    utils.isModelInheritedByProviderScope!(
      ["ollama-cloud/*", "openai/gpt-4.1"],
      "ollama-cloud/llama3"
    ),
    true
  );
  assert.equal(
    utils.isModelInheritedByProviderScope!(["ollama-cloud/*"], "ollamacloud/llama3", {
      providerId: "ollama-cloud",
      ownedBy: "ollama-cloud",
    }),
    true,
    "alias-prefixed id must still be recognized as inherited under canonical provider scope"
  );
  assert.equal(
    utils.isModelIndividuallyToggleable!(
      ["ollama-cloud/*", "openai/gpt-4.1"],
      "ollama-cloud/llama3"
    ),
    false
  );
  assert.equal(
    utils.isModelIndividuallyToggleable!(["ollama-cloud/*"], "ollamacloud/llama3", {
      providerId: "ollama-cloud",
    }),
    false,
    "alias-prefixed children of a selected provider must not be individually toggleable"
  );
  assert.equal(
    utils.isModelIndividuallyToggleable!(["ollama-cloud/*", "openai/gpt-4.1"], "openai/gpt-4.1"),
    true
  );

  // Reopening restores provider-level scope from stored allowedModels.
  assert.deepEqual(utils.restoreProviderScopeSelection!(["ollama-cloud/*", "openai/gpt-4.1"]), {
    providerWildcards: ["ollama-cloud/*"],
    exactModels: ["openai/gpt-4.1"],
  });

  // Restrict with zero selections must save restricted + [].
  assert.deepEqual(utils.buildModelAccessSavePayload!({ allowAll: false, selectedModels: [] }), {
    modelAccessMode: "restricted",
    allowedModels: [],
  });

  // Allow-all mode.
  assert.deepEqual(
    utils.buildModelAccessSavePayload!({
      allowAll: true,
      selectedModels: ["ollama-cloud/*"],
    }),
    { modelAccessMode: "all", allowedModels: [] }
  );

  // Restrict with provider + exact selections.
  assert.deepEqual(
    utils.buildModelAccessSavePayload!({
      allowAll: false,
      selectedModels: ["ollama-cloud/*", "openai/gpt-4.1"],
    }),
    {
      modelAccessMode: "restricted",
      allowedModels: ["ollama-cloud/*", "openai/gpt-4.1"],
    }
  );
});
