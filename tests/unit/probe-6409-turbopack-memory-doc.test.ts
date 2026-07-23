/**
 * Probe for #6409 — "npm run build requires >14 GB RAM".
 *
 * Root cause: PR #6283 (merged 2026-07-05, one day before this issue was filed)
 * made Turbopack the default bundler for `npm run build` (previously opt-in via
 * OMNIROUTE_USE_TURBOPACK=1). OmniRoute pins `next@^16.2.6` (resolved 16.2.9),
 * a version line where Turbopack *production* builds are known upstream to use
 * dramatically more memory than webpack on large module graphs (Vercel reported
 * ~21.5 GB on their own dashboard app before the memory-eviction fix landed in
 * Next 16.3 — not yet stable on npm as of this triage, only canary/preview).
 * OmniRoute's own module graph is large (open-sse workspace, thousands of
 * modules), matching the class of app that hits this.
 *
 * A working escape hatch already exists (`OMNIROUTE_USE_TURBOPACK=0` reverts to
 * webpack), but docs/reference/ENVIRONMENT.md documents it only as a fix for
 * "native binding / bundler-compat" issues on Windows — it says nothing about
 * memory, so a RAM-constrained contributor building from source (exactly this
 * reporter's scenario) has no signal to reach for it before their build balloons
 * past 14 GB.
 *
 * This probe proves the informational gap: the ENVIRONMENT.md row for
 * OMNIROUTE_USE_TURBOPACK does not mention memory/RAM at all.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("#6409 ENVIRONMENT.md documents the memory tradeoff of the Turbopack build default", () => {
  const envDocPath = path.join(repoRoot, "docs/reference/ENVIRONMENT.md");
  const doc = fs.readFileSync(envDocPath, "utf-8");
  const lines = doc.split("\n");
  const row = lines.find((l) => l.includes("OMNIROUTE_USE_TURBOPACK"));
  assert.ok(row, "ENVIRONMENT.md must document OMNIROUTE_USE_TURBOPACK");

  const mentionsMemory = /\b(memory|RAM|GB)\b/i.test(row ?? "");
  assert.ok(
    mentionsMemory,
    "OMNIROUTE_USE_TURBOPACK row must mention the memory/RAM tradeoff so contributors on " +
      "memory-constrained machines know the webpack fallback (=0) exists BEFORE `npm run build` " +
      "balloons past 14 GB (#6409), not just the Windows/native-binding-compat reason currently documented"
  );
});
