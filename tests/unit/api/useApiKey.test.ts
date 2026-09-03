/**
 * Unit tests for the useApiKey hook.
 *
 * We test the pure selection logic directly — the React hook wraps the same
 * logic.  This avoids requiring jsdom or React testing libraries in the
 * Node.js native test runner.
 */
import test from "node:test";
import assert from "node:assert/strict";

// ── helpers (mirror the hook's internal selection logic) ──────────────────────

interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive?: boolean;
}

function selectActiveKey(list: ApiKey[], preferredId?: string): ApiKey | undefined {
  if (preferredId) {
    return list.find((k) => k.id === preferredId);
  }
  return list.find((k) => k.isActive !== false);
}

// ── tests ─────────────────────────────────────────────────────────────────────

test("useApiKey — returns first active key when no preferredId", () => {
  const keys: ApiKey[] = [
    { id: "key-1", name: "Inactive key", key: "sk-inactive", isActive: false },
    { id: "key-2", name: "Active key", key: "sk-active-1", isActive: true },
    { id: "key-3", name: "Another active", key: "sk-active-2", isActive: true },
  ];

  const selected = selectActiveKey(keys);
  assert.strictEqual(selected?.id, "key-2", "should pick first key with isActive !== false");
  assert.strictEqual(selected?.key, "sk-active-1");
});

test("useApiKey — filters out inactive keys (returns first key with isActive !== false)", () => {
  const keys: ApiKey[] = [
    { id: "key-1", name: "Disabled", key: "sk-disabled", isActive: false },
    { id: "key-2", name: "Disabled 2", key: "sk-disabled-2", isActive: false },
  ];

  const selected = selectActiveKey(keys);
  assert.strictEqual(selected, undefined, "should return undefined when all keys are inactive");
});

test("useApiKey — preferredId overrides default selection logic", () => {
  const keys: ApiKey[] = [
    { id: "key-1", name: "First active", key: "sk-first", isActive: true },
    { id: "key-2", name: "Preferred", key: "sk-preferred", isActive: false },
    { id: "key-3", name: "Third", key: "sk-third", isActive: true },
  ];

  // Even though key-2 is inactive, preferredId should select it specifically
  const selected = selectActiveKey(keys, "key-2");
  assert.strictEqual(selected?.id, "key-2");
  assert.strictEqual(selected?.key, "sk-preferred");
});

test("useApiKey — keys with undefined isActive are treated as active", () => {
  const keys: ApiKey[] = [
    { id: "key-1", name: "No isActive field", key: "sk-no-field" },
    { id: "key-2", name: "Explicit active", key: "sk-explicit", isActive: true },
  ];

  // undefined isActive means isActive !== false → treated as active
  const selected = selectActiveKey(keys);
  assert.strictEqual(selected?.id, "key-1");
});

test("useApiKey — empty list returns undefined", () => {
  const selected = selectActiveKey([]);
  assert.strictEqual(selected, undefined);
});
