import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import {
  acknowledgeProviderRisk,
  isRiskAcknowledged,
  readRiskAcknowledgedMap,
  RISK_ACKNOWLEDGED_STORAGE_KEY,
} from "../../src/app/(dashboard)/dashboard/providers/hooks/useRiskAcknowledged.ts";

class MapLocalStorage implements Storage {
  private readonly data = new Map<string, string>();

  get length(): number {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
  }

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

beforeEach(() => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: new MapLocalStorage(),
  });
});

test("empty localStorage returns acknowledged: false", () => {
  assert.deepEqual(readRiskAcknowledgedMap(), {});
  assert.equal(isRiskAcknowledged("claude"), false);
});

test("invalid JSON falls back gracefully", () => {
  globalThis.localStorage.setItem(RISK_ACKNOWLEDGED_STORAGE_KEY, "{invalid");

  assert.deepEqual(readRiskAcknowledgedMap(), {});
  assert.equal(isRiskAcknowledged("claude"), false);
});

test("acknowledge() persists and returns acknowledged: true on re-read", () => {
  acknowledgeProviderRisk("claude");

  assert.equal(globalThis.localStorage.getItem(RISK_ACKNOWLEDGED_STORAGE_KEY), '{"claude":true}');
  assert.equal(isRiskAcknowledged("claude"), true);
});

test("different providerId returns correct isolated state", () => {
  globalThis.localStorage.setItem(
    RISK_ACKNOWLEDGED_STORAGE_KEY,
    JSON.stringify({ claude: true, codex: true })
  );

  assert.equal(isRiskAcknowledged("claude"), true);
  assert.equal(isRiskAcknowledged("codex"), true);
  assert.equal(isRiskAcknowledged("qoder"), false);
});

test("acknowledgment of one provider does not affect another", () => {
  acknowledgeProviderRisk("claude");

  assert.deepEqual(readRiskAcknowledgedMap(), { claude: true });
  assert.equal(isRiskAcknowledged("codex"), false);
});
