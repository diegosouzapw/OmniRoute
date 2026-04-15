import { buildConfigSyncEnvelope } from "@/lib/sync/bundle";
import { getSyncTokenFromRequest, markSyncTokenUsed, validateSyncToken } from "@/lib/sync/tokens";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";

function matchesEtag(request: Request, version: string) {
  const ifNoneMatch = request.headers.get("if-none-match");
  if (!ifNoneMatch) return false;
  const candidates = ifNoneMatch
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return candidates.some((candidate) => candidate === version || candidate === `"${version}"`);
}

function responseHeaders(version: string) {
  return {
    etag: `"${version}"`,
    "x-config-version": version,
    "cache-control": "private, no-store",
  };
}

export async function GET(request: Request) {
  try {
    const rawToken = getSyncTokenFromRequest(request);
    const syncToken = await validateSyncToken(rawToken);
    if (!syncToken) {
      return createErrorResponse({
        status: 401,
        message: "Invalid sync token",
      });
    }

    const { version, bundle } = await buildConfigSyncEnvelope();
    await markSyncTokenUsed(syncToken);

    if (matchesEtag(request, version)) {
      return new Response(null, {
        status: 304,
        headers: responseHeaders(version),
      });
    }

    return Response.json(
      {
        version,
        bundle,
      },
      {
        headers: responseHeaders(version),
      }
    );
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to build sync bundle");
  }
}
