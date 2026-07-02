import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard for Hard Rule: PII redaction/sanitization is OPT-IN.
// OmniRoute proxies for self-hosted / local LLMs where the operator owns the
// data; mutating request/response payloads by default would silently corrupt
// that traffic. The two data-mutating PII feature flags MUST default to "false"
// so a vanilla chat request passes data through untouched. Flipping either
// default to "true" requires explicit operator approval — this test is the
// permanent guard against an accidental on-by-default regression.
//
// See docs/security/GUARDRAILS.md and the PII analysis: piiMasker (request),
// piiSanitizer (response), streamingPiiTransform (SSE) are ALL gated on these
// two flags; with both off the guardrail runs but never mutates payloads.

// Isolate DB state so the resolution chain (DB override > env > default) reads
// a clean store and we exercise the definition default, not a leaked override.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-default-"));
process.env.DATA_DIR = tmpDir;

const { FEATURE_FLAG_DEFINITIONS } = await import(
  "../../src/shared/constants/featureFlagDefinitions.ts"
);

test("PII data-mutation flags are opt-in (default 'false')", async (t) => {
  const def = (key: string) => FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);

  await t.test("PII_REDACTION_ENABLED definition default is 'false'", () => {
    const d = def("PII_REDACTION_ENABLED");
    assert.ok(d, "PII_REDACTION_ENABLED definition must exist");
    assert.strictEqual(
      d!.defaultValue,
      "false",
      "PII_REDACTION_ENABLED must default OFF — request-side masking is opt-in (operator owns the data)"
    );
  });

  await t.test("PII_RESPONSE_SANITIZATION definition default is 'false'", () => {
    const d = def("PII_RESPONSE_SANITIZATION");
    assert.ok(d, "PII_RESPONSE_SANITIZATION definition must exist");
    assert.strictEqual(
      d!.defaultValue,
      "false",
      "PII_RESPONSE_SANITIZATION must default OFF — response/streaming masking is opt-in"
    );
  });

  await t.test("effective runtime resolution is OFF with no override", async () => {
    // No env var, no DB override → the definition default must win.
    delete process.env.PII_REDACTION_ENABLED;
    delete process.env.PII_RESPONSE_SANITIZATION;
    const { clearAllFeatureFlagOverrides } = await import("@/lib/db/featureFlags");
    clearAllFeatureFlagOverrides();

    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    assert.strictEqual(isFeatureFlagEnabled("PII_REDACTION_ENABLED"), false);
    assert.strictEqual(isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION"), false);
  });

  await t.test("response data passes through untouched by default", async () => {
    delete process.env.PII_RESPONSE_SANITIZATION;
    const { clearAllFeatureFlagOverrides } = await import("@/lib/db/featureFlags");
    clearAllFeatureFlagOverrides();

    const { sanitizePII, sanitizePIIResponse } = await import("@/lib/piiSanitizer");

    const text = "contact me at jdoe@example.com or 123-45-6789";
    const result = sanitizePII(text);
    assert.strictEqual(result.redacted, false, "must NOT redact when flag is off");
    assert.strictEqual(result.text, text, "PII text must pass through unchanged by default");

    const body = { choices: [{ message: { content: "ssn 123-45-6789, email a@b.com" } }] };
    const out = sanitizePIIResponse(JSON.parse(JSON.stringify(body)));
    assert.deepStrictEqual(out, body, "response object must pass through unchanged by default");
  });
});
