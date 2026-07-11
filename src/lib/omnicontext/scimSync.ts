/**
 * Phase 4 — SCIM-like membership sync (push payload stub).
 *
 * Maps external IdP subjects onto OmniContext project members via operator-pushed
 * payloads (`POST /api/omnicontext/scim/sync`). There is **no live Okta/Entra/OIDC
 * connector** in OmniRoute today — MITM `okta.com` bypass and Kiro/Entra token
 * import are unrelated. Live IdP pull is deferred until a user directory exists.
 */
import { addProjectMember, getProjectById, getMembership } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import type { ProjectRole } from "./types";
import { isValidProjectRole } from "./permissions";
import { PublishError } from "./publish";

export interface ScimMemberInput {
  apiKeyId: string;
  role?: ProjectRole | string;
  externalId?: string;
  email?: string;
}

export interface ScimSyncResult {
  projectId: string;
  added: string[];
  skipped: string[];
  errors: Array<{ apiKeyId: string; error: string }>;
}

/**
 * Apply a SCIM-like membership sync payload to a project.
 * Requires an actor with MANAGE_MEMBERS (checked by caller or via actorApiKeyId).
 */
export function syncProjectMembersFromScim(params: {
  projectId: string;
  actorApiKeyId: string;
  members: ScimMemberInput[];
}): ScimSyncResult {
  const project = getProjectById(params.projectId);
  if (!project) throw new PublishError("Project not found", 404);

  const actor = getMembership(params.projectId, params.actorApiKeyId);
  if (!actor || (actor.role !== "lead" && actor.role !== "admin")) {
    throw new PublishError("Missing MANAGE_MEMBERS permission", 403);
  }

  const added: string[] = [];
  const skipped: string[] = [];
  const errors: Array<{ apiKeyId: string; error: string }> = [];

  for (const member of params.members) {
    if (!member.apiKeyId) {
      errors.push({ apiKeyId: "", error: "apiKeyId required" });
      continue;
    }
    const role = isValidProjectRole(member.role) ? member.role : "member";
    try {
      const existing = getMembership(params.projectId, member.apiKeyId);
      if (existing) {
        skipped.push(member.apiKeyId);
        continue;
      }
      addProjectMember(params.projectId, member.apiKeyId, role);
      added.push(member.apiKeyId);
    } catch (err) {
      errors.push({
        apiKeyId: member.apiKeyId,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  appendAuditEvent({
    action: "project.scim_sync",
    projectId: params.projectId,
    actorApiKeyId: params.actorApiKeyId,
    meta: {
      addedCount: added.length,
      skippedCount: skipped.length,
      errorCount: errors.length,
    },
  });

  return { projectId: params.projectId, added, skipped, errors };
}
