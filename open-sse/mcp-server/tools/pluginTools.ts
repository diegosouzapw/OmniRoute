/**
 * MCP Plugin Tools — 8 tools for plugin management.
 *
 * @module mcp-server/tools/pluginTools
 */

import { z } from "zod";
import { resolve, normalize, isAbsolute } from "path";
import { listPlugins, getPluginByName, updatePluginConfig } from "../../../src/lib/db/plugins";
import { pluginManager } from "../../../src/lib/plugins/manager";
import { validatePluginConfig, type ConfigField } from "../../../src/lib/plugins/manifest";

/**
 * Validate a path is safe for plugin installation.
 * Prevents directory traversal and null byte injection.
 */
function validatePluginPath(path: string): string {
  // Reject null bytes
  if (path.includes("\0")) {
    throw new Error("Invalid path: contains null bytes");
  }
  // Must be absolute
  if (!isAbsolute(path)) {
    throw new Error("Path must be absolute");
  }
  // Normalize and resolve to prevent traversal
  const normalized = normalize(resolve(path));
  // Reject paths with traversal patterns
  if (normalized.includes("..") || normalized.includes("~")) {
    throw new Error("Invalid path: directory traversal detected");
  }
  return normalized;
}

export const pluginTools = [
  {
    name: "plugin_list",
    description: "List all installed plugins with their status, hooks, and metadata.",
    scopes: ["read:plugins"],
    inputSchema: z.object({
      status: z
        .enum(["installed", "active", "inactive", "error"])
        .optional()
        .describe("Filter by plugin status"),
    }),
    handler: async (args: { status?: string }) => {
      const plugins = listPlugins(args.status as any);
      return {
        plugins: plugins.map((p) => ({
          name: p.name,
          version: p.version,
          description: p.description,
          status: p.status,
          enabled: p.enabled === 1,
          hooks: JSON.parse(p.hooks || "[]"),
          permissions: JSON.parse(p.permissions || "[]"),
          installedAt: p.installedAt,
          activatedAt: p.activatedAt,
        })),
      };
    },
  },

  {
    name: "plugin_install",
    description: "Install a plugin from a local directory path.",
    scopes: ["write:plugins"],
    inputSchema: z.object({
      path: z.string().describe("Absolute path to the plugin directory containing plugin.json"),
    }),
    handler: async (args: { path: string }) => {
      const safePath = validatePluginPath(args.path);
      const plugin = await pluginManager.install(safePath);
      return {
        success: true,
        plugin: {
          name: plugin.name,
          version: plugin.version,
          status: plugin.status,
        },
      };
    },
  },

  {
    name: "plugin_activate",
    description: "Activate an installed plugin (loads hooks into the request pipeline).",
    scopes: ["write:plugins"],
    inputSchema: z.object({
      name: z.string().describe("Plugin name (kebab-case)"),
    }),
    handler: async (args: { name: string }) => {
      try {
        await pluginManager.activate(args.name);
        return { success: true, message: `Plugin '${args.name}' activated` };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return { success: false, error: msg };
      }
    },
  },

  {
    name: "plugin_deactivate",
    description: "Deactivate an active plugin (unloads hooks from the request pipeline).",
    scopes: ["write:plugins"],
    inputSchema: z.object({
      name: z.string().describe("Plugin name (kebab-case)"),
    }),
    handler: async (args: { name: string }) => {
      try {
        await pluginManager.deactivate(args.name);
        return { success: true, message: `Plugin '${args.name}' deactivated` };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return { success: false, error: msg };
      }
    },
  },

  {
    name: "plugin_uninstall",
    description: "Uninstall a plugin (deactivates, removes files, removes from DB).",
    scopes: ["write:plugins"],
    inputSchema: z.object({
      name: z.string().describe("Plugin name (kebab-case)"),
    }),
    handler: async (args: { name: string }) => {
      try {
        await pluginManager.uninstall(args.name);
        return { success: true, message: `Plugin '${args.name}' uninstalled` };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return { success: false, error: msg };
      }
    },
  },

  {
    name: "plugin_configure",
    description: "Get or update a plugin's configuration.",
    scopes: ["write:plugins"],
    inputSchema: z.object({
      name: z.string().describe("Plugin name"),
      config: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("New config values to merge (omit to just read current config)"),
    }),
    handler: async (args: { name: string; config?: Record<string, unknown> }) => {
      const plugin = getPluginByName(args.name);
      if (!plugin) return { success: false, error: `Plugin '${args.name}' not found` };

      if (args.config) {
        const current = JSON.parse(plugin.config || "{}");
        const merged = { ...current, ...args.config };

        // Validate merged config against configSchema if the plugin declares one
        const rawSchema = JSON.parse(plugin.configSchema || "{}") as Record<string, ConfigField>;
        if (Object.keys(rawSchema).length > 0) {
          const validation = validatePluginConfig(merged, rawSchema);
          if (!validation.valid) {
            // Return a generic message — do NOT leak raw field-level detail externally
            return { success: false, error: "Config validation failed: one or more values are invalid" };
          }
        }

        updatePluginConfig(args.name, merged);
        return { success: true, config: merged };
      }

      return {
        config: JSON.parse(plugin.config || "{}"),
        configSchema: JSON.parse(plugin.configSchema || "{}"),
      };
    },
  },

  {
    name: "plugin_executions",
    description: "View plugin execution metrics (from plugin_analytics table).",
    scopes: ["read:plugins"],
    inputSchema: z.object({
      name: z.string().optional().describe("Filter by plugin name"),
      limit: z.number().min(1).max(100).default(20).describe("Max results to return"),
    }),
    handler: async (args: { name?: string; limit?: number }) => {
      const { getPluginAnalytics, getPluginAnalyticsSummary } = await import(
        "../../../src/lib/db/plugins"
      );
      const limit = args.limit || 20;
      if (args.name) {
        const rows = getPluginAnalytics(args.name).slice(0, limit);
        return { metrics: rows };
      }
      // No name filter: return all plugins' summaries
      const allPlugins = listPlugins();
      const metrics = allPlugins.slice(0, limit).map((p) => getPluginAnalyticsSummary(p.name));
      return { metrics };
    },
  },

  {
    name: "plugin_scan",
    description: "Scan the plugin directory for new plugins and sync with DB.",
    scopes: ["write:plugins"],
    inputSchema: z.object({}),
    handler: async () => {
      const result = await pluginManager.scan();
      return {
        discovered: result.discovered,
        errors: result.errors,
      };
    },
  },
];
