import { NextResponse } from "next/server";
import { getProviderConnections } from "@/models";
import {
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  LOCAL_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import { testSingleConnection } from "../[id]/test/route";
import { providersBatchTestSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// Determine auth type group for a provider id
function getAuthGroup(providerId) {
  if (FREE_PROVIDERS[providerId]) return "free";
  if (OAUTH_PROVIDERS[providerId]) return "oauth";
  if (WEB_COOKIE_PROVIDERS[providerId]) return "web-cookie";
  if (SEARCH_PROVIDERS[providerId]) return "search";
  if (AUDIO_ONLY_PROVIDERS[providerId]) return "audio";
  if (LOCAL_PROVIDERS[providerId]) return "local";
  if (UPSTREAM_PROXY_PROVIDERS[providerId]) return "upstream-proxy";
  if (APIKEY_PROVIDERS[providerId]) return "apikey";
  if (
    typeof providerId === "string" &&
    (providerId.startsWith(OPENAI_COMPATIBLE_PREFIX) ||
      providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
  )
    return "compatible";
  return "unknown";
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
    const { mode, providerId } = validation.data;

    // Fetch all active connections
    const allConnections = await getProviderConnections({ isActive: true });

    // Filter based on mode
    let connectionsToTest = [];
    if (mode === "provider" && providerId) {
      connectionsToTest = allConnections.filter((c) => c.provider === providerId);
    } else if (mode === "oauth") {
      connectionsToTest = allConnections.filter((c) => {
        const authGroup = getAuthGroup(c.provider);
        return authGroup === "oauth" || authGroup === "free";
      });
    } else if (mode === "free") {
      connectionsToTest = allConnections.filter((c) => getAuthGroup(c.provider) === "free");
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
    } else if (mode === "compatible") {
      connectionsToTest = allConnections.filter((c) => isCompatibleProvider(c.provider));
    } else if (mode === "all") {
      connectionsToTest = allConnections;
    } else {
      return NextResponse.json(
        {
          error:
            "Invalid mode. Use: provider, oauth, free, apikey, compatible, all, web-cookie, search, audio, local, upstream-proxy",
        },
        { status: 400 }
      );
    }

    if (connectionsToTest.length === 0) {
      return NextResponse.json({
        mode,
        providerId: providerId || null,
        results: [],
        testedAt: new Date().toISOString(),
      });
    }

    // Test each connection with timeout and concurrency limits (prevents server crash on large groups)
    const PER_CONNECTION_TIMEOUT = 30_000; // 30s per connection
    const CONCURRENCY = 5; // max parallel tests

    const testOne = async (conn) => {
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
        const data = result as any;
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
