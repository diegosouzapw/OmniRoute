import {
  createArtifact,
  type ArtifactType,
  type CreateArtifactInput,
  type OmniContextArtifact,
} from "@/lib/db/omnicontextArtifacts";
import { getMembership, getProjectById } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { roleHasPermission } from "./permissions";
import { redactForPublish } from "./redact";
import { invalidateRetrieveCache } from "./cache";
import { recordPublish } from "./metrics";
import { indexArtifactEmbedding, indexArtifactEmbeddingAsync } from "./hybridRetrieve";
import { runDlpHook } from "./dlp";
import { getOmniContextSettings } from "./settings";
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
  departmentId?: string | null;
}

export interface PublishArtifactResult {
  artifact: OmniContextArtifact;
  redacted: boolean;
  matches: string[];
  dlpReasons?: string[];
}

/**
 * Fail-closed publish: membership + PUBLISH permission required.
 * Body is always Continuity-redacted; optional DLP hook; department may force review.
 */
export async function publishArtifactAsync(
  input: PublishArtifactInput
): Promise<PublishArtifactResult> {
  const membership = getMembership(input.projectId, input.apiKeyId);
  if (!membership) {
    throw new PublishError("Not a project member", 403);
  }
  if (!roleHasPermission(membership.role as ProjectRole, "PUBLISH")) {
    throw new PublishError("Missing PUBLISH permission", 403);
  }

  let title = input.title;
  let body = input.body;
  let dlpReasons: string[] = [];

  const settings = await getOmniContextSettings().catch(() => null);
  if (settings?.dlpEnabled) {
    const project = getProjectById(input.projectId);
    const dlp = await runDlpHook({
      title,
      body,
      projectId: input.projectId,
      departmentId:
        input.departmentId ?? (project as { departmentId?: string | null })?.departmentId,
    });
    if (dlp.verdict === "block") {
      throw new PublishError(`DLP blocked publish: ${dlp.reasons.join(",") || "policy"}`, 422);
    }
    title = dlp.title;
    body = dlp.body;
    dlpReasons = dlp.reasons;
  }

  const titleRedact = redactForPublish(title);
  const bodyRedact = redactForPublish(body);
  if (!titleRedact.text.trim() || !bodyRedact.text.trim()) {
    throw new PublishError("Title and body are required after redaction", 422);
  }

  const project = getProjectById(input.projectId);
  const departmentId =
    input.departmentId ??
    (project as { departmentId?: string | null } | null)?.departmentId ??
    null;
  let policy = input.publishPolicy ?? "auto";
  if (departmentId && settings?.departmentReviewRequired !== false && policy === "auto") {
    policy = "review_required";
  }

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
    departmentId,
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

  if (input.type === "stable_prefix" && !isLead) {
    createInput.status = "pending";
    createInput.trustTier = "draft";
  }

  const artifact = createArtifact(createInput);
  try {
    await indexArtifactEmbeddingAsync(artifact.id);
  } catch {
    /* embedding index is best-effort */
  }
  invalidateRetrieveCache();
  recordPublish();
  appendAuditEvent({
    action: "artifact.publish",
    projectId: input.projectId,
    actorApiKeyId: input.apiKeyId,
    meta: {
      artifactId: artifact.id,
      type: artifact.type,
      status: artifact.status,
      redacted: titleRedact.redacted || bodyRedact.redacted,
      dlpReasons,
    },
  });

  return {
    artifact,
    redacted: titleRedact.redacted || bodyRedact.redacted,
    matches: [...new Set([...titleRedact.matches, ...bodyRedact.matches])],
    dlpReasons,
  };
}

/** Sync wrapper for call sites that cannot await (keeps Phase 1 API). */
export function publishArtifact(input: PublishArtifactInput): PublishArtifactResult {
  const membership = getMembership(input.projectId, input.apiKeyId);
  if (!membership) {
    throw new PublishError("Not a project member", 403);
  }
  if (!roleHasPermission(membership.role as ProjectRole, "PUBLISH")) {
    throw new PublishError("Missing PUBLISH permission", 403);
  }

  // Sync path: Continuity redact only (DLP requires async settings — use publishArtifactAsync)
  const titleRedact = redactForPublish(input.title);
  const bodyRedact = redactForPublish(input.body);
  if (!titleRedact.text.trim() || !bodyRedact.text.trim()) {
    throw new PublishError("Title and body are required after redaction", 422);
  }

  const project = getProjectById(input.projectId);
  const departmentId =
    input.departmentId ??
    (project as { departmentId?: string | null } | null)?.departmentId ??
    null;
  let policy = input.publishPolicy ?? "auto";
  if (departmentId && policy === "auto") {
    policy = "review_required";
  }

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
    departmentId,
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
  if (input.type === "stable_prefix" && !isLead) {
    createInput.status = "pending";
    createInput.trustTier = "draft";
  }

  const artifact = createArtifact(createInput);
  try {
    indexArtifactEmbedding(artifact.id);
    void indexArtifactEmbeddingAsync(artifact.id).catch(() => {
      /* Memory embed upgrade is best-effort; local hash already indexed */
    });
  } catch {
    /* best-effort */
  }
  invalidateRetrieveCache();
  recordPublish();
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
