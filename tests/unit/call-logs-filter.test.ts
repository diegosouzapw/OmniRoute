import test from "node:test";
import assert from "node:assert/strict";

import { filterCallLogEntries } from "../../src/shared/utils/callLogsFilter";

const ollamaRow = {
  id: "a",
  comboName: "vivanta-ollama",
  model: "qwen2.5-coder:7b",
  provider: "ollama-local",
  status: 200,
};

const autoRow = {
  id: "b",
  comboName: "vivanta-auto",
  model: "grok-4.5",
  provider: "grok-cli",
  status: 200,
};

test("filterCallLogEntries: combo isolation — only rows from the filtered combo survive", () => {
  const result = filterCallLogEntries([ollamaRow, autoRow], {
    combo: "1",
    search: "vivanta-ollama",
  });
  assert.deepEqual(
    result.map((r) => r.id),
    ["a"]
  );
});

test("filterCallLogEntries: in-memory entry without a combo is excluded by a combo filter", () => {
  const memoryGrokRow = {
    id: "memory-grok",
    comboName: null,
    provider: "grok-cli",
    model: "grok-4.5",
    status: 0,
  };
  const result = filterCallLogEntries([memoryGrokRow, ollamaRow], { combo: "1" });
  assert.deepEqual(
    result.map((r) => r.id),
    ["a"]
  );
});

test("filterCallLogEntries: search is applied in addition to the combo flag (AND, not OR)", () => {
  const comboMatchingSearch = {
    id: "x",
    comboName: "vivanta-ollama",
    model: "qwen2.5-coder:7b",
    provider: "ollama-local",
    status: 200,
  };
  const comboNotMatchingSearch = {
    id: "y",
    comboName: "vivanta-ollama",
    model: "phi3.5:latest",
    provider: "ollama-local",
    status: 400,
  };
  const nonComboMatchingSearch = {
    id: "z",
    comboName: null,
    model: "qwen2.5-coder:7b",
    provider: "ollama-local",
    status: 200,
  };
  const result = filterCallLogEntries(
    [comboMatchingSearch, comboNotMatchingSearch, nonComboMatchingSearch],
    {
      combo: "1",
      search: "qwen",
    }
  );
  // x: combo flag AND search both match; y: combo flag yes, search no; z: search yes, combo flag no
  assert.deepEqual(
    result.map((r) => r.id),
    ["x"]
  );
});

test("filterCallLogEntries: correlationId filters in-memory rows without a combo", () => {
  const withCid = {
    id: "cid-row",
    comboName: null,
    model: "grok-4.5",
    correlationId: "corr-abc-123",
  };
  const withoutCid = { id: "no-cid", comboName: null, model: "grok-4.5", correlationId: null };
  const result = filterCallLogEntries([withCid, withoutCid], { correlationId: "corr-abc-123" });
  assert.deepEqual(
    result.map((r) => r.id),
    ["cid-row"]
  );
});

test("filterCallLogEntries: status filter applies to in-memory rows too", () => {
  const pending = { id: "p", comboName: null, status: 0, model: "grok-4.5" };
  const ok = { id: "o", comboName: null, status: 200, model: "grok-4.5" };
  const errored = { id: "e", comboName: null, status: 500, model: "grok-4.5" };

  assert.deepEqual(
    filterCallLogEntries([pending, ok, errored], { status: "ok" }).map((r) => r.id),
    ["o"]
  );
  assert.deepEqual(
    filterCallLogEntries([pending, ok, errored], { status: "error" }).map((r) => r.id),
    ["e"]
  );
  assert.deepEqual(
    filterCallLogEntries([pending, ok, errored], { status: "500" }).map((r) => r.id),
    ["e"]
  );
});

test("filterCallLogEntries: no relevant filter returns the input unchanged", () => {
  const rows = [ollamaRow, autoRow];
  assert.equal(filterCallLogEntries(rows, {}), rows);
});
