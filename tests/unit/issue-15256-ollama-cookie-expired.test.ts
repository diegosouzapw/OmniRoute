import test from "node:test";
import assert from "node:assert/strict";

const { getOllamaCloudUsage } = await import("../../open-sse/services/opencodeOllamaUsage.ts");

const ENV_KEYS = [
  "OMNIROUTE_OLLAMA_USAGE_COOKIE",
  "OLLAMA_USAGE_COOKIE",
  "OLLAMA_CLOUD_USAGE_COOKIE",
];

async function run(
  pasted: string,
  respond: () => Response
): Promise<{ cookieHeader: string | null; result: { message?: string; quotas?: unknown } }> {
  const saved = ENV_KEYS.map((k) => [k, process.env[k]] as const);
  for (const k of ENV_KEYS) delete process.env[k];
  const originalFetch = globalThis.fetch;
  let cookieHeader: string | null = null;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    cookieHeader = new Headers(init?.headers as HeadersInit).get("Cookie");
    return respond();
  }) as typeof fetch;
  try {
    const result = (await getOllamaCloudUsage({ ollamaCloudUsageCookie: pasted })) as {
      message?: string;
      quotas?: unknown;
    };
    return { cookieHeader, result };
  } finally {
    globalThis.fetch = originalFetch;
    for (const [k, v] of saved) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

const ok = () =>
  new Response('<div data-usage-track aria-label="12.7% used"></div>', { status: 200 });

test("#15256 pasted full Cookie header is reduced to a single __Secure-session pair", async () => {
  const { cookieHeader } = await run("aid=111; __Secure-session=abc123; other=x", ok);
  assert.equal(cookieHeader, "__Secure-session=abc123");
});

test("#15256 underscore-typed cookie name (__Secure_session=value) is not nested into the value", async () => {
  const { cookieHeader } = await run("__Secure_session=abc123", ok);
  assert.equal(cookieHeader, "__Secure-session=abc123");
});

test("#15256 bare value, canonical name=value and quoted value keep working", async () => {
  assert.equal((await run("abc123", ok)).cookieHeader, "__Secure-session=abc123");
  assert.equal((await run("__Secure-session=abc123", ok)).cookieHeader, "__Secure-session=abc123");
  assert.equal((await run('"abc123"', ok)).cookieHeader, "__Secure-session=abc123");
  assert.equal(
    (await run("Cookie: __Secure-session=abc123; x=1", ok)).cookieHeader,
    "__Secure-session=abc123"
  );
});

test("#15256 a 3xx that is NOT a sign-in redirect is not reported as 'authentication expired'", async () => {
  const { result } = await run(
    "abc123",
    () => new Response(null, { status: 308, headers: { location: "https://ollama.com/settings/" } })
  );
  assert.doesNotMatch(result.message ?? "", /expired/i);
  assert.match(result.message ?? "", /308|settings\//);
});

test("#15256 a sign-in redirect is still reported as authentication expired", async () => {
  const { result } = await run(
    "abc123",
    () => new Response(null, { status: 303, headers: { location: "/signin?next=%2Fsettings" } })
  );
  assert.match(result.message ?? "", /authentication expired/i);
  assert.doesNotMatch(result.message ?? "", /next=/);
});
