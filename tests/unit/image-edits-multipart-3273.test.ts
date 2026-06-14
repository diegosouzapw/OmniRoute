import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fetch as undiciFetch } from "undici";

// #3273: POST /v1/images/edits to a custom OpenAI-compatible provider forwarded an EMPTY
// model. Root cause: handleOpenAIImageEdit built a global `FormData`, but in production
// `globalThis.fetch` is patched with node_modules/undici's fetch, whose `FormData` class
// differs from `globalThis.FormData` — so undici serialized it as the string
// "[object FormData]" (text/plain), dropping every field including `model`.
// This test reproduces that exact condition by routing through undici's fetch.

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-img-3273-"));

const { handleOpenAIImageEdit } = await import("../../open-sse/handlers/imageGeneration.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test("#3273 /v1/images/edits forwards model as real multipart (undici-patched fetch)", async () => {
  const captured = { contentType: "", body: "" };
  const server = http.createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => {
      captured.contentType = req.headers["content-type"] || "";
      captured.body = Buffer.concat(chunks).toString("utf8");
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ data: [{ url: "https://example.com/out.png" }] }));
    });
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const addr = server.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;

  const originalFetch = globalThis.fetch;
  globalThis.fetch = undiciFetch as unknown as typeof globalThis.fetch;
  try {
    await handleOpenAIImageEdit({
      model: "gpt-image-2",
      provider: "customopenai",
      credentials: { apiKey: "sk-test", providerSpecificData: { baseUrl: `http://127.0.0.1:${port}` } },
      prompt: "make it blue",
      imageBytes: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
      imageMime: "image/png",
    });
  } finally {
    globalThis.fetch = originalFetch;
    server.close();
  }

  assert.match(
    captured.contentType,
    /multipart\/form-data/,
    `upstream must receive multipart, got "${captured.contentType}"`
  );
  assert.ok(captured.body.includes('name="model"'), "multipart must contain a model field");
  assert.ok(captured.body.includes("gpt-image-2"), "model value must reach upstream (not empty)");
  assert.ok(captured.body.includes('name="prompt"'), "prompt field must be present");
  assert.ok(captured.body.includes('name="image"'), "image part must be present");
});

test.after(() => {
  try {
    resetDbInstance();
  } catch {
    /* ignore */
  }
  try {
    fs.rmSync(process.env.DATA_DIR as string, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
