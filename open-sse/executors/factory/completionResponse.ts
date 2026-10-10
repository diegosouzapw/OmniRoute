import { parseLooseJsonObject, toArgumentsString } from "../../translator/webTools.ts";
import { parseDsmlToolCalls, hasDsmlToolCalls } from "../../utils/dsmlToolCalls.ts";

export const FACTORY_MAX_PENDING_TOOL_BYTES = 1024 * 1024; // 1MB

function randomHex(bytesCount: number): string {
  const bytes = new Uint8Array(bytesCount);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytesCount; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function extractDeclaredToolNames(tools: unknown): Record<string, true> {
  const map: Record<string, true> = {};
  if (Array.isArray(tools)) {
    for (const t of tools) {
      if (t && typeof t === "object") {
        const fn = (t as Record<string, unknown>).function;
        const name =
          fn && typeof fn === "object"
            ? (fn as Record<string, unknown>).name
            : (t as Record<string, unknown>).name;
        if (typeof name === "string" && name.trim()) {
          map[name.trim()] = true;
        }
      }
    }
  }
  return map;
}

export function parseEmbeddedToolName(
  rawName: string
): { name: string; arguments?: Record<string, unknown> } | null {
  if (typeof rawName !== "string" || !rawName.trimStart().startsWith("{")) {
    return null;
  }
  const parsed = parseLooseJsonObject(rawName);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

  const toolName = parsed.name || parsed.type;
  if (typeof toolName !== "string" || toolName.trim().length === 0) {
    return null;
  }

  let args = parsed.arguments ?? parsed.parameters;
  if (typeof args === "string") {
    try {
      args = JSON.parse(args);
    } catch {
      // keep as-is if string
    }
  }
  if (!args || typeof args !== "object" || Array.isArray(args)) {
    args = undefined;
  }

  return {
    name: toolName.trim(),
    arguments: args as Record<string, unknown> | undefined,
  };
}

interface InbandToolCall {
  id: string;
  name: string;
  arguments: string;
}

function findCodeFenceRanges(text: string): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];
  const regex = /```[\s\S]*?```/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    ranges.push({ start: match.index, end: match.index + match[0].length });
  }
  return ranges;
}

function isInsideRange(index: number, ranges: Array<{ start: number; end: number }>): boolean {
  for (const range of ranges) {
    if (index >= range.start && index < range.end) return true;
  }
  return false;
}

export function parseInbandMarkup(
  text: string,
  declaredTools: Record<string, true>
): { toolCalls: InbandToolCall[]; scrubbedText: string } {
  const toolCalls: InbandToolCall[] = [];
  const fences = findCodeFenceRanges(text);
  const removals: Array<{ start: number; end: number }> = [];

  // 1. Hermes tool_call envelopes: <tool_call>...</tool_call>
  const hermesRegex = /<tool_call>([\s\S]*?)<\/tool_call>/gi;
  let hermesMatch: RegExpExecArray | null;
  while ((hermesMatch = hermesRegex.exec(text)) !== null) {
    if (isInsideRange(hermesMatch.index, fences)) continue;
    const inner = hermesMatch[1].trim();
    const parsed = parseLooseJsonObject(inner);
    if (parsed && typeof parsed.name === "string") {
      const name = parsed.name.trim();
      if (declaredTools[name]) {
        toolCalls.push({
          id: `call_${randomHex(12)}`,
          name,
          arguments: toArgumentsString(parsed.arguments ?? {}),
        });
        removals.push({ start: hermesMatch.index, end: hermesMatch.index + hermesMatch[0].length });
      }
    }
  }

  // 2. Kimi tool_call markup: <|tool_call_begin|>...<|tool_call_end|>
  const kimiRegex = /<\|tool_call_begin\|>([\s\S]*?)<\|tool_call_end\|>/gi;
  let kimiMatch: RegExpExecArray | null;
  while ((kimiMatch = kimiRegex.exec(text)) !== null) {
    if (isInsideRange(kimiMatch.index, fences)) continue;
    const inner = kimiMatch[1].trim();
    const parts = inner.split("<|tool_call_argument_begin|>");
    const rawName = parts[0].trim();
    const rawArgs = parts.slice(1).join("<|tool_call_argument_begin|>").trim();
    const cleanName = rawName.includes(":") ? rawName.split(":")[0].trim() : rawName;
    if (cleanName && declaredTools[cleanName]) {
      const parsedArgs = parseLooseJsonObject(rawArgs) ?? {};
      toolCalls.push({
        id: `call_${randomHex(12)}`,
        name: cleanName,
        arguments: toArgumentsString(parsedArgs),
      });
      removals.push({ start: kimiMatch.index, end: kimiMatch.index + kimiMatch[0].length });
    }
  }

  // 3. DeepSeek DSML tool calls
  if (hasDsmlToolCalls(text)) {
    const dsmlParsed = parseDsmlToolCalls(text);
    if (dsmlParsed.toolCalls && dsmlParsed.toolCalls.length > 0) {
      for (const call of dsmlParsed.toolCalls) {
        const name = call.function.name;
        if (name && declaredTools[name]) {
          toolCalls.push({
            id: call.id,
            name,
            arguments: call.function.arguments,
          });
        }
      }
      if (toolCalls.length > 0) {
        return { toolCalls, scrubbedText: dsmlParsed.content.trim() };
      }
    }
  }

  // Remove valid extracted envelopes from text
  if (removals.length === 0) {
    return { toolCalls, scrubbedText: text };
  }

  removals.sort((a, b) => b.start - a.start);
  let scrubbed = text;
  for (const rem of removals) {
    scrubbed = scrubbed.slice(0, rem.start) + scrubbed.slice(rem.end);
  }

  // Clean trailing section delimiters from Kimi
  scrubbed = scrubbed
    .replace(/<\|tool_calls_section_begin\|>/gi, "")
    .replace(/<\|tool_calls_section_end\|>/gi, "")
    .trim();

  return { toolCalls, scrubbedText: scrubbed };
}

export function normalizeFactoryCompletionJson(
  body: Record<string, unknown>,
  model: string,
  tools: unknown
): Record<string, unknown> {
  const declaredTools = extractDeclaredToolNames(tools);
  const isDeepseek = model.startsWith("deepseek-");
  const isKimi = model.startsWith("kimi-");
  const isGlm = model.startsWith("glm-");
  const isInbandCandidate = isDeepseek || isKimi || isGlm;

  if (Array.isArray(body.choices)) {
    for (const choice of body.choices as Record<string, unknown>[]) {
      if (!choice || typeof choice !== "object") continue;
      const msg = choice.message as Record<string, unknown> | undefined;
      if (!msg || typeof msg !== "object") continue;

      // 1. Repair embedded JSON function.name
      if (Array.isArray(msg.tool_calls)) {
        for (const tc of msg.tool_calls as Record<string, unknown>[]) {
          const fn = tc.function as Record<string, unknown> | undefined;
          if (fn && typeof fn.name === "string" && fn.name.trimStart().startsWith("{")) {
            const embedded = parseEmbeddedToolName(fn.name);
            if (embedded) {
              const origArgs = typeof fn.arguments === "string" ? fn.arguments.trim() : "";
              const hasExplicitArgs = origArgs !== "" && origArgs !== "{}";
              fn.name = embedded.name;
              if (!hasExplicitArgs && embedded.arguments !== undefined) {
                fn.arguments = toArgumentsString(embedded.arguments);
              }
            }
          }
        }
      }

      // 2. Inband markup in message content
      if (isInbandCandidate && typeof msg.content === "string" && msg.content.length > 0) {
        const inband = parseInbandMarkup(msg.content, declaredTools);
        if (inband.toolCalls.length > 0) {
          msg.content = inband.scrubbedText;
          const existingCalls = Array.isArray(msg.tool_calls) ? msg.tool_calls : [];
          const converted = inband.toolCalls.map((tc) => ({
            id: tc.id,
            type: "function",
            function: {
              name: tc.name,
              arguments: tc.arguments,
            },
          }));
          msg.tool_calls = [...existingCalls, ...converted];
          choice.finish_reason = "tool_calls";
        }
      }
    }
  }

  return body;
}

interface ToolNameState {
  bufferedName: string;
  isEmbedded: boolean | null;
  emittedName: string | null;
  explicitArgs: string;
  hasExplicitArgs: boolean;
  toolId: string | null;
}

export async function normalizeFactoryCompletionResponse(
  response: Response,
  model: string,
  tools: unknown,
  signal?: AbortSignal | null
): Promise<Response> {
  const contentType = response.headers.get("content-type") || "";
  const isEventStream = contentType.includes("text/event-stream");

  if (!isEventStream) {
    const rawText = await response.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawText) as Record<string, unknown>;
    } catch {
      return new Response(rawText, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    const normalized = normalizeFactoryCompletionJson(body, model, tools);
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(JSON.stringify(normalized), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  // Streaming SSE transformation
  const declaredTools = extractDeclaredToolNames(tools);
  const isDeepseek = model.startsWith("deepseek-");
  const isKimi = model.startsWith("kimi-");
  const isGlm = model.startsWith("glm-");
  const isInbandCandidate = isDeepseek || isKimi || isGlm;

  const upstreamBody = response.body;
  if (!upstreamBody) {
    return response;
  }

  const upstreamReader = upstreamBody.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  let lineBuffer = "";
  let finished = false;
  let terminalFrameSent = false;
  let currentToolIndex = 0;

  // Tool name buffering per index
  const toolStates = new Map<number, ToolNameState>();

  // Inband content envelope buffer
  let inbandBuffer = "";
  let inCodeFence = false;
  let hasEmittedToolCalls = false;
  const abortHandler = () => {
    upstreamReader.cancel().catch(() => {});
  };
  if (signal) {
    signal.addEventListener("abort", abortHandler, { once: true });
  }

  const transformStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (!finished) {
          if (signal?.aborted) {
            await upstreamReader.cancel();
            break;
          }

          const { done, value } = await upstreamReader.read();
          if (done) {
            finished = true;
            break;
          }

          lineBuffer += decoder.decode(value, { stream: true });
          const lines = lineBuffer.split("\n");
          lineBuffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.replace(/\r$/, "");
            if (line.trim() === "") {
              continue;
            }

            if (line.startsWith("data:")) {
              const dataPayload = line.slice(5).trim();
              if (dataPayload === "[DONE]") {
                // Flush any remaining tool names or inband buffers before [DONE]
                flushPendingToolStates(controller, toolStates, encoder);
                flushInbandBuffer(controller, inbandBuffer, declaredTools, encoder);
                if (!terminalFrameSent) {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  terminalFrameSent = true;
                }
                finished = true;
                break;
              }

              let chunkObj: Record<string, unknown> | null = null;
              try {
                chunkObj = JSON.parse(dataPayload);
              } catch {
                // If not valid JSON, pass raw line through
                controller.enqueue(encoder.encode(`${line}\n\n`));
                continue;
              }

              if (!chunkObj || typeof chunkObj !== "object") {
                controller.enqueue(encoder.encode(`${line}\n\n`));
                continue;
              }

              const choice = Array.isArray(chunkObj.choices)
                ? (chunkObj.choices[0] as Record<string, unknown> | undefined)
                : undefined;
              const delta = choice?.delta as Record<string, unknown> | undefined;

              if (delta) {
                // 1. Process delta.tool_calls
                if (Array.isArray(delta.tool_calls)) {
                  const filteredToolCalls: Record<string, unknown>[] = [];

                  for (const tc of delta.tool_calls as Record<string, unknown>[]) {
                    const idx = typeof tc.index === "number" ? tc.index : currentToolIndex;
                    if (!toolStates.has(idx)) {
                      toolStates.set(idx, {
                        bufferedName: "",
                        isEmbedded: null,
                        emittedName: null,
                        explicitArgs: "",
                        hasExplicitArgs: false,
                        toolId: typeof tc.id === "string" ? tc.id : null,
                      });
                    }
                    const state = toolStates.get(idx)!;
                    if (typeof tc.id === "string" && !state.toolId) {
                      state.toolId = tc.id;
                    }

                    const fn = tc.function as Record<string, unknown> | undefined;
                    if (fn) {
                      if (typeof fn.arguments === "string" && fn.arguments.trim().length > 0) {
                        state.explicitArgs += fn.arguments;
                        state.hasExplicitArgs = true;
                      }

                      if (typeof fn.name === "string") {
                        state.bufferedName += fn.name;

                        if (state.isEmbedded === null) {
                          state.isEmbedded = state.bufferedName.trimStart().startsWith("{");
                        }

                        if (state.isEmbedded) {
                          if (state.bufferedName.length > FACTORY_MAX_PENDING_TOOL_BYTES) {
                            throw new Error("Factory pending tool bytes limit exceeded (1MB)");
                          }

                          const embedded = parseEmbeddedToolName(state.bufferedName);
                          if (embedded) {
                            state.emittedName = embedded.name;
                            const hasExplicit =
                              state.hasExplicitArgs && state.explicitArgs.trim() !== "{}";
                            const effectiveArgs = hasExplicit
                              ? (fn.arguments ?? "")
                              : toArgumentsString(embedded.arguments ?? {});
                            const modTc = {
                              ...tc,
                              function: {
                                ...fn,
                                name: embedded.name,
                                arguments: effectiveArgs,
                              },
                            };
                            filteredToolCalls.push(modTc);
                          }
                          // While embedded JSON is still incomplete, hold back emitting name chunk
                          continue;
                        }
                      }
                    }

                    filteredToolCalls.push(tc);
                  }

                  if (filteredToolCalls.length > 0) {
                    hasEmittedToolCalls = true;
                  }
                  delta.tool_calls = filteredToolCalls;
                }

                // 2. Inband content parsing for GLM/Kimi/DeepSeek
                if (isInbandCandidate && typeof delta.content === "string") {
                  const contentChunk = delta.content;

                  // Update code-fence tracking
                  const fenceMatches = contentChunk.match(/```/g);
                  if (fenceMatches) {
                    for (let f = 0; f < fenceMatches.length; f++) {
                      inCodeFence = !inCodeFence;
                    }
                  }

                  if (inCodeFence) {
                    // Inside code fence: never executable tool call
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunkObj)}\n\n`));
                    continue;
                  }

                  // Look for tag start
                  const hasTagStart =
                    contentChunk.includes("<tool_call>") ||
                    contentChunk.includes("<|tool_call_begin|>") ||
                    contentChunk.includes("<｜DSML｜") ||
                    contentChunk.includes("<|DSML|:");

                  if (hasTagStart || inbandBuffer.length > 0) {
                    inbandBuffer += contentChunk;
                    if (inbandBuffer.length > FACTORY_MAX_PENDING_TOOL_BYTES) {
                      throw new Error("Factory pending inband tool bytes limit exceeded (1MB)");
                    }

                    const inband = parseInbandMarkup(inbandBuffer, declaredTools);
                    if (inband.toolCalls.length > 0) {
                      hasEmittedToolCalls = true;
                      inbandBuffer = "";
                      if (inband.scrubbedText && inband.scrubbedText.length > 0) {
                        const textChunk = {
                          id: chunkObj.id,
                          object: chunkObj.object,
                          created: chunkObj.created,
                          model: chunkObj.model,
                          choices: [
                            {
                              index: 0,
                              delta: {
                                role: "assistant",
                                content: inband.scrubbedText,
                              },
                              finish_reason: null,
                            },
                          ],
                        };
                        controller.enqueue(
                          encoder.encode(`data: ${JSON.stringify(textChunk)}\n\n`)
                        );
                      }
                      for (const call of inband.toolCalls) {
                        const toolChunk = {
                          id: chunkObj.id,
                          object: chunkObj.object,
                          created: chunkObj.created,
                          model: chunkObj.model,
                          choices: [
                            {
                              index: 0,
                              delta: {
                                role: "assistant",
                                tool_calls: [
                                  {
                                    index: currentToolIndex++,
                                    id: call.id,
                                    type: "function",
                                    function: {
                                      name: call.name,
                                      arguments: call.arguments,
                                    },
                                  },
                                ],
                              },
                              finish_reason: null,
                            },
                          ],
                        };
                        controller.enqueue(
                          encoder.encode(`data: ${JSON.stringify(toolChunk)}\n\n`)
                        );
                      }
                      continue;
                    }

                    // Check if tag is closed but unknown/malformed
                    const isClosed =
                      inbandBuffer.includes("</tool_call>") ||
                      inbandBuffer.includes("<|tool_call_end|>") ||
                      inbandBuffer.includes("</｜DSML｜");
                    if (isClosed) {
                      // Flush as text
                      delta.content = inbandBuffer;
                      inbandBuffer = "";
                    } else {
                      // Still buffering tag envelope
                      continue;
                    }
                  }
                }
              }
              if (choice && choice.finish_reason === "stop" && hasEmittedToolCalls) {
                choice.finish_reason = "tool_calls";
              }

              controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunkObj)}\n\n`));
            } else {
              controller.enqueue(encoder.encode(`${line}\n\n`));
            }
          }
        }

        // Final line buffer flush if any
        if (lineBuffer.trim().length > 0) {
          if (lineBuffer.startsWith("data:") && lineBuffer.slice(5).trim() === "[DONE]") {
            if (!terminalFrameSent) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              terminalFrameSent = true;
            }
          } else {
            controller.enqueue(encoder.encode(`${lineBuffer}\n\n`));
          }
        }

        if (!terminalFrameSent) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          terminalFrameSent = true;
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      } finally {
        if (signal) {
          signal.removeEventListener("abort", abortHandler);
        }
      }
    },
    cancel() {
      upstreamReader.cancel().catch(() => {});
    },
  });

  return new Response(transformStream, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function flushPendingToolStates(
  controller: ReadableStreamDefaultController<Uint8Array>,
  toolStates: Map<number, ToolNameState>,
  encoder: TextEncoder
): void {
  for (const [idx, state] of toolStates.entries()) {
    if (state.isEmbedded === true && state.emittedName === null && state.bufferedName.length > 0) {
      // Malformed or incomplete embedded JSON unchanged
      const fallbackChunk = {
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: idx,
                  id: state.toolId || `call_${randomHex(12)}`,
                  type: "function",
                  function: {
                    name: state.bufferedName,
                    arguments: state.explicitArgs || "{}",
                  },
                },
              ],
            },
          },
        ],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(fallbackChunk)}\n\n`));
    }
  }
}

function flushInbandBuffer(
  controller: ReadableStreamDefaultController<Uint8Array>,
  inbandBuffer: string,
  declaredTools: Record<string, true>,
  encoder: TextEncoder
): void {
  if (inbandBuffer.length === 0) return;
  const inband = parseInbandMarkup(inbandBuffer, declaredTools);
  if (inband.toolCalls.length > 0) {
    if (inband.scrubbedText && inband.scrubbedText.length > 0) {
      const textChunk = {
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              content: inband.scrubbedText,
            },
            finish_reason: null,
          },
        ],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(textChunk)}\n\n`));
    }
    for (const call of inband.toolCalls) {
      const toolChunk = {
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              tool_calls: [
                {
                  index: 0,
                  id: call.id,
                  type: "function",
                  function: {
                    name: call.name,
                    arguments: call.arguments,
                  },
                },
              ],
            },
          },
        ],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(toolChunk)}\n\n`));
    }
  } else {
    const textChunk = {
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            content: inbandBuffer,
          },
        },
      ],
    };
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(textChunk)}\n\n`));
  }
}
