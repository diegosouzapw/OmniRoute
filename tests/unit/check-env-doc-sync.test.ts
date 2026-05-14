import test from "node:test";
import assert from "node:assert/strict";

import {
  parseEnvExampleVars,
  parseEnvDocVars,
  runEnvDocSync,
} from "../../scripts/check/check-env-doc-sync.mjs";

test("parseEnvExampleVars: extracts uncommented assignments", () => {
  const text = `
JWT_SECRET=abc123
FOO_BAR=baz
  # SKIPPED_VAR=leading whitespace before hash is rejected
`;
  const vars = parseEnvExampleVars(text);
  assert.ok(vars.has("JWT_SECRET"));
  assert.ok(vars.has("FOO_BAR"));
  // The regex anchors `^#?` so leading whitespace before `#` prevents a match.
  assert.equal(vars.has("SKIPPED_VAR"), false);
});

test("parseEnvExampleVars: extracts commented examples", () => {
  const text = `
#OPTIONAL_KEY=value
# OPTIONAL_OTHER=value-with-space
ACTIVE=1
`;
  const vars = parseEnvExampleVars(text);
  assert.ok(vars.has("OPTIONAL_KEY"));
  assert.ok(vars.has("OPTIONAL_OTHER"));
  assert.ok(vars.has("ACTIVE"));
});

test("parseEnvExampleVars: ignores prose", () => {
  const text = `
# This file documents env vars. Don't put values here.
Some narrative paragraph mentions PORT and DATA_DIR in passing.
PORT=20128
`;
  const vars = parseEnvExampleVars(text);
  assert.deepEqual([...vars].sort(), ["PORT"]);
});

test("parseEnvDocVars: extracts SHOUTY_NAMES from inline backticks", () => {
  const md = "Set `FOO_BAR` to enable the thing. Defaults to `BAR_BAZ_QUX`.";
  const vars = parseEnvDocVars(md);
  assert.deepEqual([...vars].sort(), ["BAR_BAZ_QUX", "FOO_BAR"]);
});

test("parseEnvDocVars: ignores values like `7s` or two-letter codes", () => {
  const md = "TTL is `60s` and the type is `JSON`. Real var: `OMNIROUTE_TTL_MS`.";
  const vars = parseEnvDocVars(md);
  assert.deepEqual([...vars].sort(), ["JSON", "OMNIROUTE_TTL_MS"]);
});

test("runEnvDocSync: matched fixture passes", () => {
  const envExampleText = `
JWT_SECRET=secret
#OPTIONAL_VAR=value
ANOTHER_VAR=1
`;
  const envDocText = `
# Reference

| Variable | Default | Description |
| --- | --- | --- |
| \`JWT_SECRET\` | _(none)_ | required |
| \`OPTIONAL_VAR\` | _(unset)_ | optional |
| \`ANOTHER_VAR\` | 1 | enabled by default |
`;
  const codeVars = new Set(["JWT_SECRET", "OPTIONAL_VAR", "ANOTHER_VAR"]);
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars,
    ignore: new Set(),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, true);
  assert.deepEqual(result.problems.codeMissingEnv, []);
  assert.deepEqual(result.problems.envMissingDoc, []);
  assert.deepEqual(result.problems.docMissingEnv, []);
});

test("runEnvDocSync: drift in code is flagged", () => {
  const envExampleText = `JWT_SECRET=secret\n`;
  const envDocText = "| `JWT_SECRET` | _(none)_ | required |";
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars: new Set(["JWT_SECRET", "NEW_VAR"]),
    ignore: new Set(),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.problems.codeMissingEnv, ["NEW_VAR"]);
});

test("runEnvDocSync: drift in doc is flagged", () => {
  const envExampleText = `JWT_SECRET=secret\nNEW_VAR=value\n`;
  const envDocText = "| `JWT_SECRET` | _(none)_ | required |";
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars: new Set(["JWT_SECRET", "NEW_VAR"]),
    ignore: new Set(),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.problems.envMissingDoc, ["NEW_VAR"]);
});

test("runEnvDocSync: drift in env (doc-only var) is flagged", () => {
  const envExampleText = `JWT_SECRET=secret\n`;
  const envDocText = `
| \`JWT_SECRET\` | _(none)_ | required |
| \`OBSOLETE_VAR\` | _(unset)_ | docs-only legacy |
`;
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars: new Set(["JWT_SECRET"]),
    ignore: new Set(),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.problems.docMissingEnv, ["OBSOLETE_VAR"]);
});

test("runEnvDocSync: docOnlyAllowlist absolves doc-only entries", () => {
  const envExampleText = `JWT_SECRET=secret\n`;
  const envDocText = `
| \`JWT_SECRET\` | _(none)_ | required |
| \`LEGACY_ALIAS\` | _(unset)_ | documented but not in env.example |
`;
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars: new Set(["JWT_SECRET"]),
    ignore: new Set(),
    docOnlyAllowlist: new Set(["LEGACY_ALIAS"]),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, true);
  assert.deepEqual(result.problems.docMissingEnv, []);
});

test("runEnvDocSync: envOnlyAllowlist absolves env-only entries", () => {
  const envExampleText = `JWT_SECRET=secret\nFOO_BAR=bar\n`;
  const envDocText = "| `JWT_SECRET` | _(none)_ | required |";
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars: new Set(["JWT_SECRET", "FOO_BAR"]),
    ignore: new Set(),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(["FOO_BAR"]),
  });
  assert.equal(result.ok, true);
  assert.deepEqual(result.problems.envMissingDoc, []);
});

test("runEnvDocSync: ignore set skips a code-referenced var", () => {
  const envExampleText = `JWT_SECRET=secret\n`;
  const envDocText = "| `JWT_SECRET` | _(none)_ | required |";
  const result = runEnvDocSync({
    envExampleText,
    envDocText,
    codeVars: new Set(["JWT_SECRET", "PATH", "HOME"]),
    ignore: new Set(["PATH", "HOME"]),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, true);
});

test("repository contract is in sync (live data)", () => {
  // Uses the real .env.example, docs/ENVIRONMENT.md, and the bundled
  // allowlists. This is the same check that runs in pre-commit / CI.
  const result = runEnvDocSync();
  if (!result.ok) {
    const summary = JSON.stringify(result.problems, null, 2);
    assert.fail(`Env/docs contract drift detected:\n${summary}`);
  }
  assert.equal(result.ok, true);
});
