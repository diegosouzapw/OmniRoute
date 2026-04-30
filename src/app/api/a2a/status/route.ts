import { NextResponse } from "next/server";
import { getTaskManager } from "@/lib/a2a/taskManager";
import { getSettings } from "@/lib/db/settings";

export async function GET() {
  try {
    const [settings, stats] = await Promise.all([
      getSettings(),
      Promise.resolve(getTaskManager().getStats()),
    ]);
    const enabled = settings.a2aEnabled === true;

    let agentCard: any = null;
    if (enabled) {
      try {
        const agentModule = await import("@/app/.well-known/agent.json/route");
        const cardResponse = await agentModule.GET();
        agentCard = await cardResponse.json();
      } catch {
        agentCard = null;
      }
    }

    return NextResponse.json({
      status: enabled ? "ok" : "disabled",
      online: enabled,
      enabled,
      tasks: stats,
      agent: agentCard
        ? {
            name: agentCard.name,
            description: agentCard.description,
            version: agentCard.version,
            url: agentCard.url,
          }
        : null,
      capabilities: agentCard?.capabilities || null,
      skills: Array.isArray(agentCard?.skills) ? agentCard.skills : [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load A2A status";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
