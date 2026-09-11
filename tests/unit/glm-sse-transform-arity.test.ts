import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * GLM's translateSseResponse passed a 16th positional to
 * createSSETransformStreamWithLogger from #12179 until #12925, while the helper
 * still declared 15 parameters — tsc reported TS2554 and the number never
 * reached TransformStream. #12925 closed the seam by declaring the slot as
 * `streamBufferBytes`.
 *
 * The invariant this guards has not changed: the buffer size GLM passes must
 * land in a real parameter, never in a dropped extra positional. It is now
 * checked from the other side — the helper must declare the slot last, and the
 * call site must fill it with the named constant rather than a magic literal.
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

test("createSSETransformStreamWithLogger declares the buffer-size slot last", () => {
  const src = readFileSync(join(root, "open-sse", "utils", "stream.ts"), "utf8");
  const needle = "export function createSSETransformStreamWithLogger(";
  const start = src.indexOf(needle);
  assert.ok(start >= 0);
  const header = extractParens(src, start + needle.length - 1);
  assert.match(header, /requestToolIdentityMap/);
  assert.match(header, /suppressThinkClose/);
  // #12925: the slot GLM had been filling since #12179 is now declared, so the
  // value reaches TransformStream instead of being dropped as an extra arg.
  assert.match(header, /streamBufferBytes\s*:\s*number/);
  assert.match(header, /streamBufferBytes[^,)]*\)\s*$/, `buffer size must stay last:\n${header}`);
});

test("GLM translateSseResponse fills the buffer-size slot with the named constant", () => {
  const src = readFileSync(join(root, "open-sse", "executors", "glm.ts"), "utf8");
  const fnStart = src.indexOf("export function translateSseResponse(");
  assert.ok(fnStart >= 0);
  const fnEnd = src.indexOf("\nexport class GlmExecutor", fnStart);
  const body = src.slice(fnStart, fnEnd);
  const callAt = body.indexOf("createSSETransformStreamWithLogger(");
  assert.ok(callAt >= 0);
  const call = extractParens(body, callAt + "createSSETransformStreamWithLogger".length);
  // A magic literal here is what made the original mismatch invisible; the call
  // must reference the shared constant so a change to it cannot drift silently.
  assert.equal(/65536/.test(call), false, `magic buffer literal is back:\n${call}`);
  assert.match(
    call,
    /GLM_STREAM_BUFFER_BYTES\s*\)\s*$/,
    `buffer size must be the last arg:\n${call}`
  );
  assert.match(call, /suppressThinkClose/, `suppressThinkClose must still be passed:\n${call}`);
});
