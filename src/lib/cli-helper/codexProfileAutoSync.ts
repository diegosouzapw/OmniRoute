import path from "node:path";
import { ensureCliConfigWriteAllowed, getCliConfigPaths } from "@/shared/services/cliRuntime";
import { getModelSyncInternalBaseUrl } from "@/shared/services/modelSyncScheduler";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

type SyncResult =
  | {
      ok: true;
      written: number;
      skipped: number;
      reason: string;
    }
  | {
      ok: false;
      skipped: true;
      reason: string;
    };

function isAutoSyncEnabled() {
  // Opt-in, default OFF. Backed by the OMNIROUTE_AUTO_SYNC_CODEX_PROFILES feature flag
  // (resolver precedence: DB/dashboard-toggle override > env > default "false"), so a
  // provider model sync never silently writes ~/.codex/*.config.toml unless the operator
  // turned it on — via the providers-dashboard toggle or the env var.
  return isFeatureFlagEnabled("OMNIROUTE_AUTO_SYNC_CODEX_PROFILES");
}

function forwardAuthHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");
  if (cookie) headers.cookie = cookie;
  if (authorization) headers.authorization = authorization;
  return headers;
}

export async function autoSyncCodexProfilesFromLiveCatalog(
  request: Request,
  reason: string
): Promise<SyncResult> {
  if (!isAutoSyncEnabled()) {
    return { ok: false, skipped: true, reason: "disabled" };
  }

  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) {
    return { ok: false, skipped: true, reason: writeGuard };
  }

  const baseUrl = getModelSyncInternalBaseUrl().replace(/\/$/, "");
  const res = await fetch(`${baseUrl}/v1/models`, {
    headers: forwardAuthHeaders(request),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    return { ok: false, skipped: true, reason: `catalog_http_${res.status}` };
  }

  const body = await res.json();
  const candidateModels = Array.isArray(body) ? body : body.data || body.models || [];
  const models = Array.isArray(candidateModels) ? candidateModels : [];
  const codexPaths = getCliConfigPaths("codex");
  if (!codexPaths?.config) {
    return { ok: false, skipped: true, reason: "codex_config_path_unavailable" };
  }
  const codexHome = path.dirname(codexPaths.config);

  // Reuse the CLI generator so automatic sync and `omniroute setup-codex`
  // stay behaviorally identical.
  // @ts-ignore - bin CLI modules are shipped as ESM JavaScript, without TS declarations.
  const { syncCodexProfilesFromModels } = await import("../../../bin/cli/commands/setup-codex.mjs");
  const result = await syncCodexProfilesFromModels(models, { codexHome });

  return {
    ok: true,
    written: result.written,
    skipped: result.skipped,
    reason,
  };
}
