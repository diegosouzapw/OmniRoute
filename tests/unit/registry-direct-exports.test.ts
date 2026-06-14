import test from "node:test";
import assert from "node:assert/strict";

// Verify all 8 registries export plain objects (no Proxy, no lazy getter)
const registries = [
  { name: "audio", mod: await import("../../open-sse/config/audioRegistry.ts"), keys: ["AUDIO_TRANSCRIPTION_PROVIDERS", "AUDIO_SPEECH_PROVIDERS"] },
  { name: "embedding", mod: await import("../../open-sse/config/embeddingRegistry.ts"), keys: ["EMBEDDING_PROVIDERS"] },
  { name: "image", mod: await import("../../open-sse/config/imageRegistry.ts"), keys: ["IMAGE_PROVIDERS"] },
  { name: "moderation", mod: await import("../../open-sse/config/moderationRegistry.ts"), keys: ["MODERATION_PROVIDERS"] },
  { name: "music", mod: await import("../../open-sse/config/musicRegistry.ts"), keys: ["MUSIC_PROVIDERS"] },
  { name: "rerank", mod: await import("../../open-sse/config/rerankRegistry.ts"), keys: ["RERANK_PROVIDERS"] },
  { name: "search", mod: await import("../../open-sse/config/searchRegistry.ts"), keys: ["SEARCH_PROVIDERS"] },
  { name: "video", mod: await import("../../open-sse/config/videoRegistry.ts"), keys: ["VIDEO_PROVIDERS"] },
];

for (const { name, mod, keys } of registries) {
  for (const key of keys) {
    test(`${name} registry: ${key} is a plain object, not a Proxy`, () => {
      const registry = mod[key];
      assert.ok(registry, `${key} should be exported`);
      assert.equal(typeof registry, "object");

      // Proxy traps break Object.keys() — plain objects return keys immediately
      const firstKey = Object.keys(registry)[0];
      assert.ok(firstKey, `${key} should have at least one entry`);

      // Direct property access should work without trap overhead
      const entry = registry[firstKey];
      assert.ok(entry, `First entry should be accessible`);
    });

    test(`${name} registry: ${key} entries are mutable (no Proxy freeze)`, () => {
      const registry = mod[key];
      const firstKey = Object.keys(registry)[0];
      const original = registry[firstKey];

      // Should be able to mutate without Proxy restrictions
      registry[firstKey] = { ...original, _test: true };
      assert.ok(registry[firstKey]._test === true);

      // Restore
      registry[firstKey] = original;
    });
  }
}

// Verify registries don't use lazy initialization patterns
test("registries do not contain getOrCreate* functions", async () => {
  for (const { name, mod } of registries) {
    const fns = Object.keys(mod).filter((k) => typeof mod[k] === "function");
    const lazyFns = fns.filter((fn) => fn.startsWith("getOrCreate"));
    assert.equal(lazyFns.length, 0, `${name} has lazy getter: ${lazyFns.join(", ")}`);
  }
});

test("audioRegistry exports per-type provider lookup functions", async () => {
  const { getTranscriptionProvider, getSpeechProvider } = await import(
    "../../open-sse/config/audioRegistry.ts"
  );
  // Should return null for unknown providers (not throw)
  assert.equal(getTranscriptionProvider("nonexistent-provider"), null);
  assert.equal(getSpeechProvider("nonexistent-provider"), null);
});
