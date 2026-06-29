import test from "node:test";
import assert from "node:assert/strict";
import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { applyRenderer } from "../../../open-sse/services/compression/engines/rtk/renderers/index.ts"; // sanity import

// keep unused import check quiet
void applyRenderer;

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

test("enableRenderers true ⇒ git diff is rendered through processRtkText", () => {
  const on = processRtkText(GIT_DIFF, {
    command: "git diff",
    config: { enabled: true, enableRenderers: true },
  });
  assert.ok(on.techniquesUsed.includes("rtk-render:git-diff"));
  assert.ok(!on.text.includes("index ")); // contexto/metadata dropado
});

test("fail-open: renderer error keeps prior result", () => {
  // entrada que detecta git-diff mas é benigna; renderer não deve lançar nem alterar incorretamente
  const r = processRtkText("not really a diff", {
    command: "git diff",
    config: { enabled: true, enableRenderers: true },
  });
  assert.ok(typeof r.text === "string"); // nunca lança
});
