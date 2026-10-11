import test from "node:test";
import assert from "node:assert/strict";

import { restoreIncomingOrder } from "../../open-sse/services/combo/rungOrder.ts";
import { failClosedAutoConfig } from "../../open-sse/services/autoCombo/failClosedPool.ts";

const t = (modelStr: string, connectionId: string | null = null) => ({
  kind: "model" as const,
  modelStr,
  connectionId,
});

test("restoreIncomingOrder keeps the ladder rung order over the score order", () => {
  // incoming = rung order (subscription -> free -> metered); scored = best score first
  const rung = [t("sub/a", "c1"), t("free/b", "c2"), t("paid/c", "c3")];
  const scored = [rung[2], rung[0], rung[1]];
  const out = restoreIncomingOrder(scored, rung);
  assert.deepEqual(
    out.map((x) => x.modelStr),
    ["sub/a", "free/b", "paid/c"]
  );
});

test("restoreIncomingOrder keeps unknown targets in relative score order after known ones", () => {
  const rung = [t("sub/a", "c1")];
  const scored = [t("x/new1", "n1"), rung[0], t("x/new2", "n2")];
  const out = restoreIncomingOrder(scored, rung);
  assert.deepEqual(
    out.map((x) => x.modelStr),
    ["sub/a", "x/new1", "x/new2"]
  );
});

test("only auto/thrifty marks the virtual combo to preserve rung order", () => {
  assert.equal(failClosedAutoConfig({ tier: "thrifty" }).preserveRungOrder, true);
  assert.equal(failClosedAutoConfig({ tier: "subscription" }).preserveRungOrder, undefined);
  assert.equal(failClosedAutoConfig({ tier: "fast" }).preserveRungOrder, undefined);
});
