import { getMembership } from "@/lib/db/omnicontextProjects";
import {
  approveArtifact,
  getArtifactById,
  type OmniContextArtifact,
} from "@/lib/db/omnicontextArtifacts";
import { getDbInstance } from "@/lib/db/core";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { roleHasPermission } from "./permissions";
import { invalidateRetrieveCache } from "./cache";
import { recordPromoteStable } from "./metrics";
import type { ProjectRole } from "./types";
import { PublishError } from "./publish";

/**
 * Approve a pending artifact (→ active + lead_approved). Lead/admin only.
 */
export function approvePendingArtifact(params: {
  projectId: string;
  artifactId: string;
  apiKeyId: string;
}): OmniContextArtifact {
  const membership = getMembership(params.projectId, params.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "APPROVE")) {
    throw new PublishError("Missing APPROVE permission", 403);
  }
  const art = getArtifactById(params.artifactId);
  if (!art || art.projectId !== params.projectId) {
    throw new PublishError("Artifact not found", 404);
  }
  if (art.status !== "pending") {
    throw new PublishError("Artifact is not pending approval", 422);
  }
  const updated = approveArtifact(params.artifactId, params.apiKeyId);
  if (!updated) throw new PublishError("Approve failed", 500);
  invalidateRetrieveCache();
  appendAuditEvent({
    action: "artifact.approve",
    projectId: params.projectId,
    actorApiKeyId: params.apiKeyId,
    artifactIds: [params.artifactId],
  });
  return updated;
}

/**
 * Promote an active artifact (esp. stable_prefix) to trust_tier=stable. Lead/admin only.
 */
export function promoteArtifactToStable(params: {
  projectId: string;
  artifactId: string;
  apiKeyId: string;
}): OmniContextArtifact {
  const membership = getMembership(params.projectId, params.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "APPROVE")) {
    throw new PublishError("Missing APPROVE permission", 403);
  }
  const art = getArtifactById(params.artifactId);
  if (!art || art.projectId !== params.projectId) {
    throw new PublishError("Artifact not found", 404);
  }
  if (art.status === "deleted") {
    throw new PublishError("Cannot promote deleted artifact", 422);
  }

  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE omnicontext_artifacts
     SET status = 'active', trust_tier = 'stable', approved_by_api_key_id = ?, updated_at = ?
     WHERE id = ?`
  ).run(params.apiKeyId, now, params.artifactId);

  const updated = getArtifactById(params.artifactId);
  if (!updated) throw new PublishError("Promote failed", 500);

  invalidateRetrieveCache();
  recordPromoteStable();
  appendAuditEvent({
    action: "artifact.promote_stable",
    projectId: params.projectId,
    actorApiKeyId: params.apiKeyId,
    artifactIds: [params.artifactId],
  });
  return updated;
}
