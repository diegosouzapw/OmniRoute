/**
 * API Route: /api/acp/agents
 *
 * Returns the list of detected CLI agents and their availability status.
 * Used by the dashboard to show ACP transport options.
 */

import { NextResponse } from "next/server";
import { detectInstalledAgents } from "@/lib/acp";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const agents = detectInstalledAgents();
    return NextResponse.json({
      agents: agents.map((a) => ({
        id: a.id,
        name: a.name,
        binary: a.binary,
        version: a.version,
        installed: a.installed,
        providerAlias: a.providerAlias,
        protocol: a.protocol,
      })),
      available: agents.filter((a) => a.installed).length,
      total: agents.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to detect agents" },
      { status: 500 }
    );
  }
}
