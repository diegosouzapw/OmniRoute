import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { updateSettingsSchema } from "@/shared/validation/settingsSchemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { validateProxyUrl, upsertUpstreamProxyConfig } from "@/lib/db/upstreamProxy";
import {
  ensurePersistentManagementPasswordHash,
  getStoredManagementPassword,
  hasManagementPasswordConfigured,
  hashManagementPassword,
  verifyManagementPassword,
} from "@/lib/auth/managementPassword";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * Settings keys whose change broadens attack surface. Spec §Security:
 * password re-auth is required when any of these is present in a PATCH body.
 *
 * - `localOnlyManageScopeBypassEnabled` / `localOnlyManageScopeBypassPrefixes`:
 *   T-011 bypass kill-switch + per-prefix list. Operator must re-confirm
 *   before broadening the LOCAL_ONLY carve-out.
 * - `requireLogin` / `mcpEnabled`: existing security toggles.
 * - `newPassword`: password rotation (existing). Handled by the same gate so
 *   the password-verify only fires ONCE per PATCH.
 */
const SECURITY_IMPACTING_KEYS = [
  "localOnlyManageScopeBypassEnabled",
  "localOnlyManageScopeBypassPrefixes",
  "requireLogin",
  "mcpEnabled",
  "newPassword",
] as const;

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const settings = await getSettings();
    const { password, ...safeSettings } = settings;

    const runtimePorts = getRuntimePorts();
    const cloudUrl = process.env.CLOUD_URL || process.env.NEXT_PUBLIC_CLOUD_URL || null;
    const machineId = await getConsistentMachineId();

    return NextResponse.json({
      ...safeSettings,
      hasPassword: hasManagementPasswordConfigured(settings),
      runtimePorts,
      apiPort: runtimePorts.apiPort,
      dashboardPort: runtimePorts.dashboardPort,
      cloudConfigured: Boolean(cloudUrl),
      cloudUrl,
      machineId,
    });
  } catch (error) {
    console.log("Error getting settings:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();

    // Zod validation
    const validation = validateBody(updateSettingsSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body: typeof validation.data & { password?: string } = { ...validation.data };

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

    const settings = await updateSettings(body);

    // Sync CLIProxyAPI settings to upstream_proxy_config table
    const cpaUrl = rawBody.cliproxyapi_url as string | undefined;
    const cpaFallback = rawBody.cliproxyapi_fallback_enabled as boolean | undefined;
    if (cpaUrl && typeof cpaUrl === "string") {
      const urlValidation = validateProxyUrl(cpaUrl);
      if (urlValidation.valid === false) {
        return NextResponse.json(
          { error: `Invalid CLIProxyAPI URL: ${urlValidation.error}` },
          { status: 400 }
        );
      }
    }

    if (cpaFallback !== undefined || cpaUrl !== undefined) {
      const enabled =
        cpaFallback ?? (settings as Record<string, unknown>).cliproxyapi_fallback_enabled;
      const mode = enabled ? "fallback" : "native";
      await upsertUpstreamProxyConfig({
        providerId: "cliproxyapi",
        mode,
        enabled: !!enabled,
      });
    }

    const { password, ...safeSettings } = settings;
    return NextResponse.json(safeSettings);
  } catch (error) {
    console.log("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return PATCH(request);
}
