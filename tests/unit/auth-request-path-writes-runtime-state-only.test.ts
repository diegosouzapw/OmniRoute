/**
 * Class guard for #13389-style catalog-cache drops.
 *
 * `invalidateConnectionUpdate()` only skips the model-catalog invalidation when
 * EVERY key of an `updateProviderConnection()` payload is in
 * CONNECTION_RUNTIME_STATE_FIELDS (cooldowns, error fields). Mixing in any
 * structural key — `providerSpecificData` above all — silently re-triggers the
 * multi-second `/v1/models` rebuild on every request-path write.
 *
 * `markAccountUnavailable()` and its sibling fallback writers run on the hot
 * request path, so every payload they send must be runtime-state-only. The
 * alibaba free-quota branch (the one this class of bug was found in) persists
 * account state through `mergeConnectionProviderSpecificData()` instead.
 *
 * This scan pins that invariant at the source level: no `updateProviderConnection`
 * payload inside src/sse/services/auth.ts may pass `providerSpecificData`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const AUTH_SOURCE = path.resolve(import.meta.dirname, "../../src/sse/services/auth.ts");

test("markAccountUnavailable request-path writers never mix providerSpecificData into updateProviderConnection payloads", () => {
  const source = fs.readFileSync(AUTH_SOURCE, "utf8");

  const callRe = /updateProviderConnection\(/g;
  let match: RegExpExecArray | null;
  let sites = 0;
  while ((match = callRe.exec(source)) !== null) {
    sites++;
    // Take a window large enough for the widest payload in the file; payloads
    // here are small, fixed object literals.
    const window = source.slice(match.index, match.index + 700);
    // Stop the window at the closing of the call to avoid bleeding into the
    // next call site.
    const end = window.indexOf(");");
    const payload = end === -1 ? window : window.slice(0, end);
    assert.ok(
      !/providerSpecificData\s*:/.test(payload),
      `updateProviderConnection() call at offset ${match.index} in src/sse/services/auth.ts passes providerSpecificData — ` +
        `mixed payloads bypass the runtime-state whitelist and drop the /v1/models catalog cache. ` +
        `Persist account state via mergeConnectionProviderSpecificData() instead.`
    );
  }

  assert.ok(sites >= 5, `expected to scan several call sites, found ${sites}`);
});
