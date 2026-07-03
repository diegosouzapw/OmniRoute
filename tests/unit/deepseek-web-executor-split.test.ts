import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the deepseek-web executor stream-format extraction.
// The pure content/citation formatters live in deepseek-web/stream-format.ts
// (module-private; host imports them into transformSSE/collectSSEContent).
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "deepseek-web.ts");
const LEAF = join(EXE, "deepseek-web/stream-format.ts");

test("leaf hosts the formatters and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of ["formatStreamContent", "appendSearchCitations", "isThinkingModel"]) {
    assert.match(src, new RegExp(`export function ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/deepseek-web\.ts"/);
});

test("host imports the formatters back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/deepseek-web\/stream-format\.ts"/);
});

test("formatStreamContent + model classifiers behave", async () => {
  const { isThinkingModel, isSearchModel, formatStreamContent } =
    await import("../../open-sse/executors/deepseek-web/stream-format.ts");
  assert.equal(typeof isThinkingModel("deepseek-reasoner"), "boolean");
  assert.equal(typeof isSearchModel("deepseek-search"), "boolean");
  assert.equal(typeof formatStreamContent("hi", "deepseek-chat"), "string");
});
