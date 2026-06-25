#!/usr/bin/env node
// scripts/validate-prometheus-rules.mjs
// PR-008 — validate the Prometheus alert / recording / SLO-objective YAML
// files committed under deploy/prometheus/. Catches:
//   - Unparseable YAML.
//   - Alert rules missing required fields (summary, description,
//     runbook_url, severity label).
//   - runbook_url annotations that point at a github URL whose basename
//     does not exist under docs/runbooks/, OR at a local path that
//     does not exist on disk.
//   - Recording rules missing the same annotation surface (consistency
//     with alerts so SLO docs always have a runbook).
//   - SLO objective entries missing name / description / objective /
//     window / indicator annotations.
//
// Exit code 0 → all files OK. Non-zero → at least one file has issues.
//
// Usage: node scripts/validate-prometheus-rules.mjs [--strict]
//   --strict: also fail on duplicate alert names across files (catches
//     accidental shadowing of upstream alerts).

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const ROOT = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUNBOOK_DIR = path.resolve(ROOT, "docs/runbooks");
const STRICT = process.argv.includes("--strict");

const RULE_FILES = [
  "deploy/prometheus/rules/omniroute-slos.yaml",
  "deploy/prometheus/rules/omniroute-recording.yaml",
  "deploy/prometheus/alerts/slo-objectives.yaml",
];

const REQUIRED_ALERT_FIELDS = ["summary", "description", "runbook_url"];
const REQUIRED_RECORDING_FIELDS = ["summary", "description", "runbook_url"];
const REQUIRED_OBJECTIVE_ANNOTATION_FIELDS = ["name", "description", "objective"];
// window + indicator are validated separately (accepted from labels OR annotations).
const SEVERITY_VALUES = new Set(["critical", "warning", "info"]);

function loadYaml(file) {
  const full = path.resolve(ROOT, file);
  if (!fs.existsSync(full)) {
    return { ok: false, error: `file not found: ${file}` };
  }
  const text = fs.readFileSync(full, "utf8");
  try {
    const parsed = yaml.load(text);
    return { ok: true, parsed, full };
  } catch (err) {
    return { ok: false, error: `YAML parse error in ${file}: ${err.message}` };
  }
}

function validateRunbookUrl(url, file, label) {
  if (typeof url !== "string" || url.length === 0) {
    return `  - ${label}: runbook_url must be a non-empty string (file=${file})`;
  }
  // Accept two forms:
  //   1. Full GitHub URL — extract the basename and verify it exists
  //      under docs/runbooks/.
  //   2. Repo-relative path starting with docs/runbooks/ — verify on disk.
  let basename = null;
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const u = new URL(url);
      basename = path.posix.basename(u.pathname);
    } else if (url.startsWith("docs/runbooks/")) {
      basename = path.posix.basename(url);
    } else {
      return `  - ${label}: runbook_url must point to docs/runbooks/ or a github URL (got '${url}', file=${file})`;
    }
  } catch {
    return `  - ${label}: runbook_url is not a valid URL or path (got '${url}', file=${file})`;
  }
  if (!basename.endsWith(".md")) {
    return `  - ${label}: runbook_url basename must end in .md (got '${basename}', file=${file})`;
  }
  const onDisk = path.join(RUNBOOK_DIR, basename);
  if (!fs.existsSync(onDisk)) {
    return `  - ${label}: runbook_url points to '${basename}' but ${path.relative(ROOT, onDisk)} does not exist on disk (file=${file})`;
  }
  return null;
}

function validateAnnotations(annotations, required, file, label) {
  const errors = [];
  if (!annotations || typeof annotations !== "object") {
    errors.push(`  - ${label}: annotations block missing (file=${file})`);
    return errors;
  }
  for (const field of required) {
    if (
      !(field in annotations) ||
      typeof annotations[field] !== "string" ||
      annotations[field].trim().length === 0
    ) {
      errors.push(`  - ${label}: missing or empty annotation '${field}' (file=${file})`);
    }
  }
  return errors;
}

function validateRule(rule, file, label, required) {
  const errors = [];
  errors.push(
    ...validateAnnotations(rule.annotations, required, file, label)
  );
  // runbook_url validity check — only if the annotation was present
  // (the missing-annotation error above already covers absent field).
  if (rule.annotations && typeof rule.annotations.runbook_url === "string") {
    const err = validateRunbookUrl(
      rule.annotations.runbook_url,
      file,
      label
    );
    if (err) errors.push(err);
  }
  return errors;
}

function validateAlert(rule, file, label) {
  const errors = validateRule(rule, file, label, REQUIRED_ALERT_FIELDS);
  // severity label is mandatory for alerts.
  const labels = rule.labels ?? {};
  if (typeof labels.severity !== "string" || !SEVERITY_VALUES.has(labels.severity)) {
    errors.push(
      `  - ${label}: labels.severity must be one of ${[...SEVERITY_VALUES].join(", ")} (got '${labels.severity}', file=${file})`
    );
  }
  if (typeof rule.expr !== "string" || rule.expr.trim().length === 0) {
    errors.push(
      `  - ${label}: missing or empty 'expr' (PromQL expression required, file=${file})`
    );
  } else {
    // Light PromQL sanity check: balanced parens, no control chars.
    const opens = (rule.expr.match(/\(/g) ?? []).length;
    const closes = (rule.expr.match(/\)/g) ?? []).length;
    if (opens !== closes) {
      errors.push(
        `  - ${label}: 'expr' has unbalanced parentheses (${opens} open vs ${closes} close, file=${file})`
      );
    }
    if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(rule.expr)) {
      errors.push(
        `  - ${label}: 'expr' contains invalid control characters (file=${file})`
      );
    }
  }
  return errors;
}

function validateRecording(rule, file, label) {
  const errors = validateRule(rule, file, label, REQUIRED_RECORDING_FIELDS);
  if (typeof rule.expr !== "string" || rule.expr.trim().length === 0) {
    errors.push(
      `  - ${label}: missing or empty 'expr' (PromQL expression required, file=${file})`
    );
  } else {
    const opens = (rule.expr.match(/\(/g) ?? []).length;
    const closes = (rule.expr.match(/\)/g) ?? []).length;
    if (opens !== closes) {
      errors.push(
        `  - ${label}: 'expr' has unbalanced parentheses (${opens} open vs ${closes} close, file=${file})`
      );
    }
  }
  return errors;
}

function validateObjective(rule, file, label) {
  const errors = validateAnnotations(
    rule.annotations,
    REQUIRED_OBJECTIVE_ANNOTATION_FIELDS,
    file,
    label
  );
  // `window` and `indicator` are conventionally Prometheus labels for
  // SLO tooling (Sloth, Pyrra). Accept them from EITHER annotations
  // (where the rest of the SLO metadata lives) or labels. The validator
  // emits both locations so the spec is unambiguous.
  const labels = rule.labels ?? {};
  if (typeof labels.window !== "string" || labels.window.length === 0) {
    if (!rule.annotations || typeof rule.annotations.window !== "string") {
      errors.push(
        `  - ${label}: window must be present in labels or annotations (file=${file})`
      );
    }
  }
  if (typeof labels.indicator !== "string" || labels.indicator.length === 0) {
    if (!rule.annotations || typeof rule.annotations.indicator !== "string") {
      errors.push(
        `  - ${label}: indicator must be present in labels or annotations (file=${file})`
      );
    }
  }
  return errors;
}

function detectKind(rule) {
  if (typeof rule.alert === "string" && rule.alert.length > 0) return "alert";
  if (typeof rule.record === "string" && rule.record.length > 0) return "recording";
  if (typeof rule.recording === "string" && rule.recording.length > 0) return "recording";
  return null;
}

function validateFile(relPath) {
  const errors = [];
  const loaded = loadYaml(relPath);
  if (!loaded.ok) {
    errors.push(loaded.error);
    return errors;
  }
  const doc = loaded.parsed;
  if (!doc || !Array.isArray(doc.groups)) {
    errors.push(`  - top-level 'groups' must be an array (file=${relPath})`);
    return errors;
  }
  for (const group of doc.groups) {
    if (!group || typeof group !== "object" || !Array.isArray(group.rules)) {
      errors.push(
        `  - each group must have a 'rules' array (file=${relPath})`
      );
      continue;
    }
    for (const rule of group.rules) {
      const kind = detectKind(rule);
      const label = `${group.name}/${kind ?? "?"}/${rule.alert ?? rule.record ?? "?"}`;
      if (kind === "alert") {
        errors.push(...validateAlert(rule, relPath, label));
      } else if (kind === "recording") {
        // SLO objectives use `record` + vector(N) expr. Detect by
        // annotations shape: must have `objective` to be an objective.
        const ann = rule.annotations ?? {};
        if (typeof ann.objective === "string") {
          errors.push(...validateObjective(rule, relPath, label));
        } else {
          errors.push(...validateRecording(rule, relPath, label));
        }
      } else {
        errors.push(
          `  - ${label}: rule has neither 'alert' nor 'record' (file=${relPath})`
        );
      }
    }
  }
  return errors;
}

function main() {
  const allErrors = [];
  const seenAlerts = new Map(); // alert name → file (for strict mode)
  for (const file of RULE_FILES) {
    const errs = validateFile(file);
    if (STRICT) {
      const loaded = loadYaml(file);
      if (loaded.ok && loaded.parsed?.groups) {
        for (const group of loaded.parsed.groups) {
          for (const rule of group.rules ?? []) {
            if (typeof rule.alert === "string") {
              const prev = seenAlerts.get(rule.alert);
              if (prev && prev !== file) {
                allErrors.push(
                  `  - alert '${rule.alert}' is also defined in ${prev} (file=${file})`
                );
              } else {
                seenAlerts.set(rule.alert, file);
              }
            }
          }
        }
      }
    }
    if (errs.length > 0) {
      allErrors.push(`\n[${file}]`);
      allErrors.push(...errs);
    }
  }
  if (allErrors.length > 0) {
    console.error("Prometheus rule validation FAILED:");
    for (const e of allErrors) console.error(e);
    process.exit(1);
  }
  const summary = RULE_FILES
    .map((f) => path.relative(ROOT, path.resolve(ROOT, f)))
    .join(", ");
  console.log(`Prometheus rule validation OK: ${summary}`);
}

main();