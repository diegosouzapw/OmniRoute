// Behavioral regression tests for #15159 S-01 (second hop): GET /api/providers/{id}/models
// reaches `fetchCursorAgentModels()` -> spawn() on the `provider === "cursor"` branch. The route
// gates that spawn on the trusted peer-locality header and must FAIL CLOSED: a non-loopback
// request may never fall through to the spawn, even when `buildDiscoveryFallbackResponse()` has
// nothing to serve (no cached discovery AND an empty local catalog -> it returns null).
//
// HOME and PATH are sandboxed for the whole file so that even a regression (the guard falling
// through) can never launch a real cursor-agent binary: resolveCursorAgentBinary() finds nothing
// and the route's own catch answers 502 "Failed to fetch Cursor models".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-spawn-gate-"));
const emptyHome = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-spawn-gate-home-"));
process.env.DATA_DIR = dataDir;
const originalHome = process.env.HOME;
const originalPath = process.env.PATH;
process.env.HOME = emptyHome;
process.env.PATH = emptyHome;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } =
  await import("../../open-sse/config/providerModels.ts");
const { getImageProvider } = await import("../../open-sse/config/imageRegistry.ts");
const { AUTHZ_HEADER_PEER_LOCALITY } = await import("../../src/server/authz/headers.ts");

test.after(() => {
  process.env.HOME = originalHome;
  process.env.PATH = originalPath;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.rmSync(emptyHome, { recursive: true, force: true });
});

async function cursorConnection() {
  // No token: the AvailableModels HTTP path is skipped, so the flow reaches the spawn gate.
  return createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "Cursor spawn gate",
    isActive: true,
  });
}

function callModels(id: string, locality?: string) {
  return GET(
    new Request(`http://localhost/api/providers/${id}/models?refresh=true`, {
      headers: locality ? { [AUTHZ_HEADER_PEER_LOCALITY]: locality } : {},
    }),
    { params: { id } }
  );
}

/**
 * Run `fn` with the cursor local catalog emptied, then restore it. The local catalog is the
 * registry chat models PLUS the specialty (image) entries, so both must be emptied for
 * `buildDiscoveryFallbackResponse()` to return null.
 */
async function withEmptyLocalCatalog<T>(fn: () => Promise<T>): Promise<T> {
  const alias = PROVIDER_ID_TO_ALIAS.cursor || "cursor";
  const registryModels = PROVIDER_MODELS[alias];
  const imageProvider = getImageProvider("cursor");
  assert.ok(Array.isArray(registryModels) && registryModels.length > 0, "fixture: registry");
  assert.ok(imageProvider && imageProvider.models.length > 0, "fixture: image catalog");
  const imageModels = imageProvider.models;
  PROVIDER_MODELS[alias] = [];
  imageProvider.models = [];
  try {
    return await fn();
  } finally {
    PROVIDER_MODELS[alias] = registryModels;
    imageProvider.models = imageModels;
  }
}

test("S-01 hop 2: non-loopback with empty cache AND empty local catalog is refused (403), never spawned", async () => {
  const connection = await cursorConnection();

  for (const locality of [undefined, "remote", "private-lan", ""]) {
    const response = await withEmptyLocalCatalog(() => callModels(connection.id, locality));
    const body = JSON.stringify(await response.json());

    assert.equal(response.status, 403, `locality=${String(locality)} must be refused: ${body}`);
    assert.match(body, /local request/i);
    // The 502 catch of the spawn path ("cursor-agent unavailable (...)") proves the spawn ran.
    assert.doesNotMatch(body, /cursor-agent unavailable|Failed to fetch Cursor models/);
  }
});

test("S-01 hop 2: non-loopback with a local catalog still degrades to it (200, no spawn)", async () => {
  const connection = await cursorConnection();

  const response = await callModels(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(String(body.warning), /requires a local request/);
  assert.doesNotMatch(String(body.warning), /cursor-agent unavailable/);
});

test("S-01 hop 2: a loopback peer is NOT refused — it proceeds to the spawn path", async () => {
  const connection = await cursorConnection();

  const response = await withEmptyLocalCatalog(() => callModels(connection.id, "loopback"));
  const body = JSON.stringify(await response.json());

  // HOME/PATH are sandboxed, so the (allowed) spawn attempt finds no binary and the route
  // answers its own 502 — the point is that loopback is not short-circuited by the 403 gate.
  assert.notEqual(response.status, 403, body);
  assert.equal(response.status, 502, body);
  assert.match(body, /cursor-agent unavailable/);
});
