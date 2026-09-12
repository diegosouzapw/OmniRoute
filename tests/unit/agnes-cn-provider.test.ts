import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import DefaultExecutor from "../../open-sse/executors/default.ts";
import { VIDEO_PROVIDER_IDS } from "../../src/shared/constants/providers.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRepo(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agnes-cn-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.ts");
const { resolveProviderAlias, parseModel } = await import("../../open-sse/services/model.ts");
const { isNamedOpenAIStyleProvider } = await import(
  "../../src/app/api/providers/[id]/models/discovery/providerSets.ts"
);
const { getDiscoveryClass } = await import("../../src/lib/providerModels/discoveryClass.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const dbCore = await import("../../src/lib/db/core.ts");

const CN_CHAT_URL = "https://api.agnes-ai.cn/v1/chat/completions";
const INTL_CHAT_URL = "https://apihub.agnes-ai.com/v1/chat/completions";

test.after(() => {
  dbCore.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

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

function hasAgnesCnPairing(literal: string): boolean {
  return /["']agnes["']/.test(literal) && /["']agnes-cn["']/.test(literal);
}

test("agnes-cn registry baseUrl is the China host and agnes stays on apihub", () => {
  assert.equal(REGISTRY["agnes-cn"].baseUrl, CN_CHAT_URL);
  assert.equal(REGISTRY["agnes"].baseUrl, INTL_CHAT_URL);
});

test("agnes-cn aliases resolve without folding into agnes", () => {
  assert.equal(resolveProviderAlias("agnescn"), "agnes-cn");
  assert.equal(resolveProviderAlias("agnes-cn"), "agnes-cn");
  assert.equal(resolveProviderAlias("agnes"), "agnes");
});

test("parseModel keeps agnes-cn and agnes prefixes apart", () => {
  const cn = parseModel("agnes-cn/agnes-2.0-flash");
  assert.equal(cn.provider, "agnes-cn");
  assert.equal(cn.model, "agnes-2.0-flash");

  const intl = parseModel("agnes/agnes-2.0-flash");
  assert.equal(intl.provider, "agnes");
  assert.equal(intl.model, "agnes-2.0-flash");
});

test("DefaultExecutor buildUrl uses the China host for agnes-cn without credentials", () => {
  const cnUrl = new DefaultExecutor("agnes-cn").buildUrl("agnes-2.0-flash", false);
  const intlUrl = new DefaultExecutor("agnes").buildUrl("agnes-2.0-flash", false);
  assert.equal(cnUrl, CN_CHAT_URL);
  assert.equal(intlUrl, INTL_CHAT_URL);
});

test("agnes-cn is a named OpenAI-style provider with openai-compat discovery", () => {
  assert.equal(isNamedOpenAIStyleProvider("agnes-cn"), true);
  assert.equal(getDiscoveryClass("agnes-cn"), "openai-compat");
});

test("PROVIDER_SEARCH_PAIRS and CATALOG_SIBLING_IDS do not pair agnes with agnes-cn", () => {
  const pairs = extractNamedConstLiteral(readRepo("src/sse/services/auth.ts"), "PROVIDER_SEARCH_PAIRS");
  const siblings = extractNamedConstLiteral(
    readRepo("src/lib/db/models/activeSyncedCatalog.ts"),
    "CATALOG_SIBLING_IDS"
  );

  assert.equal(hasAgnesCnPairing(pairs), false);
  assert.equal(hasAgnesCnPairing(siblings), false);
  assert.doesNotMatch(pairs, /["']agnes-cn["']/);
  assert.doesNotMatch(siblings, /["']agnes-cn["']/);
  assert.doesNotMatch(pairs, /["']agnes["']/);
  assert.doesNotMatch(siblings, /["']agnes["']/);

  const injectedPairs = pairs.replace(/\]\s*$/, '  ["agnes", "agnes-cn"],\n]');
  assert.equal(hasAgnesCnPairing(injectedPairs), true);
});

test("getProviderCredentials does not return the other Agnes region's connection", async () => {
  await createProviderConnection({
    provider: "agnes",
    authType: "apikey",
    apiKey: "agnes-intl-fixture-key",
    isActive: true,
    testStatus: "active",
  });
  await createProviderConnection({
    provider: "agnes-cn",
    authType: "apikey",
    apiKey: "agnes-cn-fixture-key",
    isActive: true,
    testStatus: "active",
  });

  const cnCreds = await getProviderCredentials("agnes-cn");
  assert.ok(cnCreds, "agnes-cn must resolve a credential");
  assert.equal(cnCreds.provider, "agnes-cn");
  assert.notEqual(cnCreds.apiKey, "agnes-intl-fixture-key");

  const intlCreds = await getProviderCredentials("agnes");
  assert.ok(intlCreds, "agnes must resolve a credential");
  assert.equal(intlCreds.provider, "agnes");
  assert.notEqual(intlCreds.apiKey, "agnes-cn-fixture-key");
});

test("agnes-cn is absent from image and video registries", () => {
  assert.equal(IMAGE_PROVIDERS["agnes-cn"], undefined);
  assert.equal(VIDEO_PROVIDER_IDS.has("agnes-cn"), false);
});

test("IMAGE_PROVIDERS agnes-cn absence lock can go red", () => {
  assert.equal(IMAGE_PROVIDERS["agnes-cn"], undefined);
  const stub = { id: "agnes-cn", models: [] };
  IMAGE_PROVIDERS["agnes-cn"] = stub as (typeof IMAGE_PROVIDERS)[string];
  try {
    assert.ok(IMAGE_PROVIDERS["agnes-cn"], "injected agnes-cn image entry must be defined");
  } finally {
    delete IMAGE_PROVIDERS["agnes-cn"];
  }
  assert.equal(IMAGE_PROVIDERS["agnes-cn"], undefined);

  assert.equal(VIDEO_PROVIDER_IDS.has("agnes-cn"), false);
  VIDEO_PROVIDER_IDS.add("agnes-cn");
  try {
    assert.equal(VIDEO_PROVIDER_IDS.has("agnes-cn"), true);
  } finally {
    VIDEO_PROVIDER_IDS.delete("agnes-cn");
  }
  assert.equal(VIDEO_PROVIDER_IDS.has("agnes-cn"), false);
});

test("agnes-cn free catalog three rows agnes-cn-free pool with agnes-3.0-flash", () => {
  const rows = FREE_MODEL_BUDGETS.filter((model) => model.provider === "agnes-cn");
  assert.equal(rows.length, 3);
  assert.ok(rows.every((model) => model.poolKey === "agnes-cn-free"));
  assert.equal(
    rows.some((model) => model.modelId === "agnes-3.0-flash"),
    true
  );
  assert.equal(
    rows.some((model) => model.modelId === "agnes-1.5-flash"),
    false
  );
});

test("agnes-cn registry seed lists 3.0 and not retired 1.5", () => {
  const ids = REGISTRY["agnes-cn"].models.map((model: { id: string }) => model.id);
  assert.equal(ids.includes("agnes-3.0-flash"), true);
  assert.equal(ids.includes("agnes-1.5-flash"), false);
  assert.equal(ids.includes("agnes-2.0-flash"), true);
  assert.equal(ids.includes("agnes-2.5-flash"), true);
});

test("agnes-cn dashboard card name includes China and is not hidden", () => {
  const entry = APIKEY_PROVIDERS["agnes-cn"];
  assert.ok(entry, "APIKEY_PROVIDERS['agnes-cn'] must be defined");
  assert.equal(typeof entry.name, "string");
  assert.match(entry.name, /China/);
  assert.notEqual(entry.hiddenFromDashboard, true);
  assert.equal(
    typeof entry.freeNote,
    "string",
    "agnes-cn hasFree card must explain the free tier"
  );
  assert.ok((entry.freeNote as string).length > 0);
});

test("agnes-cn translate-path golden records China host", () => {
  const snapshot = JSON.parse(readRepo("tests/snapshots/provider/translate-path.json"));
  assert.equal(
    snapshot["agnes-cn"].url.stream,
    CN_CHAT_URL
  );
  assert.equal(
    snapshot["agnes-cn"].url.nonStream,
    CN_CHAT_URL
  );
  assert.equal(
    snapshot.agnes.url.stream,
    INTL_CHAT_URL
  );
  assert.equal(
    snapshot.agnes.url.nonStream,
    INTL_CHAT_URL
  );
});

test("every i18n locale has a nonempty agnes-cn onboarding description", () => {
  const messagesDir = path.join(REPO_ROOT, "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));
  assert.equal(files.length, 51);

  for (const file of files) {
    const messages = JSON.parse(readRepo(`src/i18n/messages/${file}`));
    const desc = messages?.providers?.onboardingProviderDescriptions?.["agnes-cn"];
    assert.equal(typeof desc, "string", `${file} missing providers.onboardingProviderDescriptions['agnes-cn']`);
    assert.ok(desc.length > 0, `${file} agnes-cn onboarding description is empty`);
  }

  const sample = JSON.parse(readRepo("src/i18n/messages/en.json"));
  const injected = structuredClone(sample);
  if (injected.providers?.onboardingProviderDescriptions) {
    delete injected.providers.onboardingProviderDescriptions["agnes-cn"];
  }
  const injectedDesc = injected?.providers?.onboardingProviderDescriptions?.["agnes-cn"];
  assert.equal(
    typeof injectedDesc === "string" && injectedDesc.length > 0,
    false,
    "deleting one locale key must make the i18n lock fail"
  );
});
