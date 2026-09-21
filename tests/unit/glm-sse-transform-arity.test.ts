import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * GLM's translateSseResponse used to pass a 16th positional (65536) to
 * createSSETransformStreamWithLogger while the helper only had 15 parameters,
 * so tsc reported TS2554 and the number never reached TransformStream.
 * #12925 gave the helper a trailing streamBufferBytes parameter.
 *
 * Guard the call site in source: its arity matches the helper, and the
 * buffer budget lands in streamBufferBytes through GLM_STREAM_BUFFER_BYTES.
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
  assert.equal(/65536/.test(call), false, `inline buffer literal present:\n${call}`);

  const helperSrc = readFileSync(join(root, "open-sse", "utils", "stream.ts"), "utf8");
  const needle = "export function createSSETransformStreamWithLogger(";
  const header = extractParens(helperSrc, helperSrc.indexOf(needle) + needle.length - 1);
  const params = splitTopLevel(header).map((param) => param.split(/[:=]/)[0].trim());
  const args = splitTopLevel(call);

  assert.equal(args.length, params.length, `GLM must match the helper arity:\n${call}`);
  assert.equal(params.at(-1), "streamBufferBytes");
  assert.equal(args.at(-1), "GLM_STREAM_BUFFER_BYTES");
  assert.equal(args[params.indexOf("suppressThinkClose")], "suppressThinkClose");
  assert.match(src, /const GLM_STREAM_BUFFER_BYTES = 65536;/);
});

function splitTopLevel(parenthesized: string): string[] {
  const inner = parenthesized.slice(1, -1);
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of inner) {
    const isArrow = ch === ">" && current.endsWith("=");
    if ("(<{[".includes(ch)) depth += 1;
    else if (")>}]".includes(ch) && !isArrow) depth -= 1;
    if (ch === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}
