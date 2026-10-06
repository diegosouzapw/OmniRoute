/**
 * Registry lookup for the advertised GitHub Copilot CLI version.
 *
 * Copilot gates models on the version OmniRoute sends and 400s a pin that is
 * behind. The captured 1.0.88 pin is the floor; a newer dotted triple from
 * `@github/copilot` on npm replaces it for 6 hours, in both `copilot/<ver>`
 * and `GitHubCopilotChat/<ver>`. A rejected fetch, a non-triple, or an older
 * publish stays on the pin. GITHUB_COPILOT_CLI_VERSION in the environment
 * beats both.
 */
import assert from "node:assert/strict";
import test from "node:test";

const copilot = await import("../../open-sse/config/providerHeaderProfiles.ts");

const NPM_LATEST = "https://registry.npmjs.org/@github/copilot/latest";

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
  copilot.resetGitHubCopilotCliVersionCache();
});

test("a fetched version newer than the pin appears in both Copilot header strings", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ version: "1.0.92" });
  };

  await withEnv({ GITHUB_COPILOT_CLI_VERSION: undefined }, async () => {
    assert.equal(
      await copilot.resolveGitHubCopilotCliVersion(fetchMock as typeof fetch),
      "1.0.92"
    );
    assert.equal(copilot.getGitHubCopilotCliVersion(), "1.0.92");
    const headers = copilot.getGitHubCopilotChatHeaders();
    assert.equal(headers["editor-version"], "copilot/1.0.92");
    assert.equal(
      headers["user-agent"],
      `copilot/1.0.92 (${process.platform}) term/unknown`
    );
    assert.equal(copilot.getGitHubCopilotChatUserAgent(), "GitHubCopilotChat/1.0.92");
    const internal = copilot.getGitHubCopilotInternalUserHeaders("token gh");
    assert.equal(internal["User-Agent"], "GitHubCopilotChat/1.0.92");
    assert.equal(internal["Editor-Version"], "copilot/1.0.92");
  });
  assert.equal(urls.length, 1);
  assert.equal(urls[0], NPM_LATEST);
  assert.equal(copilot.GITHUB_COPILOT_CLI_VERSION, "1.0.88");
});

test("a fetch that rejects keeps the pinned 1.0.88", async () => {
  const fetchMock = async () => {
    throw new Error("registry unreachable");
  };

  await withEnv({ GITHUB_COPILOT_CLI_VERSION: undefined }, async () => {
    assert.equal(
      await copilot.resolveGitHubCopilotCliVersion(fetchMock as typeof fetch),
      "1.0.88"
    );
    assert.equal(copilot.getGitHubCopilotCliVersion(), copilot.GITHUB_COPILOT_CLI_VERSION);
    const headers = copilot.getGitHubCopilotChatHeaders();
    assert.equal(headers["editor-version"], "copilot/1.0.88");
    assert.equal(copilot.getGitHubCopilotChatUserAgent(), "GitHubCopilotChat/1.0.88");
  });
});
