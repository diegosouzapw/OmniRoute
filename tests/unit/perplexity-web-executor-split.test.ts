import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the perplexity-web executor protocol extraction.
// The pure wire protocol (consts, types, SSE parsing, request/query building, content
// extraction) lives in perplexity-web/protocol.ts (no host state/fetch/auth). Host imports
// back the symbols it uses; everything is module-private (no re-export).
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "perplexity-web.ts");
const LEAF = join(EXE, "perplexity-web/protocol.ts");

test("leaf hosts the protocol helpers and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of ["cleanResponse", "buildPplxRequestBody", "extractContent", "sseChunk"]) {
    assert.match(src, new RegExp(`export (async function\\*?|function\\*?|const) ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/perplexity-web\.ts"/);
});

test("host imports the protocol helpers back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/perplexity-web\/protocol\.ts"/);
});

test("cleanResponse strips citations and sseChunk formats a chunk", async () => {
  const { cleanResponse, sseChunk } =
    await import("../../open-sse/executors/perplexity-web/protocol.ts");
  assert.equal(typeof cleanResponse("hello", true), "string");
  assert.match(sseChunk({ a: 1 }), /^data: \{"a":1\}\n\n$/);
});
