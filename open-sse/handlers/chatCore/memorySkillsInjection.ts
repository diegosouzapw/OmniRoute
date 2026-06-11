import { retrieveMemories } from "@/lib/memory/retrieval";
import { getMemorySettings, DEFAULT_MEMORY_SETTINGS, toMemoryRetrievalConfig } from "@/lib/memory/settings";
import { injectMemory, shouldInjectMemory } from "@/lib/memory/injection";
import { injectSkills } from "@/lib/skills/injection";
import { FORMATS } from "../../translator/formats.ts";

export function getSkillsProviderForFormat(format: string): "openai" | "anthropic" | "google" | "other" {
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
  body: any;
  memoryOwnerId: string | null;
  provider: string;
  effectiveModel: string;
  sourceFormat: string;
  targetFormat: string;
  backgroundReason: string | null;
  log: any;
}) {
  const memorySettings = memoryOwnerId
    ? await getMemorySettings().catch(() => DEFAULT_MEMORY_SETTINGS)
    : null;

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
        const injected = injectMemory(
          body as Parameters<typeof injectMemory>[0],
          memories,
          provider
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

  if (memoryOwnerId && memorySettings?.skillsEnabled) {
    const existingTools = Array.isArray(body.tools) ? body.tools : [];
    const mergedTools = injectSkills({
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
      log?.debug?.("SKILLS", `Injected ${mergedTools.length - existingTools.length} skills`);
    }
  }

  return { body, memorySettings };
}
