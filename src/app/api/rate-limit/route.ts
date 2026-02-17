import { NextResponse } from "next/server";

/**
 * @deprecated Use /api/rate-limits instead.
 * This route redirects to the consolidated rate-limits endpoint.
 */

export async function GET(request) {
  const url = new URL(request.url);
  url.pathname = "/api/rate-limits";
  return NextResponse.redirect(url, 308);
}

export async function POST(request) {
  const url = new URL(request.url);
  url.pathname = "/api/rate-limits";
  return NextResponse.redirect(url, 308);
}
