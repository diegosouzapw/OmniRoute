/**
 * Per-key control over Claude Code discovery mirrors in GET /v1/models.
 *
 * The global/provider/model alias gates describe which already-authorized catalog
 * rows are eligible for a `claude/...` mirror. This key-level flag is the final
 * listing preference: legacy keys keep mirrors by default, while a key can opt out
 * without changing the models or combos it may actually call.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-alias-key-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET ||= "api-key-allow-cc-discovery-aliases-test-secret";
process.env.EXPOSE_CC_DISCOVERY_ALIASES = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const { API_KEY_COLUMN_FALLBACKS } = await import("../../src/lib/db/apiKeyColumnFallbacks.ts");
const { parseAllowCcDiscoveryAliases } = await import("../../src/lib/db/apiKeys/rowParsers.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const { applyCatalogPostFilters } = await import("../../src/app/api/v1/models/catalogResponse.ts");

const read = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

test.after(() => {
  delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("allow_cc_discovery_aliases defaults on for legacy rows", () => {
  const column = API_KEY_COLUMN_FALLBACKS.find(
    (candidate: { name: string }) => candidate.name === "allow_cc_discovery_aliases"
  );
  assert.ok(column, "api_keys must gain an allow_cc_discovery_aliases column");
  assert.match(column.definition, /NOT NULL DEFAULT 1/);

  assert.equal(parseAllowCcDiscoveryAliases(undefined), true);
  assert.equal(parseAllowCcDiscoveryAliases(null), true);
  assert.equal(parseAllowCcDiscoveryAliases(1), true);
  assert.equal(parseAllowCcDiscoveryAliases("1"), true);
  assert.equal(parseAllowCcDiscoveryAliases(true), true);
  assert.equal(parseAllowCcDiscoveryAliases(0), false);
  assert.equal(parseAllowCcDiscoveryAliases("0"), false);
  assert.equal(parseAllowCcDiscoveryAliases(false), false);
});

test("PATCH validation accepts the flag and rejects non-booleans", () => {
  const disabled = schemas.updateKeyPermissionsSchema.safeParse({
    allowCcDiscoveryAliases: false,
  });
  assert.equal(disabled.success, true);
  if (disabled.success) assert.equal(disabled.data.allowCcDiscoveryAliases, false);

  const enabled = schemas.updateKeyPermissionsSchema.safeParse({
    allowCcDiscoveryAliases: true,
  });
  assert.equal(enabled.success, true);
  if (enabled.success) assert.equal(enabled.data.allowCcDiscoveryAliases, true);

  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ allowCcDiscoveryAliases: "no" }).success,
    false
  );
});

test("permission updates persist and metadata hydration defaults to true", async () => {
  const created = await apiKeys.createApiKey("CC alias policy", "machine-cc-alias-policy");

  assert.equal((await apiKeys.getApiKeyById(created.id))?.allowCcDiscoveryAliases, true);
  assert.equal((await apiKeys.getApiKeyMetadata(created.key))?.allowCcDiscoveryAliases, true);

  assert.equal(
    await apiKeys.updateApiKeyPermissions(created.id, { allowCcDiscoveryAliases: false }),
    true
  );
  assert.equal((await apiKeys.getApiKeyById(created.id))?.allowCcDiscoveryAliases, false);
  assert.equal((await apiKeys.getApiKeyMetadata(created.key))?.allowCcDiscoveryAliases, false);
});

test("catalog post-filter defaults to mirrors on and supports per-key suppression", async () => {
  const authorizedRows = [
    {
      id: "gpt-5.6-luna",
      object: "model",
      owned_by: "combo",
      root: "gpt-5.6-luna",
    },
  ];
  const request = new Request("http://localhost/v1/models");
  const baseContext = {
    connections: [],
    prefixMode: "dual",
    aliasToProviderId: {},
  };

  const legacy = await applyCatalogPostFilters(request, authorizedRows, baseContext);
  assert.deepEqual(
    legacy.map((model) => model.id),
    ["gpt-5.6-luna", "claude/combo/gpt-5.6-luna"],
    "an absent key flag must preserve existing mirror discovery"
  );

  const suppressed = await applyCatalogPostFilters(request, authorizedRows, {
    ...baseContext,
    allowCcDiscoveryAliases: false,
  });
  assert.deepEqual(
    suppressed.map((model) => model.id),
    ["gpt-5.6-luna"],
    "the key flag must only remove discovery mirrors"
  );
  assert.equal(
    suppressed.some((model) => model.id.includes("claude")),
    false,
    "suppression must not substitute or widen authorization"
  );
});

test("PATCH route and API Manager wire the key policy end to end", () => {
  const route = read("src/app/api/keys/[id]/route.ts");
  assert.match(
    route,
    /if \(allowCcDiscoveryAliases !== undefined\)[\s\S]*?payload\.allowCcDiscoveryAliases = allowCcDiscoveryAliases/
  );

  const client = read("src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx");
  assert.ok(client.includes("ApiKeyCcDiscoveryAliasesToggle"));
  assert.ok(client.includes("apiKey?.allowCcDiscoveryAliases !== false"));
  assert.match(client, /body: JSON\.stringify\(\{[\s\S]*?allowCcDiscoveryAliases,[\s\S]*?\}\)/);

  const catalog = read("src/app/api/v1/models/catalog.ts");
  assert.equal(
    catalog.match(/allowCcDiscoveryAliases: earlyKeyMeta\?\.allowCcDiscoveryAliases !== false/g)
      ?.length,
    2,
    "both the quota short-circuit and full catalog must apply the key flag after filtering"
  );
});

test("API Manager strings exist in English and Vietnamese", () => {
  for (const locale of ["en", "vi"]) {
    const messages = JSON.parse(read(`src/i18n/messages/${locale}.json`));
    for (const key of ["ccDiscoveryAliasesTitle", "ccDiscoveryAliasesDesc"]) {
      const value = messages?.settings?.[key];
      assert.equal(typeof value, "string", `${locale}.json settings.${key} must exist`);
      assert.ok(value.trim().length > 0);
      assert.doesNotMatch(value, /__(?:MISSING|TODO)__/i);
    }
  }
});
