import test from "node:test";
import assert from "node:assert/strict";

import {
  buildUsageCommandText,
  extractLastUserText,
  handleInternalUsageCommand,
  isInternalUsageCommand,
} from "../../src/lib/usage/internalUsageCommand.ts";

const NOW = Date.parse("2026-06-16T12:00:00.000Z");

test("internal usage command only matches the exact trimmed user message", () => {
  assert.equal(isInternalUsageCommand("@@om-usage"), true);
  assert.equal(isInternalUsageCommand("   @@om-usage   "), true);
  assert.equal(isInternalUsageCommand("me mostra @@om-usage"), false);
  assert.equal(isInternalUsageCommand("@@om-usage agora"), false);
  assert.equal(isInternalUsageCommand("/@@om-usage"), false);
  assert.equal(isInternalUsageCommand("@@om-usage."), false);
  assert.equal(isInternalUsageCommand("@@om-usage\nabc"), false);
  assert.equal(isInternalUsageCommand("```@@om-usage```"), false);
  assert.equal(isInternalUsageCommand(null), false);
});

test("extractLastUserText supports OpenAI and Anthropic text content", () => {
  assert.equal(
    extractLastUserText({
      messages: [
        { role: "user", content: "first" },
        { role: "assistant", content: "middle" },
        { role: "user", content: [{ type: "text", text: "@@om-usage" }] },
      ],
    }),
    "@@om-usage"
  );

  assert.equal(
    extractLastUserText({
      input: [
        { role: "assistant", content: "ignored" },
        { role: "user", content: [{ type: "input_text", text: "hello" }] },
      ],
    }),
    "hello"
  );
});

test("buildUsageCommandText formats cached Claude usage windows exactly", async () => {
  const text = await buildUsageCommandText(
    {
      id: "key-1",
      name: "main",
      allowedConnections: ["conn-claude"],
    },
    {
      now: () => NOW,
      getProviderConnectionById: async () => ({
        id: "conn-claude",
        provider: "claude",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => ({
        plan: "Claude Max",
        quotas: {
          "session (5h)": {
            used: 53,
            total: 100,
            remaining: 47,
            resetAt: new Date(NOW + 9 * 60_000).toISOString(),
          },
          "weekly (7d)": {
            used: 72,
            total: 100,
            remaining: 28,
            resetAt: new Date(NOW + 24 * 60 * 60_000).toISOString(),
          },
          "weekly sonnet (7d)": {
            used: 30,
            total: 100,
            remaining: 70,
            resetAt: new Date(NOW + 24 * 60 * 60_000).toISOString(),
          },
        },
        message: null,
        fetchedAt: new Date(NOW).toISOString(),
      }),
      getAllProviderLimitsCache: () => ({}),
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => null,
    }
  );

  assert.equal(
    text,
    [
      "Plan",
      "Claude Max",
      "",
      "Usage",
      "Session (5hr)",
      "53%",
      "Resets in 9m",
      "",
      "Weekly (7 day)",
      "72%",
      "Resets in 1d",
      "",
      "Weekly Sonnet",
      "30%",
      "Resets in 1d",
    ].join("\n")
  );
});

test("handleInternalUsageCommand returns disabled response locally without provider routing", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer sk-disabled" },
    }),
    {
      model: "claude-opus-4-8",
      messages: [{ role: "user", content: "@@om-usage" }],
    },
    {
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => ({
        id: "key-disabled",
        name: "disabled",
        allowedConnections: [],
        allowUsageCommand: false,
      }),
      now: () => NOW,
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => {
        throw new Error("provider connection lookup must not run when disabled");
      },
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => {
        throw new Error("provider cache lookup must not run when disabled");
      },
    }
  );

  assert.ok(response, "command should be handled locally");
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };
  assert.equal(body.choices[0].message.content, "Usage command is disabled for this API key.");
});

test("handleInternalUsageCommand returns enabled usage snapshot locally", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        "anthropic-version": "2023-06-01",
        "x-api-key": "sk-enabled",
      },
    }),
    {
      model: "claude-opus-4-8",
      messages: [{ role: "user", content: "  @@om-usage  " }],
    },
    {
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => ({
        id: "key-enabled",
        name: "enabled",
        allowedConnections: ["conn-claude"],
        allowUsageCommand: true,
      }),
      now: () => NOW,
      getProviderConnectionById: async () => ({
        id: "conn-claude",
        provider: "claude",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => ({
        plan: "Claude Max",
        quotas: {
          "session (5h)": {
            used: 53,
            total: 100,
            resetAt: new Date(NOW + 9 * 60_000).toISOString(),
          },
          "weekly (7d)": {
            used: 72,
            total: 100,
            resetAt: new Date(NOW + 24 * 60 * 60_000).toISOString(),
          },
          "weekly sonnet (7d)": {
            used: 30,
            total: 100,
            resetAt: new Date(NOW + 24 * 60 * 60_000).toISOString(),
          },
        },
        message: null,
        fetchedAt: new Date(NOW).toISOString(),
      }),
      getAllProviderLimitsCache: () => ({}),
    }
  );

  assert.ok(response, "command should be handled locally");
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    content: Array<{ type: string; text: string }>;
  };
  assert.equal(body.content[0].text.includes("Weekly Sonnet\n30%\nResets in 1d"), true);
});

test("handleInternalUsageCommand ignores normal prompts", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer sk-enabled" },
    }),
    {
      model: "claude-opus-4-8",
      messages: [{ role: "user", content: "me mostra @@om-usage" }],
    },
    {
      isValidApiKey: async () => {
        throw new Error("auth must not run for non-exact prompts");
      },
      getApiKeyMetadata: async () => null,
      now: () => NOW,
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
    }
  );

  assert.equal(response, null);
});
