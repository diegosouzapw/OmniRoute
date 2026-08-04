import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prompt-required-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const musicRoute = await import("../../src/app/api/v1/music/generations/route.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");

type ErrorResponseBody = { error: { message: string } };

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1 video generation POST rejects requests without a prompt", async () => {
  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "comfyui/animatediff",
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /Prompt is required/);
});

test("Alibaba plan and Qwen Cloud I2V models allow media-only requests", async () => {
  for (const model of [
    "alibaba/happyhorse-1.1-i2v",
    "alibaba/wan2.7-i2v-2026-04-25",
    "alibaba/wan2.6-i2v-flash",
    "bailian-coding-plan/happyhorse-1.1-i2v",
    "qwen-cloud/happyhorse-1.1-i2v",
    "qwen-cloud/wan2.7-i2v",
    "qwen-cloud-token-plan/happyhorse-1.1-i2v",
  ]) {
    const response = await videoRoute.POST(
      new Request("http://localhost/api/v1/videos/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          image_url: "https://cdn.example.com/input.png",
        }),
      })
    );
    const body = (await response.json()) as ErrorResponseBody;

    assert.equal(response.status, 400);
    assert.doesNotMatch(body.error.message, /Prompt is required/);
    assert.match(body.error.message, /No credentials for video provider/);
  }
});

test("v1 music generation POST rejects requests without a prompt", async () => {
  const response = await musicRoute.POST(
    new Request("http://localhost/api/v1/music/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "comfyui/musicgen-medium",
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /Prompt is required/);
});
