import { detectRestrictedEnvironment } from "../utils/environment.mjs";
import { t } from "../i18n.mjs";

const RESOURCES = {
  combos: "/dashboard/combos",
  providers: "/dashboard/providers",
  "api-manager": "/dashboard/api-manager",
  "cli-tools": "/dashboard/cli-tools",
  agents: "/dashboard/agents",
  settings: "/dashboard/settings",
  logs: "/dashboard/logs",
  memory: "/dashboard/memory",
  skills: "/dashboard/skills",
  evals: "/dashboard/evals",
  audit: "/dashboard/audit",
  cost: "/dashboard/cost",
  resilience: "/dashboard/resilience",
  pricing: "/dashboard/pricing",
  tunnels: "/dashboard/tunnels",
  quota: "/dashboard/quota",
};

export function registerOpen(program) {
  program
    .command("open [resource] [id]")
    .description(t("open.description"))
    .option("--url", t("open.url"))
    .action(async (resource, id, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const baseUrl = globalOpts.baseUrl || "http://localhost:20128";
      let path = "/dashboard";

      if (resource) {
        const base = RESOURCES[resource];
        if (!base) {
          process.stderr.write(
            `Unknown resource: ${resource}\nAvailable: ${Object.keys(RESOURCES).join(", ")}\n`
          );
          process.exit(2);
        }
        path = base;
        if (id) {
          if (resource === "logs") {
            path += `?request=${encodeURIComponent(id)}`;
          } else if (resource === "settings") {
            path += `/${encodeURIComponent(id)}`;
          } else {
            path += `/${encodeURIComponent(id)}`;
          }
        }
      }

      const url = `${baseUrl}${path}`;

      if (opts.url) {
        process.stdout.write(url + "\n");
        return;
      }

      const env = detectRestrictedEnvironment();
      if (!env.canOpenBrowser) {
        process.stdout.write(url + "\n");
        if (env.hint) process.stderr.write(`[${env.type}] ${env.hint}\n`);
        return;
      }

      try {
        const openPkg = (await import("open")).default;
        await openPkg(url);
        process.stderr.write(`Opening: ${url}\n`);
      } catch {
        process.stdout.write(url + "\n");
      }
    });
}
