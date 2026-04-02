import { skillRegistry } from "./registry";
import { Skill } from "./types";

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
}

export function injectSkills(options: InjectionOptions): unknown[] {
  const skills = skillRegistry.list(options.apiKeyId).filter((s) => s.enabled);

  if (skills.length === 0) {
    return options.existingTools || [];
  }

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
