import test from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import fs from "node:fs";
import path from "node:path";

// Module imports may resolve data paths; never point them at the operator's installation.
fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixtureDir = fs.mkdtempSync(path.resolve("_artifacts/traffic-transport-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixtureDir;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixtureDir, "isolated.sqlite");
}
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(fixtureDir, "plugins");

process.env.OMNIROUTE_RETRY_BACKOFF_MS = "0";
const { dispatchProxyFetch } = await import("../../open-sse/utils/proxyFetchTransport.ts");
const { setTlsClientForTest } = await import("../../open-sse/utils/proxyFetchTransportSupport.ts");
const { tryTlsSend } = await import("../../open-sse/utils/proxyFetchTlsTransport.ts");
const originalFetch = globalThis.fetch;
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  setTlsClientForTest(null);
  globalThis.fetch = originalFetch;
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

// Only the raw transport dependency is fake. Real proxy selection/retry/counter logic runs.
test(
  "actual proxy retries count independently, while response cancel counts only consumed prefix",
  { timeout: 2000 },
  async () => {
    const proxy = {
      proxyId: "fixture-proxy",
      type: "http",
      host: "fixture.invalid",
      port: 8080,
      username: "fixture-user",
      password: "fixture-pass",
    };
    const context = new AsyncLocalStorage<unknown>();
    const records: Array<{ proxy: unknown; delta: Record<string, number> }> = [];
    let sends = 0;
    let cancelled = false;
    const native = async () => {
      assert.fail("must not fall back to native");
    };
    const runtime = {
      originalFetch: native as typeof fetch,
      originalFetchWithDispatcher: native,
      proxyContext: context,
      tlsFingerprintContext: new AsyncLocalStorage<{ used: boolean }>(),
      resolveProxyForRequest: () => ({
        source: "context",
        proxyUrl: "http://fixture.invalid:8080",
      }),
    };
    const response = await context.run(proxy, () =>
      dispatchProxyFetch(
        "https://upstream.invalid",
        { method: "POST", body: "é🙂" },
        {
          undiciFetch: async () => {
            sends++;
            if (sends === 1) throw new TypeError("fetch failed");
            return new Response(
              new ReadableStream<Uint8Array>(
                {
                  pull(c) {
                    c.enqueue(new Uint8Array([1, 2, 3]));
                  },
                  cancel() {
                    cancelled = true;
                  },
                },
                { highWaterMark: 0 }
              ),
              { status: 503 }
            );
          },
          recordTraffic: (route, delta) => records.push({ proxy: route, delta }),
        },
        runtime
      )
    );
    assert.equal(sends, 2);
    assert.equal(response.status, 503);
    const reader = response.body!.getReader();
    assert.equal((await reader.read()).value!.byteLength, 3);
    await reader.cancel();
    assert.equal(cancelled, true);
    assert.ok(records.every((record) => record.proxy === proxy));
    assert.deepEqual(
      records.map((record) => record.delta),
      [
        { attempts: 1, uploadBytes: 6, knownUploadAttempts: 1 },
        { failedAttempts: 1 },
        { attempts: 1, uploadBytes: 6, knownUploadAttempts: 1 },
        { downloadBytes: 3 },
        { cancelledDownloads: 1 },
      ]
    );
  }
);

test(
  "resolved direct traffic never inherits a stale proxy context",
  { timeout: 1000 },
  async () => {
    const context = new AsyncLocalStorage<unknown>();
    const records: unknown[] = [];
    const native = async () => new Response("ok");
    const runtime = {
      originalFetch: native as typeof fetch,
      originalFetchWithDispatcher: native,
      proxyContext: context,
      tlsFingerprintContext: new AsyncLocalStorage<{ used: boolean }>(),
      resolveProxyForRequest: () => ({ source: "direct", proxyUrl: null }),
    };
    const response = await context.run({ proxyId: "stale" }, () =>
      dispatchProxyFetch(
        "http://127.0.0.1/fixture",
        {},
        {
          nativeFetch: native,
          recordTraffic: (route) => records.push(route),
        },
        runtime
      )
    );
    assert.equal(await response.text(), "ok");
    assert.ok(records.every((route) => route === null));
  }
);

test(
  "TLS watchdog prefetch is not charged until downstream consumption and retains response identity",
  { timeout: 2000 },
  async () => {
    const deltas: Array<Record<string, number>> = [];
    let prefetched = 0;
    const source = new Response(
      new ReadableStream<Uint8Array>(
        {
          pull(c) {
            prefetched++;
            if (prefetched <= 3) c.enqueue(new Uint8Array([1, 2]));
            else c.close();
          },
        },
        { highWaterMark: 0 }
      )
    );
    Object.defineProperty(source, "url", { value: "https://fixture.invalid/final" });
    Object.defineProperty(source, "redirected", { value: true });
    setTlsClientForTest({ available: true, fetch: async () => source });
    const response = await tryTlsSend(
      "https://fixture.invalid",
      { body: "é" },
      "https://fixture.invalid",
      { used: false },
      null,
      null,
      { recordTraffic: (_route, delta) => deltas.push(delta) }
    );
    assert.ok(response);
    assert.ok(prefetched >= 1);
    assert.deepEqual(deltas, [{ attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 }]);
    assert.equal(response.url, source.url);
    assert.equal(response.redirected, true);
    const reader = response.body!.getReader();
    assert.equal((await reader.read()).value!.byteLength, 2);
    await reader.cancel();
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 },
      { downloadBytes: 2 },
      { cancelledDownloads: 1 },
    ]);
    setTlsClientForTest(null);
  }
);
