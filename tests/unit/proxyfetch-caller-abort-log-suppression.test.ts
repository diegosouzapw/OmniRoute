/**
 * Ported from decolua/9router#2589 ("harden proxy routing"): the pinned-proxy
 * dispatch path in `proxyFetch.ts` logged every failure — including a plain
 * caller-initiated abort/timeout — as `console.error("[ProxyFetch] Proxy
 * request failed ... fail-closed")`. A client cancelling its own request (or
 * its own AbortSignal.timeout firing) is not a proxy transport failure; it
 * shouldn't be misreported as one in ops logs/alerting.
 *
 * This only changes what gets logged — the abort error itself still
 * propagates to the caller unchanged (fail-closed behavior is untouched).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

import proxyFetch, { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

async function withHttpServer(handler, fn) {
  const server = http.createServer(handler);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  try {
    return await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("pinned-proxy dispatch does not log a noisy 'Proxy request failed' error for a caller-initiated abort", async () => {
  await withHttpServer(
    (_req, res) => res.end("proxy-reachable"),
    async (proxyUrl) => {
      const parsed = new URL(proxyUrl);
      const originalConsoleError = console.error;
      const loggedMessages: string[] = [];
      console.error = (...args: unknown[]) => {
        loggedMessages.push(args.map(String).join(" "));
      };

      try {
        const controller = new AbortController();
        controller.abort();

        await assert.rejects(
          runWithProxyContext(
            { type: "http", host: parsed.hostname, port: parsed.port },
            async () =>
              proxyFetch("https://example.invalid/", {
                signal: controller.signal,
              })
          )
        );
      } finally {
        console.error = originalConsoleError;
      }

      assert.ok(
        !loggedMessages.some((m) => m.includes("Proxy request failed")),
        `expected no 'Proxy request failed' log for a caller abort, got: ${JSON.stringify(loggedMessages)}`
      );
    }
  );
});

test("pinned-proxy dispatch still logs genuine (non-abort) proxy transport failures", async () => {
  await withHttpServer(
    (_req, res) => res.end("proxy-reachable"),
    async (proxyUrl) => {
      const parsed = new URL(proxyUrl);
      const originalConsoleError = console.error;
      const loggedMessages: string[] = [];
      console.error = (...args: unknown[]) => {
        loggedMessages.push(args.map(String).join(" "));
      };
      // Inject a throwing undici mock — a real dispatcher-level transport
      // failure (e.g. tunnel refused), NOT a caller abort — must still log.
      const throwingUndici = async () => {
        throw new Error("proxy tunnel refused");
      };

      try {
        await assert.rejects(
          runWithProxyContext(
            { type: "http", host: parsed.hostname, port: parsed.port },
            async () =>
              proxyFetch("https://example.invalid/", {}, { undiciFetch: throwingUndici })
          ),
          /proxy tunnel refused/
        );
      } finally {
        console.error = originalConsoleError;
      }

      assert.ok(
        loggedMessages.some((m) => m.includes("Proxy request failed")),
        `expected a 'Proxy request failed' log for a genuine transport failure, got: ${JSON.stringify(loggedMessages)}`
      );
    }
  );
});
