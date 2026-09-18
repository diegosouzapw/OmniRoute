import test from "node:test";
import assert from "node:assert/strict";

const {
  classifyProviderError,
  isResourceNotFoundResponse,
  isCloudflareFingerprintRejection,
  isAnthropicOAuthProvider,
  isAnthropicRequestNotAllowed,
  PROVIDER_ERROR_TYPES,
} = await import("../../open-sse/services/errorClassifier.ts");

test("classifyProviderError: 401 + account_deactivated => ACCOUNT_DEACTIVATED", () => {
  const body = JSON.stringify({
    error: { message: "account_deactivated: this account has been disabled" },
  });
  const result = classifyProviderError(401, body);
  assert.equal(result, PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED);
});

test("classifyProviderError: plain 401 => UNAUTHORIZED", () => {
  const result = classifyProviderError(401, { error: { message: "token expired" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.UNAUTHORIZED);
});

test("classifyProviderError: 402 => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(402, { error: { message: "payment required" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: 400 + billing signal => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(400, {
    error: { message: "insufficient_quota: exceeded your current quota" },
  });
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);

  const resultExhausted = classifyProviderError(400, {
    error: { message: "The free tier of the model has been exhausted." },
  });
  assert.equal(resultExhausted, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: Kimi billing-cycle 403 => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(
    403,
    {
      error: {
        message:
          "You've reached your usage limit for this billing cycle. Your quota will be refreshed in the next cycle.",
      },
    },
    "kimi-coding"
  );
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: 429 without billing signal => RATE_LIMITED", () => {
  const result = classifyProviderError(429, { error: { message: "too many requests" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.RATE_LIMITED);
});

test("classifyProviderError: 429 with billing signal and no provider keeps legacy QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(429, {
    error: { message: "insufficient_quota: exceeded your current quota" },
  });
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: API-key provider 429 with billing signal => RATE_LIMITED", () => {
  const result = classifyProviderError(
    429,
    {
      error: { message: "insufficient_quota: exceeded your current quota" },
    },
    "openai"
  );
  assert.equal(result, PROVIDER_ERROR_TYPES.RATE_LIMITED);
});

test("classifyProviderError: OAuth provider 429 with billing signal => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(
    429,
    {
      error: { message: "insufficient_quota: exceeded your current quota" },
    },
    "codex"
  );
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: 403 with 'has not been used in project' => PROJECT_ROUTE_ERROR (transient)", () => {
  const result = classifyProviderError(403, {
    error: {
      message:
        "Cloud Code Private API has not been used in project 12345 before or it is disabled.",
    },
  });
  assert.equal(result, PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR);
});

test("classifyProviderError: 403 plain => FORBIDDEN (terminal)", () => {
  const result = classifyProviderError(403, {
    error: { message: "The caller does not have permission" },
  });
  assert.equal(result, PROVIDER_ERROR_TYPES.FORBIDDEN);
});

test("classifyProviderError: API-key provider plain 403 is recoverable", () => {
  const result = classifyProviderError(
    403,
    {
      error: { message: "The caller does not have permission" },
    },
    "glm"
  );
  assert.equal(result, null);
});

test("classifyProviderError: 403 with project string as plain string body => PROJECT_ROUTE_ERROR", () => {
  const body = JSON.stringify({
    error: { message: "API has not been used in project abc-xyz before" },
  });
  const result = classifyProviderError(403, body);
  assert.equal(result, PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR);
});

test("classifyProviderError: API-key provider 429 with daily quota signal => RATE_LIMITED", () => {
  const body = JSON.stringify({
    error: {
      message:
        "You have exceeded today's quota for model moonshotai/Kimi-K2.5, please try again tomorrow",
    },
  });
  const result = classifyProviderError(429, body, "openai");
  assert.equal(result, PROVIDER_ERROR_TYPES.RATE_LIMITED);
});

test("classifyProviderError: OAuth provider 429 with daily quota signal => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(
    429,
    {
      error: { message: "You have reached your daily quota limit" },
    },
    "codex"
  );
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

// #6827 — 404 must be classified as MODEL_NOT_FOUND, not fall through to null.
// Without this, no cooldown/lockout is applied and the retry loop keeps hitting
// the dead endpoint until the upstream rate-limits it (404 + 429 storm).
test("classifyProviderError: 404 => MODEL_NOT_FOUND", () => {
  const result = classifyProviderError(404, {
    error: { message: "model v0-1.5-md not found" },
  });
  assert.equal(result, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("classifyProviderError: 404 with provider => MODEL_NOT_FOUND", () => {
  const result = classifyProviderError(404, { error: { message: "Not Found" } }, "v0-vercel");
  assert.equal(result, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("classifyProviderError: Files API 404 is request-scoped, not MODEL_NOT_FOUND", () => {
  const body = {
    error: {
      message: "[404]: Files [file-be30851bd1614656872e725e] were not found",
      type: "invalid_request_error",
      // A compatibility layer may derive this from the HTTP status before the
      // upstream file message is inspected. The resource signal must win.
      code: "model_not_found",
    },
  };

  assert.equal(isResourceNotFoundResponse(body), true);
  assert.equal(classifyProviderError(404, body, "codex"), null);
});

test("classifyProviderError: other request-resource 404 shapes do not poison model health", () => {
  const bodies = [
    { error: { message: "input_file file_id does not exist" } },
    { error: { message: "Response resp_123 was not found" } },
    { error: { message: "vector_store vs_123 not found" } },
    "Upload upload_123 does not exist",
  ];

  for (const body of bodies) {
    assert.equal(isResourceNotFoundResponse(body), true);
    assert.equal(classifyProviderError(404, body, "openai"), null);
  }
});

test("classifyProviderError: Cloudflare 1010 (browser signature) => FINGERPRINT_REJECTION, not FORBIDDEN/banned", () => {
  // Verbatim body shape from the 2026-08-08 incident: the gateway wraps the
  // upstream Cloudflare error inside error.message as a nested JSON string.
  const body = JSON.stringify({
    error: {
      message:
        '[openai/deepseek-v4-flash-free] [403]: {"type":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/","title":"Error 1010: Access denied","status":403,"detail":"The site owner has blocked access based on your browser\'s signature.","instance":"a283cb68eb52bda8","error_code":1010,"error_name":"browser_signature_banned"}',
    },
  });
  const result = classifyProviderError(403, body, "opencode");
  assert.equal(
    result,
    PROVIDER_ERROR_TYPES.FINGERPRINT_REJECTION,
    "a Cloudflare 1010 must be classified as fingerprint rejection, never FORBIDDEN"
  );
  assert.notEqual(
    result,
    PROVIDER_ERROR_TYPES.FORBIDDEN,
    "must not fall through to FORBIDDEN/banned"
  );
});

test("classifyProviderError: Cloudflare 1010 via error_name only (no numeric code) => FINGERPRINT_REJECTION", () => {
  const body = JSON.stringify({
    error: {
      message:
        '[403] {"error_name":"browser_signature_banned","detail":"blocked access based on your browser\'s signature"}',
    },
  });
  const result = classifyProviderError(403, body);
  assert.equal(result, PROVIDER_ERROR_TYPES.FINGERPRINT_REJECTION);
});

test("classifyProviderError: plain 403 stays FORBIDDEN (not fingerprint rejection)", () => {
  const result = classifyProviderError(403, { error: { message: "you do not have permission" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.FORBIDDEN);
});

test("isCloudflareFingerprintRejection: error_code 10101 is NOT 1010 (boundary)", () => {
  // Review finding: the code-number match must not trip on a longer numeric suffix.
  assert.equal(isCloudflareFingerprintRejection('{"error_code":10101}'), false);
  assert.equal(isCloudflareFingerprintRejection("error 10101: something else"), false);
});

test("isCloudflareFingerprintRejection: bare browser_signature_banned matches (no quotes needed)", () => {
  // The error_name token may arrive bare via structuredError.code, not wrapped in
  // quotes inside a JSON string. The token is unique to Cloudflare — safe to match bare.
  assert.equal(isCloudflareFingerprintRejection("browser_signature_banned"), true);
  assert.equal(isCloudflareFingerprintRejection('{"error_name":"browser_signature_banned"}'), true);
});

test("isCloudflareFingerprintRejection: Cloudflare-keyed 1010 forms are detected (round 3/4)", () => {
  // The bare number 1010 is deliberately NOT a fingerprint signal (port/count/model id).
  // Only explicit Cloudflare-keyed forms — error_code with = or :, the error-1010 URL path,
  // the escaped-quote nested JSON form, browser_signature_banned, or the normalized type —
  // qualify.
  assert.equal(isCloudflareFingerprintRejection("error_code: 1010"), true, "colon code");
  assert.equal(isCloudflareFingerprintRejection("error_code = 1010"), true, "eq code");
  assert.equal(
    isCloudflareFingerprintRejection('"error_code": "1010"'),
    true,
    "string-valued code"
  );
  assert.equal(
    isCloudflareFingerprintRejection("https://.../cloudflare-1xxx-errors/error-1010/"),
    true,
    "error-1010 URL path"
  );
  // Escaped-quote form: when the upstream body is nested inside the gateway's
  // error.message JSON string the quotes carry a backslash (\") — round 4 caught
  // that this form was silently relying on the bare-number fallback.
  assert.equal(
    isCloudflareFingerprintRejection(
      String.raw`{"error":{"message":"[403]: {\"error_code\":1010}"}}`
    ),
    true,
    "escaped-quote nested error_code"
  );
  assert.equal(isCloudflareFingerprintRejection("BROWSER_SIGNATURE_BANNED"), true, "case token");
  assert.equal(isCloudflareFingerprintRejection("fingerprint_rejection"), true, "normalized type");
});

test("isCloudflareFingerprintRejection: a bare/unkeyed 1010 is NOT a fingerprint (round 4 FP guard)", () => {
  // Round 4 finding: matching any standalone 1010 mistook ports/ids/model tokens for
  // fingerprint rejections, skipping auth-level exhaustion for genuinely bad credentials.
  assert.equal(isCloudflareFingerprintRejection("1010"), false, "bare numeric 1010");
  assert.equal(isCloudflareFingerprintRejection("retry after 1010 seconds"), false, "count/port");
  assert.equal(
    isCloudflareFingerprintRejection("model foo-1010 is not supported"),
    false,
    "model id"
  );
  assert.equal(
    isCloudflareFingerprintRejection("project 1010 has not been used"),
    false,
    "project id"
  );
});

test("isCloudflareFingerprintRejection: larger numeric/the wrong key are NOT 1010 (boundary)", () => {
  assert.equal(isCloudflareFingerprintRejection("error_code:10101"), false);
  assert.equal(isCloudflareFingerprintRejection("HTTP 1019"), false);
  assert.equal(isCloudflareFingerprintRejection("limit 101 tokens"), false);
});

test("isCloudflareFingerprintRejection: error-10101 is NOT 1010 (URL-path boundary, round 6)", () => {
  // Round 6 finding: the second regex alternative (error-1010 / error_1010 URL-path form)
  // lacked the (?!\d) suffix guard the error_code branch has, so a 4-digit code like 10101
  // matched as 1010. The genuine 1010 path forms still match.
  assert.equal(isCloudflareFingerprintRejection("error-10101"), false);
  assert.equal(isCloudflareFingerprintRejection("/error_10109/"), false);
  assert.equal(isCloudflareFingerprintRejection("error-1010"), true, "hyphen path 1010");
  assert.equal(
    isCloudflareFingerprintRejection("error-1010/"),
    true,
    "hyphen path 1010 with slash"
  );
});

test("isCloudflareFingerprintRejection: 1010 must not absorb an alphanumeric suffix (round 7)", () => {
  // Round 7 finding: (?!\d) only refused a following DIGIT, so a letter or underscore
  // suffix (errorcode1010x / error_code:1010x) sailed through as 1010. (?!\w) refuses any
  // word character. The real Cloudflare body ("error_code":1010,"error_name":...) ends the
  // code on a non-word boundary and still matches.
  assert.equal(isCloudflareFingerprintRejection("errorcode1010x"), false, "letter suffix");
  assert.equal(
    isCloudflareFingerprintRejection("error_code:1010x"),
    false,
    "letter suffix colon form"
  );
  assert.equal(isCloudflareFingerprintRejection("error-1010_tail"), false, "underscore suffix");
  assert.equal(
    isCloudflareFingerprintRejection('{"error_code":1010,"error_name":"browser_signature_banned"}'),
    true,
    "real Cloudflare body"
  );
});

test("isCloudflareFingerprintRejection: error-1010 with a real-world prefix still matches (gemini round)", () => {
  // Review finding (gemini backend): the URL-path alternative required error-1010 to be at
  // the string start or after a literal "/", so the real upstream phrasing "[403] error-1010"
  // or "Cloudflare error-1010: Access denied" leaked through as FORBIDDEN. A word-boundary
  // lookbehind (same as the error_code branch) admits any non-word prefix while still
  // rejecting my_error-1010 / xerror-1010.
  assert.equal(isCloudflareFingerprintRejection("[403] error-1010"), true, "bracket prefix");
  assert.equal(
    isCloudflareFingerprintRejection("Cloudflare error-1010: Access denied"),
    true,
    "space prefix"
  );
  assert.equal(isCloudflareFingerprintRejection("(error-1010)"), true, "paren prefix");
  assert.equal(
    isCloudflareFingerprintRejection("my_error-1010"),
    false,
    "underscore prefix still FP-guarded"
  );
  assert.equal(
    isCloudflareFingerprintRejection("xerror-1010"),
    false,
    "letter prefix still FP-guarded"
  );
});

test("isCloudflareFingerprintRejection: no word-boundary false positives (round 5)", () => {
  // error_code without a preceding word boundary matched my_error_code/twitter_error_code.
  assert.equal(isCloudflareFingerprintRejection("my_error_code: 1010"), false);
  assert.equal(isCloudflareFingerprintRejection("twitter_error_code 1010"), false);
  // The bare phrase "error 1010" without the error_code key or URL path is too broad.
  assert.equal(isCloudflareFingerprintRejection("error 1010 something else"), false);
});

test("isCloudflareFingerprintRejection: space-separated and URL-path forms match (round 5)", () => {
  assert.equal(isCloudflareFingerprintRejection("error code: 1010"), true, "space separator");
  assert.equal(isCloudflareFingerprintRejection("error-code = 1010"), true, "hyphen key");
  assert.equal(
    isCloudflareFingerprintRejection("https://.../cloudflare-1xxx-errors/error-1010/"),
    true,
    "URL path"
  );
});

test("classifyProviderError: 422 + gcp_project_required => GCP_PROJECT_REQUIRED (BYOP fast-fail)", () => {
  const body = JSON.stringify({
    error: {
      message:
        "GCP_PROJECT_REQUIRED: Google Antigravity now requires a free GCP Project ID. " +
        "Create one at console.cloud.google.com and enter it in Providers → Antigravity.",
      type: "gcp_project_required",
      code: "gcp_project_required",
    },
  });
  assert.equal(
    classifyProviderError(422, body, "antigravity"),
    PROVIDER_ERROR_TYPES.GCP_PROJECT_REQUIRED
  );
});

test("classifyProviderError: 422 without the BYOP code stays unclassified (no model lockout)", () => {
  // The sibling missing-project error (code missing_project_id) and any other
  // 422 must NOT map to GCP_PROJECT_REQUIRED — and never to MODEL_NOT_FOUND,
  // so chatCore keeps its fail-closed behavior without locking the model.
  assert.equal(
    classifyProviderError(
      422,
      JSON.stringify({
        error: { code: "missing_project_id", message: "Missing Google projectId" },
      }),
      "antigravity"
    ),
    null
  );
  assert.equal(classifyProviderError(422, "some other body", "antigravity"), null);
});

// ── Anthropic OAuth 403 "Request not allowed" is a per-request refusal, not a ban ──

test("classifyProviderError: claude 403 'Request not allowed' (Anthropic body) => REQUEST_REJECTED, never FORBIDDEN", () => {
  // Verbatim Anthropic shape. On the reporting install this landed once between
  // hundreds of 200s on the same OAuth token and permanently banned the only
  // Claude connection.
  const body = JSON.stringify({
    type: "error",
    error: { type: "permission_error", message: "Request not allowed" },
  });
  const result = classifyProviderError(403, body, "claude");
  assert.equal(result, PROVIDER_ERROR_TYPES.REQUEST_REJECTED);
  assert.notEqual(result, PROVIDER_ERROR_TYPES.FORBIDDEN, "must not ban the connection");
});

test("classifyProviderError: claude 403 'Request not allowed' via gateway-wrapped message => REQUEST_REJECTED", () => {
  // Shape as it reaches the classifier after the executor flattens the body.
  const result = classifyProviderError(403, "[403]: Request not allowed", "claude");
  assert.equal(result, PROVIDER_ERROR_TYPES.REQUEST_REJECTED);
});

test("classifyProviderError: 'Request not allowed' from a non-Anthropic OAuth provider keeps its 403 semantics", () => {
  const body = JSON.stringify({ error: { message: "Request not allowed" } });
  assert.equal(classifyProviderError(403, body, "codex"), PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.equal(classifyProviderError(403, body, undefined), PROVIDER_ERROR_TYPES.FORBIDDEN);
});

test("classifyProviderError: other claude 403 bodies still classify as before", () => {
  assert.equal(
    classifyProviderError(403, { error: { message: "you do not have permission" } }, "claude"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
  assert.equal(
    classifyProviderError(
      403,
      JSON.stringify({ error: { message: "account_deactivated: this account has been disabled" } }),
      "claude"
    ),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
  );
});

test("isAnthropicRequestNotAllowed / isAnthropicOAuthProvider helpers", () => {
  assert.equal(isAnthropicRequestNotAllowed("Request not allowed"), true);
  assert.equal(isAnthropicRequestNotAllowed('{"message":"request NOT allowed"}'), true);
  assert.equal(isAnthropicRequestNotAllowed("requests not allowed here"), false);
  assert.equal(isAnthropicRequestNotAllowed(""), false);
  assert.equal(isAnthropicOAuthProvider("claude"), true);
  assert.equal(isAnthropicOAuthProvider("Claude"), true);
  assert.equal(isAnthropicOAuthProvider("anthropic"), false);
  assert.equal(isAnthropicOAuthProvider(null), false);
});
