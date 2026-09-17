/**
 * Spawn planner (harness Layer 3, build B16.2) — the EMBODIMENT blueprint.
 *
 * The user's framing: models called in parallel have "brains but no
 * dynamically spawned bodies". Bodies are Hermes-side by design (guide
 * §21 do-not-change; CORE.md directive 3/5) — a body IS a native Bot Mode
 * bot, i.e. a Hermes profile. This module translates an agent-escalation
 * decision into an executable plan FOR that native surface, mapping every
 * field to a capability Bot Mode already has (verified against
 * NousResearch/hermes-agent docs + the bundled plugin at
 * apps/desktop/src/plugins/hermes-bots/, Desktop ≥ v0.20.3):
 *
 *   plan field            → native Bot Mode / Hermes capability
 *   ────────────────────────────────────────────────────────────────
 *   bodies[].name         → `hermes profile create <name>` (~/.hermes/profiles/<name>/)
 *   bodies[].description  → `--description "<text>` (persisted in profile.yaml;
 *                            the kanban orchestrator routes on it)
 *   bodies[].model        → New Agent → Advanced → "Model & provider pin"
 *                            (any provider/model pair; unset = inherit launch profile)
 *   bodies[].tools        → per-toolset enablement (Edit Profile → Capabilities)
 *   bodies[].skills       → per-skill enablement / `--no-skills` narrow profiles
 *   bodies[].memory_bank  → Hindsight bank_id (per-bot private / shared per room)
 *   coordination (room)   → group chats: 2–6 bots, ≤3 serial rounds,
 *                            ≤10 messages/turn, @name pulls, @user escalation
 *   coordination (inbox)  → bot-to-bot CLI handoffs:
 *                            hermes -p <bot> chat --in ~ -c "Bot Chat" -Q -q "…"
 *   sustained.routine     → Hermes cron, namespaced [bot:<name>] <routine>
 *   report                → POST /v1/router/outcomes (B16.1 — §17/§22.4)
 *
 * Pure function, zero I/O: the plan is ADVISORY data (prime directive 1 —
 * Hermes decides IF/WHEN to spawn). OmniRoute never executes bodies.
 */

import type { AgentDescriptor } from "./agentRegistry.ts";
import type { ExecutionDecision, ExecutionProfile } from "./executionRouter.ts";
import type { WorkflowStat } from "./workflowMemory.ts";

/** Native group-room caps, verified from Bot Mode docs (do not inflate). */
export const NATIVE_ROOM_CAPS = {
  min_bots: 2,
  max_bots: 6,
  max_rounds: 3,
  max_messages_per_turn: 10,
} as const;

/** The documented bot-to-bot attribution format (verbatim). */
export const NATIVE_HANDOFF_FORMAT = "Message from 🤖 <sender> (@<sender>): <text>";

/** One body = one native bot (Hermes profile) with its brain pinned. */
export type BotBody = {
  /** Profile name — valid directory name (alphanumeric/hyphen/underscore). */
  name: string;
  title: string;
  /** 1–2 sentences; persisted in profile.yaml, routed on by the orchestrator. */
  description: string;
  /** The mission this body executes. */
  mission: string;
  role: "worker" | "judge";
  wave: number;
  /** The BRAIN — full provider-qualified model id, or null to inherit. */
  model: string | null;
  /** Client-side toolset ids (per-toolset enablement). */
  tools: string[];
  /** Skill enablement — [] with --no-skills narrow profiles. */
  skills: string[];
  /** Hindsight recall boundary: private bot bank vs shared mission bank. */
  memory_bank: string;
  /** Optional template profile to clone the pin/config from. */
  clone_from: string | null;
};

export type SpawnPlan = {
  /** Always true — Hermes is sovereign over spawning (directive 1). */
  advisory: true;
  /** The native surface this plan targets. */
  blueprint: "hermes-bot-mode";
  why: string;
  body_count: number;
  bodies: BotBody[];
  waves: Array<{ name: string; parallel: boolean; bodies: string[] }>;
  coordination: {
    mode: "group_room" | "inbox_handoffs";
    native_caps: typeof NATIVE_ROOM_CAPS;
    handoff_format: string;
    escalation: string;
  };
  embodiment: {
    create: string;
    model_pin: string;
    mission: string;
    routine: string;
  };
  report: {
    outcome_callback: string;
    payload_hint: Record<string, unknown>;
  };
  evidence: {
    workflow: string;
    best: WorkflowStat | null;
    note: string;
  };
};

export type SpawnPlanInput = {
  profile: ExecutionProfile;
  decision: ExecutionDecision;
  agent: AgentDescriptor | null;
  models: { primary: string | null; secondary: string[]; fallback: string[] };
  workflow: string;
  workflowHistory: WorkflowStat[];
  task?: string | null;
};

/** Directory-safe profile name fragment (profile create contract). */
function dirSafe(fragment: string): string {
  return (
    fragment
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 24) || "mission"
  );
}

/**
 * The embodiment blueprint. Returns null unless the ladder escalated to
 * AGENT — tools (Level-0) and model paths never get bodies; a body is
 * justified only by task shape (CORE.md §6: parallelism follows
 * dependency structure, never enthusiasm; swarm is exceptional).
 */
export function buildSpawnPlan(input: SpawnPlanInput): SpawnPlan | null {
  const { profile, decision, agent, models, workflowHistory, task } = input;
  if (decision.path !== "agent" || !agent) return null;

  const workflow = input.workflow || "mission";
  const prefix = dirSafe(workflow);
  const taskText = (task ?? "").trim();
  const taskBrief = taskText.length > 140 ? `${taskText.slice(0, 140)}…` : taskText;

  // Body count — deterministic from task depth, capped by the native room.
  const workerCount = profile.parallelizable ? (profile.complexity === "deep" ? 3 : 2) : 1;
  const judgeCount = 1;
  const bodyCount = Math.min(workerCount + judgeCount, NATIVE_ROOM_CAPS.max_bots);

  // Brains: tiered candidates (B12) — judge gets primary (synthesis quality
  // matters most), workers spread across the pool so a room failure (one
  // provider) can't take out every worker (B9 breaker keys on provider).
  const pool = [models.primary, ...models.secondary, ...models.fallback].filter(
    (model): model is string => typeof model === "string" && model.length > 0
  );
  const judgeModel = pool[0] ?? null;
  const workerModel = (index: number): string | null =>
    pool.length === 0 ? null : pool[(index + 1) % pool.length];

  const parallelizable = profile.parallelizable;
  const sharedBank = `shared:${prefix}`;

  const bodies: BotBody[] = [];
  for (let i = 0; i < workerCount; i += 1) {
    bodies.push({
      name: `${prefix}-worker-${i + 1}`,
      title: `${workflow} worker ${i + 1}`,
      description: `Specialist body: gathers and verifies sources for the ${workflow} mission.`,
      mission: taskBrief
        ? `${taskBrief}${parallelizable ? ` (shard ${i + 1}/${workerCount} — independent of the other shards; report sources found and verified)` : ""}`
        : `Execute the ${workflow} mission; report sources found and verified.`,
      role: "worker",
      wave: parallelizable ? 1 : i + 1,
      model: workerModel(i),
      tools: [...agent.tools],
      skills: [],
      memory_bank: sharedBank,
      clone_from: null,
    });
  }
  bodies.push({
    name: `${prefix}-judge`,
    title: `${workflow} synthesis judge`,
    description: `Synthesis body: reconciles worker findings, grades source quality, writes the verified brief.`,
    mission: taskBrief
      ? `Synthesize the workers' findings on "${taskBrief}" into a verified brief. Grade every source; separate verified claims from unverified.`
      : `Synthesize the workers' findings into a verified brief; grade source quality.`,
    role: "judge",
    wave: parallelizable ? 2 : workerCount + 1,
    model: judgeModel,
    tools: [],
    skills: [],
    memory_bank: sharedBank,
    clone_from: null,
  });

  // Waves — dependency structure, not vibes (CORE.md §6): parallel shards
  // in one wave, the judge consumes their output in the next.
  const waves: SpawnPlan["waves"] = parallelizable
    ? [
        { name: "fan-out", parallel: true, bodies: bodies.filter((b) => b.role === "worker").map((b) => b.name) },
        { name: "synthesis", parallel: false, bodies: [`${prefix}-judge`] },
      ]
    : [
        ...bodies
          .filter((b) => b.role === "worker")
          .map((b, i) => ({ name: `step-${i + 1}`, parallel: false, bodies: [b.name] })),
        { name: "synthesis", parallel: false, bodies: [`${prefix}-judge`] },
      ];

  return {
    advisory: true,
    blueprint: "hermes-bot-mode",
    why:
      `ladder escalated to ${agent.id} (${decision.reason}). ` +
      `${parallelizable ? `Parallelizable workload → ${workerCount} independent workers in one wave, judge consumes their output` : `Sequential workload → workers hand off in order`}. ` +
      `Bodies are native Bot Mode bots (Hermes profiles) — spawn is your call; room caps ${NATIVE_ROOM_CAPS.min_bots}–${NATIVE_ROOM_CAPS.max_bots} bots, ≤${NATIVE_ROOM_CAPS.max_rounds} rounds are native limits, not ours.`,
    body_count: bodyCount,
    bodies,
    waves,
    coordination: {
      mode: parallelizable ? "group_room" : "inbox_handoffs",
      native_caps: NATIVE_ROOM_CAPS,
      handoff_format: NATIVE_HANDOFF_FORMAT,
      escalation: "@user — rooms badge 'needs you' for real judgment calls; workers pull each other with @name",
    },
    embodiment: {
      create: `hermes profile create <name> --description "<description>" --no-skills   # narrow specialist; add --clone-from <template> to inherit a pinned config`,
      model_pin:
        "Bot Mode → New Agent → Advanced → Model & provider pin (any provider Hermes knows — OmniRoute appears as your OpenAI-compatible provider; unset inherits the launch profile)",
      mission: `hermes -p <bot> chat --in ~ -c "Bot Chat" -Q -q "<mission>"   # native bot-to-bot handoff; the bot sees it next run`,
      routine: `hermes cron   # sustained work: routine namespaced [bot:<name>] <routine> — appears in hermes cron list`,
    },
    report: {
      outcome_callback: "POST /v1/router/outcomes",
      payload_hint: {
        workflow: prefix,
        model: "<body's model>",
        tools: "<body's tools>",
        sources_found: 0,
        sources_verified: 0,
        quality_score: 0,
        latency_ms: 0,
        success: true,
      },
    },
    evidence: {
      workflow,
      best: workflowHistory[0] ?? null,
      note: "workflow memory, never model benchmarks — evidence for the whole execution stack (§14)",
    },
  };
}
