import test from "node:test";
import assert from "node:assert/strict";
import {
  parseBulkApiKeys,
  resolveBulkNameCollisions,
  BULK_API_KEY_MAX_LINES,
} from "../../src/shared/utils/bulkApiKeyParser.ts";

test("parses name|apiKey lines", () => {
  const { entries, warnings } = parseBulkApiKeys("prod|sk-1\nstaging|sk-2");
  assert.equal(warnings.length, 0);
  assert.deepEqual(entries, [
    { name: "prod", apiKey: "sk-1", lineNumber: 1 },
    { name: "staging", apiKey: "sk-2", lineNumber: 2 },
  ]);
});

test("auto-names lines without pipe (Key 1, Key 2, ...)", () => {
  const { entries } = parseBulkApiKeys("sk-a\nsk-b\nsk-c");
  assert.deepEqual(
    entries.map((e) => e.name),
    ["Key 1", "Key 2", "Key 3"]
  );
});

test("auto-name index only advances on unnamed lines", () => {
  const { entries } = parseBulkApiKeys("named|sk-1\nsk-2\nnamed2|sk-3\nsk-4");
  assert.deepEqual(
    entries.map((e) => e.name),
    ["named", "Key 1", "named2", "Key 2"]
  );
});

test("apiKey may contain | — only first separator counts", () => {
  const { entries } = parseBulkApiKeys("key1|sk-with|pipe|inside");
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, "key1");
  assert.equal(entries[0].apiKey, "sk-with|pipe|inside");
});

test("skips blank lines and # comments", () => {
  const { entries } = parseBulkApiKeys("# header\nsk-1\n\n# inline comment\nsk-2");
  assert.equal(entries.length, 2);
  assert.equal(entries[0].lineNumber, 2);
  assert.equal(entries[1].lineNumber, 5);
});

test("handles CRLF line endings", () => {
  const { entries } = parseBulkApiKeys("prod|sk-1\r\nstaging|sk-2\r\n");
  assert.equal(entries.length, 2);
});

test("warns on empty apiKey after pipe", () => {
  const { entries, warnings } = parseBulkApiKeys("prod|\nstaging|sk-2");
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, "staging");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Line 1.*empty apiKey/);
});

test("empty name falls back to auto-name", () => {
  const { entries } = parseBulkApiKeys("|sk-1");
  assert.equal(entries[0].name, "Key 1");
  assert.equal(entries[0].apiKey, "sk-1");
});

test("trims whitespace around name and apiKey", () => {
  const { entries } = parseBulkApiKeys("  prod  |  sk-1  ");
  assert.equal(entries[0].name, "prod");
  assert.equal(entries[0].apiKey, "sk-1");
});

test("empty input returns empty entries", () => {
  const { entries, warnings } = parseBulkApiKeys("");
  assert.equal(entries.length, 0);
  assert.equal(warnings.length, 0);
});

test("only whitespace returns empty entries", () => {
  const { entries } = parseBulkApiKeys("   \n\t\n  \n");
  assert.equal(entries.length, 0);
});

test("input exceeding cap is truncated with warning", () => {
  const lines = Array.from({ length: BULK_API_KEY_MAX_LINES + 5 }, (_, i) => `sk-${i}`);
  const { entries, warnings } = parseBulkApiKeys(lines.join("\n"));
  assert.equal(entries.length, BULK_API_KEY_MAX_LINES);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /only the first/);
});

// #2587 — resolveBulkNameCollisions: guards against createProviderConnection's
// name-based upsert silently replacing an existing connection when bulk-add
// auto-naming ("Key 1", "Key 2", ...) restarts from 1 and collides with a
// name already saved for the provider.
test("resolveBulkNameCollisions: no-op when nothing collides", () => {
  const entries = [{ name: "Key 1" }, { name: "Key 2" }];
  const out = resolveBulkNameCollisions(entries, ["Prod"]);
  assert.deepEqual(
    out.map((e) => e.name),
    ["Key 1", "Key 2"]
  );
});

test("resolveBulkNameCollisions: renames an auto-named entry colliding with an existing connection", () => {
  // Provider already has "Key 1" saved; a fresh bulk parse restarts auto-naming
  // at "Key 1" too. Without renaming, createProviderConnection would upsert
  // into the existing row instead of inserting.
  const entries = [{ name: "Key 1" }, { name: "Key 2" }];
  const out = resolveBulkNameCollisions(entries, ["Key 1"]);
  assert.deepEqual(
    out.map((e) => e.name),
    ["Key 2", "Key 3"]
  );
  // Never reuses an existing name.
  assert.ok(!out.some((e) => e.name === "Key 1"));
});

test("resolveBulkNameCollisions: renames a custom name colliding with an existing connection", () => {
  const entries = [{ name: "Prod" }];
  const out = resolveBulkNameCollisions(entries, ["Prod"]);
  assert.deepEqual(out.map((e) => e.name), ["Prod 1"]);
});

test("resolveBulkNameCollisions: dedupes two identical custom names within the same batch", () => {
  // Two "Prod|apiKey" lines pasted in the same batch previously collided with
  // EACH OTHER (custom names get no auto-index), so the second entry would
  // upsert into the first instead of inserting a second connection.
  const entries = [{ name: "Prod" }, { name: "Prod" }];
  const out = resolveBulkNameCollisions(entries, []);
  const names = out.map((e) => e.name);
  assert.equal(new Set(names).size, names.length);
  assert.deepEqual(names, ["Prod", "Prod 1"]);
});

test("resolveBulkNameCollisions: preserves non-name fields on renamed entries", () => {
  const entries = [{ name: "Key 1", apiKey: "sk-new" }];
  const out = resolveBulkNameCollisions(entries, ["Key 1"]);
  assert.equal(out[0].apiKey, "sk-new");
  assert.equal(out[0].name, "Key 2");
});

test("resolveBulkNameCollisions: name comparison is case-insensitive", () => {
  const entries = [{ name: "key 1" }];
  const out = resolveBulkNameCollisions(entries, ["KEY 1"]);
  assert.equal(out[0].name, "key 2");
});

test("resolveBulkNameCollisions: tolerates non-array existingNames", () => {
  const entries = [{ name: "Key 1" }];
  const out = resolveBulkNameCollisions(entries, null);
  assert.equal(out[0].name, "Key 1");
});
