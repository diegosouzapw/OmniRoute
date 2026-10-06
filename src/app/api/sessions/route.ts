import { NextResponse } from "next/server";
import {
  getActiveSessions,
  getActiveSessionCount,
  getAllActiveSessionCountsByKey,
} from "@omniroute/open-sse/services/sessionManager.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getExclusiveLeaseConnectionIds } from "@/lib/db/apiKeys";
import { getExclusiveLeaseOccupancy } from "@/lib/db/exclusiveConnectionLeases";
import { getProviderConnectionDisplayMetadata } from "@/lib/db/providers";
import { getAccountDisplayName } from "@/lib/display/names";
import { getPendingRequests } from "@/lib/usage/usageHistory";
import {
  buildExclusiveDashboardSessions,
  type ExclusiveDashboardSession,
} from "@/lib/sessionObservability";

const EXCLUSIVE_PROJECTION_WARNING = "[SESSIONS] Exclusive session projection unavailable";
let exclusiveProjectionWarningEmitted = false;

export async function GET() {
  try {
    const sessions = getActiveSessions();
    const count = getActiveSessionCount();
    const byApiKey = getAllActiveSessionCountsByKey();
    let exclusiveSessions: ExclusiveDashboardSession[] = [];

    try {
      // Reuse the hard-lease authority added by #10362. The API-key policy derives
      // the managed candidate set; SQLite occupancy is the source of truth for
      // which of those connections are actually leased right now.
      const managedConnectionIds = Array.from(await getExclusiveLeaseConnectionIds());
      const occupancy = getExclusiveLeaseOccupancy(managedConnectionIds);
      const leasedConnectionIds = new Set(occupancy.keys());
      const connectionNames = new Map(
        getProviderConnectionDisplayMetadata([...leasedConnectionIds]).map((connection) => [
          connection.id,
          getAccountDisplayName(connection),
        ])
      );
      exclusiveSessions = buildExclusiveDashboardSessions(
        leasedConnectionIds,
        getPendingRequests().byAccount,
        sessions,
        connectionNames
      );
      exclusiveProjectionWarningEmitted = false;
    } catch {
      if (!exclusiveProjectionWarningEmitted) {
        exclusiveProjectionWarningEmitted = true;
        console.warn(EXCLUSIVE_PROJECTION_WARNING);
      }
    }

    return NextResponse.json({
      count,
      sessions,
      byApiKey,
      exclusiveSessions,
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
