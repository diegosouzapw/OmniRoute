import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getSession,
  harvestSession,
  listSessions,
  markViewerActive,
  startSession,
  stopSession,
  type VncSession,
} from "@/lib/vncSession/service";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

function publicSession(session: VncSession | undefined | null) {
  if (!session) return null;
  return {
    sessionId: session.sessionId,
    connectionId: session.connectionId,
    providerId: session.providerId,
    url: session.url,
    status: session.status,
    startedAt: session.startedAt,
    lastViewerAt: session.lastViewerAt,
    lastHarvestAt: session.lastHarvestAt,
    viewer:
      session.vncPort > 0
        ? {
            localUrl: `http://127.0.0.1:${session.vncPort}/`,
            loopbackOnly: true,
          }
        : null,
  };
}

function errorResponse(status: number, error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  return NextResponse.json(buildErrorBody(status, sanitizeErrorMessage(raw)), { status });
}

/**
 * Connection-scoped browser-login control.
 *
 * GET    /api/vnc-session/:connectionId                 list sessions for connection
 * GET    /api/vnc-session/:connectionId/:sessionId      session state
 * POST   /api/vnc-session/:connectionId/start           start a browser session
 * POST   /api/vnc-session/:connectionId/:sessionId/harvest
 * POST   /api/vnc-session/:connectionId/:sessionId/touch
 * DELETE /api/vnc-session/:connectionId/:sessionId      stop and remove session
 *
 * noVNC and CDP are published on random 127.0.0.1-only host ports. Until an
 * authenticated same-origin websocket proxy is added, remote operators must use
 * an SSH tunnel to the returned viewer.localUrl port.
 */
export async function GET(request: Request, { params }: { params: Promise<{ params: string[] }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { params: segments } = await params;
  const connectionId = segments?.[0];
  const sessionId = segments?.[1];
  if (!connectionId) return errorResponse(400, "connectionId is required");

  if (!sessionId) {
    return NextResponse.json({ sessions: listSessions(connectionId).map(publicSession) });
  }

  const session = getSession(connectionId, sessionId);
  if (!session) return errorResponse(404, "Browser-login session not found");
  return NextResponse.json({ session: publicSession(session) });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { params: segments } = await params;
  const connectionId = segments?.[0];
  const second = segments?.[1];
  const action = segments?.[2];
  if (!connectionId) return errorResponse(400, "connectionId is required");

  try {
    if (second === "start" && !action) {
      const session = await startSession(connectionId);
      return NextResponse.json({
        session: publicSession(session),
        note:
          "The viewer is loopback-only. Open it on the OmniRoute host or forward its port over SSH, then harvest the session.",
      });
    }

    if (!second || !action) return errorResponse(400, "sessionId and action are required");

    if (action === "harvest") {
      const result = await harvestSession(connectionId, second);
      return NextResponse.json({
        ...result,
        validation: result.validation
          ? {
              ...result.validation,
              error: result.validation.error
                ? sanitizeErrorMessage(result.validation.error)
                : null,
            }
          : null,
      });
    }
    if (action === "touch") {
      if (!getSession(connectionId, second)) {
        return errorResponse(404, "Browser-login session not found");
      }
      markViewerActive(connectionId, second);
      return NextResponse.json({ ok: true, sessionId: second, connectionId });
    }

    return errorResponse(400, `Unknown browser-login action: ${action}`);
  } catch (error) {
    return errorResponse(500, error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { params: segments } = await params;
  const connectionId = segments?.[0];
  const sessionId = segments?.[1];
  if (!connectionId || !sessionId) {
    return errorResponse(400, "connectionId and sessionId are required");
  }

  try {
    await stopSession(connectionId, sessionId);
    return NextResponse.json({ stopped: true, connectionId, sessionId });
  } catch (error) {
    return errorResponse(500, error);
  }
}

export const runtime = "nodejs";
