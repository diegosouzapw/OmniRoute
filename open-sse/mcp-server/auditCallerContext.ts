import { AsyncLocalStorage } from "node:async_hooks";

type McpAuditCallerContext = {
  apiKeyId: string;
};

const mcpAuditCallerContext = new AsyncLocalStorage<McpAuditCallerContext>();

function normalizeApiKeyId(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

/**
 * Bind the authenticated caller's database key id to one MCP tool invocation.
 *
 * Only the non-secret `authInfo.clientId` resolved by the HTTP transport is
 * passed here. An absent id intentionally leaves any existing context intact,
 * so stdio and other unscoped callers retain the audit logger's static env
 * fallback.
 */
export function withMcpAuditCallerId<T>(apiKeyId: unknown, callback: () => T): T {
  const normalized = normalizeApiKeyId(apiKeyId);
  if (!normalized) return callback();
  return mcpAuditCallerContext.run({ apiKeyId: normalized }, callback);
}

/** Return the current request's non-secret API-key id, if one is bound. */
export function getMcpAuditCallerId(): string | undefined {
  return mcpAuditCallerContext.getStore()?.apiKeyId;
}
