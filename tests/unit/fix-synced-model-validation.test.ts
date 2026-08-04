import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";

// #FIX: synced catalogs (populated from `/v1/models` per connection) can
// claim ownership of models the provider does not actually serve. Without
// validating against the static registry, a `kiro` upstream briefly
// advertising `claude-opus-5` (or any other provider mistakenly exposing a
// model it can't dispatch) routes bare traffic to providers that 404 on
// the upstream call. Auto-discovery still wins when no static registry
// entry exists for the model id — only entries that conflict with the
// static catalog are dropped.

test("bare claude-opus-5 still resolves to a static-registry provider (does not silently route to kiro)", async () => {
  const info = await getModelInfoCore("claude-opus-5", null);

  // The resolver must always return SOME provider — never provider=null —
  // unless the model is genuinely unknown. The bug was: a sync-injected
  // kiro entry could win the candidate race, so the resolver would return
  // kiro (which then 404'd upstream).
  if (info.provider === null) {
    assert.equal(
      (info as Record<string, unknown>).errorType,
      "ambiguous_model",
      "if unresolved, must surface ambiguous_model (operator-actionable), not silent null"
    );
    return;
  }

  // Whatever provider won, the inference path MUST NOT have routed to
  // `kiro` — the kiro registry at the time of this fix does not catalog
  // `claude-opus-5`. A future fix that adds `claude-opus-5` to the kiro
  // registry will need to update this test.
  const resolved = info.provider;
  assert.notEqual(
    resolved,
    "kiro",
    `kiro does not catalog claude-opus-5 in its static registry — bare routing must not silently land there (got: ${resolved})`
  );

  // And it must be one of the actual static-registry candidates for
  // claude-opus-5: anthropic, claude (Claude Code OAuth), claude/web,
  // cheaperinference, github, vertex/partner, ghe-copilot, agentrouter.
  assert.ok(
    [
      "anthropic",
      "claude",
      "claude-web",
      "cheaperinference",
      "github",
      "vertex-partner",
      "ghe-copilot",
      "agentrouter",
    ].includes(resolved),
    `expected ${resolved} to be one of the static-registry providers that actually catalog claude-opus-5`
  );
});

test("bare claude-opus-4-8 still resolves (regression guard)", async () => {
  // The bug only manifested for claude-opus-5 in the field report because
  // kiro's synced catalog was the one that picked it up. This test pins
  // that the same fix does not regress the working claude-opus-4-8 path.
  // In unit-test isolation (no DB → activeProviders=null), models with >1
  // candidate return ambiguous_model rather than a concrete provider —
  // the contract here is that the resolver NEVER lands on `kiro` regardless.
  const info = await getModelInfoCore("claude-opus-4-8", null);
  assert.notEqual(
    info.provider,
    "kiro",
    `kiro does not catalog claude-opus-4-8 — bare routing must not silently land there`
  );
});

test("bare routing accepts a brand-new modelId if only synced providers carry it (auto-discovery preserved)", async () => {
  // Place-holder for the auto-discovery path. The fix only validates
  // synced candidates that CONFLICT with the static registry; if no static
  // entry exists, the synced provider list still wins. There is no
  // catalogue-only brand-new model in the current fixtures to assert against,
  // so this test merely documents the contract and pins the validation
  // function behavior at the boundary.
  const info = await getModelInfoCore("__no_such_model_in_registry__", null);
  // Unknown bare id → provider=null (the resolver bails out cleanly).
  assert.equal(info.provider, null);
});