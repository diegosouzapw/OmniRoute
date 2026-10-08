// #14560: docker-publish.yml gained a runner-preflight gate and a nightly
// runner-alert job. These structural guards pin the three ways that wiring can
// silently break the publish itself:
//   1. `build` needs `runner-preflight`, which is SKIPPED when USE_VPS_RUNNER is
//      off — a plain `if:` inherits success() and would skip the whole build.
//   2. The nightly `schedule` run executes on the default-branch ref; sharing the
//      publish concurrency group (cancel-in-progress) would cancel an in-flight
//      release-branch publish every night.
//   3. Listing self-hosted runners needs "Administration: read", which
//      GITHUB_TOKEN cannot hold — the check must fail OPEN, never block a publish.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import { load } from "js-yaml";

type Step = { name?: string; env?: Record<string, string>; run?: string };
type Job = { if?: string; needs?: string | string[]; steps?: Step[] };
type Workflow = { concurrency: { group: string }; jobs: Record<string, Job> };

const workflow = load(
  readFileSync(resolve(".github/workflows/docker-publish.yml"), "utf8")
) as Workflow;

test("build still runs when runner-preflight is skipped (USE_VPS_RUNNER off)", () => {
  const build = workflow.jobs.build;
  assert.ok([build.needs].flat().includes("runner-preflight"));
  const cond = String(build.if);
  assert.match(cond, /!cancelled\(\)/);
  assert.match(cond, /needs\.runner-preflight\.result == 'skipped'/);
  assert.match(cond, /needs\.prepare\.result == 'success'/);
});

test("the nightly schedule run does not share the publish concurrency group", () => {
  const group = workflow.concurrency.group;
  assert.match(group, /github\.event_name == 'schedule'/);
  assert.notEqual(group, "docker-publish-${{ github.ref }}");
});

test("runner listing fails open when the token cannot list self-hosted runners", () => {
  for (const jobName of ["runner-preflight", "runner-alert"]) {
    const steps = workflow.jobs[jobName]?.steps ?? [];
    const step = steps.find((s) => s.run?.includes("actions/runners"));
    assert.ok(step, `${jobName} lists runners`);
    const tokens = Object.values(step.env ?? {}).join(" ");
    assert.match(tokens, /secrets\.RUNNER_STATUS_TOKEN/, `${jobName} can use an admin-read token`);
    assert.match(step.run ?? "", /if ! ONLINE=\$\(/, `${jobName} guards the API call`);
    assert.match(step.run ?? "", /::warning::[^\n]*\n\s*exit 0/, `${jobName} fails open`);
  }
});
