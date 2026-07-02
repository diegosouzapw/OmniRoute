import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS,
  isAgentGoalRequestBody,
  resolveAgentGoalPolicy,
} from "../../open-sse/utils/agentGoalPolicy.ts";

test("detects Claude /goal slash command in nested message content", () => {
  assert.equal(
    isAgentGoalRequestBody({
      model: "claude-sonnet-4-5",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "please continue" },
            { type: "text", text: "/goal finish the migration without stopping" },
          ],
        },
      ],
    }),
    true
  );
});

test("does not detect ordinary goal text or longer slash commands", () => {
  assert.equal(isAgentGoalRequestBody({ messages: [{ content: "goal: keep going" }] }), false);
  assert.equal(isAgentGoalRequestBody({ messages: [{ content: "/goals list" }] }), false);
});

test("header can force goal policy and env can tune or disable recovery", () => {
  const forced = resolveAgentGoalPolicy(
    { messages: [{ content: "normal prompt" }] },
    { "x-omniroute-agent-goal": "true" },
    {
      OMNIROUTE_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS: "900000",
      OMNIROUTE_AGENT_GOAL_STREAM_RECOVERY: "false",
    }
  );

  assert.equal(forced.detected, true);
  assert.equal(forced.readinessMaxTimeoutMs, 900_000);
  assert.equal(forced.streamRecoveryEnabled, false);
});

test("goal policy defaults to 10 minute readiness cap with recovery enabled", () => {
  const policy = resolveAgentGoalPolicy({ messages: [{ content: "/goal ship it" }] }, null, {});

  assert.equal(policy.detected, true);
  assert.equal(policy.readinessMaxTimeoutMs, DEFAULT_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS);
  assert.equal(policy.streamRecoveryEnabled, true);
});

test("OMNIROUTE_AGENT_GOAL_POLICY_ENABLED defaults to true — heuristic stays active", () => {
  const policy = resolveAgentGoalPolicy({ messages: [{ content: "/goal ship it" }] }, null, {});

  assert.equal(policy.detected, true);
  assert.equal(policy.streamRecoveryEnabled, true);
});

test("OMNIROUTE_AGENT_GOAL_POLICY_ENABLED=false disables the heuristic entirely (no-op)", () => {
  const policy = resolveAgentGoalPolicy(
    { messages: [{ content: "/goal ship it" }] },
    { "x-omniroute-agent-goal": "true" },
    {
      OMNIROUTE_AGENT_GOAL_POLICY_ENABLED: "false",
      OMNIROUTE_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS: "900000",
    }
  );

  assert.equal(policy.detected, false, "detection must be a no-op even when header forces it");
  assert.equal(
    policy.readinessMaxTimeoutMs,
    DEFAULT_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS,
    "readiness timeout must never be elevated when the policy is disabled"
  );
  assert.equal(policy.streamRecoveryEnabled, false);
});
