import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";
import { loadContexts, saveContexts, resolveActiveContext } from "../contexts.mjs";

/** Auth label for a context: prefers the scoped accessToken over the legacy apiKey. */
function authLabel(c) {
  if (c?.accessToken) return "token";
  if (c?.apiKey) return "key";
  return "✗";
}

export async function confirm(msg) {
  // Non-interactive stdin (pipe, CI, EOF) cannot answer a [y/N] prompt. Asking
  // anyway leaves the readline question pending forever — Node then warns about an
  // "unsettled top-level await" at exit. Decline cleanly instead and point at the
  // non-interactive escape hatch so scripted callers fail safe rather than hang.
  if (!process.stdin.isTTY) {
    process.stderr.write(`${msg} [y/N] (non-interactive stdin — declined; pass --yes to confirm)\n`);
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
      const rows = Object.entries(cfg.contexts || {}).map(([name, c]) => ({
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
      if (cfg.contexts?.[name]) {
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
      cfg.contexts = cfg.contexts || {};
      cfg.contexts[name] = {
        baseUrl: opts.url,
        accessToken: accessToken || undefined,
        apiKey,
        scope: opts.scope || undefined,
        description: opts.description || undefined,
      };
      saveContexts(cfg);
      process.stdout.write(`Added context '${name}'\n`);
    });

  ctx
    .command("use <name>")
    .description("Switch active context")
    .action((name) => {
      const cfg = loadContexts();
      if (!cfg.contexts?.[name]) {
        process.stderr.write(`No such context: ${name}\n`);
        process.exit(2);
      }
      cfg.currentContext = name;
      saveContexts(cfg);
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
      const c = cfg.contexts?.[name];
      if (!c) {
        process.stderr.write(`No such context: ${name}\n`);
        process.exit(2);
      }
      const display = {
        name,
        baseUrl: c.baseUrl,
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
      if (!cfg.contexts?.[name]) {
        process.stderr.write(`No such context: ${name}\n`);
        process.exit(2);
      }
      if (name === "default") {
        process.stderr.write("Cannot remove default context.\n");
        process.exit(2);
      }
      delete cfg.contexts[name];
      if (cfg.currentContext === name) cfg.currentContext = "default";
      saveContexts(cfg);
      process.stdout.write(`Removed context '${name}'\n`);
    });

  ctx
    .command("rename <old> <new>")
    .description("Rename a context")
    .action((oldName, newName) => {
      const cfg = loadContexts();
      if (!cfg.contexts?.[oldName]) {
        process.stderr.write(`No such context: ${oldName}\n`);
        process.exit(2);
      }
      if (cfg.contexts[newName]) {
        process.stderr.write(`Context '${newName}' already exists.\n`);
        process.exit(2);
      }
      cfg.contexts[newName] = cfg.contexts[oldName];
      delete cfg.contexts[oldName];
      if (cfg.currentContext === oldName) cfg.currentContext = newName;
      saveContexts(cfg);
      process.stdout.write(`Renamed '${oldName}' → '${newName}'\n`);
    });

  ctx
    .command("export")
    .description("Export contexts to JSON")
    .option("--out <path>", "Output file path (default: stdout)")
    .option("--no-secrets", "Omit API keys from export")
    .action(async (opts, cmd) => {
      const cfg = loadContexts();
      const out = JSON.parse(JSON.stringify(cfg));
      if (opts.noSecrets) {
        for (const c of Object.values(out.contexts || {})) {
          c.apiKey = null;
          delete c.accessToken;
        }
      }
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
      const incoming = imported.contexts || {};
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
      saveContexts(cfg);
      process.stdout.write(`Imported ${count} context(s)\n`);
    });
}
