import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
const WORKFLOW = resolve(repoRoot, ".github/workflows/quality.yml");

interface WorkflowStep {
  name?: string;
  run?: string;
  "continue-on-error"?: boolean;
}

interface WorkflowDocument {
  jobs?: Record<string, { steps?: WorkflowStep[] }>;
}

function loadWorkflow(): WorkflowDocument {
  return parse(readFileSync(WORKFLOW, "utf8")) as WorkflowDocument;
}

function invokesGate(run: string): boolean {
  if (!run) return false;
  return (
    /npm run (check:|typecheck:)/.test(run) ||
    /npm run "check/.test(run) ||
    /npm run \\"check/.test(run)
  );
}
function stepCanFail(step: WorkflowStep): boolean {
  return step?.["continue-on-error"] !== true;
}

test("repro #8542: fast-gates must not fail-fast into a later gate", () => {
  const wf = loadWorkflow();
  const job = wf.jobs?.["fast-gates"];
  assert.ok(job, "fast-gates job must exist");
  const steps: WorkflowStep[] = job.steps ?? [];
  assert.ok(steps.length >= 5, `fast-gates must have >=5 steps, got ${steps.length}`);

  const gateSteps = steps.map((s, i) => ({ s, i })).filter(({ s }) => invokesGate(s?.run ?? ""));
  assert.ok(gateSteps.length >= 1, `expected >=1 gate step, got ${gateSteps.length}`);

  const maskedPairs: string[] = [];
  for (let a = 0; a < gateSteps.length; a++) {
    const stepA = gateSteps[a];
    if (!stepCanFail(stepA.s)) continue;
    for (let b = a + 1; b < gateSteps.length; b++) {
      const stepB = gateSteps[b];
      maskedPairs.push(
        `step ${stepA.i + 1} (${stepA.s.name ?? String(stepA.s.run).split("\n")[0].slice(0, 40)})` +
          ` can fail and masks step ${stepB.i + 1} (${stepB.s.name ?? String(stepB.s.run).split("\n")[0].slice(0, 40)})`
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
