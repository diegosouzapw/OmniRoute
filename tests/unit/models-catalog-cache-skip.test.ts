/**
 * /api/v1/models catalog cache must survive routine routing/health writes.
 *
 * The unified models catalog build is expensive (multi-second cold build);
 * #13389 introduced `skipModelCatalog` for writes that touch only routing /
 * health columns. This test pins the known routing-only write sites so a
 * refactor cannot silently reintroduce the cache-bust (the live symptom was
 * an ~8 s cold rebuild of /api/v1/models on nearly every dashboard hit,
 * because 429 cooldown and recovery writes fire continuously during normal
 * routing).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");

const SITES: Array<{ file: string; context: string }> = [
  {
    file: "src/lib/db/providers/rateLimit.ts",
    context: "setConnectionRateLimitUntil — rate_limited_until write",
  },
  {
    file: "src/lib/db/providers/rateLimit.ts",
    context: "batch recovery reset — error/cooldown columns",
  },
  {
    file: "src/lib/db/providers/rateLimit.ts",
    context: "clearConnectionErrorIfUnchanged — conditional error clear",
  },
  {
    file: "src/lib/db/providers/codexAccountRecovery.ts",
    context: "codex quota/cooldown observation mutate()",
  },
];

test("routing-only connection writes skip the model-catalog cache bust", () => {
  const sources = new Map<string, string>();
  for (const site of SITES) {
    if (!sources.has(site.file)) {
      sources.set(site.file, readFileSync(join(REPO_ROOT, site.file), "utf8"));
    }
  }
  for (const [file, source] of sources) {
    const busts = source.match(/invalidateDbCache\("connections"[^)]*\)/g) ?? [];
    const skipping = busts.filter((call) => call.includes("skipModelCatalog"));
    assert.ok(
      busts.length > 0,
      `${file} no longer calls invalidateDbCache("connections") — update this test if the write moved`
    );
    assert.deepEqual(
      busts.length,
      skipping.length,
      `${file}: every "connections" invalidation must pass { skipModelCatalog: true } (found ${skipping.length}/${busts.length}). Structural writes (create/update/delete connections) should use a narrower scope or keep the default — see readCache.ts #13389 docs.`
    );
  }
});

test("OAuth token rotation persists with skipModelCatalog", () => {
  const source = readFileSync(join(REPO_ROOT, "src/sse/services/tokenRefresh.ts"), "utf8");
  assert.ok(
    source.includes("catalogRelevant") && source.includes("skipModelCatalog: true"),
    "updateProviderCredentials must pass { skipModelCatalog: true } for credential-only updates (token refreshes fire continuously and otherwise cold-rebuild /v1/models)"
  );
  assert.ok(
    source.includes("updates.providerSpecificData !== undefined"),
    "the skip must exclude updates carrying providerSpecificData (can change catalog-relevant state)"
  );
});
