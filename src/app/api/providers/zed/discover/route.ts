/**
 * API endpoint for the first leg of the 2-step Zed credential import flow.
 *
 * POST /api/providers/zed/discover
 *
 * Reads the Zed IDE keychain and returns the candidate list as
 * `{ provider, service, account, fingerprint }`. The raw token is never sent
 * to the client. The dashboard renders the list, the user picks which
 * credentials to import, and the second leg (`/import`) is called with the
 * chosen fingerprints. The server re-reads the keychain there and filters by
 * fingerprint, so a tampered discover response cannot trick `/import` into
 * saving an unrelated token.
 *
 * Security: protected by requireManagementAuth. The route never returns the
 * raw token, only a 16-char fingerprint of `sha256(service|account|token)`.
 */

import { NextResponse } from "next/server";
import { discoverZedCredentials, isZedInstalled } from "@/lib/zed-oauth/keychain-reader";
import { partitionZedCredentials } from "@/lib/zed-oauth/importUtils";
import { fingerprintZedCredential } from "@/lib/zed-oauth/credentialFingerprint";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isRunningInDocker } from "@/lib/zed-oauth/dockerDetect";

interface DiscoverCandidate {
  provider: string;
  service: string;
  account: string;
  fingerprint: string;
}

interface DiscoverResponse {
  success: boolean;
  zedInstalled?: boolean;
  zedDockerEnvironment?: boolean;
  count?: number;
  candidates?: DiscoverCandidate[];
  skipped?: Array<{ provider: string; service: string; account: string; reason: string }>;
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<DiscoverResponse> | Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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

    const credentials = await discoverZedCredentials();
    const { importable, skipped } = partitionZedCredentials(credentials);

    const candidates: DiscoverCandidate[] = importable.map((cred) => ({
      provider: cred.provider,
      service: cred.service,
      account: cred.account,
      fingerprint: fingerprintZedCredential(cred.service, cred.account, cred.token),
    }));

    return NextResponse.json({
      success: true,
      zedInstalled: true,
      count: candidates.length,
      candidates,
      skipped: skipped.map((cred) => ({
        provider: cred.provider,
        service: cred.service,
        account: cred.account,
        reason: cred.token ? "unsupported provider" : "missing token",
      })),
    });
  } catch (error: any) {
    console.error("[Zed Discover] Error reading keychain:", error);

    if (error?.message?.includes("User canceled") || error?.message?.includes("denied")) {
      return NextResponse.json(
        {
          success: false,
          error: "Keychain access denied. Please grant permission when prompted by your OS.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to discover Zed credentials",
      },
      { status: 500 }
    );
  }
}
