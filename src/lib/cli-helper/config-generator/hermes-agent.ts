/**
 * Hermes Agent — Rich multi-role config generator & saver
 *
 * This is the implementation for the advanced "Hermes Agent" (Nous Research terminal agent).
 * It is treated completely separately from the original simple "Hermes" guide tool.
 *
 * Hermes Agent supports many independent model slots:
 *   - default (main conversation)
 *   - delegation (sub-agent orchestrator)
 *   - auxiliary.* (vision, compression, web_extract, skills_hub, approval, ...)
 *
 * The UI (HermesAgentToolCard) will offer a dropdown for EACH of these roles.
 *
 * Data Model (what the frontend sends and this module consumes):
 *
 * interface HermesAgentRoleSelection {
 *   role: 'default' | 'delegation' | 'vision' | 'compression' | 'web_extract' | 'skills_hub' | 'approval' | ...;
 *   model: string;                    // the model name the user chose from OmniRoute
 * }
 *
 * interface HermesAgentConfigPayload {
 *   baseUrl: string;                  // usually the OmniRoute base URL
 *   keyId?: string | null;            // preferred: reference to a stored key
 *   apiKey?: string | null;           // fallback plaintext key
 *   selections: HermesAgentRoleSelection[];
 * }
 */

import path from "node:path";
import os from "node:os";
import * as yaml from "js-yaml";

export const HERMES_AGENT_ROLES = [
  { id: "default", label: "Default (main)", description: "Primary conversation model" },
  {
    id: "delegation",
    label: "Delegation (subagents)",
    description: "Orchestrator and sub-agent spawning model",
  },
  { id: "vision", label: "Vision", description: "Image and screenshot understanding" },
  { id: "compression", label: "Compression", description: "Prompt compression and summarization" },
  { id: "web_extract", label: "Web Extract", description: "Web page / content extraction" },
  { id: "skills_hub", label: "Skills Hub", description: "Skills and tool-use reasoning" },
  { id: "approval", label: "Approval", description: "Safety and approval decisions" },
] as const;

export type HermesAgentRole = (typeof HERMES_AGENT_ROLES)[number]["id"];

export interface HermesAgentRoleSelection {
  role: HermesAgentRole;
  model: string;
}

export interface HermesAgentConfigPayload {
  baseUrl: string;
  keyId?: string | null;
  apiKey?: string | null;
  selections: HermesAgentRoleSelection[];
}

const CONFIG_PATH = path.join(os.homedir(), ".hermes", "config.yaml");

// Build a normalized base URL for Hermes (no trailing slash, no /v1 suffix on the provider entry)
function normalizeBaseUrl(base: string): string {
  let b = base.trim();
  while (b.endsWith("/")) b = b.slice(0, -1);
  if (b.endsWith("/v1")) b = b.slice(0, -3);
  return b;
}

function getProviderBlock(baseUrl: string, apiKey: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  return {
    provider: "omniroute",
    model: "", // will be filled per-role
    base_url: `${normalized}/v1`,
    api_key: apiKey,
  };
}

/**
 * Generate the full merged YAML for Hermes Agent config.
 * This is the core of the rich implementation.
 */
export async function generateHermesAgentConfig(
  payload: HermesAgentConfigPayload
): Promise<{ yaml: string; error?: string }> {
  const { baseUrl, keyId, apiKey, selections } = payload;

  if (!baseUrl) {
    return { yaml: "", error: "baseUrl is required" };
  }

  // Resolve the actual key to use (in real impl we would look up keyId)
  const resolvedKey = apiKey || "YOUR_OMNIROUTE_API_KEY_HERE";

  // Read existing config if present (non-destructive merge)
  let existing: any = {};
  try {
    const fs = await import("node:fs/promises");
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    existing = yaml.load(raw) || {};
  } catch {
    // no existing file — start fresh
  }

  // Build the providers.omniroute entry (shared)
  const normalizedBase = normalizeBaseUrl(baseUrl);
  const omnirouteProvider = {
    base_url: `${normalizedBase}/v1`,
    api_key: resolvedKey,
  };

  // Start from existing or empty
  const next: any = {
    ...existing,
    providers: {
      ...(existing.providers || {}),
      omniroute: omnirouteProvider,
    },
  };

  // Apply each role selection
  for (const sel of selections) {
    const { role, model } = sel;

    if (role === "default") {
      next.model = {
        ...(existing.model || {}),
        default: model,
        provider: "omniroute",
        base_url: `${normalizedBase}/v1`,
      };
    } else if (role === "delegation") {
      next.delegation = {
        ...(existing.delegation || {}),
        model,
        provider: "omniroute",
        base_url: `${normalizedBase}/v1`,
        api_key: resolvedKey,
      };
    } else {
      // auxiliary.* roles
      if (!next.auxiliary) next.auxiliary = {};
      next.auxiliary[role] = {
        ...(existing.auxiliary?.[role] || {}),
        provider: "omniroute",
        model,
        base_url: `${normalizedBase}/v1`,
        api_key: resolvedKey,
      };
    }
  }

  const outputYaml = yaml.dump(next, { lineWidth: -1, noRefs: true });
  return { yaml: outputYaml };
}

/**
 * Read the current Hermes Agent configuration and extract the model
 * for each supported role.
 */
export async function getCurrentHermesAgentRoles(): Promise<
  Record<string, { model: string; provider?: string; base_url?: string }>
> {
  const fs = await import("node:fs/promises");
  let config: any = {};

  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    config = yaml.load(raw) || {};
  } catch {
    return {};
  }

  const result: Record<string, any> = {};

  // default
  if (config.model?.default) {
    result.default = {
      model: config.model.default,
      provider: config.model.provider,
      base_url: config.model.base_url,
    };
  }

  // delegation
  if (config.delegation?.model) {
    result.delegation = {
      model: config.delegation.model,
      provider: config.delegation.provider,
      base_url: config.delegation.base_url,
    };
  }

  // auxiliary roles
  if (config.auxiliary && typeof config.auxiliary === "object") {
    for (const [role, val] of Object.entries(config.auxiliary)) {
      if (val && typeof val === "object" && (val as any).model) {
        result[role] = {
          model: (val as any).model,
          provider: (val as any).provider,
          base_url: (val as any).base_url,
        };
      }
    }
  }

  return result;
}
