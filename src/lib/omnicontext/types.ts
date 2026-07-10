export type ScopeConfidence = "high" | "medium" | "low";

export type ProjectRole = "member" | "lead" | "admin";

export type PublishPolicy = "auto" | "review_required" | "lead_only";

export type AutoPublishMode = "off" | "confirm" | "draft-only";

export type OmniContextPermission =
  "VIEW" | "PUBLISH" | "HANDOFF" | "MANAGE_MEMBERS" | "APPROVE" | "MANAGE_PROJECT";

export interface ScopeRef {
  orgId?: string;
  teamId?: string;
  projectId?: string;
  objectiveId?: string;
  ticketId?: string;
  repo?: string;
  branch?: string;
}

export interface WorkContext {
  tool?: string;
  appCategory: "ide" | "cli" | "chat" | "unknown";
  repo?: string;
  gitBranch?: string;
  ticketId?: string;
  workspace?: string;
  provider?: string;
  requestModel?: string;
  scopeConfidence: ScopeConfidence;
}

export interface ScopeResolution {
  scope: ScopeRef;
  confidence: ScopeConfidence;
  reason: string;
}

export interface OmniContextSettings {
  enabled: boolean;
  injectBudgetTokens: number;
  retrieveTimeoutMs: number;
  gitProbeEnabled: boolean;
  autoPublish: AutoPublishMode;
}

/** Per-request opt-out header (Phase 1 inject path). */
export const NO_OMNICONTEXT_HEADER = "x-omniroute-no-omnicontext";

export const PROJECT_ID_HEADER = "x-omniroute-project-id";
export const REPO_HEADER = "x-omniroute-repo";
export const TICKET_HEADER = "x-omniroute-ticket";
export const TOOL_HEADER = "x-omniroute-tool";
