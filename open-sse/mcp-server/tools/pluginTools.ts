/**
 * MCP Plugin Tools — 8 tools for plugin management.
 *
 * @module mcp-server/tools/pluginTools
 */

import { z } from "zod";
import { listPlugins, getPluginByName, updatePluginConfig } from "../../../src/lib/db/plugins";
import { pluginManager } from "../../../src/lib/plugins/manager";

export const pluginTools = [
  {
    name: "plugin_list",
    description: "List all installed plugins with their status, hooks, and metadata.",
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
    inputSchema: z.object({
      path: z.string().describe("Absolute path to the plugin directory containing plugin.json"),
    }),
    handler: async (args: { path: string }) => {
      const plugin = await pluginManager.install(args.path);
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
    inputSchema: z.object({
      name: z.string().describe("Plugin name (kebab-case)"),
    }),
    handler: async (args: { name: string }) => {
      await pluginManager.activate(args.name);
      return { success: true, message: `Plugin '${args.name}' activated` };
    },
  },

  {
    name: "plugin_deactivate",
    description: "Deactivate an active plugin (unloads hooks from the request pipeline).",
    inputSchema: z.object({
      name: z.string().describe("Plugin name (kebab-case)"),
    }),
    handler: async (args: { name: string }) => {
      await pluginManager.deactivate(args.name);
      return { success: true, message: `Plugin '${args.name}' deactivated` };
    },
  },

  {
    name: "plugin_uninstall",
    description: "Uninstall a plugin (deactivates, removes files, removes from DB).",
    inputSchema: z.object({
      name: z.string().describe("Plugin name (kebab-case)"),
    }),
    handler: async (args: { name: string }) => {
      await pluginManager.uninstall(args.name);
      return { success: true, message: `Plugin '${args.name}' uninstalled` };
    },
  },

  {
    name: "plugin_configure",
    description: "Get or update a plugin's configuration.",
    inputSchema: z.object({
      name: z.string().describe("Plugin name"),
      config: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("New config values to merge (omit to just read current config)"),
    }),
    handler: async (args: { name: string; config?: Record<string, unknown> }) => {
      const plugin = getPluginByName(args.name);
      if (!plugin) throw new Error(`Plugin '${args.name}' not found`);

      if (args.config) {
        const current = JSON.parse(plugin.config || "{}");
        const merged = { ...current, ...args.config };
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
    description: "View plugin execution history (from skill_executions table).",
    inputSchema: z.object({
      name: z.string().optional().describe("Filter by plugin name"),
      limit: z.number().min(1).max(100).default(20).describe("Max results to return"),
    }),
    handler: async (args: { name?: string; limit?: number }) => {
      // Plugin executions are tracked via the skills system
      const { skillExecutor } = await import("../../../src/lib/skills/executor");
      const executions = skillExecutor.listExecutions(undefined, args.limit || 20);
      return { executions };
    },
  },

  {
    name: "plugin_scan",
    description: "Scan the plugin directory for new plugins and sync with DB.",
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
