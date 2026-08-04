import test from "node:test";
import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;
const { detectIntent, VeoAIFreeWebExecutor } =
  await import("../../open-sse/executors/veoaifree-web.ts");

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
});

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

// ─── detectIntent: model-based ──────────────────────────────────────────────

test("detectIntent returns 'video' for veo models", () => {
  assert.equal(detectIntent("veo-3.1"), "video");
  assert.equal(detectIntent("veo-3.0"), "video");
  assert.equal(detectIntent("seedance"), "video");
  assert.equal(detectIntent("VEO-3.1"), "video");
});

test("detectIntent returns 'image' for image models", () => {
  assert.equal(detectIntent("image-gen"), "image");
  assert.equal(detectIntent("banana"), "image");
  assert.equal(detectIntent("imagen-4"), "image");
  assert.equal(detectIntent("nano-banana"), "image");
});

test("detectIntent returns 'tts' for audio models", () => {
  assert.equal(detectIntent("tts"), "tts");
  assert.equal(detectIntent("speech"), "tts");
  assert.equal(detectIntent("audio-gen"), "tts");
});

test("detectIntent returns 'enhance' for prompt models", () => {
  assert.equal(detectIntent("enhance"), "enhance");
  assert.equal(detectIntent("prompt-helper"), "enhance");
});

// ─── detectIntent: prompt-based ─────────────────────────────────────────────

test("detectIntent returns 'image' for image prompts", () => {
  assert.equal(detectIntent(undefined, "generate image of a cat"), "image");
  assert.equal(detectIntent(undefined, "create image of sunset"), "image");
  assert.equal(detectIntent(undefined, "draw a horse"), "image");
});

test("detectIntent returns 'enhance' for enhance prompts", () => {
  assert.equal(detectIntent(undefined, "enhance my prompt"), "enhance");
  assert.equal(detectIntent(undefined, "improve prompt for video"), "enhance");
});

test("detectIntent defaults to 'video' for generic prompts", () => {
  assert.equal(detectIntent(undefined, "a cat walking on the moon"), "video");
  assert.equal(detectIntent(undefined, ""), "video");
  assert.equal(detectIntent(undefined, undefined), "video");
});

// ─── detectIntent: case insensitive ─────────────────────────────────────────

test("detectIntent is case-insensitive for model names", () => {
  assert.equal(detectIntent("VEO-3.1"), "video");
  assert.equal(detectIntent("TTS"), "tts");
  assert.equal(detectIntent("Image-Gen"), "image");
  assert.equal(detectIntent("ENHANCE"), "enhance");
});

// ─── detectIntent: model takes precedence over prompt ───────────────────────

test("detectIntent model takes precedence over prompt", () => {
  assert.equal(detectIntent("tts", "generate video of cat"), "tts");
  assert.equal(detectIntent("veo-3.1", "create image"), "video");
});

// ─── Integration: executor class exists ─────────────────────────────────────

test("VeoAIFreeWebExecutor class can be imported", async () => {
  const executor = new VeoAIFreeWebExecutor();
  assert.ok(executor);
  assert.equal(typeof executor.execute, "function");
});

test("VeoAIFreeWebExecutor preserves cookies and returns normalized base64 mp4", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;
  const executor = new VeoAIFreeWebExecutor();
  const seenCookies: string[] = [];
  const seenReferers: string[] = [];
  const mp4 = createTestMp4Buffer();

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const stringUrl = String(url);
    const headers = new Headers(init?.headers || {});
    if (headers.get("Cookie")) seenCookies.push(headers.get("Cookie") || "");
    if (headers.get("Referer")) seenReferers.push(headers.get("Referer") || "");

    if (stringUrl === "https://veoaifree.com") {
      return createResponse('<html>{"nonce":"abc123ff"}</html>', {
        status: 200,
        headers: { "content-type": "text/html" },
        setCookies: ["session_id=bootstrap; Path=/; Secure"],
      });
    }

    if (stringUrl === "https://veoaifree.com/wp-admin/admin-ajax.php") {
      const params = new URLSearchParams(String(init?.body || ""));
      const actionType = params.get("actionType");
      if (actionType === "full-video-generate") {
        assert.match(headers.get("Cookie") || "", /session_id=bootstrap/);
        return createResponse("scene-xyz", {
          status: 200,
          headers: { "content-type": "text/plain" },
          setCookies: ["session_id=scene; Path=/; Secure", "artifact_token=ready; Path=/; Secure"],
        });
      }
      if (actionType === "final-video-results") {
        assert.match(headers.get("Cookie") || "", /session_id=scene/);
        assert.match(headers.get("Cookie") || "", /artifact_token=ready/);
        return createResponse("https://93.184.216.34/video.mp4", {
          status: 200,
          headers: { "content-type": "text/plain" },
        });
      }
    }

    if (stringUrl === "https://93.184.216.34/video.mp4") {
      assert.match(headers.get("Cookie") || "", /session_id=scene/);
      assert.match(headers.get("Cookie") || "", /artifact_token=ready/);
      return createResponse(mp4, {
        status: 200,
        headers: { "content-type": "video/mp4", "content-length": String(mp4.length) },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const result = await executor.execute({
    model: "veo",
    body: {
      messages: [
        { role: "system", content: "aspect_ratio: VIDEO_ASPECT_RATIO_LANDSCAPE" },
        { role: "user", content: "synthetic product shot" },
      ],
    },
    stream: false,
    credentials: { connectionId: "noauth" },
    signal: null,
    log: null,
  });

  assert.ok(seenCookies.some((value) => value.includes("session_id=scene")));
  assert.ok(seenCookies.some((value) => value.includes("artifact_token=ready")));
  assert.ok(seenReferers.every((value) => value.startsWith("https://veoaifree.com/")));

  const payload = await result.response.json();
  assert.equal(result.response.status, 200);
  assert.equal(Array.isArray(payload.data), true);
  assert.equal(payload.data.length, 1);
  assert.equal(typeof payload.data[0].b64_json, "string");
  assert.equal(payload.data[0].format, "mp4");
  assert.equal("url" in payload.data[0], false);
  assert.equal(Buffer.from(payload.data[0].b64_json, "base64").equals(mp4), true);
});

test("VeoAIFreeWebExecutor retries same artifact URL within availability window and succeeds", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;
  const executor = new VeoAIFreeWebExecutor();
  const mp4 = createTestMp4Buffer();
  let artifactAttempts = 0;

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
          : "https://93.184.216.34/video-late.mp4",
        {
          status: 200,
          headers: { "content-type": "text/plain" },
        }
      );
    }

    if (stringUrl === "https://93.184.216.34/video-late.mp4") {
      artifactAttempts += 1;
      if (artifactAttempts === 1) {
        return createResponse("not ready", {
          status: 404,
          headers: { "content-type": "text/plain" },
        });
      }
      return createResponse(mp4, {
        status: 200,
        headers: { "content-type": "video/mp4", "content-length": String(mp4.length) },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const result = await executor.execute({
    model: "veo",
    body: { messages: [{ role: "user", content: "synthetic product shot" }] },
    stream: false,
    credentials: { connectionId: "noauth" },
    signal: null,
    log: null,
  });

  const payload = await result.response.json();
  assert.equal(result.response.status, 200);
  assert.equal(artifactAttempts, 2);
  assert.equal(payload.data[0].format, "mp4");
});

test("VeoAIFreeWebExecutor returns deterministic error when artifact URL stays 404", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;
  const executor = new VeoAIFreeWebExecutor();
  let artifactAttempts = 0;

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
      artifactAttempts += 1;
      return createResponse("missing", { status: 404, headers: { "content-type": "text/plain" } });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const result = await executor.execute({
    model: "veo",
    body: { messages: [{ role: "user", content: "synthetic product shot" }] },
    stream: false,
    credentials: { connectionId: "noauth" },
    signal: null,
    log: null,
  });

  const payload = await result.response.json();
  assert.equal(result.response.status, 502);
  assert.equal(artifactAttempts, 12);
  assert.equal(payload.error.code, "VIDEO_ARTIFACT_UNAVAILABLE");
});
