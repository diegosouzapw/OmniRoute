import test from "node:test";
import assert from "node:assert/strict";

import { GeminiCLIExecutor } from "../../open-sse/executors/gemini-cli.ts";
import { GEMINI_CLI_VERSION } from "../../open-sse/services/antigravityHeaders.ts";

test("GeminiCLIExecutor.buildUrl and buildHeaders match the native Gemini CLI fingerprint", () => {
  const executor = new GeminiCLIExecutor();

  assert.equal(
    executor.buildUrl("models/gemini-2.5-flash", true),
    "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse"
  );
  assert.equal(
    executor.buildUrl("models/gemini-2.5-flash", false),
    "https://cloudcode-pa.googleapis.com/v1internal:generateContent"
  );

  const headers = executor.buildHeaders({ accessToken: "gcli-token" }, true);
  assert.equal(headers.Authorization, "Bearer gcli-token");
  assert.equal(headers.Accept, "text/event-stream");
  assert.match(
    headers["User-Agent"],
    new RegExp(
      `^GeminiCLI/${GEMINI_CLI_VERSION.replaceAll(".", "\\.")}/gemini-2\\.5-flash \\((linux|macos|windows); (x64|arm64|x86)\\)$`
    )
  );
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

test("GeminiCLIExecutor.transformRequest preserves thinking config for supported Gemini models", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ cloudaicompanionProject: "fresh-project-id" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const transformed = await executor.transformRequest(
      "models/gemini-3.1-pro-preview",
      {
        request: {
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
          generationConfig: {
            thinkingConfig: {
              thinkingBudget: 8192,
              includeThoughts: true,
            },
          },
        },
      },
      true,
      { accessToken: "access-token-1" }
    );

    assert.equal(transformed.project, "fresh-project-id");
    assert.equal(transformed.request.generationConfig.thinkingConfig.thinkingBudget, 8192);
    assert.equal(transformed.request.generationConfig.thinkingConfig.includeThoughts, true);
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

test("GeminiCLIExecutor.refreshProject onboards a managed project when loadCodeAssist has no project", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    const body = init.body ? JSON.parse(String(init.body)) : null;
    calls.push({ url: String(url), body });

    if (String(url).endsWith("loadCodeAssist")) {
      return new Response(
        JSON.stringify({
          allowedTiers: [{ id: "free-tier", isDefault: true }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (String(url).endsWith("onboardUser")) {
      return new Response(
        JSON.stringify({
          done: true,
          response: {
            cloudaicompanionProject: {
              id: "managed-project-id",
            },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${url}`);
  };

  try {
    assert.equal(await executor.refreshProject("access-token-3"), "managed-project-id");
    assert.deepEqual(
      calls.map((call) => call.url.split(":").at(-1)),
      ["loadCodeAssist", "onboardUser"]
    );
    assert.equal(calls[0].body.cloudaicompanionProject, "default-project");
    assert.equal(calls[0].body.metadata.ideType, "ANTIGRAVITY");
    assert.equal(calls[0].body.metadata.duetProject, "default-project");
    assert.equal(calls[1].body.tierId, "free-tier");
    assert.equal(calls[1].body.metadata.ideType, "ANTIGRAVITY");
    assert.equal(calls[1].body.metadata.duetProject, "default-project");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GeminiCLIExecutor.onboardManagedProject retries until completion", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  let attempts = 0;

  globalThis.fetch = async (url) => {
    attempts += 1;
    assert.match(String(url), /onboardUser$/);
    return new Response(
      JSON.stringify(
        attempts === 1
          ? { done: false }
          : {
              done: true,
              response: { cloudaicompanionProject: { id: "managed-project-retry" } },
            }
      ),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    assert.equal(
      await executor.onboardManagedProject("access-token-4", "free-tier", {
        attempts: 2,
        delayMs: 0,
      }),
      "managed-project-retry"
    );
    assert.equal(attempts, 2);
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
