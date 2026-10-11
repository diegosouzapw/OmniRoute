/**
 * Registry lookup for the advertised Kimi Code CLI version.
 *
 * The captured pin is the floor. A newer dotted triple from the npm `latest`
 * document of `@moonshot-ai/kimi-code` replaces it for 6 hours. A rejected
 * fetch, a non-triple, or an older publish stays on the pin. KIMI_CLI_VERSION
 * in the environment beats both and must not start a fetch.
 *
 * The getter is the only production path: it stays sync and fires the lookup
 * in the background. These tests stub fetch, then read the getter after the
 * microtask that started the fetch has run.
 */
import assert from "node:assert/strict";
import test from "node:test";

const canonical = await import("../../open-sse/config/providers/registry/kimi/coding/runtime.ts");

const NPM_LATEST = "https://registry.npmjs.org/@moonshot-ai/kimi-code/latest";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function withEnv<T>(
  entries: Record<string, string | undefined>,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(entries)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

/** Let the sync getter's `void` fetch reach the stub and settle. */
async function flushBackgroundFetch(): Promise<void> {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(() => {
  canonical.resetKimiCodeCliVersionCache();
  canonical.resetKimiCodeCliVersionFetch();
});

test("a fetched version newer than the pin is kept by the getter", async () => {
  const urls: string[] = [];
  canonical.setKimiCodeCliVersionFetch(async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ version: "2.1.2" });
  });

  await withEnv({ KIMI_CLI_VERSION: undefined, NODE_TEST_CONTEXT: undefined }, async () => {
    assert.equal(canonical.getKimiCodeCliVersion(), canonical.KIMI_CODE_CLI_VERSION);
    await flushBackgroundFetch();
    assert.equal(canonical.getKimiCodeCliVersion(), "2.1.2");
    assert.equal(canonical.getKimiCodeCliUserAgent(), "kimi-code-cli/2.1.2");
  });
  assert.equal(urls.length, 1);
  assert.equal(urls[0], NPM_LATEST);
});

test("a fetch that rejects stays on the pin", async () => {
  canonical.setKimiCodeCliVersionFetch(async () => {
    throw new Error("registry unreachable");
  });

  await withEnv({ KIMI_CLI_VERSION: undefined, NODE_TEST_CONTEXT: undefined }, async () => {
    assert.equal(canonical.getKimiCodeCliVersion(), canonical.KIMI_CODE_CLI_VERSION);
    await flushBackgroundFetch();
    assert.equal(canonical.getKimiCodeCliVersion(), canonical.KIMI_CODE_CLI_VERSION);
    assert.equal(canonical.getKimiCodeCliUserAgent(), `kimi-code-cli/${canonical.KIMI_CODE_CLI_VERSION}`);
  });
});
