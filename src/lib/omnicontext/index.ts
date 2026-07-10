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
} from "./types";

export {
  NO_OMNICONTEXT_HEADER,
  PROJECT_ID_HEADER,
  REPO_HEADER,
  TICKET_HEADER,
  TOOL_HEADER,
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
