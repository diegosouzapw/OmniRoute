/**
 * Regression guard (PR #7046 / perf-api-pagination fallout): src/lib/db/proxies.ts
 * `listProxies()` was changed to return `{ items, total }` for pagination, but
 * open-sse/utils/proxyFallback.ts's getProxyCandidates() still did
 * `const allProxies = await listProxies({ includeSecrets: true }); for (const p of
 * allProxies) ...` — iterating the {items,total} envelope throws "is not
 * iterable", which the surrounding try/catch silently swallows ("Table may not
 * exist yet"). Net effect: every user-configured proxy silently vanishes from
 * the fallback candidate list with no error surfaced anywhere.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-fallback-cand-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { getProxyCandidates } = await import("../../open-sse/utils/proxyFallback.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getProxyCandidates() surfaces user-configured proxies against the real listProxies() {items,total} shape", async () => {
  await proxiesDb.createProxy({
    name: "Candidate Proxy",
    type: "http",
    host: "203.0.113.50",
    port: 8080,
    username: "user-a",
    password: "pass-a",
  });

  const candidates = await getProxyCandidates();

  assert.ok(
    candidates.some((url) => url.includes("203.0.113.50:8080")),
    `expected a candidate for the seeded proxy, got: ${JSON.stringify(candidates)}`
  );
});
