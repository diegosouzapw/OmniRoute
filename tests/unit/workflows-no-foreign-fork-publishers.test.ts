/**
 * Policy guard: no workflow in this repository may publish to — or be gated on — a
 * DIFFERENT repository's namespace.
 *
 * Twice now a contributor's own fork CI has ridden into the canonical repo as an
 * unrelated extra file in an otherwise on-topic PR:
 *
 *   .github/workflows/build-fork.yml           added by #1528 (scope: SSE translator)
 *     env: IMAGE_NAME: ghcr.io/kang-heewon/omniroute
 *     if:  github.repository == 'kang-heewon/OmniRoute'
 *     → the guard sits on the JOB, not the workflow, so GitHub instantiated a run on
 *       every push to main and every v* tag and skipped the job: 100+ runs, zero
 *       runner cost, and a permanently noisy check board on every release.
 *
 *   .github/workflows/build-rinseaid-image.yml added by #8729 (scope: SSE reasoning)
 *     tags: ghcr.io/rinseaid/omniroute:...
 *     → no repository guard at all; it simply never fires because its trigger branch
 *       (`build-k3-reasoning-image`) does not exist here. 0 runs.
 *
 * Neither can succeed: this repo's GITHUB_TOKEN cannot write to another owner's GHCR
 * namespace. So the cost is not a breach, it is dead configuration that review keeps
 * waving through because the PR it arrives in is about something else entirely.
 *
 * This test is the cheap check that review is not: it reads the workflow directory and
 * fails on any foreign owner, so the next accidental inclusion is caught by CI instead
 * of surviving until someone wonders why a release board shows a skipped fork job.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflowDir = path.join(repoRoot, ".github/workflows");

/** The only owner whose namespaces this repository may publish to or gate on. */
const OWNER = "diegosouzapw";

function workflowFiles(): string[] {
  return fs
    .readdirSync(workflowDir)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
    .map((f) => path.join(workflowDir, f));
}

test("no workflow publishes to another owner's container registry", () => {
  const offenders: string[] = [];

  for (const file of workflowFiles()) {
    const text = fs.readFileSync(file, "utf-8");
    // ghcr.io/<owner>/... and index.docker.io/<owner>/... — the owner is the segment
    // right after the registry host.
    for (const m of text.matchAll(/\b(?:ghcr\.io|(?:index\.)?docker\.io)\/([A-Za-z0-9_.-]+)/g)) {
      const owner = m[1];
      if (owner.toLowerCase() !== OWNER) {
        offenders.push(`${path.basename(file)} → ${m[0]}`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `workflow(s) target a registry namespace that is not ${OWNER}'s:\n  ${offenders.join("\n  ")}\n` +
      `A fork's publish workflow does not belong in the canonical repository — it cannot ` +
      `authenticate anyway, and it pollutes every release check board.`
  );
});

test("no workflow job is gated on a different repository", () => {
  const offenders: string[] = [];

  for (const file of workflowFiles()) {
    const text = fs.readFileSync(file, "utf-8");
    // `if: github.repository == 'owner/name'` — a guard naming someone else's repo means
    // the workflow was written for a fork.
    for (const m of text.matchAll(/github\.repository\s*[=!]=\s*['"]([^'"]+)['"]/g)) {
      const [owner] = m[1].split("/");
      if (owner.toLowerCase() !== OWNER) {
        offenders.push(`${path.basename(file)} → ${m[0]}`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `workflow(s) gate on a foreign repository:\n  ${offenders.join("\n  ")}\n` +
      `Note the failure mode: a job-level guard still instantiates a run on every ` +
      `matching trigger, so the workflow shows up as a skipped check forever.`
  );
});
