import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildAntigravityEnvelopeIdentity,
  deriveAntigravitySessionId,
} from "../../open-sse/services/antigravityIdentity.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

describe("Part A - Antigravity Envelope Identity and Labels", () => {
  it("buildAntigravityEnvelopeIdentity produces expected requestId, labels, and session fallback", () => {
    const identityClaude = buildAntigravityEnvelopeIdentity({
      isClaude: true,
      sessionIdFallback: "custom-session-123",
      firstUserText: "Hello there",
    });

    assert.match(
      identityClaude.requestId,
      /^agent\/[0-9a-f-]{36}\/\d+\/[0-9a-f-]{36}\/2$/,
      "requestId matches agent/<uuid>/<ts>/<uuid>/2"
    );
    assert.equal(identityClaude.sessionId, "custom-session-123");
    assert.deepEqual(identityClaude.labels, {
      last_step_index: "1",
      trajectory_id: identityClaude.requestId.split("/")[3],
      used_claude: "true",
      used_claude_conservative: "true",
    });
    assert.equal("model_enum" in identityClaude.labels, false);

    const identityGemini = buildAntigravityEnvelopeIdentity({
      isClaude: false,
      firstUserText: "First prompt",
    });
    assert.match(identityGemini.requestId, /^agent\/[0-9a-f-]{36}\/\d+\/[0-9a-f-]{36}\/2$/);
    assert.equal(identityGemini.sessionId, deriveAntigravitySessionId("First prompt"));
    assert.deepEqual(identityGemini.labels, {
      last_step_index: "1",
      trajectory_id: identityGemini.requestId.split("/")[3],
      used_claude: "false",
      used_claude_conservative: "false",
    });
    assert.equal("model_enum" in identityGemini.labels, false);
  });

  it("transformRequest attaches labels and structured requestId to envelope, surviving Claude sanitizer", async () => {
    const executor = new AntigravityExecutor();
    const creds = {
      accessToken: "test-token",
      projectId: "test-project-123",
    };

    // Test Claude model
    const claudeResult = await executor.transformRequest(
      "claude-3-5-sonnet",
      {
        contents: [{ role: "user", parts: [{ text: "Hello Claude" }] }],
      },
      true,
      creds
    );
    assert.ok(!(claudeResult instanceof Response));
    const claudeEnvelope = claudeResult;
    const claudeRequest = claudeEnvelope.request as Record<string, unknown>;
    const claudeLabels = claudeRequest.labels as Record<string, string>;

    assert.match(claudeEnvelope.requestId, /^agent\/[0-9a-f-]{36}\/\d+\/[0-9a-f-]{36}\/2$/);
    assert.ok(claudeEnvelope.request, "has inner request");
    assert.ok(claudeLabels, "labels attached to inner request");
    assert.equal(claudeLabels.used_claude, "true");
    assert.equal(claudeLabels.used_claude_conservative, "true");
    assert.equal(claudeLabels.last_step_index, "1");
    assert.equal(claudeLabels.trajectory_id, claudeEnvelope.requestId.split("/")[3]);
    assert.equal("model_enum" in claudeLabels, false);

    // Test Gemini model
    const geminiResult = await executor.transformRequest(
      "gemini-2.5-flash",
      {
        contents: [{ role: "user", parts: [{ text: "Hello Gemini" }] }],
      },
      true,
      creds
    );
    assert.ok(!(geminiResult instanceof Response));
    const geminiEnvelope = geminiResult;
    const geminiRequest = geminiEnvelope.request as Record<string, unknown>;
    const geminiLabels = geminiRequest.labels as Record<string, string>;

    assert.match(geminiEnvelope.requestId, /^agent\/[0-9a-f-]{36}\/\d+\/[0-9a-f-]{36}\/2$/);
    assert.ok(geminiLabels, "labels attached to Gemini inner request");
    assert.equal(geminiLabels.used_claude, "false");
    assert.equal(geminiLabels.used_claude_conservative, "false");
    assert.equal(geminiLabels.trajectory_id, geminiEnvelope.requestId.split("/")[3]);
  });
});
