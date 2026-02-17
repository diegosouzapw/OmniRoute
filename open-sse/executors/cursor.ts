/**
 * CursorExecutor — Handles communication with the Cursor IDE API.
 *
 * This executor is the most complex due to Cursor's non-standard protocol:
 *
 * SECTION 1: Authentication (generateChecksum)
 *   - SHA-256 based checksum using machine ID and timestamp
 *   - WorkOS token refresh for session management
 *
 * SECTION 2: Request Encoding (transformRequest, buildHeaders)
 *   - ConnectRPC Protobuf binary encoding via cursorProtobuf.js
 *   - Chat body construction with model routing
 *
 * SECTION 3: Response Parsing (executeStream, parseEvent*)
 *   - Binary EventStream → SSE text conversion
 *   - Gzip decompression of response frames
 *   - HTTP/2 support with h2 fallback to fetch
 *
 * @see cursorProtobuf.js for Protobuf encoding/decoding utilities
 */

import { BaseExecutor } from "./base.js";
import { PROVIDERS, HTTP_STATUS } from "../config/constants.js";
import {
  generateCursorBody,
  parseConnectRPCFrame,
  extractTextFromResponse,
} from "../utils/cursorProtobuf.js";
import { estimateUsage } from "../utils/usageTracking.js";
import { FORMATS } from "../translator/formats.js";
import { buildCursorRequest } from "../translator/request/openai-to-cursor.js";
import crypto from "crypto";
import { v5 as uuidv5 } from "uuid";
import zlib from "zlib";

// Detect cloud environment
const isCloudEnv = () => {
  if (typeof caches !== "undefined" && typeof caches === "object") return true;
  // @ts-ignore — EdgeRuntime is a global in edge runtimes
  if (typeof EdgeRuntime !== "undefined") return true;
  return false;
};

// Lazy import http2 (only in Node.js environment)
let http2 = null;
if (!isCloudEnv()) {
  try {
    http2 = await import("http2");
  } catch {
    // http2 not available
  }
}

// --- SECTION 1: Authentication Constants ---
const COMPRESS_FLAG = {
  NONE: 0x00,
  GZIP: 0x01,
  GZIP_ALT: 0x02,
  GZIP_BOTH: 0x03,
};

function decompressPayload(payload, flags) {
  // Check if payload is JSON error (starts with {"error")
  if (payload.length > 10 && payload[0] === 0x7b && payload[1] === 0x22) {
    try {
      const text = payload.toString("utf-8");
      if (text.startsWith('{"error"')) {
        console.log(`[DECOMPRESS] Detected JSON error, skipping decompression`);
        return payload;
      }
    } catch {}
  }

  if (
    flags === COMPRESS_FLAG.GZIP ||
    flags === COMPRESS_FLAG.GZIP_ALT ||
    flags === COMPRESS_FLAG.GZIP_BOTH
  ) {
    try {
      return zlib.gunzipSync(payload);
    } catch (err) {
      console.log(
        `[DECOMPRESS ERROR] flags=${flags}, payloadSize=${payload.length}, error=${err.message}`
      );
      console.log(`[DECOMPRESS ERROR] First 50 bytes (hex):`, payload.slice(0, 50).toString("hex"));
      console.log(
        `[DECOMPRESS ERROR] First 50 bytes (utf8):`,
        payload
          .slice(0, 50)
          .toString("utf8")
          .replace(/[^\x20-\x7E]/g, ".")
      );
      // Try to use payload as-is if decompression fails
      return payload;
    }
  }
  return payload;
}

function createErrorResponse(jsonError) {
  const errorMsg =
    jsonError?.error?.details?.[0]?.debug?.details?.title ||
    jsonError?.error?.details?.[0]?.debug?.details?.detail ||
    jsonError?.error?.message ||
    "API Error";

  const isRateLimit = jsonError?.error?.code === "resource_exhausted";

  return new Response(
    JSON.stringify({
      error: {
        message: errorMsg,
        type: isRateLimit ? "rate_limit_error" : "api_error",
        code: jsonError?.error?.details?.[0]?.debug?.error || "unknown",
      },
    }),
    {
      status: isRateLimit ? HTTP_STATUS.RATE_LIMITED : HTTP_STATUS.BAD_REQUEST,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export class CursorExecutor extends BaseExecutor {
  constructor() {
    super("cursor", PROVIDERS.cursor);
  }

  buildUrl() {
    return `${this.config.baseUrl}${this.config.chatPath}`;
  }

  // Jyh cipher checksum for Cursor API authentication
  generateChecksum(machineId) {
    const timestamp = Math.floor(Date.now() / 1000000);
    const byteArray = new Uint8Array([
      (timestamp >> 40) & 0xff,
      (timestamp >> 32) & 0xff,
      (timestamp >> 24) & 0xff,
      (timestamp >> 16) & 0xff,
      (timestamp >> 8) & 0xff,
      timestamp & 0xff,
    ]);

    let t = 165;
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = ((byteArray[i] ^ t) + (i % 256)) & 0xff;
      t = byteArray[i];
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let encoded = "";

    for (let i = 0; i < byteArray.length; i += 3) {
      const a = byteArray[i];
      const b = i + 1 < byteArray.length ? byteArray[i + 1] : 0;
      const c = i + 2 < byteArray.length ? byteArray[i + 2] : 0;

      encoded += alphabet[a >> 2];
      encoded += alphabet[((a & 3) << 4) | (b >> 4)];

      if (i + 1 < byteArray.length) {
        encoded += alphabet[((b & 15) << 2) | (c >> 6)];
      }
      if (i + 2 < byteArray.length) {
        encoded += alphabet[c & 63];
      }
    }

    return `${encoded}${machineId}`;
  }

  buildHeaders(credentials) {
    const accessToken = credentials.accessToken;
    const machineId = credentials.providerSpecificData?.machineId;
    const ghostMode = credentials.providerSpecificData?.ghostMode !== false;

    if (!machineId) {
      throw new Error("Machine ID is required for Cursor API");
    }

    const cleanToken = accessToken.includes("::") ? accessToken.split("::")[1] : accessToken;

    return {
      authorization: `Bearer ${cleanToken}`,
      "connect-accept-encoding": "gzip",
      "connect-protocol-version": "1",
      "content-type": "application/connect+proto",
      "user-agent": "connect-es/1.6.1",
      "x-amzn-trace-id": `Root=${crypto.randomUUID()}`,
      "x-client-key": crypto.createHash("sha256").update(cleanToken).digest("hex"),
      "x-cursor-checksum": this.generateChecksum(machineId),
      "x-cursor-client-version": "2.3.41",
      "x-cursor-client-type": "ide",
      "x-cursor-client-os":
        process.platform === "win32"
          ? "windows"
          : process.platform === "darwin"
            ? "macos"
            : "linux",
      "x-cursor-client-arch": process.arch === "arm64" ? "aarch64" : "x64",
      "x-cursor-client-device-type": "desktop",
      "x-cursor-config-version": crypto.randomUUID(),
      "x-cursor-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      "x-ghost-mode": ghostMode ? "true" : "false",
      "x-request-id": crypto.randomUUID(),
      "x-session-id": uuidv5(cleanToken, uuidv5.DNS),
    };
  }

  transformRequest(model, body, stream, credentials) {
    // Call translator to convert OpenAI format to Cursor format
    const translatedBody = buildCursorRequest(model, body, stream, credentials);
    const messages = translatedBody.messages || [];
    const tools = translatedBody.tools || body.tools || [];
    const reasoningEffort = body.reasoning_effort || null;
    return generateCursorBody(messages, model, tools, reasoningEffort);
  }

  async makeFetchRequest(url, headers, body, signal) {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
      signal,
    });

    return {
      status: response.status,
      // @ts-ignore — Headers.entries() exists at runtime
      headers: Object.fromEntries(response.headers.entries()),
      body: Buffer.from(await response.arrayBuffer()),
    };
  }

  makeHttp2Request(url, headers, body, signal) {
    if (!http2) {
      throw new Error("http2 module not available");
    }

    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const client = http2.connect(`https://${urlObj.host}`);
      const chunks = [];
      let responseHeaders = {};

      client.on("error", reject);

      const req = client.request({
        ":method": "POST",
        ":path": urlObj.pathname,
        ":authority": urlObj.host,
        ":scheme": "https",
        ...headers,
      });

      req.on("response", (hdrs) => {
        responseHeaders = hdrs;
      });
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        client.close();
        resolve({
          status: responseHeaders[":status"],
          headers: responseHeaders,
          body: Buffer.concat(chunks),
        });
      });
      req.on("error", (err) => {
        client.close();
        reject(err);
      });

      if (signal) {
        signal.addEventListener("abort", () => {
          req.close();
          client.close();
          reject(new Error("Request aborted"));
        });
      }

      req.write(body);
      req.end();
    });
  }

  async execute({ model, body, stream, credentials, signal, log }) {
    const url = this.buildUrl();
    const headers = this.buildHeaders(credentials);
    const transformedBody = this.transformRequest(model, body, stream, credentials);

    try {
      const response = http2
        ? await this.makeHttp2Request(url, headers, transformedBody, signal)
        : await this.makeFetchRequest(url, headers, transformedBody, signal);

      // @ts-ignore
      if (response.status !== 200) {
        // @ts-ignore
        const errorText = response.body?.toString() || "Unknown error";
        const errorResponse = new Response(
          JSON.stringify({
            error: {
              // @ts-ignore
              message: `[${response.status}]: ${errorText}`,
              type: "invalid_request_error",
              code: "",
            },
          }),
          {
            // @ts-ignore
            status: response.status,
            headers: { "Content-Type": "application/json" },
          }
        );
        return { response: errorResponse, url, headers, transformedBody: body };
      }

      const transformedResponse =
        stream !== false
          // @ts-ignore
          ? this.transformProtobufToSSE(response.body, model, body)
          // @ts-ignore
          : this.transformProtobufToJSON(response.body, model, body);

      return { response: transformedResponse, url, headers, transformedBody: body };
    } catch (error) {
      const errorResponse = new Response(
        JSON.stringify({
          error: {
            message: error.message,
            type: "connection_error",
            code: "",
          },
        }),
        {
          status: HTTP_STATUS.SERVER_ERROR,
          headers: { "Content-Type": "application/json" },
        }
      );
      return { response: errorResponse, url, headers, transformedBody: body };
    }
  }

  transformProtobufToJSON(buffer, model, body) {
    const responseId = `chatcmpl-cursor-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

    let offset = 0;
    let totalContent = "";
    const toolCalls = [];
    const toolCallsMap = new Map(); // Track streaming tool calls by ID
    let frameCount = 0;

    console.log(`[CURSOR BUFFER] Total length: ${buffer.length} bytes`);

    while (offset < buffer.length) {
      if (offset + 5 > buffer.length) {
        console.log(
          `[CURSOR BUFFER] Reached end, offset=${offset}, remaining=${buffer.length - offset}`
        );
        break;
      }

      const flags = buffer[offset];
      const length = buffer.readUInt32BE(offset + 1);

      console.log(
        `[CURSOR BUFFER] Frame ${frameCount + 1}: flags=0x${flags.toString(16).padStart(2, "0")}, length=${length}`
      );

      if (offset + 5 + length > buffer.length) {
        console.log(
          `[CURSOR BUFFER] Incomplete frame, offset=${offset}, length=${length}, buffer.length=${buffer.length}`
        );
        break;
      }

      let payload = buffer.slice(offset + 5, offset + 5 + length);
      offset += 5 + length;
      frameCount++;

      payload = decompressPayload(payload, flags);
      if (!payload) {
        console.log(`[CURSOR BUFFER] Frame ${frameCount}: decompression failed, skipping`);
        continue;
      }

      try {
        const text = payload.toString("utf-8");
        if (text.startsWith("{") && text.includes('"error"')) {
          return createErrorResponse(JSON.parse(text));
        }
      } catch {}

      const result = extractTextFromResponse(new Uint8Array(payload));
      console.log(`[CURSOR DECODED] Frame ${frameCount}:`, result);

      if (result.error) {
        return new Response(
          JSON.stringify({
            error: {
              message: result.error,
              type: "rate_limit_error",
              code: "rate_limited",
            },
          }),
          {
            status: HTTP_STATUS.RATE_LIMITED,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (result.toolCall) {
        const tc = result.toolCall;

        if (toolCallsMap.has(tc.id)) {
          // Accumulate arguments for existing tool call
          const existing = toolCallsMap.get(tc.id);
          existing.function.arguments += tc.function.arguments;
          existing.isLast = tc.isLast;
        } else {
          // New tool call
          toolCallsMap.set(tc.id, { ...tc });
        }

        // Push to final array when isLast is true
        if (tc.isLast) {
          const finalToolCall = toolCallsMap.get(tc.id);
          toolCalls.push({
            id: finalToolCall.id,
            type: finalToolCall.type,
            function: {
              name: finalToolCall.function.name,
              arguments: finalToolCall.function.arguments,
            },
          });
        }
      }

      if (result.text) totalContent += result.text;
    }

    console.log(
      `[CURSOR BUFFER] Parsed ${frameCount} frames, toolCallsMap size: ${toolCallsMap.size}, finalized toolCalls: ${toolCalls.length}`
    );

    // Finalize all remaining tool calls in map (in case stream ended without isLast=true)
    for (const [id, tc] of toolCallsMap.entries()) {
      // Check if already in final array
      if (!toolCalls.find((t) => t.id === id)) {
        console.log(`[CURSOR BUFFER] Finalizing incomplete tool call: ${id}, isLast=${tc.isLast}`);
        toolCalls.push({
          id: tc.id,
          type: tc.type,
          function: {
            name: tc.function.name,
            arguments: tc.function.arguments,
          },
        });
      }
    }

    console.log(`[CURSOR BUFFER] Final toolCalls count: ${toolCalls.length}`);

    const message: Record<string, any> = { role: "assistant",
      content: totalContent || null,
    };

    if (toolCalls.length > 0) {
      message.tool_calls = toolCalls;
    }

    const usage = estimateUsage(body, totalContent.length, FORMATS.OPENAI);

    const completion = {
      id: responseId,
      object: "chat.completion",
      created,
      model,
      choices: [
        {
          index: 0,
          message,
          finish_reason: toolCalls.length > 0 ? "tool_calls" : "stop",
        },
      ],
      usage,
    };

    return new Response(JSON.stringify(completion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  transformProtobufToSSE(buffer, model, body) {
    const responseId = `chatcmpl-cursor-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

    const chunks = [];
    let offset = 0;
    let totalContent = "";
    const toolCalls = [];
    const toolCallsMap = new Map(); // Track streaming tool calls by ID
    let frameCount = 0;

    console.log(`[CURSOR BUFFER SSE] Total length: ${buffer.length} bytes`);

    while (offset < buffer.length) {
      if (offset + 5 > buffer.length) {
        console.log(
          `[CURSOR BUFFER SSE] Reached end, offset=${offset}, remaining=${buffer.length - offset}`
        );
        break;
      }

      const flags = buffer[offset];
      const length = buffer.readUInt32BE(offset + 1);

      console.log(
        `[CURSOR BUFFER SSE] Frame ${frameCount + 1}: flags=0x${flags.toString(16).padStart(2, "0")}, length=${length}`
      );

      if (offset + 5 + length > buffer.length) {
        console.log(
          `[CURSOR BUFFER SSE] Incomplete frame, offset=${offset}, length=${length}, buffer.length=${buffer.length}`
        );
        break;
      }

      let payload = buffer.slice(offset + 5, offset + 5 + length);
      offset += 5 + length;
      frameCount++;

      payload = decompressPayload(payload, flags);
      if (!payload) {
        console.log(`[CURSOR BUFFER SSE] Frame ${frameCount}: decompression failed, skipping`);
        continue;
      }

      try {
        const text = payload.toString("utf-8");
        if (text.startsWith("{") && text.includes('"error"')) {
          return createErrorResponse(JSON.parse(text));
        }
      } catch {}

      const result = extractTextFromResponse(new Uint8Array(payload));
      console.log(`[CURSOR DECODED SSE] Frame ${frameCount}:`, result);

      if (result.error) {
        return new Response(
          JSON.stringify({
            error: {
              message: result.error,
              type: "rate_limit_error",
              code: "rate_limited",
            },
          }),
          {
            status: HTTP_STATUS.RATE_LIMITED,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (result.toolCall) {
        const tc = result.toolCall;

        if (chunks.length === 0) {
          chunks.push(
            `data: ${JSON.stringify({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: { role: "assistant", content: "" },
                  finish_reason: null,
                },
              ],
            })}\n\n`
          );
        }

        if (toolCallsMap.has(tc.id)) {
          // Accumulate arguments for existing tool call
          const existing = toolCallsMap.get(tc.id);
          const oldArgsLen = existing.function.arguments.length;
          existing.function.arguments += tc.function.arguments;
          existing.isLast = tc.isLast;

          // Stream the delta arguments
          if (tc.function.arguments) {
            chunks.push(
              `data: ${JSON.stringify({
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [
                  {
                    index: 0,
                    delta: {
                      tool_calls: [
                        {
                          index: existing.index,
                          id: tc.id,
                          type: "function",
                          function: {
                            name: tc.function.name,
                            arguments: tc.function.arguments,
                          },
                        },
                      ],
                    },
                    finish_reason: null,
                  },
                ],
              })}\n\n`
            );
          }
        } else {
          // New tool call - assign index and add to map
          const toolCallIndex = toolCalls.length;
          toolCalls.push({ ...tc, index: toolCallIndex });
          toolCallsMap.set(tc.id, { ...tc, index: toolCallIndex });

          // Stream initial tool call with name
          chunks.push(
            `data: ${JSON.stringify({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: {
                    tool_calls: [
                      {
                        index: toolCallIndex,
                        id: tc.id,
                        type: "function",
                        function: {
                          name: tc.function.name,
                          arguments: tc.function.arguments,
                        },
                      },
                    ],
                  },
                  finish_reason: null,
                },
              ],
            })}\n\n`
          );
        }
      }

      if (result.text) {
        totalContent += result.text;
        chunks.push(
          `data: ${JSON.stringify({
            id: responseId,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [
              {
                index: 0,
                delta:
                  chunks.length === 0 && toolCalls.length === 0
                    ? { role: "assistant", content: result.text }
                    : { content: result.text },
                finish_reason: null,
              },
            ],
          })}\n\n`
        );
      }
    }

    console.log(
      `[CURSOR BUFFER SSE] Parsed ${frameCount} frames, toolCallsMap size: ${toolCallsMap.size}, toolCalls array: ${toolCalls.length}`
    );

    if (chunks.length === 0 && toolCalls.length === 0) {
      chunks.push(
        `data: ${JSON.stringify({
          id: responseId,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [
            {
              index: 0,
              delta: { role: "assistant", content: "" },
              finish_reason: null,
            },
          ],
        })}\n\n`
      );
    }

    const usage = estimateUsage(body, totalContent.length, FORMATS.OPENAI);

    chunks.push(
      `data: ${JSON.stringify({
        id: responseId,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [
          {
            index: 0,
            delta: {},
            finish_reason: toolCalls.length > 0 ? "tool_calls" : "stop",
          },
        ],
        usage,
      })}\n\n`
    );
    chunks.push("data: [DONE]\n\n");

    return new Response(chunks.join(""), {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  async refreshCredentials() {
    return null;
  }
}

export default CursorExecutor;
