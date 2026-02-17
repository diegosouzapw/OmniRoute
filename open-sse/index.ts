// Patch global fetch with proxy support (must be first)
import "./utils/proxyFetch.js";

// Config
export {
  PROVIDERS,
  OAUTH_ENDPOINTS,
  CACHE_TTL,
  DEFAULT_MAX_TOKENS,
  CLAUDE_SYSTEM_PROMPT,
  COOLDOWN_MS,
  BACKOFF_CONFIG,
} from "./config/constants.js";
export {
  PROVIDER_MODELS,
  getProviderModels,
  getDefaultModel,
  isValidModel,
  findModelName,
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
  getModelsByProviderId,
} from "./config/providerModels.js";

// Translator
export { FORMATS } from "./translator/formats.js";
export {
  register,
  translateRequest,
  translateResponse,
  needsTranslation,
  initState,
  initTranslators,
} from "./translator/index.js";

// Services
export {
  detectFormat,
  getProviderConfig,
  buildProviderUrl,
  buildProviderHeaders,
  getTargetFormat,
} from "./services/provider.js";

export { parseModel, resolveModelAliasFromMap, getModelInfoCore } from "./services/model.js";

export {
  checkFallbackError,
  isAccountUnavailable,
  getUnavailableUntil,
  filterAvailableAccounts,
} from "./services/accountFallback.js";

export {
  TOKEN_EXPIRY_BUFFER_MS,
  refreshAccessToken,
  refreshClaudeOAuthToken,
  refreshGoogleToken,
  refreshQwenToken,
  refreshCodexToken,
  refreshIflowToken,
  refreshGitHubToken,
  refreshCopilotToken,
  getAccessToken,
  refreshTokenByProvider,
} from "./services/tokenRefresh.js";

// Handlers
export { handleChatCore, isTokenExpiringSoon } from "./handlers/chatCore.js";
export {
  createStreamController,
  pipeWithDisconnect,
  createDisconnectAwareStream,
} from "./utils/streamHandler.js";

// Executors
export { getExecutor, hasSpecializedExecutor } from "./executors/index.js";

// Utils
export { errorResponse, formatProviderError } from "./utils/error.js";
export {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
} from "./utils/stream.js";

// Embeddings
export { handleEmbedding } from "./handlers/embeddings.js";
export {
  EMBEDDING_PROVIDERS,
  getEmbeddingProvider,
  parseEmbeddingModel,
  getAllEmbeddingModels,
} from "./config/embeddingRegistry.js";

// Image Generation
export { handleImageGeneration } from "./handlers/imageGeneration.js";
export {
  IMAGE_PROVIDERS,
  getImageProvider,
  parseImageModel,
  getAllImageModels,
} from "./config/imageRegistry.js";

// Think Tag Parser
export {
  hasThinkTags,
  extractThinkTags,
  processStreamingThinkDelta,
  flushThinkBuffer,
} from "./utils/thinkTagParser.js";

// Rerank
export { handleRerank } from "./handlers/rerank.js";
export {
  RERANK_PROVIDERS,
  getRerankProvider,
  parseRerankModel,
  getAllRerankModels,
} from "./config/rerankRegistry.js";

// Audio (Transcription + Speech)
export { handleAudioTranscription } from "./handlers/audioTranscription.js";
export { handleAudioSpeech } from "./handlers/audioSpeech.js";
export {
  AUDIO_TRANSCRIPTION_PROVIDERS,
  AUDIO_SPEECH_PROVIDERS,
  getTranscriptionProvider,
  getSpeechProvider,
  parseTranscriptionModel,
  parseSpeechModel,
  getAllAudioModels,
} from "./config/audioRegistry.js";

// Moderations
export { handleModeration } from "./handlers/moderations.js";
export {
  MODERATION_PROVIDERS,
  getModerationProvider,
  parseModerationModel,
  getAllModerationModels,
} from "./config/moderationRegistry.js";
