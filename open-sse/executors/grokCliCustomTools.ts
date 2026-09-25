/**
 * Responses `custom` (freeform) tool support for Grok Build (grok-cli).
 *
 * Responses clients declare freeform tools such as Codex's apply_patch as
 * `{ type: "custom", name, format }`. Grok Build accepts only function-style tools
 * and rejects the whole request with `422 tools[N].type: unknown variant \`custom\``.
 * grok-cli is a same-format Responses lane, so the Chat translator's
 * custom → function conversion (#1007) never runs here.
 *
 * Convert custom tools, top-level and inside `namespace` groups (Codex lite mode's
 * `functions.exec`), to function tools with the same `{ input: string }` schema
 * the Chat translator uses, convert custom-tool history items, and turn Grok's
 * function calls on those tools back into `custom_tool_call` items. Argument
 * deltas are decoded as they stream (`{"input":"…` → raw input) and re-emitted as
 * `custom_tool_call_input.delta` with the upstream `sequence_number`, so the
 * passthrough's sequence watermark (#5786), stream readiness and idle checks see
 * the same progress as for a plain function call.
 */

type JsonRecord = Record<string, unknown>;

/** Converted custom tools by customToolKey(), with the client's original definition. */
export type GrokBuildCustomTools = Map<string, JsonRecord>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyName(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/** A namespaced custom tool must not capture a top-level function of the same name. */
function customToolKey(namespace: unknown, name: string): string {
  const ns = nonEmptyName(namespace);
  return ns ? `${ns}\u0000${name}` : name;
}

function toFunctionTool(tool: JsonRecord, name: string): JsonRecord {
  const fn: JsonRecord = { type: "function", name };
  if (tool.description !== undefined) fn.description = tool.description;
  fn.parameters = {
    type: "object",
    properties: { input: { type: "string" } },
    required: ["input"],
    additionalProperties: false,
  };
  if (tool.strict !== undefined) fn.strict = tool.strict;
  return fn;
}

function convertToolChoice(choice: unknown): unknown {
  if (!isRecord(choice)) return choice;
  if (choice.type === "custom" && nonEmptyName(choice.name)) {
    return { type: "function", name: choice.name };
  }
  if (choice.type !== "allowed_tools" || !Array.isArray(choice.tools)) return choice;
  let changed = false;
  const tools = choice.tools.map((tool) => {
    if (!isRecord(tool) || tool.type !== "custom" || !nonEmptyName(tool.name)) return tool;
    changed = true;
    return { type: "function", name: tool.name };
  });
  return changed ? { ...choice, tools } : choice;
}

/** Custom-tool history items become the function items Grok Build understands. */
function convertHistoryItem(item: unknown): unknown {
  if (!isRecord(item)) return item;
  if (item.type === "custom_tool_call") {
    const { id: _id, type: _type, input, ...rest } = item;
    return { type: "function_call", ...rest, arguments: JSON.stringify({ input: input ?? "" }) };
  }
  if (item.type === "custom_tool_call_output") {
    const { id: _id, type: _type, ...rest } = item;
    return { type: "function_call_output", ...rest };
  }
  return item;
}

/**
 * Convert the custom members of one `namespace` group. The namespace step flattens the
 * converted functions afterwards and restores `{namespace, name}` on Grok's calls first,
 * so the restore here matches them by namespace and leaf name.
 */
function convertNamespaceTool(tool: JsonRecord, customTools: GrokBuildCustomTools): JsonRecord {
  const namespace = nonEmptyName(tool.name);
  if (!namespace || !Array.isArray(tool.tools)) return tool;
  const siblingNames = new Set(
    tool.tools
      .filter((member) => isRecord(member) && member.type !== "custom")
      .map((member) => (member as JsonRecord).name)
  );
  let changed = false;
  const members = tool.tools.map((member) => {
    if (!isRecord(member) || member.type !== "custom") return member;
    const name = nonEmptyName(member.name);
    if (!name || siblingNames.has(name)) return member;
    const key = customToolKey(namespace, name);
    if (customTools.has(key)) return member;
    customTools.set(key, member);
    changed = true;
    return toFunctionTool(member, name);
  });
  return changed ? { ...tool, tools: members } : tool;
}

/**
 * Return a copy of a Responses request body with custom tools (also those inside
 * `namespace` groups), a custom `tool_choice` and custom-tool history items
 * converted to their function forms (history also on follow-up turns that no
 * longer declare the tool). The input body is never mutated: combo fallback
 * re-dispatches it to targets that accept custom tools natively. A custom tool
 * whose name is already used by another tool is left alone rather than
 * duplicating the name. `customTools` is null when no tool was converted.
 */
export function convertGrokBuildCustomTools(body: unknown): {
  body: unknown;
  customTools: GrokBuildCustomTools | null;
} {
  if (!isRecord(body)) return { body, customTools: null };

  const next: JsonRecord = { ...body };
  let changed = false;
  const customTools: GrokBuildCustomTools = new Map();

  if (Array.isArray(body.tools)) {
    const otherNames = new Set(
      body.tools
        .filter((tool) => isRecord(tool) && tool.type !== "custom")
        .map((tool) => (tool as JsonRecord).name)
    );
    const tools = body.tools.map((tool) => {
      if (isRecord(tool) && tool.type === "namespace")
        return convertNamespaceTool(tool, customTools);
      if (!isRecord(tool) || tool.type !== "custom") return tool;
      const name = nonEmptyName(tool.name);
      if (!name || otherNames.has(name) || customTools.has(name)) return tool;
      customTools.set(name, tool);
      return toFunctionTool(tool, name);
    });
    if (customTools.size > 0) {
      next.tools = tools;
      changed = true;
    }
  }

  const toolChoice = convertToolChoice(body.tool_choice);
  if (toolChoice !== body.tool_choice) {
    next.tool_choice = toolChoice;
    changed = true;
  }

  if (Array.isArray(body.input)) {
    const input = body.input.map(convertHistoryItem);
    if (input.some((item, index) => item !== (body.input as unknown[])[index])) {
      next.input = input;
      changed = true;
    }
  }

  if (!changed) return { body, customTools: null };
  return { body: next, customTools: customTools.size > 0 ? customTools : null };
}

function isCustomToolCall(item: unknown, customTools: GrokBuildCustomTools): item is JsonRecord {
  return (
    isRecord(item) &&
    item.type === "function_call" &&
    typeof item.name === "string" &&
    customTools.has(customToolKey(item.namespace, item.name))
  );
}

/** Grok answers with `{"input": "..."}`; anything else is already the raw input. */
function rawCustomInput(args: unknown): string {
  if (args === undefined || args === null) return "";
  if (isRecord(args)) return typeof args.input === "string" ? args.input : JSON.stringify(args);
  if (typeof args !== "string") return String(args);
  try {
    const parsed = JSON.parse(args);
    if (isRecord(parsed) && typeof parsed.input === "string") return parsed.input;
  } catch {
    // Not JSON: the model already sent the freeform input.
  }
  return args;
}

function toCustomToolCall(item: JsonRecord): JsonRecord {
  const { arguments: args, ...rest } = item;
  return { ...rest, type: "custom_tool_call", input: rawCustomInput(args) };
}

function restoreOutputList(output: unknown, customTools: GrokBuildCustomTools): boolean {
  if (!Array.isArray(output)) return false;
  let changed = false;
  output.forEach((item, index) => {
    if (!isCustomToolCall(item, customTools)) return;
    output[index] = toCustomToolCall(item);
    changed = true;
  });
  return changed;
}

/** Put the client's custom definitions back into an echoed `tools` list. */
function restoreToolList(tools: unknown, customTools: GrokBuildCustomTools): boolean {
  if (!Array.isArray(tools)) return false;
  let changed = false;
  tools.forEach((tool, index) => {
    if (!isRecord(tool) || tool.type !== "function" || typeof tool.name !== "string") return;
    const original = customTools.get(tool.name);
    if (!original) return;
    tools[index] = original;
    changed = true;
  });
  return changed;
}

/** Rewrite custom-tool calls and echoed tools carried by one Responses payload in place. */
function restorePayload(payload: JsonRecord, customTools: GrokBuildCustomTools): boolean {
  let changed = false;
  if (isCustomToolCall(payload.item, customTools)) {
    payload.item = toCustomToolCall(payload.item);
    changed = true;
  }
  changed = restoreOutputList(payload.output, customTools) || changed;
  changed = restoreToolList(payload.tools, customTools) || changed;
  if (isRecord(payload.response)) {
    changed = restoreOutputList(payload.response.output, customTools) || changed;
    changed = restoreToolList(payload.response.tools, customTools) || changed;
  }
  return changed;
}

const JSON_ESCAPES: Record<string, string> = {
  '"': '"',
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t",
};
const INPUT_PREFIX = ["{", '"input"', ":", '"'];

/**
 * Incremental decoder for the `{"input":"<escaped>"}` arguments Grok streams for a
 * converted custom tool. `push` returns the raw-input text decoded from one delta.
 * If the arguments do not start with that shape the decoder gives up and the
 * caller falls back to the complete arguments at the end of the call.
 */
function createInputDecoder() {
  let mode: "prefix" | "string" | "after" | "raw" = "prefix";
  let token = 0;
  let tokenChar = 0;
  let escape = "";
  let highSurrogate = "";

  const decodeStringChar = (ch: string): string => {
    if (escape) {
      escape += ch;
      if (escape[1] === "u") {
        if (escape.length < 6) return "";
        const code = Number.parseInt(escape.slice(2), 16);
        escape = "";
        if (Number.isNaN(code)) {
          mode = "raw";
          return "";
        }
        const decoded = String.fromCharCode(code);
        if (code >= 0xd800 && code <= 0xdbff) {
          highSurrogate = decoded;
          return "";
        }
        const out = highSurrogate + decoded;
        highSurrogate = "";
        return out;
      }
      const decoded = JSON_ESCAPES[escape[1]];
      escape = "";
      if (decoded === undefined) {
        mode = "raw";
        return "";
      }
      return decoded;
    }
    if (ch === "\\") {
      escape = ch;
      return "";
    }
    if (ch === '"') {
      mode = "after";
      return highSurrogate;
    }
    const out = highSurrogate + ch;
    highSurrogate = "";
    return out;
  };

  return {
    get failed() {
      return mode === "raw";
    },
    push(chunk: string): string {
      let out = "";
      for (const ch of chunk) {
        if (mode === "string") {
          out += decodeStringChar(ch);
        } else if (mode === "prefix") {
          const expected = INPUT_PREFIX[token];
          if (tokenChar === 0 && /\s/.test(ch)) continue;
          if (ch !== expected[tokenChar]) {
            mode = "raw";
            break;
          }
          tokenChar++;
          if (tokenChar === expected.length) {
            token++;
            tokenChar = 0;
            if (token === INPUT_PREFIX.length) mode = "string";
          }
        } else {
          break;
        }
      }
      return mode === "raw" ? "" : out;
    },
  };
}

type CustomCallState = {
  itemId: string | null;
  outputIndex: number | null;
  decoder: ReturnType<typeof createInputDecoder>;
  args: string;
  emitted: string;
  done: boolean;
};

const SSE_BLOCK_SEP_RE = /\r?\n\r?\n/;
// `[^\r\n]` rather than `.`: raw U+2028/U+2029 are valid inside JSON strings.
const SSE_DATA_LINE_RE = /^data:[ \t]?([^\r\n]*)$/m;
const SSE_EVENT_LINE_RE = /^event:[ \t]?.*$/m;
const SSE_TRAILING_SEP_RE = /(?:\r?\n)+$/;
const SSE_COMMENT_BLOCK = ":\n\n";

/** Re-render one SSE block with a new payload, keeping its other lines; always terminated. */
function renderBlock(block: string, payload: JsonRecord): string {
  const data = JSON.stringify(payload);
  let rendered = block
    .replace(SSE_TRAILING_SEP_RE, "")
    .replace(SSE_DATA_LINE_RE, () => `data: ${data}`);
  if (typeof payload.type === "string") {
    rendered = rendered.replace(SSE_EVENT_LINE_RE, () => `event: ${payload.type}`);
  }
  return `${rendered}\n\n`;
}

function callIds(call: CustomCallState): JsonRecord {
  const ids: JsonRecord = {};
  if (call.itemId !== null) ids.item_id = call.itemId;
  if (call.outputIndex !== null) ids.output_index = call.outputIndex;
  return ids;
}

/** Per-stream rewriter: argument events carry only item_id / output_index, so track calls. */
function createSseBlockRewriter(customTools: GrokBuildCustomTools) {
  const calls: CustomCallState[] = [];

  const findCall = (payload: JsonRecord): CustomCallState | undefined =>
    calls.find(
      (call) =>
        (typeof payload.item_id === "string" && call.itemId === payload.item_id) ||
        (typeof payload.output_index === "number" && call.outputIndex === payload.output_index)
    );

  /** `.delta` for whatever the incremental decode did not emit, then `.done`. */
  const finishCall = (
    block: string,
    call: CustomCallState,
    args: unknown,
    doneSeq: unknown
  ): string => {
    call.done = true;
    // An empty or missing `arguments` falls back to the deltas already received.
    const input = rawCustomInput(typeof args === "string" && args !== "" ? args : call.args);
    const ids = callIds(call);
    let out = "";
    const rest = input.startsWith(call.emitted) ? input.slice(call.emitted.length) : "";
    if (rest) {
      // No sequence_number: this event has no upstream counterpart, and a borrowed
      // number could fall under the passthrough watermark and be dropped.
      out += renderBlock(block, {
        type: "response.custom_tool_call_input.delta",
        ...ids,
        delta: rest,
      });
    }
    return (
      out +
      renderBlock(block, {
        type: "response.custom_tool_call_input.done",
        ...(typeof doneSeq === "number" ? { sequence_number: doneSeq } : {}),
        ...ids,
        input,
      })
    );
  };

  return (block: string): string => {
    const match = SSE_DATA_LINE_RE.exec(block);
    if (!match || !match[1] || match[1] === "[DONE]") return block;
    let payload: unknown;
    try {
      payload = JSON.parse(match[1]);
    } catch {
      return block;
    }
    if (!isRecord(payload)) return block;

    if (
      payload.type === "response.output_item.added" &&
      isCustomToolCall(payload.item, customTools)
    ) {
      calls.push({
        itemId: typeof payload.item.id === "string" ? payload.item.id : null,
        outputIndex: typeof payload.output_index === "number" ? payload.output_index : null,
        decoder: createInputDecoder(),
        args: "",
        emitted: "",
        done: false,
      });
    }

    if (payload.type === "response.function_call_arguments.delta") {
      const call = findCall(payload);
      if (call && !call.done) {
        const chunk = typeof payload.delta === "string" ? payload.delta : "";
        call.args += chunk;
        const text = call.decoder.push(chunk);
        if (!text || call.decoder.failed) {
          // Keep bytes flowing for idle watchdogs; comment lines are not forwarded.
          return SSE_COMMENT_BLOCK;
        }
        call.emitted += text;
        return renderBlock(block, {
          type: "response.custom_tool_call_input.delta",
          ...(payload.sequence_number !== undefined
            ? { sequence_number: payload.sequence_number }
            : {}),
          ...callIds(call),
          delta: text,
        });
      }
    }

    if (payload.type === "response.function_call_arguments.done") {
      const call = findCall(payload);
      if (call && !call.done) {
        return finishCall(block, call, payload.arguments, payload.sequence_number);
      }
    }

    // A call that ends without `arguments.done` still owes the client its `.done`.
    let prefix = "";
    if (
      payload.type === "response.output_item.done" &&
      isCustomToolCall(payload.item, customTools)
    ) {
      const call = findCall(payload);
      if (call && !call.done) prefix = finishCall(block, call, payload.item.arguments, undefined);
    }

    return restorePayload(payload, customTools)
      ? prefix + renderBlock(block, payload)
      : prefix + block;
  };
}

/**
 * Wrap a Grok Build response so function calls on converted custom tools come
 * back as `custom_tool_call` items. Handles SSE streams and non-streaming JSON;
 * error responses pass through untouched.
 */
export async function restoreGrokBuildCustomToolCalls(
  response: Response,
  customTools: GrokBuildCustomTools
): Promise<Response> {
  if (!response.ok || !response.body || customTools.size === 0) return response;
  const contentType = response.headers.get("content-type") || "";
  const init = { status: response.status, statusText: response.statusText };

  if (contentType.includes("text/event-stream")) {
    const rewrite = createSseBlockRewriter(customTools);
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    const transform = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        while (true) {
          const separator = SSE_BLOCK_SEP_RE.exec(buffer);
          if (!separator) break;
          const blockEnd = separator.index + separator[0].length;
          const block = rewrite(buffer.slice(0, blockEnd));
          buffer = buffer.slice(blockEnd);
          if (block) controller.enqueue(encoder.encode(block));
        }
      },
      flush(controller) {
        buffer += decoder.decode();
        const block = buffer ? rewrite(buffer) : "";
        if (block) controller.enqueue(encoder.encode(block));
      },
    });
    return new Response(response.body.pipeThrough(transform), {
      ...init,
      headers: response.headers,
    });
  }

  if (contentType.includes("application/json")) {
    const text = await response.text();
    let body = text;
    try {
      const parsed = JSON.parse(text);
      if (isRecord(parsed) && restorePayload(parsed, customTools)) body = JSON.stringify(parsed);
    } catch {
      // Not JSON after all — forward the upstream bytes unchanged.
    }
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(body, { ...init, headers });
  }

  return response;
}
