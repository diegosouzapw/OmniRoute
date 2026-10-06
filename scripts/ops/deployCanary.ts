/**
 * Canary deploy policy (#10429) — pure planning + verdict logic.
 *
 * Deploying the internal gateway used to be a manual sequence (build → pack → scp →
 * `npm i -g` → `pm2 restart`) with nothing recording what landed and nothing proving the
 * new build served traffic. On 2026-08-14 that shipped a package built from a feature
 * branch predating #10373: the process came up, `/api/monitoring/health` answered
 * `healthy`, and every real request returned `502 … Executor result must contain a
 * Response` until a human hit it.
 *
 * Two lessons are encoded here:
 *  1. Refuse an artifact that cannot be traced to the release line (reuses #10427).
 *  2. A health check is NOT a smoke test. Only a real completion exercises the egress
 *     path where that outage lived, so the verdict requires at least one.
 *
 * Everything side-effecting (git, ssh, http) is injected or emitted as data, so the policy
 * is unit-testable without a host. The thin CLI that executes these steps lives in
 * `scripts/ops/deploy-canary.mjs`.
 */

import { resolveBuildProvenance } from "../build/buildProvenance.ts";

export type CanaryPlanInput = {
  buildSha: string;
  isAncestorOfRelease: (sha: string) => boolean;
  allowCanary: boolean;
};

export type CanaryPlan = {
  proceed: boolean;
  reason: string;
};

/**
 * Decide whether an artifact may be shipped at all. Delegates to the provenance policy so
 * the pack gate and the deploy path can never disagree about what "shippable" means.
 */
export function planCanaryDeploy(input: CanaryPlanInput): CanaryPlan {
  const provenance = resolveBuildProvenance({
    buildSha: input.buildSha,
    isAncestorOfRelease: input.isAncestorOfRelease,
    allowOverride: input.allowCanary,
  });
  return { proceed: provenance.ok, reason: provenance.message };
}

export type CompletionProbe = {
  model: string;
  ok: boolean;
  status: number;
};

export type SmokeInput = {
  healthOk: boolean;
  completions: CompletionProbe[];
};

export type SmokeVerdict = {
  ok: boolean;
  rollback: boolean;
  reason: string;
};

/**
 * Grade a deploy. Health first (cheap, and a dead process needs no further probing), then
 * every completion probe.
 *
 * An empty probe list FAILS: "no probe ran" must never read as "everything is fine" —
 * that is precisely how a broken egress path stays invisible behind a green health check.
 */
export function evaluateSmoke(input: SmokeInput): SmokeVerdict {
  if (!input.healthOk) {
    return {
      ok: false,
      rollback: true,
      reason: "health endpoint did not report healthy after restart",
    };
  }

  if (input.completions.length === 0) {
    return {
      ok: false,
      rollback: true,
      reason:
        "no completion probe ran — a health check alone cannot see a broken egress path (#10429)",
    };
  }

  const failed = input.completions.filter((probe) => !probe.ok);
  if (failed.length > 0) {
    const detail = failed.map((probe) => `${probe.model} → ${probe.status}`).join(", ");
    return {
      ok: false,
      rollback: true,
      reason: `completion probe failed: ${detail}`,
    };
  }

  return {
    ok: true,
    rollback: false,
    reason: `health + ${input.completions.length} completion probe(s) passed`,
  };
}

export type RemoteStep = {
  name: string;
  /** argv form only — never a shell string, so no value can be interpreted (Hard Rule #13). */
  argv: string[];
  description: string;
};

export type RemoteStepsInput = {
  host: string;
  tarballPath: string;
  pm2App: string;
};

/**
 * The remote sequence, as data. Ordered so the rollback anchor is captured BEFORE the
 * install overwrites it, and so the SHA is verified only after the restart has actually
 * loaded the new artifact.
 *
 * Emitted as argv arrays rather than shell strings: the paths and app names come from
 * config and CLI flags, and interpolating them into `sh -c` is exactly the pattern Hard
 * Rule #13 forbids.
 */
export function buildRemoteSteps(input: RemoteStepsInput): RemoteStep[] {
  const { host, tarballPath, pm2App } = input;
  const shaPath = "/usr/lib/node_modules/omniroute/dist/BUILD_SHA";

  return [
    {
      name: "capture-current-sha",
      argv: ["ssh", host, "cat", shaPath],
      description: "record the running BUILD_SHA so a failed smoke can be rolled back",
    },
    {
      name: "install",
      argv: ["ssh", host, "npm", "install", "-g", tarballPath, "--no-audit", "--no-fund"],
      description: "install the packaged artifact globally",
    },
    {
      name: "restart",
      argv: ["ssh", host, "pm2", "restart", pm2App, "--update-env"],
      description: "restart the service under its process manager",
    },
    {
      name: "verify-installed-sha",
      argv: ["ssh", host, "cat", shaPath],
      description: "confirm the running artifact is the one just shipped",
    },
  ];
}

export type InstallOutcomeInput = {
  exitCode: number;
  stderr: string;
  /** BUILD_SHA read back from the installed package AFTER the install ran. */
  installedSha: string | null | undefined;
  /** BUILD_SHA of the artifact being shipped. */
  expectedSha: string;
};

export type InstallOutcome = {
  installed: boolean;
  kind: "installed" | "installed-with-cleanup-failure" | "failed";
  reason: string;
};

/**
 * Decide whether the global install actually landed.
 *
 * The exit code alone is not trustworthy in either direction:
 *
 *  - `npm install -g` on the .17 gateway writes the whole package and *then* fails renaming
 *    the old tree into its staging directory (`ENOTEMPTY`, exit 217). Treating that as a
 *    failure aborts the deploy after the artifact is already on disk — which happened twice
 *    on 2026-08-18, each time leaving the host with new files and an old running process.
 *  - The 2026-08-14 outage went the other way: the install exited 0 while shipping a package
 *    built from the wrong branch.
 *
 * So the SHA on disk decides, and it must match exactly. An absent or unreadable SHA fails
 * closed — an artifact that cannot be identified is never attested (same rule as the
 * provenance gate).
 */
export function classifyInstallOutcome(input: InstallOutcomeInput): InstallOutcome {
  const { exitCode, stderr, installedSha, expectedSha } = input;
  const onDisk = (installedSha ?? "").trim();

  if (!onDisk) {
    return {
      installed: false,
      kind: "failed",
      reason: "no BUILD_SHA could be read from the installed package after the install",
    };
  }
  if (onDisk !== expectedSha) {
    return {
      installed: false,
      kind: "failed",
      reason: `installed BUILD_SHA is ${onDisk}, expected ${expectedSha}`,
    };
  }
  if (exitCode === 0) {
    return { installed: true, kind: "installed", reason: `installed ${onDisk}` };
  }

  const staging = orphanStagingDirFromStderr(stderr);
  const enotempty = /ENOTEMPTY/.test(stderr);
  return {
    installed: true,
    kind: "installed-with-cleanup-failure",
    reason:
      `npm exited ${exitCode} but ${onDisk} is on disk — the package installed and npm failed ` +
      `during its own cleanup${enotempty ? " (ENOTEMPTY on the staging rename)" : ""}` +
      (staging ? `; orphaned staging dir left behind: ${staging}` : ""),
  };
}

/**
 * The staging directory npm failed to rename into, if it named one. It blocks the NEXT
 * install with the same error (npm reuses the name), so the operator has to clear it —
 * surfacing the exact path is the whole point. Deliberately not removed automatically:
 * this is a path under /usr/lib and a blind `rm -rf` there is not something a deploy
 * script should do on its own.
 */
export function orphanStagingDirFromStderr(stderr: string): string | null {
  const match = /npm error dest (\/\S*\/\.\S+)/.exec(stderr || "");
  return match ? match[1] : null;
}
