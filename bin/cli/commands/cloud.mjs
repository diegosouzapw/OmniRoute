import { readFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const AGENTS = ["codex", "devin", "jules"];

function truncate(v, len = 35) {
  if (v == null) return "-";
  const s = String(v);
  return s.length > len ? s.slice(0, len - 1) + "…" : s;
}

function fmtTs(v) {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleString();
  } catch {
    return String(v);
  }
}

function fmtStatus(v) {
  if (!v) return "-";
  const colors = {
    running: "\x1b[33m",
    completed: "\x1b[32m",
    failed: "\x1b[31m",
    cancelled: "\x1b[90m",
  };
  const c = colors[v] ?? "";
  return `${c}${v}\x1b[0m`;
}

const taskSchema = [
  { key: "id", header: "Task ID", width: 22 },
  { key: "agent", header: "Agent", width: 8 },
  { key: "status", header: "Status", width: 14, formatter: fmtStatus },
  { key: "title", header: "Title", width: 35, formatter: truncate },
  { key: "createdAt", header: "Created", formatter: fmtTs },
  { key: "updatedAt", header: "Updated", formatter: fmtTs },
];

async function confirm(q) {
  return new Promise((resolve) => {
    process.stdout.write(`${q} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase().startsWith("y")));
  });
}

function registerTaskCommands(parent, agent) {
  const task = parent.command("task").description(t("cloud.task.description"));

  task
    .command("create")
    .description(t("cloud.task.create.description"))
    .option("--title <t>", t("cloud.task.create.title"))
    .option("--prompt <p>", t("cloud.task.create.prompt"))
    .option("--prompt-file <path>", t("cloud.task.create.prompt_file"))
    .option("--repo <url>", t("cloud.task.create.repo"))
    .option("--branch <b>", t("cloud.task.create.branch"))
    .option("--metadata <json>", t("cloud.task.create.metadata"))
    .action(async (opts, cmd) => {
      const prompt =
        opts.prompt ?? (opts.promptFile ? readFileSync(opts.promptFile, "utf8") : null);
      if (!prompt) {
        process.stderr.write("--prompt or --prompt-file required\n");
        process.exit(2);
      }
      const body = {
        agent,
        title: opts.title ?? prompt.slice(0, 80),
        prompt,
        ...(opts.repo ? { repo: opts.repo } : {}),
        ...(opts.branch ? { branch: opts.branch } : {}),
        ...(opts.metadata ? { metadata: JSON.parse(opts.metadata) } : {}),
      };
      const res = await apiFetch("/api/v1/agents/tasks", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  task
    .command("list")
    .description(t("cloud.task.list.description"))
    .option("--status <s>", t("cloud.task.list.status"))
    .option("--limit <n>", t("cloud.task.list.limit"), parseInt, 50)
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ agent, limit: String(opts.limit ?? 50) });
      if (opts.status) params.set("status", opts.status);
      const res = await apiFetch(`/api/v1/agents/tasks?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.items ?? data, cmd.optsWithGlobals(), taskSchema);
    });

  task
    .command("get <taskId>")
    .description(t("cloud.task.get.description"))
    .action(async (taskId, opts, cmd) => {
      const res = await apiFetch(`/api/v1/agents/tasks/${taskId}`);
      if (!res.ok) {
        process.stderr.write(`Not found: ${taskId}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  task
    .command("status <taskId>")
    .description(t("cloud.task.status.description"))
    .action(async (taskId, opts, cmd) => {
      const res = await apiFetch(`/api/v1/agents/tasks/${taskId}`);
      if (!res.ok) {
        process.stderr.write(`Not found: ${taskId}\n`);
        process.exit(1);
      }
      const data = await res.json();
      const globalOpts = cmd.optsWithGlobals();
      if (globalOpts.output === "json") {
        emit({ status: data.status }, globalOpts);
      } else {
        process.stdout.write(`${data.status}\n`);
      }
    });

  task
    .command("cancel <taskId>")
    .description(t("cloud.task.cancel.description"))
    .option("--yes", t("cloud.task.cancel.yes"))
    .action(async (taskId, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Cancel task ${taskId}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "POST",
        body: { op: "cancel" },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Cancelled\n");
    });

  task
    .command("approve <taskId>")
    .description(t("cloud.task.approve.description"))
    .action(async (taskId, opts, cmd) => {
      const res = await apiFetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "POST",
        body: { op: "approve_plan" },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Plan approved\n");
    });

  task
    .command("message <taskId> <message>")
    .description(t("cloud.task.message.description"))
    .action(async (taskId, msg, opts, cmd) => {
      const res = await apiFetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "POST",
        body: { op: "message", message: msg },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Message sent\n");
    });

  parent
    .command("sources <taskId>")
    .description(t("cloud.sources.description"))
    .action(async (taskId, opts, cmd) => {
      const res = await apiFetch(`/api/v1/agents/tasks/${taskId}?op=sources`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.sources ?? data, cmd.optsWithGlobals());
    });
}

export function registerCloud(program) {
  const cloud = program.command("cloud").description(t("cloud.description"));

  cloud
    .command("agents")
    .description(t("cloud.agents.description"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/v1/agents/tasks?meta=agents");
      if (res.ok) {
        const data = await res.json();
        emit(data.agents ?? AGENTS.map((id) => ({ id })), cmd.optsWithGlobals());
      } else {
        emit(
          AGENTS.map((id) => ({ id })),
          cmd.optsWithGlobals()
        );
      }
    });

  for (const agent of AGENTS) {
    const agentCmd = cloud
      .command(agent)
      .description(t("cloud.agent.description").replace("{agent}", agent));
    registerTaskCommands(agentCmd, agent);

    agentCmd
      .command("auth")
      .description(t("cloud.agent.auth.description"))
      .option("--no-browser", "Skip browser open")
      .option("--timeout <ms>", "Auth timeout ms", parseInt, 300000)
      .action(async (opts, cmd) => {
        const { runOAuthStart } = await import("./oauth.mjs");
        await runOAuthStart({ provider: agent, ...opts }, cmd);
      });
  }
}
