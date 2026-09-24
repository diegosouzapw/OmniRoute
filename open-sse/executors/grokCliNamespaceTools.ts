/**
 * Responses `namespace` tool support for Grok Build (grok-cli).
 *
 * Codex CLI declares every MCP server (and its own multi-agent tools) as a
 * Responses `{ type: "namespace", name, tools: [...] }` group. Grok Build's
 * cli-chat-proxy accepts only flat tool types and rejects the whole request
 * with `422 tools[N].type: unknown variant \`namespace\``. Responses clients
 * reach grok-cli on the same-format lane, where no request translation runs,
 * so the Responses→Chat flattening (#1534/#8295) never applies here.
 *
 * Flatten each child into a Responses function tool using the same wire-name
 * scheme as the Chat translator, then restore the codex `{namespace, name}`
 * identity on the function calls Grok returns so Codex can dispatch them.
 */
import { flattenNamespaceToolName } from "../translator/request/openai-responses/namespaceFlatten.ts";
import { applyFunctionCallIdentity } from "../translator/response/openai-responses/functionCallIdentity.ts";

type JsonRecord = Record<string, unknown>;
export type NamespaceToolIdentityMap = Map<string, { namespace: string; name: string }>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function stringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function flattenNamespaceTool(tool: JsonRecord, identityMap: NamespaceToolIdentityMap) {
  const nsName = stringOrEmpty(tool.name);
  const children = Array.isArray(tool.tools) ? tool.tools : [];
  return (
    children
      .filter(isRecord)
      // Grok Build has no freeform `custom` tools; exposing one as a function
      // would make the model answer a freeform tool with a JSON function_call.
      .filter((child) => (child.type ?? "function") === "function" && stringOrEmpty(child.name))
      .map((child) => {
        const leaf = stringOrEmpty(child.name);
        const wireName = flattenNamespaceToolName(nsName, leaf);
        if (nsName) identityMap.set(wireName, { namespace: nsName, name: leaf });
        const flat: JsonRecord = {
          type: "function",
          name: wireName,
          parameters: child.parameters ?? { type: "object", properties: {} },
        };
        if (child.description !== undefined) flat.description = child.description;
        if (child.strict !== undefined) flat.strict = child.strict;
        return flat;
      })
  );
}

/** Rename namespaced `function_call` history items to their flattened wire names. */
function flattenNamespacedHistory(input: unknown[]): { input: unknown[]; changed: boolean } {
  let changed = false;
  const next = input.map((item) => {
    if (!isRecord(item) || item.type !== "function_call") return item;
    const namespace = stringOrEmpty(item.namespace);
    const name = stringOrEmpty(item.name);
    if (!namespace || !name) return item;
    changed = true;
    const { namespace: _namespace, ...rest } = item;
    return { ...rest, name: flattenNamespaceToolName(namespace, name) };
  });
  return { input: next, changed };
}

/**
 * Return a copy of a Responses request body with `namespace` tool groups
 * flattened into function tools, and prior namespaced `function_call` history
 * items renamed to the matching wire names (also on follow-up turns that do
 * not re-declare the tools). The input body is never mutated: combo fallback
 * re-dispatches the same body to targets that support namespaces natively.
 * `identityMap` is null when no namespace tool was flattened.
 */
export function flattenGrokBuildNamespaceTools(body: unknown): {
  body: unknown;
  identityMap: NamespaceToolIdentityMap | null;
} {
  if (!isRecord(body)) return { body, identityMap: null };

  let identityMap: NamespaceToolIdentityMap | null = null;
  let tools = body.tools;
  if (Array.isArray(body.tools) && body.tools.some((t) => isRecord(t) && t.type === "namespace")) {
    const map: NamespaceToolIdentityMap = new Map();
    tools = body.tools.flatMap((tool) =>
      isRecord(tool) && tool.type === "namespace" ? flattenNamespaceTool(tool, map) : [tool]
    );
    identityMap = map;
  }

  const history = Array.isArray(body.input) ? flattenNamespacedHistory(body.input) : null;
  if (!identityMap && !history?.changed) return { body, identityMap: null };

  const next: JsonRecord = { ...body };
  if (identityMap) next.tools = tools;
  if (history?.changed) next.input = history.input;
  return { body: next, identityMap };
}

function restoreFunctionCall(item: unknown, identityMap: NamespaceToolIdentityMap): boolean {
  if (!isRecord(item) || item.type !== "function_call" || item.namespace) return false;
  const name = stringOrEmpty(item.name);
  if (!name) return false;
  const before = JSON.stringify(item);
  applyFunctionCallIdentity(item, identityMap, name);
  // Compare the whole item: a leaf that already contains `__` keeps its name
  // and only gains `namespace` (and possibly the #14154 marker).
  return JSON.stringify(item) !== before;
}

function restoreOutputList(output: unknown, identityMap: NamespaceToolIdentityMap): boolean {
  if (!Array.isArray(output)) return false;
  let changed = false;
  for (const item of output) changed = restoreFunctionCall(item, identityMap) || changed;
  return changed;
}

/** Restore `{namespace, name}` on every function call carried by one Responses payload. */
function restorePayload(payload: unknown, identityMap: NamespaceToolIdentityMap): boolean {
  if (!isRecord(payload)) return false;
  let changed = restoreFunctionCall(payload.item, identityMap);
  changed = restoreOutputList(payload.output, identityMap) || changed;
  if (isRecord(payload.response)) {
    changed = restoreOutputList(payload.response.output, identityMap) || changed;
  }
  return changed;
}

const SSE_BLOCK_SEP_RE = /\r?\n\r?\n/;

function restoreSseBlock(block: string, identityMap: NamespaceToolIdentityMap): string {
  return block.replace(/^data:[ \t]?(.*)$/m, (line, data: string) => {
    if (!data || data === "[DONE]") return line;
    try {
      const parsed = JSON.parse(data);
      return restorePayload(parsed, identityMap) ? `data: ${JSON.stringify(parsed)}` : line;
    } catch {
      return line;
    }
  });
}

/**
 * Wrap a Grok Build response so function calls on flattened namespace tools
 * come back with their original `{namespace, name}` identity. Handles both
 * SSE streams and non-streaming JSON bodies; error responses pass through.
 */
export async function restoreGrokBuildNamespaceToolCalls(
  response: Response,
  identityMap: NamespaceToolIdentityMap
): Promise<Response> {
  if (!response.ok || !response.body || identityMap.size === 0) return response;
  const contentType = response.headers.get("content-type") || "";
  const init = { status: response.status, statusText: response.statusText };

  if (contentType.includes("text/event-stream")) {
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
          const block = buffer.slice(0, blockEnd);
          buffer = buffer.slice(blockEnd);
          controller.enqueue(encoder.encode(restoreSseBlock(block, identityMap)));
        }
      },
      flush(controller) {
        buffer += decoder.decode();
        if (buffer) controller.enqueue(encoder.encode(restoreSseBlock(buffer, identityMap)));
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
      if (restorePayload(parsed, identityMap)) body = JSON.stringify(parsed);
    } catch {
      // Not JSON after all — forward the upstream bytes unchanged.
    }
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(body, { ...init, headers });
  }

  return response;
}
