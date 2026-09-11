import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";
import {
  loadContexts,
  saveContextsSecure,
  deleteContextCredential,
  migrateContextCredentials,
  resolveActiveContext,
} from "../contexts.mjs";

/** Auth label for a context: prefers the scoped accessToken over the legacy apiKey. */
function authLabel(c) {
  if (c?.accessToken) return "token";
  if (c?.apiKey) return "key";
  if (c?.credentialRef) return "keychain";
  return "✗";
}

function contextMap(config) {
  return config.contexts || config.profiles || {};
}

export async function confirm(msg) {
  // Non-interactive stdin (pipe, CI, EOF) cannot answer a [y/N] prompt. Asking
  // anyway leaves the readline question pending forever — Node then warns about an
  // "unsettled top-level await" at exit. Decline cleanly instead and point at the
  // non-interactive escape hatch so scripted callers fail safe rather than hang.
  if (!process.stdin.isTTY) {
    process.stderr.write(
      `${msg} [y/N] (non-interactive stdin — declined; pass --yes to confirm)\n`
    );
    return false;
  }
  const readline = await import("node:readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((r) => rl.question(`${msg} [y/N] `, r));
  rl.close();
  return /^y(es)?$/i.test(answer);
}

function maskKey(k) {
  if (!k) return null;
  if (k.length <= 8) return "***";
  return `${k.slice(0, 6)}***${k.slice(-4)}`;
}

/** Return an export-safe copy without legacy or canonical context credentials. */
export function redactContextSecrets(config) {
  const out = JSON.parse(JSON.stringify(config || {}));
  for (const collection of [out.contexts, out.profiles]) {
    for (const context of Object.values(collection || {})) {
      context.apiKey = null;
      delete context.accessToken;
    }
  }
  return out;
}

export function registerContexts(program) {
  const ctx = program
    .command("contexts")
    .alias("context") // singular alias — docs/connect output historically said `context current`
    .description(t("config.contexts.description") || "Manage server contexts/profiles");

  ctx
    .command("list")
    .description("List all contexts")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const cfg = loadContexts();
      const rows = Object.entries(contextMap(cfg)).map(([name, c]) => ({
        active: name === (cfg.currentContext || "default") ? "●" : "",
        name,
        baseUrl: c.baseUrl || "",
        auth: authLabel(c),
        scope: c.scope || "",
        description: c.description || "",
      }));
      emit(rows, globalOpts, [
        { key: "active", header: "" },
        { key: "name", header: "Name" },
        { key: "baseUrl", header: "Base URL" },
        { key: "auth", header: "Auth" },
        { key: "scope", header: "Scope" },
        { key: "description", header: "Description" },
      ]);
    });

  ctx
    .command("add <name>")
    .description("Add a new context")
    .requiredOption("--url <u>", "Base URL")
    .option("--api-key <k>", "Legacy inference API key")
    .option("--api-key-stdin", "Read API key from stdin")
    .option("--access-token <t>", "Scoped CLI access token (preferred over --api-key)")
    .option("--access-token-stdin", "Read access token from stdin")
    .option("--scope <s>", "Token scope hint for display (read|write|admin)")
    .option("--description <d>", "Context description")
    .action(async (name, opts) => {
      const cfg = loadContexts();
      if (contextMap(cfg)[name]) {
        process.stderr.write(`Context '${name}' already exists. Remove or rename first.\n`);
        process.exit(2);
      }
      let apiKey = opts.apiKey || null;
      let accessToken = opts.accessToken || null;
      if (opts.apiKeyStdin || opts.accessTokenStdin) {
        const chunks = [];
        for await (const c of process.stdin) chunks.push(c);
        const value = chunks.join("").trim() || null;
        if (opts.accessTokenStdin) accessToken = value;
        else apiKey = value;
      }
      const contexts = contextMap(cfg);
      contexts[name] = {
        baseUrl: opts.url,
        accessToken: accessToken || undefined,
        apiKey,
        scope: opts.scope || undefined,
        description: opts.description || undefined,
      };
      await saveContextsSecure(cfg);
      process.stdout.write(`Added context '${name}'\n`);
    });

  ctx
    .command("use <name>")
    .description("Switch active context")
    .action(async (name) => {
      const cfg = loadContexts();
      if (!contextMap(cfg)[name]) {
        process.stderr.write(`No such context: ${name}\n`);
        process.exit(2);
      }
      cfg.currentContext = name;
      await saveContextsSecure(cfg);
      process.stdout.write(`Active context: ${name}\n`);
    });

  ctx
    .command("current")
    .description("Show the active context (server, auth, scope)")
    .option("--name-only", "Print just the context name (legacy behavior)")
    .action((opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const cfg = loadContexts();
      const name = cfg.currentContext || cfg.activeProfile || "default";
      if (opts.nameOnly) {
        process.stdout.write(`${name}\n`);
        return;
      }
      const c = resolveActiveContext(name);
      emit(
        {
          name,
          baseUrl: c.baseUrl || "",
          auth: authLabel(c),
          scope: c.scope || "",
          description: c.description || "",
        },
        globalOpts
      );
    });

  ctx
    .command("show <name>")
    .description("Show context details")
    .action((name, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const cfg = loadContexts();
      const c = contextMap(cfg)[name];
      if (!c) {
        process.stderr.write(`No such context: ${name}\n`);
        process.exit(2);
      }
      const display = {
        name,
        baseUrl: c.baseUrl,
        auth: authLabel(c),
        credentialRef: c.credentialRef || null,
        accessToken: maskKey(c.accessToken),
        apiKey: maskKey(c.apiKey),
        scope: c.scope,
        description: c.description,
      };
      emit(display, globalOpts);
    });

  ctx
    .command("remove <name>")
    .description("Remove a context")
    .option("--yes", "Skip confirmation")
    .action(async (name, opts) => {
      if (!opts.yes) {
        const ok = await confirm(`Remove context '${name}'?`);
        if (!ok) {
          process.stdout.write("Cancelled.\n");
          return;
        }
      }
      const cfg = loadContexts();
      if (!contextMap(cfg)[name]) {
        process.stderr.write(`No such context: ${name}\n`);
        process.exit(2);
      }
      if (name === "default") {
        process.stderr.write("Cannot remove default context.\n");
        process.exit(2);
      }
      const contexts = contextMap(cfg);
      const deletedCredential = await deleteContextCredential(name, contexts[name]);
      if (contexts[name].credentialRef && !deletedCredential) {
        process.stderr.write(
          "Warning: could not remove the OS-keychain entry; the context reference was removed locally.\n"
        );
      }
      delete contexts[name];
      if (cfg.currentContext === name) cfg.currentContext = "default";
      await saveContextsSecure(cfg);
      process.stdout.write(`Removed context '${name}'\n`);
    });

  ctx
    .command("rename <old> <new>")
    .description("Rename a context")
    .action(async (oldName, newName) => {
      const cfg = loadContexts();
      const contexts = contextMap(cfg);
      if (!contexts[oldName]) {
        process.stderr.write(`No such context: ${oldName}\n`);
        process.exit(2);
      }
      if (contexts[newName]) {
        process.stderr.write(`Context '${newName}' already exists.\n`);
        process.exit(2);
      }
      contexts[newName] = contexts[oldName];
      delete contexts[oldName];
      if (cfg.currentContext === oldName) cfg.currentContext = newName;
      await saveContextsSecure(cfg);
      process.stdout.write(`Renamed '${oldName}' → '${newName}'\n`);
    });

  ctx
    .command("export")
    .description("Export contexts to JSON")
    .option("--out <path>", "Output file path (default: stdout)")
    .option("--no-secrets", "Omit API keys from export")
    .action(async (opts, cmd) => {
      const cfg = loadContexts();
      // Commander stores `--no-secrets` as `secrets === false`, never as `noSecrets`.
      const redact = opts.secrets === false || opts.noSecrets === true;
      const out = redact ? redactContextSecrets(cfg) : JSON.parse(JSON.stringify(cfg));
      const json = JSON.stringify(out, null, 2);
      if (opts.out) {
        const { writeFileSync } = await import("node:fs");
        writeFileSync(opts.out, json);
        process.stdout.write(`Exported to ${opts.out}\n`);
      } else {
        process.stdout.write(json + "\n");
      }
    });

  ctx
    .command("import <file>")
    .description("Import contexts from a JSON file")
    .option("--merge", "Merge with existing contexts (default: overwrite)")
    .action(async (file, opts) => {
      const { readFileSync } = await import("node:fs");
      let imported;
      try {
        imported = JSON.parse(readFileSync(file, "utf8"));
      } catch (e) {
        process.stderr.write(
          `Cannot read ${file}: ${e instanceof Error ? e.message : String(e)}\n`
        );
        process.exit(1);
      }
      const cfg = opts.merge
        ? loadContexts()
        : { version: 1, currentContext: "default", contexts: {} };
      if (!cfg.contexts && cfg.profiles) {
        cfg.contexts = cfg.profiles;
        delete cfg.profiles;
      }
      cfg.contexts = cfg.contexts || {};
      const incoming = imported.contexts || imported.profiles || {};
      let count = 0;
      for (const [name, raw] of Object.entries(incoming)) {
        if (typeof name !== "string" || !name) continue;
        const c = raw && typeof raw === "object" ? /** @type {Record<string,unknown>} */ (raw) : {};
        cfg.contexts[name] = {
          baseUrl: typeof c.baseUrl === "string" ? c.baseUrl : "http://localhost:20128",
          accessToken: typeof c.accessToken === "string" ? c.accessToken : undefined,
          apiKey: typeof c.apiKey === "string" ? c.apiKey : null,
          scope: typeof c.scope === "string" ? c.scope : undefined,
          description: typeof c.description === "string" ? c.description : undefined,
        };
        count++;
      }
      if (!opts.merge && typeof imported.currentContext === "string") {
        cfg.currentContext = imported.currentContext;
      }
      await saveContextsSecure(cfg);
      process.stdout.write(`Imported ${count} context(s)\n`);
    });

  ctx
    .command("migrate")
    .description("Move legacy plaintext context credentials to the OS keychain")
    .option("--yes", "Confirm migration in non-interactive scripts")
    .action(async (opts) => {
      const cfg = loadContexts();
      const pending = Object.entries(cfg.contexts || cfg.profiles || {}).filter(
        ([, context]) => context?.accessToken || context?.apiKey
      );
      if (!pending.length) {
        process.stdout.write("No plaintext context credentials found.\n");
        return;
      }
      if (
        !opts.yes &&
        !(await confirm(`Migrate ${pending.length} context credential(s) to keychain?`))
      ) {
        process.stdout.write("Cancelled.\n");
        return;
      }
      const result = await migrateContextCredentials();
      if (!result.migrated) {
        process.stderr.write(
          "OS keychain unavailable; credentials remain in config.json mode 0600.\n"
        );
        process.exitCode = 2;
        return;
      }
      process.stdout.write(`Migrated ${pending.length} context credential(s) to keychain.\n`);
    });
}
