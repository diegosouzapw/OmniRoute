import { readFileSync } from "node:fs";
import { apiFetch, isServerUp } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function truncate(v, len = 60) {
  if (v == null) return "-";
  const s = String(v);
  return s.length > len ? s.slice(0, len - 1) + "…" : s;
}

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

      if (opts.stream) {
        await runMcpStream(tool, args, globalOpts);
        return;
      }

      const extraHeaders = opts.scope?.length ? { "X-MCP-Scopes": opts.scope.join(",") } : {};
      const res = await apiFetch("/api/mcp/tools/call", {
        method: "POST",
        body: { name: tool, arguments: args },
        headers: extraHeaders,
      });
      if (res.status === 403) {
        process.stderr.write("Scope denied\n");
        process.exit(4);
      }
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data, globalOpts);
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

  // 5.2 — mcp tools + mcp audit
  const tools = mcp.command("tools").description(t("mcp.tools.description"));

  tools
    .command("list")
    .description(t("mcp.tools.list.description"))
    .option("--scope <s>", t("mcp.tools.list.scope"))
    .action(async (opts, cmd) => {
      const params = new URLSearchParams();
      if (opts.scope) params.set("scope", opts.scope);
      const res = await apiFetch(`/api/mcp/tools?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.tools ?? data, cmd.optsWithGlobals(), mcpToolSchema);
    });

  tools
    .command("info <name>")
    .description(t("mcp.tools.info.description"))
    .action(async (name, opts, cmd) => {
      const res = await apiFetch(`/api/mcp/tools?name=${encodeURIComponent(name)}`);
      if (!res.ok) {
        process.stderr.write(`Not found: ${name}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  tools
    .command("schema <name>")
    .description(t("mcp.tools.schema.description"))
    .option("--io <kind>", t("mcp.tools.schema.io"), "input")
    .action(async (name, opts, cmd) => {
      const res = await apiFetch(`/api/mcp/tools?name=${encodeURIComponent(name)}&io=${opts.io}`);
      if (!res.ok) {
        process.stderr.write(`Not found: ${name}\n`);
        process.exit(1);
      }
      const data = await res.json();
      const globalOpts = cmd.optsWithGlobals();
      if (globalOpts.output === "json") {
        process.stdout.write(JSON.stringify(data.schema ?? data, null, 2) + "\n");
      } else {
        emit(data.schema ?? data, globalOpts);
      }
    });

  const audit = mcp.command("audit").description(t("mcp.audit.description"));

  audit
    .command("tail")
    .option("--follow", t("audit.tail.follow"))
    .option("--limit <n>", t("audit.tail.limit"), parseInt, 100)
    .action(async (opts, cmd) => {
      const { runAuditTail } = await import("./audit.mjs");
      await runAuditTail({ ...opts, source: "mcp" }, cmd);
    });

  audit
    .command("stats")
    .option("--period <p>", t("audit.stats.period"), "7d")
    .action(async (opts, cmd) => {
      const res = await apiFetch(`/api/mcp/audit/stats?period=${opts.period}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });
}

async function runMcpStream(tool, args, globalOpts) {
  const baseUrl = globalOpts.baseUrl ?? "http://localhost:20128";
  const apiKey = globalOpts.apiKey ?? "";
  const res = await fetch(`${baseUrl}/api/mcp/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({ name: tool, arguments: args }),
  });
  if (!res.ok) {
    process.stderr.write(`HTTP ${res.status}\n`);
    process.exit(1);
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const raw = line.slice(6).trim();
        if (raw && raw !== "[DONE]") process.stdout.write(raw + "\n");
      }
    }
  }
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
      return 0;
    }

    const status = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(status, null, 2));
      return 0;
    }

    const transport = status.transport || "stdio";
    console.log(status.running ? t("mcp.running", { transport }) : t("mcp.stopped"));
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
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
