import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { after } from "node:test";
import { deflateSync, inflateSync } from "node:zlib";

const previousDataDir = process.env.DATA_DIR;
const previousEnabled = process.env.CREDENTIAL_REDACTION_ENABLED;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-13462-"));
process.env.DATA_DIR = dataDir;
process.env.CREDENTIAL_REDACTION_ENABLED = "true";
const { CredentialMaskerGuardrail, redactCredentials } =
  await import("../../src/lib/guardrails/credentialMasker.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  if (previousEnabled === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
  else process.env.CREDENTIAL_REDACTION_ENABLED = previousEnabled;
});

// Not a credential: these bytes deliberately create a regex collision in base64.
const marker = ["AI", "za"].join("") + "A".repeat(36);
const secret = "sk-proj-" + "x".repeat(24);
function crc32(bytes: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(name: string, data: Buffer): Buffer {
  const type = Buffer.from(name);
  const size = Buffer.alloc(4);
  size.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([type, data])));
  return Buffer.concat([size, type, data, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(1, 0);
ihdr.writeUInt32BE(1, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const pixels = Buffer.from([0, 255, 0, 0, 255]);
const png = Buffer.concat([
  Buffer.from("89504e470d0a1a0a", "hex"),
  chunk("IHDR", ihdr),
  chunk("raNd", Buffer.concat([Buffer.alloc(1), Buffer.from(marker, "base64")])),
  chunk("IDAT", deflateSync(pixels)),
  chunk("IEND", Buffer.alloc(0)),
]);
const encoded = png.toString("base64");
const url = "data:image/png;base64," + encoded;
const guardrail = new CredentialMaskerGuardrail();

test("13462: fixture has valid PNG chunks, pixels, and a synthetic credential collision", () => {
  assert.equal(png.length, 113);
  assert.ok(encoded.includes(marker));
  for (let offset = 8; offset < png.length;) {
    const size = png.readUInt32BE(offset);
    const typeAndData = png.subarray(offset + 4, offset + 8 + size);
    assert.equal(png.readUInt32BE(offset + 8 + size), crc32(typeAndData));
    if (typeAndData.subarray(0, 4).toString() === "IDAT") {
      assert.deepEqual(inflateSync(typeAndData.subarray(4)), pixels);
    }
    offset += size + 12;
  }
  // The text helper must continue to redact token-like text, including this string.
  assert.equal(redactCredentials(url).modified, true);
});

const cases = [
  {
    name: "Chat",
    image: { type: "image_url", image_url: { url, detail: secret } },
    expected: { type: "image_url", image_url: { url, detail: "[REDACTED:openai]" } },
  },
  {
    name: "Responses",
    image: { type: "input_image", image_url: url },
    expected: { type: "input_image", image_url: url },
  },
  {
    name: "Claude",
    image: {
      type: "image",
      source: { type: "base64", media_type: "image/png", data: encoded, note: secret },
    },
    expected: {
      type: "image",
      source: { type: "base64", media_type: "image/png", data: encoded, note: "[REDACTED:openai]" },
    },
  },
  {
    name: "Gemini",
    image: { inlineData: { mimeType: "image/png", data: encoded, note: secret } },
    expected: { inlineData: { mimeType: "image/png", data: encoded, note: "[REDACTED:openai]" } },
  },
  {
    name: "Gemini snake case",
    image: { inline_data: { mime_type: "image/png", data: encoded } },
    expected: { inline_data: { mime_type: "image/png", data: encoded } },
  },
];
for (const entry of cases) {
  for (const stage of ["preCall", "postCall"] as const) {
    test(`13462: ${stage} preserves ${entry.name} image bytes and masks neighboring text`, async () => {
      const payload = {
        content: [entry.image],
        text: secret,
        headers: { Authorization: "Bearer short" },
      };
      const snapshot = structuredClone(payload);
      const result = await guardrail[stage](payload, {});
      const actual = stage === "preCall" ? result?.modifiedPayload : result?.modifiedResponse;
      assert.deepEqual(actual, {
        content: [entry.expected],
        text: "[REDACTED:openai]",
        headers: { Authorization: "Bearer [REDACTED:auth_header]" },
      });
      assert.deepEqual(payload, snapshot, "caller-owned payload is not mutated");
    });
  }
}

test("13462: a mock strict upstream receives the same PNG after the guardrail", async () => {
  const input = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: secret },
          { type: "image_url", image_url: { url } },
        ],
      },
    ],
  };
  const result = await guardrail.preCall(input, {});
  const outgoing = (result?.modifiedPayload ?? input) as typeof input;
  const serialized = JSON.stringify(outgoing);
  const upstream = JSON.parse(serialized) as typeof input;
  const image = upstream.messages[0].content[1].image_url!.url;
  const data = image.slice(image.indexOf(",") + 1);
  assert.match(data, /^[A-Za-z0-9+/]*={0,2}$/);
  assert.deepEqual(Buffer.from(data, "base64"), png);
  assert.equal(upstream.messages[0].content[0].text, "[REDACTED:openai]");
});

test("13462: generic fields, remote URLs, malformed media and text remain scanned", async () => {
  const payload = {
    data: encoded,
    url,
    image_url: url,
    text: url,
    blocks: [
      { type: "text", image_url: url },
      { type: "input_image", image_url: "https://example.com/" + marker },
      { type: "input_image", image_url: url + "!" },
      { type: "image_url", image_url: { url: "data:text/plain;base64," + encoded } },
      { source: { type: "base64", media_type: "image/png", data: encoded } },
      { type: "image", source: { type: "text", media_type: "image/png", data: encoded } },
      { inlineData: { mimeType: "text/plain", data: encoded } },
      { inlineData: { mimeType: "image/png", data: encoded + "!" } },
      { inlineData: { mimeType: "image/png\n", data: encoded } },
      { type: "input_image", image_url: "data:image/png;base64\n," + encoded },
      { inlineData: { mimeType: "image/png", data: encoded + "====" } },
    ],
  };
  const result = await guardrail.preCall(payload, {});
  assert.ok(result?.modifiedPayload);
  assert.ok(!JSON.stringify(result.modifiedPayload).includes(marker));
});

test("13462: shared image objects do not grant exemptions to generic references", async () => {
  const shared = { url };
  const payload = { image: { type: "image_url", image_url: shared }, generic: shared };
  const result = await guardrail.preCall(payload, {});
  const actual = result?.modifiedPayload as typeof payload;
  assert.equal(actual.image.image_url.url, url);
  assert.ok(!actual.generic.url.includes(marker));
  assert.equal(shared.url, url);
});

test("13462: image-only payload is unchanged without unnecessary cloning", async () => {
  const result = await guardrail.preCall({ input: [{ type: "input_image", image_url: url }] }, {});
  assert.equal(result?.modifiedPayload, undefined);
});

test("13462: disabled guardrail preserves images and text", async () => {
  process.env.CREDENTIAL_REDACTION_ENABLED = "false";
  try {
    const payload = { input: [{ type: "input_image", image_url: url }], text: secret };
    assert.equal((await guardrail.preCall(payload, {}))?.modifiedPayload, undefined);
    assert.equal((await guardrail.postCall(payload, {}))?.modifiedResponse, undefined);
    assert.equal(payload.text, secret);
  } finally {
    process.env.CREDENTIAL_REDACTION_ENABLED = "true";
  }
});
