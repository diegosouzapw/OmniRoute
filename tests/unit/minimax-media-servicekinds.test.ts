import test from "node:test";
import assert from "node:assert/strict";

// Regression guard: media providers surface in the dashboard via registry-derived
// serviceKinds.
//
// Root cause this fixes: `/dashboard/media-providers/[kind]` listed a provider only
// if it hand-declared `serviceKinds` in providers.ts. ~48 providers were wired into
// the audio/video/music/image/embedding registries (backend works) but declared no
// serviceKinds, so every media page was empty. The fix derives media membership from
// the registries (single source of truth) and unions it with declared serviceKinds.
//
// MiniMax was the flagged case: its international endpoint serves TTS/video/music, the
// China variant (minimax-cn) has no media registry entries.

const { getRegistryMediaKinds, resolveProviderServiceKinds, REGISTRY_MEDIA_KINDS } =
  await import("../../open-sse/config/mediaServiceKinds.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

test("minimax (international) derives tts/video/music from the registries", () => {
  const kinds = getRegistryMediaKinds("minimax").sort();
  assert.deepEqual(kinds, ["music", "tts", "video"]);
});

test("minimax-cn derives no media kinds (China endpoint has no media registry entries)", () => {
  assert.deepEqual(getRegistryMediaKinds("minimax-cn"), []);
});

test("representative media providers derive the expected kinds", () => {
  // Each pair: provider id -> at least these kinds must be derived.
  const cases: Record<string, string[]> = {
    elevenlabs: ["tts"],
    deepgram: ["stt", "tts"],
    suno: ["music"],
    udio: ["music"],
    runwayml: ["video"],
    openai: ["embedding", "image", "stt", "tts"],
    cohere: ["embedding", "stt"],
  };
  for (const [id, expected] of Object.entries(cases)) {
    const derived = getRegistryMediaKinds(id);
    for (const kind of expected) {
      assert.ok(derived.includes(kind as never), `${id} should derive ${kind}; got ${derived.join(",")}`);
    }
  }
});

test("resolveProviderServiceKinds unions declared kinds with derived media kinds", () => {
  // A provider with a declared non-media kind keeps it AND gains derived media kinds.
  const merged = resolveProviderServiceKinds("minimax", ["llm"]);
  for (const expected of ["llm", "tts", "video", "music"]) {
    assert.ok(merged.includes(expected), `expected ${expected} in ${merged.join(",")}`);
  }
  // De-dupes when declared overlaps derived.
  const veo = resolveProviderServiceKinds("veoaifree-web", ["video"]);
  assert.equal(veo.filter((k) => k === "video").length, 1);
});

test("media listing filter surfaces minimax where the old declared-only filter missed it", () => {
  const cfg = AI_PROVIDERS as Record<string, { id: string; serviceKinds?: string[] }>;

  // OLD behavior (the bug): filter by declared serviceKinds only.
  const oldListFor = (kind: string) =>
    Object.values(cfg)
      .filter((p) => (p.serviceKinds ?? []).includes(kind))
      .map((p) => p.id);

  // NEW behavior (the fix): union declared with registry-derived kinds — mirrors page.tsx.
  const newListFor = (kind: string) =>
    Object.values(cfg)
      .filter((p) => resolveProviderServiceKinds(p.id, p.serviceKinds).includes(kind))
      .map((p) => p.id);

  for (const kind of ["tts", "video", "music"]) {
    assert.ok(!oldListFor(kind).includes("minimax"), `precondition (bug): old filter missed minimax under ${kind}`);
    assert.ok(newListFor(kind).includes("minimax"), `fix: minimax now listed under ${kind}`);
    assert.ok(!newListFor(kind).includes("minimax-cn"), `minimax-cn must not appear under ${kind}`);
  }

  // The fix is systemic, not minimax-only: many providers were invisible before.
  assert.ok(oldListFor("tts").length < newListFor("tts").length, "fix surfaces additional tts providers");
});

test("ocr is a registry-backed media kind and mistral derives it", () => {
  assert.ok(
    (REGISTRY_MEDIA_KINDS as readonly string[]).includes("ocr"),
    "REGISTRY_MEDIA_KINDS should include ocr once the OCR registry is wired"
  );
  assert.ok(
    getRegistryMediaKinds("mistral").includes("ocr" as never),
    "mistral should derive the ocr media kind from OCR_PROVIDERS"
  );
  const merged = resolveProviderServiceKinds("mistral", ["llm"]);
  assert.ok(merged.includes("ocr"), `expected ocr in ${merged.join(",")}`);
});

test("derived kinds are always within the known media-kind set", () => {
  for (const id of Object.keys(AI_PROVIDERS)) {
    for (const kind of getRegistryMediaKinds(id)) {
      assert.ok(
        (REGISTRY_MEDIA_KINDS as readonly string[]).includes(kind),
        `${id} derived unknown kind ${kind}`
      );
    }
  }
});
