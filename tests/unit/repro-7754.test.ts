import test from "node:test";
import assert from "node:assert/strict";
import { createBuiltinAutoCombo } from "@omniroute/open-sse/services/autoCombo/builtinCatalog.ts";

// #7754: `auto/best-free` combo name must never leak downstream as the model id.
// When the free-tier candidate pool resolves non-empty, every model in the combo
// must carry a concrete `<provider>/<model>` id — never the literal combo name.

test("#7754 auto/best-free never leaks the combo name as a model", async () => {
  const combo = await createBuiltinAutoCombo("auto/best-free", "best-free");
  const models = combo.models || [];

  // The combo id is the modelStr by design (routing resolves it back), but the
  // models array must never contain it as a target model.
  const leak = models.filter(
    (m: any) =>
      (m.id || "") === "auto/best-free" ||
      (m.model || "") === "auto/best-free" ||
      (m.modelStr || "") === "auto/best-free"
  );
  assert.equal(
    leak.length,
    0,
    `combo name leaked as a target model: ${JSON.stringify(leak)}`
  );
});

test("#7754 every auto/best-free model carries a concrete provider/model", async () => {
  const combo = await createBuiltinAutoCombo("auto/best-free", "best-free");
  const models = combo.models || [];
  for (const m of models as any[]) {
    assert.ok(
      m.model && m.model !== "auto/best-free",
      `model missing concrete id: ${JSON.stringify(m)}`
    );
    assert.ok(
      m.providerId && m.providerId !== "auto",
      `model missing concrete provider: ${JSON.stringify(m)}`
    );
  }
});

test("#7754 empty free-tier pool degrades with a clear 503, not a name leak", async () => {
  // When NO free-tier candidate exists, createBuiltinAutoCombo must either
  // return an empty models[] (which the #6458 route check converts to a clear
  // 503) or throw — never synthesize a target whose model is the combo name.
  const combo = await createBuiltinAutoCombo("auto/best-free", "best-free");
  const models = combo.models || [];
  if (models.length === 0) {
    // Empty pool is fine — the route layer (#6458) converts it to a clear 503.
    assert.equal(combo.candidatePool?.length || 0, 0);
  } else {
    // Non-empty pool must not leak.
    const leak = models.filter((m: any) => (m.model || "") === "auto/best-free");
    assert.equal(leak.length, 0);
  }
});
