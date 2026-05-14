#!/usr/bin/env node

/**
 * OmniRoute v3.3 -> v3.4 Environment Migration Script
 * Resolves breaking changes in environment variables format and validation.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

const envPath = path.resolve(process.cwd(), ".env");

if (!fs.existsSync(envPath)) {
  console.log("No .env file found. Migration skipped.");
  process.exit(0);
}

let content = fs.readFileSync(envPath, "utf8");
let modified = false;

// 1. Migrate NEXTAUTH_SECRET to JWT_SECRET if missing
const nextAuthMatch = content.match(/^NEXTAUTH_SECRET=(.+)$/m);
const jwtMatch = content.match(/^JWT_SECRET=(.+)$/m);

if (nextAuthMatch && !jwtMatch) {
  console.log("Migrating NEXTAUTH_SECRET to JWT_SECRET...");
  let newJwt = nextAuthMatch[1].trim();

  // Enforce 32 char minimum for secretsValidator.ts
  if (newJwt.length < 32) {
    console.warn(
      `Original NEXTAUTH_SECRET was too short (${newJwt.length} chars). Generating a secure one...`
    );
    newJwt = crypto.randomBytes(48).toString("base64");
  }

  content += `\n# Migrated from NEXTAUTH_SECRET\nJWT_SECRET=${newJwt}\n`;
  modified = true;
} else if (jwtMatch && jwtMatch[1].trim().length < 32) {
  console.warn(
    `JWT_SECRET is too short (${jwtMatch[1].trim().length} chars). Generating a secure one for v3.4.0+...`
  );
  const newJwt = crypto.randomBytes(48).toString("base64");
  content = content.replace(/^JWT_SECRET=(.*)$/m, `JWT_SECRET=${newJwt}`);
  modified = true;
}

// 2. Ensure API_KEY_SECRET exists (required in 3.4.0)
if (!content.match(/^API_KEY_SECRET=/m)) {
  console.log("Adding required API_KEY_SECRET for v3.4.0...");
  const newApiSecret = crypto.randomBytes(32).toString("hex");
  content += `\n# Required for v3.4.0 API Key HMAC\nAPI_KEY_SECRET=${newApiSecret}\n`;
  modified = true;
}

if (modified) {
  // Backup old .env
  fs.writeFileSync(envPath + ".bak", fs.readFileSync(envPath));
  console.log("Created backup at .env.bak");

  // Write new .env
  fs.writeFileSync(envPath, content, "utf8");
  console.log("Successfully migrated .env file for OmniRoute 3.4.x.");
} else {
  console.log(".env file is already compatible with OmniRoute 3.4.x.");
}
