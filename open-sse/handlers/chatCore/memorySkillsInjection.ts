import { retrieveMemories } from "@/lib/memory/retrieval";
import {
  getMemorySettings,
  DEFAULT_MEMORY_SETTINGS,
  toMemoryRetrievalConfig,
} from "@/lib/memory/settings";
import { injectMemory, shouldInjectMemory } from "@/lib/memory/injection";
import { injectSkillsWithMetadata } from "@/lib/skills/injection";
import { buildMemoryToolsForProvider } from "@/lib/skills/memoryBuiltins";
import { skillRegistry } from "@/lib/skills/registry";
import { FORMATS } from "../../translator/formats.ts";
import { detectCachingContext } from "../../services/compression/cachingAware.ts";

type MemorySkillsLogger = { debug?: (...args: unknown[]) => void } | null | undefined;

export interface MemorySkillsInjectionResult {
  body: Record<string, unknown>;
  memorySettings: { enabled: boolean; skillsEnabled: boolean; maxTokens: number } | null;
  builtinToolNames: string[];
  injectedCustomSkillNames: string[];
}

function getToolName(tool: unknown): string {
  if (!tool || typeof tool !== "object") return "";
  const r = tool as Record<string, unknown>;
  if (typeof r.name === "string") return r.name;
  if (r.function && typeof r.function === "object") {
    const fn = r.function as Record<string, unknown>;
    if (typeof fn.name === "string") return fn.name;
  }
  return "";
}

export function sortToolsByName<T>(tools: T[]): T[] {
  if (!Array.isArray(tools) || tools.length <= 1) return tools;
  return [...tools].sort((a, b) => getToolName(a).localeCompare(getToolName(b)));
}

export function getSkillsProviderForFormat(
  format: string
): "openai" | "anthropic" | "google" | "other" {
  switch (format) {
    case FORMATS.CLAUDE:
      return "anthropic";
    case FORMATS.GEMINI:
      return "google";
    default:
      return "openai";
  }
}

export async function injectMemoryAndSkills({
  body,
  memoryOwnerId,
  provider,
  effectiveModel,
  sourceFormat,
  targetFormat,
  backgroundReason,
  log,
}: {
  body: Record<string, unknown>;
  memoryOwnerId: string | null;
  provider: string;
  effectiveModel: string;
  sourceFormat: string;
  targetFormat: string;
  backgroundReason: string | null;
  log: MemorySkillsLogger;
}): Promise<MemorySkillsInjectionResult> {
  const memorySettings = memoryOwnerId
    ? await getMemorySettings().catch(() => DEFAULT_MEMORY_SETTINGS)
    : null;

  const builtinOwnerSet: string[] = [];
  const injectedCustomSkillNames: string[] = [];

  if (
    memoryOwnerId &&
    memorySettings &&
    shouldInjectMemory(body as Parameters<typeof shouldInjectMemory>[0], {
      enabled: memorySettings.enabled && memorySettings.maxTokens > 0,
    })
  ) {
    try {
      const lastUserQuery = ((): string => {
        const NON_USER_TYPES = new Set([
          "function_call",
          "function_call_output",
          "tool_call",
          "tool_call_output",
          "reasoning",
          "computer_call",
          "computer_call_output",
          "web_search_call",
          "file_search_call",
        ]);

        function pickFrom(arr: unknown[]): string {
          for (let i = arr.length - 1; i >= 0; i--) {
            const item = arr[i] as Record<string, unknown> | undefined;
            if (!item) continue;
            if (item.role !== undefined && item.role !== "user") continue;
            if (item.role === undefined && typeof item.type === "string") {
              if (NON_USER_TYPES.has(item.type)) continue;
            }
            const content = item.content ?? item.text;
            if (typeof content === "string" && content.trim().length > 0) {
              return content;
            }
            if (Array.isArray(content)) {
              const parts: string[] = [];
              for (const p of content) {
                if (typeof p === "string") {
                  parts.push(p);
                } else if (p && typeof p === "object") {
                  const pp = p as Record<string, unknown>;
                  const ptype = typeof pp.type === "string" ? pp.type : "";
                  if (
                    ptype &&
                    ptype !== "text" &&
                    ptype !== "input_text" &&
                    ptype !== "output_text"
                  ) {
                    continue;
                  }
                  const t = pp.text ?? pp.input_text;
                  if (typeof t === "string") parts.push(t);
                }
              }
              if (parts.length > 0) return parts.join(" ").trim();
            }
          }
          return "";
        }

        if (Array.isArray(body.messages)) {
          const r = pickFrom(body.messages);
          if (r) return r;
        }
        if (Array.isArray(body.input)) {
          const r = pickFrom(body.input);
          if (r) return r;
        }
        return "";
      })();

      const memories = await retrieveMemories(
        memoryOwnerId,
        toMemoryRetrievalConfig(memorySettings, { query: lastUserQuery })
      );
      if (memories.length > 0) {
        // #3890: when the client uses prompt caching (cache_control breakpoints), inject
        // memory cache-safely (before the last user message) so the per-query memory text
        // does not poison the cacheable prefix and force a cache miss on every turn.
        const cacheSafe = detectCachingContext(body, { provider, targetFormat }).hasCacheControl;
        const injected = injectMemory(
          body as Parameters<typeof injectMemory>[0],
          memories,
          provider,
          { cacheSafe }
        );
        body = injected as typeof body;
        log?.debug?.("MEMORY", `Injected ${memories.length} memories for key=${memoryOwnerId}`);
      }
    } catch (memErr) {
      log?.debug?.(
        "MEMORY",
        `Memory injection skipped: ${memErr instanceof Error ? memErr.message : String(memErr)}`
      );
    }
  }

  if (memoryOwnerId && memorySettings?.enabled && body.stream !== true) {
    // Server-side builtin memory tools (memory_save/update/search/delete) are
    // executed by the gateway's tool-call interception, which runs only on the
    // non-stream path. Stream clients (opencode etc.) execute tools client-side,
    // so for them these tools would be announced but never executed; they should
    // use the MCP memory tools (omniroute_memory_*) instead.
    const existingTools = Array.isArray(body.tools) ? body.tools : [];
    const existingToolNames = new Set(
      existingTools.flatMap((tool) => {
        const record = tool as Record<string, unknown> | null;
        if (!record || typeof record !== "object") return [];
        const fn = record.function as Record<string, unknown> | undefined;
        if (typeof fn?.name === "string") return [fn.name];
        if (typeof record.name === "string") return [record.name];
        return [];
      })
    );
    const newMemoryTools = buildMemoryToolsForProvider(
      getSkillsProviderForFormat(sourceFormat)
    ).filter((tool) => {
      const record = tool as Record<string, unknown>;
      const name = (record.function as Record<string, unknown> | undefined)?.name ?? record.name;
      return typeof name === "string" && !existingToolNames.has(name);
    });
    if (newMemoryTools.length > 0) {
      body = {
        ...body,
        tools: [...existingTools, ...newMemoryTools],
      };
      // Track the names of newly injected memory tools for the owner set.
      builtinOwnerSet.push(
        ...newMemoryTools
          .map((tool) => {
            const record = tool as Record<string, unknown>;
            const name =
              (record.function as Record<string, unknown> | undefined)?.name ?? record.name;
            return typeof name === "string" ? name : "";
          })
          .filter(Boolean)
      );
      log?.debug?.(
        "MEMORY",
        `Injected ${newMemoryTools.length} memory tool(s) for key=${memoryOwnerId}`
      );
    }
  }

  if (memoryOwnerId && memorySettings?.skillsEnabled && body.stream !== true) {
    // Ensure the registry cache is warm before listing: on a cold/fresh
    // process skills that exist only in the DB would be missed (false
    // negative -> silent skip). loadFromDatabase() is a no-op when the cache
    // is already warm (TTL = 60 s), so repeated calls are cheap. Mirrors the
    // pattern in src/lib/skills/interception.ts (#2815).
    // Memory builtins and registered Skills are only executed by the
    // non-streaming server-owned tool loop; stream clients execute tools
    // client-side, so we skip injection for stream requests.
    await skillRegistry.loadFromDatabase(memoryOwnerId);
    const existingTools = Array.isArray(body.tools) ? body.tools : [];
    const { tools: mergedTools, injectedNames } = injectSkillsWithMetadata({
      provider: getSkillsProviderForFormat(sourceFormat),
      existingTools,
      apiKeyId: memoryOwnerId,
      model: typeof effectiveModel === "string" ? effectiveModel : undefined,
      sourceFormat,
      targetFormat,
      backgroundReason,
      messages: Array.isArray(body.messages)
        ? body.messages
        : Array.isArray(body.input)
          ? body.input
          : undefined,
    });

    if (mergedTools.length > existingTools.length) {
      body = {
        ...body,
        tools: mergedTools,
      };
      injectedCustomSkillNames.push(...injectedNames);
      log?.debug?.("SKILLS", `Injected ${mergedTools.length - existingTools.length} skills`);
    }
  }

  if (Array.isArray(body.tools) && body.tools.length > 1) {
    body = {
      ...body,
      tools: sortToolsByName(body.tools),
    };
  }

  return { body, memorySettings, builtinToolNames: builtinOwnerSet, injectedCustomSkillNames };
}

interface FallbackPlan {
  enabled: boolean;
  toolName: string | null;
  convertedToolCount: number;
}

/**
 * Pure helper: merge web-search/web-fetch fallback tool names into the
 * builtin owner set. Adds a name only when plan.enabled===true,
 * plan.convertedToolCount>0, plan.toolName is non-null, and that name
 * did not already exist in the pre-conversion client tools (builtinToolNames)
 * OR in the original client tool names captured before fallback injection.
 * Does not mutate its input; returns a new result.
 */
export function mergeInjectedFallbackOwnerNames(
  injectionResult: { builtinToolNames: string[] },
  plans: FallbackPlan[],
  preConversionClientToolNames?: string[]
): { builtinToolNames: string[] } {
  const existing = new Set(injectionResult.builtinToolNames);
  if (preConversionClientToolNames) {
    for (const name of preConversionClientToolNames) {
      existing.add(name);
    }
  }
  const extraNames: string[] = [];
  for (const plan of plans) {
    if (
      plan.enabled &&
      plan.convertedToolCount > 0 &&
      plan.toolName &&
      !existing.has(plan.toolName)
    ) {
      extraNames.push(plan.toolName);
      existing.add(plan.toolName);
    }
  }
  return { builtinToolNames: [...injectionResult.builtinToolNames, ...extraNames] };
}
