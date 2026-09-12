import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * GLM's translateSseResponse used to pass a 16th positional (65536) to
 * createSSETransformStreamWithLogger. #12925 legitimised the buffer-size
 * argument as a named constant (GLM_STREAM_BUFFER_BYTES), so the call now
 * ends with that constant instead of suppressThinkClose.
 *
 * Guard the call site in source: no hardcoded 65536 literal, last arg is
 * GLM_STREAM_BUFFER_BYTES (the named constant introduced by #12925).
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function extractParens(src: string, openAt: number): string {
  let i = openAt + 1;
  let depth = 1;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === "(") depth += 1;
    else if (ch === ")") depth -= 1;
    i += 1;
  }
  return src.slice(openAt, i);
}

test("createSSETransformStreamWithLogger has no highWaterMark slot", () => {
  const src = readFileSync(join(root, "open-sse", "utils", "stream.ts"), "utf8");
  const needle = "export function createSSETransformStreamWithLogger(";
  const start = src.indexOf(needle);
  assert.ok(start >= 0);
  const header = extractParens(src, start + needle.length - 1);
  assert.equal(/highWaterMark/.test(header), false, header);
  assert.match(header, /requestToolIdentityMap/);
  assert.match(header, /suppressThinkClose/);
});

test("GLM translateSseResponse does not pass a 16th positional to the stream helper", () => {
  const src = readFileSync(join(root, "open-sse", "executors", "glm.ts"), "utf8");
  const fnStart = src.indexOf("export function translateSseResponse(");
  assert.ok(fnStart >= 0);
  const fnEnd = src.indexOf("\nexport class GlmExecutor", fnStart);
  const body = src.slice(fnStart, fnEnd);
  const callAt = body.indexOf("createSSETransformStreamWithLogger(");
  assert.ok(callAt >= 0);
  const call = extractParens(body, callAt + "createSSETransformStreamWithLogger".length);
  assert.equal(/65536/.test(call), false, `dead 16th arg still present:\n${call}`);
  assert.match(call, /GLM_STREAM_BUFFER_BYTES\s*\)\s*$/, "call should end with GLM_STREAM_BUFFER_BYTES, not a hardcoded literal");
});
