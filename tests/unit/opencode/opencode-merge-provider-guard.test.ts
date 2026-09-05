// `mergeOpenCodeConfig` guarded the root against a non-object but not the
// `provider` branch it spreads one level down. Spreading a non-object does not
// throw, it splays the value into index keys, so an existing config with a
// malformed `provider` was rewritten into nonsense instead of being rejected:
//
//   provider: ["a", "b"]  ->  { "0": "a", "1": "b", omniroute: {...} }
//   provider: "oops"      ->  { "0": "o", "1": "o", "2": "p", "3": "s", ... }
//
// Its sibling `mergeOpenCodeConfigText` throws on the same input
// ("Can not add index to parent of type array"), so the two disagreed on what a
// malformed config means.
import test from "node:test";
import assert from "node:assert/strict";

const { mergeOpenCodeConfig, mergeOpenCodeConfigText } =
  await import("../../../src/shared/services/opencodeConfig.ts");

const INPUT = {
  baseUrl: "http://localhost:20128/v1",
  apiKey: "sk_test_opencode",
  model: "claude-sonnet-4-5-thinking",
};

for (const [label, provider] of [
  ["an array", ["a", "b"]],
  ["a string", "oops"],
  ["a number", 7],
  ["null", null],
] as const) {
  test(`mergeOpenCodeConfig drops a provider block that is ${label}`, () => {
    const merged = mergeOpenCodeConfig({ provider } as never, INPUT);

    assert.deepEqual(
      Object.keys(merged.provider),
      ["omniroute"],
      `a provider block that is ${label} must not be splayed into index keys`
    );
    assert.equal(merged.provider.omniroute.options.baseURL, "http://localhost:20128/v1");
  });
}

test("mergeOpenCodeConfig still preserves sibling providers", () => {
  // The guard must only reject non-objects, never a legitimate provider map.
  const merged = mergeOpenCodeConfig(
    { provider: { custom: { name: "Custom Provider" }, other: { name: "Other" } } } as never,
    INPUT
  );

  assert.deepEqual(Object.keys(merged.provider).sort(), ["custom", "omniroute", "other"]);
  assert.equal(merged.provider.custom.name, "Custom Provider");
});

test("mergeOpenCodeConfig still guards the root itself", () => {
  for (const existing of [["a"], "oops", 7, null, undefined]) {
    const merged = mergeOpenCodeConfig(existing as never, INPUT);
    assert.deepEqual(Object.keys(merged.provider), ["omniroute"]);
    assert.equal(merged.$schema, "https://opencode.ai/config.json");
  }
});

test("mergeOpenCodeConfigText keeps refusing the same malformed input", () => {
  // Pinning the sibling's behaviour: the object variant now drops the bad
  // block, the text variant still refuses to touch the file. Both are safe;
  // neither corrupts.
  for (const text of ['{"provider": ["a","b"]}', '{"provider": "oops"}']) {
    assert.throws(() => mergeOpenCodeConfigText(text, INPUT));
  }
});
