import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  mergeStateUpdates,
  parseStateText,
  writeStateAtomic,
} from "../../scripts/i18n/run-translation.mjs";

const FULL = {
  sources: {
    "README.md": { source_hash: "a", locales: { de: { target_hash: "1" } } },
    "docs/guides/USER_GUIDE.md": { source_hash: "b", locales: { de: { target_hash: "2" } } },
  },
};

test("parseStateText rejects an empty or truncated file instead of starting fresh", () => {
  // A reader that caught the file mid-write saw "" or a JSON prefix; treating that as
  // "no state" made the run write back only its own entries (2026-09-24: 153 → 1 sources).
  assert.throws(() => parseStateText(""), /state/);
  assert.throws(() => parseStateText('{"sources": {"README.md": {"source_'), /state/);
  assert.throws(() => parseStateText("[]"), /state/);
});

test("parseStateText accepts a well-formed state", () => {
  assert.deepEqual(parseStateText(JSON.stringify(FULL)), FULL);
});

test("an unreadable state at save time merges into the run's snapshot, not into {}", () => {
  const touched = [
    { rel: "README.md", locale: "it", sourceHash: "a", record: { target_hash: "9" } },
  ];
  const out = mergeStateUpdates(null, touched, structuredClone(FULL));
  assert.equal(Object.keys(out.sources).length, 2);
  assert.equal(out.sources["README.md"].locales.it.target_hash, "9");
  assert.equal(out.sources["docs/guides/USER_GUIDE.md"].locales.de.target_hash, "2");
});

test("writeStateAtomic replaces the file in one step and leaves no temp file", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "i18n-state-"));
  const file = path.join(dir, ".i18n-state.json");
  writeFileSync(file, JSON.stringify({ sources: {} }));
  await writeStateAtomic(file, FULL);
  assert.deepEqual(JSON.parse(readFileSync(file, "utf8")), FULL);
  assert.deepEqual(readdirSync(dir), [".i18n-state.json"]);
});
