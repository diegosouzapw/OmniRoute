import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the chatgpt-web model-mapping extraction.
// The static model maps + pure thinking-effort resolvers live in the pure leaf
// chatgpt-web/models.ts (no module state). Host imports the two it uses back.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "chatgpt-web.ts");
const LEAF = join(EXE, "chatgpt-web/models.ts");

test("leaf hosts the model maps + resolvers and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of ["MODEL_MAP", "resolveChatGptModel", "resolveThinkingEffort"]) {
    assert.match(src, new RegExp(`export (const|function) ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/chatgpt-web\.ts"/);
});

test("host imports the resolvers back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/chatgpt-web\/models\.ts"/);
});

test("resolveChatGptModel maps a dot-form model id to a chatgpt slug", async () => {
  const { resolveChatGptModel, MODEL_MAP } =
    await import("../../open-sse/executors/chatgpt-web/models.ts");
  const firstKey = Object.keys(MODEL_MAP)[0];
  const resolved = resolveChatGptModel(firstKey);
  assert.equal(typeof resolved.slug, "string");
  assert.ok(resolved.slug.length > 0);
});
