import { z } from "zod";
import { getMembership, listProjectsForApiKey } from "@/lib/db/omnicontextProjects";
import { publishArtifact, PublishError } from "@/lib/omnicontext/publish";
import { retrieveForProject } from "@/lib/omnicontext/retrieve";
import { buildInjectBlock } from "@/lib/omnicontext/inject";
import { getOmniContextSettings } from "@/lib/omnicontext/settings";
import {
  createHandoff,
  listHandoffs,
  resumeHandoff,
  closeHandoff,
  getHandoffById,
} from "@/lib/db/omnicontextHandoffs";
import { roleHasPermission } from "@/lib/omnicontext/permissions";
import type { ProjectRole } from "@/lib/omnicontext/types";
import { bootstrapFromDirectory } from "@/lib/omnicontext/bootstrap";

const ProjectIdSchema = z.object({
  apiKeyId: z.string().min(1),
  projectId: z.string().min(1),
});

export const OmnicontextListProjectsSchema = z.object({
  apiKeyId: z.string().min(1),
});

export const OmnicontextRetrieveSchema = ProjectIdSchema.extend({
  query: z.string().max(4000).optional().default(""),
  limit: z.number().int().min(1).max(50).optional(),
});

export const OmnicontextPublishSchema = ProjectIdSchema.extend({
  type: z.enum(["summary", "decision", "blocker", "snippet", "handoff", "stable_prefix"]),
  title: z.string().min(1).max(500),
  body: z.string().min(1).max(200_000),
  tags: z.array(z.string()).optional(),
  publishPolicy: z.enum(["auto", "review_required", "lead_only"]).optional(),
});

export const OmnicontextHandoffCreateSchema = ProjectIdSchema.extend({
  goal: z.string().min(1).max(2000),
  currentStatus: z.string().max(10_000).optional(),
  decisionsMd: z.string().max(50_000).optional(),
  approachesMd: z.string().max(50_000).optional(),
  blockersMd: z.string().max(50_000).optional(),
  nextStepsMd: z.string().max(50_000).optional(),
});

export const OmnicontextHandoffActionSchema = z.object({
  apiKeyId: z.string().min(1),
  handoffId: z.string().min(1),
  action: z.enum(["resume", "close"]),
});

export const OmnicontextBootstrapSchema = ProjectIdSchema.extend({
  cwd: z.string().min(1).max(4096),
});

function requireView(projectId: string, apiKeyId: string) {
  const membership = getMembership(projectId, apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "VIEW")) {
    throw new PublishError("Forbidden", 403);
  }
  return membership;
}

export const omnicontextTools = {
  omniroute_omnicontext_list_projects: {
    name: "omniroute_omnicontext_list_projects",
    description: "List OmniContext projects the API key is a member of",
    scopes: ["read:omnicontext"],
    inputSchema: OmnicontextListProjectsSchema,
    handler: async (args: z.infer<typeof OmnicontextListProjectsSchema>) => {
      const projects = listProjectsForApiKey(args.apiKeyId);
      return { success: true, data: { projects, count: projects.length } };
    },
  },

  omniroute_omnicontext_retrieve: {
    name: "omniroute_omnicontext_retrieve",
    description: "Retrieve ranked OmniContext artifacts and an inject preview for a project",
    scopes: ["read:omnicontext"],
    inputSchema: OmnicontextRetrieveSchema,
    handler: async (args: z.infer<typeof OmnicontextRetrieveSchema>) => {
      requireView(args.projectId, args.apiKeyId);
      const retrieved = retrieveForProject({
        projectId: args.projectId,
        query: args.query,
        limit: args.limit,
        viewerApiKeyId: args.apiKeyId,
      });
      const settings = await getOmniContextSettings();
      const injectPreview = buildInjectBlock(
        args.projectId,
        retrieved,
        settings.injectBudgetTokens
      );
      return {
        success: true,
        data: {
          stablePrefix: retrieved.stablePrefix,
          activeHandoff: retrieved.activeHandoff,
          dynamic: retrieved.dynamic,
          injectPreview,
        },
      };
    },
  },

  omniroute_omnicontext_publish: {
    name: "omniroute_omnicontext_publish",
    description: "Publish a redacted OmniContext artifact to a project (fail-closed)",
    scopes: ["write:omnicontext"],
    inputSchema: OmnicontextPublishSchema,
    handler: async (args: z.infer<typeof OmnicontextPublishSchema>) => {
      try {
        const result = publishArtifact(args);
        return { success: true, data: result };
      } catch (err) {
        if (err instanceof PublishError) {
          return { success: false, error: err.message, status: err.status };
        }
        throw err;
      }
    },
  },

  omniroute_omnicontext_handoff_create: {
    name: "omniroute_omnicontext_handoff_create",
    description: "Create a human handoff pack for a project",
    scopes: ["write:omnicontext"],
    inputSchema: OmnicontextHandoffCreateSchema,
    handler: async (args: z.infer<typeof OmnicontextHandoffCreateSchema>) => {
      const membership = getMembership(args.projectId, args.apiKeyId);
      if (!membership || !roleHasPermission(membership.role as ProjectRole, "HANDOFF")) {
        return { success: false, error: "Forbidden", status: 403 };
      }
      const handoff = createHandoff({
        projectId: args.projectId,
        goal: args.goal,
        currentStatus: args.currentStatus,
        decisionsMd: args.decisionsMd,
        approachesMd: args.approachesMd,
        blockersMd: args.blockersMd,
        nextStepsMd: args.nextStepsMd,
        fromApiKeyId: args.apiKeyId,
      });
      return { success: true, data: { handoff } };
    },
  },

  omniroute_omnicontext_handoff_action: {
    name: "omniroute_omnicontext_handoff_action",
    description: "Resume or close an OmniContext handoff",
    scopes: ["write:omnicontext"],
    inputSchema: OmnicontextHandoffActionSchema,
    handler: async (args: z.infer<typeof OmnicontextHandoffActionSchema>) => {
      const existing = getHandoffById(args.handoffId);
      if (!existing) return { success: false, error: "Handoff not found", status: 404 };
      const membership = getMembership(existing.projectId, args.apiKeyId);
      if (!membership || !roleHasPermission(membership.role as ProjectRole, "HANDOFF")) {
        return { success: false, error: "Forbidden", status: 403 };
      }
      const handoff =
        args.action === "resume"
          ? resumeHandoff(args.handoffId, args.apiKeyId)
          : closeHandoff(args.handoffId);
      return { success: true, data: { handoff } };
    },
  },

  omniroute_omnicontext_list_handoffs: {
    name: "omniroute_omnicontext_list_handoffs",
    description: "List OmniContext handoffs for a project",
    scopes: ["read:omnicontext"],
    inputSchema: ProjectIdSchema,
    handler: async (args: z.infer<typeof ProjectIdSchema>) => {
      requireView(args.projectId, args.apiKeyId);
      return {
        success: true,
        data: { handoffs: listHandoffs({ projectId: args.projectId }) },
      };
    },
  },

  omniroute_omnicontext_bootstrap: {
    name: "omniroute_omnicontext_bootstrap",
    description: "Bootstrap OmniContext drafts from AGENTS.md / CLAUDE.md / README.md",
    scopes: ["write:omnicontext"],
    inputSchema: OmnicontextBootstrapSchema,
    handler: async (args: z.infer<typeof OmnicontextBootstrapSchema>) => {
      try {
        const result = await bootstrapFromDirectory(args);
        return { success: true, data: result };
      } catch (err) {
        if (err instanceof PublishError) {
          return { success: false, error: err.message, status: err.status };
        }
        throw err;
      }
    },
  },
};
