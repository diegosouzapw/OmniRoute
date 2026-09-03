/**
 * Antigravity geo-block resilience (#PR): the Cloud Code / Gemini Code Assist
 * model API refuses unsupported egress locations with 400 FAILED_PRECONDITION
 * "User location is not supported for the API use." Previously this was
 * classified as a generic 400 ("Antigravity upstream error (400)"), never
 * excluded the account, and the dashboard connection test stayed green because
 * it only probed the (non-geo-restricted) OAuth userinfo endpoint.
 *
 * Coverage:
 * 1. classifyProviderError maps the geo refusal to GEO_BLOCKED (non-terminal),
 *    scoped to the Google AI surfaces that emit it (Cloud Code / Gemini API).
 * 2. isGeoBlockedError recognizes the real Google wording and rejects lookalikes.
 * 3. classify429 keeps Google's RESOURCE_EXHAUSTED-per-minute as rate_limited
 *    (established repo behavior — guards against future regressions here).
 * 4. buildAntigravityUpstreamError surfaces an actionable geo message.
 * 5. The dashboard probe for antigravity/agy hits the REAL model surface
 *    (streamGenerateContent), not userinfo.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, isGeoBlockedError, PROVIDER_ERROR_TYPES } =
  await import("../../../open-sse/services/errorClassifier.ts");
const { classify429 } = await import("../../../open-sse/services/antigravity429Engine.ts");
const { buildAntigravityUpstreamError } =
  await import("../../../open-sse/executors/antigravityUpstreamError.ts");
const { OAUTH_TEST_CONFIG } =
  await import("../../../src/app/api/providers/[id]/test/oauthTestConfig.ts");

const GEO_BODY = {
  error: {
    code: 400,
    message: "User location is not supported for the API use.",
    status: "FAILED_PRECONDITION",
  },
};

// ── 1. classifyProviderError ────────────────────────────────────────────────

test("geo refusal (400 FAILED_PRECONDITION) -> GEO_BLOCKED", () => {
  assert.equal(
    classifyProviderError(400, GEO_BODY, "antigravity"),
    PROVIDER_ERROR_TYPES.GEO_BLOCKED
  );
});

test("geo refusal with a raw text body -> GEO_BLOCKED", () => {
  assert.equal(
    classifyProviderError(
      400,
      '{"error":{"status":"FAILED_PRECONDITION","message":"User location is not supported for the API use."}}',
      "agy"
    ),
    PROVIDER_ERROR_TYPES.GEO_BLOCKED
  );
});

test("generic 400 (not geo) does NOT classify as GEO_BLOCKED", () => {
  const result = classifyProviderError(400, { error: { message: "bad request" } }, "antigravity");
  assert.notEqual(result, PROVIDER_ERROR_TYPES.GEO_BLOCKED);
});

test("429 stays RATE_LIMITED (geo classification is status-scoped)", () => {
  assert.equal(
    classifyProviderError(429, GEO_BODY, "antigravity"),
    PROVIDER_ERROR_TYPES.RATE_LIMITED
  );
});

// ── 1b. provider scoping of GEO_BLOCKED ──────────────────────────────────────

test("geo refusal from Gemini API / Vertex providers -> GEO_BLOCKED", () => {
  assert.equal(
    classifyProviderError(400, GEO_BODY, "gemini"),
    PROVIDER_ERROR_TYPES.GEO_BLOCKED
  );
  assert.equal(
    classifyProviderError(400, GEO_BODY, "vertex"),
    PROVIDER_ERROR_TYPES.GEO_BLOCKED
  );
  assert.equal(
    classifyProviderError(400, GEO_BODY, "gemini-cli"),
    PROVIDER_ERROR_TYPES.GEO_BLOCKED
  );
});

test("geo-looking body from a non-Google provider does NOT classify as GEO_BLOCKED", () => {
  // Falls through to the generic path (null for an unclassified 400): the 24h
  // non-terminal exclusion is reserved for egress-fixable Google blocks — an
  // unrelated provider's region wording may mean a permanent block.
  assert.equal(classifyProviderError(400, GEO_BODY, "openai"), null);
  assert.equal(classifyProviderError(400, GEO_BODY, "anthropic"), null);
  assert.equal(classifyProviderError(400, GEO_BODY, "g4f-gemini"), null);
  assert.equal(
    classifyProviderError(400, "The API is not available in your region.", "mistral"),
    null
  );
});

test("geo body with no provider does NOT classify as GEO_BLOCKED", () => {
  assert.equal(classifyProviderError(400, GEO_BODY, undefined), null);
});

test("403 geo refusal stays GEO_BLOCKED for eligible providers", () => {
  assert.equal(
    classifyProviderError(403, GEO_BODY, "antigravity"),
    PROVIDER_ERROR_TYPES.GEO_BLOCKED
  );
});

// ── 2. isGeoBlockedError ────────────────────────────────────────────────────

test("isGeoBlockedError matches Google wording variants", () => {
  assert.equal(isGeoBlockedError("User location is not supported for the API use."), true);
  assert.equal(
    isGeoBlockedError('{"message":"This location is not supported for the API use"}'),
    true
  );
  assert.equal(isGeoBlockedError("The API is not available in your region."), true);
});

test("isGeoBlockedError rejects lookalike errors", () => {
  assert.equal(isGeoBlockedError("Invalid API key"), false);
  assert.equal(isGeoBlockedError("Quota exceeded for the API use"), false);
  assert.equal(isGeoBlockedError("model not supported"), false);
  assert.equal(isGeoBlockedError(""), false);
});

// ── 3. classify429: RESOURCE_EXHAUSTED stays rate_limited ───────────────────

test("classify429 keeps Google 'Resource has been exhausted (per minute)' as rate_limited", () => {
  // Deliberate existing behavior (antigravity-429-quota-cooldown.test.ts): Google
  // uses RESOURCE_EXHAUSTED for per-minute rate limits too, and the
  // "(e.g. queries per minute limit was reached)" phrasing is the RPM case —
  // short cooldown + same-auth retry, NOT a daily quota wall.
  assert.equal(
    classify429(
      "RESOURCE_EXHAUSTED: Resource has been exhausted (e.g. queries per minute limit was reached)."
    ),
    "rate_limited"
  );
  // A genuine quota-wall message still classifies as quota_exhausted.
  assert.equal(
    classify429("Individual quota reached. Contact your administrator."),
    "quota_exhausted"
  );
});

// ── 4. buildAntigravityUpstreamError ────────────────────────────────────────

test("geo-blocked upstream error body carries an actionable hint", () => {
  const body = buildAntigravityUpstreamError(400, "", JSON.stringify(GEO_BODY)) as {
    error?: { message?: string };
  };
  assert.match(String(body.error?.message), /location is not supported/i);
  assert.match(String(body.error?.message), /proxy in a supported region/i);
  assert.match(String(body.error?.message), /connection test/i);
});

test("non-geo upstream error body is unchanged in shape", () => {
  const body = buildAntigravityUpstreamError(500, "", '{"error":"boom"}') as {
    error?: { message?: string };
  };
  assert.match(String(body.error?.message), /Antigravity upstream error \(500\)/);
  assert.doesNotMatch(String(body.error?.message), /supported region/i);
});

// ── 5. dashboard probe hits the real model surface ──────────────────────────

test("antigravity/agy connection test probes streamGenerateContent, not userinfo", async () => {
  for (const provider of ["antigravity", "agy"]) {
    const entry = OAUTH_TEST_CONFIG[provider];
    assert.ok(entry, `${provider} has a test config`);
    assert.equal(typeof entry.buildProbe, "function", `${provider} uses a buildProbe`);

    const probe = await entry.buildProbe(
      { providerSpecificData: { clientProfile: "ide" } },
      "sk-test-token"
    );
    assert.match(probe.url, /v1internal:streamGenerateContent\?alt=sse/);
    assert.equal(probe.method, "POST");
    assert.match(probe.headers.Authorization, /Bearer sk-test-token/);
    assert.equal(probe.headers["Content-Type"], "application/json");
    assert.ok(probe.body, "probe carries a minimal generation body");
    const parsedBody = JSON.parse(probe.body as string);
    assert.ok(Array.isArray(parsedBody.contents));
    assert.equal(parsedBody.generationConfig.maxOutputTokens, 1);
  }
});
