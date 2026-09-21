import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-socks-flag-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret";

const core = await import("../../src/lib/db/core.ts");
const { isSocks5ProxyEnabled } = await import("../../open-sse/utils/proxyDispatcher.ts");
const proxiesRoute = await import("../../src/app/api/settings/proxies/route.ts");
const proxyRoute = await import("../../src/app/api/settings/proxy/route.ts");

// ENABLE_SOCKS5_PROXY is opt-out: only an explicit falsey value disables SOCKS5.
const MATRIX: Array<[string | undefined, boolean]> = [
  [undefined, true],
  ["", true],
  ["true", true],
  ["1", true],
  ["yes", true],
  ["false", false],
  ["0", false],
  ["no", false],
  ["off", false],
  [" OFF ", false],
  ["False", false],
];

async function withSocksFlag<T>(value: string | undefined, fn: () => Promise<T> | T): Promise<T> {
  const previous = process.env.ENABLE_SOCKS5_PROXY;
  if (value === undefined) delete process.env.ENABLE_SOCKS5_PROXY;
  else process.env.ENABLE_SOCKS5_PROXY = value;
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env.ENABLE_SOCKS5_PROXY;
    else process.env.ENABLE_SOCKS5_PROXY = previous;
  }
}

function putProxy(body: unknown) {
  return proxyRoute.PUT(
    new Request("http://localhost/api/settings/proxy", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test.before(() => {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag reader honors the opt-out matrix (unset defaults ON)", async () => {
  for (const [value, expected] of MATRIX) {
    await withSocksFlag(value, () => {
      assert.equal(isSocks5ProxyEnabled(), expected, `ENABLE_SOCKS5_PROXY=${String(value)}`);
    });
  }
});

test("GET /api/settings/proxies reports socks5Enabled exactly as the flag reader", async () => {
  for (const [value, expected] of MATRIX) {
    await withSocksFlag(value, async () => {
      const response = await proxiesRoute.GET(new Request("http://localhost/api/settings/proxies"));
      assert.equal(response.status, 200);
      const body = (await response.json()) as { socks5Enabled: boolean };
      assert.equal(body.socks5Enabled, expected, `ENABLE_SOCKS5_PROXY=${String(value)}`);
    });
  }
});

test("PUT /api/settings/proxy accepts or rejects socks5 following the flag", async () => {
  for (const [value, expected] of MATRIX) {
    await withSocksFlag(value, async () => {
      const response = await putProxy({
        level: "global",
        proxy: { type: "socks5", host: "127.0.0.1", port: 1080 },
      });
      const body = (await response.json()) as { error?: { message?: string } };
      if (expected) {
        assert.equal(response.status, 200, `ENABLE_SOCKS5_PROXY=${String(value)}`);
      } else {
        assert.equal(response.status, 400, `ENABLE_SOCKS5_PROXY=${String(value)}`);
        assert.match(body.error?.message ?? "", /SOCKS5 proxy is disabled/);
      }
    });
  }
});
