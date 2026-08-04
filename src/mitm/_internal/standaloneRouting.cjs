"use strict";

const AGENT_ROUTE_CONFIG = {
  antigravity: {
    aliasKey: "antigravity",
    chatUrlPatterns: [":generateContent", ":streamGenerateContent"],
    routerPath: "/v1/chat/completions",
  },
  "claude-code": {
    aliasKey: "claude-code",
    chatUrlPatterns: ["/v1/messages"],
    routerPath: "/v1/messages",
  },
  kiro: {
    aliasKey: "kiro",
    chatUrlPatterns: ["/v1/messages"],
    routerPath: "/v1/messages",
  },
};

function getAgentRouteConfig(agentId) {
  return AGENT_ROUTE_CONFIG[agentId] || AGENT_ROUTE_CONFIG.antigravity;
}

function resolveForwardTargetForAgent({
  routerBaseUrl,
  routerMessagesUrl,
  body,
  agentId,
  fallbackResolver,
}) {
  const config = getAgentRouteConfig(agentId);
  if (config.routerPath === "/v1/messages") {
    return { format: "anthropic", url: routerMessagesUrl };
  }
  return fallbackResolver(routerBaseUrl, body);
}

function resolveMappedOverride(model, agentId, deps) {
  if (!model) return null;

  const config = getAgentRouteConfig(agentId);
  const { fs, dbFile, getSqliteDb, aliasConfigShim } = deps;

  try {
    const db = getSqliteDb();
    if (db) {
      const row = db
        .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
        .get(config.aliasKey);
      if (row) {
        const mappings = aliasConfigShim.normalizeAliasMappings(JSON.parse(row.value));
        return mappings[model] || null;
      }
    }
  } catch {
    // Fall through to JSON fallback.
  }

  try {
    if (fs.existsSync(dbFile)) {
      const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
      const mappings = aliasConfigShim.normalizeAliasMappings(db.mitmAlias?.[config.aliasKey]);
      return mappings[model] || null;
    }
  } catch {
    // Ignore malformed legacy state.
  }

  return null;
}

module.exports = {
  AGENT_ROUTE_CONFIG,
  getAgentRouteConfig,
  resolveForwardTargetForAgent,
  resolveMappedOverride,
};
