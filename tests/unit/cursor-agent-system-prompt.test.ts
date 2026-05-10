import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  encodeAgentRunRequest,
  decodeKvServerEvent,
} from "../../open-sse/utils/cursorAgentProtobuf";

// ─── Wire-format helpers ───────────────────────────────────────────────────

function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}
function varintField(field: number, value: number): Buffer {
  return Buffer.concat([tag(field, 0), v(value)]);
}

// ─── encodeAgentRunRequest with system prompt ──────────────────────────────

test("encodeAgentRunRequest with systemPrompt populates blobStore", () => {
  const blobStore = new Map<string, Buffer>();
  const buf = encodeAgentRunRequest({
    modelId: "auto",
    userText: "hi",
    systemPrompt: "be brief",
    blobStore,
  });
  // The blobStore should have one entry (the system prompt blob)
  assert.equal(blobStore.size, 1);
  // Key is hex of sha256({role:"system", content:"be brief"})
  const expectedJson = JSON.stringify({ role: "system", content: "be brief" });
  const expectedHash = crypto
    .createHash("sha256")
    .update(Buffer.from(expectedJson, "utf8"))
    .digest("hex");
  assert.ok(blobStore.has(expectedHash));
  // The stored bytes should match the JSON
  assert.equal(blobStore.get(expectedHash)!.toString("utf8"), expectedJson);
  // The blob hash (32 bytes) should appear in the encoded request body
  const hashBytes = Buffer.from(expectedHash, "hex");
  assert.ok(buf.includes(hashBytes), "blob id embedded in CSS");
});

test("encodeAgentRunRequest without systemPrompt leaves blobStore empty", () => {
  const blobStore = new Map<string, Buffer>();
  encodeAgentRunRequest({ modelId: "auto", userText: "hi", blobStore });
  assert.equal(blobStore.size, 0);
});

test("encodeAgentRunRequest with systemPrompt but no blobStore is a no-op for blobs", () => {
  // The system prompt is silently dropped if blobStore isn't provided.
  // This matches the existing pre-Phase-7 behavior.
  const buf = encodeAgentRunRequest({
    modelId: "auto",
    userText: "hi",
    systemPrompt: "be brief",
  });
  // No crash; the system prompt isn't embedded (no blob to reference).
  assert.ok(buf.length > 0);
});

test("encodeAgentRunRequest with multi-message system prompt joins them", () => {
  const blobStore = new Map<string, Buffer>();
  encodeAgentRunRequest({
    modelId: "auto",
    userText: "hi",
    systemPrompt: "first instruction\n\nsecond instruction",
    blobStore,
  });
  assert.equal(blobStore.size, 1);
  const [stored] = [...blobStore.values()];
  const parsed = JSON.parse(stored.toString("utf8"));
  assert.equal(parsed.role, "system");
  assert.equal(parsed.content, "first instruction\n\nsecond instruction");
});

// ─── KV server message decoder ─────────────────────────────────────────────

test("decodeKvServerEvent recognizes get_blob_args", () => {
  // KvServerMessage { id (1): 7, get_blob_args (2): { blob_id (1): bytes } }
  const blobId = Buffer.from("01020304".repeat(8), "hex");
  const getBlobArgs = lenPrefixed(1, blobId);
  const ksm = Buffer.concat([varintField(1, 7), lenPrefixed(2, getBlobArgs)]);
  const asm = lenPrefixed(4, ksm); // ASM_KV_SERVER_MESSAGE = 4
  const event = decodeKvServerEvent(asm);
  assert.deepEqual(event, { kind: "kv_get_blob", kvId: 7, blobId, requestMetadata: null });
});

test("decodeKvServerEvent recognizes set_blob_args with data", () => {
  // SetBlobArgs { blob_id (1): bytes, blob_data (2): bytes }
  const blobId = Buffer.from("aa".repeat(32), "hex");
  const blobData = Buffer.from("hello world", "utf8");
  const setBlobArgs = Buffer.concat([lenPrefixed(1, blobId), lenPrefixed(2, blobData)]);
  const ksm = Buffer.concat([varintField(1, 5), lenPrefixed(3, setBlobArgs)]);
  const asm = lenPrefixed(4, ksm);
  const event = decodeKvServerEvent(asm);
  if (event?.kind !== "kv_set_blob") throw new Error("expected kv_set_blob");
  assert.equal(event.kvId, 5);
  assert.ok(event.blobId.equals(blobId));
  assert.ok(event.blobData.equals(blobData));
  assert.equal(event.requestMetadata, null);
});

test("decodeKvServerEvent returns null when AgentServerMessage has no kv frame", () => {
  // ASM with only an interaction_update (field 1)
  const tdu = lenPrefixed(1, Buffer.from("hi"));
  const iu = lenPrefixed(1, tdu);
  const asm = lenPrefixed(1, iu);
  assert.equal(decodeKvServerEvent(asm), null);
});
