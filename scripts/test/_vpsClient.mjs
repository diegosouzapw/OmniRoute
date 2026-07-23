/**
 * scripts/test/_vpsClient.mjs
 *
 * Reusable Phase-3 VPS HTTP client for OmniRoute combo live-smoke tests.
 * NOT a test file — intentionally placed in scripts/test/ so check:test-discovery
 * does not scan it.
 *
 * Combo create/delete mechanism: SSH-sqlite fallback.
 * /api/combos requires management auth (returns 401 unauthenticated).
 * We insert/delete rows directly via:
 *   execFileSync("ssh", ["root@192.168.0.15", "sqlite3", "/root/.omniroute/storage.sqlite", SQL])
 * Values are static test-scoped data — no untrusted interpolation.
 *
 * combos table schema (PRAGMA table_info):
 *   id TEXT PK, name TEXT NOT NULL, data TEXT NOT NULL (JSON blob),
 *   created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 *   system_message TEXT, tool_filter_regex TEXT,
 *   context_cache_protection INTEGER DEFAULT 0, sort_order INTEGER NOT NULL DEFAULT 0
 *
 * The `data` column stores the full combo as JSON (name, models[], strategy, config,
 * id, createdAt, updatedAt, version, sortOrder).
 */

import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = process.env.COMBO_LIVE_BASE_URL ?? "http://192.168.0.15:20128";
const API_KEY = process.env.COMBO_LIVE_API_KEY ?? null;
const VPS_SSH_HOST = "root@192.168.0.15";
const VPS_DB_PATH = "/root/.omniroute/storage.sqlite";

// ---------------------------------------------------------------------------
// Nonce counter — increments per call so semantic cache cannot serve stale
// ---------------------------------------------------------------------------
let _nonceCounter = 0;
export function nonce() {
  return ++_nonceCounter;
}

// ---------------------------------------------------------------------------
// Shared fetch helpers
// ---------------------------------------------------------------------------
function authHeaders() {
  const h = { "Content-Type": "application/json" };
  if (API_KEY) h["Authorization"] = `Bearer ${API_KEY}`;
  return h;
}

async function fetchJson(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { ...options, headers: { ...authHeaders(), ...(options.headers ?? {}) } });
  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, ok: res.ok, body };
}

// ---------------------------------------------------------------------------
// health() — GET /api/monitoring/health
// ---------------------------------------------------------------------------
export async function health() {
  const { status, body } = await fetchJson("/api/monitoring/health");
  return {
    status,
    version: body?.version ?? null,
    uptime: body?.uptime ?? null,
    raw: body,
  };
}

// ---------------------------------------------------------------------------
// chat() — POST /v1/chat/completions (non-streaming)
// ---------------------------------------------------------------------------
export async function chat(model, { maxTokens = 16, content } = {}) {
  const n = nonce();
  const userContent = content ?? `ping ${n}`;
  const payload = {
    model,
    stream: false,
    max_tokens: maxTokens,
    temperature: 0,
    messages: [{ role: "user", content: userContent }],
  };
  const { status, body } = await fetchJson("/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const text = body?.choices?.[0]?.message?.content ?? null;
  return {
    status,
    model: body?.model ?? model,
    text,
    raw: body,
  };
}

// ---------------------------------------------------------------------------
// Combo create/delete via SSH sqlite
// ---------------------------------------------------------------------------
function sshSqlite(sql) {
  // Pipe SQL via stdin to avoid shell quoting issues with complex SQL statements.
  // ssh + sqlite3 reads from stdin when no trailing SQL arg is given.
  return execFileSync("ssh", [VPS_SSH_HOST, "sqlite3", VPS_DB_PATH], {
    input: sql,
    encoding: "utf8",
    timeout: 15_000,
  }).trim();
}

/**
 * createCombo(def) — inserts a combo row via SSH sqlite.
 *
 * def shape:
 *   { name, strategy, models, config }
 *
 * models: array of "providerId/model" strings  OR
 *         array of { providerId, model, connectionId?, weight? } objects.
 *
 * config: optional object (judgeModel, fusionTuning, etc.)
 *
 * Returns the combo id string.
 */
export function createCombo(def) {
  const id = randomUUID();
  const now = new Date().toISOString();
  const strategy = def.strategy ?? "priority";
  const config = def.config ?? {};
  const name = def.name;

  // Normalise models to the shape the DB expects
  const rawModels = def.models ?? [];
  const models = rawModels.map((m, idx) => {
    if (typeof m === "string") {
      // "providerId/model" shorthand
      const slashIdx = m.indexOf("/");
      const providerId = slashIdx >= 0 ? m.slice(0, slashIdx) : m;
      const model = slashIdx >= 0 ? m.slice(slashIdx + 1) : m;
      const slugName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const slugModel = model.toLowerCase().replace(/[^a-z0-9]/g, "-");
      return {
        id: `${slugName}-model-${idx + 1}-${providerId}-${slugModel}-${randomUUID()}`,
        kind: "model",
        model: `${providerId}/${model}`,
        providerId,
        weight: 1,
      };
    }
    // Already an object
    const providerId = m.providerId;
    const model = m.model;
    const slugName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const slugModel = (model ?? "").toLowerCase().replace(/[^a-z0-9]/g, "-");
    return {
      id: m.id ?? `${slugName}-model-${idx + 1}-${providerId}-${slugModel}-${randomUUID()}`,
      kind: "model",
      model: model.includes("/") ? model : `${providerId}/${model}`,
      providerId,
      ...(m.connectionId ? { connectionId: m.connectionId } : {}),
      weight: m.weight ?? 1,
    };
  });

  const dataObj = {
    name,
    models,
    strategy,
    config,
    id,
    createdAt: now,
    updatedAt: now,
    version: 2,
    sortOrder: 9999,
  };

  const dataJson = JSON.stringify(dataObj).replace(/'/g, "''");
  const nameSafe = name.replace(/'/g, "''");
  const sql = `INSERT INTO combos (id, name, data, created_at, updated_at, sort_order) VALUES ('${id}', '${nameSafe}', '${dataJson}', '${now}', '${now}', 9999);`;
  sshSqlite(sql);
  return id;
}

/**
 * deleteCombo(nameOrId) — deletes a combo by name or id via SSH sqlite.
 * Only deletes __live_test__* prefixed combos as a safety guard.
 */
export function deleteCombo(nameOrId) {
  if (!nameOrId.startsWith("__live_test__")) {
    throw new Error(`deleteCombo safety guard: refusing to delete '${nameOrId}' — only __live_test__* combos allowed.`);
  }
  const safe = nameOrId.replace(/'/g, "''");
  // Try delete by name first, then by id
  sshSqlite(`DELETE FROM combos WHERE name='${safe}' OR id='${safe}';`);
}

// ---------------------------------------------------------------------------
// listHealthyProviders(candidates) — probe each "provider/model" candidate
// ---------------------------------------------------------------------------
/**
 * For each "provider/model" string, fire a minimal chat() and keep those
 * returning HTTP 200 with non-empty text.
 *
 * @param {string[]} candidates - array of "provider/model" strings
 * @returns {Promise<string[]>} healthy candidates
 */
export async function listHealthyProviders(candidates) {
  const results = await Promise.allSettled(
    candidates.map(async (c) => {
      const r = await chat(c, { maxTokens: 16 });
      return r.status === 200 && r.text ? c : null;
    })
  );
  return results
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Preflight self-check (run directly: node scripts/test/_vpsClient.mjs)
// ---------------------------------------------------------------------------
const isMain = process.argv[1]?.endsWith("_vpsClient.mjs") ||
  import.meta.url === `file://${process.argv[1]}`;

if (isMain) {
  (async () => {
    console.log("=== OmniRoute VPS Phase-3 Preflight ===");
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`API key: ${API_KEY ? "set (Bearer)" : "not set (REQUIRE_API_KEY=false)"}`);
    console.log();

    // 1. Health
    console.log("--- health() ---");
    try {
      const h = await health();
      console.log(`  status: ${h.status}`);
      console.log(`  version: ${h.version}`);
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }

    // 2. Combo mechanism probe
    console.log();
    console.log("--- combo create/delete mechanism ---");
    console.log("  /api/combos GET (unauthenticated):", (() => {
      try {
        const r = execFileSync("curl", ["-s", "-o", "/dev/null", "-w", "%{http_code}", `${BASE_URL}/api/combos`], { encoding: "utf8", timeout: 5000 });
        return r.trim();
      } catch { return "error"; }
    })());
    console.log("  Mechanism: SSH sqlite fallback (management API requires auth)");
    console.log("  SSH host:", VPS_SSH_HOST);
    console.log("  DB path:", VPS_DB_PATH);

    // 3. Create + delete a probe combo via SSH sqlite
    console.log();
    console.log("--- createCombo / deleteCombo (SSH sqlite) ---");
    const probeName = "__live_test__probe";
    let probeId;
    try {
      probeId = createCombo({
        name: probeName,
        strategy: "priority",
        models: ["groq/llama-3.1-8b-instant"],
        config: {},
      });
      console.log(`  created id: ${probeId}`);
      deleteCombo(probeName);
      console.log(`  deleted OK`);
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
      // Attempt cleanup on error
      if (probeId) {
        try { deleteCombo(probeName); } catch {}
      }
    }

    // 4. ollama-cloud chat probe
    console.log();
    console.log("--- chat probe: ollama-cloud/glm-5.2 ---");
    try {
      const r = await chat("ollama-cloud/glm-5.2", { maxTokens: 16 });
      console.log(`  status: ${r.status}`);
      console.log(`  model: ${r.model}`);
      console.log(`  text: ${r.text ? r.text.slice(0, 80) : "(empty)"}`);
      if (r.status !== 200 || !r.text) {
        console.log("  NOTE: ollama-cloud/glm-5.2 did not return a valid response.");
        console.log("  raw error:", JSON.stringify(r.raw?.error ?? r.raw).slice(0, 200));
      }
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }

    // 5. Quick healthy provider scan over a small candidate set
    console.log();
    console.log("--- listHealthyProviders (subset scan) ---");
    const candidates = [
      "groq/llama-3.1-8b-instant",
      "gemini/gemini-2.0-flash",
      "deepseek/deepseek-chat",
      "cerebras/llama3.1-8b",
      "ollama-cloud/glm-5.2",
    ];
    try {
      const healthy = await listHealthyProviders(candidates);
      console.log(`  tested: ${candidates.join(", ")}`);
      console.log(`  healthy (${healthy.length}/${candidates.length}): ${healthy.join(", ") || "(none)"}`);
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }

    console.log();
    console.log("=== Preflight complete ===");
  })();
}
