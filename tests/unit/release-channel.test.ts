/**
 * Release channel of the running build + published channel heads for
 * `GET /api/system/version` (rail 3.8.54, docs/ops/RELEASE_STRATEGY.md).
 *
 * - `resolveReleaseChannel` (runtime, TS) must make exactly the decision
 *   `resolveDistTag` (scripts/release/dist-tag.mjs, used by the publish
 *   workflows) makes — the parity test below is what keeps the two copies equal.
 * - The dist-tags lookup reuses the latest-version cache semantics (TTL,
 *   single-flight, explicit refresh) and is cleared together with it.
 * - The route change is additive: `channel` keeps meaning the deployment mode
 *   the dashboard updater reads; the new fields are `releaseChannel` + `channels`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-release-channel-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resolveReleaseChannel, describeReleaseChannels } =
  await import("../../src/lib/system/releaseChannel.ts");
const { resolveDistTag } = await import("../../scripts/release/dist-tag.mjs");
const versionCheck = await import("../../src/lib/system/versionCheck.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { APP_CONFIG } = await import("../../src/shared/constants/appConfig.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  versionCheck.clearLatestVersionCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => versionCheck.clearLatestVersionCache());

// ── parity with scripts/release/dist-tag.mjs ───────────────────────────────

const VERSIONS = [
  "3.8.52",
  "3.9.0",
  "3.9.4",
  "4.0.0",
  "4.0.1",
  "5.0.0",
  "4.0.0-nightly.20261009.f90e64a",
  "4.1.0-nightly.20270101.g0123456",
  "4.0.0-rc.1",
  "4.0.0-beta.2",
  "4.0.0-alpha.0",
  "3.0.0-pre.1",
  "3.0.0-next.4",
  "3.9.0-hotfix.1",
  "v3.9.2",
];

test("resolveReleaseChannel matches the publish workflows' resolveDistTag", () => {
  for (const latestMajor of [undefined, null, 3, 4, 5]) {
    for (const version of VERSIONS) {
      assert.equal(
        resolveReleaseChannel(version, { latestMajor }),
        resolveDistTag(version, { latestMajor }),
        `${version} @ latestMajor=${latestMajor}`
      );
    }
  }
});

test("resolveReleaseChannel: the four channels", () => {
  assert.equal(resolveReleaseChannel("3.8.52"), "latest");
  assert.equal(resolveReleaseChannel("4.0.0-rc.1"), "next");
  assert.equal(resolveReleaseChannel("4.0.0-nightly.20261009.f90e64a"), "nightly");
  assert.equal(resolveReleaseChannel("3.9.4", { latestMajor: 4 }), "lts");
});

test("resolveReleaseChannel: an unparsable local build reports latest instead of throwing", () => {
  assert.equal(resolveReleaseChannel("dev"), "latest");
});

// ── describeReleaseChannels ────────────────────────────────────────────────

test("describeReleaseChannels: carries every known dist-tag and derives lts from latest", () => {
  const result = describeReleaseChannels(
    "3.9.3",
    {
      latest: "4.0.1",
      next: "4.1.0-rc.1",
      nightly: "4.1.0-nightly.20261009.abcdef1",
      lts: "3.9.3",
    },
    "4.0.1"
  );
  assert.deepEqual(result, {
    releaseChannel: "lts",
    channels: {
      latest: "4.0.1",
      next: "4.1.0-rc.1",
      nightly: "4.1.0-nightly.20261009.abcdef1",
      lts: "3.9.3",
    },
  });
});

test("describeReleaseChannels: without dist-tags it falls back to the latest version", () => {
  assert.deepEqual(describeReleaseChannels("3.8.52", null, "3.8.52"), {
    releaseChannel: "latest",
    channels: { latest: "3.8.52" },
  });
  assert.deepEqual(describeReleaseChannels("3.8.52", null, null), {
    releaseChannel: "latest",
    channels: { latest: "unavailable" },
  });
});

// ── dist-tags lookup + cache ───────────────────────────────────────────────

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("getDistTagsFromRegistry keeps only release tags with version-shaped values", async () => {
  let requested = "";
  const fetchImpl = (async (url: string | URL | Request) => {
    requested = String(url);
    return jsonResponse({
      latest: "3.8.52",
      next: "3.8.53-rc.1",
      nightly: "4.0.0-nightly.20261009.f90e64a",
      historic: "3.2.8",
      lts: "<script>",
      beta: "3.0.0-beta.1",
    });
  }) as typeof fetch;
  assert.deepEqual(await versionCheck.getDistTagsFromRegistry(fetchImpl), {
    latest: "3.8.52",
    next: "3.8.53-rc.1",
    nightly: "4.0.0-nightly.20261009.f90e64a",
  });
  assert.equal(requested, "https://registry.npmjs.org/-/package/omniroute/dist-tags");
});

test("getDistTagsFromRegistry returns null on HTTP errors and junk payloads", async () => {
  assert.equal(
    await versionCheck.getDistTagsFromRegistry((async () => jsonResponse({}, 503)) as typeof fetch),
    null
  );
  assert.equal(
    await versionCheck.getDistTagsFromRegistry((async () =>
      jsonResponse(["3.8.52"])) as typeof fetch),
    null
  );
  assert.equal(
    await versionCheck.getDistTagsFromRegistry((async () => {
      throw new Error("offline");
    }) as typeof fetch),
    null
  );
});

test("getDistTagsFromNpmCli runs `npm view omniroute dist-tags --json` without a shell string", async () => {
  let argv: string[] = [];
  const execFn = (async (_cmd: string, args: string[]) => {
    argv = args;
    return { stdout: JSON.stringify({ latest: "3.8.52", next: "3.8.53-rc.1" }), stderr: "" };
  }) as unknown as Parameters<typeof versionCheck.getDistTagsFromNpmCli>[0];
  assert.deepEqual(await versionCheck.getDistTagsFromNpmCli(execFn), {
    latest: "3.8.52",
    next: "3.8.53-rc.1",
  });
  assert.deepEqual(argv, ["view", "omniroute", "dist-tags", "--json", "--prefer-online"]);
});

test("resolveDistTags falls back from the npm CLI to the registry", async () => {
  assert.deepEqual(
    await versionCheck.resolveDistTags({
      npmCli: async () => null,
      registry: async () => ({ latest: "3.8.52" }),
    }),
    { latest: "3.8.52" }
  );
  assert.equal(
    await versionCheck.resolveDistTags({ npmCli: async () => null, registry: async () => null }),
    null
  );
});

test("resolveDistTagsCached coalesces, honors the TTL and is cleared with the version cache", async () => {
  let now = 1_000;
  let calls = 0;
  const lookup = async () => ({ latest: `3.8.${50 + ++calls}` });
  const opts = { lookup, now: () => now, ttlMs: 500 };

  const [a, b] = await Promise.all([
    versionCheck.resolveDistTagsCached(opts),
    versionCheck.resolveDistTagsCached(opts),
  ]);
  assert.deepEqual([a, b], [{ latest: "3.8.51" }, { latest: "3.8.51" }]);
  assert.equal(calls, 1);

  now = 1_499;
  assert.deepEqual(await versionCheck.resolveDistTagsCached(opts), { latest: "3.8.51" });
  now = 1_500;
  assert.deepEqual(await versionCheck.resolveDistTagsCached(opts), { latest: "3.8.52" });

  versionCheck.clearLatestVersionCache();
  assert.deepEqual(await versionCheck.resolveDistTagsCached(opts), { latest: "3.8.53" });
  assert.equal(calls, 3);
});

test("the dist-tags cache is independent from the latest-version cache", async () => {
  await versionCheck.resolveLatestVersionCached({ lookup: async () => "3.8.52" });
  let distCalls = 0;
  await versionCheck.resolveDistTagsCached({
    lookup: async () => {
      distCalls += 1;
      return { latest: "3.8.52" };
    },
  });
  assert.equal(distCalls, 1, "a cached latest version must not satisfy the dist-tags lookup");
});

// ── GET /api/system/version ────────────────────────────────────────────────

async function getVersionBody(distTags: Record<string, string> | null, latest: string) {
  versionCheck.clearLatestVersionCache();
  // Prime both caches so the route never shells out to npm or reaches the network.
  await versionCheck.resolveLatestVersionCached({ lookup: async () => latest });
  await versionCheck.resolveDistTagsCached({ lookup: async () => distTags });
  globalThis.fetch = (async () => jsonResponse({}, 404)) as typeof fetch; // news feed
  const { GET } = await import("../../src/app/api/system/version/route.ts");
  const { NextRequest } = await import("next/server");
  const res = await GET(new NextRequest("http://localhost:20128/api/system/version"));
  assert.equal(res.status, 200);
  return (await res.json()) as Record<string, unknown>;
}

test("GET /api/system/version adds releaseChannel + channels without changing channel", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  const current = APP_CONFIG.version;
  const currentMajor = Number(String(current).split(".")[0]);
  const newerMajor = `${currentMajor + 1}.0.1`;

  const body = await getVersionBody(
    {
      latest: newerMajor,
      next: `${currentMajor + 1}.1.0-rc.1`,
      nightly: `${currentMajor + 1}.1.0-nightly.20261009.abcdef1`,
      lts: current,
    },
    newerMajor
  );

  // Existing shape is untouched.
  assert.equal(body.current, current);
  assert.equal(body.latest, newerMajor);
  assert.ok(["npm", "source", "docker-compose"].includes(String(body.channel)));
  for (const key of ["updateAvailable", "autoUpdateSupported", "autoUpdateError", "news"]) {
    assert.ok(key in body, `existing field ${key} must remain`);
  }
  // Additive fields.
  assert.equal(body.releaseChannel, "lts");
  assert.deepEqual(body.channels, {
    latest: newerMajor,
    next: `${currentMajor + 1}.1.0-rc.1`,
    nightly: `${currentMajor + 1}.1.0-nightly.20261009.abcdef1`,
    lts: current,
  });
});

test("GET /api/system/version falls back to the latest version when dist-tags are unavailable", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  const current = APP_CONFIG.version;
  // A null lookup is not cached, so the route performs a real dist-tags lookup: make both
  // sources fail hermetically — a fake `npm` that exits 1 first on PATH, and the stubbed
  // fetch (404) for the registry fallback.
  const fakeBin = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-release-channel-bin-"));
  fs.writeFileSync(path.join(fakeBin, "npm"), "#!/bin/sh\nexit 1\n", { mode: 0o755 });
  const originalPath = process.env.PATH;
  process.env.PATH = `${fakeBin}${path.delimiter}${originalPath}`;
  try {
    const body = await getVersionBody(null, current);
    assert.equal(body.releaseChannel, resolveReleaseChannel(current));
    assert.deepEqual(body.channels, { latest: current });
  } finally {
    process.env.PATH = originalPath;
    fs.rmSync(fakeBin, { recursive: true, force: true });
  }
});
