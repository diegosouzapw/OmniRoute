import assert from "node:assert/strict";
import test from "node:test";

const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_BASE_URL = process.env.OMNIROUTE_BASE_URL;

async function withFetchMock(
  handler: (url: URL, init?: RequestInit) => Response | Promise<Response>,
  run: () => Promise<void>,
) {
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20128";
  globalThis.fetch = ((input: string | URL | Request, init?: RequestInit) =>
    handler(new URL(String(input)), init)) as typeof fetch;

  try {
    await run();
  } finally {
    globalThis.fetch = ORIGINAL_FETCH;
    if (ORIGINAL_BASE_URL === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = ORIGINAL_BASE_URL;
  }
}

test("keys regenerate falls back from registered keys to ordinary API keys", async () => {
  const calls: Array<{ method: string; pathname: string }> = [];
  const logs: string[] = [];
  const originalLog = console.log;

  await withFetchMock(async (url, init) => {
    calls.push({ method: init?.method ?? "GET", pathname: url.pathname });
    if (url.pathname === "/api/health") return Response.json({ status: "ok" });
    if (url.pathname.includes("/api/v1/registered-keys/")) {
      return Response.json({ error: "Key not found" }, { status: 404 });
    }
    return Response.json({ key: "sk-test-regenerated-key" });
  }, async () => {
    console.log = (message?: unknown) => logs.push(String(message));
    const { runKeysRegenerateCommand } = await import("../../bin/cli/commands/keys.mjs");
    assert.equal(await runKeysRegenerateCommand("ordinary-key-id", { yes: true }), 0);
  });

  console.log = originalLog;
  assert.deepEqual(calls.map((call) => call.pathname), [
    "/api/health",
    "/api/v1/registered-keys/ordinary-key-id/regenerate",
    "/api/keys/ordinary-key-id/regenerate",
  ]);
  assert.match(logs.join("\n"), /sk-test-regenerated-key/);
});

test("keys reveal falls back from registered keys to ordinary API keys", async () => {
  const paths: string[] = [];
  const logs: string[] = [];
  const originalLog = console.log;
  const originalWrite = process.stderr.write;

  await withFetchMock(async (url) => {
    paths.push(url.pathname);
    if (url.pathname === "/api/health") return Response.json({ status: "ok" });
    if (url.pathname.includes("/api/v1/registered-keys/")) {
      return Response.json({ error: "Key not found" }, { status: 404 });
    }
    return Response.json({ key: "sk-test-revealed-key" });
  }, async () => {
    console.log = (message?: unknown) => logs.push(String(message));
    process.stderr.write = (() => true) as typeof process.stderr.write;
    const { runKeysRevealCommand } = await import("../../bin/cli/commands/keys.mjs");
    assert.equal(await runKeysRevealCommand("ordinary-key-id"), 0);
  });

  console.log = originalLog;
  process.stderr.write = originalWrite;
  assert.deepEqual(paths, [
    "/api/health",
    "/api/v1/registered-keys/ordinary-key-id/reveal",
    "/api/keys/ordinary-key-id/reveal",
  ]);
  assert.deepEqual(logs, ["sk-test-revealed-key"]);
});
