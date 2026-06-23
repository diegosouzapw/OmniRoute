import test from "node:test";
import assert from "node:assert/strict";

const usage = await import("../../open-sse/services/usage.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

test("USAGE_SUPPORTED_PROVIDERS includes ollama-cloud", () => {
  assert.ok(
    (USAGE_SUPPORTED_PROVIDERS as string[]).includes("ollama-cloud"),
    "ollama-cloud must be in the usage-supported providers allowlist"
  );
});

test("getUsageForProvider returns helpful message when Ollama Cloud has no usage cookie", async () => {
  const originalCookie = process.env.OLLAMA_USAGE_COOKIE;
  const originalOmniCookie = process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;
  delete process.env.OLLAMA_USAGE_COOKIE;
  delete process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;

  let called = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    called = true;
    return new Response("unexpected", { status: 500 });
  };

  try {
    const result = (await usage.getUsageForProvider({
      id: "ollama-cloud-no-cookie",
      provider: "ollama-cloud",
      apiKey: "ollama-chat-key",
    })) as { message?: string };

    assert.equal(called, false, "settings scrape must not run without a cookie");
    assert.match(result.message ?? "", /Ollama Cloud/);
    assert.match(result.message ?? "", /OLLAMA_USAGE_COOKIE/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalCookie === undefined) delete process.env.OLLAMA_USAGE_COOKIE;
    else process.env.OLLAMA_USAGE_COOKIE = originalCookie;
    if (originalOmniCookie === undefined) delete process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;
    else process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE = originalOmniCookie;
  }
});

test("getUsageForProvider scrapes Ollama Cloud settings quota", async () => {
  const originalFetch = globalThis.fetch;
  const originalCookie = process.env.OLLAMA_USAGE_COOKIE;
  const originalOmniCookie = process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;
  delete process.env.OLLAMA_USAGE_COOKIE;
  process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE = "__Secure-session=test-cookie";

  let requestUrl = "";
  let requestHeaders: Headers | null = null;
  let redirectMode: RequestRedirect | undefined;

  globalThis.fetch = async (input, init) => {
    requestUrl = String(input);
    requestHeaders = new Headers(init?.headers as HeadersInit | undefined);
    redirectMode = init?.redirect;
    return new Response(
      [
        '<span class="capitalize">pro</span>',
        '<div data-usage-track aria-label="34% used" style="width: 34%"></div>',
        '<span class="local-time" data-time="2026-06-22T15:00:00.000Z"></span>',
        '<div data-usage-track style="width: 67%"></div>',
        '<span class="local-time" data-time="2026-06-29T15:00:00.000Z"></span>',
      ].join(""),
      { status: 200, headers: { "content-type": "text/html" } }
    );
  };

  try {
    const result = (await usage.getUsageForProvider({
      id: "ollama-cloud-settings",
      provider: "ollama-cloud",
      apiKey: "ollama-chat-key",
    })) as {
      plan?: string | null;
      quotas?: Record<string, { used: number; total: number; remainingPercentage: number }>;
    };

    assert.equal(requestUrl, "https://ollama.com/settings");
    assert.equal(requestHeaders?.get("Cookie"), "__Secure-session=test-cookie");
    assert.equal(redirectMode, "manual");
    assert.equal(result.plan, "Ollama Cloud pro");
    assert.deepEqual(Object.keys(result.quotas ?? {}), ["session", "weekly"]);
    assert.equal(result.quotas!.session.used, 34);
    assert.equal(result.quotas!.session.remainingPercentage, 66);
    assert.equal(result.quotas!.weekly.used, 67);
    assert.equal(result.quotas!.weekly.remainingPercentage, 33);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalCookie === undefined) delete process.env.OLLAMA_USAGE_COOKIE;
    else process.env.OLLAMA_USAGE_COOKIE = originalCookie;
    if (originalOmniCookie === undefined) delete process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;
    else process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE = originalOmniCookie;
  }
});

test("getUsageForProvider keeps Ollama Cloud reset times aligned to usage tracks", async () => {
  const originalFetch = globalThis.fetch;
  const originalCookie = process.env.OLLAMA_USAGE_COOKIE;
  const originalOmniCookie = process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;
  delete process.env.OLLAMA_USAGE_COOKIE;
  process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE = "test-cookie";

  globalThis.fetch = async () =>
    new Response(
      [
        '<span class="local-time" data-time="2026-01-01T00:00:00.000Z"></span>',
        '<div data-usage-track aria-label="34% used" style="width: 1%">',
        '<span class="local-time" data-time="2026-06-22T15:00:00.000Z"></span>',
        "</div>",
        '<div data-usage-track style="width: 67%">',
        '<span style="width: 1%"></span>',
        '<span class="local-time" data-time="2026-06-29T15:00:00.000Z"></span>',
        "</div>",
      ].join(""),
      { status: 200, headers: { "content-type": "text/html" } }
    );

  try {
    const result = (await usage.getUsageForProvider({
      id: "ollama-cloud-aligned-times",
      provider: "ollama-cloud",
      apiKey: "ollama-chat-key",
    })) as {
      quotas?: Record<string, { used: number; resetAt: string | null }>;
    };

    assert.equal(result.quotas!.session.used, 34);
    assert.equal(result.quotas!.session.resetAt, "2026-06-22T15:00:00.000Z");
    assert.equal(result.quotas!.weekly.used, 67);
    assert.equal(result.quotas!.weekly.resetAt, "2026-06-29T15:00:00.000Z");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalCookie === undefined) delete process.env.OLLAMA_USAGE_COOKIE;
    else process.env.OLLAMA_USAGE_COOKIE = originalCookie;
    if (originalOmniCookie === undefined) delete process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE;
    else process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE = originalOmniCookie;
  }
});

test("getUsageForProvider reports expired Ollama Cloud cookies on redirect", async () => {
  const originalFetch = globalThis.fetch;
  const originalCookie = process.env.OLLAMA_USAGE_COOKIE;
  process.env.OLLAMA_USAGE_COOKIE = "expired-cookie";

  globalThis.fetch = async () =>
    new Response("", {
      status: 302,
      headers: { location: "/signin" },
    });

  try {
    const result = (await usage.getUsageForProvider({
      id: "ollama-cloud-redirect",
      provider: "ollama-cloud",
      apiKey: "ollama-chat-key",
    })) as { message?: string };

    assert.match(result.message ?? "", /authentication expired/i);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalCookie === undefined) delete process.env.OLLAMA_USAGE_COOKIE;
    else process.env.OLLAMA_USAGE_COOKIE = originalCookie;
  }
});
