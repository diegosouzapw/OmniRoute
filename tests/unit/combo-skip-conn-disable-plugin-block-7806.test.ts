import assert from "node:assert/strict";
import test from "node:test";

/**
 * #7806: a plugin block must not ban the provider connection.
 *
 * A plugin returning 403 is our own policy decision, not the provider rejecting us.
 * Left unlabelled, chatCore's plugin-gate 403 is indistinguishable from a real
 * upstream 403 and flows through markAccountUnavailable -> classifyProviderError(403)
 * -> FORBIDDEN -> resolveTerminalConnectionStatus -> test_status='banned', destroying
 * a healthy connection the plugin was protecting. `shouldSkipConnDisable` must
 * recognize the `plugin_block` errorType/errorCode the same way it already recognizes
 * `client_disconnected`, so the connection-level cooldown is skipped.
 */

const { shouldSkipConnDisable } =
  await import("../../open-sse/services/combo/comboPredicates.ts");

const BASE_ARGS = { is401: false, hasExtraKeys: false, provider: "test-provider" } as const;

test("plugin_block errorType skips connection disable", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 403, errorType: "plugin_block" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "a plugin-blocked request (errorType) must not cool down a healthy connection"
  );
});

test("plugin_block errorCode skips connection disable", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 403, errorCode: "plugin_block" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "a plugin-blocked request (errorCode) must not cool down a healthy connection"
  );
});

test("client_disconnected still skips connection disable (existing coverage)", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 499, errorType: "client_disconnected" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true
  );
});

test("an unrelated 403 (real upstream forbidden) does NOT skip connection disable", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 403, errorCode: "forbidden" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    false,
    "only a plugin_block-labelled 403 is self-inflicted — a real provider 403 must still cool down"
  );
});
