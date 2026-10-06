import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * scripts/ops/runner-janitor.sh runs from cron on the .113 runner box. This
 * suite pins its safety contract against a fixture tree — never the real /tmp:
 * every base, the runner dirs, the PSI file and the df path are redirected, the
 * zombie pattern is set to a name no process has, and the ceilings are lifted
 * so the outcome does not depend on the box the test happens to run on.
 */
const ROOT = path.resolve(import.meta.dirname, "..", "..");
const SCRIPT = path.join(ROOT, "scripts", "ops", "runner-janitor.sh");
const HOUR = 3_600_000;
// The sweep needs lsof to PROVE a path is idle (one snapshot of open paths). Hosted CI
// images ship both; a bare devbox may not. Each branch below asserts what must
// hold in that environment — without the tools the contract is "delete nothing,
// say why", which is exactly the behaviour worth pinning.
const HAVE_BUSY_TOOLS =
  spawnSync("bash", ["-c", "command -v lsof"], { stdio: "ignore" }).status === 0;

function fixture() {
  const base = mkdtempSync(path.join(os.tmpdir(), "janitor-fixture-"));
  const old = new Date(Date.now() - 5 * HOUR);
  const mk = (name: string, dir: boolean, when: Date | null) => {
    const p = path.join(base, name);
    if (dir) {
      mkdirSync(p);
      writeFileSync(path.join(p, "x"), "x");
    } else writeFileSync(p, "x");
    if (when) utimesSync(p, when, when);
    return p;
  };
  return {
    base,
    staleTar: mk("e2e-build.tar.gz", false, old), // fixed-name artefact ci.yml/npm-publish leave behind
    staleBuild: mk("next-build-abc", true, old),
    staleUpgrade: mk("omniroute-install-upgrade-xyz", true, old),
    fresh: mk("omniroute-batch-api-fresh", true, null), // in use right now
    unrelated: mk("somebody-elses.log", false, old), // not ours — never touched
  };
}

function run(args: string[], base: string, extraEnv: Record<string, string> = {}) {
  return spawnSync("bash", [SCRIPT, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      JANITOR_TMP_BASES: base,
      JANITOR_WORK_TEMP_BASES: "",
      JANITOR_RUNNER_DIRS: path.join(base, "no-runners-here-*"),
      JANITOR_PSI_FILE: path.join(base, "no-psi"),
      JANITOR_DF_PATH: base,
      ZOMBIE_BUILD_COMM: "janitor-test-no-such-process",
      MAX_ACTIVE_RUNNERS: "9999",
      DISK_ALERT_PCT: "101",
      ...extraEnv,
    },
  });
}

describe("runner-janitor.sh", () => {
  it("is executable bash with strict mode and prints usage on --help", () => {
    assert.ok(existsSync(SCRIPT));
    assert.ok(statSync(SCRIPT).mode & 0o111, "must be chmod +x (cron runs it directly)");
    const body = readFileSync(SCRIPT, "utf8");
    assert.ok(body.startsWith("#!/usr/bin/env bash"));
    assert.ok(body.includes("set -euo pipefail"));
    const help = run(["--help"], os.tmpdir());
    assert.equal(help.status, 0, help.stderr);
    assert.match(help.stdout, /--dry-run/);
  });

  it("without lsof it cannot prove idle, so it deletes nothing and says why (exit 1)", () => {
    const f = fixture();
    try {
      const r = run([], f.base, { JANITOR_LSOF: "/nonexistent/lsof" });
      assert.equal(r.status, 1, "a janitor that cannot do its job must show up in the cron log");
      assert.match(r.stdout, /busy-tools=MISSING/);
      assert.match(
        r.stdout,
        /cannot prove idle \(lsof missing — apt install lsof\), kept: .*e2e-build\.tar\.gz/
      );
      for (const p of [f.staleTar, f.staleBuild, f.staleUpgrade, f.fresh, f.unrelated]) {
        assert.ok(existsSync(p), `must not delete ${p} when idleness cannot be proven`);
      }
    } finally {
      rmSync(f.base, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("--dry-run names what it WOULD remove and removes nothing", (t) => {
    if (!HAVE_BUSY_TOOLS) return t.skip("lsof absent on this box — sweep branch covered in CI");
    const f = fixture();
    try {
      const r = run(["--dry-run"], f.base);
      assert.equal(r.status, 0, r.stderr + r.stdout);
      assert.match(r.stdout, /busy-tools=ok/);
      for (const p of [f.staleTar, f.staleBuild, f.staleUpgrade]) {
        assert.match(
          r.stdout,
          new RegExp(`would remove \\(3h\\+\\): ${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
        );
        assert.doesNotMatch(
          r.stdout,
          new RegExp(`removed \\(3h\\+\\): ${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
          "dry-run must never claim it removed something"
        );
        assert.ok(existsSync(p), `dry-run must not delete ${p}`);
      }
      assert.doesNotMatch(
        r.stdout,
        /omniroute-batch-api-fresh/,
        "a fresh dir is never a candidate"
      );
      assert.doesNotMatch(r.stdout, /somebody-elses\.log/, "only names our tooling creates");
      assert.match(r.stdout, /zombie builds: 0/);
      assert.match(r.stdout, /done status=0/);
    } finally {
      rmSync(f.base, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("for real: sweeps the three stale artefacts, keeps the fresh one and the stranger", (t) => {
    if (!HAVE_BUSY_TOOLS) return t.skip("lsof absent on this box — sweep branch covered in CI");
    const f = fixture();
    try {
      const r = run([], f.base);
      assert.equal(r.status, 0, r.stderr + r.stdout);
      assert.ok(!existsSync(f.staleTar), "stale e2e-build.tar.gz must go (it is RAM on tmpfs)");
      assert.ok(!existsSync(f.staleBuild), "stale next-build dir must go");
      assert.ok(!existsSync(f.staleUpgrade), "stale install-upgrade dir must go");
      assert.ok(existsSync(f.fresh), "a fresh dir must survive");
      assert.ok(existsSync(f.unrelated), "files we did not create must survive even when old");
    } finally {
      rmSync(f.base, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("tmpfs fuse is shorter than the disk fuse (RAM vs disk), both overridable", () => {
    const f = fixture();
    try {
      // With a 6h tmpfs fuse the 5h-old artefacts are NOT stale yet.
      const r = run(["--dry-run"], f.base, { TMPFS_MAX_AGE_HOURS: "6" });
      assert.doesNotMatch(
        r.stdout,
        /would remove|removed \(|cannot prove idle/,
        "nothing is stale under a 6h fuse, so no candidate is even examined"
      );
      const body = readFileSync(SCRIPT, "utf8");
      assert.match(body, /TMPFS_MAX_AGE_HOURS:-3\}/, "tmpfs default must stay short — it is RAM");
      assert.match(body, /WORK_TEMP_MAX_AGE_HOURS:-24\}/);
    } finally {
      rmSync(f.base, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("alerts (exit 1) on disk and memory pressure thresholds without touching files", () => {
    const f = fixture();
    try {
      writeFileSync(
        path.join(f.base, "psi"),
        "some avg10=0.00 avg60=0.00 avg300=0.00 total=1\nfull avg10=0.00 avg60=23.50 avg300=9.00 total=1\n"
      );
      const r = run(["--dry-run"], f.base, {
        JANITOR_PSI_FILE: path.join(f.base, "psi"),
        DISK_ALERT_PCT: "0",
      });
      assert.equal(r.status, 1, "attention needed must be exit 1 for the cron log");
      assert.match(r.stdout, /MEMORY PRESSURE psi full\/avg60=23\.50%/);
      assert.ok(existsSync(f.fresh) && existsSync(f.unrelated));
      assert.match(r.stdout, /ROOT DISK \d+% >= 0%/);
      assert.ok(existsSync(f.staleTar), "alerting never deletes");
    } finally {
      rmSync(f.base, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("rejects unknown arguments instead of silently running", () => {
    const r = run(["--yolo"], os.tmpdir());
    assert.equal(r.status, 2);
  });
});
