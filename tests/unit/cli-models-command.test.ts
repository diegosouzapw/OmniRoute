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

async function withModelsFetch(mockFetch: typeof fetch, fn: () => Promise<void>) {
  globalThis.fetch = mockFetch;
  try {
    await fn();
  } finally {
    globalThis.fetch = ORIGINAL_FETCH;
  }
}

test("models returns 1 when server is offline", async () => {
  await withModelsFetch(
    (async () => {
      throw new Error("connection refused");
    }) as typeof fetch,
    async () => {
      const { runModelsCommand } = await import("../../bin/cli/commands/models.mjs");
      const originalError = console.error;
      console.error = () => {};
      const result = await runModelsCommand(undefined, {});
      console.error = originalError;
      assert.equal(result, 1);
    }
  );
});

test("models --json returns 0 and prints JSON when server responds", async () => {
  const mockModels = [
    { id: "gpt-4o", provider: "openai", name: "GPT-4o" },
    { id: "claude-3-5-sonnet", provider: "anthropic", name: "Claude 3.5 Sonnet" },
  ];

  const mockFetch = (async (url: string) => {
    if (String(url).includes("/api/health")) {
      return makeResponse({ status: "ok" });
    }
    if (String(url).includes("/api/models")) {
      return makeResponse(mockModels);
    }
    throw new Error("unexpected URL: " + url);
  }) as typeof fetch;

  await withModelsFetch(mockFetch, async () => {
    const { runModelsCommand } = await import("../../bin/cli/commands/models.mjs");

    const lines: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => lines.push(msg);
    const result = await runModelsCommand(undefined, { json: true });
    console.log = originalLog;

    assert.equal(result, 0);
    const parsed = JSON.parse(lines.join("\n"));
    assert.ok(Array.isArray(parsed));
    assert.equal(parsed.length, 2);
  });
});

test("models filters by provider argument", async () => {
  const mockModels = [
    { id: "gpt-4o", provider: "openai" },
    { id: "claude-3-5-sonnet", provider: "anthropic" },
  ];

  const mockFetch = (async (url: string) => {
    if (String(url).includes("/api/health")) {
      return makeResponse({ status: "ok" });
    }
    return makeResponse(mockModels);
  }) as typeof fetch;

  await withModelsFetch(mockFetch, async () => {
    const { runModelsCommand } = await import("../../bin/cli/commands/models.mjs");

    const lines: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => lines.push(msg);
    const result = await runModelsCommand("openai", { json: true });
    console.log = originalLog;

    assert.equal(result, 0);
    const parsed = JSON.parse(lines.join("\n"));
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].provider, "openai");
  });
});
