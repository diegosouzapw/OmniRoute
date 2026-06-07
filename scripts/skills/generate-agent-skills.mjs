#!/usr/bin/env node
/**
 * generate-agent-skills.mjs — CLI wrapper for src/lib/agentSkills/generator.ts
 *
 * Usage:
 *   node scripts/skills/generate-agent-skills.mjs            # dry-run (default)
 *   node scripts/skills/generate-agent-skills.mjs --apply    # write SKILL.md files
 *   node scripts/skills/generate-agent-skills.mjs --prune    # detect orphans (dry-run)
 *   node scripts/skills/generate-agent-skills.mjs --apply --prune  # write + delete orphans
 *   node scripts/skills/generate-agent-skills.mjs --only=omni-providers,cli-serve
 *   node scripts/skills/generate-agent-skills.mjs --json     # JSON output to stdout
 *
 * Exit codes:
 *   0 — success (dry-run with no changes, or apply completed)
 *   1 — error (import or generator threw)
 *   2 — dry-run detected changes (use for CI fail-on-stale check)
 *
 * Security: no shell interpolation of user input (Hard Rule #13).
 * All runtime values are passed as JS variables, not shell strings.
 */

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

// ── Resolve project root from script location ─────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// scripts/skills/generate-agent-skills.mjs → up 2 levels → project root
const projectRoot = path.resolve(__dirname, "..", "..");

// ── Argument parsing ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function hasFlag(flag) {
  return args.some((a) => a === flag || a.startsWith(flag + "="));
}

function getFlagValue(flag) {
  for (const arg of args) {
    if (arg.startsWith(flag + "=")) return arg.slice(flag.length + 1);
  }
  return null;
}

const applyMode = hasFlag("--apply");
const pruneMode = hasFlag("--prune");
const jsonOutput = hasFlag("--json");
const onlyRaw = getFlagValue("--only");
const onlyIds = onlyRaw ? onlyRaw.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

// ── Utility: print table ──────────────────────────────────────────────────────

function printTable(report) {
  const { generated, unchanged, pruned, orphansDetected, errors } = report;

  console.log(`\nGenerated: ${generated.length} · Unchanged: ${unchanged.length} · Pruned: ${pruned.length} · Orphans: ${orphansDetected.length} · Errors: ${errors.length}\n`);

  if (generated.length > 0) {
    console.log("  GENERATED:");
    for (const id of generated) {
      console.log(`    + ${id}`);
    }
  }

  if (unchanged.length > 0 && unchanged.length <= 10) {
    console.log("  UNCHANGED:");
    for (const id of unchanged) {
      console.log(`    = ${id}`);
    }
  } else if (unchanged.length > 10) {
    console.log(`  UNCHANGED: ${unchanged.length} skills (all up-to-date)`);
  }

  if (orphansDetected.length > 0) {
    console.log("  ORPHANS DETECTED:");
    for (const id of orphansDetected) {
      console.log(`    ? ${id}`);
    }
  }

  if (pruned.length > 0) {
    console.log("  PRUNED:");
    for (const id of pruned) {
      console.log(`    - ${id}`);
    }
  }

  if (errors.length > 0) {
    console.log("  ERRORS:");
    for (const e of errors) {
      console.log(`    ! ${e.id}: ${e.error}`);
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Change CWD to project root so generator resolves files correctly
  process.chdir(projectRoot);

  if (!jsonOutput) {
    const mode = applyMode ? "apply" : "dry-run";
    const prune = pruneMode ? " + prune" : "";
    const filter = onlyIds ? ` (only: ${onlyIds.join(", ")})` : "";
    console.log(`\nAgent Skills Generator [${mode}${prune}]${filter}`);
    console.log("─".repeat(60));
  }

  // Dynamic import via tsx runtime — works because package.json has tsx devDep
  // and node is invoked with --import tsx/esm by the caller (or we use tsx directly).
  // To support plain `node` invocation, we use a dynamic import with tsx register.
  let generateAgentSkills;
  try {
    // Try direct import first (when running under tsx or compiled)
    const mod = await import("../../src/lib/agentSkills/generator.ts");
    generateAgentSkills = mod.generateAgentSkills;
  } catch (importErr) {
    // Fallback: try tsx register approach
    try {
      const require = createRequire(import.meta.url);
      // Register tsx for TypeScript support
      const tsxPath = require.resolve("tsx/esm");
      const { register } = await import("node:module");
      register(tsxPath, import.meta.url);
      const mod = await import("../../src/lib/agentSkills/generator.ts");
      generateAgentSkills = mod.generateAgentSkills;
    } catch (fallbackErr) {
      console.error(
        "Error: Could not import generator. Run with tsx:\n" +
          "  node --import tsx/esm scripts/skills/generate-agent-skills.mjs\n" +
          `Import error: ${importErr instanceof Error ? importErr.message : String(importErr)}`,
      );
      process.exit(1);
    }
  }

  let report;
  try {
    report = await generateAgentSkills({
      dryRun: !applyMode,
      prune: pruneMode,
      outputDir: "skills",
      onlyIds,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (jsonOutput) {
      console.log(JSON.stringify({ error: msg }, null, 2));
    } else {
      console.error(`\nGenerator error: ${msg}`);
    }
    process.exit(1);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printTable(report);
    if (!applyMode) {
      console.log(
        "\n(dry-run) No files written. Use --apply to write SKILL.md files.\n",
      );
    } else {
      console.log();
    }
  }

  // Exit code 2 if dry-run detected pending changes (useful for CI)
  if (!applyMode && report.generated.length > 0) {
    process.exit(2);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Unexpected error:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
