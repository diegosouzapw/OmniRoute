/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import type {
  CodexAgentMessage,
  CodexAssistantMessage,
  CodexContentPart,
  CodexContext,
  CodexMessage,
  CodexParsedRequest,
  CodexRequestOptions,
  CodexTextContent,
  CodexThinkingContent,
  CodexTool,
  CodexToolCall,
} from "../types";
import { namespacedToolName } from "../types";
import { responsesRequestSchema } from "./schema";
import { compactionItemToText } from "./compaction";
import { previousResponseReplayPrefixLength } from "./state";
import { decodeReasoningEnvelope } from "./reasoning-envelope";

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

type InputBlock =
  | { type: "input_text"; text: string }
  | { type: "text"; text: string }
  | { type: "input_image"; image_url?: string; file_id?: string; detail?: string }
  | {
      type: "input_file";
      file_id?: string;
      filename?: string;
      file_data?: string;
      file_url?: string;
    };

function inlineInputFile(block: Extract<InputBlock, { type: "input_file" }>): {
  fileData: string;
  filename: string;
} {
  const filename = block.filename?.trim() || "codex-input-file";
  if (typeof block.file_data === "string" && block.file_data.length > 0) {
    return { fileData: block.file_data, filename };
  }
  if (typeof block.file_url === "string" && block.file_url.length > 0) {
    if (block.file_url.startsWith("data:")) {
      return { fileData: block.file_url, filename };
    }
    throw new Error(
      "ChatGPT Web input_file supports inline data URLs only; provide file_data instead of a remote file_url"
    );
  }
  if (typeof block.file_id === "string" && block.file_id.length > 0) {
    throw new Error(
      "ChatGPT Web cannot resolve input_file file_id references; provide inline file_data instead"
    );
  }
  throw new Error("ChatGPT Web input_file requires non-empty inline file_data");
}

function inputContentParts(blocks: unknown[] | string | undefined): string | CodexContentPart[] {
  if (typeof blocks === "string") return blocks;
  if (!blocks) return [];
  const parts: CodexContentPart[] = [];
  for (const raw of blocks) {
    const block = raw as InputBlock;
    if (block.type === "input_text" || block.type === "text") {
      parts.push({ type: "text", text: (block as { text: string }).text });
    } else if (block.type === "input_image") {
      const b = block as { image_url?: string; file_id?: string; detail?: string };
      if (b.image_url) {
        if (!b.image_url.startsWith("data:")) {
          throw new Error(
            "ChatGPT Web input_image supports inline data URLs only; remote image_url values are not supported"
          );
        }
        // Preserve the image as a structured part — adapters send it as a native image block.
        // NEVER inline the (often base64 data-URL) image_url as text: that explodes the token count.
        parts.push({
          type: "image",
          imageUrl: b.image_url,
          ...(b.detail ? { detail: normalizeImageDetail(b.detail) } : {}),
        });
      } else if (b.file_id) {
        throw new Error(
          "ChatGPT Web cannot resolve input_image file_id references; provide an inline image_url data URL instead"
        );
      } else {
        throw new Error("ChatGPT Web input_image requires a non-empty inline image_url data URL");
      }
    } else if (block.type === "input_file") {
      const file = inlineInputFile(block);
      parts.push({ type: "file", ...file });
    }
  }
  // Collapse to a plain string only for a single TEXT part; attachments must stay structured.
  if (parts.length === 1 && parts[0].type === "text") return parts[0].text;
  return parts;
}

function containsOpaqueEncryptedContent(value: unknown): boolean {
  if (!Array.isArray(value)) return false;
  return value.some(
    (block) =>
      isObj(block) &&
      block.type === "encrypted_content" &&
      typeof block.encrypted_content === "string" &&
      block.encrypted_content.length > 0
  );
}

type OutputBlock =
  | { type: "output_text"; text: string }
  | { type: "text"; text: string }
  | { type: "refusal"; refusal: string };

function outputTextOf(blocks: unknown[] | string | undefined): CodexTextContent[] {
  if (typeof blocks === "string") return blocks.length > 0 ? [{ type: "text", text: blocks }] : [];
  if (!blocks) return [];
  const out: CodexTextContent[] = [];
  for (const raw of blocks) {
    const b = raw as OutputBlock;
    if (b.type === "output_text" || b.type === "text")
      out.push({ type: "text", text: (b as { text: string }).text });
    else if (b.type === "refusal")
      out.push({ type: "text", text: `[refusal: ${(b as { refusal: string }).refusal}]` });
  }
  return out;
}

function mapToolChoice(value: unknown): CodexRequestOptions["toolChoice"] {
  if (value === undefined || value === null) return undefined;
  if (value === "auto" || value === "none" || value === "required") return value;
  if (isObj(value) && "type" in value) {
    const t = (value as { type: string }).type;
    if ((t === "function" || t === "custom") && "name" in value) {
      return { name: (value as { name: string }).name };
    }
    if (t === "allowed_tools" && Array.isArray(value.tools)) {
      const names = value.tools
        .map(allowedToolName)
        .filter((name): name is string => Boolean(name));
      return names.length > 0
        ? {
            allowedTools: [...new Set(names)],
            mode: value.mode === "required" ? "required" : "auto",
          }
        : "none";
    }
    return "auto";
  }
  return undefined;
}

function allowedToolName(tool: unknown): string | undefined {
  if (!isObj(tool)) return undefined;
  if (typeof tool.name === "string" && tool.name.length > 0) return tool.name;
  if (tool.type === "web_search" || tool.type === "web_search_preview") return "web_search";
  if (tool.type === "tool_search") return "tool_search";
  return undefined;
}

function parseTextControls(
  value: unknown
): Pick<CodexRequestOptions, "verbosity" | "outputFormat"> {
  if (!isObj(value)) return {};
  const out: Pick<CodexRequestOptions, "verbosity" | "outputFormat"> = {};
  if (value.verbosity === "low" || value.verbosity === "medium" || value.verbosity === "high") {
    out.verbosity = value.verbosity;
  }
  const format = value.format;
  if (
    isObj(format) &&
    format.type === "json_schema" &&
    typeof format.name === "string" &&
    format.name.length > 0 &&
    format.schema !== undefined
  ) {
    out.outputFormat = {
      type: "json_schema",
      name: format.name,
      strict: format.strict === true,
      schema: structuredClone(format.schema),
    };
  }
  return out;
}

const DEFAULT_FUNCTION_NAMESPACE = "functions";

function normalizedToolNamespace(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 && value !== DEFAULT_FUNCTION_NAMESPACE
    ? value
    : undefined;
}

function buildTools(tools: unknown[] | undefined): CodexTool[] | undefined {
  if (!tools) return undefined;
  const out: CodexTool[] = [];
  const pushFn = (t: Record<string, unknown>, namespace?: string) => {
    const tool: CodexTool = {
      name: t.name as string,
      description: (t.description as string) ?? "",
      parameters: (t.parameters ?? {}) as Record<string, unknown>,
    };
    if (t.strict !== undefined) tool.strict = t.strict as boolean;
    if (namespace) tool.namespace = namespace;
    out.push(tool);
  };
  const pushFreeform = (t: Record<string, unknown>) => {
    const tool: CodexTool = {
      name: t.name as string,
      description: (t.description as string) ?? "",
      parameters: {
        type: "object",
        properties: {
          input: {
            type: "string",
            description:
              "Raw tool input. For apply_patch, begin exactly with `*** Begin Patch` (no trailing `***`), then use its standard patch envelope.",
          },
        },
        required: ["input"],
      },
      freeform: true,
    };
    out.push(tool);
  };
  for (const t of tools) {
    if (!isObj(t)) continue;
    if (t.type === "function" && typeof t.name === "string") {
      pushFn(t);
    } else if (t.type === "namespace" && Array.isArray(t.tools)) {
      // Responses Lite groups ordinary native functions and the native freeform `exec` tool under
      // the default `functions` namespace. Flatten normal functions from every namespace, and the
      // official freeform variant only from that default namespace. Non-default custom namespaces
      // need a distinct round-trip contract and must not be silently exposed as function calls.
      const ns = normalizedToolNamespace(t.name);
      for (const inner of t.tools as unknown[]) {
        if (!isObj(inner) || typeof inner.name !== "string") continue;
        if (inner.type === "function") pushFn(inner, ns);
        else if (t.name === DEFAULT_FUNCTION_NAMESPACE && inner.type === "custom")
          pushFreeform(inner);
      }
    } else if (t.type === "custom" && typeof t.name === "string") {
      // Freeform custom tool (e.g. apply_patch). Chat models can't emit a lark grammar, so expose a
      // function with a single string `input` carrying the raw tool body; the bridge relays the model's
      // call back as a custom_tool_call (Codex's freeform handler rejects a function_call → fatal abort).
      pushFreeform(t);
    } else if (t.type === "tool_search") {
      // Client-executed tool discovery — the gateway to deferred tools (subagents, extra MCP tools).
      // Expose as a function so chat models can call it; the bridge relays it as a tool_search_call.
      out.push({
        name: "tool_search",
        description:
          (t.description as string) ?? "Search for additional tools to load for the next turn.",
        parameters: (isObj(t.parameters)
          ? t.parameters
          : {
              type: "object",
              properties: {
                query: { type: "string", description: "Search query for tools to load." },
                limit: { type: "number", description: "Maximum number of tools to return." },
              },
              required: ["query"],
            }) as Record<string, unknown>,
        toolSearch: true,
      });
    } else if (
      typeof t.name === "string" &&
      t.type !== "web_search" &&
      t.type !== "image_generation"
    ) {
      // Any other named tool (for example a native computer-use tool type this parser does not
      // model) is client-executed — pass it through as a function so the routed model can read and
      // call it naturally; the bridge relays its call as a function_call. Previously such tools were
      // silently dropped, so the model never saw them.
      pushFn(t);
    }
    // Only the OpenAI-hosted server-side tools (web_search, image_generation) are intentionally
    // dropped — they're executed by OpenAI and can't be relayed to a routed chat model.
  }
  return out.length > 0 ? out : undefined;
}

function ensureAssistantPlaceholder(
  messages: CodexMessage[],
  modelId: string,
  now: number
): CodexAssistantMessage {
  const last = messages[messages.length - 1];
  if (last && last.role === "assistant") return last;
  const placeholder: CodexAssistantMessage = {
    role: "assistant",
    content: [],
    model: modelId,
    timestamp: now,
  };
  messages.push(placeholder);
  return placeholder;
}

/**
 * Tool-call output content. Preserves images (e.g. Codex `view_image` returns
 * `input_image` items): returns content parts when any image is present, else a plain joined string.
 * Never inlines an image_url as text (that would explode the token count).
 */
function outputToToolResultContent(
  output: string | unknown[] | undefined
): string | CodexContentPart[] {
  if (typeof output === "string") return output;
  if (!Array.isArray(output)) return "";
  const parts: CodexContentPart[] = [];
  let hasImage = false;
  for (const raw of output) {
    if (!isObj(raw)) continue;
    if (raw.type === "output_text" || raw.type === "text" || raw.type === "input_text") {
      if (typeof raw.text === "string") parts.push({ type: "text", text: raw.text });
    } else if (raw.type === "refusal" && typeof raw.refusal === "string") {
      parts.push({ type: "text", text: `[refusal: ${raw.refusal}]` });
    } else if (raw.type === "input_image" && typeof raw.image_url === "string") {
      parts.push({
        type: "image",
        imageUrl: raw.image_url,
        ...(typeof raw.detail === "string" ? { detail: normalizeImageDetail(raw.detail) } : {}),
      });
      hasImage = true;
    } else if (raw.type === "encrypted_content") {
      // codex-rs FunctionCallOutputContentItem::EncryptedContent — opaque to routed models.
      parts.push({ type: "text", text: "[encrypted content omitted]" });
    }
  }
  if (!hasImage) return parts.map((p) => (p.type === "text" ? p.text : "")).join("");
  return parts;
}

/**
 * codex-rs ImageDetail allows "original", but chat-completions providers only accept
 * auto|low|high on image_url.detail — degrade "original" to "high" (the codex default).
 */
function normalizeImageDetail(detail: string): string {
  return detail === "original" ? "high" : detail;
}

function findToolById(
  messages: CodexMessage[],
  callId: string
): { name: string; namespace?: string } {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "assistant") continue;
    for (const part of m.content) {
      if (part.type === "toolCall" && part.id === callId)
        return { name: part.name, namespace: part.namespace };
    }
  }
  return { name: "" };
}

const REASONING_EFFORTS = new Set(["none", "minimal", "low", "medium", "high", "xhigh", "max"]);

export function parseRequest(body: unknown): CodexParsedRequest {
  const replayedInputPrefixLength = previousResponseReplayPrefixLength(body);
  const parsed = responsesRequestSchema.safeParse(body);
  if (!parsed.success) {
    throw new Error(`responses parse error: ${parsed.error.message}`);
  }
  const data = parsed.data;
  const now = Date.now();
  const messages: CodexMessage[] = [];
  const systemPrompt: string[] = [];
  // Responses reasoning siblings belong to the following assistant, including across call items.
  // Keep them off the message list until that assistant arrives; turn boundaries clear the array.
  const pendingReasoning: Array<{ part: CodexThinkingContent; envelopeSigned: boolean }> = [];
  // Assistant placeholder that folds pending reasoning into the same turn before tool calls.
  const assistantHolderWithReasoning = (): CodexAssistantMessage => {
    const holder = ensureAssistantPlaceholder(messages, data.model, now);
    if (pendingReasoning.length > 0) {
      holder.content.push(...pendingReasoning.map((entry) => entry.part));
      pendingReasoning.length = 0;
    }
    return holder;
  };
  // Tool specs surfaced by a prior tool_search (deferred tools, e.g. subagents). Codex does not
  // re-list these in `tools`, but chat models can only call listed tools — so we re-inject them.
  const loadedToolSpecs: unknown[] = [];
  // Remote compaction v2: the input tail carries `{type:"compaction_trigger"}` and Codex expects a
  // synthetic `{type:"compaction"}` output item (src/responses/compaction.ts). Flagged for the server.
  let compactionRequest = false;
  let opaqueMultiAgentV2Payload = false;

  if (typeof data.instructions === "string" && data.instructions.length > 0) {
    systemPrompt.push(data.instructions);
  }

  if (typeof data.input === "string") {
    messages.push({ role: "user", content: data.input, timestamp: now });
  } else if (data.input) {
    for (const item of data.input) {
      const effectiveType =
        (item as { type?: string }).type ?? ("role" in item ? "message" : undefined);

      if (effectiveType === "compaction_trigger") {
        compactionRequest = true;
        continue;
      }

      if (effectiveType === "additional_tools") {
        // Codex Desktop responses_lite WS path: tools ride INSIDE input as an
        // `additional_tools` item ({type, role, tools:[...]}) instead of body.tools.
        // Same spec wire shapes (function/namespace/custom/tool_search) — collect and
        // merge through the exact buildTools path so surface detection (collabSurface)
        // and chat-model tool listing see them. The item itself never becomes a message;
        // the native passthrough keeps it verbatim in _rawBody.
        const at = item as { tools?: unknown[] };
        if (Array.isArray(at.tools)) loadedToolSpecs.push(...at.tools);
        continue;
      }

      if (
        effectiveType === "compaction" ||
        effectiveType === "compaction_summary" ||
        effectiveType === "context_compaction"
      ) {
        // A stored summary from a previous compaction. Decode our ocx1 envelope into plain text so
        // the routed model keeps the compacted context; real OpenAI-encrypted blobs degrade to a note.
        // `context_compaction` (encrypted_content optional) is codex-rs's local-compaction marker;
        // with no payload it is a pure marker (the summary follows as its own user message), so it
        // is dropped silently. It must not flag `_compactionRequest`.
        const encrypted = (item as { encrypted_content?: unknown }).encrypted_content;
        if (effectiveType === "context_compaction" && typeof encrypted !== "string") continue;
        pendingReasoning.length = 0;
        messages.push({
          role: "user",
          content: compactionItemToText(typeof encrypted === "string" ? encrypted : undefined),
          timestamp: now,
        });
        continue;
      }

      if (effectiveType === "agent_message") {
        const agentMessage = item as {
          author?: string;
          recipient?: string;
          content?: unknown;
        };

        if (containsOpaqueEncryptedContent(agentMessage.content)) {
          opaqueMultiAgentV2Payload = true;
        }

        const content = inputContentParts(agentMessage.content as unknown[] | string | undefined);

        // An agent_message is external input delivered to the parent agent. Keep its distinct
        // role and routing metadata so Web history remains semantically equivalent to Responses.
        pendingReasoning.length = 0;
        const message: CodexAgentMessage = {
          role: "agentMessage",
          ...(typeof agentMessage.author === "string" ? { author: agentMessage.author } : {}),
          ...(typeof agentMessage.recipient === "string"
            ? { recipient: agentMessage.recipient }
            : {}),
          content,
          timestamp: now,
        };
        messages.push(message);

        continue;
      }

      if (effectiveType === "message") {
        const msg = item as {
          role?: string;
          content?: unknown;
          phase?: "commentary" | "final_answer";
        };
        switch (msg.role) {
          case "system": {
            pendingReasoning.length = 0;
            const text = inputContentParts(msg.content as unknown[] | string | undefined);
            const flat =
              typeof text === "string"
                ? text
                : text.map((p) => (p.type === "text" ? p.text : "")).join("");
            if (flat.length > 0) systemPrompt.push(flat);
            break;
          }
          case "user":
          case "developer": {
            pendingReasoning.length = 0;
            const content = inputContentParts(msg.content as unknown[] | string | undefined);
            messages.push({ role: msg.role, content, timestamp: now });
            break;
          }
          case "assistant": {
            const parts = outputTextOf(msg.content as unknown[] | string | undefined);
            messages.push({
              role: "assistant",
              content:
                pendingReasoning.length > 0
                  ? [...pendingReasoning.map((entry) => entry.part), ...parts]
                  : parts,
              ...(msg.phase ? { phase: msg.phase } : {}),
              model: data.model,
              timestamp: now,
            });
            pendingReasoning.length = 0;
            break;
          }
        }
        continue;
      }

      if (effectiveType === "reasoning") {
        const reasoning = item as {
          id?: string;
          summary?: { text: string }[];
          content?: { text: string }[];
          encrypted_content?: string;
        };
        const fromSummary = (reasoning.summary ?? []).map((c) => c.text).join("");
        const text = fromSummary || (reasoning.content ?? []).map((c) => c.text).join("");
        const envelope =
          typeof reasoning.encrypted_content === "string"
            ? decodeReasoningEnvelope(reasoning.encrypted_content)
            : null;
        const thinkingText = envelope?.txt || text;

        // Native/non-ocxr1 encrypted-only reasoning is opaque here. Do not create a detached
        // assistant turn or invent replayable plaintext/signatures from the encrypted payload.
        if (thinkingText.length > 0) {
          const part: CodexThinkingContent = {
            type: "thinking",
            thinking: thinkingText,
            signature: envelope?.sig ?? JSON.stringify(reasoning),
            ...(envelope?.red ? { redacted: envelope.red } : {}),
            ...(reasoning.id ? { itemId: reasoning.id } : {}),
          };
          const envelopeSigned = typeof envelope?.sig === "string";
          const previous = pendingReasoning[pendingReasoning.length - 1];

          if (!envelopeSigned && previous && !previous.envelopeSigned) {
            previous.part = {
              ...part,
              thinking: `${previous.part.thinking}\n${part.thinking}`,
            };
          } else {
            pendingReasoning.push({ part, envelopeSigned });
          }
        }
        continue;
      }

      if (effectiveType === "function_call") {
        const call = item as {
          id?: string;
          call_id: string;
          name: string;
          arguments?: string;
          namespace?: string;
        };
        // Tolerate empty/non-JSON arguments (e.g. a no-arg tool call serialized as "") instead of
        // throwing — a single poisoned history item would otherwise 400 every subsequent turn.
        let args: Record<string, unknown> = {};
        const rawArgs = call.arguments?.trim();
        if (rawArgs) {
          try {
            const parsed: unknown = JSON.parse(rawArgs);
            if (isObj(parsed)) args = parsed;
          } catch {
            console.warn(
              `[parser] function_call ${call.call_id} has non-JSON arguments; defaulting to {}`
            );
          }
        }
        // Do NOT map Responses item `id` (fc_/ctc_/…) onto `thoughtSignature`. That field is
        // reserved for genuine opaque thought tokens. A Responses item id is not such a token;
        // continuity comes from the in-process replay cache and any real stored signature.
        const toolCall: CodexToolCall = {
          type: "toolCall",
          id: call.call_id,
          name: call.name,
          arguments: args,
          ...(call.namespace ? { namespace: call.namespace } : {}),
        };
        assistantHolderWithReasoning().content.push(toolCall);
        continue;
      }

      if (effectiveType === "custom_tool_call") {
        const call = item as { id?: string; call_id: string; name: string; input: string };
        const toolCall: CodexToolCall = {
          type: "toolCall",
          id: call.call_id,
          name: call.name,
          arguments: { input: call.input ?? "" },
        };
        assistantHolderWithReasoning().content.push(toolCall);
        continue;
      }

      if (effectiveType === "local_shell_call") {
        // codex-rs LocalShellCall replay: pair it as an assistant toolCall so the subsequent
        // function_call_output (same call_id) doesn't become an orphaned tool result.
        const call = item as {
          id?: string;
          call_id?: string;
          action?: { type?: string; command?: string[] };
        };
        const callId = call.call_id ?? call.id;
        if (callId) {
          const command = Array.isArray(call.action?.command) ? call.action.command : [];
          assistantHolderWithReasoning().content.push({
            type: "toolCall",
            id: callId,
            name: "shell",
            arguments: command.length > 0 ? { command } : {},
          });
        }
        continue;
      }

      if (effectiveType === "web_search_call") {
        // Replayed hosted web-search evidence has no paired result payload that routed providers can
        // consume. Keep it out of assistant-visible text so the model cannot echo it as a fake result.
        pendingReasoning.length = 0;
        continue;
      }

      if (effectiveType === "tool_search_call") {
        // Preserve the model's prior tool_search call as an assistant tool call so multi-turn
        // history stays complete (otherwise the model re-issues tool_search forever).
        const call = item as { id?: string; call_id?: string; arguments?: unknown };
        const callId = call.call_id ?? call.id ?? "";
        assistantHolderWithReasoning().content.push({
          type: "toolCall",
          id: callId,
          name: "tool_search",
          arguments: isObj(call.arguments) ? call.arguments : {},
        });
        continue;
      }

      if (effectiveType === "tool_search_output") {
        pendingReasoning.length = 0;
        // Pair the tool_search call with its result so the model sees what was loaded.
        const out = item as { call_id?: string; status?: string; tools?: unknown[] };
        const specs = Array.isArray(out.tools) ? (out.tools as Record<string, unknown>[]) : [];
        loadedToolSpecs.push(...specs);
        // List the EXACT wire names the model must call (flattened for namespaced specs), matching
        // how buildTools exposes them — otherwise the model guesses wrong names (e.g. the bare namespace).
        const wireNames: string[] = [];
        for (const spec of specs) {
          if (spec.type === "namespace" && Array.isArray(spec.tools)) {
            const namespace = normalizedToolNamespace(spec.name);
            for (const inner of spec.tools as Record<string, unknown>[]) {
              if (typeof inner.name === "string")
                wireNames.push(namespacedToolName(namespace, inner.name));
            }
          } else if (typeof spec.name === "string") {
            wireNames.push(spec.name);
          }
        }
        const failed =
          typeof out.status === "string" && out.status !== "completed" && out.status !== "success";
        messages.push({
          role: "toolResult",
          toolCallId: out.call_id ?? "",
          toolName: "tool_search",
          content:
            failed && wireNames.length === 0
              ? `Tool search failed (status: ${out.status}).`
              : wireNames.length
                ? `Tool search loaded these tools — they are now in your available tools. Call one by its EXACT name: ${wireNames.join(", ")}.`
                : "Tool search returned no tools.",
          isError: failed && wireNames.length === 0,
          timestamp: now,
        });
        continue;
      }

      if (effectiveType === "function_call_output") {
        pendingReasoning.length = 0;
        const output = item as { call_id: string; output?: string | unknown[] };
        const toolInfo = findToolById(messages, output.call_id);
        messages.push({
          role: "toolResult",
          toolCallId: output.call_id,
          toolName: toolInfo.name,
          toolNamespace: toolInfo.namespace,
          content: outputToToolResultContent(output.output),
          isError: false,
          timestamp: now,
        });
        continue;
      }

      if (effectiveType === "custom_tool_call_output") {
        pendingReasoning.length = 0;
        const output = item as { call_id: string; output: string | unknown[] };
        const toolInfo = findToolById(messages, output.call_id);
        messages.push({
          role: "toolResult",
          toolCallId: output.call_id,
          toolName: toolInfo.name,
          toolNamespace: toolInfo.namespace,
          // Same payload shape as function_call_output (codex-rs FunctionCallOutputPayload):
          // string or content items — normalize arrays instead of leaking raw wire blocks.
          content: outputToToolResultContent(output.output),
          isError: false,
          timestamp: now,
        });
      }
    }
  }

  const declaredTools = buildTools(data.tools as unknown[] | undefined) ?? [];
  const loadedTools = buildTools(loadedToolSpecs) ?? [];
  const seenTools = new Set<string>();
  const mergedTools = [...declaredTools, ...loadedTools].filter((t) => {
    const k = namespacedToolName(t.namespace, t.name);
    if (seenTools.has(k)) return false;
    seenTools.add(k);
    return true;
  });
  const context: CodexContext = {
    ...(systemPrompt.length > 0 ? { systemPrompt } : {}),
    messages,
    ...(mergedTools.length > 0 ? { tools: mergedTools } : {}),
  };

  const options: CodexRequestOptions = {};
  if (data.max_output_tokens !== undefined) options.maxOutputTokens = data.max_output_tokens;
  if (data.temperature !== undefined) options.temperature = data.temperature;
  if (data.top_p !== undefined) options.topP = data.top_p;
  if (data.stop !== undefined && data.stop !== null) {
    options.stopSequences = typeof data.stop === "string" ? [data.stop] : data.stop;
  }
  const tc = mapToolChoice(data.tool_choice);
  if (tc !== undefined) options.toolChoice = tc;
  if (data.parallel_tool_calls !== undefined) options.parallelToolCalls = data.parallel_tool_calls;
  // Upstream codex-rs converts "ultra" to "max" at the inference boundary (core/src/client.rs
  // `reasoning_effort_for_request`), so current clients never send it — but a catalog that
  // advertises ultra plus an older/direct caller can. Degrade it to max like upstream instead of
  // silently dropping reasoning altogether.
  const requestedEffort = data.reasoning?.effort === "ultra" ? "max" : data.reasoning?.effort;
  if (requestedEffort && REASONING_EFFORTS.has(requestedEffort)) {
    options.reasoning = requestedEffort;
  }
  const summaryMode = data.reasoning?.summary;
  if (!summaryMode || summaryMode === "none") options.hideThinkingSummary = true;
  if (data.presence_penalty !== undefined) options.presencePenalty = data.presence_penalty;
  if (data.frequency_penalty !== undefined) options.frequencyPenalty = data.frequency_penalty;
  if (data.service_tier !== undefined) options.serviceTier = data.service_tier;
  Object.assign(options, parseTextControls(data.text));
  if (data.prompt_cache_key !== undefined) options.promptCacheKey = data.prompt_cache_key;

  return {
    modelId: data.model,
    ...(data.previous_response_id ? { previousResponseId: data.previous_response_id } : {}),
    context,
    stream: data.stream === true,
    options,
    _rawBody: body,
    ...(replayedInputPrefixLength > 0 ? { _replayPrefixLen: replayedInputPrefixLength } : {}),
    ...(compactionRequest ? { _compactionRequest: true } : {}),
    ...(opaqueMultiAgentV2Payload ? { _opaqueMultiAgentV2Payload: true } : {}),
  };
}
