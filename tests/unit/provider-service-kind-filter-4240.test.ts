/**
 * #4240 — Category (serviceKind) filter on /dashboard/providers.
 *
 * filterConfiguredProviderEntries gains a `serviceKindFilter` argument that keeps
 * only providers whose serviceKinds — declared OR registry-derived (image/video/
 * music/tts/stt/embedding) — include the selected kind, composing with the
 * existing configured-only / free / search predicates.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { filterConfiguredProviderEntries } =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
const { getProviderServiceKinds } = await import("../../src/lib/providers/serviceKindIndex.ts");

type Entry = {
  providerId: string;
  provider: { name: string; serviceKinds?: string[] };
  stats: { total: number };
  displayAuthType: "apikey";
  toggleAuthType: "apikey";
};

function entry(providerId: string, name: string, total: number): Entry {
  return {
    providerId,
    provider: { name },
    stats: { total },
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  };
}

// vertex → video/music, haiper → video, openai → image/embedding, suno → music
// (all registry-derived; none declare serviceKinds explicitly here)
const ENTRIES: Entry[] = [
  entry("vertex", "Vertex AI", 1),
  entry("haiper", "Haiper", 0),
  entry("openai", "OpenAI", 1),
  entry("suno", "Suno", 1),
];

function ids(list: Entry[]): string[] {
  return list.map((e) => e.providerId).sort();
}

test("serviceKindFilter keeps only providers whose (registry-derived) kinds include it", () => {
  const out = filterConfiguredProviderEntries(ENTRIES, false, "", false, "", "video");
  assert.deepEqual(ids(out), ["haiper", "vertex"]);
});

test("a registry-derived kind is resolved even with no declared serviceKinds (#4240)", () => {
  assert.ok(getProviderServiceKinds("vertex", undefined).includes("video"));
  assert.ok(getProviderServiceKinds("openai", undefined).includes("image"));
  // a pure declared kind still works through the union
  assert.ok(getProviderServiceKinds("openai", ["llm"]).includes("llm"));
});

test("serviceKindFilter composes with showConfiguredOnly (intersection)", () => {
  // video → {vertex, haiper}; configured-only drops haiper (stats.total === 0)
  const out = filterConfiguredProviderEntries(ENTRIES, true, "", false, "", "video");
  assert.deepEqual(ids(out), ["vertex"]);
});

test("serviceKindFilter composes with the search query (intersection)", () => {
  // video → {vertex, haiper}; search "haip" narrows to haiper only
  const out = filterConfiguredProviderEntries(ENTRIES, false, "haip", false, "", "video");
  assert.deepEqual(ids(out), ["haiper"]);
});

test("a null/undefined serviceKindFilter leaves the list unchanged", () => {
  const out = filterConfiguredProviderEntries(ENTRIES, false, "", false, "", null);
  assert.deepEqual(ids(out), ids(ENTRIES));
  const out2 = filterConfiguredProviderEntries(ENTRIES, false, "", false, "");
  assert.deepEqual(ids(out2), ids(ENTRIES));
});

test("serviceKindFilter=music keeps only music providers", () => {
  const out = filterConfiguredProviderEntries(ENTRIES, false, "", false, "", "music");
  assert.deepEqual(ids(out), ["suno", "vertex"]);
});
