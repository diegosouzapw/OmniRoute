/**
 * Harness B16 — the three-registry separation: tool registry, agent
 * registry, the execution decision ladder (fresh information → Level-0
 * tool vs agent escalation), workflow memory (§14 evidence), and the
 * TOOL_FAILURE taxonomy kind.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-harness-b16-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "harness-b16-test-secret";

import {
  TOOL_REGISTRY,
  browserTools,
  getTool,
  selfExecutableTools,
  toolsForCapabilities,
} from "../../../open-sse/services/harness/toolRegistry.ts";
import { AGENT_REGISTRY, agentsForCapabilities, getAgent } from "../../../open-sse/services/harness/agentRegistry.ts";
import {
  executionDecision,
  executionProfileFrom,
  HERMES_EXECUTION_RULE,
  agentsWithEvidence,
} from "../../../open-sse/services/harness/executionRouter.ts";
import {
  clearWorkflowMemory,
  getWorkflowHistory,
  recordWorkflowOutcome,
  workflowEvidence,
  coerceWorkflowOutcome,
  workflowMemorySize,
} from "../../../open-sse/services/harness/workflowMemory.ts";
import { classifyFailure } from "../../../open-sse/services/harness/failureTaxonomy.ts";
import {
  buildSpawnPlan,
  NATIVE_ROOM_CAPS,
  NATIVE_HANDOFF_FORMAT,
} from "../../../open-sse/services/harness/spawnPlanner.ts";

// ── Tool registry ───────────────────────────────────────────────────────────

test("tools: execution environments, capability-matched, never model-shaped", () => {
  const camofox = getTool("camofox");
  assert.ok(camofox);
  assert.equal(camofox.execution, "client", "camofox runs in Hermes' runtime (bot mode)");
  assert.deepEqual(camofox.capabilities, ["browser", "web_navigation", "javascript"]);

  const webSearch = getTool("web_search");
  assert.ok(webSearch);
  assert.equal(webSearch.execution, "native");
  assert.equal(webSearch.endpoint, "/v1/search");

  // Superset matching with overlap ranking: openwork covers [browser,
  // web_research] fully; camofox lacks web_research → not matched.
  const matched = toolsForCapabilities(["browser", "web_research"]);
  assert.deepEqual(matched.map((tool) => tool.id), ["openwork"]);

  assert.ok(browserTools().some((tool) => tool.id === "camofox"));
  assert.ok(selfExecutableTools().every((tool) => tool.execution !== "external"));
  assert.deepEqual(toolsForCapabilities([]), [], "no requirement → no tools (capability-driven, never 'all tools')");
  assert.equal(getTool("does-not-exist"), null);
});

// ── Agent registry ──────────────────────────────────────────────────────────

test("agents: model+tools+capabilities, the escalation path", () => {
  const research = getAgent("web_research_agent");
  assert.ok(research);
  assert.deepEqual(research.tools, ["camofox", "openwork"]);
  assert.equal(research.modelAlias, "research");

  assert.deepEqual(
    agentsForCapabilities(["web_research", "source_verification"]).map((agent) => agent.id),
    ["web_research_agent"]
  );
  assert.deepEqual(agentsForCapabilities(["ocr"]), [], "agents are matched by capability, never by model axes");
  assert.deepEqual(AGENT_REGISTRY.filter((agent) => agent.kind === "agent").length, AGENT_REGISTRY.length);
});

// ── Execution profile (task depth) ──────────────────────────────────────────

test("profile: task depth — fresh information, duration estimate, parallelizable", () => {
  const search = executionProfileFrom({ type: "search", modality: null, complexity: "fast" });
  assert.equal(search.requiresFreshInformation, true, "search-type ⇒ fresh information");
  assert.equal(search.durationEstimate, "short");

  const deepResearch = executionProfileFrom({ type: "research", modality: null, complexity: "deep" });
  assert.equal(deepResearch.durationEstimate, "long");
  assert.equal(deepResearch.requiresFreshInformation, false, "research ≠ fresh-info unless search/explicit");

  const explicit = executionProfileFrom({ type: "chat", modality: null, complexity: "fast", requiresFreshInformation: true });
  assert.equal(explicit.requiresFreshInformation, true, "explicit override wins");

  const unknown = executionProfileFrom({ type: null, modality: null, complexity: null });
  assert.equal(unknown.durationEstimate, null);
});

// ── The decision ladder ─────────────────────────────────────────────────────

test("ladder: fresh info + short/direct → Level-0 TOOL (Hermes browses itself)", () => {
  const decision = executionDecision(
    executionProfileFrom({ type: "search", modality: null, complexity: "fast" })
  );
  assert.equal(decision.path, "tool");
  assert.equal(decision.tool?.id, "camofox");
  assert.match(decision.reason, /Level-0 browsing/);
  assert.ok(decision.ladder.some((step) => step.includes("fresh information? YES")));
});

test("ladder: fresh info + long/parallelizable → AGENT escalation (research, not browsing)", () => {
  const long = executionDecision(executionProfileFrom({ type: "search", modality: null, complexity: "deep" }));
  assert.equal(long.path, "agent");
  assert.equal(long.agent?.id, "web_research_agent");
  assert.match(long.reason, /research, not browsing/);

  const parallel = executionDecision(
    executionProfileFrom({ type: "search", modality: null, complexity: "fast", parallelizable: true })
  );
  assert.equal(parallel.path, "agent", "parallelizable research workload escalates even when each step is fast");
  assert.equal(parallel.agent?.id, "web_research_agent");
});

test("ladder: no fresh info → MODEL path; degenerate cases fall safely", () => {
  const model = executionDecision(executionProfileFrom({ type: "code", modality: null, complexity: "deep" }));
  assert.equal(model.path, "model");
  assert.equal(model.tool, null);
  assert.equal(model.agent, null);
  assert.match(model.reason, /\/v1\/router\/candidates/);

  // No agents registered → browser tool is still the fresh-info path.
  const noAgents = executionDecision(executionProfileFrom({ type: "search", modality: null, complexity: "deep" }), { agents: [] });
  assert.equal(noAgents.path, "tool");
  assert.match(noAgents.reason, /no research agent registered/);

  // Nothing at all → a search-capable model is the remaining path.
  const nothing = executionDecision(executionProfileFrom({ type: "search", modality: null, complexity: "deep" }), { tools: [], agents: [] });
  assert.equal(nothing.path, "model");
  assert.match(nothing.reason, /no browsing tool or research agent/);
});

test("rule: the user's Hermes rule, verbatim", () => {
  assert.equal(
    HERMES_EXECUTION_RULE,
    "Tools are preferred for short, direct operations. Agents are preferred for extended, parallelizable, specialized, or multi-step operations. Models are selected based on task-specific capability evidence. Self-execution is preferred when expected quality is sufficient and delegation cost is not justified."
  );
});

// ── Workflow memory (§14 — measure workflows, not model benchmarks) ─────────

test("workflow memory: outcomes aggregate per (workflow, model, tools)", () => {
  clearWorkflowMemory();
  recordWorkflowOutcome({
    workflow: "web_research",
    model: "model-x",
    tools: ["camofox"],
    sourcesFound: 14,
    sourcesVerified: 12,
    qualityScore: 0.91,
    latencyMs: 38_000,
    success: true,
  });
  recordWorkflowOutcome({
    workflow: "web_research",
    model: "model-x",
    tools: ["camofox"],
    sourcesFound: 10,
    sourcesVerified: 10,
    qualityScore: 0.89,
    latencyMs: 40_000,
    success: true,
  });
  recordWorkflowOutcome({
    workflow: "web_research",
    model: "model-y",
    tools: ["openwork"],
    sourcesFound: 20,
    sourcesVerified: 19,
    qualityScore: 0.95,
    latencyMs: 90_000,
    success: true,
  });

  assert.equal(workflowMemorySize(), 2, "3 outcomes → 2 distinct (workflow, model, tools) keys");
  const evidence = workflowEvidence("web_research", "model-x", ["camofox"]);
  assert.ok(evidence);
  assert.equal(evidence.attempts, 2);
  assert.equal(evidence.avgSourcesFound, 12);
  assert.equal(evidence.avgSourcesVerified, 11);
  assert.ok(Math.abs((evidence.avgQualityScore ?? 0) - 0.9) < 1e-9);
  assert.equal(evidence.avgLatencyMs, 39_000);

  // History ranking: quality × evidence volume — "information you won't
  // find on a benchmark leaderboard".
  const history = getWorkflowHistory("web_research");
  assert.equal(history.length, 2, "per-key stats, not per-outcome");
  assert.ok(history[0].model === "model-y" || history[0].model === "model-x", "both strong entries ranked first/second deterministically");

  // Empty evidence is all-null, never invented.
  const none = workflowEvidence("web_research", "model-z", []);
  assert.ok(none, "empty evidence is a zeroed stat, not null");
  assert.equal(none.attempts, 0);
  assert.equal(none.avgQualityScore, null);
  assert.equal(none.successRate, null);

  // Case-insensitive workflow, deduped sorted tools.
  recordWorkflowOutcome({ workflow: "Web_Research", model: "m", tools: ["b", "a", "b"], success: true });
  const deduped = workflowEvidence("web_research", "m", ["a", "b"]);
  assert.ok(deduped);
  assert.equal(deduped.attempts, 1);
  assert.deepEqual(deduped.tools, ["a", "b"]);
  clearWorkflowMemory();
});

test("agents with evidence: workflow memory attaches to matched agents", () => {
  clearWorkflowMemory();
  const before = agentsWithEvidence(executionProfileFrom({ type: "search", modality: null, complexity: "deep" }));
  assert.equal(before[0].workflow?.attempts ?? 0, 0, "no evidence yet — never invented");

  recordWorkflowOutcome({
    workflow: "web_research",
    model: null, // the seeded agent resolves its own model
    tools: ["camofox", "openwork"],
    sourcesFound: 15,
    sourcesVerified: 14,
    qualityScore: 0.93,
    latencyMs: 60_000,
    success: true,
  });
  const after = agentsWithEvidence(executionProfileFrom({ type: "search", modality: null, complexity: "deep" }));
  assert.equal(after[0].id, "web_research_agent");
  assert.equal(after[0].workflow?.attempts, 1);
  assert.ok(Math.abs((after[0].workflow?.avgQualityScore ?? 0) - 0.93) < 1e-9);
  clearWorkflowMemory();
});

// ── Taxonomy: TOOL_FAILURE (guide §12) ───────────────────────────────────────

test("taxonomy: tool failures never hurt model reputation", () => {
  assert.deepEqual(classifyFailure("tool failure: camofox browser crashed mid-navigation"), {
    kind: "tool_failure",
    affectsReputation: false,
  });
  assert.deepEqual(classifyFailure("TOOL_ERROR: openwork workspace timed out"), {
    kind: "tool_failure",
    affectsReputation: false,
  });
  // A model-quality failure still counts.
  assert.deepEqual(classifyFailure("the synthesis missed two claims"), { kind: "model", affectsReputation: true });
});

// ── B16.1: Hermes guide §22.4 structured outcome callback ──────────────

test("coerceWorkflowOutcome: valid payload, defaults and clamping", () => {
  const ok = coerceWorkflowOutcome({
    workflow: "web_research",
    model: "model-x",
    tools: ["camofox", "search"],
    sources_found: 14,
    sources_verified: 12,
    quality_score: 1.7,
    latency_ms: 38000,
    success: true,
  });
  assert.ok(!("error" in ok));
  if (!("error" in ok)) {
    assert.strictEqual(ok.workflow, "web_research");
    assert.strictEqual(ok.model, "model-x");
    assert.deepStrictEqual(ok.tools, ["camofox", "search"]);
    assert.strictEqual(ok.sourcesFound, 14);
    assert.strictEqual(ok.sourcesVerified, 12);
    assert.strictEqual(ok.qualityScore, 1); // clamped to 0..1
    assert.strictEqual(ok.latencyMs, 38000);
    assert.strictEqual(ok.success, true);
  }
  const minimal = coerceWorkflowOutcome({ workflow: "eval" });
  assert.ok(!("error" in minimal));
  if (!("error" in minimal)) {
    assert.strictEqual(minimal.model, null);
    assert.deepStrictEqual(minimal.tools, []);
    assert.strictEqual(minimal.sourcesFound, null);
    assert.strictEqual(minimal.success, null);
  }
});

test("coerceWorkflowOutcome: rejects malformed payloads without throwing", () => {
  for (const bad of [
    null,
    "x",
    [],
    {},
    { workflow: "  " },
    { workflow: "w", sources_found: -3 },
    { workflow: "w", quality_score: "high" },
    { workflow: "w", latency_ms: Number.NaN },
  ]) {
    const res = coerceWorkflowOutcome(bad);
    assert.ok("error" in res, `expected error for ${JSON.stringify(bad)}`);
  }
});

test("coerceWorkflowOutcome → recordWorkflowOutcome → getWorkflowHistory round-trip", () => {
  clearWorkflowMemory();
  const outcome = coerceWorkflowOutcome({
    workflow: "web_research",
    model: "model-y",
    tools: ["camofox"],
    sources_found: 8,
    sources_verified: 7,
    quality_score: 0.9,
    latency_ms: 12000,
    success: true,
  });
  assert.ok(!("error" in outcome));
  if (!("error" in outcome)) {
    recordWorkflowOutcome(outcome);
    const history = getWorkflowHistory("web_research");
    assert.strictEqual(history.length, 1);
    assert.strictEqual(history[0].model, "model-y");
    assert.strictEqual(history[0].attempts, 1);
    assert.strictEqual(history[0].avgSourcesVerified, 7);
  }
  // a different workflow reads empty — memory is per-workflow
  assert.strictEqual(getWorkflowHistory("other").length, 0);
  clearWorkflowMemory();
});

// ── B16.2: the spawn plan (embodiment blueprint on native Bot Mode) ────────

const PLAN_MODELS = {
  primary: "openrouter/openai/gpt-5.4",
  secondary: ["kiro/claude-sonnet-4-6", "openrouter/qwen/qwen3-max"],
  fallback: ["gemini/gemini-3-pro"],
};

test("spawn plan: null unless the ladder escalated to agent", () => {
  const toolProfile = executionProfileFrom({ type: "search", modality: null, complexity: "fast" });
  const toolDecision = executionDecision(toolProfile);
  assert.equal(toolDecision.path, "tool");
  assert.equal(
    buildSpawnPlan({
      profile: toolProfile,
      decision: toolDecision,
      agent: toolDecision.agent,
      models: PLAN_MODELS,
      workflow: "web_research",
      workflowHistory: [],
    }),
    null,
    "Level-0 tool path never gets bodies"
  );

  const modelProfile = executionProfileFrom({ type: "chat", modality: null, complexity: "fast" });
  const modelDecision = executionDecision(modelProfile);
  assert.equal(modelDecision.path, "model");
  assert.equal(
    buildSpawnPlan({
      profile: modelProfile,
      decision: modelDecision,
      agent: null,
      models: PLAN_MODELS,
      workflow: "web_research",
      workflowHistory: [],
    }),
    null,
    "model path never gets bodies"
  );
});

test("spawn plan: parallelizable deep research — fan-out wave + judge, group room", () => {
  const profile = executionProfileFrom({
    type: "research",
    modality: null,
    complexity: "deep",
    parallelizable: true,
    requiresFreshInformation: true,
  });
  const decision = executionDecision(profile);
  assert.equal(decision.path, "agent");
  const plan = buildSpawnPlan({
    profile,
    decision,
    agent: decision.agent,
    models: PLAN_MODELS,
    workflow: "web_research",
    workflowHistory: [],
    task: "Survey 15 competing agent harnesses and verify their routing claims against primary sources",
  });
  assert.ok(plan);
  if (!plan) return;

  // Structure: 3 workers + 1 judge (deep+parallelizable), capped by native room.
  assert.equal(plan.body_count, 4);
  assert.equal(plan.blueprint, "hermes-bot-mode");
  assert.equal(plan.advisory, true);
  const workers = plan.bodies.filter((body) => body.role === "worker");
  const judge = plan.bodies.find((body) => body.role === "judge");
  assert.equal(workers.length, 3);
  assert.ok(judge);

  // Waves: fan-out parallel, then synthesis.
  assert.deepEqual(plan.waves, [
    { name: "fan-out", parallel: true, bodies: workers.map((body) => body.name) },
    { name: "synthesis", parallel: false, bodies: [judge?.name] },
  ]);

  // Brains: judge = primary; workers spread across the tiered pool.
  assert.equal(judge?.model, PLAN_MODELS.primary);
  const workerModels = new Set(workers.map((body) => body.model));
  assert.equal(workerModels.size, 3, "workers spread across distinct models");
  assert.ok(!workerModels.has(PLAN_MODELS.primary), "primary reserved for the judge");

  // Bodies: agents' tools on workers, none on the judge; shared memory bank;
  // names are valid profile directory names.
  for (const body of workers) {
    assert.deepEqual(body.tools, decision.agent?.tools ?? []);
    assert.equal(body.memory_bank, "shared:web_research");
    assert.match(body.name, /^[a-z0-9_-]+$/);
    assert.ok(body.mission.includes("shard"));
  }
  assert.deepEqual(judge?.tools ?? null, []);

  // Coordination: native group room + the documented caps and handoff format.
  assert.equal(plan.coordination.mode, "group_room");
  assert.deepEqual(plan.coordination.native_caps, NATIVE_ROOM_CAPS);
  assert.equal(plan.coordination.native_caps.max_bots, 6);
  assert.equal(plan.coordination.native_caps.max_rounds, 3);
  assert.equal(plan.coordination.handoff_format, NATIVE_HANDOFF_FORMAT);

  // Report: the B16.1 outcome callback.
  assert.equal(plan.report.outcome_callback, "POST /v1/router/outcomes");
  assert.equal(plan.evidence.workflow, "web_research");
});

test("spawn plan: sequential workload — inbox handoffs in dependency order", () => {
  const profile = executionProfileFrom({
    type: "research",
    modality: null,
    complexity: "deep",
    parallelizable: false,
    requiresFreshInformation: true,
  });
  const decision = executionDecision(profile);
  assert.equal(decision.path, "agent");
  const plan = buildSpawnPlan({
    profile,
    decision,
    agent: decision.agent,
    models: PLAN_MODELS,
    workflow: "web_research",
    workflowHistory: [],
    task: "Verify each claim in order",
  });
  assert.ok(plan);
  if (!plan) return;

  assert.equal(plan.coordination.mode, "inbox_handoffs");
  const workers = plan.bodies.filter((body) => body.role === "worker");
  assert.equal(workers.length, 1, "sequential: one worker hands off to the judge");
  // Every wave is sequential — dependency order, never parallel for its own sake.
  assert.ok(plan.waves.every((wave) => wave.parallel === false));
  assert.equal(plan.waves.length, 2);
  assert.ok(plan.embodiment.mission.includes('hermes -p <bot> chat'));
  assert.ok(plan.embodiment.create.includes("hermes profile create"));
});

test("spawn plan: empty model pool — bodies inherit the launch profile (native)", () => {
  const profile = executionProfileFrom({
    type: "research",
    modality: null,
    complexity: "deep",
    parallelizable: true,
    requiresFreshInformation: true,
  });
  const decision = executionDecision(profile);
  const plan = buildSpawnPlan({
    profile,
    decision,
    agent: decision.agent,
    models: { primary: null, secondary: [], fallback: [] },
    workflow: "web_research",
    workflowHistory: [],
  });
  assert.ok(plan);
  if (!plan) return;
  assert.ok(plan.bodies.every((body) => body.model === null), "null = inherit the launch profile");
  assert.ok(plan.embodiment.model_pin.includes("Model & provider pin"));
});

test("spawn plan: workflow evidence attaches (never model benchmarks)", () => {
  clearWorkflowMemory();
  const outcome = coerceWorkflowOutcome({
    workflow: "web_research",
    model: "openrouter/openai/gpt-5.4",
    tools: ["camofox"],
    sources_found: 12,
    sources_verified: 11,
    quality_score: 0.9,
    latency_ms: 40000,
    success: true,
  });
  assert.ok(!("error" in outcome));
  if (!("error" in outcome)) recordWorkflowOutcome(outcome);

  const profile = executionProfileFrom({
    type: "research",
    modality: null,
    complexity: "deep",
    parallelizable: true,
    requiresFreshInformation: true,
  });
  const decision = executionDecision(profile);
  const plan = buildSpawnPlan({
    profile,
    decision,
    agent: decision.agent,
    models: PLAN_MODELS,
    workflow: "web_research",
    workflowHistory: getWorkflowHistory("web_research"),
  });
  assert.ok(plan?.evidence.best, "best-evidence-first workflow stat attached");
  assert.equal(plan?.evidence.best?.avgSourcesVerified, 11);
  assert.ok(plan?.evidence.note.includes("never model benchmarks"));
  clearWorkflowMemory();
});
