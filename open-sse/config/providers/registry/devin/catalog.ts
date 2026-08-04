import type { RegistryModel } from "../../shared.ts";

export const DEVIN_MODEL_CATALOG: RegistryModel[] = [
  // Cognition / SWE — default model family recommended for coding tasks
  { id: "swe-1-7-lightning", name: "SWE-1.7 Lightning", contextLength: 202752 },
  { id: "swe-1-7", name: "SWE-1.7", contextLength: 262000 },
  { id: "swe-1-6-fast", name: "SWE-1.6 Fast" },
  { id: "swe-1-6", name: "SWE-1.6" },
  // Claude Fable 5
  { id: "claude-5-fable-max", name: "Claude Fable 5 Max", contextLength: 1000000 },
  { id: "claude-5-fable-xhigh", name: "Claude Fable 5 XHigh", contextLength: 1000000 },
  { id: "claude-5-fable-high", name: "Claude Fable 5 High", contextLength: 1000000 },
  { id: "claude-5-fable-medium", name: "Claude Fable 5 Medium", contextLength: 1000000 },
  { id: "claude-5-fable-low", name: "Claude Fable 5 Low", contextLength: 1000000 },
  // Claude Opus 4.8
  { id: "claude-opus-4-8-max", name: "Claude Opus 4.8 Max", contextLength: 1000000 },
  { id: "claude-opus-4-8-xhigh", name: "Claude Opus 4.8 XHigh", contextLength: 1000000 },
  { id: "claude-opus-4-8-high", name: "Claude Opus 4.8 High", contextLength: 1000000 },
  { id: "claude-opus-4-8-medium", name: "Claude Opus 4.8 Medium", contextLength: 1000000 },
  { id: "claude-opus-4-8-low", name: "Claude Opus 4.8 Low", contextLength: 1000000 },
  // Claude Opus 4.7
  { id: "claude-opus-4-7-max", name: "Claude Opus 4.7 Max", contextLength: 1000000 },
  { id: "claude-opus-4-7-xhigh", name: "Claude Opus 4.7 XHigh", contextLength: 1000000 },
  { id: "claude-opus-4-7-high", name: "Claude Opus 4.7 High", contextLength: 1000000 },
  { id: "claude-opus-4-7-medium", name: "Claude Opus 4.7 Medium", contextLength: 1000000 },
  { id: "claude-opus-4-7-low", name: "Claude Opus 4.7 Low", contextLength: 1000000 },
  // Claude Opus 4.6
  {
    id: "claude-opus-4-6-thinking-1m",
    name: "Claude Opus 4.6 Thinking 1M",
    contextLength: 1000000,
  },
  { id: "claude-opus-4-6-thinking", name: "Claude Opus 4.6 Thinking", contextLength: 200000 },
  { id: "claude-opus-4-6-1m", name: "Claude Opus 4.6 1M", contextLength: 1000000 },
  { id: "claude-opus-4-6", name: "Claude Opus 4.6", contextLength: 200000 },
  // Claude Sonnet 5
  { id: "claude-sonnet-5-max", name: "Claude Sonnet 5 Max", contextLength: 1000000 },
  { id: "claude-sonnet-5-xhigh", name: "Claude Sonnet 5 XHigh", contextLength: 1000000 },
  { id: "claude-sonnet-5-high", name: "Claude Sonnet 5 High", contextLength: 1000000 },
  { id: "claude-sonnet-5-medium", name: "Claude Sonnet 5 Medium", contextLength: 1000000 },
  { id: "claude-sonnet-5-low", name: "Claude Sonnet 5 Low", contextLength: 1000000 },
  // Claude Sonnet 4.6
  {
    id: "claude-sonnet-4-6-thinking-1m",
    name: "Claude Sonnet 4.6 Thinking 1M",
    contextLength: 1000000,
  },
  {
    id: "claude-sonnet-4-6-thinking",
    name: "Claude Sonnet 4.6 Thinking",
    contextLength: 200000,
  },
  { id: "claude-sonnet-4-6-1m", name: "Claude Sonnet 4.6 1M", contextLength: 1000000 },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", contextLength: 200000 },
  // GPT-5.6
  { id: "gpt-5-6-sol-max", name: "GPT-5.6 Sol Max", contextLength: 1000000 },
  { id: "gpt-5-6-sol-xhigh", name: "GPT-5.6 Sol XHigh", contextLength: 1000000 },
  { id: "gpt-5-6-sol-high", name: "GPT-5.6 Sol High", contextLength: 1000000 },
  { id: "gpt-5-6-sol-medium", name: "GPT-5.6 Sol Medium", contextLength: 1000000 },
  { id: "gpt-5-6-sol-low", name: "GPT-5.6 Sol Low", contextLength: 1000000 },
  /// Terra
  { id: "gpt-5-6-terra-max", name: "GPT-5.6 Terra Max", contextLength: 1000000 },
  { id: "gpt-5-6-terra-xhigh", name: "GPT-5.6 Terra XHigh", contextLength: 1000000 },
  { id: "gpt-5-6-terra-high", name: "GPT-5.6 Terra High", contextLength: 1000000 },
  { id: "gpt-5-6-terra-medium", name: "GPT-5.6 Terra Medium", contextLength: 1000000 },
  { id: "gpt-5-6-terra-low", name: "GPT-5.6 Terra Low", contextLength: 1000000 },
  /// Luna
  { id: "gpt-5-6-luna-max", name: "GPT-5.6 Luna Max", contextLength: 1000000 },
  { id: "gpt-5-6-luna-xhigh", name: "GPT-5.6 Luna XHigh", contextLength: 1000000 },
  { id: "gpt-5-6-luna-high", name: "GPT-5.6 Luna High", contextLength: 1000000 },
  { id: "gpt-5-6-luna-medium", name: "GPT-5.6 Luna Medium", contextLength: 1000000 },
  { id: "gpt-5-6-luna-low", name: "GPT-5.6 Luna Low", contextLength: 1000000 },
  // GPT-5.5
  { id: "gpt-5-5-xhigh", name: "GPT-5.5 XHigh", contextLength: 272000 },
  { id: "gpt-5-5-high", name: "GPT-5.5 High", contextLength: 272000 },
  { id: "gpt-5-5-medium", name: "GPT-5.5 Medium", contextLength: 272000 },
  { id: "gpt-5-5-low", name: "GPT-5.5 Low", contextLength: 272000 },
  // Gemini
  { id: "gemini-3-1-pro-high", name: "Gemini 3.1 Pro High", contextLength: 1048576 },
  { id: "gemini-3-1-pro-low", name: "Gemini 3.1 Pro Low", contextLength: 1048576 },
  { id: "gemini-3-5-flash-high", name: "Gemini 3.5 Flash High", contextLength: 1048576 },
  { id: "gemini-3-5-flash-medium", name: "Gemini 3.5 Flash Medium", contextLength: 1048576 },
  { id: "gemini-3-5-flash-low", name: "Gemini 3.5 Flash Low", contextLength: 1048576 },
  { id: "gemini-3-5-flash-minimal", name: "Gemini 3.5 Flash Minimal", contextLength: 1048576 },
  // Grok
  { id: "grok-4-5-high", name: "Grok 4.5 High", contextLength: 500000 },
  { id: "grok-4-5-medium", name: "Grok 4.5 Medium", contextLength: 500000 },
  { id: "grok-4-5-low", name: "Grok 4.5 Low", contextLength: 500000 },
  // GLM
  { id: "glm-5-2-max-1m", name: "GLM-5.2 Max 1M", contextLength: 1000000 },
  { id: "glm-5-2-max", name: "GLM-5.2 Max" },
  { id: "glm-5-2-1m", name: "GLM-5.2 High 1M", contextLength: 1000000 },
  { id: "glm-5-2", name: "GLM-5.2 High" },
  // Others
  { id: "deepseek-v4", name: "DeepSeek V4 Pro", contextLength: 1048576 },
  { id: "nemotron-3-ultra-nvfp4", name: "Nemotron 3 Ultra", contextLength: 262144 },
  { id: "kimi-k2-7", name: "Kimi K2.7", contextLength: 262144 },
];
