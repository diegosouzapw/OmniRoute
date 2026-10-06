/**
 * Regression test for PR #10571 — chatCore auto-echoes the listing-valid
 * `<alias>/<model>` form in the response `model` field for bare (unprefixed)
 * requests routed to a no-auth catalog provider (e.g. `opencode`), so clients
 * that validate `response.model` against the provider's entry in
 * `/v1/models` (which lists models under the provider's alias prefix) don't
 * warn/reject.
 *
 * `resolveNoAuthEchoModel()` (`open-sse/handlers/chatCore/noAuthEchoModel.ts`)
 * is a pure extraction of the inline logic chatCore.ts wires into its
 * `echoModel` computation.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveNoAuthEchoModel } from "../../open-sse/handlers/chatCore/noAuthEchoModel.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";

test("aliases a bare model routed to a no-auth provider to <alias>/<model>", () => {
  const alias = REGISTRY["opencode"]?.alias;
  assert.ok(alias, "opencode must declare an alias in the registry for this test to be meaningful");
  assert.equal(resolveNoAuthEchoModel("big-pickle", "opencode"), `${alias}/big-pickle`);
});

test("is a no-op (returns null) for an unregistered provider id", () => {
  assert.equal(resolveNoAuthEchoModel("some-model", "provider-with-no-registry-entry"), null);
});

test("is a no-op (returns null) for a non-noAuth provider", () => {
  assert.equal(resolveNoAuthEchoModel("gpt-5.5", "openai"), null);
});

test("is a no-op (returns null) when the requested model already has a provider prefix", () => {
  assert.equal(resolveNoAuthEchoModel("opencode/big-pickle", "opencode"), null);
});

test("is a no-op (returns null) for empty/non-string requested model", () => {
  assert.equal(resolveNoAuthEchoModel("", "opencode"), null);
  assert.equal(resolveNoAuthEchoModel(null, "opencode"), null);
  assert.equal(resolveNoAuthEchoModel(undefined, "opencode"), null);
});

test("is a no-op (returns null) for a null/undefined provider", () => {
  assert.equal(resolveNoAuthEchoModel("big-pickle", null), null);
  assert.equal(resolveNoAuthEchoModel("big-pickle", undefined), null);
});
