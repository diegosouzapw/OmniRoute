/**
 * API: Proxy Fallback Test
 * POST /api/proxy-fallback/test
 *
 * Bulk-test proxy candidates against a target provider URL.
 * Returns which proxies can reach the target and their latency.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isPrivateHost, arePrivateProviderUrlsAllowed } from "@/shared/network/outboundUrlGuard";
import {
  testProxiesAgainstTarget,
  getProxyCandidates,
} from "@omniroute/open-sse/utils/proxyFallback";

const testSchema = z.object({
  targetUrl: z.string().url("Invalid target URL"),
  proxyUrls: z.array(z.string()).optional(),
});

/**
 * SSRF guard: this route fetches a caller-supplied targetUrl through
 * caller-supplied proxies. Even behind management auth, never let it probe
 * private / link-local / cloud-metadata hosts (169.254.x, 127/8, 10/8,
 * 192.168/16, 172.16/12, ::1, fc00::/7, .internal, …) unless the operator has
 * explicitly opted in via OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS.
 */
function blockedPrivateUrl(rawUrl: string): boolean {
  if (arePrivateProviderUrlsAllowed()) return false;
  try {
    return isPrivateHost(new URL(rawUrl).hostname);
  } catch {
    // Unparseable URL → treat as blocked (fail closed).
    return true;
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(testSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { targetUrl, proxyUrls: providedUrls } = validation.data;

    // SSRF guard: refuse private/link-local/metadata targets and proxies.
    if (blockedPrivateUrl(targetUrl)) {
      return NextResponse.json(
        { error: "Blocked private or local target URL" },
        { status: 400 }
      );
    }
    if (providedUrls && providedUrls.some((u) => blockedPrivateUrl(u))) {
      return NextResponse.json(
        { error: "Blocked private or local proxy URL" },
        { status: 400 }
      );
    }

    // Auto-collect candidates if no proxyUrls provided
    const proxyUrls =
      providedUrls && providedUrls.length > 0
        ? providedUrls
        : await getProxyCandidates(targetUrl);

    if (proxyUrls.length === 0) {
      return NextResponse.json(
        {
          results: [],
          message: "No proxy candidates available to test. Configure a proxy first.",
        },
        { status: 200 }
      );
    }

    const results = await testProxiesAgainstTarget(targetUrl, proxyUrls);

    const summary = {
      total: results.length,
      working: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
    };

    return NextResponse.json({ results, summary });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to test proxy fallback";
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || message },
      { status: 500 }
    );
  }
}
