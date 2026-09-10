#!/usr/bin/env node
// scripts/check/check-staged-secrets.mjs
//
// BLOCKING pre-commit guard: refuses a commit that stages a live credential.
//
// Complements the existing gates rather than duplicating them:
//   • check-secrets.mjs   — gitleaks over whole source dirs, ADVISORY, and a no-op
//                           on Windows (it probes with `which`) or without the binary.
//   • check-public-creds  — the 2 files holding known public OAuth creds.
// This one scans ONLY what is staged, needs no external binary, and EXITS 1 so the
// commit actually stops. Fast (reads the staged blobs, not the work tree).
//
// Usage:
//   node scripts/check/check-staged-secrets.mjs
//   node scripts/check/check-staged-secrets.mjs --all   # scan tracked files, not just staged
//
// Bypass (documented, deliberate): SKIP_SECRET_SCAN=1 git commit ...
// Hard Rule #10 still applies — never bypass without operator approval.

import { execFileSync } from "node:child_process";
import path from "node:path";

const SCAN_ALL = process.argv.includes("--all");

// Binary/lock/vendor paths that never hold hand-written secrets but do produce
// high-entropy false positives.
const SKIP_PATH = /(^|\/)(node_modules|dist|build|\.next|coverage|__snapshots__)\//;
const SKIP_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".mp4",
  ".webm",
  ".wasm",
  ".node",
  ".exe",
  ".dll",
]);
const SKIP_BASENAME = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "uv.lock",
  "compat_manifest.json",
]);

// Each rule: a real, high-confidence credential shape. Deliberately narrow —
// a noisy guard gets bypassed, which is worse than no guard.
const RULES = [
  { id: "aws-access-key", re: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/, desc: "AWS access key id" },
  { id: "github-pat", re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/, desc: "GitHub personal access token" },
  { id: "slack-token", re: /\bxox[abposr]-[A-Za-z0-9-]{10,}\b/, desc: "Slack token" },
  { id: "stripe-key", re: /\b[sr]k_live_[A-Za-z0-9]{16,}\b/, desc: "Stripe live key" },
  { id: "google-api-key", re: /\bAIza[0-9A-Za-z_-]{35}\b/, desc: "Google API key" },
  { id: "openai-key", re: /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/, desc: "OpenAI-style secret key" },
  { id: "anthropic-key", re: /\bsk-ant-[A-Za-z0-9_-]{24,}\b/, desc: "Anthropic API key" },
  { id: "firecrawl-key", re: /\bfc-[0-9a-f]{32}\b/, desc: "Firecrawl API key" },
  {
    id: "private-key",
    re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/,
    desc: "private key block",
  },
  {
    id: "jwt",
    re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
    desc: "JWT with payload",
  },
  {
    id: "generic-assign",
    desc: "hardcoded secret assignment",
    re: /\b(?:api[_-]?key|secret|password|passwd|token|auth[_-]?token|access[_-]?token|client[_-]?secret)\b\s*[:=]\s*["'][^"'\s${}]{16,}["']/i,
  },
];

// Values that look like secrets but are documentation/placeholders.
const PLACEHOLDER =
  /(?:CHANGEME|REPLACE|EXAMPLE|PLACEHOLDER|YOUR[_-]?|<[^>]+>|\bxxx+\b|\*{4,}|\bdummy\b|\bsample\b|\bfake\b|\btest[_-]?key\b|\bredacted\b)/i;

// Inline opt-out for a reviewed, intentional line.
const ALLOW_MARKER = /(?:gitleaks:allow|secret-scan:allow|pragma:\s*allowlist)/i;

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function stagedFiles() {
  const args = SCAN_ALL ? ["ls-files"] : ["diff", "--cached", "--name-only", "--diff-filter=ACMR"];
  return git(args)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function stagedContent(file) {
  try {
    return SCAN_ALL ? git(["show", `HEAD:${file}`]) : git(["show", `:${file}`]);
  } catch {
    return null; // deleted, binary, or unreadable
  }
}

function shouldSkip(file) {
  const norm = file.replace(/\\/g, "/");
  if (SKIP_PATH.test(norm)) return true;
  if (SKIP_BASENAME.has(path.posix.basename(norm))) return true;
  if (SKIP_EXT.has(path.posix.extname(norm).toLowerCase())) return true;
  return false;
}

function scan(file, content) {
  const findings = [];
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 2000) continue; // minified/generated
    if (ALLOW_MARKER.test(line)) continue;
    for (const rule of RULES) {
      const m = rule.re.exec(line);
      if (!m) continue;
      if (PLACEHOLDER.test(m[0])) continue;
      findings.push({ file, line: i + 1, rule: rule.id, desc: rule.desc, match: mask(m[0]) });
      break; // one finding per line is enough to block
    }
  }
  return findings;
}

// Never print a real secret back into the terminal / CI log.
function mask(s) {
  const t = s.length > 60 ? `${s.slice(0, 40)}…` : s;
  return t.replace(
    /[A-Za-z0-9_-]{6,}/g,
    (w) => w.slice(0, 3) + "*".repeat(Math.max(3, w.length - 3))
  );
}

function main() {
  if (process.env.SKIP_SECRET_SCAN === "1") {
    process.stderr.write("[staged-secrets] SKIPPED via SKIP_SECRET_SCAN=1\n");
    return;
  }

  let files;
  try {
    files = stagedFiles();
  } catch (err) {
    // No git, no HEAD, etc. Never block a commit because the guard itself broke.
    process.stderr.write(`[staged-secrets] SKIP — cannot list files: ${err.message}\n`);
    return;
  }

  const findings = [];
  for (const file of files) {
    if (shouldSkip(file)) continue;
    const content = stagedContent(file);
    if (content == null || content.includes("\0")) continue;
    findings.push(...scan(file, content));
  }

  if (findings.length === 0) {
    process.stderr.write(
      `[staged-secrets] OK — ${files.length} file(s) scanned, no credentials found.\n`
    );
    return;
  }

  process.stderr.write(
    `\n[staged-secrets] BLOCKED — ${findings.length} possible credential(s) in staged content:\n\n`
  );
  for (const f of findings) {
    process.stderr.write(`  ${f.file}:${f.line}\n      ${f.desc} [${f.rule}]  ${f.match}\n`);
  }
  process.stderr.write(
    "\n  Remove the credential and load it from env / the secret store instead.\n" +
      "  Public upstream creds must go through resolvePublicCred() — docs/security/PUBLIC_CREDS.md.\n" +
      "  False positive? Append a `gitleaks:allow` comment on that line, or extend\n" +
      "  SKIP_BASENAME/PLACEHOLDER in scripts/check/check-staged-secrets.mjs.\n" +
      "  Deliberate bypass (needs operator approval, Hard Rule #10): SKIP_SECRET_SCAN=1 git commit ...\n\n"
  );
  process.exitCode = 1;
}

main();
