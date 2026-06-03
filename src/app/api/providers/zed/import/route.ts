/**
 * API endpoint for the second leg of the 2-step Zed credential import flow.
 *
 * POST /api/providers/zed/import
 *
 * Receives `confirmedAccounts: Array<{ service, account, fingerprint }>` from
 * the dashboard (the dashboard got those fingerprints from `/discover`). The
 * server re-reads the keychain here and only imports the credentials whose
 * `(service, account, fingerprint)` triple matches the current keychain
 * snapshot — so a tampered or replayed discover response cannot trick this
 * endpoint into saving an unrelated token.
 *
 * For backwards compatibility, when `OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP=true`
 * is set, the endpoint accepts an empty/missing `confirmedAccounts` and falls
 * back to the v3.8.5 one-step "import everything" behaviour. Default is off.
 *
 * SECURITY-AUDITOR-NOTE: This endpoint is referenced by Socket.dev finding for
 * `app/.next/server/app/api/providers/zed/import/route.js`. The 2-step
 * confirmation flow added in v3.8.6 ensures the operator explicitly authorizes
 * every individual credential before it is persisted to the local SQLite
 * store. See docs/security/SOCKET_DEV_FINDINGS.md §2.
 *
 * Security: protected by requireManagementAuth.
 */

import { NextResponse } from "next/server";
import { discoverZedCredentials, isZedInstalled } from "@/lib/zed-oauth/keychain-reader";
import { partitionZedCredentials } from "@/lib/zed-oauth/importUtils";
import {
  filterCredentialsByConfirmation,
  parseConfirmedAccounts,
} from "@/lib/zed-oauth/confirmedAccounts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createProviderConnection } from "@/lib/db/providers";
import { isRunningInDocker } from "@/lib/zed-oauth/dockerDetect";

const LEGACY_ONE_STEP_ENABLED = process.env.OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP === "true";

interface ImportResponse {
  success: boolean;
  count?: number;
  providers?: string[];
  credentials?: Array<{
    provider: string;
    service: string;
    account: string;
    hasToken: boolean;
  }>;
  error?: string;
  zedInstalled?: boolean;
  zedDockerEnvironment?: boolean;
}

export async function POST(request: Request): Promise<NextResponse<ImportResponse> | Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let body: unknown = null;
  try {
    const raw = await request.text();
    body = raw ? JSON.parse(raw) : null;
  } catch {
    // Fall through — null body is acceptable only when LEGACY_ONE_STEP_ENABLED is on.
  }

  const confirmed = parseConfirmedAccounts(body);

  if (!LEGACY_ONE_STEP_ENABLED && confirmed === null) {
    return NextResponse.json(
      {
        success: false,
        error:
          "confirmedAccounts is required. Call POST /api/providers/zed/discover first, " +
          "let the user pick which credentials to import, then POST the chosen list as " +
          "{ confirmedAccounts: [{ service, account, fingerprint }, ...] }.",
      },
      { status: 400 }
    );
  }

  try {
    if (isRunningInDocker()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "OmniRoute is running inside Docker and cannot access the host keychain. " +
            "Use the Manual Token Import tab to paste your API key directly.",
          zedInstalled: false,
          zedDockerEnvironment: true,
        },
        { status: 422 }
      );
    }

    const zedInstalled = await isZedInstalled();
    if (!zedInstalled) {
      return NextResponse.json(
        {
          success: false,
          error: "Zed IDE does not appear to be installed on this system.",
          zedInstalled: false,
          zedDockerEnvironment: false,
        },
        { status: 404 }
      );
    }

    // Re-read the keychain on the server side so the import set comes from
    // the live OS state, not from whatever the client claims to have seen.
    console.log("[Zed Import] Re-reading Zed credentials from keychain for confirmation");
    const allCredentials = await discoverZedCredentials();
    const { importable, skipped, duplicatesDropped } = partitionZedCredentials(allCredentials);

    // Filter to the user-confirmed subset by (service, account, fingerprint).
    // If LEGACY_ONE_STEP_ENABLED, import everything (the historic v3.8.5
    // behaviour) but log a warning so operators know they're on the wide-open
    // path.
    let toImport = importable;
    if (confirmed !== null) {
      toImport = filterCredentialsByConfirmation(importable, confirmed);
    } else if (LEGACY_ONE_STEP_ENABLED) {
      console.warn(
        "[Zed Import] OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP=true — importing all keychain credentials without per-account confirmation. This mode is deprecated and will be removed in v3.9."
      );
    }

    if (toImport.length === 0) {
      if (allCredentials.length > 0) {
        console.warn(
          "[Zed Import] %d keychain credential(s) found, but the confirmed-accounts list did not match any supported entry",
          allCredentials.length
        );
      }
      return NextResponse.json({
        success: true,
        count: 0,
        providers: [],
        credentials: [],
        zedInstalled: true,
      });
    }

    let savedCount = 0;
    for (const cred of toImport) {
      try {
        await createProviderConnection({
          provider: cred.provider,
          authType: "apikey",
          apiKey: cred.token,
          name: "Zed Import (" + (cred.account || cred.service) + ")",
          isActive: true,
        });
        savedCount++;
      } catch (err) {
        console.error("[Zed Import] Failed to save credential for %s:", cred.provider, err);
      }
    }

    if (skipped.length > 0 || duplicatesDropped > 0) {
      console.log(
        "[Zed Import] Skipped %d unsupported credential(s) and dropped %d duplicate credential(s)",
        skipped.length,
        duplicatesDropped
      );
    }

    const credentialSummary = toImport.map((cred) => ({
      provider: cred.provider,
      service: cred.service,
      account: cred.account,
      hasToken: Boolean(cred.token),
    }));

    const importedProviders = toImport.map((c) => c.provider);
    const uniqueProviders = [...new Set(importedProviders)];

    console.log(
      "[Zed Import] Discovered %d credentials, confirmed %d, saved %d for %d providers",
      allCredentials.length,
      toImport.length,
      savedCount,
      uniqueProviders.length
    );

    return NextResponse.json({
      success: true,
      count: savedCount,
      providers: uniqueProviders,
      credentials: credentialSummary,
      zedInstalled: true,
    });
  } catch (error: any) {
    console.error("[Zed Import] Error importing credentials:", error);

    if (error?.message?.includes("User canceled") || error?.message?.includes("denied")) {
      return NextResponse.json(
        {
          success: false,
          error: "Keychain access denied. Please grant permission when prompted by your OS.",
        },
        { status: 403 }
      );
    }

    if (error?.message?.includes("not found") || error?.message?.includes("ENOENT")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Keychain service not available on this system. On Linux, install libsecret-1-dev.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to import credentials",
      },
      { status: 500 }
    );
  }
}
