/**
 * Registry lookups for the advertised Qwen Code and CodeBuddy CN identities.
 *
 * Both gates reject a pin that is behind the published CLI. The captured pin
 * is the floor; a newer dotted triple from npm replaces it for 6 hours. A
 * rejected fetch, a non-triple, or an older publish stays on the pin. The
 * sync getters return the cache or the pin immediately and never wait on
 * the network.
 */
import assert from "node:assert/strict";
import test from "node:test";

const profiles = await import("../../open-sse/config/providerHeaderProfiles.ts");

const QWEN_NPM_LATEST = "https://registry.npmjs.org/@qwen-code/qwen-code/latest";
const CODEBUDDY_NPM_LATEST = "https://registry.npmjs.org/@tencent-ai/codebuddy-code/latest";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  profiles.resetQwenCliVersionCache();
  profiles.resetCodeBuddyCnVersionCache();
});

test("a fetched Qwen version newer than the pin is returned", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ version: "0.25.0" });
  };

  assert.equal(
    await profiles.refreshQwenCliVersion(fetchMock as typeof fetch),
    "0.25.0"
  );
  assert.equal(profiles.getQwenCliVersion(), "0.25.0");
  assert.equal(
    profiles.getQwenCliUserAgent(),
    `QwenCode/0.25.0 (${process.platform}; ${process.arch})`
  );
  assert.equal(urls.length, 1);
  assert.equal(urls[0], QWEN_NPM_LATEST);
  assert.equal(profiles.QWEN_CLI_VERSION, "0.19.3");
});

test("a Qwen fetch that rejects stays on the pin", async () => {
  const fetchMock = async () => {
    throw new Error("registry unreachable");
  };

  assert.equal(
    await profiles.refreshQwenCliVersion(fetchMock as typeof fetch),
    profiles.QWEN_CLI_VERSION
  );
  assert.equal(profiles.getQwenCliVersion(), profiles.QWEN_CLI_VERSION);
  assert.equal(
    profiles.getQwenCliUserAgent(),
    `QwenCode/${profiles.QWEN_CLI_VERSION} (${process.platform}; ${process.arch})`
  );
});

test("a fetched CodeBuddy version newer than the pin moves both numbers together", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ version: "2.161.4" });
  };

  assert.equal(
    await profiles.refreshCodeBuddyCnUserAgent(fetchMock as typeof fetch),
    "CLI/2.161.4 CodeBuddy/2.161.4"
  );
  assert.equal(profiles.getCodeBuddyCnUserAgent(), "CLI/2.161.4 CodeBuddy/2.161.4");
  assert.equal(urls.length, 1);
  assert.equal(urls[0], CODEBUDDY_NPM_LATEST);
  assert.equal(profiles.CODEBUDDY_CN_USER_AGENT, "CLI/2.108.1 CodeBuddy/2.108.1");
});

test("a CodeBuddy fetch that rejects stays on the pin", async () => {
  const fetchMock = async () => {
    throw new Error("registry unreachable");
  };

  assert.equal(
    await profiles.refreshCodeBuddyCnUserAgent(fetchMock as typeof fetch),
    profiles.CODEBUDDY_CN_USER_AGENT
  );
  assert.equal(profiles.getCodeBuddyCnUserAgent(), profiles.CODEBUDDY_CN_USER_AGENT);
});
