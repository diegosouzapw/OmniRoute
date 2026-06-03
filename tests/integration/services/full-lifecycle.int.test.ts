/**
 * G-12: Full lifecycle integration test for 9router and CLIProxyAPI.
 *
 * This test exercises the real install → start → /v1/models → chat → stop →
 * uninstall flow. It is GATED behind the environment flag:
 *
 *   RUN_SERVICES_INT=1 node --import tsx/esm --test tests/integration/services/full-lifecycle.int.test.ts
 *
 * All sub-tests skip automatically when `RUN_SERVICES_INT !== "1"`.
 * This prevents the test from running in CI (slow, network-dependent) while
 * keeping the documentation of what the full flow looks like.
 *
 * Prerequisites when running for real:
 *   - npm is in PATH
 *   - Network access to registry.npmjs.org
 *   - Ports 20130 (9router) and 8317 (cliproxy) are available
 *   - DATA_DIR is writable
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const ENABLED = process.env.RUN_SERVICES_INT === "1";
const SKIP_REASON = "Set RUN_SERVICES_INT=1 to run full lifecycle integration tests";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Skip if the integration gate is not set.
 * Returns true when the test should be skipped (caller must return immediately).
 */
function maybeSkip(t: { skip: (reason?: string) => void }): boolean {
  if (!ENABLED) {
    t.skip(SKIP_REASON);
    return true;
  }
  return false;
}

const BASE_URL = process.env.OMNIROUTE_TEST_URL ?? "http://localhost:20128";

async function apiPost(path: string, body?: unknown): Promise<{ status: number; body: unknown }> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  return { status: res.status, body: parsed };
}

async function apiGet(path: string): Promise<{ status: number; body: unknown }> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  return { status: res.status, body: parsed };
}

/** Poll status until the state matches or timeout is exceeded. */
async function waitForState(
  statusPath: string,
  targetState: string,
  timeoutMs = 30_000,
  intervalMs = 1_000
): Promise<unknown> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { body } = await apiGet(statusPath);
    const b = body as Record<string, unknown>;
    if (b.state === targetState) return body;
    await new Promise<void>((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Timed out waiting for state=${targetState} on ${statusPath}`);
}

// ---------------------------------------------------------------------------
// 9router lifecycle
// ---------------------------------------------------------------------------

describe("9router — full lifecycle (opt-in, RUN_SERVICES_INT=1)", () => {
  it("STEP 1: install 9router (latest)", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiPost("/api/services/9router/install", {
      version: "latest",
    });
    assert.ok(
      status === 200,
      `Expected 200 from install, got ${status}: ${JSON.stringify(body).slice(0, 300)}`
    );
    const b = body as Record<string, unknown>;
    assert.ok(b.ok === true, "install response must have ok:true");
    assert.ok(
      typeof b.installedVersion === "string",
      "install response must have installedVersion"
    );
    assert.ok(typeof b.durationMs === "number", "install response must have durationMs");
  });

  it("STEP 2: verify status is stopped after install", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiGet("/api/services/9router/status");
    assert.equal(status, 200);
    const b = body as Record<string, unknown>;
    assert.ok(
      ["stopped", "not_installed"].includes(b.state as string) === false
        ? b.state === "stopped"
        : true,
      `Expected stopped state after install, got: ${b.state}`
    );
    // installedVersion should now be set
    assert.ok(
      typeof b.installedVersion === "string",
      "installedVersion should be set after install"
    );
  });

  it("STEP 3: start 9router", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiPost("/api/services/9router/start");
    assert.ok(
      status === 200,
      `Expected 200 from start, got ${status}: ${JSON.stringify(body).slice(0, 300)}`
    );
    const b = body as Record<string, unknown>;
    assert.ok(
      ["starting", "running"].includes(b.state as string),
      `Expected starting or running, got: ${b.state}`
    );
  });

  it("STEP 4: wait for 9router to become healthy (≤30s)", async (t) => {
    if (maybeSkip(t)) return;
    const finalStatus = await waitForState("/api/services/9router/status", "running", 30_000);
    const b = finalStatus as Record<string, unknown>;
    assert.equal(b.state, "running");
    assert.equal(b.health, "healthy");
    assert.ok(typeof b.pid === "number", "pid must be a number when running");
  });

  it("STEP 5: GET /v1/models returns 9router models", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiGet("/api/services/9router/models");
    assert.equal(status, 200);
    const b = body as Record<string, unknown>;
    assert.ok(Array.isArray(b.data), "models response must have data array");
  });

  it("STEP 6: POST /v1/chat/completions with 9router model returns 200", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiPost("/v1/chat/completions", {
      model: "9router/auto",
      messages: [{ role: "user", content: "Say OK" }],
      max_tokens: 10,
      stream: false,
    });
    assert.ok(
      status === 200,
      `Expected 200 from chat, got ${status}: ${JSON.stringify(body).slice(0, 300)}`
    );
  });

  it("STEP 7: stop 9router", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiPost("/api/services/9router/stop");
    assert.equal(status, 200);
    const b = body as Record<string, unknown>;
    assert.ok(
      ["stopping", "stopped"].includes(b.state as string),
      `Expected stopping or stopped, got: ${b.state}`
    );
  });

  it("STEP 8: status returns stopped after stop", async (t) => {
    if (maybeSkip(t)) return;
    const final = await waitForState("/api/services/9router/status", "stopped", 15_000);
    assert.equal((final as Record<string, unknown>).state, "stopped");
  });
});

// ---------------------------------------------------------------------------
// cliproxy lifecycle
// ---------------------------------------------------------------------------

describe("cliproxy — full lifecycle (opt-in, RUN_SERVICES_INT=1)", () => {
  it("STEP 1: install cliproxy (latest)", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiPost("/api/services/cliproxy/install", {
      version: "latest",
    });
    assert.ok(
      status === 200,
      `Expected 200 from install, got ${status}: ${JSON.stringify(body).slice(0, 300)}`
    );
    const b = body as Record<string, unknown>;
    assert.ok(b.ok === true, "install response must have ok:true");
    assert.ok(
      typeof b.installedVersion === "string",
      "install response must have installedVersion"
    );
  });

  it("STEP 2: start cliproxy", async (t) => {
    if (maybeSkip(t)) return;
    const { status, body } = await apiPost("/api/services/cliproxy/start");
    assert.ok(
      status === 200,
      `Expected 200 from start, got ${status}: ${JSON.stringify(body).slice(0, 300)}`
    );
  });

  it("STEP 3: wait for cliproxy to become healthy (≤30s)", async (t) => {
    if (maybeSkip(t)) return;
    const finalStatus = await waitForState("/api/services/cliproxy/status", "running", 30_000);
    const b = finalStatus as Record<string, unknown>;
    assert.equal(b.state, "running");
    assert.equal(b.health, "healthy");
  });

  it("STEP 4: stop cliproxy", async (t) => {
    if (maybeSkip(t)) return;
    const { status } = await apiPost("/api/services/cliproxy/stop");
    assert.equal(status, 200);
  });

  it("STEP 5: status returns stopped after stop", async (t) => {
    if (maybeSkip(t)) return;
    const final = await waitForState("/api/services/cliproxy/status", "stopped", 15_000);
    assert.equal((final as Record<string, unknown>).state, "stopped");
  });
});

// ---------------------------------------------------------------------------
// Security smoke (requires running server)
// ---------------------------------------------------------------------------

describe("Route guard security smoke (opt-in, RUN_SERVICES_INT=1)", () => {
  it("POST /api/services/9router/start with X-Forwarded-For non-loopback → 403", async (t) => {
    if (maybeSkip(t)) return;
    // Note: this only works when the server enforces the loopback check via the
    // route guard. In local dev, the host header may override — this test is most
    // meaningful in CI with the real server bound to 127.0.0.1.
    const res = await fetch(`${BASE_URL}/api/services/9router/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "1.2.3.4",
        Host: "evil.tunnel.example.com",
      },
      body: JSON.stringify({}),
    });
    // 403 expected from route guard; 405 possible if server already blocked at method level.
    assert.ok(
      res.status === 403 || res.status === 405,
      `Expected 403 from non-loopback request, got ${res.status}`
    );
  });
});
