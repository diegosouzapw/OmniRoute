import test from "node:test";
import assert from "node:assert/strict";
import {
  PROVIDER_TEST_CHUNK_SIZE,
  buildProviderTestTargets,
  chunkItems,
  collectWorkingModelsToSelect,
  formatProviderTestResults,
  hasWorkingTestResults,
  isProviderTestEntryWorking,
  listVisibleProviderIds,
  resolveConnectionIdForProvider,
  toggleProviderSelection,
} from "../../../src/shared/components/modelSelectModalHelpers.ts";

test("resolveConnectionIdForProvider: returns the first matching connection id", () => {
  assert.equal(
    resolveConnectionIdForProvider("ollama-cloud", [
      { provider: "openai", id: "other" },
      { provider: "ollama-cloud", id: "conn-1" },
    ]),
    "conn-1"
  );
});

test("resolveConnectionIdForProvider: coerces numeric connection ids to strings", () => {
  assert.equal(
    resolveConnectionIdForProvider("antigravity", [{ provider: "antigravity", id: 42 }]),
    "42"
  );
});

test("resolveConnectionIdForProvider: returns undefined when no match", () => {
  assert.equal(
    resolveConnectionIdForProvider("missing", [{ provider: "openai", id: "x" }]),
    undefined
  );
  assert.equal(resolveConnectionIdForProvider("", [{ provider: "openai", id: "x" }]), undefined);
  assert.equal(resolveConnectionIdForProvider("openai", null), undefined);
});

test("toggleProviderSelection: adds and removes immutably", () => {
  const empty = new Set<string>();
  const withOne = toggleProviderSelection(empty, "openai");
  assert.deepEqual([...withOne], ["openai"]);
  assert.equal(empty.size, 0);

  const without = toggleProviderSelection(withOne, "openai");
  assert.deepEqual([...without], []);
  assert.deepEqual([...withOne], ["openai"]);
});

test("buildProviderTestTargets: only includes selected providers with visible models", () => {
  const targets = buildProviderTestTargets({
    selectedProviderIds: ["openai", "empty-provider", "missing"],
    groups: [
      [
        "openai",
        [
          { value: "openai/gpt-4o", id: "gpt-4o" },
          { value: "openai/gpt-4o-mini", id: "gpt-4o-mini" },
        ],
      ],
      ["empty-provider", []],
      ["antigravity", [{ value: "antigravity/flash", id: "flash" }]],
    ],
    activeProviders: [
      { provider: "openai", id: "conn-openai" },
      { provider: "antigravity", id: "conn-ag" },
    ],
  });

  assert.equal(targets.length, 1);
  assert.deepEqual(targets[0], {
    providerId: "openai",
    connectionId: "conn-openai",
    modelIds: ["openai/gpt-4o", "openai/gpt-4o-mini"],
  });
});

test("buildProviderTestTargets: falls back to model id when value is missing", () => {
  const targets = buildProviderTestTargets({
    selectedProviderIds: ["local"],
    groups: [["local", [{ id: "llama3" }, { value: null, id: "from-id" }]]],
  });
  assert.deepEqual(targets[0]?.modelIds, ["llama3", "from-id"]);
});

test("buildProviderTestTargets: returns [] when nothing is selected", () => {
  assert.deepEqual(
    buildProviderTestTargets({
      selectedProviderIds: [],
      groups: [["openai", [{ value: "openai/gpt-4o" }]]],
    }),
    []
  );
});

test("chunkItems: splits into PROVIDER_TEST_CHUNK_SIZE by default", () => {
  const items = [1, 2, 3, 4, 5, 6, 7];
  assert.deepEqual(chunkItems(items), [[1, 2, 3], [4, 5, 6], [7]]);
  assert.equal(PROVIDER_TEST_CHUNK_SIZE, 3);
});

test("isProviderTestEntryWorking: treats ok and slow as working", () => {
  assert.equal(isProviderTestEntryWorking({ status: "ok" }), true);
  assert.equal(isProviderTestEntryWorking({ status: "slow" }), true);
  assert.equal(isProviderTestEntryWorking({ status: "error" }), false);
  assert.equal(isProviderTestEntryWorking(null), false);
});

test("formatProviderTestResults: mirrors provider-page result copy", () => {
  assert.equal(formatProviderTestResults(3, 5), "3 of 5 models working");
  assert.equal(formatProviderTestResults(Number.NaN, -2), "0 of 0 models working");
});

test("collectWorkingModelsToSelect: returns ok models not already added", () => {
  const models = [
    { value: "openai/gpt-4o", id: "gpt-4o" },
    { value: "openai/gpt-4o-mini", id: "gpt-4o-mini" },
    { value: "openai/o1", id: "o1" },
  ];
  const selected = collectWorkingModelsToSelect({
    models,
    modelTestStatus: {
      "openai/gpt-4o": "ok",
      "openai/gpt-4o-mini": "error",
      "openai/o1": "ok",
    },
    addedModelValues: ["openai/gpt-4o"],
  });
  assert.deepEqual(
    selected.map((m) => m.value),
    ["openai/o1"]
  );
});

test("collectWorkingModelsToSelect: alreadyAdded returns working models in the combo", () => {
  const models = [
    { value: "openai/gpt-4o", id: "gpt-4o" },
    { value: "openai/o1", id: "o1" },
  ];
  const selected = collectWorkingModelsToSelect({
    models,
    modelTestStatus: { "openai/gpt-4o": "ok", "openai/o1": "ok" },
    addedModelValues: ["openai/gpt-4o"],
    alreadyAdded: true,
  });
  assert.deepEqual(
    selected.map((m) => m.value),
    ["openai/gpt-4o"]
  );
});

test("hasWorkingTestResults: true only when at least one ok", () => {
  assert.equal(hasWorkingTestResults({ a: "error" }), false);
  assert.equal(hasWorkingTestResults({ a: "error", b: "ok" }), true);
  assert.equal(hasWorkingTestResults({}), false);
  assert.equal(hasWorkingTestResults(null), false);
});

test("listVisibleProviderIds: reads keys from a group record", () => {
  assert.deepEqual(listVisibleProviderIds({ openai: {}, antigravity: {} }), [
    "openai",
    "antigravity",
  ]);
  assert.deepEqual(
    listVisibleProviderIds([
      ["openai", []],
      ["local", []],
    ]),
    ["openai", "local"]
  );
});
