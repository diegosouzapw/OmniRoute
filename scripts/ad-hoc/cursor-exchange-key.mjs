#!/usr/bin/env node
/**
 * Cursor: API Key -> Access Token (JWT)
 *
 * Exchanges a long-lived Cursor user API key (`crsr_...`) for a short-lived
 * JWT access token. Same call cursor-agent CLI uses internally and the same
 * call OmniRoute uses on import / refresh.
 *
 * Usage:
 *   node scripts/ad-hoc/cursor-exchange-key.mjs <CURSOR_API_KEY>
 *   CURSOR_API_KEY=crsr_xxx node scripts/ad-hoc/cursor-exchange-key.mjs
 *
 * Output (JSON, stdout):
 *   {
 *     accessToken, refreshToken, machineId,
 *     expiresAt, expiresInSec, userId, email
 *   }
 */

import crypto from "node:crypto";

const ENDPOINT = "https://api2.cursor.sh/auth/exchange_user_api_key";

const apiKey = (process.argv[2] || process.env.CURSOR_API_KEY || "").trim();

if (!apiKey) {
  console.error("Usage: node scripts/ad-hoc/cursor-exchange-key.mjs <CURSOR_API_KEY>");
  console.error("   or: CURSOR_API_KEY=crsr_xxx node scripts/ad-hoc/cursor-exchange-key.mjs");
  process.exit(1);
}
if (!apiKey.startsWith("crsr_")) {
  console.error("Error: Cursor API key must start with 'crsr_'");
  process.exit(1);
}

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: "{}",
});

if (!res.ok) {
  const text = await res.text().catch(() => "");
  console.error(`Cursor rejected the API key (HTTP ${res.status}): ${text.slice(0, 500)}`);
  process.exit(2);
}

const data = await res.json();
const accessToken = data?.accessToken;
const refreshToken = data?.refreshToken || null;

if (!accessToken) {
  console.error("Cursor response missing accessToken:", JSON.stringify(data));
  process.exit(3);
}

const claims = decodeJwt(accessToken) || {};
const expSeconds = Number.isFinite(claims.exp) ? claims.exp : Math.floor(Date.now() / 1000) + 3600;

const out = {
  accessToken,
  refreshToken,
  machineId: crypto.randomUUID(),
  expiresAt: new Date(expSeconds * 1000).toISOString(),
  expiresInSec: expSeconds - Math.floor(Date.now() / 1000),
  userId: claims.sub || claims.user_id || null,
  email: claims.email || null,
};

console.log(JSON.stringify(out, null, 2));
