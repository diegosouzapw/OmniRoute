import { Argument } from "commander";
import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

const VALID_TUNNEL_TYPES = ["cloudflare", "tailscale", "ngrok"];

export function registerTunnel(program) {
  const tunnel = program.command("tunnel").description(t("tunnel.title"));

  tunnel
    .command("list")
    .description(t("tunnel.listDescription"))
    .option("--json", t("common.jsonOpt"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("create [type]")
    .description(t("tunnel.createDescription"))
    .addArgument(
      new Argument("[type]", "Tunnel type").choices(VALID_TUNNEL_TYPES).default("cloudflare")
    )
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelCreateCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("stop <type>")
    .description(t("tunnel.stopDescription"))
    .option("--yes", t("common.yesOpt"))
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelStopCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("status <type>")
    .description(t("tunnel.statusDescription"))
    .option("--json", t("common.jsonOpt"))
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelStatusCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("logs <type>")
    .description(t("tunnel.logsDescription"))
    .option("--tail <n>", t("tunnel.tailOpt"), "50")
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelLogsCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("info <type>")
    .description(t("tunnel.infoDescription"))
    .option("--json", t("common.jsonOpt"))
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelInfoCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  tunnel
    .command("rotate <type>")
    .description(t("tunnel.rotateDescription"))
    .option("--yes", t("common.yesOpt"))
    .action(async (type, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTunnelRotateCommand(type, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runTunnelListCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/tunnels", { retry: false, timeout: 5000, acceptNotOk: true });
    if (!res.ok) {
      console.log(t("tunnel.notAvailable"));
      return 0;
    }

    const tunnels = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(tunnels, null, 2));
      return 0;
    }

    console.log(`\n\x1b[1m\x1b[36m${t("tunnel.title")}\x1b[0m\n`);
    if (!Array.isArray(tunnels) || tunnels.length === 0) {
      console.log(t("tunnel.noTunnels"));
      return 0;
    }

    for (const tunnel of tunnels) {
      const status = tunnel.active ? "\x1b[32m● active\x1b[0m" : "\x1b[2m○ inactive\x1b[0m";
      console.log(`  ${(tunnel.type || "unknown").padEnd(12)} ${tunnel.url || "N/A"} ${status}`);
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelCreateCommand(type = "cloudflare", opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/tunnels", {
      method: "POST",
      body: { type },
      retry: false,
      timeout: 15000,
      acceptNotOk: true,
    });
    if (res.ok) {
      const result = await res.json();
      console.log(t("tunnel.created", { url: result.url }));
      return 0;
    }
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelStopCommand(type, opts = {}) {
  if (!type) {
    console.error(t("tunnel.typeRequired"));
    return 1;
  }

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("tunnel.confirmStop", { id: type }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }

  try {
    const res = await apiFetch(`/api/tunnels/${encodeURIComponent(type)}`, {
      method: "DELETE",
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (res.ok) {
      console.log(t("tunnel.stopped"));
      return 0;
    }
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelStatusCommand(type, opts = {}) {
  if (!type) {
    console.error(t("tunnel.typeRequired"));
    return 1;
  }
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }
  try {
    const res = await apiFetch(`/api/tunnels/${encodeURIComponent(type)}/status`, {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }
    const data = await res.json();
    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(data, null, 2));
      return 0;
    }
    const uptime = data.uptime ? `${Math.floor(data.uptime / 60)}m` : "N/A";
    const statusLabel = data.active ? "\x1b[32m● active\x1b[0m" : "\x1b[31m○ inactive\x1b[0m";
    console.log(`\n\x1b[1m${type}\x1b[0m ${statusLabel}`);
    console.log(`  URL:      ${data.url || "N/A"}`);
    console.log(`  Uptime:   ${uptime}`);
    console.log(`  Requests: ${data.requests ?? data.totalRequests ?? "N/A"}`);
    console.log(`  Latency:  ${data.avgLatencyMs != null ? `${data.avgLatencyMs}ms` : "N/A"}`);
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelLogsCommand(type, opts = {}) {
  if (!type) {
    console.error(t("tunnel.typeRequired"));
    return 1;
  }
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }
  const tail = Number(opts.tail || 50);
  try {
    const res = await apiFetch(`/api/tunnels/${encodeURIComponent(type)}/logs?tail=${tail}`, {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }
    const data = await res.json();
    const lines = data.logs || data.lines || data;
    if (!Array.isArray(lines) || lines.length === 0) {
      console.log(t("tunnel.noLogs"));
      return 0;
    }
    for (const line of lines) {
      const ts = line.timestamp || line.ts || "";
      const msg = line.message || line.msg || String(line);
      console.log(`\x1b[2m${ts}\x1b[0m  ${msg}`);
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelInfoCommand(type, opts = {}) {
  if (!type) {
    console.error(t("tunnel.typeRequired"));
    return 1;
  }
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }
  try {
    const res = await apiFetch(`/api/tunnels/${encodeURIComponent(type)}`, {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }
    const data = await res.json();
    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(data, null, 2));
      return 0;
    }
    console.log(`\n\x1b[1m\x1b[36m${t("tunnel.infoTitle", { type })}\x1b[0m\n`);
    for (const [k, v] of Object.entries(data)) {
      console.log(`  ${String(k).padEnd(20)} ${JSON.stringify(v)}`);
    }
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runTunnelRotateCommand(type, opts = {}) {
  if (!type) {
    console.error(t("tunnel.typeRequired"));
    return 1;
  }
  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("tunnel.confirmRotate", { type }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("common.serverOffline"));
    return 1;
  }
  try {
    const res = await apiFetch(`/api/tunnels/${encodeURIComponent(type)}/rotate`, {
      method: "POST",
      retry: false,
      timeout: 15000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }
    const data = await res.json();
    console.log(t("tunnel.rotated", { url: data.url || "(see dashboard)" }));
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
