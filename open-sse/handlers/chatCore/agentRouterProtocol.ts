/**
 * Per-request AgentRouter protocol decisions kept outside the chatCore orchestration god-file.
 * AgentRouter exposes Claude Messages, OpenAI Chat, and OpenAI Responses as distinct upstream
 * protocols, so its dynamic target format must override the connection's default Claude wire image.
 */

import { isClaudeCodeCompatibleProvider } from "../../services/claudeCodeCompatible.ts";
import { FORMATS } from "../../translator/formats.ts";

export function usesClaudeBridge(
  provider: string,
  targetFormat: string,
  credentials: unknown
): boolean {
  const configuredTargetFormat = (
    credentials as { providerSpecificData?: { targetFormat?: unknown } | null } | null | undefined
  )?.providerSpecificData?.targetFormat;
  const effectiveFormat = provider === "agentrouter" ? targetFormat : configuredTargetFormat;
  return (
    isClaudeCodeCompatibleProvider(provider) &&
    effectiveFormat !== FORMATS.OPENAI &&
    effectiveFormat !== FORMATS.OPENAI_RESPONSES
  );
}

export function stripStore(
  body: Record<string, unknown>,
  provider: string,
  targetFormat: string,
  providerSpecificData?: unknown
): void {
  if (provider.startsWith("openai-compatible-") && targetFormat === FORMATS.OPENAI_RESPONSES) {
    const psd =
      providerSpecificData && typeof providerSpecificData === "object"
        ? (providerSpecificData as Record<string, unknown>)
        : undefined;
    if (psd?.openaiStoreEnabled === true) {
      return;
    }
    body.store = false;
    return;
  }

  const supportsStore =
    provider === "openai" ||
    (provider === "agentrouter" && targetFormat === FORMATS.OPENAI_RESPONSES);
  if (!supportsStore && "store" in body) delete body.store;
}
