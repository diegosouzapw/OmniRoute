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
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /Prompt is required/);
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
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /Prompt is required/);
});
