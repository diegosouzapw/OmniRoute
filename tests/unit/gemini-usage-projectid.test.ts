/**
 * Ported from decolua/9router#1428 by @Delcado19 — reuses stored Gemini CLI
 * project IDs for quota checks and normalizes {id: ...} object shapes that
 * loadCodeAssist returns.
 */
import test from "node:test";
import assert from "node:assert/strict";

const usage = await import("../../open-sse/services/usage.ts");

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("getUsageForProvider(gemini-cli) reuses the projectId stored on the connection", async () => {
  const originalFetch = globalThis.fetch;
  const calls: { url: string; init?: RequestInit }[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    calls.push({ url, init });
    return jsonResponse({
      buckets: [
        {
          modelId: "gemini-3-flash-preview",
          remainingFraction: 0.75,
          resetTime: "2026-05-25T12:00:00Z",
        },
      ],
    });
  }) as typeof fetch;

  try {
    const result = (await usage.getUsageForProvider({
      id: "gemini-cli-stored",
      provider: "gemini-cli",
      accessToken: "token",
      projectId: "cloud-code-project",
    })) as { quotas?: Record<string, { remainingPercentage?: number }> };

    // Only the retrieveUserQuota call — no loadCodeAssist round-trip,
    // because the stored projectId short-circuits it.
    assert.equal(calls.length, 1, "must skip loadCodeAssist when projectId is stored");
    assert.equal(
      calls[0].url,
      "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota"
    );
    assert.equal(
      JSON.parse(String(calls[0].init?.body)).project,
      "cloud-code-project",
      "must pass the stored projectId into retrieveUserQuota"
    );
    assert.equal(result.quotas?.["gemini-3-flash-preview"]?.remainingPercentage, 75);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider(gemini-cli) normalizes project objects returned by loadCodeAssist", async () => {
  const originalFetch = globalThis.fetch;
  const calls: { url: string; init?: RequestInit }[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    calls.push({ url, init });
    if (url.endsWith("loadCodeAssist")) {
      return jsonResponse({
        cloudaicompanionProject: { id: "project-from-load" },
        currentTier: { name: "Free" },
      });
    }
    return jsonResponse({ buckets: [] });
  }) as typeof fetch;

  try {
    await usage.getUsageForProvider({
      id: "gemini-cli-obj-shape",
      provider: "gemini-cli",
      accessToken: "token-obj-shape",
    });

    const quotaCall = calls.find((c) => c.url.endsWith("retrieveUserQuota"));
    assert.ok(quotaCall, "quota lookup must occur after loadCodeAssist resolves");
    assert.equal(
      JSON.parse(String(quotaCall!.init?.body)).project,
      "project-from-load",
      "must unwrap {id: ...} into the bare project id"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider(gemini-cli) trims whitespace-padded stored project ids", async () => {
  const originalFetch = globalThis.fetch;
  const calls: { url: string; init?: RequestInit }[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    calls.push({ url, init });
    return jsonResponse({ buckets: [] });
  }) as typeof fetch;

  try {
    await usage.getUsageForProvider({
      id: "gemini-cli-padded",
      provider: "gemini-cli",
      accessToken: "token-padded",
      projectId: "  padded-project  ",
    });

    const quotaCall = calls.find((c) => c.url.endsWith("retrieveUserQuota"));
    assert.ok(quotaCall, "quota lookup must run with the trimmed project id");
    assert.equal(JSON.parse(String(quotaCall!.init?.body)).project, "padded-project");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider(gemini-cli) returns actionable guidance when no project id is available", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => jsonResponse({})) as typeof fetch;

  try {
    const result = (await usage.getUsageForProvider({
      id: "gemini-cli-no-project",
      provider: "gemini-cli",
      accessToken: "token-no-project",
    })) as { message?: string };

    assert.ok(result.message, "must surface a message when no projectId is resolvable");
    assert.match(
      result.message!,
      /Reconnect Gemini CLI/i,
      "error must guide the operator to reconnect"
    );
    assert.match(
      result.message!,
      /Gemini Code Assist/i,
      "error must mention the Code Assist project requirement"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
