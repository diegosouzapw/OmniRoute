/**
 * Registry lookup for the advertised Claude Code client version.
 *
 * Anthropic gates models on the version OmniRoute sends. The captured pin is
 * the floor; a newer dotted triple from the npm `latest` document replaces it
 * for 6 hours. A rejected fetch, a non-triple, or an older publish stays on
 * the pin. CLAUDE_CODE_CLIENT_VERSION in the environment beats both.
 */
import assert from "node:assert/strict";
import test from "node:test";

const canonical = await import("../../src/shared/constants/claudeCodeClient.ts");

const NPM_LATEST = "https://registry.npmjs.org/@anthropic-ai/claude-code/latest";

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

test.afterEach(() => {
  canonical.resetClaudeCodeClientVersionCache();
});

test("a fetched version newer than the pin is returned", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ version: "2.1.291" });
  };

  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, async () => {
    assert.equal(
      await canonical.refreshClaudeCodeClientVersion(fetchMock as typeof fetch),
      "2.1.291"
    );
    assert.equal(canonical.getClaudeCodeClientVersion(), "2.1.291");
  });
  assert.equal(urls.length, 1);
  assert.equal(urls[0], NPM_LATEST);
});

test("a fetch that rejects falls back to the pin", async () => {
  const fetchMock = async () => {
    throw new Error("registry unreachable");
  };

  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, async () => {
    assert.equal(
      await canonical.refreshClaudeCodeClientVersion(fetchMock as typeof fetch),
      canonical.CLAUDE_CODE_CLIENT_VERSION
    );
    assert.equal(canonical.getClaudeCodeClientVersion(), canonical.CLAUDE_CODE_CLIENT_VERSION);
  });
});

test("the env override beats the fetched value", async () => {
  let calls = 0;
  const fetchMock = async () => {
    calls += 1;
    return jsonResponse({ version: "9.9.9" });
  };

  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, async () => {
    assert.equal(
      await canonical.refreshClaudeCodeClientVersion(fetchMock as typeof fetch),
      "2.1.259"
    );
    assert.equal(canonical.getClaudeCodeClientVersion(), "2.1.259");
  });
  assert.equal(calls, 0);
});
