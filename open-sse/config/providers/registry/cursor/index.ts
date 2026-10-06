import type { RegistryEntry, RegistryModel } from "../../shared.ts";
import { CURSOR_REGISTRY_VERSION, getCursorRegistryHeaders } from "../../shared.ts";

const CLAUDE_FABLE_5_1_CAPABILITIES = {
  maxOutputTokens: 128_000,
} as const;

const ONE_MILLION_CONTEXT = 1_000_000;

function withOneMillionContext(
  models: RegistryModel[],
  familyName: string,
  defaultContextLength: number,
  liveCatalogId: string,
  supportsOneMillion: (model: RegistryModel) => boolean = () => true
): RegistryModel[] {
  return models.flatMap((model) => {
    const defaultContextModel = {
      ...model,
      contextLength: defaultContextLength,
      liveCatalogIds: model.liveCatalogIds ?? [liveCatalogId],
      ...(familyName.startsWith("GPT-") ? {} : { scoresAs: model.scoresAs ?? liveCatalogId }),
    };
    if (!supportsOneMillion(model)) return [defaultContextModel];
    const oneMillionModel = {
      ...defaultContextModel,
      id: `${model.id}-1m`,
      name: model.name.replace(familyName, `${familyName} 1M`),
      contextLength: ONE_MILLION_CONTEXT,
    };
    return [oneMillionModel, defaultContextModel];
  });
}

export const cursorProvider: RegistryEntry = {
  id: "cursor",
  alias: "cu",
  format: "cursor",
  executor: "cursor",
  baseUrl: "https://api2.cursor.sh",
  chatPath: "/aiserver.v1.ChatService/StreamUnifiedChatWithTools",
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 200000,
  headers: getCursorRegistryHeaders(),
  clientVersion: CURSOR_REGISTRY_VERSION,
  models: [
    { id: "auto", name: "Auto (current, default)" },
    { id: "auto-cost", name: "Auto (cost)" },
    { id: "auto-balance", name: "Auto (balance)" },
    { id: "auto-intelligence", name: "Auto (intelligence)" },
    { id: "cursor-grok-4.6-xhigh-fast", name: "Cursor Grok 4.6 Xhigh Fast" },
    { id: "cursor-grok-4.6-xhigh", name: "Cursor Grok 4.6 Xhigh" },
    { id: "cursor-grok-4.6-high-fast", name: "Cursor Grok 4.6 High Fast" },
    { id: "cursor-grok-4.6-high", name: "Cursor Grok 4.6 High" },
    { id: "cursor-grok-4.6-medium-fast", name: "Cursor Grok 4.6 Medium Fast" },
    { id: "cursor-grok-4.6-medium", name: "Cursor Grok 4.6 Medium" },
    { id: "cursor-grok-4.6-low-fast", name: "Cursor Grok 4.6 Low Fast" },
    { id: "cursor-grok-4.6-low", name: "Cursor Grok 4.6 Low" },
    { id: "composer-2.5-fast", name: "Composer 2.5 Fast" },
    { id: "composer-2.5", name: "Composer 2.5" },
    ...withOneMillionContext(
      [
        {
          id: "claude-fable-5-1-thinking-max",
          name: "Claude Fable 5.1 Max Thinking",
          ...CLAUDE_FABLE_5_1_CAPABILITIES,
        },
        {
          id: "claude-fable-5-1-thinking-xhigh",
          name: "Claude Fable 5.1 Xhigh Thinking",
          ...CLAUDE_FABLE_5_1_CAPABILITIES,
        },
        {
          id: "claude-fable-5-1-thinking-high",
          name: "Claude Fable 5.1 High Thinking",
          ...CLAUDE_FABLE_5_1_CAPABILITIES,
        },
        {
          id: "claude-fable-5-1-thinking-medium",
          name: "Claude Fable 5.1 Medium Thinking",
          ...CLAUDE_FABLE_5_1_CAPABILITIES,
        },
        {
          id: "claude-fable-5-1-thinking-low",
          name: "Claude Fable 5.1 Low Thinking",
          ...CLAUDE_FABLE_5_1_CAPABILITIES,
        },
      ],
      "Claude Fable 5.1",
      300_000,
      "claude-fable-5-1"
    ),
    ...withOneMillionContext(
      [
        { id: "claude-opus-5-thinking-max-fast", name: "Claude Opus 5 Max Thinking Fast" },
        { id: "claude-opus-5-thinking-max", name: "Claude Opus 5 Max Thinking" },
        {
          id: "claude-opus-5-thinking-xhigh-fast",
          name: "Claude Opus 5 Xhigh Thinking Fast",
        },
        { id: "claude-opus-5-thinking-xhigh", name: "Claude Opus 5 Xhigh Thinking" },
        { id: "claude-opus-5-thinking-high-fast", name: "Claude Opus 5 High Thinking Fast" },
        { id: "claude-opus-5-thinking-high", name: "Claude Opus 5 High Thinking" },
        { id: "claude-opus-5-high-fast", name: "Claude Opus 5 High Fast" },
        { id: "claude-opus-5-high", name: "Claude Opus 5 High" },
        {
          id: "claude-opus-5-thinking-medium-fast",
          name: "Claude Opus 5 Medium Thinking Fast",
        },
        { id: "claude-opus-5-thinking-medium", name: "Claude Opus 5 Medium Thinking" },
        { id: "claude-opus-5-medium-fast", name: "Claude Opus 5 Medium Fast" },
        { id: "claude-opus-5-medium", name: "Claude Opus 5 Medium" },
        { id: "claude-opus-5-thinking-low-fast", name: "Claude Opus 5 Low Thinking Fast" },
        { id: "claude-opus-5-thinking-low", name: "Claude Opus 5 Low Thinking" },
        { id: "claude-opus-5-low-fast", name: "Claude Opus 5 Low Fast" },
        { id: "claude-opus-5-low", name: "Claude Opus 5 Low" },
      ],
      "Claude Opus 5",
      300_000,
      "claude-opus-5"
    ),
    ...withOneMillionContext(
      [
        { id: "claude-opus-4-8-thinking-max-fast", name: "Claude Opus 4.8 Max Thinking Fast" },
        { id: "claude-opus-4-8-thinking-max", name: "Claude Opus 4.8 Max Thinking" },
        { id: "claude-opus-4-8-max-fast", name: "Claude Opus 4.8 Max Fast" },
        { id: "claude-opus-4-8-max", name: "Claude Opus 4.8 Max" },
        {
          id: "claude-opus-4-8-thinking-xhigh-fast",
          name: "Claude Opus 4.8 Xhigh Thinking Fast",
        },
        { id: "claude-opus-4-8-thinking-xhigh", name: "Claude Opus 4.8 Xhigh Thinking" },
        { id: "claude-opus-4-8-xhigh-fast", name: "Claude Opus 4.8 Xhigh Fast" },
        { id: "claude-opus-4-8-xhigh", name: "Claude Opus 4.8 Xhigh" },
        { id: "claude-opus-4-8-thinking-high-fast", name: "Claude Opus 4.8 High Thinking Fast" },
        { id: "claude-opus-4-8-thinking-high", name: "Claude Opus 4.8 High Thinking" },
        { id: "claude-opus-4-8-high-fast", name: "Claude Opus 4.8 High Fast" },
        { id: "claude-opus-4-8-high", name: "Claude Opus 4.8 High" },
        {
          id: "claude-opus-4-8-thinking-medium-fast",
          name: "Claude Opus 4.8 Medium Thinking Fast",
        },
        { id: "claude-opus-4-8-thinking-medium", name: "Claude Opus 4.8 Medium Thinking" },
        { id: "claude-opus-4-8-medium-fast", name: "Claude Opus 4.8 Medium Fast" },
        { id: "claude-opus-4-8-medium", name: "Claude Opus 4.8 Medium" },
        { id: "claude-opus-4-8-thinking-low-fast", name: "Claude Opus 4.8 Low Thinking Fast" },
        { id: "claude-opus-4-8-thinking-low", name: "Claude Opus 4.8 Low Thinking" },
        { id: "claude-opus-4-8-low-fast", name: "Claude Opus 4.8 Low Fast" },
        { id: "claude-opus-4-8-low", name: "Claude Opus 4.8 Low" },
      ],
      "Claude Opus 4.8",
      300_000,
      "claude-opus-4-8"
    ),
    ...withOneMillionContext(
      [
        { id: "claude-sonnet-5-thinking-max", name: "Claude Sonnet 5 Max Thinking" },
        { id: "claude-sonnet-5-max", name: "Claude Sonnet 5 Max" },
        { id: "claude-sonnet-5-thinking-xhigh", name: "Claude Sonnet 5 Xhigh Thinking" },
        { id: "claude-sonnet-5-xhigh", name: "Claude Sonnet 5 Xhigh" },
        { id: "claude-sonnet-5-thinking-high", name: "Claude Sonnet 5 High Thinking" },
        { id: "claude-sonnet-5-high", name: "Claude Sonnet 5 High" },
        { id: "claude-sonnet-5-thinking-medium", name: "Claude Sonnet 5 Medium Thinking" },
        { id: "claude-sonnet-5-medium", name: "Claude Sonnet 5 Medium" },
        { id: "claude-sonnet-5-thinking-low", name: "Claude Sonnet 5 Low Thinking" },
        { id: "claude-sonnet-5-low", name: "Claude Sonnet 5 Low" },
      ],
      "Claude Sonnet 5",
      300_000,
      "claude-sonnet-5"
    ),
    ...withOneMillionContext(
      [
        { id: "claude-4.6-sonnet-max-thinking", name: "Claude Sonnet 4.6 Max Thinking" },
        { id: "claude-4.6-sonnet-max", name: "Claude Sonnet 4.6 Max" },
        { id: "claude-4.6-sonnet-high-thinking", name: "Claude Sonnet 4.6 High Thinking" },
        { id: "claude-4.6-sonnet-high", name: "Claude Sonnet 4.6 High" },
        { id: "claude-4.6-sonnet-medium-thinking", name: "Claude Sonnet 4.6 Medium Thinking" },
        { id: "claude-4.6-sonnet-medium", name: "Claude Sonnet 4.6 Medium" },
        { id: "claude-4.6-sonnet-low-thinking", name: "Claude Sonnet 4.6 Low Thinking" },
        { id: "claude-4.6-sonnet-low", name: "Claude Sonnet 4.6 Low" },
      ],
      "Claude Sonnet 4.6",
      200_000,
      "claude-sonnet-4-6"
    ),
    { id: "claude-4.5-haiku-thinking", name: "Claude Haiku 4.5 Thinking" },
    { id: "claude-4.5-haiku", name: "Claude Haiku 4.5" },
    ...withOneMillionContext(
      [
        { id: "gpt-5.6-sol-max-fast", name: "GPT-5.6 Sol Max Fast" },
        { id: "gpt-5.6-sol-max", name: "GPT-5.6 Sol Max" },
        { id: "gpt-5.6-sol-xhigh-fast", name: "GPT-5.6 Sol Xhigh Fast" },
        { id: "gpt-5.6-sol-xhigh", name: "GPT-5.6 Sol Xhigh" },
        { id: "gpt-5.6-sol-high-fast", name: "GPT-5.6 Sol High Fast" },
        { id: "gpt-5.6-sol-high", name: "GPT-5.6 Sol High" },
        { id: "gpt-5.6-sol-medium-fast", name: "GPT-5.6 Sol Medium Fast" },
        { id: "gpt-5.6-sol-medium", name: "GPT-5.6 Sol Medium" },
        { id: "gpt-5.6-sol-low-fast", name: "GPT-5.6 Sol Low Fast" },
        { id: "gpt-5.6-sol-low", name: "GPT-5.6 Sol Low" },
        { id: "gpt-5.6-sol-none-fast", name: "GPT-5.6 Sol None Fast" },
        { id: "gpt-5.6-sol-none", name: "GPT-5.6 Sol None" },
      ],
      "GPT-5.6 Sol",
      272_000,
      "gpt-5.6-sol",
      (model) => !model.id.endsWith("-fast")
    ),
    ...withOneMillionContext(
      [
        { id: "gpt-5.6-terra-max-fast", name: "GPT-5.6 Terra Max Fast" },
        { id: "gpt-5.6-terra-max", name: "GPT-5.6 Terra Max" },
        { id: "gpt-5.6-terra-xhigh-fast", name: "GPT-5.6 Terra Xhigh Fast" },
        { id: "gpt-5.6-terra-xhigh", name: "GPT-5.6 Terra Xhigh" },
        { id: "gpt-5.6-terra-high-fast", name: "GPT-5.6 Terra High Fast" },
        { id: "gpt-5.6-terra-high", name: "GPT-5.6 Terra High" },
        { id: "gpt-5.6-terra-medium-fast", name: "GPT-5.6 Terra Medium Fast" },
        { id: "gpt-5.6-terra-medium", name: "GPT-5.6 Terra Medium" },
        { id: "gpt-5.6-terra-low-fast", name: "GPT-5.6 Terra Low Fast" },
        { id: "gpt-5.6-terra-low", name: "GPT-5.6 Terra Low" },
        { id: "gpt-5.6-terra-none-fast", name: "GPT-5.6 Terra None Fast" },
        { id: "gpt-5.6-terra-none", name: "GPT-5.6 Terra None" },
      ],
      "GPT-5.6 Terra",
      272_000,
      "gpt-5.6-terra",
      (model) => !model.id.endsWith("-fast")
    ),
    ...withOneMillionContext(
      [
        { id: "gpt-5.6-luna-max-fast", name: "GPT-5.6 Luna Max Fast" },
        { id: "gpt-5.6-luna-max", name: "GPT-5.6 Luna Max" },
        { id: "gpt-5.6-luna-xhigh-fast", name: "GPT-5.6 Luna Xhigh Fast" },
        { id: "gpt-5.6-luna-xhigh", name: "GPT-5.6 Luna Xhigh" },
        { id: "gpt-5.6-luna-high-fast", name: "GPT-5.6 Luna High Fast" },
        { id: "gpt-5.6-luna-high", name: "GPT-5.6 Luna High" },
        { id: "gpt-5.6-luna-medium-fast", name: "GPT-5.6 Luna Medium Fast" },
        { id: "gpt-5.6-luna-medium", name: "GPT-5.6 Luna Medium" },
        { id: "gpt-5.6-luna-low-fast", name: "GPT-5.6 Luna Low Fast" },
        { id: "gpt-5.6-luna-low", name: "GPT-5.6 Luna Low" },
        { id: "gpt-5.6-luna-none-fast", name: "GPT-5.6 Luna None Fast" },
        { id: "gpt-5.6-luna-none", name: "GPT-5.6 Luna None" },
      ],
      "GPT-5.6 Luna",
      272_000,
      "gpt-5.6-luna",
      (model) => !model.id.endsWith("-fast")
    ),
    { id: "gemini-3.7-flash-high", name: "Gemini 3.7 Flash High" },
    { id: "gemini-3.7-flash-medium", name: "Gemini 3.7 Flash Medium" },
    { id: "gemini-3.7-flash-low", name: "Gemini 3.7 Flash Low" },
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
    { id: "kimi-k3-max", name: "Kimi K3 Max" },
    { id: "kimi-k3-high", name: "Kimi K3 High" },
    { id: "kimi-k3-low", name: "Kimi K3 Low" },
    { id: "kimi-k2.7-code", name: "Kimi K2.7 Code" },
    { id: "glm-5.2-max", name: "GLM 5.2 Max" },
    { id: "glm-5.2-high", name: "GLM 5.2 High" },
  ],
};

/**
 * API-key variant of the Cursor provider.
 *
 * Same wire protocol, executor and catalog as `cursor`, but the connection
 * holds a Cursor user API key (`crsr_…`, cursor.com/dashboard/api) instead of
 * an IDE/OAuth session. The executor exchanges that key for a session token
 * on demand (open-sse/services/cursorApiKeyAuth.ts), so no cursor-agent or
 * IDE install is needed on the OmniRoute host. Kept as a distinct backend ID
 * so API-key and IDE-session connections never share renewal, quota or
 * dashboard semantics.
 */
export const cursor_apiProvider: RegistryEntry = {
  id: "cursor-api",
  alias: "cua",
  format: cursorProvider.format,
  executor: "cursor-api",
  baseUrl: cursorProvider.baseUrl,
  chatPath: cursorProvider.chatPath,
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: cursorProvider.defaultContextLength,
  headers: getCursorRegistryHeaders(),
  clientVersion: CURSOR_REGISTRY_VERSION,
  models: cursorProvider.models,
};
