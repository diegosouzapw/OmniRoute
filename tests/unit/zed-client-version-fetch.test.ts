/**
 * GitHub lookup for the advertised Zed editor version.
 *
 * Zed gates hosted completions on x-zed-version. The captured 0.200.0 pin is
 * the floor; a newer dotted triple from zed-industries/zed replaces it for
 * 6 hours. A rejected fetch, a non-triple, or an older tag stays on the pin.
 */
import assert from "node:assert/strict";
import test from "node:test";

const zed = await import("../../open-sse/executors/zedClientVersion.ts");

const ZED_RELEASE_URL = "https://api.github.com/repos/zed-industries/zed/releases/latest";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  zed.resetZedClientVersionCache();
});

test("a fetched version newer than the pin is returned", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return jsonResponse({ tag_name: "v1.22.0" });
  };

  assert.equal(await zed.refreshZedClientVersion(fetchMock as typeof fetch), "1.22.0");
  assert.equal(zed.getZedClientVersion(), "1.22.0");
  assert.equal(urls.length, 1);
  assert.equal(urls[0], ZED_RELEASE_URL);
});

test("a fetch that rejects falls back to the pin", async () => {
  const fetchMock = async () => {
    throw new Error("github unreachable");
  };

  assert.equal(
    await zed.refreshZedClientVersion(fetchMock as typeof fetch),
    zed.ZED_CLIENT_VERSION
  );
  assert.equal(zed.getZedClientVersion(), "0.200.0");
});
