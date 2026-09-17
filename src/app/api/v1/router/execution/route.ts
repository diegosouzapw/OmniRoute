import { NextResponse, type NextRequest } from "next/server";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { SqliteJobsStore } from "@/lib/db/orchestrateJobs";
import { getModelTagIndex } from "@omniroute/open-sse/services/modelTags/index.ts";
import { classifyRequest } from "@omniroute/open-sse/services/harness/classifier.ts";
import { makeSelfFetchEmbedder } from "@/lib/harness/embedder";
import {
  buildModelDescriptors,
  candidateMatrixLines,
  filterCandidates,
  rankCandidates,
  ensureRegistryFresh,
} from "@omniroute/open-sse/services/harness/capabilityRegistry.ts";
import {
  executionDecision,
  executionProfileFrom,
  HERMES_EXECUTION_RULE,
  toolCapabilitiesForDomain,
} from "@omniroute/open-sse/services/harness/executionRouter.ts";
import type { CandidateFilter } from "@omniroute/open-sse/services/harness/capabilityRegistry.ts";
import { toolsForCapabilities } from "@omniroute/open-sse/services/harness/toolRegistry.ts";
import { selfExecutableTools } from "@omniroute/open-sse/services/harness/toolRegistry.ts";
import { agentsWithEvidence } from "@omniroute/open-sse/services/harness/executionRouter.ts";
import { getWorkflowHistory } from "@omniroute/open-sse/services/harness/workflowMemory.ts";
import { buildSpawnPlan } from "@omniroute/open-sse/services/harness/spawnPlanner.ts";

/**
 * GET/POST /api/v1/router/execution — B16, the THREE-REGISTRY surface.
 * Hermes asks "who/what can accomplish web research?" and gets:
 *
 *   - analysis: the execution profile (task depth: fresh information,
 *     duration estimate, parallelizable)
 *   - decision: the pure-code ladder — fresh info? → browse directly
 *     (Level-0 tool) vs escalate (agent) vs model routing
 *   - tools / agents: capability-matched execution environments, NEVER
 *     ranked against models, with WORKFLOW memory evidence (§14) for
 *     agents
 *   - models: the top-3 from the model registry (capability evidence)
 *
 * Advisory, per the standing rule (verbatim in `rule`): Hermes decides.
 */
const store = new SqliteJobsStore();

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

async function handle(request: NextRequest, body: Record<string, unknown> | null) {
  const params = body ?? Object.fromEntries(new URL(request.url).searchParams.entries());
  const prompt = typeof params.prompt === "string" ? params.prompt : typeof params.task === "string" ? params.task : null;

  // Classify (stage 1 + embeddings refinement on low confidence — same
  // ladder as /v1/harness/classify).
  let taskType: string | null = typeof params.task_type === "string" && params.task_type.trim() ? params.task_type.trim() : null;
  let complexity: "fast" | "deep" | null = null;
  let modality: string | null = typeof params.modality === "string" && params.modality.trim() ? params.modality.trim() : null;
  if (!taskType && prompt && prompt.trim()) {
    const classification = await classifyRequest(
      { messages: [{ role: "user", content: prompt }] },
      {
        embed:
          params.use_embeddings === false
            ? undefined
            : makeSelfFetchEmbedder({ incoming: request, model: typeof params.embedding_model === "string" ? params.embedding_model : undefined }),
      }
    );
    taskType = classification.type;
    complexity = classification.complexity;
    if (classification.modalities.includes("vision")) modality = modality ?? "image";
  }

  const profile = executionProfileFrom({
    type: taskType,
    modality,
    complexity,
    parallelizable: params.parallelizable === true || params.parallelizable === "true",
    requiresFreshInformation:
      typeof params.requires_fresh_information === "boolean" ? params.requires_fresh_information : undefined,
  });

  const tools = selfExecutableTools();
  const decision = executionDecision(profile, { tools });
  const requiredToolCapabilities = toolCapabilitiesForDomain(profile.domain);
  const matchedTools = requiredToolCapabilities.length > 0 ? toolsForCapabilities(requiredToolCapabilities) : tools.filter((tool) => tool.capabilities.includes("browser") || tool.capabilities.includes("web_search"));
  const agents = profile.requiresFreshInformation ? agentsWithEvidence(profile) : [];

  // Models: the same capability-evidence ranking as the candidates route.
  ensureRegistryFresh();
  const index = getModelTagIndex();
  const descriptors = buildModelDescriptors({
    entries: index.entries,
    stats: store.aggregateModelStats(),
    statsByCategory: store.aggregateModelStatsByCategory(),
  });
  const category = typeof params.category === "string" && params.category.trim() ? params.category.trim() : (taskType ?? undefined);
  const activeFilter: CandidateFilter = {};
  if (modality === "image" || modality === "video" || modality === "audio") activeFilter.modality = modality;
  const { candidates } = filterCandidates(descriptors, activeFilter);
  const ranked = rankCandidates(candidates, { category }, 3);
  const matrix = candidateMatrixLines(ranked, { category });

  // B16.2: the embodiment blueprint — bodies only when the ladder escalated
  // to AGENT (a body is justified by task shape, never by default). Every
  // field maps to native Bot Mode surface; spawning stays Hermes's call.
  const models = {
    primary: ranked.find((candidate) => candidate.tier === "primary")?.descriptor.id ?? null,
    secondary: ranked.filter((candidate) => candidate.tier === "secondary").map((candidate) => candidate.descriptor.id),
    fallback: ranked.filter((candidate) => candidate.tier === "fallback").map((candidate) => candidate.descriptor.id),
    matrix,
  };
  const spawnPlan =
    decision.path === "agent"
      ? buildSpawnPlan({
          profile,
          decision,
          agent: decision.agent,
          models,
          workflow: "web_research",
          workflowHistory: getWorkflowHistory("web_research"),
          task: prompt,
        })
      : null;

  return NextResponse.json(
    {
      ok: true,
      advisory: "execution routing is advisory — tools and agents are never ranked against models; the judgment stays with you",
      rule: HERMES_EXECUTION_RULE,
      analysis: profile,
      decision,
      tools: matchedTools,
      agents,
      models,
      ...(spawnPlan ? { spawn_plan: spawnPlan } : {}),
      workflow_memory: profile.requiresFreshInformation ? getWorkflowHistory("web_research").slice(0, 5) : [],
      note: "tools marked execution:client run in YOUR runtime (bot mode) — OmniRoute advises, never executes them",
    },
    { status: 200 }
  );
}

export async function GET(request: NextRequest) {
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;
  return handle(request, null);
}

export async function POST(request: NextRequest) {
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request", details: ["Invalid JSON body"] }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ ok: false, error: "invalid_request", details: ["Body must be an object"] }, { status: 400 });
  }
  return handle(request, raw as Record<string, unknown>);
}
