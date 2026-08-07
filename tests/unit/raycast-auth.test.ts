/**
 * @file raycast-auth.test.ts
 * @description Unit tests for Raycast V2 signature + message conversion.
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast protocol tests
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildRaycastChatBody,
  convertOpenAiMessages,
  decodeAidFromRaycastJwt,
  inferProviderInfo,
  rot13rot5,
  signatureV2,
} from "../../open-sse/services/raycast.ts";

describe("raycast auth protocol", () => {
  it("rot13rot5 encodes alphanumerics", () => {
    assert.equal(rot13rot5("ABCabc123"), "NOPnop678");
  });

  it("signatureV2 matches raycast-relay fixture shape", () => {
    const secret = "6bc455473576ce2cd6f70426caff867aabbe3f7291c1a79681af5e8ce0ca1408";
    const timestamp = "1720000000";
    const deviceId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const payload = "{}";
    const sig = signatureV2(timestamp, deviceId, payload, secret);
    assert.match(sig, /^[a-f0-9]{64}$/);
    assert.equal(sig, signatureV2(timestamp, deviceId, payload, secret));
  });

  it("decodes aid from JWT payload", () => {
    const header = Buffer.from(JSON.stringify({ typ: "JWT", alg: "HS256" })).toString("base64url");
    const payload = Buffer.from(JSON.stringify({ aid: "test-aid-123", exp: 9999999999, iat: 1 })).toString(
      "base64url"
    );
    const jwt = `${header}.${payload}.fake-sig`;
    assert.equal(decodeAidFromRaycastJwt(jwt), "test-aid-123");
  });

  it("converts OpenAI messages to Raycast shape", () => {
    const { raycastMessages, systemInstruction } = convertOpenAiMessages([
      { role: "system", content: "Be concise" },
      { role: "user", content: "Hello" },
    ]);
    assert.equal(systemInstruction, "Be concise");
    assert.deepEqual(raycastMessages, [{ author: "user", content: { text: "Hello" } }]);
  });

  it("infers provider prefixes from model ids", () => {
    assert.deepEqual(inferProviderInfo("openai-gpt-5-mini"), {
      provider: "openai",
      model: "gpt-5-mini",
    });
    assert.deepEqual(inferProviderInfo("anthropic-claude-sonnet-4-6"), {
      provider: "anthropic",
      model: "claude-sonnet-4-6",
    });
    assert.deepEqual(inferProviderInfo("raycast-ray1"), { provider: "raycast", model: "ray1" });
  });

  it("buildRaycastChatBody includes thread_id and provider split", () => {
    const body = JSON.parse(
      buildRaycastChatBody("openai-gpt-5-mini", [{ role: "user", content: "ping" }], 0.7)
    );
    assert.equal(body.model, "gpt-5-mini");
    assert.equal(body.provider, "openai");
    assert.equal(body.temperature, 0.7);
    assert.equal(typeof body.thread_id, "string");
    assert.equal(body.messages[0].author, "user");
  });
});
