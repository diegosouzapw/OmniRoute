/**
 * API endpoint for importing Zed IDE OAuth credentials
 *
 * POST /api/providers/zed/import
 *
 * Discovers and imports OAuth credentials from Zed IDE's keychain storage.
 * Supports all major Zed providers: OpenAI, Anthropic, Google, Mistral, xAI, etc.
 *
 * Security: protected by requireManagementAuth.
 */

import { NextResponse } from "next/server";
import { discoverZedCredentials, isZedInstalled } from "@/lib/zed-oauth/keychain-reader";
import { partitionZedCredentials } from "@/lib/zed-oauth/importUtils";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createProviderConnection } from "@/lib/db/providers";

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
}

export async function POST(request: Request): Promise<NextResponse<ImportResponse> | Response> {
  // Security verification
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    // Check if Zed is installed
    const zedInstalled = await isZedInstalled();

    if (!zedInstalled) {
      return NextResponse.json(
        {
          success: false,
          error: "Zed IDE does not appear to be installed on this system.",
          zedInstalled: false,
        },
        { status: 404 }
      );
    }

    // Discover credentials from keychain
    console.log("[Zed Import] Discovering Zed credentials from keychain...");
    const credentials = await discoverZedCredentials();
    const { importable, skipped, duplicatesDropped } = partitionZedCredentials(credentials);

    if (importable.length === 0) {
      if (credentials.length > 0) {
        console.warn(
          `[Zed Import] Found ${credentials.length} keychain credential(s), but none mapped to supported OmniRoute providers`
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

    // Save to database using OmniRoute's provider schema
    let savedCount = 0;
    for (const cred of importable) {
      try {
        await createProviderConnection({
          provider: cred.provider,
          authType: "apikey",
          apiKey: cred.token,
          name: `Zed Import (${cred.account || cred.service})`,
          isActive: true,
        });
        savedCount++;
      } catch (err) {
        console.error(`[Zed Import] Failed to save credential for ${cred.provider}:`, err);
      }
    }

    if (skipped.length > 0 || duplicatesDropped > 0) {
      console.log(
        `[Zed Import] Skipped ${skipped.length} unsupported credential(s) and dropped ${duplicatesDropped} duplicate credential(s)`
      );
    }

    const credentialSummary = importable.map((cred) => ({
      provider: cred.provider,
      service: cred.service,
      account: cred.account,
      hasToken: Boolean(cred.token),
    }));

    const importedProviders = importable.map((c) => c.provider);
    const uniqueProviders = [...new Set(importedProviders)];

    console.log(
      `[Zed Import] Discovered ${credentials.length} credentials, imported ${importable.length} supported credential(s), and successfully saved ${savedCount} for ${uniqueProviders.length} providers`
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
        error: `Failed to import credentials: ${error?.message || "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
