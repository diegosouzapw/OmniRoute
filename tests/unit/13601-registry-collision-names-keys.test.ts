// #13601.1: modelMetadataRegistry case-insensitive key collisions must name
// BOTH colliding keys so the operator can tell which upstream entries clash
// (e.g. `Kimi-K2.6` vs `kimi-k2.6` as route keys). First-seen-wins stays.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13601-collision-"));

const { findInsensitive } = await import("../../src/lib/modelMetadataRegistry.ts");

function captureWarns(fn: () => void): string[] {
  const messages: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    messages.push(args.map(String).join(" "));
  };
  try {
    fn();
  } finally {
    console.warn = original;
  }
  return messages;
}

test("#13601.1: collision warning names both keys, not just the normalized form", () => {
  const warns = captureWarns(() => {
    // "KIMI-K2.6" matches no exact key, forcing the lowercase-index path.
    findInsensitive({ "Kimi-K2.6": "upper", "kimi-k2.6": "lower" }, "KIMI-K2.6");
  });
  assert.equal(warns.length, 1);
  assert.ok(warns[0].includes("Kimi-K2.6"), `warning must name first key: ${warns[0]}`);
  assert.ok(warns[0].includes("kimi-k2.6"), `warning must name second key: ${warns[0]}`);
});

test("#13601.1: collision resolution stays deterministic (first-seen wins)", () => {
  const obj = { "Kimi-K2.6": "upper", "kimi-k2.6": "lower" };
  const warns = captureWarns(() => {
    assert.equal(findInsensitive(obj, "KIMI-K2.6"), "upper");
    assert.equal(findInsensitive(obj, "kImI-k2.6"), "upper");
  });
  assert.equal(warns.length, 1);
});
