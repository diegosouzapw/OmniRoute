import assert from "node:assert/strict";
import { test } from "node:test";

// Regression guard for audit #15159 / Hard Rule #12 — E-15 (stability upscale).
//
// `open-sse/handlers/imageUpscale/stability.ts` leaked raw upstream error text to clients at
// two sites; both tests drive the real handler through an injected `fetchImpl` and fail when
// the matching production hunk is reverted:
//
// 1. `handleStabilityImageUpscale` passed the raw `response.text()` of a non-ok upscale POST
//    straight to `saveUpscaleErrorResult`.
// 2. `pollStabilityResult` truncated the raw `response.text()` to 300 chars BEFORE the outer
//    catch sanitized the whole message. An unlabeled JWT straddling the cut is then left as a
//    partial token (header + part of the payload — the claims) that no credential pattern
//    matches. Sanitizing the text first redacts the complete token before it is truncated.

const IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

async function runStability(
  model: string,
  fetchImpl: typeof fetch
): Promise<{ status?: number; error?: unknown }> {
  const { handleStabilityImageUpscale } =
    await import("../../open-sse/handlers/imageUpscale/stability.ts");
  return handleStabilityImageUpscale({
    model,
    provider: "stability-ai",
    providerConfig: { baseUrl: "https://api.stability.ai" },
    body: { image: IMAGE, prompt: "test" },
    credentials: { apiKey: "test-key" },
    fetchImpl,
  });
}

test("E-15: stability upscale never surfaces raw upstream response.text() in 502", async () => {
  const raw = "upstream failed at /srv/app/client.ts:44:15 api_key=sk-1234567890abcdef";

  const result = await runStability(
    "conservative",
    (async () =>
      new Response(raw, {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch
  );

  assert.equal(result.status, 502);
  assert.ok(!String(result.error).includes("at /srv/app/client.ts:44:15"), "stack frame leaked");
  assert.ok(!String(result.error).includes("/srv/app/"), "absolute path leaked");
  assert.ok(!String(result.error).includes("sk-1234567890abcdef"), "api key leaked");
});

test("E-15: pollStabilityResult redacts a JWT that straddles the 300-char truncation", async () => {
  const jwtHeader = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const jwtPayload = "eyJzdWIiOiJ1c2VyLTEyMzQ1Njc4OTAiLCJyb2xlIjoiYWRtaW4ifQ";
  const jwtSignature = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const jwt = `${jwtHeader}.${jwtPayload}.${jwtSignature}`;
  // The JWT starts at char 250 of the body, so slice(0, 300) keeps the header, the dot and the
  // first 13 payload chars only — no complete token is left for the outer sanitizer to match.
  const raw = "upstream rejected the job. ".repeat(10).slice(0, 250) + jwt;
  assert.ok(raw.slice(0, 300).includes(jwtHeader), "fixture: header must survive the cut");
  assert.ok(!raw.slice(0, 300).includes(jwtSignature), "fixture: signature must be cut off");

  let calls = 0;
  const result = await runStability("creative", (async () => {
    calls += 1;
    if (calls === 1) {
      // POST /v2beta/stable-image/upscale/creative → async job id
      return new Response(JSON.stringify({ id: "job-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // GET /v2beta/results/job-123 → non-retryable 400 with the hostile body
    return new Response(raw, { status: 400, headers: { "Content-Type": "text/plain" } });
  }) as typeof fetch);

  assert.equal(calls, 2, "the handler must reach pollStabilityResult");
  assert.equal(result.status, 502);
  const errorStr = String(result.error);
  assert.match(errorStr, /Stability AI upscale result failed \(400\)/);
  assert.ok(!errorStr.includes(jwtHeader), "JWT header leaked");
  assert.ok(!errorStr.includes(jwtPayload.slice(0, 13)), "JWT payload prefix leaked");
});
