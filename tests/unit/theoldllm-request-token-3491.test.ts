import test from "node:test";
import assert from "node:assert/strict";

import { generateRequestToken } from "../../open-sse/executors/theoldllm.ts";

// #3491: the X-Request-Token is now generated server-side (mirroring the SPA's
// rie()) instead of intercepted via Playwright. Lock the wire contract so a
// future refactor can't silently change the shape the upstream validator expects:
//   `${base36(Date.now())}-${base36(abs(djb2))}-${8 hex chars}`
test("generateRequestToken matches the rie() wire format (#3491)", () => {
  const token = generateRequestToken();
  assert.match(
    token,
    /^[0-9a-z]+-[0-9a-z]+-[0-9a-f]{8}$/,
    `token "${token}" must be base36(ts)-base36(hash)-8hex`,
  );

  const [tsSeg, hashSeg, randSeg] = token.split("-");
  // First segment decodes (base36) to a timestamp within a few seconds of now.
  const decodedTs = parseInt(tsSeg, 36);
  assert.ok(
    Math.abs(Date.now() - decodedTs) < 10_000,
    `decoded ts ${decodedTs} should be ~now`,
  );
  // Hash segment is non-empty base36.
  assert.ok(hashSeg.length > 0);
  // Random suffix is exactly 8 hex chars (crypto.randomUUID slice).
  assert.strictEqual(randSeg.length, 8);
});

test("generateRequestToken's random suffix differs across calls (#3491)", () => {
  const a = generateRequestToken().split("-")[2];
  const b = generateRequestToken().split("-")[2];
  assert.notStrictEqual(a, b, "the 8-hex random suffix must vary per call");
});
