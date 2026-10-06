/**
 * scripts/check/lib/provenanceRunner.mjs
 *
 * npm refuses `--provenance` from a self-hosted runner:
 *
 *   422 Unprocessable Entity - Error verifying sigstore provenance bundle:
 *   Unsupported GitHub Actions runner environment: "self-hosted".
 *   Only "github-hosted" runners are supported when publishing with provenance.
 *
 * v3.8.50 hit this at the very end of a 76-minute publish job — after the tag,
 * the GitHub Release and the Docker images were already public — because
 * `USE_VPS_RUNNER` had been turned on (2026-08-02) with no release in between to
 * surface it. The combination is greppable, so it must fail in CI the moment a
 * workflow introduces it, not four weeks later at the registry.
 *
 * Pure: takes workflow YAML text, returns the offending (job, step) pairs.
 */
import { load as yamlLoad } from "js-yaml";

const SELF_HOSTED = /\bself-hosted\b/;
const EXPRESSION = /\$\{\{/;
// Lookahead, not \b: `--provenance-file=…` is a different flag (a pre-built
// bundle) and must not match — a word boundary sits between "e" and "-".
const PROVENANCE = /(^|\s)--provenance(?=\s|=|$)/m;

/**
 * Classifies a job's `runs-on` value.
 * @returns {"self-hosted"|"hosted"|"unknown"}
 *   "unknown" = an expression with no literal `self-hosted` in it (e.g.
 *   `${{ matrix.os }}`); the check does not guess, it skips.
 */
export function classifyRunsOn(runsOn) {
  if (runsOn == null) return "unknown";
  if (typeof runsOn === "string") {
    if (SELF_HOSTED.test(runsOn)) return "self-hosted";
    return EXPRESSION.test(runsOn) ? "unknown" : "hosted";
  }
  if (Array.isArray(runsOn)) {
    return runsOn.some((v) => typeof v === "string" && SELF_HOSTED.test(v))
      ? "self-hosted"
      : "hosted";
  }
  if (typeof runsOn === "object") {
    // { group: ..., labels: ... } form
    const labels = runsOn.labels;
    return classifyRunsOn(Array.isArray(labels) ? labels : labels == null ? "" : String(labels));
  }
  return "unknown";
}

/**
 * @param {string} yamlText
 * @param {string} fileName  used only for reporting
 * @returns {{ file: string, job: string, step: string }[]}
 */
export function findProvenanceOnSelfHosted(yamlText, fileName = "<workflow>") {
  let doc;
  try {
    doc = yamlLoad(yamlText);
  } catch {
    // actionlint owns syntax; an unparseable file is not this rule's finding.
    return [];
  }
  const jobs =
    doc && typeof doc === "object" && doc.jobs && typeof doc.jobs === "object" ? doc.jobs : {};
  const findings = [];
  for (const [jobName, job] of Object.entries(jobs)) {
    if (!job || typeof job !== "object") continue;
    if (classifyRunsOn(job["runs-on"]) !== "self-hosted") continue;
    const steps = Array.isArray(job.steps) ? job.steps : [];
    steps.forEach((step, i) => {
      if (step && typeof step.run === "string" && PROVENANCE.test(step.run)) {
        findings.push({ file: fileName, job: jobName, step: step.name || `#${i + 1}` });
      }
    });
  }
  return findings;
}

/** Human-readable line per finding, used by the CLI. */
export function formatProvenanceFinding(f) {
  return `${f.file}: job "${f.job}", step "${f.step}" runs \`--provenance\` on a self-hosted runner — npm rejects that (422). Move the upload to a github-hosted job.`;
}
