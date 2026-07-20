import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getSession,
  startSession,
  stopSession,
  harvestSession,
  markViewerActive,
} from "@/lib/vncSession/service";
import { getVncProvider } from "@/lib/vncSession/manifest";

/**
 * Per-provider VNC login session control.
 *
 *   GET    /api/vnc-session/:provider          → current session state (or null)
 *   POST   /api/vnc-session/:provider/start    → start the browser container
 *   POST   /api/vnc-session/:provider/harvest  → read cookies → provider_connections
 *   POST   /api/vnc-session/:provider/touch    → mark viewer active (defer idle stop)
 *   DELETE /api/vnc-session/:provider          → stop + remove the container
 *
 * All actions are management-scoped. Starting a session boots a containerized
 * browser exposing a noVNC web UI at the returned `vncUrl`; the operator logs in
 * there, then calls `harvest` to persist the resulting credentials.
 */

function stripInternal<T extends { containerName?: string }>(s: T | undefined | null) {
  if (!s) return null;
  const { containerName, ...rest } = s;
  return rest;
}

export async function GET(request: Request, { params }: { params: Promise<{ params: string[] }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { params: seg } = await params;
  const providerId = seg?.[0];
  if (!providerId || !getVncProvider(providerId)) {
    return NextResponse.json({ error: `unknown vnc provider: ${providerId}` }, { status: 404 });
  }
  return NextResponse.json({ session: stripInternal(getSession(providerId)) });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { params: seg } = await params;
  const providerId = seg?.[0];
  const action = seg?.[1] ?? "start";
  if (!providerId || !getVncProvider(providerId)) {
    return NextResponse.json({ error: `unknown vnc provider: ${providerId}` }, { status: 404 });
  }

  try {
    switch (action) {
      case "start": {
        const s = await startSession(providerId);
        return NextResponse.json({
          session: stripInternal(s),
          vncUrl: `http://localhost:${s.vncPort}/`,
          note: "Open vncUrl, log in to the provider, then POST .../harvest to persist credentials.",
        });
      }
      case "harvest": {
        const r = await harvestSession(providerId);
        return NextResponse.json({ harvested: r.ok, credential: r.credential });
      }
      case "touch": {
        markViewerActive(providerId);
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json({ error: `unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { params: seg } = await params;
  const providerId = seg?.[0];
  if (!providerId || !getVncProvider(providerId)) {
    return NextResponse.json({ error: `unknown vnc provider: ${providerId}` }, { status: 404 });
  }
  try {
    await stopSession(providerId);
    return NextResponse.json({ stopped: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
