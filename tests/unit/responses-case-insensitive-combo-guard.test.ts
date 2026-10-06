import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readFileSync } from "node:fs";

import { resolveResponsesApiModel } from "../../src/app/api/internal/codex-responses-ws/modelResolution.ts";

const resolver = async (modelStr: string) => {
  if (modelStr.startsWith("codex/")) {
    return { provider: "codex", model: modelStr.slice("codex/".length) };
  }
  return { provider: "openrouter", model: modelStr };
};

test("case-insensitive combo match prevents Codex rewrite on /v1/responses", async () => {
  const storedComboName = "GPT-5.6-SOL";
  const isCombo = async (name: string) => name.toLowerCase() === storedComboName.toLowerCase();

  const result = await resolveResponsesApiModel("gpt-5.6-sol", resolver, isCombo);

  assert.equal(result.changed, false);
  assert.equal(result.model, "gpt-5.6-sol");
});

test("bare codex model is still rewritten when not a combo (Codex preference preserved)", async () => {
  const isCombo = async () => false;

  const result = await resolveResponsesApiModel("gpt-5.5", resolver, isCombo);

  assert.equal(result.changed, true);
  assert.equal(result.model, "codex/gpt-5.5");
});

test("provider-prefixed models pass through unchanged", async () => {
  const isCombo = async () => false;

  for (const model of ["anthropic/claude-opus-4-8", "codex/gpt-5.5", "combo/my-combo"]) {
    const result = await resolveResponsesApiModel(model, resolver, isCombo);
    assert.equal(result.changed, false, `${model} must not be marked as changed`);
    assert.equal(result.model, model, `${model} must pass through unchanged`);
  }
});

test("Responses route uses the downstream combo resolver for the Codex rewrite guard", () => {
  const source = readFileSync(
    new URL("../../src/app/api/v1/responses/route.ts", import.meta.url),
    "utf8"
  );

  assert.match(
    source,
    /import \{ getModelInfo, getComboForModel \} from "@\/sse\/services\/model"/
  );
  assert.match(source, /async \(name\) => !!\(await getComboForModel\(name\)\)/);
  assert.doesNotMatch(source, /getComboByName\(name\)/);
});

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-responses-ci-" + Date.now())
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const sseModelService = await import("../../src/sse/services/model.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getComboForModel resolves a stored combo by a case-insensitive request name", async () => {
  core.resetDbInstance();

  await combosDb.createCombo({
    name: "GPT-5.6-SOL",
    models: [{ provider: "openrouter", model: "gpt-5.6" }],
  });

  const resolved = await sseModelService.getComboForModel("gpt-5.6-sol");
  assert.ok(resolved, "expected lowercased request to resolve to the stored GPT-5.6-SOL combo");
  assert.equal((resolved as { name: string }).name, "GPT-5.6-SOL");
});

test("real getComboForModel predicate prevents the Codex rewrite on /v1/responses", async () => {
  core.resetDbInstance();

  await combosDb.createCombo({
    name: "Archon-Gate-9",
    models: [{ provider: "openrouter", model: "gpt-5.6" }],
  });

  const isCombo = async (name: string) => !!(await sseModelService.getComboForModel(name));

  const result = await resolveResponsesApiModel("archon-gate-9", resolver, isCombo);
  assert.equal(result.changed, false);
  assert.equal(result.model, "archon-gate-9");
});
