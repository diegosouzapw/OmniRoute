export type {
  ScopeConfidence,
  ProjectRole,
  PublishPolicy,
  AutoPublishMode,
  OmniContextPermission,
  ScopeRef,
  WorkContext,
  ScopeResolution,
  OmniContextSettings,
  OmniContextBackendMode,
  UniversalHandoffSettings,
} from "./types";

export {
  NO_OMNICONTEXT_HEADER,
  PROJECT_ID_HEADER,
  REPO_HEADER,
  TICKET_HEADER,
  TOOL_HEADER,
  TEAM_ID_HEADER,
  DEPARTMENT_HEADER,
} from "./types";

export {
  DEFAULT_OMNICONTEXT_SETTINGS,
  normalizeOmniContextSettings,
  toOmniContextSettingsUpdates,
  invalidateOmniContextSettingsCache,
  getOmniContextSettings,
  saveOmniContextSettings,
  isGitProbeEnvEnabled,
} from "./settings";

export { permissionsForRole, roleHasPermission, isValidProjectRole } from "./permissions";

export { buildWorkContext, readExplicitProjectId } from "./workContext";
export type { BuildWorkContextInput } from "./workContext";

export { resolveScope } from "./scope";
export type { ResolveScopeInput } from "./scope";

export { redactForPublish } from "./redact";
export { publishArtifact, PublishError } from "./publish";
export type { PublishArtifactInput, PublishArtifactResult } from "./publish";
export { retrieveForProject } from "./retrieve";
export type { RetrieveParams, RetrieveResult } from "./retrieve";
export { rankArtifacts } from "./rank";
export { buildInjectBlock, estimateTokens } from "./inject";
export { INJECT_LAYER_ORDER, assertInjectOrder } from "./assembler";
export { bootstrapFromDirectory } from "./bootstrap";
export { submitFeedback } from "./feedback";
export type { SubmitFeedbackInput } from "./feedback";
export { approvePendingArtifact, promoteArtifactToStable } from "./promote";
export {
  getOmniContextMetricsSummary,
  resetOmniContextMetrics,
  recordInjectSkipped,
} from "./metrics";
export type { InjectSkipReason } from "./metrics";
export {
  computeRetrieveCacheKey,
  getRetrieveCacheStats,
  clearRetrieveCache,
  invalidateRetrieveCache,
  OMNICONTEXT_RETRIEVE_CACHE_TTL_MS,
} from "./cache";
export { retrieveForProjectCached, getOmniContextRetrieveBreaker } from "./retrieveCached";
export { retrieveHybrid, indexArtifactEmbedding } from "./hybridRetrieve";
export { localHashEmbed, LOCAL_EMBED_MODEL } from "./localEmbed";
export { normalizePointers, formatPointersMarkdown } from "./pointers";
export type { KnowledgePointer } from "./pointers";
export { remoteRetrieve, remotePublish, RemoteBackendError } from "./remoteClient";
export type { RemoteBackendConfig } from "./remoteClient";
export { defaultDlpHook, runDlpHook, setDlpHook } from "./dlp";
export { setLegalHold, assertNotOnLegalHold, isLegalHold } from "./legalHold";
export { syncProjectMembersFromScim } from "./scimSync";
export { emitOmniContextMetricsWebhook } from "./metricsWebhook";
export { publishArtifactAsync } from "./publish";
