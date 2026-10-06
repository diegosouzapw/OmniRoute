import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const serverPath = path.resolve(here, "../../src/mitm/server.cjs");
const src = fs.readFileSync(serverPath, "utf-8");

test("issue #10479: getTargetHost() must not reroute unknown/passthrough hosts to the hardcoded Antigravity default", () => {
  const fnMatch = src.match(/function getTargetHost\(req\) \{[\s\S]*?\n\}/);
  assert.ok(fnMatch, "getTargetHost() must exist in server.cjs");
  const fnBody = fnMatch[0];
  assert.doesNotMatch(
    fnBody,
    /:\s*"daily-cloudcode-pa\.sandbox\.googleapis\.com"/,
    "getTargetHost() must not hardcode the Antigravity sandbox host as the " +
      "fallback target for hosts outside TARGET_HOSTS — passthrough traffic " +
      "for e.g. example.org must be forwarded to example.org, not to Google's " +
      "Cloud Code API (issue #10479)"
  );
});
