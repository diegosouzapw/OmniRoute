import type { RetrievalEvalCase } from "./retrievalEval";

/** Labeled fixture set for Continuity retrieval CI gate (Recall@3 ≥ 0.85). */
export const RETRIEVAL_EVAL_FIXTURES: RetrievalEvalCase[] = [
  {
    id: "sqlite-decision",
    query: "SQLite persistence choice",
    seedArtifacts: [
      {
        type: "decision",
        title: "Use SQLite for Continuity store",
        body: "We chose SQLite with FTS5 for local Continuity artifacts.",
      },
      {
        type: "summary",
        title: "Sprint notes",
        body: "Worked on dashboard tabs and MCP tools.",
      },
      {
        type: "blocker",
        title: "FTS trigger mismatch",
        body: "FTS content sync must use rowid triggers.",
      },
    ],
    expectedTitlesAt3: ["Use SQLite for Continuity store"],
  },
  {
    id: "handoff-priority",
    query: "resume checkout handoff blockers",
    seedArtifacts: [
      {
        type: "blocker",
        title: "Checkout rate limit",
        body: "Upstream 429 on checkout provider during peak.",
      },
      {
        type: "decision",
        title: "Prefer fill-first routing",
        body: "Use fill-first when quota is uneven.",
      },
      {
        type: "snippet",
        title: "Retry-After snippet",
        body: "Parse Retry-After header before backoff.",
      },
    ],
    expectedTitlesAt3: ["Checkout rate limit"],
  },
  {
    id: "stable-conventions",
    query: "project conventions worktree",
    seedArtifacts: [
      {
        type: "stable_prefix",
        title: "Team conventions",
        body: "Always use isolated git worktrees under .claude/worktrees.",
        trustTier: "stable",
      },
      {
        type: "summary",
        title: "Worktree incident",
        body: "Shared checkout caused lost uncommitted work.",
      },
    ],
    expectedTitlesAt3: ["Worktree incident"],
  },
];
