import type { RegistryEntry } from "../../shared.ts";
import {
  CURSOR_REGISTRY_VERSION,
  getCursorRegistryHeaders
} from "../../shared.ts";

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
    { id: "auto", name: "Auto (Server Picks)" },
    { id: "composer-2.5-fast", name: "Composer 2.5 Fast" },
    { id: "composer-2.5", name: "Composer 2.5" },
    { id: "composer-2-fast", name: "Composer 2 Fast" },
    { id: "composer-2", name: "Composer 2" },
    //
    { id: "gpt-5.5-none", name: "GPT 5.5 None" },
    { id: "gpt-5.5-none-fast", name: "GPT 5.5 None Fast" },
    { id: "gpt-5.5-low", name: "GPT 5.5 Low" },
    { id: "gpt-5.5-low-fast", name: "GPT 5.5 Low Fast" },
    { id: "gpt-5.5-medium", name: "GPT 5.5 Medium" },
    { id: "gpt-5.5-medium-fast", name: "GPT 5.5 Medium Fast" },
    { id: "gpt-5.5-high", name: "GPT 5.5 High" },
    { id: "gpt-5.5-high-fast", name: "GPT 5.5 High Fast" },
    { id: "gpt-5.5-extra-high", name: "GPT 5.5 Extra High" },
    { id: "gpt-5.5-extra-high-fast", name: "GPT 5.5 Extra High Fast" },
    //
    { id: "gpt-5.4-low", name: "GPT 5.4 Low" },
    { id: "gpt-5.4-low-fast", name: "GPT 5.4 Low Fast" },
    { id: "gpt-5.4-medium", name: "GPT 5.4 Medium" },
    { id: "gpt-5.4-medium-fast", name: "GPT 5.4 Medium Fast" },
    { id: "gpt-5.4-high", name: "GPT 5.4 High" },
    { id: "gpt-5.4-high-fast", name: "GPT 5.4 High Fast" },
    { id: "gpt-5.4-xhigh", name: "GPT 5.4 XHigh" },
    { id: "gpt-5.4-xhigh-fast", name: "GPT 5.4 XHigh Fast" },
    //
    { id: "gpt-5.4-mini-none", name: "GPT 5.4 Mini None" },
    { id: "gpt-5.4-mini-low", name: "GPT 5.4 Mini Low" },
    { id: "gpt-5.4-mini-medium", name: "GPT 5.4 Mini Medium" },
    { id: "gpt-5.4-mini-high", name: "GPT 5.4 Mini High" },
    { id: "gpt-5.4-mini-xhigh", name: "GPT 5.4 Mini XHigh" },
    //
    { id: "gpt-5.4-nano-none", name: "GPT 5.4 Nano None" },
    { id: "gpt-5.4-nano-low", name: "GPT 5.4 Nano Low" },
    { id: "gpt-5.4-nano-medium", name: "GPT 5.4 Nano Medium" },
    { id: "gpt-5.4-nano-high", name: "GPT 5.4 Nano High" },
    { id: "gpt-5.4-nano-xhigh", name: "GPT 5.4 Nano XHigh" },
    //
    { id: "gpt-5.3-codex-spark-preview-low", name: "GPT 5.3 Codex Spark Preview Low" },
    { id: "gpt-5.3-codex-spark-preview", name: "GPT 5.3 Codex Spark Preview" },
    { id: "gpt-5.3-codex-spark-preview-high", name: "GPT 5.3 Codex Spark Preview High" },
    { id: "gpt-5.3-codex-spark-preview-xhigh", name: "GPT 5.3 Codex Spark Preview XHigh" },
    //
    { id: "gpt-5.3-codex-low", name: "GPT 5.3 Codex Low" },
    { id: "gpt-5.3-codex-low-fast", name: "GPT 5.3 Codex Low Fast" },
    { id: "gpt-5.3-codex", name: "GPT 5.3 Codex" },
    { id: "gpt-5.3-codex-fast", name: "GPT 5.3 Codex Fast" },
    { id: "gpt-5.3-codex-high", name: "GPT 5.3 Codex High" },
    { id: "gpt-5.3-codex-high-fast", name: "GPT 5.3 Codex High Fast" },
    { id: "gpt-5.3-codex-xhigh", name: "GPT 5.3 Codex XHigh" },
    { id: "gpt-5.3-codex-xhigh-fast", name: "GPT 5.3 Codex XHigh Fast" },
    //
    { id: "gpt-5.2-low", name: "GPT 5.2 Low" },
    { id: "gpt-5.2-low-fast", name: "GPT 5.2 Low Fast" },
    { id: "gpt-5.2", name: "GPT 5.2" },
    { id: "gpt-5.2-fast", name: "GPT 5.2 Fast" },
    { id: "gpt-5.2-high", name: "GPT 5.2 High" },
    { id: "gpt-5.2-high-fast", name: "GPT 5.2 High Fast" },
    { id: "gpt-5.2-xhigh", name: "GPT 5.2 XHigh" },
    { id: "gpt-5.2-xhigh-fast", name: "GPT 5.2 XHigh Fast" },
    //
    { id: "claude-opus-4-7-low", name: "Claude Opus 4.7 Low" },
    { id: "claude-opus-4-7-medium", name: "Claude Opus 4.7 Medium" },
    { id: "claude-opus-4-7-high", name: "Claude Opus 4.7 High" },
    { id: "claude-opus-4-7-xhigh", name: "Claude Opus 4.7 XHigh" },
    { id: "claude-opus-4-7-max", name: "Claude Opus 4.7 Max" },

    { id: "claude-opus-4-7-thinking-low", name: "Claude Opus 4.7 Thinking Low" },
    { id: "claude-opus-4-7-thinking-medium", name: "Claude Opus 4.7 Thinking Medium" },
    { id: "claude-opus-4-7-thinking-high", name: "Claude Opus 4.7 Thinking High" },
    { id: "claude-opus-4-7-thinking-xhigh", name: "Claude Opus 4.7 Thinking XHigh" },
    { id: "claude-opus-4-7-thinking-max", name: "Claude Opus 4.7 Thinking Max" },
    //
    { id: "claude-4.6-opus-high", name: "Claude 4.6 Opus High" },
    { id: "claude-4.6-opus-high-thinking", name: "Claude 4.6 Opus High Thinking" },
    { id: "claude-4.6-opus-high-thinking-fast", name: "Claude 4.6 Opus High Thinking Fast" },
    { id: "claude-4.6-opus-max", name: "Claude 4.6 Opus Max" },
    { id: "claude-4.6-opus-max-thinking", name: "Claude 4.6 Opus Max Thinking" },
    { id: "claude-4.6-opus-max-thinking-fast", name: "Claude 4.6 Opus Max Thinking Fast" },
    //
    { id: "claude-4.6-sonnet-medium", name: "Claude 4.6 Sonnet Medium" },
    { id: "claude-4.6-sonnet-medium-thinking", name: "Claude 4.6 Sonnet Medium Thinking" },
    //
    { id: "claude-4.5-sonnet", name: "Claude 4.5 Sonnet" },
    { id: "claude-4.5-sonnet-thinking", name: "Claude 4.5 Sonnet Thinking" },
    //
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
    //
    { id: "gemini-3-flash", name: "Gemini 3 Flash" },
    //
    { id: "grok-4.3", name: "Grok 4.3" },
    //
    { id: "kimi-k2.5", name: "Kimi K2.5" },
  ],
};
