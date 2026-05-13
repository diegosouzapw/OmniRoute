import test from "node:test";
import assert from "node:assert/strict";

const { CLOUD_AGENT_STATUS, CloudAgentStatusSchema, CloudAgentTask } =
  await import("../../src/lib/cloudAgent/types.ts");
const { CreateCloudAgentTaskSchema, UpdateCloudAgentTaskSchema } =
  await import("../../src/lib/cloudAgent/types.ts");
const { isCloudAgentProvider, getAgent, getAvailableAgents } =
  await import("../../src/lib/cloudAgent/registry.ts");

test("CLOUD_AGENT_STATUS has correct values", () => {
  assert.strictEqual(CLOUD_AGENT_STATUS.QUEUED, "queued");
  assert.strictEqual(CLOUD_AGENT_STATUS.RUNNING, "running");
  assert.strictEqual(CLOUD_AGENT_STATUS.AWAITING_APPROVAL, "awaiting_approval");
  assert.strictEqual(CLOUD_AGENT_STATUS.COMPLETED, "completed");
  assert.strictEqual(CLOUD_AGENT_STATUS.FAILED, "failed");
  assert.strictEqual(CLOUD_AGENT_STATUS.CANCELLED, "cancelled");
});

test("CloudAgentStatusSchema validates valid statuses", () => {
  const validStatuses = [
    "queued",
    "running",
    "awaiting_approval",
    "completed",
    "failed",
    "cancelled",
  ];
  for (const status of validStatuses) {
    const result = CloudAgentStatusSchema.safeParse(status);
    assert.strictEqual(result.success, true, `Status ${status} should be valid`);
  }
});

test("CloudAgentStatusSchema rejects invalid status", () => {
  const result = CloudAgentStatusSchema.safeParse("invalid");
  assert.strictEqual(result.success, false);
});

test("CreateCloudAgentTaskSchema validates valid input", () => {
  const validInput = {
    providerId: "jules",
    prompt: "Fix the bug in auth.ts",
    source: {
      repoName: "my-repo",
      repoUrl: "https://github.com/user/my-repo",
      branch: "main",
    },
    options: {
      autoCreatePr: true,
      planApprovalRequired: true,
    },
  };
  const result = CreateCloudAgentTaskSchema.safeParse(validInput);
  assert.strictEqual(result.success, true);
});

test("CreateCloudAgentTaskSchema rejects missing required fields", () => {
  const invalidInput = {
    providerId: "jules",
  };
  const result = CreateCloudAgentTaskSchema.safeParse(invalidInput);
  assert.strictEqual(result.success, false);
});

test("CreateCloudAgentTaskSchema rejects invalid providerId", () => {
  const invalidInput = {
    providerId: "invalid-provider",
    prompt: "Test",
    source: {
      repoName: "test",
      repoUrl: "https://github.com/test/test",
    },
  };
  const result = CreateCloudAgentTaskSchema.safeParse(invalidInput);
  assert.strictEqual(result.success, false);
});

test("CreateCloudAgentTaskSchema rejects invalid repoUrl", () => {
  const invalidInput = {
    providerId: "jules",
    prompt: "Test",
    source: {
      repoName: "test",
      repoUrl: "not-a-url",
    },
  };
  const result = CreateCloudAgentTaskSchema.safeParse(invalidInput);
  assert.strictEqual(result.success, false);
});

test("UpdateCloudAgentTaskSchema validates approve action", () => {
  const validInput = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    action: "approve",
  };
  const result = UpdateCloudAgentTaskSchema.safeParse(validInput);
  assert.strictEqual(result.success, true);
});

test("UpdateCloudAgentTaskSchema validates cancel action", () => {
  const validInput = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    action: "cancel",
  };
  const result = UpdateCloudAgentTaskSchema.safeParse(validInput);
  assert.strictEqual(result.success, true);
});

test("UpdateCloudAgentTaskSchema validates message action with content", () => {
  const validInput = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    action: "message",
    message: "Please continue with the next step",
  };
  const result = UpdateCloudAgentTaskSchema.safeParse(validInput);
  assert.strictEqual(result.success, true);
});

test("UpdateCloudAgentTaskSchema allows message without content (optional)", () => {
  const validInput = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    action: "message",
  };
  const result = UpdateCloudAgentTaskSchema.safeParse(validInput);
  assert.strictEqual(result.success, true);
});

test("getAvailableAgents returns all registered agents", () => {
  const agents = getAvailableAgents();
  assert.strictEqual(agents.includes("jules"), true);
  assert.strictEqual(agents.includes("devin"), true);
  assert.strictEqual(agents.includes("codex-cloud"), true);
  assert.strictEqual(agents.length, 3);
});

test("getAgent returns correct agent for valid providerId", () => {
  const jules = getAgent("jules");
  assert.notStrictEqual(jules, null);
  assert.strictEqual(jules?.providerId, "jules");

  const devin = getAgent("devin");
  assert.notStrictEqual(devin, null);
  assert.strictEqual(devin?.providerId, "devin");

  const codex = getAgent("codex-cloud");
  assert.notStrictEqual(codex, null);
  assert.strictEqual(codex?.providerId, "codex-cloud");
});

test("getAgent returns null for invalid providerId", () => {
  const result = getAgent("invalid-provider");
  assert.strictEqual(result, null);
});

test("isCloudAgentProvider returns true for valid providers", () => {
  assert.strictEqual(isCloudAgentProvider("jules"), true);
  assert.strictEqual(isCloudAgentProvider("devin"), true);
  assert.strictEqual(isCloudAgentProvider("codex-cloud"), true);
});

test("isCloudAgentProvider returns false for invalid providers", () => {
  assert.strictEqual(isCloudAgentProvider("openai"), false);
  assert.strictEqual(isCloudAgentProvider("anthropic"), false);
  assert.strictEqual(isCloudAgentProvider("invalid"), false);
});
