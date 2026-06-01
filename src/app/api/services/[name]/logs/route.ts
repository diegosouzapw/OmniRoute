/**
 * GET /api/services/[name]/logs — SSE log tail for embedded services.
 *
 * Query params:
 *   tail   — number of historical lines to send first (default 200, max 1000)
 *   filter — optional case-insensitive substring filter (no regex — ReDoS-safe by design)
 *
 * Events:
 *   event: snapshot  — array of LogLine objects (initial tail)
 *   event: log       — single LogLine object (live)
 *   event: heartbeat — keep-alive, no meaningful data
 */

import type { NextRequest } from "next/server";
import { getSupervisor } from "@/lib/services/registry";
import { createErrorResponse } from "@/lib/api/errorResponse";
import type { LogLine } from "@/lib/services/types";

const MAX_TAIL = 1000;
const DEFAULT_TAIL = 200;
const HEARTBEAT_MS = 15_000;
const MAX_FILTER_LEN = 200;

const encoder = new TextEncoder();

function sseChunk(event: string, data: unknown): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  const supervisor = getSupervisor(name);
  if (!supervisor) {
    return createErrorResponse({ status: 404, message: `Service '${name}' not found` });
  }

  const url = new URL(request.url);
  const tailRaw = url.searchParams.get("tail");
  const filterRaw = url.searchParams.get("filter");

  const tail = Math.min(
    tailRaw ? Math.max(0, parseInt(tailRaw, 10) || DEFAULT_TAIL) : DEFAULT_TAIL,
    MAX_TAIL
  );

  if (filterRaw !== null && filterRaw.length > MAX_FILTER_LEN) {
    return createErrorResponse({ status: 400, message: "filter exceeds maximum length" });
  }

  // Substring match only — avoids ReDoS that user-supplied RegExp() would introduce.
  const filterLower = filterRaw !== null ? filterRaw.toLowerCase() : null;

  const buffer = supervisor.getRingBuffer();
  const signal = request.signal;

  const stream = new ReadableStream({
    start(controller) {
      if (signal.aborted) {
        controller.close();
        return;
      }

      const applyFilter = (line: LogLine) =>
        filterLower === null || line.line.toLowerCase().includes(filterLower);

      // Send initial snapshot
      const snapshot = buffer.snapshot().filter(applyFilter).slice(-tail);
      controller.enqueue(sseChunk("snapshot", snapshot));

      // Subscribe to live events
      const unsubscribe = buffer.subscribe((line) => {
        if (!applyFilter(line)) return;
        try {
          controller.enqueue(sseChunk("log", line));
        } catch {
          // controller closed — subscriber will be removed on abort
        }
      });

      // Heartbeat
      const heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(sseChunk("heartbeat", {}));
        } catch {
          clearInterval(heartbeatTimer);
        }
      }, HEARTBEAT_MS);

      // Cleanup on client disconnect
      signal.addEventListener("abort", () => {
        clearInterval(heartbeatTimer);
        unsubscribe();
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
