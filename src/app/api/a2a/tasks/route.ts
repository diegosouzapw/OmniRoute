import { NextResponse } from "next/server";
import { z } from "zod";

import { getTaskManager, type TaskState } from "@/lib/a2a/taskManager";
import { createConductorTask } from "@/lib/conductor/hubProxy";
import { getSettings } from "@/lib/db/settings";

const VALID_TASK_STATES = new Set<TaskState>([
  "submitted",
  "working",
  "completed",
  "failed",
  "cancelled",
]);

function parseIntParam(value: string | null, fallback: number): number {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stateParam = searchParams.get("state");
    const skill = searchParams.get("skill") || undefined;
    const limit = Math.max(1, Math.min(200, parseIntParam(searchParams.get("limit"), 50)));
    const offset = Math.max(0, parseIntParam(searchParams.get("offset"), 0));

    const state =
      typeof stateParam === "string" && VALID_TASK_STATES.has(stateParam as TaskState)
        ? (stateParam as TaskState)
        : undefined;

    const tm = getTaskManager();
    const total = tm.countTasks({ state, skill });
    const tasks = tm.listTasks({ state, skill, limit, offset });

    return NextResponse.json({
      tasks,
      total,
      limit,
      offset,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list A2A tasks";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ============ POST — delegação de entrada à frota do Conductor (PRD Conductor RF5) ============

const delegationSchema = z.object({
  skill: z.string().default("conductor"),
  messages: z.array(z.object({ role: z.string(), content: z.string() })).min(1),
  metadata: z
    .object({
      conductor: z
        .object({
          repo: z.object({ url: z.string().min(1), base_ref: z.string().optional() }).optional(),
          mode: z.string().optional(),
          cli: z.string().optional(),
          model: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

/** Mesma semântica de auth do JSON-RPC A2A (src/app/a2a/route.ts): Bearer vs OMNIROUTE_API_KEY; aberto se não configurada. */
function authenticateA2A(request: Request): boolean {
  const configuredKey = process.env.OMNIROUTE_API_KEY;
  if (!configuredKey) return true;
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return token === configuredKey;
}

/**
 * Traduz uma task A2A externa em `POST /v1/tasks` do hub do OmniConductor.
 * Só skills da frota (`conductor` / `conductor-cli-<profile>` — as anunciadas no
 * Agent Card) são delegáveis; os estados voltam pelo espelho SSE→A2A (RF1).
 */
export async function POST(request: Request) {
  if (!authenticateA2A(request)) {
    return NextResponse.json({ error: "Unauthorized: missing or invalid API key" }, { status: 401 });
  }
  const settings = await getSettings();
  if (settings.a2aEnabled !== true) {
    return NextResponse.json(
      { error: "A2A endpoint is disabled. Enable it from the Endpoints page." },
      { status: 503 }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = delegationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid A2A task: provide messages[] (and metadata.conductor)" }, { status: 400 });
  }
  const { skill, messages, metadata } = parsed.data;
  if (skill !== "conductor" && !skill.startsWith("conductor-cli-")) {
    return NextResponse.json(
      { error: "Only Conductor fleet skills are delegable here (conductor / conductor-cli-<profile>)" },
      { status: 400 }
    );
  }
  const conductor = metadata?.conductor;
  if (!conductor?.repo?.url) {
    return NextResponse.json(
      { error: "Delegation requires metadata.conductor.repo.url (the fleet works on git repos)" },
      { status: 400 }
    );
  }
  const prompt = [...messages].reverse().find((m) => m.role === "user")?.content ?? messages[messages.length - 1].content;

  const created = await createConductorTask({
    repoUrl: conductor.repo.url,
    baseRef: conductor.repo.base_ref,
    prompt,
    mode: conductor.mode,
    cli: skill.startsWith("conductor-cli-") ? skill.slice("conductor-cli-".length) : conductor.cli,
    model: conductor.model,
  });
  if (!created.ok) {
    return NextResponse.json(
      { error: `Conductor hub refused the delegation (HTTP ${created.status})` },
      { status: created.status }
    );
  }
  return NextResponse.json(
    {
      conductor_task_id: created.task_id,
      state: "submitted",
      note: "States flow back through the SSE→A2A mirror (GET /api/a2a/tasks, skill=conductor).",
    },
    { status: 201 }
  );
}
