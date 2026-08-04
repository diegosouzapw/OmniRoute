/**
 * #5242 (Bug 1C) — opt-in native HTTPS/TLS serving for `omniroute serve`.
 *
 * `resolveTlsOptions` + `createServerListener` (scripts/dev/tls-options.mjs) are
 * the pure decision helpers the CLI (serve.mjs) and the standalone server
 * wrapper (standalone-server-ws.mjs) share. TLS is strictly opt-in:
 *   - both cert+key present & readable → TLS options → https.Server
 *   - neither present → null → http.Server (byte-identical to today)
 *   - only one of the pair → null + warning (never half-enable TLS)
 *   - unreadable path → null + warning (never crash over a TLS misconfig)
 *
 * Filesystem reads and the http/https factories are injected so the suite is
 * deterministic and needs no real certs.
 */
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

const { resolveTlsOptions, createServerListener } = await import(
  "../../scripts/dev/tls-options.mjs"
);

function makeReader(map: Record<string, string>) {
  return (p: string) => {
    if (p in map) return Buffer.from(map[p]);
    const err: NodeJS.ErrnoException = new Error(`ENOENT: ${p}`);
    err.code = "ENOENT";
    throw err;
  };
}

test("both cert+key provided and readable → returns TLS options", () => {
  const warnings: string[] = [];
  const opts = resolveTlsOptions(
    { OMNIROUTE_TLS_CERT: "/c/server.crt", OMNIROUTE_TLS_KEY: "/c/server.key" },
    { readFileSync: makeReader({ "/c/server.crt": "CERT", "/c/server.key": "KEY" }), warn: (m) => warnings.push(m) }
  );
  assert.ok(opts, "expected non-null TLS options");
  assert.equal(opts.cert.toString(), "CERT");
  assert.equal(opts.key.toString(), "KEY");
  assert.equal(opts.certPath, "/c/server.crt");
  assert.deepEqual(warnings, [], "no warning when correctly configured");
});

test("neither cert nor key → null, no warning (default HTTP path)", () => {
  const warnings: string[] = [];
  const opts = resolveTlsOptions({}, { warn: (m) => warnings.push(m) });
  assert.equal(opts, null);
  assert.deepEqual(warnings, []);
});

test("only cert provided → null + warning (never half-enable TLS)", () => {
  const warnings: string[] = [];
  const opts = resolveTlsOptions(
    { OMNIROUTE_TLS_CERT: "/c/server.crt" },
    { warn: (m) => warnings.push(m) }
  );
  assert.equal(opts, null);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /both OMNIROUTE_TLS_CERT and OMNIROUTE_TLS_KEY/);
});

test("only key provided → null + warning", () => {
  const warnings: string[] = [];
  const opts = resolveTlsOptions(
    { OMNIROUTE_TLS_KEY: "/c/server.key" },
    { warn: (m) => warnings.push(m) }
  );
  assert.equal(opts, null);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /both OMNIROUTE_TLS_CERT and OMNIROUTE_TLS_KEY/);
});

test("unreadable path → null + warning, falls back to HTTP (never crash)", () => {
  const warnings: string[] = [];
  const opts = resolveTlsOptions(
    { OMNIROUTE_TLS_CERT: "/missing.crt", OMNIROUTE_TLS_KEY: "/missing.key" },
    { readFileSync: makeReader({}), warn: (m) => warnings.push(m) }
  );
  assert.equal(opts, null);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /could not read TLS cert\/key/);
});

test("whitespace-only env values are treated as absent", () => {
  const opts = resolveTlsOptions(
    { OMNIROUTE_TLS_CERT: "   ", OMNIROUTE_TLS_KEY: "  " },
    { warn: () => {} }
  );
  assert.equal(opts, null);
});

test("createServerListener: null tlsOptions → http server (unchanged)", () => {
  let httpCalled = false;
  let httpsCalled = false;
  const listener = () => {};
  const result = createServerListener([listener], null, {
    createHttp: (...a: unknown[]) => {
      httpCalled = true;
      assert.equal(a[a.length - 1], listener);
      return "HTTP_SERVER";
    },
    createHttps: () => {
      httpsCalled = true;
      return "HTTPS_SERVER";
    },
  });
  assert.equal(result, "HTTP_SERVER");
  assert.ok(httpCalled && !httpsCalled);
});

test("createServerListener: tlsOptions → https server with merged cert/key + listener", () => {
  let httpCalled = false;
  const listener = () => {};
  const result = createServerListener([listener], { cert: "CERT", key: "KEY" }, {
    createHttp: () => {
      httpCalled = true;
      return "HTTP_SERVER";
    },
    createHttps: (opts: { cert: string; key: string }, fn: unknown) => {
      assert.equal(opts.cert, "CERT");
      assert.equal(opts.key, "KEY");
      assert.equal(fn, listener);
      return "HTTPS_SERVER";
    },
  });
  assert.equal(result, "HTTPS_SERVER");
  assert.ok(!httpCalled);
});

test("createServerListener: merges a leading options object with cert/key", () => {
  const listener = () => {};
  createServerListener([{ keepAlive: true }, listener], { cert: "C", key: "K" }, {
    createHttps: (opts: Record<string, unknown>, fn: unknown) => {
      assert.equal(opts.keepAlive, true);
      assert.equal(opts.cert, "C");
      assert.equal(opts.key, "K");
      assert.equal(fn, listener);
      return "HTTPS_SERVER";
    },
  });
});

test("createServerListener: real default (no TLS) returns an http.Server", () => {
  const server = createServerListener([], null);
  assert.ok(server instanceof http.Server);
  server.close();
});

test("createServerListener: with a real cert pair returns a real https.Server", async () => {
  const { default: selfsigned } = await import("selfsigned");
  const pems = selfsigned.generate([{ name: "commonName", value: "localhost" }], {
    keySize: 2048,
    algorithm: "sha256",
  });
  const server = createServerListener([() => {}], { cert: pems.cert, key: pems.private });
  assert.ok(server instanceof https.Server, "expected a real https.Server instance");
  server.close();
});
