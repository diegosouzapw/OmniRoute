import type { RegistryModel } from "../../shared.ts";

type EffortVariant = readonly [suffix: string, label: string];

const QUALITY_EFFORTS: readonly EffortVariant[] = [
  ["max", "Max"],
  ["xhigh", "XHigh"],
  ["high", "High"],
  ["medium", "Medium"],
  ["low", "Low"],
];

const GPT_EFFORTS: readonly EffortVariant[] = [
  ["max", "Max Thinking"],
  ["xhigh", "XHigh Thinking"],
  ["high", "High Thinking"],
  ["medium", "Medium Thinking"],
  ["low", "Low Thinking"],
  ["none", "No Thinking"],
];

function model(
  id: string,
  name: string,
  maxOutputTokens?: number,
  contextLength?: number
): RegistryModel {
  return {
    id,
    name,
    ...(maxOutputTokens === undefined ? {} : { maxOutputTokens }),
    ...(contextLength === undefined ? {} : { contextLength }),
  };
}

function effortModels(
  id: string,
  name: string,
  maxOutputTokens: number,
  contextLength: number | undefined,
  efforts: readonly EffortVariant[] = QUALITY_EFFORTS
): RegistryModel[] {
  return efforts.map(([suffix, label]) =>
    model(`${id}-${suffix}`, `${name} ${label}`, maxOutputTokens, contextLength)
  );
}

function fastEffortModels(
  id: string,
  name: string,
  maxOutputTokens: number,
  contextLength: number
): RegistryModel[] {
  return QUALITY_EFFORTS.flatMap(([suffix, label]) => [
    model(`${id}-${suffix}-fast`, `${name} ${label} Fast`, maxOutputTokens, contextLength),
    model(`${id}-${suffix}`, `${name} ${label}`, maxOutputTokens, contextLength),
  ]);
}

function gptModels(id: string, name: string): RegistryModel[] {
  return GPT_EFFORTS.flatMap(([suffix, label]) => [
    model(`${id}-${suffix}-priority`, `${name} ${label} Fast`, 128_000, 1_000_000),
    model(`${id}-${suffix}`, `${name} ${label}`, 128_000, 1_000_000),
  ]);
}

/**
 * Curated from the authenticated `devin models list --format json` response on
 * 2026-09-02. Keep this deliberately smaller than Devin's full live catalog:
 * these are the operator-selected models OmniRoute intends to expose.
 */
export const DEVIN_MODEL_CATALOG: RegistryModel[] = [
  ...effortModels("claude-fable-5-1", "Claude Fable 5.1", 128_000, 1_000_000),
  ...fastEffortModels("claude-opus-5", "Claude Opus 5", 128_000, 1_000_000),
  ...fastEffortModels("claude-opus-4-8", "Claude Opus 4.8", 128_000, 1_000_000),
  ...effortModels("claude-sonnet-5", "Claude Sonnet 5", 128_000, 1_000_000),

  model("claude-sonnet-4-6-thinking-1m", "Claude Sonnet 4.6 Thinking 1M", 128_000, 1_000_000),
  model("claude-sonnet-4-6-1m", "Claude Sonnet 4.6 1M", 128_000, 1_000_000),
  model("claude-sonnet-4-6-thinking", "Claude Sonnet 4.6 Thinking", 128_000, 200_000),
  model("claude-sonnet-4-6", "Claude Sonnet 4.6", 128_000, 200_000),
  model("MODEL_PRIVATE_11", "Claude Haiku 4.5", 64_000, 200_000),

  ...gptModels("gpt-5-6-sol", "GPT-5.6 Sol"),
  ...gptModels("gpt-5-6-terra", "GPT-5.6 Terra"),
  ...gptModels("gpt-5-6-luna", "GPT-5.6 Luna"),

  ...effortModels("kimi-k3", "Kimi K3", 131_072, 1_048_576, [
    ["max", "Max"],
    ["high", "High"],
    ["low", "Low"],
  ]),
  model("kimi-k2-7", "Kimi K2.7", 16_000, 262_144),

  ...effortModels("glm-5-3", "GLM-5.3", 128_000, 1_000_000, [
    ["max", "Max"],
    ["high", "High"],
    ["low", "Low"],
  ]),
  ...effortModels("glm-5-3-flash", "GLM-5.3 Flash", 128_000, 1_000_000, [
    ["max", "Max"],
    ["high", "High"],
    ["low", "Low"],
  ]),

  model("swe-1-7", "SWE-1.7 Max", 128_000, 262_000),
  model("swe-1-7-medium", "SWE-1.7 Medium", 128_000, 262_000),
  model("swe-1-7-lightning", "SWE-1.7 Lightning Max", 96_000, 202_752),
  model("swe-1-7-lightning-medium", "SWE-1.7 Lightning Medium", 96_000, 202_752),
  model("adaptive", "Adaptive"),

  ...effortModels("grok-4-6", "Grok 4.6", 100_000, 500_000, [
    ["xhigh", "XHigh"],
    ["high", "High"],
    ["medium", "Medium"],
    ["low", "Low"],
  ]),
  ...effortModels("inkling", "Inkling", 131_072, undefined, [
    ["max", "Max"],
    ["xhigh", "X-High"],
    ["high", "High"],
    ["medium", "Medium"],
    ["low", "Low"],
    ["none", "None"],
  ]),
  ...effortModels("deepseek-v4-flash", "DeepSeek V4 Flash", 384_000, 1_000_000, [
    ["max", "Max"],
    ["high", "High"],
    ["low", "Low"],
  ]),
  ...effortModels("nemotron-3-ultra", "Nemotron 3 Ultra", 32_768, 262_144, [
    ["high", "High"],
    ["medium", "Medium"],
    ["none", "None"],
  ]),
  ...effortModels("gemini-3-7-flash", "Gemini 3.7 Flash", 65_535, 1_048_576, [
    ["high", "High"],
    ["medium", "Medium"],
    ["low", "Low"],
  ]),
  ...effortModels("gemini-3-1-pro", "Gemini 3.1 Pro", 65_535, 1_048_576, [
    ["high", "High Thinking"],
    ["low", "Low Thinking"],
  ]),
  ...effortModels("deepseek-v4-pro", "DeepSeek V4 Pro", 384_000, 1_000_000, [
    ["max", "Max"],
    ["high", "High"],
    ["low", "Low"],
  ]),
];
