/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
import { createHash } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import { namespacedToolName, type CodexTool } from "../../types";
import { VERSION } from "../../version";
import type { ChatGptTurnEnvironment } from "./environment";
import { CODEX_COMPACTION_CONTROL_WIRE_NAME } from "./native-compaction-control";
import { callTurnBroker, TurnBrokerTimeoutError, type BrokerToolResult } from "./turn-broker";

interface ClaimedTurn {
  bindingId: string;
  environment: ChatGptTurnEnvironment & { expiresAt?: number };
}

const turnTokenSchema = z.string().min(20).max(256);
const jsonArgumentsSchema = z.record(z.string(), z.unknown()).default({});
export const CHATGPT_WEB_AGENT_WAIT_POLL_MS = 10_000;
// The OpenAI tunnel currently owns a two-minute command-response deadline. The local MCP server
// must settle first so an abandoned native tool call is returned as an MCP error instead of
// letting the tunnel tear down and poison its long-lived stdio transport.
export const CHATGPT_WEB_MCP_INVOCATION_TIMEOUT_MS = 90_000;

interface McpRequestExtra {
  sessionId?: string;
  requestId: string | number;
  _meta?: unknown;
  requestInfo?: unknown;
  signal?: AbortSignal;
}

function scopeHash(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

function requestScopeSummary(extra: McpRequestExtra): string {
  const meta =
    extra._meta && typeof extra._meta === "object" && !Array.isArray(extra._meta)
      ? Object.entries(extra._meta as Record<string, unknown>)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([key, value]) => ({
            key,
            type: value === null ? "null" : Array.isArray(value) ? "array" : typeof value,
            ...(typeof value === "string" ? { chars: value.length, hash: scopeHash(value) } : {}),
          }))
      : [];
  const requestInfoKeys =
    extra.requestInfo && typeof extra.requestInfo === "object"
      ? Object.keys(extra.requestInfo as Record<string, unknown>).sort()
      : [];
  return JSON.stringify({
    requestId: String(extra.requestId),
    session: extra.sessionId
      ? { chars: extra.sessionId.length, hash: scopeHash(extra.sessionId) }
      : null,
    meta,
    requestInfoKeys,
  });
}

function result(value: Record<string, unknown>, isError = false) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value) }],
    structuredContent: value,
    ...(isError ? { isError: true } : {}),
  };
}

function wireName(tool: CodexTool): string {
  return namespacedToolName(tool.namespace, tool.name);
}

function exactTool(environment: ChatGptTurnEnvironment, name: string): CodexTool | undefined {
  return environment.tools.find((tool) => !tool.namespace && tool.name === name);
}

function namedTool(environment: ChatGptTurnEnvironment, requestedWireName: string): CodexTool {
  const tool = environment.tools.find((candidate) => wireName(candidate) === requestedWireName);
  if (!tool) throw new Error(`Codex tool is not available in this turn: ${requestedWireName}`);
  return tool;
}

function isAgentWaitTool(tool: CodexTool): boolean {
  return (
    tool.name === "wait_agent" &&
    (tool.namespace === "multi_agent_v1" || tool.namespace === "multi_agent_v2")
  );
}

function browserToolDescription(tool: CodexTool): string {
  if (!isAgentWaitTool(tool)) return tool.description;
  return `${tool.description}\n\nChatGPT Web transport rule: wait for exactly 10 seconds per call, then release the MCP channel so spawned Web agents can use their own tools. Repeat with the same target ids until a terminal status is returned.`;
}

function browserToolParameters(tool: CodexTool): Record<string, unknown> {
  if (!isAgentWaitTool(tool)) return tool.parameters;
  const parameters = structuredClone(tool.parameters);
  const properties =
    parameters.properties &&
    typeof parameters.properties === "object" &&
    !Array.isArray(parameters.properties)
      ? (parameters.properties as Record<string, unknown>)
      : {};
  const timeout =
    properties.timeout_ms &&
    typeof properties.timeout_ms === "object" &&
    !Array.isArray(properties.timeout_ms)
      ? (properties.timeout_ms as Record<string, unknown>)
      : {};
  const required = Array.isArray(parameters.required)
    ? parameters.required.filter((value): value is string => typeof value === "string")
    : [];
  return {
    ...parameters,
    properties: {
      ...properties,
      timeout_ms: {
        ...timeout,
        type: "number",
        const: CHATGPT_WEB_AGENT_WAIT_POLL_MS,
        minimum: CHATGPT_WEB_AGENT_WAIT_POLL_MS,
        maximum: CHATGPT_WEB_AGENT_WAIT_POLL_MS,
        description:
          "Required transport-safe polling interval. Use exactly 10000 and repeat the same targets until completion.",
      },
    },
    required: [...new Set([...required, "timeout_ms"])],
  };
}

function assertBrowserToolArguments(tool: CodexTool, args: Record<string, unknown>): void {
  if (!isAgentWaitTool(tool)) return;
  if (args.timeout_ms !== CHATGPT_WEB_AGENT_WAIT_POLL_MS) {
    throw new Error(
      `ChatGPT Web wait_agent requires timeout_ms=${CHATGPT_WEB_AGENT_WAIT_POLL_MS}` +
        " so the shared MCP channel remains available to spawned Web agents"
    );
  }
}

export function chatGptMcpInvocationTimeout(
  environment: ChatGptTurnEnvironment & { expiresAt?: number },
  now = Date.now()
): number {
  const remaining =
    environment.expiresAt === undefined
      ? CHATGPT_WEB_MCP_INVOCATION_TIMEOUT_MS
      : Math.max(1, environment.expiresAt - now);
  return Math.min(CHATGPT_WEB_MCP_INVOCATION_TIMEOUT_MS, remaining);
}

function asMcpResult(value: BrokerToolResult) {
  return {
    content: value.content as never,
    ...(value.structuredContent !== undefined &&
    value.structuredContent !== null &&
    typeof value.structuredContent === "object"
      ? { structuredContent: value.structuredContent as Record<string, unknown> }
      : {}),
    ...(value.isError ? { isError: true } : {}),
    ...(value._meta !== undefined && value._meta !== null && typeof value._meta === "object"
      ? { _meta: value._meta as Record<string, unknown> }
      : {}),
  };
}

function execGateway(environment: ChatGptTurnEnvironment): CodexTool | undefined {
  const tool = exactTool(environment, "exec");
  return tool?.freeform ? tool : undefined;
}

function gatewayNestedToolName(toolName: string): string {
  return toolName.replace(/[^A-Za-z0-9_$]/g, "_");
}

function execGatewayResultProgram(invocation: string[]): string {
  return [
    ...invocation,
    "const emit = value => {",
    "  if (Array.isArray(value)) { for (const item of value) emit(item); return; }",
    '  if (value && typeof value === "object") {',
    '    if (value.type === "image") { image(value); return; }',
    '    if (value.type === "audio") { audio(value); return; }',
    '    if (value.type === "text" && typeof value.text === "string") { text(value.text); return; }',
    '    if (typeof value.image_url === "string" && typeof value.output_hint === "string") { generatedImage(value); return; }',
    '    if (typeof value.image_url === "string") { image(value.image_url, value.detail ?? "auto"); return; }',
    '    if (typeof value.audio_url === "string") { audio(value.audio_url); return; }',
    "    if (Array.isArray(value.content)) { for (const item of value.content) emit(item); return; }",
    "  }",
    "  text(value);",
    "};",
    "emit(result);",
  ].join("\n");
}

function execGatewayProgram(
  nestedToolName: string,
  freeform: boolean,
  payload: { arguments?: Record<string, unknown>; input?: string }
): string {
  const nestedInput = freeform ? (payload.input ?? "") : (payload.arguments ?? {});
  return execGatewayResultProgram([
    `const result = await tools[${JSON.stringify(gatewayNestedToolName(nestedToolName))}](${JSON.stringify(nestedInput)});`,
  ]);
}

function execCommandGatewayProgram(
  execCommandArguments: Record<string, unknown>,
  shellCommandArguments: Record<string, unknown>
): string {
  const execCommandName = gatewayNestedToolName("exec_command");
  const shellCommandName = gatewayNestedToolName("shell_command");
  return execGatewayResultProgram([
    'if (typeof ALL_TOOLS === "undefined" || !Array.isArray(ALL_TOOLS)) throw new Error("Native command tool registry is unavailable");',
    "const nativeCommandNames = new Set(ALL_TOOLS.map(tool => tool?.name));",
    `const nativeCommandCandidates = ${JSON.stringify([execCommandName, shellCommandName])}.filter(name => nativeCommandNames.has(name));`,
    'if (nativeCommandCandidates.length !== 1) throw new Error("Expected exactly one native command tool; found " + (nativeCommandCandidates.join(", ") || "none"));',
    "const nativeCommandName = nativeCommandCandidates[0];",
    "const nativeCommand = tools[nativeCommandName];",
    'if (typeof nativeCommand !== "function") throw new Error("Native command tool " + nativeCommandName + " is listed but unavailable");',
    `const nativeCommandInput = nativeCommandName === ${JSON.stringify(execCommandName)} ? ${JSON.stringify(execCommandArguments)} : ${JSON.stringify(shellCommandArguments)};`,
    "const result = await nativeCommand(nativeCommandInput);",
  ]);
}

export async function runChatGptMcpServer(options: { brokerSocketPath: string }): Promise<void> {
  const server = new McpServer({ name: "codex-native", version: VERSION });

  const claimTurn = async (
    toolName: string,
    turnToken: string,
    extra: McpRequestExtra
  ): Promise<ClaimedTurn> => {
    console.error(`[chatgpt-web-mcp] ${toolName} scope=${requestScopeSummary(extra)}`);
    return await callTurnBroker<ClaimedTurn>(
      options.brokerSocketPath,
      { method: "claim", token: turnToken },
      5_000,
      extra.signal
    );
  };

  const invoke = async (
    bindingId: string,
    bound: ChatGptTurnEnvironment & { expiresAt?: number },
    tool: CodexTool,
    payload: { arguments?: Record<string, unknown>; input?: string },
    signal?: AbortSignal
  ) => {
    const timeoutMs = chatGptMcpInvocationTimeout(bound);
    try {
      const response = await callTurnBroker<BrokerToolResult>(
        options.brokerSocketPath,
        {
          method: "invoke",
          bindingId,
          wireName: wireName(tool),
          freeform: tool.freeform === true,
          ...(tool.freeform
            ? { input: payload.input ?? "" }
            : { arguments: payload.arguments ?? {} }),
        },
        timeoutMs,
        signal
      );
      return asMcpResult(response);
    } catch (error) {
      // A cancelled/timed-out MCP request no longer has a consumer for the native result. Revoke
      // the whole turn capability so the broker drops the pending invocation and every later call
      // from that abandoned ChatGPT response fails explicitly against its retired binding.
      await callTurnBroker(options.brokerSocketPath, {
        method: "release",
        bindingId,
      }).catch((releaseError) => {
        console.error(
          `[chatgpt-web-mcp] failed to retire abandoned binding: ${releaseError instanceof Error ? releaseError.message : String(releaseError)}`
        );
      });
      if (error instanceof TurnBrokerTimeoutError) {
        const toolName = wireName(tool);
        console.error(
          `[chatgpt-web-mcp] ${toolName} did not complete within ${timeoutMs}ms; retired its turn binding`
        );
        return result(
          {
            code: "codex_tool_timeout",
            tool: toolName,
            timeout_ms: timeoutMs,
            retryable: false,
            message: `Codex tool ${toolName} did not complete before the MCP transport deadline. The current turn binding was retired; do not retry it in this ChatGPT response.`,
          },
          true
        );
      }
      throw error;
    }
  };

  const invokeNestedNative = (
    bindingId: string,
    bound: ChatGptTurnEnvironment & { expiresAt?: number },
    nestedToolName: string,
    freeform: boolean,
    payload: { arguments?: Record<string, unknown>; input?: string },
    signal?: AbortSignal
  ) => {
    const gateway = execGateway(bound);
    if (!gateway) {
      throw new Error(
        `This Codex turn did not advertise ${nestedToolName} or the native exec gateway`
      );
    }
    return invoke(
      bindingId,
      bound,
      gateway,
      {
        input: execGatewayProgram(nestedToolName, freeform, payload),
      },
      signal
    );
  };

  server.registerTool(
    "codex_exec",
    {
      title: "Run a native Codex command",
      description:
        "Invoke the command tool advertised by the current outer Codex harness. A long-running command returns its native session_id.",
      inputSchema: {
        turn_token: turnTokenSchema,
        cmd: z.string().min(1).max(100_000),
        workdir: z.string().max(16_384).optional(),
        yield_time_ms: z.number().int().min(250).max(30_000).optional(),
        max_output_tokens: z.number().int().min(1).max(1_000_000).optional(),
        tty: z.boolean().optional(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async ({ turn_token, cmd, workdir, yield_time_ms, max_output_tokens, tty }, extra) => {
      const claimed = await claimTurn("codex_exec", turn_token, extra);
      const bound = claimed.environment;
      const execCommandArguments = {
        cmd,
        ...(workdir ? { workdir } : {}),
        ...(yield_time_ms !== undefined ? { yield_time_ms } : {}),
        ...(max_output_tokens !== undefined ? { max_output_tokens } : {}),
        ...(tty !== undefined ? { tty } : {}),
      };
      const shellCommandArguments = {
        command: cmd,
        ...(workdir ? { workdir } : {}),
        ...(yield_time_ms !== undefined ? { timeout_ms: yield_time_ms } : {}),
      };
      const tool = exactTool(bound, "exec_command") ?? exactTool(bound, "shell_command");
      if (tool) {
        const args = tool.name === "exec_command" ? execCommandArguments : shellCommandArguments;
        return invoke(claimed.bindingId, bound, tool, { arguments: args }, extra.signal);
      }
      const gateway = execGateway(bound);
      if (!gateway) {
        throw new Error(
          "This Codex turn did not advertise a native command tool or the native exec gateway"
        );
      }
      return invoke(
        claimed.bindingId,
        bound,
        gateway,
        {
          input: execCommandGatewayProgram(execCommandArguments, shellCommandArguments),
        },
        extra.signal
      );
    }
  );

  server.registerTool(
    "codex_write_stdin",
    {
      title: "Continue a native Codex command session",
      description: "Write characters to, or poll, a session_id returned by codex_exec.",
      inputSchema: {
        turn_token: turnTokenSchema,
        session_id: z.number().int().nonnegative(),
        chars: z.string().max(1_000_000).optional(),
        yield_time_ms: z.number().int().min(250).max(300_000).optional(),
        max_output_tokens: z.number().int().min(1).max(1_000_000).optional(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async ({ turn_token, session_id, chars, yield_time_ms, max_output_tokens }, extra) => {
      const claimed = await claimTurn("codex_write_stdin", turn_token, extra);
      const bound = claimed.environment;
      const tool = exactTool(bound, "write_stdin");
      const payload = {
        arguments: {
          session_id,
          ...(chars !== undefined ? { chars } : {}),
          ...(yield_time_ms !== undefined ? { yield_time_ms } : {}),
          ...(max_output_tokens !== undefined ? { max_output_tokens } : {}),
        },
      };
      return tool
        ? invoke(claimed.bindingId, bound, tool, payload, extra.signal)
        : invokeNestedNative(claimed.bindingId, bound, "write_stdin", false, payload, extra.signal);
    }
  );

  server.registerTool(
    "codex_apply_patch",
    {
      title: "Apply a native Codex patch",
      description:
        "Invoke the outer Codex apply_patch tool, producing a native file-change item in the Codex task.",
      inputSchema: { turn_token: turnTokenSchema, patch: z.string().min(1).max(5_000_000) },
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async ({ turn_token, patch }, extra) => {
      const claimed = await claimTurn("codex_apply_patch", turn_token, extra);
      const bound = claimed.environment;
      const tool = exactTool(bound, "apply_patch");
      if (!tool)
        return invokeNestedNative(
          claimed.bindingId,
          bound,
          "apply_patch",
          true,
          { input: patch },
          extra.signal
        );
      return tool.freeform
        ? invoke(claimed.bindingId, bound, tool, { input: patch }, extra.signal)
        : invoke(claimed.bindingId, bound, tool, { arguments: { input: patch } }, extra.signal);
    }
  );

  server.registerTool(
    "codex_view_image",
    {
      title: "View an image through native Codex",
      description:
        "Invoke the outer Codex view_image tool and return its multimodal result to this same ChatGPT response.",
      inputSchema: {
        turn_token: turnTokenSchema,
        path: z.string().min(1).max(16_384),
        detail: z.enum(["high", "original"]).optional(),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ turn_token, path, detail }, extra) => {
      const claimed = await claimTurn("codex_view_image", turn_token, extra);
      const bound = claimed.environment;
      const tool = exactTool(bound, "view_image");
      const payload = { arguments: { path, ...(detail ? { detail } : {}) } };
      return tool
        ? invoke(claimed.bindingId, bound, tool, payload, extra.signal)
        : invokeNestedNative(claimed.bindingId, bound, "view_image", false, payload, extra.signal);
    }
  );

  server.registerTool(
    "codex_tool_inventory",
    {
      title: "Discover tools from the current Codex harness",
      description:
        "Search the exact tool registry supplied to the current outer Codex turn, including configured MCP/app tools.",
      inputSchema: {
        turn_token: turnTokenSchema,
        query: z.string().max(500).optional(),
        offset: z.number().int().min(0).max(100_000).default(0),
        limit: z.number().int().min(1).max(50).default(20),
        include_schema: z.boolean().default(true),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ turn_token, query, offset, limit, include_schema }, extra) => {
      const claimed = await claimTurn("codex_tool_inventory", turn_token, extra);
      const bound = claimed.environment;
      const needle = query?.trim().toLowerCase();
      const matches = bound.tools.filter(
        (tool) =>
          !needle ||
          [wireName(tool), tool.name, tool.namespace ?? "", tool.description]
            .join("\n")
            .toLowerCase()
            .includes(needle)
      );
      const page = matches.slice(offset, offset + limit).map((tool) => ({
        wire_name: wireName(tool),
        name: tool.name,
        namespace: tool.namespace ?? null,
        description: browserToolDescription(tool),
        kind: tool.freeform ? "freeform" : tool.toolSearch ? "tool_search" : "function",
        ...(include_schema ? { parameters: browserToolParameters(tool) } : {}),
      }));
      return result({
        tools: page,
        total: matches.length,
        next_offset: offset + page.length < matches.length ? offset + page.length : null,
      });
    }
  );

  server.registerTool(
    "codex_tool_call",
    {
      title: "Call any tool from the current Codex harness",
      description:
        "Invoke an exact wire_name returned by codex_tool_inventory. The outer Codex runtime performs the call, approvals, and UI lifecycle.",
      inputSchema: {
        turn_token: turnTokenSchema,
        wire_name: z.string().min(1).max(1_000),
        arguments: jsonArgumentsSchema.optional(),
        input: z.string().max(5_000_000).optional(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async ({ turn_token, wire_name, arguments: args, input }, extra) => {
      if (wire_name === CODEX_COMPACTION_CONTROL_WIRE_NAME) {
        if (input !== undefined) {
          throw new Error("Compaction control handoff does not accept freeform input");
        }
        const handoffId = args?.handoff_id;
        const summary = args?.summary;
        if (typeof handoffId !== "string" || handoffId.length === 0) {
          throw new Error("Compaction control handoff requires handoff_id");
        }
        if (typeof summary !== "string") {
          throw new Error("Compaction control handoff requires summary");
        }
        await callTurnBroker(
          options.brokerSocketPath,
          {
            method: "submit_compaction_handoff",
            token: turn_token,
            handoffId,
            summary,
          },
          5_000,
          extra.signal
        );
        return result({ submitted: true });
      }
      const claimed = await claimTurn("codex_tool_call", turn_token, extra);
      const bound = claimed.environment;
      const tool = namedTool(bound, wire_name);
      if (tool.freeform) {
        if (input === undefined) throw new Error(`Freeform Codex tool ${wire_name} requires input`);
        if (args && Object.keys(args).length > 0)
          throw new Error(`Freeform Codex tool ${wire_name} does not accept arguments`);
        return invoke(claimed.bindingId, bound, tool, { input }, extra.signal);
      }
      if (input !== undefined)
        throw new Error(`Function Codex tool ${wire_name} does not accept freeform input`);
      const invocationArguments = args ?? {};
      assertBrowserToolArguments(tool, invocationArguments);
      return invoke(
        claimed.bindingId,
        bound,
        tool,
        { arguments: invocationArguments },
        extra.signal
      );
    }
  );

  await server.connect(new StdioServerTransport());
}
