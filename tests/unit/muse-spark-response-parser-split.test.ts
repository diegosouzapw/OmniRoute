import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the muse-spark-web Meta AI response-parser extraction.
// The pure SSE/JSON parsing + content/reasoning/error extraction lives in
// muse-spark-web/response-parser.ts (no host state/fetch/auth). Host imports it back.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "muse-spark-web.ts");
const LEAF = join(EXE, "muse-spark-web/response-parser.ts");

test("leaf hosts the parser and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of ["parseMetaAiResponseText", "parseMetaSseFrames", "isRecord"]) {
    assert.match(src, new RegExp(`export function ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/muse-spark-web\.ts"/);
});

test("host imports the parser back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/muse-spark-web\/response-parser\.ts"/);
});

test("parseMetaAiResponseText tolerates empty input", async () => {
  const { parseMetaAiResponseText } =
    await import("../../open-sse/executors/muse-spark-web/response-parser.ts");
  const out = parseMetaAiResponseText("", false);
  assert.equal(typeof out, "object");
});
