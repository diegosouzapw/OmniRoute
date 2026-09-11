import type { CodexClientCompatibility, CodexModelsFetch } from "./codex";
import { buildCodexClientCompatibilityWarning } from "./codex";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  safeOutboundFetch,
  type SafeOutboundFetchGuard,
} from "@/shared/network/safeOutboundFetch";

/**
 * Collects the client-compatibility diagnostics the Codex GitHub catalog
 * fetch reports through its callback seam, and renders them as response
 * warnings: `get()` for the success path, `append()` to merge the
 * compatibility warning into the fallback-path warnings.
 */
export type CodexCompatibilityWarnings = {
  onCompatibility: (compatibility: CodexClientCompatibility) => void;
  append: (warning: string) => string;
  get: () => string | null;
};

export function createCodexCompatibilityWarnings(): CodexCompatibilityWarnings {
  let compatibility: CodexClientCompatibility | null = null;
  const warning = () =>
    compatibility ? buildCodexClientCompatibilityWarning(compatibility) : null;
  return {
    onCompatibility: (value) => {
      compatibility = value;
    },
    get: warning,
    append: (base) => [base, warning()].filter(Boolean).join(" "),
  };
}

/** Shared models-discovery fetch wrapper for the live and GitHub catalog calls. */
export function createCodexCatalogFetch(
  proxy: unknown,
  guard: SafeOutboundFetchGuard
): CodexModelsFetch {
  return (url, init) =>
    safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard,
      proxyConfig: proxy,
      ...init,
    });
}
