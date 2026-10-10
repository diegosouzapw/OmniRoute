/**
 * A Codex model id that already names its effort (gpt-6.1-sol-ultra,
 * gpt-6.1-sol-max) was fed back through the catalog variant builder because
 * the shared capability block carries supportedThinkingEfforts. The builder
 * appended another tier, so the combo picker offered gpt-6.1-sol-ultra-max.
 *
 * The base id keeps its variants. An id that already ends in a tier does not
 * grow a second one.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { appendSyncedEffortVariants } from "../../open-sse/utils/syncedEffortVariants.ts";

const TIERS = ["low", "medium", "high", "xhigh", "max"];

function codex(id: string) {
  return {
    id: `codex/${id}`,
    owned_by: "codex",
    root: id,
    name: id,
    supportedThinkingEfforts: TIERS,
    capabilities: { effort_tiers: TIERS },
  };
}

test("codex effort aliases are not given a second tier suffix", () => {
  const out = appendSyncedEffortVariants([
    codex("gpt-6.1-sol"),
    codex("gpt-6.1-sol-ultra"),
    codex("gpt-6.1-sol-max"),
  ]);
  const ids = out.map((model) => model.id);

  assert.ok(ids.includes("codex/gpt-6.1-sol-max"));
  assert.equal(
    ids.includes("codex/gpt-6.1-sol-ultra-max"),
    false,
    "ultra alias must not grow another tier"
  );
  assert.equal(
    ids.includes("codex/gpt-6.1-sol-max-low"),
    false,
    "max alias must not grow another tier"
  );
});
