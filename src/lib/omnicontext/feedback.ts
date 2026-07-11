import { getMembership } from "@/lib/db/omnicontextProjects";
import {
  createFeedback,
  type CreateFeedbackInput,
  type OmniContextFeedback,
} from "@/lib/db/omnicontextFeedback";
import { getArtifactById } from "@/lib/db/omnicontextArtifacts";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { roleHasPermission } from "./permissions";
import { recordFeedback } from "./metrics";
import type { ProjectRole } from "./types";
import { PublishError } from "./publish";

export interface SubmitFeedbackInput {
  projectId: string;
  artifactId: string;
  apiKeyId: string;
  verdict: "helpful" | "harmful";
  retrieveId?: string | null;
  note?: string | null;
}

/**
 * Fail-closed feedback: membership + VIEW required; artifact must belong to project.
 */
export function submitFeedback(input: SubmitFeedbackInput): OmniContextFeedback {
  const membership = getMembership(input.projectId, input.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "VIEW")) {
    throw new PublishError("Forbidden", 403);
  }
  const artifact = getArtifactById(input.artifactId);
  if (!artifact || artifact.projectId !== input.projectId) {
    throw new PublishError("Artifact not found", 404);
  }

  const payload: CreateFeedbackInput = {
    projectId: input.projectId,
    artifactId: input.artifactId,
    verdict: input.verdict,
    actorApiKeyId: input.apiKeyId,
    retrieveId: input.retrieveId,
    note: input.note,
  };
  const row = createFeedback(payload);
  recordFeedback(input.verdict);
  appendAuditEvent({
    action: "artifact.feedback",
    projectId: input.projectId,
    actorApiKeyId: input.apiKeyId,
    artifactIds: [input.artifactId],
    meta: { verdict: input.verdict, feedbackId: row.id },
  });
  return row;
}
