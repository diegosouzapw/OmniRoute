/**
 * @file dashscopeTextModels.ts
 * @description DashScope / Alibaba Model Studio text and vision model ID heuristics.
 *
 * @changes
 * - [2026-07-25] [Composer] - Add alibabafree text combo name detection for strict allowlist routing
 * - [2026-07-25] [Composer] - Add multimodal and audio model detection for free-tier combos
 * - [2026-07-25] [Composer] - Add vision/media model detection for alibabafreevision
 * - [2026-07-25] [Composer] - Extract DashScope text-model filter for open-sse consumers
 */

const DASHSCOPE_TEXT_MODEL_PREFIXES = [
  "qwen",
  "qwq-",
  "deepseek-",
  "glm-",
  "kimi-",
  "minimax-",
] as const;

const DASHSCOPE_VISION_MODEL_PREFIXES = ["wan", "qwen-image", "happyhorse", "z-image"] as const;

const DASHSCOPE_NON_TEXT_MODEL_TOKEN =
  /(?:^|[-_.\/])(?:asr|audio|captioner|embedding|image|livetranslate|omni|ocr|realtime|rerank|s2s|speech|tts|video|vl)(?:$|[-_.\/])/i;

const DASHSCOPE_VISION_MODEL_TOKEN =
  /(?:^|[-_.\/])(?:i2v|t2v|r2v|vace|kf2v|videoedit|animate|image-edit)(?:$|[-_.\/])/i;

export function isDashscopeTextModelId(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const modelId = value.trim().toLowerCase();
  if (!modelId || DASHSCOPE_NON_TEXT_MODEL_TOKEN.test(modelId)) return false;
  return DASHSCOPE_TEXT_MODEL_PREFIXES.some((prefix) => modelId.startsWith(prefix));
}

export function isDashscopeVisionModelId(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const modelId = value.trim().toLowerCase();
  if (!modelId || isDashscopeTextModelId(modelId)) return false;
  return (
    DASHSCOPE_VISION_MODEL_PREFIXES.some((prefix) => modelId.startsWith(prefix)) ||
    DASHSCOPE_VISION_MODEL_TOKEN.test(modelId)
  );
}

const DASHSCOPE_AUDIO_PREFIXES = [
  "cosyvoice",
  "fun-asr",
  "qwen-audio",
  "qwen-voice",
  "voice-enrollment",
] as const;

const DASHSCOPE_AUDIO_MODEL_TOKEN =
  /(?:^|[-_.\/])(?:asr|tts|livetranslate|captioner|speech|voice-design|voice-enrollment)(?:$|[-_.\/])/i;

const DASHSCOPE_MULTIMODAL_MODEL_TOKEN = /(?:^|[-_.\/])omni(?:$|[-_.\/])/i;

export function isDashscopeAudioModelId(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const modelId = value.trim().toLowerCase();
  if (!modelId) return false;
  return (
    DASHSCOPE_AUDIO_PREFIXES.some((prefix) => modelId.startsWith(prefix)) ||
    DASHSCOPE_AUDIO_MODEL_TOKEN.test(modelId)
  );
}

export function isDashscopeMultimodalModelId(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const modelId = value.trim().toLowerCase();
  if (!modelId || isDashscopeAudioModelId(modelId) || isDashscopeVisionModelId(modelId)) {
    return false;
  }
  return DASHSCOPE_MULTIMODAL_MODEL_TOKEN.test(modelId);
}

export function isAlibabaFreeTierTextComboName(comboName: string | null | undefined): boolean {
  if (!comboName) return false;
  const normalized = comboName.trim().toLowerCase();
  if (
    isAlibabaFreeTierVisionComboName(normalized) ||
    isAlibabaFreeTierMultimodalComboName(normalized) ||
    isAlibabaFreeTierAudioComboName(normalized)
  ) {
    return false;
  }
  return normalized === "alibabafree" || normalized.endsWith("alibabafree");
}

export function isAlibabaFreeTierVisionComboName(comboName: string | null | undefined): boolean {
  if (!comboName) return false;
  const normalized = comboName.trim().toLowerCase();
  return normalized === "alibabafreevision" || normalized.endsWith("freevision");
}

export function isAlibabaFreeTierMultimodalComboName(
  comboName: string | null | undefined
): boolean {
  if (!comboName) return false;
  const normalized = comboName.trim().toLowerCase();
  return normalized === "alibabafreemultimodal" || normalized.endsWith("freemultimodal");
}

export function isAlibabaFreeTierAudioComboName(comboName: string | null | undefined): boolean {
  if (!comboName) return false;
  const normalized = comboName.trim().toLowerCase();
  return normalized === "alibabafreeaudio" || normalized.endsWith("freeaudio");
}
