/**
 * chatCore compression settings resolution (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's Proactive Context Compression setup: read the canonical
 * compression settings and derive the prompt-compression and delegated context-editing flags.
 * Best-effort — on a lookup error it logs and falls back to disabled, exactly like the previous
 * inline try/catch. Behaviour is byte-identical.
 */

import type { CompressionConfig } from "../../services/compression/types.ts";

type LoggerLike = { warn?: (...args: unknown[]) => void } | null | undefined;

export async function resolveCompressionSettings(log?: LoggerLike): Promise<{
  settings: CompressionConfig | null;
  enabled: boolean;
  contextEditingEnabled: boolean;
}> {
  try {
    const { getCompressionSettings } = await import("@/lib/db/compression");
    const settings = await getCompressionSettings();
    return {
      settings,
      enabled: settings.enabled,
      contextEditingEnabled: settings.contextEditing?.enabled === true,
    };
  } catch (err) {
    log?.warn?.(
      "COMPRESSION",
      "Compression settings lookup skipped: " + (err instanceof Error ? err.message : String(err))
    );
    return { settings: null, enabled: false, contextEditingEnabled: false };
  }
}
