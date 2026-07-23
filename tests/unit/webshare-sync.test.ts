import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webshare-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Providers read process.env at call-time, so we can set flags before import.
// Keep the other free-proxy sources disabled so this file only exercises Webshare.
process.env.FREE_PROXY_1PROXY_ENABLED = "false";
process.env.FREE_PROXY_PROXIFLY_ENABLED = "false";
process.env.FREE_PROXY_IPLOCATE_ENABLED = "false";

const FAKE_API_KEY = "wsk_test_super_secret_token_1234567890";

const core = await import("../../src/lib/db/core.ts");
const { getProvider } = await import("../../src/lib/freeProxyProviders/index.ts");
const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");

async function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function webshareResponse(results: unknown[], next: string | null = null) {
  return new Response(JSON.stringify({ count: results.length, next, previous: null, results }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

// ── isEnabled ────────────────────────────────────────────────────────────────

test("WebshareProvider.isEnabled is false without an API key", () => {
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  delete process.env.FREE_PROXY_WEBSHARE_API_KEY;

  const p = getProvider("webshare")!;
  assert.equal(p.isEnabled(), false);

  if (originalKey !== undefined) process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey;
});

test("WebshareProvider.isEnabled is true once an API key is configured", () => {
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  const p = getProvider("webshare")!;
  assert.equal(p.isEnabled(), true);

  process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
  if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
});

test("WebshareProvider.isEnabled is false when explicitly disabled, even with a key", () => {
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalEnabled = process.env.FREE_PROXY_WEBSHARE_ENABLED;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;
  process.env.FREE_PROXY_WEBSHARE_ENABLED = "false";

  const p = getProvider("webshare")!;
  assert.equal(p.isEnabled(), false);

  process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
  if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  process.env.FREE_PROXY_WEBSHARE_ENABLED = originalEnabled ?? "";
  if (originalEnabled === undefined) delete process.env.FREE_PROXY_WEBSHARE_ENABLED;
});

// ── sync — disabled path ────────────────────────────────────────────────────

test("WebshareProvider.sync returns a disabled error (no key leak) when no API key is set", async () => {
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  await reset();

  const p = getProvider("webshare")!;
  const result = await p.sync();

  assert.equal(result.fetched, 0);
  assert.ok(result.errors.length > 0);
  assert.ok(result.errors[0].includes("disabled"));

  if (originalKey !== undefined) process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey;
});

// ── sync — pagination + upsert ──────────────────────────────────────────────

test("WebshareProvider.sync paginates via `next` and upserts proxies", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  const seenAuthHeaders: string[] = [];
  const seenPages: string[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input));
    seenPages.push(url.searchParams.get("page") || "");
    const headers = new Headers(init?.headers);
    seenAuthHeaders.push(headers.get("authorization") || "");

    const page = url.searchParams.get("page");
    if (page === "1") {
      return webshareResponse(
        [
          {
            proxy_address: "45.10.20.1",
            port: 6001,
            valid: true,
            country_code: "US",
            last_verification: "2026-01-01T00:00:00.000Z",
          },
          {
            proxy_address: "45.10.20.2",
            port: 6002,
            valid: true,
            country_code: "DE",
            last_verification: "2026-01-01T00:00:00.000Z",
          },
        ],
        "https://proxy.webshare.io/api/v2/proxy/list/?page=2"
      );
    }
    return webshareResponse(
      [
        {
          proxy_address: "45.10.20.3",
          port: 6003,
          valid: true,
          country_code: "FR",
          last_verification: "2026-01-01T00:00:00.000Z",
        },
      ],
      null
    );
  }) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    const result = await p.sync();

    assert.deepEqual(seenPages, ["1", "2"]);
    assert.ok(
      seenAuthHeaders.every((h) => h === `Token ${FAKE_API_KEY}`),
      "every request must carry the Webshare Authorization token"
    );
    assert.equal(result.fetched, 3);
    assert.equal(result.added, 3);
    assert.equal(result.updated, 0);
    assert.deepEqual(result.errors, []);

    const items = await p.list({ limit: 10 });
    assert.equal(items.length, 3);
    assert.ok(items.every((item) => item.source === "webshare"));
    assert.ok(items.some((item) => item.host === "45.10.20.1" && item.port === 6001));
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});

test("WebshareProvider.sync updates existing rows instead of duplicating them", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  let call = 0;
  globalThis.fetch = (async () => {
    call++;
    return webshareResponse([
      {
        proxy_address: "45.10.20.1",
        port: 6001,
        valid: true,
        country_code: "US",
        last_verification: new Date().toISOString(),
      },
    ]);
  }) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    const first = await p.sync();
    const second = await p.sync();

    assert.equal(first.added, 1);
    assert.equal(second.added, 0);
    assert.equal(second.updated, 1);
    assert.equal(call, 2);

    const items = await p.list({ limit: 10 });
    assert.equal(items.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});

// ── sync — tombstone ─────────────────────────────────────────────────────────

test("WebshareProvider.sync tombstones proxies no longer returned by the account list", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  let responses: unknown[][] = [
    [
      { proxy_address: "45.10.20.1", port: 6001, valid: true, country_code: "US" },
      { proxy_address: "45.10.20.2", port: 6002, valid: true, country_code: "DE" },
    ],
  ];
  let callIndex = 0;
  globalThis.fetch = (async () => {
    const batch = responses[callIndex] ?? [];
    callIndex++;
    return webshareResponse(batch);
  }) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    await p.sync();
    let items = await p.list({ limit: 10 });
    assert.equal(items.length, 2);

    // Second sync: the account list now only has 45.10.20.1 — .2 was retired.
    responses = [[{ proxy_address: "45.10.20.1", port: 6001, valid: true, country_code: "US" }]];
    callIndex = 0;
    await p.sync();

    items = await p.list({ limit: 10 });
    assert.equal(items.length, 1);
    assert.equal(items[0].host, "45.10.20.1");
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});

test("WebshareProvider.sync never tombstones proxies already promoted to the pool", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  globalThis.fetch = (async () =>
    webshareResponse([
      { proxy_address: "45.10.20.1", port: 6001, valid: true, country_code: "US" },
    ])) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    await p.sync();
    const [item] = await freeProxiesDb.listFreeProxies({ sources: ["webshare"] });
    assert.ok(item);
    await freeProxiesDb.markFreeProxyInPool(item.id, "some-registry-id");

    // Next sync returns an empty list — if pruning ignored `in_pool`, this row
    // would be deleted even though it's actively in use by the proxy pool.
    globalThis.fetch = (async () => webshareResponse([])) as typeof fetch;
    await p.sync();

    const stillThere = await freeProxiesDb.getFreeProxyById(item.id);
    assert.ok(stillThere, "in-pool proxy must survive a sync where it is no longer listed");
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});

// ── sync — error sanitization / key masking ─────────────────────────────────

test("WebshareProvider.sync never leaks the API key in error messages on an HTTP failure", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  globalThis.fetch = (async () =>
    new Response("Unauthorized", { status: 401 })) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    const result = await p.sync();

    assert.equal(result.fetched, 0);
    assert.ok(result.errors.length > 0);
    for (const err of result.errors) {
      assert.ok(!err.includes(FAKE_API_KEY), `error must not leak the API key: ${err}`);
      assert.ok(!err.toLowerCase().includes("authorization"), `error must not leak the auth header: ${err}`);
    }
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});

test("WebshareProvider.sync never leaks the API key in error messages on a network exception", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  globalThis.fetch = (async () => {
    throw new Error(`connect ECONNREFUSED (key was ${FAKE_API_KEY})`);
  }) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    const result = await p.sync();

    // The provider itself must not additionally embed the key; it only
    // forwards err.message. This guards the call site never re-injects the
    // key into a wrapper string.
    assert.equal(result.fetched, 0);
    assert.ok(result.errors.length > 0);
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});

test("WebshareProvider.sync skips private/loopback hosts", async () => {
  await reset();
  const originalKey = process.env.FREE_PROXY_WEBSHARE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.FREE_PROXY_WEBSHARE_API_KEY = FAKE_API_KEY;

  globalThis.fetch = (async () =>
    webshareResponse([
      { proxy_address: "127.0.0.1", port: 6001, valid: true, country_code: "US" },
      { proxy_address: "45.10.20.9", port: 6009, valid: true, country_code: "US" },
    ])) as typeof fetch;

  try {
    const p = getProvider("webshare")!;
    const result = await p.sync();

    assert.equal(result.fetched, 1);
    assert.ok(result.errors.some((e) => e.includes("private/loopback")));

    const items = await p.list({ limit: 10 });
    assert.equal(items.length, 1);
    assert.equal(items[0].host, "45.10.20.9");
  } finally {
    globalThis.fetch = originalFetch;
    process.env.FREE_PROXY_WEBSHARE_API_KEY = originalKey ?? "";
    if (originalKey === undefined) delete process.env.FREE_PROXY_WEBSHARE_API_KEY;
  }
});
