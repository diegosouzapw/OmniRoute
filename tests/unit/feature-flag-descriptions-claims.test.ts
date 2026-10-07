import test from "node:test";
import assert from "node:assert/strict";

import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions";

const byKey = (key: string) => {
  const entry = FEATURE_FLAG_DEFINITIONS.find((f) => f.key === key);
  assert.ok(entry, `feature flag ${key} must be defined`);
  return entry.description;
};

// The dashboard renders these raw English descriptions (descriptionI18nKey has no
// en.json message), so they must state the same guard semantics as
// docs/reference/FEATURE_FLAGS.md. PR #15616 corrected the docs; these pins keep the
// dashboard text from drifting back to the old claims.
test("SSRF Guard dashboard description states the legacy-alias semantics", () => {
  const d = byKey("OUTBOUND_SSRF_GUARD_ENABLED");
  assert.match(d, /Legacy alias/);
  assert.match(d, /dashboard toggle is read before the environment/);
  assert.match(d, /false, 0, no, or off/);
  assert.doesNotMatch(d, /^Block outbound requests/);
});

test("Allow Private dashboard description states what the flag turns off", () => {
  const d = byKey("OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS");
  assert.match(d, /cloud-metadata block included/);
  assert.match(d, /provider URL validation, model discovery, provider-node base URLs/);
  assert.match(d, /private webhook targets/);
  // The proxy-fallback test and webhooks consult only this flag — the local-first
  // default does not open them.
  assert.match(d, /check only this flag/);
  assert.doesNotMatch(d, /REQUIRED for self-hosted/);
});

test("Allow Local dashboard description states the local-first default and the metadata block", () => {
  const d = byKey("OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS");
  assert.match(d, /by default \(OmniRoute is local-first\)|On by default \(local-first\)/);
  assert.match(d, /all of 169\.254\.0\.0\/16/);
  assert.match(d, /private and loopback hosts are blocked too/);
  assert.doesNotMatch(d, /needed for local OpenAI-compatible models/);
});

test("Remote Rerank dashboard description does not claim metadata hosts are never routed to", () => {
  const d = byKey("RERANK_REMOTE_PROVIDER_NODES");
  assert.match(d, /must also pass the provider outbound URL policy/);
  // Under guard mode "none" (private opt-in) the node check does not block metadata,
  // so the absolute claim was removed with the docs correction.
  assert.doesNotMatch(d, /never routed to/);
});
