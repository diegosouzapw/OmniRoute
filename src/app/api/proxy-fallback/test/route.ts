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
import {
  testProxiesAgainstTarget,
  getProxyCandidates,
} from "@omniroute/open-sse/utils/proxyFallback";

const testSchema = z.object({
  targetUrl: z.string().url("Invalid target URL"),
  proxyUrls: z.array(z.string()).optional(),
});

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
