#!/usr/bin/env node

/**
 * Password Reset CLI — T-38
 *
 * Usage:
 *   node bin/reset-password.mjs
 *   omniroute reset-password
 *
 * Non-interactive / scripted usage (piped stdin, e.g. CI or Docker):
 *   printf 'NewPass123\nNewPass123\n' | omniroute reset-password
 *   printf 'NewPass123' | omniroute reset-password --password-stdin
 *
 * Resets the admin password for OmniRoute.
 * Prompts for a new password (interactive TTY) or reads it from stdin
 * (non-TTY) and updates the database directly.
 *
 * @module bin/reset-password
 */

import { createInterface } from "node:readline";
import { resolveDataDir, resolveStoragePath } from "./cli/data-dir.mjs";
import { readManagementPasswordState, resetManagementPassword } from "./cli/sqlite.mjs";

// Resolve data directory — same logic as the server
const DATA_DIR = resolveDataDir();
const DB_PATH = resolveStoragePath(DATA_DIR);

const MIN_PASSWORD_LENGTH = 8;

/** Read the entire stdin stream as a UTF-8 string (used for non-TTY input). */
function readAllStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", () => resolve(data));
    // Resuming is implied by attaching a 'data' listener, but be explicit so a
    // paused stream (some spawn setups) still flows to EOF.
    process.stdin.resume();
  });
}

/**
 * Obtain the new password (and its confirmation).
 *
 * - `--password-stdin`: the ENTIRE stdin is the password, no confirmation.
 * - non-TTY stdin (piped): read all of stdin once; first line is the password,
 *   second line — when present — is the confirmation, else the first line is
 *   reused (a single-line pipe means "no separate confirmation").
 * - interactive TTY: two sequential prompts (unchanged behavior).
 *
 * The non-TTY path exists because two sequential `rl.question` promises never
 * settle under a piped EOF — the second read blocks forever, so the reset was
 * silently never applied (#6258).
 */
async function collectPassword() {
  if (process.argv.includes("--password-stdin")) {
    const raw = await readAllStdin();
    const password = raw.replace(/[\r\n]+$/, "");
    return { password, confirm: password };
  }

  if (!process.stdin.isTTY) {
    const raw = await readAllStdin();
    const lines = raw.split(/\r?\n/);
    const password = lines[0] ?? "";
    const confirm = lines[1] ? lines[1] : password;
    return { password, confirm };
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const ask = (question) => new Promise((resolve) => rl.question(question, resolve));
    const password = await ask("Enter new password (min 8 chars): ");
    const confirm = await ask("Confirm new password: ");
    return { password, confirm };
  } finally {
    rl.close();
  }
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

  const { password, confirm } = await collectPassword();

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    console.error(`\n❌ Password must be at least ${MIN_PASSWORD_LENGTH} characters.\n`);
    process.exit(1);
  }

  if (password !== confirm) {
    console.error("\n❌ Passwords do not match.\n");
    process.exit(1);
  }

  await resetManagementPassword(password, DB_PATH);

  console.log("\n✅ Password reset successfully!");
  console.log("   Restart OmniRoute for changes to take effect.\n");
}

main()
  .then(() => {
    // Explicit exit(0) so a caller that imports this module (bin/omniroute.mjs
    // routes `omniroute reset-password` here) terminates cleanly instead of
    // hanging / exiting with code 13 on an unsettled wrapper await. On POSIX,
    // console.log to a pipe is synchronous, so the success line is already
    // flushed by the time we exit.
    process.exit(0);
  })
  .catch((err) => {
    console.error(`\n❌ Error: ${err.message}\n`);
    process.exit(1);
  });
