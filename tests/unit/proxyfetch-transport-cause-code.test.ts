import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

import proxyFetch, { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import { fetch as undiciFetch } from "undici";

async function withReachableNonProxyServer(
  fn: (host: string, port: string) => Promise<void>
): Promise<void> {
  const server = http.createServer((_req, res) => res.end("not-a-proxy"));
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  try {
    await fn("127.0.0.1", String(address.port));
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function undiciLikeError(code: string): Error {
  const cause = Object.assign(new Error("other side closed"), { code });
  return new TypeError("fetch failed", { cause });
}

test("proxy-path keeps the undici cause code on the sanitized transport error", async () => {
  await withReachableNonProxyServer(async (host, port) => {
    const logged: string[] = [];
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      logged.push(args.map(String).join(" "));
    };
    let caught: unknown;
    try {
      await runWithProxyContext({ type: "http", host, port }, async () =>
        proxyFetch("https://example.invalid/v1", { method: "GET" }, { undiciFetch })
      );
    } catch (error) {
      caught = error;
    } finally {
      console.error = originalConsoleError;
    }
    assert.ok(caught instanceof Error, `expected a transport error, got ${String(caught)}`);
    const err = caught as Error & { code?: string; causeCode?: string };
    assert.equal(err.code, "PROXY_REQUEST_FAILED");
    assert.equal(err.causeCode, "UND_ERR_PRX_CONN");
    assert.ok(
      err.message === "Proxy request failed: fetch failed (cause UND_ERR_PRX_CONN)",
      `message must carry the cause code, got: ${err.message}`
    );
    assert.equal(err.message.includes(host), false);
    assert.equal(err.message.includes(port), false);
    const line = logged.find((m) => m.includes("Proxy request failed"));
    assert.ok(line, `expected a fail-closed log line, got: ${JSON.stringify(logged)}`);
    assert.ok(
      line ===
        "[ProxyFetch] Proxy request failed (context, fail-closed; code=PROXY_REQUEST_FAILED; cause=UND_ERR_PRX_CONN)",
      `log line must carry the cause code, got: ${line}`
    );
  });
});

test("causeCode sanitization rejects unsafe codes and reads a single level", async () => {
  await withReachableNonProxyServer(async (host, port) => {
    const cases: Array<{ name: string; error: unknown; causeCode: undefined | string }> = [
      { name: "no cause", error: new TypeError("fetch failed"), causeCode: undefined },
      {
        name: "primitive cause",
        error: new TypeError("fetch failed", { cause: 42 }),
        causeCode: undefined,
      },
      {
        name: "numeric code",
        error: Object.assign(new TypeError("fetch failed"), {
          cause: Object.assign(new Error("x"), { code: -111 }),
        }),
        causeCode: undefined,
      },
      { name: "lowercase code", error: undiciLikeError("econnrefused"), causeCode: undefined },
      { name: "url code", error: undiciLikeError("http://proxy:8080"), causeCode: undefined },
      { name: "credential code", error: undiciLikeError("user:pass@host"), causeCode: undefined },
      {
        name: "second level ignored",
        error: Object.assign(new TypeError("fetch failed"), {
          cause: Object.assign(Object.assign(new Error("outer"), { code: "OUTER" }), {
            cause: { code: "INNER" },
          }),
        }),
        causeCode: "OUTER",
      },
      {
        name: "entry code preserved",
        error: Object.assign(undiciLikeError("ECONNRESET"), { code: "PROXY_UNREACHABLE" }),
        causeCode: "ECONNRESET",
      },
    ];
    for (const c of cases) {
      const logged: string[] = [];
      const originalConsoleError = console.error;
      console.error = (...args: unknown[]) => {
        logged.push(args.map(String).join(" "));
      };
      let caught: unknown;
      try {
        await runWithProxyContext({ type: "http", host, port }, async () =>
          proxyFetch(
            "https://example.invalid/v1",
            {},
            {
              undiciFetch: async () => {
                throw c.error;
              },
            }
          )
        );
      } catch (error) {
        caught = error;
      } finally {
        console.error = originalConsoleError;
      }
      assert.ok(caught instanceof Error, `${c.name}: expected a transport error`);
      const err = caught as Error & { code?: string; causeCode?: string };
      assert.equal(err.causeCode, c.causeCode, `${c.name}: causeCode`);
      if (c.name === "entry code preserved") {
        assert.equal(err.code, "PROXY_UNREACHABLE", `${c.name}: code unchanged`);
      }
      if (c.causeCode === undefined) {
        assert.equal(err.message.includes("(cause "), false, `${c.name}: no suffix`);
      }
    }
  });
});
