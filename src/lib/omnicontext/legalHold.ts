/**
 * Phase 4 — legal hold helpers for OmniContext artifacts.
 */
import { getDbInstance } from "@/lib/db/core";
import { getArtifactById, type OmniContextArtifact } from "@/lib/db/omnicontextArtifacts";
import { getMembership } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { roleHasPermission } from "./permissions";
import { PublishError } from "./publish";
import type { ProjectRole } from "./types";

export function isLegalHold(artifact: OmniContextArtifact | null | undefined): boolean {
  if (!artifact) return false;
  return Boolean((artifact as { legalHold?: boolean | number }).legalHold);
}

export function setLegalHold(params: {
  projectId: string;
  artifactId: string;
  apiKeyId: string;
  held: boolean;
}): OmniContextArtifact {
  const membership = getMembership(params.projectId, params.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "MANAGE_PROJECT")) {
    throw new PublishError("Missing MANAGE_PROJECT permission for legal hold", 403);
  }
  const art = getArtifactById(params.artifactId);
  if (!art || art.projectId !== params.projectId) {
    throw new PublishError("Artifact not found", 404);
  }
  const db = getDbInstance();
  db.prepare(`UPDATE omnicontext_artifacts SET legal_hold = ?, updated_at = ? WHERE id = ?`).run(
    params.held ? 1 : 0,
    new Date().toISOString(),
    params.artifactId
  );
  appendAuditEvent({
    action: params.held ? "artifact.legal_hold_set" : "artifact.legal_hold_clear",
    projectId: params.projectId,
    actorApiKeyId: params.apiKeyId,
    artifactIds: [params.artifactId],
  });
  return getArtifactById(params.artifactId)!;
}

export function assertNotOnLegalHold(artifactId: string): void {
  const art = getArtifactById(artifactId);
  if (!art) return;
  const row = getDbInstance()
    .prepare(`SELECT legal_hold FROM omnicontext_artifacts WHERE id = ?`)
    .get(artifactId) as { legal_hold?: number } | undefined;
  if (row && row.legal_hold === 1) {
    throw new PublishError("Artifact is under legal hold", 423);
  }
}
