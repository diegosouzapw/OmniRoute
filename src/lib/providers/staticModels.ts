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
};

export function getStaticModelsForProvider(provider: string): LocalCatalogModel[] | undefined {
  const staticModelsFn = STATIC_MODEL_PROVIDERS[provider];
  if (staticModelsFn) {
    return staticModelsFn();
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

  const imageProvider = getImageProvider(provider);
  if (imageProvider) {
    appendModels(imageProvider.models);
  }

  const videoProvider = getVideoProvider(provider);
  if (videoProvider) {
    appendModels(videoProvider.models);
  }

  const speechProvider = getSpeechProvider(provider);
  if (speechProvider) {
    appendModels(speechProvider.models);
  }

  const transcriptionProvider = getTranscriptionProvider(provider);
  if (transcriptionProvider) {
    appendModels(transcriptionProvider.models);
  }

  return specialtyModels.length > 0 ? specialtyModels : undefined;
}
