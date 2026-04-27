/**
 * Tests for Codex prompt_cache_key per-session behavior (#1643).
 *
 * Validates that getPromptCacheSessionId prefers per-conversation
 * session_id/conversation_id from request body over account-wide workspaceId.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// We test the logic inline since the method is private — replicate the priority logic
function getPromptCacheSessionId(
  credentials: { providerSpecificData?: { workspaceId?: string } } | null,
  body: Record<string, unknown> | null
): string | null {
  const sessionId = body?.session_id ?? body?.conversation_id;
  if (typeof sessionId === "string" && sessionId.length > 0) {
    return sessionId;
  }
  return credentials?.providerSpecificData?.workspaceId || null;
}

describe("Codex prompt_cache_key (#1643)", () => {
  it("should prefer body.session_id over workspaceId", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-account-001" } };
    const body = { session_id: "sess-conv-unique-001" };
    const result = getPromptCacheSessionId(creds, body);
    assert.equal(result, "sess-conv-unique-001");
  });

  it("should prefer body.conversation_id over workspaceId", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-account-001" } };
    const body = { conversation_id: "conv-unique-002" };
    const result = getPromptCacheSessionId(creds, body);
    assert.equal(result, "conv-unique-002");
  });

  it("should prefer session_id over conversation_id", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-account-001" } };
    const body = { session_id: "sess-001", conversation_id: "conv-002" };
    const result = getPromptCacheSessionId(creds, body);
    assert.equal(result, "sess-001");
  });

  it("should fall back to workspaceId when body has no session identifiers", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-account-001" } };
    const body = { model: "gpt-5.5" };
    const result = getPromptCacheSessionId(creds, body);
    assert.equal(result, "ws-account-001");
  });

  it("should fall back to workspaceId when body is null", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-account-001" } };
    const result = getPromptCacheSessionId(creds, null);
    assert.equal(result, "ws-account-001");
  });

  it("should return null when neither body nor credentials have IDs", () => {
    const result = getPromptCacheSessionId({}, {});
    assert.equal(result, null);
  });

  it("should return null for null credentials and empty body", () => {
    const result = getPromptCacheSessionId(null, null);
    assert.equal(result, null);
  });

  it("should ignore empty string session_id", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-001" } };
    const body = { session_id: "" };
    const result = getPromptCacheSessionId(creds, body);
    assert.equal(result, "ws-001");
  });

  it("should ignore non-string session_id", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-001" } };
    const body = { session_id: 12345 };
    const result = getPromptCacheSessionId(creds, body);
    assert.equal(result, "ws-001");
  });

  it("each conversation should get a unique cache key", () => {
    const creds = { providerSpecificData: { workspaceId: "ws-shared" } };
    const conv1 = { session_id: "conv-aaaa" };
    const conv2 = { session_id: "conv-bbbb" };
    const key1 = getPromptCacheSessionId(creds, conv1);
    const key2 = getPromptCacheSessionId(creds, conv2);
    assert.notEqual(key1, key2, "Different conversations should have different cache keys");
  });
});
