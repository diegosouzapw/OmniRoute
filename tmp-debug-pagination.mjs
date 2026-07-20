// Replicate the pagination test exactly — in-memory better-sqlite3
import Database from "better-sqlite3";

const db = new Database(":memory:");

// Create the provider_connections table matching the real schema
db.exec(`
  CREATE TABLE IF NOT EXISTS provider_connections (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    auth_type TEXT NOT NULL DEFAULT 'oauth',
    name TEXT NOT NULL,
    email TEXT,
    priority INTEGER NOT NULL DEFAULT 1,
    is_active INTEGER NOT NULL DEFAULT 1,
    api_key TEXT,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TEXT,
    token_expires_at TEXT,
    id_token TEXT,
    codex_session_cookie TEXT,
    proxy_enabled INTEGER NOT NULL DEFAULT 1,
    per_key_proxy_enabled INTEGER NOT NULL DEFAULT 1,
    quota_visible INTEGER NOT NULL DEFAULT 1,
    quota_window_thresholds_json TEXT,
    rate_limit_overrides_json TEXT,
    max_concurrent INTEGER,
    base_url TEXT,
    allow_self_signed INTEGER,
    organization_id TEXT,
    project_id TEXT,
    "group" TEXT,
    provider_specific_data TEXT,
    test_status TEXT,
    last_error_at TEXT,
    backoff_level INTEGER NOT NULL DEFAULT 0,
    last_used_at TEXT,
    consecutive_use_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

// Insert 5 connections matching the pagination test
const ids = [];
for (let i = 5; i >= 1; i--) {
  const id = `id-${i}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO provider_connections (id, provider, auth_type, name, priority, is_active, api_key, proxy_enabled, per_key_proxy_enabled, quota_visible, consecutive_use_count, backoff_level, created_at, updated_at)
    VALUES (@id, @provider, @authType, @name, @priority, 1, @apiKey, 1, 1, 1, 0, 0, @now, @now)
  `).run({
    id, provider: "openai", authType: "apikey", name: `Pageable conn ${i}`, priority: i, apiKey: `sk-paging-${i}`, now
  });
  ids.push(id);
}

console.log("IDs in creation order (5->1):", ids.map((x,i)=>`${i}:${x.slice(0,12)}`).join(", "));
const expectedOrder = [ids[4], ids[3], ids[2], ids[1], ids[0]];
console.log("Expected (priority ASC):", expectedOrder.map(x=>x.slice(0,12)).join(", "));

// Query without pagination
const all = db.prepare("SELECT * FROM provider_connections WHERE provider = @provider ORDER BY priority ASC, updated_at DESC").all({provider: "openai"});
console.log("\nAll (no pagination):", all.map((r,i)=>`${i}:${r.id.slice(0,12)} pri=${r.priority} upd=${r.updated_at}`).join("\n  "));
console.log(`all[0] matches expectedOrder[0]: ${all[0].id === expectedOrder[0]}`);

// LIMIT 2 OFFSET 0
const page1 = db.prepare("SELECT * FROM provider_connections WHERE provider = @provider ORDER BY priority ASC, updated_at DESC LIMIT @limit OFFSET @offset").all({provider: "openai", limit: 2, offset: 0});
console.log("\nPage1 (LIMIT 2 OFFSET 0):", page1.map((r,i)=>`${i}:${r.id.slice(0,12)} pri=${r.priority}`).join("\n  "));
console.log(`page1[0] === expectedOrder[0]: ${page1[0].id === expectedOrder[0]}`);
console.log(`page1[1] === expectedOrder[1]: ${page1[1].id === expectedOrder[1]}`);

if (page1[1].id !== expectedOrder[1]) {
  const idxInIds = ids.indexOf(page1[1].id);
  console.log(`page1[1] is actually ids[${idxInIds}] (priority=${5-idxInIds} when idxInIds=0..4)`);
}

// LIMIT 2 OFFSET 2
const page2 = db.prepare("SELECT * FROM provider_connections WHERE provider = @provider ORDER BY priority ASC, updated_at DESC LIMIT @limit OFFSET @offset").all({provider: "openai", limit: 2, offset: 2});
console.log("\nPage2 (LIMIT 2 OFFSET 2):", page2.map((r,i)=>`${i}:${r.id.slice(0,12)} pri=${r.priority}`).join("\n  "));

// LIMIT 2 OFFSET 4
const page3 = db.prepare("SELECT * FROM provider_connections WHERE provider = @provider ORDER BY priority ASC, updated_at DESC LIMIT @limit OFFSET @offset").all({provider: "openai", limit: 2, offset: 4});
console.log("\nPage3 (LIMIT 2 OFFSET 4):", page3.map((r,i)=>`${i}:${r.id.slice(0,12)} pri=${r.priority}`).join("\n  "));

db.close();
