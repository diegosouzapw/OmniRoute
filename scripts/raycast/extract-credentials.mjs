#!/usr/bin/env node
/**
 * @file extract-credentials.mjs
 * @description Print Raycast Pro credentials from local macOS install (redacted preview).
 *
 * Usage: node scripts/raycast/extract-credentials.mjs
 *
 * @changes
 * - [2026-07-27] [Composer] - CLI credential extractor for local Raycast
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmdirSync, unlinkSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const RAYCAST_SALT = "yvkwWXzxPPBAqY2tmaKrB*DvYjjMaeEf";
const RAYCAST_SUPPORT = join(homedir(), "Library", "Application Support", "com.raycast.macos");
const RAYCAST_DB = join(RAYCAST_SUPPORT, "raycast-enc.sqlite");

function redact(s, keep = 8) {
  if (!s || s.length <= keep * 2) return "***";
  return `${s.slice(0, keep)}…${s.slice(-4)}`;
}

function readKeychain(account) {
  return JSON.parse(
    execFileSync("security", ["find-generic-password", "-s", "Raycast", "-a", account, "-w"], {
      encoding: "utf-8",
    }).trim()
  );
}

function dbPassphrase() {
  const keyHex = execFileSync(
    "security",
    ["find-generic-password", "-s", "Raycast", "-a", "database_key", "-w"],
    { encoding: "utf-8" }
  ).trim();
  return createHash("sha256")
    .update(keyHex + RAYCAST_SALT)
    .digest("hex");
}

function queryDb(sql) {
  const tmpDir = mkdtempSync(join(tmpdir(), "raycast-extract-"));
  const tmpDb = join(tmpDir, "db.sqlite");
  copyFileSync(RAYCAST_DB, tmpDb);
  for (const ext of ["-wal", "-shm"]) {
    const src = RAYCAST_DB + ext;
    if (existsSync(src)) copyFileSync(src, tmpDb + ext);
  }
  const passphrase = dbPassphrase();
  const input = `PRAGMA key = '${passphrase}';\n.mode json\n${sql}`;
  const out = execFileSync("sqlcipher", [tmpDb], { input, encoding: "utf-8" });
  for (const ext of ["", "-wal", "-shm"]) {
    try {
      unlinkSync(tmpDb + ext);
    } catch {}
  }
  try {
    rmdirSync(tmpDir);
  } catch {}
  const jsonStr = out.startsWith("ok\n") ? out.slice(3) : out;
  return JSON.parse(jsonStr.trim() || "[]");
}

if (process.platform !== "darwin") {
  console.error("macOS only");
  process.exit(1);
}

const store = readKeychain("raycast-store_credentials");
const token = store?.oauth?.access_token;
if (!token) {
  console.error("No Raycast bearer token in Keychain — open Raycast and sign in");
  process.exit(1);
}

const users = queryDb("SELECT analyticsId, email, username, hasProFeatures, hasBetterAI FROM user LIMIT 1;");
const user = users[0] || {};
const deviceId =
  user.analyticsId ||
  JSON.parse(readFileSync(join(RAYCAST_SUPPORT, "posthog.distinctId"), "utf-8"))["posthog.distinctId"];

console.log(JSON.stringify({
  accessTokenPreview: redact(token),
  accessToken: token,
  deviceId,
  aid: deviceId,
  email: user.email || store?.user?.email,
  username: user.username || store?.user?.username,
  hasProFeatures: !!user.hasProFeatures,
  hasBetterAI: !!user.hasBetterAI,
  sources: {
    bearer: "Keychain Raycast / raycast-store_credentials",
    deviceId: "raycast-enc.sqlite user.analyticsId",
  },
}, null, 2));
