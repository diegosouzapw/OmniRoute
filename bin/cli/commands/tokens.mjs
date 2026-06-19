import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { printSuccess, printError, printInfo } from "../io.mjs";
import { t } from "../i18n.mjs";

/**
 * `omniroute tokens` — manage scoped CLI access tokens on the active (usually
 * remote) server. Requires an `admin` credential — the commands hit
 * /api/cli/tokens which is admin-only. Uses the active context's auth via
 * apiFetch automatically.
 */

async function readErrorMessage(res) {
  try {
    const body = await res.json();
    return body?.error?.message || body?.error || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

export function registerTokens(program) {
  const tokens = program
    .command("tokens")
    .description(t("tokens.description") || "Manage scoped CLI access tokens (remote mode)");

  tokens
    .command("create")
    .description("Create a new access token (requires admin scope)")
    .requiredOption("--name <name>", "Human-readable token name")
    .option("--scope <scope>", "Scope: read | write | admin", "read")
    .option("--expires <days>", "Expire after N days (default: never)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const body = { name: opts.name, scope: opts.scope };
      if (opts.expires) {
        const days = Number(opts.expires);
        if (!Number.isFinite(days) || days <= 0) {
          printError("--expires must be a positive number of days.");
          process.exit(2);
        }
        body.expiresInDays = days;
      }
      const res = await apiFetch("/api/cli/tokens", {
        ...globalOpts,
        method: "POST",
        body,
        acceptNotOk: true,
      });
      if (!res.ok) {
        printError(`Could not create token: ${await readErrorMessage(res)}`);
        process.exit(res.exitCode || 1);
      }
      const b = await res.json();
      printSuccess(`Token '${b.name}' created (scope: ${b.scope}).`);
      printInfo("Copy it now — it will NOT be shown again:");
      process.stdout.write(`${b.token}\n`);
    });

  tokens
    .command("list")
    .description("List access tokens (masked)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const res = await apiFetch("/api/cli/tokens", { ...globalOpts, acceptNotOk: true });
      if (!res.ok) {
        printError(`Could not list tokens: ${await readErrorMessage(res)}`);
        process.exit(res.exitCode || 1);
      }
      const b = await res.json();
      const rows = (b.tokens || []).map((tk) => ({
        id: tk.id,
        name: tk.name,
        scope: tk.scope,
        prefix: tk.tokenPrefix,
        created: tk.createdAt,
        lastUsed: tk.lastUsedAt || "",
        expires: tk.expiresAt || "",
        status: tk.revokedAt ? "revoked" : "active",
      }));
      emit(rows, globalOpts, [
        { key: "id", header: "ID" },
        { key: "name", header: "Name" },
        { key: "scope", header: "Scope" },
        { key: "prefix", header: "Prefix" },
        { key: "status", header: "Status" },
        { key: "lastUsed", header: "Last Used" },
        { key: "expires", header: "Expires" },
      ]);
    });

  tokens
    .command("revoke <idOrPrefix>")
    .description("Revoke an access token by id or display prefix")
    .action(async (idOrPrefix, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const res = await apiFetch(`/api/cli/tokens/${encodeURIComponent(idOrPrefix)}`, {
        ...globalOpts,
        method: "DELETE",
        acceptNotOk: true,
      });
      if (!res.ok) {
        printError(`Could not revoke token: ${await readErrorMessage(res)}`);
        process.exit(res.exitCode || 1);
      }
      printSuccess(`Revoked ${idOrPrefix}.`);
    });

  tokens
    .command("scopes")
    .description("Explain the three access-token scopes")
    .action(() => {
      printInfo("Access-token scopes (admin ⊃ write ⊃ read):");
      process.stdout.write("  read   list/inspect only (models, status, logs, usage)\n");
      process.stdout.write("  write  read + configure/apply (setup-codex, keys add, config set)\n");
      process.stdout.write("  admin  write + manage (tokens, providers add, services, policy)\n");
    });
}
