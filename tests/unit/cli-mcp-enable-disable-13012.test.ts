// Regression for GitHub issue #13012 (Bug 2): there was no CLI/env path to
// flip the mcpEnabled setting on — it was dashboard-only. Pins the new
// `omniroute mcp enable`/`mcp disable` PATCH /api/settings body shape.
import test from "node:test";
import assert from "node:assert/strict";

const ORIGINAL_FETCH = globalThis.fetch;

function makeResp(data: unknown, status = 200) {
  return {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers({ "content-type": "application/json" }),
  };
}

type Call = { url: string; method: string; body: unknown };

function mockFetch(calls: Call[]) {
  globalThis.fetch = (async (url: string, opts: Record<string, unknown> = {}) => {
    const u = String(url);
    const method = String(opts.method || "GET").toUpperCase();
    const body = opts.body ? JSON.parse(String(opts.body)) : null;
    calls.push({ url: u, method, body });
    if (u.includes("/api/health")) return makeResp({ status: "ok" }) as unknown as Response;
    if (u.includes("/api/settings")) return makeResp({ ok: true }) as unknown as Response;
    return makeResp({ error: "unexpected call" }, 404) as unknown as Response;
  }) as typeof fetch;
}

async function withMockedFetch(fn: (calls: Call[]) => Promise<void>) {
  const calls: Call[] = [];
  mockFetch(calls);
  const originalLog = console.log;
  const originalError = console.error;
  console.log = () => {};
  console.error = () => {};
  try {
    await fn(calls);
  } finally {
    console.log = originalLog;
    console.error = originalError;
    globalThis.fetch = ORIGINAL_FETCH;
  }
}

test("mcp enable PATCHes /api/settings with mcpEnabled: true", async () => {
  await withMockedFetch(async (calls) => {
    const { runMcpEnableCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const result = await runMcpEnableCommand({});
    assert.equal(result, 0);

    const patchCall = calls.find((c) => c.url.includes("/api/settings") && c.method === "PATCH");
    assert.ok(patchCall, "expected a PATCH /api/settings call");
    assert.deepEqual(patchCall!.body, { mcpEnabled: true });
  });
});

test("mcp enable --transport sse also sets mcpTransport in the same PATCH", async () => {
  await withMockedFetch(async (calls) => {
    const { runMcpEnableCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const result = await runMcpEnableCommand({ transport: "sse" });
    assert.equal(result, 0);

    const patchCall = calls.find((c) => c.url.includes("/api/settings") && c.method === "PATCH");
    assert.ok(patchCall);
    assert.deepEqual(patchCall!.body, { mcpEnabled: true, mcpTransport: "sse" });
  });
});

test("mcp enable rejects an invalid --transport value without calling the API", async () => {
  await withMockedFetch(async (calls) => {
    const { runMcpEnableCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const result = await runMcpEnableCommand({ transport: "bogus" });
    assert.equal(result, 1);
    assert.ok(
      !calls.some((c) => c.url.includes("/api/settings")),
      "invalid transport must not reach the settings API"
    );
  });
});

test("mcp disable PATCHes /api/settings with mcpEnabled: false", async () => {
  await withMockedFetch(async (calls) => {
    const { runMcpDisableCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const result = await runMcpDisableCommand({});
    assert.equal(result, 0);

    const patchCall = calls.find((c) => c.url.includes("/api/settings") && c.method === "PATCH");
    assert.ok(patchCall, "expected a PATCH /api/settings call");
    assert.deepEqual(patchCall!.body, { mcpEnabled: false });
  });
});
