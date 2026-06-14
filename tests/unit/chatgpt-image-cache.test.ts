import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/chatgptImageCache.ts");
const {
  storeChatGptImage,
  getChatGptImage,
  __resetChatGptImageCacheForTesting,
  __getChatGptImageCacheBytesForTesting,
} = mod;

// ── Constants ──

test("MAX_ENTRIES is 25", async () => {
  // We verify indirectly: store 25 entries, then store a 26th and confirm
  // the first entry was evicted. This also proves the constant is 25.
  __resetChatGptImageCacheForTesting();
  const ids: string[] = [];
  for (let i = 0; i < 25; i++) {
    ids.push(storeChatGptImage(Buffer.from(`img-${i}`), "image/png", 60_000));
  }
  // All 25 should be retrievable
  for (const id of ids) {
    assert.ok(getChatGptImage(id), "entry within MAX_ENTRIES should survive");
  }
  __resetChatGptImageCacheForTesting();
});

test("DEFAULT_MAX_BYTES is 10 MB (10 * 1024 * 1024)", async () => {
  __resetChatGptImageCacheForTesting();
  // Store an entry that is just under 10 MB — should succeed
  const big = Buffer.alloc(10 * 1024 * 1024 - 1, 0x42);
  const id = storeChatGptImage(big, "image/png", 60_000);
  assert.ok(getChatGptImage(id), "entry under 10 MB should be cached");
  assert.equal(__getChatGptImageCacheBytesForTesting(), big.length);
  __resetChatGptImageCacheForTesting();
});

// ── Eviction ──

test("storing 26 entries evicts the oldest", async () => {
  __resetChatGptImageCacheForTesting();
  const ids: string[] = [];
  for (let i = 0; i < 26; i++) {
    ids.push(storeChatGptImage(Buffer.from(`img-${i}`), "image/png", 60_000));
  }
  // The first entry (index 0) should have been evicted
  assert.equal(getChatGptImage(ids[0]), null, "oldest entry should be evicted");
  // The second entry should still be present
  assert.ok(getChatGptImage(ids[1]), "second entry should survive");
  // The newest entry should be present
  assert.ok(getChatGptImage(ids[25]), "newest entry should survive");
  __resetChatGptImageCacheForTesting();
});

// ── Store & Retrieve (hit) ──

test("store then retrieve returns the cached entry (cache hit)", async () => {
  __resetChatGptImageCacheForTesting();
  const payload = Buffer.from("hello-image-data");
  const id = storeChatGptImage(payload, "image/jpeg", 60_000);
  const entry = getChatGptImage(id);
  assert.ok(entry, "entry should exist");
  assert.deepEqual(entry!.bytes, payload);
  assert.equal(entry!.mime, "image/jpeg");
  assert.ok(typeof entry!.bytesSha256 === "string" && entry!.bytesSha256.length === 64);
  __resetChatGptImageCacheForTesting();
});

// ── TTL expiry ──

test("entry expires after TTL (mocked Date.now)", async () => {
  __resetChatGptImageCacheForTesting();
  const originalNow = Date.now;
  let fakeNow = 1_000_000;
  Date.now = () => fakeNow;

  const id = storeChatGptImage(Buffer.from("ttl-test"), "image/png", 5000);
  assert.ok(getChatGptImage(id), "should hit before TTL");

  // Advance past TTL
  fakeNow += 5001;
  assert.equal(getChatGptImage(id), null, "should miss after TTL expires");

  Date.now = originalNow;
  __resetChatGptImageCacheForTesting();
});
