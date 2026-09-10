import test from "node:test";
import assert from "node:assert/strict";
import { classifyProviderError } from "../../open-sse/services/errorClassifier.ts";

// #6315 / #6345 — a single generic upstream 403 on a no-credential ("authType:
// none") provider was permanently banning the whole
// connection (classified as FORBIDDEN, a terminal type). These providers are
// free/stateless — there is no real account/credential to revoke, so a bare
// 403 should be RECOVERABLE (null) and handled by the existing connection
// cooldown/retry layer, same as apikey providers already are.

test("#6345: no-credential provider 'Request blocked'/access_denied 403 -> recoverable (null), not FORBIDDEN", () => {
  const body = { error: "Request blocked", type: "access_denied" };
  assert.equal(classifyProviderError(403, body, "chipotle"), null);
});

test("control: apikey-provider bare 403 still recoverable (null) — no regression", () => {
  assert.equal(classifyProviderError(403, "forbidden", "openai"), null);
});
