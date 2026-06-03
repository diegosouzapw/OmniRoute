import { createInterface } from "node:readline";
import { Argument } from "commander";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtTs(v) {
  if (!v) return "-";
  return new Date(typeof v === "number" ? v * 1000 : v).toLocaleString();
}

function fmtBreaker(v) {
  if (v === "closed") return "● closed";
  if (v === "open") return "✗ open";
  return "○ half-open";
}

async function confirm(q) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${q} [y/N] `, (a) => {
      rl.close();
      resolve(a.trim().toLowerCase() === "y");
    });
  });
}

const breakerSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "state", header: "State", formatter: fmtBreaker },
  { key: "failures", header: "Failures" },
  { key: "successesProbe", header: "Probes ✓" },
  { key: "lastFailure", header: "Last Failure", formatter: fmtTs },
  { key: "resetAt", header: "Reset At", formatter: fmtTs },
];

const cooldownSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "connectionId", header: "Connection", width: 28 },
  { key: "testStatus", header: "Status" },
  { key: "rateLimitedUntil", header: "Until", formatter: fmtTs },
  { key: "backoffLevel", header: "Backoff" },
  { key: "lastErrorType", header: "Error Type" },
];

const lockoutSchema = [
  { key: "provider", header: "Provider", width: 16 },
  { key: "connectionId", header: "Connection", width: 24 },
  { key: "model", header: "Model", width: 30 },
  { key: "reason", header: "Reason" },
  { key: "expiresAt", header: "Expires", formatter: fmtTs },
];

export function registerResilience(program) {
  const r = program.command("resilience").description(t("resilience.description"));

  r.command("status")
    .option("--provider <p>", t("resilience.status.provider"))
    .action(async (opts, cmd) => {
      const params = new URLSearchParams();
      if (opts.provider) params.set("provider", opts.provider);
      const res = await apiFetch(`/api/resilience?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  r.command("breakers")
    .option("--provider <p>", t("resilience.breakers.provider"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/resilience?include=breakers");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      let rows = data.breakers ?? [];
      if (opts.provider) rows = rows.filter((x) => x.provider === opts.provider);
      emit(rows, cmd.optsWithGlobals(), breakerSchema);
    });

  r.command("cooldowns")
    .option("--provider <p>", t("resilience.cooldowns.provider"))
    .option("--connection-id <id>", t("resilience.cooldowns.connectionId"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/resilience?include=cooldowns");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      let rows = data.cooldowns ?? [];
      if (opts.provider) rows = rows.filter((x) => x.provider === opts.provider);
      if (opts.connectionId) rows = rows.filter((x) => x.connectionId === opts.connectionId);
      emit(rows, cmd.optsWithGlobals(), cooldownSchema);
    });

  r.command("lockouts")
    .option("--provider <p>", t("resilience.lockouts.provider"))
    .option("--model <m>", t("resilience.lockouts.model"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/resilience/model-cooldowns");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      let rows = data.items ?? data ?? [];
      if (opts.provider) rows = rows.filter((x) => x.provider === opts.provider);
      if (opts.model) rows = rows.filter((x) => x.model === opts.model);
      emit(rows, cmd.optsWithGlobals(), lockoutSchema);
    });

  r.command("reset")
    .description(t("resilience.reset.description"))
    .requiredOption("--provider <p>", t("resilience.reset.provider"))
    .option("--connection-id <id>", t("resilience.reset.connectionId"))
    .option("--model <m>", t("resilience.reset.model"))
    .option("--all-cooldowns", t("resilience.reset.allCooldowns"))
    .option("--yes", t("resilience.reset.yes"))
    .action(async (opts, cmd) => {
      if (!opts.yes) {
        const what = opts.connectionId
          ? `connection ${opts.connectionId}`
          : opts.model
            ? `model ${opts.provider}/${opts.model}`
            : `provider ${opts.provider}`;
        const ok = await confirm(`Reset ${what}?`);
        if (!ok) return;
      }
      const body = {
        provider: opts.provider,
        connectionId: opts.connectionId,
        model: opts.model,
        allCooldowns: !!opts.allCooldowns,
      };
      const res = await apiFetch("/api/resilience/reset", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  const profile = r.command("profile").description(t("resilience.profile.description"));

  profile.command("show").action(async (opts, cmd) => {
    const res = await apiFetch("/api/resilience?include=profile");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  profile
    .command("set")
    .addArgument(
      new Argument("<name>", t("resilience.profile.name")).choices([
        "aggressive",
        "balanced",
        "conservative",
        "custom",
      ])
    )
    .action(async (name, opts, cmd) => {
      const res = await apiFetch("/api/mcp/tools/call", {
        method: "POST",
        body: { name: "omniroute_set_resilience_profile", arguments: { profile: name } },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write(`Profile: ${name}\n`);
    });

  const config = r.command("config").description(t("resilience.config.description"));

  config.command("show").action(async (opts, cmd) => {
    const res = await apiFetch("/api/resilience?include=config");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  config
    .command("set")
    .option("--threshold <n>", t("resilience.config.threshold"), parseInt)
    .option("--reset-timeout <ms>", t("resilience.config.resetTimeout"), parseInt)
    .option("--base-cooldown <ms>", t("resilience.config.baseCooldown"), parseInt)
    .action(async (opts, cmd) => {
      const body = {};
      if (opts.threshold != null) body.threshold = opts.threshold;
      if (opts.resetTimeout != null) body.resetTimeoutMs = opts.resetTimeout;
      if (opts.baseCooldown != null) body.baseCooldownMs = opts.baseCooldown;
      const res = await apiFetch("/api/resilience", { method: "PATCH", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });
}
