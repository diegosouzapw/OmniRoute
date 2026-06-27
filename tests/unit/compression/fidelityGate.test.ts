import test from "node:test";
import assert from "node:assert/strict";
import { checkFidelity } from "../../../open-sse/services/compression/fidelityGate.ts";

const ON = { enabled: true };

test("protected-tokens: dropping a URL/path/ident fails", () => {
  const input = "see https://api.example.com/v2 and src/lib/db/core.ts and getDbInstance()";
  const out = "see and and";
  const r = checkFidelity(input, out, ON);
  assert.equal(r.passed, false);
  assert.equal(r.failedInvariant, "protected-tokens");
});

test("protected-tokens: preserving them passes", () => {
  const input = "call getDbInstance() at src/lib/db/core.ts";
  const out = "call getDbInstance() at src/lib/db/core.ts (terse)";
  assert.equal(checkFidelity(input, out, ON).passed, true);
});

test("numeric: a dropped/altered number fails", () => {
  assert.equal(
    checkFidelity("14 passed, 1 failed", "4 passed, 1 failed", ON).failedInvariant,
    "numeric"
  );
  assert.equal(checkFidelity("14 passed, 1 failed", "14 passed, 1 failed (ok)", ON).passed, true);
});

test("json-keys: dropping keys below threshold fails", () => {
  // Output preserves all input numbers but renames all keys → numeric passes, json-keys fails
  const input = JSON.stringify({ packages: 1, audited: 2, vulnerabilities: 0, funding: 3 });
  const out = '{"renamed_pkg":1,"aud":2,"vulns":0,"f":3}';
  assert.equal(checkFidelity(input, out, ON).failedInvariant, "json-keys");
});

test("json-keys: all keys + numbers preserved passes", () => {
  // keys alpha/beta survive AND numbers 1/2 survive → json-keys (and numeric/tokens) all pass
  assert.equal(
    checkFidelity('{"alpha":1,"beta":2}', '{"alpha":1,"beta":2} (compacted)', ON).passed,
    true
  );
});

test("diff-hunks: dropping a @@ header fails", () => {
  const input = "@@ -1,3 +1,4 @@\n-old\n+new";
  const out = "-old\n+new";
  assert.equal(checkFidelity(input, out, ON).failedInvariant, "diff-hunks");
});

test("diff-hunks: header preserved passes", () => {
  assert.equal(checkFidelity("@@ -1,3 +1,4 @@\n-old", "@@ -1,3 +1,4 @@\n+new", ON).passed, true);
});

test("fail-open + disabled-config defaults", () => {
  assert.equal(checkFidelity("", "", ON).passed, true);
  assert.equal(
    checkFidelity("port 8080", "port", { enabled: true, checkNumericIntegrity: false }).passed,
    true
  );
});
