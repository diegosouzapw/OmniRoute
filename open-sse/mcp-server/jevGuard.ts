/**
 * Jev safety guard for MCP tools.
 *
 * Wraps every registered tool handler with a pre-flight input decision
 * (policy-violating requests are refused before the tool runs) and a post-flight
 * output decision (probable secrets are redacted, malformed payloads are
 * annotated).
 *
 * Fail-open by contract: when the `mcp` lane is off, no credential resolves, or
 * any decision call errors, the wrapped handler behaves exactly as it does
 * today.
 */
import {
  decideToolInput,
  decideToolOutput,
  isJevFeatureEnabled,
  resolveJevRuntime,
} from "../services/jev/index.ts";
import { logToolCall } from "./audit.ts";
import type { TextToolResult } from "./toolResult.ts";

const MAX_ARGS_CHARS = 6_000;

/**
 * Cheap shape pre-filter. Output decisions cost a round trip, so only payloads
 * that look like they carry a credential are sent to the decision model.
 */
const SECRET_SHAPED_SOURCE =
  "-----BEGIN [A-Z ]*PRIVATE KEY-----|\\bsk-[A-Za-z0-9_-]{16,}|\\bghp_[A-Za-z0-9]{20,}|\\bAKIA[0-9A-Z]{16}\\b|\\bBearer\\s+[A-Za-z0-9._-]{24,}";
const SECRET_SHAPED = new RegExp(SECRET_SHAPED_SOURCE);
/** Global twin — used only with `String.prototype.replace`, which resets lastIndex. */
const SECRET_SHAPED_GLOBAL = new RegExp(SECRET_SHAPED_SOURCE, "g");

const REDACT_NOTE = "[jev-guard] redacted probable secret in tool output";

type ToolHandler = (args: unknown, extra?: unknown) => Promise<TextToolResult>;
type TextBlock = { type: "text"; text: string };

/** Serialize args defensively: cyclic or unserialisable input skips the input decision. */
function stringifyArgs(args: unknown): string {
  let text: string | undefined;
  try {
    text = JSON.stringify(args ?? null);
  } catch {
    return "";
  }
  if (typeof text !== "string") return "";
  return text.length > MAX_ARGS_CHARS ? text.slice(0, MAX_ARGS_CHARS) : text;
}

function textBlocks(result: TextToolResult | undefined): TextBlock[] {
  if (!result || !Array.isArray(result.content)) return [];
  return result.content.filter(
    (block): block is TextBlock =>
      Boolean(block) && block.type === "text" && typeof block.text === "string"
  );
}

export function withJevToolGuard(name: string, handler: ToolHandler): ToolHandler {
  return async (args, extra) => {
    if (!isJevFeatureEnabled("mcp")) return handler(args, extra);
    const runtime = await resolveJevRuntime().catch(() => null);
    if (!runtime) return handler(args, extra);
    const threshold = runtime.blockThreshold;
    const startedAt = Date.now();

    try {
      const argsText = stringifyArgs(args);
      if (argsText.trim()) {
        const inputDecision = await decideToolInput({ tool: name, argsText });
        if (inputDecision && inputDecision.harmful >= threshold) {
          await logToolCall(name, args, null, Date.now() - startedAt, false, "jev_blocked:harmful");
          return {
            content: [
              {
                type: "text",
                text: `Error: blocked by Jev safety gate (probable policy-violating request, p=${inputDecision.harmful.toFixed(3)}).`,
              },
            ],
            isError: true,
          };
        }
        // `destructive` is reported but never blocks: legitimate admin tools are destructive.
      }
    } catch {
      // Fail-open: a broken input decision must never stop the tool.
    }

    const result = await handler(args, extra);

    try {
      const blocks = textBlocks(result);
      if (blocks.length === 0) return result;
      const suspicious = blocks.filter((block) => SECRET_SHAPED.test(block.text));
      if (suspicious.length === 0) return result;

      const outputDecision = await decideToolOutput({
        tool: name,
        outputText: suspicious.map((block) => block.text).join("\n"),
      });
      if (!outputDecision) return result;

      if (outputDecision.leaksSecrets >= threshold) {
        for (const block of blocks) {
          if (SECRET_SHAPED.test(block.text)) {
            block.text = block.text.replace(SECRET_SHAPED_GLOBAL, "[redacted]");
          }
        }
        blocks[0].text = `${REDACT_NOTE}\n${blocks[0].text}`;
        await logToolCall(
          name,
          args,
          null,
          Date.now() - startedAt,
          true,
          "jev_guard:redacted_secret"
        );
      }

      if (outputDecision.wrongFormat >= threshold) {
        const last = blocks[blocks.length - 1];
        last.text = `${last.text}\n[jev-guard] output may be structurally malformed (p=${outputDecision.wrongFormat.toFixed(3)})`;
      }
    } catch {
      // Fail-open: the output guard never breaks a successful tool call.
    }

    return result;
  };
}
