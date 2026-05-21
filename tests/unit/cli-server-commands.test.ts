import test from "node:test";
import assert from "node:assert/strict";

const ORIGINAL_FETCH = globalThis.fetch;

function makeResponse(data: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ "content-type": "application/json" }),
    json: async () => data,
    text: async () => JSON.stringify(data),
  } as unknown as Response;
}

async function withServerFetch(mockFetch: typeof fetch, fn: () => Promise<void>) {
  globalThis.fetch = mockFetch;
  try {
    await fn();
  } finally {
    globalThis.fetch = ORIGINAL_FETCH;
  }
}

// ── health ────────────────────────────────────────────────────────────────────

test("health returns 1 when server is offline", async () => {
  await withServerFetch(
    (async () => {
      throw new Error("offline");
    }) as typeof fetch,
    async () => {
      const { runHealthCommand } = await import("../../bin/cli/commands/health.mjs");
      const originalError = console.error;
      console.error = () => {};
      const result = await runHealthCommand({});
      console.error = originalError;
      assert.equal(result, 1);
    }
  );
});

test("health --json returns 0 when server responds", async () => {
  const mockData = { status: "ok", uptime: "1h", version: "3.8.0" };
  const mockFetch = (async (url: string) => {
    return makeResponse(String(url).includes("health") ? mockData : { status: "ok" });
  }) as typeof fetch;

  await withServerFetch(mockFetch, async () => {
    const { runHealthCommand } = await import("../../bin/cli/commands/health.mjs");
    const lines: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => lines.push(msg);
    const result = await runHealthCommand({ json: true });
    console.log = originalLog;
    assert.equal(result, 0);
    const parsed = JSON.parse(lines.join("\n"));
    assert.equal(parsed.status, "ok");
  });
});

// ── quota ─────────────────────────────────────────────────────────────────────

test("quota returns 1 when server is offline", async () => {
  await withServerFetch(
    (async () => {
      throw new Error("offline");
    }) as typeof fetch,
    async () => {
      const { runQuotaCommand } = await import("../../bin/cli/commands/quota.mjs");
      const originalError = console.error;
      console.error = () => {};
      const result = await runQuotaCommand({});
      console.error = originalError;
      assert.equal(result, 1);
    }
  );
});

// ── mcp ───────────────────────────────────────────────────────────────────────

test("mcp status --json returns 0 when server responds", async () => {
  const mcpStatus = { running: true, toolsCount: 37, transport: "stdio" };
  const mockFetch = (async (url: string) => makeResponse(mcpStatus)) as typeof fetch;

  await withServerFetch(mockFetch, async () => {
    const { runMcpStatusCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const lines: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => lines.push(msg);
    const result = await runMcpStatusCommand({ json: true });
    console.log = originalLog;
    assert.equal(result, 0);
    const parsed = JSON.parse(lines.join("\n"));
    assert.equal(parsed.running, true);
  });
});

// ── completion ────────────────────────────────────────────────────────────────

test("completion bash outputs bash script", async () => {
  const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (msg: string) => lines.push(msg);
  const result = await runCompletionCommand("bash");
  console.log = originalLog;
  assert.equal(result, 0);
  assert.ok(lines.join("").includes("_omniroute"));
});

test("completion zsh outputs zsh script", async () => {
  const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (msg: string) => lines.push(msg);
  const result = await runCompletionCommand("zsh");
  console.log = originalLog;
  assert.equal(result, 0);
  assert.ok(lines.join("").includes("#compdef omniroute"));
});

test("completion fish outputs fish script", async () => {
  const { runCompletionCommand } = await import("../../bin/cli/commands/completion.mjs");
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (msg: string) => lines.push(msg);
  const result = await runCompletionCommand("fish");
  console.log = originalLog;
  assert.equal(result, 0);
  assert.ok(lines.join("").includes("complete -c omniroute"));
});

// ── env ───────────────────────────────────────────────────────────────────────

test("env show returns 0", async () => {
  const { runEnvShowCommand } = await import("../../bin/cli/commands/env.mjs");
  const originalLog = console.log;
  console.log = () => {};
  const result = await runEnvShowCommand({});
  console.log = originalLog;
  assert.equal(result, 0);
});

test("env get returns 0 and prints env value", async () => {
  process.env.__OMNIROUTE_TEST_KEY__ = "hello";
  const { runEnvGetCommand } = await import("../../bin/cli/commands/env.mjs");
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (msg: string) => lines.push(msg);
  const result = await runEnvGetCommand("__OMNIROUTE_TEST_KEY__");
  console.log = originalLog;
  delete process.env.__OMNIROUTE_TEST_KEY__;
  assert.equal(result, 0);
  assert.ok(lines.join("").includes("hello"));
});
