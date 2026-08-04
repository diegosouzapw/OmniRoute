import assert from "node:assert/strict";
import test from "node:test";

import {
  ANTIGRAVITY_CLI_FALLBACK_VERSION,
  ANTIGRAVITY_IDE_FALLBACK_VERSION,
  ANTIGRAVITY_VERSION_CACHE_TTL_MS,
  clearAntigravityVersionCaches,
  getCachedAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
  resolveAntigravityCliVersion,
  resolveAntigravityIdeVersion,
  seedAntigravityCliVersionCache,
  seedAntigravityIdeVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const originalDateNow = Date.now;

test.afterEach(() => {
  Date.now = originalDateNow;
  clearAntigravityVersionCaches();
});

test("IDE and CLI start with independent captured fallback versions", () => {
  assert.equal(getCachedAntigravityIdeVersion(), ANTIGRAVITY_IDE_FALLBACK_VERSION);
  assert.equal(getCachedAntigravityCliVersion(), ANTIGRAVITY_CLI_FALLBACK_VERSION);
  assert.equal(ANTIGRAVITY_IDE_FALLBACK_VERSION, "2.1.1");
  assert.equal(ANTIGRAVITY_CLI_FALLBACK_VERSION, "1.1.5");
});

test("IDE resolver reads the official updater feed and caches only the IDE version", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(JSON.stringify([{ version: "2.2.0", execution_id: "ide-release" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.2.0");
  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.2.0");
  assert.equal(urls.length, 1);
  assert.equal(
    urls[0],
    "https://antigravity-auto-updater-974169037036.us-central1.run.app/releases"
  );
  assert.equal(getCachedAntigravityIdeVersion(), "2.2.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.1.5");
});

test("IDE resolver selects the newest feed entry and never falls below its version floor", async () => {
  const mixedFeedFetch = async () =>
    new Response(
      JSON.stringify([
        { version: "2.0.0" },
        { version: "2.4.0" },
        { version: "2.2.0" },
        { version: "invalid" },
      ]),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  assert.equal(await resolveAntigravityIdeVersion(mixedFeedFetch as typeof fetch), "2.4.0");

  clearAntigravityVersionCaches();
  const staleFeedFetch = async () =>
    new Response(JSON.stringify([{ version: "2.0.0" }, { version: "1.23.2" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(
    await resolveAntigravityIdeVersion(staleFeedFetch as typeof fetch),
    ANTIGRAVITY_IDE_FALLBACK_VERSION
  );
  assert.equal(getCachedAntigravityIdeVersion(), ANTIGRAVITY_IDE_FALLBACK_VERSION);
});

test("IDE resolver keeps a newer cached version when a later feed response is older", async () => {
  let now = 1_000;
  Date.now = () => now;
  seedAntigravityIdeVersionCache("2.5.0", now);
  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;

  const olderFeedFetch = async () =>
    new Response(JSON.stringify([{ version: "2.4.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityIdeVersion(olderFeedFetch as typeof fetch), "2.5.0");
  assert.equal(getCachedAntigravityIdeVersion(), "2.5.0");
});

test("CLI resolver reads the official Google GitHub release and caches only the CLI version", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ tag_name: "v1.2.0", name: "1.2.0" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "1.2.0");
  assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "1.2.0");
  assert.equal(urls.length, 1);
  assert.equal(
    urls[0],
    "https://api.github.com/repos/google-antigravity/antigravity-cli/releases/latest"
  );
  assert.equal(getCachedAntigravityCliVersion(), "1.2.0");
  assert.equal(getCachedAntigravityIdeVersion(), "2.1.1");
});

test("IDE and CLI TTL refreshes are independent", async () => {
  let now = 1_000;
  Date.now = () => now;
  seedAntigravityCliVersionCache("1.1.5", now);

  const firstFetch = async () =>
    new Response(JSON.stringify([{ version: "2.2.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  const secondFetch = async () =>
    new Response(JSON.stringify([{ version: "2.3.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityIdeVersion(firstFetch as typeof fetch), "2.2.0");
  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;
  assert.equal(await resolveAntigravityIdeVersion(secondFetch as typeof fetch), "2.3.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.1.5");
});

test("each resolver falls back only to its own last known good version", async () => {
  const failingFetch = async () => {
    throw new Error("network down");
  };

  assert.equal(
    await resolveAntigravityIdeVersion(failingFetch as typeof fetch),
    ANTIGRAVITY_IDE_FALLBACK_VERSION
  );
  assert.equal(
    await resolveAntigravityCliVersion(failingFetch as typeof fetch),
    ANTIGRAVITY_CLI_FALLBACK_VERSION
  );

  seedAntigravityIdeVersionCache("2.4.0", 0);
  seedAntigravityCliVersionCache("1.3.0", 0);
  assert.equal(await resolveAntigravityIdeVersion(failingFetch as typeof fetch), "2.4.0");
  assert.equal(await resolveAntigravityCliVersion(failingFetch as typeof fetch), "1.3.0");
});

test("concurrent requests coalesce within each product without crossing products", async () => {
  let ideCalls = 0;
  let cliCalls = 0;
  let releaseIde: (() => void) | undefined;
  let releaseCli: (() => void) | undefined;
  const ideGate = new Promise<void>((resolve) => {
    releaseIde = resolve;
  });
  const cliGate = new Promise<void>((resolve) => {
    releaseCli = resolve;
  });

  const ideFetch = async () => {
    ideCalls += 1;
    await ideGate;
    return new Response(JSON.stringify([{ version: "2.5.0" }]), { status: 200 });
  };
  const cliFetch = async () => {
    cliCalls += 1;
    await cliGate;
    return new Response(JSON.stringify({ tag_name: "1.4.0" }), { status: 200 });
  };

  const ideOne = resolveAntigravityIdeVersion(ideFetch as typeof fetch);
  const ideTwo = resolveAntigravityIdeVersion(ideFetch as typeof fetch);
  const cliOne = resolveAntigravityCliVersion(cliFetch as typeof fetch);
  const cliTwo = resolveAntigravityCliVersion(cliFetch as typeof fetch);
  releaseIde?.();
  releaseCli?.();

  assert.deepEqual(await Promise.all([ideOne, ideTwo]), ["2.5.0", "2.5.0"]);
  assert.deepEqual(await Promise.all([cliOne, cliTwo]), ["1.4.0", "1.4.0"]);
  assert.equal(ideCalls, 1);
  assert.equal(cliCalls, 1);
});
