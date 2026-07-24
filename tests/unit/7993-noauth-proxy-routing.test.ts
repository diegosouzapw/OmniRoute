/**
 * #7993 — "OpenCode Free" is served by TWO distinct provider identities that
 * are never unified: the no-auth "opencode" provider (NOAUTH_PROVIDERS —
 * the id the NoAuthAccountCard UI writes fingerprints + accountProxies onto
 * via a `provider_connections` row) and the "opencode-zen" APIKEY_PROVIDERS
 * gateway (anonymousFallback: true, resolved from the canonical
 * "opencode/<model>" prefix via the #2901 alias override in
 * open-sse/services/model.ts).
 *
 * Before the fix, `getProviderCredentials("opencode-zen")` fell through to
 * `maybeSyntheticNoAuthFallback("opencode-zen", ...)`, which hydrated
 * `providerSpecificData` by querying `provider_connections` filtered by
 * `provider === "opencode-zen"` — a DIFFERENT id than the one the user's
 * connection row is saved under ("opencode") — so the assigned proxy was
 * silently dropped and the request egressed direct.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7993-noauth-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");

const log = { debug() {}, info() {}, warn() {}, error() {} };
const FINGERPRINT = "cccccccccccccccccccccccccccccccc";

let proxyServer: net.Server;
let proxyPort = 0;

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve((server.address() as net.AddressInfo).port);
    });
  });
}

test.before(async () => {
  proxyServer = net.createServer((s) => s.destroy());
  proxyPort = await listen(proxyServer);

  // Mirror exactly what the NoAuthAccountCard UI writes: a `provider_connections`
  // row filed under the no-auth id "opencode" (NOT "opencode-zen"), carrying the
  // configured account proxy.
  await createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "opencode-noauth-account",
    isActive: true,
    providerSpecificData: {
      fingerprints: [FINGERPRINT],
      accountProxies: [
        {
          fingerprint: FINGERPRINT,
          proxy: { type: "http", host: "127.0.0.1", port: proxyPort },
        },
      ],
    },
  });
});

test.after(() => {
  proxyServer?.close();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7993 getProviderCredentials('opencode-zen') hydrates the proxy saved under the sibling 'opencode' connection", async () => {
  const creds = (await getProviderCredentials("opencode-zen")) as {
    connectionId?: string;
    providerSpecificData?: { fingerprints?: unknown; accountProxies?: unknown };
  } | null;

  assert.ok(creds, "opencode-zen must resolve to synthetic no-auth credentials");
  assert.equal(creds!.connectionId, "noauth");
  const psd = creds!.providerSpecificData || {};
  assert.ok(
    Array.isArray(psd.fingerprints) && psd.fingerprints.length === 1,
    `expected the sibling opencode connection's fingerprints to be hydrated, got ${JSON.stringify(psd)}`
  );
  assert.ok(
    Array.isArray(psd.accountProxies) && psd.accountProxies.length === 1,
    `expected the sibling opencode connection's accountProxies to be hydrated, got ${JSON.stringify(psd)}`
  );
});

test("#7993 a canonical 'opencode/<model>' resolved combo/catalog target egresses through the assigned proxy, not direct", async () => {
  const creds = await getProviderCredentials("opencode-zen");

  const exec = new OpencodeExecutor("opencode-zen");
  let observedSource: string | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: unknown) => {
    const url = typeof input === "string" ? input : (input as { url?: string })?.url || String(input);
    observedSource = resolveProxyForRequest(url).source;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  try {
    const result = await exec.execute({
      model: "grok-code",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds as never,
      log,
    });
    assert.strictEqual((result as { response: Response }).response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.strictEqual(
    observedSource,
    "context",
    `combo/catalog-path ('opencode-zen') must ALSO egress through the assigned proxy — got source=${observedSource}, expected 'context'`
  );
});
