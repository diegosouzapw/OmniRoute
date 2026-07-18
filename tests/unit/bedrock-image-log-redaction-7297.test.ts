import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7297-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { protectPayloadForLog } = await import("../../src/lib/logPayloads.ts");
const bedrockExecutor = await import("../../open-sse/executors/bedrock.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function bedrockConverseBodyWithImages(nImages: number, imageBytes: number) {
  const content: unknown[] = [];
  for (let i = 0; i < nImages; i++) {
    const raw = crypto.randomBytes(imageBytes);
    content.push({
      type: "image_url",
      image_url: { url: `data:image/png;base64,${raw.toString("base64")}` },
    });
  }
  content.push({ type: "text", text: "describe these images" });

  const chatBody = {
    model: "us.anthropic.claude-opus-4-8",
    messages: [{ role: "user", content }],
  };

  // Same call BedrockExecutor.execute() makes right before
  // prl.captureCurrentProviderRequest(url, headers, transformedBody, ...).
  return bedrockExecutor.openAIToBedrockConverse("us.anthropic.claude-opus-4-8", chatBody);
}

test("#7297 protectPayloadForLog stays fast on a 3-image Bedrock Converse body", () => {
  const transformedBody = bedrockConverseBodyWithImages(3, 1_000_000);

  const firstImageBlock = (
    transformedBody as { messages: Array<{ content: Array<Record<string, unknown>> }> }
  ).messages[0].content[0] as { image?: { source?: { bytes?: unknown } } };
  assert.ok(firstImageBlock.image?.source?.bytes instanceof Uint8Array);

  const start = Date.now();
  const result = protectPayloadForLog(transformedBody);
  const elapsedMs = Date.now() - start;

  assert.ok(
    elapsedMs < 500,
    `protectPayloadForLog took ${elapsedMs}ms for a 3-image request — it is walking every ` +
      `decoded image byte as an object key instead of treating image.source.bytes as an ` +
      `opaque buffer (see #7297)`
  );

  const redactedBytes = (
    result as { messages: Array<{ content: Array<Record<string, unknown>> }> }
  ).messages[0].content[0] as { image?: { source?: { bytes?: unknown } } };
  assert.ok(
    !(redactedBytes.image?.source?.bytes instanceof Uint8Array) &&
      !Array.isArray(redactedBytes.image?.source?.bytes),
    "binary bytes must be replaced with an opaque placeholder, not expanded into per-byte keys"
  );
});
