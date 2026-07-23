import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-antigravity-mitm-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");

test.beforeEach(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #3144: the executor resolves the upstream model through the dynamic MITM alias
// table (populated by model sync) before falling back to the static alias map.
test("transformRequest resolves the upstream model via the dynamic MITM alias table (#3144)", async () => {
  await modelsDb.setMitmAliasAll("antigravity", {
    "gemini-dynamic": "antigravity/gemini-3.1-pro-low",
  });

  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-dynamic",
    { request: { contents: [] } },
    true,
    { projectId: "project-mitm" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  // The MITM alias wins and the "antigravity/" prefix is stripped.
  assert.equal(result.model, "gemini-3.1-pro-low");
});

// #3144 regression: a corrupted (non-string) MITM alias value must NOT short-circuit
// cleanModelName into returning undefined — it has to fall through to the static
// resolution and still produce a valid string model (the pre-fix code returned
// undefined here, which then threw on `upstreamModel.toLowerCase()`).
test("transformRequest tolerates a corrupted non-string MITM alias value (#3144)", async () => {
  await modelsDb.setMitmAliasAll("antigravity", {
    "gemini-3.1-pro": { unexpected: "object" },
  });

  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-3.1-pro",
    { request: { contents: [] } },
    true,
    { projectId: "project-mitm" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(typeof result.model, "string");
  assert.equal(result.model, "gemini-3.1-pro");
});
