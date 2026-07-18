import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry.ts";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
import {
  getSpeechProvider,
  getTranscriptionProvider,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { ANTIGRAVITY_PUBLIC_MODELS } from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import { getStaticQoderModels } from "@omniroute/open-sse/services/qoderCli.ts";
import { getSearchProvider } from "@omniroute/open-sse/config/searchRegistry.ts";

import { getModelsByProviderId } from "@/shared/constants/models";

export type LocalCatalogModel = {
  id: string;
  name?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
};

const STATIC_MODEL_PROVIDERS: Record<string, () => Array<{ id: string; name: string }>> = {
  deepgram: () => [
    { id: "nova-3", name: "Nova 3 (Transcription)" },
    { id: "nova-2", name: "Nova 2 (Transcription)" },
    { id: "whisper-large", name: "Whisper Large (Transcription)" },
    { id: "aura-asteria-en", name: "Aura Asteria EN (TTS)" },
    { id: "aura-luna-en", name: "Aura Luna EN (TTS)" },
    { id: "aura-stella-en", name: "Aura Stella EN (TTS)" },
  ],
  assemblyai: () => [
    { id: "universal-3-pro", name: "Universal 3 Pro (Transcription)" },
    { id: "universal-2", name: "Universal 2 (Transcription)" },
  ],
  antigravity: () => ANTIGRAVITY_PUBLIC_MODELS.map((model) => ({ ...model })),
  claude: () => [
    { id: "claude-fable-5", name: "Claude Fable 5" },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7" },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "claude-opus-4-5-20251101", name: "Claude Opus 4.5 (2025-11-01)" },
    { id: "claude-sonnet-4-5-20250929", name: "Claude Sonnet 4.5 (2025-09-29)" },
    { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5 (2025-10-01)" },
  ],
  perplexity: () => [
    { id: "sonar", name: "Sonar (Fast Search)" },
    { id: "sonar-pro", name: "Sonar Pro (Advanced Search)" },
    { id: "sonar-reasoning", name: "Sonar Reasoning (CoT + Search)" },
    { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro (Advanced CoT + Search)" },
    { id: "sonar-deep-research", name: "Sonar Deep Research (Expert Analysis)" },
  ],
  "bailian-coding-plan": () => [
    // Keep in lock-step with the registry entry
    // (open-sse/config/providers/registry/bailian-coding-plan/index.ts);
    // bailian-coding-plan-provider.test.ts asserts static↔registry parity.
    { id: "qwen3.7-plus", name: "Qwen3.7 Plus(vision)" },
    { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
    { id: "qwen3-coder-next", name: "Qwen3 Coder Next" },
    { id: "glm-4.7", name: "GLM 4.7" },
    { id: "qwen3.6-plus", name: "Qwen3.6 Plus(vision)" },
    { id: "qwen3.5-plus", name: "Qwen3.5 Plus(vision)" },
    { id: "qwen3-max-2026-01-23", name: "Qwen3 Max" },
    { id: "kimi-k2.5", name: "Kimi K2.5(vision)" },
    { id: "glm-5", name: "GLM 5" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
  ],
  gitlab: () => [{ id: "gitlab-duo-code-suggestions", name: "GitLab Duo Code Suggestions" }],
  nlpcloud: () =>
    getModelsByProviderId("nlpcloud").map((model) => ({
      id: model.id,
      name: model.name || model.id,
    })),
  qoder: () => getStaticQoderModels(),
  // Non-LLM providers with no /v1/models endpoint — expose their selectable
  // capability ids as a static catalog so the model-import step shows a usable
  // list instead of a red "does not support models listing" failure.
  jules: () => [
    // Google Labs async coding agent — single async session, no model selection.
    { id: "jules", name: "Jules (Google Labs coding agent)" },
  ],
  devin: () => [
    // Cognition's Devin cloud-agent sessions don't expose per-request model
    // selection like devin-cli's ACP models do — single non-selectable placeholder
    // so the "Available Models" UI shows something instead of a hard failure (#6142).
    { id: "devin", name: "Devin (Cognition cloud agent)" },
  ],
  "linkup-search": () => [
    // Linkup web search — the "model" is the search depth (docs.linkup.so #5571).
    { id: "standard", name: "Standard (single-iteration agentic search)" },
    { id: "deep", name: "Deep (multi-iteration search & scrape)" },
    { id: "fast", name: "Fast (sub-second, no LLM)" },
  ],
  "ollama-search": () => [
    // ollama.com/api/web_search (cloud web search, not the local Ollama LLM) #5573.
    { id: "web_search", name: "Ollama Web Search" },
  ],
  "searchapi-search": () => [
    // SearchAPI (searchapi.io) is a SERP API — the "model" is the engine #5575.
    { id: "google", name: "Google" },
    { id: "bing", name: "Bing" },
    { id: "youtube", name: "YouTube" },
    { id: "google_scholar", name: "Google Scholar" },
    { id: "duckduckgo", name: "DuckDuckGo" },
  ],
  "venice-web": () => [
    // Venice.ai web-cookie provider — no upstream /v1/models endpoint, so seed the
    // current lineup as a static catalog (#6269). Venice rotates its catalog; keep
    // in step with the published list at https://docs.venice.ai/models/overview.
    { id: "venice-uncensored", name: "Venice Uncensored" },
    { id: "llama-3.3-70b", name: "Llama 3.3 70B" },
    { id: "qwen3-235b", name: "Qwen3 235B" },
    { id: "qwen3-4b", name: "Qwen3 4B" },
    { id: "deepseek-r1-671b", name: "DeepSeek R1 671B" },
  ],
};

const SEARCH_TYPE_LABELS: Record<string, string> = {
  web: "Web Search",
  news: "News Search",
};

function formatSearchTypeLabel(searchType: string): string {
  return (
    SEARCH_TYPE_LABELS[searchType] ??
    `${searchType.charAt(0).toUpperCase()}${searchType.slice(1)} Search`
  );
}

/**
 * Search providers don't have "models" — a provider IS the model (see
 * open-sse/config/searchRegistry.ts header doc). Any search provider without a
 * dedicated literal entry above (custom depth/engine catalog, e.g.
 * "linkup-search") still needs a non-empty static catalog so the "Available
 * Models" / model-import UI shows a usable list instead of a 400 "does not
 * support models listing" (#7529). Derive it generically from the registry's
 * own `searchTypes` so any *future* search provider is covered automatically.
 */
function getSearchProviderFallbackCatalog(provider: string): LocalCatalogModel[] | undefined {
  const searchProvider = getSearchProvider(provider);
  if (!searchProvider || searchProvider.searchTypes.length === 0) return undefined;

  return searchProvider.searchTypes.map((searchType) => ({
    id: searchType,
    name: formatSearchTypeLabel(searchType),
  }));
}

export function getStaticModelsForProvider(provider: string): LocalCatalogModel[] | undefined {
  const staticModelsFn = STATIC_MODEL_PROVIDERS[provider];
  if (staticModelsFn) {
    return staticModelsFn();
  }

  const searchFallback = getSearchProviderFallbackCatalog(provider);
  if (searchFallback) {
    return searchFallback;
  }

  const specialtyModels: LocalCatalogModel[] = [];
  const appendModels = (
    models: Array<{ id: string; name?: string }>,
    metadata?: Pick<LocalCatalogModel, "apiFormat" | "supportedEndpoints">
  ) => {
    for (const model of models) {
      if (specialtyModels.some((existing) => existing.id === model.id)) continue;
      specialtyModels.push({
        id: model.id,
        name: model.name || model.id,
        ...metadata,
      });
    }
  };

  const embeddingProvider = getEmbeddingProvider(provider);
  if (embeddingProvider) {
    appendModels(embeddingProvider.models, {
      apiFormat: "embeddings",
      supportedEndpoints: ["embeddings"],
    });
  }

  const rerankProvider = getRerankProvider(provider);
  if (rerankProvider) {
    appendModels(rerankProvider.models, {
      apiFormat: "rerank",
      supportedEndpoints: ["rerank"],
    });
  }

  // Image / video: only fold into the provider specialty list for *media-only*
  // providers (no chat registry models). Chat+image providers (openai, lmarena,
  // xai, …) keep image rows exclusively in IMAGE_PROVIDERS so the provider page
  // chat catalog is not polluted with flux-* / dalle ids.
  const chatRegistry = getModelsByProviderId(provider);
  const hasChatRegistry = Array.isArray(chatRegistry) && chatRegistry.length > 0;

  const imageProvider = getImageProvider(provider);
  if (imageProvider && !hasChatRegistry) {
    appendModels(imageProvider.models, {
      apiFormat: "images",
      supportedEndpoints: ["images"],
    });
  }

  const videoProvider = getVideoProvider(provider);
  if (videoProvider && !hasChatRegistry) {
    appendModels(videoProvider.models, {
      apiFormat: "video",
      supportedEndpoints: ["videos"],
    });
  }

  const speechProvider = getSpeechProvider(provider);
  if (speechProvider) {
    appendModels(speechProvider.models, {
      apiFormat: "audio",
      supportedEndpoints: ["audio"],
    });
  }

  const transcriptionProvider = getTranscriptionProvider(provider);
  if (transcriptionProvider) {
    appendModels(transcriptionProvider.models, {
      apiFormat: "audio",
      supportedEndpoints: ["audio"],
    });
  }

  return specialtyModels.length > 0 ? specialtyModels : undefined;
}
