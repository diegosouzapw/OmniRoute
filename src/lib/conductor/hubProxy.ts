/**
 * Server-side proxy to the OmniConductor hub (Conductor PRD RF3).
 *
 * The browser NEVER talks to the hub: these helpers run only in API routes,
 * authenticate with the server-side env token, and return WHITELISTED shapes —
 * runner/hub tokens can never leak to the client. Fail-open: hub unset/offline
 * yields a degraded snapshot ({offline: true}) instead of an error.
 */

import { z } from "zod";

// ============ Whitelisted client-facing shapes ============

export interface FleetRunner {
  id: string;
  name: string;
  clis: string[];
  online: boolean;
  draining: boolean;
}

export interface FleetTask {
  id: string;
  status: string;
  mode: string;
  repo: string | null;
  runner: string | null;
  summary: string | null;
  branch: string | null;
  error: string | null;
  updated_at: string | null;
}

export interface FleetSnapshot {
  offline: boolean;
  runners: FleetRunner[];
  tasks: FleetTask[];
}

export interface ConductorTaskDetail extends FleetTask {
  prompt: string | null;
  base_ref: string | null;
  tests: unknown;
  council: unknown;
  created_at: string | null;
}

// ============ Untrusted hub shapes (parse only what we read) ============

const hubRunnerSchema = z.object({
  id: z.string(),
  online: z.boolean().optional(),
  draining: z.boolean().optional(),
  capabilities: z.object({
    name: z.string().optional(),
    clis: z.array(z.object({ profile: z.string() })).optional(),
  }),
});

const hubTaskSchema = z.object({
  id: z.string(),
  status: z.string(),
  mode: z.string().optional(),
  repo: z.object({ url: z.string().optional(), base_ref: z.string().optional() }).nullish(),
  spec: z.object({ prompt: z.string().optional() }).nullish(),
  assigned_runner: z.string().nullish(),
  manifest: z
    .object({
      summary: z.string().nullish(),
      branch: z.string().nullish(),
      error: z.string().nullish(),
      tests: z.unknown().optional(),
    })
    .nullish(),
  council: z.unknown().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export interface HubProxyOptions {
  fetchImpl?: typeof fetch;
}

function hubConfig(): { url: string; token: string } | null {
  const url = process.env.CONDUCTOR_HUB_URL?.trim();
  if (!url) return null;
  return { url, token: process.env.CONDUCTOR_HUB_TOKEN?.trim() ?? "" };
}

async function hubGet(path: string, opts: HubProxyOptions): Promise<unknown | null> {
  const cfg = hubConfig();
  if (!cfg) return null;
  const doFetch = opts.fetchImpl ?? fetch;
  const res = await doFetch(`${cfg.url}${path}`, {
    headers: { authorization: `Bearer ${cfg.token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

function toFleetTask(t: z.infer<typeof hubTaskSchema>): FleetTask {
  return {
    id: t.id,
    status: t.status,
    mode: t.mode ?? "solo",
    repo: t.repo?.url ?? null,
    runner: t.assigned_runner ?? null,
    summary: t.manifest?.summary ?? null,
    branch: t.manifest?.branch ?? null,
    error: t.manifest?.error ?? null,
    updated_at: t.updated_at ?? null,
  };
}

/** Fleet snapshot for the dashboard panel. Degraded ({offline: true}) on any failure. */
export async function getFleetSnapshot(opts: HubProxyOptions = {}): Promise<FleetSnapshot> {
  try {
    const [rawRunners, rawTasks] = await Promise.all([
      hubGet("/v1/runners", opts),
      hubGet("/v1/tasks", opts),
    ]);
    if (rawRunners === null || rawTasks === null) return { offline: true, runners: [], tasks: [] };
    const runners = z.array(hubRunnerSchema).parse(rawRunners).map((r) => ({
      id: r.id,
      name: r.capabilities.name ?? "?",
      clis: (r.capabilities.clis ?? []).map((c) => c.profile),
      online: r.online !== false,
      draining: r.draining === true,
    }));
    const tasks = z.array(hubTaskSchema).parse(rawTasks).map(toFleetTask);
    return { offline: false, runners, tasks };
  } catch {
    return { offline: true, runners: [], tasks: [] };
  }
}

/** Full whitelisted detail of one task (manifest, prompt, council funnel data). */
export async function getConductorTaskDetail(
  taskId: string,
  opts: HubProxyOptions = {}
): Promise<ConductorTaskDetail | null> {
  try {
    const raw = await hubGet(`/v1/tasks/${encodeURIComponent(taskId)}`, opts);
    if (raw === null) return null;
    const t = hubTaskSchema.parse(raw);
    return {
      ...toFleetTask(t),
      prompt: t.spec?.prompt ?? null,
      base_ref: t.repo?.base_ref ?? null,
      tests: t.manifest?.tests ?? null,
      council: t.council ?? null,
      created_at: t.created_at ?? null,
    };
  } catch {
    return null;
  }
}

export interface DelegationInput {
  repoUrl: string;
  prompt: string;
  baseRef?: string;
  mode?: string;
  cli?: string;
  model?: string;
}

/**
 * Delegates work to the fleet: translates an external A2A task into the hub's
 * `POST /v1/tasks` (Conductor PRD RF5). Uses the orchestrator credential when
 * set (CONDUCTOR_ORCHESTRATOR_TOKEN), falling back to the hub token. States
 * flow back through the RF1 mirror — this call only creates.
 */
export async function createConductorTask(
  input: DelegationInput,
  opts: HubProxyOptions = {}
): Promise<{ ok: boolean; status: number; task_id?: string }> {
  const cfg = hubConfig();
  if (!cfg) return { ok: false, status: 503 };
  const token = process.env.CONDUCTOR_ORCHESTRATOR_TOKEN?.trim() || cfg.token;
  const body: Record<string, unknown> = {
    repo: { url: input.repoUrl, base_ref: input.baseRef?.trim() || "main" },
    spec: { prompt: input.prompt },
    mode: input.mode?.trim() || "solo",
  };
  const requirements: Record<string, string> = {};
  if (input.cli?.trim()) requirements.cli = input.cli.trim();
  if (input.model?.trim()) requirements.model = input.model.trim();
  if (Object.keys(requirements).length) body.requirements = requirements;
  try {
    const doFetch = opts.fetchImpl ?? fetch;
    const res = await doFetch(`${cfg.url}/v1/tasks`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { ok: false, status: res.status };
    const created = z.object({ id: z.string() }).parse(await res.json());
    return { ok: true, status: res.status, task_id: created.id };
  } catch {
    return { ok: false, status: 503 };
  }
}

/** Cancels a task on the hub. Returns the hub's verdict without leaking its body on error. */
export async function cancelConductorTask(
  taskId: string,
  opts: HubProxyOptions = {}
): Promise<{ ok: boolean; status: number }> {
  const cfg = hubConfig();
  if (!cfg) return { ok: false, status: 503 };
  try {
    const doFetch = opts.fetchImpl ?? fetch;
    const res = await doFetch(`${cfg.url}/v1/tasks/${encodeURIComponent(taskId)}/cancel`, {
      method: "POST",
      headers: { authorization: `Bearer ${cfg.token}` },
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 503 };
  }
}
