#!/usr/bin/env node

/**
 * Password Reset CLI — T-38
 *
 * Usage:
 *   node bin/reset-password.mjs
 *   npx omniroute reset-password
 *
 * Resets the admin password for OmniRoute.
 * Prompts for a new password and updates the database directly.
 *
 * @module bin/reset-password
 */

import { createInterface } from "node:readline";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve data directory — same logic as the server
const DATA_DIR = process.env.DATA_DIR || resolve(__dirname, "..", "data");
const DB_PATH = resolve(DATA_DIR, "settings.db");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

console.log("\n🔑 OmniRoute — Password Reset\n");

async function main() {
  // Check if database exists
  if (!existsSync(DB_PATH)) {
    console.error(`❌ Database not found at: ${DB_PATH}`);
    console.error(`   Make sure OmniRoute has been started at least once.`);
    console.error(`   Or set DATA_DIR env var to your data directory.\n`);
    process.exit(1);
  }

  let Database;
  try {
    Database = (await import("better-sqlite3")).default;
  } catch {
    console.error("❌ better-sqlite3 not installed. Run: npm install");
    process.exit(1);
  }

  const db = new Database(DB_PATH);

  // Check current settings
  const row = db.prepare("SELECT value FROM settings WHERE key = 'password'").get();

  if (row) {
    console.log("ℹ️  A password is currently set.");
  } else {
    console.log("ℹ️  No password is currently set.");
  }

  const password = await ask("Enter new password (min 4 chars): ");

  if (!password || password.length < 4) {
    console.error("\n❌ Password must be at least 4 characters.\n");
    db.close();
    rl.close();
    process.exit(1);
  }

  const confirm = await ask("Confirm new password: ");

  if (password !== confirm) {
    console.error("\n❌ Passwords do not match.\n");
    db.close();
    rl.close();
    process.exit(1);
  }

  const hashed = hashPassword(password);

  // Upsert the password
  const stmt = db.prepare(`
    INSERT INTO settings (key, value) VALUES ('password', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  stmt.run(hashed);

  // Also ensure requireLogin is true
  const loginStmt = db.prepare(`
    INSERT INTO settings (key, value) VALUES ('requireLogin', 'true')
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  loginStmt.run();

  db.close();
  rl.close();

  console.log("\n✅ Password reset successfully!");
  console.log("   Restart OmniRoute for changes to take effect.\n");
}

main().catch((err) => {
  console.error(`\n❌ Error: ${err.message}\n`);
  rl.close();
  process.exit(1);
});
