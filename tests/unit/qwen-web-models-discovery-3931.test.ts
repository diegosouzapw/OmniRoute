/**
 * TDD regression for #3931 (Problem #3, diagnosed by @thezukiru in discussion
 * #3895): the `qwen-web` cookie provider had no entry in PROVIDER_MODELS_CONFIG
 * (`src/app/api/providers/[id]/models/route.ts`), so the model-discovery page
 * returned nothing for it, so qwen-web fell through to the no-config branch.
 *
 * (Problem #1 — the validator bare-token false-positive — was already fixed in
 * the merged PR #3958; Problem #2 — empty stream from WAF bot-detection on the
 * streaming endpoint — is a separate upstream/stealth concern, still open.)
 *
 * Fix: add a `qwen-web` PROVIDER_MODELS_CONFIG entry pointing at the public
 * `https://chat.qwen.ai/api/v2/models/` endpoint, parsing the
 * `{ data: { data: [{ id, name, owned_by }] } }` shape.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-3931-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

interface ModelsBody {
  provider: string;
  connectionId: string;
  models: Array<{ id: string; name?: string; owned_by?: string }>;
  source?: string;
}

const QWEN_WEB_MODELS_URL = "https://chat.qwen.ai/api/v2/models/";

test("#3931 qwen-web model discovery fetches the public /api/v2/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "qwen-web-discovery",
    apiKey: "cna=abc; token=def; ssxmod_itna=xyz",
  });

  let fetchedUrl: string | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    if (u.startsWith(QWEN_WEB_MODELS_URL)) {
      fetchedUrl = u;
      // Real qwen shape: { data: { data: [ { id, name, owned_by } ] } }
      return Response.json({
        data: {
          data: [
            { id: "qwen3-max", name: "Qwen3 Max", owned_by: "qwen" },
            { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus", owned_by: "qwen" },
          ],
        },
      });
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "qwen-web");
    assert.equal(
      body.source,
      "api",
      "should serve the live qwen-web catalog, not local_catalog/empty"
    );
    assert.ok(fetchedUrl, `should have probed ${QWEN_WEB_MODELS_URL}`);
    const ids = body.models.map((m) => m.id);
    assert.ok(ids.includes("qwen3-max"), `live ids missing: ${ids.join(",")}`);
    assert.ok(ids.includes("qwen3-coder-plus"), `live ids missing: ${ids.join(",")}`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#3931 qwen-web parseResponse tolerates the flatter { data: [...] } shape", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "qwen-web-flat",
    apiKey: "cna=abc; token=def",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    if (String(url).startsWith(QWEN_WEB_MODELS_URL)) {
      return Response.json({ data: [{ id: "qwen-plus", name: "Qwen Plus" }] });
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.source, "api");
    assert.ok(body.models.map((m) => m.id).includes("qwen-plus"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
