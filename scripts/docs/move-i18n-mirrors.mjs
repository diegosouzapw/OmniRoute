#!/usr/bin/env node
// One-shot: FASE 3 helper, safe to delete after merge.
//
// Moves existing i18n mirror docs from `docs/i18n/<lang>/docs/X.md` into the
// matching subfolder `docs/i18n/<lang>/docs/<sub>/X.md`, mirroring the new
// docs/ layout. Uses `git mv` to preserve history.
//
// Usage:
//   node scripts/docs/move-i18n-mirrors.mjs [--dry]
//
// Notes:
// - Skips files that don't appear in DOC_TO_SUBFOLDER (e.g., the legacy
//   `cloudflare-zero-trust-guide.md` or `features/` subfolder — those will be
//   handled in FASE 5 when translations are regenerated).
// - Idempotent: if the target already lives under a subfolder, the entry is
//   skipped.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const I18N_DIR = path.join(ROOT, "docs", "i18n");

const DRY = process.argv.includes("--dry");

const DOC_TO_SUBFOLDER = {
  // architecture
  "ARCHITECTURE.md": "architecture",
  "CODEBASE_DOCUMENTATION.md": "architecture",
  "REPOSITORY_MAP.md": "architecture",
  "AUTHZ_GUIDE.md": "architecture",
  "RESILIENCE_GUIDE.md": "architecture",
  // guides
  "SETUP_GUIDE.md": "guides",
  "USER_GUIDE.md": "guides",
  "DOCKER_GUIDE.md": "guides",
  "ELECTRON_GUIDE.md": "guides",
  "TERMUX_GUIDE.md": "guides",
  "PWA_GUIDE.md": "guides",
  "TROUBLESHOOTING.md": "guides",
  "UNINSTALL.md": "guides",
  "I18N.md": "guides",
  "FEATURES.md": "guides",
  // reference
  "API_REFERENCE.md": "reference",
  "PROVIDER_REFERENCE.md": "reference",
  "openapi.yaml": "reference",
  "ENVIRONMENT.md": "reference",
  "CLI-TOOLS.md": "reference",
  "FREE_TIERS.md": "reference",
  // frameworks
  "MCP-SERVER.md": "frameworks",
  "A2A-SERVER.md": "frameworks",
  "AGENT_PROTOCOLS_GUIDE.md": "frameworks",
  "CLOUD_AGENT.md": "frameworks",
  "SKILLS.md": "frameworks",
  "MEMORY.md": "frameworks",
  "WEBHOOKS.md": "frameworks",
  "EVALS.md": "frameworks",
  // routing
  "AUTO-COMBO.md": "routing",
  "REASONING_REPLAY.md": "routing",
  // security
  "GUARDRAILS.md": "security",
  "COMPLIANCE.md": "security",
  "STEALTH_GUIDE.md": "security",
  // compression
  "COMPRESSION_GUIDE.md": "compression",
  "COMPRESSION_ENGINES.md": "compression",
  "COMPRESSION_RULES_FORMAT.md": "compression",
  "COMPRESSION_LANGUAGE_PACKS.md": "compression",
  "RTK_COMPRESSION.md": "compression",
  // ops
  "RELEASE_CHECKLIST.md": "ops",
  "COVERAGE_PLAN.md": "ops",
  "FLY_IO_DEPLOYMENT_GUIDE.md": "ops",
  "VM_DEPLOYMENT_GUIDE.md": "ops",
  "PROXY_GUIDE.md": "ops",
  "TUNNELS_GUIDE.md": "ops",
};

let moved = 0;
let skipped = 0;
const seenLocales = [];

for (const locale of fs.readdirSync(I18N_DIR)) {
  const localeDir = path.join(I18N_DIR, locale);
  const stat = fs.statSync(localeDir);
  if (!stat.isDirectory()) continue;
  const docsDir = path.join(localeDir, "docs");
  if (!fs.existsSync(docsDir)) continue;
  seenLocales.push(locale);

  for (const fname of fs.readdirSync(docsDir)) {
    const sub = DOC_TO_SUBFOLDER[fname];
    if (!sub) continue; // not in our mapping (e.g. features/, cloudflare-zero-trust-guide.md)

    const src = path.join(docsDir, fname);
    if (!fs.statSync(src).isFile()) continue;

    const subDir = path.join(docsDir, sub);
    const dst = path.join(subDir, fname);

    if (fs.existsSync(dst)) {
      skipped++;
      continue;
    }

    if (DRY) {
      console.log(`would move: ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dst)}`);
      moved++;
      continue;
    }

    if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });
    const relSrc = path.relative(ROOT, src);
    const relDst = path.relative(ROOT, dst);
    try {
      execFileSync("git", ["mv", "-k", "--", relSrc, relDst], {
        cwd: ROOT,
        stdio: "pipe",
      });
      moved++;
    } catch {
      // fallback: copy + delete; emulate `|| true` for the rm by ignoring its failure
      fs.renameSync(src, dst);
      try {
        execFileSync("git", ["rm", "--cached", "--", relSrc], { cwd: ROOT, stdio: "pipe" });
      } catch {
        // file may not be tracked yet — safe to ignore
      }
      execFileSync("git", ["add", "--", relDst], { cwd: ROOT, stdio: "pipe" });
      moved++;
    }
  }
}

console.log(
  `[i18n-mirrors] locales=${seenLocales.length} moved=${moved} skipped=${skipped}${DRY ? " (dry-run)" : ""}`
);
