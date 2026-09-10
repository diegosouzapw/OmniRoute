/**
 * #11894 — a connection-level proxy assignment (proxy_assignments, scope
 * "account") is applied by the chat handler as the AMBIENT proxy context via
 * runWithProxyContext(proxyInfo.proxy, () => executor.execute(...)) BEFORE the
 * executor runs. When no per-account multi-fingerprint proxies are configured
 * (API-key connections), OpencodeExecutor keeps a single account whose
 * `proxy` is null and must NOT clobber that ambient context with a nested
 * runWithProxyContext(null, ...) — the upstream fetch has to egress through
 * the ambient proxy, not direct.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { resolveProxyForRequest, runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

const log = { debug() {}, info() {}, warn() {}, error() {} };

// A throwaway local TCP listener stands in for the proxy so the fast-fail
// reachability probe inside runWithProxyContext passes.
let server: net.Server;
let port = 0;

function listen(s: net.Server): Promise<number> {
  return new Promise((resolve) => {
    s.listen(0, "127.0.0.1", () => resolve((s.address() as net.AddressInfo).port));
  });
}

before(async () => {
  server = net.createServer((s) => s.destroy());
  port = await listen(server);
});

after(() => {
  server?.close();
});

type Observed = { source: string; proxyPort: string | null };

const FINGERPRINT_A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const FINGERPRINT_B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

async function executeUnderAmbientProxy(
  providerSpecificData: Record<string, unknown> = {}
): Promise<Observed[]> {
  const exec = new OpencodeExecutor("opencode-go");
  const observed: Observed[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: unknown) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : (input as { url: string }).url;
    const resolved = resolveProxyForRequest(url);
    let proxyPort: string | null = null;
    if (resolved.proxyUrl) {
      try {
        proxyPort = new URL(resolved.proxyUrl).port;
      } catch {
        proxyPort = null;
      }
    }
    observed.push({ source: resolved.source, proxyPort });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  try {
    const ambientProxy = { type: "http" as const, host: "127.0.0.1", port };
    const result = await runWithProxyContext(ambientProxy, () =>
      exec.execute({
        model: "muse-spark-1.2-contributor",
        body: { messages: [{ role: "user", content: "hi" }], stream: false },
        stream: false,
        signal: null,
        // Default (empty providerSpecificData): an API-key connection with no
        // fingerprints / accountProxies, so the executor keeps its single
        // default account with proxy === null and takes the fast path.
        credentials: { apiKey: "sk-test", providerSpecificData } as never,
        log,
      })
    );
    assert.strictEqual((result as { response: Response }).response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return observed;
}

describe("#11894 OpencodeExecutor lets the ambient proxy stand when the account has no proxy", () => {
  it("egresses through the ambient (connection-assigned) proxy instead of direct", async () => {
    const observed = await executeUnderAmbientProxy();
    assert.ok(observed.length >= 1, "at least one upstream dispatch happened");
    const first = observed[0];
    assert.strictEqual(
      first.source,
      "context",
      `upstream fetch must see the ambient proxy context, got source="${first.source}"`
    );
    assert.strictEqual(
      first.proxyPort,
      String(port),
      `upstream fetch must egress through the ambient proxy port ${port}, got "${first.proxyPort}"`
    );
  });

  it("keeps the ambient proxy on the rotation path when the selected account has no proxy of its own", async () => {
    // Multi-fingerprint connection without accountProxies: every account has
    // proxy === null, so execute() goes through the rotation loop and its
    // nested runWithProxyContext(account.proxy, ...) must inherit the ambient
    // proxy rather than force a direct connection.
    const observed = await executeUnderAmbientProxy({
      fingerprints: [FINGERPRINT_A, FINGERPRINT_B],
    });
    assert.ok(observed.length >= 1, "at least one upstream dispatch happened");
    for (const dispatch of observed) {
      assert.strictEqual(dispatch.source, "context");
      assert.strictEqual(dispatch.proxyPort, String(port));
    }
  });
});
