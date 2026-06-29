/**
 * Scope guard for the deliberate NVIDIA validation proxy bypass (#3226).
 *
 * Context: NVIDIA's API-key validation endpoint stalls when routed through the
 * global proxy/TLS-patched fetch (undici dispatcher → 504). As a documented
 * exception, `directHttpsRequest()` in `src/lib/providers/validation.ts` calls
 * `safeOutboundFetch({ bypassProxyPatch: true })`, which resolves the native
 * fetch reference via `getOriginalFetch()` and bypasses the patch for that one
 * validation call only.
 *
 * This test asserts that the bypass is CONFINED to the validation path and has
 * NOT silently spread to the chat hot path (chatHelpers / chatCore).
 *
 * See also: tests/unit/nvidia-validation-bypass-proxy-3226.test.ts (mechanism seam tests).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("bypassProxyPatch is present in the NVIDIA validation path (#3226 documented exception)", () => {
  // After the validation.ts godfile split (#4921–#4930), bypassProxyPatch moved to the
  // extracted validation/headers.ts. Assert the bypass lives in the validation LAYER
  // (validation.ts + its extracted modules), not that it stayed in one file.
  const validationLayer =
    readFileSync("src/lib/providers/validation.ts", "utf8") +
    readFileSync("src/lib/providers/validation/headers.ts", "utf8");
  assert.ok(
    validationLayer.includes("bypassProxyPatch"),
    "expected bypassProxyPatch in the validation layer (validation/headers.ts) — the documented NVIDIA exception"
  );
  assert.ok(
    validationLayer.includes("directHttpsRequest"),
    "expected directHttpsRequest helper in the validation layer"
  );
});

test("bypassProxyPatch is absent from the chat hot path (scope guard — #3226)", () => {
  // The chat hot path must never bypass the proxy patch.
  // If either of these assertions starts failing, a code change has silently
  // extended the NVIDIA-only exception to the chat/usage egress path.
  const chatHelpers = readFileSync("src/sse/handlers/chatHelpers.ts", "utf8");
  assert.ok(
    !chatHelpers.includes("bypassProxyPatch"),
    "chatHelpers.ts must not bypass the proxy patch — only NVIDIA validation may do this (#3226)"
  );

  const chatCore = readFileSync("open-sse/handlers/chatCore.ts", "utf8");
  assert.ok(
    !chatCore.includes("bypassProxyPatch"),
    "chatCore.ts must not bypass the proxy patch — only NVIDIA validation may do this (#3226)"
  );
});
