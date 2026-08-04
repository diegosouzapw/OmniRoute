import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-veo-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "veo-route-test-secret";

const core = await import("../../src/lib/db/core.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;

function createResponse(body: BodyInit | null, init?: ResponseInit & { setCookies?: string[] }) {
  const response = new Response(body, init);
  if (init?.setCookies) {
    Object.defineProperty(response.headers, "getSetCookie", {
      value: () => init.setCookies,
      configurable: true,
    });
  }
  return response;
}

function createTestMp4Buffer() {
  return Buffer.from([
    0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x00,
  ]);
}

function immediateButSafeTimeout(
  callback: (...args: unknown[]) => void,
  ms?: number,
  ...args: unknown[]
) {
  if (ms === 20_000 || ms === 5_000) {
    callback(...args);
    return 0 as unknown as ReturnType<typeof setTimeout>;
  }
  return originalSetTimeout(callback as TimerHandler, ms, ...args);
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("video route returns 200 with normalized b64_json for Veo AI Free", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;
  const mp4 = createTestMp4Buffer();

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const stringUrl = String(url);

    if (stringUrl === "https://veoaifree.com") {
      return createResponse('<html>{"nonce":"abc123ff"}</html>', {
        status: 200,
        headers: { "content-type": "text/html" },
        setCookies: ["session_id=bootstrap; Path=/; Secure"],
      });
    }

    if (stringUrl === "https://veoaifree.com/wp-admin/admin-ajax.php") {
      const params = new URLSearchParams(String(init?.body || ""));
      if (params.get("actionType") === "full-video-generate") {
        return createResponse("scene-xyz", {
          status: 200,
          headers: { "content-type": "text/plain" },
          setCookies: ["session_id=scene; Path=/; Secure", "artifact_token=ready; Path=/; Secure"],
        });
      }
      return createResponse("https://93.184.216.34/video.mp4", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }

    if (stringUrl === "https://93.184.216.34/video.mp4") {
      return createResponse(mp4, {
        status: 200,
        headers: { "content-type": "video/mp4", "content-length": String(mp4.length) },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "veoaifree-web/veo",
        prompt: "synthetic product shot",
      }),
    })
  );

  const payload = (await response.json()) as {
    data: Array<{ b64_json?: string; format?: string; url?: string }>;
  };
  assert.equal(response.status, 200);
  assert.equal(payload.data.length, 1);
  assert.equal(typeof payload.data[0].b64_json, "string");
  assert.equal(payload.data[0].format, "mp4");
  assert.equal("url" in payload.data[0], false);
});

test("video route returns non-2xx instead of false success when Veo artifact stays unavailable", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const stringUrl = String(url);

    if (stringUrl === "https://veoaifree.com") {
      return createResponse('<html>{"nonce":"abc123ff"}</html>', {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    if (stringUrl === "https://veoaifree.com/wp-admin/admin-ajax.php") {
      const params = new URLSearchParams(String(init?.body || ""));
      return createResponse(
        params.get("actionType") === "full-video-generate"
          ? "scene-xyz"
          : "https://93.184.216.34/missing.mp4",
        {
          status: 200,
          headers: { "content-type": "text/plain" },
        }
      );
    }

    if (stringUrl === "https://93.184.216.34/missing.mp4") {
      return createResponse("missing", {
        status: 404,
        headers: { "content-type": "text/plain" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "veoaifree-web/veo",
        prompt: "synthetic product shot",
      }),
    })
  );

  const payload = (await response.json()) as { error: { code?: string } };
  assert.equal(response.status, 502);
  assert.equal(payload.error.code, "VIDEO_ARTIFACT_UNAVAILABLE");
});
