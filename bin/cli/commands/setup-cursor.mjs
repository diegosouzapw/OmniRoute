/**
 * omniroute setup-cursor — guide Cursor to use OmniRoute.
 *
 * Cursor stores its OpenAI key + "Override OpenAI Base URL" in an opaque SQLite
 * DB (state.vscdb) with no documented stable schema — NOT safe to file-write.
 * So this command prints the exact in-app steps (and can list available models
 * from /v1/models). Note: Cursor's custom base URL only powers the Chat panel;
 * Composer / inline-edit / autocomplete stay on Cursor's own backend.
 */

import { printHeading, printInfo, printSuccess } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

function ensureV1(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
}

/** Resolve apiBase (WITH /v1 — Cursor appends /chat/completions) + apiKey. */
export function resolveCursorTarget(opts = {}) {
  let root;
  if (opts.remote) root = String(opts.remote).replace(/\/+$/, "");
  else {
    try {
      root = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT)?.baseUrl;
    } catch {
      /* none */
    }
    if (!root) root = `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }
  let apiKey = opts.apiKey ?? opts["api-key"];
  if (!apiKey) {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      apiKey = c?.accessToken || c?.apiKey;
    } catch {
      /* none */
    }
  }
  if (!apiKey) apiKey = process.env.OMNIROUTE_API_KEY || "";
  return { apiBase: ensureV1(root), apiKey };
}

/** The step-by-step Cursor UI instructions (pure → testable). */
export function buildCursorInstructions({ apiBase, models }) {
  const lines = [
    "Cursor stores this config in an opaque database, so configure it in the app:",
    "",
    "  1. Cursor → Settings (Cmd/Ctrl + ,) → Models",
    "  2. Enable “Override OpenAI Base URL” and set it to:",
    `       ${apiBase}        (the /v1 suffix is required)`,
    "  3. Set the OpenAI API Key to your OmniRoute key (OMNIROUTE_API_KEY)",
    "  4. Add the model name(s) you want under “Models” (Cursor has no auto-discovery):",
  ];
  const sample = (models && models.length ? models : ["glm/glm-5.2", "kmc/kimi-k2.7"]).slice(0, 8);
  lines.push(`       e.g. ${sample.join(", ")}`);
  lines.push("  5. Use the Chat panel (Cmd/Ctrl + L) to verify.");
  lines.push("");
  lines.push("⚠  The custom base URL powers the CHAT panel only — Composer, inline edit");
  lines.push("   (Cmd/Ctrl+K) and autocomplete keep using Cursor's own backend.");
  return lines.join("\n");
}

async function fetchModelIds(apiBase, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${apiBase.replace(/\/v1$/, "")}/v1/models`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const body = await res.json();
    const list = Array.isArray(body) ? body : body.data ?? body.models ?? [];
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function runSetupCursorCommand(opts = {}) {
  const { apiBase, apiKey } = resolveCursorTarget(opts);
  printHeading("OmniRoute → Cursor");
  printInfo(`Server: ${apiBase}`);

  let models = [];
  const only = opts.only ? opts.only.split(",").map((s) => s.trim()).filter(Boolean) : null;
  const ids = await fetchModelIds(apiBase, apiKey);
  models = only ? ids.filter((id) => only.some((f) => id.includes(f))) : ids;

  console.log("\n" + buildCursorInstructions({ apiBase, models }));
  printSuccess("\nCursor is configured manually (no file written — Cursor's storage is opaque).");
  return 0;
}

export function registerSetupCursor(program) {
  program
    .command("setup-cursor")
    .description("Print the steps to point Cursor at OmniRoute (chat panel; Cursor config is not file-writable)")
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--only <patterns>", "Comma-separated substrings — suggest only matching model IDs")
    .action(async (opts) => {
      const code = await runSetupCursorCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
