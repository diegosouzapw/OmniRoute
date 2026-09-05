import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-keyleak-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-keyleak-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../../src/app/api/v1/models/catalog.ts");
const catalogCacheMod = await import("../../../src/app/api/v1/models/catalogCache.ts");

const SECRET = "sk-live-PROBE-10313-SUPER-SECRET-TOKEN";

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function captureMapKeys(): { keys: string[]; restore: () => void } {
  const capturedKeys: string[] = [];
  const originalSet = Map.prototype.set;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Map.prototype as any).set = function (key: unknown, value: unknown) {
    if (typeof key === "string") capturedKeys.push(key);
    return originalSet.call(this, key, value);
  };
  return {
    keys: capturedKeys,
    release: () => {
      Map.prototype.set = originalSet;
    },
  };
}

// buildCatalogCacheKey emits `prefix|isCodex|apiKeyFingerprint|configuredOnly|hideAuto|hideNoThink`
// (6 pipe-delimited fields). Other in-flight keys (e.g. `x-request-id`) don't match.
function isCatalogCacheKey(k: string): boolean {
  return k.split("|").length === 6;
}

test("catalog cache Map keys must not contain the raw bearer API key (#10313)", async () => {
  const probe = captureMapKeys();

  try {
    const request = new Request("http://localhost/v1/models", {
      headers: { Authorization: `Bearer ${SECRET}` },
    });
    const res = await v1ModelsCatalog.getUnifiedModelsResponse(request);
    assert.ok(res.status === 200 || res.status === 401 || res.status === 403);
  } finally {
    probe.release();
  }

  const catalogKeys = probe.keys.filter(isCatalogCacheKey);
  assert.ok(
    catalogKeys.length > 0,
    "no catalog cache Map.set() calls observed — the probe did not exercise catalogCache/catalogInFlight"
  );

  const leaked = catalogKeys.filter((k) => k.includes(SECRET));
  assert.deepEqual(
    leaked,
    [],
    `catalog cache Map key retained the raw API key verbatim: ${JSON.stringify(leaked)} — ` +
      `buildCatalogCacheKey() must hash the secret (e.g. sha256) before using it as a Map key`
  );

  assert.ok(catalogCacheMod.CATALOG_CACHE_TTL_MS_DEFAULT > 0);
});

test("cache keys embed the sha256 digest of the secret, never the raw secret (#10313)", async () => {
  // Capture ALL Map keys emitted across BOTH requests (a 2nd identical-secret request
  // may be a cache hit and emit no new catalog key — irrelevant here: we assert on the
  // digest that did appear).
  const probe = captureMapKeys();
  try {
    const resA = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/v1/models", {
        headers: { Authorization: "Bearer sk-10313-DIGEST-A" },
      })
    );
    const resB = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/v1/models", {
        headers: { Authorization: "Bearer sk-10313-DIGEST-B" },
      })
    );
    assert.ok(resA.status === 200 || resA.status === 401 || resA.status === 403);
    assert.ok(resB.status === 200 || resB.status === 401 || resB.status === 403);
  } finally {
    probe.release();
  }

  const catalogKeys = probe.keys.filter(isCatalogCacheKey);
  assert.ok(catalogKeys.length > 0, "expected catalog cache Map.set() calls");

  // #10538 sync note: buildCatalogCacheKey() delegates to the canonical
  // fingerprintCatalogAuthKey() (landed on release/v3.8.50 independently of #10313),
  // which truncates the sha256 hex digest to 16 chars for a shorter Map key. Derive
  // the expected fingerprint the same way rather than re-hardcoding the full digest.
  const digestA = catalogCacheMod.fingerprintCatalogAuthKey("sk-10313-DIGEST-A");
  const digestB = catalogCacheMod.fingerprintCatalogAuthKey("sk-10313-DIGEST-B");
  const rawA = "sk-10313-DIGEST-A";
  const rawB = "sk-10313-DIGEST-B";

  // The hashed fingerprint, not the raw secret, rides in the cache keys.
  const keysWithDigestA = catalogKeys.filter((k) => k.includes(digestA));
  const keysWithDigestB = catalogKeys.filter((k) => k.includes(digestB));
  assert.ok(
    keysWithDigestA.length > 0,
    `expected a cache key embedding the fingerprint of A: ${catalogKeys.join(",")}`
  );
  assert.ok(
    keysWithDigestB.length > 0,
    `expected a cache key embedding the fingerprint of B: ${catalogKeys.join(",")}`
  );

  // Raw secrets must never appear (issue #10313 root cause).
  assert.ok(!catalogKeys.some((k) => k.includes(rawA) || k.includes(rawB)));

  // Identical secrets ⇒ identical key (memoized reuse); different ⇒ distinct.
  assert.ok(
    keysWithDigestA.every((k) => k === keysWithDigestA[0]),
    "all A keys must be identical"
  );
  assert.ok(
    keysWithDigestB.every((k) => k === keysWithDigestB[0]),
    "all B keys must be identical"
  );
  assert.notEqual(keysWithDigestA[0], keysWithDigestB[0]);
});
