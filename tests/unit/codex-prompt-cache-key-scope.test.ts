import test from "node:test";
import assert from "node:assert/strict";
import type { z } from "zod";

import { getCodexPromptCacheKeyScope } from "../../open-sse/config/codexIdentity.ts";
import { validateProviderSpecificData } from "../../src/shared/validation/providerSpecificData.ts";

// Opt-in `codexPromptCacheKeyScope: "thread"`: under session-mode fingerprint convergence the
// outbound thread id is derived per (account, client session), but the client's own
// prompt_cache_key used to go out unchanged — so every request carried a prompt_cache_key that
// differs from its thread_id (a real Codex client sends them equal), and the same key followed a
// conversation across accounts on failover. The default ("client") must keep today's behavior.

const CLIENT_SESSION = "01a0df6b-bb00-73d3-ad8c-6138d4a9b838";

async function captureUpstream(
  providerSpecificData: Record<string, unknown>,
  options: { promptCacheKey?: string; connectionId?: string } = {}
) {
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let headers = new Headers();
  let body: Record<string, unknown> = {};
  globalThis.fetch = async (_url, init) => {
    headers = new Headers(init?.headers);
    body = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ id: "resp-scope", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        input: [{ role: "user", content: "hello" }],
        prompt_cache_key: options.promptCacheKey ?? CLIENT_SESSION,
        client_metadata: { session_id: CLIENT_SESSION, thread_id: CLIENT_SESSION },
        _nativeCodexPassthrough: true,
      },
      stream: true,
      clientHeaders: { "session-id": CLIENT_SESSION },
      credentials: {
        accessToken: "codex-token",
        connectionId: options.connectionId ?? "conn-scope-a",
        providerSpecificData: { workspaceId: "ws-scope", ...providerSpecificData },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  return { headers, body };
}

function collectIssues() {
  const issues: Array<{ path: (string | number)[]; message: string }> = [];
  const ctx = {
    addIssue: (issue: { path?: (string | number)[]; message: string }) => {
      issues.push({ path: issue.path ?? [], message: issue.message });
    },
  } as unknown as z.RefinementCtx;
  return { ctx, issues };
}

test("default scope keeps the client's prompt_cache_key unchanged", async () => {
  const { headers, body } = await captureUpstream({});
  assert.equal(body.prompt_cache_key, CLIENT_SESSION);
  // Session-mode convergence still rewrites the thread — only the cache key is left alone.
  assert.notEqual(headers.get("thread-id"), CLIENT_SESSION);
});

test("thread scope makes prompt_cache_key match the converged thread id", async () => {
  const { headers, body } = await captureUpstream({ codexPromptCacheKeyScope: "thread" });
  const metadata = body.client_metadata as Record<string, unknown>;
  assert.notEqual(body.prompt_cache_key, CLIENT_SESSION);
  assert.equal(body.prompt_cache_key, headers.get("thread-id"));
  assert.equal(body.prompt_cache_key, metadata.thread_id);
});

test("thread scope is stable within an account and differs across accounts", async () => {
  const first = await captureUpstream({ codexPromptCacheKeyScope: "thread" });
  const again = await captureUpstream({ codexPromptCacheKeyScope: "thread" });
  const other = await captureUpstream(
    { codexPromptCacheKeyScope: "thread" },
    { connectionId: "conn-scope-b" }
  );
  assert.equal(first.body.prompt_cache_key, again.body.prompt_cache_key);
  assert.notEqual(first.body.prompt_cache_key, other.body.prompt_cache_key);
});

test("thread scope leaves a prompt_cache_key that is not the client session untouched", async () => {
  const { body } = await captureUpstream(
    { codexPromptCacheKeyScope: "thread" },
    { promptCacheKey: "caller-chosen-cache-key" }
  );
  assert.equal(body.prompt_cache_key, "caller-chosen-cache-key");
});

test("thread scope is inert outside session-mode convergence", async () => {
  for (const codexFingerprintMode of ["off", "device", "full"]) {
    const { body } = await captureUpstream({
      codexFingerprintMode,
      codexPromptCacheKeyScope: "thread",
    });
    assert.equal(body.prompt_cache_key, CLIENT_SESSION, `mode ${codexFingerprintMode}`);
  }
});

test("thread scope also applies to the websocket transport", async () => {
  const { CodexExecutor, __setCodexWebSocketTransportForTesting } =
    await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  let sent: string | null = null;
  __setCodexWebSocketTransportForTesting(async () => ({
    send(data: string) {
      sent = data;
      queueMicrotask(() => {
        this.onmessage?.({
          data: JSON.stringify({ type: "response.completed", response: { status: "completed" } }),
        });
      });
    },
    close() {},
    onmessage: null,
    onerror: null,
    onclose: null,
  }));

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        prompt_cache_key: CLIENT_SESSION,
        input: [{ role: "user", content: "hello" }],
      },
      stream: true,
      clientHeaders: { "session-id": CLIENT_SESSION },
      credentials: {
        accessToken: "codex-token",
        connectionId: "conn-scope-ws",
        providerSpecificData: {
          workspaceId: "ws-scope",
          codexTransport: "websocket",
          codexPromptCacheKeyScope: "thread",
        },
      },
    });
    await result.response.text();
  } finally {
    __setCodexWebSocketTransportForTesting(undefined);
  }

  assert.ok(sent);
  const payload = JSON.parse(sent as string) as Record<string, unknown>;
  const metadata = (payload.client_metadata as Record<string, unknown>) || {};
  assert.notEqual(payload.prompt_cache_key, CLIENT_SESSION);
  assert.equal(payload.prompt_cache_key, metadata.thread_id);
});

test("getCodexPromptCacheKeyScope defaults to client", () => {
  assert.equal(getCodexPromptCacheKeyScope(undefined), "client");
  assert.equal(getCodexPromptCacheKeyScope({}), "client");
  assert.equal(getCodexPromptCacheKeyScope({ codexPromptCacheKeyScope: "bogus" }), "client");
  assert.equal(getCodexPromptCacheKeyScope({ codexPromptCacheKeyScope: " Thread " }), "thread");
});

test("dashboard helper reads the saved scope and defaults to client", async () => {
  const { getCodexPromptCacheKeyScope: readScope } =
    await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");
  assert.equal(readScope(undefined), "client");
  assert.equal(readScope({ codexPromptCacheKeyScope: "thread" }), "thread");
  assert.equal(readScope({ codexPromptCacheKeyScope: "other" }), "client");
});

test("clearing the scope (null) removes it from saved Codex provider data", async () => {
  const { normalizeProviderSpecificData } =
    await import("../../src/lib/providers/requestDefaults.ts");
  const saved = normalizeProviderSpecificData("codex", {
    workspaceId: "ws-scope",
    codexPromptCacheKeyScope: null,
  });
  assert.equal(saved && "codexPromptCacheKeyScope" in saved, false);
});

test("providerSpecificData validation accepts client/thread and rejects other scopes", () => {
  for (const value of ["client", "thread", null]) {
    const { ctx, issues } = collectIssues();
    validateProviderSpecificData({ codexPromptCacheKeyScope: value }, ctx);
    assert.deepEqual(issues, [], String(value));
  }
  const { ctx, issues } = collectIssues();
  validateProviderSpecificData({ codexPromptCacheKeyScope: "account" }, ctx);
  assert.equal(issues.length, 1);
  assert.deepEqual(issues[0].path, ["codexPromptCacheKeyScope"]);
});
