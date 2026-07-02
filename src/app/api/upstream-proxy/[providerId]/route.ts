import { NextResponse } from "next/server";
import {
  getUpstreamProxyConfig,
  upsertUpstreamProxyConfig,
  deleteUpstreamProxyConfig,
} from "@/lib/db/upstreamProxy";

import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const upstreamProxySchema = z.object({
  mode: z.enum(["native", "cliproxyapi", "fallback"]).default("native"),
  enabled: z.boolean().optional().default(true),
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
    return NextResponse.json({ enabled: false, mode: "native" });
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

  const { mode, enabled } = validation.data;

  const config = await upsertUpstreamProxyConfig({
    providerId,
    mode,
    enabled,
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
