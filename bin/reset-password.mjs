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
import { resolveDataDir, resolveStoragePath } from "./cli/data-dir.mjs";
import { readManagementPasswordState, resetManagementPassword } from "./cli/sqlite.mjs";

// Resolve data directory — same logic as the server
const DATA_DIR = resolveDataDir();
const DB_PATH = resolveStoragePath(DATA_DIR);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function exitWithError(message) {
  console.error(message);
  rl.close();
  process.exit(1);
}

console.log("\n🔑 OmniRoute — Password Reset\n");

async function main() {
  // Check if database exists
  const passwordState = await readManagementPasswordState(DB_PATH);
  if (!passwordState.exists) {
    console.error(`❌ Database not found at: ${DB_PATH}`);
    console.error(`   Make sure OmniRoute has been started at least once.`);
    console.error(`   Or set DATA_DIR env var to your data directory.\n`);
    process.exit(1);
  }

  if (passwordState.hasPassword) {
    console.log("ℹ️  A password is currently set.");
  } else {
    console.log("ℹ️  No password is currently set.");
  }

  const password = await ask("Enter new password (min 8 chars): ");

  if (!password || password.length < 8) {
    exitWithError("\n❌ Password must be at least 8 characters.\n");
  }

  const confirm = await ask("Confirm new password: ");

  if (password !== confirm) {
    exitWithError("\n❌ Passwords do not match.\n");
  }

  await resetManagementPassword(password, DB_PATH);
  rl.close();

  console.log("\n✅ Password reset successfully!");
  console.log("   Restart OmniRoute for changes to take effect.\n");
}

main().catch((err) => {
  console.error(`\n❌ Error: ${err.message}\n`);
  rl.close();
  process.exit(1);
});
