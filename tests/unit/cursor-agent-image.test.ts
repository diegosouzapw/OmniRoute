import { test } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { IMAGE_PROVIDERS, parseImageModel, getImageProvider } from "../../open-sse/config/imageRegistry.ts";
import {
  buildCursorAgentAuthEnv,
  buildCursorAgentImagePrompt,
  CURSOR_AGENT_IMAGE_FORMAT,
  handleCursorAgentImageGeneration,
  isRasterImageBuffer,
  normalizeCursorSeatToken,
  __resetCursorAgentImageConcurrencyForTests,
} from "../../open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts";

test("cursor is registered in IMAGE_PROVIDERS with cursor-agent-image format", () => {
  const entry = IMAGE_PROVIDERS.cursor;
  assert.ok(entry, "expected IMAGE_PROVIDERS.cursor");
  assert.equal(entry.id, "cursor");
  assert.equal(entry.alias, "cu");
  assert.equal(entry.format, CURSOR_AGENT_IMAGE_FORMAT);
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.authHeader, "bearer");
  assert.ok(entry.models.some((m) => m.id === "auto"));
  assert.deepEqual(getImageProvider("cursor"), entry);
});

test("parseImageModel resolves cursor/auto and cu/auto to the cursor image provider", () => {
  assert.deepEqual(parseImageModel("cursor/auto"), { provider: "cursor", model: "auto" });
  assert.deepEqual(parseImageModel("cu/auto"), { provider: "cursor", model: "auto" });
});

test("normalizeCursorSeatToken strips account:: prefix like CursorExecutor", () => {
  assert.equal(normalizeCursorSeatToken("acct::tok_abc"), "tok_abc");
  assert.equal(normalizeCursorSeatToken("  crsr_live  "), "crsr_live");
  assert.equal(normalizeCursorSeatToken("a::b::c"), "b::c");
});

test("buildCursorAgentAuthEnv maps crsr_ to CURSOR_API_KEY and JWTs to CURSOR_AUTH_TOKEN", () => {
  assert.deepEqual(buildCursorAgentAuthEnv("crsr_abc"), { CURSOR_API_KEY: "crsr_abc" });
  assert.deepEqual(buildCursorAgentAuthEnv("user::crsr_abc"), { CURSOR_API_KEY: "crsr_abc" });
  assert.deepEqual(buildCursorAgentAuthEnv("eyJhbGciOi.jwt"), {
    CURSOR_AUTH_TOKEN: "eyJhbGciOi.jwt",
  });
});

test("buildCursorAgentImagePrompt locks the agent to native generateImage + exact out path", () => {
  const prompt = buildCursorAgentImagePrompt("a red cube", "/tmp/out.png", "1024x1024");
  assert.match(prompt, /native image-generation tool/i);
  assert.match(prompt, /Do NOT write code/);
  assert.match(prompt, /a red cube/);
  assert.match(prompt, /1024x1024/);
  assert.match(prompt, /\/tmp\/out\.png/);
  assert.match(prompt, /\bDONE\b/);
});

test("isRasterImageBuffer accepts PNG and JPEG magics", () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
  const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
  assert.equal(isRasterImageBuffer(png), true);
  assert.equal(isRasterImageBuffer(jpeg), true);
  assert.equal(isRasterImageBuffer(Buffer.from("not-an-image")), false);
});

test("handleCursorAgentImageGeneration rejects empty prompt and missing credentials", async () => {
  __resetCursorAgentImageConcurrencyForTests();
  const noPrompt = await handleCursorAgentImageGeneration({
    model: "auto",
    provider: "cursor",
    providerConfig: { baseUrl: "agent://cursor-agent" },
    body: { prompt: "   " },
    credentials: { accessToken: "crsr_x" },
  });
  assert.equal(noPrompt.success, false);
  assert.equal(noPrompt.status, 400);

  const noCreds = await handleCursorAgentImageGeneration({
    model: "auto",
    provider: "cursor",
    providerConfig: { baseUrl: "agent://cursor-agent" },
    body: { prompt: "hi" },
    credentials: {},
  });
  assert.equal(noCreds.success, false);
  assert.equal(noCreds.status, 401);
});

test("handleCursorAgentImageGeneration returns 501 when agentBin path is missing", async () => {
  __resetCursorAgentImageConcurrencyForTests();
  const result = await handleCursorAgentImageGeneration({
    model: "auto",
    provider: "cursor",
    providerConfig: { baseUrl: "agent://cursor-agent" },
    body: { prompt: "a lantern" },
    credentials: {
      accessToken: "crsr_test",
      providerSpecificData: { agentBin: "/nonexistent/cursor-agent-bin" },
    },
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 501);
  assert.match(String(result.error), /CURSOR_AGENT_BIN|agentBin/i);
});

/**
 * Minimal fake `spawn` that writes a tiny PNG to the out path embedded in the
 * prompt and exits 0 — exercises the success path without a real Cursor Agent.
 */
test("handleCursorAgentImageGeneration returns b64_json via injectable spawn", async () => {
  __resetCursorAgentImageConcurrencyForTests();
  const { writeFile, mkdir } = await import("node:fs/promises");
  const path = await import("node:path");

  const tinyPng = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  ]);

  const fakeSpawn = ((bin: string, args: string[]) => {
    assert.ok(bin, "agent bin required");
    const prompt = args[args.length - 1] || "";
    const marker = "Save the resulting image to exactly this path: ";
    const idx = prompt.indexOf(marker);
    assert.ok(idx >= 0, "prompt must contain out path");
    const after = prompt.slice(idx + marker.length);
    const end = after.indexOf(". When the file exists");
    assert.ok(end > 0, "prompt must end out path before DONE clause");
    const outPath = after.slice(0, end);
    const child = new EventEmitter() as EventEmitter & {
      stdout: EventEmitter;
      stderr: EventEmitter;
      kill: () => void;
    };
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.kill = () => undefined;
    queueMicrotask(async () => {
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, tinyPng);
      child.emit("close", 0);
    });
    return child;
  }) as unknown as typeof import("node:child_process").spawn;

  // Use an existing path so the preflight existsSync check passes; spawn is faked.
  const result = await handleCursorAgentImageGeneration({
    model: "auto",
    provider: "cursor",
    providerConfig: { baseUrl: "agent://cursor-agent" },
    body: { prompt: "a lantern in fog", size: "1024x1024", n: 1 },
    credentials: {
      accessToken: "crsr_test",
      providerSpecificData: { agentBin: process.execPath },
    },
    spawnImpl: fakeSpawn,
  });

  assert.equal(result.success, true);
  assert.ok(result.data?.data?.[0]?.b64_json);
  assert.equal(result.data.data[0].b64_json, tinyPng.toString("base64"));
});
