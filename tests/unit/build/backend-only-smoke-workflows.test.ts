// Regression guard for #7226: API-only smoke/nightly workflows must build with
// OMNIROUTE_BUILD_BACKEND_ONLY=1 so `npm run build:cli`'s fallback full build
// (scripts/build/prepublish.ts -> build-next-isolated.mjs) skips the ~126-leaf-page
// dashboard UI graph these workflows never exercise. Without this env var, the
// "Build CLI bundle" step silently runs a full Next.js production build inline,
// which is the actual source of the multi-minute variance/timeouts reported in #7226.
//
// npm-publish.yml is intentionally excluded: its "Build CLI bundle (standalone app)"
// step legitimately ships the full dashboard UI in the published npm package.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

interface WorkflowStep {
  name?: string;
  run?: string;
  env?: Record<string, string>;
  [key: string]: unknown;
}

interface WorkflowJob {
  steps: WorkflowStep[];
  [key: string]: unknown;
}

interface WorkflowDoc {
  jobs: Record<string, WorkflowJob>;
  [key: string]: unknown;
}

const WORKFLOWS_DIR = path.join(process.cwd(), ".github", "workflows");

function loadWorkflow(fileName: string): WorkflowDoc {
  const raw = fs.readFileSync(path.join(WORKFLOWS_DIR, fileName), "utf8");
  return yaml.load(raw) as WorkflowDoc;
}

function isBackendOnly(step: WorkflowStep): boolean {
  const env = step.env || {};
  return env.OMNIROUTE_BUILD_BACKEND_ONLY === "1" || env.OMNIROUTE_BUILD_PROFILE === "backend";
}

// jobName: null selector means "any job" — used when a file has exactly one
// "Build CLI bundle" step but we don't want to hardcode/duplicate the job key.
interface Target {
  file: string;
  jobName: string;
  stepName: string;
}

const TARGETS: Target[] = [
  { file: "dast-smoke.yml", jobName: "dast-smoke", stepName: "Build CLI bundle" },
  { file: "nightly-schemathesis.yml", jobName: "schemathesis", stepName: "Build CLI bundle" },
  { file: "nightly-resilience.yml", jobName: "k6-soak", stepName: "Build CLI bundle" },
  { file: "nightly-llm-security.yml", jobName: "promptfoo-guard", stepName: "Build CLI bundle" },
  { file: "nightly-llm-security.yml", jobName: "garak", stepName: "Build CLI bundle" },
];

for (const { file, jobName, stepName } of TARGETS) {
  test(`${file} :: ${jobName} '${stepName}' step sets OMNIROUTE_BUILD_BACKEND_ONLY=1 (skips dashboard UI build the API-only smoke job never exercises)`, () => {
    const doc = loadWorkflow(file);
    const job = doc.jobs[jobName];
    assert.ok(job, `${file} must have a '${jobName}' job`);
    const step = job.steps.find((s) => s.name === stepName);
    assert.ok(step, `${file}'s '${jobName}' job must have a '${stepName}' step`);
    assert.equal(
      isBackendOnly(step),
      true,
      `${file}'s '${jobName}' -> '${stepName}' step must set OMNIROUTE_BUILD_BACKEND_ONLY=1 or OMNIROUTE_BUILD_PROFILE=backend`
    );
  });
}

test("npm-publish.yml 'Build CLI bundle (standalone app)' step must NOT be backend-only (it legitimately ships the full dashboard UI)", () => {
  const doc = loadWorkflow("npm-publish.yml");
  const publishJob = Object.values(doc.jobs).find((job) =>
    job.steps.some((s) => s.name === "Build CLI bundle (standalone app)")
  );
  assert.ok(publishJob, "npm-publish.yml must have a job with a 'Build CLI bundle (standalone app)' step");
  const step = publishJob!.steps.find((s) => s.name === "Build CLI bundle (standalone app)")!;
  assert.equal(
    isBackendOnly(step),
    false,
    "npm-publish.yml's build step must ship the full dashboard UI, not the backend-only stub"
  );
});
