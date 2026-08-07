import { NextResponse } from "next/server";
import {
  getUpstreamProxyConfig,
  upsertUpstreamProxyConfig,
  deleteUpstreamProxyConfig,
} from "@/lib/db/upstreamProxy";
import { isClaudeCodeCompatibleProvider } from "@/shared/constants/providers";

import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

/**
 * The upstream `dario` project can itself proxy other subscription-based
 * providers (OpenAI, Grok) — but OmniRoute's integration only wires up
 * Claude Pro/Max OAuth account management (login-start/login-complete/
 * accounts) and DarioExecutor only implements Claude Code's exact wire
 * shape, added specifically so Claude Code traffic stays undetectable as
 * Anthropic's wire format drifts. Routing a non-Claude provider's requests
 * through it here would hit account/shape handling that was never built for
 * that provider and break. Mirrors the scope CLIProxyAPI's own
 * "claude-native" deep mode already uses. Revisit if account management for
 * another provider gets added to this integration.
 */
function isDarioEligibleProvider(providerId: string): boolean {
  return providerId === "claude" || isClaudeCodeCompatibleProvider(providerId);
}

const upstreamProxySchema = z.object({
  // "dario" (#dario) is a new direct-passthrough mode alongside "cliproxyapi".
  mode: z.enum(["native", "cliproxyapi", "dario", "fallback"]).default("native"),
  enabled: z.boolean().optional().default(true),
  // Retry-leg backend for mode="fallback"; defaults to "cliproxyapi" so any
  // existing fallback config is unchanged when the field is omitted.
  fallbackBackend: z.enum(["cliproxyapi", "dario"]).optional(),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ providerId: string }> }
) {
  const { providerId } = await params;
  if (!providerId) {
    return NextResponse.json({ error: "providerId required" }, { status: 400 });
  }
  const config = await getUpstreamProxyConfig(providerId);
  if (!config) {
    return NextResponse.json({ enabled: false, mode: "native", fallbackBackend: "cliproxyapi" });
  }
  return NextResponse.json(config);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ providerId: string }> }
) {
  const { providerId } = await params;
  if (!providerId) {
    return NextResponse.json({ error: "providerId required" }, { status: 400 });
  }

  const rawBody = await request.json();
  const validation = validateBody(upstreamProxySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { mode, enabled, fallbackBackend } = validation.data;

  const wantsDario = mode === "dario" || (mode === "fallback" && fallbackBackend === "dario");
  if (wantsDario && !isDarioEligibleProvider(providerId)) {
    return NextResponse.json(
      {
        error:
          `Dario only proxies Claude-Code-shaped traffic (it authenticates via a Claude ` +
          `Pro/Max subscription, not a per-provider credential) — "${providerId}" can't be ` +
          `routed through it.`,
      },
      { status: 400 }
    );
  }

  const config = await upsertUpstreamProxyConfig({
    providerId,
    mode,
    enabled,
    ...(fallbackBackend !== undefined ? { fallbackBackend } : {}),
  });

  return NextResponse.json(config);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ providerId: string }> }
) {
  const { providerId } = await params;
  if (!providerId) {
    return NextResponse.json({ error: "providerId required" }, { status: 400 });
  }
  const deleted = await deleteUpstreamProxyConfig(providerId);
  return NextResponse.json({ deleted });
}
