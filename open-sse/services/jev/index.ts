/**
 * Jev (TypeSafe System One) decision layer.
 *
 * Public surface for OmniRoute's Jev integrations: the fail-open HTTP client,
 * the env/credential configuration, and the typed decision builders used by the
 * routing, compression, MCP, cache, keepalive and tool-loop lanes.
 */
export {
  askJev,
  getJevClientStats,
  __resetJevClientForTests,
  type AskJevOptions,
} from "./client.ts";
export {
  DECISION_ADAPTERS,
  alignAnswersToQuestions,
  resolveDecisionWire,
  resolveChatCompletionsUrl,
  extractJsonObject,
  OPENAI_DECISION_SYSTEM_PROMPT,
  type DecisionAdapter,
  type DecisionAdapterRequest,
  type DecisionWire,
  type DecisionWireRuntime,
  type ParsedDecisionResponse,
} from "./adapters.ts";
export {
  isJevFeatureEnabled,
  resolveJevRuntime,
  readJevEnvConfig,
  parseJevFeatures,
  JEV_FEATURES,
  DEFAULT_JEV_BASE_URL,
  DEFAULT_JEV_MODEL,
  DEFAULT_JEV_TIMEOUT_MS,
  DEFAULT_JEV_BLOCK_THRESHOLD,
  __resetJevRuntimeCacheForTests,
  type JevEnvConfig,
  type JevEnabledMode,
  type JevFeatureFlags,
  type JevRuntime,
} from "./config.ts";
export {
  decideRoute,
  decideCompression,
  decideCacheRead,
  decideToolInput,
  decideToolOutput,
  decideToolSelection,
  decideWorkflowStep,
  noulProbability,
  choiceLabel,
  scoreValue,
  sampleText,
  TOOL_SELECTION_NONE,
  type RouteDecision,
  type RouteDecisionInput,
  type JevComplexity,
  type CompressionDecision,
  type CompressionDecisionInput,
  type JevCompressionPreference,
  type JevCompressionIntensity,
  type CacheReadDecision,
  type CacheReadDecisionInput,
  type ToolInputDecision,
  type ToolInputDecisionInput,
  type ToolOutputDecision,
  type ToolOutputDecisionInput,
  type ToolSelectionCandidate,
  type ToolSelectionDecision,
  type ToolSelectionDecisionInput,
  type WorkflowStepDecision,
  type WorkflowStepDecisionInput,
} from "./decisions.ts";
export {
  decideRouteForRequest,
  escalateHintWithJev,
  filterTargetsByJevSafety,
  readSafetyExclusions,
  JEV_SAFETY_RISK_MIN,
  type JevRoutingLogger,
} from "./routing.ts";
export type {
  JevAnswer,
  JevFeature,
  JevLogger,
  JevQuestion,
  JevResult,
  JevUsage,
} from "./types.ts";

export { DECISION_MODEL_REQUEST_HEADER } from "./types.ts";
export { isDecisionModelRequest, isSelfGatewayBaseUrl } from "./config.ts";
