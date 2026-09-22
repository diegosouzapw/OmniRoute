import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

test("API bridge warning consumes the effective auth flag supplied by boot", () => {
  const source = fs.readFileSync(path.join(REPO_ROOT, "src/lib/apiBridgeServer.ts"), "utf8");

  assert.match(source, /initApiBridgeServer\(effectiveRequireApiKeyEnabled: boolean\)/);
  assert.match(
    source,
    /warnIfNonLoopbackWithoutApiKey\("API bridge", host, effectiveRequireApiKeyEnabled\)/
  );
  assert.doesNotMatch(
    source,
    /process\.env\.REQUIRE_API_KEY/,
    "API bridge warning must not re-read the raw environment"
  );
});

test("LiveWS has no REQUIRE_API_KEY exposure warning but retains its independent auth guards", () => {
  const source = fs.readFileSync(path.join(REPO_ROOT, "src/server/ws/liveServer.ts"), "utf8");

  assert.doesNotMatch(source, /warnIfNonLoopbackWithoutApiKey/);
  assert.doesNotMatch(source, /REQUIRE_API_KEY/);
  assert.match(source, /JWT_SECRET is not set/);
  assert.match(source, /isOriginAllowed\(originStr\)/);
  assert.match(source, /ws\.close\(4001, "Unauthorized"\)/);
});
