import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const publicKeyDer = publicKey.export({ type: "spki", format: "der" });
process.env.RADAR_FEED_PUBKEY = publicKeyDer.toString("base64");

const fixturePath = path.resolve(import.meta.dirname!, "../../fixtures/radar-feed-canonical.json");
const fixtureBytes = fs.readFileSync(fixturePath);

function signBytes(bytes: Buffer): string {
  return crypto.sign(null, bytes, privateKey).toString("base64");
}

function mockResponse(body: Buffer, headers: Record<string, string> = {}): Response {
  return {
    ok: true,
    status: 200,
    headers: new Map(Object.entries(headers)),
    arrayBuffer: () =>
      Promise.resolve(body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)),
  } as unknown as Response;
}

const syncMod = await import("../../../src/lib/radar/sync.ts");

test("FIX6: oversized Content-Length avoids reading the body or touching cache", async () => {
  let arrayBufferCalled = false;
  const response = mockResponse(Buffer.from("irrelevant"), {
    "content-length": String(10 * 1024 * 1024 + 1),
  });
  const originalArrayBuffer = response.arrayBuffer.bind(response);
  (response as unknown as { arrayBuffer: () => Promise<ArrayBuffer> }).arrayBuffer = () => {
    arrayBufferCalled = true;
    return originalArrayBuffer();
  };

  let setCacheCalled = false;
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      setCacheCalled = true;
    },
    fetch: (() => Promise.resolve(response)) as unknown as typeof globalThis.fetch,
  });

  assert.deepEqual(result, { status: "too_large" });
  assert.equal(setCacheCalled, false);
  assert.equal(arrayBufferCalled, false);
});

test("FIX6: oversized streamed body without Content-Length leaves cache untouched", async () => {
  const oversized = Buffer.alloc(10 * 1024 * 1024 + 1, 0x41);
  let setCacheCalled = false;

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      setCacheCalled = true;
    },
    fetch: (() => Promise.resolve(mockResponse(oversized))) as unknown as typeof globalThis.fetch,
  });

  assert.deepEqual(result, { status: "too_large" });
  assert.equal(setCacheCalled, false);
});

test("FIX6: body within the 10MB cap proceeds normally", async () => {
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {},
    fetch: (() =>
      Promise.resolve(
        mockResponse(fixtureBytes, {
          "x-omniroute-feed-signature": signBytes(fixtureBytes),
        })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.notEqual(result.status, "too_large");
});
