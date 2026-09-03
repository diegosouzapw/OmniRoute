import test from "node:test";
import assert from "node:assert/strict";

/**
 * #10429 — deploying the internal gateway was a manual sequence (build, pack, scp,
 * `npm i -g`, `pm2 restart`) with no record of what landed and no proof it served traffic.
 *
 * On 2026-08-14 that produced a silent outage: the installed package was built from a
 * feature branch predating #10373, so every request returned
 * `502 … Executor result must contain a Response`. A health check would NOT have caught
 * it — the process was up and `/api/monitoring/health` answered `healthy`; only a real
 * completion exercised the broken egress path.
 *
 * The planner below is pure (every side effect injected) so the policy — refuse
 * unverifiable artifacts, verify with a real completion, roll back on failure — is
 * testable without touching a host.
 */

const { planCanaryDeploy, evaluateSmoke, buildRemoteSteps } = await import(
  "../../../scripts/ops/deployCanary.ts"
);

test("D1: an artifact off the release line is refused before anything is shipped", () => {
  const plan = planCanaryDeploy({
    buildSha: "178febc50f",
    isAncestorOfRelease: () => false,
    allowCanary: false,
  });
  assert.equal(plan.proceed, false);
  assert.match(plan.reason, /release/i);
});

test("D2: an explicit canary is allowed and labelled as such", () => {
  const plan = planCanaryDeploy({
    buildSha: "178febc50f",
    isAncestorOfRelease: () => false,
    allowCanary: true,
  });
  assert.equal(plan.proceed, true);
  assert.match(plan.reason, /canary/i);
});

test("D3: an unidentifiable artifact is refused even as a canary", () => {
  const plan = planCanaryDeploy({
    buildSha: "",
    isAncestorOfRelease: () => true,
    allowCanary: true,
  });
  assert.equal(plan.proceed, false);
});

test("D4: a healthy process with a BROKEN completion still fails — the #10429 lesson", () => {
  const verdict = evaluateSmoke({
    healthOk: true,
    completions: [
      { model: "cx/gpt-5.6-terra", ok: false, status: 502 },
      { model: "qct/deepseek-v4-flash-0731", ok: true, status: 200 },
    ],
  });
  assert.equal(verdict.ok, false, "health alone must never be enough to call a deploy good");
  assert.equal(verdict.rollback, true);
  assert.match(verdict.reason, /cx\/gpt-5\.6-terra/);
});

test("D5: every probe green → success, no rollback", () => {
  const verdict = evaluateSmoke({
    healthOk: true,
    completions: [
      { model: "a", ok: true, status: 200 },
      { model: "b", ok: true, status: 200 },
    ],
  });
  assert.equal(verdict.ok, true);
  assert.equal(verdict.rollback, false);
});

test("D6: a dead health endpoint fails without needing the completion probes", () => {
  const verdict = evaluateSmoke({ healthOk: false, completions: [] });
  assert.equal(verdict.ok, false);
  assert.equal(verdict.rollback, true);
  assert.match(verdict.reason, /health/i);
});

test("D7: zero completion probes is a failure, not a vacuous pass", () => {
  const verdict = evaluateSmoke({ healthOk: true, completions: [] });
  assert.equal(
    verdict.ok,
    false,
    "an empty probe list would let a broken deploy through on a technicality"
  );
});

test("D8: remote steps are argv arrays — never shell strings (Hard Rule #13)", () => {
  const steps = buildRemoteSteps({
    host: "root@192.168.0.17",
    tarballPath: "/root/omniroute-e05ac345da.tgz",
    pm2App: "omniroute",
  });
  for (const step of steps) {
    assert.ok(Array.isArray(step.argv), `${step.name} must expose argv, not a shell string`);
    for (const arg of step.argv) {
      assert.equal(typeof arg, "string");
      assert.ok(
        !/[;&|`$(){}<>]/.test(arg),
        `${step.name} argv must not carry shell metacharacters: ${arg}`
      );
    }
  }
});

test("D9: the install step records the previous version so rollback is possible", () => {
  const steps = buildRemoteSteps({
    host: "root@192.168.0.17",
    tarballPath: "/root/omniroute-e05ac345da.tgz",
    pm2App: "omniroute",
  });
  const names = steps.map((s) => s.name);
  assert.ok(names.includes("capture-current-sha"), `expected a rollback anchor, got ${names}`);
  assert.ok(
    names.indexOf("capture-current-sha") < names.indexOf("install"),
    "the current SHA must be captured BEFORE the install overwrites it"
  );
});

test("D10: restart comes after install, and the smoke after the restart", () => {
  const steps = buildRemoteSteps({
    host: "root@192.168.0.17",
    tarballPath: "/root/omniroute-e05ac345da.tgz",
    pm2App: "omniroute",
  });
  const names = steps.map((s) => s.name);
  assert.ok(names.indexOf("install") < names.indexOf("restart"));
  assert.ok(names.indexOf("restart") < names.indexOf("verify-installed-sha"));
});
