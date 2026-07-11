export type ScopeConfidence = "high" | "medium" | "low";

export type ProjectRole = "member" | "lead" | "admin";

export type PublishPolicy = "auto" | "review_required" | "lead_only";

export type AutoPublishMode = "off" | "confirm" | "draft-only";

export type OmniContextBackendMode = "native" | "remote";

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
  departmentId?: string;
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

export interface UniversalHandoffSettings {
  enabled: boolean;
  trigger: "always" | "on-switch" | "on-error";
  maxMessagesForSummary: number;
  handoffModel: string;
  ttlMinutes: number;
  preserveSystemPrompt: boolean;
}

export interface OmniContextSettings {
  enabled: boolean;
  injectBudgetTokens: number;
  retrieveTimeoutMs: number;
  gitProbeEnabled: boolean;
  autoPublish: AutoPublishMode;
  /** Phase 2: FTS + local embedding hybrid retrieve */
  hybridRetrieve: boolean;
  /** Phase 2: never truncate stable_prefix before dynamic sections */
  preferStablePrefix: boolean;
  /** Phase 3: native SQLite vs remote Continuity HTTP backend */
  backend: OmniContextBackendMode;
  remoteBaseUrl: string;
  remoteApiKey: string;
  remoteTimeoutMs: number;
  /** Phase 4: run DLP hook before publish */
  dlpEnabled: boolean;
  /** Phase 4: department-scoped projects default to review_required */
  departmentReviewRequired: boolean;
  /** Global defaults for routing universal handoff (A4) */
  universalHandoff: UniversalHandoffSettings;
}

/** Per-request opt-out header (Phase 1 inject path). */
export const NO_OMNICONTEXT_HEADER = "x-omniroute-no-omnicontext";

export const PROJECT_ID_HEADER = "x-omniroute-project-id";
export const REPO_HEADER = "x-omniroute-repo";
export const TICKET_HEADER = "x-omniroute-ticket";
export const TOOL_HEADER = "x-omniroute-tool";
export const TEAM_ID_HEADER = "x-omniroute-team-id";
export const DEPARTMENT_HEADER = "x-omniroute-department";
