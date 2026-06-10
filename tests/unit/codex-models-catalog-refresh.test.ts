// Codex CLI compatibility for GET /v1/models.
//
// The Codex CLI model-catalog refresh (codex_models_manager) does
//   GET /v1/models?client_version=<v>
// and decodes a JSON object with a TOP-LEVEL `models` array. OmniRoute answers in the
// OpenAI-standard `{ object: "list", data: [...] }` shape, so codex's serde fails with
//   failed to decode models response: missing field `models`
// and logs "failed to refresh available models" on every startup (verified live against
// codex 0.137 with a request-capturing stub).
//
// Fix: when the caller is a codex client (identified by the `originator` /
// `user-agent` = `codex_*` headers that codex sends), add an EMPTY top-level
// `models: []` so the decode succeeds and the error disappears. Non-codex OpenAI clients
// keep the byte-identical `{object,data}` response (no `models` key).
//
// Why EMPTY and not the real catalog: codex replaces its built-in per-model agent prompt
// (`base_instructions`, ~21k chars) with whatever a populated `models` entry carries for
// the selected model. Emitting our models with an empty/foreign `base_instructions` was
// empirically shown to drop codex's agent prompt to 0 chars, breaking its agent behavior.
// An empty array keeps codex on its built-in model info (same inference as today, minus
// the error).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("codex client (originator: codex_exec) receives a top-level `models` array so the catalog refresh decodes", async () => {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models?client_version=0.137.0", {
      headers: {
        originator: "codex_exec",
        "user-agent": "codex_exec/0.137.0 (Ubuntu 24.4.0; x86_64) vscode/3.7.19 (codex_exec; 0.137.0)",
      },
    })
  );

  assert.equal(res.status, 200);
  const body = (await res.json()) as Record<string, unknown>;

  // OpenAI-standard fields are preserved for any OpenAI consumer of the same response.
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data), "data[] must still be present for OpenAI clients");

  // The codex-required top-level `models` array is present (and empty by design).
  assert.ok(Array.isArray(body.models), "codex clients must receive a top-level `models` array");
  assert.equal(
    (body.models as unknown[]).length,
    0,
    "`models` must be empty so codex keeps its built-in per-model base_instructions"
  );
});

test("codex TUI (user-agent: codex_cli_rs) is detected via user-agent too", async () => {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models", {
      headers: { "user-agent": "codex_cli_rs/0.137.0 (Ubuntu 24.4.0; x86_64)" },
    })
  );

  const body = (await res.json()) as Record<string, unknown>;
  assert.ok(Array.isArray(body.models), "codex user-agent must also get the `models` array");
});

test("non-codex OpenAI client keeps the unchanged {object,data} shape (no `models` key)", async () => {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models", {
      headers: { "user-agent": "OpenAI/Python 1.99.0" },
    })
  );

  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data));
  assert.ok(
    !("models" in body),
    "non-codex clients must NOT receive a `models` key (response stays byte-identical)"
  );
});
