/**
 * #9717 — the MCP server's internal fetch budget.
 *
 * `omniRouteFetch` applied one hardcoded 10s `AbortSignal.timeout` to every
 * internal hop, including `omniroute_route_request`'s call to
 * `/v1/chat/completions`. That hop waits on an upstream provider (and on
 * auto-combo candidate probing before a provider is even chosen), so any route
 * slower than 10s aborted from the MCP side while the same request succeeded
 * through the REST API. `web_search`/`web_fetch` in the same file already used
 * an explicit 60s signal, which is the value adopted here.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  resolveMcpFetchTimeoutMs,
  MCP_FETCH_TIMEOUT_MS,
  MCP_UPSTREAM_FETCH_TIMEOUT_MS,
  MCP_FETCH_TIMEOUT_ENV,
  MCP_UPSTREAM_FETCH_TIMEOUT_ENV,
} = await import("../../open-sse/mcp-server/fetchTimeout.ts");
const { createMcpServer, omniRouteFetch } = await import("../../open-sse/mcp-server/server.ts");

type RegisteredTool = {
  handler: (
    args: unknown,
    extra?: unknown
  ) => Promise<{ content?: Array<{ type: string; text: string }>; isError?: boolean }>;
};

function getRegisteredHandler(server: unknown, toolName: string) {
  const registry = (server as { _registeredTools?: Record<string, RegisteredTool> })
    ._registeredTools;
  assert.ok(registry, "McpServer should expose _registeredTools");
  const tool = registry[toolName];
  assert.ok(tool, `${toolName} must be registered on the live MCP server`);
  return tool.handler;
}

const CHAT_COMPLETION_BODY = {
  choices: [{ message: { content: "ok" } }],
  model: "test-model",
  usage: { prompt_tokens: 1, completion_tokens: 1 },
  provider: "test-provider",
};

/**
 * Stand-in for `fetch` that answers after `delayMs` but honours an abort signal
 * the same way the real implementation does — a stub that ignored the signal
 * would make every timeout assertion below pass vacuously.
 */
function stubFetch(delayMs: number, seen: { signals: AbortSignal[] }) {
  const original = globalThis.fetch;
  globalThis.fetch = ((_url: unknown, init?: { signal?: AbortSignal }) => {
    const signal = init?.signal;
    if (signal) seen.signals.push(signal);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () =>
          resolve({
            ok: true,
            status: 200,
            json: async () => CHAT_COMPLETION_BODY,
            text: async () => JSON.stringify(CHAT_COMPLETION_BODY),
          }),
        delayMs
      );
      const abort = () => {
        clearTimeout(timer);
        reject(signal?.reason ?? new Error("aborted"));
      };
      if (signal?.aborted) return abort();
      signal?.addEventListener("abort", abort, { once: true });
    });
  }) as typeof globalThis.fetch;
  return () => {
    globalThis.fetch = original;
  };
}

function withEnv(vars: Record<string, string | undefined>) {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(vars)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return () => {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

async function callRouteRequest() {
  const handler = getRegisteredHandler(createMcpServer(), "omniroute_route_request");
  return handler(
    { model: "test-model", messages: [{ role: "user", content: "hi" }] },
    { authInfo: { clientId: "test-9717", scopes: ["execute:completions"] } }
  );
}

// ── Policy ────────────────────────────────────────────────────────────────

test("#9717: the upstream budget is larger than the management budget", () => {
  assert.equal(resolveMcpFetchTimeoutMs("management"), MCP_FETCH_TIMEOUT_MS);
  assert.equal(resolveMcpFetchTimeoutMs("upstream"), MCP_UPSTREAM_FETCH_TIMEOUT_MS);
  assert.equal(MCP_FETCH_TIMEOUT_MS, 10_000);
  assert.equal(
    MCP_UPSTREAM_FETCH_TIMEOUT_MS,
    60_000,
    "matches the signal web_search/web_fetch already used"
  );
  assert.ok(MCP_UPSTREAM_FETCH_TIMEOUT_MS > MCP_FETCH_TIMEOUT_MS);
});

test("#9717: each budget reads its own env override", () => {
  const env = {
    [MCP_FETCH_TIMEOUT_ENV]: "1234",
    [MCP_UPSTREAM_FETCH_TIMEOUT_ENV]: "222222",
  };
  assert.equal(resolveMcpFetchTimeoutMs("management", env), 1234);
  assert.equal(resolveMcpFetchTimeoutMs("upstream", env), 222222);
});

test("#9717: a malformed override falls back to the default instead of disabling the timeout", () => {
  for (const bad of ["", "   ", "0", "-1", "abc", "60000.5", "NaN", "Infinity"]) {
    assert.equal(
      resolveMcpFetchTimeoutMs("upstream", { [MCP_UPSTREAM_FETCH_TIMEOUT_ENV]: bad }),
      MCP_UPSTREAM_FETCH_TIMEOUT_MS,
      `"${bad}" must not become the effective timeout`
    );
  }
});

// ── Wiring ────────────────────────────────────────────────────────────────

test("#9717: route_request is bound to the upstream budget, not the management default", async () => {
  const seen = { signals: [] as AbortSignal[] };
  const restoreEnv = withEnv({ [MCP_UPSTREAM_FETCH_TIMEOUT_ENV]: "40" });
  const restoreFetch = stubFetch(400, seen);
  try {
    const result = await callRouteRequest();
    assert.equal(
      result.isError,
      true,
      "with the upstream budget set to 40ms a 400ms upstream must abort — before #9717 this " +
        "call ignored that setting and used the hardcoded 10s default, so it returned a result"
    );
    assert.ok(seen.signals.length > 0, "the routing hop must carry an abort signal");
  } finally {
    restoreFetch();
    restoreEnv();
  }
});

test("#9717: route_request outlives the management budget", async () => {
  const seen = { signals: [] as AbortSignal[] };
  const restoreEnv = withEnv({
    [MCP_FETCH_TIMEOUT_ENV]: "40",
    [MCP_UPSTREAM_FETCH_TIMEOUT_ENV]: undefined,
  });
  const restoreFetch = stubFetch(400, seen);
  try {
    const result = await callRouteRequest();
    assert.notEqual(
      result.isError,
      true,
      "a 400ms upstream must survive: the routing hop must not inherit the 40ms management budget"
    );
  } finally {
    restoreFetch();
    restoreEnv();
  }
});

test("#9717: management reads honour their own override", async () => {
  const seen = { signals: [] as AbortSignal[] };
  const restoreEnv = withEnv({ [MCP_FETCH_TIMEOUT_ENV]: "40" });
  const restoreFetch = stubFetch(400, seen);
  try {
    await assert.rejects(
      () => omniRouteFetch("/api/monitoring/health"),
      "a management read must abort at its configured budget"
    );
  } finally {
    restoreFetch();
    restoreEnv();
  }
});
