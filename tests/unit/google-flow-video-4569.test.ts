/**
 * #4569 — Google Flow video generation helpers.
 *
 * Covers the pure transformation logic (param normalization, Veo submit-body
 * construction, operation-name parsing, LRO result parsing, credential
 * resolution) and a source guard asserting the wire endpoint stays isolated and
 * flagged for live validation (Hard Rule #18).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  GOOGLE_FLOW_CREDENTIAL_PROVIDER,
  GOOGLE_FLOW_HOST,
  buildGoogleFlowSubmitBody,
  normalizeFlowVideoParams,
  parseFlowOperationName,
  parseFlowOperationResult,
  resolveFlowAccessToken,
  resolveFlowProjectId,
  resolveVideoCredentialProvider,
} from "../../open-sse/handlers/videoGeneration/googleFlow.ts";

import { getVideoProvider, parseVideoModel } from "../../open-sse/config/videoRegistry.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("normalizeFlowVideoParams: defaults sampleCount to 1 and stringifies prompt", () => {
  const p = normalizeFlowVideoParams({ prompt: "a cat surfing" });
  assert.equal(p.prompt, "a cat surfing");
  assert.equal(p.sampleCount, 1);
  assert.equal(p.aspectRatio, undefined);
  assert.equal(p.durationSeconds, undefined);
});

test("normalizeFlowVideoParams: reads snake_case OpenAI fields", () => {
  const p = normalizeFlowVideoParams({
    prompt: "x",
    aspect_ratio: "16:9",
    duration: 8,
    n: 2,
    negative_prompt: "blurry",
    resolution: "1080p",
  });
  assert.equal(p.aspectRatio, "16:9");
  assert.equal(p.durationSeconds, 8);
  assert.equal(p.sampleCount, 2);
  assert.equal(p.negativePrompt, "blurry");
  assert.equal(p.resolution, "1080p");
});

test("normalizeFlowVideoParams: reads camelCase native fields", () => {
  const p = normalizeFlowVideoParams({ prompt: "x", aspectRatio: "9:16", durationSeconds: 4 });
  assert.equal(p.aspectRatio, "9:16");
  assert.equal(p.durationSeconds, 4);
});

test("normalizeFlowVideoParams: treats ratio-shaped size as aspectRatio, ignores pixel size", () => {
  assert.equal(normalizeFlowVideoParams({ prompt: "x", size: "16:9" }).aspectRatio, "16:9");
  assert.equal(normalizeFlowVideoParams({ prompt: "x", size: "1024x1024" }).aspectRatio, undefined);
});

test("normalizeFlowVideoParams: rejects non-positive / non-finite numbers", () => {
  const p = normalizeFlowVideoParams({ prompt: "x", n: 0, duration: -5 });
  assert.equal(p.sampleCount, 1);
  assert.equal(p.durationSeconds, undefined);
});

test("buildGoogleFlowSubmitBody: emits documented Veo instances/parameters shape", () => {
  const body = buildGoogleFlowSubmitBody({
    prompt: "a dog",
    aspectRatio: "16:9",
    durationSeconds: 6,
    sampleCount: 1,
    negativePrompt: "ugly",
    resolution: "720p",
  });
  assert.deepEqual(body.instances, [{ prompt: "a dog" }]);
  assert.equal(body.parameters.sampleCount, 1);
  assert.equal(body.parameters.aspectRatio, "16:9");
  assert.equal(body.parameters.durationSeconds, 6);
  assert.equal(body.parameters.negativePrompt, "ugly");
  assert.equal(body.parameters.resolution, "720p");
});

test("buildGoogleFlowSubmitBody: omits absent optional parameters", () => {
  const body = buildGoogleFlowSubmitBody({ prompt: "p", sampleCount: 3 });
  assert.deepEqual(body.parameters, { sampleCount: 3 });
  assert.ok(!("aspectRatio" in body.parameters));
  assert.ok(!("durationSeconds" in body.parameters));
});

test("parseFlowOperationName: handles {name} and {operation:{name}} and rejects junk", () => {
  assert.equal(parseFlowOperationName({ name: "operations/abc" }), "operations/abc");
  assert.equal(parseFlowOperationName({ operation: { name: "operations/xyz" } }), "operations/xyz");
  assert.equal(parseFlowOperationName({}), null);
  assert.equal(parseFlowOperationName(null), null);
  assert.equal(parseFlowOperationName({ name: "" }), null);
});

test("parseFlowOperationResult: not done → keep polling", () => {
  assert.deepEqual(parseFlowOperationResult({ done: false }), { done: false });
  assert.deepEqual(parseFlowOperationResult({}), { done: false });
});

test("parseFlowOperationResult: done with base64 video (documented shape)", () => {
  const r = parseFlowOperationResult({
    done: true,
    response: { videos: [{ bytesBase64Encoded: "AAAA" }] },
  });
  assert.equal(r.done, true);
  assert.equal(r.base64, "AAAA");
  assert.equal(r.format, "mp4");
  assert.equal(r.error, undefined);
});

test("parseFlowOperationResult: done with gcsUri/uri video", () => {
  assert.equal(
    parseFlowOperationResult({ done: true, response: { videos: [{ gcsUri: "gs://b/v.mp4" }] } }).url,
    "gs://b/v.mp4"
  );
  assert.equal(
    parseFlowOperationResult({ done: true, response: { videos: [{ uri: "https://x/v.mp4" }] } }).url,
    "https://x/v.mp4"
  );
});

test("parseFlowOperationResult: done with alternate generateVideoResponse shape", () => {
  const r = parseFlowOperationResult({
    done: true,
    response: {
      generateVideoResponse: { generatedSamples: [{ video: { uri: "https://x/sample.mp4" } }] },
    },
  });
  assert.equal(r.url, "https://x/sample.mp4");
});

test("parseFlowOperationResult: done with error surfaces the message", () => {
  const r = parseFlowOperationResult({ done: true, error: { message: "quota exceeded" } });
  assert.equal(r.done, true);
  assert.equal(r.error, "quota exceeded");
});

test("parseFlowOperationResult: done but empty → explicit no-video error", () => {
  const r = parseFlowOperationResult({ done: true, response: {} });
  assert.equal(r.done, true);
  assert.match(r.error ?? "", /no video/i);
});

test("resolveFlowProjectId: direct, providerSpecificData, and missing", () => {
  assert.equal(resolveFlowProjectId({ projectId: "proj-1" }), "proj-1");
  assert.equal(resolveFlowProjectId({ providerSpecificData: { projectId: "proj-2" } }), "proj-2");
  assert.equal(resolveFlowProjectId({}), null);
  assert.equal(resolveFlowProjectId(null), null);
});

test("resolveFlowAccessToken: prefers accessToken, falls back to apiKey", () => {
  assert.equal(resolveFlowAccessToken({ accessToken: "tok" }), "tok");
  assert.equal(resolveFlowAccessToken({ apiKey: "key" }), "key");
  assert.equal(resolveFlowAccessToken({}), null);
});

test("videoRegistry: googleflow provider is registered with oauth + google-flow format", () => {
  const provider = getVideoProvider("googleflow");
  assert.ok(provider, "googleflow provider must exist");
  assert.equal(provider.format, "google-flow");
  assert.equal(provider.authType, "oauth");
  assert.ok(provider.models.length > 0, "must expose at least one Veo model");
});

test("videoRegistry: parseVideoModel resolves googleflow/<model> and its alias", () => {
  const parsed = parseVideoModel("googleflow/veo-3.1-generate");
  assert.equal(parsed.provider, "googleflow");
  assert.equal(parsed.model, "veo-3.1-generate");
  const aliased = parseVideoModel("flow/veo-3.1-generate");
  assert.equal(aliased.provider, "googleflow");
});

test("resolveVideoCredentialProvider: googleflow reuses antigravity OAuth, others unchanged", () => {
  assert.equal(resolveVideoCredentialProvider("googleflow"), "antigravity");
  assert.equal(GOOGLE_FLOW_CREDENTIAL_PROVIDER, "antigravity");
  assert.equal(resolveVideoCredentialProvider("vertex"), "vertex");
  assert.equal(resolveVideoCredentialProvider("kie"), "kie");
});

test("source guard: wire endpoint stays isolated + flagged for live validation (Rule #18)", () => {
  assert.match(GOOGLE_FLOW_HOST, /aisandbox-pa\.googleapis\.com/);
  const src = readFileSync(
    join(__dirname, "../../open-sse/handlers/videoGeneration/googleFlow.ts"),
    "utf8"
  );
  assert.match(src, /PENDING LIVE VALIDATION/, "wire format must be flagged for HAR validation");
});
