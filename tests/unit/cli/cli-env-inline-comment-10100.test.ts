import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseEnvValue } from "../../../bin/cli/utils/parseEnvValue.mjs";

// #10100 — the .env loader kept inline comments inside values, so the shipped
// `QUOTA_STORE_DRIVER=sqlite  # sqlite | redis` line produced the literal value
// "sqlite              # sqlite | redis". Consumers compare with `===`, so a
// user annotating `QUOTA_STORE_DRIVER=redis  # ...` silently got SQLite with no
// warning (the existing warning lives inside the `redis` branch).

test("an unquoted inline comment is stripped", () => {
  assert.equal(parseEnvValue("sqlite              # sqlite | redis"), "sqlite");
  assert.equal(parseEnvValue("redis   # sqlite | redis"), "redis");
  assert.equal(parseEnvValue("value\t# tab-separated comment"), "value");
});

test("a '#' with no preceding whitespace is part of the value", () => {
  // dotenv semantics — passwords and fragments must survive.
  assert.equal(parseEnvValue("pass#word"), "pass#word");
  assert.equal(
    parseEnvValue("https://example.com/page#section"),
    "https://example.com/page#section"
  );
});

test("quoted values are returned verbatim, including '#'", () => {
  assert.equal(parseEnvValue('"sqlite # not a comment"'), "sqlite # not a comment");
  assert.equal(parseEnvValue("'a # b'"), "a # b");
  // A comment may still follow a closing quote.
  assert.equal(parseEnvValue('"sqlite"   # sqlite | redis'), "sqlite");
});

test("plain values are unchanged", () => {
  assert.equal(parseEnvValue("sqlite"), "sqlite");
  assert.equal(parseEnvValue("  spaced  "), "spaced");
  assert.equal(parseEnvValue(""), "");
});

test(".env.example no longer annotates QUOTA_STORE_DRIVER inline", () => {
  const example = fs.readFileSync(path.resolve(".env.example"), "utf8");
  const line = example.split("\n").find((l) => l.startsWith("QUOTA_STORE_DRIVER="));
  assert.ok(line, "QUOTA_STORE_DRIVER should still be documented");
  assert.equal(line, "QUOTA_STORE_DRIVER=sqlite");
  // Guard the whole file against reintroducing the pattern on unquoted values.
  const offenders = example
    .split("\n")
    .filter((l) => /^[A-Z0-9_]+=[^"'#\n]*\s#/.test(l))
    .slice(0, 5);
  assert.deepEqual(offenders, [], `unquoted inline comments would land in the value: ${offenders}`);
});
