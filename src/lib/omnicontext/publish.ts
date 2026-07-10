import {
  createArtifact,
  type ArtifactType,
  type CreateArtifactInput,
  type OmniContextArtifact,
} from "@/lib/db/omnicontextArtifacts";
import { getMembership } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { roleHasPermission } from "./permissions";
import { redactForPublish } from "./redact";
import type { ProjectRole, PublishPolicy } from "./types";

export class PublishError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "PublishError";
    this.status = status;
  }
}

export interface PublishArtifactInput {
  projectId: string;
  apiKeyId: string;
  type: ArtifactType;
  title: string;
  body: string;
  ticketId?: string | null;
  repo?: string | null;
  branch?: string | null;
  tags?: string[];
  publishPolicy?: PublishPolicy;
  supersedesId?: string | null;
}

export interface PublishArtifactResult {
  artifact: OmniContextArtifact;
  redacted: boolean;
  matches: string[];
}

/**
 * Fail-closed publish: membership + PUBLISH permission required.
 * Body is always redacted before persistence.
 */
export function publishArtifact(input: PublishArtifactInput): PublishArtifactResult {
  const membership = getMembership(input.projectId, input.apiKeyId);
  if (!membership) {
    throw new PublishError("Not a project member", 403);
  }
  if (!roleHasPermission(membership.role as ProjectRole, "PUBLISH")) {
    throw new PublishError("Missing PUBLISH permission", 403);
  }

  const titleRedact = redactForPublish(input.title);
  const bodyRedact = redactForPublish(input.body);
  if (!titleRedact.text.trim() || !bodyRedact.text.trim()) {
    throw new PublishError("Title and body are required after redaction", 422);
  }

  const policy = input.publishPolicy ?? "auto";
  const needsReview = policy === "review_required" || policy === "lead_only";
  const isLead = membership.role === "lead" || membership.role === "admin";

  if (policy === "lead_only" && !isLead) {
    throw new PublishError("lead_only publish requires lead or admin", 403);
  }

  const createInput: CreateArtifactInput = {
    projectId: input.projectId,
    type: input.type,
    title: titleRedact.text,
    body: bodyRedact.text,
    ticketId: input.ticketId,
    repo: input.repo,
    branch: input.branch,
    tags: input.tags,
    createdByApiKeyId: input.apiKeyId,
    supersedesId: input.supersedesId,
    publishPolicy: policy,
    status: needsReview && !(policy === "lead_only" && isLead) ? "pending" : "active",
    trustTier:
      input.type === "stable_prefix"
        ? isLead
          ? "stable"
          : "draft"
        : needsReview
          ? "draft"
          : "member",
  };

  // stable_prefix from non-lead stays draft/pending until approve
  if (input.type === "stable_prefix" && !isLead) {
    createInput.status = "pending";
    createInput.trustTier = "draft";
  }

  const artifact = createArtifact(createInput);
  appendAuditEvent({
    action: "artifact.publish",
    projectId: input.projectId,
    actorApiKeyId: input.apiKeyId,
    meta: {
      artifactId: artifact.id,
      type: artifact.type,
      status: artifact.status,
      redacted: titleRedact.redacted || bodyRedact.redacted,
    },
  });

  return {
    artifact,
    redacted: titleRedact.redacted || bodyRedact.redacted,
    matches: [...new Set([...titleRedact.matches, ...bodyRedact.matches])],
  };
}
