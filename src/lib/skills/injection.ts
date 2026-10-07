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

// Provider tool/function names must match ^[a-zA-Z0-9_-]+$ (OpenAI, DeepSeek,
// Groq, etc.). Skill identifiers are name@version (and names may contain any
// characters), so encode identifiers that would violate the pattern into a
// reversible base64url form. decodeSkillToolName() must be applied on the way
// back in interception before resolving against the registry.
const SKILL_TOOL_NAME_PREFIX = "omr_skill_";

export function encodeSkillToolName(name: string, version: string): string {
  const identifier = `${name}@${version}`;
  if (/^[a-zA-Z0-9_-]+$/.test(identifier)) {
    return identifier;
  }
  return `${SKILL_TOOL_NAME_PREFIX}${Buffer.from(identifier, "utf8").toString("base64url")}`;
}

export function decodeSkillToolName(toolName: string): string {
  if (!toolName.startsWith(SKILL_TOOL_NAME_PREFIX)) {
    return toolName;
  }
  try {
    return Buffer.from(toolName.slice(SKILL_TOOL_NAME_PREFIX.length), "base64url").toString("utf8");
  } catch {
    return toolName;
  }
}

// Depth guard mirroring open-sse/services/toolSchemaSanitizer.ts's
// MAX_RECURSION_DEPTH, so a pathological/cyclic-looking nested schema
// submitted by a custom skill (POST /api/skills accepts any z.record shape)
// cannot blow the stack.
const MAX_SCHEMA_REPAIR_DEPTH = 32;

// JSON Schema primitive type names, used by the #14288 shorthand expansion
// outside schema maps: a bare-map value is only treated as shorthand when it
// names one of these, so string keywords on schema nodes stay untouched.
const PRIMITIVE_TYPE_NAMES = new Set([
  "string",
  "number",
  "integer",
  "boolean",
  "object",
  "array",
  "null",
]);

// JSON Schema keywords whose *value* is itself a schema node/map, not a
// user-declared property — recursing into their children must not treat the
// container itself as a "bare property map" candidate. Mirrors
// open-sse/translator/helpers/geminiHelper.ts's SCHEMA_MAP_KEYS for the
// Gemini-only normalizeMalformedSchemaObjects this mirrors (#12269).
const SCHEMA_MAP_KEYS = new Set(["properties", "$defs", "definitions", "patternProperties"]);

const SCHEMA_NODE_KEYS = new Set([
  "additionalProperties",
  "additionalItems",
  "contains",
  "default",
  "dependencies",
  "discriminator",
  "else",
  "example",
  "examples",
  "if",
  "patternProperties",
  "propertyNames",
  "then",
]);

function isSchemaNode(record: Record<string, unknown>): boolean {
  if (Object.keys(record).some((key) => key.startsWith("x-") || SCHEMA_NODE_KEYS.has(key))) {
    return true;
  }
  if (typeof record.type === "string" || Array.isArray(record.type)) return true;
  if (record.properties !== undefined || Array.isArray(record.required)) return true;
  if (record.items !== undefined) return true;
  if (record.anyOf !== undefined || record.oneOf !== undefined || record.allOf !== undefined) {
    return true;
  }
  return record.$ref !== undefined || record.enum !== undefined || record.const !== undefined;
}

function isBarePropertyMap(record: Record<string, unknown>): boolean {
  const keys = Object.keys(record);
  if (keys.length === 0 || isSchemaNode(record)) return false;
  return keys.every((key) => {
    const value = record[key];
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  });
}

// Strips a scalar (non-array) `required` off every property of `record` and,
// only when it was `true`, promotes the property's key onto the parent
// schema's own `required` array (created if absent, deduped if present).
function promoteBooleanRequired(record: Record<string, unknown>): void {
  const properties = record.properties;
  if (!properties || typeof properties !== "object" || Array.isArray(properties)) return;

  const required = Array.isArray(record.required)
    ? record.required.filter((field): field is string => typeof field === "string")
    : [];

  for (const [name, schema] of Object.entries(properties as Record<string, unknown>)) {
    if (!schema || typeof schema !== "object" || Array.isArray(schema)) continue;
    const child = schema as Record<string, unknown>;
    if (child.required === true && !required.includes(name)) {
      required.push(name);
    }
    if ("required" in child && !Array.isArray(child.required)) {
      delete child.required;
    }
  }

  if (required.length > 0) {
    record.required = required;
  } else if (!Array.isArray(record.required)) {
    delete record.required;
  }
}

// Repairs the two malformed-schema shapes strict JSON Schema validators
// (agnes/nvidia/DeepSeek and other OpenAI-compatible upstreams) reject,
// recursing into every nested level of a skill's declared input schema —
// not just the root map #11881 already handled:
//   1. A bare property map with no `type`/`properties` wrapper (e.g.
//      `{ opts: { limit: { type: "number" } } }`) is lifted into
//      `{ type: "object", properties: {...} }`, bottom-up so nested bare
//      maps are fixed before their parent is inspected.
//   2. A scalar `required: true` on a property is stripped and promoted onto
//      the parent's `required` array instead.
// Mirrors open-sse/translator/helpers/geminiHelper.ts's
// normalizeMalformedSchemaObjects (itself modeled on CLIProxyAPI's function
// of the same name), which already does this for the Gemini/Antigravity
// request-translation path (#12269) — this is the skill-injection-path
// equivalent, additive and independent from that implementation.
function repairMalformedSchema(node: unknown, parentKey?: string, depth = 0): void {
  if (!node || typeof node !== "object" || depth > MAX_SCHEMA_REPAIR_DEPTH) return;

  if (Array.isArray(node)) {
    for (const item of node) {
      repairMalformedSchema(item, parentKey, depth + 1);
    }
    return;
  }

  const record = node as Record<string, unknown>;

  // #14288: expand string-shorthand property values ("topic": "string") into
  // proper schema nodes ({ type: "string" }) at every schema-map level
  // (properties/patternProperties/definitions/$defs) and inside bare property
  // maps before they get lifted, not just at the root (#11881). Strict
  // validators (DeepSeek behind opencode-go) reject a raw string where a
  // schema object is required:
  //   Invalid schema for function 'omr_skill_...': "string" is not of types
  //   "boolean", "object"
  // Direct entries of a schema map are property definitions, so any
  // non-empty string there is shorthand. Elsewhere (e.g. a bare map mixing
  // shorthand and real schema nodes) only expand strings naming a JSON
  // Schema primitive type, so keyword-only records like { title: "foo" } or
  // { description: "..." } are never mistaken for property maps.
  const expandAll = parentKey !== undefined && SCHEMA_MAP_KEYS.has(parentKey);
  const expandTyped = parentKey !== undefined && !isSchemaNode(record);
  if (expandAll || expandTyped) {
    for (const [key, value] of Object.entries(record)) {
      if (typeof value === "string" && value.length > 0) {
        if (expandAll || PRIMITIVE_TYPE_NAMES.has(value)) {
          record[key] = { type: value };
        }
      }
    }
  }

  for (const [key, value] of Object.entries(record)) {
    if (value && typeof value === "object") {
      repairMalformedSchema(value, key, depth + 1);
    }
  }

  if (parentKey === undefined || !SCHEMA_MAP_KEYS.has(parentKey)) {
    if (isBarePropertyMap(record)) {
      const props = { ...record };
      for (const key of Object.keys(record)) {
        delete record[key];
      }
      record.type = "object";
      record.properties = props;
    }
  }

  promoteBooleanRequired(record);
}

// Skills store a flat JSON Schema record ({ "text": { "type": "string" } }),
// but Gemini (function_declarations[].parameters) and Anthropic
// (input_schema) require a full object schema with a properties wrapper.
// Normalize to { "type": "object", "properties": {...} } when the stored
// schema is a bare property map.
function normalizeInputSchema(input: Record<string, unknown>): Record<string, unknown> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return input ?? {};
  }

  let root: Record<string, unknown>;
  if (typeof input.type === "string") {
    // Already a full object schema (#11881's root case doesn't apply) — but
    // it may still carry the deeper #13022 malformations (nested bare
    // property maps, per-property boolean `required`) inside `properties`,
    // so still recurse; just skip the root-level string-shorthand expansion.
    root = { ...input };
  } else {
    // Some builtin skills declare property types in shorthand ("content":
    // "string" instead of "content": { "type": "string" }). Strict schema
    // validators — Zhipu GLM served through opencode-go (upstream error [1210]
    // "Invalid API parameter") — reject the shorthand as malformed JSON Schema,
    // which 400s every request the skill tools are injected into. Expand string
    // values to { type: value }; non-string values pass through untouched.
    const properties: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      properties[key] = typeof value === "string" ? { type: value } : value;
    }
    root = { type: "object", properties };
  }

  repairMalformedSchema(root);
  return root;
}

function skillToOpenAI(skill: Skill): OpenAITool {
  return {
    type: "function",
    function: {
      name: encodeSkillToolName(skill.name, skill.version),
      description: skill.description,
      parameters: normalizeInputSchema(skill.schema.input),
    },
  };
}

function skillToClaude(skill: Skill): ClaudeTool {
  return {
    name: encodeSkillToolName(skill.name, skill.version),
    description: skill.description,
    input_schema: normalizeInputSchema(skill.schema.input),
  };
}

function skillToGemini(skill: Skill): GeminiTool {
  return {
    name: encodeSkillToolName(skill.name, skill.version),
    description: skill.description,
    parameters: normalizeInputSchema(skill.schema.input),
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
  const matches: string[] = value.toLowerCase().match(/[a-z0-9]+/g) ?? [];
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
  return injectSkillsWithMetadata(options).tools;
}

export interface InjectSkillsWithMetadataResult {
  tools: unknown[];
  injectedNames: string[];
}

function getToolNameFromDef(tool: unknown): string {
  if (!tool || typeof tool !== "object") return "";
  const r = tool as Record<string, unknown>;
  if (typeof r.name === "string") return r.name;
  if (r.function && typeof r.function === "object") {
    const fn = r.function as Record<string, unknown>;
    if (typeof fn.name === "string") return fn.name;
  }
  return "";
}

export function injectSkillsWithMetadata(
  options: InjectionOptions
): InjectSkillsWithMetadataResult {
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
    return { tools: options.existingTools || [], injectedNames: [] };
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

  // Compute the set of existing tool names to exclude client collisions.
  const existingToolNames = new Set(
    (options.existingTools || []).map((t) => getToolNameFromDef(t)).filter(Boolean)
  );

  // Filter out skills whose encoded name collides with a client-declared tool.
  const nonCollidingTools = injectedTools.filter((tool) => {
    const name = getToolNameFromDef(tool);
    return name && !existingToolNames.has(name);
  });

  const injectedNames: string[] = [];
  for (const tool of nonCollidingTools) {
    const name = getToolNameFromDef(tool);
    if (name) {
      injectedNames.push(name);
    }
  }

  if (options.existingTools && options.existingTools.length > 0) {
    return { tools: [...nonCollidingTools, ...options.existingTools], injectedNames };
  }

  return { tools: nonCollidingTools, injectedNames };
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
