/**
 * OmniRoute MCP Server — barrel export.
 */
export { createMcpServer, startMcpStdio } from "./server.ts";
export { logToolCall, getRecentAuditEntries, getAuditStats, queryAuditEntries } from "./audit.ts";
export {
  resolveMcpHeartbeatPath,
  readMcpHeartbeat,
  isMcpHeartbeatOnline,
  isProcessAlive,
} from "./runtimeHeartbeat.ts";
export {
  handleMcpSSE,
  handleMcpStreamableHTTP,
  getMcpHttpStatus,
  shutdownMcpHttp,
  isMcpHttpActive,
} from "./httpTransport.ts";
export * from "./schemas/index.ts";
