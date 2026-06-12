import { NextResponse } from "next/server";
import { getProviderConnections } from "@/models";
import {
  AI_PROVIDERS,
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  LOCAL_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  IDE_PROVIDER_IDS,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import { testSingleConnection } from "../[id]/test/route";
import { providersBatchTestSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// Determine auth type group for a provider id
function getAuthGroup(providerId) {
  if (NOAUTH_PROVIDERS[providerId]) return "no-auth";
  if (OAUTH_PROVIDERS[providerId]) return "oauth";
  if (WEB_COOKIE_PROVIDERS[providerId]) return "web-cookie";
  if (SEARCH_PROVIDERS[providerId]) return "search";
  if (AUDIO_ONLY_PROVIDERS[providerId]) return "audio";
  if (LOCAL_PROVIDERS[providerId]) return "local";
  if (UPSTREAM_PROXY_PROVIDERS[providerId]) return "upstream-proxy";
  if (CLOUD_AGENT_PROVIDERS[providerId]) return "cloud-agent";
  if (APIKEY_PROVIDERS[providerId]) return "apikey";
  if (
    typeof providerId === "string" &&
    (providerId.startsWith(OPENAI_COMPATIBLE_PREFIX) ||
      providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
  )
    return "compatible";
  return "unknown";
}

function providerHasFreeTier(providerId) {
  return AI_PROVIDERS[providerId]?.hasFree === true;
}

function isCompatibleProvider(providerId) {
  return (
    typeof providerId === "string" &&
    (providerId.startsWith(OPENAI_COMPATIBLE_PREFIX) ||
      providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
  );
}

// POST /api/providers/test-batch - Test multiple connections by group
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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
    const validation = validateBody(providersBatchTestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { mode, providerId, connectionIds } = validation.data;

    // Fetch connections to test. mode=selected targets explicit IDs and must
    // also reach inactive connections (matching single-connection retest);
    // every other mode tests active connections only.
    const allConnections =
      mode === "selected"
        ? await getProviderConnections()
        : await getProviderConnections({ isActive: true });

    // Filter based on mode
    let connectionsToTest = [];
    if (mode === "selected") {
      const idSet = new Set(connectionIds || []);
      connectionsToTest = allConnections.filter((c) => idSet.has(c.id));
    } else if (mode === "provider" && providerId) {
      connectionsToTest = allConnections.filter((c) => c.provider === providerId);
    } else if (mode === "oauth") {
      connectionsToTest = allConnections.filter((c) => {
        const authGroup = getAuthGroup(c.provider);
        return authGroup === "oauth";
      });
    } else if (mode === "free") {
      connectionsToTest = allConnections.filter((c) => providerHasFreeTier(c.provider));
    } else if (mode === "no-auth") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "no-auth");
    } else if (mode === "apikey") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "apikey");
    } else if (mode === "web-cookie") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "web-cookie");
    } else if (mode === "search") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "search");
    } else if (mode === "audio") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "audio");
    } else if (mode === "local") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "local");
    } else if (mode === "upstream-proxy") {
      connectionsToTest = allConnections.filter(
        (c) => getAuthGroup(c.provider) === "upstream-proxy"
      );
    } else if (mode === "cloud-agent") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "cloud-agent");
    } else if (mode === "ide") {
      connectionsToTest = allConnections.filter((c) => IDE_PROVIDER_IDS.has(c.provider));
    } else if (mode === "compatible") {
      connectionsToTest = allConnections.filter((c) => isCompatibleProvider(c.provider));
    } else if (mode === "all") {
      connectionsToTest = allConnections;
    } else {
      return NextResponse.json(
        {
          error:
            "Invalid mode. Use: provider, oauth, free, no-auth, apikey, compatible, all, web-cookie, search, audio, local, upstream-proxy, cloud-agent, ide, selected",
        },
        { status: 400 }
      );
    }

    if (connectionsToTest.length === 0) {
      // Include a summary so consumers gated on `summary` still get feedback
      // (e.g. mode=selected where the chosen ids were deleted before testing).
      return NextResponse.json({
        mode,
        providerId: providerId || null,
        results: [],
        testedAt: new Date().toISOString(),
        summary: { total: 0, passed: 0, failed: 0 },
      });
    }

    // Test each connection with timeout and concurrency limits (prevents server crash on large groups)
    const PER_CONNECTION_TIMEOUT = 30_000; // 30s per connection
    const CONCURRENCY = 5; // max parallel tests

    const testOne = async (conn: Record<string, unknown>) => {
      try {
        const result = await Promise.race([
          testSingleConnection(conn.id),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Connection test timed out after 30s")),
              PER_CONNECTION_TIMEOUT
            )
          ),
        ]);
        const data = result as {
          valid: boolean;
          latencyMs?: number;
          error?: string | null;
          diagnosis?: unknown;
          statusCode?: number | null;
          testedAt?: string;
        };
        return {
          provider: conn.provider,
          connectionId: conn.id,
          connectionName: conn.name || conn.email || conn.provider,
          authType: conn.authType || getAuthGroup(conn.provider),
          valid: data.valid,
          latencyMs: data.latencyMs || 0,
          error: data.error || null,
          diagnosis: data.diagnosis || null,
          statusCode: data.statusCode || null,
          testedAt: data.testedAt || new Date().toISOString(),
        };
      } catch (error) {
        return {
          provider: conn.provider,
          connectionId: conn.id,
          connectionName: conn.name || conn.email || conn.provider,
          authType: conn.authType || getAuthGroup(conn.provider),
          valid: false,
          latencyMs: 0,
          error: error.message,
          diagnosis: { type: "network_error", source: "local", code: null, message: error.message },
          statusCode: null,
          testedAt: new Date().toISOString(),
        };
      }
    };

    // Execute with concurrency limit
    const results = [];
    for (let i = 0; i < connectionsToTest.length; i += CONCURRENCY) {
      const batch = connectionsToTest.slice(i, i + CONCURRENCY);
      const batchResults = await Promise.allSettled(batch.map(testOne));
      for (const r of batchResults) {
        results.push(
          r.status === "fulfilled"
            ? r.value
            : {
                provider: "unknown",
                connectionId: "unknown",
                connectionName: "unknown",
                authType: "unknown",
                valid: false,
                latencyMs: 0,
                error: r.reason?.message || "Test failed",
                diagnosis: {
                  type: "network_error",
                  source: "local",
                  code: null,
                  message: r.reason?.message || "Test failed",
                },
                statusCode: null,
                testedAt: new Date().toISOString(),
              }
        );
      }
    }

    return NextResponse.json({
      mode,
      providerId: providerId || null,
      results,
      testedAt: new Date().toISOString(),
      summary: {
        total: results.length,
        passed: results.filter((r) => r.valid).length,
        failed: results.filter((r) => !r.valid).length,
      },
    });
  } catch (error) {
    console.log("Error in batch test:", error);
    return NextResponse.json({ error: "Batch test failed" }, { status: 500 });
  }
}
