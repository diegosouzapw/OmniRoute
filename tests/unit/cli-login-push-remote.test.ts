import { test } from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — plain .mjs CLI module, no type declarations by design.
import {
  isRemoteBaseUrl,
  pushCredentialBlob,
  runAntigravityLogin,
} from "../../bin/cli/commands/login.mjs";

// `omniroute login antigravity` already runs the OAuth on the operator's OWN machine —
// the only place Google's firstparty/nativeapp loopback actually resolves — but it
// stopped at PRINTING a credential blob for the operator to paste into the remote
// dashboard by hand.
//
// Every piece needed to close that loop already exists:
//   - `omniroute connect <host>` saves an admin-scoped token in the active context;
//   - `apiFetch()` injects that context's baseUrl + Bearer automatically;
//   - `/api/oauth` is admin-scoped (accessScopes.ts) and stays REMOTE-REACHABLE —
//     routeGuard.ts loopback-gates only `/api/oauth/cursor/auto-import`;
//   - `/api/oauth/<provider>/paste-credentials` already decodes a blob and persists.
//
// So the CLI can push the blob straight to the remote install. The one thing it must
// NOT do is regress the case the helper was built for: it talks only to Google, so it
// works from behind a firewall that cannot reach the VPS at all. A failed push must
// therefore fall back to printing the blob, never abort the login.

test("isRemoteBaseUrl: loopback hosts are local, everything else is remote", () => {
  assert.equal(isRemoteBaseUrl("http://localhost:20128"), false);
  assert.equal(isRemoteBaseUrl("http://127.0.0.1:20128"), false);
  assert.equal(isRemoteBaseUrl("http://[::1]:20128"), false);
  assert.equal(isRemoteBaseUrl("http://192.168.0.15:20128"), true);
  assert.equal(isRemoteBaseUrl("https://omni.example.com"), true);
  // Unparseable / absent → treated as local, so we never auto-push into the unknown.
  assert.equal(isRemoteBaseUrl(""), false);
  assert.equal(isRemoteBaseUrl(undefined), false);
});

test("pushCredentialBlob POSTs the blob to the provider's paste-credentials route", async () => {
  const calls: Array<{ path: string; opts: Record<string, unknown> }> = [];
  const fetchImpl = async (path: string, opts: Record<string, unknown>) => {
    calls.push({ path, opts });
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, connection: { id: "c1" } }),
    };
  };

  const result = await pushCredentialBlob("antigravity", "omniroute-cred-v1.abc", { fetchImpl });

  assert.equal(result.ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].path, "/api/oauth/antigravity/paste-credentials");
  assert.equal(calls[0].opts.method, "POST");
  assert.deepEqual(calls[0].opts.body, { blob: "omniroute-cred-v1.abc" });
});

test("pushCredentialBlob surfaces a server rejection instead of pretending success", async () => {
  const fetchImpl = async () => ({
    ok: false,
    status: 400,
    json: async () => ({ error: "Pasted credential provider mismatch" }),
  });

  const result = await pushCredentialBlob("agy", "omniroute-cred-v1.abc", { fetchImpl });

  assert.equal(result.ok, false);
  assert.match(result.error, /provider mismatch/i);
});

test("pushCredentialBlob turns a transport failure into a result, never a throw", async () => {
  const fetchImpl = async () => {
    throw new Error("ECONNREFUSED 192.168.0.15:20128");
  };

  const result = await pushCredentialBlob("antigravity", "blob", { fetchImpl });

  assert.equal(result.ok, false);
  assert.match(result.error, /ECONNREFUSED/);
});

// --- end-to-end through runAntigravityLogin, with the OAuth half stubbed ------------

function loginDeps(overrides: Record<string, unknown> = {}) {
  const state = "st-1";
  return {
    startServer: async () => ({
      port: 4321,
      waitForCallback: async () => ({ code: "the-code", state }),
      close: async () => {},
    }),
    openBrowser: async () => {},
    exchange: async () => ({ access_token: "at", refresh_token: "rt" }),
    makeState: () => state,
    print: () => {},
    log: () => {},
    ...overrides,
  };
}

test("a remote context auto-pushes and does NOT print the blob", async () => {
  let pushed: { provider: string; blob: string } | null = null;
  const printed: string[] = [];

  await runAntigravityLogin(
    {},
    loginDeps({
      print: (s: string) => printed.push(s),
      resolveContext: () => ({ baseUrl: "http://192.168.0.15:20128", accessToken: "oma_live_x" }),
      push: async (provider: string, blob: string) => {
        pushed = { provider, blob };
        return { ok: true, connectionId: "c1" };
      },
    })
  );

  assert.ok(pushed, "a remote context must trigger the push");
  assert.equal(pushed!.provider, "antigravity");
  assert.match(pushed!.blob, /^omniroute-cred-v1\./);
  // The blob carries a refresh token; don't spray it on a terminal when it already landed.
  assert.equal(
    printed.join("").includes("omniroute-cred-v1."),
    false,
    "a successful push must not also print the secret"
  );
});

test("a FAILED push falls back to printing the blob — the firewall case still works", async () => {
  const printed: string[] = [];

  const blob = await runAntigravityLogin(
    {},
    loginDeps({
      print: (s: string) => printed.push(s),
      resolveContext: () => ({ baseUrl: "http://192.168.0.15:20128", accessToken: "oma_live_x" }),
      push: async () => ({ ok: false, error: "ECONNREFUSED" }),
    })
  );

  assert.match(blob, /^omniroute-cred-v1\./);
  assert.ok(
    printed.join("").includes(blob),
    "the operator must still get the blob to paste when the push cannot land"
  );
});

test("a LOCAL context prints as before — no surprise network call", async () => {
  let pushCalls = 0;
  const printed: string[] = [];

  await runAntigravityLogin(
    {},
    loginDeps({
      print: (s: string) => printed.push(s),
      resolveContext: () => ({ baseUrl: "http://localhost:20128" }),
      push: async () => {
        pushCalls++;
        return { ok: true };
      },
    })
  );

  assert.equal(pushCalls, 0, "a loopback context must not auto-push");
  assert.ok(printed.join("").includes("omniroute-cred-v1."));
});

test("--no-push forces print-only even against a remote context", async () => {
  let pushCalls = 0;
  const printed: string[] = [];

  await runAntigravityLogin(
    { push: false },
    loginDeps({
      print: (s: string) => printed.push(s),
      resolveContext: () => ({ baseUrl: "http://192.168.0.15:20128", accessToken: "oma_live_x" }),
      push: async () => {
        pushCalls++;
        return { ok: true };
      },
    })
  );

  assert.equal(pushCalls, 0);
  assert.ok(printed.join("").includes("omniroute-cred-v1."));
});

test("--push forces the push even when the context looks local", async () => {
  let pushCalls = 0;

  await runAntigravityLogin(
    { push: true },
    loginDeps({
      resolveContext: () => ({ baseUrl: "http://localhost:20128" }),
      push: async () => {
        pushCalls++;
        return { ok: true };
      },
    })
  );

  assert.equal(pushCalls, 1, "an explicit --push must be honoured regardless of the baseUrl");
});

test("a context without a token still pushes — auth may be disabled server-side", async () => {
  // `isAuthenticated()` short-circuits to true when requireLogin is off, so refusing to
  // push on a missing token would break perfectly valid unauthenticated installs.
  let pushCalls = 0;

  await runAntigravityLogin(
    {},
    loginDeps({
      resolveContext: () => ({ baseUrl: "http://192.168.0.15:20128" }),
      push: async () => {
        pushCalls++;
        return { ok: true };
      },
    })
  );

  assert.equal(pushCalls, 1);
});
