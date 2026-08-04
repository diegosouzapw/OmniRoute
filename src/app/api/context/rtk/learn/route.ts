import { NextResponse } from "next/server";
import {
  suggestFilter,
  commandToId,
  listRtkCommandSamples,
} from "@omniroute/open-sse/services/compression/engines/rtk";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/** Parse a positive `limit` query param, clamped to [1, 2000]; default 500. */
function parseLimit(value: string | null): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 500;
  return Math.min(2000, Math.floor(n));
}

/**
 * GET /api/context/rtk/learn?command=<cmd> — suggest an RTK filter draft for a
 * command, learned from the captured outputs of THAT command in the opt-in raw-output
 * sample store. Read-only; returns a draft for the operator to review and save (the
 * existing filter trust path persists it). Other commands' samples are excluded so the
 * learned drop/preserve patterns stay specific.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const command = (url.searchParams.get("command") || "").trim();
  if (!command) {
    return NextResponse.json(
      { error: { message: "The 'command' query parameter is required.", type: "invalid_request" } },
      { status: 400 }
    );
  }

  const limit = parseLimit(url.searchParams.get("limit"));
  const targetId = commandToId(command);
  const matching = listRtkCommandSamples({ limit }).filter(
    (sample) => commandToId(sample.command) === targetId
  );
  const filter = suggestFilter(command, matching);

  return NextResponse.json({ command, sampleCount: matching.length, filter });
}
