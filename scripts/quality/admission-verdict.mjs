#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const EVENTS = new Set(["pull_request", "push", "workflow_dispatch", "merge_group"]);
const CONDITIONS = new Set([
  "always",
  "code",
  "docs",
  "i18n",
  "code-or-docs",
  "code-or-i18n",
  "code-e2e",
  "pr",
]);
const RESULTS = new Set(["success", "failure", "cancelled", "skipped"]);
const FLAGS = ["code", "docs", "i18n", "workflow", "testsOnly"];
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function applies(when, flags, event) {
  switch (when) {
    case "always":
      return true;
    case "pr":
      return event === "pull_request";
    case "code-or-docs":
      return flags.code || flags.docs;
    case "code-or-i18n":
      return flags.code || flags.i18n;
    case "code-e2e":
      return flags.code && !flags.testsOnly;
    default:
      return flags[when] === true;
  }
}

// `needs` must come from toJSON(needs) in this same workflow run. A check-list
// fetched by branch name, a prior run, or a sibling SHA is not interchangeable.
export function evaluateAdmission(policy, profileName, context, needs) {
  const errors = [];
  const jobs = [];
  const profile = policy?.profiles?.[profileName];
  if (
    policy?.schemaVersion !== 1 ||
    !isRecord(profile?.jobs) ||
    !Object.keys(profile.jobs).length
  ) {
    errors.push("invalid admission policy/profile");
  }
  if (!EVENTS.has(context?.event)) errors.push("unsupported event");
  if (!/^[a-f0-9]{40}$/.test(context?.sha || "")) errors.push("invalid candidate SHA");
  if (!/^[1-9][0-9]*$/.test(context?.runId || "")) errors.push("invalid run ID");
  if (!/^[1-9][0-9]*$/.test(context?.runAttempt || "")) errors.push("invalid run attempt");
  if (context?.event === "pull_request" && context.draft !== false)
    errors.push("draft or unknown PR readiness");
  if (!isRecord(needs)) errors.push("invalid needs payload");
  const outputs = needs?.changes?.outputs;
  let flags = { code: true, docs: true, i18n: true, workflow: true, testsOnly: false };
  if (context?.event === "pull_request") {
    if (!isRecord(outputs) || FLAGS.some((key) => !["true", "false"].includes(outputs[key]))) {
      errors.push("missing or malformed change classification");
    } else {
      flags = Object.fromEntries(FLAGS.map((key) => [key, outputs[key] === "true"]));
      if ((flags.testsOnly || flags.workflow) && !flags.code)
        errors.push("inconsistent change classification");
    }
  }
  if (isRecord(profile?.jobs) && isRecord(needs)) {
    for (const id of Object.keys(needs)) {
      if (!Object.hasOwn(profile.jobs, id)) errors.push(`unmapped job: ${id}`);
    }
    for (const [id, rule] of Object.entries(profile.jobs)) {
      if (
        !CONDITIONS.has(rule?.when) ||
        !["required", "advisory"].includes(rule?.disposition) ||
        (rule?.disposition === "advisory" && !rule.reason?.trim())
      ) {
        errors.push(`invalid job policy: ${id}`);
        continue;
      }
      const applicable = applies(rule.when, flags, context.event);
      const result = needs[id]?.result ?? "missing";
      jobs.push({
        id,
        disposition: rule.disposition,
        applicable,
        result,
        ...(rule.reason ? { reason: rule.reason } : {}),
      });
      if (rule.disposition === "advisory") continue;
      if (applicable && result !== "success") errors.push(`${id}: required result is ${result}`);
      if (!applicable && (!RESULTS.has(result) || result === "failure" || result === "cancelled")) {
        errors.push(`${id}: non-applicable job reported ${result}`);
      }
    }
  }
  return {
    schemaVersion: 1,
    profile: profileName,
    sha: context?.sha,
    event: context?.event,
    runId: context?.runId,
    runAttempt: context?.runAttempt,
    verdict: errors.length ? "FAIL" : "PASS",
    scope: "This workflow candidate only; not a publication/deployment receipt.",
    errors,
    jobs,
  };
}

function main() {
  const profile = process.argv[2];
  if (!["ci", "quality"].includes(profile)) throw new Error("expected profile ci or quality");
  const policy = JSON.parse(readFileSync(resolve("config/quality/admission-policy.json"), "utf8"));
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  const sha = process.env.GITHUB_SHA;
  const checkedOut = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  if (checkedOut !== sha) throw new Error("checkout SHA does not match this workflow candidate");
  if (process.env.GITHUB_EVENT_NAME === "merge_group" && event.merge_group?.head_sha !== sha) {
    throw new Error("merge-group SHA does not match this workflow candidate");
  }
  const report = evaluateAdmission(
    policy,
    profile,
    {
      event: process.env.GITHUB_EVENT_NAME,
      sha,
      runId: process.env.GITHUB_RUN_ID,
      runAttempt: process.env.GITHUB_RUN_ATTEMPT,
      draft: event.pull_request?.draft,
    },
    JSON.parse(process.env.NEEDS_JSON)
  );
  mkdirSync(".artifacts", { recursive: true });
  writeFileSync(`.artifacts/${profile}-admission.json`, `${JSON.stringify(report, null, 2)}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `## ${policy.profiles[profile].checkName}: ${report.verdict}\n\nCandidate: \`${sha}\`\n\n${report.errors.map((error) => `- ${error}`).join("\n")}\n`
    );
  }
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.verdict === "PASS" ? 0 : 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    main();
  } catch (error) {
    console.error(`[admission-verdict] ${error.message}`);
    process.exitCode = 1;
  }
}
