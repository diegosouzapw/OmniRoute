import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { getSettings, updateSettings } from "@/lib/db/settings";
import {
  hasManagementPasswordConfigured,
  hashManagementPassword,
} from "@/lib/auth/managementPassword";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  getDashboardJwtSecret,
  verifyDashboardSessionToken,
} from "@/shared/utils/dashboardSessionToken";
import { getNodeRuntimeSupport } from "@/shared/utils/nodeRuntimeSupport.ts";
import { updateRequireLoginSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

async function checkSessionAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    return (await verifyDashboardSessionToken(token, getDashboardJwtSecret())) !== null;
  } catch {
    return false;
  }
}

// Node.js compatibility check — reflect the supported secure runtime floors used by CLI/CI.
function getNodeCompatibility() {
  const { nodeVersion, nodeCompatible } = getNodeRuntimeSupport();
  return { nodeVersion, nodeCompatible };
}

function hasConfiguredPassword(settings: Record<string, unknown>) {
  return hasManagementPasswordConfigured(settings);
}

function isBootstrapSecurityWindow(settings: Record<string, unknown>) {
  return !hasConfiguredPassword(settings);
}

export async function GET() {
  const nodeInfo = getNodeCompatibility();
  try {
    const settings = await getSettings();
    const requireLogin = settings.requireLogin !== false;
    const authenticated = await checkSessionAuthenticated();
    const hasPassword = hasManagementPasswordConfigured(settings);
    const setupComplete = !!settings.setupComplete;
    const oidcEnabled = !!settings.oidcEnabled;
    const oidcDisablePasswordLogin =
      oidcEnabled &&
      (settings.oidcDisablePasswordLogin === true ||
        isFeatureFlagEnabled("OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN") ||
        process.env.OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN === "true" ||
        process.env.OIDC_DISABLE_PASSWORD_LOGIN === "true");
    return NextResponse.json({
      authenticated,
      requireLogin,
      hasPassword,
      setupComplete,
      oidcEnabled,
      oidcDisablePasswordLogin,
      ...nodeInfo,
    });
  } catch (error) {
    console.error("[API] Error fetching require-login settings:", error);
    return NextResponse.json(
      {
        authenticated: false,
        requireLogin: true,
        hasPassword: true,
        setupComplete: true,
        oidcEnabled: false,
        oidcDisablePasswordLogin: false,
        ...nodeInfo,
      },
      { status: 200 }
    );
  }
}

/**
 * POST /api/settings/require-login — Set password and/or toggle requireLogin.
 * Unauthenticated writes are only allowed during the initial bootstrap window.
 */
export async function POST(request: Request) {
  const settings = await getSettings();
  if (!isBootstrapSecurityWindow(settings) && !(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateRequireLoginSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;
    const { requireLogin, password } = body;

    const updates: Record<string, any> = {};

    if (typeof requireLogin === "boolean") {
      updates.requireLogin = requireLogin;
    }

    if (password) {
      const hashedPassword = await hashManagementPassword(password);
      updates.password = hashedPassword;
    }

    await updateSettings(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error updating require-login settings:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update settings" },
      { status: 500 }
    );
  }
}
