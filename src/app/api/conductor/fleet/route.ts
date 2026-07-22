/**
 * GET /api/conductor/fleet — fleet snapshot for the Conductor dashboard panel
 * (PRD Conductor RF3). Server-side proxy: the hub token lives only in env; the
 * response is the whitelisted shape from hubProxy (degraded {offline:true} when
 * the hub is unset/offline — never a 5xx for that).
 */

import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getFleetSnapshot } from "@/lib/conductor/hubProxy";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return NextResponse.json(await getFleetSnapshot());
}
