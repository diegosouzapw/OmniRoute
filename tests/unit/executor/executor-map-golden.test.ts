import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// R0.3 GOLDEN LOCK (characterization BEFORE the ExecutorRegistry refactor):
// freeze the full provider-id → executor mapping of open-sse/executors/index.ts —
// every specialized key with its executor class, effective provider identity and
// which PROVIDERS config entry backs it — plus the getExecutor() dispatch rules
// (specialized hit, DefaultExecutor fallback + cache, cloud-agent guard #6699,
// search-provider guard #10274). The registry refactor must keep this snapshot
// byte-identical: any drift in keys, classes, provider identity or guard behavior
// is a golden diff, not a silent routing change.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-executor-golden-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports AFTER DATA_DIR is set so db/core.ts picks up the temp path.
const { getExecutor, hasSpecializedExecutor, DefaultExecutor } =
  await import("../../../open-sse/executors/index.ts");
const { PROVIDERS } = await import("../../../open-sse/config/constants.ts");
const { SEARCH_PROVIDERS } = await import("../../../open-sse/config/searchRegistry.ts");
const { goldenSnapshot } = await import("../../helpers/goldenSnapshot.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// The specialized keys are not exported; enumerate them through the public
// surface by probing every plausible id source AND the literal keys read from
// the module source. Reading the source keeps the golden honest: a key added
// to (or removed from) the hard-coded map cannot hide from the snapshot.
function readSpecializedKeys(): string[] {
  const src = fs.readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../open-sse/executors/index.ts"),
    "utf8"
  );
  const mapMatch = src.match(/const lazyExecutors[^\n]*= \{([\s\S]*?)\n\};/);
  assert.ok(mapMatch, "lazyExecutors map literal not found in open-sse/executors/index.ts");
  const keys: string[] = [];
  for (const line of mapMatch[1].split("\n")) {
    const m = line.match(/^\s*(?:"([^"]+)"|([A-Za-z0-9_$-]+)):\s*(?:async )?\(\)\s*=>/);
    if (m) keys.push(m[1] ?? m[2]);
  }
  return keys;
}

// Map a ProviderConfig object back to its PROVIDERS key by identity, so the
// snapshot records WHICH config backs each executor without freezing the whole
// (huge, frequently-edited) config content.
const providerConfigKeyByRef = new Map<object, string>();
for (const [key, cfg] of Object.entries(PROVIDERS)) {
  if (cfg && typeof cfg === "object" && !providerConfigKeyByRef.has(cfg)) {
    providerConfigKeyByRef.set(cfg, key);
  }
}

function describeExecutor(instance: unknown): {
  className: string;
  provider: string | null;
  configSource: string | null;
} {
  const inst = instance as { constructor: { name: string }; provider?: string; config?: object };
  const cfg = inst.config;
  return {
    className: inst.constructor.name,
    provider: typeof inst.provider === "string" ? inst.provider : null,
    configSource: cfg == null ? null : (providerConfigKeyByRef.get(cfg) ?? "<custom-config>"),
  };
}

const specializedKeys = readSpecializedKeys();

test("golden: specialized executor map — key → class + provider identity + config source", async () => {
  assert.ok(specializedKeys.length >= 100, `suspiciously few keys: ${specializedKeys.length}`);

  const entries: Record<
    string,
    { className: string; provider: string | null; configSource: string | null }
  > = {};
  const byInstance = new Map<unknown, string[]>();

  for (const key of [...specializedKeys].sort()) {
    assert.equal(hasSpecializedExecutor(key), true, `hasSpecializedExecutor(${key})`);
    const instance = await getExecutor(key);
    entries[key] = describeExecutor(instance);
    const group = byInstance.get(instance) ?? [];
    group.push(key);
    byInstance.set(instance, group);
  }

  // Keys sharing the SAME instance share per-instance state (session pools,
  // rotation cooldowns); today every map entry is its own `new X()`. Freeze that.
  const sharedInstances = [...byInstance.values()]
    .filter((keys) => keys.length > 1)
    .map((keys) => keys.sort())
    .sort((a, b) => a[0].localeCompare(b[0]));

  goldenSnapshot("executors/executor-map", {
    keyCount: specializedKeys.length,
    entries,
    sharedInstances,
  });
});

test("golden: getExecutor dispatch rules — fallback, cache and 400-guards", async () => {
  // 1. Unknown provider → DefaultExecutor for that provider, memoized.
  const unknown = "golden-test-unknown-provider";
  assert.equal(hasSpecializedExecutor(unknown), false);
  const fallback = await getExecutor(unknown);
  assert.ok(fallback instanceof DefaultExecutor, "fallback must be DefaultExecutor");
  assert.equal(await getExecutor(unknown), fallback, "DefaultExecutor fallback must be cached");

  // 2. Cloud-agent guard (#6699) and search guard (#10274) → status-400 throw.
  const guardOutcome = async (provider: string) => {
    try {
      await getExecutor(provider);
      return { throws: false as const };
    } catch (err) {
      const e = err as Error & { status?: number };
      return { throws: true as const, status: e.status ?? null, message: e.message };
    }
  };

  const searchProviders = Object.keys(SEARCH_PROVIDERS).sort();
  goldenSnapshot("executors/dispatch-rules", {
    fallback: describeExecutor(fallback),
    cloudAgentGuard: { jules: await guardOutcome("jules") },
    searchGuard: Object.fromEntries(
      await Promise.all(searchProviders.map(async (p) => [p, await guardOutcome(p)]))
    ),
  });
});
