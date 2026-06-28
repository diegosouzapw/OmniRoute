import test from "node:test";
import assert from "node:assert/strict";
import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";

const GIT_DIFF = `diff --git a/x.ts b/x.ts
index 111..222 100644
--- a/x.ts
+++ b/x.ts
@@ -1,3 +1,3 @@
-const a = 1;
+const a = 2;
 const b = 3;`;

test("enableRenderers default false ⇒ baseline unchanged", () => {
  const off = processRtkText(GIT_DIFF, { command: "git diff", config: { enabled: true } });
  const explicitOff = processRtkText(GIT_DIFF, {
    command: "git diff",
    config: { enabled: true, enableRenderers: false },
  });
  assert.equal(off.text, explicitOff.text); // renderer não roda por default
});
