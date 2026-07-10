import { getProjectById, listProjectsForApiKey } from "@/lib/db/omnicontextProjects";
import { getProjectIdForRepo } from "@/lib/db/omnicontextRepoMap";
import type { ScopeConfidence, ScopeRef, ScopeResolution, WorkContext } from "./types";
import { readExplicitProjectId } from "./workContext";

export interface ResolveScopeInput {
  headers?: Headers | Record<string, string | string[] | undefined> | null;
  workContext?: WorkContext | null;
  apiKeyId?: string | null;
  explicitProjectId?: string | null;
}

function baseScope(workContext?: WorkContext | null): ScopeRef {
  return {
    ticketId: workContext?.ticketId,
    repo: workContext?.repo,
    branch: workContext?.gitBranch,
  };
}

function result(scope: ScopeRef, confidence: ScopeConfidence, reason: string): ScopeResolution {
  return { scope, confidence, reason };
}

/**
 * Resolve project scope + confidence. Wrong-project inject is worse than no inject:
 * confidence `low` means callers must skip Continuity inject.
 */
export function resolveScope(input: ResolveScopeInput): ScopeResolution {
  const wc = input.workContext ?? null;
  const scopeBase = baseScope(wc);

  const explicit =
    (typeof input.explicitProjectId === "string" && input.explicitProjectId.trim()) ||
    readExplicitProjectId(input.headers);

  if (explicit) {
    const project = getProjectById(explicit);
    if (project) {
      return result(
        {
          ...scopeBase,
          projectId: project.id,
          orgId: project.orgId ?? undefined,
          teamId: project.teamId ?? undefined,
        },
        "high",
        "explicit_project_id"
      );
    }
    return result({ ...scopeBase }, "low", "explicit_project_not_found");
  }

  if (wc?.repo) {
    const mappedProjectId = getProjectIdForRepo(wc.repo);
    if (mappedProjectId) {
      const project = getProjectById(mappedProjectId);
      if (project) {
        return result(
          {
            ...scopeBase,
            projectId: project.id,
            orgId: project.orgId ?? undefined,
            teamId: project.teamId ?? undefined,
          },
          "high",
          "repo_map"
        );
      }
    }
  }

  if (input.apiKeyId) {
    const memberships = listProjectsForApiKey(input.apiKeyId);
    if (memberships.length === 1) {
      const only = memberships[0];
      return result(
        {
          ...scopeBase,
          projectId: only.id,
          orgId: only.orgId ?? undefined,
          teamId: only.teamId ?? undefined,
        },
        "medium",
        "single_membership"
      );
    }
    if (memberships.length > 1) {
      return result({ ...scopeBase }, "low", "ambiguous_membership");
    }
  }

  return result({ ...scopeBase }, "low", "unresolved");
}
