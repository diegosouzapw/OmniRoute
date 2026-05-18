#!/usr/bin/env node
/**
 * Cursor: Refresh access token using the stored long-lived API key.
 *
 * Exchanges the `crsr_...` API key for a fresh JWT access token.
 * Same mechanism that CursorExecutor.refreshCredentials() uses internally
 * and the same endpoint the cursor-agent CLI calls on startup.
 *
 * Usage:
 *   node scripts/ad-hoc/cursor-refresh-token.mjs --api-key <crsr_...>
 *
 * Env fallback:
 *   CURSOR_API_KEY
 *
 * Output (JSON, stdout): { accessToken, refreshToken, expiresIn, expiresAt }
 */

import crypto from "node:crypto";

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv);
const apiKey = (args["api-key"] || process.env.CURSOR_API_KEY || "").trim();

if (!apiKey) {
  console.error("Usage:");
  console.error("  node scripts/ad-hoc/cursor-refresh-token.mjs --api-key <crsr_...>");
  console.error("Env: CURSOR_API_KEY");
  process.exit(1);
}
if (!apiKey.startsWith("crsr_")) {
  console.error("Error: Cursor API key must start with 'crsr_'");
  process.exit(1);
}

const log = {
  info: (tag, msg) => console.error(`[${tag}] ${msg}`),
  warn: (tag, msg) => console.error(`[${tag}] WARN ${msg}`),
  error: (tag, msg) => console.error(`[${tag}] ERROR ${msg}`),
};

try {
  const res = await fetch("https://api2.cursor.sh/auth/exchange_user_api_key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: "{}",
  });

  if (!res.ok) {
    console.error(`Cursor exchange_user_api_key failed: HTTP ${res.status}`);
    const text = await res.text().catch(() => "");
    if (text) console.error(text.slice(0, 500));
    process.exit(2);
  }

  const data = await res.json();
  const accessToken = data?.accessToken;
  if (!accessToken) {
    console.error("Cursor exchange response missing accessToken");
    process.exit(3);
  }

  let expiresIn = 3600;
  try {
    const payload = accessToken.split(".")[1];
    if (payload) {
      const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
      if (Number.isFinite(decoded?.exp)) {
        expiresIn = Math.max(60, decoded.exp - Math.floor(Date.now() / 1000));
      }
    }
  } catch {
    // Non-JWT token; keep default expiresIn
  }

  log.info("TOKEN", "Cursor refreshed via API key");

  const out = {
    accessToken,
    refreshToken: data.refreshToken || null,
    expiresIn,
    expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
  };

  console.log(JSON.stringify(out, null, 2));
} catch (e) {
  log.error("TOKEN", `Cursor refresh error: ${e.message}`);
  process.exit(2);
}
