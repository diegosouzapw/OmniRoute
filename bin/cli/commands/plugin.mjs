import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";
import { discoverPlugins } from "../plugins.mjs";

const TEMPLATE_INDEX = `export const meta = {
  name: "PLUGIN_NAME",
  version: "0.1.0",
  description: "OmniRoute plugin",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("PLUGIN_NAME")
    .description(meta.description)
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      // ctx provides: ctx.apiFetch, ctx.emit, ctx.t, ctx.withSpinner, ctx.baseUrl, ctx.apiKey
      const res = await ctx.apiFetch("/api/health", { baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
`;

export function registerPlugin(program) {
  const plugin = program
    .command("plugin")
    .description(t("plugin.description") || "Manage CLI plugins (omniroute-cmd-*)");

  plugin
    .command("list")
    .description(t("plugin.list") || "List installed plugins")
    .action(async (opts, cmd) => {
      const plugins = await discoverPlugins();
      emit(
        plugins.map((p) => ({ name: p.name, version: p.version, description: p.description })),
        cmd.optsWithGlobals()
      );
      if (plugins.length === 0) {
        process.stdout.write("No plugins installed.\n");
        process.stdout.write(`Install: omniroute plugin install <name>\n`);
      }
    });

  plugin
    .command("install <name>")
    .description(t("plugin.install") || "Install a plugin")
    .option("-y, --yes", "Skip confirmation prompt")
    .action(async (name, opts) => {
      const isLocal = name.startsWith("./") || name.startsWith("/") || name.startsWith("../");
      const pkgName = isLocal ? name : `omniroute-cmd-${name}`;

      if (!opts.yes) {
        process.stderr.write(
          `⚠ WARNING: Plugins run with the same privileges as omniroute CLI.\n` +
            `  Only install plugins from sources you trust.\n` +
            `  Installing: ${pkgName}\n` +
            `  Pass --yes to skip this prompt.\n`
        );
        // In non-interactive mode, require explicit --yes
        if (!process.stdin.isTTY) {
          process.stderr.write("Non-interactive mode: use --yes to confirm.\n");
          process.exit(1);
        }
      }

      try {
        execSync(`npm install -g ${pkgName}`, { stdio: "inherit" });
        process.stdout.write(`\n✓ Installed: ${pkgName}\n`);
      } catch {
        process.stderr.write(`✗ Failed to install ${pkgName}\n`);
        process.exit(1);
      }
    });

  plugin
    .command("remove <name>")
    .alias("uninstall")
    .description(t("plugin.remove") || "Remove a plugin")
    .option("-y, --yes", "Skip confirmation")
    .action(async (name, opts) => {
      const pkgName = name.startsWith("omniroute-cmd-") ? name : `omniroute-cmd-${name}`;
      if (!opts.yes) {
        process.stderr.write(`Removing: ${pkgName} — pass --yes to confirm.\n`);
        if (!process.stdin.isTTY) {
          process.exit(1);
        }
      }
      try {
        execSync(`npm uninstall -g ${pkgName}`, { stdio: "inherit" });
        process.stdout.write(`✓ Removed: ${pkgName}\n`);
      } catch {
        process.stderr.write(`✗ Failed to remove ${pkgName}\n`);
        process.exit(1);
      }
    });

  plugin
    .command("info <name>")
    .description(t("plugin.info") || "Show plugin details")
    .action(async (name, opts, cmd) => {
      const plugins = await discoverPlugins();
      const p = plugins.find((x) => x.name === name || x.name === `omniroute-cmd-${name}`);
      if (!p) {
        process.stderr.write(`Plugin '${name}' not found.\n`);
        process.exit(1);
      }
      emit(p.pkg, cmd.optsWithGlobals());
    });

  plugin
    .command("search [query]")
    .description(t("plugin.search") || "Search npm for available plugins")
    .action(async (query) => {
      const q = query ? `omniroute-cmd-${query}` : "omniroute-cmd";
      const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=50`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`npm registry returned ${res.status}`);
        const data = await res.json();
        const rows = (data.objects || []).map((o) => ({
          name: o.package.name,
          version: o.package.version,
          description: o.package.description,
        }));
        if (rows.length === 0) {
          process.stdout.write(`No plugins found for '${query || "omniroute-cmd"}'.\n`);
        } else {
          rows.forEach((r) =>
            process.stdout.write(`  ${r.name}@${r.version}  ${r.description || ""}\n`)
          );
        }
      } catch (err) {
        process.stderr.write(`Search failed: ${err.message}\n`);
        process.exit(1);
      }
    });

  plugin
    .command("update [name]")
    .description(t("plugin.update") || "Update installed plugin(s)")
    .action(async (name) => {
      const pkg = name ? `omniroute-cmd-${name}` : "omniroute-cmd-*";
      try {
        execSync(`npm update -g ${pkg}`, { stdio: "inherit" });
        process.stdout.write(`✓ Updated: ${pkg}\n`);
      } catch {
        process.stderr.write(`✗ Update failed\n`);
        process.exit(1);
      }
    });

  plugin
    .command("scaffold <name>")
    .description(t("plugin.scaffold") || "Scaffold a new plugin boilerplate")
    .action(async (name) => {
      const safeName = name.replace(/[^a-z0-9-]/g, "-");
      const dir = join(process.cwd(), `omniroute-cmd-${safeName}`);
      if (existsSync(dir)) {
        process.stderr.write(`Directory already exists: ${dir}\n`);
        process.exit(1);
      }
      mkdirSync(dir, { recursive: true });
      writeFileSync(
        join(dir, "package.json"),
        JSON.stringify(
          {
            name: `omniroute-cmd-${safeName}`,
            version: "0.1.0",
            type: "module",
            main: "index.mjs",
            description: `OmniRoute CLI plugin: ${safeName}`,
            engines: { omniroute: ">=4.0.0" },
            keywords: ["omniroute-plugin", "omniroute-cmd"],
          },
          null,
          2
        ) + "\n"
      );
      writeFileSync(join(dir, "index.mjs"), TEMPLATE_INDEX.replace(/PLUGIN_NAME/g, safeName));
      writeFileSync(
        join(dir, "README.md"),
        `# omniroute-cmd-${safeName}\n\nAn OmniRoute CLI plugin.\n\n## Install\n\n\`\`\`bash\nomniroute plugin install ${safeName}\n\`\`\`\n`
      );
      process.stdout.write(`✓ Scaffolded: ${dir}\n`);
      process.stdout.write(`  Run: cd ${dir} && omniroute plugin install .\n`);
    });
}
