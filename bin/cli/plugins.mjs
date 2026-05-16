import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";

const PLUGIN_PREFIX_RE = /^(@[^/]+\/)?omniroute-cmd-/;

function getPluginDirs() {
  return [join(homedir(), ".omniroute", "plugins"), process.env.OMNIROUTE_PLUGIN_PATH].filter(
    Boolean
  );
}

export async function discoverPlugins() {
  const found = [];
  for (const dir of getPluginDirs()) {
    if (!existsSync(dir)) continue;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const pkgPath = join(dir, entry.name, "package.json");
      if (!existsSync(pkgPath)) continue;
      let pkg;
      try {
        pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      } catch {
        continue;
      }
      if (!pkg.name || !PLUGIN_PREFIX_RE.test(pkg.name)) continue;
      found.push({
        name: pkg.name,
        version: pkg.version || "0.0.0",
        description: pkg.description || "",
        dir: join(dir, entry.name),
        pkg,
      });
    }
  }
  return found;
}

export function buildPluginContext(opts = {}) {
  return {
    apiFetch: async (...args) => {
      const { apiFetch } = await import("./api.mjs");
      return apiFetch(...args);
    },
    emit: async (...args) => {
      const { emit } = await import("./output.mjs");
      return emit(...args);
    },
    t: async (...args) => {
      const { t } = await import("./i18n.mjs");
      return t(...args);
    },
    withSpinner: async (...args) => {
      const { withSpinner } = await import("./spinner.mjs");
      return withSpinner(...args);
    },
    baseUrl: opts.baseUrl,
    apiKey: opts.apiKey,
  };
}

export async function loadPlugins(program, ctx = {}) {
  const plugins = await discoverPlugins();
  for (const p of plugins) {
    try {
      const entryPath = join(p.dir, p.pkg.main || "index.mjs");
      if (!existsSync(entryPath)) {
        process.stderr.write(`[plugin] ${p.name}: entry file not found (${entryPath})\n`);
        continue;
      }
      const mod = await import(pathToFileURL(entryPath).href);
      if (typeof mod.register === "function") {
        mod.register(program, buildPluginContext(ctx));
      } else {
        process.stderr.write(`[plugin] ${p.name}: no register() export — skipping\n`);
      }
    } catch (err) {
      process.stderr.write(`[plugin] Failed to load ${p.name}: ${err.message}\n`);
    }
  }
  return plugins.length;
}
