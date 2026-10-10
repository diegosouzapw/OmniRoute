/**
 * opencodeFingerprint.ts — the client fingerprint OpenCode Zen's free tier requires.
 *
 * Live probes against https://opencode.ai/zen/v1 on 2026-10-02 / 2026-10-03 show the gate
 * inspects tool names and casing. Independent verification by @espokaos-ops across 121 direct
 * probe records on 9 gated free models (both /chat/completions and /responses, see #15322)
 * shows that the lowercase pair `bash` + `read` is the minimal passing combination:
 *
 *   no tools ................................ 403 FreeTierError (9/9 models)
 *   one placeholder tool only (`_noop`) ..... 403 FreeTierError (9/9 models)
 *   one client tool only (`my_custom_tool`) . 403 FreeTierError (9/9 models)
 *   `Bash + Read` (wrong case) .............. 403 FreeTierError (9/9 models)
 *   `bash` only / `read` only ............... 403 FreeTierError (4/9 models)
 *   `bash` + `glob` (incomplete) ............ 403 FreeTierError (3/9 models)
 *   bash + read (minimal pair) .............. 200 (9/9 models)
 *   bash + glob + grep + read (quartet) ..... 200 (9/9 models)
 *
 * The production constant `OPENCODE_FINGERPRINT_TOOLS` preserves the file-search quartet
 * `bash`, `glob`, `grep`, `read` as a conservative safety margin closer to the real OpenCode
 * client's toolset. (9router originally introduced `bash + read` in 93837af09 and bumped to the
 * quartet in 822aa958d without a documented rationale; keeping the quartet guards against
 * upstream gate tightening).
 *
 * Order does not matter and extra tools alongside the quartet are accepted, so the pass
 * appends only the genuinely missing members. A client's own capitalization (`Bash`,
 * `Read`) must be canonicalised rather than duplicated: the capitalised spelling alone is
 * refused, and sending both spellings passes only because the canonical one is present —
 * so the request side renames the quartet and the response side restores the caller's
 * original spelling, letting agent clients such as Claude Code still recognise their own
 * tool calls.
 *
 * Leaf module: no internal imports, so the free-tier contract and the executor can both
 * use it without a cycle.
 */

/** Canonical names the upstream free-tier gate requires (conservatively kept as quartet). */
export const OPENCODE_FINGERPRINT_TOOLS: readonly string[] = ["bash", "glob", "grep", "read"];

/**
 * Smallest combination measured to pass the upstream gate (200) across all 9 gated models
 * (measured by @espokaos-ops on 2026-10-03 directly against https://opencode.ai/zen/v1).
 */
export const OPENCODE_MEASURED_MINIMUM_FINGERPRINT_TOOLS: readonly string[] = ["bash", "read"];

const FINGERPRINT_SET: ReadonlySet<string> = new Set(OPENCODE_FINGERPRINT_TOOLS);

/**
 * Description for a quartet member this layer injected. The injection exists only to
 * satisfy the gate, so the text steers the model away from ever selecting it.
 */
export const FINGERPRINT_TOOL_DESCRIPTION =
  "Do not call this tool. It exists only for API compatibility and must never be invoked.";

const PLACEHOLDER_TOOL_PARAMETERS = { type: "object", properties: {} } as const;

/** Canonical lowercase name when `name` is a quartet member; "" otherwise. */
export function fingerprintToolKey(name: unknown): string {
  const lower = String(name ?? "")
    .trim()
    .toLowerCase();
  return FINGERPRINT_SET.has(lower) ? lower : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Read a tool name from either flat ({name}) or chat ({function:{name}}) shape. */
function toolNameOf(tool: Record<string, unknown>): string {
  if (typeof tool.name === "string" && tool.name.trim()) return tool.name.trim();
  const fn = tool.function;
  if (isRecord(fn) && typeof fn.name === "string") return fn.name.trim();
  return "";
}

export interface FingerprintConcealResult {
  readonly tools: unknown;
  /** sent canonical name -> the caller's original spelling */
  readonly map: Map<string, string>;
}

/**
 * Canonicalise only the fingerprint quartet and drop duplicate quartet variants.
 *
 * Non-quartet tools are preserved verbatim, including tools whose names differ only by
 * case — they are outside the upstream's fingerprint contract.
 */
export function concealFingerprintToolNames(tools: unknown): FingerprintConcealResult {
  const map = new Map<string, string>();
  if (!Array.isArray(tools) || tools.length === 0) return { tools, map };

  const seenQuartet = new Set<string>();
  const out: unknown[] = [];
  // Nothing to canonicalise is the common case; keeping the original array identity lets
  // callers skip re-serialising (and lets `mergeClientToolsWithObserved` report "no change").
  let changed = false;
  for (const tool of tools) {
    if (!isRecord(tool)) {
      out.push(tool);
      continue;
    }

    const current = toolNameOf(tool);
    const key = fingerprintToolKey(current);
    if (!key) {
      out.push(tool);
      continue;
    }

    // `Bash` + `bash` is a duplicate declaration; keep exactly one per quartet member.
    if (seenQuartet.has(key)) {
      changed = true;
      continue;
    }
    seenQuartet.add(key);

    if (current !== key) {
      changed = true;
      map.set(key, current);
      const fn = isRecord(tool.function) ? tool.function : null;
      out.push(fn ? { ...tool, function: { ...fn, name: key } } : { ...tool, name: key });
    } else {
      out.push(tool);
    }
  }
  return { tools: changed ? out : tools, map };
}

/** Point an explicit tool_choice at a quartet member after canonicalisation. */
export function retargetToolChoice(body: unknown, map: ReadonlyMap<string, string>): void {
  if (!isRecord(body) || map.size === 0) return;
  const choice = body.tool_choice;
  if (!isRecord(choice)) return;

  if (typeof choice.name === "string") {
    const key = fingerprintToolKey(choice.name);
    if (key && map.has(key)) body.tool_choice = { ...choice, name: key };
    return;
  }

  const fn = isRecord(choice.function) ? choice.function : null;
  if (fn && typeof fn.name === "string") {
    const key = fingerprintToolKey(fn.name);
    if (key && map.has(key)) body.tool_choice = { ...choice, function: { ...fn, name: key } };
  }
}

/** Rename maps by body identity, so a shared executor never crosses two in-flight requests. */
const renamedToolNames = new WeakMap<object, Map<string, string>>();

/** Store the rename map for `body`. */
export function recordRenamedToolNames(body: unknown, map: ReadonlyMap<string, string>): void {
  if (!isRecord(body) || map.size === 0) return;
  renamedToolNames.set(body, new Map(map));
}

/** Retrieve the rename map recorded for `body`, or null when nothing was renamed. */
export function renamedToolNamesFor(body: unknown): ReadonlyMap<string, string> | null {
  if (!isRecord(body)) return null;
  return renamedToolNames.get(body) ?? null;
}

/**
 * Build the list entry this layer injects for a missing quartet member.
 *
 * A list entry with an empty parameter object and a description telling the model not to
 * call it: the injection exists to satisfy the gate, never to be selected.
 *
 * @param flat true for the Responses shape ({name}), false for Chat Completions
 *   ({function:{name}})
 */
export function fingerprintPlaceholderTool(name: string, flat: boolean): Record<string, unknown> {
  return flat
    ? {
        type: "function",
        name,
        description: FINGERPRINT_TOOL_DESCRIPTION,
        parameters: PLACEHOLDER_TOOL_PARAMETERS,
      }
    : {
        type: "function",
        function: {
          name,
          description: FINGERPRINT_TOOL_DESCRIPTION,
          parameters: PLACEHOLDER_TOOL_PARAMETERS,
        },
      };
}

/**
 * Restore the caller's tool spellings in every response/event shape the opencode family
 * can emit: Claude streaming and JSON blocks, OpenAI Chat Completions deltas and JSON
 * messages, and the Responses API JSON body plus its SSE `item` events.
 *
 * Returns the input unchanged (same identity) when nothing matched, so callers can use
 * identity to skip re-serializing.
 */
export function restoreToolNames(payload: unknown, map: ReadonlyMap<string, string>): unknown {
  if (map.size === 0 || payload === null || typeof payload !== "object") return payload;
  if (Array.isArray(payload)) return payload.map((item) => restoreToolNames(item, map));

  const record = payload as Record<string, unknown>;
  let out = record;
  const put = (key: string, value: unknown): void => {
    if (out === record) out = { ...record };
    out[key] = value;
  };

  // Claude streaming content_block_start event.
  const block = record.content_block;
  if (
    record.type === "content_block_start" &&
    isRecord(block) &&
    block.type === "tool_use" &&
    typeof block.name === "string" &&
    map.has(block.name)
  ) {
    put("content_block", { ...block, name: map.get(block.name) });
  }

  // Claude non-streaming message body.
  if (Array.isArray(record.content)) {
    let changed = false;
    const next = record.content.map((item) => {
      if (
        isRecord(item) &&
        item.type === "tool_use" &&
        typeof item.name === "string" &&
        map.has(item.name)
      ) {
        changed = true;
        return { ...item, name: map.get(item.name) };
      }
      return item;
    });
    if (changed) put("content", next);
  }

  // OpenAI Chat Completions, both the streaming delta and the JSON message shapes.
  if (Array.isArray(record.choices)) {
    let changed = false;
    const next = record.choices.map((choice) => {
      if (!isRecord(choice)) return choice;
      let choiceChanged = false;
      const updated: Record<string, unknown> = { ...choice };
      for (const holder of ["delta", "message"] as const) {
        const value = choice[holder];
        if (!isRecord(value) || !Array.isArray(value.tool_calls) || value.tool_calls.length === 0) {
          continue;
        }
        let callsChanged = false;
        const calls = value.tool_calls.map((call) => {
          if (!isRecord(call)) return call;
          const fn = call.function;
          if (isRecord(fn) && typeof fn.name === "string" && map.has(fn.name)) {
            callsChanged = true;
            return { ...call, function: { ...fn, name: map.get(fn.name) } };
          }
          return call;
        });
        if (callsChanged) {
          updated[holder] = { ...value, tool_calls: calls };
          choiceChanged = true;
        }
      }
      if (!choiceChanged) return choice;
      changed = true;
      return updated;
    });
    if (changed) put("choices", next);
  }

  // OpenAI Responses final JSON body.
  if (Array.isArray(record.output)) {
    let changed = false;
    const next = record.output.map((item) => {
      if (
        isRecord(item) &&
        item.type === "function_call" &&
        typeof item.name === "string" &&
        map.has(item.name)
      ) {
        changed = true;
        return { ...item, name: map.get(item.name) };
      }
      return item;
    });
    if (changed) put("output", next);
  }

  // OpenAI Responses SSE events such as response.output_item.added / .done.
  const item = record.item;
  if (
    isRecord(item) &&
    item.type === "function_call" &&
    typeof item.name === "string" &&
    map.has(item.name)
  ) {
    put("item", { ...item, name: map.get(item.name) });
  }

  return out;
}

/** Rewrite one SSE line, leaving non-data lines and unparseable payloads untouched. */
function rewriteDataLine(line: string, map: ReadonlyMap<string, string>): string {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith("data:")) return line;
  const payload = trimmed.slice(5).trim();
  if (!payload || payload === "[DONE]") return line;
  let parsed: unknown;
  try {
    parsed = JSON.parse(payload);
  } catch {
    return line;
  }
  const restored = restoreToolNames(parsed, map);
  if (restored === parsed) return line;
  return `data: ${JSON.stringify(restored)}`;
}

function restoreJsonBody(upstream: Response, map: ReadonlyMap<string, string>): Response {
  let drained = false;
  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        if (drained) {
          controller.close();
          return;
        }
        drained = true;
        try {
          const text = await upstream.text();
          let out = text;
          try {
            const parsed: unknown = JSON.parse(text);
            out = JSON.stringify(restoreToolNames(parsed, map));
          } catch {
            /* not JSON — forward verbatim */
          }
          controller.enqueue(new TextEncoder().encode(out));
        } catch (err) {
          controller.error(err);
          return;
        }
        controller.close();
      },
      cancel(reason) {
        if (!drained && !upstream.bodyUsed && upstream.body && !upstream.body.locked) {
          void upstream.body.cancel(reason);
        }
      },
    },
    { highWaterMark: 0 }
  );
  const headers = new Headers(upstream.headers);
  headers.delete("content-length");
  return new Response(body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

function restoreSseBody(upstream: Response, map: ReadonlyMap<string, string>): Response {
  const reader = upstream.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let closed = false;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (!closed) {
          const { done, value } = await reader.read();
          if (done) {
            buffer += decoder.decode();
            if (buffer.length > 0 && !closed) {
              controller.enqueue(encoder.encode(rewriteDataLine(buffer, map)));
            }
            if (!closed) {
              closed = true;
              controller.close();
            }
            return;
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            controller.enqueue(encoder.encode(rewriteDataLine(line, map) + "\n"));
          }
        }
      } catch (err) {
        if (!closed) {
          closed = true;
          controller.error(err);
        }
      }
    },
    cancel(reason) {
      closed = true;
      reader.cancel(reason).catch(() => undefined);
    },
  });
  return new Response(stream, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
  });
}

/**
 * Wrap a successful upstream response so the caller sees its own tool spellings again.
 *
 * Applied at the outermost layer of the executor, AFTER a forced stream has been rebuilt
 * into JSON, so both the streaming and the buffered client paths are covered by one pass.
 * A refusal (or an empty body) passes through untouched — there is nothing to restore, and
 * the executor still needs to read those bodies itself.
 */
export function restoreFingerprintToolNames(
  response: Response,
  map: ReadonlyMap<string, string> | null
): Response {
  if (!map || map.size === 0 || !response.ok || !response.body) return response;
  const renameMap = map;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/event-stream")) return restoreSseBody(response, renameMap);
  if (contentType.includes("application/json")) return restoreJsonBody(response, renameMap);
  return response;
}
