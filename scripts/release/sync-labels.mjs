#!/usr/bin/env node
// scripts/release/sync-labels.mjs
//
// Declarative GitHub label sync: reads .github/labels.yml, compares it with the
// repository's labels (`gh label list`) and creates/updates ONLY the divergent ones.
// Part of the dormant LTS release infra (rail 3.8.54) — see docs/ops/RELEASE_STRATEGY.md.
//
// Usage:
//   node scripts/release/sync-labels.mjs                # dry-run (default): print the plan
//   node scripts/release/sync-labels.mjs --dry-run      # same, explicit
//   node scripts/release/sync-labels.mjs --apply        # execute the plan
//   options: --file <path> (default .github/labels.yml), --repo <owner/name>
//   npm run labels:sync [-- --apply]
//
// Guarantees:
//   - Never deletes a label and never touches labels absent from labels.yml.
//   - Idempotent: an identical label is skipped, so re-running is safe.
//   - gh is invoked through execFile with an argv array — no shell, nothing to
//     interpolate (Hard Rule #13).

import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";
import { load as parseYaml } from "js-yaml";

const execFileAsync = promisify(execFile);

export const DEFAULT_REPO = "diegosouzapw/OmniRoute";
export const DEFAULT_FILE = ".github/labels.yml";
const MAX_DESCRIPTION = 100; // GitHub's limit for label descriptions
const COLOR_RE = /^[0-9a-f]{6}$/;

/** Parse + validate labels.yml text into normalized `{ name, color, description }`. */
export function parseLabels(text) {
  const data = parseYaml(text);
  if (!Array.isArray(data)) {
    throw new Error("labels.yml must be a YAML list of { name, color, description }");
  }
  const seen = new Set();
  return data.map((entry, i) => {
    const where = `labels.yml entry #${i + 1}`;
    if (!entry || typeof entry !== "object") throw new Error(`${where}: expected a mapping`);
    const name = typeof entry.name === "string" ? entry.name.trim() : "";
    if (!name) throw new Error(`${where}: name is required`);
    // YAML turns unquoted hex such as 5319E7 (float) or 012345 (int) into numbers,
    // silently corrupting the value — so the color must be a quoted string.
    if (typeof entry.color !== "string") {
      throw new Error(`${where} (${name}): color must be a quoted string, e.g. color: "1d76db"`);
    }
    const color = entry.color.trim().replace(/^#/, "").toLowerCase();
    if (!COLOR_RE.test(color)) {
      throw new Error(`${where} (${name}): color must be a 6-digit hex, got "${entry.color}"`);
    }
    const description = entry.description == null ? "" : String(entry.description).trim();
    if (description.length > MAX_DESCRIPTION) {
      throw new Error(`${where} (${name}): description exceeds ${MAX_DESCRIPTION} characters`);
    }
    const key = name.toLowerCase();
    if (seen.has(key)) throw new Error(`${where}: duplicate label "${name}"`);
    seen.add(key);
    return { name, color, description };
  });
}

/**
 * Pure: decide what to do for each desired label given the labels that exist.
 * GitHub label names are case-insensitive, so matching is too; a case-only
 * difference is planned as a rename.
 */
export function planLabelSync(desired, existing) {
  const byKey = new Map(existing.map((l) => [l.name.toLowerCase(), l]));
  return desired.map((label) => {
    const current = byKey.get(label.name.toLowerCase());
    if (!current) return { action: "create", label, changes: [] };
    const changes = [];
    if (current.name !== label.name) changes.push(`name: ${current.name} -> ${label.name}`);
    const currentColor = String(current.color || "").toLowerCase();
    if (currentColor !== label.color) changes.push(`color: ${currentColor} -> ${label.color}`);
    const currentDescription = (current.description || "").trim();
    if (currentDescription !== label.description) {
      changes.push(`description: "${currentDescription}" -> "${label.description}"`);
    }
    return { action: changes.length ? "update" : "skip", label, current, changes };
  });
}

/** argv for the gh call that executes one plan step (null for a skip). */
export function ghArgsFor(step, repo) {
  const { label } = step;
  const tail = ["--color", label.color, "--description", label.description, "--repo", repo];
  if (step.action === "create") return ["label", "create", label.name, ...tail];
  if (step.action === "update") {
    const rename = step.current.name !== label.name ? ["--name", label.name] : [];
    return ["label", "edit", step.current.name, ...rename, ...tail];
  }
  return null;
}

/** Default runner: gh via execFile (argv array, no shell). */
export async function defaultRunGh(args) {
  const { stdout } = await execFileAsync("gh", args, {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  return stdout;
}

/**
 * Compute the plan and, only when `apply` is true, execute it.
 * `runGh(args: string[]) => Promise<string>` is injected so tests never hit the network.
 */
export async function syncLabels({
  labels,
  runGh = defaultRunGh,
  apply = false,
  repo = DEFAULT_REPO,
  log = console.log,
}) {
  const raw = await runGh([
    "label",
    "list",
    "--limit",
    "1000",
    "--json",
    "name,color,description",
    "--repo",
    repo,
  ]);
  const existing = JSON.parse(raw || "[]");
  const plan = planLabelSync(labels, existing);

  log(`${apply ? "APPLY" : "DRY-RUN"} — ${repo} (${labels.length} declared labels)`);
  for (const step of plan) {
    const detail = step.changes.length ? ` (${step.changes.join("; ")})` : "";
    log(`  ${step.action.padEnd(6)} ${step.label.name}${detail}`);
  }

  const pending = plan.filter((s) => s.action !== "skip");
  if (!apply) {
    log(
      pending.length
        ? `${pending.length} change(s) planned — re-run with --apply to execute.`
        : "Nothing to do — labels are in sync."
    );
    return { plan, applied: false };
  }

  for (const step of pending) {
    await runGh(ghArgsFor(step, repo));
    log(`  ✔ ${step.action}d ${step.label.name}`);
  }
  log(
    pending.length ? `Applied ${pending.length} change(s).` : "Nothing to do — labels are in sync."
  );
  return { plan, applied: true };
}

export function parseArgs(argv) {
  const opts = { apply: false, file: DEFAULT_FILE, repo: DEFAULT_REPO };
  let sawApply = false;
  let sawDryRun = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--apply") sawApply = true;
    else if (arg === "--dry-run") sawDryRun = true;
    else if (arg === "--file" || arg === "--repo") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} requires a value`);
      opts[arg.slice(2)] = value;
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (sawApply && sawDryRun) throw new Error("--apply and --dry-run are mutually exclusive");
  opts.apply = sawApply;
  return opts;
}

async function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    console.error(`✖ ${err.message}`);
    console.error(
      "Usage: node scripts/release/sync-labels.mjs [--dry-run | --apply] [--file <path>] [--repo <owner/name>]"
    );
    process.exit(2);
  }
  const labels = parseLabels(fs.readFileSync(path.resolve(opts.file), "utf8"));
  await syncLabels({ labels, apply: opts.apply, repo: opts.repo });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(`✖ ${err.stderr || err.message}`);
    process.exit(1);
  });
}
