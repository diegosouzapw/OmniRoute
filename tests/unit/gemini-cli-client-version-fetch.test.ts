/**
 * Registry lookup for the advertised Gemini CLI client version.
 *
 * The captured pin is the floor; a newer dotted triple from the npm
 * `@google/gemini-cli` `latest` document replaces it for 6 hours. A rejected
 * fetch, a non-triple, or an older publish stays on the pin.
 */
import assert from "node:assert/strict";
import test from "node:test";

const canonical = await import("../../src/shared/constants/geminiCliClient.ts");

const NPM_LATEST = "https://registry.npmjs.org/@google/gemini-cli/latest";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  canonical.resetGeminiCliClientVersionCache();
});

test("a fetched version newer than the pin is returned", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ version: "0.62.0" });
  };

  assert.equal(
    await canonical.refreshGeminiCliClientVersion(fetchMock as typeof fetch),
    "0.62.0"
  );
  assert.equal(canonical.getGeminiCliClientVersion(), "0.62.0");
  assert.equal(canonical.getGeminiCliUserAgent(), "GeminiCLI/0.62.0 (linux; x64)");
  assert.equal(urls.length, 1);
  assert.equal(urls[0], NPM_LATEST);
});

test("a fetch that rejects falls back to the pin", async () => {
  const fetchMock = async () => {
    throw new Error("registry unreachable");
  };

  assert.equal(
    await canonical.refreshGeminiCliClientVersion(fetchMock as typeof fetch),
    "0.1.0"
  );
  assert.equal(canonical.getGeminiCliClientVersion(), canonical.GEMINI_CLI_CLIENT_VERSION);
  assert.equal(canonical.getGeminiCliUserAgent(), "GeminiCLI/0.1.0 (linux; x64)");
});
