/**
 * Regression tests for #5918: resolveProviderAlias must follow the alias chain
 * transitively.
 *
 * Root cause: resolveProviderAlias() did a single-hop lookup
 * (`ALIAS_TO_PROVIDER_ID[alias] || alias`). The registry has genuine two-hop chains:
 * the parent OpenCode provider registers `id: "opencode", alias: "oc"` (so
 * `oc -> opencode`), and a manual override maps `opencode -> opencode-zen` (the
 * main free tier). With single-hop, `resolveProviderAlias("oc")` returned the
 * intermediate `"opencode"` instead of the final `"opencode-zen"`, so `oc/<model>`
 * resolved to the wrong provider.
 *
 * Fix: resolve transitively with a depth limit AND a seen-set so cycles cannot loop.
 * These assertions FAIL on the old single-hop implementation and pass on the fix.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveProviderAlias } from "../../open-sse/services/model.ts";

test("resolveProviderAlias follows the oc -> opencode -> opencode-zen chain transitively", () => {
  // The bug: single-hop returned "opencode" (intermediate) instead of "opencode-zen".
  assert.equal(resolveProviderAlias("oc"), "opencode-zen");
});

test("resolveProviderAlias resolves a direct one-hop alias", () => {
  assert.equal(resolveProviderAlias("opencode"), "opencode-zen");
});

test("resolveProviderAlias returns a terminal id unchanged (id === alias)", () => {
  // opencode-zen registers id === alias === "opencode-zen"; must not loop or drift.
  assert.equal(resolveProviderAlias("opencode-zen"), "opencode-zen");
});

test("resolveProviderAlias falls back to identity for an unknown provider/id", () => {
  assert.equal(resolveProviderAlias("gpt-4"), "gpt-4");
  assert.equal(resolveProviderAlias("some-unregistered-provider"), "some-unregistered-provider");
});

test("resolveProviderAlias returns null for non-string input", () => {
  assert.equal(resolveProviderAlias(null), null);
  assert.equal(resolveProviderAlias(undefined), null);
  // @ts-expect-error — exercising the runtime guard against non-string input
  assert.equal(resolveProviderAlias(123), null);
});
