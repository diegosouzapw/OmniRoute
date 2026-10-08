import { readFileSync } from "node:fs";
import { apiFetch, isServerUp } from "../api.mjs";
import { MCP_ACCEPT, readJsonRpcResponse } from "../mcpClient.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function truncate(v, len = 60) {
  if (v == null) return "-";
  const s = String(v);
  return s.length > len ? s.slice(0, len - 1) + "…" : s;
}

const VALID_MCP_TRANSPORTS = ["stdio", "sse", "streamable-http"];

const mcpToolSchema = [
  { key: "name", header: "Tool", width: 36 },
  {
    key: "scopes",
    header: "Scopes",
    formatter: (v) => (Array.isArray(v) ? v.join(",") : (v ?? "-")),
  },
  { key: "auditLevel", header: "Audit", width: 10 },
  { key: "phase", header: "Phase", width: 6 },
  { key: "description", header: "Description", formatter: truncate },
];

export function registerMcp(program) {
  const mcp = program.command("mcp").description(t("mcp.title"));

  mcp
    .command("status")
    .description("Show MCP server status")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runMcpStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  mcp
    .command("restart")
    .description("Restart the MCP server")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runMcpRestartCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  mcp
    .command("enable")
    .description(t("mcp.enable.description"))
    .option("--transport <transport>", t("mcp.enable.transport"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runMcpEnableCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  mcp
    .command("disable")
    .description(t("mcp.disable.description"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runMcpDisableCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  // 5.1 — mcp call + mcp scopes
  mcp
    .command("call <tool> [argsJson]")
    .description(t("mcp.call.description"))
    .option("--args <json>", t("mcp.call.args"))
    .option("--args-file <path>", t("mcp.call.args_file"))
    .option("--stream", t("mcp.call.stream"))
    .option("--scope <s>", t("mcp.call.scope"), (v, prev = []) => [...prev, v], [])
    .action(async (tool, argsPositional, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const args = opts.args
        ? JSON.parse(opts.args)
        : opts.argsFile
          ? JSON.parse(readFileSync(opts.argsFile, "utf8"))
          : argsPositional
            ? JSON.parse(argsPositional)
            : {};

      const exitCode = await runMcpCallCommand(
        tool,
        args,
        {
          ...opts,
          stream: opts.stream,
        },
        globalOpts
      );

      if (exitCode !== 0) process.exit(exitCode);
    });

  mcp
    .command("scopes")
    .description(t("mcp.scopes.description"))
    .option("--tool <name>", t("mcp.scopes.tool"))
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ meta: "scopes" });
      if (opts.tool) params.set("tool", opts.tool);
      const res = await apiFetch(`/api/mcp/tools?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.scopes ?? data, cmd.optsWithGlobals());
    });
}

/**
 * Shared JSON-RPC 2.0 MCP client used by both stream and non-stream `mcp call`.
 *
 * Protocol:
 *   1. POST /api/mcp/stream with initialize → get Mcp-Session-Id header
 *   2. POST /api/mcp/stream with tools/call + Mcp-Session-Id header
 *
 * When `stream` is true, writes SSE data chunks to stdout as they arrive.
 * When `stream` is false, returns the parsed JSON-RPC result.
 *
 * Returns the exit code (0 = success, non-zero = failure).
 */
async function mcpJsonRpcCall(tool, args, { stream = false, globalOpts = {} } = {}) {
  const baseUrl = globalOpts.baseUrl ?? "http://localhost:20128";
  const apiKey = globalOpts.apiKey ?? "";
  const streamUrl = `${baseUrl}/api/mcp/stream`;

  const hdrs = {
    "Content-Type": "application/json",
    Accept: MCP_ACCEPT,
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
  };

  // Step 1 — initialize
  const initRes = await fetch(streamUrl, {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "omniroute-cli", version: "1.0" },
      },
    }),
  });

  if (!initRes.ok) {
    const text = await initRes.text().catch(() => "");
    process.stderr.write(
      `MCP initialize failed: HTTP ${initRes.status}${text ? ` — ${text}` : ""}\n`
    );
    return 1;
  }

  const sessionId = initRes.headers.get("mcp-session-id");
  if (!sessionId) {
    process.stderr.write("MCP initialize failed: no Mcp-Session-Id in response\n");
    return 1;
  }

  // Step 2 — tools/call
  const callHeaders = {
    ...hdrs,
    "mcp-session-id": sessionId,
  };

  const callRes = await fetch(streamUrl, {
    method: "POST",
    headers: callHeaders,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name: tool, arguments: args },
    }),
  });

  if (!callRes.ok) {
    const text = await callRes.text().catch(() => "");
    process.stderr.write(`MCP call failed: HTTP ${callRes.status}${text ? ` — ${text}` : ""}\n`);
    return 1;
  }

  if (stream) {
    return readMcpSseStream(callRes.body);
  }

  // Non-stream: parse JSON-RPC response
  const data = await readJsonRpcResponse(callRes);
  if (data.error) {
    process.stderr.write(`MCP error: ${data.error.message || JSON.stringify(data.error)}\n`);
    return 1;
  }
  // Print the result content
  const content = data.result?.content;
  if (content) {
    for (const item of content) {
      if (item.type === "text") {
        process.stdout.write(item.text + "\n");
      } else if (item.type === "resource") {
        process.stdout.write(JSON.stringify(item.resource) + "\n");
      } else {
        process.stdout.write(JSON.stringify(item) + "\n");
      }
    }
  } else {
    process.stdout.write(JSON.stringify(data.result, null, 2) + "\n");
  }
  return 0;
}

async function readMcpSseStream(body) {
  if (!body) return 1;
  const reader = body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
  }
  const lines = buf.split("\n");
  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const raw = line.slice(6).trim();
      if (raw && raw !== "[DONE]") process.stdout.write(raw + "\n");
    }
  }
  return 0;
}

export async function runMcpCallCommand(tool, args, opts = {}, globalOpts = {}) {
  return mcpJsonRpcCall(tool, args, { stream: opts.stream, globalOpts });
}

export async function runMcpStatusCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/mcp/status", {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.log(t("mcp.stopped"));
      console.log(t("mcp.stoppedHint"));
      return 0;
    }

    const status = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(status, null, 2));
      return 0;
    }

    const transport = status.transport || "stdio";
    const online = status.online ?? status.running;
    console.log(online ? t("mcp.running", { transport }) : t("mcp.stopped"));
    if (!online && status.enabled === false) {
      console.log(t("mcp.stoppedHint"));
    }
    if (status.toolsCount !== undefined) console.log(`  Tools: ${status.toolsCount}`);
    if (status.scopes?.length) {
      console.log("  Scopes:");
      for (const scope of status.scopes) console.log(`    - ${scope}`);
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runMcpRestartCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/mcp/restart", {
      method: "POST",
      retry: false,
      timeout: 10000,
      acceptNotOk: true,
    });
    if (res.ok) {
      console.log(t("mcp.restarted"));
      return 0;
    }
    const body = await res.json().catch(() => null);
    const message = body?.error || `HTTP ${res.status}`;
    console.error(t("common.error", { message }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runMcpEnableCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  if (opts.transport && !VALID_MCP_TRANSPORTS.includes(opts.transport)) {
    console.error(
      t("common.error", {
        message: `Invalid transport '${opts.transport}'. Valid: ${VALID_MCP_TRANSPORTS.join(", ")}`,
      })
    );
    return 1;
  }

  try {
    const body = { mcpEnabled: true };
    if (opts.transport) body.mcpTransport = opts.transport;

    const res = await apiFetch("/api/settings", {
      method: "PATCH",
      body,
      retry: false,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }
    console.log(t("mcp.enabled"));
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runMcpDisableCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/settings", {
      method: "PATCH",
      body: { mcpEnabled: false },
      retry: false,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }
    console.log(t("mcp.disabled"));
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
