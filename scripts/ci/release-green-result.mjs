#!/usr/bin/env node
// No npm dependencies: this verifier must still run after installation/validator failure.
import { appendFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export function verifyReleaseGreenReport(report, exitCode, candidateSha, eventName) {
  const expectedProfile =
    eventName === "push"
      ? "quick"
      : ["schedule", "workflow_dispatch"].includes(eventName)
        ? "full"
        : undefined;
  const valid =
    report?.schemaVersion === 1 &&
    /^[0-9a-f]{40}$/.test(candidateSha ?? "") &&
    report.candidateSha === candidateSha &&
    expectedProfile !== undefined &&
    report.profile === expectedProfile &&
    /^\d+$/.test(exitCode ?? "") &&
    Number(exitCode) <= 255 &&
    typeof report.releaseGreen === "boolean" &&
    Array.isArray(report.hardFailures) &&
    Array.isArray(report.checks) &&
    report.checks.length > 0 &&
    report.checks.every(
      (check) =>
        typeof check?.id === "string" &&
        check.id.length > 0 &&
        ["hard", "drift"].includes(check.kind) &&
        typeof check.ok === "boolean"
    ) &&
    report.checks.some((check) => check.kind === "hard") &&
    new Set(report.checks.map((check) => check.id)).size === report.checks.length;
  if (!valid)
    return {
      exit: 1,
      verdict: "UNKNOWN",
      evidenceState: "INCOMPLETE",
      reason: "Invalid or missing report/provenance",
    };
  const failed = report.checks.filter((check) => check.kind === "hard" && !check.ok);
  const consistent =
    report.releaseGreen === (failed.length === 0) &&
    report.hardFailures.length === failed.length &&
    failed.every((check) => report.hardFailures.some((failure) => failure?.id === check.id));
  if (!consistent || (exitCode === "0") !== report.releaseGreen) {
    return {
      exit: 1,
      verdict: "UNKNOWN",
      evidenceState: "INCOMPLETE",
      reason: "Exit and report disagree",
    };
  }
  return {
    exit: report.releaseGreen ? 0 : 1,
    verdict: report.releaseGreen ? "PASS" : "FAIL",
    evidenceState: "COMPLETE",
    reason: report.releaseGreen ? "Validated report" : "Required validation failed",
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [path, exitCode, candidateSha, eventName] = process.argv.slice(2);
  let report;
  try {
    report = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    /* verifier fails closed below */
  }
  const result = verifyReleaseGreenReport(report, exitCode, candidateSha, eventName);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `exit=${result.exit}\n`);
  console.log(JSON.stringify(result));
  process.exitCode = result.exit;
}
