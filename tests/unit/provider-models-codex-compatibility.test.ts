import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import dns from "node:dns";

import {
  clearCodexClientVersionCache,
  resetCodexClientVersionCacheForTests,
} from "../../open-sse/config/codexClient.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-compatibility-"));
const originalDataDir = process.env.DATA_DIR;
const originalVersion = process.env.CODEX_CLIENT_VERSION;
const originalFetch = globalThis.fetch;
process.env.DATA_DIR = dataDir;
process.env.CODEX_CLIENT_VERSION = "0.160.1";

const { setSafeOutboundPinnedFetchTestOverride } =
  await import("../../src/shared/network/safeOutboundFetch.ts");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/providers/[id]/models/route.ts");
const { createCodexCatalogReconciler } =
  await import("../../src/app/api/providers/[id]/models/discovery/codexRoute.ts");
const discovery = await import("../../src/app/api/providers/[id]/models/discovery/codex.ts");

type Body = {
  source: string;
  warning?: string;
  models: { id: string }[];
  candidateModels?: { id: string; compatibilityReason?: string }[];
};

const future = {
  slug: "future-model",
  visibility: "list",
  supported_in_api: true,
  minimal_client_version: "0.200.0",
};
const compatible = { slug: "account-model", visibility: "list", supported_in_api: true };

async function seed() {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "compatibility-fixture",
    accessToken: "fixture-access-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });
  assert.ok(connection && typeof connection.id === "string");
  return connection.id;
}

async function get(id: string, query = "?refresh=true&includeCandidates=true") {
  const response = await route.GET(
    new Request(`http://localhost/api/providers/${id}/models${query}`),
    {
      params: { id },
    }
  );
  assert.equal(response.status, 200);
  return (await response.json()) as Body;
}

test.beforeEach(() => {
  process.env.CODEX_CLIENT_VERSION = "0.160.1";
  resetCodexClientVersionCacheForTests();
  clearCodexClientVersionCache();
  discovery.clearCodexGithubCatalogCacheForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalVersion === undefined) delete process.env.CODEX_CLIENT_VERSION;
  else process.env.CODEX_CLIENT_VERSION = originalVersion;
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  resetCodexClientVersionCacheForTests();
  clearCodexClientVersionCache();
  discovery.clearCodexGithubCatalogCacheForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("successful account discovery does not warn about public-only newer models", async () => {
  const id = await seed();
  globalThis.fetch = async (url) =>
    Response.json({
      models: String(url).includes("raw.githubusercontent.com")
        ? [compatible, future]
        : [compatible],
    });
  const body = await get(id);
  assert.equal(body.source, "api");
  assert.deepEqual(
    body.models.map((model) => model.id),
    [compatible.slug]
  );
  assert.equal(body.warning, undefined);
  assert.deepEqual(body.candidateModels, []);
});

test("live version candidates keep their warning when the GitHub catalog is unavailable", async () => {
  const id = await seed();
  globalThis.fetch = async (url) =>
    String(url).includes("raw.githubusercontent.com")
      ? new Response("fixture unavailable", { status: 503 })
      : Response.json({ models: [compatible, future] });
  const body = await get(id);
  assert.equal(body.source, "api");
  assert.deepEqual(
    body.models.map((model) => model.id),
    [compatible.slug]
  );
  assert.match(body.warning || "", /future-model.*OmniRoute reports 0\.160\.1.*0\.200\.0/);
  assert.equal(body.candidateModels?.[0]?.compatibilityReason, "requires-newer-client");
});

test("all-too-new live inventory stays empty and explains the required version", async () => {
  const id = await seed();
  globalThis.fetch = async (url) =>
    String(url).includes("raw.githubusercontent.com")
      ? Response.json({ models: [compatible] })
      : Response.json({ models: [future] });
  const body = await get(id);
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, []);
  assert.match(body.warning || "", /future-model.*CODEX_CLIENT_VERSION=0\.200\.0/);
});

test("GitHub fallback explains version candidates without warning about retired or unsupported entries", async () => {
  const id = await seed();
  globalThis.fetch = async (url) =>
    String(url).includes("raw.githubusercontent.com")
      ? Response.json({
          models: [
            future,
            { ...future, slug: "gpt-5.3-codex-spark", minimal_client_version: "999.0.0" },
            { ...future, slug: "hidden-model", visibility: "hide" },
            { ...future, slug: "unsupported-model", supported_in_api: false },
            { slug: "unspecified-model", minimal_client_version: "not-a-version" },
          ],
        })
      : new Response("fixture unavailable", { status: 503 });
  const body = await get(id);
  assert.equal(body.source, "github_catalog");
  assert.deepEqual(body.models, []);
  assert.match(body.warning || "", /using GitHub model catalog.*future-model.*0\.200\.0/);
  assert.doesNotMatch(
    body.warning || "",
    /gpt-5\.3-codex-spark|hidden-model|unsupported-model|unspecified-model|999\.0\.0/
  );
});

test("GitHub TTL cache diagnostics are recomputed after the effective version changes", async () => {
  const id = await seed();
  let githubRequests = 0;
  globalThis.fetch = async (url) => {
    if (!String(url).includes("raw.githubusercontent.com"))
      return new Response("fixture unavailable", { status: 503 });
    githubRequests += 1;
    return Response.json({ models: [future] }, { headers: { etag: '"fixture-catalog"' } });
  };
  const before = await get(id);
  assert.match(before.warning || "", /future-model.*0\.160\.1/);
  process.env.CODEX_CLIENT_VERSION = "0.200.0";
  const after = await get(id);
  assert.equal(after.source, "github_catalog");
  assert.deepEqual(
    after.models.map((model) => model.id),
    [future.slug]
  );
  assert.doesNotMatch(after.warning || "", /Skipped|0\.160\.1/);
  assert.equal(githubRequests, 1);
});

test("cached account inventory retains precedence over a public-only future model", async () => {
  const id = await seed();
  globalThis.fetch = async (url) =>
    String(url).includes("raw.githubusercontent.com")
      ? Response.json({ models: [future] })
      : Response.json({ models: [compatible] });
  assert.equal((await get(id)).models.length, 1);
  globalThis.fetch = async () => new Response("fixture unavailable", { status: 503 });
  const body = await get(id);
  assert.equal(body.source, "cache");
  assert.deepEqual(
    body.models.map((model) => model.id),
    [compatible.slug]
  );
  assert.match(body.warning || "", /using cached catalog/);
  assert.doesNotMatch(body.warning || "", /Skipped|future-model/);
});

test("route discovery refreshes the client version before classifying and warning", async (t) => {
  const id = await seed();
  delete process.env.CODEX_CLIENT_VERSION;
  t.mock.method(dns.promises, "lookup", async () => [{ address: "93.184.216.34", family: 4 }]);
  setSafeOutboundPinnedFetchTestOverride(() => (url, init) => globalThis.fetch(url, init));
  t.after(() => setSafeOutboundPinnedFetchTestOverride(undefined));
  let registryRequests = 0;
  globalThis.fetch = async (url) => {
    if (String(url).includes("registry.npmjs.org")) {
      registryRequests += 1;
      return Response.json({ name: "@openai/codex", version: "0.999.0" });
    }
    if (String(url).includes("raw.githubusercontent.com"))
      return new Response("fixture unavailable", { status: 503 });
    assert.equal(new URL(String(url)).searchParams.get("client_version"), "0.999.0");
    return Response.json({ models: [{ ...future, minimal_client_version: "0.999.1" }] });
  };
  const body = await get(id);
  assert.equal(registryRequests, 1);
  assert.equal(body.source, "api");
  assert.match(body.warning || "", /OmniRoute reports 0\.999\.0.*0\.999\.1/);
});

test("warning uses the highest numeric version and bounds the displayed model list", () => {
  const models = discovery.normalizeCodexModelsResponse({
    models: [
      { ...future, slug: "first", minimal_client_version: "1.9.0" },
      { ...future, slug: "second", minimal_client_version: "1.10.0" },
      { ...future, slug: "third", minimal_client_version: "1.3.0" },
      { ...future, slug: "fourth", minimal_client_version: "1.2.0" },
    ],
  });
  const catalog = createCodexCatalogReconciler([], "safe")(models, "github", "Fallback context.");
  assert.equal(catalog.candidateModels.length, 4);
  assert.match(
    catalog.warning || "",
    /Fallback context.*first, second, third, and 1 more.*at least 1\.10\.0/
  );
  assert.doesNotMatch(catalog.warning || "", /fourth/);
  assert.match(
    catalog.warning || "",
    /Installing Codex CLI is only relevant to the separate codex-app-server provider/
  );
});
