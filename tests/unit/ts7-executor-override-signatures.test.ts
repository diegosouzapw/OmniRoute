/**
 * Guards the executor override signatures fixed for TS 7 readiness.
 *
 * Two executors declared a *private/protected* `buildHeaders()` helper whose signature
 * has nothing to do with `BaseExecutor.buildHeaders(credentials, stream?, clientHeaders?,
 * model?, health?)`:
 *
 *   lmarena     (_model: string, credentials: unknown, _body: unknown)
 *
 * They were name collisions, not overrides — each shadowed the inherited member with an
 * incompatible signature (TS2416). `BaseExecutor` calls `this.buildHeaders(credentials,
 * false)` from `countTokens()`, so the shadow sat on a live dispatch path; it was never
 * reached only because `buildCountTokensUrl()` returns null unless `config.format` is
 * `"claude"`, and none of these three is. Latent rather than live — but one `format`
 * change away from passing a credentials object where a token string was expected.
 *
 * The helpers are renamed, so these assertions pin both halves: the inherited method is
 * no longer shadowed, and the early return that kept it harmless still holds.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { LMArenaExecutor } from "../../open-sse/executors/lmarena.ts";

const CASES = [
  { name: "lmarena", make: () => new LMArenaExecutor(), helper: "buildRequestHeaders" },
];

for (const { name, make, helper } of CASES) {
  test(`${name}: buildHeaders resolves to BaseExecutor, not a local helper`, () => {
    const executor = make() as unknown as Record<string, unknown>;

    assert.equal(
      executor.buildHeaders,
      BaseExecutor.prototype.buildHeaders,
      `${name} must not shadow BaseExecutor.buildHeaders — countTokens() dispatches through it`
    );
  });

  test(`${name}: its own header helper is still present under the renamed key`, () => {
    const executor = make() as unknown as Record<string, unknown>;

    assert.equal(
      typeof executor[helper],
      "function",
      `${name} should keep its provider-specific header builder as ${helper}()`
    );
    assert.notEqual(
      executor[helper],
      BaseExecutor.prototype.buildHeaders,
      "the renamed helper must be the provider's own function, not the inherited one"
    );
  });

  test(`${name}: countTokens() short-circuits before reaching buildHeaders`, async () => {
    const executor = make();

    // buildCountTokensUrl() returns null unless config.format === "claude" and the URL
    // carries /messages. That early return is what kept the old shadow unreachable; if it
    // ever changes, the inherited buildHeaders must be the one that runs.
    const result = await executor.countTokens({
      model: "whatever",
      body: { messages: [] },
      credentials: {},
      signal: new AbortController().signal,
      log: null,
    });

    assert.equal(result, null, `${name} does not support the Anthropic count_tokens endpoint`);
  });
}

test("LMArenaExecutor does not narrow visibility of inherited members", () => {
  // TS2415: a subclass may widen a member's visibility but never narrow it. `buildUrl` and
  // `transformRequest` were `protected` here while public on BaseExecutor — masked behind
  // the buildHeaders TS2416 until that cleared. Runtime has no visibility, so this asserts
  // the members are reachable, which is what the type change encodes.
  const executor = new LMArenaExecutor() as unknown as Record<string, unknown>;

  for (const member of ["buildUrl", "transformRequest"]) {
    assert.equal(typeof executor[member], "function", `${member} must stay callable`);
  }
});
