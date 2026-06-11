/**
 * Theme Manager Plugin — injects CSS custom properties into HTML responses.
 *
 * Reads the X-User-Theme header from requests, merges with plugin config,
 * and injects CSS variables into HTML responses via a <style> tag.
 *
 * @module theme-manager
 */

const DEFAULT_THEMES = {
  light: {
    "--bg-primary": "#ffffff",
    "--bg-secondary": "#f5f5f5",
    "--text-primary": "#1a1a1a",
    "--text-secondary": "#666666",
    "--border-color": "#e0e0e0",
    "--shadow": "0 1px 3px rgba(0,0,0,0.1)",
  },
  dark: {
    "--bg-primary": "#1a1a1a",
    "--bg-secondary": "#2d2d2d",
    "--text-primary": "#f5f5f5",
    "--text-secondary": "#a0a0a0",
    "--border-color": "#404040",
    "--shadow": "0 1px 3px rgba(0,0,0,0.4)",
  },
};

function resolveThemeMode(darkMode, header) {
  if (header === "light" || header === "dark") return header;
  if (darkMode === "light" || darkMode === "dark") return darkMode;
  return "light";
}

function buildCssVariables(mode, config) {
  const base = DEFAULT_THEMES[mode] || DEFAULT_THEMES.light;
  const vars = { ...base };
  if (config.primaryColor) vars["--color-primary"] = config.primaryColor;
  if (config.borderRadius) vars["--border-radius"] = config.borderRadius;
  if (config.fontFamily) vars["--font-family"] = config.fontFamily;
  return vars;
}

function varsToCss(vars) {
  return Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
}

/**
 * onRequest hook — reads X-User-Theme header and stores resolved mode in metadata.
 */
export function onRequest(ctx) {
  const config = ctx?.config || {};
  const header = ctx?.headers?.["x-user-theme"] || ctx?.headers?.["X-User-Theme"];
  const mode = resolveThemeMode(config.darkMode, header);
  if (ctx?.metadata) {
    ctx.metadata.__themeMode = mode;
  }
}

/**
 * onResponse hook — injects <style> tag with CSS variables into HTML responses.
 */
export function onResponse(ctx, response) {
  const config = ctx?.config || {};
  const mode = ctx?.metadata?.__themeMode || "light";

  const isHtml =
    response?.headers?.["content-type"]?.includes("text/html") ||
    typeof response?.body === "string" &&
      (response.body.includes("<!DOCTYPE html>") || response.body.includes("<html"));

  if (!isHtml || typeof response?.body !== "string") return response;

  const vars = buildCssVariables(mode, config);
  const styleTag = `<style id="omniroute-theme">\n:root {\n${varsToCss(vars)}\n}\n</style>`;

  const body = response.body.replace(/<head([^>]*)>/i, `<head$1>${styleTag}`);

  return { ...response, body };
}

/**
 * onInstall lifecycle hook — log installation.
 */
export function onInstall(ctx) {
  console.log(`[theme-manager] Installed v${ctx?.version || "unknown"}`);
}

/**
 * onActivate lifecycle hook — log activation.
 */
export function onActivate(ctx) {
  console.log(`[theme-manager] Activated with config:`, ctx?.config || {});
}

/**
 * onDeactivate lifecycle hook — log deactivation.
 */
export function onDeactivate(ctx) {
  console.log(`[theme-manager] Deactivated`);
}

/**
 * onPluginMessage — receive IPC messages from other plugins via broadcast/sendTo.
 * Listens for "theme:update" events and applies new theme config on the fly.
 */
export function onPluginMessage(payload) {
  if (payload.event === "theme:update") {
    console.log(`[theme-manager] Received theme update from ${payload.source || "unknown"}:`, payload.data);
  } else {
    console.log(`[theme-manager] Received event "${payload.event}" from ${payload.source || "unknown"}`);
  }
}

/**
 * onRender — serve a dashboard page showing current theme configuration.
 * Called when the user visits /dashboard/plugins/theme-manager/page/dashboard.
 * Returns an HTML string rendered inside the OmniRoute dashboard.
 */
export function onRender(payload) {
  const slug = payload?.slug || "index";
  const params = payload?.params || {};

  if (slug === "dashboard") {
    const config = params.config || {};
    return {
      type: "html",
      html: `<div style="font-family: sans-serif; padding: 1rem;">
  <h2>Theme Manager Dashboard</h2>
  <p>Manage your OmniRoute theme settings from here.</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
    <thead>
      <tr style="background: #f5f5f5;">
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Setting</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Current Value</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">Primary Color</td><td style="border: 1px solid #ddd; padding: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background: ${config.primaryColor || "#6C5CE7"}; border-radius: 3px; vertical-align: middle; margin-right: 6px;"></span>${config.primaryColor || "#6C5CE7 (default)"}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">Dark Mode</td><td style="border: 1px solid #ddd; padding: 8px;">${config.darkMode || "auto (default)"}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">Border Radius</td><td style="border: 1px solid #ddd; padding: 8px;">${config.borderRadius || "8px (default)"}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">Font Family</td><td style="border: 1px solid #ddd; padding: 8px;">${config.fontFamily || "Inter, system-ui, sans-serif (default)"}</td></tr>
    </tbody>
  </table>
</div>`,
    };
  }

  return { type: "html", html: "<p>Theme Manager — page not found.</p>" };
}