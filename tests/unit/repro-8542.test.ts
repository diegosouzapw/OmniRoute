import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
const WORKFLOW = resolve(repoRoot, ".github/workflows/quality.yml");

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function loadWorkflow(): UnknownRecord {
  const workflow: unknown = parse(readFileSync(WORKFLOW, "utf8"));
  if (!isRecord(workflow)) throw new TypeError("quality workflow must be a YAML mapping");
  return workflow;
}

function invokesGate(run: string): boolean {
  if (!run) return false;
  return (
    /npm run (check:|typecheck:)/.test(run) ||
    /npm run "check/.test(run) ||
    /npm run \\"check/.test(run)
  );
}
function stepCanFail(step: UnknownRecord): boolean {
  return step?.["continue-on-error"] !== true;
}

test("repro #8542: fast-gates must not fail-fast into a later gate", () => {
  const wf = loadWorkflow();
  const jobs = isRecord(wf.jobs) ? wf.jobs : {};
  const job = isRecord(jobs["fast-gates"]) ? jobs["fast-gates"] : null;
  assert.ok(job, "fast-gates job must exist");
  const steps = Array.isArray(job.steps) ? job.steps.filter(isRecord) : [];
  assert.ok(steps.length >= 5, `fast-gates must have >=5 steps, got ${steps.length}`);

  const gateSteps = steps
    .map((step, index) => ({ step, index }))
    .filter(({ step }) => invokesGate(typeof step.run === "string" ? step.run : ""));
  assert.ok(gateSteps.length >= 1, `expected >=1 gate step, got ${gateSteps.length}`);

  const maskedPairs: string[] = [];
  for (let a = 0; a < gateSteps.length; a++) {
    const stepA = gateSteps[a];
    if (!stepCanFail(stepA.step)) continue;
    for (let b = a + 1; b < gateSteps.length; b++) {
      const stepB = gateSteps[b];
      const stepAName =
        typeof stepA.step.name === "string"
          ? stepA.step.name
          : String(stepA.step.run).split("\n")[0].slice(0, 40);
      const stepBName =
        typeof stepB.step.name === "string"
          ? stepB.step.name
          : String(stepB.step.run).split("\n")[0].slice(0, 40);
      maskedPairs.push(
        `step ${stepA.index + 1} (${stepAName})` +
          ` can fail and masks step ${stepB.index + 1} (${stepBName})`
      );
    }
  }

  assert.deepEqual(
    maskedPairs,
    [],
    `FAIL-FAST MASKING PRESENT (${maskedPairs.length} pair(s)): a failing gate step aborts the job and every later gate reports "skipped". This is the #8542 mechanism.\n` +
      maskedPairs.slice(0, 12).join("\n") +
      (maskedPairs.length > 12 ? `\n... (+${maskedPairs.length - 12} more)` : "")
  );
});
