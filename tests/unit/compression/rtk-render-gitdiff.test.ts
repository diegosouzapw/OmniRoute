import test from "node:test";
import assert from "node:assert/strict";
import { renderGitDiff } from "../../../open-sse/services/compression/engines/rtk/renderers/gitDiff.ts";

const det = {
  type: "git-diff",
  command: "git diff",
  confidence: 1,
  category: "git",
  matchedPatterns: [],
};

test("keeps file headers, hunks and +/- changes; drops context", () => {
  const input = `diff --git a/x.ts b/x.ts
index 111..222 100644
--- a/x.ts
+++ b/x.ts
@@ -1,3 +1,3 @@
-const a = 1;
+const a = 2;
 const b = 3;`;
  const r = renderGitDiff(input, det);
  assert.equal(r.changed, true);
  assert.ok(r.text.includes("diff --git a/x.ts b/x.ts"));
  assert.ok(r.text.includes("@@ -1,3 +1,3 @@"));
  assert.ok(r.text.includes("-const a = 1;"));
  assert.ok(r.text.includes("+const a = 2;"));
  assert.ok(!r.text.includes("index 111..222"));
  assert.ok(!r.text.includes("--- a/x.ts"));
  assert.ok(!r.text.includes(" const b = 3;")); // contexto dropado
});

test("no hunks ⇒ no-op", () => {
  const r = renderGitDiff("just some text\nno diff here", det);
  assert.equal(r.changed, false);
});
