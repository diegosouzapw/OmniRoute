import { NextResponse } from "next/server";
import { z } from "zod";
import {
  type CliAgentInfo,
  detectInstalledAgents,
  refreshAgentCache,
  resolveVersionProbe,
  setCustomAgents,
  type CustomAgentDef,
} from "@/lib/acp/registry";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthenticated } from "@/shared/utils/apiAuth";

const customAgentBodySchema = z.object({
  action: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  binary: z.string().optional(),
  versionCommand: z.string().optional(),
  providerAlias: z.string().optional(),
  spawnArgs: z.array(z.string()).optional(),
  protocol: z.enum(["stdio", "http"]).optional(),
});

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Load custom agents from settings on each GET to stay in sync
    const settings = await getSettings();
    if (settings.customAgents) {
      setCustomAgents(settings.customAgents as CustomAgentDef[]);
    }

    const agents = detectInstalledAgents();
    const installed = agents.filter((a: CliAgentInfo) => a.installed).length;
    const total = agents.length;

    return NextResponse.json({
      agents,
      summary: {
        total,
        installed,
        notFound: total - installed,
        builtIn: agents.filter((a: CliAgentInfo) => !a.isCustom).length,
        custom: agents.filter((a: CliAgentInfo) => a.isCustom).length,
      },
    });
  } catch (error) {
    console.error("Error detecting agents:", error);
    return NextResponse.json({ error: "Failed to detect agents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(customAgentBodySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const body = validation.data;

    if (body.action === "refresh") {
      const agents = refreshAgentCache();
      return NextResponse.json({ agents, refreshed: true });
    }

    // Add custom agent
    const { id, name, binary, versionCommand, providerAlias, spawnArgs, protocol } = body;
    if (!id || !name || !binary || !versionCommand) {
      return NextResponse.json(
        { error: "Missing required fields: id, name, binary, versionCommand" },
        { status: 400 }
      );
    }

    const newAgent: CustomAgentDef = {
      id: id.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      name,
      binary,
      versionCommand,
      providerAlias: providerAlias || id,
      spawnArgs: spawnArgs || [],
      protocol: protocol || "stdio",
    };

    if (!resolveVersionProbe(newAgent.binary, newAgent.versionCommand, true)) {
      return NextResponse.json(
        { error: "Invalid versionCommand: use the configured binary with plain arguments only" },
        { status: 400 }
      );
    }

    // Load current, append, save
    const settings = await getSettings();
    const current: CustomAgentDef[] = (settings.customAgents as CustomAgentDef[]) || [];

    // Avoid duplicates
    if (current.some((a) => a.id === newAgent.id)) {
      return NextResponse.json(
        { error: `Agent with id '${newAgent.id}' already exists` },
        { status: 409 }
      );
    }

    const updated = [...current, newAgent];
    await updateSettings({ customAgents: updated });
    setCustomAgents(updated);

    // Refresh cache to detect the new agent
    const agents = refreshAgentCache();
    return NextResponse.json({ agents, added: newAgent });
  } catch (error) {
    console.error("Error adding custom agent:", error);
    return NextResponse.json({ error: "Failed to add agent" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("id");

    if (!agentId) {
      return NextResponse.json({ error: "Missing agent id" }, { status: 400 });
    }

    const settings = await getSettings();
    const current: CustomAgentDef[] = (settings.customAgents as CustomAgentDef[]) || [];
    const updated = current.filter((a) => a.id !== agentId);

    if (updated.length === current.length) {
      return NextResponse.json(
        { error: `Agent '${agentId}' not found in custom agents` },
        { status: 404 }
      );
    }

    await updateSettings({ customAgents: updated });
    setCustomAgents(updated);
    const agents = refreshAgentCache();

    return NextResponse.json({ agents, removed: agentId });
  } catch (error) {
    console.error("Error removing custom agent:", error);
    return NextResponse.json({ error: "Failed to remove agent" }, { status: 500 });
  }
}
