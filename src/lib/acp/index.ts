/**
 * ACP Module — Public API
 *
 * Re-exports the registry and manager for convenient imports.
 */

export { detectInstalledAgents, getAgentById, getAvailableAgents } from "./registry";
export type { CliAgentInfo } from "./registry";

export { AcpManager, acpManager } from "./manager";
export type { AcpSession } from "./manager";
