/**
 * OSS-051 — the tunnel and MITM management routes returned raw `error.message`.
 *
 * Two independent defects, both in `src/app/api/tunnels/**` and
 * `src/app/api/settings/mitm/route.ts`:
 *
 * 1. Fourteen catch blocks answered with
 *    `{ error: error instanceof Error ? error.message : "<fallback>" }`. Those
 *    errors come from child processes (cloudflared / tailscale / tailscaled /
 *    ngrok) and from filesystem I/O under the operator's home directory, so the
 *    body disclosed host layout, binary install paths, the OS account name and —
 *    for Tailscale — live `tskey-*` credentials. Hard Rule #12 forbids this.
 *
 *    `sanitizeErrorMessage()` alone does not close it: it only rewrites tokens
 *    that look like an absolute path ending in a *source* extension (SOURCE_EXT
 *    in open-sse/utils/error.ts), so `.json` state paths, extension-less binary
 *    paths and `tskey-*` keys all survive it verbatim. The first test below pins
 *    that, so the reason this module exists stays visible.
 *
 * 2. `validateBody()` returns `{ success, error }` and has NO `response` field
 *    (`validatedJsonBody()` is the helper that has one). Three call sites did
 *    `return validation.response`, so a failed body validation returned
 *    `undefined` and Next answered with a framework 500 instead of a 400.
 *
 * Reachability is not uniform, and the tests say so: `/api/tunnels/ngrok`,
 * `/api/tunnels/tailscale` and `/api/tunnels/tailscale/check` are not in
 * `LOCAL_ONLY_API_PREFIXES`, and `GET /api/tunnels/cloudflared` is exempted via
 * `LOCAL_ONLY_API_GET_EXEMPTIONS` (#11531); the rest are loopback-gated.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tunnel-sanitize-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "tunnel-sanitize-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const { sanitizeErrorMessage } = await import("../../../open-sse/utils/error.ts");
const { classifyTunnelError, toPublicSafeTunnelError } =
  await import("../../../src/lib/api/publicSafeTunnelError.ts");
const ngrokRoute = await import("../../../src/app/api/tunnels/ngrok/route.ts");
const cloudflaredRoute = await import("../../../src/app/api/tunnels/cloudflared/route.ts");
const tailscaleEnableRoute = await import("../../../src/app/api/tunnels/tailscale/enable/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

/** The exact leak shapes these routes produce in the field. */
const LEAKS = [
  {
    label: "config/state path (.json)",
    message:
      "ENOENT: no such file or directory, open '/home/operator/.omniroute/data/tunnels.json'",
    secrets: ["/home/operator", "tunnels.json"],
  },
  {
    label: "binary path (no extension)",
    message: "spawn /usr/local/bin/cloudflared ENOENT",
    secrets: ["/usr/local/bin/cloudflared"],
  },
  {
    label: "tailscale auth key",
    message: "tailscale up failed: invalid key tskey-auth-kMn3Qz7RtY-9fVbXsPq2LdWc",
    secrets: ["tskey-auth-kMn3Qz7RtY-9fVbXsPq2LdWc"],
  },
  {
    label: "daemon state path",
    message:
      "Command failed: /opt/omniroute/bin/tailscaled --state=/var/lib/tailscale/tailscaled.state",
    secrets: ["/opt/omniroute/bin/tailscaled", "/var/lib/tailscale"],
  },
  {
    label: "windows config path",
    message:
      "listen EADDRINUSE: address already in use 0.0.0.0:41641 (config C:\\Users\\operator\\AppData\\omniroute\\ngrok.yml)",
    secrets: ["C:\\Users\\operator", "ngrok.yml"],
  },
] as const;

/** Run `fn` with console.error captured, so the helper's log does not spam output. */
async function withSilencedConsoleError<T>(fn: () => T | Promise<T>): Promise<[T, unknown[][]]> {
  const original = console.error;
  const calls: unknown[][] = [];
  console.error = (...args: unknown[]) => {
    calls.push(args);
  };
  try {
    return [await fn(), calls];
  } finally {
    console.error = original;
  }
}

// ── Why a dedicated module: sanitizeErrorMessage does not cover these ───────

test("sanitizeErrorMessage alone leaves every tunnel leak shape intact", () => {
  for (const leak of LEAKS) {
    const out = sanitizeErrorMessage(leak.message);
    const stillLeaks = leak.secrets.some((s) => out.includes(s));
    assert.ok(
      stillLeaks,
      `${leak.label}: sanitizeErrorMessage unexpectedly covers this now — if the ` +
        `shared sanitizer grew to handle it, simplify publicSafeTunnelError accordingly. Got: ${out}`
    );
  }
});

// ── The public-safe contract ───────────────────────────────────────────────

test("toPublicSafeTunnelError never echoes the upstream message", async () => {
  for (const leak of LEAKS) {
    const [body] = await withSilencedConsoleError(() =>
      toPublicSafeTunnelError(new Error(leak.message), "Failed to update the tunnel.", "test")
    );
    assert.equal(body.error, "Failed to update the tunnel.", `${leak.label}: fallback replaced`);
    for (const secret of leak.secrets) {
      assert.ok(!body.error.includes(secret), `${leak.label}: leaked ${secret}`);
      assert.ok(
        !JSON.stringify(body).includes(secret),
        `${leak.label}: leaked ${secret} elsewhere in the body`
      );
    }
    assert.equal(typeof body.reason, "string");
  }
});

test("toPublicSafeTunnelError logs the real error server-side", async () => {
  const [, calls] = await withSilencedConsoleError(() =>
    toPublicSafeTunnelError(new Error("spawn /usr/local/bin/cloudflared ENOENT"), "nope", "ctx")
  );
  assert.equal(calls.length, 1, "operator must still get the real cause in the server log");
  assert.equal(calls[0][0], "[ctx]");
});

test("classifyTunnelError maps causes without echoing them", () => {
  assert.equal(classifyTunnelError(new Error("spawn cloudflared ENOENT")), "not_installed");
  assert.equal(classifyTunnelError(new Error("EACCES: permission denied")), "permission_denied");
  assert.equal(classifyTunnelError(new Error("listen EADDRINUSE")), "already_running");
  assert.equal(classifyTunnelError(new Error("connect ETIMEDOUT")), "timeout");
  assert.equal(classifyTunnelError(new Error("connect ECONNREFUSED")), "network");
  assert.equal(classifyTunnelError(new Error("something else entirely")), "unknown");
  assert.equal(classifyTunnelError(undefined), "unknown");
});

// ── Defect 1, end to end on a remotely reachable route ─────────────────────

function makeRequest(url: string, init?: RequestInit): NextRequest {
  return new Request(url, init) as unknown as NextRequest;
}

test("GET /api/tunnels/ngrok does not leak a host path in its 500 body", async () => {
  // getNgrokTunnelStatus() reads globalThis.__ngrokListener and then calls
  // getTunnelApiUrl(currentUrl) OUTSIDE its try/catch, so a listener whose url()
  // yields an object with a throwing `replace` reproduces a real 500 here.
  const LEAK = "/home/operator/.omniroute/data/tunnels.json";
  const g = globalThis as unknown as { __ngrokListener?: unknown };
  const previous = g.__ngrokListener;
  g.__ngrokListener = {
    url: () => ({
      replace: () => {
        throw new Error(`ENOENT: no such file or directory, open '${LEAK}'`);
      },
    }),
  };

  try {
    const [res] = await withSilencedConsoleError(() =>
      ngrokRoute.GET(makeRequest("http://localhost/api/tunnels/ngrok"))
    );
    assert.equal(res.status, 500);
    const body = (await res.json()) as { error?: unknown; reason?: unknown };
    assert.equal(typeof body.error, "string", "dashboard reads data.error as a string");
    const text = JSON.stringify(body);
    assert.ok(!text.includes(LEAK), `body leaked the state path: ${text}`);
    assert.ok(!text.includes("/home/operator"), `body leaked the home directory: ${text}`);
    assert.equal(body.reason, "not_installed");
  } finally {
    if (previous === undefined) delete g.__ngrokListener;
    else g.__ngrokListener = previous;
  }
});

// ── Defect 2: validateBody has no `response` field ─────────────────────────

test("POST /api/tunnels/ngrok answers 400 (not a framework 500) on an invalid body", async () => {
  const res = await ngrokRoute.POST(
    makeRequest("http://localhost/api/tunnels/ngrok", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "not-a-valid-action" }),
    })
  );
  assert.ok(res, "handler must return a Response, not undefined");
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: unknown };
  assert.equal(typeof body.error, "string");
  assert.ok((body.error as string).length > 0);
});

test("POST /api/tunnels/cloudflared answers 400 (not a framework 500) on an invalid body", async () => {
  const res = await cloudflaredRoute.POST(
    makeRequest("http://localhost/api/tunnels/cloudflared", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "not-a-valid-action" }),
    })
  );
  assert.ok(res, "handler must return a Response, not undefined");
  assert.equal(res.status, 400);
  assert.equal(typeof ((await res.json()) as { error?: unknown }).error, "string");
});

test("POST /api/tunnels/tailscale/enable answers 400 (not a framework 500) on an out-of-range port", async () => {
  const res = await tailscaleEnableRoute.POST(
    makeRequest("http://localhost/api/tunnels/tailscale/enable", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ port: 999999 }),
    })
  );
  assert.ok(res, "handler must return a Response, not undefined");
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: unknown };
  assert.equal(typeof body.error, "string");
  assert.match(body.error as string, /port/i, "the 400 should name the offending field");
});

// ── Regression sweep over the whole surface this PR covers ────────────────

test("no tunnel or MITM route echoes a raw error.message any more", () => {
  const roots = ["src/app/api/tunnels", "src/app/api/settings/mitm"];
  const offenders: string[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".ts")) continue;
      for (const [i, line] of fs.readFileSync(full, "utf8").split("\n").entries()) {
        // The comments this PR adds mention the old pattern by name; only flag code.
        if (line.trimStart().startsWith("//")) continue;
        if (/\b\w+ instanceof Error \? \w+\.message\b/.test(line)) {
          offenders.push(`${full}:${i + 1}`);
        }
      }
    }
  };

  for (const root of roots) walk(path.resolve(process.cwd(), root));
  assert.deepEqual(
    offenders,
    [],
    `Hard Rule #12: these lines put a raw error.message in a response body:\n${offenders.join("\n")}`
  );
});
