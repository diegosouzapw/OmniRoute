import { writeFileSync, appendFileSync, existsSync, unlinkSync } from "node:fs";
import { t } from "../i18n.mjs";

export function registerLogs(program) {
  program
    .command("logs")
    .description(t("logs.description"))
    .option("--follow", t("logs.follow"))
    .option("--filter <level>", t("logs.filter"))
    .option("--lines <n>", t("logs.lines"), "100")
    .option("--timeout <ms>", t("logs.timeout"), "30000")
    .option("--base-url <url>", t("logs.baseUrl"), "http://localhost:20128")
    .option("--request-id <id>", t("logs.requestId"))
    .option("--api-key <key>", t("logs.apiKey"))
    .option("--combo <name>", t("logs.combo"))
    .option("--status <code>", t("logs.status"))
    .option("--duration-min <ms>", t("logs.durationMin"), parseInt)
    .option("--duration-max <ms>", t("logs.durationMax"), parseInt)
    .option("--export <path>", t("logs.export"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runLogsCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

function buildLogFilter(opts) {
  const levelFilters = opts.filter ? opts.filter.split(",").map((f) => f.trim()) : [];
  const requestId = opts.requestId;
  const apiKey = opts.apiKey;
  const combo = opts.combo;
  const statusFilter = opts.status != null ? String(opts.status) : null;
  const durationMin = opts.durationMin != null ? Number(opts.durationMin) : null;
  const durationMax = opts.durationMax != null ? Number(opts.durationMax) : null;

  return function matchesLog(parsed) {
    if (levelFilters.length > 0) {
      const level = String(parsed.level || "info").toLowerCase();
      if (!levelFilters.includes(level)) return false;
    }
    if (requestId) {
      const rid = String(parsed.requestId || parsed.request_id || "");
      if (!rid.includes(requestId)) return false;
    }
    if (apiKey) {
      const key = String(parsed.apiKey || parsed.api_key || parsed.key || "");
      if (!key.includes(apiKey)) return false;
    }
    if (combo) {
      const c = String(parsed.combo || parsed.comboName || parsed.combo_name || "");
      if (!c.includes(combo)) return false;
    }
    if (statusFilter) {
      const s = String(parsed.status || parsed.statusCode || parsed.status_code || "");
      if (!s.startsWith(statusFilter)) return false;
    }
    if (durationMin != null) {
      const d = Number(parsed.duration || parsed.durationMs || parsed.latency || 0);
      if (d < durationMin) return false;
    }
    if (durationMax != null) {
      const d = Number(parsed.duration || parsed.durationMs || parsed.latency || 0);
      if (d > durationMax) return false;
    }
    return true;
  };
}

export async function runLogsCommand(opts = {}) {
  const baseUrl = opts.baseUrl || opts["base-url"] || "http://localhost:20128";
  const follow = opts.follow ?? false;
  const timeout = parseInt(String(opts.timeout || "30000"), 10);
  const isJson = opts.output === "json";
  const exportPath = opts.export;

  // Prepare export file
  if (exportPath && existsSync(exportPath)) {
    unlinkSync(exportPath);
  }

  const matchesLog = buildLogFilter(opts);
  // Pass only level filters to the stream (server-side); other filters are client-side
  const levelFilters = opts.filter ? opts.filter.split(",").map((f) => f.trim()) : [];

  const { createLogStream } = await import("../../../src/lib/cli-helper/log-streamer.js");
  const { stream, stop } = createLogStream({ baseUrl, filters: levelFilters, follow, timeout });

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const processLine = (line) => {
    if (!line.trim()) return;
    let parsed = null;
    try {
      parsed = JSON.parse(line);
    } catch {
      // Non-JSON line: only include if no structured filters active
      if (
        opts.requestId ||
        opts.apiKey ||
        opts.combo ||
        opts.status ||
        opts.durationMin != null ||
        opts.durationMax != null
      )
        return;
      if (exportPath) appendFileSync(exportPath, line + "\n", "utf8");
      else console.log(line);
      return;
    }

    if (!matchesLog(parsed)) return;

    if (exportPath) {
      appendFileSync(exportPath, JSON.stringify(parsed) + "\n", "utf8");
      return;
    }

    if (isJson) {
      console.log(JSON.stringify(parsed));
      return;
    }

    const level = parsed.level || "info";
    const ts = parsed.timestamp || new Date().toISOString();
    const msg = parsed.message || JSON.stringify(parsed);
    const prefix =
      { error: "\x1b[31m[ERR]", warn: "\x1b[33m[WRN]", info: "\x1b[36m[INF]" }[level] || "[INF]";
    console.log(`${prefix}\x1b[0m ${ts} ${msg}`);
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() || "";
      for (const line of parts) processLine(line);
    }
    if (buffer) processLine(buffer);
    if (exportPath) console.log(t("logs.exported", { path: exportPath }));
  } catch (err) {
    if (err.name === "AbortError") {
      console.log(t("logs.stopped"));
    } else {
      console.error(
        t("logs.streamError", {
          message: (err instanceof Error ? err.message : String(err)).slice(0, 100),
        })
      );
    }
  } finally {
    stop();
  }

  return 0;
}
