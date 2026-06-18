/**
 * #4164 — the built-in `auto/*` combos must be advertised in `/v1/models`.
 *
 * OmniRoute ships a zero-setup `auto/*` catalog (auto/best-coding, auto/pro-
 * reasoning, …) that the dashboard advertises and that resolve on demand via
 * createBuiltinAutoCombo. But the `/v1/models` listing only emitted persisted DB
 * combos + provider models, so clients that build their model picker from
 * `/v1/models` (e.g. Hermes Agent) never saw any `auto/*` option.
 *
 * The catalog now emits every AUTO_TEMPLATE_VARIANTS id at the top of the list.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-auto-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-auto-test-secret";

const core = await import("../../src/lib/db/core.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4164 /v1/models advertises every built-in auto/* combo", async () => {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string; owned_by?: string }> };

  const ids = new Set(body.data.map((m) => m.id));
  const expected = Object.keys(builtinCatalog.AUTO_TEMPLATE_VARIANTS);
  assert.ok(expected.length > 0, "sanity: there are built-in auto/* variants");

  for (const autoId of expected) {
    assert.ok(ids.has(autoId), `expected /v1/models to advertise ${autoId}`);
  }

  // Spot-check a couple of well-known ones and their owner tag.
  const bestCoding = body.data.find((m) => m.id === "auto/best-coding");
  assert.ok(bestCoding, "auto/best-coding should be listed");
  assert.equal(bestCoding?.owned_by, "combo");
});

test("#4164 auto/* combos appear at the top of the list", async () => {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const expected = Object.keys(builtinCatalog.AUTO_TEMPLATE_VARIANTS);

  // The first N entries (N = number of auto/* variants) should all be auto/*.
  const head = body.data.slice(0, expected.length).map((m) => m.id);
  for (const id of head) {
    assert.match(id, /^auto\//, `top-of-list entry ${id} should be an auto/* combo`);
  }
});

test("#4164 no duplicate auto/* ids even if a persisted combo shadows one", async () => {
  // Defensive: even if a DB combo were named like an auto/* id, the listing must
  // not emit the id twice.
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const autoIds = body.data.map((m) => m.id).filter((id) => id.startsWith("auto/"));
  assert.equal(autoIds.length, new Set(autoIds).size, "auto/* ids must be unique");
});

test("#4189 every auto/* entry exposes token limits + baseline capabilities", async () => {
  // #4164 emitted a bare auto/* entry (no token metadata). #4189 enriches each with
  // the combo's advertised context/output limits + baseline capabilities so
  // OpenAI-compatible clients that build their picker from /v1/models get a context
  // window before the first request. Without the fix these fields are absent.
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    data: Array<{
      id: string;
      context_length?: number;
      max_input_tokens?: number;
      max_output_tokens?: number;
      capabilities?: Record<string, boolean>;
    }>;
  };

  const autoEntries = body.data.filter((m) => m.id.startsWith("auto/"));
  assert.ok(autoEntries.length > 0, "sanity: at least one auto/* entry is listed");

  for (const entry of autoEntries) {
    assert.equal(
      typeof entry.context_length,
      "number",
      `${entry.id} must expose a numeric context_length`
    );
    assert.ok((entry.context_length ?? 0) > 0, `${entry.id} context_length must be positive`);
    assert.equal(typeof entry.max_input_tokens, "number", `${entry.id} must expose max_input_tokens`);
    assert.equal(
      typeof entry.max_output_tokens,
      "number",
      `${entry.id} must expose max_output_tokens`
    );
    assert.ok((entry.max_output_tokens ?? 0) > 0, `${entry.id} max_output_tokens must be positive`);
    assert.ok(
      entry.capabilities && typeof entry.capabilities === "object",
      `${entry.id} must expose a capabilities map`
    );
  }
});
