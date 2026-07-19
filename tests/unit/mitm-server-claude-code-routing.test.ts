import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const routing = require("../../src/mitm/_internal/standaloneRouting.cjs");
const aliasConfigShim = require("../../src/mitm/_internal/aliasConfig.cjs");

test("standalone MITM route config maps Claude Code and Kiro messages to /v1/messages", () => {
  const claude = routing.getAgentRouteConfig("claude-code");
  const kiro = routing.getAgentRouteConfig("kiro");
  const antigravity = routing.getAgentRouteConfig("antigravity");

  assert.equal(claude.aliasKey, "claude-code");
  assert.deepEqual(claude.chatUrlPatterns, ["/v1/messages"]);
  assert.equal(claude.routerPath, "/v1/messages");
  assert.equal(kiro.aliasKey, "kiro");
  assert.deepEqual(kiro.chatUrlPatterns, ["/v1/messages"]);
  assert.equal(kiro.routerPath, "/v1/messages");
  assert.deepEqual(antigravity.chatUrlPatterns, [":generateContent", ":streamGenerateContent"]);
  assert.equal(routing.getAgentRouteConfig("unknown"), antigravity);
});

test("standalone MITM forwards agents from routerPath, not hardcoded agent ids", () => {
  const fallbackCalls = [];
  const fallbackResolver = (baseUrl, body) => {
    fallbackCalls.push({ baseUrl, body });
    return { format: "openai", url: `${baseUrl}/v1/chat/completions` };
  };

  const claudeForward = routing.resolveForwardTargetForAgent({
    routerBaseUrl: "http://router",
    routerMessagesUrl: "http://router/v1/messages",
    body: { model: "claude-sonnet" },
    agentId: "claude-code",
    fallbackResolver,
  });
  const antigravityForward = routing.resolveForwardTargetForAgent({
    routerBaseUrl: "http://router",
    routerMessagesUrl: "http://router/v1/messages",
    body: { model: "gemini-pro" },
    agentId: "antigravity",
    fallbackResolver,
  });

  assert.deepEqual(claudeForward, {
    format: "anthropic",
    url: "http://router/v1/messages",
  });
  assert.deepEqual(antigravityForward, {
    format: "openai",
    url: "http://router/v1/chat/completions",
  });
  assert.equal(fallbackCalls.length, 1);
});

test("standalone MITM resolves structured aliases from the agent-specific namespace", () => {
  const rows = {
    "claude-code": JSON.stringify({
      "claude-source": { model: "anthropic/claude-sonnet-5", reasoningEffort: "high" },
    }),
    antigravity: JSON.stringify({
      "claude-source": "antigravity-should-not-win",
    }),
  };
  const db = {
    prepare(sql) {
      assert.equal(sql, "SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?");
      return {
        get(key) {
          return rows[key] ? { value: rows[key] } : undefined;
        },
      };
    },
  };

  const override = routing.resolveMappedOverride("claude-source", "claude-code", {
    fs: { existsSync: () => false },
    dbFile: "/unused/db.json",
    getSqliteDb: () => db,
    aliasConfigShim,
  });

  assert.deepEqual(override, {
    model: "anthropic/claude-sonnet-5",
    reasoningEffort: "high",
  });
});

test("standalone MITM resolves legacy JSON aliases from the agent-specific namespace", () => {
  const legacyDb = {
    mitmAlias: {
      kiro: {
        "kiro-source": "kiro/claude-sonnet-5",
      },
      antigravity: {
        "kiro-source": "antigravity-should-not-win",
      },
    },
  };

  const override = routing.resolveMappedOverride("kiro-source", "kiro", {
    fs: {
      existsSync: () => true,
      readFileSync: () => JSON.stringify(legacyDb),
    },
    dbFile: "/legacy/db.json",
    getSqliteDb: () => null,
    aliasConfigShim,
  });

  assert.deepEqual(override, { model: "kiro/claude-sonnet-5" });
});
