import test from "node:test";
import assert from "node:assert/strict";

import {
  buildUsageCommandText,
  extractLastUserText,
  handleInternalUsageCommand,
  handleInternalUsageCommandHttpRequest,
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

test("buildUsageCommandText formats API key USD limits when fair usage is enabled", async () => {
  const text = await buildUsageCommandText(
    {
      id: "key-limited",
      name: "limited",
      allowedConnections: ["conn-claude"],
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 10,
      weeklyUsageLimitUsd: 50,
    },
    {
      now: () => NOW,
      getApiKeyUsageLimitStatus: async () => ({
        enabled: true,
        dailyLimitUsd: 10,
        weeklyLimitUsd: 50,
        dailySpentUsd: 2,
        weeklySpentUsd: 5.25,
        dailyWindowStartIso: "2026-06-16T03:00:00.000Z",
        dailyResetAtIso: "2026-06-17T03:00:00.000Z",
        weeklyWindowStartIso: "2026-06-09T12:00:00.000Z",
        weeklyResetAtIso: "2026-06-23T12:00:00.000Z",
        dailyExceeded: false,
        weeklyExceeded: false,
      }),
      getProviderConnectionById: async () => {
        throw new Error("provider connection lookup must not run for fair usage output");
      },
      getProviderConnections: async () => {
        throw new Error("provider connection lookup must not run for fair usage output");
      },
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => {
        throw new Error("provider cache lookup must not run for fair usage output");
      },
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => null,
    }
  );

  assert.equal(
    text,
    [
      "Cota diaria",
      "$10.00",
      "Gasto diario",
      "$2.00",
      "Uso diario",
      "20%",
      "Resets in 15h",
      "",
      "Cota semanal",
      "$50.00",
      "Gasto semanal",
      "$5.25",
      "Uso semanal",
      "11%",
      "Resets in 7d",
    ].join("\n")
  );
});

test("handleInternalUsageCommandHttpRequest returns terminal text for an allowed API key", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage?provider=claude", {
      headers: { Authorization: "Bearer sk-allowed" },
    }),
    {
      now: () => NOW,
      isValidApiKey: async (apiKey) => apiKey === "sk-allowed",
      getApiKeyMetadata: async () => ({
        id: "key-allowed",
        name: "Claude terminal",
        allowedConnections: ["conn-codex", "conn-claude"],
        allowUsageCommand: true,
      }),
      getProviderConnectionById: async (connectionId) => ({
        id: connectionId,
        provider: connectionId === "conn-claude" ? "claude" : "codex",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: (connectionId) =>
        connectionId === "conn-claude"
          ? {
              plan: "Claude Max",
              quotas: {
                "session (5h)": {
                  used: 74,
                  total: 100,
                  remaining: 26,
                  resetAt: new Date(NOW + 2 * 60 * 60_000).toISOString(),
                },
                "weekly (7d)": {
                  used: 25,
                  total: 100,
                  remaining: 75,
                  resetAt: new Date(NOW + 6 * 24 * 60 * 60_000).toISOString(),
                },
              },
              message: null,
              fetchedAt: new Date(NOW).toISOString(),
            }
          : {
              plan: "Codex Pro",
              quotas: {
                weekly: {
                  used: 9,
                  total: 100,
                  remaining: 91,
                  resetAt: new Date(NOW + 5 * 24 * 60 * 60_000).toISOString(),
                },
              },
              message: null,
              fetchedAt: new Date(NOW).toISOString(),
            },
      getAllProviderLimitsCache: () => ({}),
      getApiKeyUsageLimitStatus: async () => {
        throw new Error("usage limit lookup must not run for provider quota output");
      },
    }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(
    await response.text(),
    [
      "Plan",
      "Claude Max",
      "",
      "Usage",
      "Session (5hr)",
      "74%",
      "Resets in 2h",
      "",
      "Weekly (7 day)",
      "25%",
      "Resets in 6d",
      "",
      "Weekly Sonnet",
      "Unavailable",
      "Resets in unknown",
    ].join("\n")
  );
});

test("handleInternalUsageCommandHttpRequest sanitizes internal errors and never leaks stack traces", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage", {
      headers: { Authorization: "Bearer sk-boom" },
    }),
    {
      isValidApiKey: async () => {
        throw new Error(
          `boom at /home/diegosouzapw/dev/proxys/OmniRoute/src/lib/usage/internalUsageCommand.ts:1:1`
        );
      },
      getApiKeyMetadata: async () => {
        throw new Error("metadata lookup must not run when auth check throws");
      },
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
      getApiKeyUsageLimitStatus: async () => {
        throw new Error("usage limit lookup must not run when auth check throws");
      },
    }
  );

  assert.equal(response.status, 500);
  assert.equal(response.headers.get("content-type"), "application/json");
  const body = await response.json();
  assert.equal(typeof body.error.message, "string");
  assert.equal(body.error.message.includes("at /"), false);
  assert.equal(body.error.message.includes("internalUsageCommand.ts"), false);
});

test("handleInternalUsageCommandHttpRequest rejects invalid API keys as plain text", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage", {
      headers: { Authorization: "Bearer sk-invalid" },
    }),
    {
      isValidApiKey: async () => false,
      getApiKeyMetadata: async () => {
        throw new Error("metadata lookup must not run for invalid keys");
      },
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
      getApiKeyUsageLimitStatus: async () => {
        throw new Error("usage limit lookup must not run for invalid keys");
      },
    }
  );

  assert.equal(response.status, 401);
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(await response.text(), "Usage command requires an authenticated API key.");
});

test("handleInternalUsageCommandHttpRequest rejects API keys without usage command access", async () => {
  const response = await handleInternalUsageCommandHttpRequest(
    new Request("http://localhost/api/usage/om-usage", {
      headers: { Authorization: "Bearer sk-disabled" },
    }),
    {
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => ({
        id: "key-disabled",
        allowUsageCommand: false,
      }),
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => null,
      getAllProviderLimitsCache: () => ({}),
      getApiKeyUsageLimitStatus: async () => {
        throw new Error("usage limit lookup must not run for disabled keys");
      },
    }
  );

  assert.equal(response.status, 403);
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(await response.text(), "Usage command is disabled for this API key.");
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
