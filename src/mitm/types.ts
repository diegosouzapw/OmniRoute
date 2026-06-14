import { z } from "zod";

export type AgentId =
  | "antigravity"
  | "kiro"
  | "copilot"
  | "codex"
  | "cursor"
  | "zed"
  | "claude-code"
  | "open-code"
  | "trae";

/**
 * Minimal abstract interface for MitmHandlerBase.
 * Full implementation lives in src/mitm/handlers/base.ts (F3).
 * Used here as a forward reference so MitmTarget.handler can be typed correctly.
 */
export interface MitmHandlerBase {
  readonly agentId: AgentId;
}

export interface MitmTarget {
  id: AgentId;
  name: string;
  icon: string;
  color: string;
  hosts: string[];                  // ex.: ["api.githubcopilot.com"]
  port: number;                     // default 443
  endpointPatterns: string[];
  defaultModels: Array<{ id: string; name: string; alias: string }>;
  setupTutorial: {
    steps: string[];
    detection: { command: string; platform: "linux" | "macos" | "windows" | "all" };
  };
  handler: () => Promise<{ default: new () => MitmHandlerBase }>;
  riskNoticeKey: string;            // i18n key
  viability?: "investigating" | "supported" | "deprecated";  // Trae = "investigating"
}

/**
 * Serializable view of a MitmTarget for Server→Client Component props.
 * Omits `handler` (a function): Next.js forbids passing functions across the
 * Server/Client boundary, and the UI never invokes it. See agent-bridge/page.tsx.
 */
export type MitmTargetView = Omit<MitmTarget, "handler">;

export const MitmTargetSchema = z.object({
  id: z.enum([
    "antigravity", "kiro", "copilot", "codex", "cursor", "zed",
    "claude-code", "open-code", "trae",
  ]),
  name: z.string(),
  icon: z.string(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  hosts: z.array(z.string()).min(1),
  port: z.number().int().positive().max(65535).default(443),
  endpointPatterns: z.array(z.string()).default([]),
  defaultModels: z.array(z.object({ id: z.string(), name: z.string(), alias: z.string() })).default([]),
  setupTutorial: z.object({
    steps: z.array(z.string()),
    detection: z.object({
      command: z.string(),
      platform: z.enum(["linux", "macos", "windows", "all"]),
    }),
  }),
  riskNoticeKey: z.string(),
  viability: z.enum(["investigating", "supported", "deprecated"]).optional(),
});

export type DetectionResult = {
  installed: boolean;
  version?: string;
  path?: string;
};
