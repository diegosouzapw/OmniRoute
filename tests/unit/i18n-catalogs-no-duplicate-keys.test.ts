/**
 * Regression guard: no i18n catalog (dashboard `src/i18n/messages/*.json`, CLI
 * `bin/cli/locales/*.json`) may declare the same key twice inside one object.
 *
 * `JSON.parse` silently keeps the LAST copy, so a duplicated key never fails a
 * parse, a coverage gate, prettier or a focused test — it only shows up as a
 * translation that "does not update" or as a diff that grows on every merge.
 * The 2026-09-15 batch merges left `featureFlagProxySkipRecentlyFailedDescription`
 * twice in 59 locales (a scripted keep-both conflict resolution concatenated the
 * key both PRs carried). This test reads the raw text, not the parsed object.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const CATALOG_DIRS = ["src/i18n/messages", "bin/cli/locales"];

interface ObjectFrame {
  type: "obj";
  keys: Set<string>;
  expectKey: boolean;
  lastKey: string;
  path: string[];
}
interface ArrayFrame {
  type: "arr";
  path: string[];
}
type Frame = ObjectFrame | ArrayFrame;

/** Returns the dotted paths of every key declared more than once in its object. */
export function findDuplicateKeys(text: string): string[] {
  const dups: string[] = [];
  const stack: Frame[] = [];
  let i = 0;
  const n = text.length;

  const readString = (): string => {
    // text[i] is the opening quote; escapes are kept raw — identity only matters here
    let j = i + 1;
    let out = "";
    while (j < n) {
      const c = text[j];
      if (c === "\\") {
        out += c + text[j + 1];
        j += 2;
        continue;
      }
      if (c === '"') break;
      out += c;
      j++;
    }
    i = j + 1;
    return out;
  };

  const childPath = (): string[] => {
    const parent = stack[stack.length - 1];
    if (!parent) return [];
    return parent.type === "obj" ? [...parent.path, parent.lastKey] : [...parent.path, "[]"];
  };

  while (i < n) {
    const c = text[i];
    if (c === '"') {
      const s = readString();
      const top = stack[stack.length - 1];
      if (top && top.type === "obj" && top.expectKey) {
        if (top.keys.has(s)) dups.push([...top.path, s].join("."));
        top.keys.add(s);
        top.expectKey = false;
        top.lastKey = s;
      }
      continue;
    }
    if (c === "{") {
      stack.push({ type: "obj", keys: new Set(), expectKey: true, lastKey: "", path: childPath() });
    } else if (c === "[") {
      stack.push({ type: "arr", path: childPath() });
    } else if (c === "}" || c === "]") {
      stack.pop();
    } else if (c === ",") {
      const top = stack[stack.length - 1];
      if (top && top.type === "obj") top.expectKey = true;
    }
    i++; // colons, whitespace and primitive values carry no key information
  }
  return dups;
}

test("findDuplicateKeys reports repeated keys per object and nothing else", () => {
  assert.deepEqual(findDuplicateKeys('{"a": 1, "a": 2}'), ["a"]);
  assert.deepEqual(
    findDuplicateKeys('{"a": {"x": 1}, "b": {"x": 1}, "c": ["x", "x"], "d": "a"}'),
    []
  );
  assert.deepEqual(findDuplicateKeys('{"a": {"x": 1, "x": 2}}'), ["a.x"]);
  assert.deepEqual(findDuplicateKeys('{"k": "v", "k": "v"}'), ["k"]);
  assert.deepEqual(findDuplicateKeys('{"esc\\"aped": 1, "esc\\"aped": 2}'), ['esc\\"aped']);
  assert.deepEqual(findDuplicateKeys('{"n": [{"a": 1}, {"a": 1}]}'), []);
});

for (const dir of CATALOG_DIRS) {
  test(`${dir}: no catalog declares the same key twice in one object`, () => {
    const files = readdirSync(path.join(ROOT, dir))
      .filter((f) => f.endsWith(".json"))
      .sort();
    assert.ok(files.length > 0, `no catalogs found under ${dir}`);
    const offenders: string[] = [];
    for (const f of files) {
      const dups = [...new Set(findDuplicateKeys(readFileSync(path.join(ROOT, dir, f), "utf8")))];
      if (dups.length > 0) offenders.push(`${f}: ${dups.join(", ")}`);
    }
    assert.deepEqual(
      offenders,
      [],
      `duplicated keys — JSON.parse keeps only the last copy:\n${offenders.join("\n")}`
    );
  });
}
