export const FACTORY_API = "https://api.factory.ai";
export const FACTORY_CLIENT_VERSION = "0.224.1";
export const FACTORY_OPENAI_PLATFORM_ORG = "org-bHuLtG1fGmYk5YaOihAAXFBw";
export const ANTHROPIC_VERSION = "2023-06-01";
export const ANTHROPIC_BETAS =
  "interleaved-thinking-2025-05-14,fine-grained-tool-streaming-2025-05-14";
export const WORKOS_DEVICE_AUTHORIZE = "https://api.workos.com/user_management/authorize/device";
export const WORKOS_TOKEN = "https://api.workos.com/user_management/authenticate";
export const FACTORY_DEVICE_VERIFICATION_URL = "https://auth.factory.ai/device";
export const FACTORY_DOCS_MODELS_URL = "https://docs.factory.ai/models.md";

export const FACTORY_HEADERS = {
  "X-Factory-Client": "cli",
  "X-Client-Version": FACTORY_CLIENT_VERSION,
  "User-Agent": `factory-cli/${FACTORY_CLIENT_VERSION}`,
} as const;

export const FACTORY_DROID_SYSTEM_PROMPT =
  "You are Droid, an AI software engineering agent built by Factory.\n" +
  "You are operating as an autonomous engineering agent inside this coding harness.\n" +
  "EXECUTION DIRECTIVES:\n" +
  "1. Your primary objective is to autonomously execute the user's software engineering tasks directly using the provided tools.\n" +
  "2. Do not debate identity, environments, or tool availability. Focus exclusively on task execution.\n" +
  "3. Whenever a task involves inspecting files, exploring repositories, running commands, or modifying code, you MUST invoke the appropriate tools immediately on your first turn.\n" +
  "4. NEVER output conversational commentary, promises, or preambles of what you will do before calling tools (do NOT say 'I will inspect...', 'Let me read...', or 'I need to check...'). Call the tools directly.\n" +
  "5. Always ground all analysis, planning, and answers in actual file contents and tool outputs rather than assumptions.";

const HOSTED_FACTORY_HOSTNAME = /^api(\.[a-z0-9-]+)?\.factory\.ai$/i;
const SAFE_REGION_LABEL = /^[a-z0-9-]+$/i;

export type FactoryTargetFormat = "claude" | "gemini" | "openai-responses" | "openai";
export type FactoryUpstreamProvider =
  "anthropic" | "google" | "openai" | "xai" | "mistral" | "fireworks";
export type FactoryQuotaTier = "standard" | "core";

export type FactoryModelContract = {
  targetFormat: FactoryTargetFormat;
  path: string;
  upstreamProvider: FactoryUpstreamProvider;
  quotaTier: FactoryQuotaTier;
};

const MESSAGES_PATH = "/api/llm/a/v1/messages";
const GEMINI_PATH = "/api/llm/g/v1/generate";
const RESPONSES_PATH = "/api/llm/o/v1/responses";
const CHAT_PATH = "/api/llm/o/v1/chat/completions";

export function normalizeFactoryModelId(modelId: string): string {
  const trimmed = modelId.trim();
  return trimmed.startsWith("factory/") ? trimmed.slice("factory/".length) : trimmed;
}

export function validateHostedFactoryApiOrigin(urlLike: string): string {
  let parsed: URL;
  try {
    parsed = new URL(urlLike.trim());
  } catch {
    throw new Error("Invalid Factory API endpoint URL");
  }

  if (parsed.protocol !== "https:") {
    throw new Error("Factory API endpoint must use HTTPS");
  }
  if (parsed.username || parsed.password) {
    throw new Error("Factory API endpoint must not contain credentials");
  }
  if (parsed.search || parsed.hash) {
    throw new Error("Factory API endpoint must not contain query or fragment");
  }
  const pathname = parsed.pathname.replace(/\/+$/, "");
  if (pathname.length > 0) {
    throw new Error("Factory API endpoint must be an origin without a path prefix");
  }
  if (parsed.port) {
    throw new Error("Factory API endpoint must not use a custom port");
  }
  if (!HOSTED_FACTORY_HOSTNAME.test(parsed.hostname)) {
    throw new Error(
      `Factory API endpoint host ${parsed.hostname} is not an authorized Factory domain`
    );
  }
  return `https://${parsed.hostname.toLowerCase()}`;
}

export function factoryApiForRegion(region: string | undefined): string {
  if (!region || region === "global") {
    return FACTORY_API;
  }

  const trimmed = region.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return validateHostedFactoryApiOrigin(trimmed);
  }

  const lower = trimmed.toLowerCase();
  if (lower === "eu" || lower === "europe") {
    return "https://api.eu.factory.ai";
  }
  if (!SAFE_REGION_LABEL.test(trimmed)) {
    throw new Error(`Invalid Factory region identifier: ${trimmed}`);
  }
  return validateHostedFactoryApiOrigin(`https://api.${lower}.factory.ai`);
}

function firstNonemptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

export function resolveFactoryApiBase(
  providerSpecificData?: Record<string, unknown> | null
): string {
  const envOverride = process.env.FACTORY_API_BASE?.trim().replace(/\/+$/, "");
  if (envOverride) {
    return validateHostedFactoryApiOrigin(envOverride);
  }

  const apiEndpoint = firstNonemptyString(
    providerSpecificData?.apiEndpoint,
    providerSpecificData?.api_endpoint
  );
  if (apiEndpoint) {
    return validateHostedFactoryApiOrigin(apiEndpoint);
  }

  const region = firstNonemptyString(providerSpecificData?.region);
  if (region) {
    return factoryApiForRegion(region);
  }

  return FACTORY_API;
}

export function resolveFactoryModelContract(modelId: string): FactoryModelContract | null {
  const id = normalizeFactoryModelId(modelId);
  if (!id) return null;

  if (id.startsWith("claude-") || id.startsWith("atlas-") || id.startsWith("aster-")) {
    return {
      targetFormat: "claude",
      path: MESSAGES_PATH,
      upstreamProvider: "anthropic",
      quotaTier: "standard",
    };
  }

  if (id.startsWith("minimax-")) {
    return {
      targetFormat: "claude",
      path: MESSAGES_PATH,
      upstreamProvider: "fireworks",
      quotaTier: "core",
    };
  }

  if (id.startsWith("gemini-") || id.startsWith("garnet-")) {
    return {
      targetFormat: "gemini",
      path: GEMINI_PATH,
      upstreamProvider: "google",
      quotaTier: "standard",
    };
  }

  if (id.startsWith("gpt-") || id.startsWith("gpt6") || id.endsWith("-codex")) {
    return {
      targetFormat: "openai-responses",
      path: RESPONSES_PATH,
      upstreamProvider: "openai",
      quotaTier: "standard",
    };
  }

  if (id.startsWith("grok-")) {
    return {
      targetFormat: "openai-responses",
      path: RESPONSES_PATH,
      upstreamProvider: "xai",
      quotaTier: "standard",
    };
  }

  if (id.startsWith("mistral-")) {
    return {
      targetFormat: "openai",
      path: CHAT_PATH,
      upstreamProvider: "mistral",
      quotaTier: "core",
    };
  }

  if (
    id.startsWith("glm-") ||
    id.startsWith("kimi-") ||
    id.startsWith("deepseek-") ||
    id.startsWith("nemotron-") ||
    id.startsWith("qwen") ||
    id === "inkling" ||
    id.startsWith("inkling-")
  ) {
    return {
      targetFormat: "openai",
      path: CHAT_PATH,
      upstreamProvider: "fireworks",
      quotaTier: "core",
    };
  }

  return null;
}

export function factoryQuotaTierFor(modelId: string | null | undefined): FactoryQuotaTier | null {
  if (!modelId) return null;
  return resolveFactoryModelContract(modelId)?.quotaTier ?? null;
}
