/**
 * Lightweight retrieval eval harness (no LLM).
 * Fixtures: { query, projectSlug, seedArtifacts, expectedTitlesAt3 }
 */
import { createProject, addProjectMember } from "@/lib/db/omnicontextProjects";
import { createArtifact } from "@/lib/db/omnicontextArtifacts";
import { retrieveForProject } from "../retrieve";
import { rankArtifacts } from "../rank";

export interface EvalSeedArtifact {
  type: "summary" | "decision" | "blocker" | "snippet" | "handoff" | "stable_prefix";
  title: string;
  body: string;
  trustTier?: "draft" | "member" | "lead_approved" | "stable";
}

export interface RetrievalEvalCase {
  id: string;
  query: string;
  seedArtifacts: EvalSeedArtifact[];
  /** Titles expected in top-3 ranked dynamic hits (order-insensitive for recall). */
  expectedTitlesAt3: string[];
  /** If set, retrieve must not return artifacts from another project (always enforced). */
  wrongProjectGuard?: boolean;
}

export interface RetrievalEvalResult {
  caseId: string;
  recallAt3: number;
  hitTitles: string[];
  expectedTitles: string[];
  passed: boolean;
}

export function runRetrievalEvalCase(
  evalCase: RetrievalEvalCase,
  apiKeyId: string
): RetrievalEvalResult {
  const project = createProject({
    name: `eval-${evalCase.id}`,
    slug: `eval-${evalCase.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  });
  addProjectMember(project.id, apiKeyId, "member");

  for (const seed of evalCase.seedArtifacts) {
    createArtifact({
      projectId: project.id,
      type: seed.type,
      title: seed.title,
      body: seed.body,
      trustTier: seed.trustTier ?? "member",
      status: "active",
      createdByApiKeyId: apiKeyId,
    });
  }

  // Wrong-project decoy
  const other = createProject({
    name: `eval-other-${evalCase.id}`,
    slug: `eval-other-${evalCase.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  });
  createArtifact({
    projectId: other.id,
    type: "decision",
    title: "SECRET_OTHER_PROJECT",
    body: "Must never appear in retrieve for the eval project",
    trustTier: "member",
    status: "active",
  });

  const retrieved = retrieveForProject({
    projectId: project.id,
    query: evalCase.query,
    limit: 10,
    viewerApiKeyId: apiKeyId,
  });

  const ranked = rankArtifacts(retrieved.dynamic).slice(0, 3);
  const hitTitles = ranked.map((h) => h.artifact.title);
  const expected = new Set(evalCase.expectedTitlesAt3);
  let hits = 0;
  for (const t of hitTitles) {
    if (expected.has(t)) hits += 1;
  }
  const recallAt3 =
    evalCase.expectedTitlesAt3.length === 0 ? 1 : hits / evalCase.expectedTitlesAt3.length;

  const leakedOther = [
    ...retrieved.dynamic,
    ...(retrieved.stablePrefix ? [{ artifact: retrieved.stablePrefix }] : []),
  ].some((h) => h.artifact.title === "SECRET_OTHER_PROJECT" || h.artifact.projectId === other.id);

  const passed = recallAt3 >= 0.85 && !leakedOther;

  return {
    caseId: evalCase.id,
    recallAt3,
    hitTitles,
    expectedTitles: evalCase.expectedTitlesAt3,
    passed,
  };
}

export function runRetrievalEvalSuite(
  cases: RetrievalEvalCase[],
  apiKeyId: string
): { results: RetrievalEvalResult[]; meanRecallAt3: number; allPassed: boolean } {
  const results = cases.map((c) => runRetrievalEvalCase(c, apiKeyId));
  const meanRecallAt3 =
    results.length === 0 ? 1 : results.reduce((s, r) => s + r.recallAt3, 0) / results.length;
  return {
    results,
    meanRecallAt3,
    allPassed: results.every((r) => r.passed) && meanRecallAt3 >= 0.85,
  };
}
