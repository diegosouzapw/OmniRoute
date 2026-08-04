import { CORS_HEADERS } from "@/shared/utils/cors";

/**
 * Catch-all fallback for /api/* — issue #6424.
 *
 * Extends the /v1/* catch-all (#6405) to the whole /api/ tree. Without this
 * route, unknown paths under /api/context/*, /api/settings/*, /api/admin/*
 * (etc.) fell through to the Next.js app-router `not-found.tsx`, which
 * returned the dashboard HTML shell (~463 KB) to CLI/SDK callers instead of a
 * JSON 404. Combined with the management-auth boundary, this made an
 * "unknown route" indistinguishable from a "wrong scope" failure.
 *
 * Static / dynamic segments under /api/ take precedence over this catch-all
 * in Next.js App Router matching, so real routes are unaffected.
 */

function notFoundResponse(request: Request): Response {
  const url = new URL(request.url);
  return Response.json(
    {
      error: {
        message: `Unknown API route: ${url.pathname}`,
        type: "not_found",
        code: "unknown_route",
        path: url.pathname,
      },
    },
    {
      status: 404,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    },
  );
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  return notFoundResponse(request);
}
export async function POST(request: Request) {
  return notFoundResponse(request);
}
export async function PUT(request: Request) {
  return notFoundResponse(request);
}
export async function PATCH(request: Request) {
  return notFoundResponse(request);
}
export async function DELETE(request: Request) {
  return notFoundResponse(request);
}
export async function HEAD(request: Request) {
  return notFoundResponse(request);
}
