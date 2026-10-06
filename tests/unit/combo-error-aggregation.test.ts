import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyComboOutcome,
  formatComboOutcomes,
  redactConnectionLabel,
  buildRedactedSummary,
  resolveComboTerminalStatus,
} from "../../open-sse/services/combo/comboErrorAggregation.ts";

// #10314 — combo error aggregation mixes quality and auth.
// Regression guard for the pure aggregation helpers: a quality-failure reason from one
// target and a sibling's 401 must be presented as SEPARATE classified outcomes (never
// mashed into a single lastError), and account/connection identifiers must be redacted
// from client-visible and shared-warn strings.

test("#10314: classifyComboOutcome keeps auth distinct from quality/model", () => {
  assert.equal(classifyComboOutcome(401, "invalid_api_key"), "auth");
  assert.equal(classifyComboOutcome(403, "not authorized"), "auth");
  assert.equal(classifyComboOutcome(408, "timeout"), "timeout");
  assert.equal(classifyComboOutcome(400, "bad request"), "model");
});

// #10501: the classifier's ordering used to have `status === 408 || status >= 499`
// checked BEFORE `status >= 500` — since 500 >= 499, that made the `provider`
// branch unreachable for every real 5xx status (500/502/503/504), silently
// mislabeling every provider outage as a client-side "timeout". These cases
// pin the corrected, intentional mapping for the exact statuses call out in
// the fix: 499 (client-abort convention), 408 (request timeout), 429 (rate
// limit/quota — its own class, not lumped into `model`), and the 5xx family.
test("#10501: classifyComboOutcome — 499/408 are timeout, 429 is rate_limit, 5xx is provider (not timeout)", () => {
  assert.equal(classifyComboOutcome(499, "client closed request"), "timeout");
  assert.equal(classifyComboOutcome(408, "request timeout"), "timeout");
  assert.equal(classifyComboOutcome(429, "rate limited"), "rate_limit");
  assert.equal(classifyComboOutcome(500, "internal server error"), "provider");
  assert.equal(classifyComboOutcome(502, "bad gateway"), "provider");
  assert.equal(classifyComboOutcome(503, "upstream unavailable"), "provider");
  assert.equal(classifyComboOutcome(504, "gateway timeout"), "provider");
});

test("#10314: formatComboOutcomes lists quality and auth reasons SEPARATELY (both visible)", () => {
  const msg = formatComboOutcomes([
    { model: "openai/model-quality", status: 502, error: "response failed quality validation", kind: "quality" },
    { model: "openai/proxy-account-b", status: 401, error: "invalid_api_key", kind: "auth" },
  ]);
  assert.match(msg, /quality validation/);
  assert.match(msg, /invalid_api_key/);
  assert.match(msg, /auth/);
  assert.ok(msg.indexOf("quality validation") < msg.indexOf("invalid_api_key"));
});

test("#10314: redactConnectionLabel masks connection/account identifiers", () => {
  assert.equal(
    redactConnectionLabel("openai/proxy-account-b"),
    "openai/proxy-account-b"
  );
  const withUuid = redactConnectionLabel("openai/8a4f0c6e-3b27-4c51-9d88-1f2a3b4c5d6e");
  assert.equal(withUuid, "openai/conn:8a4f0c6e");
  const withHex = redactConnectionLabel("openai/0f1e2d3c4b5a69788796170a1b2c3d4e5f607182");
  assert.equal(withHex, "openai/conn:0f1e2d3c");
});

test("#10314: buildRedactedSummary is redacted and truncates past 5 entries", () => {
  const s = buildRedactedSummary(
    Array.from({ length: 6 }, (_, i) => ({ model: `openai/8a4f0c6e-3b27-4c51-9d88-1f2a3b4c5d6e-${i}`, status: 401 + i }))
  );
  assert.ok(!s.includes("8a4f0c6e-3b27"), "summary must not leak a full UUID");
  assert.match(s, /conn:8a4f0c6e/);
  assert.match(s, /\(\+1\)/);
});

// #10501: identifiers can ride inside the raw upstream ERROR TEXT too (some
// openai-compatible proxies echo the connection/account id back in the error
// body), not just the model label. formatComboOutcomes must redact BOTH.
test("#10501: formatComboOutcomes redacts a UUID embedded in the error TEXT, not just the model label", () => {
  const msg = formatComboOutcomes([
    {
      model: "openai/proxy-account-b",
      status: 401,
      error: "invalid key for connection 8a4f0c6e-3b27-4c51-9d88-1f2a3b4c5d6e",
      kind: "auth",
    },
  ]);
  assert.ok(!msg.includes("8a4f0c6e-3b27-4c51-9d88-1f2a3b4c5d6e"), "must not leak the full UUID");
  assert.match(msg, /conn:8a4f0c6e/, "must redact the UUID inside the error reason text");
});

test("#10501: formatComboOutcomes({redact:false}) intentionally leaves identifiers intact (internal/debug callers only)", () => {
  const msg = formatComboOutcomes(
    [
      {
        model: "openai/proxy-account-b",
        status: 401,
        error: "invalid key for connection 8a4f0c6e-3b27-4c51-9d88-1f2a3b4c5d6e",
        kind: "auth",
      },
    ],
    { redact: false }
  );
  assert.ok(msg.includes("8a4f0c6e-3b27-4c51-9d88-1f2a3b4c5d6e"));
});

// #10501: explicit terminal-status policy for heterogeneous combo target
// exhaustion — see comboErrorAggregation.ts::resolveComboTerminalStatus header.
test("#10501: resolveComboTerminalStatus preserves 4xx only when EVERY target is a genuine request-invalid (model) failure", () => {
  assert.equal(
    resolveComboTerminalStatus(
      [
        { model: "a", status: 400, error: "bad request", kind: "model" },
        { model: "b", status: 422, error: "unprocessable", kind: "model" },
      ],
      500
    ),
    422,
    "all-model-class 4xx across every target must be preserved (the request really is invalid)"
  );
});

test("#10501: resolveComboTerminalStatus preserves a homogeneous non-model status (every target failed the SAME way)", () => {
  assert.equal(
    resolveComboTerminalStatus(
      [
        { model: "a", status: 401, error: "invalid_api_key", kind: "auth" },
        { model: "b", status: 401, error: "invalid_api_key", kind: "auth" },
      ],
      500
    ),
    401,
    "every target failing with the identical auth reason is still a well-defined single verdict"
  );
});

test("#10501: resolveComboTerminalStatus normalizes a heterogeneous mix (quality + auth) to 5xx, never a bare lastStatus 401", () => {
  const status = resolveComboTerminalStatus(
    [
      {
        model: "a",
        status: 502,
        error: "response failed quality validation",
        kind: "quality",
      },
      { model: "b", status: 401, error: "invalid_api_key", kind: "auth" },
    ],
    401 // lastStatus — the OLD behavior would have surfaced this bare 401
  );
  assert.ok(
    status >= 500,
    `heterogeneous quality+auth exhaustion must surface an infra/provider 5xx, got ${status}`
  );
});

test("#10501: resolveComboTerminalStatus maps a heterogeneous mix containing a timeout to 504", () => {
  const status = resolveComboTerminalStatus(
    [
      { model: "a", status: 408, error: "request timeout", kind: "timeout" },
      { model: "b", status: 400, error: "bad request", kind: "model" },
    ],
    400
  );
  assert.equal(status, 504);
});

test("#10501: resolveComboTerminalStatus falls back to the caller's status when there are no structured entries", () => {
  assert.equal(resolveComboTerminalStatus([], 503), 503);
});