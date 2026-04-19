import { skillRegistry } from "./registry";
import { Skill } from "./types";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("SKILLS_INJECTION");

interface OpenAITool {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

interface ClaudeTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

interface GeminiTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

function skillToOpenAI(skill: Skill): OpenAITool {
  return {
    type: "function",
    function: {
      name: `${skill.name}@${skill.version}`,
      description: skill.description,
      parameters: skill.schema.input,
    },
  };
}

function skillToClaude(skill: Skill): ClaudeTool {
  return {
    name: `${skill.name}@${skill.version}`,
    description: skill.description,
    input_schema: skill.schema.input,
  };
}

function skillToGemini(skill: Skill): GeminiTool {
  return {
    name: `${skill.name}@${skill.version}`,
    description: skill.description,
    parameters: skill.schema.input,
  };
}

export interface InjectionOptions {
  provider: "openai" | "anthropic" | "google" | "other";
  existingTools?: unknown[];
  apiKeyId: string;
  model?: string;
  sourceFormat?: string;
  targetFormat?: string;
  backgroundReason?: string | null;
  messages?: unknown[];
}

const AUTO_MIN_SCORE = 3;
const AUTO_MAX_SKILLS = 5;
const TOKEN_MIN_LEN = 3;

function toLowerText(value: unknown): string {
  if (typeof value === "string") return value.toLowerCase();
  return "";
}

function extractTokens(value: string): Set<string> {
  const matches = value.toLowerCase().match(/[a-z0-9]+/g) || [];
  return new Set(matches.filter((t) => t.length >= TOKEN_MIN_LEN));
}

function splitNameTokens(name: string): Set<string> {
  const expandedCamel = name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[._@\-/]+/g, " ")
    .toLowerCase();
  return extractTokens(expandedCamel);
}

function extractMessageText(messages: unknown[]): string {
  const chunks: string[] = [];
  for (const message of messages) {
    if (!message || typeof message !== "object") continue;
    const record = message as Record<string, unknown>;
    const content = record.content;

    if (typeof content === "string") {
      chunks.push(content);
      continue;
    }

    if (Array.isArray(content)) {
      for (const item of content) {
        if (typeof item === "string") {
          chunks.push(item);
          continue;
        }
        if (item && typeof item === "object") {
          const itemRecord = item as Record<string, unknown>;
          if (typeof itemRecord.text === "string") {
            chunks.push(itemRecord.text);
          }
        }
      }
    }
  }

  return chunks.join(" ").toLowerCase();
}

function buildContextText(options: InjectionOptions): string {
  const parts = [
    JSON.stringify(options.existingTools || []).toLowerCase(),
    toLowerText(options.model),
    toLowerText(options.sourceFormat),
    toLowerText(options.targetFormat),
    toLowerText(options.backgroundReason),
  ];

  if (Array.isArray(options.messages) && options.messages.length > 0) {
    parts.push(extractMessageText(options.messages));
  }

  return parts.filter(Boolean).join(" ");
}

function scoreAutoSkill(
  skill: Skill,
  options: InjectionOptions,
  contextText: string,
  contextTokens: Set<string>,
  backgroundTokens: Set<string>
): number {
  const name = skill.name.toLowerCase();
  const tags = (Array.isArray(skill.tags) ? skill.tags : []).map((tag) =>
    String(tag).toLowerCase()
  );
  const description = toLowerText(skill.description);

  const nameTokens = splitNameTokens(skill.name);
  const descriptionTokens = extractTokens(description);

  let score = 0;

  if (name && contextText.includes(name)) {
    score += 6;
  }

  for (const token of nameTokens) {
    if (contextTokens.has(token)) score += 2;
  }

  for (const tag of tags) {
    if (!tag) continue;
    if (contextText.includes(tag)) {
      score += 3;
    }
  }

  for (const token of descriptionTokens) {
    if (contextTokens.has(token)) score += 1;
  }

  if (backgroundTokens.size > 0) {
    for (const token of backgroundTokens) {
      if (nameTokens.has(token)) score += 2;
      if (tags.some((tag) => tag.includes(token) || token.includes(tag))) score += 2;
    }
  }

  const providerAliases: Record<InjectionOptions["provider"], string[]> = {
    openai: ["openai", "gpt"],
    anthropic: ["anthropic", "claude"],
    google: ["google", "gemini"],
    other: [],
  };
  const knownProviderHints = new Set(["openai", "gpt", "anthropic", "claude", "google", "gemini"]);

  const skillProviderHints = tags.filter((tag) => knownProviderHints.has(tag));
  if (skillProviderHints.length > 0) {
    const aliases = providerAliases[options.provider];
    const hasProviderMatch = skillProviderHints.some((hint) => aliases.includes(hint));
    if (hasProviderMatch) {
      score += 2;
    } else {
      score -= 2;
    }
  }

  return score;
}

export function injectSkills(options: InjectionOptions): unknown[] {
  const contextText = buildContextText(options);
  const contextTokens = extractTokens(contextText);
  const backgroundTokens = extractTokens(toLowerText(options.backgroundReason));
  const selectedSkills = skillRegistry.list(options.apiKeyId).filter((s) => {
    const mode = s.mode || (s.enabled ? "on" : "off");
    if (mode === "off") return false;
    return s.enabled;
  });

  const alwaysOnSkills = selectedSkills.filter((s) => {
    const mode = s.mode || (s.enabled ? "on" : "off");
    return mode === "on";
  });

  const autoCandidates = selectedSkills.filter((s) => {
    const mode = s.mode || (s.enabled ? "on" : "off");
    return mode === "auto";
  });

  const autoSkills = autoCandidates
    .map((skill) => ({
      skill,
      score: scoreAutoSkill(skill, options, contextText, contextTokens, backgroundTokens),
    }))
    .filter((entry) => entry.score >= AUTO_MIN_SCORE)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const installA = typeof a.skill.installCount === "number" ? a.skill.installCount : 0;
      const installB = typeof b.skill.installCount === "number" ? b.skill.installCount : 0;
      if (installB !== installA) return installB - installA;
      return a.skill.name.localeCompare(b.skill.name);
    })
    .slice(0, AUTO_MAX_SKILLS)
    .map((entry) => entry.skill);

  const skills = [...alwaysOnSkills, ...autoSkills];

  if (skills.length === 0) {
    log.info("skills.injection.skipped", {
      apiKeyId: options.apiKeyId,
      reason: "no_enabled_skills",
    });
    return options.existingTools || [];
  }

  log.info("skills.injection.injected", {
    apiKeyId: options.apiKeyId,
    provider: options.provider,
    skillCount: skills.length,
  });

  const injectedTools = skills.map((skill) => {
    switch (options.provider) {
      case "openai":
        return skillToOpenAI(skill);
      case "anthropic":
        return skillToClaude(skill);
      case "google":
        return skillToGemini(skill);
      default:
        return skillToOpenAI(skill);
    }
  });

  if (options.existingTools && options.existingTools.length > 0) {
    return [...injectedTools, ...options.existingTools];
  }

  return injectedTools;
}

export function injectSkillTools(
  messages: any[],
  provider: "openai" | "anthropic" | "google" | "other",
  apiKeyId: string
): any[] {
  const tools = injectSkills({ provider, apiKeyId });

  if (tools.length === 0) {
    return messages;
  }

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.role === "user" && !lastMessage.tools) {
    return [...messages.slice(0, -1), { ...lastMessage, tools }];
  }

  return messages;
}

export function detectProvider(modelId: string): "openai" | "anthropic" | "google" | "other" {
  const lower = modelId.toLowerCase();

  if (lower.includes("gpt") || lower.includes("openai")) {
    return "openai";
  }
  if (lower.includes("claude") || lower.includes("anthropic")) {
    return "anthropic";
  }
  if (lower.includes("gemini") || lower.includes("google")) {
    return "google";
  }

  return "other";
}
