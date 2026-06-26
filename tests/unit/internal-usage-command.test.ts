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

test("buildUsageCommandText formats API key usage limits as percentages by default", async () => {
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
    ["Cota pessoal", "Diaria", "20%", "Resets in 15h", "", "Semanal", "11%", "Resets in 7d"].join(
      "\n"
    )
  );
});

test("buildUsageCommandText keeps USD output when the API key display flag is enabled", async () => {
  const text = await buildUsageCommandText(
    {
      id: "key-limited",
      name: "limited",
      allowedConnections: ["conn-claude"],
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 10,
      weeklyUsageLimitUsd: 50,
      usageCommandShowUsd: true,
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

test("handleInternalUsageCommand streams Responses API events for Codex clients", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: {
        Authorization: "Bearer sk-enabled",
        Accept: "text/event-stream",
      },
    }),
    {
      model: "codex/gpt-5.5",
      input: [{ role: "user", content: [{ type: "input_text", text: "@@om-usage" }] }],
      stream: true,
    },
    {
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => ({
        id: "key-enabled",
        name: "enabled",
        allowedConnections: ["conn-codex"],
        allowUsageCommand: true,
      }),
      now: () => NOW,
      getProviderConnectionById: async () => ({
        id: "conn-codex",
        provider: "codex",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => ({
        plan: "Codex Pro",
        quotas: {
          "weekly (7d)": {
            used: 72,
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
  assert.match(response.headers.get("Content-Type") || "", /text\/event-stream/);
  const text = await response.text();
  assert.match(text, /event: response\.output_text\.delta/);
  assert.match(text, /Weekly \(7 day\)\\n72%\\nResets in 1d/);
  assert.match(text, /event: response\.completed/);
});

test("handleInternalUsageCommand prefers Codex quota snapshots for Responses API callers", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: {
        Authorization: "Bearer sk-enabled",
        Accept: "text/event-stream",
      },
    }),
    {
      model: "codex/gpt-5.5",
      input: [{ role: "user", content: [{ type: "input_text", text: "@@om-usage" }] }],
      stream: true,
    },
    {
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => ({
        id: "key-enabled",
        name: "enabled",
        allowedConnections: ["conn-claude", "conn-codex"],
        allowUsageCommand: true,
      }),
      now: () => NOW,
      getProviderConnectionById: async (connectionId) => ({
        id: connectionId,
        provider: connectionId === "conn-codex" ? "codex" : "claude",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: (connectionId) => ({
        plan: connectionId === "conn-codex" ? "Codex Pro" : "Claude Max",
        quotas: {
          "weekly (7d)": {
            used: connectionId === "conn-codex" ? 18 : 72,
            total: 100,
            resetAt: new Date(NOW + 24 * 60 * 60_000).toISOString(),
          },
          "weekly sonnet (7d)": {
            used: connectionId === "conn-codex" ? 0 : 30,
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
  const text = await response.text();
  assert.match(text, /Codex Pro/);
  assert.match(text, /Weekly \(7 day\)\\n18%\\nResets in 1d/);
  assert.doesNotMatch(text, /Claude Max/);
});

test("handleInternalUsageCommand keeps Claude quota snapshots for Anthropic callers", async () => {
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
      messages: [{ role: "user", content: "@@om-usage" }],
    },
    {
      isValidApiKey: async () => true,
      getApiKeyMetadata: async () => ({
        id: "key-enabled",
        name: "enabled",
        allowedConnections: ["conn-codex", "conn-claude"],
        allowUsageCommand: true,
      }),
      now: () => NOW,
      getProviderConnectionById: async (connectionId) => ({
        id: connectionId,
        provider: connectionId === "conn-codex" ? "codex" : "claude",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: (connectionId) => ({
        plan: connectionId === "conn-codex" ? "Codex Pro" : "Claude Max",
        quotas: {
          "weekly (7d)": {
            used: connectionId === "conn-codex" ? 18 : 72,
            total: 100,
            resetAt: new Date(NOW + 24 * 60 * 60_000).toISOString(),
          },
          "weekly sonnet (7d)": {
            used: connectionId === "conn-codex" ? 0 : 30,
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
  const body = (await response.json()) as {
    content: Array<{ type: string; text: string }>;
  };
  assert.match(body.content[0].text, /Claude Max/);
  assert.match(body.content[0].text, /Weekly \(7 day\)\n72%\nResets in 1d/);
  assert.doesNotMatch(body.content[0].text, /Codex Pro/);
});

test("handleInternalUsageCommand detects Claude Code usage command beside local output", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        "anthropic-version": "2023-06-01",
        "x-api-key": "sk-enabled",
      },
    }),
    {
      model: "claude/claude-opus-4-8",
      stream: true,
      tools: [{ name: "Read", input_schema: { type: "object" } }],
      messages: [
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_local_model",
              content: "local /model command output that Claude Code keeps in context",
            },
            { type: "text", text: "@@om-usage" },
          ],
        },
      ],
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
          "weekly (7d)": {
            used: 72,
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
  assert.match(response.headers.get("Content-Type") || "", /text\/event-stream/);
  const text = await response.text();
  assert.match(text, /event: content_block_delta/);
  assert.match(text, /Claude Max/);
  assert.match(text, /event: message_stop/);
});

test("handleInternalUsageCommand ignores Claude Code title generation prompts", async () => {
  const response = await handleInternalUsageCommand(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        "anthropic-version": "2023-06-01",
        "x-api-key": "sk-enabled",
      },
    }),
    {
      model: "claude/claude-opus-4-8",
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: [
                "<session>",
                "@@om-usage",
                "</session>",
                "",
                "Write the title in the language the user wrote in, regardless of examples.",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      isValidApiKey: async () => {
        throw new Error("auth must not run for Claude Code title prompts");
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
