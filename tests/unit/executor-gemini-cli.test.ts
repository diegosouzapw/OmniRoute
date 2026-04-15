import test from "node:test";
import assert from "node:assert/strict";

import { GeminiCLIExecutor } from "../../open-sse/executors/gemini-cli.ts";

test("GeminiCLIExecutor.buildUrl and buildHeaders match the native Gemini CLI fingerprint", () => {
  const executor = new GeminiCLIExecutor();

  assert.equal(
    executor.buildUrl("gemini-2.5-flash", true),
    "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse"
  );
  assert.equal(
    executor.buildUrl("gemini-2.5-flash", false),
    "https://cloudcode-pa.googleapis.com/v1internal:generateContent"
  );

  const headers = executor.buildHeaders({ accessToken: "gcli-token" }, true);
  assert.equal(headers.Authorization, "Bearer gcli-token");
  assert.equal(headers.Accept, "text/event-stream");
  assert.match(headers["User-Agent"], /GeminiCLI/);
  assert.match(headers["X-Goog-Api-Client"], /google-genai-sdk/);
});

test("GeminiCLIExecutor.refreshProject caches loadCodeAssist lookups and transformRequest updates body.project", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  let calls = 0;

  globalThis.fetch = async (url) => {
    calls += 1;
    assert.match(String(url), /loadCodeAssist$/);
    return new Response(JSON.stringify({ cloudaicompanionProject: "fresh-project-id" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const first = await executor.refreshProject("access-token-1");
    const second = await executor.refreshProject("access-token-1");
    const body = { project: "stale-project", request: { contents: [] } };
    const transformed = await executor.transformRequest("gemini-2.5-flash", body, true, {
      accessToken: "access-token-1",
    });

    assert.equal(first, "fresh-project-id");
    assert.equal(second, "fresh-project-id");
    assert.equal(calls, 1);
    assert.equal(transformed.project, "fresh-project-id");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GeminiCLIExecutor.refreshProject returns null on failed loadCodeAssist responses", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("forbidden", { status: 403 });

  try {
    assert.equal(await executor.refreshProject("access-token-2"), null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GeminiCLIExecutor.refreshCredentials exchanges refresh tokens via Google OAuth", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /oauth2\.googleapis\.com\/token$/);
    return new Response(
      JSON.stringify({
        access_token: "new-access-token",
        refresh_token: "new-refresh-token",
        expires_in: 3600,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const result = await executor.refreshCredentials(
      { refreshToken: "refresh", projectId: "project-1" },
      null
    );
    assert.deepEqual(result, {
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
      expiresIn: 3600,
      projectId: "project-1",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
