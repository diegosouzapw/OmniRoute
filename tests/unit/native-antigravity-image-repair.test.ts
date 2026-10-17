import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import "../_setup/nativeImageState.ts";

const isolatedRoot = path.resolve(process.env.DATA_DIR || "");
assert.ok(
  process.env.DATA_DIR && isolatedRoot.startsWith(path.resolve(".ci-work") + path.sep),
  "Run with a fresh project-contained DATA_DIR"
);
for (const key of ["HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA"]) {
  assert.ok(
    process.env[key] &&
      path.resolve(process.env[key]!).startsWith(path.resolve(".ci-work") + path.sep),
    `Run with private ${key}`
  );
}
const state = mkdtempSync(path.join(isolatedRoot, "native-antigravity-"));
process.env.DATA_DIR = state;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "native-antigravity-fixture-only";
process.env.JWT_SECRET = "native-antigravity-fixture-only";
const originalFetch = globalThis.fetch;
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/images/edits/route.ts");

// A complete tiny PNG, not a MIME-only dummy. No real account or network is used.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
  "base64"
);
const DATA_URL = `data:image/png;base64,${PNG.toString("base64")}`;
const model = "antigravity/gemini-3.1-flash-image";
const credentials = { accessToken: "fixture-token", projectId: "fixture-project" };
type CapturedImageRequest = {
  model: string;
  project: string;
  requestType: string;
  userAgent: string;
  request: {
    contents: { parts: unknown[] }[];
    generationConfig: { imageConfig: { aspectRatio: string; imageSize: string } };
  };
};

test.after(async () => {
  globalThis.fetch = originalFetch;
  const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await closeCallLogSaves(1000);
  core.resetDbInstance();
  rmSync(state, { recursive: true, force: true });
});

test(
  "Antigravity public generator forwards original reference with selected native settings",
  { timeout: 5000 },
  async () => {
    let calls = 0;
    let captured: CapturedImageRequest;
    globalThis.fetch = async (_url, init) => {
      calls++;
      captured = JSON.parse(String(init?.body));
      assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer fixture-token");
      return Response.json({
        response: {
          candidates: [
            {
              content: {
                parts: [{ inlineData: { mimeType: "image/png", data: PNG.toString("base64") } }],
              },
            },
          ],
        },
      });
    };
    const result = await handleImageGeneration({
      body: {
        model,
        prompt: " رنگ آبی — café ",
        image: DATA_URL,
        aspect_ratio: "16:9",
        image_size: "4K",
      },
      credentials,
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(calls, 1);
    assert.equal(captured.model, "gemini-3.1-flash-image");
    assert.equal(captured.project, "fixture-project");
    assert.equal(captured.requestType, "image_gen");
    assert.equal(captured.userAgent, "antigravity");
    assert.deepEqual(captured.request.contents[0].parts, [
      { text: " رنگ آبی — café " },
      { inlineData: { mimeType: "image/png", data: PNG.toString("base64") } },
    ]);
    assert.deepEqual(captured.request.generationConfig.imageConfig, {
      aspectRatio: "16:9",
      imageSize: "4K",
    });
  }
);

test(
  "Pro model aliases preserve the canonical Pro identity at registry and generator seams",
  { timeout: 5000 },
  async () => {
    const { parseImageModel, getImageModelEntry } =
      await import("../../open-sse/config/imageRegistry.ts");
    for (const selected of [
      "antigravity/gemini-3-pro-image",
      "antigravity/gemini-3-pro-image-preview",
    ]) {
      assert.deepEqual(parseImageModel(selected), {
        provider: "antigravity",
        model: "gemini-3-pro-image",
      });
      assert.equal(getImageModelEntry(selected)?.model, "gemini-3-pro-image");
      for (const editing of [false, true]) {
        let submissions = 0;
        globalThis.fetch = async (_url, init) => {
          submissions++;
          const request = JSON.parse(String(init?.body)) as CapturedImageRequest;
          assert.equal(request.model, "gemini-3-pro-image");
          assert.equal(request.project, "fixture-project");
          assert.deepEqual(request.request.generationConfig.imageConfig, {
            aspectRatio: "1:1",
            imageSize: "4K",
          });
          assert.equal(request.request.contents[0].parts.length, editing ? 2 : 1);
          if (editing)
            assert.deepEqual(request.request.contents[0].parts[1], {
              inlineData: { mimeType: "image/png", data: PNG.toString("base64") },
            });
          return Response.json({
            response: {
              candidates: [
                {
                  content: {
                    parts: [
                      { inlineData: { mimeType: "image/png", data: PNG.toString("base64") } },
                    ],
                  },
                },
              ],
            },
          });
        };
        const result = await handleImageGeneration({
          body: {
            model: selected,
            prompt: "Pro fixture",
            size: "1024x1024",
            image_size: "4K",
            ...(editing ? { image: DATA_URL } : {}),
          },
          credentials,
          log: null,
        });
        assert.equal(result.success, true);
        assert.equal(submissions, 1);
      }
    }
  }
);

test(
  "Antigravity HTTP edit preserves reference, ratio and tier for JSON and multipart",
  { timeout: 5000 },
  async () => {
    await providers.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "fixture",
      accessToken: "fixture-token",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { projectId: "fixture-project" },
    });
    for (const [selected, multipart] of [
      [model, false],
      [model, true],
      ["antigravity/gemini-3-pro-image", false],
      ["antigravity/gemini-3-pro-image-preview", true],
    ] as const) {
      let captured: CapturedImageRequest;
      globalThis.fetch = async (_url, init) => {
        captured = JSON.parse(String(init?.body));
        return Response.json({
          response: {
            candidates: [
              {
                content: {
                  parts: [{ inlineData: { mimeType: "image/png", data: PNG.toString("base64") } }],
                },
              },
            ],
          },
        });
      };
      const form = new FormData();
      form.set("model", selected);
      form.set("prompt", "make it blue");
      form.set("aspect_ratio", "16:9");
      form.set("image_size", "4K");
      form.set("image", new Blob([PNG], { type: "image/png" }), "reference.png");
      const request = new Request("http://localhost/api/v1/images/edits", {
        method: "POST",
        ...(multipart ? {} : { headers: { "content-type": "application/json" } }),
        body: multipart
          ? form
          : JSON.stringify({
              model: selected,
              prompt: "make it blue",
              image: DATA_URL,
              aspect_ratio: "16:9",
              image_size: "4K",
            }),
      });
      const response = await POST(request);
      assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
      assert.equal(
        captured.model,
        selected.includes("gemini-3-pro-image") ? "gemini-3-pro-image" : "gemini-3.1-flash-image"
      );
      assert.deepEqual(captured.request.contents[0].parts[1], {
        inlineData: { mimeType: "image/png", data: PNG.toString("base64") },
      });
      assert.deepEqual(captured.request.generationConfig.imageConfig, {
        aspectRatio: "16:9",
        imageSize: "4K",
      });
    }
  }
);

test(
  "Antigravity rejects unsupported masks, invalid MIME, excess and oversized references before submission",
  { timeout: 5000 },
  async () => {
    let submissions = 0;
    globalThis.fetch = async () => {
      submissions++;
      return Response.json({}, { status: 500 });
    };
    for (const extra of [
      { mask: DATA_URL },
      { image: `data:image/jpeg;base64,${PNG.toString("base64")}` },
      { images: [DATA_URL, DATA_URL], image: undefined },
      { image: "data:image/svg+xml;base64,PHN2Zz4=" },
      { image: "data:image/png;base64,%%%=" },
      { model: "antigravity/not-an-image-model" },
    ]) {
      const response = await POST(
        new Request("http://localhost/api/v1/images/edits", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model, prompt: "make it blue", image: DATA_URL, ...extra }),
        })
      );
      assert.equal(response.status, 400);
      const result = await handleImageGeneration({
        body: { model, prompt: "make it blue", image: DATA_URL, ...extra },
        credentials,
        log: null,
      });
      assert.equal(result.success, false);
    }
    const oversized = Buffer.alloc(20 * 1024 * 1024 + 1);
    PNG.copy(oversized);
    const result = await handleImageGeneration({
      body: {
        model,
        prompt: "make it blue",
        image: `data:image/png;base64,${oversized.toString("base64")}`,
      },
      credentials,
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(submissions, 0, "Invalid references must not submit upstream");
  }
);

test(
  "Antigravity reference edit rejects URL response format before submission",
  { timeout: 5000 },
  async () => {
    let submissions = 0;
    globalThis.fetch = async () => {
      submissions++;
      return Response.json({
        response: {
          candidates: [
            {
              content: {
                parts: [{ inlineData: { mimeType: "image/png", data: PNG.toString("base64") } }],
              },
            },
          ],
        },
      });
    };
    const result = await handleImageGeneration({
      body: { model, prompt: "make it blue", image: DATA_URL, response_format: "url" },
      credentials,
      log: null,
    });
    assert.equal(result.success, false);
    assert.ok(result.success === false);
    assert.ok("status" in result);
    assert.equal(result.status, 400);
    assert.equal(submissions, 0);
  }
);

test(
  "Antigravity submitted reference edit failures are never retryable",
  { timeout: 5000 },
  async () => {
    for (const mode of ["upstream", "empty", "transport", "parse"]) {
      let submissions = 0;
      globalThis.fetch = async () => {
        submissions++;
        if (mode === "transport") throw new Error("fixture transport failure");
        if (mode === "parse") return new Response("not json");
        if (mode === "upstream")
          return Response.json({ error: { message: "fixture rejection" } }, { status: 401 });
        return Response.json({ response: { candidates: [] } });
      };
      const result = await handleImageGeneration({
        body: { model, prompt: "make it blue", image: DATA_URL },
        credentials,
        log: null,
      });
      assert.equal(result.success, false, mode);
      assert.ok(result.success === false, mode);
      assert.ok("retryable" in result, mode);
      assert.equal(result.retryable, false, mode);
      assert.equal(submissions, 1, mode);
    }
  }
);
