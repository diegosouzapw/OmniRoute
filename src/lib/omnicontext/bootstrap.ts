import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createArtifact, type OmniContextArtifact } from "@/lib/db/omnicontextArtifacts";
import { getMembership } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { redactForPublish } from "./redact";
import { roleHasPermission } from "./permissions";
import type { ProjectRole } from "./types";
import { PublishError } from "./publish";

const BOOTSTRAP_FILES = ["AGENTS.md", "CLAUDE.md", "README.md"] as const;

export interface BootstrapResult {
  created: OmniContextArtifact[];
  skipped: string[];
}

/**
 * Seed draft/member artifacts from common project docs in a directory.
 */
export async function bootstrapFromDirectory(params: {
  projectId: string;
  apiKeyId: string;
  cwd: string;
}): Promise<BootstrapResult> {
  const membership = getMembership(params.projectId, params.apiKeyId);
  if (!membership) throw new PublishError("Not a project member", 403);
  if (!roleHasPermission(membership.role as ProjectRole, "PUBLISH")) {
    throw new PublishError("Missing PUBLISH permission", 403);
  }

  const created: OmniContextArtifact[] = [];
  const skipped: string[] = [];

  for (const file of BOOTSTRAP_FILES) {
    const full = join(params.cwd, file);
    let raw: string;
    try {
      raw = await readFile(full, "utf8");
    } catch {
      skipped.push(file);
      continue;
    }
    if (!raw.trim()) {
      skipped.push(file);
      continue;
    }

    const redacted = redactForPublish(raw.slice(0, 50_000));
    const isAgentsOrClaude = file === "AGENTS.md" || file === "CLAUDE.md";
    const artifact = createArtifact({
      projectId: params.projectId,
      type: isAgentsOrClaude ? "stable_prefix" : "summary",
      title: `Bootstrap: ${file}`,
      body: redacted.text,
      trustTier: isAgentsOrClaude ? "draft" : "member",
      status: isAgentsOrClaude ? "pending" : "active",
      createdByApiKeyId: params.apiKeyId,
      tags: ["bootstrap", file.toLowerCase()],
    });
    created.push(artifact);
  }

  appendAuditEvent({
    action: "project.bootstrap",
    projectId: params.projectId,
    actorApiKeyId: params.apiKeyId,
    meta: {
      created: created.map((a) => a.id),
      skipped,
    },
  });

  return { created, skipped };
}
