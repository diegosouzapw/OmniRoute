import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import {
  hasPerModelQuota,
  hasPerModelFailureScope,
  shouldMarkAccountExhaustedFrom429,
} from "../../open-sse/services/accountFallback.ts";
import { grokCli } from "../../src/lib/oauth/providers/grok-cli.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRepo(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

function extractNamedConstLiteral(source: string, name: string): string {
  const marker = "const " + name;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `${name} declaration missing`);
  const eq = source.indexOf("=", start + marker.length);
  assert.notEqual(eq, -1, `${name} has no initializer`);
  let i = eq + 1;
  while (i < source.length && source[i] !== "[" && source[i] !== "{") i += 1;
  assert.ok(source[i] === "[" || source[i] === "{", `${name} must be an array or object literal`);
  let depth = 0;
  for (let j = i; j < source.length; j += 1) {
    const ch = source[j];
    if (ch === "[" || ch === "{") depth += 1;
    else if (ch === "]" || ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(i, j + 1);
    }
  }
  assert.fail(`${name} literal is not closed`);
}

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-flagship-0day-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const dbCore = await import("../../src/lib/db/core.ts");

test.after(() => {
  dbCore.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("test 1: Claude models URL is exactly /v1/models?limit=1000", () => {
  assert.equal(
    PROVIDER_MODELS_CONFIG.claude.url,
    "https://api.anthropic.com/v1/models?limit=1000"
  );
});

test("test 2: Claude parseResponse keeps ids from data and defaults empty objects to []", () => {
  const parsed = PROVIDER_MODELS_CONFIG.claude.parseResponse({
    data: [{ id: "claude-opus-5-1" }],
    has_more: true,
    last_id: "x",
  });
  assert.ok(
    Array.isArray(parsed) &&
      parsed.some((model: { id?: string }) => model.id === "claude-opus-5-1"),
    "parseResponse must keep the id from data even when has_more is true"
  );
  assert.deepEqual(PROVIDER_MODELS_CONFIG.claude.parseResponse({}), []);
});

test("test 3: Claude passthrough stays off and 429 stays account-wide", () => {
  const claude = getRegistryEntry("claude");
  assert.ok(claude, "claude registry entry must exist");
  assert.notEqual(claude.passthroughModels, true);
  assert.equal(hasPerModelQuota("claude", "claude-opus-5-max"), false);
  assert.equal(shouldMarkAccountExhaustedFrom429("claude", "claude-sonnet-4-6"), true);
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max", undefined, 429), false);
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max", undefined, 404), true);
});

test("test 4: xai and xai-oauth both passthrough unknown model ids", () => {
  const xaiOauth = getRegistryEntry("xai-oauth");
  assert.ok(xaiOauth, "xai-oauth registry entry must exist");
  assert.equal(xaiOauth.passthroughModels, true);

  const xai = getRegistryEntry("xai");
  assert.ok(xai, "xai registry entry must exist");
  assert.equal(xai.passthroughModels, true);
});

test("test 6: CATALOG_SIBLING_IDS stays agy/antigravity and never keys the xai family", () => {
  const src = readRepo("src/lib/db/models/activeSyncedCatalog.ts");
  const literal = extractNamedConstLiteral(src, "CATALOG_SIBLING_IDS");
  const uncommented = literal.replace(/\/\/.*$/gm, "");
  const keys = [
    ...uncommented.matchAll(/^\s*(?:"([^"]+)"|([A-Za-z_][\w-]*))\s*:/gm),
  ]
    .map((match) => match[1] ?? match[2])
    .sort();
  assert.deepEqual(keys, ["agy", "antigravity"]);
  assert.doesNotMatch(literal, /["']xai["']|["']xai-oauth["']|["']xao["']/);
});

test("test 7: xai family stays out of PROVIDER_SEARCH_PAIRS and credential lookup", async () => {
  const src = readRepo("src/sse/services/auth.ts");
  const literal = extractNamedConstLiteral(src, "PROVIDER_SEARCH_PAIRS");
  const uncommented = literal.replace(/\/\/.*$/gm, "");
  assert.doesNotMatch(uncommented, /["']xai["']|["']xai-oauth["']|["']xao["']/);

  await createProviderConnection({
    provider: "xai",
    authType: "apikey",
    apiKey: "xai-a...re",
    isActive: true,
    testStatus: "active",
  });
  await createProviderConnection({
    provider: "xai-oauth",
    authType: "oauth",
    accessToken: "tok-xai-oauth-fixture",
    isActive: true,
    testStatus: "active",
  });
  const apikeyCreds = await getProviderCredentials("xai");
  assert.ok(apikeyCreds);
  assert.equal(apikeyCreds.provider, "xai");
  const oauthCreds = await getProviderCredentials("xai-oauth");
  assert.ok(oauthCreds);
  assert.equal(oauthCreds.provider, "xai-oauth");
});

test("test 9: xai, xai-oauth, claude, and grok-cli seeds omit unreleased flagship ids", () => {
  const banned = ["grok-4.7", "gemini-4.0-pro", "claude-opus-5-1", "claude-opus-5.1"];
  for (const provider of ["xai", "xai-oauth", "claude", "grok-cli"]) {
    const entry = getRegistryEntry(provider);
    assert.ok(entry, `${provider} registry entry must exist`);
    const ids = (entry.models ?? []).map((model) => model.id);
    for (const id of banned) {
      assert.equal(ids.includes(id), false, `${provider} seed must not include ${id}`);
    }
  }
});

test("test 8: grok-cli browser mapTokens sets autoSync true", () => {
  const browser = grokCli.mapTokens({
    access_token: "t",
    refresh_token: "r",
    expires_in: 3600,
    token_type: "Bearer",
    scope: "s",
  });
  assert.equal(browser.providerSpecificData.autoSync, true);
  assert.ok(browser.providerSpecificData.tokenType || browser.providerSpecificData.scope);
});

test("test 8: grok-cli imported JWT mapTokens sets autoSync true", () => {
  const imported = grokCli.mapTokens({ accessToken: "eyJhbG...MSJ9." });
  assert.equal(imported.providerSpecificData.autoSync, true);
  assert.ok(
    imported.providerSpecificData.userId != null || imported.providerSpecificData.tier != null
  );
});

test("test 8: grok-cli imported auth.json mapTokens sets autoSync true", () => {
  const authJson = grokCli.mapTokens({
    "https://auth.x.ai::clientId": {
      key: "eyJhbG...ture",
      refresh_token: "rt",
    },
  });
  assert.ok(String(authJson.accessToken).includes("eyJ"));
  assert.equal(authJson.refreshToken, "rt");
  assert.equal(authJson.providerSpecificData.autoSync, true);
  assert.ok(
    authJson.providerSpecificData.userId != null || authJson.providerSpecificData.tier != null
  );
});
