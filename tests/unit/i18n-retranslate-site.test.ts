/**
 * `scripts/i18n/retranslate-site.mjs` — the site catalog retranslator
 * (omnirouteSite/lang/<code>.json vs lang/_source.en.json).
 *
 * `findSiteIdenticalKeys` is the pure selector behind it: the keys of a locale
 * catalog whose value is still a verbatim copy of the English source, outside
 * the allowlist (`scripts/i18n/untranslatable-site-keys.json`).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { findSiteIdenticalKeys } from "../../scripts/i18n/retranslate-site.mjs";

const source = {
  "hero.title": "Route every model",
  brand: "OmniRoute",
  cta: "Get started",
  n: "66 languages",
};

test("keys still equal to the English source are listed, allowlisted ones are not", () => {
  const target = {
    "hero.title": "Route every model",
    brand: "OmniRoute",
    cta: "Começar",
    n: "66 idiomas",
  };
  assert.deepEqual(findSiteIdenticalKeys(source, target, new Set(["brand"])), ["hero.title"]);
});

test("a key missing from the target is not an identical copy (that is a sync problem, not ours)", () => {
  assert.deepEqual(findSiteIdenticalKeys(source, { brand: "OmniRoute" }, new Set(["brand"])), []);
});

test("empty source strings are ignored", () => {
  assert.deepEqual(findSiteIdenticalKeys({ a: "" }, { a: "" }, new Set()), []);
});

test("the result is sorted and only string leaves count", () => {
  const src = { z: "Zulu", a: "Alpha", m: "Mike", obj: { nested: "x" } as unknown as string };
  const tgt = { z: "Zulu", a: "Alpha", m: "Mike", obj: { nested: "x" } };
  assert.deepEqual(findSiteIdenticalKeys(src, tgt, new Set()), ["a", "m", "z"]);
});

test("untranslatable-site-keys.json has the { keys: string[] } shape with unique keys", () => {
  const file = path.resolve(
    import.meta.dirname,
    "../../scripts/i18n/untranslatable-site-keys.json"
  );
  const allow = JSON.parse(readFileSync(file, "utf8")) as { description?: string; keys: string[] };
  assert.ok(Array.isArray(allow.keys), "keys must be an array");
  assert.ok(allow.keys.length > 0, "the allowlist must not be empty");
  assert.ok(
    allow.keys.every((k) => typeof k === "string" && k.trim() === k && k.length > 0),
    "every key is a trimmed non-empty string"
  );
  assert.equal(new Set(allow.keys).size, allow.keys.length, "no duplicated keys");
});
