import test from "node:test";
import assert from "node:assert/strict";

import { GeminiCLIExecutor } from "../../open-sse/executors/gemini-cli.ts";
import { setCliCompatProviders } from "../../open-sse/config/cliFingerprints.ts";
import { GEMINI_CLI_VERSION } from "../../open-sse/services/geminiCliHeaders.ts";

type CapturedFetchCall = {
  url: string;
  body: Record<string, unknown>;
};

function parseInitBody(init: RequestInit): Record<string, unknown> {
  return init.body ? JSON.parse(String(init.body)) : {};
}

function getMetadata(body: Record<string, unknown>): Record<string, unknown> {
  return body.metadata && typeof body.metadata === "object"
    ? (body.metadata as Record<string, unknown>)
    : {};
}

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

  const headers = executor.buildHeaders(
    { accessToken: "gcli-token" },
    true,
    undefined,
    "models/gemini-2.5-flash"
  );
  assert.equal(headers.Authorization, "Bearer gcli-token");
  assert.equal(headers.Accept, "*/*");
  assert.match(
    headers["User-Agent"],
    new RegExp(
      `^GeminiCLI/${GEMINI_CLI_VERSION.replaceAll(".", "\\.")}/gemini-2\\.5-flash \\((linux|macos|windows); (x64|arm64|x86); terminal\\) google-api-nodejs-client/9\\.15\\.1$`
    )
  );
  assert.equal(headers["X-Goog-Api-Client"], `gl-node/${process.versions.node}`);
});

test("GeminiCLIExecutor.buildHeaders uses JSON accept for non-streaming requests", () => {
  const executor = new GeminiCLIExecutor();
  const headers = executor.buildHeaders(
    { accessToken: "gcli-token" },
    false,
    undefined,
    "models/gemini-2.5-flash"
  );

  assert.equal(headers.Accept, "application/json");
});

test("GeminiCLIExecutor.buildHeaders derives the User-Agent from the request model", () => {
  const executor = new GeminiCLIExecutor();

  const flashHeaders = executor.buildHeaders(
    { accessToken: "gcli-token" },
    true,
    undefined,
    "models/gemini-3-flash-preview"
  );
  const proHeaders = executor.buildHeaders(
    { accessToken: "gcli-token" },
    true,
    undefined,
    "models/gemini-3.1-pro-preview"
  );

  assert.match(flashHeaders["User-Agent"], /\/gemini-3-flash-preview /);
  assert.match(proHeaders["User-Agent"], /\/gemini-3\.1-pro-preview /);
  assert.notEqual(flashHeaders["User-Agent"], proHeaders["User-Agent"]);
});

test("GeminiCLIExecutor.refreshProject caches loadCodeAssist lookups and transformRequest refreshes stale body.project", async () => {
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

test("GeminiCLIExecutor.transformRequest does not mutate the caller request body", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  const body = {
    project: "stale-project",
    request: {
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      generationConfig: { temperature: 0.2 },
    },
  };

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ cloudaicompanionProject: "fresh-project-id" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const transformed = await executor.transformRequest("gemini-2.5-flash", body, true, {
      accessToken: "access-token-clone",
    });

    assert.notEqual(transformed.request, body.request);
    assert.deepEqual(body, {
      project: "stale-project",
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
        generationConfig: { temperature: 0.2 },
      },
    });

    transformed.request.contents[0].parts[0].text = "changed";
    assert.equal(body.request.contents[0].parts[0].text, "Hello");
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
  const calls: CapturedFetchCall[] = [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const body = parseInitBody(init);
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
    assert.equal(calls[0].body.cloudaicompanionProject, undefined);
    assert.equal(getMetadata(calls[0].body).ideType, "IDE_UNSPECIFIED");
    assert.equal(getMetadata(calls[0].body).duetProject, undefined);
    assert.equal(calls[1].body.tierId, "free-tier");
    assert.equal(getMetadata(calls[1].body).ideType, "IDE_UNSPECIFIED");
    assert.equal(getMetadata(calls[1].body).duetProject, undefined);
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

test("GeminiCLIExecutor.execute applies CLI fingerprint to the final Cloud Code request", async () => {
  const executor = new GeminiCLIExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; headers: Record<string, string>; body: string }> = [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const requestUrl = String(url);
    calls.push({
      url: requestUrl,
      headers: init.headers as Record<string, string>,
      body: init.body ? String(init.body) : "",
    });

    if (requestUrl.endsWith("loadCodeAssist")) {
      return new Response(JSON.stringify({ cloudaicompanionProject: "project-live" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response('data: {"candidates":[{"content":{"parts":[{"text":"ok"}]}}]}\n\n', {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  try {
    setCliCompatProviders(["gemini-cli"]);
    await executor.execute({
      model: "gemini-3.1-pro-preview",
      body: { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } },
      stream: true,
      credentials: { accessToken: "token", projectId: "old-project" } as any,
      signal: undefined,
      log: undefined,
    });

    const finalCall = calls.find((call) => call.url.includes("streamGenerateContent"));
    assert.ok(finalCall);

    const finalBody = JSON.parse(finalCall.body);
    assert.deepEqual(Object.keys(finalBody), ["model", "project", "user_prompt_id", "request"]);
    assert.deepEqual(Object.keys(finalCall.headers), [
      "Content-Type",
      "User-Agent",
      "X-Goog-Api-Client",
      "Accept",
      "Accept-Encoding",
      "Authorization",
    ]);
    assert.equal(finalBody.model, "gemini-3.1-pro-preview");
    assert.equal(finalBody.project, "project-live");
    assert.match(finalBody.user_prompt_id, /^agent-/);
    assert.match(finalBody.request.session_id, /^-\d+$/);
    assert.match(finalCall.headers["User-Agent"], /^GeminiCLI\/0\.41\.2\/gemini-3\.1-pro-preview /);
    assert.equal(finalCall.headers.Accept, "*/*");
  } finally {
    setCliCompatProviders([]);
    globalThis.fetch = originalFetch;
  }
});
