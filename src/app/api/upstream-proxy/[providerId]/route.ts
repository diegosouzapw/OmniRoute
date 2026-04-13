import { NextResponse } from "next/server";
import {
  getUpstreamProxyConfig,
  upsertUpstreamProxyConfig,
  deleteUpstreamProxyConfig,
} from "@/lib/db/upstreamProxy";

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

  const body = await request.json();
  const mode = body.mode === "cliproxyapi" || body.mode === "fallback" ? body.mode : "native";
  const enabled = body.enabled !== false;

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
