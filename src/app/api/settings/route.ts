import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { updateSettingsSchema } from "@/shared/validation/settingsSchemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { resolveModelLockoutSettings } from "@/lib/resilience/modelLockoutSettings";
import {
  validateProxyUrl,
  upsertUpstreamProxyConfig,
  getUpstreamProxyConfig,
} from "@/lib/db/upstreamProxy";
import { getProviderConnections } from "@/lib/db/providers";
import { clearCliproxyapiUrlCache } from "@omniroute/open-sse/executors/cliproxyapi.ts";
import {
  ensurePersistentManagementPasswordHash,
  getStoredManagementPassword,
  hasManagementPasswordConfigured,
  hashManagementPassword,
  verifyManagementPassword,
} from "@/lib/auth/managementPassword";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { isCliTokenAuthValid } from "@/lib/middleware/cliTokenAuth";
import { extractApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";

/**
 * Force this route to run dynamically per-request and never be cached/prerendered.
 * Combined with the `Cache-Control: no-store` response header below, this keeps
 * persisted settings (e.g. dashboard preferences, debugMode, hidden sidebar
 * items) visible immediately after refresh or restart instead of falling back
 * to stale Next.js fetch cache. Ported from upstream decolua/9router#951.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Response headers applied to every successful GET/PATCH on /api/settings. */
const SETTINGS_RESPONSE_HEADERS = { "Cache-Control": "no-store" } as const;

/**
 * Settings keys whose change broadens attack surface. Spec §Security:
 * password re-auth is required when any of these is present in a PATCH body.
 *
 * - `localOnlyManageScopeBypassEnabled` / `localOnlyManageScopeBypassPrefixes`:
 *   T-011 bypass kill-switch + per-prefix list. Operator must re-confirm
 *   before broadening the LOCAL_ONLY carve-out.
 * - `requireLogin`: dashboard login enforcement toggle.
 * - `newPassword`: password rotation (existing). Handled by the same gate so
 *   the password-verify only fires ONCE per PATCH.
 *
 * Note: `mcpEnabled` is NOT gated server-side — the dedicated MCP page
 * (/dashboard/mcp) toggles it via patchSetting() without a currentPassword
 * prompt. The Authz section can still prompt client-side for consistency,
 * but the server accepts the change without re-auth.
 */
const SECURITY_IMPACTING_KEYS = [
  "localOnlyManageScopeBypassEnabled",
  "localOnlyManageScopeBypassPrefixes",
  "requireLogin",
  "newPassword",
] as const;

/**
 * Derive an audit actor string from the inbound request. Falls back to
 * `"dashboard"` for cookie sessions, `"apikey:<id>"` for Bearer API keys,
 * `"cli"` for CLI machine-token sessions, and `"anonymous"` otherwise. Best
 * effort — any lookup error degrades to `"unknown"` so the audit row still
 * carries actor context.
 */
async function deriveAuditActor(request: Request): Promise<string> {
  try {
    if (await isDashboardSessionAuthenticated(request)) return "dashboard";
  } catch {
    /* fall through */
  }
  try {
    if (await isCliTokenAuthValid(request)) return "cli";
  } catch {
    /* fall through */
  }
  try {
    const apiKey = extractApiKey(request);
    if (apiKey) {
      const meta = await getApiKeyMetadata(apiKey);
      if (meta?.id) return `apikey:${meta.id}`;
      return "apikey:unknown";
    }
  } catch {
    return "unknown";
  }
  return "anonymous";
}

/** Deep-equality for diff detection. JSON round-trip handles plain settings. */
function isDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

/** Build per-key `{before, after}` diff for changed keys (top-level only). */
function computeSettingsDiff(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  candidateKeys: string[]
): Record<string, { before: unknown; after: unknown }> {
  const diff: Record<string, { before: unknown; after: unknown }> = {};
  for (const key of candidateKeys) {
    if (!isDeepEqual(before[key], after[key])) {
      diff[key] = { before: before[key], after: after[key] };
    }
  }
  return diff;
}

/** List of top-level body keys the operator attempted to change (audit context). */
function attemptedKeysOf(body: Record<string, unknown> | null | undefined): string[] {
  if (!body || typeof body !== "object") return [];
  return Object.keys(body).filter(
    (k) => k !== "currentPassword" && k !== "newPassword" && k !== "password"
  );
}

/** Emit a settings.update_failed row. Never throws — audit must not break flow. */
function emitSettingsFailureAudit(
  request: Request,
  actor: string,
  reason: string,
  attemptedKeys: string[]
) {
  try {
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: "settings.update_failed",
      actor,
      target: "settings",
      resourceType: "settings",
      status: "failure",
      ipAddress: ipAddress || undefined,
      requestId: requestId || undefined,
      details: { reason, attempted_keys: attemptedKeys },
    });
  } catch {
    /* best effort */
  }
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const settings = await getSettings();
    const { password, ...safeSettings } = settings;

    const runtimePorts = getRuntimePorts();
    const cloudUrl = process.env.CLOUD_URL || process.env.NEXT_PUBLIC_CLOUD_URL || null;
    const machineId = await getConsistentMachineId();

    // Include cliproxyapi_model_mapping from upstream_proxy_config table
    let cliproxyapiModelMapping: Record<string, string> | null = null;
    try {
      const proxyConfig = await getUpstreamProxyConfig("cliproxyapi");
      if (proxyConfig?.cliproxyapiModelMapping) {
        cliproxyapiModelMapping = proxyConfig.cliproxyapiModelMapping as Record<string, string>;
      }
    } catch {
      // best effort — don't fail GET /api/settings if this lookup fails
    }

    return NextResponse.json(
      {
        ...safeSettings,
        hasPassword: hasManagementPasswordConfigured(settings),
        runtimePorts,
        apiPort: runtimePorts.apiPort,
        dashboardPort: runtimePorts.dashboardPort,
        cloudConfigured: Boolean(cloudUrl),
        cloudUrl,
        machineId,
        ...(cliproxyapiModelMapping !== null
          ? { cliproxyapi_model_mapping: cliproxyapiModelMapping }
          : {}),
      },
      { headers: SETTINGS_RESPONSE_HEADERS }
    );
  } catch (error) {
    console.log("Error getting settings:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  // Derive actor + raw body once so the rejection paths can audit consistently.
  const actor = await deriveAuditActor(request);
  let rawBody: Record<string, unknown> = {};
  try {
    rawBody = (await request.json()) as Record<string, unknown>;
  } catch {
    // Malformed JSON — surface a zod-style failure path so the rejection
    // is auditable like every other 400.
    emitSettingsFailureAudit(request, actor, "INVALID_JSON", []);
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body is not valid JSON" } },
      { status: 400 }
    );
  }
  const attemptedKeys = attemptedKeysOf(rawBody);

  try {
    // Zod validation
    const validation = validateBody(updateSettingsSchema, rawBody);
    if (isValidationFailure(validation)) {
      // Detect spawn-capable prefix rejection (spec AC-8) so the audit row
      // names the correct error code; otherwise fall back to the generic
      // validation-failure label.
      const isBypassPrefixRejection = (validation.error.details || []).some(
        (d) => typeof d.message === "string" && d.message.includes("BYPASS_PREFIX_NOT_ALLOWED")
      );
      emitSettingsFailureAudit(
        request,
        actor,
        isBypassPrefixRejection ? "BYPASS_PREFIX_NOT_ALLOWED" : "VALIDATION_FAILED",
        attemptedKeys
      );
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body: typeof validation.data & { password?: string } = { ...validation.data };

    // Sanitize model lockout settings: clamp values to valid bounds so that
    // stale DB values or hand-crafted requests don't bypass range validation.
    if (body.modelLockout) {
      body.modelLockout = resolveModelLockoutSettings({
        modelLockout: body.modelLockout as Record<string, unknown>,
      }) as typeof body.modelLockout;
    }

    // Security-impacting gate (T-011, spec AC-4 / AC-5). Computed from the
    // VALIDATED body so we never trip on stray unknown keys. If any security
    // key is present, require currentPassword + verify against the stored
    // bcrypt hash. Dedupes with the previous inline newPassword reauth — the
    // password is verified at most once per PATCH.
    const touchedSecurityKeys = SECURITY_IMPACTING_KEYS.filter((k) => k in validation.data);
    let storedPasswordHash = "";
    if (touchedSecurityKeys.length > 0) {
      const settings = await getSettings();
      // Lazy-hash any plaintext INITIAL_PASSWORD migration BEFORE we read the
      // stored hash, so the gate works on fresh deploys too.
      const passwordState = await ensurePersistentManagementPasswordHash({
        settings,
        source: "settings.security_impacting_update",
      });
      storedPasswordHash = getStoredManagementPassword(passwordState.settings);
      // Cold-boot exception: same condition the existing newPassword path
      // honoured before T-011 — when no password is configured yet AND login
      // is currently disabled, allow the first write to set policy (incl.
      // the password itself). Once a hash exists the gate always fires.
      const isColdBoot = !storedPasswordHash && passwordState.settings.requireLogin === false;
      if (!isColdBoot) {
        if (!body.currentPassword) {
          emitSettingsFailureAudit(request, actor, "PASSWORD_REQUIRED", attemptedKeys);
          return NextResponse.json(
            {
              error: {
                code: "PASSWORD_REQUIRED",
                message: "currentPassword required for security-impacting setting changes",
                keys: touchedSecurityKeys,
              },
            },
            { status: 400 }
          );
        }
        const isValid = await verifyManagementPassword(body.currentPassword, storedPasswordHash);
        if (!isValid) {
          emitSettingsFailureAudit(request, actor, "PASSWORD_MISMATCH", attemptedKeys);
          return NextResponse.json(
            {
              error: {
                code: "PASSWORD_MISMATCH",
                message: "Invalid current password",
              },
            },
            { status: 401 }
          );
        }
      }
    }

    // Password rotation: hash the new value AFTER the gate has accepted the
    // currentPassword (or the cold-boot exception fired). The gate already
    // included `newPassword` in SECURITY_IMPACTING_KEYS, so no separate
    // verify happens here — strictly hashing + body rewriting.
    if (body.newPassword) {
      body.password = await hashManagementPassword(body.newPassword);
      delete body.newPassword;
    }
    delete body.currentPassword;

    // Snapshot BEFORE the write so the success row can record a real diff.
    const beforeSnapshot = (await getSettings()) as Record<string, unknown>;
    const settings = await updateSettings(body);

    // Sync CLIProxyAPI settings to upstream_proxy_config table
    const cpaUrl = rawBody.cliproxyapi_url as string | undefined;
    const cpaFallback = rawBody.cliproxyapi_fallback_enabled as boolean | undefined;
    if (cpaUrl && typeof cpaUrl === "string") {
      const urlValidation = validateProxyUrl(cpaUrl);
      if (urlValidation.valid === false) {
        emitSettingsFailureAudit(request, actor, "CLIPROXY_URL_INVALID", attemptedKeys);
        return NextResponse.json(
          { error: `Invalid CLIProxyAPI URL: ${urlValidation.error}` },
          { status: 400 }
        );
      }
      // Invalidate the executor's URL cache so it picks up the new URL immediately
      clearCliproxyapiUrlCache();
    }

    const cpaModelMapping = rawBody.cliproxyapi_model_mapping as Record<string, string> | undefined;

    if (cpaFallback !== undefined || cpaUrl !== undefined || cpaModelMapping !== undefined) {
      const enabled =
        cpaFallback ?? (settings as Record<string, unknown>).cliproxyapi_fallback_enabled;
      const mode = enabled ? "fallback" : "native";

      // Get all distinct active provider IDs so each one gets its own
      // upstream_proxy_config row. chatCore reads per-provider config
      // (e.g. getUpstreamProxyConfig("anthropic")), not a single global row.
      // Embedded service IDs are not real routing targets and must be skipped.
      const EMBEDDED_SERVICE_IDS = new Set(["cliproxyapi", "9router"]);
      const activeConnections = await getProviderConnections({ isActive: true });
      const activeProviderIds = [
        ...new Set(
          activeConnections
            .map((c: Record<string, unknown>) => c.provider as string)
            .filter((id: string) => !EMBEDDED_SERVICE_IDS.has(id))
        ),
      ];

      for (const providerId of activeProviderIds) {
        await upsertUpstreamProxyConfig({
          providerId,
          mode,
          enabled: !!enabled,
          ...(cpaModelMapping !== undefined ? { cliproxyapiModelMapping: cpaModelMapping } : {}),
        });
      }

      // Update the "cliproxyapi" sentinel row used by GET /api/settings to
      // retrieve cliproxyapi_model_mapping. This row is NOT used for routing
      // (chatCore reads per-real-provider rows above); it exists solely as
      // storage for the global model-mapping blob.
      await upsertUpstreamProxyConfig({
        providerId: "cliproxyapi",
        mode,
        enabled: !!enabled,
        ...(cpaModelMapping !== undefined ? { cliproxyapiModelMapping: cpaModelMapping } : {}),
      });
    }

    // Audit success — diff of changed keys only. Idempotent PATCH (no diff)
    // intentionally writes NO row (spec §Observability + AC-9/AC-11).
    try {
      const afterSnapshot = settings as Record<string, unknown>;
      const candidateKeys = Object.keys(body);
      const diff = computeSettingsDiff(beforeSnapshot, afterSnapshot, candidateKeys);
      if (Object.keys(diff).length > 0) {
        const { ipAddress, requestId } = getAuditRequestContext(request);
        logAuditEvent({
          action: "settings.update",
          actor,
          target: "settings",
          resourceType: "settings",
          status: "success",
          ipAddress: ipAddress || undefined,
          requestId: requestId || undefined,
          details: { diff },
        });
      }
    } catch {
      // Audit failure must never break the write — swallow.
    }

    const { password, ...safeSettings } = settings;
    return NextResponse.json(safeSettings, { headers: SETTINGS_RESPONSE_HEADERS });
  } catch (error) {
    console.log("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return PATCH(request);
}
